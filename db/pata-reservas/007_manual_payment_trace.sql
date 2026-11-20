-- AriMar · forma de cobro declarada por el administrador al reservar en tienda.
-- APLICAR SOLO EN NEON SANDBOX durante desarrollo. Aditiva, sin cambiar pagos MONEI web.
-- MANUAL_CONFIRMED indica reserva confirmada, NO cobro verificado por procesador.
ALTER TABLE pata_orders
 ADD COLUMN IF NOT EXISTS manual_payment_method varchar(12) NOT NULL DEFAULT 'PENDING';
ALTER TABLE pata_orders
 ADD COLUMN IF NOT EXISTS manual_payment_date date;
ALTER TABLE pata_orders
 ADD COLUMN IF NOT EXISTS manual_payment_receipt varchar(100);

DO $constraint$
BEGIN
 IF NOT EXISTS (
  SELECT 1 FROM pg_constraint
  WHERE conname='pata_manual_payment_method_valid'
    AND conrelid='pata_orders'::regclass
 ) THEN
  ALTER TABLE pata_orders
  ADD CONSTRAINT pata_manual_payment_method_valid
  CHECK (manual_payment_method IN ('PENDING','CARD','CASH','MONEI'));
 END IF;
 IF NOT EXISTS (
  SELECT 1 FROM pg_constraint
  WHERE conname='pata_manual_payment_consistency'
    AND conrelid='pata_orders'::regclass
 ) THEN
  ALTER TABLE pata_orders
  ADD CONSTRAINT pata_manual_payment_consistency CHECK (
   (manual_payment_method='PENDING'
     AND manual_payment_date IS NULL
     AND manual_payment_receipt IS NULL)
   OR
   (manual_payment_method IN ('CARD','CASH','MONEI')
     AND manual_payment_date IS NOT NULL
     AND manual_payment_receipt IS NOT NULL
     AND length(trim(manual_payment_receipt)) BETWEEN 1 AND 100)
  );
 END IF;
END
$constraint$;

CREATE INDEX IF NOT EXISTS idx_pata_manual_payment_trace
 ON pata_orders(manual_payment_date, manual_payment_receipt)
 WHERE source='MANUAL' AND manual_payment_date IS NOT NULL;

-- Una única operación: verifica los datos, crea la reserva con bloqueo
-- del stock y guarda los datos del cobro. Si falla cualquier paso, rollback.
CREATE OR REPLACE FUNCTION pata_admin_booking_with_payment(
 p_date date, p_qty integer, p_name text, p_phone text,
 p_notes text, p_method text, p_paid_date date, p_receipt text
) RETURNS TABLE(order_id uuid, reservation_ref text)
LANGUAGE plpgsql AS $$
DECLARE v_id uuid; v_ref text;
BEGIN
 IF p_date IS NULL OR p_qty NOT BETWEEN 1 AND 3
  OR length(trim(coalesce(p_name,''))) NOT BETWEEN 2 AND 100
  OR length(regexp_replace(coalesce(p_phone,''),'\D','','g'))<6
  OR length(trim(coalesce(p_phone,'')))>30
  OR length(coalesce(p_notes,''))>500
  OR p_method IS NULL OR p_method NOT IN ('PENDING','CARD','CASH','MONEI')
  OR (p_method='PENDING' AND (p_paid_date IS NOT NULL OR nullif(trim(coalesce(p_receipt,'')),'') IS NOT NULL))
  OR (p_method<>'PENDING' AND (
       p_paid_date IS NULL
       OR p_paid_date>(now() AT TIME ZONE 'Atlantic/Canary')::date
       OR length(trim(coalesce(p_receipt,''))) NOT BETWEEN 1 AND 100
     ))
 THEN
  RAISE EXCEPTION 'PATA_INVALID_MANUAL_PAYMENT';
 END IF;

 v_id:=pata_manual_booking(p_date,p_qty,p_name,p_phone,p_notes);
 UPDATE pata_orders SET
  manual_payment_method=p_method,
  manual_payment_date=p_paid_date,
  manual_payment_receipt=CASE WHEN p_method='PENDING' THEN NULL ELSE trim(p_receipt) END,
  updated_at=now()
 WHERE id=v_id AND source='MANUAL' AND status='MANUAL_CONFIRMED'
 RETURNING reservation_reference INTO v_ref;
 IF v_ref IS NULL THEN RAISE EXCEPTION 'PATA_INVALID_ORDER'; END IF;
 RETURN QUERY SELECT v_id,v_ref;
END $$;

-- Solo la administración puede completar un cobro manual que quedó pendiente.
-- El pedido no cambia de estado ni se convierte en un PAID de MONEI.
CREATE OR REPLACE FUNCTION pata_admin_complete_manual_payment(
 p_order_id uuid,p_method text,p_paid_date date,p_receipt text
) RETURNS text
LANGUAGE plpgsql AS $$
DECLARE v_order pata_orders%ROWTYPE;
BEGIN
 IF p_order_id IS NULL OR p_method NOT IN ('CARD','CASH','MONEI')
 OR p_paid_date IS NULL OR p_paid_date>(now() AT TIME ZONE 'Atlantic/Canary')::date
 OR length(trim(coalesce(p_receipt,''))) NOT BETWEEN 1 AND 100
 THEN RAISE EXCEPTION 'PATA_INVALID_MANUAL_PAYMENT'; END IF;

 SELECT * INTO v_order FROM pata_orders WHERE id=p_order_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'PATA_ORDER_NOT_FOUND'; END IF;
 IF v_order.source<>'MANUAL' OR v_order.status<>'MANUAL_CONFIRMED'
 THEN RAISE EXCEPTION 'PATA_MANUAL_ONLY'; END IF;
 IF v_order.manual_payment_method<>'PENDING'
 THEN RAISE EXCEPTION 'PATA_MANUAL_PAYMENT_ALREADY_RECORDED'; END IF;

 UPDATE pata_orders SET manual_payment_method=p_method,
   manual_payment_date=p_paid_date,
   manual_payment_receipt=trim(p_receipt),updated_at=now()
 WHERE id=p_order_id;

 RETURN v_order.reservation_reference::text;
END $$;

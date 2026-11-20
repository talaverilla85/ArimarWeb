-- AriMar: cobros de reservas hechas por el dependiente (solo efectivo/tarjeta).
-- Migración de pruebas: requiere 006_staff_counter.sql y 007_manual_payment_trace.sql.
-- Sigue siendo anotación manual de pago, no cobro ejecutado por esta aplicación.
CREATE OR REPLACE FUNCTION pata_staff_booking_paid(
 p_date date,p_qty integer,p_name text,p_phone text,
 p_notes text,p_staff text,p_key uuid,
 p_method text,p_paid_date date,p_receipt text
) RETURNS TABLE(order_id uuid,reservation_ref text)
LANGUAGE plpgsql AS $$
DECLARE v_id uuid;v_ref text;v_order pata_orders%ROWTYPE;
BEGIN
 IF p_method IS NULL OR p_method NOT IN ('CARD','CASH')
  OR p_paid_date IS NULL
  OR p_paid_date>(now() AT TIME ZONE 'Atlantic/Canary')::date
  OR length(trim(coalesce(p_receipt,''))) NOT BETWEEN 1 AND 100
 THEN RAISE EXCEPTION 'PATA_INVALID_MANUAL_PAYMENT';END IF;

 SELECT b.order_id,b.reservation_ref INTO STRICT v_id,v_ref
 FROM pata_staff_booking(
  p_date,p_qty,p_name,p_phone,p_notes,p_staff,p_key
 ) b;

 SELECT * INTO STRICT v_order FROM pata_orders WHERE id=v_id FOR UPDATE;
 IF v_order.source<>'MANUAL' OR v_order.status<>'MANUAL_CONFIRMED'
  OR v_order.staff_creator IS NULL
 THEN RAISE EXCEPTION 'PATA_INVALID_ORDER';END IF;

 IF v_order.manual_payment_method='PENDING'
  AND v_order.manual_payment_date IS NULL
  AND v_order.manual_payment_receipt IS NULL THEN
  UPDATE pata_orders SET
   manual_payment_method=p_method,
   manual_payment_date=p_paid_date,
   manual_payment_receipt=trim(p_receipt),updated_at=now()
  WHERE id=v_id;
 ELSIF v_order.manual_payment_method IS DISTINCT FROM p_method
  OR v_order.manual_payment_date IS DISTINCT FROM p_paid_date
  OR v_order.manual_payment_receipt IS DISTINCT FROM trim(p_receipt)
 THEN RAISE EXCEPTION 'PATA_IDEMPOTENCY_CONFLICT';END IF;

 RETURN QUERY SELECT v_id,v_ref;
END $$;
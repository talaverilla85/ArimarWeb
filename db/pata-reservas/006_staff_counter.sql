-- AriMar · mostrador: separación de permisos, registro de operador e idempotencia.
-- Primera aplicación: SOLO Neon sandbox. Para producción, aprobar tras las pruebas.

ALTER TABLE pata_orders ADD COLUMN IF NOT EXISTS staff_creator varchar(60);

CREATE OR REPLACE FUNCTION pata_staff_booking(
 p_date date, p_qty integer, p_name text, p_phone text,
 p_notes text, p_staff text, p_key uuid
) RETURNS TABLE(order_id uuid, reservation_ref text)
LANGUAGE plpgsql AS $$
DECLARE v_day pata_availability_days%ROWTYPE;
 v_taken integer; v_old pata_orders%ROWTYPE;
 v_id uuid; v_ref text;
BEGIN
 IF p_date IS NULL OR p_qty NOT BETWEEN 1 AND 3
  OR length(trim(coalesce(p_name,''))) NOT BETWEEN 2 AND 100
  OR length(trim(coalesce(p_phone,''))) NOT BETWEEN 6 AND 30
  OR length(trim(coalesce(p_staff,''))) NOT BETWEEN 2 AND 60
  OR length(coalesce(p_notes,''))>420 OR p_key IS NULL THEN
  RAISE EXCEPTION 'PATA_INVALID_INPUT';
 END IF;

 INSERT INTO pata_availability_days(pickup_date) VALUES (p_date)
 ON CONFLICT(pickup_date) DO NOTHING;
 SELECT * INTO STRICT v_day FROM pata_availability_days
 WHERE pickup_date=p_date FOR UPDATE;

 SELECT * INTO v_old FROM pata_orders WHERE request_key=p_key;
 IF FOUND THEN
   IF v_old.source<>'MANUAL' OR v_old.status<>'MANUAL_CONFIRMED'
     OR v_old.pickup_date<>p_date OR v_old.quantity<>p_qty
     OR v_old.customer_name<>trim(p_name)
     OR v_old.customer_phone IS DISTINCT FROM trim(p_phone)
     OR v_old.notes IS DISTINCT FROM nullif(trim(coalesce(p_notes,'')),'')
     OR v_old.staff_creator IS DISTINCT FROM trim(p_staff)
   THEN RAISE EXCEPTION 'PATA_IDEMPOTENCY_CONFLICT'; END IF;
   RETURN QUERY SELECT v_old.id,v_old.reservation_reference::text;
   RETURN;
 END IF;

 IF v_day.blocked THEN RAISE EXCEPTION 'PATA_DATE_BLOCKED'; END IF;

 SELECT coalesce(sum(quantity),0)::integer INTO v_taken
 FROM pata_orders WHERE pickup_date=p_date AND
 (status IN('PAYMENT_PENDING','PAID','MANUAL_CONFIRMED','REFUND_REQUIRED')
 OR(status='HELD' AND hold_expires_at>now()));
 IF v_taken+p_qty>v_day.capacity THEN
   RAISE EXCEPTION 'PATA_CAPACITY_FULL';
 END IF;

 INSERT INTO pata_orders(
  request_key,pickup_date,quantity,customer_name,customer_phone,
  notes,staff_creator,source,status)
 VALUES(
  p_key,p_date,p_qty,trim(p_name),trim(p_phone),
  nullif(trim(coalesce(p_notes,'')),''),trim(p_staff),'MANUAL','MANUAL_CONFIRMED')
 RETURNING id,reservation_reference INTO v_id,v_ref;
 RETURN QUERY SELECT v_id,v_ref;
END $$;

-- El administrador puede anular manuales para liberar disponibilidad.
-- Mantiene el pedido y el motivo de anulación, no devuelve dinero.
CREATE OR REPLACE FUNCTION pata_cancel_manual(
 p_id uuid,p_reason text
) RETURNS text LANGUAGE plpgsql AS $$
DECLARE v_date date; v_order pata_orders%ROWTYPE;
BEGIN
 IF p_id IS NULL OR length(trim(coalesce(p_reason,''))) NOT BETWEEN 5 AND 150
 THEN RAISE EXCEPTION 'PATA_INVALID_INPUT'; END IF;
 SELECT pickup_date INTO v_date FROM pata_orders WHERE id=p_id;
 IF v_date IS NULL THEN RAISE EXCEPTION 'PATA_ORDER_NOT_FOUND'; END IF;
 PERFORM 1 FROM pata_availability_days WHERE pickup_date=v_date FOR UPDATE;
 SELECT * INTO STRICT v_order FROM pata_orders WHERE id=p_id FOR UPDATE;
 IF v_order.source<>'MANUAL' THEN RAISE EXCEPTION 'PATA_MANUAL_ONLY'; END IF;
 IF v_order.status='CANCELED' THEN RETURN 'ALREADY_CANCELED'; END IF;
 IF v_order.status<>'MANUAL_CONFIRMED' THEN
  RAISE EXCEPTION 'PATA_INVALID_ORDER';
 END IF;
 UPDATE pata_orders
 SET status='CANCELED',
  notes=left(concat_ws(E'\n',nullif(notes,''),'ANULACIÓN: '||trim(p_reason)),500),
  updated_at=now()
 WHERE id=p_id;
 RETURN 'CANCELED';
END $$;

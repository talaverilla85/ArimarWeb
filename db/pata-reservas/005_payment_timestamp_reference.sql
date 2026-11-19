-- AriMar short references: use payment UPDATED timestamp from a signed MONEI callback.
-- Event delivery can be delayed across midnight. MONEI updatedAt is Unix seconds.
-- Keep existing seven-argument callback function for earlier test records;
-- the application invokes this new eight-argument form.

CREATE OR REPLACE FUNCTION pata_next_short_reference(p_time timestamptz)
RETURNS text LANGUAGE plpgsql AS $$
DECLARE v_date date; v_num integer;
BEGIN
 v_date := (coalesce(p_time,now()) AT TIME ZONE 'Atlantic/Canary')::date;
 INSERT INTO pata_daily_reference_counters(reference_date,last_number)
 VALUES(v_date,1)
 ON CONFLICT(reference_date) DO UPDATE
 SET last_number=pata_daily_reference_counters.last_number+1
 WHERE pata_daily_reference_counters.last_number<9999
 RETURNING last_number INTO v_num;
 IF v_num IS NULL THEN RAISE EXCEPTION 'PATA_REFERENCE_COUNTER_EXHAUSTED'; END IF;
 RETURN 'PA-' || to_char(v_date,'DDMMYY') || '-' || lpad(v_num::text,4,'0');
END $$;

CREATE OR REPLACE FUNCTION pata_next_short_reference()
RETURNS text LANGUAGE plpgsql AS $$
BEGIN
 RETURN pata_next_short_reference(now());
END $$;

CREATE OR REPLACE FUNCTION pata_assign_reference_on_paid()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.status='PAID' AND OLD.status IS DISTINCT FROM 'PAID' THEN
  NEW.reservation_reference:=pata_next_short_reference(NEW.paid_at);
 END IF;
 RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION pata_apply_monei_event(
 p_code text,p_payment text,p_status text,p_amount integer,p_currency text,
 p_livemode boolean,p_hash char(64),p_paid_unix bigint
) RETURNS text LANGUAGE plpgsql AS $$
DECLARE d date; o pata_orders%ROWTYPE; v_result text;
BEGIN
 IF p_hash IS NULL OR p_hash !~ '^[a-f0-9]{64}$'
 OR p_status NOT IN('SUCCEEDED','FAILED','CANCELED','EXPIRED',
                    'PENDING','PENDING_PROCESSING','AUTHORIZED',
                    'REFUNDED','PARTIALLY_REFUNDED')
 THEN RAISE EXCEPTION 'PATA_INVALID_CALLBACK'; END IF;
 SELECT pickup_date INTO d FROM pata_orders WHERE monei_order_id=p_code;
 IF d IS NULL THEN RAISE EXCEPTION 'PATA_ORDER_NOT_FOUND'; END IF;
 PERFORM 1 FROM pata_availability_days WHERE pickup_date=d FOR UPDATE;
 SELECT * INTO STRICT o FROM pata_orders WHERE monei_order_id=p_code FOR UPDATE;
 IF p_livemode IS DISTINCT FROM false OR p_currency<>'EUR'
 OR p_amount<>o.amount_cents OR p_payment IS NULL OR length(p_payment) NOT BETWEEN 1 AND 100
 OR (o.monei_payment_id IS NOT NULL AND o.monei_payment_id<>p_payment)
 THEN RAISE EXCEPTION 'PATA_PAYMENT_MISMATCH'; END IF;
 IF EXISTS(SELECT 1 FROM pata_payment_events WHERE event_hash=p_hash) THEN
  RETURN 'DUPLICATE';
 END IF;
 INSERT INTO pata_payment_events(event_hash,order_id,provider_status,payment_id)
 VALUES(p_hash,o.id,p_status,p_payment);
 IF o.monei_payment_id IS NULL THEN
  UPDATE pata_orders SET monei_payment_id=p_payment WHERE id=o.id;
 END IF;
 IF p_status='SUCCEEDED' THEN
  IF o.status='PAYMENT_PENDING' THEN
   UPDATE pata_orders SET status='PAID',paid_at=CASE WHEN p_paid_unix BETWEEN 1577836800 AND extract(epoch from now()+interval '5 minutes')::bigint THEN to_timestamp(p_paid_unix) ELSE now() END,updated_at=now() WHERE id=o.id;
   IF nullif(o.customer_email,'') IS NOT NULL THEN
    INSERT INTO pata_email_outbox(order_id,kind) VALUES(o.id,'CUSTOMER_CONFIRMED')
    ON CONFLICT(order_id,kind) DO NOTHING;
   END IF;
   INSERT INTO pata_email_outbox(order_id,kind) VALUES(o.id,'ARI_INTERNAL')
   ON CONFLICT(order_id,kind) DO NOTHING;
   v_result:='PAID';
  ELSIF o.status='PAID' THEN v_result:='ALREADY_PAID';
  ELSE
   UPDATE pata_orders SET status='REFUND_REQUIRED',updated_at=now() WHERE id=o.id;
   v_result:='REFUND_REQUIRED';
  END IF;
 ELSIF p_status IN('FAILED','CANCELED','EXPIRED') AND o.status='PAYMENT_PENDING' THEN
  UPDATE pata_orders SET status=p_status,updated_at=now() WHERE id=o.id;
  v_result:=p_status;
 ELSIF p_status IN('REFUNDED','PARTIALLY_REFUNDED') THEN
  -- Reembolsos necesitan comprobación humana del pedido y su preparación.
  UPDATE pata_orders SET status=CASE WHEN p_status='REFUNDED' THEN 'REFUNDED'
   ELSE 'REFUND_REQUIRED' END,updated_at=now() WHERE id=o.id;
  v_result:='REVIEW_REFUND';
 ELSE v_result:='NO_CHANGE';
 END IF;
 RETURN v_result;
END $$;

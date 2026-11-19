-- AriMar pata asada: pagos de prueba y confirmación fiable con referencia.
-- SOLO para la base Neon de reservas AriMar. Requiere 001_init.sql.
ALTER TABLE pata_orders ADD COLUMN IF NOT EXISTS reservation_reference varchar(32);
ALTER TABLE pata_orders ADD COLUMN IF NOT EXISTS monei_redirect_url text;

CREATE OR REPLACE FUNCTION pata_make_reference() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.reservation_reference IS NULL THEN
  NEW.reservation_reference := 'PA-' || to_char(NEW.pickup_date, 'YYYYMMDD')
    || '-' || upper(substr(replace(NEW.id::text,'-',''),1,12));
 END IF;
 RETURN NEW;
END $$;
DO $trigger$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM pg_trigger WHERE tgname='trg_pata_reference'
   AND tgrelid='pata_orders'::regclass) THEN
  CREATE TRIGGER trg_pata_reference BEFORE INSERT ON pata_orders
  FOR EACH ROW EXECUTE FUNCTION pata_make_reference();
 END IF;
END
$trigger$;
UPDATE pata_orders SET reservation_reference='PA-' || to_char(pickup_date,'YYYYMMDD')
 || '-' || upper(substr(replace(id::text,'-',''),1,12))
WHERE reservation_reference IS NULL;
ALTER TABLE pata_orders ALTER COLUMN reservation_reference SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_pata_reference ON pata_orders(reservation_reference);

CREATE TABLE IF NOT EXISTS pata_payment_events (
 event_hash char(64) PRIMARY KEY,
 order_id uuid NOT NULL REFERENCES pata_orders(id),
 provider_status varchar(30) NOT NULL,
 payment_id varchar(100) NOT NULL,
 received_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS pata_email_outbox(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 order_id uuid NOT NULL REFERENCES pata_orders(id),
 kind varchar(32) NOT NULL CHECK(kind IN ('CUSTOMER_CONFIRMED','ARI_INTERNAL')),
 status varchar(16) NOT NULL DEFAULT 'PENDING' CHECK(status IN ('PENDING','SENDING','SENT')),
 attempts smallint NOT NULL DEFAULT 0,
 next_attempt_at timestamptz NOT NULL DEFAULT now(),
 locked_until timestamptz,
 provider_message_id text,
 sent_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(order_id,kind)
);
CREATE INDEX IF NOT EXISTS idx_pata_outbox_ready
 ON pata_email_outbox(next_attempt_at,created_at) WHERE status IN('PENDING','SENDING');

-- Cambio definitivo a PAYMENT_PENDING ANTES de crear pago externo. Nunca
-- iniciar más de un pago para la misma retención (reintentos ambiguos se concilian).
CREATE OR REPLACE FUNCTION pata_begin_checkout(p_id uuid)
RETURNS TABLE(order_code text,amount integer, buyer_name text,buyer_email text,
              phase text,redirect_url text)
LANGUAGE plpgsql AS $$
DECLARE d date; o pata_orders%ROWTYPE;
BEGIN
 SELECT pickup_date INTO d FROM pata_orders WHERE id=p_id;
 IF d IS NULL THEN RAISE EXCEPTION 'PATA_ORDER_NOT_FOUND'; END IF;
 PERFORM 1 FROM pata_availability_days WHERE pickup_date=d FOR UPDATE;
 SELECT * INTO STRICT o FROM pata_orders WHERE id=p_id FOR UPDATE;
 IF o.source<>'WEB' THEN RAISE EXCEPTION 'PATA_INVALID_ORDER'; END IF;
 IF o.status='HELD' AND o.hold_expires_at>now() THEN
  UPDATE pata_orders SET status='PAYMENT_PENDING',
   monei_order_id=coalesce(monei_order_id,'PA_'||replace(id::text,'-','')),
   updated_at=now() WHERE id=p_id RETURNING * INTO o;
  RETURN QUERY SELECT o.monei_order_id::text,o.amount_cents,o.customer_name::text,
        o.customer_email::text,'NEW'::text,NULL::text;
  RETURN;
 END IF;
 IF o.status='PAYMENT_PENDING' AND o.monei_redirect_url IS NOT NULL THEN
  RETURN QUERY SELECT o.monei_order_id::text,o.amount_cents,o.customer_name::text,
        o.customer_email::text,'EXISTING'::text,o.monei_redirect_url::text;
  RETURN;
 END IF;
 RAISE EXCEPTION 'PATA_CHECKOUT_IN_PROGRESS_OR_EXPIRED';
END $$;

CREATE OR REPLACE FUNCTION pata_attach_payment(
 p_code text,p_payment text,p_redirect text,p_amount integer
) RETURNS void LANGUAGE plpgsql AS $$
DECLARE d date; o pata_orders%ROWTYPE;
BEGIN
 SELECT pickup_date INTO d FROM pata_orders WHERE monei_order_id=p_code;
 IF d IS NULL THEN RAISE EXCEPTION 'PATA_ORDER_NOT_FOUND'; END IF;
 PERFORM 1 FROM pata_availability_days WHERE pickup_date=d FOR UPDATE;
 SELECT * INTO STRICT o FROM pata_orders WHERE monei_order_id=p_code FOR UPDATE;
 IF o.status NOT IN ('PAYMENT_PENDING','PAID')
 OR o.amount_cents<>p_amount OR length(p_payment) NOT BETWEEN 1 AND 100
 OR length(p_redirect) NOT BETWEEN 15 AND 2048
 OR (o.monei_payment_id IS NOT NULL AND o.monei_payment_id<>p_payment) THEN
  RAISE EXCEPTION 'PATA_PAYMENT_BIND_CONFLICT';
 END IF;
 UPDATE pata_orders SET monei_payment_id=p_payment,
 monei_redirect_url=p_redirect,updated_at=now() WHERE id=o.id;
END $$;

-- Callback con firma ya validada en el backend. Valida importe, modo TEST y vínculo
-- antes de cualquier cambio. Los pagos tardíos no se convierten en producción.
CREATE OR REPLACE FUNCTION pata_apply_monei_event(
 p_code text,p_payment text,p_status text,p_amount integer,p_currency text,
 p_livemode boolean,p_hash char(64)
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
   UPDATE pata_orders SET status='PAID',paid_at=now(),updated_at=now() WHERE id=o.id;
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

CREATE OR REPLACE FUNCTION pata_claim_email()
RETURNS TABLE(job_id uuid,order_id uuid,job_kind text, attempt integer,
 reservation_ref text,customer_name text,customer_email text,
 pickup_date date,quantity integer,amount_cents integer)
LANGUAGE plpgsql AS $$
BEGIN
 RETURN QUERY
 WITH job AS (
  SELECT j.id FROM pata_email_outbox j
  WHERE j.status IN('PENDING','SENDING') AND j.next_attempt_at<=now()
   AND (j.status='PENDING' OR j.locked_until<now())
   AND j.attempts<8 AND j.created_at>now()-interval '23 hours'
  ORDER BY j.created_at,j.id LIMIT 1 FOR UPDATE SKIP LOCKED
 ), claimed AS (
  UPDATE pata_email_outbox j SET status='SENDING',attempts=j.attempts+1,
   locked_until=now()+interval '2 minutes' FROM job
  WHERE j.id=job.id RETURNING j.*
 )
 SELECT j.id,o.id,j.kind::text,j.attempts::integer,o.reservation_reference::text,
  o.customer_name::text,o.customer_email::text,o.pickup_date,o.quantity::integer,
  o.amount_cents::integer FROM claimed j JOIN pata_orders o ON o.id=j.order_id
 WHERE o.status='PAID';
END $$;

CREATE OR REPLACE FUNCTION pata_finish_email(
 p_job uuid,p_attempt integer,p_sent boolean,p_provider_id text
) RETURNS boolean LANGUAGE plpgsql AS $$
DECLARE updated integer;
BEGIN
 UPDATE pata_email_outbox SET status=CASE WHEN p_sent THEN 'SENT' ELSE 'PENDING' END,
  provider_message_id=CASE WHEN p_sent THEN p_provider_id ELSE provider_message_id END,
  sent_at=CASE WHEN p_sent THEN now() ELSE sent_at END,
  locked_until=NULL,
  next_attempt_at=CASE WHEN p_sent THEN now()
       ELSE now()+make_interval(mins=>least(60,2*p_attempt*p_attempt)) END
 WHERE id=p_job AND status='SENDING' AND attempts=p_attempt;
 GET DIAGNOSTICS updated=ROW_COUNT;
 RETURN updated=1;
END $$;

-- AriMar · optional reservation email + explicitly opted-in Google review request.
-- Apply in test Neon branch only until production approval.
-- Does NOT send emails or automatically subscribe clients.
ALTER TABLE pata_orders
 ADD COLUMN IF NOT EXISTS review_request_consent boolean NOT NULL DEFAULT false;
ALTER TABLE pata_orders
 ADD COLUMN IF NOT EXISTS review_request_consented_at timestamptz;

-- Future send jobs must require explicit consent, a nonempty email and a fulfilled order.
-- Existing web customers may have an email but are NOT automatically opted in.
CREATE OR REPLACE FUNCTION pata_admin_booking_with_review_email(
 p_date date,p_qty integer,p_name text,p_phone text,p_notes text,
 p_method text,p_paid_date date,p_receipt text,
 p_email text,p_review_consent boolean
) RETURNS TABLE(order_id uuid,reservation_ref text)
LANGUAGE plpgsql AS $$
DECLARE v_id uuid; v_ref text; v_email text;
BEGIN
 v_email:=lower(nullif(trim(coalesce(p_email,'')),''));
 IF p_review_consent IS NULL OR (p_review_consent AND v_email IS NULL)
   OR (v_email IS NOT NULL AND (
     length(v_email)>254 OR
     v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
   ))
 THEN RAISE EXCEPTION 'PATA_INVALID_REVIEW_EMAIL';END IF;

 SELECT booking.order_id,booking.reservation_ref
 INTO STRICT v_id,v_ref
 FROM pata_admin_booking_with_payment(
  p_date,p_qty,p_name,p_phone,p_notes,
  p_method,p_paid_date,p_receipt
 ) booking;

 UPDATE pata_orders SET
  customer_email=v_email,
  review_request_consent=p_review_consent,
  review_request_consented_at=CASE WHEN p_review_consent THEN now() ELSE NULL END,
  updated_at=now()
 WHERE id=v_id AND source='MANUAL' AND status='MANUAL_CONFIRMED';

 RETURN QUERY SELECT v_id,v_ref;
END $$;

CREATE OR REPLACE FUNCTION pata_staff_booking_paid_with_review_email(
 p_date date,p_qty integer,p_name text,p_phone text,
 p_notes text,p_staff text,p_key uuid,
 p_method text,p_paid_date date,p_receipt text,
 p_email text,p_review_consent boolean
) RETURNS TABLE(order_id uuid,reservation_ref text)
LANGUAGE plpgsql AS $$
DECLARE v_id uuid;v_ref text;v_email text;v_old pata_orders%ROWTYPE;
BEGIN
 v_email:=lower(nullif(trim(coalesce(p_email,'')),''));
 IF p_key IS NULL OR p_review_consent IS NULL
  OR (p_review_consent AND v_email IS NULL)
  OR (v_email IS NOT NULL AND (
    length(v_email)>254 OR
    v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ))
 THEN RAISE EXCEPTION 'PATA_INVALID_REVIEW_EMAIL';END IF;

 -- Same request key must not silently overwrite email or consent on retries.
 -- Advisory lock serializes competing requests before the existing capacity lock.
 PERFORM pg_advisory_xact_lock(hashtextextended(p_key::text,981726));
 SELECT * INTO v_old FROM pata_orders WHERE request_key=p_key FOR UPDATE;
 IF FOUND AND (
  v_old.customer_email IS DISTINCT FROM v_email
  OR v_old.review_request_consent IS DISTINCT FROM p_review_consent
 ) THEN RAISE EXCEPTION 'PATA_IDEMPOTENCY_CONFLICT';END IF;

 SELECT b.order_id,b.reservation_ref INTO STRICT v_id,v_ref
 FROM pata_staff_booking_paid(
  p_date,p_qty,p_name,p_phone,p_notes,p_staff,p_key,
  p_method,p_paid_date,p_receipt
 ) b;

 IF NOT FOUND THEN RAISE EXCEPTION 'PATA_STAFF_BOOKING_FAILED';END IF;

 IF v_old.id IS NULL THEN
  UPDATE pata_orders SET
   customer_email=v_email,
   review_request_consent=p_review_consent,
   review_request_consented_at=CASE WHEN p_review_consent THEN now() ELSE NULL END,
   updated_at=now()
  WHERE id=v_id AND source='MANUAL' AND status='MANUAL_CONFIRMED';
 END IF;

 RETURN QUERY SELECT v_id,v_ref;
END $$;

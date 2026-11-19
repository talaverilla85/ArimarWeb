-- AriMar: short reference PA-DDMMYY-0001, date is the day of payment confirmation
-- in Atlantic/Canary time. Manual reservations use the day of manual registration.
-- Additive migration for the isolated pata booking database. Never renumber past refs.

ALTER TABLE pata_orders ALTER COLUMN reservation_reference TYPE varchar(40);

CREATE TABLE IF NOT EXISTS pata_daily_reference_counters (
 reference_date date PRIMARY KEY,
 last_number integer NOT NULL CHECK (last_number BETWEEN 1 AND 9999)
);

CREATE OR REPLACE FUNCTION pata_next_short_reference()
RETURNS text LANGUAGE plpgsql AS $$
DECLARE v_date date; v_num integer;
BEGIN
 v_date := (now() AT TIME ZONE 'Atlantic/Canary')::date;
 INSERT INTO pata_daily_reference_counters(reference_date,last_number)
 VALUES(v_date,1)
 ON CONFLICT(reference_date) DO UPDATE
 SET last_number=pata_daily_reference_counters.last_number+1
 WHERE pata_daily_reference_counters.last_number<9999
 RETURNING last_number INTO v_num;
 IF v_num IS NULL THEN
  RAISE EXCEPTION 'PATA_REFERENCE_COUNTER_EXHAUSTED';
 END IF;
 RETURN 'PA-' || to_char(v_date,'DDMMYY') || '-' || lpad(v_num::text,4,'0');
END $$;

-- On initial WEB hold only an opaque, unadvertised internal marker is stored.
-- The real public reservation reference is allocated only after verified PAID.
-- MANUAL_CONFIRMED is a staff-confirmed booking, not evidence of payment.
CREATE OR REPLACE FUNCTION pata_make_reference()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.reservation_reference IS NULL THEN
  IF NEW.status IN ('PAID','MANUAL_CONFIRMED') THEN
   NEW.reservation_reference:=pata_next_short_reference();
  ELSE
   NEW.reservation_reference:='PENDING-' || replace(NEW.id::text,'-','');
  END IF;
 END IF;
 RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION pata_assign_reference_on_paid()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.status='PAID' AND OLD.status IS DISTINCT FROM 'PAID' THEN
  NEW.reservation_reference:=pata_next_short_reference();
 END IF;
 RETURN NEW;
END $$;

DO $new_ref_trigger$
BEGIN
 IF NOT EXISTS (
  SELECT 1 FROM pg_trigger
  WHERE tgname='trg_pata_paid_reference'
    AND tgrelid='pata_orders'::regclass
    AND NOT tgisinternal
 ) THEN
  CREATE TRIGGER trg_pata_paid_reference
  BEFORE UPDATE OF status ON pata_orders
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM 'PAID' AND NEW.status='PAID')
  EXECUTE FUNCTION pata_assign_reference_on_paid();
 END IF;
END
$new_ref_trigger$;

-- Existing historical test references are deliberately kept unchanged.
-- The email outbox reads the new short reference after the PAID transition.

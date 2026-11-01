-- Esquema aislado para reservas de pata asada AriMar. No ejecutar en DB de D'Parranda.
CREATE TABLE IF NOT EXISTS pata_availability_days(
 pickup_date date PRIMARY KEY,
 capacity smallint NOT NULL DEFAULT 3 CHECK(capacity BETWEEN 0 AND 3),
 blocked boolean NOT NULL DEFAULT false,
 note varchar(250),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS pata_orders(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 request_key uuid UNIQUE,
 pickup_date date NOT NULL REFERENCES pata_availability_days(pickup_date),
 quantity smallint NOT NULL CHECK(quantity BETWEEN 1 AND 3),
 unit_price_cents integer NOT NULL DEFAULT 9000 CHECK(unit_price_cents=9000),
 amount_cents integer GENERATED ALWAYS AS(quantity*unit_price_cents) STORED,
 customer_name varchar(100) NOT NULL,
 customer_email varchar(254),
 customer_phone varchar(30),
 notes varchar(500),
 source varchar(12) NOT NULL DEFAULT 'WEB' CHECK(source IN('WEB','MANUAL')),
 status varchar(24) NOT NULL DEFAULT 'HELD' CHECK(status IN(
  'HELD','PAYMENT_PENDING','PAID','MANUAL_CONFIRMED',
  'FAILED','CANCELED','EXPIRED','REFUND_REQUIRED','REFUNDED')),
 hold_expires_at timestamptz,
 monei_payment_id varchar(100) UNIQUE,
 monei_order_id varchar(40) UNIQUE,
 paid_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pata_orders_date ON pata_orders(pickup_date,status,hold_expires_at);
CREATE INDEX IF NOT EXISTS idx_pata_orders_created ON pata_orders(created_at DESC);

-- Funciones atómicas: bloquear primero la fila de fecha con FOR UPDATE.
CREATE OR REPLACE FUNCTION pata_make_hold(
 p_date date,p_qty integer,p_name text,p_email text,p_phone text,
 p_notes text,p_key uuid
) RETURNS TABLE(order_id uuid,hold_until timestamptz) LANGUAGE plpgsql AS $$
DECLARE v_day pata_availability_days%ROWTYPE; v_old pata_orders%ROWTYPE;
 v_taken integer; v_id uuid; v_until timestamptz;
BEGIN
 IF p_date IS NULL OR p_key IS NULL OR p_qty NOT BETWEEN 1 AND 3
 OR length(trim(p_name)) NOT BETWEEN 2 AND 100
 OR length(trim(p_email)) NOT BETWEEN 5 AND 254
 OR length(trim(p_phone)) NOT BETWEEN 6 AND 30
 OR length(coalesce(p_notes,''))>500 THEN
 RAISE EXCEPTION 'PATA_INVALID_INPUT'; END IF;
 INSERT INTO pata_availability_days(pickup_date) VALUES(p_date)
 ON CONFLICT(pickup_date) DO NOTHING;
 SELECT * INTO STRICT v_day FROM pata_availability_days WHERE pickup_date=p_date FOR UPDATE;
 SELECT * INTO v_old FROM pata_orders WHERE request_key=p_key;
 IF FOUND THEN
 IF v_old.pickup_date<>p_date OR v_old.quantity<>p_qty
 OR v_old.customer_name<>trim(p_name) OR v_old.customer_email<>lower(trim(p_email))
 OR v_old.customer_phone<>trim(p_phone)
 OR v_old.notes IS DISTINCT FROM nullif(trim(coalesce(p_notes,'')),'')
 THEN RAISE EXCEPTION 'PATA_IDEMPOTENCY_CONFLICT'; END IF;
 IF v_old.status<>'HELD' OR v_old.hold_expires_at<=now()
 THEN RAISE EXCEPTION 'PATA_HOLD_EXPIRED'; END IF;
 RETURN QUERY SELECT v_old.id,v_old.hold_expires_at; RETURN;
 END IF;
 IF v_day.blocked THEN RAISE EXCEPTION 'PATA_DATE_BLOCKED'; END IF;
 SELECT coalesce(sum(quantity),0)::integer INTO v_taken FROM pata_orders
 WHERE pickup_date=p_date AND
 (status IN('PAYMENT_PENDING','PAID','MANUAL_CONFIRMED','REFUND_REQUIRED')
 OR(status='HELD' AND hold_expires_at>now()));
 IF v_taken+p_qty>v_day.capacity THEN RAISE EXCEPTION 'PATA_CAPACITY_FULL'; END IF;
 v_until:=now()+interval '15 minutes';
 INSERT INTO pata_orders(request_key,pickup_date,quantity,customer_name,customer_email,
 customer_phone,notes,status,hold_expires_at)
 VALUES(p_key,p_date,p_qty,trim(p_name),lower(trim(p_email)),trim(p_phone),
 nullif(trim(coalesce(p_notes,'')),''),'HELD',v_until)
 RETURNING id INTO v_id;
 RETURN QUERY SELECT v_id,v_until;
END $$;

CREATE OR REPLACE FUNCTION pata_manual_booking(
 p_date date,p_qty integer,p_name text,p_phone text,p_notes text
) RETURNS uuid LANGUAGE plpgsql AS $$
DECLARE v_day pata_availability_days%ROWTYPE; v_taken integer; v_id uuid;
BEGIN
 IF p_date IS NULL OR p_qty NOT BETWEEN 1 AND 3
 OR length(trim(p_name)) NOT BETWEEN 2 AND 100
 OR length(coalesce(p_phone,''))>30 OR length(coalesce(p_notes,''))>500
 THEN RAISE EXCEPTION 'PATA_INVALID_INPUT'; END IF;
 INSERT INTO pata_availability_days(pickup_date) VALUES(p_date)
 ON CONFLICT(pickup_date) DO NOTHING;
 SELECT * INTO STRICT v_day FROM pata_availability_days WHERE pickup_date=p_date FOR UPDATE;
 IF v_day.blocked THEN RAISE EXCEPTION 'PATA_DATE_BLOCKED'; END IF;
 SELECT coalesce(sum(quantity),0)::integer INTO v_taken FROM pata_orders
 WHERE pickup_date=p_date AND
 (status IN('PAYMENT_PENDING','PAID','MANUAL_CONFIRMED','REFUND_REQUIRED')
 OR(status='HELD' AND hold_expires_at>now()));
 IF v_taken+p_qty>v_day.capacity THEN RAISE EXCEPTION 'PATA_CAPACITY_FULL'; END IF;
 INSERT INTO pata_orders(pickup_date,quantity,customer_name,customer_phone,notes,source,status)
 VALUES(p_date,p_qty,trim(p_name),nullif(trim(coalesce(p_phone,'')),''),
 nullif(trim(coalesce(p_notes,'')),''),'MANUAL','MANUAL_CONFIRMED')
 RETURNING id INTO v_id;
 RETURN v_id;
END $$;

CREATE OR REPLACE FUNCTION pata_configure_day(
 p_date date,p_capacity integer,p_blocked boolean,p_note text
) RETURNS void LANGUAGE plpgsql AS $$
DECLARE v_taken integer;
BEGIN
 IF p_date IS NULL OR p_capacity NOT BETWEEN 0 AND 3
 OR length(coalesce(p_note,''))>250 THEN RAISE EXCEPTION 'PATA_INVALID_INPUT'; END IF;
 INSERT INTO pata_availability_days(pickup_date) VALUES(p_date)
 ON CONFLICT(pickup_date) DO NOTHING;
 PERFORM 1 FROM pata_availability_days WHERE pickup_date=p_date FOR UPDATE;
 SELECT coalesce(sum(quantity),0)::integer INTO v_taken FROM pata_orders
 WHERE pickup_date=p_date AND
 (status IN('PAYMENT_PENDING','PAID','MANUAL_CONFIRMED','REFUND_REQUIRED')
 OR(status='HELD' AND hold_expires_at>now()));
 IF p_capacity<v_taken THEN RAISE EXCEPTION 'PATA_CAPACITY_BELOW_BOOKED'; END IF;
 UPDATE pata_availability_days SET capacity=p_capacity,blocked=p_blocked,
 note=nullif(trim(coalesce(p_note,'')),''),updated_at=now()
 WHERE pickup_date=p_date;
END $$;

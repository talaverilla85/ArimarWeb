-- AriMar pata asada: fase 1 / migración propuesta para PostgreSQL.
-- NO ejecutar automáticamente contra producción.
CREATE TABLE IF NOT EXISTS pata_availability_days (
  pickup_date date PRIMARY KEY,
  capacity smallint NOT NULL DEFAULT 3 CHECK (capacity BETWEEN 0 AND 3),
  blocked boolean NOT NULL DEFAULT false,
  note text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS pata_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pickup_date date NOT NULL REFERENCES pata_availability_days(pickup_date),
  quantity smallint NOT NULL CHECK (quantity BETWEEN 1 AND 3),
  unit_price_cents integer NOT NULL DEFAULT 9000 CHECK (unit_price_cents = 9000),
  amount_cents integer GENERATED ALWAYS AS (quantity * unit_price_cents) STORED,
  customer_name varchar(100) NOT NULL,
  customer_email varchar(254) NOT NULL,
  customer_phone varchar(30) NOT NULL,
  notes varchar(500),
  status varchar(24) NOT NULL DEFAULT 'HELD'
    CHECK (status IN ('HELD','PAYMENT_PENDING','PAID','FAILED','CANCELED','EXPIRED','REFUND_REQUIRED','REFUNDED')),
  hold_expires_at timestamptz,
  monei_payment_id varchar(100) UNIQUE,
  monei_order_id varchar(40) UNIQUE,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pata_orders_day_status ON pata_orders(pickup_date,status,hold_expires_at);
CREATE TABLE IF NOT EXISTS pata_payment_events (
  payment_id varchar(100) NOT NULL,
  event_status varchar(40) NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  raw_digest varchar(64) NOT NULL,
  PRIMARY KEY (payment_id,event_status,raw_digest)
);
-- Toda modificación de inventario/pedido debe bloquear primero la fila
-- pata_availability_days de la fecha con SELECT ... FOR UPDATE,
-- antes de calcular SUM(quantity) para PAID, PAYMENT_PENDING y HELD no caducadas.
-- El vencimiento de una retención NO implica que MONEI haya cancelado el pago.
-- En PAYMENT_PENDING NO liberar unidades hasta cancelar/verificar
-- definitivamente el pago, para evitar cobros tardíos con sobreventa.

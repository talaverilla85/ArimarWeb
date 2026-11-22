-- AriMar / Avisos Telegram para reservas de pata confirmadas.
-- Una fila por reserva. Se impide el encolado duplicado incluso con reintentos.
-- Telegram no dispone de clave de idempotencia de entrega: una caida entre enviar
-- y confirmar en BD podria volver a enviar; el mensaje lleva su referencia.
-- No se envian avisos por reservas antiguas: solo se encolan nuevas confirmaciones.

CREATE TABLE IF NOT EXISTS public.pata_booking_notification_queue (
  order_id uuid PRIMARY KEY REFERENCES public.pata_orders(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  claimed_at timestamptz,
  sent_at timestamptz,
  attempts integer NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  last_error varchar(100)
);

CREATE INDEX IF NOT EXISTS pata_booking_notification_pending_idx
ON public.pata_booking_notification_queue (next_attempt_at, created_at)
WHERE sent_at IS NULL;

CREATE OR REPLACE FUNCTION public.pata_enqueue_confirmed_telegram()
RETURNS trigger LANGUAGE plpgsql AS $
DECLARE should_enqueue boolean := false;
BEGIN
  IF NEW.status IN ('MANUAL_CONFIRMED','PAID') THEN
    IF TG_OP = 'INSERT' THEN
      should_enqueue := true;
    ELSIF OLD.status IS DISTINCT FROM NEW.status THEN
      should_enqueue := true;
    END IF;
  END IF;
  IF should_enqueue THEN
    INSERT INTO public.pata_booking_notification_queue (order_id)
      VALUES (NEW.id)
      ON CONFLICT (order_id) DO NOTHING;
  END IF;
  RETURN NEW;
END $;

DO $$
BEGIN
 IF NOT EXISTS (
   SELECT 1 FROM pg_trigger
   WHERE tgrelid='public.pata_orders'::regclass
     AND tgname='pata_confirmed_telegram_enqueue'
     AND NOT tgisinternal
 ) THEN
   CREATE TRIGGER pata_confirmed_telegram_enqueue
   AFTER INSERT OR UPDATE OF status ON public.pata_orders
   FOR EACH ROW
   EXECUTE FUNCTION public.pata_enqueue_confirmed_telegram();
 END IF;
END $$;

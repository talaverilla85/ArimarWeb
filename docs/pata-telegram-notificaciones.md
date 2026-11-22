# Avisos de nuevas reservas de pata asada — Telegram

Se envía un aviso cuando un encargo nuevo pasa a `MANUAL_CONFIRMED`
(administración o mostrador), o a `PAID` (cuando se active el pago
online). Los intentos de pago, los bloqueos HELD y las consultas
por WhatsApp NO disparan una confirmación.

## Activación
1. Aplicar `db/pata-reservas/009_telegram_notifications.sql` a Neon.
   La migración es no destructiva y no envía avisos antiguos.
2. Crear/configurar en Vercel variables de **producción** cifradas:
   - `PATA_TELEGRAM_BOT_TOKEN`: token del bot de AriMar.
   - `PATA_TELEGRAM_CHAT_ID`: identificador numérico del chat o grupo
     autorizado. Antes hay que abrir el bot con /start o añadirlo al grupo.
   - `CRON_SECRET`: cadena aleatoria de al menos 32 caracteres
     (configurada por separado para autenticar el reintento).
3. Publicar de nuevo el proyecto después de definir las variables.
4. Registrar una **reserva real nueva** desde mostrador o administrador
   y comprobar que llega un único aviso con la referencia correcta.

## Fiabilidad
- Una nueva confirmación inserta exactamente una entrada en
  `pata_booking_notification_queue`, en la misma transacción de la reserva.
- El backend intenta entregar el mensaje al confirmar la reserva.
  Un fallo de Telegram NO revierte la reserva.
- El proceso de reintento protegido por `CRON_SECRET` se ejecuta
  diariamente (08:00 UTC), con limitación de envíos por ejecución.
- Antes de enviar se comprueba que la reserva sigue confirmada.
- En caso de fallo de red queda pendiente para un reintento.
- Telegram no ofrece idempotencia para el método `sendMessage`;
  en el caso excepcional de que Telegram reciba un mensaje y falle
  el registro del éxito en Neon, podría reenviarse. La referencia
  permite identificar ese posible duplicado.
- Esta cola no es un histórico de avisos de reservas anteriores.
- Mantener los tokens únicamente como variables de entorno del servidor:
  nunca en cliente, repositorio o registros.

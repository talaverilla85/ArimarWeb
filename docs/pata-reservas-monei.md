# Pata asada · Reservas online (fase 1, sin cobros reales)

Branch aislada: `feature/pata-reservas-monei-sandbox`. No modificar página publicada ni SEO hasta superar pruebas.

## Situación comprobada
- Next.js 15 App Router en `ArimarWeb`, formulario actual `app/pata-asada-gran-canaria/SolicitarPata.tsx`.
- Configuración existente `lib/pataAsadaConfig.ts`: 90 €, 7,5 kg final con hueso, 10,5 kg crudo, máximo 3 patas/día.
- Regla actual de fechas: Canarias; después de las 16:00 cuenta siguiente día operativo; lunes-jueves +2 días; viernes-domingo martes próximo. Conservar y validar también en servidor.
- La página pública contiene metadata, canonical y JSON-LD Product/Offer: preservar.

## Componentes previstos
1. PostgreSQL persistente (migración propuesta `db/pata-reservas/001_init.sql`).
2. GET /api/pata-asada/availability?from=&to= (sólo capacidades, sin datos privados).
3. POST /api/pata-asada/reservations (fecha, unidades, contacto; crear retención atómica con bloqueo de fila de fecha).
4. POST /api/pata-asada/checkout (solo reserva válida; llamada servidor a MONEI test; devuelve URL de hosted checkout).
5. POST /api/pata-asada/monei-callback (cuerpo original + MONEI-Signature, clave test y procesamiento idempotente).
6. GET /api/pata-asada/orders/[id]/status (token de acceso a pedido; nunca datos personales por ID público).
7. Panel autenticado: calendario de capacidad 0-3, bloqueo de días, pedidos PAID, incidencias; acción manual de reembolso sujeto a comprobación.

## Invariantes de seguridad
- Capacidad máxima por fecha: 3; jamás fiarse del contador del navegador.
- Toda escritura concurrente bloquea fila de fecha en una transacción DB.
- Guardar precios en servidor en céntimos: 9000, 18000, 27000.
- Retención breve inicial (propuesta: 15 minutos); al iniciar checkout pasar a PAYMENT_PENDING. No liberar PAYMENT_PENDING hasta verificar cancelación o expiración efectiva en MONEI. En cobro tardío conflictivo: REFUND_REQUIRED, no enviar a cocina y escalar.
- Idempotencia de petición/checkout y de callback: un pago no puede producir dos encargos.
- `completeUrl` no confirma el pago; solo webhook firmado y conciliación remota acreditan PAID.
- Verificar signature HMAC con bytes crudos, igualdad temporal constante y ventana de timestamp.
- El correo interno de producción se emite únicamente tras PAID, mediante cola/outbox idempotente; errores no disparan avisos de cocina.
- Rate limit y validación estricta; secretos solo server-side.
- `PATA_CHECKOUT_ENABLED=false` y `MONEI_MODE=test` hasta aprobación expresa.
- Reservas antiguas pendientes por WhatsApp se deben introducir como unidades ocupadas antes de habilitar checkout.

## Dependencias y próximas fases
Fase 2: conectar PostgreSQL y endpoints de disponibilidad, retención, panel privado; pruebas de concurrencia 2+2 y 3+1.
Fase 3: MONEI test Hosted Payment Page (Bizum/tarjeta según métodos habilitados), callbacks firmados y conciliación.
Fase 4: UI sobre el formulario actual en modo preview, pruebas E2E, SEO, accesibilidad y email.
Fase 5: despliegue controlado; cobros reales seguirán bloqueados hasta verificación y autorización del negocio.

Documentación MONEI:
- https://docs.monei.com/apis/rest/payments-create/
- https://docs.monei.com/integrations/use-prebuilt-payment-page/
- https://docs.monei.com/guides/verify-signature/
- https://docs.monei.com/guides/webhooks/

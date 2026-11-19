# Pata asada AriMar — pendientes y criterios de aceptación

## Disponible en la rama de pruebas
- PostgreSQL aislado, máximo tres patas por día, bloqueos y encargos manuales.
- Panel de administración mensual y lista de encargos.
- API pública sin notas ni datos de clientes y calendario propio (activable solo con \`NEXT_PUBLIC_PATA_CALENDAR_PREVIEW=true\`).
- El calendario enseña **solo** fechas con suficiente capacidad para las unidades seleccionadas; fechas bloqueadas, completas, fuera de la ventana y fechas que infringen las reglas de 16:00 Canarias/antelación no son elegibles.
- Al pulsar Enviar, se vuelve a consultar disponibilidad. **Por ahora se abre WhatsApp: no hay retención real, email ni pago automático.** No garantizar stock hasta que la reserva atómica y el checkout estén integrados.

## Pendiente: cobro y confirmación online
1. Conectar formulario del cliente a \`POST /api/pata-asada/reservations\` y a checkout de **MONEI solo en test** (Bizum/tarjeta si la cuenta admite ambos métodos).
2. Verificar webhook firmado y reintentos idempotentes; no dar por pagado un redireccionamiento del navegador.
3. Gestionar expiración de reservas y pagos en curso de modo que no se venda una cuarta pata, incluso con clientes simultáneos.
4. **Nuevo: correo de confirmación al cliente con número único de reserva.** Añadir un email obligatorio al formulario antes del checkout, validarlo en servidor, y crear un identificador público único, inmutable, por ejemplo \`PA-051226-0001\` (ejemplo: pago confirmado el 5 de diciembre de 2026; no es un código asignado). Guardarlo en la base de datos con índice único, mostrarlo en panel y en la página de confirmación. El mensaje debe incluir nombre, referencia, fecha de recogida, cantidad, importe total, dirección de AriMar, horario de recogida 11:30–16:00, condiciones de modificación/cancelación y contacto.
5. Enviar el correo **únicamente al confirmar MONEI el pago** (\`PAID\`) mediante outbox / cola idempotente y proveedor de email (ej. Resend), con registro de \`sent_at\`, reintento controlado y protección contra duplicados. No emitir comprobante de pago ni reserva confirmada con \`HELD\` o \`PAYMENT_PENDING\`. Reservas manuales: correo solo al registrar explícitamente pago/confirmación, nunca por crear un contacto. No suponer que los encargos manuales están pagados.
6. Correo de notificación interna a AriMar tras pago confirmado, con el mismo identificador de reserva, y conexión con Gestión AriMar (tablet/TV).
7. Pruebas E2E de calendario, concurrencia 2+2, cierre de sesión, privacidad, MONEI test, correos de prueba, rebotes, fallos y reintentos. Mantener SEO existente (Product/Offer/FAQ/canonical).
8. Conciliar pendientes manuales y revisar transiciones antes de habilitar **cobros reales** y migrar el formulario de producción.

## Protección
- \`NEXT_PUBLIC_PATA_CALENDAR_PREVIEW\` solo en entorno preview de la rama, no producción.
- \`PATA_PUBLIC_HOLDS_ENABLED=false\` hasta implementar checkout/caducidad/conciliación.
- El calendario de la página pública y la base de prueba pueden tener encargos **ficticios**. No reutilizar sin limpieza verificada en producción.

## Referencia corta de reserva (aplicado en Neon de pruebas)
- Formato final: **PA-DDMMAA-NNNN**, ejemplo \`PA-191126-0001\`. Contador PostgreSQL atómico que se reinicia cada día; incrementa por todas las reservas confirmadas, nunca por meras consultas/retenciones.
- Reserva WEB: se asigna solo después del webhook \`SUCCEEDED\` verificado y no se muestra el identificador temporal del pedido. La fecha corresponde a \`updatedAt\` de MONEI (Unix segundos), convertido a hora de Canarias. Si el proveedor no proporciona un instante válido, se usa la hora de confirmación del servidor.
- Encargo MANUAL: puede recibir el mismo formato al registrarse, pero **la fecha representa la confirmación manual, NO acredita que esté pagado**. Debe figurar como \`MANUAL_CONFIRMED\`.
- Las referencias anteriores ya generadas se conservan para no renumerar pedidos históricos. Los números no tienen que ser consecutivos en la lista de pagos online porque pueden incluir encargos manuales.
- Migraciones: \`004_short_references.sql\` y \`005_payment_timestamp_reference.sql\` (ya aplicadas solo en Neon sandbox). El correo/outbox utiliza la referencia tras confirmar pago.


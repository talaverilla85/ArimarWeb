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
4. **Nuevo: correo de confirmación al cliente con número único de reserva.** Añadir un email obligatorio al formulario antes del checkout, validarlo en servidor, y crear un identificador público único, inmutable, por ejemplo \`PA-20261205-K8F4Z2\` (solo ejemplo, no un código asignado). Guardarlo en la base de datos con índice único, mostrarlo en panel y en la página de confirmación. El mensaje debe incluir nombre, referencia, fecha de recogida, cantidad, importe total, dirección de AriMar, horario de recogida 11:30–16:00, condiciones de modificación/cancelación y contacto.
5. Enviar el correo **únicamente al confirmar MONEI el pago** (\`PAID\`) mediante outbox / cola idempotente y proveedor de email (ej. Resend), con registro de \`sent_at\`, reintento controlado y protección contra duplicados. No emitir comprobante de pago ni reserva confirmada con \`HELD\` o \`PAYMENT_PENDING\`. Reservas manuales: correo solo al registrar explícitamente pago/confirmación, nunca por crear un contacto. No suponer que los encargos manuales están pagados.
6. Correo de notificación interna a AriMar tras pago confirmado, con el mismo identificador de reserva, y conexión con Gestión AriMar (tablet/TV).
7. Pruebas E2E de calendario, concurrencia 2+2, cierre de sesión, privacidad, MONEI test, correos de prueba, rebotes, fallos y reintentos. Mantener SEO existente (Product/Offer/FAQ/canonical).
8. Conciliar pendientes manuales y revisar transiciones antes de habilitar **cobros reales** y migrar el formulario de producción.

## Protección
- \`NEXT_PUBLIC_PATA_CALENDAR_PREVIEW\` solo en entorno preview de la rama, no producción.
- \`PATA_PUBLIC_HOLDS_ENABLED=false\` hasta implementar checkout/caducidad/conciliación.
- El calendario de la página pública y la base de prueba pueden tener encargos **ficticios**. No reutilizar sin limpieza verificada en producción.

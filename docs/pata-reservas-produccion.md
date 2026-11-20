# AriMar — Pata asada: sistema de producción y laboratorio independiente

- Página real: `/pata-asada-gran-canaria` con calendario, modal diseñado para móvil y formulario que abre WhatsApp. No se han activado cobros, retenciones o correos automáticos.
- Panel de producción: `/admin/pata-asada`. Control de bloqueos, capacidad 0–3, reservas manuales y listado de encargos. Protegido mediante contraseña privada y sesión HttpOnly; PWA instalable sin passkeys activas.
- Neon producción: `arimar-pata-reservas-produccion` `solitary-pond-46590390`; nueva base limpia sin datos ficticios. La web real solo consulta esta base para mostrar fechas disponibles; el administrador modifica fechas.
- IMPORTANTE: registrar todos los encargos **ya confirmados** por WhatsApp antes de confiar en el recuento público. Una mera solicitud por WhatsApp no descuenta existencias hasta confirmarla manualmente.
- Variables de producción: `PATA_DATABASE_URL`, `PATA_RESERVAS_ENABLED=true`, `PATA_PUBLIC_AVAILABILITY_ENABLED=true`, `PATA_PUBLIC_HOLDS_ENABLED=false`, `PATA_ADMIN_PASSWORD`, `PATA_ADMIN_SESSION_SECRET`. No habilitar pagos hasta completar revisión.
- Desarrollo separado: rama `feature/pata-reservas-monei-sandbox` y Neon `soft-flower-21317287` con registros de prueba. La rama y datos de prueba no deben apuntar a producción.
- Futuras funciones de laboratorio: webhook MONEI firmado, asignación PA-DDMMAA-0001 al pago, correo de confirmación, pagos e incidencias, control de sesiones e integración interna de gestión. No se fusionan directamente a producción.
- No se ha alterado `app/pata-asada-gran-canaria/page.tsx` ni sus datos estructurados SEO/metadata/canonical.

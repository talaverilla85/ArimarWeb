# AriMar · Panel de mostrador de pata asada (desarrollo)

## Objetivo y roles
- **Administración**: \`/admin/pata-asada\`. Bloquea fechas, ajusta capacidad 0–3, ve todos los encargos, registra manuales y anula manuales con motivo. La anulación libera unidades; NO hace reembolsos.
- **Mostrador**: \`/mostrador/pata-asada\`. Contraseña y cookie propias (ruta exclusivamente \`/api/pata-asada/staff\`), selector móvil de fecha y creación de encargos presenciales. No puede acceder a API administrativa, bloquear días, cambiar capacidad ni marcar cobros.
- Misma base de datos por entorno: en pruebas, Neon sandbox \`soft-flower-21317287\`. Producción usaría Neon aislado \`solitary-pond-46590390\`. **Nunca compartir las dos**.
- Credenciales independientes: \`PATA_STAFF_PASSWORD\` (mínimo 20 caracteres) y \`PATA_STAFF_SESSION_SECRET\` (mínimo 32), siempre **secretas y server-side**; no usar \`NEXT_PUBLIC_\`. Sesión HttpOnly Secure SameSite=strict (8 h), comprobación de origin en escrituras y sin indexación de la página. El nombre del operador se introduce en el formulario (no equivale a cuenta individual verificada).

## Flujo en mostrador
1. El dependiente entra con la contraseña exclusiva de mostrador y escribe su nombre.
2. Selecciona una fecha en el calendario conectado a los bloqueos y las unidades restantes.
3. Introduce nombre del cliente, teléfono, unidades y observaciones opcionales. Precio: 90 €/pieza; retirada 11:30–16:00.
4. Confirma. La operación PostgreSQL bloquea la fila del día y cuenta **todas** las reservas vigentes: nunca supera tres unidades/día.
5. El servidor devuelve referencia \`PA-DDMMAA-0001\`. Se puede copiar el resumen.
6. El pedido aparece en el panel administrativo junto al nombre del dependiente. El estado \`MANUAL_CONFIRMED\` **no significa que esté cobrado**; el empleado debe gestionar cobro/anticipo por otro canal.
7. En caso de error, solo administración puede anular la reserva con motivo, liberando las unidades sin borrar el historial.

## Reglas y seguridad
- Mostrador respeta el mismo mínimo de antelación y corte de las 16:00 (Atlantic/Canary) que la web, y admite hasta 62 días desde la fecha operativa.
- La función \`pata_staff_booking\` recibe UUID de idempotencia; dos solicitudes idénticas con la misma clave devuelven **la misma** reserva, y el servidor rechaza reutilizar esa clave con datos diferentes.
- No se envían correos ni se generan cobros mediante este panel.
- No conceder al staff acceso directo a Neon, contraseñas de administración ni variables de entorno.
- La contraseña compartida con el nombre introducido es una **fase inicial**. Para trazabilidad individual real, evolución futura: una cuenta y autorización por empleado.

## Estado
- \`006_staff_counter.sql\` aplicada y comprobada únicamente en Neon de pruebas. Validado: 1 reserva de 2 patas, reintento idéntico no duplica, otra de 2 falla por capacidad, cancelación libera disponibilidad.
- Pendiente tras revisar Vercel: pruebas en teléfono real de login, selección, teclados, errores, cierre de sesión y visibilidad en admin; autorización para desplegar a producción; migración aditiva en Neon real.
- Mantener estable \`/pata-asada-gran-canaria\`, su foto, vídeo y SEO.

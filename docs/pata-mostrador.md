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

## Trazabilidad de cobros de encargos manuales (007_manual_payment_trace.sql)
- Formulario **Administración → fecha → Reserva manual**: forma de pago `Pendiente`, `Tarjeta`, `Efectivo`, `Monei`; si no es pendiente, fecha de pago (puede ser anterior a la fecha de recogida, nunca posterior al día actual de Canarias) y número de ticket/factura obligatorios (máximo 100 caracteres).
- Fecha de pago y fecha de **recogida** son distintas: se guardan en columnas separadas. El número de ticket es una referencia externa para localizar la venta, no genera factura ni comprueba fiscalidad.
- Si queda `Pendiente`, la reserva igualmente ocupa stock (estado `MANUAL_CONFIRMED`). Puede completarse una sola vez en el modal **Ajustes → Encargos registrados para este día → Registrar cobro pendiente**. Solo administración; el mostrador sigue sin registrar cobros.
- `MONEI` aquí es una anotación **manual** del administrador; NO es confirmación criptográfica del proveedor ni altera los estados web `PAID` o `PAYMENT_PENDING`.
- La base PostgreSQL valida método, fecha, ticket y coherencia pendiente/pagado; reserva + registro inicial se hacen en una misma transacción mediante `pata_admin_booking_with_payment`. El cobro posterior se realiza con `pata_admin_complete_manual_payment` solo si previamente estaba pendiente.
- En las listas administrativas se muestran método, fecha de pago y número de ticket. Migración 007 aplicada exclusivamente en Neon **sandbox**; producción no modificada.
- Validación sandbox: reserva efectivo+ticket, otra pendiente que se completa a tarjeta+ticket, comprobación de persistencia y anulación de ambas pruebas. Build Vercel de la rama de pruebas verificado.

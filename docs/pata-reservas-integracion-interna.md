# Integración privada — encargos de pata asada

Los encargos se almacenan de forma persistente en la tabla PostgreSQL `pata_orders` de la base Neon dedicada, no en el navegador.

## Panel de control
- Calendario mensual y reservas manuales: `/admin/pata-asada`.
- La sección «Próximos encargos confirmados» consulta `GET /api/pata-asada/admin/upcoming`; utiliza una sesión de administrador y páginas de 40 registros, sin límite de mes o año.
- El listado incluye exclusivamente `PAID` (online verificado) y `MANUAL_CONFIRMED` (introducido manualmente por personal). Los estados `HELD`, `PAYMENT_PENDING`, `FAILED`, `REFUND_REQUIRED` no aparecen como encargos confirmados.
- `GET /api/pata-asada/admin/orders?from=YYYY-MM-DD&to=YYYY-MM-DD` sigue disponible para consulta por mes e incidencias.

## API de integración para la webapp interna (NO habilitada)
`GET /api/pata-asada/internal/orders?from=YYYY-MM-DD&to=YYYY-MM-DD&view=summary`

- Requiere HTTPS y cabecera `Authorization: Bearer <TOKEN>`.
- Variables del servidor: `PATA_INTERNAL_ORDERS_ENABLED=true` y `PATA_INTERNAL_API_TOKEN` aleatorio de >=32 caracteres. Por defecto el endpoint responde 503.
- Solo consultas GET, jamás modificación de inventario o cobros.
- Rango máximo: 32 días. No almacena ni expone el token en navegador, tablet o reproductor de TV. La webapp de gestión hará la petición DESDE SU PROPIO SERVIDOR.
- `view=summary` (por defecto): cantidades de patas y número de encargos por fecha, sin datos personales; ideal TV y avisos de producción.
- `view=detail`: `id`, `pickupDate`, `quantity`, `customerName`, `source`, `status`, `amountCents` y `notes`. Sin teléfono ni correo; usar únicamente en vista interna restringida.
- Se filtra por estados `PAID` y `MANUAL_CONFIRMED`. Un pedido manual confirmado NO implica que el dinero esté cobrado.
- Respuesta `Cache-Control: no-store`; se recomienda sincronización periódica desde la webapp interna y alertas solo al recibir nuevos IDs. Al conectarlo, añadir auditoría, rotación de token y límites de tasa.
- API y DB de **pruebas**: hay pedidos ficticios con fechas 2099. Nunca mezclarlos con producción.

No activar `PATA_INTERNAL_ORDERS_ENABLED` ni instalar credenciales en dispositivos de sala hasta que la webapp interna pueda autenticar el servidor correctamente.

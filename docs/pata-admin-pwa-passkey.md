# AriMar — Instalación PWA y autenticación biométrica (preview)

## Estado
- PWA instalable: manifest con scope `/admin/pata-asada/`, iconos PNG generados y service worker solo de red. **No** almacenar caché de encargos, nombres, teléfonos, cookies o contraseñas.
- Passkeys WebAuthn: migración `db/pata-reservas/002_passkeys.sql` y endpoints servidor para registrar y verificar **un solo** autenticador autorizado.
- Todas las operaciones siguen protegidas con cookies HttpOnly, HTTPS, retos WebAuthn de un solo uso (5 min) en Neon, verificación de firma y verificación de usuario.
- La biometría/huella se comprueba por Android y no se almacena en nuestros servidores.

## Origen autorizado
Solo usar la URL de preview estable:
`https://arimar-web-git-feature-pata-rese-d67713-noe-s-projects-deb823a5.vercel.app/admin/pata-asada`

La passkey está vinculada criptográficamente al dominio de instalación. Si el panel pasa a `arimarfoodlab.es` será necesario volver a registrar la credencial en ese dominio.

## Configuración del servidor
- `PATA_PASSKEYS_ENABLED=true`
- `PATA_WEBAUTHN_ORIGIN=https://arimar-web-git-feature-pata-rese-d67713-noe-s-projects-deb823a5.vercel.app`
- `PATA_REQUIRE_DEVICE_BOUND_PASSKEY=true`: rechaza credenciales sincronizables. Algunos Android **no pueden generar** credenciales de una sola máquina desde Chrome; si sucede, no engañar diciendo que está limitado a ese móvil. Plantear llave FIDO2 hardware o controles de dispositivo alternativos.
- `PATA_ADMIN_PASSKEY_ONLY=false`: conserva la contraseña durante la configuración.
- `PATA_ADMIN_PASSKEY_ONLY=true`: tras registrar y **probar acceso de nuevo con passkey**, bloquea futuros inicios por contraseña. Deben revocarse sesiones previas y rotarse `PATA_ADMIN_SESSION_SECRET` al activar el modo definitivo.
- No activar estas variables en producción por accidente; conservar el proyecto en su rama preview hasta validarlo.

## Pasos en móvil
1. Abrir la URL preview estable en Chrome móvil y acceder con sesión de Vercel y contraseña del panel.
2. Pulsar «Instalar webapp», o usar el menú Chrome → «Instalar aplicación».
3. En el panel, pulsar «Registrar este dispositivo». Android pedirá la huella, PIN o patrón según la configuración del sistema.
4. Si la credencial es sincronizable, modo estricto la rechazará. **No** se ha guardado ninguna passkey en ese caso.
5. Si registro correcto, pulsar «Salir» y desde la PWA entrar con «Entrar con huella o PIN». Confirmar que aparecen los encargos.
6. **Solo entonces**, habilitar modo `PATA_ADMIN_PASSKEY_ONLY=true`, rotar secreto de sesiones y crear procedimiento de recuperación manual para pérdida/robo del móvil.

## Limitaciones y seguridad
- Instalar una PWA no implica dispositivo exclusivo ni bloqueo biométrico automático.
- WebAuthn permite autenticación local mediante PIN/patrón como alternativa a huella.
- Una passkey **sincronizable** puede utilizarse desde otros dispositivos de la misma cuenta; si se requiere exclusividad real, debe ser `singleDevice`.
- Aunque solo haya una passkey, sesiones activas/cookies podrían autorizarse en otros dispositivos hasta revocarlas. Rotar sesiones tras el corte.
- La webapp puede abrirse desde otros navegadores, pero sin una credencial válida el servidor no debe revelar datos.
- Evitar bloqueos irreversibles: documentar recuperación mediante administrador del entorno Neon/Vercel y registrar el proceso de revocación/reasignación. No se implementa automáticamente una puerta trasera.
- Protección de intentos de contraseña y políticas adicionales deben auditarse antes de activar producción. La contraseña actual sigue funcionando en este momento.

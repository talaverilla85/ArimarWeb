# AriMar - Web de Comida para Llevar

Web corporativa para AriMar, comida para llevar en Playa de Arinaga, Gran Canaria.

## Tecnologías

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**

## Características

- ✅ Diseño moderno y minimalista estilo premium
- ✅ Header fijo con navegación
- ✅ SEO optimizado con metadata, OpenGraph y JSON-LD
- ✅ Páginas completas: Home, Carta, Nuestra Cocina, Valores, Contacto, Pedir, Alérgenos
- ✅ Páginas legales: Aviso Legal, Privacidad, Cookies
- ✅ Botón flotante "Pedir ahora" en página de carta
- ✅ Redirección automática a Qamarero en /pedir
- ✅ Placeholder para Google Analytics (GA4)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Build de Producción

```bash
npm run build
npm start
```

## Configuración

### Google Analytics

Para activar Google Analytics, reemplaza `GA_MEASUREMENT_ID` en `app/layout.tsx` con tu ID de medición de GA4.

### URL de Qamarero

Actualiza la URL de redirección en `app/pedir/page.tsx` con la URL real de tu tienda en Qamarero.

### WhatsApp

Actualiza el número de WhatsApp en `app/contacto/page.tsx` con tu número real (formato: 34600000000 sin el +).

### Carta de alérgenos (AriMar Gestión)

La página pública `/alergenos` y la API interna `/api/carta-alergenos` obtienen elaboraciones y alérgenos desde **AriMar Gestión** (login servidor + `GET /catalog/products`). No usa APPCC.

**Variables de entorno** (copiar desde `.env.example`):

| Variable | Dónde |
|----------|--------|
| `ARIMAR_API_URL` | Host HTTPS de Gestión (ej. `https://gestion.arimarfoodlab.es`); se usa `/api-backend` automáticamente |
| `ARIMAR_LOGIN_EMAIL` | Cuenta con acceso al catálogo |
| `ARIMAR_LOGIN_PASSWORD` | Contraseña (solo servidor) |

- **Vercel:** Project → Settings → Environment Variables (Production y Preview).
- **Local:** crear `Web/.env.local` con los mismos valores y `npm run dev`.

Probar: `http://localhost:3000/alergenos` y `http://localhost:3000/api/carta-alergenos` (JSON con `elaboraciones` y `actualizadoEn`). La respuesta se cachea ~10 minutos en el edge.

### Reseñas de Google (home)

La sección al final de la home obtiene nota, total y hasta 5 reseñas vía **Places API** (servidor).

| Variable | Dónde |
|----------|--------|
| `GOOGLE_PLACES_API_KEY` | Google Cloud → Places API → clave restringida a servidor |
| `GOOGLE_PLACE_ID` | Opcional; si se omite, se busca por nombre y dirección |

- **Vercel:** añadir variables y redeploy.
- **Local:** `Web/.env.local` con la clave y `npm run dev`.
- Probar: `http://localhost:3000/api/google-reviews` (JSON) o la home.

**Si no aparecen reseñas:** activa Places API en Google Cloud, revisa la clave y haz redeploy. Opcionalmente define `GOOGLE_PLACE_ID` si la búsqueda automática no encuentra el negocio.

**Si en Vercel no carga la carta de alérgenos:** el dominio de Gestión debe ser **accesible desde internet** (registro DNS + túnel Cloudflare activo). Prueba desde fuera: `curl -X POST "https://TU-DOMINIO/api-backend/auth/login" -H "Content-Type: application/json" -d '{"email":"...","password":"..."}'`. Tras cambiar variables en Vercel, haz **Redeploy**.

## Estructura del Proyecto

```
├── app/
│   ├── page.tsx              # Home
│   ├── carta/
│   ├── nuestra-cocina/
│   ├── valores/
│   ├── contacto/
│   ├── alergenos/
│   ├── api/carta-alergenos/
│   ├── pedir/
│   └── legal/
│       ├── aviso-legal/
│       ├── privacidad/
│       └── cookies/
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
└── ...
```

## Licencia

© 2024 AriMar. Todos los derechos reservados.



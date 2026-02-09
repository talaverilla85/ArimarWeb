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
- ✅ Páginas completas: Home, Carta, Nuestra Cocina, Valores, Contacto, Pedir
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

## Estructura del Proyecto

```
├── app/
│   ├── page.tsx              # Home
│   ├── carta/
│   ├── nuestra-cocina/
│   ├── valores/
│   ├── contacto/
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



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Inline critical CSS en el HTML para reducir la cadena crítica (HTML → CSS)
  // y mejorar FCP/LCP. Experimental en Next 15; ideal con Tailwind (CSS atómico).
  experimental: {
    inlineCss: true,
  },
}

module.exports = nextConfig



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Inline critical CSS en el HTML para reducir la cadena crítica (HTML → CSS)
  experimental: {
    inlineCss: true,
    // Carga solo los módulos usados de framer-motion (menos JS en el bundle)
    optimizePackageImports: ['framer-motion'],
  },
}

module.exports = nextConfig



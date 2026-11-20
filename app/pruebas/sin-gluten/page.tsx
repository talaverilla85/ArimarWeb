import { permanentRedirect } from 'next/navigation'

// Vista previa retirada. Conservamos esta ruta únicamente como redirección
// para cualquier enlace de prueba que se haya compartido.
export default function LegacySinGlutenPreviewRedirect() {
  permanentRedirect('/sin-gluten-gran-canaria')
}

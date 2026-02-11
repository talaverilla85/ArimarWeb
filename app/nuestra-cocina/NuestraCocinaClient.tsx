'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function NuestraCocinaClient() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* H1 visible */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight text-center md:text-left">
          Nuestra cocina
        </h1>

        {/* Imagen cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[16/9] rounded-lg overflow-hidden mb-16 bg-slate-100 shadow-sm"
        >
          <Image
            src="/images/cocina-emplatado.webp"
            alt="Cocina y emplatado en AriMar FoodLab"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
            priority
          />
        </motion.div>

        {/* Sección "Cocina con método" */}
        <section className="mb-20" aria-labelledby="metodo-heading">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <h2 id="metodo-heading" className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight">
                Cocina con método
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-800">Selección corta y rotación.</strong> Cocinamos pocas cosas, bien hechas, para que todo esté fresco y se mueva.
                </p>
                <p>
                  <strong className="text-slate-800">Cocciones controladas.</strong> Buscamos el punto exacto y la misma calidad cada día.
                </p>
                <p>
                  <strong className="text-slate-800">Etiqueta clara.</strong> Ingredientes y alérgenos, para que elijas con tranquilidad.
                </p>
                <p>
                  <strong className="text-slate-800">Buenas prácticas y controles.</strong> Trabajamos con orden y limpieza para cuidar el producto.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 shadow-sm"
            >
              <Image
                src="/images/cocina-servicio.webp"
                alt="Cocina en servicio, AriMar FoodLab"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </section>

        {/* Sección RATIONAL */}
        <section className="mb-20" aria-labelledby="rational-heading">
          <h2 id="rational-heading" className="text-3xl md:text-4xl font-bold text-slate-800 mb-10 tracking-tight">
            Cocinamos con RATIONAL
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-md order-2 lg:order-1"
            >
              <Image
                src="/images/cocina-rational.webp"
                alt="Horno RATIONAL en cocina profesional de AriMar FoodLab"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 text-slate-600 leading-relaxed order-1 lg:order-2"
            >
              <p>
                En AriMar FoodLab trabajamos con tecnología RATIONAL para que el resultado sea constante: platos con el punto exacto, cada día. Nuestra comida para llevar en Playa de Arinaga (Agüimes), Gran Canaria, se elabora con estos equipos para ofrecerte la misma calidad día a día.
              </p>
              <p>
                Método, control y cariño para cocinar mejor y servir mejor: misma textura, mismo sabor, sin pasarse ni quedarse corto.
              </p>
            </motion.div>
          </div>

          <div className="space-y-10 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-3 tracking-tight">Punto exacto y uniformidad</h3>
              <p className="text-slate-600 leading-relaxed max-w-3xl">
                Controlamos cocción y clima para repetir el mismo resultado una y otra vez. Para ti significa algo simple: el plato sale igual de bien, vengas hoy o mañana.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-3 tracking-tight">Textura y jugosidad</h3>
              <p className="text-slate-600 leading-relaxed max-w-3xl">
                Una cocción bien medida evita pasarse o quedarse corto. Se nota en texturas más agradables, salsas mejor ligadas y platos que mantienen su punto.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-3 tracking-tight">Menos merma, más calidad</h3>
              <p className="text-slate-600 leading-relaxed max-w-3xl">
                Cuando el proceso está controlado, se improvisa menos. Eso reduce mermas y nos permite mantener una selección corta que rota a diario sin perder nivel.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-3 tracking-tight">Eficiencia y sostenibilidad</h3>
              <p className="text-slate-600 leading-relaxed max-w-3xl">
                Cocinar con método ayuda a optimizar recursos y a reducir desperdicio. Es una forma de cuidar el producto… y también el entorno.
              </p>
              <p className="text-slate-500 text-sm mt-2 italic">
                *El consumo y el ahorro dependen del tipo de plato y del uso real.*
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-3 tracking-tight">Ritmo estable en horas punta</h3>
              <p className="text-slate-600 leading-relaxed max-w-3xl">
                Trabajar con equipos de cocina profesional nos permite producir con consistencia y servir mejor cuando hay más movimiento, sin sacrificar calidad.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-md order-2 lg:order-2"
            >
              <Image
                src="/images/cocina-ivario.webp"
                alt="iVario Pro en cocina profesional de AriMar FoodLab"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <div className="order-1 lg:order-1">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 tracking-tight">¿Qué significa para ti?</h3>
              <ul className="space-y-2 text-slate-600 leading-relaxed list-disc pl-6">
                <li>Platos más constantes: mismo sabor y textura.</li>
                <li>Punto exacto: sin «pasarse» ni quedarse corto.</li>
                <li>Selección corta que rota: más frescura.</li>
                <li>Etiqueta clara: ingredientes y alérgenos.</li>
                <li>Procesos que cuidan el producto.</li>
                <li>Menos desperdicio, más aprovechamiento.</li>
              </ul>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-primary-200/80 bg-primary-50/40 px-6 py-5 text-center"
          >
            <p className="text-slate-700 font-medium">
              Tecnología para cocinar mejor. Sabor para que repitas.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

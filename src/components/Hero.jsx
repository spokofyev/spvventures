import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-6">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-black/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-black/[0.03] blur-3xl pointer-events-none" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-widest text-black/40 mb-6"
        >
          AI Vertical Service Company
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.02] text-black mb-6"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          The AI-native partner for deep tech teams
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-black/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We handle the entire business side—pilots, corporate entry, and M&A—so your R&D team can focus entirely on building.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="px-7 py-3 text-sm font-medium text-white bg-black rounded-full hover:bg-black/80 transition-colors"
          >
            Partner with us
          </a>
          <a
            href="#how-it-works"
            className="px-7 py-3 text-sm font-medium text-black border border-black/20 rounded-full hover:border-black/40 transition-colors"
          >
            How it works ↓
          </a>
        </motion.div>
      </div>
    </section>
  )
}

import { motion, AnimatePresence } from 'framer-motion'

function formatAmount(n) {
  const rounded = Math.round(n * 100) / 100
  const s = rounded.toFixed(2).replace('.', ',')
  return s.endsWith(',00') ? String(Math.round(rounded)) : s
}

export default function SurplusModal({ surplus, onExtend, onSpendMore }) {
  if (!surplus || surplus <= 0) return null

  return (
    <AnimatePresence>
      <motion.div
        key="surplus-backdrop"
        className="fixed inset-0 z-50 flex items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60" onClick={onSpendMore} />

        {/* Sheet */}
        <motion.div
          key="surplus-sheet"
          className="relative w-full rounded-t-3xl overflow-hidden"
          style={{ background: '#1C1C1E' }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/30" />
          </div>

          <div className="px-6 pt-4 pb-10">
            {/* Icon + title */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-white text-xl font-semibold">
                Вы сэкономили вчера
              </h2>
              <p className="text-[#FF9500] text-4xl font-bold mt-2">
                {formatAmount(surplus)}
              </p>
              <p className="text-white/50 text-sm mt-2">
                Как использовать остаток?
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onExtend}
                className="w-full py-4 rounded-2xl text-black font-semibold text-lg"
                style={{ background: '#FF9500' }}
              >
                Продлить срок
              </button>
              <button
                onClick={onSpendMore}
                className="w-full py-4 rounded-2xl text-white font-semibold text-lg"
                style={{ background: '#2C2C2E' }}
              >
                Тратить больше каждый день
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

import { motion } from 'framer-motion'

// Layout: 4 rows. Enter button spans rows 2-4 on the right column.
// Row 1: 7 8 9 ⌫
// Row 2: 4 5 6 [↵ top]
// Row 3: 1 2 3 [↵ mid]
// Row 4: 0 ,   [↵ bot]

const ROW1 = ['7','8','9','⌫']
const ROW2 = ['4','5','6']
const ROW3 = ['1','2','3']
const ROW4 = ['0',',','']

function Key({ label, onPress, className = '' }) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onPointerDown={(e) => { e.preventDefault(); onPress(label) }}
      className={`
        flex items-center justify-center
        text-2xl font-light text-white
        select-none outline-none
        ${className}
      `}
    >
      {label === '⌫' ? (
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
          <path d="M9 1L1 9l8 8M1 9h22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 1H9L1 9l8 8h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M8.293.293A1 1 0 019 0h13a1 1 0 011 1v16a1 1 0 01-1 1H9a1 1 0 01-.707-.293l-8-8a1 1 0 010-1.414l8-8zM9.414 2L2.414 9l7 7H21V2H9.414zm4.293 3.293a1 1 0 011.414 0L17 7.172l1.879-1.879a1 1 0 111.414 1.414L18.414 8.586l1.879 1.879a1 1 0 01-1.414 1.414L17 10l-1.879 1.879a1 1 0 01-1.414-1.414l1.879-1.879-1.879-1.879a1 1 0 010-1.414z" fill="white" fillOpacity="0.7"/>
        </svg>
      ) : label}
    </motion.button>
  )
}

export default function Numpad({ onKey }) {
  const cellH = 'h-[72px]'

  return (
    <div className="grid grid-cols-4 no-select" style={{ gridTemplateRows: 'repeat(4, 72px)' }}>
      {/* Row 1 */}
      {ROW1.map(k => (
        <Key key={k} label={k} onPress={onKey} className={cellH} />
      ))}

      {/* Row 2: 4 5 6 + Enter top */}
      {ROW2.map(k => (
        <Key key={k} label={k} onPress={onKey} className={cellH} />
      ))}
      {/* Enter spans rows 2-4, col 4 — use row-span via grid area */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onPointerDown={(e) => { e.preventDefault(); onKey('↵') }}
        className="bg-[#FF9500] rounded-xl flex items-center justify-center text-white text-3xl font-light select-none outline-none"
        style={{ gridRow: '2 / 5', gridColumn: '4' }}
      >
        ↵
      </motion.button>

      {/* Row 3: 1 2 3 */}
      {ROW3.map(k => (
        <Key key={k} label={k} onPress={onKey} className={cellH} />
      ))}

      {/* Row 4: 0 , (empty) */}
      {ROW4.map((k, i) => (
        <Key key={i} label={k} onPress={onKey} className={`${cellH} ${k === '' ? 'pointer-events-none' : ''}`} />
      ))}
    </div>
  )
}

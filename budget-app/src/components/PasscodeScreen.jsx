import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KEYS = ['1','2','3','4','5','6','7','8','9','','0','⌫']

export default function PasscodeScreen({ mode, onSuccess, onCreated }) {
  // mode: 'verify' | 'create'
  const [input, setInput] = useState('')
  const [confirmInput, setConfirmInput] = useState('')
  const [step, setStep] = useState('enter') // 'enter' | 'confirm'
  const [shake, setShake] = useState(false)

  const handleKey = useCallback((key) => {
    if (key === '⌫') {
      if (step === 'confirm') setConfirmInput(p => p.slice(0, -1))
      else setInput(p => p.slice(0, -1))
      return
    }
    if (key === '') return

    if (step === 'confirm') {
      const next = confirmInput + key
      setConfirmInput(next)
      if (next.length === 4) {
        if (next === input) {
          onCreated(next)
        } else {
          setShake(true)
          setTimeout(() => { setShake(false); setConfirmInput('') }, 600)
        }
      }
    } else {
      const next = input + key
      setInput(next)
      if (next.length === 4) {
        if (mode === 'create') {
          setTimeout(() => setStep('confirm'), 200)
        } else {
          // verify — parent checks
          onSuccess(next)
          // if wrong, parent calls back with shake; reset input after short delay
          setTimeout(() => setInput(''), 200)
        }
      }
    }
  }, [input, confirmInput, step, mode, onSuccess, onCreated])

  const currentInput = step === 'confirm' ? confirmInput : input

  const title = mode === 'create'
    ? (step === 'confirm' ? 'Повторите код' : 'Создайте код')
    : 'Введите код'

  return (
    <div className="flex flex-col items-center justify-between h-full bg-black pt-24 pb-8 no-select">
      <div className="flex flex-col items-center gap-8">
        <p className="text-white text-xl font-medium">{title}</p>

        {/* Dots */}
        <motion.div
          className="flex gap-5"
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {[0,1,2,3].map(i => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full border-2 transition-colors duration-100 ${
                i < currentInput.length
                  ? 'bg-white border-white'
                  : 'bg-transparent border-white/40'
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Numpad */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-xs px-6">
        {KEYS.map((key, i) => (
          <button
            key={i}
            onClick={() => handleKey(key)}
            disabled={key === ''}
            className={`
              h-20 rounded-2xl text-3xl font-light
              flex items-center justify-center
              transition-colors active:bg-white/20
              ${key === '' ? 'invisible' : ''}
              ${key === '⌫' ? 'text-white/70 text-2xl' : 'text-white bg-white/10'}
            `}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  )
}

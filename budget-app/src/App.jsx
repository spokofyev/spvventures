import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBudget } from './hooks/useBudget.js'
import PasscodeScreen from './components/PasscodeScreen.jsx'
import MainScreen from './components/MainScreen.jsx'
import HistoryScreen from './components/HistoryScreen.jsx'
import SettingsScreen from './components/SettingsScreen.jsx'

// Initialize Telegram WebApp
const tg = window.Telegram?.WebApp
if (tg) {
  tg.ready()
  tg.expand()
  tg.setHeaderColor?.('#000000')
  tg.setBackgroundColor?.('#000000')
}

// Slide transition variants
const slideLeft = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
}
const slideRight = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
}
const slideUp = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
}

const transition = { type: 'tween', duration: 0.25, ease: 'easeInOut' }

export default function App() {
  const budget = useBudget()
  // screen: 'loading' | 'passcode_verify' | 'passcode_create' | 'settings_setup' | 'main' | 'history' | 'settings'
  const [screen, setScreen] = useState('loading')
  const [wrongPin, setWrongPin] = useState(false)

  useEffect(() => {
    if (!budget.loaded) return
    if (budget.passcode) {
      setScreen('passcode_verify')
    } else if (!budget.settings) {
      setScreen('settings_setup')
    } else {
      setScreen('main')
    }
  }, [budget.loaded, budget.passcode, budget.settings])

  function handleVerify(pin) {
    if (pin === budget.passcode) {
      setScreen('main')
    } else {
      setWrongPin(true)
      setTimeout(() => setWrongPin(false), 600)
    }
  }

  async function handleSettingsSave(amount, endDate) {
    await budget.saveSettings(amount, endDate)
    if (!budget.passcode) {
      setScreen('passcode_create')
    } else {
      setScreen('main')
    }
  }

  async function handlePasscodeCreated(pin) {
    await budget.savePasscode(pin)
    setScreen('main')
  }

  if (screen === 'loading') {
    return <div className="h-full bg-black" />
  }

  return (
    <div className="h-full bg-black overflow-hidden relative">
      <AnimatePresence mode="wait">
        {screen === 'passcode_verify' && (
          <motion.div key="passcode_verify" className="absolute inset-0" {...slideLeft} transition={transition}>
            <PasscodeScreen
              mode="verify"
              onSuccess={handleVerify}
              shake={wrongPin}
            />
          </motion.div>
        )}

        {screen === 'passcode_create' && (
          <motion.div key="passcode_create" className="absolute inset-0" {...slideLeft} transition={transition}>
            <PasscodeScreen
              mode="create"
              onCreated={handlePasscodeCreated}
            />
          </motion.div>
        )}

        {screen === 'settings_setup' && (
          <motion.div key="settings_setup" className="absolute inset-0" {...slideLeft} transition={transition}>
            <SettingsScreen
              settings={budget.settings}
              onSave={handleSettingsSave}
              onCancel={null}
            />
          </motion.div>
        )}

        {screen === 'main' && (
          <motion.div key="main" className="absolute inset-0" {...slideLeft} transition={transition}>
            <MainScreen
              derived={budget.derived}
              addExpense={budget.addExpense}
              undoLastExpense={budget.undoLastExpense}
              formatAmount={budget.formatAmount}
              onHistory={() => setScreen('history')}
              onSettings={() => setScreen('settings')}
            />
          </motion.div>
        )}

        {screen === 'history' && (
          <motion.div key="history" className="absolute inset-0" {...slideRight} transition={transition}>
            <HistoryScreen
              expenses={budget.expenses}
              settings={budget.settings}
              updateNote={budget.updateNote}
              onBack={() => setScreen('main')}
            />
          </motion.div>
        )}

        {screen === 'settings' && (
          <motion.div key="settings" className="absolute inset-0" {...slideUp} transition={transition}>
            <SettingsScreen
              settings={budget.settings}
              onSave={handleSettingsSave}
              onCancel={() => setScreen('main')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

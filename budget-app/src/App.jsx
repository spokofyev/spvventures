import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBudget } from './hooks/useBudget.js'
import { useAuth } from './hooks/useAuth.js'
import PasscodeScreen from './components/PasscodeScreen.jsx'
import MainScreen from './components/MainScreen.jsx'
import HistoryScreen from './components/HistoryScreen.jsx'
import SettingsScreen from './components/SettingsScreen.jsx'
import SurplusModal from './components/SurplusModal.jsx'
import AuthScreen from './components/AuthScreen.jsx'

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
  const auth = useAuth()
  // screen: 'loading' | 'auth' | 'passcode_verify' | 'passcode_create' | 'settings_setup' | 'main' | 'history' | 'settings'
  const [screen, setScreen] = useState('loading')
  const [wrongPin, setWrongPin] = useState(false)

  // Pass auth user into budget hook so it can sync with Firestore
  const budget = useBudget(auth.user)

  useEffect(() => {
    // Wait for both auth and budget to finish loading
    if (auth.user === undefined) return
    if (!budget.loaded) return

    // Show auth screen once, before passcode, if Firebase is configured and not logged in
    // and we're not in Telegram (Telegram has its own identity)
    const tgActive = !!(window.Telegram?.WebApp?.initData)
    if (auth.hasConfig && !auth.user && !tgActive && screen === 'loading') {
      setScreen('auth')
      return
    }

    if (screen === 'loading' || screen === 'auth') {
      if (budget.passcode) {
        setScreen('passcode_verify')
      } else if (!budget.settings) {
        setScreen('settings_setup')
      } else {
        setScreen('main')
      }
    }
  }, [auth.user, auth.hasConfig, budget.loaded, budget.passcode, budget.settings])

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
      {screen === 'main' && (
        <SurplusModal
          surplus={budget.pendingSurplus}
          onExtend={budget.extendRunway}
          onSpendMore={budget.dismissSurplus}
        />
      )}
      <AnimatePresence mode="wait">
        {screen === 'auth' && (
          <motion.div key="auth" className="absolute inset-0" {...slideLeft} transition={transition}>
            <AuthScreen
              onAuth={() => {
                if (budget.passcode) setScreen('passcode_verify')
                else if (!budget.settings) setScreen('settings_setup')
                else setScreen('main')
              }}
              onSkip={() => {
                if (budget.passcode) setScreen('passcode_verify')
                else if (!budget.settings) setScreen('settings_setup')
                else setScreen('main')
              }}
              error={auth.error}
              sendSmsCode={auth.sendSmsCode}
              confirmSmsCode={auth.confirmSmsCode}
              signInWithGoogle={auth.signInWithGoogle}
            />
          </motion.div>
        )}

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

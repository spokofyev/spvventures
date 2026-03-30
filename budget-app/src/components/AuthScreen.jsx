import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AuthScreen({ onAuth, onSkip, error, sendSmsCode, confirmSmsCode, signInWithGoogle }) {
  const [tab, setTab] = useState('phone') // 'phone' | 'google'
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [smsSent, setSmsSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSendSms() {
    if (!phone.trim()) return
    setLoading(true)
    const sent = await sendSmsCode(phone.trim(), 'recaptcha-container')
    if (sent) setSmsSent(true)
    setLoading(false)
  }

  async function handleConfirmCode() {
    if (!code.trim()) return
    setLoading(true)
    const ok = await confirmSmsCode(code.trim())
    if (ok) onAuth()
    setLoading(false)
  }

  async function handleGoogle() {
    setLoading(true)
    await signInWithGoogle()
    setLoading(false)
    onAuth()
  }

  return (
    <div className="flex flex-col h-full bg-black px-6 pt-20 pb-10">
      <div id="recaptcha-container" />

      <div className="mb-10 text-center">
        <div className="text-5xl mb-4">💰</div>
        <h1 className="text-white text-2xl font-semibold">Бюджет</h1>
        <p className="text-white/50 text-sm mt-2">Войдите для облачного хранения</p>
      </div>

      {/* Tab switcher */}
      <div className="flex rounded-xl overflow-hidden mb-6" style={{ background: '#1C1C1E' }}>
        {['phone', 'google'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === t ? 'text-black' : 'text-white/60'
            }`}
            style={tab === t ? { background: '#FF9500' } : {}}
          >
            {t === 'phone' ? '📱 Телефон' : '✉️ Google'}
          </button>
        ))}
      </div>

      {tab === 'phone' && (
        <div className="flex flex-col gap-4">
          {!smsSent ? (
            <>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+7 900 000 00 00"
                className="w-full px-4 py-4 rounded-2xl text-white text-lg outline-none"
                style={{ background: '#1C1C1E' }}
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSendSms}
                disabled={loading || !phone.trim()}
                className="w-full py-4 rounded-2xl text-black font-semibold text-lg disabled:opacity-50"
                style={{ background: '#FF9500' }}
              >
                {loading ? 'Отправка...' : 'Получить код'}
              </motion.button>
            </>
          ) : (
            <>
              <p className="text-white/60 text-sm text-center">Код отправлен на {phone}</p>
              <input
                type="number"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-4 rounded-2xl text-white text-2xl text-center outline-none tracking-widest"
                style={{ background: '#1C1C1E' }}
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleConfirmCode}
                disabled={loading || code.length < 4}
                className="w-full py-4 rounded-2xl text-black font-semibold text-lg disabled:opacity-50"
                style={{ background: '#FF9500' }}
              >
                {loading ? 'Проверка...' : 'Войти'}
              </motion.button>
              <button onClick={() => setSmsSent(false)} className="text-white/40 text-sm text-center">
                Изменить номер
              </button>
            </>
          )}
        </div>
      )}

      {tab === 'google' && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogle}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-semibold text-lg text-white disabled:opacity-50 flex items-center justify-center gap-3"
          style={{ background: '#1C1C1E' }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {loading ? 'Вход...' : 'Войти через Google'}
        </motion.button>
      )}

      {error ? (
        <p className="text-red-400 text-sm text-center mt-4">{error}</p>
      ) : null}

      <button
        onClick={onSkip}
        className="mt-auto text-white/30 text-sm text-center py-4"
      >
        Пропустить — использовать без синхронизации
      </button>
    </div>
  )
}

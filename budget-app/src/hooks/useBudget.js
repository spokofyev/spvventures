import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEYS = {
  SETTINGS: 'budget_settings',
  EXPENSES: 'budget_expenses',
  PASSCODE: 'budget_passcode',
}

// Use Telegram CloudStorage only when actually running inside Telegram
const tg = window.Telegram?.WebApp
const inTelegram = !!(tg?.initData)

function storageGet(key) {
  return new Promise((resolve) => {
    if (inTelegram && tg.CloudStorage) {
      tg.CloudStorage.getItem(key, (_err, val) => resolve(val || null))
    } else {
      resolve(localStorage.getItem(key))
    }
  })
}

function storageSet(key, value) {
  return new Promise((resolve) => {
    if (inTelegram && tg.CloudStorage) {
      tg.CloudStorage.setItem(key, value, () => resolve())
    } else {
      localStorage.setItem(key, value)
      resolve()
    }
  })
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function daysRemaining(endDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(0, 0, 0, 0)
  const diff = Math.round((end - today) / 86400000)
  return Math.max(diff + 1, 1)
}

function formatAmount(n) {
  const s = Number(n).toFixed(2).replace('.', ',')
  return s.endsWith(',00') ? s.slice(0, -3) : s.replace(/,00$/, '')
}

export function useBudget() {
  const [settings, setSettings] = useState(null)   // { totalAmount, endDate, originalDays }
  const [expenses, setExpenses] = useState([])
  const [passcode, setPasscode] = useState(undefined) // undefined = loading
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function load() {
      const [rawSettings, rawExpenses, rawPasscode] = await Promise.all([
        storageGet(STORAGE_KEYS.SETTINGS),
        storageGet(STORAGE_KEYS.EXPENSES),
        storageGet(STORAGE_KEYS.PASSCODE),
      ])
      setSettings(rawSettings ? JSON.parse(rawSettings) : null)
      setExpenses(rawExpenses ? JSON.parse(rawExpenses) : [])
      setPasscode(rawPasscode || null)
      setLoaded(true)
    }
    load()
  }, [])

  const saveSettings = useCallback(async (totalAmount, endDate) => {
    const days = daysRemaining(endDate)
    const newSettings = { totalAmount: Number(totalAmount), endDate, originalDays: days }
    await storageSet(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings))
    setSettings(newSettings)
  }, [])

  const savePasscode = useCallback(async (pin) => {
    await storageSet(STORAGE_KEYS.PASSCODE, pin)
    setPasscode(pin)
  }, [])

  const addExpense = useCallback(async (amount) => {
    const entry = {
      id: Date.now().toString(),
      amount: Number(amount),
      timestamp: new Date().toISOString(),
      note: '',
    }
    const updated = [entry, ...expenses]
    await storageSet(STORAGE_KEYS.EXPENSES, JSON.stringify(updated))
    setExpenses(updated)
    return entry
  }, [expenses])

  const undoLastExpense = useCallback(async () => {
    if (expenses.length === 0) return
    const updated = expenses.slice(1)
    await storageSet(STORAGE_KEYS.EXPENSES, JSON.stringify(updated))
    setExpenses(updated)
  }, [expenses])

  const updateNote = useCallback(async (id, note) => {
    const updated = expenses.map(e => e.id === id ? { ...e, note } : e)
    await storageSet(STORAGE_KEYS.EXPENSES, JSON.stringify(updated))
    setExpenses(updated)
  }, [expenses])

  // Derived values
  const derived = (() => {
    if (!settings) return null
    const days = daysRemaining(settings.endDate)
    const dailyBudget = settings.totalAmount / days
    const today = todayStr()
    const spentToday = expenses
      .filter(e => e.timestamp.slice(0, 10) === today)
      .reduce((s, e) => s + e.amount, 0)
    const todayRemaining = dailyBudget - spentToday
    const lastExpense = expenses[0] || null
    return {
      days,
      dailyBudget,
      spentToday,
      todayRemaining,
      lastExpense,
      totalAmount: settings.totalAmount,
      originalDays: settings.originalDays,
    }
  })()

  return {
    loaded,
    settings,
    expenses,
    passcode,
    derived,
    saveSettings,
    savePasscode,
    addExpense,
    undoLastExpense,
    updateNote,
    formatAmount,
  }
}

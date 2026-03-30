import { useState, useCallback, useEffect, useRef } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, hasConfig } from '../firebase.js'

const STORAGE_KEYS = {
  SETTINGS: 'budget_settings',
  EXPENSES: 'budget_expenses',
  PASSCODE: 'budget_passcode',
  LAST_VISIT: 'budget_last_visit',
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

function yesterdayStr() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

// Firestore helpers — no-op when not configured or no user
async function firestoreGet(uid, key) {
  if (!hasConfig || !db || !uid) return null
  try {
    const snap = await getDoc(doc(db, 'users', uid, 'budget', key))
    return snap.exists() ? snap.data().value : null
  } catch {
    return null
  }
}

async function firestoreSet(uid, key, value) {
  if (!hasConfig || !db || !uid) return
  try {
    await setDoc(doc(db, 'users', uid, 'budget', key), { value })
  } catch {
    // ignore sync errors — local storage is the source of truth
  }
}

export function useBudget(user) {
  const [settings, setSettings] = useState(null)   // { totalAmount, endDate, originalDays }
  const [expenses, setExpenses] = useState([])
  const [passcode, setPasscode] = useState(undefined) // undefined = loading
  const [loaded, setLoaded] = useState(false)
  const [pendingSurplus, setPendingSurplus] = useState(0)
  const userRef = useRef(user)
  useEffect(() => { userRef.current = user }, [user])

  useEffect(() => {
    async function load() {
      const uid = userRef.current?.uid || null
      let [rawSettings, rawExpenses, rawPasscode, rawLastVisit] = await Promise.all([
        storageGet(STORAGE_KEYS.SETTINGS),
        storageGet(STORAGE_KEYS.EXPENSES),
        storageGet(STORAGE_KEYS.PASSCODE),
        storageGet(STORAGE_KEYS.LAST_VISIT),
      ])

      // Pull from Firestore if local is empty and user is signed in
      if (uid && !rawSettings) {
        const [fs, fe, fp] = await Promise.all([
          firestoreGet(uid, STORAGE_KEYS.SETTINGS),
          firestoreGet(uid, STORAGE_KEYS.EXPENSES),
          firestoreGet(uid, STORAGE_KEYS.PASSCODE),
        ])
        if (fs) { rawSettings = fs; await storageSet(STORAGE_KEYS.SETTINGS, fs) }
        if (fe) { rawExpenses = fe; await storageSet(STORAGE_KEYS.EXPENSES, fe) }
        if (fp) { rawPasscode = fp; await storageSet(STORAGE_KEYS.PASSCODE, fp) }
      }
      const loadedSettings = rawSettings ? JSON.parse(rawSettings) : null
      const loadedExpenses = rawExpenses ? JSON.parse(rawExpenses) : []

      // Detect new day — check if we visited yesterday and underspent
      const today = todayStr()
      const yesterday = yesterdayStr()
      if (rawLastVisit === yesterday && loadedSettings) {
        const days = daysRemaining(loadedSettings.endDate)
        const yesterdaySpent = loadedExpenses
          .filter(e => e.timestamp.slice(0, 10) === yesterday)
          .reduce((s, e) => s + e.amount, 0)
        const spentBeforeYesterday = loadedExpenses
          .filter(e => e.timestamp.slice(0, 10) < yesterday)
          .reduce((s, e) => s + e.amount, 0)
        const daysYesterday = days + 1
        const remainingBeforeYesterday = loadedSettings.totalAmount - spentBeforeYesterday
        const yesterdayAllowance = remainingBeforeYesterday / daysYesterday
        const surplus = yesterdayAllowance - yesterdaySpent
        if (surplus > 0.01) {
          setPendingSurplus(surplus)
        }
      }
      // Update last visit to today
      await storageSet(STORAGE_KEYS.LAST_VISIT, today)

      setSettings(loadedSettings)
      setExpenses(loadedExpenses)
      setPasscode(rawPasscode || null)
      setLoaded(true)
    }
    load()
  }, [])

  const saveSettings = useCallback(async (totalAmount, endDate) => {
    const days = daysRemaining(endDate)
    const newSettings = { totalAmount: Number(totalAmount), endDate, originalDays: days }
    const raw = JSON.stringify(newSettings)
    await storageSet(STORAGE_KEYS.SETTINGS, raw)
    firestoreSet(userRef.current?.uid, STORAGE_KEYS.SETTINGS, raw)
    setSettings(newSettings)
  }, [])

  const savePasscode = useCallback(async (pin) => {
    await storageSet(STORAGE_KEYS.PASSCODE, pin)
    firestoreSet(userRef.current?.uid, STORAGE_KEYS.PASSCODE, pin)
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
    const raw = JSON.stringify(updated)
    await storageSet(STORAGE_KEYS.EXPENSES, raw)
    firestoreSet(userRef.current?.uid, STORAGE_KEYS.EXPENSES, raw)
    setExpenses(updated)
    return entry
  }, [expenses])

  const undoLastExpense = useCallback(async () => {
    if (expenses.length === 0) return
    const updated = expenses.slice(1)
    const raw = JSON.stringify(updated)
    await storageSet(STORAGE_KEYS.EXPENSES, raw)
    firestoreSet(userRef.current?.uid, STORAGE_KEYS.EXPENSES, raw)
    setExpenses(updated)
  }, [expenses])

  const updateNote = useCallback(async (id, note) => {
    const updated = expenses.map(e => e.id === id ? { ...e, note } : e)
    const raw = JSON.stringify(updated)
    await storageSet(STORAGE_KEYS.EXPENSES, raw)
    firestoreSet(userRef.current?.uid, STORAGE_KEYS.EXPENSES, raw)
    setExpenses(updated)
  }, [expenses])

  // Surplus actions
  const dismissSurplus = useCallback(() => setPendingSurplus(0), [])

  const extendRunway = useCallback(async () => {
    if (!settings || pendingSurplus <= 0) return
    const days = daysRemaining(settings.endDate)
    const totalSpent = expenses.reduce((s, e) => s + e.amount, 0)
    const remaining = settings.totalAmount - totalSpent
    const todayRate = remaining / days
    const extraDays = Math.max(1, Math.round(pendingSurplus / todayRate))
    const end = new Date(settings.endDate)
    end.setDate(end.getDate() + extraDays)
    const newEndDate = end.toISOString().slice(0, 10)
    const newDays = daysRemaining(newEndDate)
    const newSettings = { ...settings, endDate: newEndDate, originalDays: newDays }
    const raw = JSON.stringify(newSettings)
    await storageSet(STORAGE_KEYS.SETTINGS, raw)
    firestoreSet(userRef.current?.uid, STORAGE_KEYS.SETTINGS, raw)
    setSettings(newSettings)
    setPendingSurplus(0)
  }, [settings, expenses, pendingSurplus])

  // Derived values
  const derived = (() => {
    if (!settings) return null
    const days = daysRemaining(settings.endDate)
    const today = todayStr()
    const totalSpent = expenses.reduce((s, e) => s + e.amount, 0)
    const spentToday = expenses
      .filter(e => e.timestamp.slice(0, 10) === today)
      .reduce((s, e) => s + e.amount, 0)
    const remaining = settings.totalAmount - totalSpent
    const dailyBudget = remaining / days
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
    pendingSurplus,
    dismissSurplus,
    extendRunway,
    saveSettings,
    savePasscode,
    addExpense,
    undoLastExpense,
    updateNote,
    formatAmount,
  }
}

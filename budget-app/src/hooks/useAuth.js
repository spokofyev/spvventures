import { useState, useEffect } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  signOut as fbSignOut,
} from 'firebase/auth'
import { auth, hasConfig } from '../firebase.js'

export function useAuth() {
  const [user, setUser] = useState(undefined) // undefined = loading, null = not signed in
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!hasConfig || !auth) {
      setUser(null)
      return
    }
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null))
    return unsub
  }, [])

  async function signInWithGoogle() {
    if (!auth) return
    setError('')
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (e) {
      setError(e.message)
    }
  }

  function setupRecaptcha(containerId) {
    if (!auth) return null
    if (window._recaptchaVerifier) {
      window._recaptchaVerifier.clear()
    }
    window._recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
    })
    return window._recaptchaVerifier
  }

  async function sendSmsCode(phoneNumber, containerId) {
    if (!auth) return false
    setError('')
    try {
      const verifier = setupRecaptcha(containerId)
      const result = await signInWithPhoneNumber(auth, phoneNumber, verifier)
      setConfirmationResult(result)
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  async function confirmSmsCode(code) {
    if (!confirmationResult) return false
    setError('')
    try {
      await confirmationResult.confirm(code)
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  async function signOut() {
    if (!auth) return
    await fbSignOut(auth)
  }

  return {
    user,
    error,
    confirmationResult,
    signInWithGoogle,
    sendSmsCode,
    confirmSmsCode,
    signOut,
    hasConfig,
  }
}

import { useState, useRef } from 'react'
import { CheckCircle, Upload } from 'lucide-react'

// Replace with your Formspree form ID after signing up at formspree.io
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID'

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [fileName, setFileName] = useState(null)
  const formRef = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const data = new FormData(formRef.current)
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle size={40} className="text-black mb-4" />
        <h3 className="text-xl font-medium text-black mb-2">Thank you</h3>
        <p className="text-black/50 text-sm max-w-sm">
          We&apos;ll review your enquiry and get back to you within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
      <input type="hidden" name="_subject" value="New SPV Ventures enquiry" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-black/40 mb-2">
            Name <span className="text-black/30">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full border-b border-black/20 bg-transparent pb-2 text-sm text-black placeholder-black/25 focus:outline-none focus:border-black/60 transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-black/40 mb-2">
            Email <span className="text-black/30">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border-b border-black/20 bg-transparent pb-2 text-sm text-black placeholder-black/25 focus:outline-none focus:border-black/60 transition-colors"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-black/40 mb-2">
            Company <span className="text-black/30">*</span>
          </label>
          <input
            type="text"
            name="company"
            required
            className="w-full border-b border-black/20 bg-transparent pb-2 text-sm text-black placeholder-black/25 focus:outline-none focus:border-black/60 transition-colors"
            placeholder="Company name"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-black/40 mb-2">
            Website
          </label>
          <input
            type="url"
            name="website"
            className="w-full border-b border-black/20 bg-transparent pb-2 text-sm text-black placeholder-black/25 focus:outline-none focus:border-black/60 transition-colors"
            placeholder="https://yourcompany.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-black/40 mb-2">
          Pitch Deck <span className="text-black/30">*</span>
        </label>
        <label className="flex flex-col items-center justify-center w-full border border-dashed border-black/20 rounded-xl py-8 px-4 cursor-pointer hover:border-black/40 transition-colors">
          <Upload size={20} className="text-black/30 mb-2" />
          <span className="text-sm text-black/40">
            {fileName ? fileName : 'Click to upload PDF, PPTX, PPT or KEY'}
          </span>
          <input
            type="file"
            name="deck"
            accept=".pdf,.pptx,.ppt,.key"
            required
            className="hidden"
            onChange={(e) => setFileName(e.target.files[0]?.name || null)}
          />
        </label>
      </div>

      <p className="text-xs text-black/30 leading-relaxed">
        By submitting this form you consent to SPV Ventures processing your personal data in accordance with our{' '}
        <a href="#" className="underline hover:text-black/50 transition-colors">Privacy Policy</a>.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="px-8 py-3 text-xs font-medium uppercase tracking-widest text-white bg-black rounded-full hover:bg-black/80 disabled:opacity-50 transition-colors"
      >
        {submitting ? 'Sending…' : 'Submit enquiry'}
      </button>
    </form>
  )
}

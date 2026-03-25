import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '../data/faq'

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="bg-neutral-50 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mb-12">Questions</h2>

        <div className="divide-y divide-black/10">
          {faqItems.map((item, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between py-5 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-base font-medium text-black">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-black/40 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <p className="pb-5 text-sm text-black/55 leading-relaxed">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

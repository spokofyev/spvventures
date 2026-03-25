import { Building2, Plane, Brain } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'

const iconMap = { Building2, Plane, Brain }

export default function CaseStudies() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mb-3">
          How we work
        </h2>
        <p className="text-black/50 text-lg mb-12">
          Real mandates across banking, aviation, and deep AI research.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => {
            const Icon = iconMap[cs.icon]
            return (
              <div key={cs.title} className="bg-neutral-50 rounded-2xl p-8 flex flex-col">
                <div className="mb-4">
                  {Icon && <Icon size={20} className="text-black/40" />}
                </div>
                <span className="inline-block text-xs font-medium text-black/40 uppercase tracking-wider mb-3">
                  {cs.sector}
                </span>
                <h3 className="text-lg font-medium text-black mb-3 leading-snug">{cs.title}</h3>
                <p className="text-black/55 text-sm leading-relaxed flex-1">{cs.body}</p>
                <div className="border-t border-black/10 mt-6 pt-5">
                  <p className="text-sm font-medium text-black">{cs.outcome}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

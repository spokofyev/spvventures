import { Rocket, Building2 } from 'lucide-react'

const rdItems = [
  {
    title: 'Commercial co-founding',
    description: 'We step in as your commercial co-founder — handling GTM strategy, corporate sales, and seed fundraising so your team stays focused on the technology.',
  },
  {
    title: 'Pilot structuring',
    description: 'We identify the right corporate partners, negotiate the terms, and run the pilot process from intro to signed agreement.',
  },
  {
    title: 'Fundraising support',
    description: 'From investor targeting and deck preparation to managing the data room and term sheet negotiation.',
  },
  {
    title: 'Corporate entity setup',
    description: 'For academic spin-outs and R&D teams, we handle incorporation, IP licensing, and early governance.',
  },
]

const corpItems = [
  {
    title: 'Curated deal flow',
    description: 'We source and vet AI-native companies that fit your innovation roadmap — no cold LinkedIn pitches, only pre-qualified introductions.',
  },
  {
    title: 'Pilot programme design',
    description: 'We design the commercial and legal structure for AI pilots that can scale: data agreements, success metrics, and vendor onboarding.',
  },
  {
    title: 'M&A advisory',
    description: 'Buy-side mandates for corporations acquiring deep tech capabilities. We run the full process from target identification to closing.',
  },
  {
    title: 'Innovation partnerships',
    description: 'Joint development agreements, licensing structures, and strategic partnerships between corporations and early-stage AI companies.',
  },
]

function SubsectionItem({ title, description }) {
  return (
    <div>
      <h4 className="text-lg font-medium text-black mb-1">{title}</h4>
      <p className="text-black/50 leading-relaxed text-sm">{description}</p>
    </div>
  )
}

export default function WhoWeServe() {
  return (
    <section id="how-it-works" className="bg-neutral-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mb-16">Who we serve</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column — corporates first */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Building2 size={18} className="text-black/40" />
              <span className="text-sm font-medium text-black/50 uppercase tracking-wider">Corporations — M&A &amp; Innovation</span>
            </div>
            <div className="space-y-8">
              {corpItems.map((item) => (
                <SubsectionItem key={item.title} {...item} />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Rocket size={18} className="text-black/40" />
              <span className="text-sm font-medium text-black/50 uppercase tracking-wider">R&D Teams — Pre-seed to Series A</span>
            </div>
            <div className="space-y-8">
              {rdItems.map((item) => (
                <SubsectionItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

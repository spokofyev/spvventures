
const services = [
  {
    label: 'M&A Advisory',
    body: 'Buy-side advisory for corporates acquiring in deep tech. We source off-market targets, run the full process, and sit at the table until it closes.',
  },
  {
    label: 'Integration',
    body: 'Post-close execution support. We stay in as hands-on partners — not a handoff to a consultant — until your team has absorbed the acquisition and extracted the value.',
  },
  {
    label: 'SPV Capital',
    body: 'When co-investment makes more sense than acquisition, we structure and bring capital via SPV alongside your team. We take equity. We have skin in the deal.',
  },
]

const phases = [
  {
    label: 'Mandate & Search',
    items: [
      'Acquisition mandate definition & refinement',
      'Target universe mapping & scoring',
      'Market & competitive landscape analysis',
      'AI-powered company screening',
      'Off-market outreach & NDA management',
      'Engagement audit trail',
    ],
  },
  {
    label: 'Assess & Prepare',
    items: [
      'Strategic fit scoring & prioritisation',
      'Preliminary due diligence research',
      'Acquisition brief & investment case',
      'Valuation benchmarking',
      'Data room analysis & gap identification',
      'IC & board presentation materials',
    ],
  },
  {
    label: 'Execute & Close',
    items: [
      'Founder & leadership engagement',
      'Deal structure & term sheet',
      'Negotiation support',
      'Full process management',
      'Closing coordination',
      'Post-close integration planning',
    ],
  },
]

const stack = [
  {
    label: 'AI Infrastructure',
    desc: 'The operational backbone — automated from day one.',
    items: [
      'Investment materials & IM generation',
      'Market & competitive analysis',
      'Mandate assessment & screening',
      'Target identification & matching',
      'Due diligence research & data room',
      'NDA workflows, audit trails & process tracking',
    ],
  },
  {
    label: 'Proprietary Access',
    desc: 'What no platform can source for you.',
    items: [
      'Off-market deep tech deal flow',
      'Founder & leadership relationships',
      'Pre-process target identification',
      'Corporate buyer network — UK · US · Europe',
      'Space · Fintech · Robotics · Physical AI',
      'Equity co-investment capability',
    ],
  },
  {
    label: 'Senior Judgment',
    desc: 'Two partners. No analysts. No handoffs.',
    items: [
      'Strategic fit & mandate alignment',
      'Deal structure & negotiation',
      'Equity participation decisions',
      'Founder trust & closing',
      'Board & IC-level communication',
      'Post-close integration oversight',
    ],
  },
]

export default function App() {
  return (
    <>
      {/* Nav */}
      <nav className="nav">
        <span className="wordmark">SPV Ventures</span>
        <div className="nav-links">
          <a href="https://linkedin.com/in/sprokofyev" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <h1 className="headline">
          We connect corporates to deep tech they can't build alone.
        </h1>
        <p className="tagline">
          AI infrastructure. Proprietary deal access. Senior judgment. The full stack — as a service.
        </p>
        <div className="services">
          {services.map((s) => (
            <div key={s.label} className="service-row">
              <span className="service-label">{s.label}</span>
              <p className="service-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scope of engagement */}
      <section className="scope">
        <div className="scope-inner">
          <div className="section-eyebrow">
            <span className="eyebrow-label">Scope of Engagement</span>
            <span className="eyebrow-line" />
            <span className="eyebrow-desc">Every mandate covers the full process — from defining what you're looking for to closing and integration.</span>
          </div>
          <div className="scope-grid">
            {phases.map((phase) => (
              <div key={phase.label} className="scope-col">
                <p className="scope-label">{phase.label}</p>
                <ul className="scope-list">
                  {phase.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-native band */}
      <section className="ai-band">
        <div className="ai-band-inner">
          <div>
            <span className="ai-band-kicker">How We're Built</span>
            <h2 className="ai-band-headline">Built on the full stack of modern M&A.</h2>
            <p className="ai-band-sub">AI platforms automate documents. Auction networks source buyers. We run on the same infrastructure — and add what no platform can replicate: a decade of off-market relationships in deep tech and two senior partners who know which deal is worth doing.</p>
          </div>
          <div className="ai-stack">
            {stack.map((col) => (
              <div key={col.label} className="ai-stack-col">
                <p className="ai-col-label">{col.label}</p>
                <p className="ai-col-desc">{col.desc}</p>
                <ul className="ai-list">
                  {col.items.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-geo">Robotics · Physical AI · Applied AI &nbsp;·&nbsp; UK · US · Europe</span>
        <span className="footer-copy">© {new Date().getFullYear()} SPV Ventures</span>
      </footer>
    </>
  )
}

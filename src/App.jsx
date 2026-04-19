
const services = [
  {
    label: 'M&A Advisory',
    body: 'Full-process advisory for corporates acquiring in deep tech. We originate proprietary targets, run the process, and close.',
  },
  {
    label: 'Integration',
    body: 'Post-close execution support. We stay in as hands-on partners to help your team absorb the acquisition and extract the value you paid for.',
  },
  {
    label: 'SPV Capital',
    body: 'Where the opportunity calls for co-investment rather than acquisition, we structure and bring capital via SPV alongside your team.',
  },
]

const deals = [
  {
    name: '████████',
    sector: 'Space',
    stage: 'Series A · Late Stage',
    rationale: 'Revenue traction and defensible orbit position made this a compelling strategic fit for a US corporate buyer.',
  },
  {
    name: '████████',
    sector: 'Fintech',
    stage: 'Seed',
    rationale: 'Exceptional founding team, proprietary IP, and a roadmap that would have taken the acquirer 3+ years to build in-house.',
  },
  {
    name: '████████',
    sector: 'Space',
    stage: 'Series A',
    rationale: 'Early-stage propulsion IP with no public footprint. Sourced through network before the founders were ready to raise.',
  },
]

export default function App() {
  return (
    <div className="page">
      <nav className="nav">
        <span className="wordmark">SPV Ventures</span>
        <div className="nav-links">
          <a href="https://linkedin.com/in/sprokofyev" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </nav>

      <main className="main">
        <h1 className="headline">
          We connect corporates to deep tech they can't build alone.
        </h1>

        <p className="tagline">
          Founders ourselves, on a mission to build a firm that's AI-native at its core — so we can stay focused on what actually matters: judgment, relationships, and delivering real value on every deal.
        </p>

        <div className="services">
          {services.map((s) => (
            <div key={s.label} className="service-row">
              <span className="service-label">{s.label}</span>
              <p className="service-body">{s.body}</p>
            </div>
          ))}
        </div>

        {false && <div className="deals">
          <p className="section-label">Recent Deals</p>
          <div className="deals-table">
            <div className="deals-header">
              <span>Company</span>
              <span>Sector</span>
              <span>Stage</span>
              <span>Strategic rationale</span>
            </div>
            {deals.map((d, i) => (
              <div key={i} className="deals-row">
                <span className="deal-name">{d.name}</span>
                <span className="deal-meta">{d.sector}</span>
                <span className="deal-meta">{d.stage}</span>
                <p className="deal-rationale">{d.rationale}</p>
              </div>
            ))}
          </div>
        </div>}

      </main>

      <footer className="footer">
        <span className="footer-geo">Robotics · Physical AI · Applied AI &nbsp;·&nbsp; UK · US · Europe</span>
        <span className="footer-copy">© {new Date().getFullYear()} SPV Ventures</span>
      </footer>
    </div>
  )
}

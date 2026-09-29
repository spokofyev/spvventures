const services = [
  {
    label: 'Co-founding & co-investing',
    body: 'We start companies with founders and invest alongside them, from first thesis to first customers.',
  },
  {
    label: 'M&A',
    body: 'Target search, due diligence and post-merger integration, on the buy side and the sell side.',
  },
  {
    label: 'Investment foresight',
    body: 'A go or no-go on R&D bets, and the reasoning behind it: what the technology can do, when, and at what cost.',
  },
]

const portfolio = [
  {
    name: 'Longrun AI',
    body: 'Dynamic environments for long-horizon reinforcement learning.',
  },
  {
    name: 'Kulon Space',
    body: 'Orbital infrastructure lab.',
    href: 'https://kulonspace.com',
  },
]

const cases = [
  {
    sector: 'Satellite manufacturing',
    type: 'Special situation investment',
    body: 'Due diligence and post-investment operations for a private investor.',
  },
  {
    sector: 'Robotics',
    type: 'M&A · sell side',
    body: 'Represented the seller in an acquisition by a tier 1 public technology company.',
  },
]

function Arrow() {
  return (
    <svg className="arrow" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 8L8 2M3.5 2H8V6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export default function App() {
  return (
    <div className="page">
      <nav className="nav">
        <span className="wordmark">SPV Ventures</span>
        <div className="nav-links">
          <a href="https://linkedin.com/in/sprokofyev" target="_blank" rel="noopener noreferrer">
            LinkedIn <Arrow />
          </a>
        </div>
      </nav>

      <main className="main">
        <section className="hero">
          <h1 className="headline">
            M&amp;A and strategic investment in frontier tech.
          </h1>
          <p className="tagline">
            We partner with founders, engineers and investors in AI, infrastructure and space.
          </p>
        </section>

        <section className="section">
          <p className="section-label">What we do</p>
          <div className="rows">
            {services.map((s) => (
              <div key={s.label} className="row">
                <h2 className="row-title">{s.label}</h2>
                <p className="row-body">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="section-label">Co-founded</p>
          <div className="rows">
            {portfolio.map((p) => (
              <div key={p.name} className="row">
                <h2 className="row-title">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      {p.name} <Arrow />
                    </a>
                  ) : (
                    p.name
                  )}
                </h2>
                <p className="row-body">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="section-label">Selected work</p>
          <div className="rows">
            {cases.map((c) => (
              <div key={c.sector} className="row">
                <div>
                  <h2 className="row-title">{c.sector}</h2>
                  <p className="row-meta">{c.type}</p>
                </div>
                <p className="row-body">{c.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span className="footer-geo">AI · Infrastructure · Space &nbsp;·&nbsp; UK · US · Europe</span>
        <span className="footer-copy">© {new Date().getFullYear()} SPV Ventures</span>
      </footer>
    </div>
  )
}

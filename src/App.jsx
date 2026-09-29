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

const LINKEDIN = 'https://linkedin.com/in/sprokofyev'

function Arrow() {
  return (
    <svg className="arrow" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 8L8 2M3.5 2H8V6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function Logo({ inverted = false }) {
  return (
    <svg className="logo" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill={inverted ? '#fff' : '#0a0a0a'} />
      <rect x="24" y="24" width="52" height="52" fill={inverted ? '#0a0a0a' : '#fff'} />
    </svg>
  )
}

// Image placeholder: swap for <img> once real images exist.
function ImagePlaceholder({ label, ratio = '16 / 9' }) {
  return (
    <div className="placeholder" style={{ aspectRatio: ratio }} role="img" aria-label={`${label} (placeholder)`}>
      <span>{label}</span>
    </div>
  )
}

export default function App() {
  return (
    <>
      <header className="container nav">
        <a className="brand" href="/" aria-label="SPV Ventures home">
          <Logo />
          <span className="wordmark">SPV Ventures</span>
        </a>
        <a className="nav-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
          LinkedIn <Arrow />
        </a>
      </header>

      <main>
        <section className="container hero">
          <h1 className="headline">M&amp;A and strategic investment in frontier tech.</h1>
          <p className="tagline">
            We partner with founders, engineers and investors in AI, infrastructure and space.
          </p>
          <ImagePlaceholder label="Hero image" ratio="21 / 9" />
        </section>

        <section className="container section">
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

        <section className="band dark">
          <div className="container section">
            <p className="section-label">Co-founded</p>
            <div className="cards">
              {portfolio.map((p) => (
                <article key={p.name} className="card">
                  <ImagePlaceholder label={`${p.name} image`} ratio="4 / 3" />
                  <h2 className="card-title">
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer">
                        {p.name} <Arrow />
                      </a>
                    ) : (
                      p.name
                    )}
                  </h2>
                  <p className="card-body">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container section">
          <p className="section-label">Selected work</p>
          <div className="cards">
            {cases.map((c) => (
              <article key={c.sector} className="card">
                <ImagePlaceholder label={`${c.sector} image`} ratio="3 / 2" />
                <p className="card-meta">{c.type}</p>
                <h2 className="card-title">{c.sector}</h2>
                <p className="card-body">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="band dark">
          <div className="container cta">
            <h2 className="cta-title">Building or buying in frontier tech?</h2>
            <a className="button" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              Talk to us <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer className="band dark">
        <div className="container">
          <div className="footer">
            <span className="footer-brand">
              <Logo inverted />
              <span>© {new Date().getFullYear()} SPV Ventures</span>
            </span>
            <span>AI · Infrastructure · Space &nbsp;·&nbsp; UK · US · Europe</span>
          </div>
        </div>
      </footer>
    </>
  )
}

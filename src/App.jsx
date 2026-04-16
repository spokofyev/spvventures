
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
          We connect corporates to deep tech<br />they can't build alone.
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
      </main>

      <footer className="footer">
        <span className="footer-geo">Robotics · Physical AI · Applied AI &nbsp;·&nbsp; UK · US · Europe</span>
        <span className="footer-copy">© {new Date().getFullYear()} SPV Ventures</span>
      </footer>
    </div>
  )
}

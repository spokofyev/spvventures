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
    tags: ['AI', 'Co-founded'],
    body: 'Dynamic environments for long-horizon reinforcement learning.',
  },
  {
    name: 'Kulon Space',
    tags: ['SpaceTech', 'Co-founded'],
    body: 'Orbital infrastructure lab.',
    href: 'https://kulonspace.com',
  },
]

const cases = [
  {
    name: 'Satellite manufacturing',
    tags: ['SpaceTech', 'Special situation'],
    body: 'Due diligence and post-investment operations for a private investor.',
  },
  {
    name: 'Robotics',
    tags: ['Robotics', 'M&A · sell side'],
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
function ImagePlaceholder({ label, ratio = '16 / 9', className = '' }) {
  return (
    <div
      className={`placeholder ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`${label} (placeholder)`}
    >
      <span>{label}</span>
    </div>
  )
}

function SectionHead({ label, children }) {
  return (
    <div className="section-head">
      <p className="label">{label}</p>
      {children && <p className="section-intro">{children}</p>}
    </div>
  )
}

function List({ items }) {
  return (
    <div className="list">
      {items.map((item) => (
        <article key={item.name} className="list-row">
          <h3 className="list-name">{item.name}</h3>
          <p className="list-tags">
            {item.tags.map((t, i) => (
              <span key={t}>
                {i > 0 && <span className="dot">•</span>}
                {t}
              </span>
            ))}
          </p>
          <div className="list-text">
            <p>{item.body}</p>
            {item.href && (
              <a className="text-link" href={item.href} target="_blank" rel="noopener noreferrer">
                website <Arrow />
              </a>
            )}
          </div>
          <ImagePlaceholder label={`${item.name} image`} ratio="4 / 3" className="list-img" />
        </article>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <>
      <header className="container hero">
        <div className="hero-top">
          <p className="hero-kicker">M&amp;A and strategic investment in frontier tech</p>
          <nav className="nav">
            <a href="#what-we-do">What we do</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <h1 className="wordmark">
          <Logo />
          <span>SPV Ventures</span>
        </h1>

        <div className="hero-bottom">
          <p className="label">AI · Infrastructure · Space</p>
          <p className="statement">
            We partner with founders, engineers and investors on M&amp;A and strategic investments in
            frontier tech.
          </p>
        </div>
      </header>

      <main>
        <div className="container">
          <ImagePlaceholder label="Hero image" ratio="21 / 9" className="banner" />
        </div>

        <section id="what-we-do" className="container section">
          <SectionHead label="What we do" />
          <ol className="services">
            {services.map((s, i) => (
              <li key={s.label} className="service">
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="service-title">{s.label}</h2>
                <p className="service-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="portfolio" className="band dark">
          <div className="container section">
            <SectionHead label="Portfolio">Companies we co-founded.</SectionHead>
            <List items={portfolio} />
          </div>
        </section>

        <section id="work" className="container section">
          <SectionHead label="Selected work">Client names withheld.</SectionHead>
          <List items={cases} />
        </section>
      </main>

      <footer id="contact" className="band dark">
        <div className="container footer">
          <div className="footer-cta">
            <h2 className="footer-title">Building or buying in frontier tech?</h2>
            <a className="button" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              Talk to us <Arrow />
            </a>
          </div>
          <div className="footer-bottom">
            <span className="footer-brand">
              <Logo inverted />
              <span>© {new Date().getFullYear()} SPV Ventures</span>
            </span>
            <span>UK · US · Europe</span>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn <Arrow />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

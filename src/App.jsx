import { useEffect, useState } from 'react'

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
  },
]

const LINKEDIN = 'https://linkedin.com/in/sprokofyev'

const sections = [
  { href: '#what-we-do', label: 'What we do' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
]

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

function Menu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className="burger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
      </button>

      <div id="menu" className={`menu band dark${open ? ' is-open' : ''}`} hidden={!open}>
        <div className="container menu-inner">
          <div className="menu-top">
            <span className="brand">
              <Logo inverted />
              SPV Ventures
            </span>
            <button type="button" className="menu-close" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <nav className="menu-nav" aria-label="Sections">
            {sections.map((s) => (
              <a key={s.href} href={s.href} onClick={() => setOpen(false)}>
                {s.label}
              </a>
            ))}
          </nav>
          <div className="menu-bottom">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn <Arrow />
            </a>
            <span>UK · US · Europe</span>
          </div>
        </div>
      </div>
    </>
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
          <p className="list-text">{item.body}</p>
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
          <a className="brand" href="/" aria-label="SPV Ventures home">
            <Logo />
            SPV Ventures
          </a>
          <Menu />
        </div>

        <h1 className="headline">M&amp;A and strategic investment in frontier tech.</h1>

        <div className="hero-bottom">
          <p className="statement">
            We partner with founders, engineers and investors to build, buy and back frontier
            technology companies.
          </p>
        </div>
      </header>

      <main>
        <div className="container">
          <img
            className="banner"
            src="/images/hero-2400.jpg"
            srcSet="/images/hero-1200.jpg 1200w, /images/hero-2400.jpg 2400w"
            sizes="(max-width: 1280px) 100vw, 1200px"
            width="2400"
            height="1348"
            alt="Earth's horizon from orbit, sunlight reflecting off the ocean through clouds"
            fetchPriority="high"
          />
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
          </div>
        </div>
      </footer>
    </>
  )
}

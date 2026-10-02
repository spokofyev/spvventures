import { useEffect, useState } from 'react'

const services = [
  {
    label: 'Co\u2011founding',
    body: 'We start companies together with founders and stay hands-on: fundraising, market discovery and go-to-market.',
  },
  {
    label: 'M&A advisory',
    body: 'Working with CVCs, PE funds and private investors on target search, due diligence and post-merger integration, on the buy side and the sell side.',
  },
  {
    label: 'R&D strategy',
    body: 'We help you take reasonable risk when investing in frontier tech, researching each R&D bet together with your team: what the technology can do, when, and at what cost.',
  },
]

// Experience: what we did and for whom. Client names withheld.
const experience = [
  {
    who: 'Kulon Space · Co\u2011founders',
    title: 'Structured an orbital infrastructure company with the founder of Exolaunch',
    body: 'Company structure set up with Dmitry Sternharz. The fundraise is next.',
  },
  {
    who: 'Longrun AI · Business co\u2011founders',
    title: 'Building the business of an AI lab founded by ex\u2011Meta researchers',
    body: 'Leading market discovery and go-to-market now, with the fundraise to follow.',
  },
  {
    who: 'Private investor · Satellite manufacturing',
    title: 'Took a private investor from diligence to a done deal, then ran operations',
    body: 'Due diligence and post\u2011investment operations on a special situation investment in a satellite manufacturer.',
  },
  {
    who: 'Seller · Robotics',
    title: 'Sold a robotics company to a tier 1 public technology company',
    body: 'Sell\u2011side representation through the acquisition.',
  },
]

const LINKEDIN = 'https://linkedin.com/in/sprokofyev'

const sections = [
  { href: '#what-we-do', label: 'What we do' },
  { href: '#experience', label: 'Experience' },
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
        <svg width="28" height="14" viewBox="0 0 28 14" aria-hidden="true">
          <path d="M0 1H28M0 13H28" stroke="#0a0a0a" strokeWidth="2" />
        </svg>
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

function Card({ eyebrow, title, children }) {
  return (
    <article className="card">
      {eyebrow && <p className="card-eyebrow">{eyebrow}</p>}
      <h3 className="card-title">{title}</h3>
      <p className="card-body">{children}</p>
    </article>
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

        <div className="hero-body">
          <h1 className="headline">M&amp;A and strategic investment in frontier tech.</h1>
          <p className="hero-lead">
            Co&#8209;founding, M&amp;A advisory and R&amp;D strategy for AI, infrastructure and
            space.
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

        <section className="container narrative">
          <p>
            We build together with founders, engineers and investors in frontier tech: AI,
            infrastructure and space. We co&#8209;found companies and stay hands-on through
            fundraising, market discovery and go-to-market, advise on M&amp;A from target search to
            integration, and research R&amp;D bets alongside teams.
          </p>
        </section>

        <section id="what-we-do" className="container section">
          <h2 className="section-title">What we do</h2>
          <div className="cards cards-3">
            {services.map((s, i) => (
              <Card key={s.label} eyebrow={String(i + 1).padStart(2, '0')} title={s.label}>
                {s.body}
              </Card>
            ))}
          </div>
        </section>

        <section id="experience" className="container section">
          <h2 className="section-title">Experience</h2>
          <p className="section-lead">Companies we are building and deals we have worked on.</p>
          <div className="cards cards-2">
            {experience.map((o) => (
              <Card key={o.title} eyebrow={o.who} title={o.title}>
                {o.body}
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="band dark">
        <div className="container footer">
          <div className="footer-cta">
            <h2 className="footer-title">A company to build, a deal to do or an R&amp;D bet to test?</h2>
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

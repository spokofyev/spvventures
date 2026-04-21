import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

function Reveal({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  )
}

function RevealGroup({ children, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
    >
      {children}
    </motion.div>
  )
}

const model = [
  {
    num: '01',
    title: 'Identify the Gap',
    body: 'We map where your business is exposed to technological disruption — and locate the teams already building the answer.',
  },
  {
    num: '02',
    title: 'Acquire & Build',
    body: 'We structure the acquisition of R&D teams or labs, then work hands-on to integrate them and accelerate their output inside your organisation.',
  },
  {
    num: '03',
    title: 'Capital & Exit',
    body: 'We bridge building and ownership — through M&A advisory or SPV capital structures that align incentives for the long term.',
  },
]

const sectors = ['Healthcare', 'Finance', 'Space', 'Industrial Production']

export default function App() {
  return (
    <div className="site">

      {/* ── Nav ── */}
      <header className="nav">
        <a href="#" className="wordmark">SPV Ventures</a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#model">Model</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <motion.p
            className="label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Corporate Innovation Partners
          </motion.p>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            We help corporates<br /> build the tech<br /> they can't afford to miss
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Partnering with established companies to acquire R&D talent, build internal capabilities, and turn technology gaps into competitive advantages.
          </motion.p>
          <motion.a
            href="#contact"
            className="hero-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Get in Touch →
          </motion.a>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section" id="about">
        <div className="section-inner about-grid">
          <div className="about-left">
            <Reveal>
              <p className="label">About</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                Founders and<br /> operators,<br /> not consultants
              </h2>
            </Reveal>
          </div>
          <RevealGroup className="about-right">
            <motion.p className="body-text" variants={fadeUp}>
              We are a team of founders and operators with deep networks across engineering labs, research teams, and frontier builders — in healthcare, finance, space, and industrial production.
            </motion.p>
            <motion.p className="body-text" variants={fadeUp}>
              We partner with established corporations to identify technology gaps, acquire the right R&D teams, and build the capabilities that close them. Then we help move those assets forward — through M&A or structured SPV capital.
            </motion.p>
            <motion.p className="body-text accent-text" variants={fadeUp}>
              We don't advise from the sidelines. We get in, build alongside you, and stay until it works.
            </motion.p>
          </RevealGroup>
        </div>
      </section>

      {/* ── Model ── */}
      <section className="section section-dark" id="model">
        <div className="section-inner">
          <Reveal>
            <p className="label label-light">How We Work</p>
          </Reveal>
          <RevealGroup className="model-grid">
            {model.map((card) => (
              <motion.div className="model-card" key={card.num} variants={fadeUp}>
                <span className="model-num">{card.num}</span>
                <h3 className="model-card-title">{card.title}</h3>
                <p className="model-card-body">{card.body}</p>
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="sectors">
              {sectors.map((s, i) => (
                <span key={s} className="sector-tag">
                  {s}{i < sectors.length - 1 && <span className="sector-dot">·</span>}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section" id="contact">
        <div className="section-inner contact-grid">
          <div className="contact-left">
            <Reveal>
              <p className="label">Let's Talk</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="section-title">
                Working with<br /> corporates who<br /> want to move faster
              </h2>
            </Reveal>
          </div>
          <Reveal className="contact-right">
            <p className="body-text">
              If you're a corporate looking to acquire technology capability, or a founder interested in strategic backing — we'd like to hear from you.
            </p>
            <a
              href="mailto:hello@spvventures.com"
              className="cta-link"
            >
              Get in Touch →
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <span className="footer-left">© 2025 SPV Ventures. All rights reserved.</span>
        <span className="footer-right">Lisbon, Portugal</span>
      </footer>
    </div>
  )
}

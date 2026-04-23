import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function Reveal({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function RevealGroup({ children, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
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

const steps = [
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
    <div style={{ background: '#06100a' }}>

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
            className="hero-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Corporate Innovation Partners
          </motion.p>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            We help corporates<br />
            build the <em>technology</em><br />
            they can't afford to miss
          </motion.h1>
          <motion.div
            className="hero-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="hero-sub">
              Partnering with established companies to acquire R&D talent, build internal capabilities, and turn technology gaps into competitive advantages.
            </p>
            <div className="hero-right">
              <a href="#contact" className="hero-cta">Get in Touch →</a>
              <div className="scroll-indicator">
                <span className="scroll-line" />
                Scroll
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="section" id="about">
        <div className="section-inner">
          <Reveal>
            <p className="section-label">About</p>
          </Reveal>
          <RevealGroup className="about-grid">
            <motion.h2 className="about-heading" variants={fadeUp}>
              Founders and<br /> operators,<br /> not consultants
            </motion.h2>
            <motion.div className="about-body" variants={stagger}>
              <motion.p className="body-text" variants={fadeUp}>
                We are a team of founders and operators with deep networks across engineering labs, research teams, and frontier builders — in healthcare, finance, space, and industrial production.
              </motion.p>
              <motion.p className="body-text" variants={fadeUp}>
                We partner with established corporations to identify technology gaps, acquire the right R&D teams, and build the capabilities that close them. Then we help move those assets forward — through M&A or structured SPV capital.
              </motion.p>
              <motion.p className="pull-quote" variants={fadeUp}>
                We don't advise from the sidelines. We get in, build alongside you, and stay until it works.
              </motion.p>
            </motion.div>
          </RevealGroup>
        </div>
      </section>

      {/* ── Model ── */}
      <section className="model-section" id="model">
        <div className="section-inner">
          <Reveal>
            <p className="section-label">How We Work</p>
          </Reveal>
          <RevealGroup className="model-steps">
            {steps.map((s) => (
              <motion.div className="model-step" key={s.num} variants={fadeUp}>
                <span className="step-num">{s.num}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-body">{s.body}</p>
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal>
            <div className="sectors-row">
              <span className="sectors-label">Focus</span>
              {sectors.map((s, i) => (
                <span key={s} style={{ display: 'contents' }}>
                  <span className="sector-item">{s}</span>
                  {i < sectors.length - 1 && <span className="sector-sep" />}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section" id="contact">
        <div className="section-inner">
          <Reveal>
            <p className="section-label">Let's Talk</p>
          </Reveal>
          <Reveal>
            <div className="contact-wrap">
              <h2 className="contact-heading">
                Working with<br /> corporates who<br /> want to move faster
              </h2>
              <div className="contact-right">
                <p className="body-text">
                  If you're a corporate looking to acquire technology capability, or a founder interested in strategic backing — we'd like to hear from you.
                </p>
                <a href="mailto:hello@spvventures.com" className="contact-cta">
                  Get in Touch →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <span className="footer-text">© 2025 SPV Ventures. All rights reserved.</span>
        <span className="footer-text">Lisbon, Portugal</span>
      </footer>

    </div>
  )
}

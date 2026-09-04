import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  metrics,
  situations,
  questions,
  tracks,
  cases,
  slideLabels,
} from '../data/growth'
import '../styles/growth.css'

const TOTAL = slideLabels.length

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const group = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

function Slide({ index, label, children, tone }) {
  return (
    <section
      className={`gr-slide${tone ? ` gr-slide--${tone}` : ''}`}
      id={`slide-${index + 1}`}
      data-index={index}
    >
      <motion.div
        className="gr-slide-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={group}
      >
        <motion.p className="gr-eyebrow" variants={rise}>
          <span className="gr-eyebrow-num">{String(index + 1).padStart(2, '0')}</span>
          {label}
        </motion.p>
        {children}
      </motion.div>
    </section>
  )
}

export default function Growth() {
  const scrollerRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    document.title = 'Точки роста — SPV Ventures'
  }, [])

  // Активный слайд определяем по тому, что занимает середину экрана.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index))
        })
      },
      { root: scroller, rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    scroller.querySelectorAll('.gr-slide').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goTo = (i) => {
    const target = scrollerRef.current?.querySelector(`[data-index="${i}"]`)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Стрелки / PageUp / PageDown — навигация по слайдам, как в презентации.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (active < TOTAL - 1) { e.preventDefault(); goTo(active + 1) }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (active > 0) { e.preventDefault(); goTo(active - 1) }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <div className="gr">
      <header className="gr-nav">
        <a href="/" className="gr-wordmark">SPV Ventures</a>
        <a href="#contact" className="gr-nav-cta">Обсудить задачу</a>
      </header>

      <nav className="gr-rail" aria-label="Навигация по слайдам">
        {slideLabels.map((label, i) => (
          <button
            key={label}
            type="button"
            className={`gr-rail-item${i === active ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
            aria-current={i === active ? 'true' : undefined}
          >
            <span className="gr-rail-dash" />
            <span className="gr-rail-label">{label}</span>
          </button>
        ))}
      </nav>

      <div
        className={`gr-counter${active === TOTAL - 1 ? ' is-hidden' : ''}`}
        aria-hidden="true"
      >
        <span className="gr-counter-now">{String(active + 1).padStart(2, '0')}</span>
        <span className="gr-counter-sep" />
        <span className="gr-counter-total">{String(TOTAL).padStart(2, '0')}</span>
      </div>

      <div className="gr-scroller" ref={scrollerRef}>

        {/* ── 01 · Что мы делаем ── */}
        <Slide index={0} label={slideLabels[0]}>
          <motion.h1 className="gr-hero-title" variants={rise}>
            Помогаем собственникам находить <em>точки роста</em>, усиливать продажи
            сложных B2B-продуктов и превращать технологии в <em>выручку и стоимость</em> компании.
          </motion.h1>
          <motion.div className="gr-metrics" variants={group}>
            {metrics.map((m) => (
              <motion.div className="gr-metric" key={m.value + m.label} variants={rise}>
                <span className="gr-metric-value">{m.value}</span>
                <span className="gr-metric-label">{m.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </Slide>

        {/* ── 02 · Ситуации ── */}
        <Slide index={1} label={slideLabels[1]} tone="mid">
          <motion.h2 className="gr-title" variants={rise}>
            В каких ситуациях<br className="gr-break" /> мы особенно полезны
          </motion.h2>
          <motion.p className="gr-lede" variants={rise}>
            Когда у компании уже есть продукт, команда и рынок,
            но рост упирается в одно из четырёх.
          </motion.p>
          <motion.ol className="gr-list" variants={group}>
            {situations.map((s, i) => (
              <motion.li className="gr-list-item" key={s} variants={rise}>
                <span className="gr-list-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="gr-list-text">{s}</span>
              </motion.li>
            ))}
          </motion.ol>
        </Slide>

        {/* ── 03 · С кем работаем ── */}
        <Slide index={2} label={slideLabels[2]}>
          <div className="gr-split">
            <motion.h2 className="gr-title" variants={rise}>
              С кем<br className="gr-break" /> работаем
            </motion.h2>
            <motion.div className="gr-split-body" variants={group}>
              <motion.p className="gr-body" variants={rise}>
                Работаем с собственниками компаний разного масштаба: от инновационных
                бизнесов с выручкой 100+ млн ₽ до корпораций с выручкой в млрд ₽.
              </motion.p>
              <motion.div className="gr-scale" variants={rise}>
                <span className="gr-scale-point">100+ млн ₽</span>
                <span className="gr-scale-line" />
                <span className="gr-scale-point">млрд ₽</span>
              </motion.div>
              <motion.p className="gr-quote" variants={rise}>
                Особенно полезны там, где есть сложный B2B-продукт, технология,
                инвестиционная сделка или необходимость стратегического перехода.
              </motion.p>
            </motion.div>
          </div>
        </Slide>

        {/* ── 04 · Первая задача ── */}
        <Slide index={3} label={slideLabels[3]} tone="mid">
          <motion.h2 className="gr-title" variants={rise}>
            Какую задачу<br className="gr-break" /> решаем первой
          </motion.h2>
          <motion.ul className="gr-questions" variants={group}>
            {questions.map((q) => (
              <motion.li className="gr-question" key={q} variants={rise}>
                {q}
              </motion.li>
            ))}
          </motion.ul>
        </Slide>

        {/* ── 05 · Направления ── */}
        <Slide index={4} label={slideLabels[4]}>
          <motion.h2 className="gr-title" variants={rise}>
            Что сейчас наиболее<br className="gr-break" /> актуально бизнесу
          </motion.h2>
          <motion.div className="gr-tracks" variants={group}>
            {tracks.map((t, i) => (
              <motion.article className="gr-track" key={t.title} variants={rise}>
                <span className="gr-track-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="gr-track-title">{t.title}</h3>
                <p className="gr-track-body">{t.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </Slide>

        {/* ── 06 · Кейсы ── */}
        <Slide index={5} label={slideLabels[5]} tone="mid">
          <motion.h2 className="gr-title" variants={rise}>Кейсы</motion.h2>
          <motion.div className="gr-cases" variants={group}>
            {cases.map((c) => (
              <motion.article className="gr-case" key={c.client} variants={rise}>
                <h3 className="gr-case-client">{c.client}</h3>
                <p className="gr-case-body">{c.body}</p>
                <div className="gr-case-tags">
                  {c.tags.map((tag) => (
                    <span className="gr-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Slide>

        {/* ── 07 · Контакт ── */}
        <section className="gr-slide gr-slide--cta" id="contact" data-index="6">
          <motion.div
            className="gr-slide-inner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={group}
          >
            <motion.p className="gr-eyebrow" variants={rise}>
              <span className="gr-eyebrow-num">07</span>
              {slideLabels[6]}
            </motion.p>
            <motion.h2 className="gr-cta-title" variants={rise}>
              Расскажите о задаче — разберёмся,<br className="gr-break" /> где может быть <em>точка роста</em>.
            </motion.h2>
            <motion.div className="gr-cta-row" variants={rise}>
              <div className="gr-first-step">
                <span className="gr-first-step-label">Первый шаг</span>
                <p className="gr-first-step-text">
                  30–45 минут диагностического разговора
                  с собственником или CEO.
                </p>
              </div>
              <a href="mailto:hello@spvventures.com?subject=Точки роста" className="gr-button">
                Написать нам →
              </a>
            </motion.div>
          </motion.div>

          <footer className="gr-footer">
            <span>© {new Date().getFullYear()} SPV Ventures</span>
            <a href="/">На главную</a>
          </footer>
        </section>

      </div>
    </div>
  )
}

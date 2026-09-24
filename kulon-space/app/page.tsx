const Arrow = () => <span aria-hidden="true">↗</span>;

const programs = [
  { number: "01", name: "Orbital data centres", copy: "With AI infrastructure leaders, we are defining the path from terrestrial compute to resilient orbital systems—starting with a focused demonstrator that tests the hardest assumptions." },
  { number: "02", name: "Next-generation propulsion", copy: "A new engine architecture for in-space transportation. We are progressing from physics proof to laboratory validation, flight demonstration and a scalable mobility platform." },
];

const method = ["Frame the strategic thesis", "Identify the decisive unknown", "Design the smallest credible proof", "Build the program and the company"];

export default function Home() {
  return <main id="top">
    <header className="nav">
      <a className="brand" href="#top" aria-label="Kulon Space home">Kulon Space</a>
      <nav aria-label="Primary navigation"><a href="#programs">Programs</a><a href="#approach">Approach</a><a href="#team">Team</a><a className="status" href="#contact">Contact</a></nav>
    </header>

    <section className="hero">
      <div className="hero-copy"><div><p className="eyebrow">Frontier space technology lab</p><h1>Strategic bets, built for <em>orbit.</em></h1></div><div className="hero-bottom"><p>We work with industry leaders to turn consequential space theses into technical programs, flight hardware and new companies.</p><span>Space systems / venture design / first-of-kind missions</span></div></div>

    </section>

    <section className="section" id="programs"><div className="section-head"><span>01 / Programs</span><h2>Where the next infrastructure layer begins.</h2></div><div className="tracks">{programs.map(program => <article className="track" key={program.number}><span>{program.number}</span><h3>{program.name}</h3><p>{program.copy}</p></article>)}</div></section>

    <section className="principle" id="approach"><div className="quote"><p className="eyebrow">Operating principle</p><blockquote>Start with the <em>decisive unknown.</em> Build outward from evidence.</blockquote><small>No theatre. No speculative roadmap without a de-risking path.</small></div><ol>{method.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>

    <section className="section proof"><div className="section-head"><span>02 / Flight heritage</span><h2>Built by operators, not observers.</h2></div><div className="metrics"><article><strong>844</strong><span>Satellites deployed through Exolaunch</span></article><article><strong>49</strong><span>Completed launch missions</span></article><article><strong>0→1</strong><span>Companies and technical programs built from first principles</span></article></div><div className="heritage"><small>Founder experience across</small><div><b>EXOLAUNCH</b><b>SPACEX</b><b>Rocket Lab</b></div></div></section>

    <section className="section founders" id="team"><div className="section-head"><span>03 / Founders</span><h2>Technical depth meets company building.</h2></div><div className="founder-grid"><article><div><span>Founder / Space systems</span><h3>Dmitry Sternharz</h3></div><p>Founder of Exolaunch. Built a global leader in launch mission management, satellite integration and deployment technology from a university spin-off to 844 satellites across 49 missions.</p></article><article><div><span>Founder / Strategy &amp; ventures</span><h3>Sergey Prokofyev</h3></div><p>Entrepreneur and strategist across deep technology, healthcare and AI. Turns complex technology into products, market entry strategies and investable companies.</p></article></div></section>

    <section className="closing" id="contact"><p className="eyebrow">Selective collaborations</p><h2>What should exist in space next?</h2><div><p>We work with ambitious technology companies, infrastructure leaders and investors on bets that require strategic clarity and real execution.</p><a href="mailto:founders@kulon.space">Start a conversation <Arrow /></a></div></section>
    <footer><span>© 2026 Kulon Space</span><span>Frontier space technology lab</span></footer>
  </main>;
}

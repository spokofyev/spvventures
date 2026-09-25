import Image from "next/image";
import Arrow from "./arrow";
import AskAi from "./ask-ai";
import Navigation from "./navigation";

const projects = [
  { number: "01", name: "Orbital data centres", copy: "Compute is becoming the defining resource of the AI economy, and on Earth it is increasingly constrained by power, land and permitting. Orbit offers near-continuous solar energy and room to scale. We work with AI infrastructure leaders to define how compute moves beyond Earth." },
  { number: "02", name: "Next-generation propulsion", copy: "In-space mobility is limited by the energy and propellant a spacecraft can carry. We are developing a new engine architecture built to do more with less mass. The result: spacecraft that reach more orbits, operate longer and deliver more value per launch." },
  { number: "03", name: "Orbital robotics", copy: "Robotic systems for servicing, assembly and maintenance in orbit—extending the life of space assets and making it possible to build structures too large to launch in one piece." },
];

const SectionHead = ({ label, children }: { label: string; children: React.ReactNode }) =>
  <div className="section-head"><span>{label}</span><h2>{children}</h2></div>;

export default function Home() {
  return <main id="top">
    <header className="nav">
      <a className="brand" href="#top" aria-label="Kulon Space home">Kulon</a>
      <Navigation />
    </header>

    <section className="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">Kulon is a space tech lab focused on next generation orbital infrastructure</h1>
      <div className="hero-bottom"><p>We build frontier space technology and partner with industry leaders to turn it into products and solutions the market needs.</p><p className="locations">Berlin <span aria-hidden="true">/</span> London</p></div>
      <div className="hero-image"><Image src="/orbital-horizon.webp" alt="Sunrise over Earth's curved horizon and vast cloud-covered oceans" width={1536} height={1024} sizes="(max-width: 1600px) 92vw, 1472px" priority /></div>
    </section>

    <section className="section" id="thesis">
      <SectionHead label="01 / Thesis">New space is growing faster than the infrastructure to support it.</SectionHead>
      <div className="section-body">
        <p className="lead">More launches, more satellites and more companies operating in orbit. Each step forward exposes the limits of today&apos;s systems: how to service what is already up there, how to build at scale beyond Earth, and how to move at all. Current propulsion is bound by energy and mass, which caps where spacecraft can go, how long they last and what they can carry. Removing these limits decides how far the space economy can grow.</p>
      </div>
    </section>

    <section className="section" id="projects">
      <SectionHead label="02 / Projects">Where the next infrastructure layer begins.</SectionHead>
      <div className="section-body tracks">{projects.map(program => <article className="track" key={program.number}><span>{program.number}</span><h3>{program.name}</h3><p>{program.copy}</p></article>)}</div>
    </section>

    <section className="section" id="team">
      <SectionHead label="03 / Team">A team of space pioneers: scientists, entrepreneurs and world-leading operators.</SectionHead>
      <div className="section-body">
        <div className="founder-grid">
          <article><div><span>Founder / Space systems</span><h3>Dmitry Sternharz</h3></div><p>Founder of Exolaunch, which he led from a university spin-off to a global leader in launch mission management, satellite integration and deployment: 844 satellites across 49 missions. He now focuses on the next layer of orbital infrastructure, the systems that let the space economy scale beyond launch.</p><a className="button" href="https://de.linkedin.com/in/dmitriy-sternharz-b6605836" target="_blank" rel="noopener noreferrer">Connect with founder <Arrow /></a></article>
          <article><div><span>Founder / Strategy &amp; ventures</span><h3>Sergey Prokofyev</h3></div><p>Serial entrepreneur and strategist building companies at the intersection of deep technology, healthcare and AI. Takes frontier technologies from concept to product, market entry and institutional investment.</p><a className="button" href="https://www.linkedin.com/in/sprokofyev" target="_blank" rel="noopener noreferrer">Connect with founder <Arrow /></a></article>
        </div>
        <div className="join" id="join"><div><h3>Join the team</h3><p>We are a small team working on hard problems in orbit. If you build in space systems, robotics, propulsion or AI infrastructure, tell us what you have built.</p></div><a className="button" href="mailto:founders@kulon.space?subject=Joining%20Kulon">Get in touch <Arrow /></a></div>
      </div>
    </section>

    <section className="section" id="ask-ai">
      <SectionHead label="04 / Ask AI">Ask an AI about Kulon.</SectionHead>
      <div className="section-body ask"><AskAi /></div>
    </section>

    <section className="section closing" id="contact">
      <SectionHead label="05 / Contact">Partner with us.</SectionHead>
      <div className="section-body"><p>We work with ambitious technology companies, infrastructure leaders and investors on bets that require strategic clarity and real execution.</p><a className="button" href="mailto:founders@kulon.space">Start a conversation <Arrow /></a></div>
    </section>
    <footer><span>© 2026 Kulon Space</span><span>Berlin / London</span></footer>
  </main>;
}

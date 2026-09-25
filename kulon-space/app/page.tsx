import Image from "next/image";
import Arrow from "./arrow";
import Navigation from "./navigation";

const challenges = [
  { name: "Service", copy: "Keeping assets in orbit working longer: inspection, repair, refuelling and removal." },
  { name: "Build", copy: "Producing and assembling infrastructure in space instead of launching everything finished." },
  { name: "Navigate", copy: "Moving safely and efficiently through an increasingly crowded orbital environment." },
];

const projects = [
  { number: "01", name: "Orbital data centres", copy: "With AI infrastructure leaders, we are defining the path from terrestrial compute to resilient orbital systems—starting with a focused demonstrator that tests the hardest assumptions." },
  { number: "02", name: "Next-generation propulsion", copy: "A new engine architecture for in-space transportation. We are progressing from physics proof to laboratory validation, flight demonstration and a scalable mobility platform." },
  { number: "03", name: "Orbital robotics", copy: "Robotic systems for servicing, assembly and maintenance in orbit—extending the life of space assets and making it possible to build structures too large to launch in one piece." },
];

const method = ["Define where the market and technology are going", "Identify the enabling technology", "Turn it into a product or solution", "Prove it, build it and scale it"];

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
      <div className="hero-bottom"><p>We work with industry leaders to turn ambitious space visions into technologies, products and solutions the market needs.</p><p className="locations">Berlin <span aria-hidden="true">/</span> London</p></div>
      <div className="hero-image"><Image src="/orbital-horizon.webp" alt="Sunrise over Earth's curved horizon and vast cloud-covered oceans" width={1536} height={1024} sizes="(max-width: 1600px) 92vw, 1472px" priority /></div>
    </section>

    <section className="section" id="context">
      <SectionHead label="01 / Context">New space is growing faster than the infrastructure to support it.</SectionHead>
      <div className="section-body">
        <p className="lead">More launches, more satellites and more companies operating in orbit. Each step forward exposes new problems: how to service what is already up there, how to build at scale beyond Earth, and how to navigate a crowded environment. Solving them decides how far the space economy can grow.</p>
        <div className="challenges">{challenges.map(item => <article key={item.name}><h3>{item.name}</h3><p>{item.copy}</p></article>)}</div>
      </div>
    </section>

    <section className="section" id="projects">
      <SectionHead label="02 / Projects">Where the next infrastructure layer begins.</SectionHead>
      <div className="section-body tracks">{projects.map(program => <article className="track" key={program.number}><span>{program.number}</span><h3>{program.name}</h3><p>{program.copy}</p></article>)}</div>
    </section>

    <section className="section" id="approach">
      <SectionHead label="03 / Approach">From where technology is going to what the market needs.</SectionHead>
      <div className="section-body principle">
        <p>We start with the long-term shift, identify the enabling technology, then build the product, proof and company around a real market need.</p>
        <ol>{method.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
      </div>
    </section>

    <section className="section" id="team">
      <SectionHead label="04 / Team">Founded by builders of space hardware and companies.</SectionHead>
      <div className="section-body founder-grid">
        <article><div><span>Founder / Space systems</span><h3>Dmitry Sternharz</h3></div><p>Founder of Exolaunch. Built a global leader in launch mission management, satellite integration and deployment technology from a university spin-off to 844 satellites across 49 missions.</p></article>
        <article><div><span>Founder / Strategy &amp; ventures</span><h3>Sergey Prokofyev</h3></div><p>Entrepreneur and strategist across deep technology, healthcare and AI. Turns complex technology into products, market entry strategies and investable companies.</p><a className="button" href="https://www.linkedin.com/in/sprokofyev" target="_blank" rel="noopener noreferrer">Connect with founder <Arrow /></a></article>
      </div>
    </section>

    <section className="section closing" id="contact">
      <SectionHead label="05 / Contact">What should exist in space next?</SectionHead>
      <div className="section-body"><p>We work with ambitious technology companies, infrastructure leaders and investors on bets that require strategic clarity and real execution.</p><a className="button" href="mailto:founders@kulon.space">Start a conversation <Arrow /></a></div>
    </section>
    <footer><span>© 2026 Kulon Space</span><span>Berlin / London</span></footer>
  </main>;
}

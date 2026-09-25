import Image from "next/image";
import Arrow from "./arrow";
import AskAi from "./ask-ai";
import Navigation from "./navigation";

const projects = [
  { name: "Orbital data centres", copy: "Compute is becoming the defining resource of the AI economy, and on Earth it is increasingly constrained by power, land and permitting. Orbit offers near-continuous solar energy and room to scale. We work with AI infrastructure leaders to define how compute moves beyond Earth." },
  { name: "Next-generation propulsion", copy: "In-space mobility is limited by the energy and propellant a spacecraft can carry. We are developing a new engine architecture built to do more with less mass. The result: spacecraft that reach more orbits, operate longer and deliver more value per launch." },
  { name: "Orbital robotics", copy: "Robotic systems for servicing, assembly and maintenance in orbit—extending the life of space assets and making it possible to build structures too large to launch in one piece." },
];

const audiences = ["Industry partners", "Researchers & engineers", "Investors"];

const SectionHead = ({ label, children }: { label: string; children: React.ReactNode }) =>
  <div className="section-head"><span>{label}</span><h2>{children}</h2></div>;

export default function Home() {
  return <main id="top">
    <header className="nav">
      <a className="brand" href="#top" aria-label="Kulon Space home">Kulon</a>
      <Navigation />
    </header>

    <section className="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">Building the infrastructure for an economy beyond Earth.</h1>
      <div className="hero-bottom"><p>Kulon is a frontier space technology lab building the systems required to compute, move and build in orbit.</p><p className="locations">Berlin <span aria-hidden="true">/</span> London</p></div>
      <div className="hero-image"><Image src="/orbital-horizon.webp" alt="Sunrise over Earth's curved horizon and vast cloud-covered oceans" width={1536} height={1024} sizes="(max-width: 1600px) 92vw, 1472px" priority /></div>
    </section>

    <section className="section" id="thesis">
      <SectionHead label="01 / Thesis">Reaching orbit is becoming routine. What we build there comes next.</SectionHead>
      <div className="section-body">
        <p className="lead">Satellite constellations have become industrial-scale systems, and AI is creating unprecedented demand for energy and compute. Together they shift the bottleneck from getting to orbit to operating there. That means computing, moving and building at scale in space, and the companies that solve it will define the economy beyond Earth.</p>
      </div>
    </section>

    <section className="section" id="projects">
      <SectionHead label="02 / Projects">The space economy is moving from access to infrastructure.</SectionHead>
      <div className="section-body">
        <p className="lead">Compute, mobility and construction are three fundamental capabilities it will require. We are building them.</p>
        <div className="tracks">{projects.map(program => <article className="track" key={program.name}><h3>{program.name}</h3><p>{program.copy}</p></article>)}</div>
      </div>
    </section>

    <section className="section" id="team">
      <SectionHead label="03 / Team">Built by people who have taken space systems and technology companies from zero to scale.</SectionHead>
      <div className="section-body founder-grid">
        <article><div><span>Founder / Space systems</span><h3>Dmitry Sternharz</h3></div><p>Founder of Exolaunch, which he led from a university spin-off to a global leader in launch mission management, satellite integration and deployment: 844 satellites across 49 missions. He now focuses on the next layer of orbital infrastructure, the systems that let the space economy scale beyond launch.</p><a className="button" href="https://de.linkedin.com/in/dmitriy-sternharz-b6605836" target="_blank" rel="noopener noreferrer">Connect with founder <Arrow /></a></article>
        <article><div><span>Founder / Strategy &amp; ventures</span><h3>Sergey Prokofyev</h3></div><p>Serial entrepreneur and strategist building companies at the intersection of deep technology, healthcare and AI. Takes frontier technologies from concept to product, market entry and institutional investment.</p><a className="button" href="https://www.linkedin.com/in/sprokofyev" target="_blank" rel="noopener noreferrer">Connect with founder <Arrow /></a></article>
      </div>
    </section>

    <section className="section closing" id="contact">
      <SectionHead label="04 / Work with us">Build with us.</SectionHead>
      <div className="section-body">
        <p className="audiences">{audiences.map((item, index) => <span key={item}>{index > 0 && <i aria-hidden="true">/</i>}{item}</span>)}</p>
        <a className="button audiences-cta" href="mailto:founders@kulon.space">Get in touch <Arrow /></a>
      </div>
    </section>

    <footer>
      <span>© 2026 Kulon Space</span>
      <div className="footer-ai"><span>Ask AI about Kulon</span><AskAi /></div>
      <span>Berlin / London</span>
    </footer>
  </main>;
}

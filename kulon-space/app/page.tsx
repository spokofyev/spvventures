import Image from "next/image";
import { SectionHead, SiteFooter, SiteHeader, WorkWithUs } from "./site";

const projects = [
  { name: "Orbital data centres", copy: "Compute is becoming the defining resource of the AI economy, and on Earth it is increasingly constrained by power, land and permitting. Orbit offers near-continuous solar energy and room to scale. We work with AI infrastructure leaders to define how compute moves beyond Earth." },
  { name: "Next-generation propulsion", copy: "In-space mobility is limited by the energy and propellant a spacecraft can carry. We are developing a new engine architecture built to do more with less mass. The result: spacecraft that reach more orbits, operate longer and deliver more value per launch." },
  { name: "Orbital robotics", copy: "Robotic systems for servicing, assembly and maintenance in orbit—extending the life of space assets and making it possible to build structures too large to launch in one piece." },
];

export default function Home() {
  return <main id="top">
    <SiteHeader />

    <section className="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">Building the infrastructure for an economy beyond Earth.</h1>
      <div className="hero-bottom"><p>Kulon is a frontier space technology lab building the systems required to compute, move and build in orbit.</p><p className="locations">Berlin <span aria-hidden="true">/</span> London</p></div>
      <div className="hero-image"><Image src="/orbital-horizon.webp" alt="Sunrise over Earth's curved horizon and vast cloud-covered oceans" width={1536} height={1024} sizes="(max-width: 1600px) 92vw, 1472px" priority /></div>
    </section>

    <section className="section" id="thesis">
      <SectionHead label="01 / Thesis">Reaching orbit is becoming routine. What we build there comes next.</SectionHead>
      <div className="section-body">
        <p className="lead">Satellite constellations have become industrial-scale systems, and AI is creating unprecedented demand for energy and compute. Getting to orbit is no longer the constraint. What limits the next phase is what we can do once we&apos;re there: most spacecraft still have little power for computing, little fuel to change orbit, and no way to be repaired or upgraded. The companies that remove these limits will define the economy beyond Earth.</p>
      </div>
    </section>

    <section className="section" id="projects">
      <SectionHead label="02 / Projects">The space economy is moving from access to infrastructure.</SectionHead>
      <div className="section-body">
        <p className="lead">Compute, mobility and construction are three fundamental capabilities it will require. We are building them.</p>
        <div className="tracks">{projects.map(program => <article className="track" key={program.name}><h3>{program.name}</h3><p>{program.copy}</p></article>)}</div>
      </div>
    </section>

    <WorkWithUs label="03 / Work with us" />
    <SiteFooter />
  </main>;
}

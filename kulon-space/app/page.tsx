import Image from "next/image";
import Arrow from "./arrow";
import { SectionHead, SiteFooter, SiteHeader, WorkWithUs } from "./site";

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
        <p className="lead">Satellite constellations have become industrial-scale systems, and AI is creating unprecedented demand for energy and compute. The next phase of the space economy depends on what can be done once in orbit, and most of the infrastructure it needs does not exist yet. The companies that build it will define the economy beyond Earth.</p>
      </div>
    </section>

    <section className="section" id="team">
      <SectionHead label="02 / Team">Built by people who have taken space systems and technology companies from zero to scale.</SectionHead>
      <div className="section-body founder-grid">
        <article><div><span>Founder</span><h3>Dmitry Sternharz</h3></div><p>Founder of Exolaunch, which he led from a university spin-off to a global leader in launch mission management, satellite integration and deployment: 844 satellites across 49 missions. He now focuses on the next layer of orbital infrastructure, the systems that let the space economy scale beyond launch.</p><a className="button" href="https://de.linkedin.com/in/dmitriy-sternharz-b6605836" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <Arrow /></a></article>
        <article><div><span>Founding team / Leadership</span><h3>Sergey Prokofyev</h3></div><p>Serial entrepreneur and strategist building companies at the intersection of deep technology, healthcare and AI. Takes frontier technologies from concept to product, market entry and institutional investment.</p><a className="button" href="https://www.linkedin.com/in/sprokofyev" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <Arrow /></a></article>
      </div>
    </section>

    <WorkWithUs label="03 / Work with us" />
    <SiteFooter />
  </main>;
}

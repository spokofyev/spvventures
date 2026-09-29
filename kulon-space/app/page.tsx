import Image from "next/image";
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

    <WorkWithUs label="02 / Work with us" />
    <SiteFooter />
  </main>;
}

import Image from "next/image";
import { SectionHead, SiteFooter, SiteHeader, WorkWithUs } from "./site";

const leaders = [
  { name: "Dmitry Sternharz", role: "Founder", photo: "/team/dmitry-sternharz.webp", width: 410, height: 513, linkedin: "https://de.linkedin.com/in/dmitriy-sternharz-b6605836" },
  { name: "Sergey Prokofyev", role: "Founding team / Leadership", photo: "/team/sergey-prokofyev.webp", width: 640, height: 800, linkedin: "https://www.linkedin.com/in/sprokofyev" },
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
        <p className="lead">Satellite constellations have become industrial-scale systems, and AI is creating unprecedented demand for energy and compute. The next phase of the space economy depends on what can be done once in orbit, and most of the infrastructure it needs does not exist yet. The companies that build it will define the economy beyond Earth.</p>
      </div>
    </section>

    <section className="section" id="team">
      <SectionHead label="02 / Team">Our founder.</SectionHead>
      <div className="section-body">
        <div className="founder">
          <Image className="founder-photo" src="/team/dmitry-sternharz-founder.webp" alt="Dmitry Sternharz" width={513} height={513} sizes="(max-width: 760px) 92vw, 520px" />
          <p className="founder-bio">Dmitry Sternharz, Kulon&apos;s founder, built Exolaunch from a university spin-off into a global leader in launch mission management, satellite integration and deployment: 844 satellites across 49 missions. Having helped make access to orbit routine, he founded Kulon to build the next layer of orbital infrastructure, the systems that let the space economy scale beyond launch.</p>
        </div>
        <h2 className="subhead">Our leadership.</h2>
        <div className="leaders">{leaders.map(person => <a className="leader" key={person.name} href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name}, ${person.role}, on LinkedIn`}>
          <Image src={person.photo} alt="" width={person.width} height={person.height} sizes="(max-width: 760px) 92vw, 360px" />
          <span className="leader-text"><strong>{person.name}</strong><span>{person.role}</span></span>
        </a>)}</div>
      </div>
    </section>

    <WorkWithUs label="03 / Work with us" />
    <SiteFooter />
  </main>;
}

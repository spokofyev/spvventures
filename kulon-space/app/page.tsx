import Image from "next/image";
import Arrow from "./arrow";
import { SiteFooter, WorkWithUs } from "./site";

// Temporarily hidden: set to true to bring back Thesis, Team, Work with us and the footer.
const SHOW_SECTIONS = false;
// Temporarily hidden: the cycling Compute / Move / Build label and ring under the headline.
const SHOW_CYCLE = false;

export default function Home() {
  return <>
    <section className="stage" aria-labelledby="hero-heading">
      <Image className="stage-img" src="/orbital-horizon.webp" alt="Sunrise over Earth's curved horizon and vast cloud-covered oceans" fill sizes="100vw" priority />
      <div className="stage-inner">
        <header className="nav nav-center"><span className="brand brand-caps" aria-label="Kulon">KULON</span></header>
        <div className="stage-copy">
          <h1 id="hero-heading" className="stage-title"><span><span>Infrastructure</span></span> <span><span>beyond</span></span> <span><span>Earth.</span></span></h1>
          {SHOW_CYCLE && <div className="stage-cycle" aria-hidden="true">
            <div className="stage-words"><span>Compute</span><span>Move</span><span>Build</span></div>
            <svg className="stage-ring" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" /><circle className="stage-ring-fill" cx="16" cy="16" r="14" /></svg>
          </div>}
          <a className="button button-white stage-cta" href="mailto:founders@kulon.space">Get in touch <Arrow /></a>
        </div>
        <p className="stage-foot">Built in London and Berlin.</p>
      </div>
    </section>

  {SHOW_SECTIONS && <>
  <main id="top">
    <section className="block" id="thesis">
      <h2 className="block-title"><strong>Our thesis</strong><span>What we build in orbit comes next.</span></h2>
      <p className="block-text">Kulon is a frontier space technology lab built in London and Berlin. Satellite constellations have become industrial-scale systems, and AI is creating unprecedented demand for energy and compute. Reaching orbit is becoming routine; the next phase of the space economy depends on what can be done once there, and most of the infrastructure it needs does not exist yet. The companies that build it will define the economy beyond Earth.</p>
    </section>

    <section className="block" id="team">
      <h2 className="block-title"><strong>Our team</strong><span>Led by space pioneers.</span></h2>
      <p className="block-text">Kulon was founded by <a href="https://de.linkedin.com/in/dmitriy-sternharz-b6605836" target="_blank" rel="noopener noreferrer">Dmitry Sternharz</a>, who built Exolaunch from a university spin-off into a global leader in launch mission management, satellite integration and deployment, with 844 satellites flown across 49 missions. He is joined by <a href="https://www.linkedin.com/in/sprokofyev" target="_blank" rel="noopener noreferrer">Sergey Prokofyev</a>, a serial entrepreneur who takes frontier technologies from concept to product, market and investment.</p>
      <div className="block-actions"><a className="button" href="mailto:founders@kulon.space?subject=Joining%20Kulon">Join the team <Arrow /></a><span className="mono">London / Berlin</span></div>
    </section>

    <WorkWithUs />
    <SiteFooter />
  </main>
  </>}
  </>;
}

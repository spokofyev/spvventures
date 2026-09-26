import type { Metadata } from "next";
import Arrow from "../arrow";
import { SectionHead, SiteFooter, SiteHeader, WorkWithUs } from "../site";

export const metadata: Metadata = {
  title: "Company — Kulon Space",
  description: "The team behind Kulon Space, a frontier space technology lab in Berlin and London.",
  alternates: { canonical: "/company" },
};

export default function Company() {
  return <main id="top">
    <SiteHeader />

    <section className="hero page-hero" aria-labelledby="company-heading">
      <h1 id="company-heading">A frontier space technology lab.</h1>
      <div className="hero-bottom"><p>Kulon brings together people who have built space systems and technology companies, to develop the infrastructure the economy beyond Earth will run on.</p><p className="locations">Berlin <span aria-hidden="true">/</span> London</p></div>
    </section>

    <section className="section" id="team">
      <SectionHead label="01 / Team">Built by people who have taken space systems and technology companies from zero to scale.</SectionHead>
      <div className="section-body founder-grid">
        <article><div><span>Founder / Space systems</span><h3>Dmitry Sternharz</h3></div><p>Founder of Exolaunch, which he led from a university spin-off to a global leader in launch mission management, satellite integration and deployment: 844 satellites across 49 missions. He now focuses on the next layer of orbital infrastructure, the systems that let the space economy scale beyond launch.</p><a className="button" href="https://de.linkedin.com/in/dmitriy-sternharz-b6605836" target="_blank" rel="noopener noreferrer">Connect with founder <Arrow /></a></article>
        <article><div><span>Founder / Strategy &amp; ventures</span><h3>Sergey Prokofyev</h3></div><p>Serial entrepreneur and strategist building companies at the intersection of deep technology, healthcare and AI. Takes frontier technologies from concept to product, market entry and institutional investment.</p><a className="button" href="https://www.linkedin.com/in/sprokofyev" target="_blank" rel="noopener noreferrer">Connect with founder <Arrow /></a></article>
      </div>
    </section>

    <WorkWithUs label="02 / Work with us" />
    <SiteFooter />
  </main>;
}

import Image from "next/image";
import Navigation from "./navigation";

const Arrow = () => <span aria-hidden="true">↗</span>;

const projects = [
  { number: "01", name: "Orbital data centres", copy: "With AI infrastructure leaders, we are defining the path from terrestrial compute to resilient orbital systems—starting with a focused demonstrator that tests the hardest assumptions." },
  { number: "02", name: "Next-generation propulsion", copy: "A new engine architecture for in-space transportation. We are progressing from physics proof to laboratory validation, flight demonstration and a scalable mobility platform." },
];

const method = ["Define where the market and technology are going", "Identify the enabling technology", "Turn it into a product or solution", "Prove it, build it and scale it"];

export default function Home() {
  return <main id="top">
    <header className="nav">
      <a className="brand" href="#top" aria-label="Kulon Space home">Kulon Space</a>
      <Navigation />
    </header>

    <section className="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading">Kulon is a space tech lab focused on next generation orbital infrastructure</h1>
      <div className="hero-bottom"><p>We work with industry leaders to turn ambitious space visions into technologies, products and solutions the market needs.</p></div>
      <div className="hero-image"><Image src="/orbital-horizon.webp" alt="Sunrise over Earth's curved horizon and vast cloud-covered oceans" width={1536} height={1024} sizes="(max-width: 1600px) 92vw, 1472px" priority /></div>
    </section>

    <section className="section" id="projects"><div className="section-head"><span>01 / Projects</span><h2>Where the next infrastructure layer begins.</h2></div><div className="tracks">{projects.map(program => <article className="track" key={program.number}><span>{program.number}</span><h3>{program.name}</h3><p>{program.copy}</p></article>)}</div></section>

    <section className="principle" id="approach"><div className="quote"><p className="eyebrow">Operating principle</p><blockquote>From where technology is going to what the market needs.</blockquote><p className="approach-copy">We start with the long-term shift, identify the enabling technology, then build the product, proof and company around a real market need.</p></div><ol>{method.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>

    <section className="section founders" id="team"><div className="section-head"><span>02 / Team</span><h2>Technical depth meets company building.</h2></div><div className="founder-grid"><article><div><span>Founder / Space systems</span><h3>Dmitry Sternharz</h3></div><p>Founder of Exolaunch. Built a global leader in launch mission management, satellite integration and deployment technology from a university spin-off to 844 satellites across 49 missions.</p></article><article><div><span>Founder / Strategy &amp; ventures</span><h3>Sergey Prokofyev</h3></div><p>Entrepreneur and strategist across deep technology, healthcare and AI. Turns complex technology into products, market entry strategies and investable companies.</p></article></div></section>

    <section className="closing" id="contact"><p className="eyebrow">Selective collaborations</p><h2>What should exist in space next?</h2><div><p>We work with ambitious technology companies, infrastructure leaders and investors on bets that require strategic clarity and real execution.</p><a href="mailto:founders@kulon.space">Start a conversation <Arrow /></a></div></section>
    <footer><span>© 2026 Kulon Space</span><span>Frontier space technology lab</span></footer>
  </main>;
}

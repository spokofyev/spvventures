import Arrow from "./arrow";
import AskAi from "./ask-ai";
import Navigation from "./navigation";

export function SiteHeader() {
  return <header className="nav">
    <a className="brand" href="/" aria-label="Kulon Space home">Kulon</a>
    <Navigation />
  </header>;
}

export function WorkWithUs() {
  return <section className="block block-last" id="contact">
    <h2 className="block-title"><strong>Work with us</strong><span>Build the economy beyond Earth.</span></h2>
    <p className="block-text">We work with industry partners, researchers and engineers, and investors who want to shape the next layer of space infrastructure.</p>
    <div className="block-actions"><a className="button" href="mailto:founders@kulon.space">Get in touch <Arrow /></a><span className="mono">founders@kulon.space</span></div>
  </section>;
}

export function SiteFooter() {
  return <footer>
    <span>© 2026 Kulon Space</span>
    <div className="footer-ai"><span>Ask AI about Kulon</span><AskAi /></div>
    <span>Berlin / London</span>
  </footer>;
}

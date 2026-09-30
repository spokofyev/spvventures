import Arrow from "./arrow";
import AskAi from "./ask-ai";
import Navigation from "./navigation";

export const SectionHead = ({ title, children }: { title: string; children: React.ReactNode }) =>
  <div className="section-head"><h2>{title}</h2><p className="section-sub">{children}</p></div>;

export function SiteHeader() {
  return <header className="nav">
    <a className="brand" href="/" aria-label="Kulon Space home">Kulon</a>
    <Navigation />
  </header>;
}

const audiences = ["Industry partners", "Researchers & engineers", "Investors"];

export function WorkWithUs() {
  return <section className="section closing" id="contact">
    <SectionHead title="Work with us">Build with us.</SectionHead>
    <div className="section-body">
      <p className="audiences">{audiences.map((item, index) => <span key={item}>{index > 0 && <i aria-hidden="true">/</i>}{item}</span>)}</p>
      <a className="button audiences-cta" href="mailto:founders@kulon.space">Get in touch <Arrow /></a>
    </div>
  </section>;
}

export function SiteFooter() {
  return <footer>
    <span>© 2026 Kulon Space</span>
    <div className="footer-ai"><span>Ask AI about Kulon</span><AskAi /></div>
    <span>Berlin / London</span>
  </footer>;
}

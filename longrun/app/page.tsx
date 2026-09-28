import Glow from "./glow";
import { mailto, site } from "./site";

export default function Page() {
  return (
    <>
      <Glow />
      <main className="screen">
        <header className="brand">
          <svg className="mark" viewBox="0 0 28 20" width="34" height="24" aria-hidden><path d="M1 15h26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M6 15a8 8 0 0 1 16 0" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"/><circle cx="14" cy="7" r="1.6" fill="var(--accent)"/></svg>
          {site.name}
        </header>

        <section className="intro" aria-label="Introduction">
          <p className="tags">
            Dynamic environments<span aria-hidden>·</span>Long-horizon RL<span aria-hidden>·</span>Agent evaluation
          </p>
          <h1>Train agents for work that unfolds over time.</h1>
          <p className="sub">
            We generate non-stationary, long-horizon environments that keep changing while the agent works, emulate days or
            weeks of time, and are realistic enough that agents can&rsquo;t tell they&rsquo;re simulated.
          </p>
          <nav className="actions" aria-label="Primary">
            <a href={mailto("Research conversation")} className="btn btn-primary">
              Work with us <span className="arrow" aria-hidden>→</span>
            </a>
            {/* Careers hidden for now; restore: <a href={mailto("Research engineering")} className="btn">Careers</a> */}
          </nav>
          <p className="credit">
            Founded by researchers and builders from <span className="credit-logo">Meta</span>
          </p>
        </section>
      </main>
    </>
  );
}

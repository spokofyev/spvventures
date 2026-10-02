import Glow from "./glow";
import { asset, mailto, site } from "./site";

export default function Page() {
  return (
    <>
      <Glow />
      <main className="screen">
        <header className="brand">{site.name}</header>

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
            Founded by researchers and builders from{" "}
            <img className="credit-logo" src={asset("/meta-white.png")} alt="Meta" width={544} height={113} />
          </p>
          <a
            className="social"
            href="https://www.linkedin.com/in/sprokofyev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
              <rect x="1" y="1" width="22" height="22" rx="5" fill="currentColor" />
              <circle cx="7" cy="7.2" r="1.6" fill="#05070d" />
              <rect x="5.6" y="10" width="2.8" height="8.4" rx="0.4" fill="#05070d" />
              <path d="M10.6 10h2.7v1.3c.5-.9 1.6-1.5 2.9-1.5 2.1 0 3.2 1.3 3.2 3.8v4.8h-2.8v-4.4c0-1.2-.5-1.9-1.5-1.9s-1.7.8-1.7 2v4.3h-2.8z" fill="#05070d" />
            </svg>
          </a>
        </section>
      </main>
    </>
  );
}

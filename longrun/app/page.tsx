import Glow from "./glow";
import { mailto, site } from "./site";

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
            We build dynamic, long-horizon environments for training and evaluating AI agents in realistic professional
            workflows.
          </p>
          <nav className="actions" aria-label="Primary">
            <a href={mailto("Research conversation")} className="btn btn-primary">
              Work with us <span className="arrow" aria-hidden>→</span>
            </a>
            <a href={mailto("Research engineering")} className="btn">
              Careers
            </a>
          </nav>
          <p className="credit">Built by AI researchers from Meta</p>
        </section>
      </main>
    </>
  );
}

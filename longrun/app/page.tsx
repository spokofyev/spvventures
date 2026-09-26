import Terrain from "./terrain";

// TODO: confirm the real addresses and the Browse destination before launch.
const CONTACT = "mailto:hello@longrun.ai";
const BROWSE = "mailto:hello@longrun.ai?subject=Environment%20catalog";
const CAREERS = "mailto:careers@longrun.ai";

export default function Page() {
  return (
    <main className="screen">
      <header className="brand" aria-label="Longrun">
        <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden>
          <path d="M16 2 29 9.5v13L16 30 3 22.5v-13Z" fill="#3a3a3a" />
          <path d="M16 16 29 9.5M16 16v14M16 16 3 9.5" stroke="#f3f3f1" strokeWidth="2.2" />
        </svg>
        <span>longrun</span>
      </header>

      <div className="visual">
        <Terrain />
      </div>

      <section className="intro">
        <p className="tags">
          Frontier Data Research<span aria-hidden>·</span>Evaluations<span aria-hidden>·</span>Dynamic Environments
        </p>
        <h1>Frontier data for frontier models</h1>
        <p className="sub">
          Evaluations and dynamic environments that leading AI labs use to measure, train, and improve their models
        </p>
        <nav className="actions" aria-label="Primary">
          <a href={CONTACT} className="btn btn-primary">
            Contact <span className="arrow" aria-hidden>→</span>
          </a>
          <a href={BROWSE} className="btn">
            Browse
          </a>
          <a href={CAREERS} className="btn">
            Careers
          </a>
        </nav>
      </section>
    </main>
  );
}

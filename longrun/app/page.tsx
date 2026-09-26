import Hexfield from "./hexfield";

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
        <Hexfield />
      </div>

      <section className="intro">
        <p className="tags">
          Long-Horizon Agents<span aria-hidden>·</span>Dynamic Environments<span aria-hidden>·</span>Verified Rewards
        </p>
        <h1>Train agents for the long run</h1>
        <p className="sub">
          Reinforcement learning environments
          <br />
          that keep changing while your agent works
        </p>
        <nav className="actions" aria-label="Primary">
          <a href={CONTACT} className="btn">
            Contact
          </a>
          <a href={BROWSE} className="btn btn-active">
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

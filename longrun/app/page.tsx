import Horizon from "./horizon";

// TODO: confirm the real contact and careers addresses before launch.
const CONTACT = "mailto:hello@longrun.ai";
const CAREERS = "mailto:careers@longrun.ai";

export default function Page() {
  return (
    <main className="screen">
      <header className="brand">
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden>
          <path d="M3 24h26" stroke="currentColor" strokeOpacity=".35" strokeWidth="2" />
          <path d="M3 24c5 0 6-13 13-13s8 7 13 7" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
        longrun
      </header>

      <Horizon />

      <section className="intro">
        <p className="label">Long-horizon agents · Living environments · Checkpointed rewards</p>
        <h1>
          The world keeps moving. <em>Train agents that keep up.</em>
        </h1>
        <p className="sub">Dynamic RL environments that change while the model works.</p>
        <div className="actions">
          <a href={CONTACT} className="btn btn-primary">
            Contact
          </a>
          <a href={CAREERS} className="btn">
            Careers
          </a>
        </div>
      </section>
    </main>
  );
}

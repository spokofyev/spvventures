import Horizon from "./horizon";

// TODO: confirm the real contact and careers addresses before launch.
const CONTACT = "mailto:hello@longrun.ai";
const CAREERS = "mailto:careers@longrun.ai";

const offerings = [
  {
    k: "01",
    title: "Living environments",
    body: "Stateful worlds with their own clock. Repos get new commits, tickets move, dependencies break, people change their minds. The agent works inside a system that does not wait for it.",
  },
  {
    k: "02",
    title: "Long-horizon tasks",
    body: "Work that takes hours of wall-clock time and thousands of actions: migrations, investigations, multi-day operations. Built from real production work, not puzzles written for a benchmark.",
  },
  {
    k: "03",
    title: "Checkpointed rewards",
    body: "Verifiers at every milestone, not just the finish line. Partial credit, recovery credit, and penalties for silent damage, so the signal stays dense across a long trajectory.",
  },
  {
    k: "04",
    title: "Bespoke evaluations",
    body: "Private, uncontaminated evals shaped around the capability you are training for, with held-out perturbations your model has never seen.",
  },
];

// Example environment families. Descriptive only: no performance figures.
const families = [
  { name: "Codebase under change", domain: "Software engineering", horizon: "Hours", drift: "Upstream commits, dependency churn, review feedback" },
  { name: "Incident room", domain: "Operations / SRE", horizon: "Hours", drift: "Cascading alerts, partial telemetry, handoffs" },
  { name: "Back office", domain: "Finance & operations", horizon: "Days", drift: "Late documents, policy updates, conflicting records" },
  { name: "Research desk", domain: "Analysis", horizon: "Hours to days", drift: "New sources, retracted data, shifting questions" },
  { name: "Customer queue", domain: "Support", horizon: "Days", drift: "Replies arrive, priorities escalate, context expires" },
];

const method = [
  { title: "Capture", body: "We start from real work done by practitioners and record the full state of the systems they touched." },
  { title: "Animate", body: "Every environment gets a world model: scheduled and stochastic events that change state independent of the agent." },
  { title: "Verify", body: "Graders check outcomes and side effects at each checkpoint, against ground truth rather than an LLM's opinion." },
  { title: "Ship", body: "Delivered as reproducible containers with seeds, so any run can be replayed step by step." },
];

export default function Page() {
  return (
    <>
      <header className="nav wrap">
        <a href="#top" className="brand" aria-label="Longrun home">
          <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden>
            <path d="M3 24h26" stroke="currentColor" strokeOpacity=".35" strokeWidth="2" />
            <path d="M3 24c5 0 6-13 13-13s8 7 13 7" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          longrun
        </a>
        <nav aria-label="Primary">
          <a href="#environments">Environments</a>
          <a href="#method">Method</a>
          <a href={CAREERS}>Careers</a>
          <a href={CONTACT} className="nav-cta">
            Contact
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <p className="label">Reinforcement learning environments</p>
          <h1>
            The world keeps moving.
            <br />
            <em>Train agents that keep up.</em>
          </h1>
          <div className="hero-sub">
            <p>
              Longrun builds dynamic environments for long-horizon agents: worlds that change while the model works,
              across hours of real tasks and thousands of steps.
            </p>
            <div className="actions">
              <a href={CONTACT} className="btn btn-primary">
                Talk to us <span aria-hidden>→</span>
              </a>
              <a href="#environments" className="btn">
                See environments
              </a>
            </div>
          </div>
          <Horizon />
        </section>

        <section className="section wrap problem">
          <p className="label">The gap</p>
          <div>
            <h2>Static benchmarks train for a frozen world.</h2>
            <div className="cols">
              <p>
                Most environments hold still. The agent acts, the world waits, and the task ends in a few dozen turns.
                Real work does not look like that.
              </p>
              <p>
                Over a long run, the state drifts. Plans go stale. Early mistakes compound. The capability that matters
                is noticing the change and recovering, and you cannot learn it where nothing changes.
              </p>
            </div>
          </div>
        </section>

        <section className="section wrap">
          <p className="label">What we build</p>
          <div className="grid-4">
            {offerings.map((o) => (
              <article key={o.k} className="card">
                <span className="k">{o.k}</span>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section wrap" id="environments">
          <p className="label">Environment families</p>
          <div>
            <h2>
              Built from production work, <em>kept in motion.</em>
            </h2>
            <div className="table" role="table" aria-label="Environment families">
              <div className="row head" role="row">
                <span role="columnheader">Environment</span>
                <span role="columnheader">Domain</span>
                <span role="columnheader">Horizon</span>
                <span role="columnheader">What changes underneath</span>
              </div>
              {families.map((f) => (
                <div className="row" role="row" key={f.name}>
                  <span role="cell" className="name">
                    {f.name}
                  </span>
                  <span role="cell" data-l="Domain">
                    {f.domain}
                  </span>
                  <span role="cell" data-l="Horizon">
                    {f.horizon}
                  </span>
                  <span role="cell" data-l="Drift" className="drift">
                    {f.drift}
                  </span>
                </div>
              ))}
            </div>
            <p className="note">Custom families are built to spec. Ask about domains not listed here.</p>
          </div>
        </section>

        <section className="section wrap" id="method">
          <p className="label">Method</p>
          <ol className="method">
            {method.map((m, i) => (
              <li key={m.title}>
                <span className="k">{String(i + 1).padStart(2, "0")}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="closing wrap">
          <h2>
            Teach your model to <em>finish</em> the task.
          </h2>
          <div className="actions">
            <a href={CONTACT} className="btn btn-primary">
              Talk to us <span aria-hidden>→</span>
            </a>
            <a href={CAREERS} className="btn">
              We&rsquo;re hiring
            </a>
          </div>
        </section>
      </main>

      <footer className="footer wrap">
        <span>© {new Date().getFullYear()} Longrun</span>
        <span>Dynamic environments for long-horizon agents</span>
      </footer>
    </>
  );
}

import { mailto, site } from "../site";
import { Episode } from "./episode";
import { Reveal } from "./reveal";
import { Container, PrimaryLink, Section } from "./ui";

const h2 = "max-w-[20ch] text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.035em]";
const lead = "mt-6 max-w-[38rem] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-muted";

export function Problem() {
  return (
    <Section id="thesis" label="Thesis">
      <h2 className={h2}>Real work is not a static benchmark.</h2>
      <p className={lead}>
        Agents increasingly perform well on bounded tasks. Professional work is different: it runs across hundreds or
        thousands of actions, persistent state, several tools and other people, with information that changes,
        interruptions nobody planned for, and consequences that arrive days later.
      </p>
      <p className={`${lead} mt-4`}>
        Most environments and benchmarks compress this into short, static tasks. We think that is a large part of why
        agents that look capable in evaluation still struggle to hold a piece of work together over time.
      </p>
      <div className="mt-14">
        <Episode />
      </div>
    </Section>
  );
}

const areas = [
  {
    title: "Dynamic",
    body: "The environment evolves while the agent works. Information arrives, other actors move, objectives and constraints shift. Worlds should be faithful enough that agents have to do the work through realistic professional behavior, not by exploiting shortcuts in the simulation.",
  },
  {
    title: "Long-horizon",
    body: "Tasks persist across hundreds or thousands of actions and represent virtual days or weeks of professional activity. Early decisions carry delayed consequences.",
  },
  {
    title: "Verifiable",
    body: "Outcomes should be grounded in executable state and explicit constraints, not only in subjective model judging.",
  },
];

export function Research() {
  return (
    <Section id="research" label="Research">
      <h2 className={h2}>What we are researching.</h2>
      <p className={lead}>How to build executable training worlds where agents learn to operate under these conditions.</p>
      <ol className="mt-14 grid border-t border-ink md:grid-cols-3">
        {areas.map((a, i) => (
          <li key={a.title} className="border-b border-rule py-8 md:border-b-0 md:py-10 md:pr-10 md:[&+li]:border-l md:[&+li]:pl-10">
            <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-2xl font-medium tracking-[-0.025em]">{a.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-muted">{a.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-14 max-w-[30ch] text-[clamp(1.35rem,2.4vw,1.75rem)] leading-[1.3] tracking-[-0.02em]">
        Agents should have to do the work, not learn the benchmark.
      </p>
    </Section>
  );
}

const pipeline = [
  { title: "Professional work", sub: "how the job is actually done" },
  { title: "Workflows, tools, domain knowledge", sub: "the inputs" },
  { title: "Environment generation", sub: "open research problem", focus: true },
  { title: "Executable environment", sub: "persistent state, working software" },
  { title: "Tasks, dynamics, verifiers", sub: "what the agent faces" },
  { title: "Agent training", sub: "RL, post-training, evaluation" },
];

export function Direction() {
  return (
    <Section label="Direction">
      <h2 className={h2}>From professional workflows to training worlds.</h2>
      <Reveal className="mt-14">
        <p
          data-step
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-faint lg:ml-[calc(200%/6)] lg:w-[calc(300%/6)] lg:border-b lg:border-ink lg:pb-2"
        >
          Environment model <span className="lg:hidden">(03–05)</span>{" "}
          <span className="text-signal">· research direction</span>
        </p>
        <ol className="grid lg:grid-cols-6">
          {pipeline.map((n, i) => (
            <li
              key={n.title}
              data-step
              style={{ "--i": i } as React.CSSProperties}
              className="relative flex flex-col items-stretch lg:flex-row lg:pr-5 lg:[&:not(:last-child)]:after:absolute lg:[&:not(:last-child)]:after:top-1/2 lg:[&:not(:last-child)]:after:right-0.5 lg:[&:not(:last-child)]:after:-translate-y-1/2 lg:[&:not(:last-child)]:after:font-mono lg:[&:not(:last-child)]:after:text-faint lg:[&:not(:last-child)]:after:content-['→']"
            >
              {i > 0 && (
                <span aria-hidden className="py-1.5 pl-4 font-mono text-sm text-faint lg:hidden">
                  ↓
                </span>
              )}
              <div
                className={`flex w-full flex-col justify-between gap-6 rounded-[3px] p-4 ${
                  n.focus ? "border border-dashed border-ink" : "border border-rule"
                }`}
              >
                <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[15px] font-medium leading-snug tracking-[-0.01em]">{n.title}</span>
                  <span className={`mt-1 block text-[13px] leading-snug ${n.focus ? "text-signal" : "text-muted"}`}>
                    {n.sub}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
      <p className={`${lead} mt-12`}>
        Our long-term research direction is an environment model: a way to make realistic environments dramatically
        easier to create and scale by combining domain expertise, executable state and generative models.
      </p>
      <p className="mt-4 max-w-[38rem] text-[15px] leading-[1.6] text-faint">
        This is what we are working toward, not a finished product.
      </p>
    </Section>
  );
}

export function WorkWithUs() {
  return (
    <section id="contact" aria-label="Work with us" className="border-t border-ink bg-ink text-paper">
      <Container className="grid gap-8 py-24 sm:py-32 md:grid-cols-[180px_1fr] md:gap-12">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-paper/50 md:pt-3">Contact</p>
        <div>
          <h2 className="max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.04em]">
            Give us the failure mode.
          </h2>
          <p className="mt-8 max-w-[38rem] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-paper/70">
            We are looking for a small number of frontier research teams working on agent post-training, RL and
            long-horizon reasoning to work with as design partners.
          </p>
          <p className="mt-4 max-w-[38rem] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-paper">
            If there is a capability your agents cannot reliably learn or evaluate today, we would like to understand it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={mailto("Research conversation")}
              className="group inline-flex h-11 items-center gap-3 rounded-[3px] bg-paper px-5 text-[15px] font-medium text-ink transition-colors hover:bg-white"
            >
              Start a research conversation
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-sm text-paper/70 underline decoration-paper/30 underline-offset-[6px] transition-colors hover:text-paper hover:decoration-paper"
            >
              {site.email}
            </a>
          </div>
          <p className="mt-16 max-w-[38rem] border-t border-paper/15 pt-6 text-[15px] leading-[1.6] text-paper/60">
            We are also interested in hearing from exceptional research engineers working on environments, agents and RL.{" "}
            <a
              href={mailto("Research engineering")}
              className="text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
            >
              Get in touch
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper/50">
      <Container className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 py-6 font-mono text-xs">
        <span className="font-sans text-sm font-semibold tracking-[-0.02em] text-paper">{site.name}</span>
        <span>© {new Date().getFullYear()}</span>
      </Container>
    </footer>
  );
}

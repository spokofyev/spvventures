import { Container, PrimaryLink, TextLink } from "./ui";

export function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <Container className="flex flex-col justify-between pt-16 pb-10 sm:pt-28 md:min-h-[min(calc(100svh-3.5rem),820px)]">
        <div>
          <h1 className="max-w-[16ch] text-balance text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.04em]">
            Train agents for work that unfolds over time.
          </h1>
          <p className="mt-8 max-w-[34rem] text-[clamp(1.075rem,1.6vw,1.3rem)] leading-[1.5] text-muted">
            We build dynamic, long-horizon environments for training and evaluating AI agents in realistic
            professional workflows.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <PrimaryLink href="#contact">Work with us</PrimaryLink>
            <TextLink href="#thesis">Read the thesis</TextLink>
          </div>
        </div>
        <p className="mt-20 border-t border-rule pt-4 font-mono text-xs tracking-[0.02em] text-faint">
          Dynamic environments <span className="px-1.5">/</span> long-horizon RL <span className="px-1.5">/</span>{" "}
          agent evaluation
        </p>
      </Container>
    </section>
  );
}

import { Reveal } from "./reveal";

// Static benchmark vs. an illustrative long-horizon episode.
// Three kinds of line: agent actions, world events, and the verifier.

type Line =
  | { kind: "day"; text: string }
  | { kind: "goal" | "act" | "world" | "check" | "note"; text: string };

const episode: Line[] = [
  { kind: "day", text: "Day 01" },
  { kind: "goal", text: "Goal: renew a vendor contract within budget and policy" },
  { kind: "act", text: "Email: request revised pricing" },
  { kind: "act", text: "CRM: record current terms" },
  { kind: "note", text: "world changes" },
  { kind: "day", text: "Day 04" },
  { kind: "world", text: "Vendor replies with new terms" },
  { kind: "world", text: "Deadline moves up two days" },
  { kind: "world", text: "New procurement policy appears" },
  { kind: "note", text: "agent adapts" },
  { kind: "day", text: "Day 07" },
  { kind: "act", text: "Docs: redline terms against the new policy" },
  { kind: "world", text: "Approver is out of office" },
  { kind: "act", text: "Email: route to the alternate approver" },
  { kind: "day", text: "Day 12" },
  { kind: "goal", text: "Outcome: contract signed" },
  { kind: "check", text: "Verifier: CRM, contract and approvals checked against constraints" },
];

const marker: Record<string, string> = {
  goal: "bg-ink",
  act: "border border-ink bg-paper",
  world: "bg-signal",
  check: "bg-ink rounded-none",
};

export function Episode() {
  let step = 0;
  return (
    <div className="grid gap-px overflow-hidden rounded-[3px] border border-rule bg-rule md:grid-cols-[0.8fr_1.2fr]">
      <figure className="flex flex-col bg-paper p-6 sm:p-8">
        <figcaption className="font-mono text-xs uppercase tracking-[0.08em] text-faint">Static benchmark</figcaption>
        <div className="flex flex-1 items-center py-10 md:py-0">
          <p className="font-mono text-[15px] text-ink">
            Task <span className="px-2 text-faint">→</span> actions <span className="px-2 text-faint">→</span> answer
          </p>
        </div>
        <p className="text-sm leading-relaxed text-muted">Fixed state. One sitting. Graded once, at the end.</p>
      </figure>

      <figure className="bg-paper p-6 sm:p-8">
        <figcaption className="font-mono text-xs uppercase tracking-[0.08em] text-faint">Real work</figcaption>
        <Reveal className="relative mt-6">
          <span data-spine aria-hidden className="absolute top-2 bottom-2 left-[3px] w-px bg-rule" />
          <ol className="relative space-y-2.5 font-mono text-[13px] leading-snug sm:text-sm">
            {episode.map((l, idx) => {
              const i = step++;
              if (l.kind === "day")
                return (
                  <li key={idx} data-step style={{ "--i": i } as React.CSSProperties} className="pt-3 pl-6 first:pt-0">
                    <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink">{l.text}</span>
                  </li>
                );
              if (l.kind === "note")
                return (
                  <li
                    key={idx}
                    data-step
                    style={{ "--i": i } as React.CSSProperties}
                    className={`pl-6 italic ${l.text === "world changes" ? "text-signal" : "text-faint"}`}
                  >
                    ↓ {l.text}
                  </li>
                );
              return (
                <li key={idx} data-step style={{ "--i": i } as React.CSSProperties} className="relative pl-6">
                  <span
                    aria-hidden
                    className={`absolute top-[0.4em] left-0 size-[7px] rounded-full ${marker[l.kind]}`}
                  />
                  <span className={l.kind === "world" ? "text-muted" : "text-ink"}>
                    {l.kind === "act" && <span className="text-faint">Agent → </span>}
                    {l.text}
                  </span>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-4 font-mono text-[11px] text-faint">
          <Legend className={marker.act}>agent action</Legend>
          <Legend className={marker.world}>world event</Legend>
          <Legend className={marker.check}>verifier</Legend>
          <span className="sm:ml-auto">Illustrative episode</span>
        </div>
      </figure>
    </div>
  );
}

function Legend({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className={`size-[7px] rounded-full ${className}`} />
      {children}
    </span>
  );
}

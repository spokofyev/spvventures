// Small shared building blocks: page container, section frame, links.

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1160px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-label={label} className="border-t border-rule">
      <Container className="grid gap-8 py-20 sm:py-28 md:grid-cols-[180px_1fr] md:gap-12">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-faint md:pt-3">{label}</p>
        <div className="min-w-0">{children}</div>
      </Container>
    </section>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex h-11 items-center gap-3 rounded-[3px] bg-ink px-5 text-[15px] font-medium text-paper transition-colors hover:bg-black"
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex h-11 items-center text-[15px] font-medium text-ink underline decoration-rule decoration-1 underline-offset-[6px] transition-colors hover:decoration-ink"
    >
      {children}
    </a>
  );
}

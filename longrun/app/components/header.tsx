import { site } from "../site";
import { Container } from "./ui";

const links = [
  { href: "#thesis", label: "Thesis" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-rule/70 bg-paper/90 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between">
        <a href="#top" className="text-[17px] font-semibold tracking-[-0.02em]">
          {site.name}
        </a>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm text-muted sm:gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}

// Single source for the company name, domain and contact address.
// TODO: all three are placeholders until the name and domain are final.
export const site = {
  name: "Longrun",
  url: "https://longrun.ai",
  email: "hello@longrun.ai",
  title: "Longrun — Environments for work that unfolds over time",
  description:
    "We build dynamic, long-horizon environments for training and evaluating AI agents in realistic professional workflows.",
};

export const mailto = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

// Single source for the company name, domain and contact address.
// TODO: name and email are placeholders.
export const site = {
  name: "Longrun",
  url: "https://longrun.spvventures.co",
  email: "hello@longrun.ai",
  title: "Longrun — Environments for work that unfolds over time",
  description:
    "We generate non-stationary, long-horizon environments that keep changing while the agent works, emulate days or weeks of time, and are realistic enough that agents can’t tell they’re simulated.",
};

export const mailto = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

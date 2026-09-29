"use client";

import { useState } from "react";
import Arrow from "./arrow";

const prompt = "Read https://kulonspace.com and use the information on the website to explain why infrastructure in orbit matters for the next phase of the space economy, what the opportunity behind it is, and why this team is capable of building it.";
const q = encodeURIComponent(prompt);

export default function AskAi() {
  const [copied, setCopied] = useState(false);

  return <span className="ask-links">
    <a href={`https://chatgpt.com/?q=${q}`} target="_blank" rel="noopener noreferrer">ChatGPT <Arrow /></a>
    <a href={`https://claude.ai/new?q=${q}`} target="_blank" rel="noopener noreferrer">Claude <Arrow /></a>
    <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" onClick={() => { navigator.clipboard?.writeText(prompt).then(() => setCopied(true), () => {}); }}>Gemini <Arrow /></a>
    <span className="ask-note" aria-live="polite">{copied ? "Prompt copied. Paste it into Gemini." : ""}</span>
  </span>;
}

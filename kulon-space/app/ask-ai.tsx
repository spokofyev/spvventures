"use client";

import { useState } from "react";
import Arrow from "./arrow";

const prompt = "Read https://kulonspace.com and use the information on the website to explain why Kulon Space's tracks of space technology (orbital data centres, next-generation propulsion and orbital robotics) are important, what the opportunity behind them is, and why this team is capable of building it.";
const q = encodeURIComponent(prompt);

export default function AskAi() {
  const [copied, setCopied] = useState(false);

  return <div className="ask-actions">
    <div className="ask-buttons">
      <a className="button" href={`https://chatgpt.com/?q=${q}`} target="_blank" rel="noopener noreferrer">ChatGPT <Arrow /></a>
      <a className="button" href={`https://claude.ai/new?q=${q}`} target="_blank" rel="noopener noreferrer">Claude <Arrow /></a>
      <a className="button" href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" onClick={() => { navigator.clipboard?.writeText(prompt).then(() => setCopied(true), () => {}); }}>Gemini <Arrow /></a>
    </div>
    <p className="ask-note" aria-live="polite">{copied ? "Prompt copied. Paste it into Gemini." : ""}</p>
  </div>;
}

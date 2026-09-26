"use client";

import { useEffect, useRef, useState } from "react";

// Hero visual: environment state lanes that keep changing on their own,
// with an agent trajectory threading through them over a long run.
// Everything is procedural and decorative; no real run data is shown.

const LANES = ["repo", "tickets", "deps", "ci", "inbox", "db", "docs", "users"];
const CELL = 9; // px per step column
const TOTAL_STEPS = 10_000;

const EVENTS = [
  "dependency pinned version yanked upstream",
  "ticket reassigned mid-task",
  "ci runner image rotated",
  "customer replied with new constraint",
  "schema migration landed on main",
  "flaky test quarantined by teammate",
  "api rate limit lowered",
  "reviewer requested a different approach",
  "doc page moved, links now 404",
  "db replica lag spiked",
  "feature flag flipped in prod",
  "merge conflict on shared module",
  "credentials rotated",
  "deadline pulled forward one day",
];

type Cell = { v: number; hit: boolean };
type LogLine = { id: number; step: number; lane: string; text: string };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Horizon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0);
  const [log, setLog] = useState<LogLine[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = mulberry32(7);
    const css = getComputedStyle(document.documentElement);
    const col = {
      line: css.getPropertyValue("--line").trim() || "#26241f",
      dim: css.getPropertyValue("--cell").trim() || "#2c2a25",
      live: css.getPropertyValue("--cell-live").trim() || "#5b574d",
      accent: css.getPropertyValue("--accent").trim() || "#ffb03a",
      label: css.getPropertyValue("--muted").trim() || "#8a8577",
    };

    let width = 0;
    let height = 0;
    let cols = 0;
    let laneH = 0;
    const gutter = 64;
    // columns[i][lane] -> state of that lane at that step
    let columns: Cell[][] = [];
    let path: number[] = []; // agent lane position (float) per column
    let agentLane = 3;
    let current = 0;
    let offset = 0;
    let raf = 0;
    let last = performance.now();
    let logId = 0;

    const makeColumn = (prev: Cell[] | undefined, s: number): { cells: Cell[]; event?: LogLine } => {
      let event: LogLine | undefined;
      const cells = LANES.map((_, i) => {
        const p = prev ? prev[i].v : rand();
        // Slow drift, occasional hard perturbation.
        let v = Math.min(1, Math.max(0, p + (rand() - 0.5) * 0.18));
        if (rand() < 0.012) {
          v = rand() < 0.5 ? 0.05 : 0.95;
          if (!event) event = { id: logId++, step: s, lane: LANES[i], text: EVENTS[Math.floor(rand() * EVENTS.length)] };
        }
        return { v, hit: false };
      });
      // Agent wanders toward whichever lane changed most, like attending to the world.
      if (event) agentLane = LANES.indexOf(event.lane);
      return { cells, event };
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = r.width;
      height = r.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      laneH = height / LANES.length;
      cols = Math.ceil((width - gutter) / CELL) + 2;
      while (columns.length < cols) {
        const { cells } = makeColumn(columns[columns.length - 1], current);
        columns.push(cells);
        const prevY = path.length ? path[path.length - 1] : agentLane;
        path.push(prevY + (agentLane - prevY) * 0.35);
        current++;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `10px ${getComputedStyle(document.body).getPropertyValue("--font-mono") || "monospace"}`;
      ctx.textBaseline = "middle";

      LANES.forEach((name, i) => {
        const y = i * laneH;
        ctx.fillStyle = col.label;
        ctx.fillText(name, 0, y + laneH / 2);
        ctx.fillStyle = col.line;
        ctx.fillRect(gutter, y + laneH - 1, width - gutter, 1);
      });

      const bar = Math.max(3, laneH * 0.34);
      for (let c = 0; c < columns.length; c++) {
        const x = gutter + c * CELL - offset;
        if (x < gutter - CELL) continue;
        columns[c].forEach((cell, i) => {
          const h = 2 + cell.v * bar;
          const y = i * laneH + laneH / 2 - h / 2;
          ctx.fillStyle = cell.v > 0.9 || cell.v < 0.1 ? col.live : col.dim;
          ctx.fillRect(x, y, CELL - 3, h);
        });
      }

      // Trajectory
      ctx.beginPath();
      for (let c = 0; c < path.length; c++) {
        const x = gutter + c * CELL - offset + (CELL - 3) / 2;
        const y = path[c] * laneH + laneH / 2;
        if (c === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = col.accent;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const hx = gutter + (path.length - 1) * CELL - offset + (CELL - 3) / 2;
      const hy = path[path.length - 1] * laneH + laneH / 2;
      ctx.fillStyle = col.accent;
      ctx.beginPath();
      ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Fade the left edge into the gutter
      const g = ctx.createLinearGradient(gutter, 0, gutter + 80, 0);
      const bg = css.getPropertyValue("--bg").trim() || "#0d0d0b";
      g.addColorStop(0, bg);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(gutter, 0, 80, height);
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      offset += dt * 0.045;
      while (offset >= CELL) {
        offset -= CELL;
        columns.shift();
        path.shift();
        const { cells, event } = makeColumn(columns[columns.length - 1], current);
        columns.push(cells);
        const prevY = path[path.length - 1];
        path.push(prevY + (agentLane - prevY) * 0.35);
        current = (current + 1) % TOTAL_STEPS;
        setStep(current);
        if (event) setLog([event]);
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    resize();
    // Seed the log so it is never empty.
    setLog(
      [0, 1, 2].map((k) => ({ id: logId++, step: 380 - k * 57, lane: LANES[(k * 3) % LANES.length], text: EVENTS[k * 4] })),
    );
    setStep(current);
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="horizon" aria-hidden>
      <div className="horizon-stage">
        <canvas ref={canvasRef} className="horizon-canvas" />
      </div>
      <div className="horizon-meta">
        <span className="event">{log[0] ? `${log[0].lane} · ${log[0].text}` : ""}</span>
        <span className="tabular">
          step {String(step).padStart(5, "0")} / {TOTAL_STEPS.toLocaleString("en-US")}
        </span>
      </div>
    </div>
  );
}

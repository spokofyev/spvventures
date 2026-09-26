"use client";

import { useEffect, useRef } from "react";

// Hero visual: an isometric cube (with a nested inner cube) drawn as a grid of
// small coloured marks. Patches of marks slowly change colour and shape over
// time, a nod to environments that keep changing. Decorative only.

type Shape = "dot" | "square" | "boxdot" | "triangle" | "ring";
const SHAPES: Shape[] = ["dot", "square", "boxdot", "triangle", "ring"];
const PALETTE = [
  "#9a6a6a", // clay
  "#c9436b", // raspberry
  "#d98a2b", // amber
  "#e2b13a", // mustard
  "#5fae4f", // green
  "#8cc63f", // lime
  "#3f9aa0", // teal
  "#4a86a8", // steel blue
  "#7d7fe0", // periwinkle
  "#8a6f5a", // umber
];

type Seed = { x: number; y: number; color: string; shape: Shape; from: string; t: number };
type Mark = { x: number; y: number; seed: number; shade: number };

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(h: string) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a: string, b: string, t: number, shade: number) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const c = A.map((v, i) => Math.round((v + (B[i] - v) * t) * shade));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

// Which cube face a point falls on, for a pointy-top hexagon.
function face(x: number, y: number) {
  const a = (Math.atan2(y, x) * 180) / Math.PI;
  if (a > -150 && a <= -30) return 0; // top
  if (a > -30 && a <= 90) return 1; // right
  return 2; // left
}

// Face-local coordinates (0..1) of a unit-hexagon point on the given face.
// Edges from the centre: upper-left, upper-right and straight down.
const EDGES: Record<number, [[number, number], [number, number]]> = {
  0: [[-Math.sqrt(3) / 2, -0.5], [Math.sqrt(3) / 2, -0.5]],
  1: [[Math.sqrt(3) / 2, -0.5], [0, 1]],
  2: [[-Math.sqrt(3) / 2, -0.5], [0, 1]],
};
function rhombus(f: number, x: number, y: number): [number, number] {
  const [a, b] = EDGES[f];
  const det = a[0] * b[1] - a[1] * b[0];
  const u = (x * b[1] - y * b[0]) / det;
  const v = (a[0] * y - a[1] * x) / det;
  return [Math.max(0, u), Math.max(0, v)];
}

export default function Hexfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = rng(11);

    let size = 0;
    let marks: Mark[] = [];
    let seeds: Seed[] = [];
    let step = 0;
    let raf = 0;
    let last = 0;

    const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

    const build = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = r.width;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const R = size * 0.49; // hexagon circumradius
      const cols = 30;
      step = (R * Math.sqrt(3)) / cols;
      const rowH = step * 0.9;

      // One patch per cell of a 3x3 grid on each rhombus face of the outer cube,
      // and a 2x2 grid on each face of the inner cube: 3*9 + 3*4 = 39 patches.
      if (!seeds.length) {
        seeds = Array.from({ length: 39 }, () => {
          const color = pick(PALETTE);
          return { x: 0, y: 0, color, from: color, shape: pick(SHAPES), t: 1 };
        });
      }

      marks = [];
      const halfW = (R * Math.sqrt(3)) / 2;
      for (let y = -R; y <= R; y += rowH) {
        for (let x = -halfW; x <= halfW + 0.01; x += step) {
          if (Math.abs(y) > R - Math.abs(x) / Math.sqrt(3) + 0.01) continue;
          const inner = Math.abs(x) <= halfW * 0.5 && Math.abs(y) <= R * 0.5 - Math.abs(x) / Math.sqrt(3);
          const f = face(x, y);
          const scale = inner ? R * 0.5 : R;
          const [u, v] = rhombus(f, x / scale, y / scale);
          const n = inner ? 2 : 3;
          const cell = Math.min(n - 1, Math.floor(u * n)) * n + Math.min(n - 1, Math.floor(v * n));
          const seed = inner ? 27 + f * 4 + cell : f * 9 + cell;
          const shade = inner ? [0.92, 1.05, 0.98][f] : [1.06, 0.94, 1][f];
          marks.push({ x, y, seed, shade });
        }
      }
    };

    const drawMark = (x: number, y: number, shape: Shape, color: string, s: number) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      const h = s / 2;
      switch (shape) {
        case "dot":
          ctx.beginPath();
          ctx.arc(x, y, h, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "square":
          ctx.fillRect(x - h, y - h, s, s);
          break;
        case "boxdot":
          ctx.lineWidth = Math.max(1, s * 0.22);
          ctx.strokeRect(x - h * 0.8, y - h * 0.8, s * 0.8, s * 0.8);
          ctx.fillRect(x - s * 0.1, y - s * 0.1, s * 0.2, s * 0.2);
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(x, y - h * 1.05);
          ctx.lineTo(x + h, y + h * 0.8);
          ctx.lineTo(x - h, y + h * 0.8);
          ctx.closePath();
          ctx.fill();
          break;
        case "ring":
          ctx.lineWidth = Math.max(1, s * 0.22);
          ctx.beginPath();
          ctx.arc(x, y, h * 0.75, 0, Math.PI * 2);
          ctx.stroke();
          break;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const s = step * 0.62;
      for (const m of marks) {
        const seed = seeds[m.seed];
        drawMark(cx + m.x, cy + m.y, seed.shape, mix(seed.from, seed.color, seed.t, m.shade), s);
      }
    };

    const tick = (now: number) => {
      if (now - last > 1400) {
        last = now;
        const s = pick(seeds);
        s.from = mix(s.from, s.color, s.t, 1).replace(/rgb\((\d+),(\d+),(\d+)\)/, (_, r, g, b) =>
          "#" + [r, g, b].map((v: string) => Number(v).toString(16).padStart(2, "0")).join(""),
        );
        s.color = pick(PALETTE);
        s.t = 0;
        if (rand() < 0.4) s.shape = pick(SHAPES);
      }
      for (const s of seeds) if (s.t < 1) s.t = Math.min(1, s.t + 0.02);
      draw();
      raf = requestAnimationFrame(tick);
    };

    build();
    draw();
    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(canvas);
    if (!reduced) raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="hexfield" aria-hidden />;
}

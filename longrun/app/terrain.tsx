"use client";

import { useEffect, useRef } from "react";

// Hero visual: an isometric field of dots whose surface keeps shifting
// (slow waves plus sudden bumps that rise and fade), with one agent trail
// running a long path across it. Decorative only.

const N = 30; // grid size
const TRAIL = 120; // trail length in samples
const ACCENT = [224, 102, 43]; // #e0662b

type Bump = { i: number; j: number; born: number; amp: number };

export default function Terrain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let s = 0; // grid spacing in px
    let raf = 0;
    let nextBump = 0;
    const bumps: Bump[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Diamond width is (N-1)*s*sqrt(3); leave a little margin.
      s = (W * 0.94) / ((N - 1) * Math.sqrt(3));
    };

    // Surface height in roughly [-1, 1] at continuous grid coords.
    const height = (i: number, j: number, t: number) => {
      let h =
        0.45 * Math.sin(i * 0.24 + t * 0.55) +
        0.35 * Math.sin(j * 0.21 - t * 0.4) +
        0.3 * Math.sin((i + j) * 0.13 + t * 0.25);
      for (const b of bumps) {
        const age = t - b.born;
        const life = Math.sin(Math.min(Math.PI, age * 0.9)); // rise then fall
        const d2 = (i - b.i) ** 2 + (j - b.j) ** 2;
        h += b.amp * life * Math.exp(-d2 / 14);
      }
      return h;
    };

    const project = (i: number, j: number, h: number) => {
      const amp = s * 3.6;
      return [
        W / 2 + (i - j) * s * (Math.sqrt(3) / 2),
        H * 0.54 + ((i + j - (N - 1)) * s) / 2 - h * amp,
      ];
    };

    // Agent path in grid coords: a slow, never-quite-repeating wander.
    const agent = (t: number) => [
      (N - 1) / 2 + (N * 0.36) * Math.sin(t * 0.17),
      (N - 1) / 2 + (N * 0.36) * Math.sin(t * 0.23 + 1.3),
    ];

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);

      if (!reduced && t > nextBump) {
        bumps.push({ i: Math.random() * N, j: Math.random() * N, born: t, amp: 0.9 + Math.random() * 0.6 });
        nextBump = t + 1.6 + Math.random() * 2;
      }
      while (bumps.length && t - bumps[0].born > Math.PI / 0.9) bumps.shift();

      // Back to front so nearer dots overlap farther ones.
      for (let k = 0; k <= 2 * (N - 1); k++) {
        for (let i = Math.max(0, k - (N - 1)); i <= Math.min(N - 1, k); i++) {
          const j = k - i;
          const h = height(i, j, t);
          const [x, y] = project(i, j, h);
          const n = Math.max(0, Math.min(1, (h + 1) / 2.4)); // 0 low .. 1 high
          const g = Math.round(205 - n * 135);
          ctx.fillStyle = `rgb(${g},${g},${g - 3})`;
          ctx.beginPath();
          ctx.arc(x, y, s * (0.17 + n * 0.2), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Trail: fades from tail to head, rides on the surface.
      for (let k = TRAIL; k >= 0; k--) {
        const tt = t - k * 0.11;
        const [ai, aj] = agent(tt);
        const [x, y] = project(ai, aj, height(ai, aj, t));
        const a = 1 - k / TRAIL;
        ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${0.15 + a * 0.85})`;
        ctx.beginPath();
        ctx.arc(x, y, s * (0.14 + a * 0.2), 0, Math.PI * 2);
        ctx.fill();
      }
      const [hi, hj] = agent(t);
      const [hx, hy] = project(hi, hj, height(hi, hj, t));
      ctx.strokeStyle = `rgb(${ACCENT.join(",")})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(hx, hy, s * 0.75, 0, Math.PI * 2);
      ctx.stroke();
    };

    const start = performance.now();
    const tick = (now: number) => {
      draw((now - start) / 1000 + 20);
      raf = requestAnimationFrame(tick);
    };

    resize();
    draw(20);
    const ro = new ResizeObserver(() => {
      resize();
      draw(20);
    });
    ro.observe(canvas);
    if (!reduced) raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="terrain" aria-hidden />;
}

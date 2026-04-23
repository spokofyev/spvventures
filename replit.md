# SPV Ventures

A React + Vite landing page for a corporate innovation & venture studio.

## Visual Identity

Matched to the original Vercel brand (`spv-orcin.vercel.app`):
- **Background**: `#06100a` — deep forest green (not black)
- **Accent**: `#4dbb78` — mint green, used for italic emphasis and CTAs
- **Typography**: Playfair Display (headings, italic accent word), Inter (body)
- **Hero title scale**: ~100px — very large, fills left half of viewport
- **Nav**: transparent, no background
- **Border radius**: 0px everywhere (sharp corners)
- **Buttons**: outlined, square, dark border

## Content Structure

1. **Nav** — SPV Ventures | About · Model · Contact (transparent, fixed)
2. **Hero** — Full-height, deep green. Large serif title with italic green accent word. Sub-text + outlined CTA button + SCROLL indicator.
3. **About** — Asymmetric grid (5fr/6fr). Sticky heading left, 3 paragraphs right. Last paragraph is a styled italic pull-quote in green.
4. **Model** — Slightly lighter green bg (`#0a1a10`). 3-column steps separated by hairlines. Step numbers in italic green serif.
5. **Contact** — Same asymmetric grid. Heading left, sub + outlined CTA right.
6. **Footer** — Minimal single row, hairline above.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Framer Motion** for scroll-triggered fade-up animations
- **Lucide React** (icons, available)

## Dev Server

- Port: 5000, host: 0.0.0.0
- Workflow: "Start application" → `npm run dev`

## Canvas Mockups

Six design exploration variants are in `artifacts/mockup-sandbox/src/components/mockups/spv-landing/`:
- `IceArchitecture.tsx` — cold, surgical white
- `DarkEditorial.tsx` — cinematic, amber accent
- `StoneCopper.tsx` — warm cream, copper accent
- `Manifesto.tsx` — single column, no cards
- `AsymmetricGrid.tsx` — broken 50/50 symmetry
- `DenseHorizontal.tsx` — pipeline process, hero fact block

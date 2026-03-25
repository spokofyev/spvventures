import { sectors } from '../data/sectors'

export default function Ticker() {
  const doubled = [...sectors, ...sectors]

  return (
    <section className="bg-neutral-50 border-y border-black/5 py-8 overflow-hidden">
      <p className="text-xs uppercase tracking-widest text-black/30 text-center mb-5">
        Sectors &amp; companies we partner with
      </p>
      <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="inline-block mx-2 px-4 py-1.5 rounded-full border border-black/10 bg-white text-sm font-medium text-black/40"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}

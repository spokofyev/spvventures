import { expertiseItems } from '../data/expertise'

export default function Expertise() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white mb-3">
          Decades of expertise, backed by AI
        </h2>
        <p className="text-white/40 text-lg mb-16 max-w-xl">
          We combine institutional finance experience with deep technology fluency — a rare combination in the market.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {expertiseItems.map((item) => (
            <div key={item.title} className="bg-black p-8">
              <p className="text-xs uppercase tracking-widest text-white/30 mb-4">{item.stat}</p>
              <h3 className="text-2xl font-normal text-white mb-3">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

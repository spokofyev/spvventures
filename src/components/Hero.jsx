export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-32">
      <p className="text-xs uppercase tracking-widest text-black/30 mb-16">
        SPV Ventures ————————————————————
      </p>

      <h1
        className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.05] text-black mb-8 max-w-3xl"
      >
        We connect corporates to deep tech they can't build alone.
      </h1>

      <p className="text-base text-black/50 max-w-lg mb-16 leading-relaxed">
        Boutique advisory firm. We source, vet, and close deep tech deals for corporations across Robotics, Physical AI, and Applied AI. UK-headquartered, operating across the US and Europe.
      </p>

      <a
        href="#contact"
        className="text-sm uppercase tracking-widest text-black hover:text-black/40 transition-colors"
      >
        Get in touch →
      </a>
    </section>
  )
}

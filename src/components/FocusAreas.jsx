import { focusAreas } from '../data/focusAreas'

export default function FocusAreas() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white mb-3">
          AI-first sectors
        </h2>
        <p className="text-white/50 text-lg mb-12 max-w-xl">
          Deep tech sectors where AI is transforming physical and digital operations at scale.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {focusAreas.map((area) => (
            <div
              key={area.id}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-default"
            >
              <img
                src={area.image}
                alt={area.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-base font-medium text-white mb-1">{area.label}</p>
                <p className="text-white/50 text-xs leading-relaxed">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

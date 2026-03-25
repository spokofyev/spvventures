const stats = [
  { value: '$500M+', label: 'Total deal value advised' },
  { value: '6–12 wks', label: 'Average time to first pilot' },
  { value: '50+', label: 'Mandates completed' },
  { value: '3 verticals', label: 'Deep tech focus areas' },
]

export default function StatsBar() {
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((s) => (
          <div key={s.value}>
            <p className="text-4xl sm:text-5xl font-normal text-white tracking-tight mb-2">{s.value}</p>
            <p className="text-sm text-white/40">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

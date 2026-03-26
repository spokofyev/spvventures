const stats = [
  { value: 'UK · US', label: 'Buy-side focus' },
  { value: '50+', label: 'Founders & operators in network' },
  { value: '4', label: 'Deep tech verticals' },
  { value: '2', label: 'Senior partners. No junior hand-offs.' },
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

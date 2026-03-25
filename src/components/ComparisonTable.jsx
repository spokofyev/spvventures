import { comparisonRows } from '../data/comparison'
import { Check, Minus } from 'lucide-react'

const columns = [
  { key: 'spv', label: 'SPV Ventures', highlight: true },
  { key: 'noAdvisor', label: 'No Advisor' },
  { key: 'vc', label: 'Traditional VC' },
  { key: 'broker', label: 'Generic Broker' },
]

export default function ComparisonTable() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mb-3">
          The traditional process doesn&apos;t work for deep tech.{' '}
          <span className="text-black/30">Ours does.</span>
        </h2>
        <p className="text-black/50 text-lg mb-12 max-w-2xl">
          R&D teams need business partners—not generic advisors. Corporations need curated AI deal flow—not cold introductions.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-black/10">
                <th className="text-left py-3 pr-6 font-normal text-black/40 w-1/3"></th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`text-left py-3 px-4 font-medium ${col.highlight ? 'text-black' : 'text-black/30'}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="hover:bg-black/[0.01] transition-colors">
                  <td className="py-4 pr-6 text-black/60 font-medium">{row.feature}</td>
                  {columns.map((col) => (
                    <td key={col.key} className={`py-4 px-4 ${col.highlight ? 'font-semibold text-black' : 'text-black/40'}`}>
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

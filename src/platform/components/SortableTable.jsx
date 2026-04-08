import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react'

export default function SortableTable({ columns, data, defaultSort, searchable, onRowClick }) {
  const [sort, setSort] = useState(defaultSort || { key: null, dir: 'desc' })
  const [search, setSearch] = useState('')

  const handleSort = (key) => {
    if (!columns.find(c => c.key === key)?.sortable) return
    setSort(prev => ({
      key,
      dir: prev.key === key && prev.dir === 'desc' ? 'asc' : 'desc',
    }))
  }

  let filtered = data
  if (search && searchable) {
    const q = search.toLowerCase()
    filtered = data.filter(row =>
      columns.some(col => {
        const val = col.accessor ? col.accessor(row) : row[col.key]
        return val && String(val).toLowerCase().includes(q)
      })
    )
  }

  let sorted = [...filtered]
  if (sort.key) {
    sorted.sort((a, b) => {
      const col = columns.find(c => c.key === sort.key)
      const aVal = col?.accessor ? col.accessor(a) : a[sort.key]
      const bVal = col?.accessor ? col.accessor(b) : b[sort.key]
      if (aVal == null) return 1
      if (bVal == null) return -1
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sort.dir === 'asc' ? aVal - bVal : bVal - aVal
      }
      return sort.dir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
  }

  const SortIcon = ({ colKey }) => {
    if (sort.key !== colKey) return <ArrowUpDown size={14} className="text-gray-300" />
    return sort.dir === 'asc' ? <ArrowUp size={14} className="text-blue-600" /> : <ArrowDown size={14} className="text-blue-600" />
  }

  return (
    <div>
      {searchable && (
        <div className="mb-4 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Find a company"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-4 py-3 text-left font-medium text-gray-600 ${
                    col.sortable ? 'cursor-pointer hover:text-gray-900 select-none' : ''
                  } ${col.width || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon colKey={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((row, i) => (
              <tr
                key={row.id || i}
                onClick={() => onRowClick?.(row)}
                className={`bg-white hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render ? col.render(row) : (col.accessor ? col.accessor(row) : row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

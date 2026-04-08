import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Pencil, FileDown, BookOpen } from 'lucide-react'
import { getCIM } from '../data/cim'

function CitationBadge({ count }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-400 ml-2">
      <BookOpen size={12} />
      {count}
    </span>
  )
}

export default function CIMEditor() {
  const { dealId } = useParams()
  const [editMode, setEditMode] = useState(false)
  const sections = getCIM(dealId)

  if (!sections || sections.length === 0) {
    return <div className="text-center py-20 text-gray-400">No investment summary available</div>
  }

  return (
    <div>
      {/* Top actions */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Investment Summary</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
              editMode
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Pencil size={14} />
            Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
            <FileDown size={14} />
            View As PDF
          </button>
        </div>
      </div>

      {/* CIM Content */}
      <div className="space-y-0 border border-gray-200 rounded-xl overflow-hidden">
        {sections.map((section, si) => (
          <div key={si}>
            {section.highlights.map((highlight, hi) => (
              <div
                key={hi}
                className={`grid grid-cols-[240px_1fr_1fr] ${
                  hi < section.highlights.length - 1 || si < sections.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                {/* Category label - only shown on first highlight of section */}
                <div className={`${hi === 0 ? 'bg-[#2c5282] text-white' : 'bg-white'} px-5 py-5 flex items-start`}>
                  {hi === 0 && (
                    <span className="text-sm font-semibold leading-snug">{section.category}</span>
                  )}
                </div>

                {/* Key insight */}
                <div className="px-5 py-5 border-l border-gray-200 bg-white">
                  {editMode ? (
                    <textarea
                      defaultValue={highlight.title}
                      rows={3}
                      className="w-full text-sm font-semibold text-gray-900 leading-relaxed border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                      {highlight.title}
                      <CitationBadge count={highlight.citations} />
                    </p>
                  )}
                </div>

                {/* Detailed analysis */}
                <div className="px-5 py-5 border-l border-gray-200 bg-blue-50/30">
                  {editMode ? (
                    <textarea
                      defaultValue={highlight.analysis}
                      rows={5}
                      className="w-full text-sm italic text-gray-600 leading-relaxed border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  ) : (
                    <p className="text-sm italic text-gray-600 leading-relaxed">
                      {highlight.analysis}
                      <CitationBadge count={highlight.citations} />
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

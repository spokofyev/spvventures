import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, Table, Check, X, Loader2, ChevronRight, ChevronLeft } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Company Info' },
  { id: 2, label: 'Upload Documents' },
  { id: 3, label: 'Review Extracted Data' },
  { id: 4, label: 'Confirm & Create' },
]

const ACCEPTED_TYPES = {
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
  'application/vnd.ms-powerpoint': 'PPT',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'text/csv': 'CSV',
}

const MOCK_EXTRACTED = {
  companyName: '',
  sector: '',
  description: '',
  founded: '',
  location: '',
  employees: '',
  revenue: '',
  ebitda: '',
  growthRate: '',
  businessModel: '',
  keyHighlights: [
    'Strong product-market fit with growing customer base',
    'Proprietary technology with significant competitive moat',
    'Expanding addressable market with favorable regulatory tailwinds',
  ],
}

export default function DealOnboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    companyName: '',
    sector: '',
    description: '',
  })
  const [files, setFiles] = useState([])
  const [extractedData, setExtractedData] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f =>
      Object.keys(ACCEPTED_TYPES).includes(f.type) || f.name.endsWith('.csv')
    )
    addFiles(droppedFiles)
  }

  const handleFileSelect = (e) => {
    addFiles(Array.from(e.target.files))
  }

  const addFiles = (newFiles) => {
    const enriched = newFiles.map(f => ({
      file: f,
      name: f.name,
      type: f.type,
      size: f.size,
      status: 'uploaded',
      id: Math.random().toString(36).slice(2),
    }))
    setFiles(prev => [...prev, ...enriched])
  }

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const simulateExtraction = () => {
    // Simulate AI extraction with mock delay
    setFiles(prev => prev.map(f => ({ ...f, status: 'processing' })))
    setTimeout(() => {
      setFiles(prev => prev.map(f => ({ ...f, status: 'extracted' })))
      setExtractedData({
        ...MOCK_EXTRACTED,
        companyName: form.companyName || 'Extracted Company Name',
        sector: form.sector || 'Extracted Sector',
        description: form.description || 'AI-extracted company description from uploaded documents.',
        founded: '2020',
        location: 'San Francisco, USA',
        employees: '52',
        revenue: '3,800,000',
        ebitda: '620,000',
        growthRate: '45',
        businessModel: 'B2B SaaS with annual contracts, land-and-expand motion',
      })
      setStep(3)
    }, 2000)
  }

  const handleCreate = () => {
    // In a real app, this would POST to the API
    navigate('/platform/deal/deal-1/buyers')
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
              step === s.id
                ? 'bg-black text-white font-medium'
                : step > s.id
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-400'
            }`}>
              {step > s.id ? <Check size={14} /> : <span>{s.id}</span>}
              <span>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <ChevronRight size={16} className="text-gray-300" />}
          </div>
        ))}
      </div>

      {/* Step 1: Company basics */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
              <input
                type="text"
                value={form.companyName}
                onChange={e => setForm({ ...form, companyName: e.target.value })}
                placeholder="e.g., Centari"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Sector</label>
              <input
                type="text"
                value={form.sector}
                onChange={e => setForm({ ...form, sector: e.target.value })}
                placeholder="e.g., Legal AI & Contract Intelligence"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Brief Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="What does this company do?"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              onClick={() => setStep(2)}
              disabled={!form.companyName}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Upload documents */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload Documents</h2>
          <p className="text-sm text-gray-500 mb-6">Upload pitch decks (PDF, PPTX) and financials (XLSX, CSV). Our AI will extract key data automatically.</p>

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
              dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Upload size={32} className="mx-auto mb-3 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">
              Drag & drop files here, or{' '}
              <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                browse
                <input
                  type="file"
                  multiple
                  accept=".pdf,.pptx,.ppt,.xlsx,.csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-xs text-gray-400">PDF, PPTX, XLSX, CSV — up to 50MB per file</p>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="mt-5 space-y-2">
              {files.map(f => (
                <div key={f.id} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  {f.name.endsWith('.pdf') || f.name.endsWith('.pptx') || f.name.endsWith('.ppt') ? (
                    <FileText size={18} className="text-red-500 flex-shrink-0" />
                  ) : (
                    <Table size={18} className="text-green-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-700 truncate">{f.name}</div>
                    <div className="text-xs text-gray-400">{formatSize(f.size)}</div>
                  </div>
                  {f.status === 'processing' ? (
                    <Loader2 size={16} className="text-blue-500 animate-spin" />
                  ) : f.status === 'extracted' ? (
                    <Check size={16} className="text-emerald-500" />
                  ) : (
                    <button onClick={() => removeFile(f.id)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-5 py-2.5 text-gray-600 hover:text-gray-900 text-sm transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              onClick={simulateExtraction}
              disabled={files.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Extract Data <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review extracted data */}
      {step === 3 && extractedData && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Review Extracted Data</h2>
          <p className="text-sm text-gray-500 mb-6">AI extracted the following from your documents. Edit any fields as needed.</p>

          <div className="grid grid-cols-2 gap-5">
            {[
              { key: 'companyName', label: 'Company Name' },
              { key: 'sector', label: 'Sector' },
              { key: 'location', label: 'Location' },
              { key: 'founded', label: 'Founded' },
              { key: 'employees', label: 'Employees' },
              { key: 'revenue', label: 'Revenue ($)' },
              { key: 'ebitda', label: 'EBITDA ($)' },
              { key: 'growthRate', label: 'Growth Rate (%)' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                <input
                  type="text"
                  value={extractedData[field.key]}
                  onChange={e => setExtractedData({ ...extractedData, [field.key]: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Model</label>
            <textarea
              value={extractedData.businessModel}
              onChange={e => setExtractedData({ ...extractedData, businessModel: e.target.value })}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Key Highlights (AI-extracted)</label>
            <div className="space-y-2">
              {extractedData.keyHighlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">
                    <Check size={14} />
                  </span>
                  <input
                    type="text"
                    value={h}
                    onChange={e => {
                      const updated = [...extractedData.keyHighlights]
                      updated[i] = e.target.value
                      setExtractedData({ ...extractedData, keyHighlights: updated })
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 text-gray-600 hover:text-gray-900 text-sm transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Continue <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && extractedData && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Ready to Create Deal</h2>
            <p className="text-sm text-gray-500 mt-1">Review the summary below and create your deal mandate.</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-400">Company:</span> <span className="font-medium text-gray-900">{extractedData.companyName}</span></div>
              <div><span className="text-gray-400">Sector:</span> <span className="font-medium text-gray-900">{extractedData.sector}</span></div>
              <div><span className="text-gray-400">Revenue:</span> <span className="font-medium text-gray-900">${extractedData.revenue}</span></div>
              <div><span className="text-gray-400">Growth:</span> <span className="font-medium text-emerald-600">{extractedData.growthRate}%</span></div>
              <div><span className="text-gray-400">Location:</span> <span className="font-medium text-gray-900">{extractedData.location}</span></div>
              <div><span className="text-gray-400">Employees:</span> <span className="font-medium text-gray-900">{extractedData.employees}</span></div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="text-sm text-gray-400 mb-2">{files.length} documents uploaded</div>
            {files.map(f => (
              <div key={f.id} className="text-sm text-gray-700">{f.name}</div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-5 py-2.5 text-gray-600 hover:text-gray-900 text-sm transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <Check size={16} /> Create Deal & Start Matching
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

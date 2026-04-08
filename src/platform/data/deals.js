export const deals = [
  {
    id: 'deal-1',
    companyName: 'Centari',
    sector: 'Legal AI & Contract Intelligence',
    description: 'AI-powered deal point extraction and contract analytics platform for legal professionals. Centari uses NLP to automatically identify, extract, and benchmark key deal terms from legal documents.',
    stage: 'buyer-outreach',
    revenue: 4200000,
    ebitda: 850000,
    growthRate: 42,
    askPrice: null,
    founded: 2019,
    location: 'New York, USA',
    employees: 45,
    website: 'centari.ai',
    uploads: [
      { id: 'u1', fileName: 'Centari_Pitch_Deck_2025.pdf', fileType: 'pdf', status: 'extracted', createdAt: '2025-11-15' },
      { id: 'u2', fileName: 'Centari_Financials_2023-2025.xlsx', fileType: 'xlsx', status: 'extracted', createdAt: '2025-11-15' },
    ],
    createdAt: '2025-11-10',
  },
  {
    id: 'deal-2',
    companyName: 'Daulto',
    sector: 'Residential Heat Pump Installation & HVAC Services',
    description: 'Full-stack heat pump installer for German homeowners. Offers a "Rundum-Sorglos-Paket" covering consultation, subsidy application, and installation with an 80-day turnaround.',
    stage: 'nda-signed',
    revenue: 8500000,
    ebitda: 1200000,
    growthRate: 65,
    askPrice: null,
    founded: 2021,
    location: 'Heidelberg, Germany',
    employees: 120,
    website: 'daulto.de',
    uploads: [
      { id: 'u3', fileName: 'Daulto_Investor_Deck.pdf', fileType: 'pdf', status: 'extracted', createdAt: '2025-10-22' },
      { id: 'u4', fileName: 'Daulto_P&L_2022-2025.xlsx', fileType: 'xlsx', status: 'extracted', createdAt: '2025-10-22' },
    ],
    createdAt: '2025-10-20',
  },
  {
    id: 'deal-3',
    companyName: 'ShipFlow',
    sector: 'Ecommerce Fulfillment Networks & 3PL Services',
    description: 'AI-optimized multi-warehouse fulfillment platform for D2C brands. Intelligent order routing across 3PL partners to minimize shipping costs and delivery times.',
    stage: 'offers-received',
    revenue: 12000000,
    ebitda: 2400000,
    growthRate: 38,
    askPrice: 45000000,
    founded: 2018,
    location: 'London, UK',
    employees: 85,
    website: 'shipflow.io',
    uploads: [
      { id: 'u5', fileName: 'ShipFlow_CIM_Draft.pdf', fileType: 'pdf', status: 'extracted', createdAt: '2025-09-05' },
      { id: 'u6', fileName: 'ShipFlow_Model_2025.xlsx', fileType: 'xlsx', status: 'extracted', createdAt: '2025-09-05' },
    ],
    createdAt: '2025-09-01',
  },
]

export const stageLabels = {
  'new': 'New',
  'data-collection': 'Data Collection',
  'buyer-outreach': 'Buyer Outreach',
  'nda-signed': 'NDA Phase',
  'meetings': 'Meetings',
  'offers-received': 'Offers Received',
  'term-sheet': 'Term Sheet',
  'closed': 'Closed',
}

export const stageColors = {
  'new': 'bg-gray-100 text-gray-700',
  'data-collection': 'bg-blue-50 text-blue-700',
  'buyer-outreach': 'bg-indigo-50 text-indigo-700',
  'nda-signed': 'bg-purple-50 text-purple-700',
  'meetings': 'bg-amber-50 text-amber-700',
  'offers-received': 'bg-emerald-50 text-emerald-700',
  'term-sheet': 'bg-green-50 text-green-700',
  'closed': 'bg-green-100 text-green-800',
}

export function getDeal(id) {
  return deals.find(d => d.id === id)
}

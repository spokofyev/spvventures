export const valuations = {
  'deal-1': {
    metricType: '2025 Annual Revenue',
    metricValue: 4200000,
    publicCompanies: [
      { name: 'Legal AI & Document Intelligence Platforms', p25: 3.2, p75: 8.5, evLow: 13440000, evHigh: 35700000 },
      { name: 'Enterprise NLP & Text Analytics', p25: 2.8, p75: 7.2, evLow: 11760000, evHigh: 30240000 },
      { name: 'Contract Lifecycle Management (CLM)', p25: 2.5, p75: 6.8, evLow: 10500000, evHigh: 28560000 },
      { name: 'Legal Research & Compliance Tech', p25: 2.0, p75: 5.5, evLow: 8400000, evHigh: 23100000 },
      { name: 'Enterprise SaaS (Vertical)', p25: 3.5, p75: 9.0, evLow: 14700000, evHigh: 37800000 },
    ],
    privateCompanies: [
      { name: 'Legal AI Startups & Scale-ups', p25: 2.0, p75: 5.0, evLow: 8400000, evHigh: 21000000 },
      { name: 'AI-Powered Document Analytics', p25: 1.8, p75: 4.5, evLow: 7560000, evHigh: 18900000 },
      { name: 'Contract Intelligence & Extraction', p25: 2.2, p75: 5.5, evLow: 9240000, evHigh: 23100000 },
    ],
  },
  'deal-2': {
    metricType: '2025 Annual Revenue',
    metricValue: 8500000,
    publicCompanies: [
      { name: 'Global HVAC OEMs (Heat Pumps, AC, Refrigeration Manufacturing)', p25: 0.9, p75: 3.5, evLow: 4000000, evHigh: 17000000 },
      { name: 'Regional Solar Installers & Service Providers', p25: 0.3, p75: 4.7, evLow: 2000000, evHigh: 23000000 },
      { name: 'Solar EPCs, Installers & Project Developers', p25: 1.2, p75: 4.2, evLow: 6000000, evHigh: 21000000 },
      { name: 'HVAC Installation, Contracting & Building Energy Services', p25: 0.5, p75: 0.8, evLow: 3000000, evHigh: 4000000 },
      { name: 'Energy Services, Utilities & Fuel Providers', p25: 2.0, p75: 5.1, evLow: 10000000, evHigh: 26000000 },
      { name: 'Solar PV Manufacturers, Inverters & Energy Storage Tech', p25: 0.8, p75: 2.9, evLow: 4000000, evHigh: 14000000 },
    ],
    privateCompanies: [
      { name: 'Underfloor Heating And Building Thermal Systems', p25: 0.7, p75: 1.4, evLow: 4000000, evHigh: 7000000 },
      { name: 'Residential Heat Pump Installation & HVAC Services', p25: 0.6, p75: 1.5, evLow: 3000000, evHigh: 8000000 },
      { name: 'Industrial & Commercial Energy Services And EPC', p25: 0.8, p75: 1.2, evLow: 4000000, evHigh: 6000000 },
    ],
  },
  'deal-3': {
    metricType: '2025 Annual Revenue',
    metricValue: 12000000,
    publicCompanies: [
      { name: 'Ecommerce Fulfillment Networks & 3PL Services', p25: 1.1, p75: 3.8, evLow: 13200000, evHigh: 45600000 },
      { name: 'Commerce Operations & Multi-Channel Management', p25: 2.0, p75: 5.5, evLow: 24000000, evHigh: 66000000 },
      { name: 'Returns & Reverse Logistics Technology', p25: 1.5, p75: 4.0, evLow: 18000000, evHigh: 48000000 },
      { name: 'Warehouse & Logistics Automation Technology', p25: 1.8, p75: 4.5, evLow: 21600000, evHigh: 54000000 },
      { name: 'Parcel Shipping Rate Aggregators & Labeling', p25: 1.0, p75: 3.2, evLow: 12000000, evHigh: 38400000 },
    ],
    privateCompanies: [
      { name: 'Ecommerce Fulfillment Networks & 3PL Services', p25: 0.8, p75: 2.5, evLow: 9600000, evHigh: 30000000 },
      { name: 'Commerce Operations & Multi-Channel Management', p25: 1.2, p75: 3.0, evLow: 14400000, evHigh: 36000000 },
      { name: 'Last-Mile Delivery & Route Optimization', p25: 1.0, p75: 2.8, evLow: 12000000, evHigh: 33600000 },
    ],
  },
}

export function getValuation(dealId) {
  return valuations[dealId]
}

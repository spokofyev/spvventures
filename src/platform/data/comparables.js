export const comparables = {
  'deal-1': {
    publicComps: [
      { id: 'pc1', company: 'NICE Ltd', ticker: 'NICE', sector: 'AI & Analytics Software', marketCap: 12500000, evRevenue: 6.8, evEbitda: 22.5, location: 'Ra\'anana, Israel' },
      { id: 'pc2', company: 'Veritone', ticker: 'VERI', sector: 'Enterprise AI', marketCap: 450000, evRevenue: 2.1, evEbitda: null, location: 'Denver, USA' },
      { id: 'pc3', company: 'Nuance Comm.', ticker: 'NUAN', sector: 'Conversational AI', marketCap: 19600000, evRevenue: 8.2, evEbitda: 28.0, location: 'Burlington, USA' },
      { id: 'pc4', company: 'Open Text', ticker: 'OTEX', sector: 'Information Management', marketCap: 8900000, evRevenue: 3.5, evEbitda: 12.8, location: 'Waterloo, Canada' },
      { id: 'pc5', company: 'Dlocal', ticker: 'DLO', sector: 'Legal AI Platform', marketCap: 5200000, evRevenue: 5.1, evEbitda: 18.5, location: 'Montevideo, Uruguay' },
    ],
    privateWithMultiples: [
      { id: 'pm1', company: 'Kira Systems', sector: 'Legal AI & Contract Analysis', description: 'AI-powered contract analysis platform for law firms and enterprises', location: 'Toronto, Canada', dealSize: 120000, acquirer: 'Litera', evRevenue: 5.2, evEbitda: null },
      { id: 'pm2', company: 'eBrevia', sector: 'Legal AI & Contract Analysis', description: 'AI-driven contract analytics and due diligence automation', location: 'New York, USA', dealSize: 45000, acquirer: 'DFIN', evRevenue: 4.5, evEbitda: null },
      { id: 'pm3', company: 'Luminance', sector: 'Legal AI & Document Intelligence', description: 'AI platform for legal document review and analysis', location: 'London, UK', dealSize: 100000, acquirer: 'Private Round', evRevenue: 8.0, evEbitda: null },
      { id: 'pm4', company: 'Seal Software', sector: 'Contract Discovery & Analytics', description: 'AI-powered contract discovery and analytics platform', location: 'San Francisco, USA', dealSize: 188000, acquirer: 'DocuSign', evRevenue: 6.5, evEbitda: null },
      { id: 'pm5', company: 'ThoughtTrace', sector: 'AI Document Analysis', description: 'AI-powered document understanding for legal professionals', location: 'Houston, USA', dealSize: 35000, acquirer: 'Thomson Reuters', evRevenue: 3.8, evEbitda: null },
    ],
    privateWithoutMultiples: [
      { id: 'pn1', company: 'Clausematch', sector: 'Regulatory & Policy Mgmt', description: 'Document and policy lifecycle management with AI', location: 'London, UK', dealSize: 10000, acquirer: 'Corlytics' },
      { id: 'pn2', company: 'LegalSifter', sector: 'AI Contract Review', description: 'AI-powered contract review and negotiation assistant', location: 'Pittsburgh, USA', dealSize: null, acquirer: 'Private' },
      { id: 'pn3', company: 'Juro', sector: 'Contract Automation', description: 'AI-native contract management platform', location: 'London, UK', dealSize: 23000, acquirer: 'Private Round' },
      { id: 'pn4', company: 'Ironclad', sector: 'Contract Lifecycle Mgmt', description: 'Digital contracting platform for modern legal teams', location: 'San Francisco, USA', dealSize: 150000, acquirer: 'Private Round' },
    ],
    summaryStats: {
      avgEvRevenue: 5.6,
      medianEvRevenue: 5.2,
      avgEvEbitda: null,
      medianEvEbitda: null,
    },
  },
  'deal-2': {
    publicComps: [
      { id: 'pc10', company: 'Enphase Energy', ticker: 'ENPH', sector: 'Solar & Energy Tech', marketCap: 22000000, evRevenue: 5.8, evEbitda: 18.5, location: 'Fremont, USA' },
      { id: 'pc11', company: 'Wärtsilä', ticker: 'WRT1V', sector: 'Energy & Marine', marketCap: 9500000, evRevenue: 1.5, evEbitda: 11.2, location: 'Helsinki, Finland' },
      { id: 'pc12', company: 'NIBE Industrier', ticker: 'NIBE-B', sector: 'Heat Pumps & Climate', marketCap: 14200000, evRevenue: 2.8, evEbitda: 15.5, location: 'Markaryd, Sweden' },
      { id: 'pc13', company: 'Daikin Industries', ticker: '6367', sector: 'HVAC Manufacturing', marketCap: 48000000, evRevenue: 1.6, evEbitda: 12.0, location: 'Osaka, Japan' },
    ],
    privateWithMultiples: [
      { id: 'pm10', company: 'Aira', sector: 'Residential Heat Pump Installation & HVAC Services', description: 'European heat pump installation company offering end-to-end service', location: 'Stockholm, Sweden', dealSize: 165000, acquirer: 'Private Round', evRevenue: 2.8, evEbitda: null },
      { id: 'pm11', company: 'Thermondo', sector: 'Residential Heat Pump Installation & HVAC Services', description: 'Germany\'s largest digital heating installer', location: 'Berlin, Germany', dealSize: 85000, acquirer: 'Private Round', evRevenue: 1.5, evEbitda: null },
      { id: 'pm12', company: 'Octopus Energy (Services)', sector: 'Energy Services & Installation', description: 'Energy retailer expanding into heat pump installation', location: 'London, UK', dealSize: 800000, acquirer: 'CPP Investments', evRevenue: 1.2, evEbitda: null },
      { id: 'pm13', company: 'Senec', sector: 'Solar & Energy Storage Installation', description: 'Home energy storage and solar installation services', location: 'Leipzig, Germany', dealSize: 120000, acquirer: 'EnBW', evRevenue: 1.8, evEbitda: null },
    ],
    privateWithoutMultiples: [
      { id: 'pn10', company: '1KOMMA5°', sector: 'Climate Tech Installation', description: 'One-stop-shop for solar, heat pumps, and energy management', location: 'Hamburg, Germany', dealSize: 430000, acquirer: 'Private Round' },
      { id: 'pn11', company: 'Zolar', sector: 'Solar Installation Platform', description: 'Online platform for residential solar installation', location: 'Berlin, Germany', dealSize: 100000, acquirer: 'Private Round' },
      { id: 'pn12', company: 'Solarwatt', sector: 'Solar & Energy Systems', description: 'Complete solar energy systems manufacturer and installer', location: 'Dresden, Germany', dealSize: null, acquirer: 'BMW i Ventures' },
    ],
    summaryStats: {
      avgEvRevenue: 1.8,
      medianEvRevenue: 1.7,
      avgEvEbitda: null,
      medianEvEbitda: null,
    },
  },
  'deal-3': {
    publicComps: [
      { id: 'pc20', company: 'GXO Logistics', ticker: 'GXO', sector: 'Contract Logistics', marketCap: 6800000, evRevenue: 0.8, evEbitda: 9.5, location: 'Greenwich, USA' },
      { id: 'pc21', company: 'Descartes Systems', ticker: 'DSGX', sector: 'Supply Chain Tech', marketCap: 7200000, evRevenue: 12.5, evEbitda: 35.0, location: 'Waterloo, Canada' },
      { id: 'pc22', company: 'Manhattan Associates', ticker: 'MANH', sector: 'Supply Chain Solutions', marketCap: 15500000, evRevenue: 18.0, evEbitda: 42.0, location: 'Atlanta, USA' },
    ],
    privateWithMultiples: [
      { id: 'pm20', company: 'PFS', sector: 'Ecommerce Fulfillment Networks & 3PL Services', description: 'PFS Commerce is a premier eCommerce fulfillment provider with over 20 years of experience', location: 'Allen, USA', dealSize: 218650.7, acquirer: 'GXO Logistics', evRevenue: 1.1, evEbitda: 13.6 },
      { id: 'pm21', company: 'Arche Digital', sector: 'Ecommerce Fulfillment Networks & 3PL Services', description: 'Arche Digital is a leading E-Commerce enabler and fulfillment center', location: 'Petaling Jaya, Malaysia', dealSize: 1500, acquirer: 'AnyMind Group', evRevenue: null, evEbitda: null },
      { id: 'pm22', company: 'Borderfree', sector: 'Commerce Operations & Multi-Channel Management', description: 'Borderfree is an innovative platform that provides international e-commerce solutions', location: 'New York, USA', dealSize: 482359.4, acquirer: 'Global-e', evRevenue: 3.8, evEbitda: null },
      { id: 'pm23', company: 'ChannelAdvisor', sector: 'Commerce Operations & Multi-Channel Management', description: 'Rithum is a comprehensive e-commerce platform that connects brands, suppliers, and retailers', location: 'Morrisville, USA', dealSize: 732720.8, acquirer: 'CommerceHub', evRevenue: 3.8, evEbitda: 13.6 },
      { id: 'pm24', company: 'Spedimex', sector: 'Ecommerce Fulfillment Networks & 3PL Services', description: 'Spedimex specializes in contract logistics and transportation', location: 'Stryków, Poland', dealSize: 350000, acquirer: 'ID Logistics Group', evRevenue: 1.1, evEbitda: null },
      { id: 'pm25', company: 'ZigZag Global', sector: 'Returns & Reverse Logistics Technology', description: 'ZigZag is a market-leading global returns solution provider', location: 'London, UK', dealSize: 775, acquirer: 'Global Blue', evRevenue: null, evEbitda: null },
      { id: 'pm26', company: 'Berkshire Grey', sector: 'Warehouse & Logistics Automation Technology', description: 'Berkshire Grey is a pioneer in transformative, AI-enabled robotic solutions', location: 'Bedford, USA', dealSize: 278705.5, acquirer: 'SoftBank Group', evRevenue: null, evEbitda: null },
      { id: 'pm27', company: 'Omni Logistics', sector: 'Ecommerce Fulfillment Networks & 3PL Services', description: 'Omni Logistics is a global multimodal provider of logistics and supply chain solutions', location: 'Dallas, USA', dealSize: 3200000, acquirer: 'Forward Air', evRevenue: 1.1, evEbitda: null },
      { id: 'pm28', company: 'MELHOR ENVIO', sector: 'Parcel Shipping Rate Aggregators & Labeling', description: 'Melhor Envio provides cheaper shipping costs for e-commerce', location: 'Pelotas, Brazil', dealSize: 83000, acquirer: 'Locaweb', evRevenue: null, evEbitda: null },
    ],
    privateWithoutMultiples: [
      { id: 'pn20', company: 'ShipBob', sector: 'Ecommerce Fulfillment', description: 'Cloud-based ecommerce fulfillment platform for D2C brands', location: 'Chicago, USA', dealSize: 200000, acquirer: 'Private Round' },
      { id: 'pn21', company: 'Deliverr', sector: 'Ecommerce Fulfillment', description: 'Fast and affordable fulfillment for ecommerce sellers', location: 'San Francisco, USA', dealSize: 2100000, acquirer: 'Shopify' },
    ],
    summaryStats: {
      avgEvRevenue: 3.8,
      medianEvRevenue: 3.8,
      avgEvEbitda: 13.6,
      medianEvEbitda: 13.6,
    },
  },
}

export function getComparables(dealId) {
  return comparables[dealId]
}

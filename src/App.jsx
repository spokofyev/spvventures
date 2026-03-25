import Nav from './components/Nav'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import StatsBar from './components/StatsBar'
import ComparisonTable from './components/ComparisonTable'
import WhoWeServe from './components/WhoWeServe'
import FocusAreas from './components/FocusAreas'
import CaseStudies from './components/CaseStudies'
import Expertise from './components/Expertise'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <main className="pt-16">
        <Hero />
        <Ticker />
        <StatsBar />
        <ComparisonTable />
        <WhoWeServe />
        <FocusAreas />
        <CaseStudies />
        <Expertise />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

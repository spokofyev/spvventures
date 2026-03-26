import Nav from './components/Nav'
import Hero from './components/Hero'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <main className="pt-16">
        <Hero />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

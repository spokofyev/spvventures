import React from 'react';

export default function StoneCopper() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1c1c1c] font-sans selection:bg-[#b5522a] selection:text-[#f5f0e8]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#f5f0e8]/90 backdrop-blur-md border-b border-[#1c1c1c]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-['Playfair_Display'] text-2xl font-semibold tracking-tight">
            SPV Ventures
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#about" className="hover:text-[#b5522a] transition-colors duration-300">About</a>
            <a href="#model" className="hover:text-[#b5522a] transition-colors duration-300">Model</a>
            <a href="#contact" className="hover:text-[#b5522a] transition-colors duration-300">Contact</a>
          </div>
          <button 
            onClick={scrollToContact}
            className="md:hidden text-sm font-medium tracking-wide border border-[#1c1c1c] px-4 py-2 hover:bg-[#1c1c1c] hover:text-[#f5f0e8] transition-colors duration-300"
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 px-6 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-1/4 right-0 w-1/3 h-2/3 bg-gradient-to-bl from-[#b5522a]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <div className="text-[#b5522a] text-xs font-bold tracking-[0.2em] uppercase mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-[#b5522a]"></span>
              Corporate Innovation Partners
            </div>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl leading-[1.1] font-medium mb-10 tracking-tight text-[#1c1c1c]">
              We help corporates build the tech they can't afford to miss
            </h1>
            <p className="text-xl md:text-2xl text-[#1c1c1c]/70 leading-relaxed max-w-2xl mb-12 font-light">
              Partnering with established companies to acquire R&D talent, build internal capabilities, and turn technology gaps into competitive advantages.
            </p>
            <button 
              onClick={scrollToContact}
              className="group inline-flex items-center gap-3 bg-[#b5522a] text-[#f5f0e8] px-8 py-4 text-sm font-medium tracking-wide hover:bg-[#9a4522] transition-colors duration-300"
            >
              Get in Touch
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 border-t border-[#1c1c1c]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="text-[#b5522a] text-xs font-bold tracking-[0.2em] uppercase mb-8 sticky top-32">
                About
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium mb-12 text-[#1c1c1c] leading-tight max-w-2xl">
                Founders and operators, not consultants
              </h2>
              
              <div className="space-y-8 text-lg text-[#1c1c1c]/80 leading-relaxed font-light max-w-3xl">
                <p>
                  We are a team of founders and operators with deep networks across engineering labs, research teams, and frontier builders — in healthcare, finance, space, and industrial production.
                </p>
                <p>
                  We partner with established corporations to identify technology gaps, acquire the right R&D teams, and build the capabilities that close them. Then we help move those assets forward — through M&A or structured SPV capital.
                </p>
                
                <div className="my-16 pl-8 border-l-2 border-[#b5522a] py-2">
                  <p className="font-['Playfair_Display'] text-2xl md:text-3xl italic text-[#1c1c1c] leading-snug">
                    "We don't advise from the sidelines. We get in, build alongside you, and stay until it works."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Section */}
      <section id="model" className="py-32 px-6 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="text-[#b5522a] text-xs font-bold tracking-[0.2em] uppercase mb-8">
                How We Work
              </div>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-medium text-[#1c1c1c]">
                The Model
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 01 */}
            <div className="bg-[#f5f0e8] p-10 border-l-4 border-[#b5522a] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
              <div className="text-sm font-bold tracking-widest text-[#1c1c1c]/40 mb-6 font-['Playfair_Display'] italic">01</div>
              <h3 className="text-xl font-semibold mb-6 text-[#1c1c1c]">Identify the Gap</h3>
              <p className="text-[#1c1c1c]/70 leading-relaxed font-light mt-auto">
                We map where your business is exposed to technological disruption — and locate the teams already building the answer.
              </p>
            </div>

            {/* Card 02 */}
            <div className="bg-[#f5f0e8] p-10 border-l-4 border-[#b5522a] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
              <div className="text-sm font-bold tracking-widest text-[#1c1c1c]/40 mb-6 font-['Playfair_Display'] italic">02</div>
              <h3 className="text-xl font-semibold mb-6 text-[#1c1c1c]">Acquire & Build</h3>
              <p className="text-[#1c1c1c]/70 leading-relaxed font-light mt-auto">
                We structure the acquisition of R&D teams or labs, then work hands-on to integrate them and accelerate their output inside your organisation.
              </p>
            </div>

            {/* Card 03 */}
            <div className="bg-[#f5f0e8] p-10 border-l-4 border-[#b5522a] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
              <div className="text-sm font-bold tracking-widest text-[#1c1c1c]/40 mb-6 font-['Playfair_Display'] italic">03</div>
              <h3 className="text-xl font-semibold mb-6 text-[#1c1c1c]">Capital & Exit</h3>
              <p className="text-[#1c1c1c]/70 leading-relaxed font-light mt-auto">
                We bridge building and ownership — through M&A advisory or SPV capital structures that align incentives for the long term.
              </p>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-[#1c1c1c]/10">
            <div className="flex flex-wrap items-center justify-between gap-6 text-sm font-medium tracking-widest uppercase text-[#1c1c1c]/60">
              <span>Healthcare</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#b5522a]"></span>
              <span>Finance</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#b5522a]"></span>
              <span>Space</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#b5522a]"></span>
              <span>Industrial Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-[#1c1c1c]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="text-[#b5522a] text-xs font-bold tracking-[0.2em] uppercase mb-8">
                Let's Talk
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-medium mb-8 text-[#1c1c1c] leading-tight">
                Working with corporates who want to move faster
              </h2>
              
              <p className="text-xl text-[#1c1c1c]/70 leading-relaxed max-w-2xl mb-12 font-light">
                If you're a corporate looking to acquire technology capability, or a founder interested in strategic backing — we'd like to hear from you.
              </p>
              
              <a 
                href="mailto:hello@spvventures.com"
                className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-['Playfair_Display'] italic text-[#b5522a] hover:text-[#9a4522] transition-colors duration-300"
              >
                Get in Touch 
                <span className="transform group-hover:translate-x-2 transition-transform duration-300 not-italic">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#1c1c1c]/10 text-sm text-[#1c1c1c]/60 font-light">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 SPV Ventures. All rights reserved.</p>
          <p>Lisbon, Portugal</p>
        </div>
      </footer>
    </div>
  );
}

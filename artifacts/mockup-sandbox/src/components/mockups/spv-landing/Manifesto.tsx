import React from "react";

export function Manifesto() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 font-['Inter',sans-serif] selection:bg-neutral-800 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-neutral-900">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between text-sm">
          <span className="font-['Playfair_Display',serif] text-neutral-100 font-medium tracking-wide">
            SPV Ventures
          </span>
          <div className="flex items-center gap-4 text-neutral-500">
            <a href="#about" className="hover:text-neutral-200 transition-colors">About</a>
            <span className="text-neutral-800">·</span>
            <a href="#model" className="hover:text-neutral-200 transition-colors">Model</a>
            <span className="text-neutral-800">·</span>
            <a href="#contact" className="hover:text-neutral-200 transition-colors" onClick={scrollToContact}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Container - Single Column */}
      <main className="max-w-2xl mx-auto px-6 pb-32 pt-16">
        
        {/* Hero */}
        <section className="min-h-[80vh] flex flex-col justify-center py-32">
          <div className="space-y-8">
            <p className="text-xs font-medium tracking-[0.2em] text-neutral-500 uppercase">
              Corporate Innovation Partners
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-['Playfair_Display',serif] text-neutral-50 leading-[1.1] tracking-tight">
              We help corporates build the tech they can't afford to miss
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl">
              Partnering with established companies to acquire R&D talent, build internal capabilities, and turn technology gaps into competitive advantages.{" "}
              <a href="#contact" onClick={scrollToContact} className="text-neutral-100 border-b border-neutral-700 hover:border-neutral-300 transition-colors whitespace-nowrap inline-flex items-center gap-1 group">
                Get in Touch 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-32 border-t border-neutral-900">
          <div className="space-y-12">
            <h2 className="text-3xl sm:text-4xl font-['Playfair_Display',serif] text-neutral-100">
              Founders and operators, not consultants
            </h2>
            
            <div className="space-y-8 text-lg text-neutral-400 leading-relaxed">
              <p>
                We are a team of founders and operators with deep networks across engineering labs, research teams, and frontier builders — in healthcare, finance, space, and industrial production.
              </p>
              <p>
                We partner with established corporations to identify technology gaps, acquire the right R&D teams, and build the capabilities that close them. Then we help move those assets forward — through M&A or structured SPV capital.
              </p>
              <p className="text-2xl sm:text-3xl font-['Playfair_Display',serif] text-neutral-200 leading-snug pt-8 pb-4">
                We don't advise from the sidelines. We get in, build alongside you, and stay until it works.
              </p>
            </div>
          </div>
        </section>

        {/* Model */}
        <section id="model" className="py-32 border-t border-neutral-900">
          <div className="space-y-32">
            
            <div className="relative">
              <div className="text-[100px] sm:text-[120px] font-['Inter',sans-serif] font-light leading-none text-neutral-900 mb-8 tracking-tighter">
                01
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-['Playfair_Display',serif] text-neutral-100">
                  Identify the Gap
                </h3>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  We map where your business is exposed to technological disruption — and locate the teams already building the answer.
                </p>
              </div>
            </div>

            <div className="relative pt-16 border-t border-neutral-900">
              <div className="text-[100px] sm:text-[120px] font-['Inter',sans-serif] font-light leading-none text-neutral-900 mb-8 tracking-tighter">
                02
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-['Playfair_Display',serif] text-neutral-100">
                  Acquire & Build
                </h3>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  We structure the acquisition of R&D teams or labs, then work hands-on to integrate them and accelerate their output inside your organisation.
                </p>
              </div>
            </div>

            <div className="relative pt-16 border-t border-neutral-900">
              <div className="text-[100px] sm:text-[120px] font-['Inter',sans-serif] font-light leading-none text-neutral-900 mb-8 tracking-tighter">
                03
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-['Playfair_Display',serif] text-neutral-100">
                  Capital & Exit
                </h3>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  We bridge building and ownership — through M&A advisory or SPV capital structures that align incentives for the long term.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Sectors */}
        <section className="py-24 border-t border-neutral-900">
          <p className="text-sm text-neutral-500 tracking-widest uppercase leading-loose text-center md:text-left">
            Healthcare <span className="text-neutral-800 mx-2">·</span> Finance <span className="text-neutral-800 mx-2">·</span> Space <span className="text-neutral-800 mx-2">·</span> Industrial Production
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 border-t border-neutral-900">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl font-['Playfair_Display',serif] text-neutral-100 leading-tight">
              Working with corporates who want to move faster
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed">
              If you're a corporate looking to acquire technology capability, or a founder interested in strategic backing — we'd like to hear from you.
            </p>
            <div className="pt-8">
              <a 
                href="mailto:hello@spvventures.com" 
                className="inline-flex items-center gap-2 text-neutral-100 border-b border-neutral-700 hover:border-neutral-300 transition-colors text-lg group pb-1"
              >
                Get in Touch 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-12 text-sm text-neutral-600">
        <div className="max-w-2xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2025 SPV Ventures. All rights reserved.</p>
          <p>Lisbon, Portugal</p>
        </div>
      </footer>

    </div>
  );
}

export default Manifesto;

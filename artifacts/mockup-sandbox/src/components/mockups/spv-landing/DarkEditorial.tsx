import React, { useEffect, useState } from "react";

export default function DarkEditorial() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-300 font-sans selection:bg-[#d4af37] selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-md border-white/5 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="text-white font-['Playfair_Display'] text-xl tracking-wide font-medium">
            SPV Ventures
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-neutral-400">
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-[#d4af37] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("model")}
              className="hover:text-[#d4af37] transition-colors"
            >
              Model
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-[#d4af37] transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "4rem 4rem"
          }}
        />
        
        {/* Soft radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase">
                Corporate Innovation Partners
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-['Playfair_Display'] text-white leading-[1.1] mb-8 tracking-tight">
              We help corporates build the tech they can't afford to miss
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-12 font-light">
              Partnering with established companies to acquire R&D talent, build internal capabilities, and turn technology gaps into competitive advantages.
            </p>
            
            <button 
              onClick={() => scrollToSection("contact")}
              className="group flex items-center gap-4 text-white hover:text-[#d4af37] transition-colors pb-2 border-b border-white/20 hover:border-[#d4af37]"
            >
              <span className="text-sm tracking-widest uppercase">Get in Touch</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <span className="text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
                  About
                </span>
                <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-white leading-tight">
                  Founders and operators, not consultants
                </h2>
              </div>
            </div>
            
            <div className="lg:col-span-7 lg:col-start-6 space-y-12">
              <p className="text-xl text-neutral-400 leading-relaxed font-light">
                We are a team of founders and operators with deep networks across engineering labs, research teams, and frontier builders — in healthcare, finance, space, and industrial production.
              </p>
              
              <p className="text-xl text-neutral-400 leading-relaxed font-light">
                We partner with established corporations to identify technology gaps, acquire the right R&D teams, and build the capabilities that close them. Then we help move those assets forward — through M&A or structured SPV capital.
              </p>

              <div className="pl-8 border-l-2 border-[#d4af37] py-2 mt-16">
                <p className="text-2xl md:text-3xl font-['Playfair_Display'] text-white leading-snug italic">
                  "We don't advise from the sidelines. We get in, build alongside you, and stay until it works."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Section */}
      <section id="model" className="py-32 bg-[#050505] relative border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <span className="text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
              How We Work
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {/* Card 1 */}
            <div className="bg-[#0a0a0a] border border-white/5 p-10 hover:border-[#d4af37]/30 transition-colors duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-white/5 font-['Playfair_Display'] text-8xl group-hover:text-white/10 transition-colors duration-500">
                01
              </div>
              <h3 className="text-2xl font-['Playfair_Display'] text-white mb-6 relative z-10">Identify the Gap</h3>
              <p className="text-neutral-400 leading-relaxed font-light relative z-10">
                We map where your business is exposed to technological disruption — and locate the teams already building the answer.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0a0a0a] border border-white/5 p-10 hover:border-[#d4af37]/30 transition-colors duration-500 group relative overflow-hidden mt-0 md:mt-12">
              <div className="absolute top-0 right-0 p-8 text-white/5 font-['Playfair_Display'] text-8xl group-hover:text-white/10 transition-colors duration-500">
                02
              </div>
              <h3 className="text-2xl font-['Playfair_Display'] text-white mb-6 relative z-10">Acquire & Build</h3>
              <p className="text-neutral-400 leading-relaxed font-light relative z-10">
                We structure the acquisition of R&D teams or labs, then work hands-on to integrate them and accelerate their output inside your organisation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0a0a0a] border border-white/5 p-10 hover:border-[#d4af37]/30 transition-colors duration-500 group relative overflow-hidden mt-0 md:mt-24">
              <div className="absolute top-0 right-0 p-8 text-white/5 font-['Playfair_Display'] text-8xl group-hover:text-white/10 transition-colors duration-500">
                03
              </div>
              <h3 className="text-2xl font-['Playfair_Display'] text-white mb-6 relative z-10">Capital & Exit</h3>
              <p className="text-neutral-400 leading-relaxed font-light relative z-10">
                We bridge building and ownership — through M&A advisory or SPV capital structures that align incentives for the long term.
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-16">
            <div className="flex flex-wrap items-center justify-between gap-8 text-neutral-500 font-['Playfair_Display'] text-xl md:text-2xl">
              <span className="hover:text-white transition-colors">Healthcare</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#d4af37]/50"></span>
              <span className="hover:text-white transition-colors">Finance</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#d4af37]/50"></span>
              <span className="hover:text-white transition-colors">Space</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#d4af37]/50"></span>
              <span className="hover:text-white transition-colors">Industrial Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#d4af37] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
                Let's Talk
              </span>
              <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] text-white leading-[1.1] mb-8">
                Working with corporates who want to move faster
              </h2>
            </div>
            
            <div className="lg:pl-16">
              <p className="text-xl text-neutral-400 leading-relaxed font-light mb-12">
                If you're a corporate looking to acquire technology capability, or a founder interested in strategic backing — we'd like to hear from you.
              </p>
              
              <a 
                href="mailto:hello@spvventures.com"
                className="inline-flex items-center gap-4 text-white hover:text-[#d4af37] transition-colors pb-2 border-b border-white/20 hover:border-[#d4af37] group"
              >
                <span className="text-sm tracking-widest uppercase">Get in Touch</span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-xs text-neutral-600 tracking-wider uppercase">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© 2025 SPV Ventures. All rights reserved.</div>
          <div>Lisbon, Portugal</div>
        </div>
      </footer>
    </div>
  );
}

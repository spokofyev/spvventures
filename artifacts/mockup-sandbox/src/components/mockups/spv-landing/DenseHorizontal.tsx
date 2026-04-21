import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function DenseHorizontal() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#e0e0e0] font-['Inter',sans-serif] selection:bg-[#c8a96e] selection:text-black antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-sm border-b border-white/5 px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-['Playfair_Display',serif] text-xl font-medium tracking-wide text-white">
          SPV Ventures
        </a>
        <div className="hidden md:flex items-center space-x-8 text-sm tracking-widest uppercase text-[#a0a0a0]">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#model" className="hover:text-white transition-colors">Model</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <section className="min-h-[70vh] flex flex-col justify-center py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="text-xs font-semibold tracking-[0.2em] text-[#c8a96e] uppercase">
                Corporate Innovation Partners
              </div>
              <h1 className="font-['Playfair_Display',serif] text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white font-medium tracking-tight">
                We help corporates build the tech they can't afford to miss
              </h1>
              <p className="text-lg md:text-xl text-[#a0a0a0] leading-relaxed max-w-2xl font-light">
                Partnering with established companies to acquire R&D talent, build internal capabilities, and turn technology gaps into competitive advantages.
              </p>
            </div>

            {/* Right Column: Fact Block */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end w-full">
              <div className="w-full max-w-md border border-white/10 p-8 rounded-sm bg-white/[0.02]">
                <div className="space-y-4 text-sm font-mono tracking-wide">
                  <div className="flex justify-between items-end border-b border-white/10 pb-3">
                    <span className="text-[#888]">Focus</span>
                    <span className="text-right text-white ml-4">Corporate M&A & R&D Acquisition</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-3">
                    <span className="text-[#888]">Sectors</span>
                    <span className="text-right text-white ml-4">Healthcare · Finance · Space · Industrial</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-3">
                    <span className="text-[#888]">Structure</span>
                    <span className="text-right text-white ml-4">SPV Capital + M&A Advisory</span>
                  </div>
                  <div className="flex justify-between items-end pb-1">
                    <span className="text-[#888]">Base</span>
                    <span className="text-right text-white ml-4">Lisbon, Portugal</span>
                  </div>
                </div>
              </div>
              <a 
                href="#contact"
                onClick={scrollToContact}
                className="mt-8 inline-flex items-center text-[#c8a96e] font-medium tracking-wide hover:text-white transition-colors group"
              >
                Get in Touch 
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 border-t border-white/10">
          <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl text-white mb-16">
            Founders and operators, not consultants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-[#a0a0a0] leading-relaxed font-light">
            <p className="text-base md:text-lg">
              We are a team of founders and operators with deep networks across engineering labs, research teams, and frontier builders — in healthcare, finance, space, and industrial production.
            </p>
            <p className="text-base md:text-lg">
              We partner with established corporations to identify technology gaps, acquire the right R&D teams, and build the capabilities that close them. Then we help move those assets forward — through M&A or structured SPV capital.
            </p>
            <p className="text-xl md:text-2xl font-['Playfair_Display',serif] text-white italic font-medium leading-snug pl-4 md:pl-0 border-l-2 md:border-l-0 border-[#c8a96e]">
              "We don't advise from the sidelines. We get in, build alongside you, and stay until it works."
            </p>
          </div>
        </section>

        {/* Model Section (Pipeline) */}
        <section id="model" className="py-24 border-t border-white/10">
          <div className="flex flex-col lg:flex-row relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-white/20 z-0"></div>

            {/* Step 01 */}
            <div className="flex-1 relative z-10 lg:pr-12 mb-16 lg:mb-0">
              <div className="bg-[#111] inline-block pr-6 mb-6">
                <span className="text-5xl font-['Playfair_Display',serif] text-[#c8a96e]">01</span>
              </div>
              <h3 className="text-2xl text-white font-['Playfair_Display',serif] mb-4">Identify the Gap</h3>
              <p className="text-[#a0a0a0] font-light leading-relaxed">
                We map where your business is exposed to technological disruption — and locate the teams already building the answer.
              </p>
            </div>

            {/* Step 02 */}
            <div className="flex-1 relative z-10 lg:px-6 mb-16 lg:mb-0">
              <div className="bg-[#111] inline-block px-6 mb-6 -ml-6 lg:ml-0">
                <span className="text-5xl font-['Playfair_Display',serif] text-[#c8a96e]">02</span>
              </div>
              <h3 className="text-2xl text-white font-['Playfair_Display',serif] mb-4">Acquire & Build</h3>
              <p className="text-[#a0a0a0] font-light leading-relaxed">
                We structure the acquisition of R&D teams or labs, then work hands-on to integrate them and accelerate their output inside your organisation.
              </p>
            </div>

            {/* Step 03 */}
            <div className="flex-1 relative z-10 lg:pl-12">
              <div className="bg-[#111] inline-block px-6 mb-6 -ml-6 lg:ml-0">
                <span className="text-5xl font-['Playfair_Display',serif] text-[#c8a96e]">03</span>
              </div>
              <h3 className="text-2xl text-white font-['Playfair_Display',serif] mb-4">Capital & Exit</h3>
              <p className="text-[#a0a0a0] font-light leading-relaxed">
                We bridge building and ownership — through M&A advisory or SPV capital structures that align incentives for the long term.
              </p>
            </div>
          </div>
        </section>

        {/* Sectors Ticker */}
        <section className="py-12 border-t border-b border-white/10 overflow-hidden">
          <div className="flex justify-between items-center whitespace-nowrap overflow-x-auto no-scrollbar gap-12 text-[#666] uppercase tracking-[0.2em] text-sm md:text-base font-semibold">
            <span>Healthcare</span>
            <span className="text-white/20">•</span>
            <span>Finance</span>
            <span className="text-white/20">•</span>
            <span>Space</span>
            <span className="text-white/20">•</span>
            <span>Industrial Production</span>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl text-white mb-6 leading-tight">
                Working with corporates who want to move faster
              </h2>
              <p className="text-lg text-[#a0a0a0] font-light leading-relaxed">
                If you're a corporate looking to acquire technology capability, or a founder interested in strategic backing — we'd like to hear from you.
              </p>
            </div>
            <div className="flex lg:justify-end">
              <a 
                href="mailto:hello@spvventures.com"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#c8a96e] text-[#c8a96e] hover:bg-[#c8a96e] hover:text-black transition-all duration-300 font-medium tracking-wide uppercase text-sm"
              >
                Get in Touch
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 md:px-12 py-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#666] tracking-wider uppercase font-mono">
          <div>© 2025 SPV Ventures. All rights reserved.</div>
          <div>Lisbon, Portugal</div>
        </div>
      </footer>
    </div>
  );
}

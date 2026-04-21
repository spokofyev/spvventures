import React from 'react';

export function AsymmetricGrid() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1a1a] font-['Inter'] antialiased selection:bg-[#1a1a1a] selection:text-[#faf9f7] overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-8 md:px-12 relative z-10">
        <div className="text-sm font-medium tracking-wide uppercase">
          SPV Ventures
        </div>
        <div className="hidden md:flex gap-8 text-sm">
          <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
          <a href="#model" className="hover:opacity-60 transition-opacity">Model</a>
          <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-32 md:pt-24 md:pb-48 px-6 md:px-0">
        <div className="flex flex-col md:flex-row max-w-[1600px] mx-auto">
          {/* Left Column (25%) */}
          <div className="md:w-1/4 flex md:flex-col md:border-r border-[#e5e0d8] md:min-h-[60vh] md:pr-12 md:pl-12 mb-12 md:mb-0 relative">
            <div className="md:absolute md:top-0 md:-left-4 md:-rotate-90 md:origin-top-left md:translate-y-full flex items-center gap-4 whitespace-nowrap text-xs tracking-[0.2em] text-[#666] uppercase">
              Corporate Innovation Partners
              <div className="w-12 h-px bg-[#e5e0d8]"></div>
            </div>
            <div className="hidden md:block w-px h-full bg-[#e5e0d8] absolute right-0 top-0"></div>
          </div>

          {/* Right Column (75%) */}
          <div className="md:w-3/4 md:pl-16 lg:pl-24 pr-6 md:pr-12 lg:pr-24 flex flex-col justify-center">
            <h1 className="font-['Playfair_Display'] text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-tight mb-12 max-w-[18ch]">
              We help corporates build the tech they can't afford to miss
            </h1>
            
            <div className="max-w-[42ch] mb-16 relative pl-6 md:pl-8 border-l-2 border-[#1a1a1a]">
              <p className="text-lg md:text-xl leading-relaxed text-[#4a4a4a]">
                Partnering with established companies to acquire R&D talent, build internal capabilities, and turn technology gaps into competitive advantages.
              </p>
            </div>

            <div>
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="inline-flex items-center gap-4 text-sm font-medium tracking-widest uppercase hover:gap-6 transition-all duration-300"
              >
                Get in Touch 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 md:py-48 px-6 md:px-12 border-t border-[#e5e0d8] bg-white">
        <div className="flex flex-col-reverse md:flex-row max-w-[1600px] mx-auto gap-16 md:gap-0">
          {/* Left Column - Body Text (~60%) */}
          <div className="md:w-[60%] md:pr-24 lg:pr-32">
            <div className="space-y-12 text-lg md:text-xl leading-relaxed text-[#4a4a4a] max-w-[65ch]">
              <p>
                We are a team of founders and operators with deep networks across engineering labs, research teams, and frontier builders — in healthcare, finance, space, and industrial production.
              </p>
              <p>
                We partner with established corporations to identify technology gaps, acquire the right R&D teams, and build the capabilities that close them. Then we help move those assets forward — through M&A or structured SPV capital.
              </p>
              <blockquote className="text-2xl md:text-3xl font-['Playfair_Display'] text-[#1a1a1a] leading-snug pt-8 border-t border-[#e5e0d8] mt-16 italic">
                "We don't advise from the sidelines. We get in, build alongside you, and stay until it works."
              </blockquote>
            </div>
          </div>

          {/* Right Column - Heading (~40%) */}
          <div className="md:w-[40%] md:pl-16 md:border-l border-[#e5e0d8] relative">
            <div className="md:sticky md:top-32">
              <h2 className="font-['Playfair_Display'] text-[clamp(32px,4vw,56px)] leading-[1.1] tracking-tight">
                Founders and operators, not consultants
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Model Section */}
      <section id="model" className="py-24 md:py-32 px-6 md:px-12 border-t border-[#e5e0d8]">
        <div className="max-w-[1600px] mx-auto">
          {/* Asymmetric 3-column grid (45% / 30% / 25%) */}
          <div className="flex flex-col md:flex-row border-t border-l border-[#e5e0d8]">
            {/* Step 01 (45%) */}
            <div className="md:w-[45%] p-8 md:p-12 border-r border-b border-[#e5e0d8]">
              <div className="text-xs tracking-widest font-mono text-[#888] mb-12">01</div>
              <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-6">Identify the Gap</h3>
              <p className="text-[#4a4a4a] leading-relaxed max-w-[35ch]">
                We map where your business is exposed to technological disruption — and locate the teams already building the answer.
              </p>
            </div>
            
            {/* Step 02 (30%) */}
            <div className="md:w-[30%] p-8 md:p-12 border-r border-b border-[#e5e0d8]">
              <div className="text-xs tracking-widest font-mono text-[#888] mb-12">02</div>
              <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl mb-6">Acquire & Build</h3>
              <p className="text-[#4a4a4a] leading-relaxed text-sm md:text-base">
                We structure the acquisition of R&D teams or labs, then work hands-on to integrate them and accelerate their output inside your organisation.
              </p>
            </div>

            {/* Step 03 (25%) */}
            <div className="md:w-[25%] p-8 md:p-12 border-r border-b border-[#e5e0d8]">
              <div className="text-xs tracking-widest font-mono text-[#888] mb-12">03</div>
              <h3 className="font-['Playfair_Display'] text-xl md:text-2xl mb-6">Capital & Exit</h3>
              <p className="text-[#4a4a4a] leading-relaxed text-sm">
                We bridge building and ownership — through M&A advisory or SPV capital structures that align incentives for the long term.
              </p>
            </div>
          </div>

          {/* Sectors Row */}
          <div className="border-l border-r border-b border-[#e5e0d8] p-6 md:p-8 flex flex-col md:flex-row justify-center md:items-center gap-4 md:gap-12 bg-white">
            <span className="text-xs tracking-widest uppercase text-[#888] mb-2 md:mb-0">Sectors</span>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm md:text-base font-medium tracking-wide">
              <span>Healthcare</span>
              <span className="hidden md:inline text-[#e5e0d8]">·</span>
              <span>Finance</span>
              <span className="hidden md:inline text-[#e5e0d8]">·</span>
              <span>Space</span>
              <span className="hidden md:inline text-[#e5e0d8]">·</span>
              <span>Industrial Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-40 px-6 md:px-12 bg-white border-t border-[#e5e0d8]">
        <div className="flex flex-col md:flex-row max-w-[1600px] mx-auto items-center gap-16 md:gap-24">
          <div className="md:w-[55%]">
            <h2 className="font-['Playfair_Display'] text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-tight">
              Working with corporates who want to move faster
            </h2>
          </div>
          <div className="md:w-[45%] md:pl-16 md:border-l border-[#e5e0d8]">
            <p className="text-lg text-[#4a4a4a] mb-12 leading-relaxed">
              If you're a corporate looking to acquire technology capability, or a founder interested in strategic backing — we'd like to hear from you.
            </p>
            <a 
              href="mailto:hello@spvventures.com"
              className="group inline-flex items-center gap-6 text-sm font-medium tracking-widest uppercase hover:gap-8 transition-all duration-300 pb-2 border-b border-[#1a1a1a]"
            >
              Get in Touch
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e0d8] px-6 py-8 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs tracking-widest text-[#888] uppercase">
          <div>© 2025 SPV Ventures. All rights reserved.</div>
          <div>Lisbon, Portugal</div>
        </div>
      </footer>
    </div>
  );
}

export default AsymmetricGrid;

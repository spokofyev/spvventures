import React from 'react';

export function IceArchitecture() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white antialiased">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-sm font-medium tracking-widest uppercase">SPV Ventures</div>
          <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-gray-500">
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#model" className="hover:text-black transition-colors">Model</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col gap-8 max-w-4xl">
            <div className="text-xs font-mono text-gray-400 tracking-widest uppercase">
              [ CORPORATE INNOVATION PARTNERS ]
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[1.1]">
              We help corporates build the tech they can't afford to miss.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
              Partnering with established companies to acquire R&D talent, build internal capabilities, and turn technology gaps into competitive advantages.
            </p>
            <div className="pt-8">
              <a 
                href="#contact"
                onClick={scrollToContact}
                className="group flex items-center gap-4 text-sm uppercase tracking-widest font-medium cursor-pointer w-max"
              >
                Get in Touch
                <span className="w-8 h-[1px] bg-black group-hover:w-16 transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-16">
            [ ABOUT ]
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
                Founders and operators, not consultants.
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-8 text-lg font-light text-gray-600">
              <p>
                We are a team of founders and operators with deep networks across engineering labs, research teams, and frontier builders — in healthcare, finance, space, and industrial production.
              </p>
              <p>
                We partner with established corporations to identify technology gaps, acquire the right R&D teams, and build the capabilities that close them. Then we help move those assets forward — through M&A or structured SPV capital.
              </p>
              <div className="pl-6 border-l border-black mt-8 text-black text-xl md:text-2xl font-medium tracking-tight">
                "We don't advise from the sidelines. We get in, build alongside you, and stay until it works."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model */}
      <section id="model" className="py-32 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-16">
            [ HOW WE WORK ]
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-black/10">
            {/* Card 1 */}
            <div className="border-r border-b border-black/10 p-10 flex flex-col gap-16 group hover:bg-black/5 transition-colors duration-500">
              <div className="text-xs font-mono text-gray-400">01</div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium tracking-tight">Identify the Gap</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We map where your business is exposed to technological disruption — and locate the teams already building the answer.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="border-r border-b border-black/10 p-10 flex flex-col gap-16 group hover:bg-black/5 transition-colors duration-500">
              <div className="text-xs font-mono text-gray-400">02</div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium tracking-tight">Acquire & Build</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We structure the acquisition of R&D teams or labs, then work hands-on to integrate them and accelerate their output inside your organisation.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="border-r border-b border-black/10 p-10 flex flex-col gap-16 group hover:bg-black/5 transition-colors duration-500">
              <div className="text-xs font-mono text-gray-400">03</div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-medium tracking-tight">Capital & Exit</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We bridge building and ownership — through M&A advisory or SPV capital structures that align incentives for the long term.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-32 pt-16 border-t border-black/10 flex flex-wrap gap-8 justify-between text-xs font-mono text-gray-400 uppercase tracking-widest">
            <span>Healthcare</span>
            <span>Finance</span>
            <span>Space</span>
            <span>Industrial Production</span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 border-t border-black/10 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-16">
            [ LET'S TALK ]
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
                Working with corporates who want to move faster.
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-12 items-start lg:items-end lg:text-right">
              <p className="text-lg text-gray-400 font-light max-w-sm">
                If you're a corporate looking to acquire technology capability, or a founder interested in strategic backing — we'd like to hear from you.
              </p>
              <a 
                href="mailto:hello@spvventures.com"
                className="group flex items-center gap-4 text-sm uppercase tracking-widest font-medium"
              >
                <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-300"></span>
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
          <div>© 2025 SPV Ventures. All rights reserved.</div>
          <div>Lisbon, Portugal</div>
        </div>
      </footer>
    </div>
  );
}

export default IceArchitecture;
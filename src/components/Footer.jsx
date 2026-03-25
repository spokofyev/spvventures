const footerSectors = ['Robotics & Physical AI', 'AI Infrastructure', 'Enterprise AI', 'AI-Driven Fintech']

export default function Footer() {
  return (
    <footer className="bg-black py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
            <p className="text-base font-medium text-white mb-2">spv ventures</p>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              The AI-native partner for deep tech teams — from first pilot to exit.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-white/30 mb-4">Sectors</p>
            <ul className="space-y-2">
              {footerSectors.map((s) => (
                <li key={s} className="text-sm text-white/50">{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-white/30 mb-4">Connect</p>
            <a
              href="https://linkedin.com/company/spv-ventures"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} SPV Ventures. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

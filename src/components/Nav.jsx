export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 lg:px-24 py-6 bg-white/90 backdrop-blur-md">
      <a href="/" className="text-sm uppercase tracking-widest text-black">
        SPV Ventures
      </a>
      <a
        href="#contact"
        className="text-sm uppercase tracking-widest text-black hover:text-black/40 transition-colors"
      >
        Get in touch →
      </a>
    </nav>
  )
}

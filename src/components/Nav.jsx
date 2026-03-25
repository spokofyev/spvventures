export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-black/5">
      <a href="/" className="text-base font-medium tracking-tight text-black">
        spv ventures
      </a>
      <a
        href="#contact"
        className="px-5 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-black/80 transition-colors"
      >
        Get in touch
      </a>
    </nav>
  )
}

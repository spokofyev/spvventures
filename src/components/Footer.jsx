export default function Footer() {
  return (
    <footer className="px-8 md:px-16 lg:px-24 py-16 border-t border-black/10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="text-xs uppercase tracking-widest text-black/30">SPV Ventures</p>
        <div className="flex items-center gap-8 text-xs uppercase tracking-widest text-black/30">
          <a
            href="https://linkedin.com/in/sprokofyev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            LinkedIn ↗
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

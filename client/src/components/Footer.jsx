const cols = [
  { title: 'Product', links: ['How it works', 'Features', 'Dashboard'] },
  { title: 'Trust', links: ['Privacy & consent', 'Security', 'DPDP alignment'] },
  { title: 'Reach us', links: ['WhatsApp bot', 'Web app', 'Contact'] },
]

export default function Footer() {
  return (
    <footer className="pt-20 pb-8 px-5 md:px-14 border-t border-hairline">
      <div className="max-w-[1200px] mx-auto flex justify-between gap-14 flex-wrap mb-14">
        <div className="flex gap-3 max-w-[340px]">
          <svg viewBox="0 0 40 40" width="28" height="28" className="shrink-0">
            <path d="M4 26 C4 14, 14 8, 20 8 C26 8, 36 14, 36 26" stroke="url(#footGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <circle cx="4" cy="26" r="3" fill="#0D9488" /><circle cx="36" cy="26" r="3" fill="#F59E0B" />
            <defs><linearGradient id="footGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0D9488" /><stop offset="1" stopColor="#F59E0B" /></linearGradient></defs>
          </svg>
          <div>
            <div className="font-display font-semibold text-lg">Setu <em className="text-teal not-italic font-medium italic">AI</em></div>
            <p className="text-sm text-inkFaint mt-1.5 leading-relaxed">Bridging the gap between citizens and the welfare they deserve.</p>
          </div>
        </div>

        <div className="flex gap-14 flex-wrap">
          {cols.map(col => (
            <div key={col.title}>
              <h5 className="text-xs uppercase tracking-wider text-inkFaint mb-4">{col.title}</h5>
              {col.links.map(l => (
                <a key={l} href="#" className="block text-sm text-inkSoft mb-3 hover:text-teal-deep transition-colors">{l}</a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto flex justify-between flex-wrap gap-2 text-xs text-inkFaint pt-6 border-t border-hairline">
        <span>© 2026 Setu AI · Not a government platform — an independent discovery layer.</span>
        <span>Made for Bharat, in light &amp; teal.</span>
      </div>
    </footer>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { MagneticButton } from './MagneticButton'

const links = [
  { href: '#pipeline', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#trust', label: 'Trust' },
]

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" data-hover-target>
      <svg viewBox="0 0 40 40" width="34" height="34">
        <path d="M4 26 C4 14, 14 8, 20 8 C26 8, 36 14, 36 26" stroke="url(#navGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <circle cx="4" cy="26" r="3" fill="#0D9488" />
        <circle cx="36" cy="26" r="3" fill="#F59E0B" />
        <defs>
          <linearGradient id="navGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0D9488" /><stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display font-semibold text-lg tracking-tight">Setu <em className="text-teal not-italic font-medium italic">AI</em></span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[900] flex justify-center pt-4 px-4 md:px-8">
        <div className={`w-full max-w-[1360px] flex items-center justify-between pl-5 pr-2.5 py-2.5 rounded-full glass transition-shadow duration-400 ${scrolled ? 'shadow-md2' : 'shadow-sm2'}`}>
          <Logo />

          <nav className="hidden lg:flex gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href} data-hover-target
                 className="relative px-4.5 py-2.5 rounded-full text-sm font-medium text-inkSoft hover:text-teal-deep hover:bg-teal-soft transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <button data-hover-target onClick={() => { window.location.href = '/profile' }} className="px-4.5 py-2.5 text-sm font-semibold rounded-full hover:bg-paperAlt transition-colors">Sign in</button>
            <MagneticButton variant="primary" onClick={() => { window.location.href = '/consent' }} className="!py-3 !px-5 !text-sm">Check eligibility</MagneticButton>
          </div>

          <button className="lg:hidden p-2.5" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-screen w-[80vw] max-w-[320px] z-[950] bg-white shadow-lg2 p-8 pt-24 flex flex-col gap-2"
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="py-3.5 font-semibold text-lg border-b border-hairline">{l.label}</a>
            ))}
            <MagneticButton variant="primary" onClick={() => { window.location.href = '/consent' }} className="mt-6 w-full justify-center">Check eligibility</MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

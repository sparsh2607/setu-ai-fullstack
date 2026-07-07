import { ArrowLeft } from 'lucide-react'

export default function AppShell({ title, subtitle, children, action }) {
  return (
    <div className="min-h-screen bg-paper text-ink px-5 py-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => { window.location.href = '/' }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-inkSoft hover:text-teal-deep"
          >
            <ArrowLeft size={18} /> Home
          </button>
          {action}
        </header>
        <section className="bg-white border border-hairline shadow-sm2 rounded-[28px] p-6 md:p-9">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-wider text-teal-deep mb-2">Setu AI App</p>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-tight">{title}</h1>
            {subtitle && <p className="text-inkSoft mt-3 max-w-2xl leading-relaxed">{subtitle}</p>}
          </div>
          {children}
        </section>
      </div>
    </div>
  )
}

export default function TrustStrip() {
  const items = ['MongoDB Atlas Vector Search', 'Claude & GPT-4-class reasoning', 'Twilio WhatsApp', "India's DPDP Act", 'Bhashini language infra']
  return (
    <section className="py-9 px-5 md:px-14 text-center border-t border-b border-hairline !p-9">
      <p className="text-xs text-inkFaint mb-3.5 tracking-wide">Built on the same principles behind</p>
      <div className="flex justify-center flex-wrap gap-2.5 text-sm font-semibold text-inkSoft">
        {items.map((it, i) => (
          <span key={it} className="flex items-center gap-2.5">
            {it}{i < items.length - 1 && <span className="text-hairline">·</span>}
          </span>
        ))}
      </div>
    </section>
  )
}

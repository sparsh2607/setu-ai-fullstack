import { useEffect, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { loadProfile, loadMatches } from '../utils/storage'
import { goToEligibilityFlow, openWhatsAppMessage } from '../utils/navigation'

export default function WhatsAppBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [profile, setProfile] = useState({})
  const [matches, setMatches] = useState([])

  useEffect(() => {
    function syncData() {
      setProfile(loadProfile())
      setMatches(loadMatches())
    }

    syncData()
    window.addEventListener('focus', syncData)
    window.addEventListener('storage', syncData)

    return () => {
      window.removeEventListener('focus', syncData)
      window.removeEventListener('storage', syncData)
    }
  }, [])

  const hasProfile = Object.keys(profile || {}).length > 0
  const firstName = profile.name ? profile.name.split(' ')[0] : 'there'
  const topScheme = matches?.[0]?.scheme?.name || 'government schemes'

  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hi 👋 I am Setu AI assistant. I can help you discover government schemes based on your profile.',
    },
  ])

  function sendMessage() {
    if (!input.trim()) return

    const userText = input.trim()

    const botReply = hasProfile
      ? `Your saved profile is ready, ${firstName}. You currently have ${matches.length || 0} matched schemes. Top match: ${topScheme}. Click “View matches” to continue.`
      : 'Please complete your eligibility profile first. After that, Setu AI will show schemes you may qualify for.'

    setMessages((prev) => [
      ...prev,
      { from: 'user', text: userText },
      { from: 'bot', text: botReply },
    ])

    setInput('')
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[999] h-16 w-16 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Open WhatsApp assistant"
        >
          <MessageCircle size={30} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-[999] w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-hairline bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#075E54] px-5 py-4 text-white">
            <div>
              <p className="font-bold">Setu AI Assistant</p>
              <p className="text-xs text-white/80">
                WhatsApp-style scheme support
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="h-[340px] overflow-y-auto bg-[#ECE5DD] p-4 space-y-3">
            <div className="max-w-[85%] rounded-2xl bg-white px-4 py-3 text-sm leading-relaxed text-ink shadow-sm">
              {hasProfile
                ? `Hi ${firstName} 👋 Your profile is saved. I found ${matches.length || 0} scheme matches for you.`
                : 'Hi 👋 Complete your profile to discover eligible government schemes.'}
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.from === 'user'
                    ? 'ml-auto bg-[#DCF8C6] text-ink'
                    : 'bg-white text-ink'
                }`}
              >
                {msg.text}
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => goToEligibilityFlow('home')}
                className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white"
              >
                {hasProfile ? 'View matches' : 'Check eligibility'}
              </button>

              <button
                type="button"
                onClick={openWhatsAppMessage}
                className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white"
              >
                Open WhatsApp
              </button>
            </div>
          </div>

          <div className="flex gap-2 bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage()
              }}
              placeholder="Type your question..."
              className="flex-1 rounded-full border border-hairline px-4 py-2 text-sm outline-none focus:border-teal"
            />

            <button
              type="button"
              onClick={sendMessage}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white"
            >
              <Send size={17} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
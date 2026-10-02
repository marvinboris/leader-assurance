import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import './ChatAssistant.css'

const responses = {
  fr: {
    greeting: "Bonjour ! Je suis l'assistant de Leader Assurance. Comment puis-je vous aider ?",
    entreprise: "Pour une assurance entreprise, nous proposons des couvertures multirisques professionnelles, la responsabilité civile, l'assurance employés et la protection des actifs. Souhaitez-vous un devis ?",
    devis: "Pour obtenir un devis personnalisé, vous pouvez remplir notre formulaire en ligne sur la page Contact, ou nous appeler au +237 696 41 10 12. Un conseiller vous contactera rapidement.",
    sante: "Notre assurance santé couvre les consultations médicales, l'hospitalisation, les médicaments et les soins dentaires. Elle est disponible pour les particuliers et les entreprises.",
    vie: "L'assurance vie protège l'avenir financier de vos proches en cas de décès ou d'invalidité. Elle peut aussi servir de produit d'épargne à long terme.",
    contact: "Vous pouvez nous joindre au +237 696 41 10 12 ou +237 681 80 69 75, ou par email à leaderassurance1@yahoo.fr. Notre bureau est à Akwa, Rue Bernabé, Douala.",
    tarif: "Les tarifs varient selon le type d'assurance, votre profil et la couverture choisie. Utilisez notre calculateur de devis en ligne ou contactez-nous pour une estimation personnalisée.",
    default: "Je ne suis pas sûr de comprendre votre question. Pourriez-vous reformuler ? Ou préférez-vous parler directement à un conseiller ?"
  },
  en: {
    greeting: "Hello! I'm the Leader Assurance assistant. How can I help you?",
    entreprise: "For business insurance, we offer professional multi-risk coverage, civil liability, employee insurance and asset protection. Would you like a quote?",
    devis: "To get a personalized quote, fill out our online form on the Contact page, or call us at +237 696 41 10 12. An advisor will contact you quickly.",
    sante: "Our health insurance covers medical consultations, hospitalization, medications and dental care. Available for individuals and companies.",
    default: "I'm not sure I understand your question. Could you rephrase it? Or would you prefer to speak directly with an advisor?"
  }
}

function getBotResponse(message, lang = 'fr') {
  const msg = message.toLowerCase()
  const r = responses[lang] || responses.fr
  if (msg.includes('entrepris') || msg.includes('business') || msg.includes('profess')) return r.entreprise || r.default
  if (msg.includes('devis') || msg.includes('quote') || msg.includes('tarif') || msg.includes('prix') || msg.includes('coût')) return r.devis || r.default
  if (msg.includes('santé') || msg.includes('health') || msg.includes('médic')) return r.sante || r.default
  if (msg.includes('vie') || msg.includes('life') || msg.includes('épargn')) return r.vie || r.default
  if (msg.includes('contact') || msg.includes('appel') || msg.includes('call') || msg.includes('téléphone')) return r.contact || r.default
  if (msg.includes('bonjour') || msg.includes('hello') || msg.includes('salut') || msg.includes('hola')) return r.greeting
  return r.default
}

const QUICK_REPLIES = [
  { id: 'quote', responseKey: 'devis' },
  { id: 'business', responseKey: 'entreprise' },
  { id: 'advisor', responseKey: 'contact' }
]

export default function ChatAssistant() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ type: 'bot', text: t('chat.welcome'), time: new Date() }])
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const send = (text, responseKey) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { type: 'user', text, time: new Date() }])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const r = responses[i18n.language] || responses.fr
      const response = responseKey ? (r[responseKey] || r.default) : getBotResponse(text, i18n.language)
      setMessages(prev => [...prev, { type: 'bot', text: response, time: new Date() }])
      setIsTyping(false)
    }, 1000 + Math.random() * 500)
  }

  const sendMessage = () => send(input)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date) => new Intl.DateTimeFormat(i18n.language, { hour: '2-digit', minute: '2-digit' }).format(date)

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="chat-float chat-dock-button"
        aria-label={isOpen ? t('ui.chat.close') : t('ui.chat.open')}
        aria-expanded={isOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <span aria-hidden="true">{isOpen ? '×' : '✉'}</span>
      </motion.button>

      {/* Fenêtre */}
      <AnimatePresence>
        {isOpen && (
          <motion.article
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="chat-dock-window overflow-hidden rounded-lg border border-line bg-paper shadow-float"
            aria-label={t('ui.chat.window')}
          >
            <div className="flex items-center justify-between gap-3 bg-ink px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-pill border border-white/25 font-bold" aria-hidden="true">LA</span>
                <div>
                  <h3 className="font-sans text-base font-extrabold">{t('chat.title')}</h3>
                  <p className="mt-1 flex items-center gap-2 text-micro text-white/75"><span className="h-2 w-2 rounded-pill bg-focus"></span>{t('chat.online')}</p>
                </div>
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/25 text-white hover:bg-white/10" aria-label={t('ui.chat.closeWindow')} type="button" onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="chat-scroll space-y-4 bg-mist p-5" role="log" aria-live="polite">
              <p className="text-micro font-bold uppercase tracking-wide text-muted">{t('ui.chat.today', { time: messages[0] ? formatTime(messages[0].time) : '' })}</p>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={msg.type === 'bot'
                    ? 'max-w-[90%] rounded-md border border-line bg-paper p-4 text-small leading-relaxed text-body'
                    : 'ms-auto max-w-[82%] rounded-md bg-ink px-4 py-3 text-small leading-relaxed text-white'}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="max-w-[90%] rounded-md border border-line bg-paper p-4" role="status" aria-label={t('ui.chat.typing')}>
                  <div className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="h-2 w-2 animate-bounce rounded-pill bg-muted" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <p className="pt-1 text-micro font-extrabold text-ink">{t('ui.chat.faq')}</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_REPLIES.map(({ id, responseKey }) => (
                  <button key={id} type="button" className="quick-reply" onClick={() => send(t(`ui.chat.quick.${id}`), responseKey)}>
                    {t(`ui.chat.quick.${id}`)}
                  </button>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-line px-5 py-3">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex min-h-11 items-center gap-2 text-small font-extrabold text-ink underline decoration-gold decoration-2 underline-offset-4"
              >
                {t('chat.contact')} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">↗</span>
              </Link>
            </div>

            <form className="flex gap-2 border-t border-line p-4" onSubmit={(e) => { e.preventDefault(); sendMessage() }}>
              <label className="sr-only" htmlFor="chat-message">{t('ui.chat.messageLabel')}</label>
              <input
                id="chat-message"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('chat.placeholder')}
                className="field min-w-0"
              />
              <button className="button button-navy shrink-0" type="submit" aria-label={t('chat.send')} disabled={!input.trim()}>
                <span aria-hidden="true">↑</span>
              </button>
            </form>
          </motion.article>
        )}
      </AnimatePresence>
    </>
  )
}

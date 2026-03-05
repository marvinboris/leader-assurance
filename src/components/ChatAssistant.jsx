import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Bot, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

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
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { type: 'user', text: input, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const response = getBotResponse(input, i18n.language)
      setMessages(prev => [...prev, { type: 'bot', text: response, time: new Date() }])
      setIsTyping(false)
    }, 1000 + Math.random() * 500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary-800 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="gradient-bg p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">{t('chat.title')}</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-white/70 text-xs">En ligne</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.type === 'bot' ? 'bg-primary-100' : 'bg-gold-100'
                  }`}>
                    {msg.type === 'bot' ? <Bot size={14} className="text-primary-900" /> : <User size={14} className="text-gold-600" />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.type === 'bot'
                      ? 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                      : 'bg-primary-900 text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center">
                    <Bot size={14} className="text-primary-900" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Contact advisor */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-xs text-primary-900 font-medium hover:text-primary-700 transition-colors"
              >
                <Phone size={12} />
                {t('chat.contact')}
              </Link>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chat.placeholder')}
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-9 h-9 bg-primary-900 text-white rounded-xl flex items-center justify-center hover:bg-primary-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

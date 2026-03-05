import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Veuillez remplir tous les champs obligatoires.')
      return
    }
    setSending(true)
    // Simulate sending
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    toast.success(t('contact.success'))
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <>
      <Helmet>
        <title>Contact - Leader Assurance | Douala, Cameroun</title>
        <meta name="description" content="Contactez Leader Assurance à Douala, Cameroun. Formulaire de contact, téléphone, WhatsApp et localisation sur la carte." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t('contact.title')}</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">{t('contact.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="section-title mb-2">Nos coordonnées</h2>
                <p className="text-gray-600 text-sm mb-6">Contactez-nous par le moyen de votre choix. Nous vous répondons rapidement.</p>
              </motion.div>

              {[
                {
                  icon: MapPin,
                  title: t('contact.address'),
                  content: 'Akwa, Rue Bernabé\nDouala, Cameroun',
                  color: 'text-blue-600 bg-blue-50',
                },
                {
                  icon: Phone,
                  title: 'Téléphones',
                  content: '+237 696 41 10 12\n+237 681 80 69 75',
                  color: 'text-green-600 bg-green-50',
                  href: 'tel:+237696411012',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  content: 'leaderassurance1@yahoo.fr',
                  color: 'text-red-600 bg-red-50',
                  href: 'mailto:leaderassurance1@yahoo.fr',
                },
                {
                  icon: Clock,
                  title: t('contact.schedule'),
                  content: 'Lun - Ven : 8h00 - 18h00\nSamedi : 9h00 - 13h00',
                  color: 'text-primary-700 bg-primary-50',
                },
              ].map(({ icon: Icon, title, content, color, href }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="card p-5 flex gap-4"
                >
                  <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-primary-900 text-sm mb-1">{title}</div>
                    {href ? (
                      <a href={href} className="text-gray-600 text-sm hover:text-primary-900 transition-colors whitespace-pre-line">
                        {content}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-sm whitespace-pre-line">{content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/237696411012"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 p-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors shadow-lg"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div className="font-semibold">{t('contact.whatsapp')}</div>
                  <div className="text-white/80 text-sm">+237 696 41 10 12</div>
                </div>
              </motion.a>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-8"
              >
                <h2 className="text-2xl font-heading font-bold text-primary-900 mb-6">Envoyez-nous un message</h2>

                {sent ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-primary-900 mb-2">{t('contact.success')}</h3>
                    <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t('contact.name')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jean Dupont"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t('contact.email')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jean@example.com"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contact.phone')}</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+237 6XX XX XX XX"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('contact.subject')}</label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                        >
                          <option value="">-- Choisir un sujet --</option>
                          <option value="devis">Demande de devis</option>
                          <option value="sante">Assurance Santé</option>
                          <option value="entreprise">Assurance Entreprise</option>
                          <option value="vie">Assurance Vie</option>
                          <option value="sinistre">Déclaration de sinistre</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t('contact.message')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Décrivez votre besoin en assurance..."
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {sending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t('contact.sending')}
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          {t('contact.send')}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-0">
        <div className="w-full h-80 bg-gray-200 relative overflow-hidden">
          <iframe
            title="Leader Assurance - Localisation Douala"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8186513454297!2d9.700219!3d4.0517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128a1bb2bbbb%3A0xd6b4e7f5d5b3e5e5!2sAkwa%2C%20Douala%2C%20Cameroun!5e0!3m2!1sfr!2scm!4v1700000000000!5m2!1sfr!2scm"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute top-4 left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <MapPin size={18} className="text-white" />
            </div>
            <div>
              <div className="font-semibold text-primary-900 text-sm">Leader Assurance</div>
              <div className="text-gray-500 text-xs">Akwa, Rue Bernabé, Douala</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

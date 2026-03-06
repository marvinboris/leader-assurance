import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ChevronDown, Search, MessageCircle } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

function AnimatedSection({ children }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>{children}</motion.div>
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div variants={fadeUp} className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-primary-900">{q}</span>
        <ChevronDown
          size={18}
          className={`text-primary-900 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const faqs = t('faq.data', { returnObjects: true })
  const categories = [{ key: 'all', label: t('faq.all') }, ...faqs.map(f => ({ key: f.key, label: f.category }))]

  const filtered = faqs
    .map(section => ({
      ...section,
      questions: section.questions.filter(
        q => (activeCategory === 'all' || section.key === activeCategory) &&
          (q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase()))
      )
    }))
    .filter(section => section.questions.length > 0)

  return (
    <>
      <Helmet>
        <title>FAQ - Leader Assurance | Questions Fréquentes</title>
        <meta name="description" content="Trouvez les réponses à vos questions sur l'assurance, les contrats et nos services chez Leader Assurance." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t('faq.title')}</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">{t('faq.subtitle')}</p>
            {/* Search bar */}
            <div className="max-w-xl mx-auto relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('faq.searchPlaceholder')}
                className="w-full pl-12 pr-4 py-4 bg-white text-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold-400 shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-primary-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ sections */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-30" />
              <p>{t('faq.notFound')}</p>
            </div>
          ) : (
            filtered.map((section, i) => (
              <div key={i} className="mb-10">
                <h2 className="text-xl font-heading font-bold text-primary-900 mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {section.category[0]}
                  </span>
                  {section.category}
                </h2>
                <AnimatedSection>
                  <div className="space-y-3">
                    {section.questions.map((item, j) => (
                      <FAQItem key={j} q={item.q} a={item.a} />
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={28} className="text-gold-400" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-primary-900 mb-3">
              {t('faq.notAnswered')}
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              {t('faq.notAnsweredDesc')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary">{t('faq.contactUs')}</Link>
              <a href="https://wa.me/237696411012" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

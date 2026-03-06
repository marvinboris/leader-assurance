import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Shield, ArrowRight, CheckCircle2, Star } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

function AnimatedSection({ children, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className={className}>{children}</motion.div>
}

const partnersConfig = [
  { name: 'Activa Assurances', country: 'Cameroun', color: 'from-blue-600 to-blue-900', initials: 'AA' },
  { name: 'Chanas Assurances', country: 'Cameroun', color: 'from-red-600 to-red-900', initials: 'CA' },
  { name: 'AXA Assurances', country: 'International', color: 'from-indigo-600 to-indigo-900', initials: 'AX' },
  { name: 'NSIA Assurances', country: 'Cameroun', color: 'from-green-600 to-green-900', initials: 'NS' },
  { name: 'Saar Assurances', country: 'Cameroun', color: 'from-orange-600 to-orange-900', initials: 'SA' },
  { name: 'Zenithe Assurance', country: 'Afrique centrale', color: 'from-teal-600 to-teal-900', initials: 'ZA' },
  { name: 'Beneficial Life', country: 'International', color: 'from-purple-600 to-purple-900', initials: 'BL' },
  { name: 'GIC-Vie', country: 'Cameroun', color: 'from-primary-600 to-primary-900', initials: 'GV' },
]

export default function Partners() {
  const { t } = useTranslation()

  const partnersData = t('partners.list', { returnObjects: true })
  const partners = partnersConfig.map((cfg, i) => ({ ...cfg, ...partnersData[i] }))

  const advantages = t('partners.advantagesList', { returnObjects: true })

  return (
    <>
      <Helmet>
        <title>Nos Partenaires - Leader Assurance</title>
        <meta name="description" content="Découvrez les compagnies d'assurance partenaires de Leader Assurance au Cameroun et en Afrique." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1553484771-371a605b060b?w=1920&h=600&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t('partners.title')}</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">{t('partners.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield size={28} className="text-gold-400" />
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{t('partners.description')}</p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Partners grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="section-title">{t('partners.ourCompanies')}</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.map((partner, i) => (
                <motion.div key={i} variants={fadeUp} className="card p-6 text-center group">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white font-heading font-bold text-2xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {partner.initials}
                  </div>
                  <h3 className="font-heading font-semibold text-primary-900 mb-1">{partner.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-primary-50 text-primary-700 rounded-full">{partner.country}</span>
                    <span className="text-xs px-2 py-0.5 bg-gold-50 text-gold-700 rounded-full">{partner.specialty}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{partner.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Carrousel / logos strip */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="flex gap-8 animate-[scroll_20s_linear_infinite] whitespace-nowrap">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-bold text-sm`}>
                {p.initials}
              </div>
              <span className="font-medium text-gray-700">{p.name}</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="section-title">{t('partners.whyBroker')}</h2>
              <p className="section-subtitle">{t('partners.whyBrokerSubtitle')}</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {advantages.map((adv, i) => (
                <motion.div key={i} variants={fadeUp} className="card p-6 flex gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={20} className="text-primary-900" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-primary-900 mb-1">{adv.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{adv.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="max-w-4xl mx-auto">
              <div className="gradient-bg rounded-3xl p-10 text-center text-white">
                <Star size={40} className="text-gold-400 mx-auto mb-4" />
                <h2 className="text-2xl font-heading font-bold mb-3">{t('partners.certified')}</h2>
                <p className="text-white/80 mb-6">
                  {t('partners.certifiedDesc')}
                </p>
                <Link to="/contact" className="btn-gold inline-flex items-center gap-2">
                  {t('partners.contactUs')} <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

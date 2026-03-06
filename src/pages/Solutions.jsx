import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Heart, Shield, Plane, TrendingUp, Building2, Users, HardHat, Package,
  CheckCircle2, ArrowRight, MessageSquare
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

function AnimatedSection({ children, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className={className}>
      {children}
    </motion.div>
  )
}

const individualsData = [
  {
    key: 'health',
    icon: Heart,
    color: 'text-red-600 bg-red-50',
    borderColor: 'border-red-100',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
  },
  {
    key: 'life',
    icon: Shield,
    color: 'text-blue-600 bg-blue-50',
    borderColor: 'border-blue-100',
    image: 'https://images.unsplash.com/photo-1529220502050-f15e570c634e?w=500&h=300&fit=crop',
  },
  {
    key: 'travel',
    icon: Plane,
    color: 'text-sky-600 bg-sky-50',
    borderColor: 'border-sky-100',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=500&h=300&fit=crop',
  },
  {
    key: 'savings',
    icon: TrendingUp,
    color: 'text-purple-600 bg-purple-50',
    borderColor: 'border-purple-100',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop',
  },
]

const companiesData = [
  {
    key: 'enterprise',
    icon: Building2,
    color: 'text-primary-700 bg-primary-50',
    borderColor: 'border-primary-100',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop',
  },
  {
    key: 'liability',
    icon: Shield,
    color: 'text-green-700 bg-green-50',
    borderColor: 'border-green-100',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=300&fit=crop',
  },
  {
    key: 'employees',
    icon: Users,
    color: 'text-teal-700 bg-teal-50',
    borderColor: 'border-teal-100',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop',
  },
  {
    key: 'assets',
    icon: Package,
    color: 'text-amber-700 bg-amber-50',
    borderColor: 'border-amber-100',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=300&fit=crop',
  },
]

function ServiceCard({ service, t }) {
  const { icon: Icon, key, color, borderColor, image } = service
  const [expanded, setExpanded] = useState(false)

  const advantages = t(`solutions.${key}.advantages`, { returnObjects: true }) || []
  const examples = t(`solutions.${key}.examples`, { returnObjects: true }) || []

  return (
    <motion.div variants={fadeUp} className={`card border ${borderColor} overflow-hidden`}>
      <div className="h-48 overflow-hidden">
        <img src={image} alt={t(`solutions.${key}.title`)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
          <Icon size={22} />
        </div>
        <h3 className="font-heading font-bold text-primary-900 text-xl mb-2">
          {t(`solutions.${key}.title`)}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {t(`solutions.${key}.description`)}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary-900 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all mb-4"
        >
          {expanded ? t('solutions.lessDetails') : t('solutions.learnMore')}
          <ArrowRight size={14} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 border-t border-gray-100 pt-4"
          >
            {Array.isArray(advantages) && advantages.length > 0 && (
              <div>
                <h4 className="font-semibold text-primary-900 text-sm mb-2">{t('solutions.advantages')}</h4>
                <ul className="space-y-1.5">
                  {advantages.map((adv, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {Array.isArray(examples) && examples.length > 0 && (
              <div>
                <h4 className="font-semibold text-primary-900 text-sm mb-2">{t('solutions.examples')}</h4>
                <div className="flex flex-wrap gap-2">
                  {examples.map((ex, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">{ex}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        <Link to="/contact" className="btn-primary w-full text-center text-sm mt-4 flex items-center justify-center gap-2">
          <MessageSquare size={15} />
          {t('solutions.getQuote')}
        </Link>
      </div>
    </motion.div>
  )
}

export default function Solutions() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('individuals')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'companies' || tab === 'individuals') setActiveTab(tab)
  }, [searchParams])

  return (
    <>
      <Helmet>
        <title>Nos Solutions d'Assurance - Leader Assurance</title>
        <meta name="description" content="Découvrez toutes nos solutions d'assurance pour particuliers et entreprises à Douala, Cameroun." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=600&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t('solutions.title')}</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">{t('solutions.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Tab selector */}
      <section className="py-12 bg-white sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="inline-flex bg-gray-100 p-1 rounded-2xl gap-1">
              <button
                onClick={() => setActiveTab('individuals')}
                className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === 'individuals'
                    ? 'bg-primary-900 text-white shadow-md'
                    : 'text-gray-600 hover:text-primary-900'
                }`}
              >
                {t('solutions.individuals')}
              </button>
              <button
                onClick={() => setActiveTab('companies')}
                className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === 'companies'
                    ? 'bg-primary-900 text-white shadow-md'
                    : 'text-gray-600 hover:text-primary-900'
                }`}
              >
                {t('solutions.companies')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(activeTab === 'individuals' ? individualsData : companiesData).map(service => (
                <ServiceCard key={service.key} service={service} t={t} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="section-title">{t('solutions.howItWorks')}</h2>
              <p className="section-subtitle">{t('solutions.howItWorksSubtitle')}</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-primary-100 hidden lg:block mx-16" />
              {(t('solutions.steps', { returnObjects: true })).map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="text-center relative z-10">
                  <div className="w-24 h-24 gradient-bg rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <span className="text-gold-400 font-heading font-bold text-2xl">{step.step}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-primary-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              {t('solutions.ctaTitle')}
            </h2>
            <p className="text-white/70 mb-8">
              {t('solutions.ctaDesc')}
            </p>
            <Link to="/contact" className="btn-gold inline-flex items-center gap-2">
              <MessageSquare size={18} />
              {t('solutions.ctaButton')}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

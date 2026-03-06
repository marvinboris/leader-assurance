import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { Helmet } from 'react-helmet-async'
import {
  Heart, Building2, Shield, TrendingUp, ChevronRight,
  CheckCircle2, Star, ArrowRight, Users, Award, Briefcase, FileText,
  Quote, Phone, MessageSquare
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
}

function AnimatedSection({ children, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const services = [
  { icon: Heart, key: 'health', color: 'bg-red-50 text-red-600', border: 'border-red-100', path: '/solutions?tab=individuals' },
  { icon: Building2, key: 'business', color: 'bg-blue-50 text-blue-600', border: 'border-blue-100', path: '/solutions?tab=companies' },
  { icon: Shield, key: 'liability', color: 'bg-green-50 text-green-600', border: 'border-green-100', path: '/solutions?tab=companies' },
  { icon: TrendingUp, key: 'savings', color: 'bg-purple-50 text-purple-600', border: 'border-purple-100', path: '/solutions?tab=individuals' },
]

const testimonials = [
  {
    name: 'Jean-Paul Mbarga',
    role: 'Directeur, PME Douala',
    text: 'Leader Assurance nous a aidés à trouver une couverture adaptée à notre entreprise tout en optimisant nos coûts. Service professionnel et réactif.',
    rating: 5,
    avatar: 'JM'
  },
  {
    name: 'Marie-Claire Ekoto',
    role: 'Particulier, Yaoundé',
    text: 'Grâce à l\'assurance santé proposée par Leader Assurance, ma famille et moi sommes bien protégés. Je recommande vivement leurs services.',
    rating: 5,
    avatar: 'ME'
  },
  {
    name: 'Emmanuel Nganou',
    role: 'Chef d\'entreprise',
    text: 'Un cabinet sérieux qui prend vraiment soin de ses clients. Ils ont fait une analyse complète de nos risques et nous ont proposé les meilleures solutions.',
    rating: 5,
    avatar: 'EN'
  },
]

const articles = [
  {
    title: 'Comprendre l\'assurance santé au Cameroun',
    excerpt: 'Découvrez tout ce que vous devez savoir sur l\'assurance santé et comment choisir la meilleure couverture pour votre famille.',
    category: 'Santé',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop',
    date: '15 Février 2025',
    slug: 'assurance-sante-cameroun'
  },
  {
    title: 'Pourquoi les entreprises doivent se protéger',
    excerpt: 'Les risques financiers auxquels font face les entreprises africaines et comment l\'assurance peut les protéger efficacement.',
    category: 'Entreprise',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=250&fit=crop',
    date: '3 Janvier 2025',
    slug: 'protection-entreprises'
  },
  {
    title: 'Les tendances de l\'assurance en Afrique',
    excerpt: 'Le marché de l\'assurance africain est en pleine croissance. Analyse des nouvelles tendances et opportunités.',
    category: 'Tendances',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
    date: '20 Décembre 2024',
    slug: 'tendances-assurance-afrique'
  },
]

const teamMembers = [
  {
    name: 'Directeur Général',
    role: 'PDG & Fondateur',
    initials: 'DG',
    color: 'from-primary-700 to-primary-900'
  },
  {
    name: 'Responsable Commercial',
    role: 'Directeur Commercial',
    initials: 'RC',
    color: 'from-blue-600 to-blue-900'
  },
  {
    name: 'Conseillère Senior',
    role: 'Expert en Assurance Vie',
    initials: 'CS',
    color: 'from-indigo-600 to-indigo-900'
  },
  {
    name: 'Chargé Entreprises',
    role: 'Expert Assurance Entreprise',
    initials: 'CE',
    color: 'from-primary-600 to-primary-900'
  },
]

export default function Home() {
  const { t } = useTranslation()
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <>
      <Helmet>
        <title>Leader Assurance - Assureur Conseil | Douala, Cameroun</title>
        <meta name="description" content="Leader Assurance SARL - Votre partenaire de confiance en assurance à Douala, Cameroun. Assurance santé, entreprise, vie et épargne." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/75 to-primary-900/40" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-2 bg-gold-500/20 border border-gold-500/40 text-gold-400 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                SARL — Douala, Cameroun
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-4">
                <span className="text-gold-400">Leader Assurance</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white/90 mb-6">
                {t('hero.subtitle')}
              </h2>
              <p className="text-lg text-white/75 leading-relaxed mb-10 max-w-2xl">
                {t('hero.description')}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-gold flex items-center gap-2">
                  <MessageSquare size={18} />
                  {t('hero.cta1')}
                </Link>
                <Link to="/solutions" className="border-2 border-white/60 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white flex items-center gap-2">
                  {t('hero.cta2')}
                  <ChevronRight size={18} />
                </Link>
              </div>

              {/* Quick contact */}
              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href="tel:+237696411012"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <Phone size={14} />
                  </div>
                  +237 696 41 10 12
                </a>
                <a
                  href="https://wa.me/237696411012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-green-400 transition-colors text-sm"
                >
                  <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                    <MessageSquare size={14} />
                  </div>
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="gradient-bg py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 500, suffix: '+', label: t('stats.clients'), icon: Users },
              { value: 10, suffix: '+', label: t('stats.years'), icon: Award },
              { value: 15, suffix: '+', label: t('stats.partners'), icon: Briefcase },
              { value: 1200, suffix: '+', label: t('stats.policies'), icon: FileText },
            ].map(({ value, suffix, label, icon: Icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center text-white"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} />
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold-400 mb-1">
                  {statsInView ? <CountUp end={value} duration={2.5} suffix={suffix} /> : '0'}
                </div>
                <div className="text-white/70 text-sm">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-900 rounded-full text-sm font-medium mb-4">
                <Shield size={15} />
                {t('services.title')}
              </div>
              <h2 className="section-title">{t('services.subtitle')}</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map(({ icon: Icon, key, color, border, path }) => (
                <motion.div key={key} variants={fadeUp}>
                  <Link
                    to={path}
                    className={`block card p-6 border ${border} group h-full`}
                  >
                    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={26} />
                    </div>
                    <h3 className="font-heading font-semibold text-primary-900 text-lg mb-2">
                      {t(`services.${key}.title`)}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {t(`services.${key}.description`)}
                    </p>
                    <span className="text-primary-900 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t('solutions.learnMore')} <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 text-gold-700 rounded-full text-sm font-medium mb-4">
                  <Award size={15} />
                  Notre différence
                </div>
                <h2 className="section-title mb-4">{t('why.title')}</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{t('why.subtitle')}</p>
                <div className="space-y-4">
                  {[
                    t('why.independent'),
                    t('why.access'),
                    t('why.custom'),
                    t('why.analysis'),
                    t('why.assistance'),
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors"
                    >
                      <CheckCircle2 size={20} className="text-primary-900 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <Link to="/about" className="btn-primary flex items-center gap-2">
                    En savoir plus <ArrowRight size={16} />
                  </Link>
                  <Link to="/contact" className="btn-secondary flex items-center gap-2">
                    Nous contacter
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection>
              <motion.div variants={fadeUp} className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop"
                    alt="Consultation"
                    className="rounded-2xl h-48 w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
                    alt="Business"
                    className="rounded-2xl h-48 w-full object-cover mt-8"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
                    alt="Team"
                    className="rounded-2xl h-48 w-full object-cover -mt-4"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop"
                    alt="Meeting"
                    className="rounded-2xl h-48 w-full object-cover mt-4"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <Award size={22} className="text-gold-400" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-primary-900 text-lg">10+</div>
                    <div className="text-gray-500 text-xs">{t('stats.years')}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quote Calculator */}
      <section className="py-20 bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <motion.div variants={fadeUp} className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
                  {t('calculator.title')}
                </h2>
                <p className="text-white/70">{t('calculator.subtitle')}</p>
              </motion.div>
            </AnimatedSection>
            <QuoteCalculator />
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="section-title">{t('about.team')}</h2>
              <p className="section-subtitle">Des experts dédiés à votre service</p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <motion.div key={i} variants={fadeUp} className="card p-6 text-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-heading font-bold text-xl mx-auto mb-4 shadow-lg`}>
                    {member.initials}
                  </div>
                  <h3 className="font-heading font-semibold text-primary-900">{member.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{member.role}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                {t('about.team')} <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="section-title">{t('testimonials.title')}</h2>
              <p className="section-subtitle">{t('testimonials.subtitle')}</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t_, i) => (
                <motion.div key={i} variants={fadeUp} className="card p-8 relative">
                  <Quote size={32} className="text-primary-100 absolute top-6 right-6" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(t_.rating)].map((_, j) => (
                      <Star key={j} size={16} className="text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 italic">"{t_.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-white font-semibold text-sm">
                      {t_.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-primary-900">{t_.name}</div>
                      <div className="text-gray-500 text-sm">{t_.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* News preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="flex justify-between items-end mb-14">
              <div>
                <h2 className="section-title">{t('news.title')}</h2>
                <p className="section-subtitle">{t('news.subtitle')}</p>
              </div>
              <Link to="/news" className="hidden md:flex items-center gap-2 text-primary-900 font-medium hover:gap-3 transition-all">
                Voir tous <ArrowRight size={16} />
              </Link>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Link to={`/news/${article.slug}`} className="block card overflow-hidden group h-full">
                    <div className="overflow-hidden h-48">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-primary-50 text-primary-900 rounded-full text-xs font-medium mb-3">
                        {article.category}
                      </span>
                      <h3 className="font-heading font-semibold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>{article.date}</span>
                        <span className="flex items-center gap-1 text-primary-900 font-medium group-hover:gap-2 transition-all">
                          {t('news.readMore')} <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link to="/news" className="btn-primary inline-flex items-center gap-2">
                Voir tous les articles <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Prêt à protéger ce qui compte le plus ?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Contactez nos experts et obtenez un devis personnalisé gratuit dès aujourd'hui.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-gold flex items-center gap-2">
                <MessageSquare size={18} />
                Obtenir un devis gratuit
              </Link>
              <a
                href="https://wa.me/237696411012"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-white/60 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone size={18} />
                +237 696 41 10 12
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

function QuoteCalculator() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ type: '', age: '', employees: '', coverage: 'standard' })
  const [result, setResult] = useState(null)

  const calculate = () => {
    const base = {
      'sante': 15000,
      'vie': 20000,
      'voyage': 8000,
      'epargne': 25000,
      'entreprise': 50000,
      'responsabilite': 30000,
      'employes': 20000,
      'actifs': 35000,
    }
    const coverageMultiplier = { basic: 0.7, standard: 1, premium: 1.5 }
    const ageMultiplier = form.age ? (parseInt(form.age) > 50 ? 1.4 : parseInt(form.age) > 35 ? 1.2 : 1) : 1
    const employeesMultiplier = form.employees ? Math.max(1, parseInt(form.employees) / 10) : 1
    const basePrice = base[form.type] || 20000
    const price = Math.round(basePrice * coverageMultiplier[form.coverage] * ageMultiplier * employeesMultiplier)
    setResult(price)
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('calculator.type')}</label>
          <select
            value={form.type}
            onChange={e => setForm({...form, type: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm"
          >
            <option value="">-- Choisir --</option>
            <option value="sante">Assurance Santé</option>
            <option value="vie">Assurance Vie</option>
            <option value="voyage">Assurance Voyage</option>
            <option value="epargne">Épargne</option>
            <option value="entreprise">Assurance Entreprise</option>
            <option value="responsabilite">Responsabilité Civile</option>
            <option value="employes">Assurance Employés</option>
            <option value="actifs">Protection Actifs</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('calculator.age')}</label>
          <input
            type="number"
            value={form.age}
            onChange={e => setForm({...form, age: e.target.value})}
            placeholder="Ex: 35"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('calculator.employees')}</label>
          <input
            type="number"
            value={form.employees}
            onChange={e => setForm({...form, employees: e.target.value})}
            placeholder="Ex: 10"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('calculator.coverage')}</label>
          <div className="flex gap-2">
            {['basic', 'standard', 'premium'].map(level => (
              <button
                key={level}
                onClick={() => setForm({...form, coverage: level})}
                className={`flex-1 py-3 text-xs font-medium rounded-xl transition-all ${
                  form.coverage === level
                    ? 'bg-primary-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t(`calculator.${level}`)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={calculate}
          disabled={!form.type}
          className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('calculator.calculate')}
        </button>
        {result && (
          <div className="flex-1 bg-primary-50 border border-primary-100 rounded-xl p-4 text-center">
            <div className="text-sm text-gray-600">{t('calculator.result')}</div>
            <div className="text-2xl font-heading font-bold text-primary-900">
              {result.toLocaleString()} FCFA
            </div>
            <div className="text-xs text-gray-500 mt-1">{t('calculator.disclaimer')}</div>
          </div>
        )}
        {result && (
          <Link to="/contact" className="btn-gold whitespace-nowrap">
            {t('calculator.personalized')}
          </Link>
        )}
      </div>
    </div>
  )
}

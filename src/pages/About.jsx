import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Target, Eye, Users, Award, Shield, Heart, ArrowRight, CheckCircle2 } from 'lucide-react'

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

const valuesConfig = [
  { icon: Shield, color: 'text-blue-600 bg-blue-50' },
  { icon: Heart, color: 'text-red-600 bg-red-50' },
  { icon: Award, color: 'text-yellow-600 bg-yellow-50' },
  { icon: Users, color: 'text-green-600 bg-green-50' },
]

const teamConfig = [
  { initials: 'DG', color: 'from-primary-700 to-primary-900' },
  { initials: 'RC', color: 'from-blue-600 to-blue-900' },
  { initials: 'CS', color: 'from-indigo-600 to-indigo-900' },
  { initials: 'CE', color: 'from-primary-600 to-primary-900' },
  { initials: 'JF', color: 'from-purple-600 to-purple-900' },
  { initials: 'AF', color: 'from-teal-600 to-teal-900' },
]

export default function About() {
  const { t } = useTranslation()

  const valuesData = t('about.values', { returnObjects: true })
  const values = valuesConfig.map((cfg, i) => ({ ...cfg, ...valuesData[i] }))

  const teamData = t('about.teamMembers', { returnObjects: true })
  const teamMembers = teamConfig.map((cfg, i) => ({ ...cfg, ...teamData[i] }))

  const milestones = t('about.milestones', { returnObjects: true })

  const statsItems = [
    { label: '500+', sub: t('about.clientsSatisfied') },
    { label: '15+', sub: t('stats.partners') },
    { label: '10+', sub: t('about.yearsExperience') },
    { label: '1200+', sub: t('about.policiesManaged') },
  ]

  return (
    <>
      <Helmet>
        <title>À propos - Leader Assurance | Douala, Cameroun</title>
        <meta name="description" content="Découvrez Leader Assurance SARL, votre cabinet de courtage et conseil en assurance à Douala, Cameroun. Notre équipe, notre mission et nos valeurs." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=600&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center text-white max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
              {t('about.ourHistory')}
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t('about.title')}</h1>
            <p className="text-white/80 text-lg">{t('about.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* About content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <h2 className="section-title mb-6">{t('about.title')}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{t('about.description1')}</p>
                <p className="text-gray-600 leading-relaxed mb-8">{t('about.description2')}</p>
                <div className="grid grid-cols-2 gap-4">
                  {statsItems.map((s, i) => (
                    <div key={i} className="bg-primary-50 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-heading font-bold text-primary-900">{s.label}</div>
                      <div className="text-gray-500 text-sm mt-1">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection>
              <motion.div variants={fadeUp} className="relative">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&h=500&fit=crop"
                  alt="Notre équipe"
                  className="rounded-3xl w-full shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                      <Shield size={22} className="text-gold-400" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-primary-900">Leader Assurance</div>
                      <div className="text-gray-500 text-sm">{t('about.certifiedAdvisor')}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Target, title: t('about.mission'), text: t('about.missionText'), color: 'bg-primary-900', light: 'bg-primary-50 text-primary-700' },
              { icon: Eye, title: t('about.vision'), text: t('about.visionText'), color: 'bg-gold-500', light: 'bg-gold-50 text-gold-700' },
            ].map(({ icon: Icon, title, text, color }, i) => (
              <AnimatedSection key={i}>
                <motion.div variants={fadeUp} className="card p-8 h-full">
                  <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-5`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-primary-900 mb-4">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{text}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="section-title">{t('about.valuesTitle')}</h2>
              <p className="section-subtitle">{t('about.valuesSubtitle')}</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div key={i} variants={fadeUp} className="card p-6 text-center">
                  <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <value.icon size={28} />
                  </div>
                  <h3 className="font-heading font-semibold text-primary-900 text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="section-title">{t('about.journeyTitle')}</h2>
              <p className="section-subtitle">{t('about.journeySubtitle')}</p>
            </motion.div>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-primary-100 hidden md:block" />
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`flex gap-8 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="card p-6 inline-block">
                      <div className="text-gold-500 font-heading font-bold text-lg">{milestone.year}</div>
                      <h3 className="font-heading font-semibold text-primary-900 mt-1">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-lg hidden md:flex">
                    <CheckCircle2 size={18} className="text-white" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="section-title">{t('about.team')}</h2>
              <p className="section-subtitle">{t('about.teamSubtitle')}</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, i) => (
                <motion.div key={i} variants={fadeUp} className="card p-6 text-center group">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-heading font-bold text-2xl mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                    {member.initials}
                  </div>
                  <h3 className="font-heading font-semibold text-primary-900 text-lg">{member.name}</h3>
                  <p className="text-gold-600 text-sm font-medium mt-1 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
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
              {t('about.ctaTitle')}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {t('about.ctaDesc')}
            </p>
            <Link to="/contact" className="btn-gold inline-flex items-center gap-2">
              {t('about.contactUs')} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

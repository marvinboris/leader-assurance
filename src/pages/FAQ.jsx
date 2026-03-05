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

const faqs = [
  {
    category: 'Général',
    questions: [
      {
        q: 'Quel est le rôle d\'un courtier en assurance ?',
        a: 'Un courtier en assurance est un intermédiaire indépendant qui représente les intérêts du client. Contrairement à un agent exclusif d\'une compagnie, le courtier peut comparer les offres de plusieurs assureurs pour vous proposer la meilleure solution selon votre profil et vos besoins.'
      },
      {
        q: 'Pourquoi passer par Leader Assurance plutôt que directement par une compagnie ?',
        a: 'Leader Assurance vous offre plusieurs avantages : accès à de multiples compagnies, conseil personnalisé et objectif, négociation de meilleures conditions, accompagnement en cas de sinistre, et un interlocuteur unique pour tous vos contrats. Notre service est souvent sans coût supplémentaire pour le client.'
      },
      {
        q: 'Leader Assurance est-elle une compagnie d\'assurance ?',
        a: 'Non, Leader Assurance est un cabinet de courtage et de conseil en assurance. Nous ne portons pas directement les risques mais nous travaillons avec des compagnies d\'assurance agréées pour vous proposer les meilleures couvertures.'
      },
      {
        q: 'Êtes-vous agréés par les autorités de régulation ?',
        a: 'Oui, Leader Assurance est dûment agréée conformément aux exigences de la CIMA (Conférence Interafricaine des Marchés d\'Assurances) qui régule le secteur assurantiel en Afrique centrale, dont le Cameroun.'
      },
    ]
  },
  {
    category: 'Devis & Contrats',
    questions: [
      {
        q: 'Comment obtenir un devis ?',
        a: 'Vous pouvez obtenir un devis de plusieurs façons : en remplissant notre formulaire en ligne sur la page Contact, en nous appelant au +237 696 41 10 12 ou +237 681 80 69 75, via WhatsApp, ou en vous rendant directement dans nos bureaux à Akwa, Douala. Notre réponse est généralement sous 24-48h.'
      },
      {
        q: 'Est-ce que les devis sont gratuits ?',
        a: 'Oui, tous nos devis et consultations initiales sont entièrement gratuits et sans engagement de votre part. Vous n\'êtes tenu de rien tant que vous n\'avez pas signé de contrat.'
      },
      {
        q: 'Combien de temps faut-il pour souscrire à une assurance ?',
        a: 'Selon le type d\'assurance, le délai varie. Pour les assurances simples (santé, vie), la souscription peut se faire en 24 à 48h. Pour des couvertures plus complexes (entreprises, actifs importants), le processus peut prendre 5 à 10 jours ouvrés pour l\'analyse des risques et la finalisation.'
      },
      {
        q: 'Peut-on modifier son contrat après la souscription ?',
        a: 'Oui, vos contrats peuvent être adaptés à l\'évolution de vos besoins. Des avenants peuvent être ajoutés pour modifier les garanties, les capitaux ou les bénéficiaires. Contactez votre conseiller Leader Assurance pour toute demande de modification.'
      },
    ]
  },
  {
    category: 'Entreprises',
    questions: [
      {
        q: 'Les entreprises peuvent-elles personnaliser leur couverture ?',
        a: 'Absolument ! C\'est l\'un de nos points forts. Chaque entreprise a des risques spécifiques liés à son secteur, sa taille et ses activités. Nous réalisons une analyse complète de vos risques pour concevoir une couverture sur mesure qui répond exactement à vos besoins sans superflu.'
      },
      {
        q: 'Quels types d\'entreprises peuvent être assurées ?',
        a: 'Nous couvrons tout type d\'entreprise : TPE, PME, grandes entreprises, professions libérales, commerçants, industriels. Nos solutions s\'adaptent à tous les secteurs d\'activité : commerce, industrie, services, santé, technologie, etc.'
      },
      {
        q: 'L\'assurance responsabilité civile professionnelle est-elle obligatoire ?',
        a: 'La RC professionnelle n\'est pas toujours légalement obligatoire pour toutes les professions au Cameroun, mais elle est fortement recommandée pour toute activité professionnelle. Elle protège votre entreprise contre les conséquences financières d\'erreurs, fautes ou omissions dans l\'exercice de votre activité.'
      },
    ]
  },
  {
    category: 'Sinistres',
    questions: [
      {
        q: 'Que faire en cas de sinistre ?',
        a: 'En cas de sinistre : 1) Sécurisez les personnes et les biens si possible. 2) Contactez immédiatement Leader Assurance et/ou la compagnie d\'assurance. 3) Constituez les preuves (photos, témoignages). 4) Remplissez la déclaration de sinistre dans les délais prévus au contrat. Notre équipe vous accompagne tout au long de cette procédure.'
      },
      {
        q: 'Quel est le délai d\'indemnisation après un sinistre ?',
        a: 'Les délais varient selon la nature et la complexité du sinistre. Pour les sinistres simples, l\'indemnisation peut intervenir en quelques semaines. Pour les sinistres complexes nécessitant une expertise, le délai peut être de 1 à 3 mois. Nous suivons activement chaque dossier pour accélérer le processus.'
      },
      {
        q: 'Leader Assurance m\'aide-t-elle en cas de litige avec la compagnie d\'assurance ?',
        a: 'Oui, l\'un de nos rôles essentiels est de défendre vos intérêts face aux compagnies d\'assurance. En cas de désaccord ou de litige, nous intervenons comme votre mandataire pour vous obtenir une indemnisation juste et conforme à votre contrat.'
      },
    ]
  },
]

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
  const [activeCategory, setActiveCategory] = useState('Tous')

  const categories = ['Tous', ...faqs.map(f => f.category)]

  const filtered = faqs
    .map(section => ({
      ...section,
      questions: section.questions.filter(
        q => (activeCategory === 'Tous' || section.category === activeCategory) &&
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
                placeholder="Rechercher une question..."
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
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ sections */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-30" />
              <p>Aucune question trouvée pour votre recherche.</p>
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
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Notre équipe de conseillers est disponible pour répondre à toutes vos questions spécifiques.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary">Nous contacter</Link>
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

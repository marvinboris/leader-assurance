import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { Search, Calendar, Tag, ArrowRight, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

function AnimatedSection({ children }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>{children}</motion.div>
}

const articles = [
  {
    slug: 'assurance-sante-cameroun',
    title: 'Comprendre l\'assurance santé au Cameroun',
    excerpt: 'Découvrez tout ce que vous devez savoir sur l\'assurance santé et comment choisir la meilleure couverture pour votre famille au Cameroun.',
    category: 'Santé',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=450&fit=crop',
    date: '15 Février 2025',
    readTime: '5 min',
    content: `L'assurance santé est l'une des protections les plus importantes que vous puissiez offrir à votre famille. Au Cameroun, le système de santé public ne couvre pas toujours l'intégralité des frais médicaux, ce qui rend l'assurance santé privée indispensable.

**Qu'est-ce que l'assurance santé ?**

L'assurance santé est un contrat entre vous et une compagnie d'assurance qui prend en charge tout ou partie de vos frais médicaux en échange du paiement régulier d'une prime.

**Les types de couvertures disponibles**

- Couverture hospitalisation : couvre les frais d'hospitalisation
- Couverture ambulatoire : couvre les consultations et soins courants
- Maternité : prise en charge des accouchements et soins prénataux
- Dentaire et optique : soins spécialisés

**Comment choisir sa couverture ?**

Le choix dépend de plusieurs facteurs : votre âge, votre situation familiale, votre état de santé général et votre budget. Nos conseillers chez Leader Assurance peuvent vous aider à sélectionner la formule la plus adaptée à votre situation.`
  },
  {
    slug: 'protection-entreprises',
    title: 'Pourquoi les entreprises doivent se protéger',
    excerpt: 'Les risques financiers auxquels font face les entreprises africaines et comment l\'assurance peut les protéger efficacement.',
    category: 'Entreprise',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=450&fit=crop',
    date: '3 Janvier 2025',
    readTime: '7 min',
    content: `Les entreprises camerounaises font face à de nombreux risques qui peuvent mettre en péril leur activité. L'assurance entreprise est une solution indispensable pour se protéger contre ces aléas.

**Les principaux risques pour les entreprises**

1. **Risques matériels** : incendie, vol, dégâts des eaux
2. **Risques humains** : accidents du travail, maladie des employés
3. **Risques de responsabilité** : dommages causés à des tiers
4. **Risques financiers** : pertes d'exploitation en cas de sinistre

**L'importance de l'assurance multirisque professionnelle**

Une bonne assurance entreprise vous protège contre tous ces risques en une seule police, simplifiant la gestion de votre couverture tout en optimisant les coûts.

**Comment Leader Assurance peut vous aider**

Notre équipe d'experts analyse votre activité, identifie vos risques spécifiques et vous propose une couverture sur mesure avec les meilleures compagnies partenaires.`
  },
  {
    slug: 'tendances-assurance-afrique',
    title: 'Les tendances de l\'assurance en Afrique',
    excerpt: 'Le marché de l\'assurance africain est en pleine croissance. Analyse des nouvelles tendances et opportunités.',
    category: 'Tendances',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop',
    date: '20 Décembre 2024',
    readTime: '6 min',
    content: `Le marché de l'assurance en Afrique connaît une croissance remarquable, portée par l'émergence d'une classe moyenne, la digitalisation et une prise de conscience croissante de l'importance de la protection.

**La croissance du marché africain**

Le taux de pénétration de l'assurance en Afrique subsaharienne reste faible (environ 3%), mais la croissance est forte, avec des opportunités immenses pour les acteurs du secteur.

**Les tendances majeures**

1. **Digitalisation** : les InsurTechs révolutionnent la distribution
2. **Microassurance** : couvertures accessibles pour les populations à faibles revenus
3. **Assurance santé** : forte croissance post-COVID
4. **Agriculture** : assurance pour les exploitants agricoles

**Le Cameroun dans ce contexte**

Le Cameroun se positionne comme un hub assurantiel en Afrique centrale, avec une régulation modernisée et des acteurs dynamiques comme Leader Assurance.`
  },
  {
    slug: 'choisir-bonne-assurance',
    title: 'Comment choisir la bonne assurance',
    excerpt: 'Guide pratique pour sélectionner la couverture d\'assurance adaptée à vos besoins spécifiques.',
    category: 'Conseils',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop',
    date: '5 Novembre 2024',
    readTime: '8 min',
    content: `Choisir une assurance peut sembler complexe face à la multitude d'offres disponibles. Voici un guide pratique pour vous aider à prendre la bonne décision.

**Étape 1 : Identifier vos besoins**

Commencez par lister ce que vous souhaitez protéger : votre santé, votre famille, vos biens, votre activité professionnelle.

**Étape 2 : Évaluer vos risques**

Analysez les risques auxquels vous êtes exposé selon votre situation, votre activité et votre environnement.

**Étape 3 : Comparer les offres**

Ne vous limitez pas à un seul assureur. Comparez les garanties, les exclusions et les tarifs de plusieurs compagnies.

**Étape 4 : Faire appel à un courtier**

Un courtier indépendant comme Leader Assurance peut vous faire économiser du temps et de l'argent en négociant les meilleures conditions pour vous.`
  },
  {
    slug: 'assurance-responsabilite-civile',
    title: 'L\'importance de la responsabilité civile',
    excerpt: 'Pourquoi l\'assurance responsabilité civile est indispensable pour particuliers et professionnels.',
    category: 'Protection',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=450&fit=crop',
    date: '15 Octobre 2024',
    readTime: '5 min',
    content: `La responsabilité civile (RC) vous protège lorsque vous causez involontairement des dommages à des tiers. C'est une couverture fondamentale que tout individu et toute entreprise devrait posséder.

**Qu'est-ce que la responsabilité civile ?**

La RC couvre les dommages corporels, matériels ou immatériels que vous pourriez causer à autrui dans le cadre de vos activités.

**RC pour les particuliers**

La RC personnelle couvre les dommages causés par vous-même, vos enfants, vos animaux et dans certains cas, vos biens immobiliers.

**RC professionnelle**

Pour les entreprises et les professions libérales, la RC professionnelle couvre les erreurs, fautes et omissions dans l'exercice de votre activité.

**Pourquoi c'est indispensable**

Sans RC, vous devrez assumer personnellement les indemnisations qui peuvent atteindre des sommes considérables.`
  },
  {
    slug: 'epargne-assurance-vie',
    title: 'L\'assurance vie : épargner et se protéger',
    excerpt: 'Découvrez comment l\'assurance vie peut servir à la fois d\'outil d\'épargne et de protection pour votre famille.',
    category: 'Épargne',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop',
    date: '1 Octobre 2024',
    readTime: '6 min',
    content: `L'assurance vie est un produit financier polyvalent qui combine protection en cas de décès et constitution d'une épargne à long terme.

**Double rôle de l'assurance vie**

1. **Protection** : en cas de décès, un capital est versé aux bénéficiaires désignés
2. **Épargne** : accumulation d'un capital sur le long terme avec des rendements garantis

**Les avantages fiscaux**

Dans de nombreux pays, l'assurance vie bénéficie d'avantages fiscaux spéciaux, notamment lors de la transmission du capital.

**Comment souscrire**

Leader Assurance vous accompagne dans le choix du contrat d'assurance vie le plus adapté à vos objectifs financiers et familiaux.`
  },
]

const categories = ['Tous', 'Santé', 'Entreprise', 'Tendances', 'Conseils', 'Protection', 'Épargne']

export default function News() {
  const { t } = useTranslation()
  const { slug } = useParams()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tous')

  // Article detail view
  if (slug) {
    const article = articles.find(a => a.slug === slug)
    if (article) return <ArticleDetail article={article} articles={articles} t={t} />
  }

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === 'Tous' || a.category === activeCategory
    return matchSearch && matchCategory
  })

  return (
    <>
      <Helmet>
        <title>Actualités & Conseils - Leader Assurance</title>
        <meta name="description" content="Découvrez nos articles sur l'assurance, la gestion des risques et la protection financière au Cameroun." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=600&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t('news.title')}</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">{t('news.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('news.search')}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-primary-900 text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles grid */}
          <AnimatedSection>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <Search size={48} className="mx-auto mb-4 opacity-30" />
                <p>Aucun article trouvé pour votre recherche.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((article, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <Link to={`/news/${article.slug}`} className="block card overflow-hidden group h-full">
                      <div className="overflow-hidden h-52">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-50 text-primary-900 rounded-full text-xs font-medium">
                            <Tag size={10} />{article.category}
                          </span>
                          <span className="text-gray-400 text-xs flex items-center gap-1">
                            <Calendar size={10} />{article.date}
                          </span>
                        </div>
                        <h3 className="font-heading font-semibold text-primary-900 text-lg mb-2 group-hover:text-primary-700 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">{article.readTime} de lecture</span>
                          <span className="text-primary-900 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            {t('news.readMore')} <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

function ArticleDetail({ article, articles, t }) {
  const recommended = articles.filter(a => a.slug !== article.slug).slice(0, 3)

  return (
    <>
      <Helmet>
        <title>{article.title} - Leader Assurance</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="pt-24">
        {/* Hero image */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-500 text-white rounded-full text-xs font-medium mb-3">
                <Tag size={10} /> {article.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-white">{article.title}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article content */}
            <div className="lg:col-span-2">
              <Link to="/news" className="inline-flex items-center gap-2 text-primary-900 font-medium mb-8 hover:gap-3 transition-all">
                <ArrowLeft size={16} /> Retour aux articles
              </Link>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
                <span>{article.readTime} de lecture</span>
              </div>

              <div className="prose prose-primary max-w-none">
                {article.content.split('\n\n').map((paragraph, i) => (
                  <div key={i} className="mb-4">
                    {paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                      <h3 className="text-xl font-heading font-semibold text-primary-900 mt-6 mb-2">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    ) : paragraph.startsWith('1.') || paragraph.startsWith('-') ? (
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        {paragraph.split('\n').map((item, j) => (
                          <li key={j} className="leading-relaxed">
                            {item.replace(/^[0-9]+\. |^- /, '').replace(/\*\*/g, '')}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700 leading-relaxed">
                        {paragraph.replace(/\*\*/g, '')}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Share */}
              <div className="border-t border-gray-100 pt-8 mt-8">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Share2 size={16} /> {t('news.share')}
                </h4>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, color: 'bg-blue-600 hover:bg-blue-700', label: 'Facebook' },
                    { icon: Twitter, color: 'bg-sky-500 hover:bg-sky-600', label: 'Twitter' },
                    { icon: Linkedin, color: 'bg-blue-800 hover:bg-blue-900', label: 'LinkedIn' },
                  ].map(({ icon: Icon, color, label }) => (
                    <button key={label} className={`${color} text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors`}>
                      <Icon size={14} /> {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-primary-50 rounded-2xl p-6 mb-6">
                <h3 className="font-heading font-semibold text-primary-900 mb-4">Besoin d'un conseil ?</h3>
                <p className="text-gray-600 text-sm mb-4">Nos experts sont disponibles pour répondre à toutes vos questions sur l'assurance.</p>
                <Link to="/contact" className="btn-primary w-full text-center text-sm block">
                  Nous contacter
                </Link>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-primary-900 mb-4">{t('news.recommended')}</h3>
                <div className="space-y-4">
                  {recommended.map((rec, i) => (
                    <Link key={i} to={`/news/${rec.slug}`} className="flex gap-3 group">
                      <img src={rec.image} alt={rec.title} className="w-20 h-16 object-cover rounded-xl flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-primary-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                          {rec.title}
                        </h4>
                        <span className="text-xs text-gray-400">{rec.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

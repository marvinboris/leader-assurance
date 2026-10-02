import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Link, useParams, useSearchParams } from 'react-router-dom'

const individualsData = [
  { key: 'health', id: 'sante' },
  { key: 'life', id: 'vie' },
  { key: 'travel', id: 'voyage' },
  { key: 'savings', id: 'epargne' },
]

const companiesData = [
  { key: 'enterprise', id: 'entreprise' },
  { key: 'liability', id: 'responsabilite' },
  { key: 'employees', id: 'employes' },
  { key: 'assets', id: 'actifs' },
]

const TABS = ['individuals', 'companies']

// Résout le paramètre /solutions/:category : onglet ou produit (clé ou ancre de la maquette)
function resolveCategory(category) {
  if (!category) return {}
  if (TABS.includes(category)) return { tab: category }
  const inIndividuals = individualsData.find(p => p.key === category || p.id === category)
  if (inIndividuals) return { tab: 'individuals', product: inIndividuals }
  const inCompanies = companiesData.find(p => p.key === category || p.id === category)
  if (inCompanies) return { tab: 'companies', product: inCompanies }
  return {}
}

function ProductList({ products, t, open, onToggle }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {products.map(({ key, id }, index) => {
        const advantages = t(`solutions.${key}.advantages`, { returnObjects: true })
        const examples = t(`solutions.${key}.examples`, { returnObjects: true })
        return (
          <article key={key} className="grid scroll-mt-24 gap-6 py-8 md:grid-cols-12 md:gap-8" id={id}>
            <div className="md:col-span-3">
              <p className="eyebrow text-muted">{String(index + 1).padStart(2, '0')} · {t(`ui.solutions.eyebrows.${key}`)}</p>
              <h3 className="mt-3 font-display text-3xl text-ink">{t(`solutions.${key}.title`)}</h3>
            </div>
            <div className="md:col-span-5">
              <p className="text-body">{t(`solutions.${key}.description`)}</p>
              <details
                className="group mt-5"
                open={open === key}
                onToggle={e => onToggle(key, e.currentTarget.open)}
              >
                <summary className="cursor-pointer text-small font-extrabold text-ink underline decoration-gold decoration-2 underline-offset-4">{t('solutions.learnMore')}</summary>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <h4 className="text-small font-extrabold text-ink">{t('solutions.advantages')}</h4>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-small text-body">
                      {Array.isArray(advantages) && advantages.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-small font-extrabold text-ink">{t('solutions.examples')}</h4>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-small text-body">
                      {Array.isArray(examples) && examples.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </details>
            </div>
            <div className="md:col-span-3 md:col-start-10 md:text-end">
              <Link className="button button-navy" to="/contact#devis">{t('solutions.getQuote')} <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default function Solutions() {
  const { t } = useTranslation()
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const resolved = resolveCategory(category)
  const queryTab = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(
    resolved.tab || (TABS.includes(queryTab) ? queryTab : 'individuals')
  )
  const [openKey, setOpenKey] = useState(resolved.product?.key ?? null)

  // La catégorie de l'URL ne s'applique qu'au changement de route : sinon elle écraserait le clic sur un onglet.
  useEffect(() => {
    const next = resolveCategory(category)
    if (next.tab) setActiveTab(next.tab)
    setOpenKey(next.product?.key ?? null)
    if (next.product) {
      requestAnimationFrame(() =>
        document.getElementById(next.product.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      )
    }
  }, [category])

  useEffect(() => {
    if (TABS.includes(queryTab)) setActiveTab(queryTab)
  }, [queryTab])

  const selectTab = key => {
    setActiveTab(key)
    const params = new URLSearchParams(searchParams)
    params.set('tab', key)
    setSearchParams(params, { replace: true })
  }

  const handleToggle = (key, isOpen) => setOpenKey(current => (isOpen ? key : current === key ? null : current))

  const steps = t('solutions.steps', { returnObjects: true })
  const tabClass = key => `solution-tab border-b-2 py-2 text-small font-extrabold ${
    activeTab === key ? 'border-gold text-ink' : 'border-transparent text-muted'
  }`

  return (
    <>
      <Helmet>
        <title>{t('ui.solutions.metaTitle')}</title>
        <meta name="description" content={t('ui.solutions.metaDesc')} />
      </Helmet>

      <section className="bg-ink-deep text-white">
        <div className="site-wrap grid hero-detail content-center gap-8 py-16 md:grid-cols-12 md:items-end md:py-22">
          <div className="md:col-span-7">
            <p className="eyebrow mb-5 text-focus">{t('ui.solutions.heroEyebrow')}</p>
            <h1 className="display-title max-w-3xl">{t('ui.solutions.heroTitle')}</h1>
          </div>
          <p className="max-w-xl text-lead text-white/80 md:col-span-5 md:pb-2">{t('ui.solutions.heroText')}</p>
        </div>
      </section>

      <nav className="sticky top-0 z-10 border-b border-line bg-paper" aria-label={t('ui.solutions.navLabel')}>
        <div className="site-wrap flex flex-wrap gap-x-8 gap-y-2 py-4">
          <button type="button" className={tabClass('individuals')} aria-pressed={activeTab === 'individuals'} onClick={() => selectTab('individuals')}>{t('solutions.individuals')}</button>
          <button type="button" className={tabClass('companies')} aria-pressed={activeTab === 'companies'} onClick={() => selectTab('companies')}>{t('solutions.companies')}</button>
        </div>
      </nav>

      {activeTab === 'individuals' ? (
        <section className="site-wrap py-16 md:py-22" aria-labelledby="individuals-title">
          <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
            <h2 id="individuals-title" className="section-title text-ink md:col-span-6">{t('ui.solutions.individualsTitle')}</h2>
            <p className="max-w-xl text-body md:col-span-5 md:col-start-8">{t('ui.solutions.individualsText')}</p>
          </div>
          <ProductList products={individualsData} t={t} open={openKey} onToggle={handleToggle} />
        </section>
      ) : (
        <section className="bg-mist" aria-labelledby="companies-title">
          <div className="site-wrap py-16 md:py-22">
            <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
              <h2 id="companies-title" className="section-title text-ink md:col-span-6">{t('ui.solutions.companiesTitle')}</h2>
              <p className="max-w-xl text-body md:col-span-5 md:col-start-8">{t('ui.solutions.companiesText')}</p>
            </div>
            <ProductList products={companiesData} t={t} open={openKey} onToggle={handleToggle} />
          </div>
        </section>
      )}

      <section className="bg-ink py-16 text-white md:py-22">
        <div className="site-wrap">
          <div className="grid gap-6 border-b border-white/20 pb-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <p className="eyebrow mb-4 text-focus">{t('ui.solutions.processEyebrow')}</p>
              <h2 className="section-title">{t('solutions.howItWorks')}</h2>
            </div>
            <p className="text-lead text-white/75 md:col-span-5 md:col-start-8">{t('ui.solutions.processText')}</p>
          </div>
          <ol className="grid gap-8 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {Array.isArray(steps) && steps.map((step, i) => (
              <li key={i} className="border-s border-gold ps-5">
                <p className="font-display text-4xl text-focus">{step.step}</p>
                <h3 className="mt-4 text-2xl">{step.title}</h3>
                <p className="mt-3 text-small leading-relaxed text-white/75">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-gold-pale py-16 md:py-22">
        <div className="site-wrap grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <p className="eyebrow mb-4 text-ink">{t('ui.solutions.ctaEyebrow')}</p>
            <h2 className="section-title max-w-3xl text-ink">{t('solutions.ctaTitle')}</h2>
            <p className="mt-5 max-w-2xl text-body">{t('solutions.ctaDesc')}</p>
          </div>
          <div className="md:col-span-4 md:text-end">
            <Link className="button button-gold" to="/contact#devis">{t('solutions.ctaButton')} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </>
  )
}

import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import './FAQ.css'

const WHATSAPP_URL = 'https://wa.me/237696411012'

function FAQItem({ id, q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="faq-item">
      <h3>
        <button
          className="faq-question"
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          onClick={() => setOpen(o => !o)}
        >
          <span>{q}</span>
          <span className="faq-mark" aria-hidden="true">+</span>
        </button>
      </h3>
      <div className="faq-answer" id={`${id}-answer`} role="region" aria-labelledby={`${id}-button`} hidden={!open}>
        <p>{a}</p>
      </div>
    </article>
  )
}

export default function FAQ() {
  const { t, i18n } = useTranslation()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const searchRef = useRef(null)
  const lang = i18n.language
  const pad = useMemo(() => {
    const nf = new Intl.NumberFormat(lang, { minimumIntegerDigits: 2, useGrouping: false })
    return n => nf.format(n)
  }, [lang])

  const faqs = t('faq.data', { returnObjects: true })
  const query = search.trim().toLocaleLowerCase(lang)

  const sections = faqs.map((section, index) => ({
    ...section,
    index,
    questions: section.questions
      .map((item, j) => ({ ...item, id: `faq-${section.key}-${j + 1}` }))
      .filter(item => `${item.q} ${item.a}`.toLocaleLowerCase(lang).includes(query)),
  }))
  const visible = sections.filter(s => (activeCategory === 'all' || s.key === activeCategory) && s.questions.length > 0)
  const visibleCount = visible.reduce((sum, s) => sum + s.questions.length, 0)
  const totalMatches = sections.reduce((sum, s) => sum + s.questions.length, 0)

  const resetFilters = () => {
    setActiveCategory('all')
    setSearch('')
    searchRef.current?.focus()
  }
  const clearSearch = () => {
    setSearch('')
    searchRef.current?.focus()
  }

  return (
    <>
      <Helmet>
        <title>{t('ui.faq.metaTitle')}</title>
        <meta name="description" content={t('ui.faq.metaDescription')} />
      </Helmet>

      <section className="faq-hero">
        <div className="site-wrap faq-hero-grid">
          <div>
            <p className="eyebrow text-focus">{t('ui.faq.eyebrow')}</p>
            <h1>{t('faq.title')}</h1>
            <p>{t('ui.faq.lead')}</p>
          </div>
          <div className="faq-search-wrap">
            <label htmlFor="faq-search">{t('ui.faq.searchLabel')}</label>
            <input
              id="faq-search"
              ref={searchRef}
              className="faq-search"
              type="search"
              placeholder={t('faq.searchPlaceholder')}
              autoComplete="off"
              aria-controls="faq-results"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="search-clear" type="button" aria-label={t('ui.faq.clearSearch')} hidden={query.length === 0} onClick={clearSearch}>×</button>
          </div>
        </div>
      </section>

      <section className="faq-main" aria-label={t('faq.title')}>
        <div className="site-wrap faq-layout">
          <aside className="faq-filter" aria-label={t('ui.faq.filterAria')}>
            <h2>{t('ui.faq.categories')}</h2>
            <div className="category-filters" role="group" aria-label={t('ui.faq.categoriesGroupAria')}>
              <button className="category-filter" type="button" aria-pressed={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>
                {t('faq.all')}<span>{pad(totalMatches)}</span>
              </button>
              {sections.map(s => (
                <button key={s.key} className="category-filter" type="button" aria-pressed={activeCategory === s.key} onClick={() => setActiveCategory(s.key)}>
                  {s.category}<span>{pad(s.questions.length)}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="faq-results" id="faq-results">
            <p className="results-meta" aria-live="polite">
              <span>{t('ui.faq.questionsCount', { count: visibleCount, num: pad(visibleCount) })}</span>
              <span>{t('ui.faq.sectionsCount', { count: visible.length, num: visible.length })}</span>
            </p>
            {visible.map(s => (
              <section key={s.key} className="faq-category" aria-labelledby={`category-${s.key}`}>
                <div className="category-heading">
                  <span className="category-index" aria-hidden="true">{pad(s.index + 1)}</span>
                  <h2 id={`category-${s.key}`}>{s.category}</h2>
                  <span className="category-count">{t('ui.faq.questionsCount', { count: s.questions.length, num: pad(s.questions.length) })}</span>
                </div>
                <div className="faq-list">
                  {s.questions.map(item => <FAQItem key={item.id} id={item.id} q={item.q} a={item.a} />)}
                </div>
              </section>
            ))}
            <div className="faq-empty" hidden={visibleCount !== 0}>
              <strong>{t('ui.faq.emptyTitle')}</strong>
              <p>{t('faq.notFound')}</p>
              <button className="button button-navy" type="button" onClick={resetFilters}>{t('ui.faq.reset')}</button>
            </div>
          </div>
        </div>
      </section>

      <section className="question-cta">
        <div className="site-wrap question-cta-inner">
          <div>
            <p className="eyebrow mb-3 text-focus">{t('ui.faq.ctaEyebrow')}</p>
            <h2>{t('faq.notAnswered')}</h2>
            <p>{t('faq.notAnsweredDesc')}</p>
          </div>
          <div className="question-actions">
            <Link className="button button-gold" to="/contact">{t('faq.contactUs')} <span aria-hidden="true" className="inline-block rtl:-scale-x-100">↗</span></Link>
            <a className="button button-outline" href={`${WHATSAPP_URL}?text=${encodeURIComponent(t('ui.faq.whatsappMessage'))}`} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true" className="inline-block rtl:-scale-x-100">↗</span></a>
          </div>
        </div>
      </section>
    </>
  )
}

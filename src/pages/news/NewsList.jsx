import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function NewsList({ articles }) {
  const { t, i18n } = useTranslation()
  const [search, setSearch] = useState('')
  const [activeCatIndex, setActiveCatIndex] = useState(0)
  const categoryList = t('news.categoryList', { returnObjects: true })

  const term = search.trim().toLocaleLowerCase(i18n.language)
  const shown = articles.filter(a =>
    (activeCatIndex === 0 || a.category === categoryList[activeCatIndex]) &&
    `${a.title} ${a.excerpt}`.toLocaleLowerCase(i18n.language).includes(term))
  const feature = articles[0]

  return (
    <>
      <Helmet>
        <title>{t('news.title')} - Leader Assurance</title>
        <meta name="description" content={t('news.subtitle')} />
      </Helmet>

      <section className="news-hero text-white">
        <div className="site-wrap grid gap-8 py-16 md:grid-cols-12 md:items-end md:py-22">
          <div className="md:col-span-8"><p className="eyebrow mb-5 text-focus">{t('ui.news.hero.eyebrow')}</p><h1 className="display-title max-w-3xl">{t('news.title')}</h1></div>
          <p className="news-lead text-lead leading-relaxed text-white/80 md:col-span-4 md:pb-2">{t('ui.news.hero.lead')}</p>
        </div>
        <div className="h-1 w-1/3 bg-gold" aria-hidden="true"></div>
      </section>

      <section className="site-wrap py-16 md:py-22" aria-labelledby="a-la-une">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div><p className="eyebrow mb-3 text-muted">{t('ui.news.featured.eyebrow')}</p><h2 id="a-la-une" className="section-title text-ink">{t('ui.news.featured.title')}</h2></div>
          <p className="text-small text-muted">{t('ui.news.featured.note')}</p>
        </div>
        <article className="news-feature grid overflow-hidden border border-line md:grid-cols-12">
          <Link className="relative min-h-64 md:col-span-7" to={`/news/${feature.slug}`} aria-label={t('ui.news.featured.readAria', { title: feature.title })}>
            <img className="news-image absolute inset-0" src={feature.featureImage} alt="" loading="eager" />
          </Link>
          <div className="news-feature-copy flex flex-col justify-between gap-8 p-6 text-white md:col-span-5 md:p-8">
            <div><p className="eyebrow mb-5 text-focus">{feature.category} <span className="px-2 text-white/40">/</span> {feature.date}</p><h3 className="font-display text-3xl leading-tight md:text-4xl">{feature.title}</h3><p className="mt-5 text-small leading-relaxed text-white/80">{feature.excerpt}</p></div>
            <Link to={`/news/${feature.slug}`} className="inline-flex min-h-11 items-center gap-3 self-start border-b border-gold pb-2 text-small font-extrabold text-white">{t('ui.news.featured.read')} <span className="inline-block text-gold rtl:-scale-x-100" aria-hidden="true">↗</span></Link>
          </div>
        </article>
      </section>

      <section className="bg-mist py-16 md:py-22" aria-labelledby="tous-les-articles">
        <div className="site-wrap">
          <div className="grid gap-8 border-b border-line pb-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-5"><p className="eyebrow mb-3 text-muted">{t('ui.news.list.eyebrow')}</p><h2 id="tous-les-articles" className="section-title text-ink">{t('ui.news.list.title')}</h2></div>
            <label className="search-field md:col-span-4 md:col-start-9"><span className="sr-only">{t('ui.news.list.searchLabel')}</span><input id="article-search" className="field" type="search" placeholder={t('news.search')} autoComplete="off" value={search} onChange={e => setSearch(e.target.value)} /></label>
            <div className="md:col-span-12"><p className="eyebrow mb-3 text-muted">{t('ui.news.list.filterTitle')}</p>
              <div id="category-filters" className="flex flex-wrap gap-2" role="group" aria-label={t('ui.news.list.filterAria')}>
                {categoryList.map((cat, i) => (
                  <button key={i} type="button" className="filter-chip" aria-pressed={activeCatIndex === i} onClick={() => setActiveCatIndex(i)}>{cat}</button>
                ))}
              </div>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{t('ui.news.list.status', { count: shown.length })}</p>
          <div className="grid gap-x-8 gap-y-10 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map(a => (
              <article key={a.slug} className="news-card min-w-0 border-t border-line pt-5">
                <Link to={`/news/${a.slug}`}>
                  <div className="article-image"><img className="news-image" src={a.image} alt="" loading="lazy" /></div>
                  <p className="eyebrow mt-5 text-muted">{a.category} <span className="px-2 text-gold">/</span> {a.date}</p>
                  <h3 className="mt-3 text-2xl leading-tight text-ink">{a.title}</h3>
                  <p className="mt-3 text-small leading-relaxed text-body">{a.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-small"><span className="text-muted">{a.readTime} {t('news.readingTime')}</span><span className="font-extrabold text-ink">{t('news.readMore')} <span className="inline-block text-gold rtl:-scale-x-100" aria-hidden="true">↗</span></span></div>
                </Link>
              </article>
            ))}
          </div>
          {shown.length === 0 && <p className="border-t border-line py-12 text-body">{t('news.notFound')}</p>}
        </div>
      </section>

      <section className="bg-ink-deep py-16 text-white">
        <div className="site-wrap grid gap-8 md:grid-cols-12 md:items-center"><div className="md:col-span-8"><p className="eyebrow mb-4 text-focus">{t('ui.news.cta.eyebrow')}</p><h2 className="max-w-3xl font-display text-4xl leading-tight md:text-5xl">{t('ui.news.cta.title')}</h2></div><div className="md:col-span-4 md:text-end"><Link className="button button-gold" to="/contact#devis">{t('ui.news.cta.button')} <span className="inline-block rtl:-scale-x-100" aria-hidden="true">↗</span></Link></div></div>
      </section>
    </>
  )
}

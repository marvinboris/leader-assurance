import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const Arrow = () => <span className="inline-block rtl:-scale-x-100" aria-hidden="true">↗</span>
const WHATSAPP = 'https://wa.me/237696411012'

export default function NewsArticle({ article, articles }) {
  const { t } = useTranslation()
  const related = articles.filter(a => a.slug !== article.slug).slice(0, 3)
  const pageUrl = typeof window === 'undefined' ? '' : window.location.href
  const shares = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({ u: pageUrl })}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?${new URLSearchParams({ text: article.title, url: pageUrl })}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url: pageUrl })}` },
  ]
  const readTime = `${article.readTime} ${t('news.readingTime')}`

  return (
    <>
      <Helmet>
        <title>{article.title} - Leader Assurance</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <section className="bg-ink-deep text-white">
        <div className="site-wrap grid gap-8 py-12 md:grid-cols-12 md:items-end md:py-16">
          <div className="md:col-span-8">
            <Link to="/news" className="mb-8 inline-flex items-center gap-3 text-small font-bold text-white/80 underline decoration-gold decoration-2 underline-offset-4 hover:text-white"><span className="inline-block rtl:-scale-x-100" aria-hidden="true">←</span> {t('news.backToArticles')}</Link>
            <p className="eyebrow mb-5 flex items-center gap-3 text-focus"><span className="h-px w-10 bg-gold"></span> {t('ui.news.article.eyebrow', { category: article.category })}</p>
            <h1 className="max-w-4xl font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">{article.title}</h1>
            <p className="mt-6 max-w-3xl text-lead text-white/80">{article.excerpt}</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/25 pt-5 text-small text-white/75">
              <span><span className="font-extrabold text-white">{t('ui.news.article.published')}</span> {article.date}</span><span><span className="font-extrabold text-white">{t('ui.news.article.reading')}</span> {article.readTime}</span><span><span className="font-extrabold text-white">{t('ui.news.article.section')}</span> {article.category}</span>
            </div>
          </div>
          <div className="hidden border-s border-gold/70 ps-6 md:col-span-4 md:block">
            <p className="font-display text-3xl leading-tight text-white">{t('ui.news.article.quoteTitle')}</p>
            <p className="mt-3 text-small leading-relaxed text-white/75">{t('ui.news.article.quoteText')}</p>
          </div>
        </div>
      </section>

      <section className="site-wrap py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <article className="min-w-0 lg:col-span-8" aria-labelledby="article-title">
            <h2 id="article-title" className="sr-only">{article.title}</h2>
            <figure className="mb-10">
              <img src={article.heroImage} alt={article.title} className="aspect-video w-full object-cover" />
              <figcaption className="mt-3 text-small text-muted">{t('ui.news.article.figcaption', { category: article.category })}</figcaption>
            </figure>
            <div className="max-w-3xl">
              <p className="text-lead leading-relaxed text-ink">{article.body.intro}</p>
              {article.body.sections.map((s, i) => (
                <section key={i} className="mt-10 border-t border-line pt-7">
                  <p className="eyebrow mb-3 text-gold">{String(i + 1).padStart(2, '0')} / {s.label}</p>
                  <h3 className="text-3xl leading-tight text-ink">{s.title}</h3>
                  {s.paragraphs?.map((p, j) => <p key={j} className="mt-4 text-body leading-relaxed">{p}</p>)}
                  {s.items && (
                    <ul className="mt-5 divide-y divide-line border-y border-line">
                      {s.items.map((it, j) => (
                        <li key={j} className="grid gap-2 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"><strong className="text-ink">{it.label}</strong><span className="text-body leading-relaxed">{it.text}</span></li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-12 border-y border-line py-6">
              <h3 className="mb-4 flex items-center gap-3 font-sans text-base font-extrabold text-ink"><span aria-hidden="true" className="inline-block text-gold rtl:-scale-x-100">↗</span> {t('ui.news.article.share')}</h3>
              <div className="flex flex-wrap gap-3">
                {shares.map(s => (
                  <a key={s.name} className="button button-navy" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={t('ui.news.article.shareOn', { network: s.name })}>{s.name} <Arrow /></a>
                ))}
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4">
            <section className="border-t-4 border-gold bg-mist p-6 md:p-7" aria-labelledby="advice-title">
              <p className="eyebrow mb-4 text-ink">{t('ui.news.article.adviceEyebrow')}</p>
              <h2 id="advice-title" className="text-3xl leading-tight text-ink">{t('news.needAdvice')}</h2>
              <p className="mt-4 text-small leading-relaxed text-body">{t('news.needAdviceDesc')}</p>
              <Link className="button button-gold mt-6 w-full" to="/contact#devis">{t('ui.news.article.quote')} <Arrow /></Link>
              <a className="mt-4 inline-flex min-h-11 items-center gap-2 text-small font-extrabold text-ink underline decoration-gold decoration-2 underline-offset-4" href={`${WHATSAPP}?text=${encodeURIComponent(t('ui.news.article.whatsappMsg'))}`} target="_blank" rel="noopener noreferrer">{t('ui.news.article.whatsapp')} <Arrow /></a>
            </section>

            <section className="mt-12" aria-labelledby="related-title">
              <p className="eyebrow mb-3 text-muted">{t('ui.news.article.relatedEyebrow')}</p>
              <h2 id="related-title" className="text-3xl leading-tight text-ink">{t('ui.news.article.relatedTitle')}</h2>
              <ol className="mt-5 border-t border-line">
                {related.map(r => (
                  <li key={r.slug} className="border-b border-line py-5"><Link to={`/news/${r.slug}`} className="group block"><span className="eyebrow text-muted">{r.category} · {r.readTime}</span><span className="mt-2 block font-display text-2xl leading-tight text-ink group-hover:underline decoration-gold decoration-2 underline-offset-4">{r.title}</span><span className="mt-2 block text-small text-muted">{r.date}</span></Link></li>
                ))}
              </ol>
              <Link to="/news" className="mt-5 inline-flex min-h-11 items-center gap-3 text-small font-extrabold text-ink underline decoration-gold decoration-2 underline-offset-4">{t('ui.news.article.all')} <Arrow /></Link>
            </section>
          </aside>
        </div>
      </section>

      <section className="bg-gold-pale py-12 md:py-16">
        <div className="site-wrap grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8"><p className="eyebrow mb-3 text-ink">{t('ui.news.article.ctaEyebrow')}</p><h2 className="max-w-3xl font-display text-4xl leading-tight text-ink md:text-5xl">{t('ui.news.article.ctaTitle')}</h2><p className="mt-4 max-w-2xl text-body leading-relaxed">{t('ui.news.article.ctaText')}</p></div>
          <div className="md:col-span-4 md:text-end"><Link to="/contact#devis" className="button button-gold">{t('ui.news.article.ctaButton')} <Arrow /></Link></div>
        </div>
      </section>
    </>
  )
}

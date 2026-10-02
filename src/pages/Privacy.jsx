import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import './Privacy.css'

const EMAIL = 'leaderassurance1@yahoo.fr'
const PHONE = '+237 696 41 10 12'
// Ordre = ordre des tableaux ui.privacy.sections / ui.privacy.toc
const SECTION_IDS = ['privacy', 'collecte', 'utilisation', 'cookies', 'conditions', 'droits', 'contact']

export default function Privacy() {
  const { t } = useTranslation()
  const sections = t('ui.privacy.sections', { returnObjects: true })
  const toc = t('ui.privacy.toc', { returnObjects: true })
  const num = (i) => String(i + 1).padStart(2, '0')

  return (
    <>
      <Helmet>
        <title>{t('ui.privacy.metaTitle')}</title>
      </Helmet>

      <header className="border-b border-line bg-ink-deep text-white">
        <div className="site-wrap grid gap-8 py-12 md:grid-cols-12 md:items-end md:py-16">
          <div className="md:col-span-8">
            <p className="eyebrow mb-5 flex items-center gap-3 text-focus"><span className="h-px w-10 bg-gold"></span> {t('ui.privacy.eyebrow')}</p>
            <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-5xl">{t('ui.privacy.title')}</h1>
            <p className="mt-5 max-w-2xl text-lead leading-relaxed text-white/80">{t('ui.privacy.lead')}</p>
          </div>
          <p className="border-s border-gold ps-4 text-small text-white/75 md:col-span-4 md:justify-self-end">{t('ui.privacy.updatedLabel')}<br /><span className="mt-1 inline-block font-bold text-white">{t('ui.privacy.updatedDate')}</span></p>
        </div>
      </header>

      <div className="site-wrap grid gap-10 py-12 md:grid-cols-12 md:gap-12 md:py-16">
        <aside className="md:col-span-4 lg:col-span-3">
          <nav className="privacy-toc border-y border-line py-5 md:sticky md:top-6 md:border-t-2 md:border-t-gold md:py-6" aria-label={t('ui.privacy.tocLabel')}>
            <p className="eyebrow mb-4 text-muted">{t('ui.privacy.tocTitle')}</p>
            <ol className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {SECTION_IDS.map((id, i) => (
                <li key={id}><a href={`#${id}`}>{num(i)} · {toc[i]}</a></li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="privacy-copy md:col-span-8 lg:col-span-9" aria-label={t('ui.privacy.title')}>
          {SECTION_IDS.map((id, i) => {
            const s = sections[i]
            const isContact = id === 'contact'
            return (
              <section key={id} id={id} className={`privacy-section${isContact ? ' privacy-contact' : ''} scroll-mt-8`}>
                {id === 'conditions' && <span id="terms" className="block scroll-mt-8" />}
                <p className="eyebrow mb-3 text-muted">{num(i)} / {s.eyebrow}</p>
                <h2>{s.title}</h2>
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.intro && <p>{s.intro}</p>}
                {s.items && <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>}
                {s.outro && <p>{s.outro}</p>}
                {id === 'droits' && <p>{s.contactPrefix} <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>}
                {isContact && (
                  <address className="mt-5 border-s-2 border-gold bg-mist p-5 not-italic leading-relaxed">
                    <strong className="text-ink">Leader Assurance SARL</strong><br />
                    Akwa, Rue Bernabé - Douala, Cameroun<br />
                    {t('ui.privacy.emailLabel')} <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
                    {t('ui.privacy.phoneLabel')} <a href="tel:+237696411012" dir="ltr">{PHONE}</a>
                  </address>
                )}
              </section>
            )
          })}
        </article>
      </div>

      <section className="border-t border-line bg-mist py-10">
        <div className="site-wrap flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-body leading-relaxed">{t('ui.privacy.ctaText')}</p>
          <a className="button button-navy shrink-0" href={`mailto:${EMAIL}`}>{t('ui.privacy.ctaButton')} <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </>
  )
}

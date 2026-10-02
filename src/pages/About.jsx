import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import numberFormat from '../utils/numberFormat'

const pad = (i) => String(i + 1).padStart(2, '0')

function Arrow() {
  return <span aria-hidden="true" className="inline-block rtl:-scale-x-100">↗</span>
}

export default function About() {
  const { t, i18n } = useTranslation()
  const nf = numberFormat(i18n.language)

  const values = t('about.values', { returnObjects: true })
  const team = t('about.teamMembers', { returnObjects: true })
  const milestones = t('about.milestones', { returnObjects: true })
  const initials = ['DG', 'RC', 'CS', 'CE', 'JF', 'AF']

  const stats = [
    { n: `${nf.format(500)}+`, label: t('about.clientsSatisfied') },
    { n: `${nf.format(15)}+`, label: t('ui.about.partnerCompanies') },
    { n: `${nf.format(10)}+`, label: t('about.yearsExperience') },
    { n: `${nf.format(1200)}+`, label: t('about.policiesManaged') },
  ]

  return (
    <>
      <Helmet>
        <title>{t('ui.about.metaTitle')}</title>
        <meta name="description" content={t('ui.about.metaDescription')} />
      </Helmet>

      <section className="bg-ink-deep text-white">
        <div className="site-wrap grid min-h-[23rem] items-center gap-10 py-16 md:grid-cols-12 md:py-22">
          <div className="md:col-span-8">
            <p className="eyebrow mb-5 text-focus">{t('ui.about.heroEyebrow')}</p>
            <h1 className="display-title hero-heading">{t('about.title')}.</h1>
            <p className="hero-copy mt-6 text-lead text-white/80">{t('ui.about.heroLead')}</p>
            <Link className="button button-gold mt-8" to="/contact#devis">{t('ui.about.heroCta')} <Arrow /></Link>
          </div>
          <div className="hidden border-s border-white/20 ps-8 md:col-span-4 md:block">
            <p className="font-display text-5xl leading-tight text-focus">{nf.format(10)}<span className="text-3xl">+</span></p>
            <p className="mt-2 max-w-xs text-small leading-relaxed text-white/75">{t('ui.about.heroSide')}</p>
            <p className="mt-8 text-small font-bold text-white">Akwa · Rue Bernabé</p>
          </div>
        </div>
      </section>

      <section className="site-wrap py-22">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4"><p className="eyebrow mb-5 text-muted">{t('ui.about.whoEyebrow')}</p><h2 className="section-title section-heading-narrow text-ink">{t('ui.about.whoTitle')}</h2></div>
          <div className="md:col-span-8 md:columns-2 md:gap-10">
            <p className="text-body leading-relaxed">{t('about.description1')}</p>
            <p className="mt-5 text-body leading-relaxed md:mt-0">{t('about.description2')}</p>
            <p className="mt-8 border-s-2 border-gold ps-5 font-display text-2xl leading-snug text-ink md:break-inside-avoid">{t('ui.about.quote')}</p>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-y-8 border-t border-line pt-8 md:grid-cols-4 md:gap-8">
          {stats.map((s) => (
            <div key={s.label}><p className="stat-number text-4xl text-ink">{s.n}</p><p className="mt-2 text-small text-muted">{s.label}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-mist py-22">
        <div className="site-wrap">
          <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end"><div className="md:col-span-5"><p className="eyebrow mb-5 text-ink">{t('ui.about.capEyebrow')}</p><h2 className="section-title text-ink">{t('ui.about.capTitle')}</h2></div><p className="max-w-xl text-body leading-relaxed md:col-span-6 md:col-start-7">{t('ui.about.capText')}</p></div>
          <div className="grid gap-0 border-t border-line md:grid-cols-2">
            <article className="py-8 md:pe-10"><p className="font-display text-5xl text-gold" aria-hidden="true">01</p><h3 className="mt-5 text-3xl text-ink">{t('about.mission')}</h3><p className="mt-4 max-w-xl text-body leading-relaxed">{t('about.missionText')}</p></article>
            <article className="border-t border-line py-8 md:border-s md:border-t-0 md:ps-10"><p className="font-display text-5xl text-gold" aria-hidden="true">02</p><h3 className="mt-5 text-3xl text-ink">{t('about.vision')}</h3><p className="mt-4 max-w-xl text-body leading-relaxed">{t('about.visionText')}</p></article>
          </div>
        </div>
      </section>

      <section className="site-wrap py-22">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4"><p className="eyebrow mb-5 text-ink">{t('about.valuesTitle')}</p><h2 className="section-title section-heading-narrow text-ink">{t('ui.about.valuesHeading')}</h2></div>
          <div className="md:col-span-8">
            {values.map((v, i) => (
              <article key={i} className={`grid gap-2 ${i === values.length - 1 ? 'border-y' : 'border-t'} border-line py-5 sm:grid-cols-[3rem_1fr] sm:gap-5`}><span className="font-display text-2xl text-gold">{pad(i)}</span><div><h3 className="font-sans text-base font-extrabold text-ink">{v.title}</h3><p className="mt-2 text-small leading-relaxed text-muted">{v.description}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-22 text-white">
        <div className="site-wrap grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4"><p className="eyebrow mb-5 text-focus">{t('ui.about.journeyEyebrow')}</p><h2 className="section-title text-white">{t('about.journeyTitle')}.</h2><p className="mt-5 max-w-sm text-small leading-relaxed text-white/75">{t('ui.about.journeyText')}</p></div>
          <ol className="border-t border-white/25 md:col-span-8">
            {milestones.map((m, i) => (
              <li key={i} className="grid gap-3 border-b border-white/25 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6"><span className="font-display text-2xl text-focus">{m.year}</span><div><h3 className="font-sans text-base font-extrabold text-white">{m.title}</h3><p className="mt-1 text-small leading-relaxed text-white/70">{m.description}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-wrap py-22">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4"><p className="eyebrow mb-5 text-ink">{t('about.team')}</p><h2 className="section-title section-heading-narrow text-ink">{t('ui.about.teamTitle')}</h2><p className="mt-5 text-body leading-relaxed">{t('ui.about.teamText')}</p></div>
          <div className="md:col-span-8">
            {team.map((m, i) => (
              <article key={i} className={`grid gap-3 ${i === team.length - 1 ? 'border-y' : 'border-t'} border-line py-5 sm:grid-cols-[4rem_1fr] sm:gap-6`}><span className="font-display text-2xl text-gold">{initials[i]}</span><div><h3 className="font-sans text-base font-extrabold text-ink">{m.name}</h3><p className="mt-1 text-small font-bold text-muted">{m.role}</p><p className="mt-3 text-small leading-relaxed text-body">{m.bio}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gold-pale py-16">
        <div className="site-wrap grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8"><p className="eyebrow mb-4 text-ink">{t('ui.about.ctaEyebrow')}</p><h2 className="section-title max-w-3xl text-ink">{t('ui.about.ctaTitle')}</h2><p className="mt-5 max-w-2xl text-body leading-relaxed">{t('ui.about.ctaText')}</p></div>
          <div className="md:col-span-4 md:text-end"><Link className="button button-gold" to="/contact#devis">{t('about.contactUs')} <Arrow /></Link><p className="mt-4 text-small text-ink">{t('ui.about.ctaPhone')} <a className="font-extrabold underline decoration-gold decoration-2 underline-offset-4" href="tel:+237696411012" dir="ltr">+237 696 41 10 12</a></p></div>
        </div>
      </section>
    </>
  )
}

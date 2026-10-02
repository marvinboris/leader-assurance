import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const SCROLL_SPEED = 0.018 // px par ms
const MAX_FRAME_MS = 50

const partnersConfig = [
  { name: 'Activa Assurances', country: 'cameroon' },
  { name: 'Chanas Assurances', country: 'cameroon' },
  { name: 'AXA Assurances', country: 'international' },
  { name: 'NSIA Assurances', country: 'cameroon' },
  { name: 'Saar Assurances', country: 'cameroon' },
  { name: 'Zenithe Assurance', country: 'centralAfrica' },
  { name: 'Beneficial Life', country: 'international' },
  { name: 'GIC-Vie', country: 'cameroon' },
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function PartnerName({ name, hidden }) {
  return (
    <span className="partner-name text-xl text-ink" aria-hidden={hidden || undefined}>
      {name} <span className="px-3 text-gold" aria-hidden="true">·</span>
    </span>
  )
}

function PartnerTrack({ label }) {
  const trackRef = useRef(null)
  const pausedRef = useRef(false)
  const reduced = usePrefersReducedMotion()
  const { i18n } = useTranslation()
  const dir = i18n.dir()

  useEffect(() => {
    const track = trackRef.current
    if (!track || reduced) return undefined
    const sign = dir === 'rtl' ? 1 : -1
    let offset = 0
    let previous = performance.now()
    let raf
    const frame = (now) => {
      const elapsed = Math.min(now - previous, MAX_FRAME_MS)
      previous = now
      if (!pausedRef.current) {
        const first = track.children[0]
        const clone = track.children[track.children.length / 2]
        const period = clone ? Math.abs(clone.getBoundingClientRect().left - first.getBoundingClientRect().left) : 0
        offset += elapsed * SCROLL_SPEED
        if (period > 0 && offset >= period) offset -= period
        track.style.transform = `translate3d(${sign * offset}px, 0, 0)`
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      track.style.transform = ''
    }
  }, [reduced, dir])

  const pause = () => { pausedRef.current = true }
  const resume = () => { pausedRef.current = false }

  return (
    <div
      ref={trackRef}
      id="partner-track"
      className="flex w-max gap-10 whitespace-nowrap py-2"
      tabIndex={0}
      aria-label={label}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      {partnersConfig.map((p) => <PartnerName key={p.name} name={p.name} />)}
      {!reduced && partnersConfig.map((p) => <PartnerName key={`clone-${p.name}`} name={p.name} hidden />)}
    </div>
  )
}

export default function Partners() {
  const { t, i18n } = useTranslation()
  const partnersData = t('partners.list', { returnObjects: true })
  const advantages = t('partners.advantagesList', { returnObjects: true })
  const count = new Intl.NumberFormat(i18n.language, { minimumIntegerDigits: 2 }).format(partnersConfig.length)
  const regions = ['cameroon', 'centralAfrica', 'international'].map((k) => t(`ui.partners.${k}`)).join(' · ')

  return (
    <>
      <Helmet>
        <title>{`${t('partners.title')} - Leader Assurance`}</title>
        <meta name="description" content={t('ui.partners.metaDescription')} />
      </Helmet>

      <section className="bg-ink-deep text-white">
        <div className="site-wrap grid min-h-[23rem] items-end gap-10 py-16 md:grid-cols-12 md:items-center md:py-22">
          <div className="md:col-span-8 lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-focus"><span className="h-px w-10 bg-gold"></span> {t('ui.partners.eyebrow')}</p>
            <h1 className="display-title max-w-[11ch]">{t('ui.partners.heroTitle')}</h1>
            <p className="mt-7 max-w-2xl text-lead text-white/80">{t('ui.partners.heroSubtitle')}</p>
          </div>
          <div className="border-s border-gold ps-6 md:col-span-4 md:justify-self-end md:ps-8">
            <p className="font-display text-5xl text-focus">{count}</p>
            <p className="mt-2 max-w-xs text-small leading-relaxed text-white/75">{t('ui.partners.countLabel')}</p>
          </div>
        </div>
      </section>

      <section className="site-wrap grid gap-8 py-16 md:grid-cols-12 md:gap-12 md:py-22">
        <div className="md:col-span-4"><p className="eyebrow mb-4 text-muted">{t('ui.partners.roleEyebrow')}</p><h2 className="section-title section-heading-narrow">{t('ui.partners.roleTitle')}</h2></div>
        <div className="md:col-span-7 md:col-start-6 md:pt-2">
          <p className="max-w-3xl text-lead leading-relaxed text-body">{t('partners.description')}</p>
          <p className="mt-5 max-w-2xl text-body leading-relaxed">{t('ui.partners.roleText')}</p>
        </div>
      </section>

      <section className="bg-mist py-16 md:py-22" aria-labelledby="compagnies-title">
        <div className="site-wrap">
          <div className="mb-10 grid gap-5 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8"><p className="eyebrow mb-4 text-muted">{t('ui.partners.networkEyebrow')}</p><h2 id="compagnies-title" className="section-title">{t('partners.ourCompanies')}</h2></div>
            <p className="text-small text-muted md:col-span-4 md:justify-self-end md:text-end">{regions}</p>
          </div>
          <div className="grid gap-x-10 md:grid-cols-2">
            {partnersConfig.map((p, i) => (
              <article key={p.name} className="border-t border-ink py-6 md:py-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="partner-name text-2xl text-ink">{p.name}</h3><span className="text-small text-muted">{t(`ui.partners.${p.country}`)}</span></div>
                <p className="mt-3 text-micro font-bold text-ink-soft">{partnersData[i]?.specialty}</p><p className="mt-2 max-w-xl text-small leading-relaxed text-body">{partnersData[i]?.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-line bg-paper py-7" aria-label={t('ui.partners.stripAria')}>
        <div className="site-wrap mb-4 flex items-center justify-between gap-4"><p className="eyebrow text-muted">{t('ui.partners.stripEyebrow')}</p><p className="text-micro text-muted">{t('ui.partners.stripHint')}</p></div>
        <PartnerTrack label={t('ui.partners.trackLabel')} />
      </section>

      <section className="site-wrap py-16 md:py-22" aria-labelledby="courtier-title">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5"><p className="eyebrow mb-4 text-muted">{t('ui.partners.brokerEyebrow')}</p><h2 id="courtier-title" className="section-title section-heading-narrow">{t('partners.whyBroker')}</h2><p className="mt-5 max-w-md text-body leading-relaxed">{t('partners.whyBrokerSubtitle')}</p></div>
          <div className="md:col-span-6 md:col-start-7">
            {advantages.map((adv, i) => (
              <article key={adv.title} className={`border-t ${i === advantages.length - 1 ? 'border-b ' : ''}border-line py-5`}>
                <p className="eyebrow text-gold">{new Intl.NumberFormat(i18n.language, { minimumIntegerDigits: 2 }).format(i + 1)}</p><h3 className="mt-2 text-2xl text-ink">{adv.title}</h3><p className="mt-2 text-small leading-relaxed">{adv.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-deep py-16 text-white md:py-22">
        <div className="site-wrap grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8"><p className="eyebrow mb-4 text-focus">{t('partners.certified')}</p><h2 className="max-w-3xl font-display text-4xl leading-tight md:text-5xl">{t('ui.partners.certifiedTitle')}</h2><p className="mt-5 max-w-3xl text-small leading-relaxed text-white/80">{t('partners.certifiedDesc')}</p></div>
          <div className="md:col-span-4 md:text-end"><Link className="button button-gold" to="/contact#devis">{t('partners.contactUs')} <span aria-hidden="true" className="rtl:-scale-x-100 inline-block">↗</span></Link></div>
        </div>
      </section>
    </>
  )
}

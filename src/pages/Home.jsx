import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import numberFormat from '../utils/numberFormat'

const WHATSAPP_URL = 'https://wa.me/237696411012'
const BUSINESS_TYPES = ['entreprise', 'responsabilite', 'employes', 'actifs']
const INSURANCE_TYPES = ['sante', 'vie', 'voyage', 'epargne', 'entreprise', 'responsabilite', 'employes', 'actifs']
const COVERAGE_LEVELS = ['basic', 'standard', 'premium']
const BASE_PRICES = { sante: 15000, vie: 20000, voyage: 8000, epargne: 25000, entreprise: 50000, responsabilite: 30000, employes: 20000, actifs: 35000 }
const COVERAGE_FACTORS = { basic: 0.7, standard: 1, premium: 1.5 }
const INITIAL_FORM = { insurance: '', age: '', employees: '', coverage: '', name: '', phone: '' }

const isBusiness = (type) => BUSINESS_TYPES.includes(type)

function computeEstimate({ insurance, age, employees, coverage }) {
  const business = isBusiness(insurance)
  const measure = business ? employees : age
  if (!insurance || !coverage || measure === '') return null
  let ageFactor = 1
  if (!business) ageFactor = Number(measure) > 50 ? 1.4 : Number(measure) > 35 ? 1.2 : 1
  const employeeFactor = business ? Math.max(1, Number(measure) / 10) : 1
  return Math.round((BASE_PRICES[insurance] || 20000) * COVERAGE_FACTORS[coverage] * ageFactor * employeeFactor)
}

const isInteger = (value) => value.trim() !== '' && Number.isInteger(Number(value))

function isFieldInvalid(field, form) {
  const value = form[field]
  if (!value.trim()) return true
  if (field === 'age') return !isInteger(value) || Number(value) < 0 || Number(value) > 120
  if (field === 'employees') return !isInteger(value) || Number(value) < 1
  return false
}

function FieldError({ id, message }) {
  return <p id={id} className="field-error" role="alert">{message}</p>
}

function QuoteForm() {
  const { t, i18n } = useTranslation()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const refs = {}
  const business = isBusiness(form.insurance)
  const money = numberFormat(i18n.resolvedLanguage || i18n.language)
  const amount = computeEstimate(form)
  const estimate = `${amount === null ? '—' : money.format(amount)} ${t('ui.home.quote.currency')}`

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const required = ['insurance', business ? 'employees' : 'age', 'coverage', 'name', 'phone']
    const nextErrors = {}
    let firstInvalid = null
    required.forEach((field) => {
      if (isFieldInvalid(field, form)) {
        nextErrors[field] = t(`ui.home.quote.errors.${field}`)
        if (!firstInvalid) firstInvalid = field
      }
    })
    setErrors(nextErrors)
    if (firstInvalid) {
      refs[firstInvalid]?.focus()
      return
    }
    const quantity = business
      ? t('ui.home.quote.whatsapp.employees', { value: form.employees })
      : t('ui.home.quote.whatsapp.age', { value: form.age })
    const message = t('ui.home.quote.whatsapp.message', {
      name: form.name,
      phone: form.phone,
      insurance: t(`home.calculatorOptions.${form.insurance}`),
      coverage: t(`calculator.${form.coverage}`),
      quantity,
      estimate,
    })
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const labelClass = 'mb-2 block text-small font-extrabold text-ink'

  return (
    <form id="quote-form" className="bg-paper p-6 shadow-float md:col-span-7 md:p-8" aria-label={t('ui.home.quote.formLabel')} onSubmit={handleSubmit} noValidate>
      <div className="grid gap-6">
        <div>
          <label htmlFor="insurance" className={labelClass}>{t('ui.home.quote.typeLabel')}</label>
          <select id="insurance" name="insurance" className="field" required value={form.insurance} onChange={update('insurance')} ref={(el) => { refs.insurance = el }} aria-invalid={Boolean(errors.insurance)} aria-describedby="insurance-error">
            <option value="" disabled>{t('ui.home.quote.typePlaceholder')}</option>
            {INSURANCE_TYPES.map((key) => <option key={key} value={key}>{t(`home.calculatorOptions.${key}`)}</option>)}
          </select>
          <FieldError id="insurance-error" message={errors.insurance} />
        </div>
        <div id="age-field" hidden={business}>
          <label htmlFor="age" className={labelClass}>{t('ui.home.quote.ageLabel')}</label>
          <input id="age" name="age" className="field" type="number" min="0" max="120" step="1" inputMode="numeric" placeholder={t('ui.home.quote.agePlaceholder')} required disabled={business} value={form.age} onChange={update('age')} ref={(el) => { refs.age = el }} aria-invalid={Boolean(errors.age)} aria-describedby="age-error" />
          <FieldError id="age-error" message={errors.age} />
        </div>
        <div id="employees-field" hidden={!business}>
          <label htmlFor="employees" className={labelClass}>{t('ui.home.quote.employeesLabel')}</label>
          <input id="employees" name="employees" className="field" type="number" min="1" step="1" inputMode="numeric" placeholder={t('ui.home.quote.employeesPlaceholder')} required disabled={!business} value={form.employees} onChange={update('employees')} ref={(el) => { refs.employees = el }} aria-invalid={Boolean(errors.employees)} aria-describedby="employees-error" />
          <FieldError id="employees-error" message={errors.employees} />
        </div>
        <fieldset className="grid gap-2 border-0 p-0">
          <legend className="mb-2 text-small font-extrabold text-ink">{t('ui.home.quote.coverageLabel')}</legend>
          <div className="grid grid-cols-3 overflow-hidden rounded-sm border border-line">
            {COVERAGE_LEVELS.map((level, i) => (
              <label key={level} className={`coverage-choice flex min-h-12 cursor-pointer items-center justify-center px-2 text-small font-bold text-ink has-[:checked]:bg-ink has-[:checked]:text-white${i < 2 ? ' border-e border-line' : ''}`}>
                <input className="sr-only" type="radio" name="coverage" value={level} required={i === 0} checked={form.coverage === level} onChange={update('coverage')} ref={i === 0 ? (el) => { refs.coverage = el } : undefined} aria-describedby="coverage-error" />
                {t(`calculator.${level}`)}
              </label>
            ))}
          </div>
          <FieldError id="coverage-error" message={errors.coverage} />
        </fieldset>
        <div className="border-y border-line py-5">
          <p className="text-small font-bold text-muted">{t('calculator.result')}</p>
          <p id="estimate" className="mt-1 font-display text-4xl leading-tight text-ink" aria-live="polite">{estimate}</p>
          <p className="mt-2 text-small leading-relaxed text-muted">{t('calculator.disclaimer')}</p>
        </div>
        <div>
          <label htmlFor="name" className={labelClass}>{t('ui.home.quote.nameLabel')}</label>
          <input id="name" name="name" className="field" autoComplete="name" placeholder={t('ui.home.quote.namePlaceholder')} required value={form.name} onChange={update('name')} ref={(el) => { refs.name = el }} aria-invalid={Boolean(errors.name)} aria-describedby="name-error" />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>{t('ui.home.quote.phoneLabel')}</label>
          <input id="phone" name="phone" className="field" type="tel" autoComplete="tel" inputMode="tel" placeholder={t('ui.home.quote.phonePlaceholder')} required value={form.phone} onChange={update('phone')} ref={(el) => { refs.phone = el }} aria-invalid={Boolean(errors.phone)} aria-describedby="phone-error" />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <button type="submit" className="button button-gold w-full sm:w-auto">{t('calculator.personalized')} <span aria-hidden="true" className="rtl:-scale-x-100">↗</span></button>
        <p id="form-note" className="text-small text-muted" aria-live="polite">{sent ? t('ui.home.quote.sent') : t('ui.home.quote.note')}</p>
      </div>
    </form>
  )
}

const PARTNERS = ['Activa', 'Chanas', 'AXA', 'NSIA', 'Saar', 'Zenithe', 'Beneficial Life', 'GIC-Vie']
const ctaLinkClass = 'mt-7 inline-flex min-h-11 items-center gap-3 text-small font-extrabold text-ink underline decoration-gold decoration-2 underline-offset-4'
const arrow = <span aria-hidden="true" className="rtl:-scale-x-100">↗</span>

function SolutionCard({ data, className }) {
  return (
    <article className={className}>
      <p className="eyebrow text-muted">{data.label}</p>
      <h3 className="mt-4 text-3xl text-ink">{data.title}</h3>
      <p className="mt-4 text-body leading-relaxed">{data.text}</p>
      <ul className="mt-6 space-y-3 border-t border-line pt-5 text-small text-ink">
        {data.items.map((item) => (
          <li key={item} className="flex justify-between gap-3"><span>{item}</span><span className="text-gold rtl:-scale-x-100" aria-hidden="true">↗</span></li>
        ))}
      </ul>
      <Link to="#devis" className={ctaLinkClass}>{data.cta} {arrow}</Link>
    </article>
  )
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const number = numberFormat(i18n.resolvedLanguage || i18n.language)
  const solutions = t('ui.home.solutions', { returnObjects: true })
  const steps = t('ui.home.approach.steps', { returnObjects: true })
  const stats = t('ui.home.stats', { returnObjects: true })
  const testimonials = t('testimonials.list', { returnObjects: true }).slice(0, 2)
  const heroWhatsapp = `${WHATSAPP_URL}?text=${encodeURIComponent(t('ui.home.hero.whatsappMessage'))}`

  return (
    <>
      <Helmet>
        <title>Leader Assurance - Assureur Conseil | Douala, Cameroun</title>
        <meta name="description" content="Leader Assurance SARL - Votre partenaire de confiance en assurance à Douala, Cameroun. Assurance santé, entreprise, vie et épargne." />
      </Helmet>

      <section id="accueil" className="hero-photo hero-height relative isolate overflow-hidden text-white">
        <div className="site-wrap grid hero-height items-center py-16 md:grid-cols-12 md:gap-8 md:py-22">
          <div className="relative z-10 md:col-span-8 lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-focus"><span className="h-px w-10 bg-gold"></span> {t('ui.home.hero.eyebrow')}</p>
            <h1 className="display-title hero-heading">{t('ui.home.hero.title')}</h1>
            <p className="hero-copy mt-8 text-lead text-white/85">{t('ui.home.hero.copy')}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link className="button button-gold" to="#devis">{t('ui.home.hero.ctaPrimary')} {arrow}</Link>
              <a className="button button-outline" href={heroWhatsapp} target="_blank" rel="noopener noreferrer">{t('ui.home.hero.ctaWhatsapp')}</a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/25 pt-5 text-small text-white/80">
              <span>Akwa, Rue Bernabé</span><a className="hover:text-white" href="tel:+237696411012" dir="ltr">+237 696 41 10 12</a>
            </div>
          </div>
          <div className="hero-detail relative mt-12 hidden md:col-span-4 md:mt-0 md:block lg:col-span-5">
            <div className="hero-callout absolute bottom-4 end-0 border-s border-gold/70 ps-6">
              <p className="font-display text-4xl leading-none text-white">{t('ui.home.hero.calloutTitle')}</p>
              <p className="mt-4 max-w-xs text-small leading-relaxed text-white/75">{t('ui.home.hero.calloutText')}</p>
            </div>
            <span className="hero-index absolute end-0 top-4 select-none font-display leading-none text-white/10" aria-hidden="true">01</span>
          </div>
        </div>
        <div className="absolute bottom-0 start-0 h-1 w-1/3 bg-gold" aria-hidden="true"></div>
      </section>

      <section id="solutions" className="site-wrap py-22">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="eyebrow mb-5 text-ink">{solutions.eyebrow}</p>
            <h2 className="section-title text-ink">{solutions.title}</h2>
            <p className="mt-6 max-w-sm text-body leading-relaxed">{solutions.text}</p>
          </div>
          <div className="grid gap-0 border-t border-line md:col-span-8 md:grid-cols-2 md:border-s md:border-t-0">
            <SolutionCard data={solutions.individuals} className="border-b border-line py-8 md:border-b-0 md:px-8 md:py-0" />
            <SolutionCard data={solutions.companies} className="py-8 md:border-s md:border-line md:px-8 md:py-0" />
          </div>
        </div>
      </section>

      <section id="approche" className="bg-mist py-22">
        <div className="site-wrap grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow mb-5 text-ink">{t('ui.home.approach.eyebrow')}</p>
            <h2 className="section-title section-heading-narrow text-ink">{t('ui.home.approach.title')}</h2>
            <p className="mt-6 max-w-md text-body leading-relaxed">{t('ui.home.approach.text')}</p>
            <Link className="button button-navy mt-8" to="#devis">{t('ui.home.approach.cta')} {arrow}</Link>
          </div>
          <div className="md:col-span-7 md:pt-10">
            <ol className="border-t border-ink/25">
              {steps.map((step, i) => (
                <li key={step.title} className="approach-row grid gap-5 border-b border-ink/25 py-6">
                  <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <div><h3 className="font-sans text-base font-extrabold text-ink">{step.title}</h3><p className="mt-2 max-w-lg text-small leading-relaxed text-muted">{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="reperes" className="bg-ink py-16 text-white">
        <div className="site-wrap">
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="border-s border-gold ps-5"><p className="stat-number text-4xl text-focus md:text-5xl">{number.format(stat.value)}<span className="text-2xl md:text-3xl">+</span></p><p className="mt-2 text-small text-white/75">{stat.label}</p></div>
            ))}
          </div>
          <div className="mt-16 grid gap-6 border-t border-white/20 pt-8 md:grid-cols-12 md:items-start">
            <p className="eyebrow text-white/65 md:col-span-3">{t('ui.home.partnersLabel')}</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:col-span-9 md:grid-cols-4">
              {PARTNERS.map((name) => <span key={name} className="partner-name text-lg text-white">{name}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="site-wrap py-22">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="eyebrow mb-5 text-ink">{t('ui.home.testimonials.eyebrow')}</p>
            <h2 className="section-title text-ink">{t('ui.home.testimonials.title')}</h2>
          </div>
          <div className="grid gap-0 md:col-span-8">
            {testimonials.map((item) => (
              <figure key={item.name} className="border-t border-line py-7">
                <blockquote className="max-w-2xl font-display text-2xl leading-snug text-ink">{t('ui.home.testimonials.quote', { text: item.text })}</blockquote>
                <figcaption className="mt-5 text-small font-extrabold text-ink">{item.name} <span className="font-medium text-muted">· {item.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="devis" className="bg-gold-pale py-22">
        <div className="site-wrap grid gap-10 md:grid-cols-12 md:items-start md:gap-8">
          <div className="md:col-span-5 md:pt-7">
            <p className="eyebrow mb-5 text-ink">{t('ui.home.quote.eyebrow')}</p>
            <h2 className="section-title text-ink">{t('ui.home.quote.title')}</h2>
            <p className="mt-6 max-w-md text-body leading-relaxed">{t('ui.home.quote.text')}</p>
            <p className="mt-8 text-small font-semibold text-ink">{t('ui.home.quote.callPrompt')} <a className="underline decoration-gold decoration-2 underline-offset-4" href="tel:+237696411012" dir="ltr">+237 696 41 10 12</a></p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="bg-ink-deep py-16 text-white">
        <div className="site-wrap grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8"><p className="eyebrow mb-4 text-focus">{t('ui.home.finalCta.eyebrow')}</p><h2 className="max-w-3xl font-display text-4xl leading-tight md:text-5xl">{t('ui.home.finalCta.title')}</h2></div>
          <div className="md:col-span-4 md:text-end"><a className="button button-gold" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t('ui.home.finalCta.button')} {arrow}</a></div>
        </div>
      </section>
    </>
  )
}

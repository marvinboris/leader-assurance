import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '' }
const SUBJECTS = ['devis', 'sante', 'entreprise', 'vie', 'sinistre', 'autre']

export default function Contact() {
  const { t } = useTranslation()
  const formRef = useRef(null)
  const resetTimer = useRef()
  const [form, setForm] = useState(EMPTY_FORM)
  const [sending, setSending] = useState(false)
  const [invalid, setInvalid] = useState({})
  const [status, setStatus] = useState({ kind: 'status', text: '' })

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setInvalid(prev => (prev[name] ? { ...prev, [name]: false } : prev))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailInput = formRef.current.elements.email
    const errors = {
      name: !form.name.trim(),
      email: !form.email.trim() || !emailInput.validity.valid,
      message: !form.message.trim(),
    }
    if (errors.name || errors.email || errors.message) {
      setInvalid(errors)
      setStatus({ kind: 'alert', text: t('contact.fillRequired') })
      toast.error(t('contact.fillRequired'))
      const first = ['name', 'email', 'message'].find(k => errors[k])
      formRef.current.elements[first].focus()
      return
    }
    setInvalid({})
    setSending(true)
    setStatus({ kind: 'status', text: '' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: formRef.current.elements.website.value }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
    } catch {
      setSending(false)
      setStatus({ kind: 'alert', text: t('contact.error') })
      toast.error(t('contact.error'))
      return
    }
    setSending(false)
    toast.success(t('contact.success'))
    setForm(EMPTY_FORM)
    setStatus({ kind: 'status', text: `${t('contact.success')} ${t('contact.replyDelay')}` })
    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setStatus({ kind: 'status', text: '' }), 5000)
  }

  const labelClass = 'mb-2 block text-small font-extrabold text-ink'
  const invalidProps = key => ({
    'aria-invalid': invalid[key] ? 'true' : undefined,
    'aria-describedby': invalid[key] ? 'form-status' : undefined,
  })

  return (
    <>
      <Helmet>
        <title>Contact - Leader Assurance | Douala, Cameroun</title>
        <meta name="description" content="Contactez Leader Assurance à Douala, Cameroun. Formulaire de contact, téléphone, WhatsApp et localisation sur la carte." />
      </Helmet>

      <section className="bg-ink-deep text-white">
        <div className="site-wrap grid gap-10 py-16 md:grid-cols-12 md:items-end md:py-22">
          <div className="md:col-span-8">
            <p className="eyebrow mb-5 flex items-center gap-3 text-focus"><span className="h-px w-10 bg-gold"></span> {t('ui.contact.eyebrow')}</p>
            <h1 className="display-title max-w-3xl">{t('ui.contact.h1')}</h1>
          </div>
          <p className="max-w-lg border-s border-gold ps-5 text-lead text-white/80 md:col-span-4 md:justify-self-end">{t('ui.contact.heroText')}</p>
        </div>
        <div className="h-1 w-1/3 bg-gold" aria-hidden="true"></div>
      </section>

      <section className="site-wrap py-16 md:py-22">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <aside className="md:col-span-4">
            <p className="eyebrow mb-5 text-ink">{t('ui.contact.kicker')}</p>
            <h2 className="section-title section-heading-narrow text-ink">{t('ui.contact.coordsTitle')}</h2>
            <p className="mt-6 max-w-sm text-body leading-relaxed">{t('contact.coordinatesDesc')}</p>
            <dl className="mt-10 border-t border-line">
              <div className="border-b border-line py-5"><dt className="text-small font-extrabold text-ink">{t('contact.address')}</dt><dd className="mt-2 text-small leading-relaxed text-body">Akwa, Rue Bernabé<br />Douala, Cameroun</dd></div>
              <div className="border-b border-line py-5"><dt className="text-small font-extrabold text-ink">{t('contact.phones')}</dt><dd className="mt-2 grid justify-items-start gap-1 text-small"><a dir="ltr" className="text-body underline decoration-gold underline-offset-4" href="tel:+237696411012">+237 696 41 10 12</a><a dir="ltr" className="text-body underline decoration-gold underline-offset-4" href="tel:+237681806975">+237 681 80 69 75</a></dd></div>
              <div className="border-b border-line py-5"><dt className="text-small font-extrabold text-ink">{t('contact.email')}</dt><dd className="mt-2 text-small"><a className="break-all text-body underline decoration-gold underline-offset-4" href="mailto:leaderassurance1@yahoo.fr">leaderassurance1@yahoo.fr</a></dd></div>
              <div className="border-b border-line py-5"><dt className="text-small font-extrabold text-ink">{t('contact.schedule')}</dt><dd className="mt-2 whitespace-pre-line text-small leading-relaxed text-body">{t('contact.scheduleText')}</dd></div>
            </dl>
            <a href="https://wa.me/237696411012" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 w-full items-center justify-between gap-4 bg-ink px-5 py-3 text-small font-extrabold text-white transition-colors hover:bg-ink-soft">
              <span>{t('contact.whatsapp')}</span><span className="text-focus"><span dir="ltr">+237 696 41 10 12</span> <span aria-hidden="true" className="inline-block rtl:-scale-x-100">↗</span></span>
            </a>
          </aside>

          <section id="devis" className="scroll-mt-8 md:col-span-8" aria-labelledby="form-title">
            <div className="border-t-2 border-ink bg-mist p-5 sm:p-8 md:p-10">
              <p className="eyebrow text-muted">{t('ui.contact.formEyebrow')}</p>
              <h2 id="form-title" className="mt-3 text-4xl text-ink">{t('contact.sendMessage')}.</h2>
              <p className="mt-4 max-w-xl text-small leading-relaxed text-muted">{t('ui.contact.formIntro')}</p>
              <form ref={formRef} onSubmit={handleSubmit} className="mt-8" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div><label htmlFor="name" className={labelClass}>{t('contact.name')} <span className="text-gold">*</span></label><input id="name" name="name" className="field" autoComplete="name" placeholder="Jean Dupont" required aria-required="true" value={form.name} onChange={handleChange} {...invalidProps('name')} /></div>
                  <div><label htmlFor="email" className={labelClass}>{t('contact.email')} <span className="text-gold">*</span></label><input id="email" name="email" className="field" type="email" autoComplete="email" placeholder="jean@example.com" required aria-required="true" value={form.email} onChange={handleChange} {...invalidProps('email')} /></div>
                  <div><label htmlFor="phone" className={labelClass}>{t('contact.phone')}</label><input id="phone" name="phone" className="field" type="tel" autoComplete="tel" inputMode="tel" placeholder="+237 6XX XX XX XX" value={form.phone} onChange={handleChange} /></div>
                  <div><label htmlFor="subject" className={labelClass}>{t('contact.subject')}</label><select id="subject" name="subject" className="field" value={form.subject} onChange={handleChange}><option value="">{t('contact.subjectPlaceholder')}</option>{SUBJECTS.map(s => <option key={s} value={s}>{t(`contact.subjectOptions.${s}`)}</option>)}</select></div>
                  <div className="sm:col-span-2"><label htmlFor="message" className={labelClass}>{t('contact.message')} <span className="text-gold">*</span></label><textarea id="message" name="message" rows={5} className="field resize-y" placeholder={t('contact.messagePlaceholder')} required aria-required="true" value={form.message} onChange={handleChange} {...invalidProps('message')} /></div>
                </div>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -start-[9999px] h-px w-px opacity-0" defaultValue="" />
                <button id="contact-submit" type="submit" disabled={sending} className="button button-gold mt-6 w-full sm:w-auto"><span id="submit-label">{sending ? t('contact.sending') : t('contact.send')}</span><span aria-hidden="true" className="inline-block rtl:-scale-x-100">↗</span></button>
                <p id="form-status" className={`mt-4 min-h-6 text-small ${status.kind === 'alert' ? 'text-error' : 'text-muted'}`} role={status.kind} aria-live={status.kind === 'alert' ? 'assertive' : 'polite'}>{status.text}</p>
                <p className="mt-2 text-micro text-muted">* {t('ui.contact.requiredNote')}</p>
              </form>
            </div>
          </section>
        </div>
      </section>

      <section className="bg-mist" aria-label={t('ui.contact.mapLabel')}>
        <div className="site-wrap grid gap-6 py-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4"><p className="eyebrow mb-4 text-ink">{t('ui.contact.mapEyebrow')}</p><h2 className="section-title section-heading-narrow text-ink">{t('ui.contact.mapTitle')}</h2><p className="mt-5 text-small text-body">Akwa, Rue Bernabé, Douala, Cameroun</p></div>
          <div className="overflow-hidden border border-line bg-paper md:col-span-8"><iframe title={t('ui.contact.mapIframe')} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8186513454297!2d9.700219!3d4.0517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128a1bb2bbbb%3A0xd6b4e7f5d5b3e5e5!2sAkwa%2C%20Douala%2C%20Cameroun!5e0!3m2!1sfr!2scm!4v1700000000000!5m2!1sfr!2scm" className="h-80 w-full border-0 md:h-96" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
        </div>
      </section>
    </>
  )
}

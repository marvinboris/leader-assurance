import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const links = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/solutions', label: t('nav.solutions') },
    { path: '/partners', label: t('nav.partners') },
    { path: '/news', label: t('nav.news') },
    { path: '/faq', label: t('nav.faq') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/privacy', label: t('footer.privacy') },
  ]

  return (
    <footer className="bg-ink-deep text-white">
      <div className="site-wrap grid gap-10 border-t border-white/20 py-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link to="/" aria-label={t('ui.shell.homeLabel')}>
            <img src="/logo-white.svg" alt="Leader Assurance" className="h-12 w-auto" />
          </Link>
          <p className="mt-5 max-w-sm text-small leading-relaxed text-white/70">{t('ui.shell.footerTagline')}</p>
        </div>
        <nav className="md:col-span-4" aria-label={t('ui.shell.footerNav')}>
          <p className="eyebrow mb-4 text-white/60">{t('ui.shell.explore')}</p>
          <div className="shell-footer-links grid grid-cols-2 gap-x-4 gap-y-2">
            {links.map(l => (
              <NavLink key={l.path} to={l.path} end={l.path === '/'} className="shell-footer-link">{l.label}</NavLink>
            ))}
          </div>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow mb-4 text-white/60">{t('ui.shell.findUs')}</p>
          <address className="not-italic text-small leading-loose text-white/80">
            Akwa, Rue Bernabé, Douala<br />
            <a className="hover:text-focus" href="mailto:leaderassurance1@yahoo.fr">leaderassurance1@yahoo.fr</a><br />
            <a className="hover:text-focus" href="tel:+237696411012" dir="ltr">+237 696 41 10 12</a><br />
            <a className="hover:text-focus" href="tel:+237681806975" dir="ltr">+237 681 80 69 75</a>
          </address>
          <a
            className="mt-3 inline-flex min-h-11 items-center gap-3 text-small font-bold text-white underline decoration-gold decoration-2 underline-offset-4"
            href="https://wa.me/237696411012"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp <span aria-hidden="true" className="rtl:-scale-x-100">↗</span>
          </a>
        </div>
      </div>
      <div className="site-wrap flex flex-col gap-2 border-t border-white/15 py-5 text-micro text-white/55 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Leader Assurance SARL</span>
        <span>Akwa · Douala · Cameroun</span>
      </div>
    </footer>
  )
}

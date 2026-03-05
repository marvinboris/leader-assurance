import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-primary-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.jpg" alt="Leader Assurance" className="h-14 w-auto rounded" />
              <div>
                <div className="font-heading font-bold text-lg leading-tight">LEADER ASSURANCE</div>
                <div className="text-gold-400 text-xs tracking-widest uppercase">ASSUREUR CONSEIL</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold-500 flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { path: '/', label: t('nav.home') },
                { path: '/about', label: t('nav.about') },
                { path: '/solutions', label: t('nav.solutions') },
                { path: '/partners', label: t('nav.partners') },
                { path: '/news', label: t('nav.news') },
                { path: '/faq', label: t('nav.faq') },
              ].map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors text-sm group"
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {[
                t('services.health.title'),
                t('services.business.title'),
                t('services.liability.title'),
                t('services.savings.title'),
                t('solutions.life.title'),
                t('solutions.travel.title'),
              ].map((service, i) => (
                <li key={i}>
                  <Link
                    to="/solutions"
                    className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors text-sm group"
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gold-400" />
                <span>Akwa, Rue Bernabé<br />Douala, Cameroun</span>
              </li>
              <li>
                <a href="tel:+237696411012" className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors text-sm">
                  <Phone size={16} className="flex-shrink-0 text-gold-400" />
                  +237 696 41 10 12
                </a>
              </li>
              <li>
                <a href="tel:+237681806975" className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors text-sm">
                  <Phone size={16} className="flex-shrink-0 text-gold-400" />
                  +237 681 80 69 75
                </a>
              </li>
              <li>
                <a href="mailto:leaderassurance1@yahoo.fr" className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors text-sm">
                  <Mail size={16} className="flex-shrink-0 text-gold-400" />
                  leaderassurance1@yahoo.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Leader Assurance SARL. {t('footer.rights')}.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gold-400 transition-colors">{t('footer.privacy')}</Link>
            <span>|</span>
            <Link to="/privacy#terms" className="hover:text-gold-400 transition-colors">{t('footer.terms')}</Link>
            <span>|</span>
            <Link to="/privacy#cookies" className="hover:text-gold-400 transition-colors">{t('footer.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

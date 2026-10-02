import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'
import en from './locales/en.json'
import es from './locales/es.json'
import ar from './locales/ar.json'
import zh from './locales/zh.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      es: { translation: es },
      ar: { translation: ar },
      zh: { translation: zh },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'es', 'ar', 'zh'],
    // Langue choisie conservée d'une visite à l'autre ; ?lng=ar pour un lien direct. Sinon : français.
    detection: { order: ['querystring', 'localStorage'], caches: ['localStorage'] },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

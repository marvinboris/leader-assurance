import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function Privacy() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>Politique de confidentialité - Leader Assurance</title>
      </Helmet>

      <section className="pt-32 pb-20 gradient-bg">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-heading font-bold mb-4">Politique de confidentialité</h1>
            <p className="text-white/80">Dernière mise à jour : Mars 2025</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-10">

              <div id="privacy">
                <h2 className="text-2xl font-heading font-bold text-primary-900 mb-4">1. Protection des données personnelles</h2>
                <p className="text-gray-600 leading-relaxed">
                  Leader Assurance SARL s'engage à protéger la vie privée de ses clients et visiteurs. Les informations personnelles collectées sur ce site sont utilisées uniquement pour vous fournir nos services d'assurance et vous contacter dans le cadre de vos demandes.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Vos données ne seront jamais vendues, cédées ou partagées avec des tiers sans votre consentement explicite, sauf obligations légales ou contractuelles avec nos partenaires assureurs dans le strict cadre de la gestion de vos contrats.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-primary-900 mb-4">2. Données collectées</h2>
                <p className="text-gray-600 leading-relaxed">Nous collectons les données suivantes :</p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
                  <li>Informations d'identification (nom, prénom, date de naissance)</li>
                  <li>Coordonnées (adresse, téléphone, email)</li>
                  <li>Informations nécessaires à l'établissement des contrats d'assurance</li>
                  <li>Données de navigation sur notre site (cookies)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-primary-900 mb-4">3. Utilisation des données</h2>
                <p className="text-gray-600 leading-relaxed">Vos données sont utilisées pour :</p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
                  <li>Établir des devis et contrats d'assurance personnalisés</li>
                  <li>Gérer vos contrats et sinistres</li>
                  <li>Vous informer de nos services et actualités</li>
                  <li>Améliorer notre site web et nos services</li>
                </ul>
              </div>

              <div id="cookies">
                <h2 className="text-2xl font-heading font-bold text-primary-900 mb-4">4. Politique des cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à :
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
                  <li>Mémoriser vos préférences de langue et de navigation</li>
                  <li>Analyser le trafic et l'utilisation de notre site</li>
                  <li>Améliorer les fonctionnalités de notre site</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Vous pouvez refuser les cookies non essentiels en cliquant sur "Refuser" dans notre bandeau de cookies. Le refus des cookies peut affecter certaines fonctionnalités du site.
                </p>
              </div>

              <div id="terms">
                <h2 className="text-2xl font-heading font-bold text-primary-900 mb-4">5. Conditions d'utilisation</h2>
                <p className="text-gray-600 leading-relaxed">
                  L'utilisation de ce site implique l'acceptation des présentes conditions. Le contenu de ce site est fourni à titre informatif et ne constitue pas un engagement contractuel. Seuls les contrats d'assurance signés entre les parties constituent des engagements légaux.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-primary-900 mb-4">6. Vos droits</h2>
                <p className="text-gray-600 leading-relaxed">
                  Conformément à la réglementation en vigueur, vous disposez des droits suivants sur vos données personnelles :
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600">
                  <li>Droit d'accès à vos données</li>
                  <li>Droit de rectification des données inexactes</li>
                  <li>Droit à l'effacement de vos données</li>
                  <li>Droit d'opposition au traitement</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Pour exercer ces droits, contactez-nous à : leaderassurance1@yahoo.fr
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-primary-900 mb-4">7. Contact</h2>
                <p className="text-gray-600 leading-relaxed">
                  Pour toute question relative à cette politique de confidentialité, contactez-nous :
                </p>
                <div className="mt-3 p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 font-medium">Leader Assurance SARL</p>
                  <p className="text-gray-600">Akwa, Rue Bernabé - Douala, Cameroun</p>
                  <p className="text-gray-600">Email : leaderassurance1@yahoo.fr</p>
                  <p className="text-gray-600">Tél : +237 696 41 10 12</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

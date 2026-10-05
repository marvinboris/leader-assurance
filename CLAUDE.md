# Leader Assurance — site vitrine

## Business context (lire avant toute modif de design ou de contenu)

**Qui** : Leader Assurance SARL, cabinet de conseil et **courtage indépendant** en assurance, Akwa (Rue Bernabé), Douala, Cameroun. 10+ ans, 500+ clients, 15+ compagnies partenaires (Activa, Chanas, AXA, NSIA, Saar, Zenithe, Beneficial Life, GIC-Vie), 1 200+ polices gérées.

**Pourquoi un visiteur arrive** :
- Particulier/famille : veut une assurance santé, vie, voyage ou épargne, ne sait pas quelle compagnie choisir, craint d'être mal remboursé.
- Dirigeant de PME : doit couvrir activité, flotte, employés, responsabilité civile ; veut optimiser le coût et être assisté en cas de sinistre.

**Ce que le site doit produire** : des **demandes de devis / consultations** (formulaire, WhatsApp +237 696 41 10 12, appel). Chaque section doit faire avancer vers ce contact.

**Rôle de chaque section (accueil)** :
- Hero : promesse = un courtier indépendant compare plusieurs assureurs pour vous → CTA devis + WhatsApp.
- Solutions : particuliers vs entreprises, entrée rapide vers le bon produit.
- Différence / preuve : indépendance, multi-compagnies, analyse des risques, assistance sinistre.
- Chiffres + partenaires + témoignages : confiance (marché où la confiance envers l'assureur est faible).
- Calculateur de devis : capter le lead tôt.
- CTA final + contact : convertir.

**Ton** : sérieux, chaleureux, local (Douala), jamais jargonneux. Langue principale FR ; EN/ES/AR(RTL)/ZH via i18n.

## Tech
React 18 + Vite + Tailwind, React Router, framer-motion, react-i18next. `npm run dev` (port 3000).
Prod : Vercel, projet `leader-assurance-cm` → https://leader-assurconseil.com (`npx vercel deploy --prod`). L'ancien site Firebase (`npm run deploy`) n'est plus la cible.
Formulaire de contact : `api/contact.js` (fonction Vercel → Resend). Variables Vercel : `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO` ; en local dans `.env.local` (ignoré par git). Test : `node scripts/check-contact.mjs`.
i18n : les textes de la refonte sont sous `ui.<page>` dans chaque locale. Maquettes de refonte : `maquettes/` (statique, Vercel).

## Design
Identité : marine `#0D1B5E` + accent or `#C99A3B` ; le logo garde son bleu exact `#000080` (`public/logo.svg`, `logo-white.svg`). Système visuel : `maquettes/luna/DESIGN.md`. Les maquettes ont chacune leur `DESIGN.md` — toute modif visuelle d'une maquette doit respecter son DESIGN.md.

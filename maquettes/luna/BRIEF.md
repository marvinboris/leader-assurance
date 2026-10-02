# Brief — maquette de refonte Leader Assurance (GPT-6 Luna)

Tu es le designer ET l'intégrateur. Produis une maquette de page d'accueil haut de gamme pour Leader Assurance.

## Contexte (à lire)
- `../../CLAUDE.md` : contexte business complet (qui, pourquoi un visiteur arrive, objectif = demandes de devis, rôle de chaque section). Respecte-le.
- `../../src/i18n/locales/fr.json` et `../../src/pages/*.jsx` : contenu réel du site actuel (textes, services, témoignages, partenaires dans Partners.jsx, chiffres dans Home.jsx : 500+ clients, 10+ ans, 15+ partenaires, 1200+ polices). Utilise ce contenu réel, pas de lorem ipsum.
- Logo : `../logo.jpg` (bleu marine). Contact : Akwa, Rue Bernabé, Douala · leaderassurance1@yahoo.fr · +237 696 41 10 12 / +237 681 80 69 75 · WhatsApp wa.me/237696411012

## Livrables (dans ce dossier uniquement)
1. `DESIGN.md` — ÉCRIT EN PREMIER. Palette (hex + rôle), typographie (Google Fonts : familles display/texte, échelle, graisses, interlignage), grille, espacements, rayons, ombres, motion, composants, do/don't. Garde le bleu marine de marque (#0d1b5e) comme ancre ; choisis le reste librement. N'utilise pas Inter, Poppins, Roboto.
2. `index.html` — fichier unique, Tailwind via CDN (`<script src="https://cdn.tailwindcss.com"></script>` avec `tailwind.config` inline reprenant les tokens de DESIGN.md), Google Fonts, JS vanilla minimal. Chemins relatifs (`../logo.jpg`). Images : Unsplash (`https://images.unsplash.com/photo-...?w=1600&q=80`) uniquement si tu es sûr de l'ID, sinon compositions typographiques/graphiques CSS/SVG.
3. Le code doit utiliser strictement les tokens de DESIGN.md.

## Sections (rôle → conversion)
Nav (logo, liens, CTA devis) · Hero (promesse : courtier indépendant qui compare plusieurs assureurs pour vous ; CTA devis + WhatsApp) · Solutions particuliers vs entreprises · Notre différence (indépendance, multi-compagnies, analyse des risques, assistance sinistre) · Preuve (chiffres, partenaires, témoignages) · Mini calculateur/demande de devis (type d'assurance, nom, téléphone → bouton qui ouvre WhatsApp avec message prérempli) · CTA final + contact + footer.

## Interdits (anti-slop IA)
Hero centré + 2 boutons + grille de 3 cartes à icône ; toutes les sections identiques en hauteur/structure ; dégradés violet/bleu ; glassmorphism partout ; emojis ; tout en rounded-2xl ; bandeau "Trusted by" gris ; fond crème/off-white par défaut sans raison. Vise une composition éditoriale, asymétrique, une hiérarchie typographique forte, un seul accent, des détails réels (Douala, noms des partenaires, numéros).

## Qualité
Responsive 375 / 768 / 1440 sans débordement horizontal. Contraste AA, alt sur images, focus visibles, `lang="fr"`. Animations sobres (IntersectionObserver), respect de `prefers-reduced-motion`. Un petit badge discret en bas : « Maquette A — GPT-6 Luna ».

Ne pose aucune question. Termine par la liste des fichiers écrits.

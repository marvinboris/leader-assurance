# Brief commun — pages intérieures (GPT-6 Luna)

Le client a validé ta page d'accueil `index.html`. Tu dessines maintenant **une** page intérieure du même site, sous forme de maquette HTML statique. La page à faire est indiquée dans la consigne.

## Règles
1. Relis `DESIGN.md` et `index.html`. Utilise **strictement** les mêmes tokens. Le `<head>` (fonts, Tailwind CDN, `tailwind.config`, `<style>`) est repris à l'identique depuis index.html.
2. Copie **à l'identique** les blocs `SHELL:HEADER`, `SHELL:FOOTER` et `SHELL:SCRIPT` de index.html, avec leurs commentaires. La page active est indiquée via `aria-current`.
3. Le contenu est **réel** : lis `../../CLAUDE.md` (objectif : obtenir des demandes de devis), la page React correspondante dans `../../src/pages/` et `../../src/i18n/locales/fr.json`. Garde **toutes** les fonctionnalités de la page React (accordéon, recherche, filtres, formulaire, carte, etc.) et leurs contenus. Tu peux les réorganiser et les améliorer, mais tu n'en supprimes aucune.
4. Ne crée aucun nouveau token. Si un composant manque, construis-le avec les tokens existants et **décris-le** dans un fichier `DESIGN-<page>.md`. **Ne modifie pas DESIGN.md**, car d'autres pages sont dessinées en parallèle.
5. Les règles anti-slop de la maquette d'accueil s'appliquent toujours : composition éditoriale, chaque page a son propre rythme (pas de copie de la structure de l'accueil), pas de grille de cartes à icône générique, pas d'emojis.
6. Responsive 375 / 768 / 1440 sans débordement horizontal. Contraste AA, focus visibles, `lang="fr"`, `prefers-reduced-motion` respecté. Pour les images Unsplash, utilise uniquement des ID que tu connais avec certitude, sinon une composition CSS/SVG.
7. Badge discret « Maquette A — GPT-6 Luna » comme sur l'accueil.
8. N'écris **que** le fichier de ta page (et éventuellement `DESIGN-<page>.md`). Ne touche à aucun autre fichier.

Ne pose aucune question. Termine par la liste des fichiers écrits.

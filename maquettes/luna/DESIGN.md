# Leader Assurance — système visuel

/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */

## Intention

Une page de courtage qui se lit comme un conseil clair : une promesse éditoriale, deux parcours distincts, puis des preuves concrètes et une demande de devis simple. Le bleu marine de Leader Assurance reste l’ancre ; l’or signale l’action et les détails de confiance. Douala est présent dans les coordonnées et dans la voix, sans décor touristique.

## Palette

| Token | Hex | Rôle |
|---|---|---|
| `ink` | `#0D1B5E` | Bleu marine du système, titres sur fond clair et fonds de structure |
| `ink-deep` | `#08133F` | Fond profond du hero et du footer |
| `ink-soft` | `#24366F` | Surfaces marines et texte secondaire sur fond sombre |
| `logo` | `#000080` | Bleu exact du logo, réservé au logo dans l’en-tête et le pied de page |
| `gold` | `#C99A3B` | Accent unique, appels à l’action, filets et repères |
| `gold-pale` | `#F4E9CF` | Fond doux derrière l’accent et pastilles |
| `paper` | `#FFFFFF` | Fond principal, pour une lecture nette et clinique |
| `mist` | `#F3F5F8` | Alternance de section froide, sans effet crème |
| `line` | `#DCE1EA` | Bordures et séparateurs |
| `body` | `#27314D` | Texte courant |
| `muted` | `#65708A` | Légendes et informations secondaires |
| `white` | `#FFFFFF` | Texte sur surfaces marines |
| `focus` | `#F2BE55` | Anneau de focus visible sur clair et sombre |
| `error` | `#B42318` | Erreurs de validation, texte et bordure distincts du focus |

## Typographie

Google Fonts : **DM Serif Display** pour les titres éditoriaux ; **Manrope** pour l’interface et les textes. Les titres restent droits, jamais italiques.

| Échelle | Taille | Graisse | Interlignage | Usage |
|---|---:|---:|---:|---|
| Display | `clamp(3rem, 6.6vw, 6.75rem)` | 400 | 0.98 | Titre du hero |
| H1 section | `clamp(2.25rem, 4vw, 3.5rem)` | 400 | 1.05 | Titres de section |
| H2 | `1.5rem` | 700 | 1.2 | Titres de blocs |
| Lead | `1.25rem` | 400–500 | 1.55 | Introduction et promesse |
| Body | `1rem` | 400 | 1.7 | Texte courant |
| Small | `0.875rem` | 500 | 1.5 | Navigation, aides, légendes |
| Micro | `0.75rem` | 700 | 1.4 | Sur-titres et repères |

Les tailles de titres Tailwind utilisées en complément sont `text-2xl: 1.5rem`, `text-3xl: 1.875rem`, `text-4xl: 2.25rem` et `text-5xl: 3rem`, toutes en DM Serif Display avec interlignages de 1.2, 1.2, 1.1 et 1.1. Les corps d’interface `text-base` utilisent Manrope `1rem/1.5`.

## Grille et espace

- Conteneur centré, largeur maximale `82rem`, gouttière fluide `clamp(1.25rem, 5vw, 5rem)`.
- Grille de 12 colonnes à partir de 1024 px ; hero en 7/5, preuve et formulaire en colonnes asymétriques.
- À 768 px, les colonnes éditoriales passent à deux colonnes ou une colonne selon leur contenu ; à 375 px, tous les parcours sont en une colonne.
- Échelle d’espacement : `4`, `8`, `12`, `16`, `24`, `32`, `48`, `64`, `88`, `112` px (`space-1` à `space-10`). Les sections utilisent surtout `space-8` à `space-10`.
- Repères additionnels de l’échelle : `space-5: 20px` et `space-7: 28px` pour les champs, les menus et les citations.
- Largeurs de lecture : `11ch` pour le titre du hero, `10ch` pour un titre de section, `xs` (20rem), `sm` (24rem), `md` (28rem), `lg` (32rem), `2xl` (42rem), `3xl` (48rem) et `site` (82rem).
- Hauteurs de composition : navigation `5.25rem`, hero `42rem` sur petit écran et `46rem` à partir du breakpoint desktop ; repère graphique latéral `23rem`.

## Rayons, bordures et ombres

- `radius-sm: 4px` pour les petits contrôles ; `radius-md: 10px` pour champs et blocs ; `radius-lg: 18px` pour panneaux ; `radius-pill: 999px` réservé aux étiquettes.
- Bordure standard `1px solid line`, filets éditoriaux `1px solid` avec `gold` ou `ink`.
- Ombre `shadow-card: 0 16px 44px rgba(8, 19, 63, .09)` ; `shadow-float: 0 24px 64px rgba(8, 19, 63, .18)`. Utilisation rare, uniquement pour décoller le formulaire.

## Motion

Les entrées de section utilisent une apparition d’opacité et un déplacement vertical maximal de 12 px, durée 500 ms, courbe `cubic-bezier(.2,.7,.2,1)`. Aucun compteur animé ni mouvement en boucle. Les boutons changent de couleur en 160 ms. `prefers-reduced-motion: reduce` supprime les déplacements et transitions non essentielles.

## Composants

- **Navigation** : bandeau blanc, logo réel, liens sobres, bouton devis or ; menu repliable accessible sur mobile.
- **Shell multi-page** : navigation complète vers Accueil, À propos, Nos solutions, Partenaires, Actualités, FAQ et Contact ; liens compacts sous 1280 px, CTA devis or vers `contact.html#devis`, sélecteur clavier FR / EN / ES / AR / 中文. Le menu mobile expose les liens et le sélecteur de langue, annonce son état avec `aria-expanded` et se ferme avec Échap. Le script détermine la page active depuis le nom du fichier et pose `aria-current="page"`.
- **Pied de page global** : logo, phrase de présentation, liens des pages et de confidentialité, adresse d’Akwa, e-mail, deux numéros et WhatsApp ; signature « © Leader Assurance SARL ».
- **Bouton principal** : fond or, texte marine, rayon 4 px, hauteur 52 px, libellé sur une ligne, flèche typographique ; variante marine sur fonds clairs. Pression : translation verticale de 1 px ; disabled : attribut natif, opacité 55 % et curseur interdit.
- **Bouton secondaire** : contour blanc dans le hero, contour marine ailleurs.
- **Sur-titre** : petites capitales Manrope, espacement de lettres, accent or.
- **Parcours particuliers / entreprises** : deux panneaux inégaux avec listes de garanties en texte, sans pictogrammes décoratifs.
- **Partenaires** : noms composés en typographie dans une grille ouverte ; aucun faux logo.
- **Témoignages** : citations réelles attribuées, séparées par un filet, sans étoiles ni notation inventée.
- **Formulaire devis** : sélecteur, nom et téléphone ; champs nommés, labels visibles, validation native ; envoi par lien WhatsApp prérempli.
- **Focus** : anneau `focus` de 3 px, jamais masqué.
- **Superpositions** : blanc à 85%, 80%, 75%, 70%, 65%, 60%, 55%, 25%, 20%, 15% et 10% d’opacité pour les textes et filets sur fond marine ; marine profond à 93%, 90% et 48% pour la photographie du hero.

## Do / Don’t

**Do** : faire de l’indépendance du courtier la première information ; montrer les noms des compagnies et l’adresse d’Akwa ; conserver de grands espaces et des lignes éditoriales ; rendre chaque CTA immédiatement compréhensible.

**Don’t** : centrer le hero ; empiler trois cartes identiques ; inventer un logo partenaire, un avis ou une statistique ; faire un fond crème ; utiliser des dégradés bleu-violet, des emojis, des icônes à répétition ou des surfaces vitrées ; arrondir chaque élément ; écrire du texte en capitales longues.

## Contrat de tokens

`index.html` reprend les couleurs, familles, échelle, rayons, ombres et espacements ci-dessus dans la configuration Tailwind inline. Les règles CSS personnalisées utilisent exclusivement les variables déclarées à partir de ces valeurs. Aucune valeur visuelle ne doit être improvisée dans les composants.

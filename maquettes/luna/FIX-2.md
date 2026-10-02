# Corrections 2 — retours du client

Ne modifie que `index.html` (et `DESIGN.md` si tu ajoutes un composant). Garde les marqueurs SHELL. Respecte strictement les tokens de DESIGN.md.

## 1. Bouton de langue (bloc SHELL:HEADER et son CSS)
Le client trouve ce bouton étrange, et à raison :
- « FR » est collé en haut de la boîte au lieu d'être centré verticalement, car `<summary>` reste en `display: list-item` ;
- le chevron `⌄` est minuscule et décalé vers le bas ;
- la boîte est plus petite que le bouton « Demander un devis » à côté, et l'ensemble paraît bancal.

Refais ce déclencheur pour qu'il soit élégant et bien aligné : `inline-flex`, centrage vertical, même hauteur que le CTA. Choisis un vrai indicateur, comme un chevron SVG de 12 px qui pivote à l'ouverture, ou une icône globe SVG suivie de « FR ». Garde un focus visible et un `aria-label`. Dans la liste, donne un libellé complet à « 中文 » (« 中文 · ZH ») pour qu'il ressemble aux autres. Le même composant sert dans `.shell-mobile-controls`.

## 2. Calculateur de devis (la fonctionnalité manquait)
Le site actuel a un **calculateur d'estimation** sur la page d'accueil (`../../src/pages/Home.jsx`, fonction `QuoteCalculator`, textes `calculator.*` et `home.calculatorOptions` dans fr.json). Ta section devis l'a remplacé par un simple formulaire, il faut le réintégrer.

Transforme la section de devis de l'accueil en **calculateur + demande de devis**, avec le même parcours :
- champs : type d'assurance (8 options), âge, nombre d'employés, niveau de couverture (Basique / Standard / Premium, sous forme de choix segmenté accessible) ;
- n'affiche « Nombre d'employés » que pour les types entreprise, responsabilité, employés et actifs ; n'affiche « Âge » que pour les autres types ;
- **formule identique au code React** (ne la change pas) :
  base = {sante:15000, vie:20000, voyage:8000, epargne:25000, entreprise:50000, responsabilite:30000, employes:20000, actifs:35000}, à défaut 20000 ;
  couverture = {basic:.7, standard:1, premium:1.5} ;
  âge > 50 → ×1.4, âge > 35 → ×1.2, sinon ×1 ;
  employés → ×max(1, employés/10) ;
  prix = arrondi(base × couverture × âge × employés) ;
- résultat : « Estimation mensuelle » mis en valeur, en FCFA avec séparateur de milliers (`Intl.NumberFormat('fr-FR')`), suivi de la mention « Cette estimation est indicative. Contactez-nous pour un devis personnalisé. » ;
- puis l'étape de conversion : nom et téléphone, et le bouton « Demander un devis personnalisé ». Il ouvre WhatsApp (wa.me/237696411012) avec un message prérempli contenant le type, le niveau, l'âge ou le nombre d'employés, et l'estimation ;
- validation accessible, avec erreurs annoncées (`role="alert"`, `aria-invalid`, couleur `error`). Le résultat est annoncé par `aria-live="polite"`.

Garde l'esprit éditorial de la section : la colonne de gauche explique, la carte de droite contient l'outil. L'estimation doit être le moment fort visuel.

Ne pose aucune question. Termine par la liste des modifications.

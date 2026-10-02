# Composants globaux — compléments de design

La planche ajoute une représentation statique de composants globaux absents de `DESIGN.md` :

- **Assistant** : panneau blanc bordé, en-tête marine, fil de conversation sur `mist`, bulles contrastées, réponses rapides au contour `line`, champ standard et bouton flottant marine. Le contenu reprend les textes français de `ChatAssistant.jsx` et `fr.json`.
- **Consentement cookies** : bandeau `ink-deep`, texte blanc secondaire, lien `focus` et choix Refuser / Accepter. Le panneau se replie verticalement sur petit écran. Les libellés viennent de `CookieBanner.jsx` et `fr.json`.
- **Aperçu RTL** : extrait de hero en arabe avec `dir="rtl"` et `lang="ar"`. En-tête et actions suivent le sens de lecture arabe.
- **États** : démonstration du survol, du focus `focus`, de l’indisponibilité et de l’erreur au moyen des tokens existants ; l’erreur utilise le filet or et un libellé explicite.

Aucun nouveau token ni asset n’est ajouté.

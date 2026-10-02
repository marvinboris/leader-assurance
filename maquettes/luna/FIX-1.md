# Corrections — revue de Claude (captures 1440 / 1024 / 375)

Ne modifie que `index.html` et `composants.html`. Les autres pages recevront ensuite ton en-tête corrigé, recopié automatiquement grâce aux marqueurs SHELL. Ne change pas ces marqueurs.

## 1. En-tête (`index.html`, bloc SHELL:HEADER, son CSS et SHELL:SCRIPT)
À 1440 px, on voit actuellement :
- **deux sélecteurs « FR »** : celui de `.shell-mobile-controls` apparaît à côté du logo alors qu'il devrait être masqué sur desktop ;
- le menu **« Pages ⌄ »** apparaît en même temps que les 7 liens, ce qui fait doublon. Il ne doit exister qu'à la largeur intermédiaire où les liens ne tiennent pas, et jamais en même temps que les liens ;
- un **triangle ▶** de `<summary>` visible avant « FR » et « Pages ». Supprime-le : `list-style:none` et `::-webkit-details-marker{display:none}`.

Résultat attendu, sans aucun chevauchement à chaque largeur :
- ≥ 1280 : logo · 7 liens · un seul sélecteur de langue · CTA ;
- largeur intermédiaire : logo · « Pages » · langue · CTA ;
- mobile (< 768) : logo · Menu · langue.

## 2. Mots coupés en plein milieu
`.display-title` et `.section-title` ont `overflow-wrap: anywhere`, ce qui produit « indépendan / t. » (partenaires) et « coordonné / es. » (contact). Remplace par une règle qui ne coupe jamais un mot au milieu, par exemple `overflow-wrap: normal; hyphens: manual;`, en ajustant si besoin le `clamp()` pour qu'aucun mot ne déborde à 375 px. Dans `index.html`, la règle est dans `<style>` : donne exactement les deux lignes CSS finales dans ta réponse pour que je puisse les reporter dans les autres pages.

## 3. `composants.html` — état d'erreur
Le champ « Erreur » a la même bordure or que le champ « Focus ». Une erreur doit se reconnaître sans dépendre de la couleur seule et rester conforme AA : utilise une couleur d'erreur distincte, une icône ou un préfixe « Erreur : », et `aria-invalid`. Si tu ajoutes une couleur d'erreur, ajoute-la à `DESIGN.md` (palette, rôle : erreur).

Ne pose aucune question. Termine par la liste des modifications et les deux lignes CSS du point 2.

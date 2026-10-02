# Brief — en-tête et pied de page complets (GPT-6 Luna)

La page d'accueil `index.html` (ta maquette, validée par le client) va devenir un site complet de plusieurs pages. Mets à jour **uniquement l'en-tête, le menu mobile et le pied de page** de `index.html`. Ne change rien d'autre dans la page. Respecte strictement `DESIGN.md`. Si tu ajoutes un composant, documente-le dans la section composants de DESIGN.md.

## Navigation (pages du site, fichiers voisins)
Accueil `index.html` · À propos `a-propos.html` · Nos solutions `solutions.html` · Partenaires `partenaires.html` · Actualités `actualites.html` · FAQ `faq.html` · Contact `contact.html` · CTA « Demander un devis » → `contact.html#devis`.
- 7 liens + CTA : trouve une composition qui reste élégante à 1440 px et à 1024 px (par ex. une nav compacte, ou un regroupement). Mets en évidence le lien de la page active avec `aria-current="page"`.
- **Sélecteur de langue** : FR, EN, ES, AR, 中文. C'est une maquette : le menu s'ouvre et ferme, sans traduction réelle. Il doit être accessible au clavier.
- Menu mobile : accessible (aria-expanded, Échap pour fermer), il contient aussi le sélecteur de langue.

## Pied de page
Logo, une phrase, les liens des pages, la page `confidentialite.html` (Politique de confidentialité), les coordonnées (Akwa, Rue Bernabé, Douala · leaderassurance1@yahoo.fr · +237 696 41 10 12 / +237 681 80 69 75 · WhatsApp), © Leader Assurance SARL.

## Contrainte
Ces deux blocs seront **copiés tels quels** dans 9 autres pages. Encadre-les avec les commentaires `<!-- SHELL:HEADER START -->` / `<!-- SHELL:HEADER END -->` et `<!-- SHELL:FOOTER START -->` / `<!-- SHELL:FOOTER END -->`. Mets le JS qui les fait marcher dans un bloc `<script>` encadré par `<!-- SHELL:SCRIPT START -->` / `<!-- SHELL:SCRIPT END -->`. Ce script doit fonctionner sur n'importe quelle page.

Ne pose aucune question. Termine par la liste des modifications.

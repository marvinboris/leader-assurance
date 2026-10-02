# DESIGN.md — Maquette B « Le Registre » (opus-design)

Concept : un courtier indépendant compare. La page emprunte au **registre / tableau comparatif** d'un cabinet : filets fins, colonnes numérotées, chiffres en mono, une ligne « retenue » surlignée. Sérieux d'un document financier, chaleur par la typo serif et les vraies personnes / lieux (Douala).

## Palette (seules couleurs autorisées)
| Token | Hex | Rôle |
|---|---|---|
| `ink` | `#0b1433` | texte principal, fonds sombres profonds |
| `navy` | `#0d1b5e` | marque, sections sombres, boutons primaires |
| `navy-2` | `#1a2a78` | survol primaire, filets sur fond sombre |
| `paper` | `#f3f5fa` | fond principal (blanc froid bleuté — **jamais crème**) |
| `sheet` | `#ffffff` | surfaces « fiche » |
| `rule` | `#d5dbe8` | filets, bordures sur clair |
| `muted` | `#5b6684` | texte secondaire (AA sur paper : 5.6:1) |
| `gold` | `#f2b233` | accent unique : ligne retenue, soulignement, CTA sur fond sombre |
| `gold-ink` | `#7a5200` | texte or sur clair (AA) |
| `wa` | `#1f8f4e` | uniquement l'icône/label WhatsApp |

Règle : 1 accent (gold) par écran, jamais en dégradé. Pas de violet, pas de glass.

## Typographie (Google Fonts)
- Display : **Newsreader** (opsz, 400/500, italique pour l'emphase) — titres.
- Texte/UI : **Hanken Grotesk** 400/500/600.
- Chiffres/étiquettes : **JetBrains Mono** 400/500, uppercase, tracking +0.08em, 11–12px.
- Échelle : 12 / 14 / 16 / 18 / 22 / 30 / 44 / 64 / 96 (clamp pour hero : `clamp(44px, 7vw, 104px)`).
- Interlignage : titres 0.98–1.05, texte 1.6. Tracking titres −0.02em.

## Grille & espace
- Conteneur 1280px, padding 24px (mobile) / 40px (desktop). Grille 12 colonnes, gouttière 24px.
- Espacements : 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 112. Sections : 72 (mobile) / 112 (desktop) — rythme volontairement variable (certaines sections collées par un filet, sans padding).
- Rayons : 0 par défaut (document). 2px sur champs/boutons. Pas de `rounded-2xl`.
- Ombres : aucune ombre floue. Seul effet de profondeur : `box-shadow: 6px 6px 0 #0d1b5e` sur la fiche devis.
- Filets 1px `rule` ; numérotation de section en mono (`§ 01`).

## Motion
- Entrée au scroll : opacity 0→1 + translateY 12px, 500ms, `cubic-bezier(.2,.7,.2,1)`, une fois.
- Hero : les lignes du registre apparaissent en cascade (60ms), puis la ligne retenue se surligne or (barre qui s'étend, 600ms).
- Survol liens : soulignement or qui grandit de gauche à droite (200ms).
- `prefers-reduced-motion` : tout statique.
- Ne bouge pas : chiffres (pas de CountUp), logos, texte courant.

## Composants
- **Bouton primaire** : fond navy, texte blanc, 2px radius, 14px/600, padding 14×22, flèche →. Sur fond sombre : fond gold, texte ink.
- **Bouton secondaire** : texte + soulignement or 2px.
- **WhatsApp** : bouton contour `rule`, pastille verte `wa`.
- **Ligne de registre** : grille [n° mono | nom | critère | statut], filet bas, ligne retenue = fond gold à 100% + texte ink.
- **Champs** : fond sheet, bordure rule, focus = outline 2px navy offset 2.
- **Nav** : barre claire, logo + nom en Newsreader, liens 14px, CTA primaire ; mobile = menu `<details>`.
- **Témoignage** : grande citation Newsreader italique, attribution en mono.

## Do / Don't
- ✅ Asymétrie (titres sur 7 col, notes en marge sur 3 col), chiffres réels en mono, noms réels des assureurs.
- ✅ Alternance clair (paper) / sombre (navy/ink) pour rythmer.
- ❌ Hero centré, grille de 3 cartes à icône, emojis, CountUp, dégradés, crème, glass, ombres floues.

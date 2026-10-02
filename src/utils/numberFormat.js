// Intl met une espace fine insécable (U+202F) en séparateur de milliers (fr) : Manrope / DM Serif ne l'ont pas
// et le rendu devient « 1200 ». On la remplace par une espace insécable classique (U+00A0).
export default function numberFormat(lang, options) {
  const f = new Intl.NumberFormat(lang, options)
  return { format: n => f.format(n).replace(/\u202f/g, '\u00a0') }
}

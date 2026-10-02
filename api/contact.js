// Fonction serverless Vercel : POST /api/contact → e-mail via Resend.
// Variables d'environnement (Vercel) :
//   RESEND_API_KEY  (obligatoire, secrète)
//   RESEND_FROM     ex. "Leader Assurance <contact@leader-assurconseil.com>" (domaine vérifié dans Resend)
//   CONTACT_TO      destinataire, par défaut leaderassurance1@yahoo.fr

const LIMITS = { name: 100, email: 200, phone: 40, subject: 60, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Une seule ligne, sans caractères de contrôle (évite l'injection d'en-têtes dans le sujet).
const oneLine = v => String(v ?? '').replace(/[\r\n\t\u0000-\u001f]+/g, ' ').trim()

/**
 * @param {unknown} body
 * @returns {{ ok: true, data: Record<string, string> } | { ok: false, error: string }}
 */
export function validate(body) {
  if (!body || typeof body !== 'object') return { ok: false, error: 'invalid_body' }
  const data = {
    name: oneLine(body.name),
    email: oneLine(body.email),
    phone: oneLine(body.phone),
    subject: oneLine(body.subject),
    message: String(body.message ?? '').trim(),
  }
  if (oneLine(body.website)) return { ok: false, error: 'spam' } // champ piège invisible
  if (!data.name || !data.email || !data.message) return { ok: false, error: 'missing_fields' }
  if (!EMAIL_RE.test(data.email)) return { ok: false, error: 'invalid_email' }
  for (const [k, max] of Object.entries(LIMITS)) {
    if (data[k].length > max) return { ok: false, error: 'too_long' }
  }
  return { ok: true, data }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'method_not_allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY manquante')
    return res.status(500).json({ success: false, error: 'not_configured' })
  }

  const result = validate(req.body)
  if (!result.ok) {
    // Le piège anti-spam répond « succès » pour ne rien apprendre au robot.
    if (result.error === 'spam') return res.status(200).json({ success: true })
    return res.status(400).json({ success: false, error: result.error })
  }

  const { name, email, phone, subject, message } = result.data
  const text = [
    `Nom : ${name}`,
    `E-mail : ${email}`,
    `Téléphone : ${phone || '—'}`,
    `Sujet : ${subject || '—'}`,
    '',
    message,
    '',
    '— Envoyé depuis le formulaire de contact du site Leader Assurance',
  ].join('\n')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Leader Assurance <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO || 'leaderassurance1@yahoo.fr'],
        reply_to: email,
        subject: `Site web — ${subject || 'Nouveau message'} — ${name}`,
        text,
      }),
    })
    if (!r.ok) {
      console.error('[contact] Resend a refusé l’envoi', r.status, await r.text())
      return res.status(502).json({ success: false, error: 'send_failed' })
    }
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[contact] Erreur réseau vers Resend', err)
    return res.status(502).json({ success: false, error: 'send_failed' })
  }
}

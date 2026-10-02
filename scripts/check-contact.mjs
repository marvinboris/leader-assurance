// Vérification rapide du validateur du formulaire : node scripts/check-contact.mjs
import assert from 'node:assert/strict'
import { validate } from '../api/contact.js'

const err = b => { const r = validate(b); return r.ok ? 'ok' : r.error }
assert.equal(err({ name: 'A', email: 'a@b.co', message: 'hi' }), 'ok')
assert.equal(err({ name: '', email: 'a@b.co', message: 'hi' }), 'missing_fields')
assert.equal(err({ name: 'A', email: 'nope', message: 'hi' }), 'invalid_email')
assert.equal(err({ name: 'A', email: 'a@b.co', message: 'x'.repeat(5001) }), 'too_long')
assert.equal(err({ name: 'A', email: 'a@b.co', message: 'hi', website: 'http://spam' }), 'spam')
assert.equal(err(null), 'invalid_body')
assert.ok(!validate({ name: 'A\r\nBcc: x@y.z', email: 'a@b.co', message: 'hi' }).data.name.includes('\n'))
console.log('contact validator: OK')

// Saves a form submission to the backend (Supabase, via the Cloudflare
// Worker). Resolves with `{ ok, notified }` — `notified` is true when the
// Worker has already emailed the team. Throws on failure, with the server's
// own message when it sent one (validation, rate limit, etc.).
export async function submitMessage(payload) {
  const apiUrl = import.meta.env.VITE_API_URL
  if (!apiUrl) throw new Error('VITE_API_URL is not configured')

  const res = await fetch(`${apiUrl}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ website: '', ...payload }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    const err = new Error(data.error || `Request failed with status ${res.status}`)
    err.status = res.status
    throw err
  }

  return res.json()
}

// Fallback notification straight from the browser. Only used when the Worker
// didn't email the team itself — loaded on demand so the EmailJS SDK stays
// out of the bundle for the normal path.
async function sendFallbackEmail(payload) {
  const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
  const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  if (!serviceId || !templateId || !publicKey) throw new Error('EmailJS is not configured')

  const { default: emailjs } = await import('@emailjs/browser')
  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name:  payload.name,
      from_email: payload.email,
      phone:      payload.phone    || 'N/A',
      company:    payload.company  || 'N/A',
      service:    payload.service  || 'N/A',
      budget:     payload.budget   || 'N/A',
      timeline:   payload.timeline || 'N/A',
      message:    payload.message,
    },
    publicKey,
  )
}

// The one path both forms use. A lead counts as delivered once it is either
// saved or emailed; it only fails when both routes fail.
//
//   1. Honeypot filled  -> report success, send nothing.
//   2. Save via Worker  -> if the Worker also emailed the team, done.
//   3. Otherwise        -> email from the browser as a fallback.
//
// A rejection the visitor can act on (bad input, rate limit) is surfaced
// as-is rather than papered over by the email fallback.
export async function sendLead(payload) {
  if (payload.website) return

  let saved = false
  try {
    const result = await submitMessage(payload)
    saved = true
    if (result.notified) return
  } catch (err) {
    if (err.status === 400 || err.status === 429) throw err
  }

  try {
    await sendFallbackEmail(payload)
  } catch (err) {
    if (!saved) throw new Error('We could not send your message. Please try again, or reach us on WhatsApp.', { cause: err })
  }
}

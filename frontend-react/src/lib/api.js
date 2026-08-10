// Saves a form submission to the backend (Supabase, via the Cloudflare
// Worker). Throws on failure so callers can fall back to their own
// success/error handling — e.g. still showing success if EmailJS worked
// even when the backend save failed.
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
    throw new Error(data.error || `Request failed with status ${res.status}`)
  }

  return res.json()
}

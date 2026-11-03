// Keeps an unfinished form on this device, so a dropped connection, a closed
// tab, or a phone call mid-way doesn't cost the visitor what they typed.
//
// Stored in localStorage under one key per form; cleared once the form is
// sent. Never stores the honeypot field. Fails silently where storage is
// unavailable (some private-browsing modes) — the form simply works as before.

const PREFIX = 'snc_draft_'
const SKIP = new Set(['website'])

export function loadDraft(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : undefined
  } catch {
    return undefined
  }
}

export function saveDraft(key, values) {
  try {
    const kept = Object.fromEntries(Object.entries(values).filter(([k, v]) => !SKIP.has(k) && v))
    if (Object.keys(kept).length) localStorage.setItem(PREFIX + key, JSON.stringify(kept))
    else localStorage.removeItem(PREFIX + key)
  } catch {
    // Storage full or blocked — nothing to do.
  }
}

export function clearDraft(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // Nothing to clear.
  }
}

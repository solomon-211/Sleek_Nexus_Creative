// Emails the team when a form submission is saved, via Resend's HTTP API
// (plain fetch — no SDK, so nothing extra ships in the Worker bundle).
//
// Sending from the Worker rather than the browser means the notification
// goes through the same validation, honeypot, and rate limit as the insert,
// and no email credentials are exposed to the frontend.
//
// Returns true only when Resend accepted the email. Never throws — the
// submission is already saved by the time this runs, so a notification
// failure must not turn a saved lead into an error for the visitor.

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const FORM_LABELS = {
  contact:     'Contact form',
  get_started: 'Project brief',
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function isNotifyConfigured(env) {
  return Boolean(env.RESEND_API_KEY && env.NOTIFY_TO && env.NOTIFY_FROM)
}

export function buildEmail(submission) {
  const { type, name, email, phone, company, service, budget, timeline, message } = submission
  const label = FORM_LABELS[type] || 'Website form'

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone],
    ['Organization', company],
    ['Service', service],
    ['Budget', budget],
    ['Timeline', timeline],
  ].filter(([, value]) => value)

  const text = [
    `${label} — new submission`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    message,
  ].join('\n')

  // Brand palette only: navy #233D4D, orange #FE7F2D, grey #EAECF0.
  const html = `
<div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#233D4D">
  <div style="background:#233D4D;border-bottom:4px solid #FE7F2D;padding:20px 24px">
    <p style="margin:0;color:#FE7F2D;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase">${escapeHtml(label)}</p>
    <p style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:800">New message from ${escapeHtml(name)}</p>
  </div>
  <div style="border:1px solid #EAECF0;border-top:0;padding:24px">
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:rgba(35,61,77,0.65);white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`).join('\n      ')}
    </table>
    <div style="margin-top:16px;padding:16px;background:#EAECF0;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
    <p style="margin:16px 0 0;font-size:12px;color:rgba(35,61,77,0.65)">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
  </div>
</div>`.trim()

  return {
    subject: `${label}: ${name}${service ? ` — ${service}` : ''}`,
    text,
    html,
  }
}

export async function notifyTeam(env, submission, fetchImpl = fetch) {
  if (!isNotifyConfigured(env)) return false

  const { subject, text, html } = buildEmail(submission)

  try {
    const res = await fetchImpl(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.NOTIFY_FROM,
        to: env.NOTIFY_TO.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: submission.email,
        subject,
        text,
        html,
      }),
    })

    if (!res.ok) {
      console.error('Resend rejected notification:', res.status, await res.text().catch(() => ''))
      return false
    }
    return true
  } catch (err) {
    console.error('Notification email failed:', err)
    return false
  }
}

/**
 * Email Service — Sleek Nexus Creative
 * Supports SendGrid (production) and SMTP (development/staging).
 * All outbound emails use the SNC brand identity.
 */

const nodemailer = require('nodemailer')

const BRAND = {
  name:    'Sleek Nexus Creative',
  short:   'SNC',
  color:   '#0284c7',          // brand-600
  website: process.env.FRONTEND_URL || 'https://snc.ss',
  phone:   '+211 000 000 000',
  address: 'Juba, South Sudan',
}

/* ── Transporter factory ── */
let _transporter = null

function getTransporter() {
  if (_transporter) return _transporter

  if (process.env.SENDGRID_API_KEY) {
    _transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY },
    })
  } else {
    _transporter = nodemailer.createTransport({
      host:   process.env.EMAIL_HOST || 'smtp.gmail.com',
      port:   parseInt(process.env.EMAIL_PORT, 10) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  }

  return _transporter
}

/* ── Shared HTML wrapper ── */
function wrapHtml(bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${BRAND.name}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">

          <!-- Header -->
          <tr>
            <td style="background:${BRAND.color};padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">
                      Sleek<span style="opacity:.85;">Nexus</span>
                    </span>
                    <span style="color:rgba(255,255,255,.6);font-size:11px;display:block;margin-top:2px;letter-spacing:.05em;text-transform:uppercase;">
                      Creative
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9;padding:20px 32px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                ${BRAND.name} &bull; ${BRAND.address}<br />
                <a href="${BRAND.website}" style="color:${BRAND.color};text-decoration:none;">${BRAND.website}</a>
                &nbsp;&bull;&nbsp;
                <a href="mailto:hello@snc.ss" style="color:${BRAND.color};text-decoration:none;">hello@snc.ss</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/* ── Core send function ── */
exports.sendEmail = async ({ to, subject, html, text, attachments }) => {
  const transporter = getTransporter()

  const info = await transporter.sendMail({
    from:        `"${BRAND.name}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html:        html ? wrapHtml(html) : undefined,
    attachments,
  })

  console.log(`[EMAIL] Sent to ${to} — ${info.messageId}`)
  return info
}

/* ── Contact form: admin notification ── */
exports.sendContactNotification = async (contact) => {
  const rows = [
    ['Name',     contact.name],
    ['Email',    `<a href="mailto:${contact.email}" style="color:${BRAND.color};">${contact.email}</a>`],
    ['Phone',    contact.phone   || '—'],
    ['Company',  contact.company || '—'],
    ['Service',  contact.service || '—'],
  ]

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#475569;width:110px;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;color:#1e293b;">${value}</td>
    </tr>`).join('')

  await exports.sendEmail({
    to:      process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New Enquiry: ${contact.name} — ${contact.service || 'General'}`,
    html: `
      <h2 style="margin:0 0 20px;font-size:20px;color:#0f172a;">New Contact Form Submission</h2>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;overflow:hidden;">
        ${tableRows}
      </table>
      <div style="margin-top:24px;padding:16px;background:#f0f9ff;border-left:4px solid ${BRAND.color};border-radius:0 8px 8px 0;">
        <p style="margin:0 0 8px;font-weight:600;color:#0f172a;">Message</p>
        <p style="margin:0;color:#475569;line-height:1.6;">${contact.message}</p>
      </div>
      <p style="margin-top:24px;">
        <a href="${BRAND.website}/html/admin.html"
           style="display:inline-block;background:${BRAND.color};color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          View in Admin Dashboard
        </a>
      </p>`,
  })
}

/* ── Contact form: auto-reply to sender ── */
exports.sendContactAutoReply = async (contact) => {
  await exports.sendEmail({
    to:      contact.email,
    subject: `We received your message — ${BRAND.name}`,
    html: `
      <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Thank you, ${contact.name}.</h2>
      <p style="color:#475569;line-height:1.7;margin:0 0 16px;">
        We have received your enquiry and a member of our team will respond within
        <strong style="color:#0f172a;">24–48 hours</strong>.
      </p>
      <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:0 0 24px;">
        <p style="margin:0 0 6px;font-size:13px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Your message</p>
        <p style="margin:0;color:#475569;line-height:1.6;font-size:14px;">
          ${contact.message.substring(0, 300)}${contact.message.length > 300 ? '…' : ''}
        </p>
      </div>
      <p style="color:#475569;line-height:1.7;margin:0 0 8px;">
        If you need immediate assistance, reach us at:
      </p>
      <p style="margin:0;">
        <a href="mailto:hello@snc.ss" style="color:${BRAND.color};font-weight:600;">hello@snc.ss</a>
        &nbsp;&bull;&nbsp;
        <a href="tel:${BRAND.phone.replace(/\s/g,'')}" style="color:${BRAND.color};font-weight:600;">${BRAND.phone}</a>
      </p>`,
  })
}

/* ── Newsletter welcome email ── */
exports.sendNewsletterWelcome = async ({ email, firstName }) => {
  const name = firstName || 'there'
  await exports.sendEmail({
    to:      email,
    subject: `Welcome to the ${BRAND.name} newsletter`,
    html: `
      <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Welcome, ${name}!</h2>
      <p style="color:#475569;line-height:1.7;margin:0 0 16px;">
        You are now subscribed to our monthly newsletter. Expect insights on tech trends,
        project case studies, and opportunities in South Sudan's digital economy.
      </p>
      <p style="color:#475569;line-height:1.7;margin:0 0 24px;">
        We publish once a month — no spam, ever.
      </p>
      <a href="${BRAND.website}"
         style="display:inline-block;background:${BRAND.color};color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
        Visit Our Website
      </a>`,
  })
}

/* ── Password reset email ── */
exports.sendPasswordReset = async ({ email, resetURL }) => {
  await exports.sendEmail({
    to:      email,
    subject: `Reset your ${BRAND.name} password`,
    html: `
      <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Password Reset Request</h2>
      <p style="color:#475569;line-height:1.7;margin:0 0 24px;">
        Click the button below to reset your password. This link expires in
        <strong style="color:#0f172a;">10 minutes</strong>.
      </p>
      <a href="${resetURL}"
         style="display:inline-block;background:${BRAND.color};color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
        Reset Password
      </a>
      <p style="margin-top:24px;color:#94a3b8;font-size:13px;">
        If you did not request this, you can safely ignore this email.
        Your password will not change.
      </p>`,
  })
}

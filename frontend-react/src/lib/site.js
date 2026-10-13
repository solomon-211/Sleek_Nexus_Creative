// Contact details shared across pages, so a changed number or address is a
// one-line edit instead of a hunt through every component.

export const PHONE_DISPLAY = '+211 925 277 700'
export const PHONE_E164    = '+211925277700'
export const EMAIL         = 'info@sleeknexuscreative.com'

const WHATSAPP_NUMBER = '211925277700'

// Builds a wa.me link, optionally with a pre-filled opening message.
export function whatsappUrl(text) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

// Headline numbers, shown on Home, About, and Get Started. One list, so the
// three pages can never quote different figures or word them differently.
export const companyStats = [
  { icon: 'fa-project-diagram', value: 10, suffix: '+', label: 'Projects Delivered' },
  { icon: 'fa-user-graduate',   value: 50, suffix: '+', label: 'Learners Supported' },
  { icon: 'fa-handshake',       value: 5,  suffix: '+', label: 'Partner Organizations' },
  { icon: 'fa-calendar-check',  value: 1,  suffix: '+', label: 'Years Operating' },
]

// Social profiles, shown in the footer and on the Contact page. Only add a
// profile here once it exists — and add it to the `sameAs` lists in
// index.html and src/lib/seo-data.js at the same time.
export const socials = [
  { label: 'Facebook',  icon: 'fa-facebook-f',  href: 'https://www.facebook.com/share/183ufB9mqx/?mibextid=wwXIfr' },
  { label: 'LinkedIn',  icon: 'fa-linkedin-in', href: 'https://www.linkedin.com/company/sleek-nexus-creative/' },
  { label: 'Instagram', icon: 'fa-instagram',   href: 'https://www.instagram.com/sleek_nexus_creative' },
  { label: 'WhatsApp',  icon: 'fa-whatsapp',    href: whatsappUrl() },
]

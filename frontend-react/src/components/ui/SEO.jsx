import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://sleeknexuscreative.com'
const DEFAULT_IMAGE = `${BASE_URL}/images/SNCNNNN.png`
const SITE_NAME = 'Sleek Nexus Creative'

/**
 * @param {string}  title
 * @param {string}  description
 * @param {string}  canonical      - path e.g. "/about"
 * @param {string}  image          - absolute OG image URL
 * @param {string}  imageAlt
 * @param {string}  type           - "website" | "article"
 * @param {string}  keywords
 * @param {Array}   breadcrumbs    - [{name, url}]
 * @param {Array}   faq            - [{q, a}] — renders FAQPage JSON-LD
 * @param {object}  schema         - any extra JSON-LD object
 */
export default function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  imageAlt,
  type = 'website',
  keywords,
  breadcrumbs,
  faq,
  schema,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Technology & Innovation for South Sudan`
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL
  const alt = imageAlt || title || SITE_NAME

  const breadcrumbSchema = breadcrumbs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          ...breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: b.name,
            item: `${BASE_URL}${b.url}`,
          })),
        ],
      }
    : null

  const faqSchema = faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }
    : null

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={alt} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SleekNexus" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={alt} />

      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}

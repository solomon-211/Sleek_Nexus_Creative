import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://sleeknexuscreative.com'
const DEFAULT_IMAGE = `${BASE_URL}/images/og-cover.jpg`
const SITE_NAME = 'Sleek Nexus Creative'

/**
 * SEO component — drop into any page to set title, description, OG, Twitter,
 * and optional JSON-LD structured data (breadcrumbs, article, etc.)
 *
 * @param {string}  title        - Page title (appended with site name)
 * @param {string}  description  - Meta description (max ~155 chars)
 * @param {string}  canonical    - Canonical URL path e.g. "/about/our-story"
 * @param {string}  image        - Absolute OG image URL (defaults to og-cover.jpg)
 * @param {string}  imageAlt     - Alt text for OG image
 * @param {string}  type         - OG type: "website" | "article" (default: website)
 * @param {Array}   breadcrumbs  - [{name, url}] for BreadcrumbList schema
 * @param {object}  schema       - Any extra JSON-LD object to inject
 */
export default function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  imageAlt,
  type = 'website',
  breadcrumbs,
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

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
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

      {/* Breadcrumb JSON-LD */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Extra schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}

import { ACTIVITIES_DATA, OPPORTUNITIES_DATA, SITE_CONFIG } from './data';
import { getImageAsset } from './lib/images';
import { isOpportunityOpen } from './lib/content';

// The approved production target. Align Vercel's www/apex redirect before release.
export const SITE_ORIGIN = 'https://projectluminary.org';
export interface SeoPage {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  type: 'website' | 'article';
  schemaType: 'WebPage' | 'AboutPage' | 'ContactPage';
  published?: string;
  section?: string;
  parent?: { path: string; title: string };
}

const logo = { image: '/images/logo/PL-Logo.png', imageAlt: 'Project Luminary logo', imageWidth: 1080, imageHeight: 1080 };
function photo(src: string, alt: string) {
  const asset = getImageAsset(src);
  if (!asset) throw new Error(`Missing SEO image dimensions: ${src}`);
  return { image: asset.src, imageAlt: alt, imageWidth: asset.width, imageHeight: asset.height };
}
const homeImage = photo(SITE_CONFIG.heroImage, 'Project Luminary participants in an online programme session');
const aboutImage = photo(SITE_CONFIG.aboutSummaryImage, 'Online Project Luminary session with participants and a Focus Freewriting slide');
const main = (path: string, title: string, description: string, image = logo, schemaType: SeoPage['schemaType'] = 'WebPage'): SeoPage => ({
  path, title, description, ...image, type: 'website', schemaType,
});

// These descriptions use existing page copy; pending claims and profile details
// are deliberately excluded. Detail records are derived automatically from data.ts.
export const SEO_PAGES: SeoPage[] = [
  main('/', SITE_CONFIG.brandName, SITE_CONFIG.missionDescription, homeImage),
  main('/about-us', 'About | Project Luminary', SITE_CONFIG.aboutSummaryPara2, aboutImage, 'AboutPage'),
  main('/our-work', 'Our Work | Project Luminary', 'Explore Project Luminary’s programmes, activities, and public reports on learning, research, and civic engagement.', aboutImage),
  main('/opportunities', 'Opportunities | Project Luminary', OPPORTUNITIES_DATA.some(isOpportunityOpen)
    ? 'Explore opportunities to contribute to Project Luminary and review role details and application requirements.'
    : 'Explore Project Luminary’s opportunity listings and archived role details. No opportunities are currently open.'),
  main('/contact', 'Contact | Project Luminary', 'Contact Project Luminary about collaborating, supporting our work, sharing expertise, or learning more about the initiative.', logo, 'ContactPage'),
  main('/donate-us', 'Donate Us | Project Luminary', `Support Project Luminary. ${SITE_CONFIG.missionDescription}`),
  ...ACTIVITIES_DATA.map(activity => ({
    path: `/our-work/${activity.id}`,
    title: `${activity.title} | ${SITE_CONFIG.brandName}`,
    description: activity.description,
    ...photo(activity.image, activity.image.includes('/logo/') ? 'Project Luminary logo' : activity.title),
    type: 'article' as const,
    schemaType: 'WebPage' as const,
    // Dates are displayed publication dates, not programme dates or lastmod.
    published: publicationDate(activity.date),
    section: activity.category,
    parent: { path: '/our-work', title: 'Our Work' },
  })),
  ...OPPORTUNITIES_DATA.map(opportunity => main(
    `/opportunities/${opportunity.id}`,
    `${opportunity.title}${isOpportunityOpen(opportunity) ? '' : ' (Closed)'} | ${SITE_CONFIG.brandName}`,
    isOpportunityOpen(opportunity) ? opportunity.description : `${opportunity.title} — applications closed. Archived role details for reference; this opportunity is not accepting applications.`,
  )).map(page => ({ ...page, parent: { path: '/opportunities', title: 'Opportunities' } })),
];

// Preserve every historical ID and alias. Hash migration stays in App.tsx.
export const SEO_ALIASES: Record<string, string> = {
  '/home': '/', '/activities': '/our-work', '/donate': '/donate-us',
  ...Object.fromEntries(ACTIVITIES_DATA.map(activity => [`/activities/${activity.id}`, `/our-work/${activity.id}`])),
};
export function getSeoPage(path: string): SeoPage | undefined {
  return SEO_PAGES.find(page => page.path === (SEO_ALIASES[path] || path));
}
function publicationDate(value: string): string | undefined {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const match = value.match(/^(\w+) (\d{1,2}), (\d{4})$/);
  const month = match ? months.indexOf(match[1]) : -1;
  return month < 0 ? undefined : `${match[3]}-${String(month + 1).padStart(2, '0')}-${match[2].padStart(2, '0')}`;
}
export const absoluteUrl = (path: string): string => new URL(path, SITE_ORIGIN).href;

export function structuredData(page: SeoPage) {
  const url = absoluteUrl(page.path);
  const organization = `${SITE_ORIGIN}/#organization`;
  const website = `${SITE_ORIGIN}/#website`;
  const pageId = `${url}#webpage`;
  const breadcrumbs = [
    { name: 'Home', item: absoluteUrl('/') },
    ...(page.parent ? [{ name: page.parent.title, item: absoluteUrl(page.parent.path) }] : []),
    ...(page.path === '/' ? [] : [{ name: page.title.replace(/ \| Project Luminary$/, ''), item: url }]),
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': organization, name: SITE_CONFIG.brandName, url: absoluteUrl('/'), description: SITE_CONFIG.missionDescription, logo: absoluteUrl(logo.image) },
      { '@type': 'WebSite', '@id': website, name: SITE_CONFIG.brandName, url: absoluteUrl('/'), publisher: { '@id': organization }, inLanguage: 'en' },
      { '@type': page.schemaType, '@id': pageId, url, name: page.title, description: page.description, isPartOf: { '@id': website }, inLanguage: 'en', ...(page.path === '/' ? {} : { breadcrumb: { '@id': `${url}#breadcrumb` } }) },
      ...(page.path === '/' ? [] : [{ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) }]),
      ...(page.type === 'article' ? [{ '@type': 'Article', '@id': `${url}#article`, headline: page.title.replace(/ \| Project Luminary$/, ''), description: page.description, image: absoluteUrl(page.image), mainEntityOfPage: { '@id': pageId }, publisher: { '@id': organization }, ...(page.published ? { datePublished: page.published } : {}), articleSection: page.section, inLanguage: 'en' }] : []),
    ],
  };
}

export function metaEntries(page: SeoPage): { attribute: 'name' | 'property'; key: string; content: string }[] {
  const named = {
    description: page.description,
    robots: 'index, follow',
    'twitter:card': page.imageWidth === page.imageHeight ? 'summary' : 'summary_large_image',
    'twitter:title': page.title,
    'twitter:description': page.description,
    'twitter:image': absoluteUrl(page.image),
    'twitter:image:alt': page.imageAlt,
  };
  const properties = {
    'og:site_name': SITE_CONFIG.brandName, 'og:title': page.title,
    'og:description': page.description, 'og:url': absoluteUrl(page.path), 'og:type': page.type,
    'og:image': absoluteUrl(page.image), 'og:image:secure_url': absoluteUrl(page.image),
    'og:image:type': page.image.endsWith('.webp') ? 'image/webp' : 'image/png',
    'og:image:width': String(page.imageWidth), 'og:image:height': String(page.imageHeight),
    'og:image:alt': page.imageAlt,
    ...(page.published ? { 'article:published_time': page.published } : {}),
    ...(page.section ? { 'article:section': page.section } : {}),
  };
  return [
    ...Object.entries(named).map(([key, content]) => ({ attribute: 'name' as const, key, content })),
    ...Object.entries(properties).map(([key, content]) => ({ attribute: 'property' as const, key, content })),
  ];
}

export const SEO_START = '<!-- luminary-seo:start -->';
export const SEO_END = '<!-- luminary-seo:end -->';
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
export const jsonLdText = (page: SeoPage) => JSON.stringify(structuredData(page)).replace(/</g, '\\u003c');
export function renderSeoHead(page: SeoPage): string {
  return [SEO_START, `<title>${escapeHtml(page.title)}</title>`,
    `<link rel="canonical" href="${absoluteUrl(page.path)}" data-luminary-seo />`,
    ...metaEntries(page).map(meta => `<meta ${meta.attribute}="${meta.key}" content="${escapeHtml(meta.content)}" data-luminary-seo />`),
    `<script type="application/ld+json" data-luminary-seo>${jsonLdText(page)}</script>`, SEO_END,
  ].join('\n    ');
}

// Called by the existing navigation effect, after deriving the canonical route.
// Replace owned tags and stale equivalent tags rather than accumulating metadata.
export function updateSeoHead(page: SeoPage): void {
  document.title = page.title;
  document.head.querySelectorAll('[data-luminary-seo], link[rel="canonical"], meta[name="description"], meta[name="robots"], meta[name^="twitter:"], meta[property^="og:"], meta[property^="article:"]').forEach(tag => tag.remove());
  const canonical = document.createElement('link');
  canonical.rel = 'canonical'; canonical.href = absoluteUrl(page.path); canonical.dataset.luminarySeo = '';
  document.head.appendChild(canonical);
  for (const meta of metaEntries(page)) {
    const element = document.createElement('meta');
    element.setAttribute(meta.attribute, meta.key); element.content = meta.content; element.dataset.luminarySeo = '';
    document.head.appendChild(element);
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json'; script.dataset.luminarySeo = ''; script.textContent = jsonLdText(page);
  document.head.appendChild(script);
}

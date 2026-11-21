// Run with Node 22: node scripts/check-seo.mjs
// Uses existing TypeScript; validates generated files without network requests.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { loadTypeScript } from './load-typescript.mjs';
const { SEO_PAGES, SEO_ALIASES, SITE_ORIGIN, absoluteUrl, getSeoPage, metaEntries, structuredData, renderSeoHead } = loadTypeScript('src/seo.ts');
const { seoFile, seoRewrites, validateSeoRewrites } = loadTypeScript('seo-build.ts');

const read = file => fs.readFileSync(path.join('dist', file), 'utf8');
assert.equal(SITE_ORIGIN, 'https://projectluminary.org');
assert.equal(SEO_PAGES.length, 12);
assert.equal(new Set(SEO_PAGES.map(page => page.path)).size, SEO_PAGES.length);
assert.equal(new Set(SEO_PAGES.map(page => page.title)).size, SEO_PAGES.length);
assert.equal(new Set(SEO_PAGES.map(page => page.description)).size, SEO_PAGES.length);
assert.equal(getSeoPage('/not-a-real-page'), undefined);
for (const [alias, target] of Object.entries(SEO_ALIASES)) {
  assert.equal(getSeoPage(alias)?.path, target);
  assert.ok(!SEO_PAGES.some(page => page.path === alias));
}
for (const page of SEO_PAGES) {
  const html = read(seoFile(page.path));
  assert.equal((html.match(/<title>/g) || []).length, 1);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes(`href="${absoluteUrl(page.path)}"`));
  for (const meta of metaEntries(page)) {
    assert.equal((html.match(new RegExp(`${meta.attribute}="${meta.key}"`, 'g')) || []).length, 1, `${page.path}: ${meta.key}`);
  }
  assert.equal((html.match(/type="application\/ld\+json"/g) || []).length, 1);
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)[1]);
  assert.deepEqual(graph, structuredData(page));
  assert.equal(graph['@context'], 'https://schema.org');
  const ids = graph['@graph'].map(node => node['@id']);
  assert.equal(new Set(ids).size, ids.length);
  for (const node of graph['@graph']) {
    assert.ok(node['@type'] && node['@id'].startsWith(SITE_ORIGIN));
    for (const field of ['address', 'telephone', 'aggregateRating', 'sameAs', 'author', 'dateModified']) assert.equal(node[field], undefined);
    if (node['@type'] === 'BreadcrumbList') node.itemListElement.forEach((item, index) => {
      assert.equal(item.position, index + 1);
      assert.ok(item.name && item.item.startsWith(SITE_ORIGIN));
    });
  }
  assert.equal(graph['@graph'].filter(node => node['@type'] === 'Article').length, Number(page.type === 'article'));
  assert.ok(!html.includes('JobPosting'));
  assert.ok(html.includes('<div id="root"></div>'), 'Preserve client mount and presentation');
  assert.ok(/<script type="module" crossorigin src="\/assets\//.test(html));
  assert.ok(fs.existsSync(path.join('public', page.image)), `Image missing: ${page.image}`);
  assert.ok(page.imageAlt && page.imageWidth > 0 && page.imageHeight > 0);
  assert.equal(new URL(absoluteUrl(page.image)).protocol, 'https:');
  console.log(`PASS initial HTML: ${page.path}`);
}
const sitemap = read('sitemap.xml');
assert.ok(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), SEO_PAGES.map(page => absoluteUrl(page.path)));
assert.ok(!sitemap.includes('lastmod'));
assert.equal(read('robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`);
assert.deepEqual(JSON.parse(read('seo/vercel-rewrites.proposed.json')), { rewrites: seoRewrites() });
const active = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert.deepEqual(active.rewrites, seoRewrites());
validateSeoRewrites();
assert.deepEqual(active.rewrites.at(-1), { source: '/(.*)', destination: '/index.html' });
assert.equal(active.rewrites.length, SEO_PAGES.length - 1 + Object.keys(SEO_ALIASES).length + 1);
for (const mapping of active.rewrites) assert.ok(fs.existsSync(path.join('dist', mapping.destination)));
// Exact-page rules cannot shadow static assets; Vercel checks files before rewrites.
for (const file of ['/sitemap.xml', '/robots.txt', '/favicon.png', '/assets/example.js', '/images/example.webp']) {
  assert.ok(!active.rewrites.some(mapping => mapping.source === file));
}
console.log('PASS: active Vercel mappings, generated HTML targets, legacy aliases, asset exclusions, and preserved SPA fallback.');
const escaped = renderSeoHead({ ...SEO_PAGES[0], title: '</title><script>alert("test")</script>', description: '"<&' });
assert.ok(!escaped.includes('</title><script>'));
assert.ok(escaped.includes('\\u003c/title>'));
console.log('PASS: sitemap entries, robots policy, alias canonicals, JSON-LD graph structure, absolute image URLs, and HTML/JSON escaping. No external requests.');

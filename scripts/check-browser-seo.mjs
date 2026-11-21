// Optional existing Playwright; no external requests or new dependencies.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { loadTypeScript } from './load-typescript.mjs';
const { SEO_PAGES, SEO_ALIASES, absoluteUrl, metaEntries, structuredData } = loadTypeScript('src/seo.ts');
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.PERFORMANCE_ORIGIN || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
try {
  const context = await browser.newContext();
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  async function verify(expected) {
    await page.waitForFunction(title => document.title === title, expected.title);
    const actual = await page.evaluate(() => ({
      titles: [...document.head.querySelectorAll('title')].map(tag => tag.textContent),
      canonicals: [...document.head.querySelectorAll('link[rel="canonical"]')].map(tag => tag.href),
      metas: [...document.head.querySelectorAll('meta[name],meta[property]')].map(tag => ({ attribute: tag.hasAttribute('name') ? 'name' : 'property', key: tag.getAttribute('name') || tag.getAttribute('property'), content: tag.content })),
      graphs: [...document.head.querySelectorAll('script[type="application/ld+json"]')].map(tag => JSON.parse(tag.textContent)),
    }));
    assert.deepEqual(actual.titles, [expected.title]);
    assert.deepEqual(actual.canonicals, [absoluteUrl(expected.path)]);
    for (const meta of metaEntries(expected)) assert.deepEqual(actual.metas.filter(item => item.key === meta.key), [meta]);
    assert.deepEqual(actual.graphs, [structuredData(expected)]);
  }
  for (const expected of SEO_PAGES) {
    const response = await context.request.get(origin + expected.path);
    assert.equal(response.status(), 200);
    assert.equal((await context.request.head(origin + expected.path)).status(), 200);
    const html = await response.text();
    const parsed = await page.evaluate(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return { title: doc.title, canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href'), graph: JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent) };
    }, html);
    assert.equal(parsed.title, expected.title);
    assert.equal(parsed.canonical, absoluteUrl(expected.path));
    assert.deepEqual(parsed.graph, structuredData(expected));
    const queryResponse = await context.request.get(origin + expected.path + '?utm_source=seo-regression');
    assert.equal(queryResponse.status(), 200);
    assert.ok((await queryResponse.text()).includes(`href="${absoluteUrl(expected.path)}"`));
    await page.goto(origin + expected.path);
    await verify(expected);
    await page.reload();
    await verify(expected);
    console.log(`PASS HTTP, direct load, refresh, metadata and JSON-LD: ${expected.path}`);
  }
  for (const [alias, target] of Object.entries(SEO_ALIASES)) {
    const expected = SEO_PAGES.find(item => item.path === target);
    const response = await context.request.get(origin + alias);
    assert.equal(response.status(), 200, alias);
    assert.equal((await context.request.head(origin + alias)).status(), 200, alias);
    assert.ok((await response.text()).includes(`href="${absoluteUrl(target)}"`));
    await page.goto(origin + alias);
    await verify(expected);
    assert.equal(new URL(page.url()).pathname, target);
  }
  await page.goto(origin + '/#/activities/pilot-programme');
  await verify(SEO_PAGES.find(item => item.path === '/our-work/pilot-programme'));
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin + '/');
    await verify(SEO_PAGES[0]);
    await page.locator('#view-all-opportunities-btn').click();
    await verify(SEO_PAGES.find(item => item.path === '/opportunities'));
    await page.goBack();
    await verify(SEO_PAGES[0]);
    await page.goForward();
    await verify(SEO_PAGES.find(item => item.path === '/opportunities'));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  }
  // Move from an article to home to ensure article-only tags cannot remain stale.
  await page.goto(origin + '/our-work/pilot-programme');
  await page.locator('#navbar-logo-btn').click();
  await verify(SEO_PAGES[0]);
  assert.equal(await page.locator('meta[property^="article:"]').count(), 0);
  const xml = await (await context.request.get(origin + '/sitemap.xml')).text();
  assert.equal(await page.evaluate(xml => new DOMParser().parseFromString(xml, 'application/xml').querySelectorAll('parsererror').length, xml), 0);
  for (const image of new Set(SEO_PAGES.map(item => item.image))) {
    const response = await context.request.get(origin + image);
    assert.equal(response.status(), 200);
    assert.ok(response.headers()['content-type'].startsWith('image/'));
    await page.goto(origin + '/');
    const dimensions = await page.evaluate(src => new Promise((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve([image.naturalWidth, image.naturalHeight]); image.onerror = reject; image.src = src;
    }), origin + image);
    const expected = SEO_PAGES.find(item => item.image === image);
    assert.deepEqual(dimensions, [expected.imageWidth, expected.imageHeight]);
  }
  for (const agent of ['facebookexternalhit/1.1', 'LinkedInBot/1.0', 'TelegramBot', 'Twitterbot/1.0']) {
    const response = await context.request.get(origin + '/our-work/pilot-programme', { headers: { 'User-Agent': agent } });
    assert.equal(response.status(), 200);
    assert.ok((await response.text()).includes(`href="${absoluteUrl('/our-work/pilot-programme')}"`));
  }
  const robots = await context.request.get(origin + '/robots.txt');
  assert.ok(robots.headers()['content-type'].startsWith('text/plain'));
  assert.ok((await robots.text()).includes('Allow: /'));
  const sitemapResponse = await context.request.get(origin + '/sitemap.xml');
  assert.ok(sitemapResponse.headers()['content-type'].includes('xml'));
  const index = fs.readFileSync('dist/index.html', 'utf8');
  for (const asset of [...index.matchAll(/(?:src|href)="(\/assets\/[^" ]+)"/g)].map(match => match[1])) {
    const response = await context.request.get(origin + asset);
    assert.equal(response.status(), 200);
    assert.ok(!response.headers()['content-type'].includes('text/html'));
    assert.deepEqual(await response.body(), fs.readFileSync(path.join('dist', asset)));
  }
  // Inspect actual HTTP status and raw HTML, including HEAD and missing assets.
  const unknowns = ['/seo-test-unknown', '/our-work/seo-test-unknown', '/opportunities/seo-test-unknown', '/activities/seo-test-unknown', '/our-work/pilot-programme/extra', '/About-Us', '/not%20found', '/assets/missing.js', '/images/missing.webp', '/seo/missing.html', '/seo', '/seo-test-unknown?query=404'];
  for (const unknown of unknowns) {
    const response = await context.request.get(origin + unknown);
    assert.equal(response.status(), 404, unknown);
    assert.equal((await context.request.head(origin + unknown)).status(), 404);
    const html = await response.text();
    assert.ok(html.includes('Page not found'));
    for (const unwanted of ['rel="canonical"', 'application/ld+json', 'property="og:', 'type="module"']) assert.ok(!html.includes(unwanted), `${unknown}: ${unwanted}`);
    assert.ok(html.includes('content="noindex, follow"'));
    await page.goto(origin + unknown);
    await page.getByRole('heading', { name: 'Page not found', exact: true }).waitFor();
    assert.equal(new URL(page.url()).pathname, new URL(origin + unknown).pathname);
    console.log(`PASS HTTP GET/HEAD 404 without homepage metadata: ${unknown}`);
  }
  for (const route of [...SEO_PAGES.map(item => item.path), ...Object.keys(SEO_ALIASES)].filter(route => route !== '/')) {
    const response = await context.request.get(origin + route + '/?check=slash', { maxRedirects: 0 });
    assert.equal(response.status(), 308);
    assert.equal(response.headers().location, route + '?check=slash');
    assert.equal((await context.request.get(origin + route + '/?check=slash')).status(), 200);
  }
  // SPA-only transitions have no new HTTP response; verify state and SEO cleanup.
  await page.goto(origin + '/our-work/pilot-programme');
  await verify(SEO_PAGES.find(item => item.path === '/our-work/pilot-programme'));
  await page.evaluate(() => { history.pushState({}, '', '/client-unknown'); dispatchEvent(new PopStateEvent('popstate')); });
  await page.getByRole('heading', { name: 'Page not found', exact: true }).waitFor();
  assert.equal(await page.title(), 'Page not found | Project Luminary');
  assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, follow');
  assert.equal(await page.locator('link[rel="canonical"],script[type="application/ld+json"],meta[property^="og:"]').count(), 0);
  await page.goBack();
  await verify(SEO_PAGES.find(item => item.path === '/our-work/pilot-programme'));
  await page.goForward();
  await page.getByRole('heading', { name: 'Page not found', exact: true }).waitFor();
  assert.equal(new URL(page.url()).pathname, '/client-unknown');
  await page.getByRole('link', { name: 'Back to homepage' }).click();
  await verify(SEO_PAGES[0]);
  await page.goto(origin + '/#/unknown-hash-route');
  await page.getByRole('heading', { name: 'Page not found', exact: true }).waitFor();
  assert.equal(new URL(page.url()).pathname, '/unknown-hash-route');
  assert.equal(await page.locator('link[rel="canonical"],script[type="application/ld+json"]').count(), 0);
  const output = path.join(os.tmpdir(), 'luminary-404');
  fs.mkdirSync(output, { recursive: true });
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  await noJs.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const staticPage = await noJs.newPage();
  for (const width of [390, 768, 1440]) {
    await staticPage.setViewportSize({ width, height: 900 });
    assert.equal((await staticPage.goto(origin + '/no-javascript-404')).status(), 404);
    await staticPage.getByRole('heading', { name: 'Page not found', exact: true }).waitFor();
    assert.ok(await staticPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.equal(await staticPage.locator('section > div').evaluate(element => getComputedStyle(element).backgroundColor), 'rgb(255, 255, 255)');
    await staticPage.screenshot({ path: path.join(output, `404-${width}.png`) });
    await staticPage.getByRole('link', { name: 'Back to homepage' }).click();
    assert.equal(new URL(staticPage.url()).pathname, '/');
  }
  await noJs.close();
  assert.deepEqual(errors, []);
  console.log('PASS: all alias initial canonicals, hash migration, client navigation, Back/Forward at three widths, stale-tag cleanup, sitemap XML parsing, and social image decoding. External requests blocked.');
  await context.close();
} finally { await browser.close(); }

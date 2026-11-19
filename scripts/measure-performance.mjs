// Optional browser measurement tool. Uses an existing Playwright installation;
// it is deliberately not a project dependency. No external requests are allowed.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const stage = process.argv[2] || 'local';
const origin = process.env.PERFORMANCE_ORIGIN || 'http://127.0.0.1:4173';
const output = process.env.PERFORMANCE_OUTPUT || path.join(os.tmpdir(), 'luminary-performance');
fs.mkdirSync(output, { recursive: true });
const routes = ['/', '/about-us', '/our-work', '/our-work/pilot-programme', '/our-work/pathways-and-perspectives-pogramme', '/contact'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const measurements = [];
try {
  for (const slow of [false, true]) {
    for (const route of slow ? ['/', '/contact'] : routes) {
      for (let run = 1; run <= 3; run++) {
        const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
        await context.route('**/*', r => new URL(r.request().url()).origin === origin ? r.continue() : r.abort());
        const page = await context.newPage();
        if (slow) {
          const cdp = await context.newCDPSession(page);
          await cdp.send('Network.enable');
          await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
          await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750 });
          await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
        }
        await page.addInitScript(() => {
          window.performanceReview = { lcp: 0, cls: 0, longTasks: [] };
          new PerformanceObserver(list => list.getEntries().forEach(e => { window.performanceReview.lcp = e.startTime; })).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver(list => list.getEntries().forEach(e => { if (!e.hadRecentInput) window.performanceReview.cls += e.value; })).observe({ type: 'layout-shift', buffered: true });
          new PerformanceObserver(list => list.getEntries().forEach(e => window.performanceReview.longTasks.push(e.duration))).observe({ type: 'longtask', buffered: true });
        });
        await page.goto(origin + route, { waitUntil: slow ? 'domcontentloaded' : 'load', timeout: 60000 });
        await page.waitForTimeout(slow ? 15000 : 1200);
        const sample = await page.evaluate(() => {
          const resources = performance.getEntriesByType('resource').filter(r => r.name.startsWith(location.origin));
          const images = resources.filter(r => /\/images\//.test(r.name));
          return { ...window.performanceReview, fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime, elapsed: performance.now(), imageRequests: images.length, imageBytes: images.reduce((s, r) => s + r.encodedBodySize, 0), resourceBytes: resources.reduce((s, r) => s + r.encodedBodySize, 0), imagesComplete: [...document.images].filter(i => i.complete).length, resources: resources.map(r => ({ url: r.name.replace(location.origin, ''), bytes: r.encodedBodySize })) };
        });
        measurements.push({ route, slow, run, ...sample });
        await context.close();
      }
      console.log(`Measured ${stage}: ${slow ? 'slow' : 'local'} ${route}`);
    }
  }
  // Capture image-bearing regions at each responsive breakpoint for visual QA.
  for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    await context.route('**/*', r => new URL(r.request().url()).origin === origin ? r.continue() : r.abort());
    const page = await context.newPage();
    for (const [route, selector, name] of [['/', '#hero-section', 'hero'], ['/about-us', '#about-advisors-section', 'advisors'], ['/our-work/pilot-programme', 'article', 'pilot']]) {
      await page.goto(origin + route);
      const images = page.locator(selector).locator('img');
      for (let i = 0; i < await images.count(); i++) {
        await images.nth(i).scrollIntoViewIfNeeded();
        await images.nth(i).evaluate(img => img.decode());
      }
      await page.locator(selector).evaluate(el => window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 100), behavior: 'instant' }));
      await page.waitForTimeout(1200);
      await page.screenshot({ path: path.join(output, `${stage}-${width}-${name}.png`), animations: 'disabled' });
    }
    await context.close();
  }
  const files = fs.readdirSync('dist/assets');
  const { gzipSync } = await import('node:zlib');
  const js = files.filter(f => f.endsWith('.js')).map(f => { const b = fs.readFileSync(path.join('dist/assets', f)); return { file: f, bytes: b.length, gzipBytes: gzipSync(b).length }; });
  const report = { stage, conditions: 'Chrome; 390x844 DPR2; 3 cold runs; external origins blocked; slow: 1.6Mbps/150ms/4x CPU, 15s after DOMContentLoaded', js, measurements };
  fs.writeFileSync(path.join(output, `${stage}.json`), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ stage, js, results: routes.map(route => {
    const samples = measurements.filter(m => m.route === route && !m.slow);
    const slow = measurements.filter(m => m.route === route && m.slow);
    const median = values => values.sort((a,b) => a-b)[Math.floor(values.length/2)];
    return { route, imageBytes: median(samples.map(s => s.imageBytes)), imageRequests: median(samples.map(s => s.imageRequests)), fcp: median(samples.map(s => s.fcp)), lcp: median(samples.map(s => s.lcp)), maxCls: Math.max(...samples.map(s => s.cls)), slowFcp: slow.length ? median(slow.map(s => s.fcp)) : null, slowLcp: slow.length ? median(slow.map(s => s.lcp)) : null };
  }) }, null, 2));
} finally { await browser.close(); }

// Optional smoke tests using an existing Playwright installation. No live submissions.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.PERFORMANCE_ORIGIN || 'http://127.0.0.1:4173';
const ids = ['pilot-programme', 'lumina-academic-research-cnsortium', 'pathways-and-perspectives-pogramme', 'the-foundation-initiative', 'project-luminary-at-icbms5'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const context = await browser.newContext();
  await context.route('**/*', r => {
    if (new URL(r.request().url()).hostname === 'api.web3forms.com') return r.fulfill({ json: { success: true } });
    return new URL(r.request().url()).origin === origin ? r.continue() : r.abort();
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const go = async route => {
    await page.goto(origin + route);
    await page.locator('main h1').first().waitFor();
    await page.waitForTimeout(350);
  };
  await go('/');
  if (await page.locator('link[rel="apple-touch-icon"]').getAttribute('href') === '/apple-touch-icon.png') {
    for (const [file, size] of [['/favicon.png', 32], ['/favicon.ico', 48], ['/apple-touch-icon.png', 180]]) {
      const dimensions = await page.evaluate(async file => {
        // Check the fetched bytes independently of Chrome's automatic favicon request.
        const blob = await (await fetch(`${file}?decode-check`)).blob();
        const url = URL.createObjectURL(blob);
        try {
          const image = new Image(); image.src = url; await image.decode();
          return [image.naturalWidth, image.naturalHeight];
        } catch { throw new Error(`Favicon decode failed: ${file}`); }
        finally { URL.revokeObjectURL(url); }
      }, file);
      assert.deepEqual(dimensions, [size, size]);
    }
    console.log('PASS: browser decodes favicon PNG, multi-size ICO, and Apple touch icon.');
  }
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/about-us', '/our-work', '/opportunities', '/contact', '/donate-us', ...ids.map(id => '/our-work/' + id), '/opportunities/research-associate-7-26']) {
      await go(route);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal overflow: ${width} ${route}`);
      const images = page.locator('main img');
      for (let i = 0; i < await images.count(); i++) {
        const before = await images.nth(i).evaluate(img => ({ height: img.getBoundingClientRect().height, reserved: Boolean(img.style.aspectRatio) }));
        await images.nth(i).scrollIntoViewIfNeeded();
        await images.nth(i).evaluate(img => img.decode());
        if (before.reserved) {
          assert.ok(before.height > 0, 'Contained lazy image needs a reserved height');
          const after = await images.nth(i).evaluate(img => img.getBoundingClientRect().height);
          assert.ok(Math.abs(before.height - after) < 2, `Contained image changed height after decode: ${route}`);
        }
      }
      assert.ok((await page.locator('main').innerText()).length > 100);
    }
    console.log(`PASS: ${width}px routes, all five articles, image decoding, no horizontal overflow.`);
  }
  for (const [alias, canonical] of [['/home', '/'], ['/activities', '/our-work'], ['/activities/pilot-programme', '/our-work/pilot-programme'], ['/donate', '/donate-us'], ['/#/activities/pilot-programme', '/our-work/pilot-programme']]) {
    await go(alias); assert.equal(new URL(page.url()).pathname, canonical);
  }
  await go('/our-work');
  assert.equal(await page.locator('[id^="activity-card-"]').count(), 4);
  await page.locator('#load-more-activities-btn').click();
  assert.equal(await page.locator('[id^="activity-card-"]').count(), 5);
  await page.locator('#activity-filter-organisational-development').click();
  assert.equal(await page.locator('[id^="activity-card-"]').count(), 1);
  await page.locator('#activity-filter-all').click();
  assert.equal(await page.locator('[id^="activity-card-"]').count(), 4);
  await page.locator('#activity-readmore-pilot-programme').click(); await page.waitForURL('**/our-work/pilot-programme');
  await page.goBack(); await page.waitForURL('**/our-work');
  await page.goForward(); await page.waitForURL('**/our-work/pilot-programme');
  await go('/opportunities');
  await page.locator('select').nth(3).selectOption('Open');
  assert.ok((await page.locator('main').innerText()).includes('No '));
  await page.locator('select').nth(3).selectOption('Closed');
  assert.equal(await page.locator('[id^="opportunity-card-"]').count(), 1);
  await page.setViewportSize({ width: 390, height: 844 });
  await go('/'); await page.locator('#mobile-menu-toggle').click();
  await page.locator('#mobile-nav-item-about').click(); await page.waitForURL('**/about-us');
  if (await page.locator('main img[loading="lazy"]').count()) {
    await go('/');
    assert.equal(await page.locator('#hero-section img').getAttribute('loading'), 'eager');
    assert.equal(await page.locator('#hero-section img').getAttribute('fetchpriority'), 'high');
    await go('/our-work/pilot-programme');
    const gallery = page.locator('main img[alt$="Session Photo 1"]');
    assert.equal(await gallery.getAttribute('loading'), 'lazy');
    assert.equal(await gallery.evaluate(img => img.complete), false, 'Deep gallery must remain deferred');
    const siblingBackground = gallery.locator('..').locator('[data-image-background]');
    assert.equal(await siblingBackground.evaluate(el => el.style.backgroundImage), '');
    await page.evaluate(() => {
      window.galleryCls = 0;
      new PerformanceObserver(list => list.getEntries().forEach(entry => { if (!entry.hadRecentInput) window.galleryCls += entry.value; })).observe({ type: 'layout-shift' });
    });
    await gallery.evaluate(img => window.scrollTo({ top: img.getBoundingClientRect().top + window.scrollY - 100, behavior: 'instant' }));
    await gallery.evaluate(img => img.decode());
    await page.waitForTimeout(500);
    assert.ok(await page.evaluate(() => window.galleryCls < 0.001), 'Gallery scroll/decode must not shift layout');
    await page.waitForFunction(() => [...document.querySelectorAll('[data-image-background]')].every(bg => {
      const img = bg.parentElement.querySelector('img');
      return !img.complete || bg.style.backgroundImage.includes(img.currentSrc);
    }));
    await page.route('**/images/optimized/pl-advisors/DanWessner-*', r => r.abort());
    await go('/about-us');
    const advisor = page.locator('#advisor-card-advisor-1');
    await advisor.scrollIntoViewIfNeeded();
    await advisor.locator('.advisor-avatar-fallback').waitFor({ state: 'visible' });
    assert.equal(await advisor.locator('img').evaluate(img => img.style.display), 'none');
    console.log('PASS: eager hero, deferred gallery and blur, currentSrc synchronization, and advisor broken-image fallback.');
  }
  assert.deepEqual(errors, []);
  console.log('PASS: aliases, hash migration, pagination, filters, empty state, Back/Forward, mobile menu; no uncaught errors. External requests blocked.');
} finally { await browser.close(); }

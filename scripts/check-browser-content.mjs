// Phase 5A UI checks. Existing Playwright only; all external requests are blocked.
// Open roles and fallback modals are browser-only fixtures, never persisted data.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.CONTENT_TEST_ORIGIN || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const output = path.join(os.tmpdir(), 'luminary-content');
fs.mkdirSync(output, { recursive: true });
const errors = [];
async function session({ open = false, fixture = '', activityIndex = 0 } = {}) {
  const context = await browser.newContext();
  let reactPath;
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) return route.abort();
    if (url.pathname === '/src/data.ts' && open) {
      const response = await route.fetch();
      const source = await response.text();
      assert.ok(source.includes('isAvailable: false'));
      return route.fulfill({ response, body: source.replace('isAvailable: false', 'isAvailable: true') });
    }
    if (url.pathname === '/src/main.tsx' && fixture) {
      const response = await route.fetch();
      let source = await response.text();
      reactPath = source.match(/from\s+["']([^"']*\/react\.js[^"']*)["']/)?.[1];
      assert.ok(reactPath, 'React module from actual Vite entry');
      const replaced = source.replace(/from\s+["']\/src\/App\.tsx(?:\?[^"']*)?["']/, 'from "/__content_fixture__.js"');
      assert.notEqual(source, replaced);
      return route.fulfill({ response, body: replaced });
    }
    if (url.pathname === '/__content_fixture__.js') {
      const component = fixture === 'activity' ? 'ActivityModal' : 'OpportunityModal';
      const props = fixture === 'activity' ? `{activity: ACTIVITIES_DATA[${activityIndex}], onClose(){}}` : `{opportunity: {...OPPORTUNITIES_DATA[0], isAvailable: ${open}}, onClose(){}}`;
      return route.fulfill({ contentType: 'application/javascript', body: `import React from ${JSON.stringify(reactPath)}; import Component from '/src/components/${component}.tsx'; import {ACTIVITIES_DATA, OPPORTUNITIES_DATA} from '/src/data.ts'; export default function Fixture(){ return React.createElement(Component, ${props}); }` });
    }
    return route.continue();
  });
  await context.addInitScript(() => {
    window.copyMode = 'hold';
    window.fakeClipboard = { writeText() {
      if (window.copyMode === 'reject') return Promise.reject(new Error('Test denied'));
      if (window.copyMode === 'hold') return new Promise(resolve => { window.finishCopy = resolve; });
      return Promise.resolve();
    } };
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: window.fakeClipboard });
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  return { context, page };
}
async function copyChecks(page) {
  await page.getByRole('button', { name: 'Copy Email', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Copying...' }).isDisabled(), true);
  assert.equal(await page.getByRole('button', { name: /Copied/ }).count(), 0);
  await page.evaluate(() => window.finishCopy());
  const copied = page.getByRole('button', { name: /Copied/ });
  await copied.waitFor();
  await page.evaluate(() => { window.copyMode = 'reject'; });
  await copied.click();
  await page.getByRole('alert').filter({ hasText: 'Unable to copy' }).waitFor();
  assert.equal(await page.getByRole('button', { name: /Copied/ }).count(), 0);
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined }));
  await page.getByRole('button', { name: 'Copy Email', exact: true }).click();
  await page.getByRole('alert').filter({ hasText: 'Unable to copy' }).waitFor();
  await page.evaluate(() => { window.copyMode = 'resolve'; Object.defineProperty(navigator, 'clipboard', { configurable: true, value: window.fakeClipboard }); });
  await page.getByRole('button', { name: 'Copy Email', exact: true }).click();
  await page.getByRole('button', { name: /Copied/ }).waitFor();
}
try {
  const { context, page } = await session();
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(origin + '/');
    await page.locator('#newsletter-status').waitFor();
    assert.equal(await page.locator('#footer-email-input').isDisabled(), true);
    assert.equal(await page.locator('#footer-email-submit').isDisabled(), true);
    assert.ok((await page.locator('#newsletter-status').innerText()).includes('currently unavailable'));
    assert.equal(await page.getByRole('status').filter({ hasText: 'No opportunities are currently open.' }).count(), 1);
    assert.ok(await page.locator('#footer-social-linkedin').getAttribute('aria-label'));
    await page.getByRole('button', { name: 'All Voices Grid' }).click();
    for (const category of ['Fellows & Alumni', 'Community & Mentors']) {
      await page.locator('#testimonials-section').getByRole('button', { name: category, exact: true }).click();
      await page.getByRole('status').filter({ hasText: 'No testimonials' }).waitFor();
    }
    await page.goto(origin + '/about-us');
    await page.locator('#advisor-card-advisor-9').waitFor();
    assert.equal(await page.locator('[id^="team-card-"]').count(), 6);
    assert.equal(await page.locator('[id^="advisor-card-"]').count(), 9);
    for (const id of ['advisor-8', 'advisor-9']) assert.equal(await page.locator(`#advisor-card-${id} p.uppercase`).count(), 0);
    assert.equal(await page.locator('[data-advisor-socials]').count(), 0);
    assert.equal(await page.getByText('TBD', { exact: true }).count(), 2);
    for (const link of await page.locator('[id^="team-card-"] a').all()) assert.ok(await link.getAttribute('aria-label'));
    await page.goto(origin + '/opportunities/research-associate-7-26');
    await page.getByRole('heading', { name: 'Applications Closed' }).waitFor();
    assert.equal(await page.locator('main a[href^="mailto:"]').count(), 0);
    assert.equal(await page.getByRole('button', { name: 'Copy Email' }).count(), 0);
    assert.equal(await page.getByRole('heading', { name: 'How to Apply' }).count(), 0);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: path.join(output, `closed-${width}.png`), animations: 'disabled' });
    console.log(`PASS ${width}px: unavailable newsletter, truthful empty categories, preserved profiles, hidden empty fields, closed application state, accessible socials.`);
  }
  await page.route('**/images/optimized/meet-the-team/kmp-*', r => r.abort());
  await page.goto(origin + '/about-us');
  const team = page.locator('#team-card-team-1');
  await team.scrollIntoViewIfNeeded();
  await team.locator('.team-avatar-fallback').waitFor({ state: 'visible' });
  assert.equal((await team.locator('.team-avatar-fallback').innerText()).trim(), 'KP');
  await context.close();

  const openSession = await session({ open: true });
  await openSession.page.goto(origin + '/');
  await openSession.page.locator('#hero-section').waitFor();
  assert.equal(await openSession.page.getByRole('status').filter({ hasText: 'No opportunities are currently open.' }).count(), 0);
  await openSession.page.goto(origin + '/opportunities/research-associate-7-26');
  await openSession.page.getByRole('heading', { name: 'How to Apply' }).waitFor();
  assert.equal(await openSession.page.locator('main a[href^="mailto:"]').count(), 1);
  await copyChecks(openSession.page);
  await openSession.context.close();
  for (const open of [false, true]) {
    const s = await session({ open, fixture: 'opportunity' });
    await s.page.goto(origin + '/');
    await s.page.locator('#opportunity-modal-overlay').waitFor();
    assert.equal(await s.page.locator('a[href^="mailto:"]').count(), Number(open));
    if (open) await copyChecks(s.page);
    else await s.page.getByRole('heading', { name: 'Applications Closed' }).waitFor();
    await s.context.close();
  }
  for (const width of [390, 768, 1440]) {
    for (let activityIndex = 0; activityIndex < 5; activityIndex++) {
      const activity = await session({ fixture: 'activity', activityIndex });
      await activity.page.setViewportSize({ width, height: 900 });
      await activity.page.goto(origin + '/');
      await activity.page.locator('#activity-modal-overlay h2').first().waitFor();
      assert.ok(!(await activity.page.locator('#activity-modal-card').innerText()).includes('## '));
      const noOverflow = await activity.page.locator('#activity-modal-card').evaluate(el => el.scrollWidth <= el.clientWidth);
      assert.ok(noOverflow, `Activity modal overflow: ${width}px article ${activityIndex}`);
      for (const link of await activity.page.locator('#activity-modal-card a').all()) {
        assert.ok(await link.evaluate(el => {
          const frame = el.closest('.overflow-y-auto').getBoundingClientRect();
          const box = el.getBoundingClientRect();
          return box.left >= frame.left - 1 && box.right <= frame.right + 1;
        }), `Clipped report link: ${width}px article ${activityIndex}`);
      }
      await activity.page.screenshot({ path: path.join(output, `modal-${width}-${activityIndex}.png`), animations: 'disabled' });
      await activity.context.close();
    }
  }
  assert.deepEqual(errors, []);
  console.log('PASS: team failed-image fallback; browser-only open/closed role and modal fixtures; pending/success/denied/unavailable/retry clipboard paths; formatted activity modal. No live submissions or data edits.');
} finally { await browser.close(); }

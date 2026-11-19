// Run against a local dev server with VITE_WEB3FORMS_ACCESS_KEY=performance-mock-key.
// Every submission is intercepted; external origins are blocked.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.FORM_TEST_ORIGIN || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
let mode = 'success', submissions = 0;
try {
  const context = await browser.newContext();
  await context.route('**/*', async r => {
    if (new URL(r.request().url()).hostname === 'api.web3forms.com') {
      assert.ok(r.request().postDataJSON().access_key === 'performance-mock-key', 'Use the dummy local test key');
      submissions++;
      await new Promise(resolve => setTimeout(resolve, 200));
      if (mode === 'network') return r.abort('failed');
      return r.fulfill({ status: mode === 'error' ? 500 : 200, contentType: 'application/json', body: mode === 'malformed' ? 'invalid' : JSON.stringify({ success: mode === 'success' }) });
    }
    return new URL(r.request().url()).origin === origin ? r.continue() : r.abort();
  });
  const page = await context.newPage();
  for (const type of ['contact', 'donate']) {
    await page.goto(origin + (type === 'contact' ? '/contact' : '/donate-us'));
    const submit = page.locator(`#${type}-submit-btn`);
    const before = submissions;
    await submit.click();
    assert.equal(submissions, before);
    assert.ok((await page.locator(`#${type}-us-form`).innerText()).includes(type === 'contact' ? 'Please provide your full name.' : 'First name is required.'));
    if (type === 'contact') {
      await page.locator('#contact-name').fill('Performance Test');
      await page.locator('#contact-email').fill('test@example.invalid');
      await page.locator('#contact-subject').selectOption('General Inquiry');
      await page.locator('#contact-message').fill('Local mocked performance regression check.');
    } else {
      for (const [id, value] of [['first-name', 'Performance'], ['last-name', 'Test'], ['email', 'test@example.invalid'], ['phone', '000000000'], ['address', 'Test address']]) await page.locator('#donate-' + id).fill(value);
      await page.locator('#donate-amount-custom-btn').click();
      await page.locator('#donate-custom-amount-input').fill('125');
    }
    for (mode of ['error', 'malformed', 'network']) {
      await submit.click();
      await page.getByRole('alert').waitFor();
      assert.equal(await submit.isEnabled(), true);
      assert.ok(await page.locator(type === 'contact' ? '#contact-name' : '#donate-first-name').inputValue());
    }
    mode = 'success';
    await submit.click(); assert.equal(await submit.isDisabled(), true);
    await page.locator(`#${type}-form-success`).waitFor();
    await page.locator(`#${type}-form-reset-btn`).click();
    assert.equal(await page.locator(type === 'contact' ? '#contact-name' : '#donate-first-name').inputValue(), '');
    console.log(`PASS: ${type} browser validation, HTTP/malformed/network errors, retained input, loading, success, reset.`);
  }
  assert.equal(submissions, 8);
  console.log('PASS: eight intercepted submissions; no live requests.');
} finally { await browser.close(); }

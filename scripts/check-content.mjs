// Focused rendering/content checks using installed React and TypeScript only.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, { exports, require: name => {
    if (!name.startsWith('.')) return require(name);
    const base = path.resolve(path.dirname(file), name);
    return load([base + '.ts', base + '.tsx'].find(fs.existsSync));
  } });
  return exports;
}
const { getReadingTime, getProfileInitials, isOpportunityOpen } = load('src/lib/content.ts');
assert.equal(getReadingTime(''), '1 min read');
assert.equal(getReadingTime('word '.repeat(225)), '1 min read');
assert.equal(getReadingTime('word '.repeat(226)), '2 min read');
assert.equal(getReadingTime('## Heading\n\n[Read report](https://example.invalid/long-path)\n\n> **Quoted words**'), '1 min read');
assert.equal(getProfileInitials('Dr. Dan Wessner'), 'DW');
assert.equal(getProfileInitials('Kaung Myat Phyo (Kelvin)'), 'KP');
assert.equal(getProfileInitials('Myat'), 'MY');
assert.equal(getProfileInitials('Mia Sasaki', 'initials:MS'), 'MS');
assert.equal(isOpportunityOpen({ isAvailable: false }), false);
assert.equal(isOpportunityOpen({ isAvailable: true }), true);
assert.equal(isOpportunityOpen({}), true);
const { ACTIVITIES_DATA, OPPORTUNITIES_DATA, TEAM_DATA, ADVISORS_DATA, TESTIMONIALS_DATA } = load('src/data.ts');
assert.equal(ACTIVITIES_DATA.length, 5);
assert.equal(TEAM_DATA.length, 6);
assert.equal(ADVISORS_DATA.length, 9);
assert.equal(TESTIMONIALS_DATA.length, 3);
assert.equal(ADVISORS_DATA.find(a => a.id === 'advisor-7').bio, 'TBD');
assert.equal(ADVISORS_DATA.find(a => a.id === 'advisor-8').position, '');
assert.equal(ADVISORS_DATA.find(a => a.id === 'advisor-9').position, '');
const ArticleRenderer = load('src/components/ArticleRenderer.tsx').default;
const ActivityModal = load('src/components/ActivityModal.tsx').default;
const OpportunityModal = load('src/components/OpportunityModal.tsx').default;
const OpportunityCard = load('src/components/OpportunityCard.tsx').default;
const html = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));
for (const activity of ACTIVITIES_DATA) {
  assert.equal(activity.readTime, getReadingTime(activity.content));
  const rendered = html(ActivityModal, { activity, onClose() {} });
  assert.ok(rendered.includes('<h2'));
  assert.ok(!rendered.includes('## '), `${activity.id}: raw Markdown`);
  for (const [, label, url] of activity.content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    assert.ok(rendered.includes(`href="${url}"`), `${activity.id}: report destination changed`);
    assert.ok(rendered.includes(label.replaceAll('&', '&amp;')), `${activity.id}: report label`);
  }
}
for (const content of ['[Download report](javascript:alert(1))', '[Download incomplete', 'https://drive.google.com/file/d/missing-markdown']) {
  const rendered = html(ArticleRenderer, { content });
  assert.ok(!rendered.includes('<a '), 'Malformed report must not create a fallback link');
  assert.ok(!rendered.includes('1Z6CD41'));
}
for (const open of [false, true]) {
  const opportunity = { ...OPPORTUNITIES_DATA[0], isAvailable: open };
  const modal = html(OpportunityModal, { opportunity, onClose() {} });
  const card = html(OpportunityCard, { opportunity, onApply() {} });
  assert.equal(modal.includes('mailto:'), open);
  assert.equal(modal.includes('How to Apply'), open);
  assert.equal(modal.includes('Applications Closed'), !open);
  assert.equal(card.includes('View Details &amp; Apply'), open);
}
console.log('PASS: reading-time boundaries, initials, availability, all five formatted modal articles/report links, safe malformed reports, open/closed cards and modals, and retained pending records.');

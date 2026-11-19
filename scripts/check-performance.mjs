// Focused dependency-free regression checks using the existing TypeScript compiler.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
import crypto from 'node:crypto';
import path from 'node:path';
const require = createRequire(import.meta.url);
const module = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/icons.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, { exports: module.exports, require, Object });
const { ICONS, getIcon } = module.exports;
for (const name of [...fs.readFileSync('src/data.ts', 'utf8').matchAll(/iconName: '([^']+)'/g)].map(m => m[1])) {
  assert.ok(ICONS[name], `Missing data-driven icon: ${name}`);
  assert.equal(getIcon(name), ICONS[name]);
}
for (const name of ['unknown', '', 'toString', '__proto__']) assert.equal(getIcon(name), ICONS.HelpCircle);
for (const file of ['src/App.tsx', 'src/components/StatCounter.tsx']) {
  assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /import \* as Icons from 'lucide-react'/);
}
console.log('PASS: explicit icon map covers current content and preserves unknown-icon fallback.');
const auditFile = 'docs/performance/image-optimization.json';
if (fs.existsSync(auditFile)) {
  const audit = JSON.parse(fs.readFileSync(auditFile, 'utf8'));
  const exactPath = file => {
    let parent = '.';
    for (const part of file.split('/')) {
      assert.ok(fs.readdirSync(parent).includes(part), `Missing or incorrectly cased path: ${file}`);
      parent = path.join(parent, part);
    }
  };
  for (const [source, asset] of Object.entries(audit)) {
    exactPath('public' + source);
    const original = fs.readFileSync('public' + source);
    assert.equal(crypto.createHash('sha256').update(original).digest('hex'), asset.originalSha256, `Original changed: ${source}`);
    for (const variant of asset.variants) {
      exactPath('public' + variant.src);
      const bytes = fs.readFileSync('public' + variant.src);
      assert.equal(bytes.subarray(0, 4).toString(), 'RIFF');
      assert.equal(bytes.subarray(8, 12).toString(), 'WEBP');
      assert.equal(bytes.length, variant.bytes);
      assert.ok(variant.width <= asset.originalWidth && variant.height <= asset.originalHeight, `Unexpected upscale: ${source}`);
      assert.ok(Math.abs(variant.width / variant.height - asset.originalWidth / asset.originalHeight) < 0.015, `Aspect ratio: ${source}`);
    }
  }
  const known = new Set(Object.values(audit).map(a => a.src));
  for (const [, source] of fs.readFileSync('src/data.ts', 'utf8').matchAll(/'([^']*\/images\/optimized\/[^']+)'/g)) assert.ok(known.has(source));
  console.log(`PASS: ${Object.keys(audit).length} optimized images, original hashes, WebP headers, no upscaling, aspect ratios, references, and exact filename casing.`);
}
if (fs.existsSync('public/apple-touch-icon.png')) {
  for (const [file, size] of [['public/favicon.png', 32], ['public/apple-touch-icon.png', 180]]) {
    const png = fs.readFileSync(file);
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
  const ico = fs.readFileSync('public/favicon.ico');
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  assert.deepEqual([0, 1, 2].map(i => ico[6 + 16 * i]), [16, 32, 48]);
  for (const name of ['favicon.png', 'favicon.ico']) {
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync('public/images/original-favicons/' + name)).digest('hex'), '1eda9744a875ba018c3c33bc31f44c0e64d97e831b5764961477af139cd8ae8e');
  }
  console.log('PASS: PNG/ICO favicon sizes and signatures; original invalid favicons retained unchanged.');
}
if (fs.existsSync('src/lib/images.ts')) {
  let imageState = null;
  const React = {
    Fragment: 'fragment',
    createElement: (type, props, ...children) => ({ type, props: { ...props, children } }),
    useState: () => [imageState, value => { imageState = value; }],
  };
  const load = file => {
    const exports = {};
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React } }).outputText;
    vm.runInNewContext(code, { exports, Object, require: name => name === 'react' ? { ...React, default: React } : name.startsWith('.') ? load(path.resolve(path.dirname(file), name) + '.ts') : require(name) });
    return exports;
  };
  const { getImageAsset, getAvatarSizes, getCardImageSizes } = load('src/lib/images.ts');
  const ResponsiveImage = load('src/components/ResponsiveImage.tsx').default;
  const src = '/images/activities/pilot-programme/pilot_1.png';
  const asset = getImageAsset(src);
  assert.equal(getImageAsset(asset.src).src, asset.src);
  assert.equal(getImageAsset('images/activities/pilot-programme/pilot_1.png').src, asset.src);
  assert.equal(getImageAsset('/unknown.jpg'), undefined);
  assert.equal(getAvatarSizes('/images/pl-advisors/DanWessner.jpg', 112), '168px');
  assert.match(getCardImageSizes(src, 2), /min-width: 768px/);
  const render = source => ResponsiveImage({ src: source, alt: 'Test', sizes: '300px', backgroundClassName: 'blur-xl' }).props.children;
  let [background, image] = render(src);
  assert.equal(image.props.loading, 'lazy');
  assert.equal(image.props.width, asset.width);
  assert.equal(image.props.height, asset.height);
  assert.equal(image.props.referrerPolicy, 'no-referrer');
  assert.ok(image.props.srcSet.includes('480w'));
  assert.equal(background.props.style.backgroundImage, undefined, 'No eager decorative source');
  const selected = 'http://localhost' + asset.variants[0].src;
  image.props.onLoad({ currentTarget: { currentSrc: selected } });
  [background] = render(src);
  assert.equal(background.props.style.backgroundImage, `url("${selected}")`);
  [background] = render('/images/activities/larc/larc_1.png');
  assert.equal(background.props.style.backgroundImage, undefined, 'No stale blur when the source changes');
  const critical = ResponsiveImage({ src, alt: 'Test', loading: 'eager', fetchPriority: 'high' }).props.children[1];
  assert.equal(critical.props.loading, 'eager');
  assert.equal(critical.props.fetchPriority, 'high');
  const contained = ResponsiveImage({ src, alt: 'Test', maxDisplayHeight: 520 }).props.children[1];
  assert.ok(contained.props.style.width.startsWith('min(100%, '));
  assert.equal(contained.props.style.height, 'auto');
  assert.equal(contained.props.style.aspectRatio, `${asset.width} / ${asset.height}`);
  console.log('PASS: responsive candidates/dimensions, lazy defaults, eager priority, selected-source blur synchronization, source changes, and avatar density sizing.');
}

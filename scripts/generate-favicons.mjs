// Rasterize the existing Logo component; no replacement brand drawing is introduced.
// Requires existing authoring tools: Chrome, Playwright, Python/Pillow with WebP.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const module = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/components/Logo.tsx', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React },
}).outputText, { exports: module.exports, require: name => name === 'react' ? { default: React } : require(name) });
const svg = renderToStaticMarkup(React.createElement(module.exports.Logo, { size: 512, variant: 'brand' }));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const raster = path.join(os.tmpdir(), 'luminary-logo-favicon-source.png');
try {
  const page = await browser.newPage();
  const base64 = await page.evaluate(async svg => {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const image = new Image(); image.src = url; await image.decode();
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
    canvas.getContext('2d').drawImage(image, 0, 0, 512, 512);
    URL.revokeObjectURL(url);
    return canvas.toDataURL('image/png').split(',')[1];
  }, svg);
  fs.writeFileSync(raster, Buffer.from(base64, 'base64'));
} finally { await browser.close(); }
execFileSync(process.env.PYTHON_EXECUTABLE || 'python', ['scripts/optimize-images.py', '--favicons', raster], { stdio: 'inherit' });

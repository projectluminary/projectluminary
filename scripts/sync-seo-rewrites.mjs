// Review first: node scripts/sync-seo-rewrites.mjs
// Apply deliberately: node scripts/sync-seo-rewrites.mjs --write
// Existing config fields are preserved. No hosting API or deployment is invoked.
import fs from 'node:fs';
import { loadTypeScript } from './load-typescript.mjs';
const { seoRewrites } = loadTypeScript('seo-build.ts');
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const output = JSON.stringify({ ...config, rewrites: seoRewrites() }, null, 2) + '\n';
if (process.argv.includes('--write')) {
  fs.writeFileSync('vercel.json', output);
  console.log('Updated repository vercel.json rewrites; other fields preserved. No deployment performed.');
} else process.stdout.write(output);

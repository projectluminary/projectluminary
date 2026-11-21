import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import NotFoundPage from './src/components/NotFoundPage';
import { SEO_PAGES, SEO_ALIASES, SEO_START, SEO_END, getSeoPage, renderSeoHead, renderNotFoundHead, absoluteUrl, SITE_ORIGIN } from './src/seo';

export function seoFile(path: string): string {
  return path === '/' ? 'index.html' : `seo${path}.html`;
}
export function seoRewrites() {
  return [
    ...SEO_PAGES.filter(page => page.path !== '/').map(page => ({ source: page.path, destination: `/${seoFile(page.path)}` })),
    ...Object.entries(SEO_ALIASES).map(([source, target]) => ({ source, destination: `/${seoFile(target)}` })),
  ];
}
export function validateSeoRewrites() {
  const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  if (JSON.stringify(config.rewrites) !== JSON.stringify(seoRewrites())) {
    throw new Error('Vercel SEO rewrites are out of date. Review node scripts/sync-seo-rewrites.mjs, then run it with --write and rebuild.');
  }
  return config.rewrites as { source: string; destination: string }[];
}
function replaceHead(html: string, page?: (typeof SEO_PAGES)[number]): string {
  const start = html.indexOf(SEO_START);
  const end = html.indexOf(SEO_END);
  if (start < 0 || end < start) throw new Error('Missing SEO template markers');
  return html.slice(0, start) + (page ? renderSeoHead(page) : renderNotFoundHead()) + html.slice(end + SEO_END.length);
}
function notFoundHtml(template: string): string {
  return replaceHead(template)
    .replace('<div id="root"></div>', renderToStaticMarkup(createElement('main', null, createElement(NotFoundPage))))
    .replace(/\s*<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/\s*<link\b[^>]*rel="modulepreload"[^>]*>/g, '');
}
const sitemap = () => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${SEO_PAGES.map(page => `  <url><loc>${absoluteUrl(page.path)}</loc></url>`).join('\n')}\n</urlset>\n`;
const robots = () => `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;

export function seoPlugin(): Plugin {
  return {
    name: 'luminary-static-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        const pathname = new URL(context.originalUrl || context.path, 'http://localhost').pathname;
        return replaceHead(html, pathname === '/index.html' ? SEO_PAGES[0] : getSeoPage(pathname.replace(/\/+$/, '') || '/'));
      },
    },
    generateBundle: { order: 'post', handler(_, bundle) {
      validateSeoRewrites();
      const entry = bundle['index.html'];
      if (!entry || entry.type !== 'asset') throw new Error('Missing Vite index.html');
      for (const page of SEO_PAGES.filter(page => page.path !== '/')) {
        this.emitFile({ type: 'asset', fileName: seoFile(page.path), source: replaceHead(String(entry.source), page) });
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: notFoundHtml(String(entry.source)) });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots() });
      // Reproducible snapshot for review; builds never write repository config.
      this.emitFile({ type: 'asset', fileName: 'seo/vercel-rewrites.proposed.json', source: JSON.stringify({ rewrites: seoRewrites() }, null, 2) + '\n' });
    } },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = new URL(req.url || '/', 'http://localhost').pathname;
        if (pathname !== '/sitemap.xml' && pathname !== '/robots.txt') return next();
        res.setHeader('Content-Type', pathname === '/sitemap.xml' ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8');
        res.end(pathname === '/sitemap.xml' ? sitemap() : robots());
      });
    },
    configurePreviewServer(server) {
      const rewrites = validateSeoRewrites();
      const output = path.resolve(server.config.root, server.config.build.outDir);
      // Exercise the active repository mappings, not an independent route list.
      // Vercel filesystem precedence still requires verification after deployment.
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost');
        // Match Vercel's trailingSlash:false normalization without losing queries.
        if (url.pathname !== '/' && url.pathname.endsWith('/')) {
          res.writeHead(308, { Location: url.pathname.replace(/\/+$/, '') + url.search });
          res.end(); return;
        }
        const mapping = rewrites.find(rule => rule.source === url.pathname);
        if (mapping) { req.url = `${mapping.destination}${url.search}`; next(); return; }
        // Let real files use Vite's normal MIME, cache and HEAD handling. Do not
        // let preview's default SPA fallback turn missing pages/assets into 200s.
        let file: string;
        try { file = path.resolve(output, '.' + decodeURIComponent(url.pathname)); }
        catch { file = ''; }
        const inside = file === output || file.startsWith(output + path.sep);
        const exists = inside && fs.existsSync(file) && fs.statSync(file).isFile();
        if (url.pathname !== '/' && !exists) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' });
          res.end(req.method === 'HEAD' ? undefined : fs.readFileSync(path.join(output, '404.html')));
          return;
        }
        next();
      });
    },
  };
}

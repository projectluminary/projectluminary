# Project Luminary

React + TypeScript + Vite static portal. Production target: **Vercel at projectluminary.org**.
This README supersedes the historical handover's environment, dependency, and hosting guidance.

## Local development

Use **Node.js 22.x and npm 10.x**, matching CI's Node 22 runtime. `.nvmrc` and
`package.json` record this policy. Use npm exclusively; commit `package-lock.json`
alongside intentional dependency changes. Do not add Bun, Yarn, or pnpm lockfiles.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

PowerShell: use `Copy-Item .env.example .env.local` and `npm.cmd` if script policy
blocks `npm.ps1`. The dev server uses port 3000. Replace the example access key
in `.env.local` and restart Vite. Never commit populated environment files.
The existing `.gitignore` excludes `.env*` except the placeholder `.env.example`.

| Variable | Purpose |
| --- | --- |
| `VITE_WEB3FORMS_ACCESS_KEY` | Public Web3Forms form access key used by contact and donation-intent submissions. Required for submission, not for building/browsing. |
| `DISABLE_HMR` | Optional process environment flag for the dev server; defaults to enabled HMR. Set to `true` only when needed by the development environment. It is read before Vite loads `.env` files, so supply it in the shell. |

All `VITE_*` values are embedded in the public frontend bundle. Never put private
API credentials, service tokens, or payment secrets in them. Web3Forms identifies
its form access key as public; it is not a private account API token.

Contact and donation forms preserve client validation, loading, errors, and reset
behavior. Missing/placeholder keys fail without sending a request. Only an HTTP
success with JSON `success: true` shows success and clears inputs. Network errors,
20-second timeouts, malformed responses, and service rejection retain input and
show an error. A timeout can occur after acceptance; retrying may duplicate a message.
Service acceptance does not prove inbox delivery. Donations record intent only;
there is no payment processing. Newsletter subscriptions are explicitly unavailable.

## Validation and dependency maintenance

```sh
npm run lint
npm run build
node scripts/check-forms.mjs
npm audit
npm run preview
```

`lint` is TypeScript checking, not ESLint. The standalone regression script uses
existing TypeScript and mocked service responses/component hooks, with no live
requests or new test framework. It does not replace browser testing.
Use `npm install` only for deliberate dependency updates, review the lockfile and
audit results, then run checks. Do not run `npm audit fix --force` automatically.

Historical Git inspection: empty `package-lock.json` and `bun.lock` files were
added in `5e8ed4c` and `c588207`, respectively, then deleted in `54dfcb8`.
The deletion commit describes runtime dependencies but gives no lockfile rationale.
Neither lockfile was ignored. A complete npm lockfile now replaces that state.

## Vercel production configuration (manual)

1. Connect the intended repository/project. Select Vite, repository root as Root
   Directory, Node **22.x**, Install Command `npm ci`, Build Command `npm run build`,
   Output Directory `dist`.
2. Verify the Production Branch is the team's intended release branch (historically
   `main`). Work here stays on `development`; changes do not constitute deployment approval.
3. In Project Settings → Environment Variables, set `VITE_WEB3FORMS_ACCESS_KEY`
   for Production. Configure Preview/Development separately when required; avoid
   real submissions from previews. Environment changes require a new build/deploy.
4. In Domains, verify `projectluminary.org` belongs to this Vercel project and
   follow Vercel's displayed DNS records. Check certificate provisioning, apex and
   `www` behavior, canonical redirects, and any deployment protection settings.
5. Verify Web3Forms recipient activation, allowed domains (if restrictions are
   enabled), quota, and inbox/spam delivery. A live test needs explicit approval.

`vercel.json` rewrites known public routes to their generated HTML files;
`vite.config.ts` retains `base: '/'`. The generic SPA catch-all has been removed
so genuinely unknown requests use the generated `404.html` with HTTP 404.
Canonical routes: `/`, `/about-us`, `/our-work`, `/our-work/:id`, `/opportunities`,
`/opportunities/:id`, `/contact`, `/donate-us`. Existing `/home`, `/activities`,
`/activities/:id`, `/donate`, and `#/...` links remain supported, including historical IDs.
Unknown URLs retain their address and display a branded not-found page.

The **GitHub Pages workflow remains enabled and has not been removed**. It still
runs on pushes to `main` and manual dispatch; only installation now uses `npm ci`.
Pages lacks a History API fallback and repository-subpath asset configuration,
so it conflicts with the intended Vercel hosting model. Review GitHub Pages/custom
domain settings and decide separately whether to disable that deployment workflow.
No DNS, hosting settings, workflows triggers, or production deployments were changed.

After an approved deployment, manually check all primary/detail routes on refresh,
aliases and legacy hash URLs, Back/Forward, filters/pagination, and both forms at
phone/tablet/desktop widths. Repository rewrites cannot verify live DNS or Vercel settings.

References: [Vite environment variables](https://vite.dev/guide/env-and-mode),
[Vercel Vite SPA hosting](https://vercel.com/docs/frameworks/frontend/vite),
[Vercel environment configuration](https://vercel.com/docs/environment-variables),
[Web3Forms public keys and domain restrictions](https://docs.web3forms.com/getting-started/faq).

## Validation snapshot — 2026-11-18

- Clean `npm ci --ignore-scripts` succeeded on Node 22.23.5 / npm 10.9.11;
  package lifecycle scripts were intentionally skipped during this local check.
- `npm run lint`, `npm run build`, and `node scripts/check-forms.mjs` passed.
- Twelve canonical/detail/alias URLs returned the SPA shell from local preview.
  This verifies HTTP fallback only, not browser rendering or route transitions.
- Online npm audit reported **four high-severity affected packages** in the
  `picomatch` → `fdir` / `tinyglobby` → Vite chain
  ([ReDoS advisory](https://github.com/advisories/GHSA-fc5q-39xc-vjpf)).
  These are dependency-chain findings, not four independent flaws. No audit fixes
  or breaking upgrades were applied. Review a scoped dependency update separately.
- Installation warned that transitive `node-domexception@1.0.0` is deprecated.
  Build warned about the existing 1.41 MB JavaScript chunk (323 KB gzip).
- No browser was exposed to the session: responsive layout, Back/Forward,
  interactive filters/pagination, and browser-native validation remain unverified.
  No live forms, newsletter requests, deployments, or DNS changes were performed.

## Performance optimization (Phase 4)

The approved performance work uses an explicit typed Lucide icon map, generated
WebP derivatives, responsive image candidates, intrinsic image dimensions, and
lazy loading of secondary media. Critical hero/detail images remain eager.
Activity blur layers reuse the foreground's selected source after it loads.
Favicons are valid PNG/ICO assets rendered from the existing `Logo` component.
Original photographs, screenshots, and legacy assets are retained; invalid old
favicons are preserved under `public/images/original-favicons/`.

See [the consolidated performance report](docs/performance/REPORT.md) for baseline,
stage measurements, validation, and limits, and [image guidelines](docs/IMAGE_GUIDELINES.md)
for future content. `docs/performance/image-optimization.json` records every
source hash and generated derivative. The normal build uses checked-in assets;
it requires no new packages or encoder.

Run `node scripts/check-performance.mjs` alongside lint, build, and the existing
mocked form regression checks. Optional browser smoke and measurement scripts
use an already available Playwright installation via `PLAYWRIGHT_MODULE`; they
do not install it or change project dependencies. Browser requests to external
origins are blocked during validation.

Routing, article content, design tokens, font/Motion architecture, and deployment
configuration are unchanged. Route-specific code splitting remains deferred.

## Content corrections (Phase 5A)

Newsletter signup is unavailable until a service is approved. Closed opportunity
records remain visible, with application controls shown only when their existing
availability flag permits applications. Missing profile fields are preserved in
data while empty badges/social sections are omitted. Team portrait failures now
use the same initials approach as advisors, retaining responsive WebP images.

Article reading time is computed at 225 words per minute, rounded up with a
one-minute minimum, excluding Markdown syntax and link destinations. Report
labels and confirmed non-quoted spelling/grammar have been corrected; report
URLs, dates, statistics, attributed quotations, and pending organizational facts
remain unchanged. See [pending content](docs/CONTENT_PENDING.md) for required
organizational confirmations. The Phase 4 report is a historical performance
snapshot rather than a claim about the current bundle after later changes.

Run `node scripts/check-content.mjs` for article, report-link, reading-time, and
availability checks. Optional `scripts/check-browser-content.mjs` uses an existing
Playwright installation (`PLAYWRIGHT_MODULE`) against the local dev server to
exercise open/closed fixtures, clipboard outcomes, empty states, profile fallbacks,
and modal rendering. Fixtures stay in the browser and never update `src/data.ts`.

## SEO and social sharing (Phase 6)

`src/seo.ts` is the shared metadata registry for six main pages, five published
activity articles, and the closed opportunity archive. Activity/opportunity
records come from `src/data.ts`; preserve historical IDs. Descriptions use existing
content and exclude pending profile information and unverified contact/impact
claims. Closed opportunities remain indexable archives, with closed status in
metadata and no `JobPosting` schema. Their application availability is unchanged.

Every canonical page has a unique title/description, canonical URL, Open Graph
and Twitter/X metadata, image alt text/dimensions, and one JSON-LD graph. The graph
uses Organization, WebSite, WebPage (AboutPage/ContactPage where appropriate),
Article for activity details, and BreadcrumbList for non-home pages. It omits
unverified addresses, phone numbers, affiliations, ratings, and author identities.
Article publication dates reuse displayed article dates; programme dates and
modification dates are not inferred. `index, follow` preserves the previously
unrestricted indexing policy; the generated robots file allows public assets.

`seo-build.ts` adds a Vite build plugin without new dependencies. It generates
route-specific HTML heads in `dist/seo/`, `dist/sitemap.xml` (12 canonical URLs,
no aliases or invented `lastmod`), and `dist/robots.txt`. All files share the same
application bundle and CSS. The existing navigation effect replaces metadata
on client navigation and removes stale article/OG/Twitter/canonical tags.
This is **static metadata generation**, not full content prerendering: the body
still mounts React, and crawlers need JavaScript to read the complete page body.
The sitemap provides URL discovery alongside the current button-based navigation.

### Vercel routing and release requirements

The approved repository `vercel.json` now contains the exact route-specific
rewrites: 11 non-home canonical pages and eight aliases. There is no generic
SPA fallback. The homepage remains the normal `/index.html` filesystem entry.
`trailingSlash: false` normalizes slash variants with a redirect, preserving queries.
No domain redirect, runtime function, framework, or hosting dashboard setting is
changed. Static files take precedence over Vercel rewrites, keeping assets,
sitemap, and robots accessible. The preview server reads the active repository
mappings; local checks are not proof of Vercel edge or dashboard configuration.

The build fails if the configured rewrites differ from the metadata registry.
After adding/removing a record, preview updated rules with
`node scripts/sync-seo-rewrites.mjs`, review them, then apply deliberately with
`node scripts/sync-seo-rewrites.mjs --write` and rebuild. Other Vercel configuration
fields are preserved by that command. Every successful build also emits the
reproducible `dist/seo/vercel-rewrites.proposed.json` snapshot for review; a normal
build never writes repository configuration. Validate sitemap and metadata after
every intentional content/route update.

Read-only production checks on 21 November 2026 found:

- Vercel redirects `https://projectluminary.org` to `https://www.projectluminary.org`
  with HTTP 308. Metadata targets the explicitly requested apex origin. Before
  release, the project owner must approve and apply the dashboard correction:
  remove the apex-to-www redirect, attach the production deployment to apex, then
  set www to redirect permanently to apex, preserving paths and query strings.
  Confirm certificates and both domain assignments. Do not add a reverse
  repository redirect while the old dashboard redirect exists: that can loop.
  This direction was rechecked during finalization and remains opposite to the
  intended canonical domain. No domain, DNS, dashboard, or deployment setting has
  been changed here; the owner-applied correction remains pending approval.
- A detail route returned the generic 592-byte SPA shell with only the brand
  title, no description/canonical/social metadata, and an empty React root.
- `/robots.txt` and an unknown path also returned that shell with HTTP 200.
  Generated robots/sitemap assets resolve this file gap after deployment.
  These describe the deployed baseline; the approved final corrections now
  replace unknown-path fallback in the repository with HTTP 404 handling.
  Client metadata alone cannot change a response's HTTP status.
- Finalization checks also found the deployed `/sitemap.xml` and sampled
  `/images/optimized/home/home_2-1486.webp` returning that HTML shell rather than
  XML/an image. The existing `/images/logo/PL-Logo.png` returns `image/png`.
  Local build endpoints pass correct content-type and decoding checks; production
  availability of the new generated assets must be checked after an approved
  deployment, rather than inferred from an HTTP 200 alone.

### HTTP 404 final corrections

The build renders `src/components/NotFoundPage.tsx` into `dist/404.html` using
existing React tooling, the shared Logo, design tokens, and the built stylesheet.
This static document has a working homepage link with JavaScript disabled and
does not download the application bundle. It contains only a not-found title,
description, and `noindex, follow`; no homepage canonical, social metadata, or
JSON-LD is inherited. It is excluded from the sitemap.

With no catch-all rewrite, unmatched requests fall through to Vercel's native
[custom static 404 handling](https://vercel.com/docs/routing/custom-404-pages).
The normal filesystem handling still serves real assets and generated documents.
No server function or dependency was added. Vercel's custom HTML page does not
apply to `/api` platform errors; those still need a non-200 platform response.
Directory listing must remain disabled for directory URLs without an index.

The app also renders the shared not-found component for invalid detail IDs and
unknown History API/hash routes, retains the failing address, clears stale
canonical/social/JSON-LD tags, and sets `noindex, follow`. Known hash routes and
aliases keep working. Client-only navigation (including a root `#/unknown`
fragment) makes no new HTTP request and cannot change the original document's
status. A direct load or refresh of the resulting unknown path returns HTTP 404.

Vite preview mirrors active known-route mappings, static files, slash redirects,
and explicit 404 status responses; its default SPA fallback is suppressed for
unknown requests. Regression checks inspect GET and HEAD status, raw metadata,
missing assets, unknown IDs, queries, no-JavaScript rendering, and browser history.
Production edge status/custom page behavior must still be checked after an
approved deployment. No dashboard settings were modified.

Existing landscape WebPs are reused without cropping; their original proportions
and legibility are retained. Logo previews use the existing 1080px PNG and a
Twitter summary card; landscape previews use summary_large_image. These tags
do not create browser image downloads or change responsive content-image loading.
No new share artwork was created. Optional future card proposal: 1200×630 PNG,
brand light background, existing logo, organization name and approved tagline,
with generous margins and no new claims. Approve the design before creation;
social platforms may crop the current non-1.91:1 images differently.

### SEO validation and production follow-up

Run after `npm run build`:

```sh
node scripts/check-seo.mjs
node scripts/check-content.mjs
node scripts/check-forms.mjs
node scripts/check-performance.mjs
```

Optional browser checks use an already available Playwright module, with
`PLAYWRIGHT_MODULE` set to its path; no installation is required by these scripts:

```sh
node scripts/check-browser-seo.mjs
node scripts/check-browser.mjs
```

Run those against `npm run preview` on port 4173. Content/forms browser checks
use the dev server on port 3000 with the process-only dummy key
`VITE_WEB3FORMS_ACCESS_KEY=performance-mock-key`; all external requests are blocked
or intercepted. The SEO checks cover generated HTML, canonical aliases, JSON-LD
syntax/graph fields, sitemap XML parsing, image decoding, refresh, navigation,
stale-tag cleanup, and Back/Forward at 390/768/1440px. They do not certify Google
rich-result eligibility or a platform's cached card presentation.

After an approved release, verify HTTP status/content types and initial HTML for
every canonical/alias URL at the public origin, plus public image availability
to Facebook, LinkedIn, Telegram, and Twitterbot user agents. Check dashboard
headers for X-Robots-Tag, domain redirects, deployment protection, and Preview
indexing policy. Use Facebook Sharing Debugger, LinkedIn Post Inspector, and the
available platform preview tools to refresh cached cards. Use Schema.org Validator
and Google's Rich Results Test/URL Inspection on the deployed pages; no rich
results or indexing is guaranteed. In Search Console verify the domain property
using the owner's chosen method and submit the canonical `/sitemap.xml`. No
verification token is invented or committed by this task.

References: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[Open Graph protocol](https://ogp.me/), [Schema.org Article](https://schema.org/Article),
[Vercel rewrite configuration](https://vercel.com/docs/project-configuration/vercel-json#rewrites).


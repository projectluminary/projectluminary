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
there is no payment processing. The footer newsletter remains a local UI stub.

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

`vercel.json` already rewrites SPA paths to `/index.html`; `vite.config.ts` retains
`base: '/'`. Keep both for root-hosted History API direct loads and refreshes.
Canonical routes: `/`, `/about-us`, `/our-work`, `/our-work/:id`, `/opportunities`,
`/opportunities/:id`, `/contact`, `/donate-us`. Existing `/home`, `/activities`,
`/activities/:id`, `/donate`, and `#/...` links remain supported, including historical IDs.
Unknown URLs retain existing fallback behavior.

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


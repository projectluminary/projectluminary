# AGENTS.md — OpenAI Codex Project Instructions

This repository contains the existing **Project Luminary** web portal (React 19 + TypeScript + Vite + Tailwind CSS v4). Maintain and improve it incrementally; do not rebuild or redesign it without an explicit request. Read `PROJECT_HANDOVER.md` for architectural and historical context before substantial changes. The current source and configuration are authoritative when that document disagrees with implementation; its suggested next steps are not approval to implement them.

## 1. Tech Stack & Commands
- **Runtime / Build:** Vite (`^6.2.3`), React (`^19.0.1`), TypeScript (`~5.8.2`), Tailwind CSS v4 (`@tailwindcss/vite`).
- **Package scripts (`package.json`):**
  - `npm run dev` — Run Vite dev server on `http://localhost:3000`
  - `npm run lint` — TypeScript check (`tsc --noEmit`)
  - `npm run build` — Production build (`vite build` -> `./dist`)
  - `npm run preview` — Preview production build locally
- **Always run `npm run lint` and `npm run build` before finishing any task.**
- On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`. The `clean` script uses Unix `rm -rf`; do not assume it works in PowerShell or run it as routine validation.
- `lint` is a TypeScript check only, not ESLint. TypeScript strict mode is not enabled, and `@types/react` / `@types/react-dom` are not declared or installed at onboarding; propose stronger typing separately. No test script, test runner, or automated test suite is currently configured.
- CI uses Node 22 and `npm install`. No lockfile is currently present or tracked (the handover's `bun.lock` reference is stale). Do not silently introduce a lockfile or switch package managers; propose a reproducible installation policy first. Without a lockfile, fresh dependency resolution can differ from the original AI Studio environment.

## Architecture & Coding Practices
- `src/main.tsx` mounts `App` in React StrictMode and Vercel Analytics. `src/App.tsx` owns History API routing, directory filters/pagination, selected records, and all six primary views plus two detail views. There is no router library or global state store.
- Shared UI lives in `src/components/`; data interfaces live in `src/types.ts`; global styling and Tailwind v4 CSS-first tokens live in `src/index.css`. The `@` alias resolves to the repository root, not `src/`.
- Follow the surrounding TypeScript/TSX style, typed props, functional components, and hooks. Reuse existing cards, forms, `Logo`, `ArticleRenderer`, and data types before introducing equivalent components. Avoid new `any` casts and new dependencies unless needed for the requested change.
- Keep changes focused. Extract shared UI when it reduces duplication within an approved task; propose broad page extraction, router replacement, dependency cleanup, or backend work separately. Clean up listeners, timers, and animation work introduced by new effects, accounting for StrictMode.

## 2. Critical Design & Theme Conventions
- **Brand Color Override (`src/index.css`):** Tailwind `emerald-*` and `teal-*` color tokens are overridden in `@theme` to Project Luminary's brand cyan-teal palette (`--color-emerald-500: #3797a4`, `--color-emerald-600: #2b7b87`, `--color-teal-500: #238ea0`).
  - Continue using `emerald-*` and `teal-*` classes for brand accents; do **not** introduce Tailwind `green-*` or arbitrary off-brand hex colors.
- **Typography:** `Inter` (`font-sans`), `Outfit` (`font-display`), and `JetBrains Mono` (`font-mono`) via Google Fonts in `src/index.css`.
- **Visual Consistency:** Keep page backgrounds `#f8fafc`, cards `bg-white border border-slate-100 rounded-3xl`, and activity images framed with a blurred background + `object-contain` foreground so varied aspect ratios never crop.
- **Logos & Images:** Use `<Logo />` (`src/components/Logo.tsx`) for brand marks. Keep `referrerPolicy="no-referrer"` on `<img>` tags and preserve the `onError` initials fallback on advisor avatars.
- Preserve existing semantic colors for status, errors, recognition, and opportunity types; brand accents use the overridden emerald/teal palette.
- Preserve mobile-first layouts, fixed-header clearance, wrapping filters, readable article widths, and stacked mobile detail/form layouts. Check narrow phones, tablets (especially the `md` navbar breakpoint), and desktop after layout changes; avoid horizontal overflow and cropped activity photos.
- Preserve meaningful alt text, form labels, keyboard operation, and focus visibility. Give new icon-only controls accessible names and appropriate expanded/selected state; account for reduced-motion preferences when adding animation.

## 3. Data & Content Rules (`src/data.ts`)
- Organizational records, `SITE_CONFIG`, stats, testimonials, opportunities, and activity articles live in `src/data.ts` (typed by `src/types.ts`). Prefer this file for shared content changes, but inspect the relevant view: substantial page copy, navigation labels, and form/footer messages are still inline in components and `App.tsx`.
- **Do not rename existing `ACTIVITIES_DATA` IDs** (even historical typos like `lumina-academic-research-cnsortium` and `pathways-and-perspectives-pogramme`) without keeping route aliases so shared links remain valid.
- **Article Formatting (`src/components/ArticleRenderer.tsx`):** Activity `content` strings use a custom block parser split on `\n\n+`:
  - `## Heading`, `### Callout Heading`, `> Title\nBody` quote blocks, 3+ `- **Value** Label` metric lines, `- Bullet` lists, standalone `**Subheading**`, inline `**bold**`, and `[Download ...](https://drive.google.com/...)` cards.
  - Check existing articles in `src/data.ts` before changing parser rules.
- **Static Asset Paths:** Store public images in `public/images/...` and ensure filenames match exact casing (Linux CI is case-sensitive). Optimize large photos before committing.
- Preserve existing opportunity IDs as well as activity IDs. Check every current article when changing the parser (there are five activities at onboarding, not four). This renderer supports a custom subset of Markdown; do not assume full Markdown or general link support.
- Some existing image URLs are relative (`images/...`). Verify asset resolution on nested detail URLs as well as the home page; root-relative `/images/...` paths match the current root hosting configuration for new public assets.

## 4. Routing & Navigation Invariants (`src/App.tsx`)
- The app uses custom History API SPA routing (`PAGE_TO_PATH`, `PATH_TO_PAGE`, `popstate`, and `#/...` hash migration) in `src/App.tsx`.
- Canonical paths: `/`, `/about-us`, `/our-work`, `/our-work/:id`, `/opportunities`, `/opportunities/:id`, `/contact`, `/donate-us`.
- Preserved aliases: `/home` -> `/`, `/activities` -> `/our-work`, `/activities/:id`, `/donate` -> `/donate-us`.
- Keep `vercel.json` SPA rewrites and `base: '/'` in `vite.config.ts` intact.
- Preserve direct loads, browser Back/Forward, document titles, legacy hash migration, detail selections, and filter reset/pagination behavior. Unknown routes currently fall back to home or the relevant directory; changing this behavior is a separate task.
- The GitHub Pages workflow deploys on push to `main` or manual dispatch. It lacks an SPA deep-link fallback; root-relative assets also assume root hosting rather than a repository subpath. Do not alter deployment configuration or hosting assumptions without approval.

## 5. External Services & Security
- **Web3Forms (`src/components/ContactForm.tsx`, `src/components/DonateForm.tsx`):** Reads `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`. Never commit `.env` or real access keys/secrets.
- All `VITE_*` values are public build-time frontend values, not secret storage. Keep `.env.example` blank or populated with placeholders only; never print real credentials in tool output or documentation. Environment changes require a rebuild to affect the bundle.
- Preserve form validation, loading, error, and reset states. Both forms currently simulate success if the key is missing, including in production; report this limitation rather than treating success UI as evidence of delivery. Donation submission records intent only, with no payment processing.
- Do not send real form submissions, newsletter signups, or email as validation without explicit authorization. Use local/mocked responses for interaction testing.
- **Analytics:** `@vercel/analytics` `<Analytics />` is mounted in `src/main.tsx`.
- **No Backend Server:** Although `express`, `dotenv`, `tsx`, and `@google/genai` exist in `package.json`, no server entrypoint exists. Keep the app pure client-side static unless explicitly asked to build a backend.
- **Browser APIs:** Avoid `window.alert`, `window.confirm`, and `window.open` popups where inline React UI is expected.
- `DISABLE_HMR` controls development HMR/file watching in `vite.config.ts`; do not change it incidentally. Google Fonts, external report/JD links, and social/recognition links are external dependencies, not backend APIs implemented here.

## 6. High-Attention Files & Known Traps
- `src/App.tsx`: Contains routing, state, and all 8 page views. Make targeted edits and avoid breaking `activePage` / `selectedActivity` / `selectedOpportunity` cleanup effects.
- `src/components/Footer.tsx`: Newsletter form currently updates local UI state only (no backend/API).
- `src/data.ts`: Advisors 7–8 still have `'TBD'` bios and Advisors 8–9 have empty `position` strings (watch for empty badge rendering in `src/App.tsx`).
- `src/components/ActivityModal.tsx` & `src/components/OpportunityModal.tsx`: Fallback modals only; primary flows route to full detail pages.
- Team avatars support explicit `initials:XX` values but currently lack the advisors' broken-image `onError` fallback. Do not document the latter as implemented for both grids.
- The handover's CSS warning needs qualification: `active:scale-98` is generated by the current Tailwind build. Unconfigured color shades such as `border-emerald-150` / `text-slate-850` and `animate-fade-in` are absent from the generated CSS. Inspect generated output before replacing utilities.

## Validation & Reporting
- Run both required checks above and report exact results, including unavailable dependencies or blocked checks. Passing compilation does not establish visual quality, accessibility, form delivery, or deployment readiness.
- For UI or routing changes, smoke-test the affected views at phone/tablet/desktop sizes, direct detail URLs, Back/Forward, aliases, filters, pagination, and relevant empty/error states. For article or asset changes, check every affected article/image and exact filename casing. Do not send production submissions during testing.
- Add focused regression tests for meaningful behavior changes when appropriate; do not introduce an entire test framework as an incidental change. Keep pure documentation changes free of unrelated application edits.
- Distinguish implemented functionality, stubs, and proposals in reports. Preserve valid historical decisions without repeating the handover's full feature inventory here. Report issues outside scope before fixing them.

## Git Workflow
- Inspect `git branch --show-current` and `git status --short` before edits. Work on the user's selected branch unless instructed otherwise; `development` is the onboarding branch, not a permanent branch requirement.
- Preserve existing user changes and untracked files. Do not reset, discard, stage unrelated files, or perform destructive cleanup. Review the final diff and status for unintended changes, generated output, or credentials.
- Do not commit, push, merge, or deploy without explicit approval. When a commit is authorized, include only scoped changes and use a concise, descriptive message following the repository's existing style. Report validation results and material limitations.

# Phase 4 performance optimization report

Branch: `development`. Four approved stages completed. No dependencies added,
original photographs/screenshots removed, route splitting, font/Motion architecture
changes, commits, pushes, or deployments.

## Method and evidence

Fresh baseline and each stage used the production build under Node 22.23.5/npm
10 tooling and Chrome. Each route had three cold-context runs at 390x844, DPR 2.
External origins (including Google Fonts) were blocked. Local runs were observed
1.2 seconds after `load`; slow runs used 1.6 Mbps down, 150ms latency, and 4x CPU
slowdown, observed 15 seconds after DOMContentLoaded. Numbers below are medians.
Image counts/payloads are completed first-party `/images/` resource requests before
scrolling, excluding favicons. Slow samples may have unfinished requests.

Raw evidence: [baseline](baseline.json), [icons](stage1.json), [WebP](stage2.json),
[favicons](stage3.json), [responsive/lazy images](stage4.json). Screenshots and
portrait comparison sheets were captured in the temporary `luminary-performance`
directory. These are local lab measurements, not Lighthouse, production Core Web
Vitals, real-device results, or an INP measurement. Normal run variance remains;
intermediate timings do not independently establish each change's causal contribution.

## JavaScript and CSS

| Stage | JavaScript bytes | Gzip bytes |
| --- | ---: | ---: |
| Baseline | 1,410,344 | 323,080 |
| 1: typed Lucide map | 571,332 | 168,457 |
| 2: optimized image references | 571,907 | 168,524 |
| 3: favicon repair | 571,907 | 168,524 |
| 4: responsive/lazy image component and metadata | 585,523 | 170,735 |

Final reduction: **58.5% uncompressed; 47.2% gzip**. Bundle inspection after the
icon change retained 38 icon modules (42 Lucide modules including helpers).
The map covers current data-driven icons and static namespace uses; unknown
names retain the `HelpCircle` fallback. No Lucide namespace imports remain.
CSS is unchanged: 69,588 bytes, 11,086 bytes gzip. A single JavaScript chunk over
500 KB remains, so Vite still warns; route-specific splitting was explicitly deferred.

## Image encoding and quality

33 referenced source images (30,943,035 bytes) now have 98 WebP derivatives.
The largest variant of each totals 7,768,252 bytes, **74.9% smaller**. All variants
together occupy 14,686,626 bytes. Originals remain, so repository/deployment asset
storage grows even while browser transfer falls.

| Asset | Original bytes | Largest derivative bytes | Dimensions of derivative |
| --- | ---: | ---: | --- |
| Dan Wessner | 10,868,816 | 23,422 | 504x336 |
| Ei Phyu Sin Win | 3,843,315 | 45,758 | 288x384 |
| Min Paing | 1,441,600 | 11,950 | 395x336 |
| Home hero | 693,796 | 486,150 | 1486x845 |
| Pilot screenshot 3 | 1,749,192 | 633,986 | 1366x768 |
| Pathways screenshot 6 | 1,374,250 | 594,602 | 1366x768 |

Portraits use quality 92 and three density levels sized from the shorter edge,
with no upscaling. Screenshots, posters, home artwork, and logos use lossless
WebP. The encoder verifies decoded-pixel equality against each resized input;
the full-resolution artwork/screenshot variants preserve source pixels. Smaller
variants resample with Lanczos. EXIF orientation and existing color profiles are
preserved in the generated appearance. AVIF was not introduced.

All 14 portrait pairs were inspected side by side at display sizes. Browser
screenshots were inspected at phone, tablet, and desktop widths; all five
activity pages and their image galleries decoded successfully. Existing circular
portrait crops, contained activity foregrounds, blur effects, colors, and readable
screenshot text were retained. Screenshots already contain small text; this work
does not add a zoom interface or alter their content.

[The image audit](image-optimization.json) records source hashes, encoding mode,
dimensions, sizes, and every generated filename. Hash checks passed for all 33
referenced originals. A separate Git comparison confirmed all 49 original assets
other than the two intentionally replaced root favicons are byte-identical.
All unreferenced assets remain. `src/data.ts` differs only in image references.

## Initial image requests and payload

| Page | Before requests | After requests | Before bytes | After bytes | Reduction |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 6 | 2 | 3,813,391 | 434,292 | 88.6% |
| About | 14 | 0 | 17,024,539 | 0 | 100% deferred |
| Our Work | 4 | 3 | 2,964,066 | 558,794 | 81.1% |
| Pilot Programme | 5 | 1 | 4,208,387 | 291,746 | 93.1% |
| Pathways and Perspectives | 7 | 1 | 5,952,606 | 571,056 | 90.4% |
| Contact | 0 | 0 | 0 | 0 | N/A |

About's zero is initial deferral, not deletion: portraits load when approached.
Native lazy-loading thresholds vary by browser, viewport, and connection.
Intermediate payloads in decimal MB (stages 2 and 3 have identical image URLs):

| Page | Baseline/stage 1 | Stages 2/3 | Stage 4 |
| --- | ---: | ---: | ---: |
| Home | 3.813 | 2.288 | 0.434 |
| About | 17.025 | 0.342 | 0 |
| Our Work | 2.964 | 1.746 | 0.559 |
| Pilot | 4.208 | 1.952 | 0.292 |
| Pathways | 5.953 | 3.451 | 0.571 |

The hero is eager/high priority. Detail covers and the first directory cards are
eager. Other images use native lazy loading and async decoding. Intrinsic width
and height reserve space. `srcSet`/`sizes` account for columns, contained foregrounds,
and avatar object-cover density. Blur layers receive the selected `currentSrc`
only after foreground load, rather than initiating an independent eager download.
Browser checks verified a deep gallery and its background remain unloaded before
scrolling and synchronize after load. No duplicate foreground/background image
downloads appeared in the measured initial page payloads.

## Paint and layout measurements

Slow mobile profile, milliseconds:

| Stage | Home FCP | Home LCP | Contact FCP | Contact LCP |
| --- | ---: | ---: | ---: | ---: |
| Baseline | 3,136 | 3,896 | 2,852 | 2,852 |
| 1 | 2,164 | 2,936 | 1,916 | 1,924 |
| 2 | 2,284 | 3,052 | 1,924 | 1,924 |
| 3 | 2,032 | 2,784 | 1,776 | 1,776 |
| 4 (final rerun) | 2,568 | 3,392 | 2,076 | 2,100 |

Home improved **18.1% FCP / 12.9% LCP**; Contact improved **27.2% FCP / 26.4% LCP**.
The final rerun followed a gallery dimension-reservation correction. An earlier
pass measured Home LCP at 2.78s; the final 3.39s result is reported here. This
variation reinforces the limits of a small local lab sample on a shared computer.
Home's simulated LCP remains above 2.5 seconds; these results are not a production
passing score.

Unthrottled localhost, milliseconds:

| Page | Before FCP/LCP | After FCP/LCP |
| --- | ---: | ---: |
| Home | 240 / 976 | 212 / 944 |
| About | 220 / 220 | 164 / 164 |
| Our Work | 188 / 188 | 140 / 192 |
| Pilot | 204 / 204 | 160 / 224 |
| Pathways | 220 / 220 | 176 / 228 |
| Contact | 188 / 188 | 148 / 148 |

Small local LCP increases on some detail/directory pages are reported rather than
treated as improvements.
Measured initial CLS was **0 for every route at every stage**, including the slow
samples. This limited observation does not prove zero shifts under all real fonts,
devices, image-error conditions, or interactions.

## Favicon repair

The existing `Logo.tsx` brand variant was rendered at high resolution, then
downsampled into a 1,318-byte 32px PNG, a 4,414-byte ICO with 16/32/48px entries,
and a separate 38,722-byte 180px Apple touch icon. Both invalid old 249,284-byte
files are retained unchanged in `public/images/original-favicons/`.
PNG and ICO signatures, all sizes, browser decoding, and HTML links passed.
The PNG was visually inspected at native and enlarged sizes. A visible browser-tab
check could not be completed: no browser connector surface was available, and the
Computer Use native pipe was unavailable. A final tab appearance check on a normal
browser remains recommended; no production change was made.

## Validation and scope

- After each stage: `npm run lint`, `npm run build`, and mocked form regression
  checks passed. No project dependency installation was needed.
- Responsive browser smoke tests passed at 390, 768, and 1440px: six primary
  pages, all five activity details, opportunity detail, direct URLs, aliases,
  legacy hashes, Back/Forward, filters, pagination/reset, empty opportunity state,
  mobile menu, and image decoding, with no uncaught application errors or horizontal
  overflow in checked layouts.
- Focused checks cover current icon names/fallbacks, exact asset filename casing,
  WebP headers, sizes, source hashes, no upscaling, aspect ratios, responsive
  candidates, eager/lazy behavior, background synchronization, and source changes.
- Scroll/decode regression checks confirm contained images reserve a nonzero
  height and change by less than 2px after decoding at all three widths. The deep
  gallery scroll check passed with CLS below 0.001. This caught and corrected an
  unloaded `w-auto` flex-image issue that initial-load CLS checks alone missed.
- The advisor broken-image initials fallback passed with an intercepted failed
  image request. Existing source handling and semantic image alt text remain.
- Existing service/component mock tests passed at each stage. Final browser form
  tests used a dummy key and eight intercepted requests: validation, HTTP failure,
  malformed JSON, network error, retained input, loading, success, and reset passed
  for both forms. No live forms, newsletter signups, or email were sent.
- Final tracked changes were reviewed. `package.json`, `package-lock.json`, Vite,
  deployment configuration, global CSS, article text, and route IDs are unchanged.

Modified application files: `App.tsx`, `data.ts`, `ActivityCard.tsx`,
`ActivityModal.tsx`, `Hero.tsx`, `StatCounter.tsx`, `Testimonials.tsx`, and
`index.html`. Added: `ResponsiveImage.tsx`, icon/image helpers, generated image
metadata, 98 WebP files, touch icon, original favicon backups, optional authoring
and regression/measurement scripts, and performance/image documentation.

## Follow-up work requiring separate scope

1. Check a normal browser tab and the production CDN/font/cache behavior after an
   approved deployment; gather real-device and field metrics before claiming CWV.
2. Consider route-specific/component and article-content splitting; the remaining
586 KB chunk warning is expected under the current restriction.
3. Review font delivery and Motion bundle changes separately, preserving typography
   and animation behavior. Neither architecture changed in this phase.
4. Retain originals until explicit removal approval. Evaluate further image formats
   or compression only through visual comparisons, especially screenshot text.

Future content workflow: [image optimization guidelines](../IMAGE_GUIDELINES.md).

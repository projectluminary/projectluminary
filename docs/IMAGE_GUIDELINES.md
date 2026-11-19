# Project Luminary image guidelines

## Source assets and generated derivatives

- Keep original assets and existing activity/opportunity IDs. Do not overwrite or delete originals during optimization.
- Put shared image references in `src/data.ts`. Use root-relative `/images/...` URLs with exact filename casing.
- Generate derivatives with `python scripts/optimize-images.py` from the repository root, using an existing Pillow installation with WebP support. This authoring tool is not a frontend or CI dependency. Do not install tools without approval.
- The generator writes `public/images/optimized/`, `src/imageAssets.ts`, and `docs/performance/image-optimization.json`, and updates matching data references. Review all generated changes together. The audit records source hashes, dimensions, sizes, and encoding mode.
- Normal `npm run build` uses the checked-in derivatives; it does not run an encoder. Keep generated assets in Git alongside their references.
- To regenerate favicons from the existing `Logo.tsx` component, run `node scripts/generate-favicons.mjs` with `PLAYWRIGHT_MODULE` and, if needed, `PYTHON_EXECUTABLE` pointing to existing tools. It creates a 32px PNG, a 16/32/48px ICO, and a separate 180px touch icon. The original invalid files remain in `public/images/original-favicons/`.

## Dimensions, framing, and quality

- Preserve the original aspect ratio, orientation, color profile, and crop. Existing `object-contain` activity foregrounds and blurred backgrounds must remain intact.
- Team avatars occupy 96 CSS pixels; advisor avatars occupy 112 CSS pixels. Generate three density levels using the source's shorter edge, without upscaling. Preserve the full portrait, allowing the existing CSS to apply its circular crop.
- Portraits use WebP quality 92. Inspect eyes, hair, skin, and edges at the actual display size and at high pixel densities; quality numbers alone do not establish visual quality.
- Screenshots, posters, logos, and current home images use **lossless WebP**. Full-size variants preserve decoded source pixels; smaller responsive variants necessarily resample pixels with Lanczos filtering. Verify screenshot text remains readable at the intended display size.
- General image candidates use 480px, 960px, and original widths, capped at the original dimensions. Small logo candidates use 96px, 192px, and original width. Do not upscale small sources.
- Do not introduce AVIF or lower lossy quality solely to reach a byte target. Compare size, readability, color, and device decoding behavior before adopting a different format or quality policy.

## Rendering and loading

- Use the shared `ResponsiveImage` component for optimized assets. Its manifest supplies intrinsic dimensions and responsive candidates; callers supply accurate `sizes` for their layout.
- Keep the home hero and detail cover images eager. Use high fetch priority only for the home hero. Activity directory cards that can appear above the fold remain eager.
- Lazy-load below-the-fold portraits, secondary images, testimonials, and galleries. Lazy loading defers bytes until needed; it does not reduce the total bytes for users who read the full page.
- For activity frames, pass the existing blur class to `ResponsiveImage`. It applies the browser-selected `currentSrc` to the decorative background only after the foreground loads, avoiding an independent eager source or oversized background request.
- Retain `referrerPolicy="no-referrer"`, meaningful alt text, and advisor image-error initials fallback. Decorative layers must be hidden from assistive technology.
- Supply width and height to reserve the source aspect ratio. Keep existing fixed avatar dimensions and activity frame constraints. Check layout shifts before and after scrolling.
- For intrinsically sized `w-auto` detail/gallery images, pass the existing height cap as `maxDisplayHeight` (520px for covers, 580px for detail galleries). This reserves their contained width and height before lazy decoding; intrinsic attributes alone do not reserve these particular flex items reliably.

## Verification before publishing

1. Run `npm run lint`, `npm run build`, `node scripts/check-forms.mjs`, and `node scripts/check-performance.mjs`.
2. With an already available Playwright installation, set `PLAYWRIGHT_MODULE` to its module path and run `node scripts/check-browser.mjs` against local preview. No test tool is added to project dependencies.
3. Inspect mobile, tablet, and desktop layouts, each affected article, face crops, blur layers, screenshots, and image-error fallbacks. Confirm both initial loads and browser Back/Forward.
4. Compare cold image requests, payload, FCP, LCP, and CLS with `node scripts/measure-performance.mjs <label>`. External origins are blocked; measurements are local lab results, not production Core Web Vitals.
5. Check every output's dimensions, decoding, extension, and exact path casing. Keep original hashes unchanged. Mock form responses; never send live submissions for validation.

The optional browser scripts write JSON and screenshots to the operating system's temporary `luminary-performance` directory by default. Set `PERFORMANCE_OUTPUT` and `PERFORMANCE_ORIGIN` to override the destination and local preview origin.

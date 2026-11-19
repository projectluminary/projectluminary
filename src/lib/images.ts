import { IMAGE_ASSETS, type ImageAsset } from '../imageAssets';

const assetsBySource: Readonly<Record<string, ImageAsset>> = Object.fromEntries(
  Object.entries(IMAGE_ASSETS).flatMap(([source, asset]) => [[source, asset], [asset.src, asset]])
);

export function getImageAsset(src: string): ImageAsset | undefined {
  const source = src.startsWith('images/') ? `/${src}` : src;
  return assetsBySource[source];
}

// An object-cover avatar needs enough pixels along the source's shorter edge.
export function getAvatarSizes(src: string, displaySize: number): string {
  const asset = getImageAsset(src);
  return `${displaySize * (asset ? Math.max(1, asset.width / asset.height) : 1)}px`;
}

// Activity foregrounds are contained in a 16:9 frame, with a 32px grid gap.
export function getCardImageSizes(src: string, columns: 2 | 3): string {
  const asset = getImageAsset(src);
  const factor = asset ? Math.min(1, (asset.width / asset.height) / (16 / 9)) : 1;
  const gap = (columns - 1) * 32;
  const desktop = ((1280 - 96 - gap) / columns) * factor;
  return `(min-width: 1280px) ${desktop}px, (min-width: 768px) calc(${100 * factor / columns}vw - ${(96 + gap) * factor / columns}px), calc(${100 * factor}vw - ${48 * factor}px)`;
}

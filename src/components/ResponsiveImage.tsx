import React, { useState } from 'react';
import { getImageAsset } from '../lib/images';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  backgroundClassName?: string;
  maxDisplayHeight?: number;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export default function ResponsiveImage({
  src, alt, className, sizes, loading = 'lazy', fetchPriority,
  backgroundClassName, maxDisplayHeight, onError,
}: ResponsiveImageProps) {
  const asset = getImageAsset(src);
  const [loaded, setLoaded] = useState<{ source: string; url: string } | null>(null);

  return (
    <>
      {backgroundClassName && (
        <div
          aria-hidden="true"
          data-image-background=""
          className={backgroundClassName}
          style={{ backgroundImage: loaded?.source === src ? `url("${loaded.url}")` : undefined }}
        />
      )}
      <img
        src={asset?.src ?? src}
        srcSet={asset?.variants.map(variant => `${variant.src} ${variant.width}w`).join(', ')}
        sizes={asset ? sizes : undefined}
        width={asset?.width}
        height={asset?.height}
        style={asset && maxDisplayHeight ? {
          // w-auto images have no intrinsic width before a lazy source decodes.
          // Reserve the same contained box as the loaded image's height limit.
          width: `min(100%, ${asset.width}px, ${maxDisplayHeight * asset.width / asset.height}px)`,
          height: 'auto',
          aspectRatio: `${asset.width} / ${asset.height}`,
        } : undefined}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        referrerPolicy="no-referrer"
        className={className}
        onLoad={backgroundClassName ? event => setLoaded({ source: src, url: event.currentTarget.currentSrc }) : undefined}
        onError={onError}
      />
    </>
  );
}

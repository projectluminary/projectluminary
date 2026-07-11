import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  variant?: 'light' | 'dark' | 'brand';
}

export function Logo({ size = 32, className = '', variant = 'brand' }: LogoProps) {
  // Determine stroke color based on variant
  const getStrokeColor = () => {
    switch (variant) {
      case 'light':
        return '#e2e8f0'; // slate-200 for dark background
      case 'dark':
        return '#0f172a'; // slate-900 for pure white background
      case 'brand':
      default:
        return '#a1a1aa'; // slate-400 (exact elegant grey of the uploaded logo)
    }
  };

  const strokeColor = getStrokeColor();

  // Draw 36 concentric circles that touch on the right and fan out on the left
  // to recreate the exact fanned-out crescent effect from the uploaded logo.
  const circles = [];
  const totalCircles = 38;
  
  for (let i = 0; i < totalCircles; i++) {
    const t = i / (totalCircles - 1); // 0 to 1
    
    // Radius grows from 14 to 38
    const r = 14 + t * 24;
    
    // To make them meet/touch perfectly on the right and fan out to the left,
    // we keep the right edge (cx + r) constant at 82.
    const cx = 82 - r;
    const cy = 50;

    circles.push(
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={strokeColor}
        strokeWidth={0.22 + (1 - t) * 0.15} // Thin, high-precision lines matching the logo detail
        opacity={0.35 + t * 0.5} // Beautiful gradient opacity to match the soft texture of the original logo
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      {/* Group of fanned lines matching the uploaded crescent perfectly */}
      <g className="transition-all duration-300">
        {circles}
      </g>
    </svg>
  );
}

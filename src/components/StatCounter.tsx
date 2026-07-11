import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';

interface StatCounterProps {
  key?: string;
  label: string;
  value: number;
  suffix: string;
  iconName: string;
}

export default function StatCounter({ label, value, suffix, iconName }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Dynamic Lucide Icon Resolution
  const LucideIcon = (Icons as any)[iconName] || Icons.HelpCircle;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const end = value;
    const range = end - start;
    
    // Calculate increment speed
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, 16); // cap at ~60fps (16ms)
    
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out expo or quad formula
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * range + start);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [hasAnimated, value]);

  // Format count nicely (e.g. 12,500 instead of 12500)
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div
      ref={elementRef}
      id={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl mb-5">
        <LucideIcon size={28} />
      </div>
      <div className="font-sans font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight mb-2">
        {formatNumber(count)}
        <span className="text-emerald-500 font-bold">{suffix}</span>
      </div>
      <div className="font-sans font-medium text-slate-500 text-sm tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

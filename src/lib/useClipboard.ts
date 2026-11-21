import { useEffect, useRef, useState } from 'react';

export function useClipboard(text: string) {
  const [status, setStatus] = useState<'idle' | 'copying' | 'copied' | 'error'>('idle');
  const generation = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setStatus('idle');
    return () => {
      generation.current++;
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, [text]);

  const copy = async () => {
    const current = ++generation.current;
    if (timer.current !== null) clearTimeout(timer.current);
    setStatus('copying');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      if (generation.current !== current) return;
      setStatus('copied');
      timer.current = setTimeout(() => {
        if (generation.current === current) setStatus('idle');
      }, 2000);
    } catch {
      if (generation.current === current) setStatus('error');
    }
  };

  return { status, copy };
}

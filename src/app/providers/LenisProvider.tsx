'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export let lenis: Lenis | null = null;

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    lenis = new Lenis({
      lerp: 0.1,
      easing: (t) => t,
    });

    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}

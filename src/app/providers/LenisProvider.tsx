'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export let lenis: Lenis | null = null;

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    lenis = new Lenis({
      lerp: 0.1,
      easing: (t) => t,
    });

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      lenis?.scrollTo(0, {
        immediate: true,
        force: true,
      });
      ScrollTrigger.refresh();
    };

    const lockScroll = () => {
      scrollToTop();
      lenis?.stop();
      document.documentElement.classList.add('lenis-stopped');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
      scrollToTop();
      lenis?.start();
      document.documentElement.classList.remove('lenis-stopped');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      ScrollTrigger.refresh();
    };

    lenis.on('scroll', ScrollTrigger.update);

    function update(time: number) {
      lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    window.addEventListener('itsken:scroll-lock', lockScroll);
    window.addEventListener('itsken:scroll-unlock', unlockScroll);

    lockScroll();

    return () => {
      window.removeEventListener('itsken:scroll-lock', lockScroll);
      window.removeEventListener('itsken:scroll-unlock', unlockScroll);

      gsap.ticker.remove(update);
      lenis?.destroy();
      lenis = null;

      document.documentElement.classList.remove('lenis-stopped');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return <>{children}</>;
}
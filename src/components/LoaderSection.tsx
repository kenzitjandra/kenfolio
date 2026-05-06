'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import LoaderScene from '@/components/three/LoaderScene';

type LoaderSectionProps = {
  onDone: () => void;
  onExitStart?: () => void;
};

export default function LoaderSection({ onDone, onExitStart }: LoaderSectionProps) {
  const [progress, setProgress] = useState(0);
  const [cubeT, setCubeT] = useState(0); // 0..1 smooth cube timeline
  const [loadingDots, setLoadingDots] = useState('.');

  const stageRef = useRef<HTMLDivElement>(null);

  // refs for adaptive cube timing
  const progressRef = useRef(0);
  const cancelledRef = useRef(false);

  const lastProgRef = useRef(0);
  const lastTimeRef = useRef(0);
  const speedRef = useRef(0); // % per second (smoothed)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLoadingDots((current) => {
        return current.length >= 3 ? '.' : current + '.';
      });
    }, 450);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    cancelledRef.current = false;

    // Ensure page behind is at top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });

    // lock scroll + stop Lenis
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new Event('itsken:scroll-lock'));

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let rafId = 0;

    // --- EXIT TRANSITION (zoom out + swipe up, no fade) ---
    const runExitTransition = async () => {
      const el = stageRef.current;
      if (!el) return;

      gsap.set(el, {
        transformOrigin: '50% 50%',
        willChange: 'transform',
      });

      // 1. Zoom out first
      await new Promise<void>((resolve) => {
        gsap.to(el, {
          scale: 0.68,
          duration: 0.55,
          ease: 'power3.inOut',
          onComplete: resolve,
        });
      });

      if (cancelledRef.current) return;

      // 2. Start the real website reveal right before loader swipes up
      onExitStart?.();

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      // 3. Swipe loader upward
      await new Promise<void>((resolve) => {
        gsap.to(el, {
          yPercent: -130,
          duration: 0.85,
          ease: 'power3.inOut',
          onComplete: resolve,
        });
      });
    };

    const finish = async () => {
      // make sure cube is finished
      setCubeT(1);
      

      await runExitTransition();
      if (cancelledRef.current) return;

      // unlock scroll + start Lenis
      window.dispatchEvent(new Event('itsken:scroll-unlock'));
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;

      // Keep user at the real top (title is top)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });

      onDone();
    };

    // --- Smooth cube driver (adaptive to progress rate) ---
    const animateCube = (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      const p = progressRef.current;

      // Update smoothed speed estimate (% per second)
      const dp = p - lastProgRef.current;
      lastProgRef.current = p;

      if (dt > 0) {
        const instantSpeed = dp / dt; // spiky by nature
        const alpha = 0.12; // smoothing for speed estimate
        speedRef.current = speedRef.current * (1 - alpha) + instantSpeed * alpha;
      }

      const safeSpeed = Math.max(2.0, speedRef.current); // min %/s so cube keeps moving
      const remainingPct = Math.max(0, 100 - p);
      const etaSec = remainingPct / safeSpeed; // seconds until progress ~100

      setCubeT((currentT) => {
        if (p >= 100) return 1;
        if (currentT >= 1) return 1;

        const remainingT = 1 - currentT;
        const safeEta = Math.max(0.22, etaSec); // avoid last-second snap acceleration
        const dT = (remainingT / safeEta) * dt;

        return Math.min(1, currentT + dT);
      });

      if (!cancelledRef.current) rafId = requestAnimationFrame(animateCube);
    };

    // initialize cube driver refs
    rafId = requestAnimationFrame((now) => {
      lastTimeRef.current = now;
      lastProgRef.current = progressRef.current;
      speedRef.current = 0;
      rafId = requestAnimationFrame(animateCube);
    });

    // --- Stuttery progress ticker (your loading number) ---
    const tick = () => {
      setProgress((p) => {
        if (p >= 100) return 100;

        const jump =
          Math.random() < 0.75
            ? 1 + Math.floor(Math.random() * 2)
            : 3 + Math.floor(Math.random() * 8);

        const next = Math.min(100, p + jump);

        // keep ref synced for cube driver
        progressRef.current = next;

        if (next === 100) {
          // ensure cube is finished
          setCubeT(1);

          setTimeout(() => {
            if (cancelledRef.current) return;
            finish();
          }, 250);
        }

        return next;
      });

      if (cancelledRef.current) return;

      const delay =
        Math.random() < 0.85
          ? 20 + Math.random() * 80
          : 80 + Math.random() * 180;

      timeoutId = setTimeout(tick, delay);
    };

    // start at 0
    progressRef.current = 0;

    timeoutId = setTimeout(tick, 200);

    return () => {
      cancelledRef.current = true;
      if (timeoutId) clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);

      // unlock scroll (safety)
      window.dispatchEvent(new Event('itsken:scroll-unlock'));
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [onDone, onExitStart]);

  // keep progressRef in sync even if state updates elsewhere
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  return (
    <section className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
      <div ref={stageRef} className="relative h-full w-full bg-[#212844]">
        {/* loading text - top left */}
        <div className="absolute left-[clamp(0.5rem,2vw,2rem)] top-[clamp(1rem,3vw,3rem)] z-20">
          <h1 className="font-heading text-[#E6D5B7] text-[clamp(4rem,8vw,8rem)] leading-[0.85] tracking-tight">
            LOADING
            <span className="inline-block w-[0.85em] text-left">
              {loadingDots}
            </span>
          </h1>
        </div>

        {/* Rubik's cube - center */}
        <div className="absolute inset-0 z-30 grid place-items-center pointer-events-none">
          <div className="w-[min(500px,46vw)] h-[min(500px,46vw)] overflow-visible">
            <LoaderScene t={cubeT} />
          </div>
        </div>

        {/* loading number - bottom right */}
        <div className="absolute right-[clamp(0.7rem,2.5vw,2.5rem)] bottom-[clamp(1rem,3vw,3rem)] z-20">
          <div className="font-heading text-[#E6D5B7] text-[clamp(5rem,16vw,15rem)] leading-[0.85] select-none">
            {String(progress).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
}
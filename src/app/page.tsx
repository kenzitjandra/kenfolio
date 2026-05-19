'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroAboutTransition from '@/components/HeroAboutTransition';
import ExperienceIntro from '@/components/ExperienceIntro';
import ExperienceShowcase from '@/components/ExperienceShowcase';
import Publication from '@/components/Publication';
import Skills from '@/components/Skills';
import ProjectShowcase from '@/components/ProjectShowcase';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import LoaderSection from '@/components/LoaderSection';

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [siteReveal, setSiteReveal] = useState(false);
  
  const experiencePublicationBgRef = useRef<HTMLDivElement | null>(null);
  const experienceToPublicationRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const handleLoaderExitStart = useCallback(() => {
    setSiteReveal(true);
  }, []);

  const handleLoaderDone = useCallback(() => {
    setLoaderDone(true);
  }, []);

  useEffect(() => {
    if (!loaderDone || !siteReveal) return;

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    const timers = [
      window.setTimeout(refresh, 100),
      window.setTimeout(refresh, 500),
      window.setTimeout(refresh, 1000),
    ];

    document.fonts?.ready.then(refresh);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [loaderDone, siteReveal]);

  useLayoutEffect(() => {
    if (loaderDone) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });

    const keepAtTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
    };

    window.addEventListener('wheel', keepAtTop, { passive: true });
    window.addEventListener('touchmove', keepAtTop, { passive: true });
    window.addEventListener('keydown', keepAtTop);

    return () => {
      window.removeEventListener('wheel', keepAtTop);
      window.removeEventListener('touchmove', keepAtTop);
      window.removeEventListener('keydown', keepAtTop);
    };
  }, [loaderDone]);

  useLayoutEffect(() => {
    if (!loaderDone || !siteReveal) return;

    gsap.registerPlugin(ScrollTrigger);

    const bg = experiencePublicationBgRef.current;
    const transitionArea = experienceToPublicationRef.current;

    if (!bg || !transitionArea) return;

    const ctx = gsap.context(() => {
      gsap.set(bg, {
        backgroundColor: '#212844',
      });

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.to(bg, {
          backgroundColor: '#EEE7D6',
          ease: 'none',
          scrollTrigger: {
            trigger: transitionArea,
            start: 'top+=77.5% top',
            end: 'bottom-=5% bottom',
            scrub: 1,
            invalidateOnRefresh: true,
            markers: false,
          },
        });
      });

      mm.add('(max-width: 767px)', () => {
        gsap.to(bg, {
          backgroundColor: '#EEE7D6',
          ease: 'none',
          scrollTrigger: {
            trigger: transitionArea,
            start: 'top+=55% top',
            end: 'bottom-=20% bottom',
            scrub: 1,
            invalidateOnRefresh: true,
            markers: false,
          },
        });
      });

      return () => {
        mm.revert();
      };
    }, transitionArea);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [loaderDone, siteReveal]);

  return (
    <>
      {!loaderDone && (
        <LoaderSection
          onExitStart={handleLoaderExitStart}
          onDone={handleLoaderDone}
        />
      )}

      {loaderDone && <Navbar />}

      <motion.main
        initial={{
          y: '16vh',
          clipPath: 'inset(100% 0 0 0)',
        }}
        animate={
          siteReveal
            ? {
                y: '0vh',
                clipPath: 'inset(0% 0 0 0)',
              }
            : {
                y: '16vh',
                clipPath: 'inset(100% 0 0 0)',
              }
        }
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          willChange: 'transform, clip-path',
        }}
        className="relative bg-transparent"
      >
        <div
          ref={experiencePublicationBgRef}
          id="experience-publication-bg"
          className="pointer-events-none fixed inset-0 z-0 bg-[#212844]"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <HeroAboutTransition startAnimation={siteReveal} />
          <ExperienceIntro />
          
          <div ref={experienceToPublicationRef} className="relative">
            <ExperienceShowcase />
            <Publication />
          </div>

          <Skills />
          <ProjectShowcase />
          <Footer />
        </div>
      </motion.main>

      {loaderDone && <CustomCursor />}
    </>
  );
}
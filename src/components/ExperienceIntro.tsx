'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ExperienceIntro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const words = wordsRef.current;

    if (!section || !words) return;

    const wordEls = gsap.utils.toArray<HTMLElement>('.experience-word', words);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.set(wordEls[0], { xPercent: -260 });
        gsap.set(wordEls[1], { xPercent: 0 });
        gsap.set(wordEls[2], { xPercent: 260 });

        gsap.to(wordEls, {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'center center',
            scrub: 0.6,
          },
        });
      });

      mm.add('(max-width: 767px)', () => {
        gsap.set(wordEls[0], { xPercent: -80 });
        gsap.set(wordEls[1], { xPercent: 0 });
        gsap.set(wordEls[2], { xPercent: 80 });

        gsap.to(wordEls, {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'center 55%',
            scrub: 0.6,
          },
        });
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-[#F0E8D5] px-5 text-[#212844] md:min-h-[140vh] md:px-8"
    >
      <div className="text-center uppercase">
        <p className="mb-4 font-body text-[18px] font-black leading-none text-[#8B8B8B] md:mb-[1.5vw] md:text-[clamp(1rem,2vw,2rem)]">
          Several
        </p>

        <h2 className="font-heading text-[64px] leading-[0.85] sm:text-[82px] md:text-[clamp(4.5rem,8vw,12rem)]">
          Experiences
        </h2>

        <div
          ref={wordsRef}
          className="mt-5 flex items-center justify-center gap-5 font-body text-[15px] font-black leading-none sm:text-[17px] md:mt-[1.5vw] md:gap-[clamp(1.2rem,2vw,3rem)] md:text-[clamp(0.9rem,1.2vw,1.5rem)]"
        >
          <span className="experience-word block">That</span>
          <span className="experience-word block">Shaped</span>
          <span className="experience-word block">Me</span>
        </div>
      </div>
    </section>
  );
}
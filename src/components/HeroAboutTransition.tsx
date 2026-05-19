'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './Hero';
import AboutContent from './AboutContent';

gsap.registerPlugin(ScrollTrigger);

type HeroAboutTransitionProps = {
  startAnimation?: boolean;
};

export default function HeroAboutTransition({
  startAnimation = true,
}: HeroAboutTransitionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const heroCanvasRef = useRef<HTMLDivElement | null>(null);
  const navyBgRef = useRef<HTMLDivElement | null>(null);
  const frameDarkOverlayRef = useRef<HTMLDivElement | null>(null);

  const aboutLayerRef = useRef<HTMLDivElement | null>(null);
  const aboutContentRef = useRef<HTMLDivElement | null>(null);
  const aboutLeftRef = useRef<HTMLDivElement | null>(null);
  const aboutRightRef = useRef<HTMLDivElement | null>(null);

  const aboutPanelRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const heroCanvas = heroCanvasRef.current;
    const navyBg = navyBgRef.current;
    const frameDarkOverlay = frameDarkOverlayRef.current;

    const aboutLayer = aboutLayerRef.current;
    const aboutContent = aboutContentRef.current;
    const aboutLeft = aboutLeftRef.current;
    const aboutRight = aboutRightRef.current;

    const aboutPanel = aboutPanelRef.current;

    if (
      !section ||
      !frame ||
      !heroCanvas ||
      !navyBg ||
      !frameDarkOverlay ||
      !aboutLayer ||
      !aboutContent ||
      !aboutLeft ||
      !aboutRight ||
      !aboutPanel
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        gsap.set(frame, {
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          y: 0,
          borderRadius: 0,
        });

        gsap.set(heroCanvas, {
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: 'center center',
        });

        gsap.set(frameDarkOverlay, {
          opacity: 0,
        });

        gsap.set(aboutLayer, {
          opacity: 1,
        });

        gsap.set(aboutLeft, {
          opacity: 0,
          x: '-12vw',
        });

        gsap.set(aboutRight, {
          opacity: 0,
          x: '12vw',
        });

        gsap.set(aboutContent, {
          y: 0,
        });

        gsap.set(aboutPanel, {
          y: '100vh',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          navyBg,
          {
            opacity: 0,
            duration: 1.4,
            ease: 'none',
          },
          0
        );

        tl.to(
          frame,
          {
            width: '30vw',
            height: '36vh',
            top: '33vh',
            left: '33vw',
            duration: 1.4,
            ease: 'none',
          },
          0
        );

        tl.to(
          heroCanvas,
          {
            x: '-25vw',
            y: '-24vh',
            scale: 0.76,
            duration: 1.4,
            ease: 'none',
          },
          0
        );

        tl.to(
          frameDarkOverlay,
          {
            opacity: 0.42,
            duration: 1.4,
            ease: 'none',
          },
          0
        );

        tl.to(
          aboutLeft,
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'none',
          },
          1.0
        );

        tl.to(
          aboutRight,
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'none',
          },
          1.0
        );

        tl.to(
          aboutContent,
          {
            y: '-120vh',
            duration: 2.2,
            ease: 'none',
          },
          1.4
        );

        tl.to(
          frame,
          {
            y: '-86vh',
            duration: 2.2,
            ease: 'none',
          },
          1.4
        );

        tl.to(
          aboutPanel,
          {
            y: '0vh',
            duration: 1,
            ease: 'none',
          },
          1.4
        );
      });

      mm.add('(max-width: 767px)', () => {
        gsap.set(frame, {
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          y: 0,
          borderRadius: 0,
        });

        gsap.set(heroCanvas, {
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: 'center center',
        });

        gsap.set(frameDarkOverlay, {
          opacity: 0,
        });

        gsap.set(aboutLayer, {
          opacity: 1,
        });

        gsap.set(aboutLeft, {
          opacity: 0,
          x: '-18vw',
        });

        gsap.set(aboutRight, {
          opacity: 0,
          x: '18vw',
        });

        gsap.set(aboutContent, {
          y: 0,
        });

        gsap.set(aboutPanel, {
          y: '100vh',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          navyBg,
          {
            opacity: 0,
            duration: 1.4,
            ease: 'none',
          },
          0
        );

        tl.to(
          frame,
          {
            width: '72vw',
            height: '34vh',
            top: '34vh',
            left: '14vw',
            duration: 1.4,
            ease: 'none',
          },
          0
        );

        tl.to(
          heroCanvas,
          {
            x: '-14vw',
            y: '-22vh',
            scale: 0.82,
            duration: 1.4,
            ease: 'none',
          },
          0
        );

        tl.to(
          frameDarkOverlay,
          {
            opacity: 0.42,
            duration: 1.4,
            ease: 'none',
          },
          0
        );

        tl.to(
          aboutLeft,
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'none',
          },
          1.0
        );

        tl.to(
          aboutRight,
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'none',
          },
          1.0
        );

        tl.to(
          aboutContent,
          {
            y: '-95vh',
            duration: 2.2,
            ease: 'none',
          },
          1.4
        );

        tl.to(
          frame,
          {
            y: '-78vh',
            duration: 2.2,
            ease: 'none',
          },
          1.4
        );

        tl.to(
          aboutPanel,
          {
            y: '0vh',
            duration: 1,
            ease: 'none',
          },
          1.4
        );
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[260vh] bg-[#F0E8D5] md:min-h-[360vh]"
    >
      {/* Desktop ABOUT nav target */}
      <div
        id="about-title"
        className="pointer-events-none absolute left-0 top-[105vh] hidden h-px w-px md:block"
      />

      {/* Mobile ABOUT nav target */}
      <div
        id="about-content"
        className="pointer-events-none absolute left-0 top-[178vh] h-px w-px md:hidden"
      />

      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Navy layer fading into cream */}
        <div ref={navyBgRef} className="absolute inset-0 z-0 bg-[#212844]" />

        {/* About title layer */}
        <div
          ref={aboutLayerRef}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-5 md:px-8"
        >
          <div
            ref={aboutContentRef}
            className="relative h-screen w-full max-w-[1500px]"
          >
            {/* Left title group */}
            <div
              ref={aboutLeftRef}
              className="absolute left-[8vw] top-[22vh] z-40 md:left-[24vw] md:top-[20vh]"
            >
              <p className="mb-3 pl-1 font-body text-[14px] font-black uppercase leading-none tracking-normal text-[#F0E8D5] [-webkit-text-stroke:1.4px_#212844] [paint-order:stroke_fill] md:mb-[1vw] md:pl-[1vw] md:text-[1.5vw] md:[-webkit-text-stroke:2px_#212844]">
                Get to know more
              </p>

              <h2 className="font-heading text-[82px] uppercase leading-[0.78] tracking-tight text-[#E6D5B7] drop-shadow-[3px_4px_0_rgba(33,40,68,0.35)] [-webkit-text-stroke:1px_#212844] md:text-[12vw]">
                About
              </h2>
            </div>

            {/* Right title group */}
            <div
              ref={aboutRightRef}
              className="absolute right-[10vw] top-[70vh] z-40 md:right-[28vw] md:top-[58vh]"
            >
              <h2 className="font-heading text-[78px] uppercase leading-[0.78] tracking-tight text-[#E6D5B7] drop-shadow-[3px_4px_0_rgba(33,40,68,0.35)] [-webkit-text-stroke:1px_#212844] md:text-[11.5vw]">
                Me
              </h2>

              <p className="ml-[70px] mt-2 font-body text-[20px] font-bold text-[#F0E8D5] [-webkit-text-stroke:1.5px_#212844] [paint-order:stroke_fill] md:ml-[11vw] md:mt-[0.5vw] md:text-[1.75vw] md:[-webkit-text-stroke:2px_#212844]">
                :D
              </p>
            </div>
          </div>
        </div>

        {/* Shrinking/cropping hero frame */}
        <div
          ref={frameRef}
          className="absolute z-20 overflow-hidden bg-[#212844]"
        >
          <div ref={heroCanvasRef} className="h-screen w-screen">
            <Hero startAnimation={startAnimation} />
          </div>

          <div
            ref={frameDarkOverlayRef}
            className="pointer-events-none absolute inset-0 z-30 bg-[#050816]"
          />
        </div>

        {/* About content sliding panel */}
        <div
          ref={aboutPanelRef}
          className="absolute inset-x-0 top-0 z-50 min-h-screen bg-[#212844]"
        >
          {/* Desktop keeps the full AboutContent */}
          <div className="hidden md:block">
            <AboutContent />
          </div>

          {/* Mobile uses shorter AboutContent without pictures */}
          <MobileAboutSummary />
        </div>
      </div>
    </section>
  );
}

function MobileAboutSummary() {
  return (
    <section className="flex min-h-screen items-center bg-[#212844] px-5 py-0 text-[#F0E8D5] md:hidden">
      <div className="w-full">
        <div className="py-2">
          <div className="flex flex-col gap-5">
            <p className="font-body text-[15px] text-justify font-semibold leading-[1.65] text-[#F0E8D5]">
              I’m Kenzi, a Computer Science student and developer from Indonesia
              with a focus on Full-Stack Development, Machine Learning, and UI/UX
              design. My work spans across building end-to-end web applications,
              developing IoT systems, and exploring areas such as Computer Vision
              and Natural Language Processing (NLP).
            </p>

            <p className="font-body text-[15px] text-justify font-semibold leading-[1.65] text-[#F0E8D5]">
              I’ve worked on a variety of projects ranging from scalable web
              platforms and machine learning systems to IoT-based applications. I also
              have experience in academic research in machine learning, including
              work published in IEEE.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-heading text-[34px] uppercase leading-none text-[#F0E8D5]">
            Focusing On
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="border border-[#EF8A76] p-5">
              <p className="font-body text-[14px] font-semibold leading-6 md:text-base">
                WEB DEVELOPMENT
                <br />
                MACHINE LEARNING
                <br />
                SOFTWARE DEVELOPMENT
              </p>
            </div>

            <div className="border border-[#EF8A76] p-5">
              <p className="font-body text-[14px] leading-6 font-semibold md:text-base">
                UI/UX DESIGN
                <br />
                LOGO DESIGN
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
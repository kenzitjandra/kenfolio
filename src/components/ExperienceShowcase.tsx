'use client';

import Image from 'next/image';
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  experienceCategories,
  type ExperienceCategory,
  type ExperienceImage,
  type ExperienceItem,
} from '@/data/experience';

/* ================= Desktop layout =================
   Hand-placed positions inside the horizontal track.
   - titleLeftVw: where each category title sits in the track (one per category)
   - cards: one entry per item, in the same order as experienceCategories */

type CardLayout = {
  className: string;
  imageClassName: string;
  decorativeBlocks: string[];
};

const DESKTOP_LAYOUT: {
  trackWidthVw: number;
  titleLeftVw: number[];
  cards: CardLayout[];
} = {
  trackWidthVw: 540,
  titleLeftVw: [2, 112, 355],
  cards: [
    // Professional 1 — BCA (shorter image so 3 bullets fit below)
    {
      className: 'left-[44vw] top-[62vh]',
      imageClassName: 'left-[0vw] top-[-38vh] h-[34vh] w-[36vw]',
      decorativeBlocks: [
        'left-[-36vw] top-[-34vh] h-[26vh] w-[12vw]',
        'left-[-20vw] top-[0vh] h-[26vh] w-[12vw]',
        'left-[42vw] top-[-36vh] h-[24vh] w-[11vw]',
      ],
    },
    // Organizational 1
    {
      className: 'left-[154vw] top-[68vh]',
      imageClassName: 'left-[0vw] top-[-43vh] h-[40vh] w-[36vw]',
      decorativeBlocks: [
        'left-[-36vw] top-[-38vh] h-[28vh] w-[12vw]',
        'left-[-20vw] top-[-2vh] h-[26vh] w-[12vw]',
        'left-[42vw] top-[-36vh] h-[24vh] w-[11vw]',
      ],
    },
    // Organizational 2
    {
      className: 'left-[232vw] top-[25vh]',
      imageClassName: 'left-[0vw] top-[30vh] h-[40vh] w-[38vw]',
      decorativeBlocks: [
        'left-[-20vw] top-[2vh] h-[22vh] w-[11vw]',
        'left-[-22vw] top-[36vh] h-[24vh] w-[12vw]',
        'left-[42vw] top-[4vh] h-[24vh] w-[12vw]',
      ],
    },
    // Organizational 3
    {
      className: 'left-[300vw] top-[68vh]',
      imageClassName: 'left-[0vw] top-[-43vh] h-[40vh] w-[40vw]',
      decorativeBlocks: [
        'left-[-16vw] top-[-6vh] h-[24vh] w-[11vw]',
        'left-[45vw] top-[-31vh] h-[22vh] w-[11vw]',
        'left-[58vw] top-[-2vh] h-[24vh] w-[11vw]',
      ],
    },
    // Competitions 1
    {
      className: 'left-[380vw] top-[68vh]',
      imageClassName: 'left-[0vw] top-[-43vh] h-[40vh] w-[40vw]',
      decorativeBlocks: [
        'left-[-18vw] top-[-40vh] h-[24vh] w-[12vw]',
        'left-[46vw] top-[-32vh] h-[22vh] w-[11vw]',
        'left-[58vw] top-[-2vh] h-[24vh] w-[11vw]',
      ],
    },
    // Competitions 2
    {
      className: 'left-[464vw] top-[23vh]',
      imageClassName: 'left-[0vw] top-[24vh] h-[48vh] w-[40vw]',
      decorativeBlocks: [
        'left-[-20vw] top-[4vh] h-[24vh] w-[12vw]',
        'left-[47vw] top-[6vh] h-[22vh] w-[11vw]',
        'left-[58vw] top-[40vh] h-[22vh] w-[11vw]',
      ],
    },
  ],
};

const allItems = experienceCategories.flatMap((category) => category.items);

export default function ExperienceShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const stickyTitleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nativeTitleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Only eager-load the desktop track on desktop (it's hidden on mobile)
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);

    update();
    mq.addEventListener('change', update);

    return () => mq.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const bg = bgRef.current;
    const stickyTitles = stickyTitleRefs.current.filter(Boolean) as HTMLDivElement[];
    const nativeTitles = nativeTitleRefs.current.filter(Boolean) as HTMLDivElement[];

    if (
      !section ||
      !track ||
      !bg ||
      stickyTitles.length === 0 ||
      stickyTitles.length !== nativeTitles.length
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const getHorizontalDistance = () => track.scrollWidth - window.innerWidth;

        gsap.set(bg, { backgroundColor: 'transparent' });

        const updateTitles = () => {
          const stickyX = window.innerWidth * 0.02;
          const gap = window.innerWidth * 0.04; // space kept between the two titles

          const lefts = nativeTitles.map((el) => el.getBoundingClientRect().left);

          // Active = the last category whose title has reached the sticky spot
          let active = 0;
          for (let i = 1; i < lefts.length; i++) {
            if (lefts[i] <= stickyX + 4) active = i;
          }

          // The next title pushes the active one once it gets within `gap` of it
          const nextLeft = lefts[active + 1];
          const activeWidth = stickyTitles[active].offsetWidth;
          const pushX =
            nextLeft === undefined ? 0 : Math.min(0, nextLeft - gap - (stickyX + activeWidth));

          stickyTitles.forEach((el, i) => {
            gsap.set(el, {
              autoAlpha: i === active ? 1 : 0,
              x: i === active ? pushX : 0,
            });
          });

          // The first native title is always hidden (its sticky twin shows instead).
          // Others show until they reach the sticky spot.
          nativeTitles.forEach((el, i) => {
            gsap.set(el, { autoAlpha: i === 0 || i <= active ? 0 : 1 });
          });
        };

        gsap.to(track, {
          x: () => -getHorizontalDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getHorizontalDistance()}`,
            scrub: 1,
            pin: true,
            pinType: 'transform',
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false,
            onUpdate: updateTitles,
            onRefresh: updateTitles,
          },
        });

        // Fade to cream once the last category's title is near the left edge,
        // finishing just before the end of the track
        const lastTitle = nativeTitles[nativeTitles.length - 1];

        gsap.fromTo(
          bg,
          { backgroundColor: 'transparent' },
          {
            backgroundColor: '#EEE7D6',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: () => `top+=${lastTitle.offsetLeft - window.innerWidth * 0.07} top`,
              end: () => `top+=${getHorizontalDistance() - window.innerWidth * 0.13} top`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          updateTitles();
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
      className="relative bg-[#212844] text-[#F0E8D5] md:h-screen md:overflow-hidden md:bg-transparent"
    >
      <div className="relative hidden h-screen overflow-hidden md:block">
        {/* Animated full-viewport background */}
        <div ref={bgRef} className="absolute inset-0 z-0 bg-[#212844]" />

        {/* Sticky title overlay (one per category, only the active one shows) */}
        <div className="pointer-events-none absolute left-[2vw] top-[8vh] z-50 uppercase">
          {experienceCategories.map((category, i) => (
            <div
              key={category.id}
              ref={(el) => {
                stickyTitleRefs.current[i] = el;
              }}
              className="absolute left-0 top-0 flex items-end gap-2 whitespace-nowrap"
              style={{ visibility: i === 0 ? 'visible' : 'hidden' }}
            >
              <CategoryTitle category={category} />
            </div>
          ))}
        </div>

        <div
          ref={trackRef}
          className="relative z-10 h-screen"
          style={{ width: `${DESKTOP_LAYOUT.trackWidthVw}vw` }}
        >
          {/* Native titles that scroll with the track */}
          {experienceCategories.map((category, i) => (
            <div
              key={category.id}
              ref={(el) => {
                nativeTitleRefs.current[i] = el;
              }}
              className={`absolute top-[8vh] z-30 flex items-end gap-2 whitespace-nowrap uppercase ${
                i === 0 ? 'opacity-0' : ''
              }`}
              style={{ left: `${DESKTOP_LAYOUT.titleLeftVw[i] ?? 0}vw` }}
            >
              <CategoryTitle category={category} />
            </div>
          ))}

          {/* Cards */}
          {allItems.map((item, i) => {
            const layout = DESKTOP_LAYOUT.cards[i];
            if (!layout) return null;

            return (
              <ExperienceCard
                key={`${item.title}-${i}`}
                item={item}
                className={layout.className}
                imageClassName={layout.imageClassName}
                decorativeBlocks={layout.decorativeBlocks}
                eager={isDesktop}
              />
            );
          })}
        </div>
      </div>

      {/* Mobile Experience Layout */}
      <div className="flex flex-col gap-14 px-5 py-20 md:hidden">
        {experienceCategories.map((category, ci) => (
          <Fragment key={category.id}>
            <div className="border-t border-[#EF8A76]/70 pt-6">
              {ci === 0 && (
                <p className="mb-3 font-body text-[13px] font-black uppercase tracking-[0.18em] text-[#F0E8D5]/50">
                  Experience
                </p>
              )}

              <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                <h2 className="font-heading text-[44px] min-[390px]:text-[48px] uppercase leading-[0.9] text-[#F0E8D5]">
                  {category.title}
                </h2>

                {category.tag && (
                  <span className="mb-1 font-body text-[14px] font-black uppercase leading-none text-[#F0E8D5]/50">
                    {category.tag}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-14">
              {category.items.map((item, index) => (
                <MobileExperienceCard key={`${item.title}-${index}`} item={item} index={index} />
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

/* ================= Pieces ================= */

function CategoryTitle({ category }: { category: ExperienceCategory }) {
  return (
    <>
      <h2 className="font-heading text-[clamp(4rem,5.3vw,6.8rem)] leading-none text-[#F0E8D5]">
        {category.title}
      </h2>

      {category.tag && (
        <span className="mb-[0.2vw] font-body text-[clamp(1rem,1.25vw,1.5rem)] font-bold leading-none text-[#F0E8D5]/50">
          {category.tag}
        </span>
      )}
    </>
  );
}

function PhotoPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#F0E8D5]">
      <div className="absolute inset-2 rounded-sm border border-dashed border-[#212844]/25" />
      <span className="relative font-body text-[clamp(0.6rem,0.8vw,0.85rem)] font-black uppercase tracking-[0.18em] text-[#212844]/40">
        Photo soon
      </span>
    </div>
  );
}

/** Fills its (positioned) parent. Shows a placeholder when there's no src. */
function ExperiencePhoto({
  image,
  sizes,
  eager,
}: {
  image: ExperienceImage;
  sizes: string;
  eager: boolean;
}) {
  if (!image.src) return <PhotoPlaceholder />;

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      className="object-cover object-center"
      loading={eager ? 'eager' : 'lazy'}
      data-preload="true"
    />
  );
}

type ExperienceCardProps = {
  item: ExperienceItem;
  className: string;
  imageClassName: string;
  decorativeBlocks: string[];
  eager?: boolean;
};

function ExperienceCard({
  item,
  className,
  imageClassName,
  decorativeBlocks,
  eager = false,
}: ExperienceCardProps) {
  return (
    <article className={`absolute z-20 w-[40vw] ${className}`}>
      <div className={`absolute overflow-hidden bg-[#F0E8D5] ${imageClassName}`}>
        <ExperiencePhoto image={item.image} sizes="40vw" eager={eager} />
      </div>

      {decorativeBlocks.map((blockClassName, index) => {
        const image = item.decorativeImages[index];
        if (!image) return null;

        return (
          <div
            key={blockClassName}
            className={`absolute overflow-hidden bg-[#F0E8D5] ${blockClassName}`}
          >
            <ExperiencePhoto image={image} sizes="12vw" eager={eager} />
          </div>
        );
      })}

      <div className="relative z-20 max-w-[36rem]">
        <p className="mb-2 font-body text-[clamp(0.8rem,1vw,1rem)] font-black text-[#8B8B8B]">
          {item.year ? `${item.eyebrow} | ${item.year}` : item.eyebrow}
        </p>

        <h3 className="font-heading text-[clamp(1.75rem,2.25vw,3rem)] uppercase leading-[0.9] text-[#F0E8D5]">
          {item.title}
        </h3>

        <ul className="mt-3 list-disc space-y-1 pl-5 font-body text-[clamp(0.9rem,0.95vw,0.95rem)] font-bold normal-case leading-tight text-[#F0E8D5]/80">
          {item.description.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function MobileExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.55,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col gap-5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-[#F0E8D5]">
        {item.image.src ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>

      <div>
        <p className="font-body text-[13px] font-black leading-snug text-[#F0E8D5]/50">
          {item.year ? `${item.eyebrow} | ${item.year}` : item.eyebrow}
        </p>

        <h3 className="mt-3 font-heading text-[28px] min-[390px]:text-[31px] uppercase leading-[0.92] text-[#F0E8D5]">
          {item.title}
        </h3>

        <ul className="mt-5 flex list-disc flex-col gap-3 pl-5 font-body text-[15px] font-semibold leading-[1.55] text-[#F0E8D5]/85">
          {item.description.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const experienceItems = [
  {
    category: 'Organizational',
    title: 'General Manager of Research and Development 2025/2026',
    eyebrow: 'HIMTI BINUS University',
    year: 'Mar 2025 - Feb 2026',
    imageSrc: '/experience/gm_main_organizational.webp',
    imageAlt: 'HIMTI BINUS University Research and Development',
    decorativeImages: [
      {
        src: '/experience/gm_1_organizational.webp',
        alt: 'HIMTI BINUS University documentation 1',
      },
      {
        src: '/experience/gm_2_organizational.webp',
        alt: 'HIMTI BINUS University documentation 2',
      },
      {
        src: '/experience/gm_3_organizational.webp',
        alt: 'HIMTI BINUS University documentation 3',
      },
    ],
    description: [
      'Led the Creative & Design and Web Development divisions with 100+ members, ensuring projects aligned with the organization’s vision and goals',
      'Developed structured Agile workflows and maintained HIMTI BINUS University websites using Laravel, MySQL, and cPanel',
    ],
  },
  {
    category: 'Organizational',
    title: 'Coordinator of Design and Documentation Team in HILET 2025',
    eyebrow: 'HIMTI BINUS University',
    year: 'Jan 2025 - Mar 2026',
    imageSrc: '/experience/hilet_main_organizational_v2.webp',
    imageAlt: 'HILET 2025 Design and Documentation Team',
    decorativeImages: [
      {
        src: '/experience/hilet_1_organizational_v4.webp',
        alt: 'HILET 2025 documentation 1',
      },
      {
        src: '/experience/hilet_2_organizational.webp',
        alt: 'HILET 2025 documentation 2',
      },
      {
        src: '/experience/hilet_3_organizational.webp',
        alt: 'HILET 2025 documentation 3',
      },
    ],
    description: [
      'Led the Design and Documentation division, ensuring smooth collaboration, workflow, and timely completion of design tasks',
      'Managed a design team to create event branding materials, including the event logo and lanyard, for an event attended by 250+ students',
    ],
  },
  {
    category: 'Organizational',
    title: 'Vice-Coordinator of the Design and Documentation Division in SESVENT 2024',
    eyebrow: 'HIMTI BINUS University',
    year: 'Sep 2024 - Nov 2024',
    imageSrc: '/experience/sesvent_main_organizational.webp',
    imageAlt: 'SESVENT 2024 Design and Documentation Division',
    decorativeImages: [
      {
        src: '/experience/sesvent_1_organizational.webp',
        alt: 'SESVENT 2024 documentation 1',
      },
      {
        src: '/experience/sesvent_2_organizational.webp',
        alt: 'SESVENT 2024 documentation 2',
      },
      {
        src: '/experience/sesvent_3_organizational.webp',
        alt: 'SESVENT 2024 documentation 3',
      },
    ],
    description: [
      'Assisted in leading the Design and Documentation division by supervising task progress, providing feedback, and ensuring design quality',
      'Created key event materials, including the official guidebook and lanyard designs, while documenting the onsite event for archival and promotional use',
    ],
  },
  {
    category: 'Competitions',
    title: 'Semi-Finalist',
    eyebrow: 'Samsung Innovation Campus Batch 6',
    year: '',
    imageSrc: '/experience/sic_main_competition.webp',
    imageAlt: 'Samsung Innovation Campus Batch 6',
    decorativeImages: [
      {
        src: '/experience/sic_1_competition.webp',
        alt: 'Samsung Innovation Campus documentation 1',
      },
      {
        src: '/experience/sic_2_competition.webp',
        alt: 'Samsung Innovation Campus documentation 2',
      },
      {
        src: '/experience/sic_3_competition.webp',
        alt: 'Samsung Innovation Campus documentation 3',
      },
    ],
    description: [
      'Reached the semifinals (stage 4) of Samsung Innovation Campus Batch 6, an IoT & AI innovation competition with 10,000+ participants nationwide',
      'Developed a portable IoT-based air purifier integrated with an AI model to predict air quality and automatically activate the purifier when needed',
    ],
  },
  {
    category: 'Competitions',
    title: '2nd Runner Up',
    eyebrow: 'Game Jam Comfest 17',
    year: '',
    imageSrc: '/experience/compfest_main_competition_v2.webp',
    imageAlt: 'Game Jam Comfest 17',
    decorativeImages: [
      {
        src: '/experience/compfest_1_competition.webp',
        alt: 'COMPFEST 17 Game Jam documentation 1',
      },
      {
        src: '/experience/compfest_2_competition.webp',
        alt: 'COMPFEST 17 Game Jam documentation 2',
      },
      {
        src: '/experience/compfest_3_competition.webp',
        alt: 'COMPFEST 17 Game Jam documentation 3',
      },
    ],
    description: [
      'Won 3rd place at COMPFEST 17 Game Jam 2025 as part of team The Bumblebees',
      'Developed “Earthman,” an innovative game built with Godot, recognized for its strong concept and execution among competitors',
    ],
  },
];

export default function ExperienceShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const orgStickyTitleRef = useRef<HTMLHeadingElement | null>(null);
  const compStickyTitleRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const bg = bgRef.current;
    const orgStickyTitle = orgStickyTitleRef.current;
    const compStickyTitle = compStickyTitleRef.current;

    if (!section || !track || !bg || !orgStickyTitle || !compStickyTitle) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const getHorizontalDistance = () => {
          return track.scrollWidth - window.innerWidth;
        };

        const nativeCompetitionsTitle = section.querySelector(
          '.native-competitions-title'
        ) as HTMLDivElement | null;

        if (!nativeCompetitionsTitle) return;

        gsap.set(bg, {
          backgroundColor: 'transparent',
        });

        gsap.set(orgStickyTitle, {
          x: 0,
          autoAlpha: 1,
        });

        gsap.set(compStickyTitle, {
          x: 0,
          autoAlpha: 0,
        });

        gsap.set(nativeCompetitionsTitle, {
          autoAlpha: 1,
        });

        const updateTitleReplacement = () => {
          const nativeRect = nativeCompetitionsTitle.getBoundingClientRect();

          const stickyX = window.innerWidth * 0.02;

          const pushStartX = window.innerWidth * 0.36;
          const pushEndX = stickyX;

          const pushProgress = gsap.utils.clamp(
            0,
            1,
            (pushStartX - nativeRect.left) / (pushStartX - pushEndX)
          );

          gsap.set(orgStickyTitle, {
            x: -window.innerWidth * 0.34 * pushProgress,
            autoAlpha: 1,
          });

          const hasReachedStickyPosition = nativeRect.left <= stickyX + 4;

          gsap.set(nativeCompetitionsTitle, {
            autoAlpha: hasReachedStickyPosition ? 0 : 1,
          });

          gsap.set(compStickyTitle, {
            autoAlpha: hasReachedStickyPosition ? 1 : 0,
            x: 0,
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
            onUpdate: updateTitleReplacement,
            onRefresh: updateTitleReplacement,
          },
        });

        gsap.fromTo(
          bg,
          {
            backgroundColor: 'transparent',
          },
          {
            backgroundColor: '#EEE7D6',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: () => `top+=${getHorizontalDistance() * 0.72} top`,
              end: () => `top+=${getHorizontalDistance() * 0.96} top`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          updateTitleReplacement();
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

        {/* Sticky title overlay */}
        <div className="pointer-events-none absolute left-[2vw] top-[8vh] z-50 uppercase">
          <h2
            ref={orgStickyTitleRef}
            className="absolute left-0 top-0 whitespace-nowrap font-heading text-[clamp(4rem,5.3vw,6.8rem)] leading-none text-[#F0E8D5]"
          >
            Organizational
          </h2>

          <div
            ref={compStickyTitleRef}
            className="absolute left-0 top-0 flex items-end gap-2 whitespace-nowrap"
          >
            <h2 className="font-heading text-[clamp(4rem,5.3vw,6.8rem)] leading-none text-[#F0E8D5]">
              Competitions
            </h2>

            <span className="mb-[0.2vw] font-body text-[clamp(1rem,1.25vw,1.5rem)] font-bold leading-none text-[#F0E8D5]/50">
              + AN AWARD!
            </span>
          </div>
        </div>

        <div ref={trackRef} className="relative z-10 h-screen w-[430vw]">
          {/* Native layout title: Organizational */}
          <div className="absolute left-[2vw] top-[8vh] z-30 uppercase opacity-0">
            <h2 className="font-heading text-[clamp(4rem,5.3vw,6.8rem)] leading-none text-[#F0E8D5]">
              Organizational
            </h2>
          </div>

          {/* Native layout title: Competitions */}
          <div className="native-competitions-title absolute left-[245vw] top-[8vh] z-40 flex items-end gap-2 uppercase">
            <h2 className="font-heading text-[clamp(4rem,5.3vw,6.8rem)] leading-none text-[#F0E8D5]">
              Competitions
            </h2>

            <span className="mb-[0.2vw] font-body text-[clamp(1rem,1.25vw,1.5rem)] font-bold leading-none text-[#F0E8D5]/50">
              + AN AWARD!
            </span>
          </div>

          {/* Organizational item 1 */}
          <ExperienceCard
            item={experienceItems[0]}
            className="left-[44vw] top-[68vh]"
            imageClassName="left-[0vw] top-[-43vh] h-[40vh] w-[36vw]"
            decorativeBlocks={[
              'left-[-36vw] top-[-38vh] h-[28vh] w-[12vw]',
              'left-[-20vw] top-[-2vh] h-[26vh] w-[12vw]',
              'left-[42vw] top-[-36vh] h-[24vh] w-[11vw]',
            ]}
            priorityImages
          />

          {/* Organizational item 2 */}
          <ExperienceCard
            item={experienceItems[1]}
            className="left-[122vw] top-[25vh]"
            imageClassName="left-[0vw] top-[30vh] h-[40vh] w-[38vw]"
            decorativeBlocks={[
              'left-[-20vw] top-[2vh] h-[22vh] w-[11vw]',
              'left-[-22vw] top-[36vh] h-[24vh] w-[12vw]',
              'left-[42vw] top-[4vh] h-[24vh] w-[12vw]',
            ]}
          />

          {/* Organizational item 3 */}
          <ExperienceCard
            item={experienceItems[2]}
            className="left-[190vw] top-[68vh]"
            imageClassName="left-[0vw] top-[-43vh] h-[40vh] w-[40vw]"
            decorativeBlocks={[
              'left-[-16vw] top-[-6vh] h-[24vh] w-[11vw]',
              'left-[45vw] top-[-31vh] h-[22vh] w-[11vw]',
              'left-[58vw] top-[-2vh] h-[24vh] w-[11vw]',
            ]}
          />

          {/* Competition item 1 */}
          <ExperienceCard
            item={experienceItems[3]}
            className="left-[270vw] top-[68vh]"
            imageClassName="left-[0vw] top-[-43vh] h-[40vh] w-[40vw]"
            decorativeBlocks={[
              'left-[-18vw] top-[-40vh] h-[24vh] w-[12vw]',
              'left-[46vw] top-[-32vh] h-[22vh] w-[11vw]',
              'left-[58vw] top-[-2vh] h-[24vh] w-[11vw]',
            ]}
          />

          {/* Competition item 2 */}
          <ExperienceCard
            item={experienceItems[4]}
            className="left-[354vw] top-[23vh]"
            imageClassName="left-[0vw] top-[24vh] h-[48vh] w-[40vw]"
            decorativeBlocks={[
              'left-[-20vw] top-[4vh] h-[24vh] w-[12vw]',
              'left-[47vw] top-[6vh] h-[22vh] w-[11vw]',
              'left-[58vw] top-[40vh] h-[22vh] w-[11vw]',
            ]}
          />
        </div>
      </div>

      {/* Mobile Experience Layout */}
      <div className="flex flex-col gap-14 px-5 py-20 md:hidden">
        <div className="border-t border-[#EF8A76]/70 pt-6">
          <p className="font-body text-[13px] font-black uppercase tracking-[0.18em] text-[#F0E8D5]/50">
            Experience
          </p>

          <h2 className="mt-3 font-heading text-[44px] min-[390px]:text-[48px] uppercase leading-[0.9] text-[#F0E8D5]">
            Organizational
          </h2>
        </div>

        <div className="flex flex-col gap-14">
          {experienceItems
            .filter((item) => item.category === 'Organizational')
            .map((item, index) => (
              <MobileExperienceCard key={`${item.title}-${index}`} item={item} index={index} />
            ))}
        </div>

        <div className="border-t border-[#EF8A76]/70 pt-6">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <h2 className="font-heading text-[44px] min-[390px]:text-[48px] uppercase leading-[0.9] text-[#F0E8D5]">
              Competitions
            </h2>

            <span className="mb-1 font-body text-[14px] font-black uppercase leading-none text-[#F0E8D5]/50">
              + An Award!
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-14">
          {experienceItems
            .filter((item) => item.category === 'Competitions')
            .map((item, index) => (
              <MobileExperienceCard key={`${item.title}-${index}`} item={item} index={index} />
            ))}
        </div>
      </div>

    </section>
  );
}

type DecorativeImage = {
  src: string;
  alt: string;
};

type ExperienceItem = {
  category: string;
  title: string;
  eyebrow: string;
  year: string;
  imageSrc: string;
  imageAlt: string;
  decorativeImages: DecorativeImage[];
  description: string[];
};

type ExperienceCardProps = {
  item: ExperienceItem;
  className: string;
  imageClassName: string;
  decorativeBlocks: string[];
  priorityImages?: boolean;
};

function ExperienceCard({
  item,
  className,
  imageClassName,
  decorativeBlocks,
  priorityImages = false,
}: ExperienceCardProps) {
  return (
    <article className={`absolute z-20 w-[40vw] ${className}`}>
      <div className={`absolute overflow-hidden bg-[#F0E8D5] ${imageClassName}`}>
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="40vw"
          className="object-cover object-center"
          priority={priorityImages}
          loading={priorityImages ? 'eager' : 'lazy'}
        />
      </div>

      {decorativeBlocks.map((blockClassName, index) => {
        const decorativeImage = item.decorativeImages[index];

        return (
          <div
            key={`${decorativeImage.src}-${blockClassName}`}
            className={`absolute overflow-hidden bg-[#F0E8D5] ${blockClassName}`}
          >
            <Image
              src={decorativeImage.src}
              alt={decorativeImage.alt}
              fill
              sizes="12vw"
              className="object-cover object-center"
              priority={priorityImages}
              loading={priorityImages ? 'eager' : 'lazy'}
            />
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

        <ul className="mt-3 list-disc pl-5 font-body text-[clamp(0.9rem,0.95vw,0.95rem)] font-bold normal-case leading-tight text-[#F0E8D5]/80">
          {item.description.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function MobileExperienceCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
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
      <div className="relative w-full overflow-hidden rounded-md bg-[#F0E8D5]">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          width={1200}
          height={800}
          sizes="100vw"
          className="aspect-[4/3] w-full object-cover"
        />
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
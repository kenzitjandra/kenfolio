'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const images = ['/me1.webp', '/me2.webp', '/me3.webp'];

type AboutContentProps = {
  id?: string;
};

export default function AboutContent({ id }: AboutContentProps) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getPositionStyle = (i: number) => {
    const length = images.length;

    const offset = isMobile ? 58 : 160;

    if (i === index) {
      return {
        zIndex: 30,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      };
    }

    if ((i + 1) % length === index) {
      return {
        zIndex: 20,
        x: -offset,
        y: 0,
        scale: 0.7,
        opacity: 0.6,
      };
    }

    return {
      zIndex: 10,
      x: offset,
      y: 0,
      scale: 0.7,
      opacity: 0.6,
    };
  };

  return (
    <section
      id={id}
      className="min-h-screen bg-[#212844] px-5 py-20 text-[#F0E8D5] overflow-x-hidden flex items-start md:px-8 md:py-24 lg:items-center"
    >
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-12">
        {/* Left - Text Content */}
        <div className="flex flex-col gap-6">
          <p className="font-body text-[15px] font-semibold leading-[1.7] text-left text-[#F0E8D5] md:text-justify md:text-base md:leading-[1.6]">
            I’m Kenzi, a Computer Science student and developer from Indonesia
            with a focus on Full-Stack Development, Machine Learning, and UI/UX
            design. My work spans across building end-to-end web applications,
            developing IoT systems, and exploring areas such as Computer Vision
            and Natural Language Processing (NLP), where I aim to connect
            software, data, and hardware into practical solutions.
          </p>

          <p className="font-body text-[15px] font-semibold leading-[1.7] text-left text-[#F0E8D5] md:text-justify md:text-base md:leading-[1.6]">
            I’ve worked on a variety of projects ranging from scalable web
            platforms and machine learning systems to IoT-based applications,
            contributing across development, implementation, and design. I also
            have experience in academic research in machine learning, including
            work published in IEEE.
          </p>

          <h3 className="mt-4 font-heading text-[32px] leading-none md:text-3xl">
            FOCUSING ON
          </h3>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
            <div className="border border-[#EF8A76] rounded p-4 w-full md:flex-1">
              <img
                src="/stairs.svg"
                alt="Arrow Icon"
                className="mb-7 h-[32px] w-[32px] md:mb-10 md:h-[35px] md:w-[35px]"
              />

              <p className="font-body text-[14px] font-semibold leading-6 md:text-base">
                WEB DEVELOPMENT
                <br />
                MACHINE LEARNING
                <br />
                SOFTWARE DEVELOPMENT
              </p>
            </div>

            <div className="border border-[#EF8A76] rounded p-4 w-full md:flex-1">
              <img
                src="/spikyball.svg"
                alt="Arrow Icon"
                className="mb-7 h-[32px] w-[32px] md:mb-10 md:h-[35px] md:w-[35px]"
              />

              <p className="font-body text-[14px] leading-6 font-semibold md:text-base">
                UI/UX DESIGN
                <br />
                LOGO DESIGN
              </p>
            </div>
          </div>
        </div>

        {/* Right - Stacked Carousel */}
        <div className="relative mx-auto flex h-[320px] w-full items-center justify-center md:h-[450px]">
          {images.map((src, i) => {
            const isTop = i === index;
            const pos = getPositionStyle(i);

            return (
              <motion.div
                key={src}
                className="absolute h-[280px] w-[210px] cursor-pointer overflow-hidden rounded border border-[#EF8A76] shadow-xl md:h-[400px] md:w-[300px]"
                initial={{ opacity: 0, y: -40, scale: 0.85 }}
                animate={{
                  ...pos,
                  transition: {
                    duration: 0.8,
                    ease: 'easeInOut',
                  },
                }}
                whileHover={isTop ? { scale: 1.05 } : {}}
                transition={
                  isTop
                    ? { scale: { duration: 0.2, ease: 'easeInOut' } }
                    : {}
                }
              >
                <Image
                  src={src}
                  alt={`Me ${i + 1}`}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover rounded border border-[#EF8A76]"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
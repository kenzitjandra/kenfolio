'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const images = ['/me1.png', '/me2.png', '/me3.png'];

export default function AboutContent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getPositionStyle = (i: number) => {
    const length = images.length;

    // Check if screen is mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const offset = isMobile ? 80 : 160; // smaller gap on mobile

    if (i === index) {
      return {
        zIndex: 30,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      };
    } else if ((i + 1) % length === index) {
      return {
        zIndex: 20,
        x: -offset,
        y: 0,
        scale: 0.7,
        opacity: 0.6,
      };
    } else {
      return {
        zIndex: 10,
        x: offset,
        y: 0,
        scale: 0.7,
        opacity: 0.6,
      };
    }
  };


  // const handleClick = () => {
  //   setIndex((prev) => (prev + 1) % images.length);
  // };

  return (
    <section id="about" className="bg-[#212844] text-[#E6D5B7] px-8 pb-28 overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left - Text Content */}
        <div className="flex flex-col gap-6">
          <p className="text-md md:text-lg font-body text-[#E6D5B7] font-semibold">
            I’m Kenzi, a full-stack developer from Surabaya, Indonesia. With a strong passion for programming and design, I bring ideas to life by turning concepts into impactful digital solutions. Drawing from my experience in front-end and back-end development, IoT systems, and machine learning.
          </p>
          <p className="text-md md:text-lg font-body text-[#E6D5B7] font-semibold">
            With each project, I stay committed to learning, growing, and making meaningful contributions along the way.
          </p>

          <h3 className="text-3xl font-heading mt-4">FOCUSING ON</h3>

          <div className="flex flex-wrap gap-4 md:gap-8">
            <div className="border border-[#EF8A76] rounded p-4 w-full md:w-[280px]">
              <img src="/stairs.svg" alt="Arrow Icon" className="w-[35px] h-[35px] mb-10"/>
              <p className="font-body text-md leading-6 font-semibold">
                WEB DEVELOPMENT<br />MACHINE LEARNING<br />SOFTWARE DEVELOPMENT
              </p>
            </div>
            <div className="border border-[#EF8A76] rounded p-4 w-full md:w-[280px]">
              <img src="/spikyball.svg" alt="Arrow Icon" className="w-[35px] h-[35px] mb-10"/>
              <p className="font-body text-md leading-6 font-semibold">
                UI/UX DESIGN<br />LOGO DESIGN
              </p>
            </div>
          </div>
        </div>

        {/* Right - Stacked Carousel */}
        <div className="relative h-[300px] md:h-[450px] flex items-center justify-center mx-auto">
          {images.map((src, i) => {
            const isTop = i === index;
            const pos = getPositionStyle(i);
            return (
              <motion.div
                key={i}
                className="absolute w-[200px] h-[267px] md:w-[300px] md:h-[400px] rounded overflow-hidden shadow-xl cursor-pointer border border-[#EF8A76]"
                initial={{ opacity: 0, y: -40, scale: 0.85 }}
                animate={{ 
                  ...pos, 
                  transition: { 
                    duration: 0.8, 
                    ease: 'easeInOut' 
                  } 
                }}
                whileHover={isTop ? { scale: 1.05 } : {}}
                transition={isTop ? { scale: { duration: 0.2, ease: 'easeInOut' } } : {}}
              >
                <Image
                  src={src}
                  alt={`Me ${i}`}
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

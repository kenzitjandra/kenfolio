'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

import Hero from '@/components/Hero';
import About from '@/components/About';
import AboutContent from '@/components/AboutContent';
import Skills from '@/components/Skills';
import ProjectShowcase from '@/components/ProjectShowcase';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import LoaderSection from '@/components/LoaderSection';

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [siteReveal, setSiteReveal] = useState(false);

  const handleLoaderExitStart = useCallback(() => {
    setSiteReveal(true);
  }, []);

  const handleLoaderDone = useCallback(() => {
    setLoaderDone(true);
  }, []);

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
        className="bg-[#212844]"
      >
        <Hero startAnimation={siteReveal} />
        <About />
        <AboutContent />
        <Skills />
        <ProjectShowcase />
        <Footer />
      </motion.main>

      {loaderDone && <CustomCursor />}
    </>
  );
}
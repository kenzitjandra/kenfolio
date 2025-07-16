'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import AboutContent from '@/components/AboutContent';
import Skills from '@/components/Skills';
import ProjectShowcase from '@/components/ProjectShowcase';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import VideoIntro from '@/components/VideoIntro';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  return (
    <>
      {showIntro && <VideoIntro onFinish={() => setShowIntro(false)} />}
      {!showIntro && (
        <main>
          <Hero />
          <About />
          <AboutContent />
          <Skills />
          <ProjectShowcase />
          <Footer />
          <CustomCursor />
      </main>
      )}
    </>
  );
}

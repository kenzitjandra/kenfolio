import Image from "next/image";
import Hero from '@/components/Hero';
import About from '@/components/About';
import AboutContent from '@/components/AboutContent';
import Skills from '@/components/Skills';
import ProjectShowcase from '@/components/ProjectShowcase';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <AboutContent />
      <Skills />
      <ProjectShowcase />
      <Footer />
      <CustomCursor />
    </main>
  );
}

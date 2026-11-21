import { lenis } from '@/app/providers/LenisProvider';

export function scrollToSection(id: string) {
  if (!lenis) return;

  const isMobile = window.innerWidth < 768;

  if (id === 'about') {
    const target = document.getElementById(isMobile ? 'about-content' : 'about-title');
    if (target) lenis.scrollTo(target, { offset: isMobile ? -20 : 0 });
    return;
  }

  const target = document.getElementById(id);
  if (target) lenis.scrollTo(target, { offset: -50 });
}
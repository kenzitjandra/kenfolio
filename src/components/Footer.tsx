'use client';

import { lenis } from '@/app/providers/LenisProvider';
import Image from 'next/image';

export default function Footer() {
  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'WORK', id: 'experience' },
    { label: 'PROJECTS', id: 'projects' },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section && lenis) {
      lenis.scrollTo(section, { offset: -50 });
    }
  };

  return (
    <footer className="bg-[#212844] text-[#F0E8D5] px-8 pb-10">
      {/* Top divider */}
      <div className="border-t border-[#EF8A76] w-full mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)_minmax(0,1.75fr)] gap-5 text-sm items-stretch">
        {/* Left: Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="relative h-[140px] w-[140px] cursor-pointer group z-20"
        >
          <Image
            src="/logo-thin-outline.svg"
            alt="Logo Outline"
            fill
            className="object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0"
          />

          <Image
            src="/logo-thin-filled.svg"
            alt="Logo Filled"
            fill
            className="object-contain opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          />
        </button>

        {/* Middle: Menu */}
        <div className="min-h-[140px] border border-[#EF8A76] rounded p-5 w-full flex flex-col justify-between gap-4">
          <div className="flex justify-between items-start">
            <h4 className="text-4xl font-heading leading-none">MENU</h4>
            <img src="/stairs.svg" alt="icon" className="w-[35px] h-[35px]" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="cursor-pointer relative group border border-[#EF8A76] h-11 w-full rounded text-[#F0E8D5] font-body font-semibold overflow-hidden z-0 flex items-center justify-center"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#212844]">
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-[#EF8A76] transition-all duration-300 ease-in-out group-hover:h-full z-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Contact */}
        <div className="min-h-[140px] border border-[#EF8A76] rounded p-5 w-full flex flex-col justify-between gap-4">
          <div className="flex justify-between items-start">
            <h4 className="text-4xl font-heading leading-none">CONTACT</h4>
            <img src="/spikyball.svg" alt="icon" className="w-[35px] h-[35px]" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 w-full">
            {/* Social Buttons */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'INSTAGRAM', url: 'https://instagram.com/kenzitjandra' },
                { label: 'GITHUB', url: 'https://github.com/kenzitjandra' },
                { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/kenzi-erico-tjandra-b65a2728a/' },
              ].map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer relative group border border-[#EF8A76] h-11 px-5 rounded text-[#F0E8D5] font-body font-semibold overflow-hidden z-0 flex items-center justify-center"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#212844]">
                    {label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0 bg-[#EF8A76] transition-all duration-300 ease-in-out group-hover:h-full z-0" />
                </a>
              ))}
            </div>

            {/* Email aligned right */}
            <a
              href="mailto:kenzitjandra@gmail.com"
              className="cursor-pointer relative group border border-[#EF8A76] h-11 px-5 rounded text-[#F0E8D5] font-body font-semibold overflow-hidden z-0 flex items-center justify-center lg:ml-auto"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#212844]">
                kenzitjandra@gmail.com
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-[#EF8A76] transition-all duration-300 ease-in-out group-hover:h-full z-0" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
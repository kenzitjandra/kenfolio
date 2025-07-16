'use client';

import { lenis } from '@/app/providers/LenisProvider';
import Logo from './Logo';
import Image from 'next/image';

export default function Footer() {
  const navItems = ['HOME', 'ABOUT', 'PROJECTS'];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section && lenis) {
      lenis.scrollTo(section, { offset: -50 });
    }
  };

  return (
    <footer className="bg-[#212844] text-[#E6D5B7] px-8 pb-10">
      {/* Top divider */}
      <div className="border-t border-[#EF8A76] w-full mb-10" />

      {/* Custom Width Layout */}
      <div className="flex flex-col md:flex-row gap-6 text-sm">
        {/* Left: Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="cursor-pointer relative md:w-66 md:h-33 block group z-20"
        >
          {/* Outline Logo */}
          <Image
            src="/logo-thin-outline.svg"
            alt="Logo Outline"
            fill
            className="object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0"
          />
          {/* Filled Logo */}
          <Image
            src="/logo-thin-filled.svg"
            alt="Logo Filled"
            fill
            className="object-contain transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
          />
        </button>

        {/* Middle: Menu */}
        <div className="border border-[#EF8A76] rounded p-4 w-full md:w-[30%] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h4 className="text-4xl font-heading">MENU</h4>
            <img src="/stairs.svg" alt="icon" className="w-[35px] h-[35px]" />
          </div>
          <div className="flex flex-wrap gap-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="cursor-pointer relative group border border-[#EF8A76] px-4 py-2 rounded text-[#E6D5B7] font-body font-semibold overflow-hidden z-0"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#212844]">
                  {item}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-[#EF8A76] transition-all duration-300 ease-in-out group-hover:h-full z-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Contact */}
        <div className="border border-[#EF8A76] rounded p-4 w-full md:flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h4 className="text-4xl font-heading">CONTACT</h4>
            <img src="/spikyball.svg" alt="icon" className="w-[35px] h-[35px]" />
          </div>

          {/* Contact Buttons and Email Row */}
          <div className="flex justify-between items-start flex-wrap gap-3">
            {/* Social Buttons */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'INSTAGRAM', url: 'https://instagram.com/kenzitjandra' },
                { label: 'GITHUB', url: 'https://github.com/kenzitjandra' },
                { label: 'LINKEDIN', url: 'https://linkedin.com/in/kenzitjandra' },
              ].map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer relative group border border-[#EF8A76] px-4 py-2 rounded text-[#E6D5B7] font-body font-semibold overflow-hidden z-0"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#212844]">
                    {label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0 bg-[#EF8A76] transition-all duration-300 ease-in-out group-hover:h-full z-0" />
                </a>
              ))}
            </div>

            {/* Email aligned to right */}
            <a
              href="mailto:kenzitjandra@gmail.com"
              className="cursor-pointer relative group border border-[#EF8A76] px-4 py-2 rounded text-[#E6D5B7] font-body font-semibold overflow-hidden z-0"
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
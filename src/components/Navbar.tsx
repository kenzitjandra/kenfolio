'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-transparent text-[#E6D5B7] font-body">
      
        {/* Left - Logo */}
        <Logo />

        {/* Right - Menu */}
        <div className="border border-[#EF8A76] p-1 flex gap-1 rounded text-xs">
            <Link
            href="/"
            className="relative overflow-hidden px-6 py-3 text-[#E6D5B7] font-semibold font-body 
                        border border-transparent rounded
                        hover:text-[#1b1e3d] transition-colors duration-300 z-10
                        hover:border-[#EF8A76]
                        group"
            >
            <span className="relative z-10">HOME</span>
            <span
                className="absolute inset-0 bg-[#EF8A76] scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0"></span>
            </Link>

            <Link
            href="/"
            className="relative overflow-hidden px-6 py-3 text-[#E6D5B7] font-body font-semibold
                        border border-transparent rounded
                        hover:text-[#1b1e3d] transition-colors duration-300 z-10
                        hover:border-[#EF8A76]
                        group"
            >
            <span className="relative z-10">ABOUT</span>
            <span
                className="absolute inset-0 bg-[#EF8A76] scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0"></span>
            </Link>
            
            <Link
            href="/"
            className="relative overflow-hidden px-6 py-3 text-[#E6D5B7] font-body font-semibold
                        border border-transparent rounded
                        hover:text-[#1b1e3d] transition-colors duration-300 z-10
                        hover:border-[#EF8A76]
                        group"
            >
            <span className="relative z-10">PROJECTS</span>
            <span
                className="absolute inset-0 bg-[#EF8A76] scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0"></span>
            </Link>
        </div>

    </nav>
  );
}
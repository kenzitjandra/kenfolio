'use client';

import Image from 'next/image';
import { FaInstagram, FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';

export default function Hero() {
  return (
    <section id="home" className="bg-[#212844] text-[#f4e8d6] flex items-center justify-center px-6 pt-30 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full items-start relative">

            {/* Left - Large Vertical Name */}
            <div className="text-[#E6D5B7] font-heading text-[190px] leading-[0.85] uppercase text-center md:text-left">
                <p>Kenzi</p>
                <p>Erico</p>
                <p className='pl-[5px]'>Tjandra</p>
            </div>

            <div className="hidden md:block absolute top-[130px] left-[400px] -translate-y-1/2 z-20">
            <Image
                src="/me.png"
                alt="Profile"
                width={235}
                height={400}
                className="object-cover rounded"
                priority
                />
            </div>

            {/* Right - Developer Info */}
            <div className="flex flex-col justify-between h-full pr-2">

            {/* Top Section - Title */}
            <div className="text-[#E6D5B7] text-4xl md:text-[100px] font-heading uppercase text-right leading-[0.85]">
                <p>Developer</p>
                <p>Designer</p>
            </div>

            {/* Bottom Section - CV + Socials */}
            <div className="flex flex-col items-center md:items-end gap-6 mt-12">
                {/* CV Button */}
                <a
                href="/cv.pdf" // Make sure this file is in your `/public` folder
                download
                className="relative group inline-block cursor-pointer border-none outline-none bg-transparent p-0"
                >
                    {/* Bottom layer - shadow */}
                    <span className="absolute inset-0 bg-transparent border border-[#EF8A76] rounded-md translate-y-[6px] z-0" />

                    {/* Top layer - front face */}
                    <span className="relative inline-flex items-center justify-between gap-6 px-28 py-8 border border-[#EF8A76] rounded-md bg-[#212844] text-[#E6D5B7] text-[80px] font-heading leading-none transition-transform duration-200 ease-in-out group-hover:-translate-y-[4px] group-active:-translate-y-[-4px] z-10">
                        CV
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-19 h-19"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 12l-4 4m0 0l-4-4m4 4V4m-6 16h12"
                        />
                        </svg>
                    </span>
                </a>

                {/* Social Links */}
                <div className="flex gap-3">
                    <a href="https://www.instagram.com/kenzitjandra/" target="_blank" rel="noopener noreferrer" className="cube-wrapper">
                        <div className="cube-inner">
                            <div className="cube-face cube-front">
                            INSTAGRAM
                            </div>
                            <div className="cube-face cube-back">
                            @kenzitjandra
                            </div>
                        </div>
                    </a>

                    <a href="https://www.instagram.com/kenzitjandra/" target="_blank" rel="noopener noreferrer" className="cube-wrapper">
                        <div className="cube-inner">
                            <div className="cube-face cube-front">
                            GITHUB
                            </div>
                            <div className="cube-face cube-back">
                            kenzitjandra
                            </div>
                        </div>
                    </a>

                    <a href="https://www.instagram.com/kenzitjandra/" target="_blank" rel="noopener noreferrer" className="cube-wrapper">
                        <div className="cube-inner">
                            <div className="cube-face cube-front">
                            LINKEDIN
                            </div>
                            <div className="cube-face-linkedin cube-back">
                            Kenzi Erico Tjandra
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}

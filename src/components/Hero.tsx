'use client';

import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Hero() {
    const nameControls = useAnimation();
    const imageControls = useAnimation();

    const [ref, inView] = useInView({ threshold: 0.3 }); // this is necessary

    useEffect(() => {
        if (inView) {
            nameControls.start('show').then(() => {
            imageControls.start('show');
            });
        } else {
            nameControls.start('hidden');
            imageControls.start('hidden');
        }
    }, [inView, nameControls, imageControls]);


    const titleLine = {
        hidden: {
            transition: {
            staggerChildren: 0.05,
            staggerDirection: 1,
            },
        },
        show: {
            transition: {
            staggerChildren: 0.05,
            staggerDirection: 1,
            },
        },
    };

    const titleLetter = {
        hidden: {
            opacity: 0,
            x: 500,
            transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };



    const imageVariant = {
        hidden: {
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0,
        },
        show: {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            transition: {
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };



    const nameLines = ['Kenzi', 'Erico', 'Tjandra'];

    const container = {
        hidden: {
            transition: {
            delayChildren: 0.1,
            },
        },
        show: {
            transition: {
            staggerChildren: 0.3,
            },
        },
    };



    const line = {
        hidden: {
            transition: {
            staggerChildren: 0.05,
            staggerDirection: 1, // 🠐 reverse the order when exiting
            },
        },
        show: {
            transition: {
            staggerChildren: 0.05,
            staggerDirection: -1, // 🠒 normal entrance
            },
        },
    };


    const letter = {
        hidden: {
            opacity: 0,
            x: -500,
            transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const, // smooth
            },
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };

    const cvVariant = {
        hidden: {
            opacity: 0,
            x: 500,
            transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
            duration: 1.2, // match titleLetter duration
            ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };

    const socialContainer = {
        hidden: {},
        show: {
            transition: {
            delayChildren: 0.5, // ⏱️ wait 0.5s before animating socials
            staggerChildren: 0.05, // each social link comes one-by-one
            },
        },
    };


    const socialItem = {
        hidden: {
            opacity: 0,
            x: 500,
            transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
            duration: 1.2, // match titleLetter duration
            ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };


    return (
        <section id="home" className="bg-[#212844] text-[#f4e8d6] flex items-center justify-center px-6 pt-30 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full items-start relative">

                {/* Left - Large Vertical Name */}
                <motion.div
                ref={ref}
                variants={container}
                initial="hidden"
                animate={nameControls}
                className="text-[#E6D5B7] font-heading text-[190px] leading-[0.85] uppercase text-center md:text-left"
                >
                {nameLines.map((lineText, i) => (
                    <motion.p
                    key={lineText}
                    variants={line}
                    className={i === 2 ? 'pl-[5px]' : ''}
                    >
                    {lineText.split('').map((char, index) => (
                        <motion.span
                        key={index}
                        variants={letter}
                        className="inline-block"
                        >
                        {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                    </motion.p>
                ))}

                </motion.div>

                <motion.div
                variants={imageVariant}
                initial="hidden"
                animate={imageControls}
                className="hidden md:block absolute top-[130px] left-[400px] -translate-y-1/2 z-20 overflow-hidden"
                style={{
                    clipPath: 'inset(0 100% 0 0)',
                    WebkitClipPath: 'inset(0 100% 0 0)',
                }}
                >
                    <Image
                        src="/me.png"
                        alt="Profile"
                        width={235}
                        height={400}
                        className="object-cover rounded"
                        priority
                    />
                </motion.div>



                {/* Right - Developer Info */}
                <div className="flex flex-col justify-between h-full pr-2">

                {/* Top Section - Title */}
                <motion.div
                variants={container}
                initial="hidden"
                animate={nameControls}
                className="text-[#E6D5B7] text-4xl md:text-[100px] font-heading uppercase text-right leading-[0.85]"
                >
                    {['Developer', 'Designer'].map((text) => (
                        <motion.p key={text} variants={titleLine}>
                        {text.split('').map((char, i) => (
                            <motion.span
                            key={i}
                            variants={titleLetter}
                            className="inline-block"
                            >
                            {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                        </motion.p>
                    ))}
                </motion.div>


                {/* Bottom Section - CV + Socials */}
                <div className="flex flex-col items-center md:items-end gap-6 mt-12">
                    {/* CV Button */}
                    <motion.a
                    variants={cvVariant}
                    initial="hidden"
                    animate={nameControls}
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
                    </motion.a>

                    {/* Social Links */}
                    <motion.div
                    variants={socialContainer}
                    initial="hidden"
                    animate={nameControls}
                    className="flex gap-3"
                    >
                        {[
                            { href: "https://www.instagram.com/kenzitjandra/", front: "INSTAGRAM", back: "@kenzitjandra" },
                            { href: "https://www.instagram.com/kenzitjandra/", front: "GITHUB", back: "kenzitjandra" },
                            { href: "https://www.instagram.com/kenzitjandra/", front: "LINKEDIN", back: "Kenzi Erico Tjandra" },
                        ].map(({ href, front, back }, i) => (
                            <motion.a
                            key={i}
                            variants={socialItem}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cube-wrapper"
                            >
                            <div className="cube-inner">
                                <div className="cube-face cube-front">{front}</div>
                                <div className={`cube-face cube-back`}>{back}</div>
                            </div>
                            </motion.a>
                        ))}
                    </motion.div>

                </div>
            </div>

        </div>
        </section>
    );
}

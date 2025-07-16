'use client';

import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { FiMenu, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { lenis } from '@/app/providers/LenisProvider';
import Magnetic from '@/components/Magnetic';


export default function Navbar() {
    const [showHamburger, setShowHamburger] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const navbarVariant = {
        hidden: {
            opacity: 0,
            y: -100,
            transition: {
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };


    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = document.getElementById('hero')?.offsetHeight || 600;
            const currentScrollY = window.scrollY;

            // Detect scroll direction
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setHidden(true);
            } else {
            setHidden(false);
            }

            // Show hamburger after hero
            const shouldShowHamburger = currentScrollY > heroHeight - 50;
            setShowHamburger(shouldShowHamburger);

            // Close menu if user scrolls back into hero
            if (!shouldShowHamburger && isMenuOpen) {
            setIsMenuOpen(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMenuOpen]);


    const navItems = ['HOME', 'ABOUT', 'PROJECTS'];

    return (
        <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-transparent text-[#E6D5B7] font-body overflow-x-hidden"
        >
        <div className="flex justify-between items-center w-full">
            <button
            onClick={() => {
                const homeSection = document.getElementById('home');
                if (homeSection && lenis) {
                lenis.scrollTo(homeSection, { offset: -50 });
                setIsMenuOpen(false);
                }
            }}
            className="backdrop-blur-md bg-[#212844]/50 rounded-md p-2"
            >
                <Logo />
            </button>


            {/* Animate Between Full Nav and Hamburger */}
            <div className="relative w-[220px] md:flex hidden justify-end items-center">
                <AnimatePresence mode="wait">
                    {!showHamburger ? (
                    <motion.div
                        key="fullnav"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="border border-[#EF8A76] p-1 flex gap-1 rounded text-xs backdrop-blur-md bg-[#212844]/50"
                    >
                        {navItems.map((label) => {
                            const id = label.toLowerCase();
                            return (
                                <button
                                key={label}
                                onClick={() => {
                                    const target = document.getElementById(id);
                                    if (target && lenis) {
                                    lenis.scrollTo(target, { offset: -50 }); // offset if you have a sticky navbar
                                    setIsMenuOpen(false);
                                    }
                                }}
                                className="cursor-pointer relative overflow-hidden px-6 py-3 text-[#E6D5B7] font-body font-semibold
                                    border border-transparent rounded
                                    hover:text-[#1b1e3d] transition-colors duration-300 z-10
                                    hover:border-[#EF8A76] group"
                                >
                                <span className="relative z-10">{label}</span>
                                <span className="absolute inset-0 bg-[#EF8A76] scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0" />
                                </button>
                            );
                        })}

                    </motion.div>
                    ) : (
                    <Magnetic>
                        <motion.div
                            key="hamburger"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.25 }}
                            className="backdrop-blur-md bg-[#212844]/50 rounded-md p-2"
                        >
                            <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="cursor-pointer text-[#E6D5B7] text-2xl"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                    key={isMenuOpen ? 'close' : 'menu'}
                                    initial={{ rotate: isMenuOpen ? 25 : -25, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: isMenuOpen ? -25 : 25, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    >
                                    {isMenuOpen ? <FiX /> : <FiMenu />}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    </Magnetic>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Hamburger - always visible */}
            {isMobile && (
            <div className="flex md:hidden ml-4 z-50">
                <Magnetic>
                <motion.div
                    key="mobile-hamburger"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="backdrop-blur-md bg-[#212844]/50 rounded-md p-2"
                >
                    <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="cursor-pointer text-[#E6D5B7] text-2xl"
                    >
                    <AnimatePresence mode="wait">
                        <motion.div
                        key={isMenuOpen ? 'close-mobile' : 'menu-mobile'}
                        initial={{ rotate: isMenuOpen ? 25 : -25, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: isMenuOpen ? -25 : 25, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        >
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                        </motion.div>
                    </AnimatePresence>
                    </button>
                </motion.div>
                </Magnetic>
            </div>
            )}


        </div>

        {/* Desktop Dropdown Menu */}
        <AnimatePresence>
        {isMenuOpen && !isMobile && (
            <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-1/2 right-[3rem] transform -translate-y-1/2 mr-10 backdrop-blur-md bg-[#212844]/80 border border-[#EF8A76] rounded px-1 py-1 flex gap-1 z-40 text-xs shadow-xl"
            >
            {['HOME', 'ABOUT', 'PROJECTS'].map((label) => {
                const id = label.toLowerCase();
                return (
                <button
                    key={label}
                    onClick={() => {
                    const target = document.getElementById(id);
                    if (target && lenis) {
                        lenis.scrollTo(target, { offset: -50 });
                    }
                    setIsMenuOpen(false);
                    }}
                    className="cursor-pointer relative overflow-hidden px-6 py-3 text-[#E6D5B7] font-body font-semibold
                    border border-transparent rounded
                    hover:text-[#1b1e3d] transition-colors duration-300 z-10
                    hover:border-[#EF8A76] group"
                >
                    <span className="relative z-10">{label}</span>
                    <span className="absolute inset-0 bg-[#EF8A76] scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0" />
                </button>
                );
            })}
            </motion.div>
        )}
        </AnimatePresence>


        {/* Blurred Dropdown */}
        <AnimatePresence>
        {isMenuOpen && isMobile && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#212844]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8"
            >
            <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 text-[#E6D5B7] text-3xl hover:text-[#EF8A76] transition"
            >
                <FiX />
            </button>

            {navItems.map((label) => {
                const id = label.toLowerCase();
                return (
                <button
                    key={label}
                    onClick={() => {
                    const target = document.getElementById(id);
                    if (target && lenis) {
                        lenis.scrollTo(target, { offset: -50 });
                    }
                    setIsMenuOpen(false);
                    }}
                    className="text-3xl text-[#E6D5B7] font-semibold transition hover:text-[#EF8A76]"
                >
                    {label}
                </button>
                );
            })}
            </motion.div>
        )}
        </AnimatePresence>

        </motion.nav>
    );
}

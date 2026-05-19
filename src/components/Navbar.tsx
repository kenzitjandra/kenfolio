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
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = document.getElementById('home')?.offsetHeight || 600;
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            const shouldShowHamburger = currentScrollY > heroHeight - 50;
            setShowHamburger(shouldShowHamburger);

            if (!shouldShowHamburger && isMenuOpen) {
                setIsMenuOpen(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMenuOpen]);

    const navItems = [
        { label: 'HOME', id: 'home' },
        { label: 'ABOUT', id: 'about' },
        { label: 'WORK', id: 'experience' },
        { label: 'PROJECTS', id: 'projects' },
    ];

    const handleNavClick = (item: { label: string; id: string }) => {
        if (!lenis) return;

        if (item.id === 'about') {
            const targetId = isMobile ? 'about-content' : 'about-title';
            const target = document.getElementById(targetId);

            if (target) {
                lenis.scrollTo(target, {
                    offset: isMobile ? -20 : 0,
                });
            }

            setIsMenuOpen(false);
            return;
        }

        const target = document.getElementById(item.id);

        if (target) {
            lenis.scrollTo(target, { offset: -50 });
        }

        setIsMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: hidden ? '-100%' : '0%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-3 left-0 right-0 z-50 px-8 py-4 bg-transparent text-[#F0E8D5] font-body overflow-x-hidden"
        >
            <div className="flex w-full items-center justify-between">
                <button
                    onClick={() => {
                        const homeSection = document.getElementById('home');

                        if (homeSection && lenis) {
                            lenis.scrollTo(homeSection, { offset: -50 });
                            setIsMenuOpen(false);
                        }
                    }}
                    className="group relative flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-md"
                >
                    <span className="absolute inset-0 bg-[#212844]/50 backdrop-blur-md" />
                    <Logo className="relative z-10 h-[54px] w-[54px]" priority />
                </button>

                {/* Animate Between Full Nav and Hamburger */}
                <div className="relative hidden w-[320px] items-center justify-end md:flex">
                    <AnimatePresence mode="wait">
                        {!showHamburger ? (
                            <motion.div
                                key="fullnav"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex gap-1 rounded border border-[#EF8A76] bg-[#212844]/50 p-1 text-xs backdrop-blur-md"
                            >
                                {navItems.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => handleNavClick(item)}
                                        className="group relative z-10 cursor-pointer overflow-hidden rounded border border-transparent px-6 py-3 font-body font-semibold text-[#F0E8D5] transition-colors duration-300 hover:border-[#EF8A76] hover:text-[#1b1e3d]"
                                    >
                                        <span className="relative z-10">{item.label}</span>
                                        <span className="absolute inset-0 z-0 origin-bottom scale-y-0 bg-[#EF8A76] transition-transform duration-300 ease-in-out group-hover:scale-y-100" />
                                    </button>
                                ))}
                            </motion.div>
                        ) : (
                            <Magnetic>
                                <motion.div
                                    key="hamburger"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex h-[42px] w-[42px] items-center justify-center rounded-md bg-[#212844]/50 backdrop-blur-md"
                                >
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="cursor-pointer text-2xl text-[#F0E8D5]"
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={isMenuOpen ? 'close' : 'menu'}
                                                initial={{
                                                    rotate: isMenuOpen ? 25 : -25,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    rotate: 0,
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    rotate: isMenuOpen ? -25 : 25,
                                                    opacity: 0,
                                                }}
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
                    <div className="z-50 ml-4 flex md:hidden">
                        <Magnetic>
                            <motion.div
                                key="mobile-hamburger"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.25 }}
                                className="rounded-md bg-[#212844]/50 p-2 backdrop-blur-md"
                            >
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="cursor-pointer text-2xl text-[#F0E8D5]"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isMenuOpen ? 'close-mobile' : 'menu-mobile'}
                                            initial={{
                                                rotate: isMenuOpen ? 25 : -25,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                rotate: 0,
                                                opacity: 1,
                                            }}
                                            exit={{
                                                rotate: isMenuOpen ? -25 : 25,
                                                opacity: 0,
                                            }}
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
                        className="absolute top-1/2 right-[3rem] z-40 mr-10 flex -translate-y-1/2 transform gap-1 rounded border border-[#EF8A76] bg-[#212844]/80 px-1 py-1 text-xs backdrop-blur-md"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleNavClick(item)}
                                className="group relative z-10 cursor-pointer overflow-hidden rounded border border-transparent px-6 py-3 font-body font-semibold text-[#F0E8D5] transition-colors duration-300 hover:border-[#EF8A76] hover:text-[#1b1e3d]"
                            >
                                <span className="relative z-10">{item.label}</span>
                                <span className="absolute inset-0 z-0 origin-bottom scale-y-0 bg-[#EF8A76] transition-transform duration-300 ease-in-out group-hover:scale-y-100" />
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isMenuOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#212844]/95 backdrop-blur-md"
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-8 right-8 text-3xl text-[#E6D5B7] transition hover:text-[#EF8A76]"
                        >
                            <FiX />
                        </button>

                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleNavClick(item)}
                                className="text-3xl font-semibold text-[#F0E8D5] transition hover:text-[#EF8A76]"
                            >
                                {item.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
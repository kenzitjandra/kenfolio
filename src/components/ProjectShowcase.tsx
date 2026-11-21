'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import SkillPopover from '@/components/SkillPopover';
import { useIsClient } from '@/lib/useIsClient';

export default function ProjectShowcase() {
    const [projectIndex, setProjectIndex] = useState(0);
    const [direction, setDirection] = useState<'up' | 'down'>('down');
    const mounted = useIsClient();

    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const activeIndexRef = useRef<number>(0);

    const [imageCursor, setImageCursor] = useState({
        active: false,
        x: 0,
        y: 0,
        pressed: false,
    });

    const activeProject = projects[projectIndex];

    useEffect(() => {
        let ticking = false;

        const updateActiveProject = () => {
            const triggerPoint = window.innerHeight * 0.5;

            let activeIndex = 0;

            projectRefs.current.forEach((el, idx) => {
                if (!el) return;

                const rect = el.getBoundingClientRect();

                // A project becomes active once its top edge crosses mid-screen
                if (rect.top <= triggerPoint) {
                    activeIndex = idx;
                }
            });

            if (activeIndex !== activeIndexRef.current) {
                setDirection(activeIndex > activeIndexRef.current ? 'down' : 'up');
                activeIndexRef.current = activeIndex;
                setProjectIndex(activeIndex);
            }

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateActiveProject);
            }
        };

        updateActiveProject();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <>
            <section
                id="projects"
                className="bg-[#212844] text-[#F0E8D5] px-5 md:px-8 pt-12 md:pt-15 pb-24 md:pb-[35vh]"
            >
                {/* Top Divider Line */}
                <div className="border-t border-[#EF8A76] w-full mb-8" />

                {/* Heading Block */}
                <div className="flex flex-col items-start gap-2 mb-12 md:mb-32 overflow-hidden">
                    <p className="text-[18px] md:text-[20px] opacity-50 text-[#F0E8D5] font-body font-semibold">
                        MY SELECTED
                    </p>
                    <h2 className="text-[64px] sm:text-[80px] md:text-[100px] font-heading leading-none uppercase">
                        Projects
                    </h2>
                </div>

                {/* Project Content - Desktop */}
                <div className="hidden md:flex flex-row gap-16 items-start w-full">
                    {/* Left - Sticky Project Info */}
                    <div className="sticky top-[6vh] flex flex-col flex-shrink-0 w-[39%] h-[88vh]">
                        {/* Label + Number */}
                        <div className="flex items-start gap-4">
                            <p className="text-[clamp(2.5rem,3.6vw,3.75rem)] font-heading leading-[0.8] text-[#F0E8D5] mt-[clamp(1.4rem,2vw,1.9rem)]">
                                PROJECT
                            </p>

                            <div className="flex items-start gap-0 font-heading text-[clamp(8rem,16vw,18.75rem)] leading-none text-[#F0E8D5] h-[clamp(8rem,16vw,18.75rem)] overflow-hidden">
                                <span className="block">0</span>

                                <div className="relative w-[clamp(4.5rem,8.5vw,10rem)] h-[clamp(8rem,16vw,18.75rem)] overflow-hidden">
                                    <motion.div
                                        className="absolute top-0 left-0 flex flex-col"
                                        initial={false}
                                        animate={{
                                            y: `${-(projectIndex * 100) / projects.length}%`,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 260,
                                            damping: 30,
                                            mass: 0.9,
                                        }}
                                    >
                                        {projects.map((_, i) => (
                                            <span
                                                key={i}
                                                className="block h-[clamp(8rem,16vw,18.75rem)]"
                                                aria-hidden={i !== projectIndex}
                                            >
                                                {i + 1}
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Active Project Text */}
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeProject.title}
                                custom={direction}
                                initial={{
                                    opacity: 0,
                                    y: direction === 'down' ? 28 : -28,
                                    filter: 'blur(6px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                }}
                                exit={{
                                    opacity: 0,
                                    y: direction === 'down' ? -28 : 28,
                                    filter: 'blur(6px)',
                                }}
                                transition={{
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="mt-auto pb-[5vh] max-w-[min(34rem,92%)]"
                            >
                                <h3 className="text-[34px] lg:text-[38px] font-body font-black leading-none uppercase text-[#F0E8D5]">
                                    {activeProject.title}
                                </h3>

                                <p className="mt-4 text-[clamp(0.9rem,1.05vw,1.05rem)] font-body font-normal leading-[1.45] text-[#F0E8D5] max-w-[34rem] text-justify">
                                    {activeProject.description}
                                </p>

                                <motion.div
                                    className="mt-6 flex flex-wrap gap-3"
                                    initial="hidden"
                                    animate="show"
                                    variants={{
                                        hidden: {},
                                        show: {
                                            transition: {
                                                staggerChildren: 0.06,
                                                delayChildren: 0.15,
                                            },
                                        },
                                    }}
                                >
                                    {activeProject.tags.map((tag) => (
                                        <motion.div
                                            key={tag}
                                            variants={{
                                            hidden: { opacity: 0, y: 12 },
                                            show: { opacity: 1, y: 0 },
                                            }}
                                            transition={{
                                            duration: 0.35,
                                            ease: [0.22, 1, 0.36, 1],
                                            }}
                                        >
                                            <SkillPopover
                                            name={tag}
                                            note={activeProject.tagNotes?.[tag]}
                                            excludeProject={activeProject.title}
                                            buttonClassName="cursor-pointer relative group border border-[#EF8A76] h-9 px-4 rounded text-[#F0E8D5] font-body font-semibold overflow-hidden z-0 flex items-center justify-center"
                                            >
                                            <span className="relative z-10 text-[0.78rem] transition-colors duration-300 group-hover:text-[#212844] group-data-[open]:text-[#212844]">
                                                {tag}
                                            </span>
                                            <span className="absolute bottom-0 left-0 w-full h-0 bg-[#EF8A76] transition-all duration-300 ease-in-out group-hover:h-full group-data-[open]:h-full z-0" />
                                            </SkillPopover>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right - Large Project Images */}
                    <div className="flex flex-col gap-[18vh] w-[58%] ml-auto overflow-x-hidden">
                        {projects.map((project, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                    if (el) projectRefs.current[i] = el;
                                }}
                                className="flex flex-col w-full"
                            >
                                <motion.a
                                    data-project-image="true"
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={(e) => {
                                        setImageCursor({
                                            active: true,
                                            x: e.clientX,
                                            y: e.clientY,
                                            pressed: false,
                                        });
                                    }}
                                    onMouseLeave={() => {
                                        setImageCursor((prev) => ({
                                            ...prev,
                                            active: false,
                                            pressed: false,
                                        }));
                                    }}
                                    onMouseMove={(e) => {
                                        setImageCursor((prev) => ({
                                            ...prev,
                                            active: true,
                                            x: e.clientX,
                                            y: e.clientY,
                                        }));
                                    }}
                                    onMouseDown={() => {
                                        setImageCursor((prev) => ({
                                            ...prev,
                                            pressed: true,
                                        }));
                                    }}
                                    onMouseUp={() => {
                                        setImageCursor((prev) => ({
                                            ...prev,
                                            pressed: false,
                                        }));
                                    }}
                                    whileTap={{ scale: 0.985 }}
                                    className="relative block h-[88vh] w-full overflow-hidden rounded-md bg-black group cursor-default"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-contain rounded-md"
                                    />

                                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/45" />
                                </motion.a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Content - Mobile */}
                <div className="flex md:hidden flex-col gap-16 w-full">
                    {projects.map((project, i) => (
                        <motion.article
                            key={project.title}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{
                                duration: 0.55,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-col gap-5"
                        >
                            <div className="flex items-end justify-between gap-4 border-t border-[#EF8A76]/60 pt-5">
                                <p className="font-heading text-[32px] leading-none text-[#F0E8D5]">
                                    PROJECT
                                </p>

                                <p className="font-heading text-[64px] leading-[0.8] text-[#F0E8D5]">
                                    0{i + 1}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-[28px] font-body font-bold leading-tight uppercase text-[#F0E8D5]">
                                    {project.title}
                                </h3>

                                <p className="mt-4 text-[15px] leading-[1.65] text-[#F0E8D5]/90">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {project.tags.map((tag) => (
                                <SkillPopover
                                    key={tag}
                                    name={tag}
                                    note={project.tagNotes?.[tag]}
                                    excludeProject={project.title}
                                    buttonClassName="border border-[#EF8A76] rounded px-3 py-2 text-[11px] font-body font-semibold text-[#F0E8D5] transition-colors data-[open]:bg-[#EF8A76] data-[open]:text-[#212844]"
                                >
                                    {tag}
                                </SkillPopover>
                                ))}
                            </div>

                            <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileTap={{ scale: 0.985 }}
                                className="relative block w-full overflow-hidden rounded-md bg-[#151515]"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full aspect-[4/3] object-contain rounded-md"
                                />
                            </motion.a>
                        </motion.article>
                    ))}
                </div>
            </section>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {imageCursor.active && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{
                                    opacity: 1,
                                    scale: imageCursor.pressed ? 0.94 : 1,
                                }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{
                                    opacity: { duration: 0.16 },
                                    scale: {
                                        type: 'spring',
                                        stiffness: 250,
                                        damping: 20,
                                    },
                                }}
                                className="pointer-events-none fixed z-[999999] hidden md:block"
                                style={{
                                    left: imageCursor.x + 10,
                                    top: imageCursor.y - 50,
                                    transformOrigin: 'left bottom',
                                }}
                            >
                                <div
                                    className={[
                                        'rounded-[4px] border-[1px] p-[3px] shadow-xl transition-colors duration-200',
                                        imageCursor.pressed
                                            ? 'border-[#F4C7BE] bg-[#F4C7BE]'
                                            : 'border-[#EF8A76] bg-transparent',
                                    ].join(' ')}
                                >
                                    <div
                                        className={[
                                            'h-[38px] px-4 rounded-[3px] flex items-center justify-center gap-2',
                                            'font-body font-bold text-[12px] transition-colors duration-200',
                                            imageCursor.pressed
                                                ? 'bg-[#F4C7BE] text-[#212844]'
                                                : 'bg-[#E8917D] text-[#212844]',
                                        ].join(' ')}
                                    >
                                        <span>View Project</span>

                                        <img
                                            src="/arrowdown_blue.svg"
                                            alt=""
                                            className="w-[12px] h-[12px] object-contain"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}
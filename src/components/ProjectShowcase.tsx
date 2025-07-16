'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: 'Cafforia',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description:
      'Cafforia is a classy and aesthetic coffee tutorial website designed to provide users with curated coffee-making videos.',
    image: '/projects/cafforia.png', 
    link: 'https://kenzitjandra.github.io/Cafforia_MulMed/index.html',
  },
  {
    title: 'Trakr',
    tags: ['Flutter', 'Express.js', 'MongoDB'],
    description:
      'Trakr is a mobile budgeting app built to help users manage their daily spending with ease and confidence. Designed with a modern and friendly interface, it aims to make financial tracking feel approachable rather than overwhelming, especially for young adults and students.',
    image: '/projects/trakr.png',
    link: 'https://github.com/kenzitjandra/BudgetTrackerApp',
  },
  {
    title: 'Kenfolio',
    tags: ['Next.js', 'Tailwind','Framer Motion'],
    description:
      'My personal portfolio website, designed to reflect my style as both a designer and developer. Designed to be minimalistic, modern, and smooth. It serves as a digital space where I showcase my projects, design sensibility, and technical skills through an interactive and polished experience.',
    image: '/projects/kenfolio.png',
    link: '#',
  },
  {
    title: 'Portable Air Purifier',
    tags: ['Micropython', 'IoT'],
    description:
      'Portable Automatic Air Purifier (PAAP) is built using MicroPython, designed to improve air quality on-the-go. Combining IoT sensors with AI-driven decision-making, it continuously monitors environmental conditions and automatically activates the purifier when poor air quality is detected.',
    image: '/projects/paap.png',
    link: 'https://github.com/kenzitjandra/assignment2_UNI174_RPP',
  },
  {
    title: 'Landscape Classify',
    tags: ['HTML', 'CSS', 'Python'],
    description:
      'Landscape Classify is a web-based application that uses a custom-built machine learning model to classify landscape images into categories such as mountains, beaches, forests, oceans, and more. The goal was to explore computer vision by developing and deploying my own AI model in a functional, user-friendly website.',
    image: '/projects/classify.png',
    link: 'https://github.com/kenzitjandra/LandscapeClassifier',
  },
  {
    title: 'JeniusAcademy',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description:
      'JeniusAcademy is a simple, lightweight web platform designed to simulate the basic experience of an online course website like Udemy. Built using only HTML, CSS, and JavaScript, it showcases course cards, basic navigation, and user interactions in a clean and accessible layout.',
    image: '/projects/academy.png',
    link: 'https://github.com/kenzitjandra/JeniusAcademy',
  },
];


export default function ProjectShowcase() {

    const [projectIndex, setProjectIndex] = useState(0);
    const [direction, setDirection] = useState<'up' | 'down'>('down');
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lastScroll = useRef<number>(0);
    const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
        const currentY = window.scrollY;
        setDirection(currentY > lastScroll.current ? 'down' : 'up');
        lastScroll.current = currentY;

        projectRefs.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            if (rect.top <= 300 && rect.bottom >= 300) {
            setProjectIndex(idx);
            }
        });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="projects" className="bg-[#212844] text-[#E6D5B7] px-8 pt-15 pb-80">
        
            {/* Top Divider Line */}
            <div className="border-t border-[#EF8A76] w-full mb-8" />

            {/* Heading Block */}
            <div className="flex flex-col items-start gap-2 mb-8 md:mb-40 overflow-hidden">
                <p className="text-[18px] md:text-[20px] opacity-50 text-[#E6D5B7] font-body font-semibold">
                MY SELECTED
                </p>
                <h2 className="text-[80px] md:text-[100px] font-heading leading-none uppercase">
                Projects
                </h2>
            </div>

                {/* Project Content */}
                <div className="flex flex-col md:flex-row gap-12 items-start w-full">
                    
                    {/* Left - Project Label and Number */}
                    <div className="sticky top-[80px] md:top-[50px] flex items-start gap-0 md:gap-4 flex-shrink-0">
                        <p className="text-[0px] lg:text-[60px] font-heading leading-[0.5] text-[#E6D5B7] mt-[30px]">
                            PROJECT
                        </p>
                        <div className="flex items-start gap-0 font-heading text-[100px] lg:text-[300px] leading-none text-[#E6D5B7] h-[100px] md:h-[300px] overflow-hidden">
                            {/* Static 0 */}
                            <span className="block">0</span>

                            {/* Animated last digit */}
                            <div className="relative w-[160px] h-[300px] overflow-hidden">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.span
                                        key={projectIndex}
                                        custom={direction}
                                        variants={{
                                        initial: (dir) => ({ y: dir === 'down' ? 300 : -300 }),
                                        animate: { y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
                                        exit: (dir) => ({
                                            y: dir === 'down' ? -300 : 300,
                                            transition: { type: 'tween', stiffness: 120, damping: 20 } // fast exit
                                        }),
                                        }}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="absolute top-0 left-0"
                                    >
                                        {String(projectIndex + 1)}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>

                    {/* Right - Project Card */}
                    <div className="flex flex-col gap-[100px] w-full md:w-[55%] ml-auto overflow-x-hidden">
                        {projects.map((project, i) => (
                            <div
                                key={i}
                                ref={(el) => {
                                if (el) projectRefs.current[i] = el;
                                }}
                                className="flex flex-col w-full"
                            >
                                {/* Image Placeholder */}
                                <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block overflow-hidden rounded-md group w-full max-w-full h-[280px] sm:h-[350px] md:h-[450px]"
                                >
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-contain bg-[#151515] rounded-md transition-transform duration-500 group-hover:scale-105"
                                    whileHover={{ scale: 1.02 }}
                                />
                                </a>



                                {/* Title & Tags */}
                                <div className="flex items-center justify-between flex-wrap gap-y-2">
                                    <div className="flex flex-wrap items-center md:gap-x-3 md:gap-y-3 gap-y-1 gap-x-2">
                                        <h2 className="text-[28px] md:text-[46px] font-body font-semibold text-[#E6D5B7] pr-4 md:w-auto w-full">
                                        {project.title}
                                        </h2>
                                        {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] font-bold border border-[#EF8A76] px-3 py-1 md:py-2 rounded text-[#E6D5B7]"
                                        >
                                            {tag}
                                        </span>
                                        ))}
                                    </div>

                                    {/* Animated Button with Arrow Rotation */}
                                    <motion.button
                                    className="md:pb-0 pb-2 text-[#EF8A76] text-sm font-medium flex items-center gap-1 transition-opacity duration-300 hover:opacity-70"
                                    onClick={() =>
                                        setOpenProjectIndex(openProjectIndex === i ? null : i)
                                    }
                                    whileTap={{ scale: 0.97 }}
                                    >
                                        {openProjectIndex === i ? 'Less info' : 'More info'}
                                        <motion.span
                                            initial={false}
                                            animate={{ rotate: openProjectIndex === i ? 90 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-xl origin-center"
                                        >
                                            ➜
                                        </motion.span>
                                    </motion.button>

                                </div>

                                {/* Dropdown Description */}
                                <motion.div layout className="w-full">
                                <AnimatePresence initial={false}>
                                    {openProjectIndex === i && (
                                    <motion.div
                                    key="description"
                                    layout
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-[#E6D5B7] text-sm px-4 py-3 bg-[#2a3052] rounded-md mb-4"
                                    >
                                        <p>{project.description}</p>
                                    </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Animated Divider */}
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-[#EF8A76]"
                                />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
        </section>
    );
}

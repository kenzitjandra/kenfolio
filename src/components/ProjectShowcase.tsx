'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        title: 'Cafforia',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description:
            'Cafforia is a coffee tutorial website built with HTML, CSS, and JavaScript, featuring a clean visual layout and curated video-based content. The project focused on creating an aesthetic landing experience while practicing responsive structure, interactive elements, and frontend fundamentals.',
        image: '/projects/cafforia.png',
        link: 'https://kenzitjandra.github.io/Cafforia_MulMed/index.html',
    },
    {
        title: 'Hand2Doc',
        tags: ['Python', 'TensorFlow', 'OpenCV', 'YOLO', 'Streamlit'],
        description:
            'Hand2Doc is a computer vision project that transforms handwritten notes into structured digital text. The system combines CNN-based character recognition, OpenCV contour segmentation, and DocLayout-YOLO for layout detection, with a Streamlit interface for easier testing and presentation. In this group project, I contributed to defining the OCR workflow, system approach, and final technical documentation.',
        image: '/projects/hand2doc.png',
        link: 'https://github.com/kenzitjandra/Layout-Parser-ComputerVision',
    },
    {
        title: 'LeadershipLens',
        tags: ['Python', 'NLP', 'Scikit-learn', 'Streamlit'],
        description:
            'LeadershipLens is an NLP-based machine learning project that predicts high-level career potential from qualitative LinkedIn profile data. It uses DistilBERT embeddings with multiple classifiers, including Logistic Regression, Random Forest, Naive Bayes, SVC, and ensemble methods. In this group project, I helped design the overall ML pipeline, from feature representation and model selection to the integration of NLP techniques into the prediction workflow.',
        image: '/projects/leadershiplens.png',
        link: 'https://github.com/kenzitjandra/High-Profile-LinkedIn-Predictor',
    },
    {
        title: 'Trakr',
        tags: ['Flutter', 'Express.js', 'MongoDB'],
        description:
            'Trakr is a mobile budgeting app designed to help users track daily expenses through a simple and approachable interface. Built with Flutter, Express.js, and MongoDB, the project focused on connecting a mobile frontend with a backend API and database structure to support practical expense management features.',
        image: '/projects/trakr.png',
        link: 'https://github.com/kenzitjandra/BudgetTrackerApp',
    },
    {
        title: 'Kenfolio',
        tags: ['Next.js', 'Tailwind', 'Framer Motion'],
        description:
            'Kenfolio is my personal portfolio website, built to reflect my identity as both a developer and designer. The site uses Next.js, Tailwind CSS, Framer Motion, GSAP, and smooth scrolling interactions to create a minimal, modern, and cinematic browsing experience while showcasing my projects, design direction, and frontend development skills.',
        image: '/projects/kenfolio_v2.png',
        link: '#',
    },
    {
        title: 'Portable Air Purifier',
        tags: ['Micropython', 'IoT'],
        description:
            'Portable Automatic Air Purifier is an IoT-based prototype built with MicroPython to monitor air quality and respond automatically to environmental conditions. The project combines sensor-based data reading, embedded logic, and automated purifier control to explore how smart devices can support cleaner air in portable use cases.',
        image: '/projects/paap.png',
        link: 'https://github.com/kenzitjandra/assignment2_UNI174_RPP',
    },
    {
        title: 'Landscape Classify',
        tags: ['HTML', 'CSS', 'Python'],
        description:
            'Landscape Classify is a web application that analyzes uploaded photos and predicts the type of landscape shown. It uses Convolutional Neural Network built with Keras and TensorFlow to extract visual features from images, then returns the top three landscape predictions with confidence scores through a simple user-facing interface.',
        image: '/projects/classify.png',
        link: 'https://github.com/kenzitjandra/LandscapeClassifier',
    },
    {
        title: 'JeniusAcademy',
        tags: ['HTML', 'CSS', 'JavaScript'],
        description:
            'JeniusAcademy is a lightweight online course platform prototype built with HTML, CSS, and JavaScript. The project focuses on frontend fundamentals, including course card layouts, navigation, basic interactivity, and responsive page structure, while simulating the feel of a simple e-learning website.',
        image: '/projects/academy.png',
        link: 'https://github.com/kenzitjandra/JeniusAcademy',
    },
];

export default function ProjectShowcase() {
    const [projectIndex, setProjectIndex] = useState(0);
    const [direction, setDirection] = useState<'up' | 'down'>('down');
    const [mounted, setMounted] = useState(false);

    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lastScroll = useRef<number>(0);

    const [imageCursor, setImageCursor] = useState({
        active: false,
        x: 0,
        y: 0,
        pressed: false,
    });

    const activeProject = projects[projectIndex];

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        let ticking = false;

        const updateActiveProject = () => {
            const currentY = window.scrollY;
            const scrollDirection = currentY > lastScroll.current ? 'down' : 'up';

            setDirection(scrollDirection);
            lastScroll.current = currentY;

            const triggerPoint = window.innerHeight * 0.5;

            let activeIndex = 0;

            projectRefs.current.forEach((el, idx) => {
                if (!el) return;

                const rect = el.getBoundingClientRect();

                /**
                 * Project switches only when its top edge has crossed
                 * the middle of the viewport.
                 *
                 * This means:
                 * - scrolling down: next project activates when its top reaches mid-screen
                 * - scrolling up: previous project re-activates when the current project's top
                 *   moves back below mid-screen
                 */
                if (rect.top <= triggerPoint) {
                    activeIndex = idx;
                }
            });

            setProjectIndex((prev) => {
                if (prev === activeIndex) return prev;
                return activeIndex;
            });

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
                                    <AnimatePresence mode="wait" custom={direction}>
                                        <motion.span
                                            key={projectIndex}
                                            custom={direction}
                                            variants={{
                                                initial: (dir: 'up' | 'down') => ({
                                                    y: dir === 'down' ? 300 : -300,
                                                }),
                                                animate: {
                                                    y: 0,
                                                    transition: {
                                                        type: 'spring',
                                                        stiffness: 300,
                                                        damping: 30,
                                                    },
                                                },
                                                exit: (dir: 'up' | 'down') => ({
                                                    y: dir === 'down' ? -300 : 300,
                                                    transition: {
                                                        type: 'tween',
                                                        duration: 0.35,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    },
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
                                        <motion.span
                                            key={tag}
                                            variants={{
                                                hidden: { opacity: 0, y: 12 },
                                                show: { opacity: 1, y: 0 },
                                            }}
                                            transition={{
                                                duration: 0.35,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="cursor-pointer relative group border border-[#EF8A76] h-9 px-4 rounded text-[#F0E8D5] font-body font-semibold overflow-hidden z-0 flex items-center justify-center"
                                        >
                                            <span className="relative z-10 text-[0.78rem] transition-colors duration-300 group-hover:text-[#212844]">
                                                {tag}
                                            </span>
                                            <span className="absolute bottom-0 left-0 w-full h-0 bg-[#EF8A76] transition-all duration-300 ease-in-out group-hover:h-full z-0" />
                                        </motion.span>
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
                                    <span
                                        key={tag}
                                        className="border border-[#EF8A76] rounded px-3 py-2 text-[11px] font-body font-semibold text-[#F0E8D5]"
                                    >
                                        {tag}
                                    </span>
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
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { title: 'Cafforia', tags: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'Yumarket', tags: ['React', 'Tailwind', 'Node.js'] },
  { title: 'Portfolix', tags: ['Next.js', 'Framer Motion'] },
];

export default function ProjectShowcase() {

    const [projectIndex, setProjectIndex] = useState(0);
    const [direction, setDirection] = useState<'up' | 'down'>('down');
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lastScroll = useRef<number>(0);

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
            <div className="flex flex-col items-start gap-2 mb-40">
                <p className="text-[20px] opacity-50 text-[#E6D5B7] font-body font-semibold">
                MY SELECTED
                </p>
                <h2 className="text-[100px] font-heading leading-none uppercase">
                Projects
                </h2>
            </div>

                {/* Project Content */}
                <div className="flex flex-col md:flex-row gap-12 items-start w-full">
                    
                    {/* Left - Project Label and Number */}
                    <div className="sticky top-[50px] flex items-start gap-4 flex-shrink-0">
                        <p className="text-[60px] font-heading leading-[0.5] text-[#E6D5B7] mt-[30px]">
                            PROJECT
                        </p>
                        <div className="flex items-start gap-0 font-heading text-[300px] leading-none text-[#E6D5B7] h-[300px] overflow-hidden">
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
                    <div className="flex flex-col gap-[100px] w-full md:w-[55%] ml-auto">
                        {projects.map((project, i) => (
                            <div
                            key={i}
                            ref={(el) => {
                                if (el) projectRefs.current[i] = el;
                            }}
                            className="flex flex-col w-full">
                                {/* Image Placeholder */}
                                <div className="bg-[#f4f4f4] w-full h-[450px] rounded-md" />

                                {/* Title & Tags */}
                                <div className="flex items-center justify-between flex-wrap gap-y-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-[46px] font-body font-semibold text-[#E6D5B7] pr-4">
                                            {project.title}
                                        </h2>
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] font-bold border border-[#EF8A76] px-3 py-2 rounded text-[#E6D5B7]">{tag}</span>
                                        ))}
                                    </div>

                                    <button className="text-[#EF8A76] text-sm font-medium hover:underline flex items-center gap-1">
                                    More info <span className="text-xl">➜</span>
                                    </button>
                                </div>

                                <div className="border-t border-[#EF8A76]" />
                            </div>
                        ))}
                    </div>
                </div>
        </section>
    );
}

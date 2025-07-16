'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [showCursor, setShowCursor] = useState(false); // NEW

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 350 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth > 768) {
        setShowCursor(true);
      } else {
        setShowCursor(false);
      }
    };

    checkWidth(); // check once on mount
    window.addEventListener('resize', checkWidth);

    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    if (!showCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showCursor]);

  if (!showCursor) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[20px] h-[20px] rounded-full bg-[#EF8A76] pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    />
  );
}

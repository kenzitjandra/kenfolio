'use client';

import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from 'framer-motion';

export default function CustomCursor() {
    const [showCursor, setShowCursor] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const previousX = useRef(0);
    const previousY = useRef(0);

    const velocity = useMotionValue(0);
    const angle = useMotionValue(0);

    // Fast follow: almost glued to the real cursor
    const smoothX = useSpring(mouseX, {
        damping: 32,
        stiffness: 900,
        mass: 0.18,
    });

    const smoothY = useSpring(mouseY, {
        damping: 32,
        stiffness: 900,
        mass: 0.18,
    });

    // Smooth stretch amount
    const smoothVelocity = useSpring(velocity, {
        damping: 26,
        stiffness: 260,
        mass: 0.25,
    });

    // Stretch more as the cursor moves faster
    const scaleX = useTransform(smoothVelocity, [0, 80], [1, 2.15]);
    const scaleY = useTransform(smoothVelocity, [0, 80], [1, 0.62]);

    const smoothAngle = useSpring(angle, {
        damping: 30,
        stiffness: 520,
        mass: 0.2,
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            const isProjectImage = target?.closest('[data-project-image="true"]');

            if (window.innerWidth <= 768 || isProjectImage) {
                setShowCursor(false);
                return;
            }

            setShowCursor(true);

            const currentX = e.clientX;
            const currentY = e.clientY;

            const deltaX = currentX - previousX.current;
            const deltaY = currentY - previousY.current;

            const speed = Math.min(
                Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                80
            );

            /**
             * This angle points toward the direction the mouse is moving.
             * Because the blob's transform origin is set to the right side,
             * it stretches backward from the cursor, like it is being pulled.
             */
            const direction = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            velocity.set(speed);
            angle.set(direction);

            mouseX.set(currentX);
            mouseY.set(currentY);

            previousX.current = currentX;
            previousY.current = currentY;
        };

        const handleMouseLeave = () => {
            setShowCursor(false);
        };

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setShowCursor(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
        };
    }, [mouseX, mouseY, velocity, angle]);

    if (!showCursor) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: smoothX,
                y: smoothY,
                translateX: '-50%',
                translateY: '-50%',
                rotate: smoothAngle,
            }}
        >
            <motion.div
                className="w-[20px] h-[20px] rounded-full bg-[#EF8A76]"
                style={{
                    scaleX,
                    scaleY,

                    /**
                     * This is the key part:
                     * The cursor position stays near the front/right edge,
                     * while the blob stretches backward.
                     */
                    transformOrigin: 'right center',
                }}
            />
        </motion.div>
    );
}
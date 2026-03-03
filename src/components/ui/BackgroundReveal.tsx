'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface BackgroundRevealProps {
    backgroundImage: string;
}

export default function BackgroundReveal({ backgroundImage }: BackgroundRevealProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for tracking
    const springX = useSpring(mouseX, { stiffness: 200, damping: 40 });
    const springY = useSpring(mouseY, { stiffness: 200, damping: 40 });

    const [isHovering, setIsHovering] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsHovering(true);

            // Clear previous timeout
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            // Hide after 2 seconds of inactivity
            timeoutRef.current = setTimeout(() => {
                setIsHovering(false);
            }, 2000);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [mouseX, mouseY]);

    const maskImage = useTransform(
        [springX, springY],
        ([x, y]) => `radial-gradient(circle 250px at ${x}px ${y}px, black 0%, transparent 80%)`
    );

    return (
        <div className="absolute inset-0 h-screen z-[-1] pointer-events-none overflow-hidden bg-[#04060B]">
            {/* The "Hidden" Image Layer */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    //@ts-ignore
                    WebkitMaskImage: maskImage,
                    //@ts-ignore
                    maskImage: maskImage,
                    opacity: isHovering ? 1 : 0,
                }}
                transition={{ opacity: { duration: 1 } }}
            />

            {/* Subtle Overlay to blend with brand colors */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
    );
}

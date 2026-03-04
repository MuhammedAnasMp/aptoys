'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useSiteMedia } from '@/hooks/useSiteMedia';

interface TextMaskProps {
    text: string;
    backgroundImage: string;
    className?: string;
}

export default function TextMask({ text, backgroundImage: defaultImage, className = "" }: TextMaskProps) {
    const { mediaUrl: backgroundImage } = useSiteMedia('shop_text_mask', defaultImage);
    const containerRef = useRef<HTMLDivElement>(null);

    // Motion values for mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for tracking
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const maskImage = useTransform(
        [springX, springY],
        ([x, y]) => `radial-gradient(circle 100px at ${x}px ${y}px, black 0%, transparent 70%)`
    );

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            mouseX.set(x);
            mouseY.set(y);
            setIsVisible(true);

            // Clear previous timeout
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            // Hide after 2 seconds of inactivity
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 2000);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
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

    return (
        <div
            ref={containerRef}
            className={`relative select-none ${className}`}
        >
            {/* Base Layer: Static Visible Text with subtle glow */}
            {/* Base Layer: Static Visible Text with subtle glow */}
            <h1
                className="text-white/30 font-black tracking-tighter leading-tight transition-colors duration-500 hover:text-white/40"
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.05)' }}
            >
                {text}
            </h1>

            {/* Reveal Layer: Animated Text with Image Reflection */}
            <motion.h1
                className="absolute inset-0 font-black tracking-tighter leading-tight pointer-events-none"
                style={{
                    color: 'transparent',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    //@ts-ignore
                    WebkitMaskImage: maskImage,
                    //@ts-ignore
                    maskImage: maskImage,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ opacity: { duration: 0.5 } }}
            >
                {text}
            </motion.h1>

            {/* Visual Accent: Glowing center point (optional, but adds to the "flashlight" feel) */}
            <motion.div
                className="absolute w-1 h-1 bg-neon-purple rounded-full blur-[2px] pointer-events-none"
                style={{
                    left: springX,
                    top: springY,
                    opacity: isVisible ? 0.5 : 0,
                }}
                transition={{ opacity: { duration: 0.5 } }}
            />
        </div>
    );
}

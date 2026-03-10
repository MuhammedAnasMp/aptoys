"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useSiteMedia } from "@/hooks/useSiteMedia";

export default function ParallaxIcons() {
    const { scrollYProgress } = useScroll();

    const { mediaUrl: toy1 } = useSiteMedia('home_toy_scroll_1', '');
    const { mediaUrl: toy2 } = useSiteMedia('home_toy_scroll_2', '');
    const { mediaUrl: toy3 } = useSiteMedia('home_toy_scroll_3', '');
    const { mediaUrl: toy4 } = useSiteMedia('home_toy_scroll_4', '');
    const { mediaUrl: toy5 } = useSiteMedia('home_toy_scroll_5', '');
    const { mediaUrl: toy6 } = useSiteMedia('home_toy_scroll_6', '');
    const { mediaUrl: toy7 } = useSiteMedia('home_toy_scroll_7', '');
    const { mediaUrl: toy8 } = useSiteMedia('home_toy_scroll_8', '');
    const { mediaUrl: toy9 } = useSiteMedia('home_toy_scroll_9', '');
    const { mediaUrl: toy10 } = useSiteMedia('home_toy_scroll_10', '');

    const images = [toy1, toy2, toy3, toy4, toy5, toy6, toy7, toy8, toy9, toy10];

    const items = [
        { src: images[0], alt: "parallax-toy_1", top: "10%", left: "5%", speed: 0.1, size: 150 },
        { src: images[1], alt: "parallax-toy_2", top: "20%", left: "90%", speed: 0.2, size: 140 },
        { src: images[2], alt: "parallax-toy_3", top: "40%", left: "10%", speed: 0.15, size: 120 },
        { src: images[3], alt: "parallax-toy_4", top: "60%", left: "85%", speed: 0.25, size: 70 },
        { src: images[4], alt: "parallax-toy_5", top: "84%", left: "5%", speed: 0.18, size: 150 },
        { src: images[5], alt: "parallax-toy_6", top: "30%", left: "80%", speed: 0.3, size: 135 },
        { src: images[6], alt: "parallax-toy_7", top: "50%", left: "90%", speed: 0.12, size: 110 },
        { src: images[7], alt: "parallax-toy_8", top: "70%", left: "10%", speed: 0.22, size: 75 },
        { src: images[8], alt: "parallax-toy_9", top: "90%", left: "85%", speed: 0.14, size: 120 },
        { src: images[9], alt: "parallax-toy_10", top: "93%", left: "30%", speed: 0.19, size: 160 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {items.map((item, index) => {
                const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-200 * item.speed}%`]);
                const rotate = useTransform(scrollYProgress, [0, 1], [0, item.speed * 1000]);

                return (
                    <motion.div
                        key={index}
                        style={{
                            top: item.top,
                            left: item.left,
                            y,
                            rotate,
                            width: `clamp(${item.size * 0.4}px, 15vw, ${item.size}px)`,
                            height: `clamp(${item.size * 0.4}px, 15vw, ${item.size}px)`,
                            willChange: "transform",
                        }}
                        className="absolute select-none opacity-[0.2]"
                    >
                        <motion.div
                            animate={{
                                x: [0, 15, 0, -15, 0],
                                y: [0, -20, 0, 20, 0],
                            }}
                            transition={{
                                duration: 8 + index,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{ willChange: "transform" }}
                            className="w-full h-full"
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                width={item.size}
                                height={item.size}
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}

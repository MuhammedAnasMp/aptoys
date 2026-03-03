"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiClock, FiUser, FiArrowLeft, FiShare2 } from "react-icons/fi";

export default function BlogPost() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="min-h-screen pb-24 relative bg-[#0B0F19]">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-[64px] md:top-[80px] left-0 right-0 h-1 bg-gradient-to-r from-neon-purple to-electric-blue z-[100] origin-left"
                style={{ scaleX }}
            />

            <div className="max-w-4xl mx-auto px-6 pt-12">
                <Link href="/blog" className="inline-flex items-center gap-2 text-white/30 hover:text-white mb-12 text-sm transition-colors group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to Journal
                </Link>

                {/* Article Header */}
                <header className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-neon-purple px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Technology</span>
                        <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">March 15, 2026</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-12">The Future of Personal Wellness <span className="text-white/30 italic">in 2050.</span></h1>

                    <div className="flex items-center justify-between border-y border-white/5 py-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden glass-card border-white/20">
                                <Image src="/author-aris.jpg" alt="author" width={48} height={48} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Dr. Aris V.</p>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">Wellness Lead</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-center">
                            <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                                <FiClock size={16} /> 5 Min Read
                            </div>
                            <button className="text-white/30 hover:text-neon-purple transition-colors">
                                <FiShare2 size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <article className="prose prose-invert prose-p:text-white/50 prose-p:text-lg prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter max-w-none mb-20">
                    <p>
                        As we approach the midway point of the 21st century, the definition of wellness is undergoing a radical transformation. No longer confined to the traditional boundaries of physical fitness and nutrition, personal wellness has evolved into a deeply integrated experience of biotechnology, digital harmony, and sensory elevation.
                    </p>

                    <div className="my-16 aspect-video rounded-[2rem] overflow-hidden glass-card">
                        <Image src="/blog-content-vision.jpg" alt="future vision" fill className="object-cover opacity-60" />
                    </div>

                    <h2 className="text-4xl mt-12 mb-8">Integrated Bio-Harmony</h2>
                    <p>
                        The next generation of wellness devices are not just tools; they are sensory extensions. By leveraging high-frequency ultrasonic waves and adaptive bio-feedback loops, our futuristic designs respond in real-time to the user&apos;s physiological state. This is what we call &quot;Deep Pulse Technology&quot;.
                    </p>

                    <div className="my-12 p-8 glass-card border-l-4 border-l-neon-purple bg-white/5 italic text-white/80 text-xl">
                        &quot;The boundary between technology and touch is dissolving. We are building the architecture of intimacy for the year 2050.&quot;
                    </div>

                    <h3 className="text-2xl mt-10 mb-4">Discretion as a Premium Standard</h3>
                    <p>
                        In an age of total connectivity, privacy has become the ultimate luxury. Our 2050 vision prioritizes the unspoken agreement between the brand and the individual. From whisper-quiet engineering to secure, non-traceable ecosystem interactions, discretion is baked into every silicon wafer and code string.
                    </p>
                </article>
            </div>

            {/* Structured SEO Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": "The Future of Personal Wellness in 2050",
                    "image": "https://adultplaytoys.in/mock-blog-1.jpg",
                    "author": {
                        "@type": "Person",
                        "name": "Dr. Aris V."
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "AdultPlayToys.in"
                    },
                    "datePublished": "2026-03-15"
                })}
            </script>
        </div>
    );
}

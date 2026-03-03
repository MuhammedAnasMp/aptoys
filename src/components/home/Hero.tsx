"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-12">
            {/* Background Animated Gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-electric-blue/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full glass-card text-[10px] uppercase tracking-[0.3em] font-bold text-neon-purple mb-6 border-neon-purple/30">
                        Private. Premium. Future Wellness.
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                        The Future of <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-glow-pink to-electric-blue">Personal Bliss.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Elevate your wellness with next-generation technology. discreetly delivered to your doorstep. Experience the premium standard of modern intimacy.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/shop" className="neon-button px-10 py-4 text-sm group">
                            Explore Collection
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/philosophy" className="px-10 py-4 text-sm font-bold glass-card glass-card-hover">
                            Our Philosophy
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Badges */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-20 flex flex-wrap justify-center gap-4 md:gap-12"
                >
                    {["Discreet Packaging", "Premium Quality", "Secure Payments", "Fast Shipping"].map((text) => (
                        <div key={text} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 font-bold">
                            <div className="w-1.5 h-1.5 rounded-full bg-neon-purple shadow-[0_0_8px_#A855F7]" />
                            {text}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Hero Image Mockup (Optional/Decorative) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-gradient-to-t from-space-black to-transparent z-20" />
        </section>
    );
}

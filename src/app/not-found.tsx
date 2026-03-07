"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiShoppingCart, FiSearch } from "react-icons/fi";
import Image from "next/image";
import { useSiteMedia } from "@/hooks/useSiteMedia";

export default function NotFound() {
    const { mediaUrl: notFoundImage } = useSiteMedia('not_found_image', 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=1000');

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-space-black">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-electric-blue/10 blur-[120px] rounded-full" />

            <div className="max-w-4xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Humorous Image Container */}
                    <div className="relative w-full max-w-4xl aspect-video mx-auto mb-12 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-electric-blue rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-2 border-white/10 glass-card">
                            <Image
                                src={notFoundImage}
                                alt="404 - Not Found"
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-4 -right-4 bg-glow-pink text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg border border-white/20 uppercase tracking-widest"
                        >
                            Lost in Space?
                        </motion.div>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-white">404</h1>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8 text-white/90">
                        This URL is "Out of Stock".
                    </h2>

                    <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
                        It looks like this page took a private vacation. While it's gone, our <span className="text-neon-purple font-bold">actual items</span> are very much available and waiting for you. Don't let your journey end here!
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/shop" className="neon-button px-10 py-5 text-sm font-black flex items-center gap-2 group">
                            <FiShoppingCart size={18} />
                            Shop Available Tech
                        </Link>
                        <Link href="/" className="px-10 py-5 text-sm font-bold glass-card glass-card-hover flex items-center gap-2">
                            <FiHome size={18} />
                            Back to Base
                        </Link>
                    </div>

                    {/* Quick Search Suggestion */}
                    <div className="mt-16 pt-16 border-t border-white/5">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-6">Maybe search for something better?</p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {["Vibrators", "Bundles", "New Arrivals", "Best Sellers"].map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/shop?q=${tag.toLowerCase()}`}
                                    className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold text-white/40 hover:text-neon-purple hover:border-neon-purple/50 transition-all uppercase tracking-widest"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

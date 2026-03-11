"use client";

import { motion } from "framer-motion";
import { FiTarget, FiShield, FiCpu, FiStar, FiArrowRight, FiGlobe, FiHeart } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useSiteMedia } from "@/hooks/useSiteMedia";

const values = [
    {
        icon: <FiTarget className="text-neon-purple" size={32} />,
        title: "Future-First",
        description: "We don't just follow trends; we define the future of personal wellness through cutting-edge aesthetic and tech."
    },
    {
        icon: <FiShield className="text-electric-blue" size={32} />,
        title: "Radical Privacy",
        description: "Your exploration is your own. From discreet delivery to data encryption, privacy is our baseline, not a feature."
    },
    {
        icon: <FiCpu className="text-glow-pink" size={32} />,
        title: "Silicon Excellence",
        description: "Medical-grade materials meets space-age engineering. If it's not the best on the planet, it's not in our collection."
    }
];

export default function PhilosophyClient() {
    const { mediaUrl: visionImg } = useSiteMedia('philosophy_img_1', 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000');
    const { mediaUrl: inclusiveImg } = useSiteMedia('philosophy_img_2', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000');

    return (
        <div className="min-h-screen pt-6 md:pt-8 pb-16 md:pb-18">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero Section */}
                <section className="mb-16 md:mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 md:gap-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl flex-1"
                        >
                            {/* <span className="text-neon-purple text-[10px] font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block">Our Manifesto</span> */}
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 md:mb-8 leading-[1] md:leading-[0.9] md:whitespace-nowrap">
                                Beyond the <span className="bg-gradient-to-r from-neon-purple to-electric-blue bg-clip-text text-transparent italic">Ordinary.</span>
                            </h1>
                            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl">
                                <span className="text-neon-purple font-bold">AdultPlayToys</span> was born in 2015 from a singular vision: to bridge the gap between high-performance tech and personal wellness. We believe that self-discovery is the final frontier of luxury.
                            </p>
                        </motion.div>

                    </div>
                </section>

                {/* Core Philosophy Detail */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-24  items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden glass-card border-white/10 relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space-black/80 z-10" />
                            <Image
                                src={visionImg}
                                alt="Future Tech Aesthetics"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-12 left-12 z-20">
                                <div className="flex items-center gap-2 mb-4">
                                    <FiStar className="text-neon-purple" fill="currentColor" />
                                    <span className="text-white font-bold tracking-widest text-xs uppercase">Vision 2050</span>
                                </div>
                                <h3 className="text-3xl font-black text-white">The Aesthetic <br />of Tomorrow.</h3>
                            </div>
                        </div>
                        {/* Decorative background glow */}
                        <div className="absolute -top-12 -left-12 w-64 h-64 bg-neon-purple/20 blur-[100px] -z-10" />
                    </motion.div>

                    <div className="space-y-12">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-black tracking-tight mb-6 text-white">Designed for the Next Generation.</h2>
                            <p className="text-white/40 leading-relaxed text-lg">
                                We reject the clinical, sterile approach to wellness. Our devices are designed to be beautiful enough to sit on a designer nightstand, yet powerful enough to deliver world-class performance. Every curve is intentional, every material is curated.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-2 gap-8"
                        >
                            <div className="glass-card p-6 border-white/5">
                                <h4 className="text-white font-bold text-2xl mb-2">99.9%</h4>
                                <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Privacy Satisfaction</p>
                            </div>
                            <div className="glass-card p-6 border-white/5">
                                <h4 className="text-white font-bold text-2xl mb-2">Infinite</h4>
                                <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Wellness Potential</p>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* NEW: Inclusive Design Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 mt-12 md:mt-24 gap-12 md:gap-24 items-center mb-16 md:mb-24">
                    <div className="order-2 lg:order-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <FiHeart className="text-glow-pink" size={24} />
                                <span className="text-glow-pink font-bold tracking-[0.3em] text-[10px] uppercase">Ethos</span>
                            </div>
                            <h2 className="text-5xl font-black tracking-tight mb-6 text-white leading-tight">Radical Inclusivity by Design.</h2>
                            <p className="text-white/40 leading-relaxed text-lg">
                                Wellness belongs to everyone. Our design process starts with empathy, ensuring our technology is accessible, intuitive, and welcoming to all bodies, regardless of gender, ability, or experience.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border-l-2 border-glow-pink pl-6 py-2">
                                <h5 className="font-bold text-white mb-1 italic">Empathetic UX</h5>
                                <p className="text-white/30 text-xs">Intuitive interfaces built for every user's unique journey.</p>
                            </div>
                            <div className="border-l-2 border-neon-purple pl-6 py-2">
                                <h5 className="font-bold text-white mb-1 italic">Diverse Testing</h5>
                                <p className="text-white/30 text-xs">Products validated by a global, inclusive community.</p>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 relative"
                    >
                        <div className="aspect-square rounded-[3rem] overflow-hidden glass-card border-white/10 relative">
                            <Image
                                src={inclusiveImg}
                                alt="Inclusive Technology Design"
                                fill
                                className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-glow-pink/10 blur-[100px] -z-10" />
                    </motion.div>
                </section>



                {/* Closing CTA */}
                <section className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-br from-space-black to-neon-purple/20 p-8 md:p-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 leading-tight text-white tracking-tighter">
                            Ready to join the <br /><span className="text-electric-blue italic">evolution?</span>
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
                            <Link href="/shop" className="neon-button px-8 md:px-12 h-14 md:h-16 flex items-center justify-center text-sm font-bold tracking-widest uppercase">
                                Explore Collection <FiArrowRight className="ml-2" />
                            </Link>
                            <Link href="/community" className="glass-card hover:bg-white/5 px-8 md:px-12 h-14 md:h-16 flex items-center justify-center font-bold text-sm transition-all border-white/10 tracking-widest uppercase">
                                Join Now
                            </Link>
                        </div>
                    </motion.div>

                    {/* Background Detail */}
                    <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-9xl -z-10 select-none">
                        AP
                    </div>
                </section>
            </div>
        </div>
    );
}

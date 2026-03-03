"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiPercent, FiPackage } from "react-icons/fi";

interface Bundle {
    id: string;
    name: string;
    slug: string;
    description: string;
    total_price: string;
    discount_text: string;
    image: string;
    items: {
        product_name: string;
        quantity: number;
    }[];
}

export default function BundleSection() {
    const [bundles, setBundles] = useState<Bundle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBundles = async () => {
            try {
                const response = await fetch("http://localhost:8001/api/bundles/");
                const data = await response.json();
                setBundles(data);
            } catch (error) {
                console.error("Error fetching bundles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBundles();
    }, []);

    if (loading || bundles.length === 0) return null;

    return (
        <section className="py-24 px-6 md:px-12 bg-space-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <span className="text-electric-blue text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Exclusive Combos</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
                        Bundle & <span className="text-glow-pink">Save.</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto">
                        Curated kits designed for maximum performance and value. Elevate your experience with our limited-time combo offers.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {bundles.map((bundle, index) => (
                        <motion.div
                            key={bundle.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 group relative overflow-hidden border border-white/5 hover:border-glow-pink/30 transition-all duration-500"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                {/* Bundle Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="px-3 py-1 bg-glow-pink/10 text-glow-pink text-[10px] font-black uppercase tracking-widest rounded-full border border-glow-pink/20">
                                            {bundle.discount_text}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-glow-pink transition-colors">
                                        {bundle.name}
                                    </h3>
                                    <p className="text-white/50 text-sm mb-6 line-clamp-2">
                                        {bundle.description}
                                    </p>

                                    <div className="space-y-3 mb-8">
                                        {bundle.items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-xs text-white/70">
                                                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold">
                                                    {item.quantity}
                                                </div>
                                                <span>{item.product_name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="text-3xl font-black text-white">
                                            ₹{bundle.total_price}
                                        </div>
                                        <Link
                                            href={`/bundles/${bundle.slug}`}
                                            className="flex items-center gap-2 px-6 py-3 bg-white text-space-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-glow-pink hover:text-white transition-all shadow-xl"
                                        >
                                            Grab Combo <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>

                                {/* Bundle Image / Visual */}
                                <Link
                                    href={`/bundles/${bundle.slug}`}
                                    className="w-full md:w-48 aspect-square relative rounded-2xl overflow-hidden bg-white/5"
                                >
                                    {bundle.image ? (
                                        <Image
                                            src={bundle.image}
                                            alt={bundle.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
                                            <FiPackage size={40} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest mt-2">Bundle Pack</span>
                                        </div>
                                    )}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiHeart, FiZap, FiTarget, FiBox, FiCoffee, FiStar } from "react-icons/fi";
import Link from "next/link";

interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
}

const iconMap: { [key: string]: any } = {
    FiZap, FiHeart, FiTarget, FiBox, FiCoffee, FiStar
};

const colorMap = [
    "from-neon-purple to-electric-blue",
    "from-glow-pink to-neon-purple",
    "from-electric-blue to-glow-pink",
    "from-neon-purple to-neon-purple",
    "from-electric-blue to-electric-blue",
    "from-glow-pink to-electric-blue",
];

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:8001/api/categories/");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return (
        <section className="py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-square glass-card animate-pulse bg-white/5 rounded-2xl" />
                ))}
            </div>
        </section>
    );

    return (
        <section className="py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <span className="text-neon-purple text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Categories</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Smart Selection.</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat, idx) => {
                        const Icon = iconMap[cat.icon] || FiBox;
                        const color = colorMap[idx % colorMap.length];
                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/shop?category=${cat.slug}`}
                                    className="group relative block p-8 glass-card glass-card-hover text-center overflow-hidden h-full flex flex-col items-center justify-center"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    <div className={`mb-4 w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                        <Icon size={24} />
                                    </div>

                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                                        {cat.name}
                                    </h3>

                                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color} w-0 group-hover:w-full transition-all duration-500`} />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

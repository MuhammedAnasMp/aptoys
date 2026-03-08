"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiHeart, FiZap, FiTarget, FiBox, FiCoffee, FiStar } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useSiteMedia } from "@/hooks/useSiteMedia";

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

const CategoryCard = ({ cat, idx }: { cat: Category; idx: number }) => {
    const Icon = iconMap[cat.icon] || FiBox;
    const color = colorMap[idx % colorMap.length];
    const key = `category_img_${idx + 101}`;
    const { mediaUrl: cloudinaryUrl } = useSiteMedia(key, 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=1000');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="h-full neon-shadow"
        >
            <Link
                href={`/shop?category=${cat.slug}`}
                className="group relative block p-8 glass-card glass-card-hover text-center overflow-hidden h-full flex flex-col items-center justify-center min-h-[160px]"
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 ">
                    <Image
                        src={cloudinaryUrl}
                        alt={cat.name + " \n " + key}
                        fill
                        className="object-cover opacity-65 md:opacity-100 md:group-hover:opacity-65 transition-opacity duration-500 scale-100 md:scale-110 md:group-hover:scale-100 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-transparent md:bg-[#0B0F19]/60 md:group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 md:opacity-0 md:group-hover:opacity-10 transition-opacity duration-500 z-10`} />

                <div className="relative z-20 flex flex-col items-center">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white md:text-white/70 md:group-hover:text-white transition-colors">
                        {cat.name}
                    </h3>
                </div>

                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color} w-full md:w-0 md:group-hover:w-full transition-all duration-500 z-30`} />
            </Link>
        </motion.div>
    );
};

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`);
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
                    <span className="text-neon-purple text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Smart Selection</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Categories.</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.slice(0, 6).map((cat, idx) => (
                        <CategoryCard key={cat.id} cat={cat} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "@/components/home/ProductCard";

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Filtering would happen via API in production
    const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ") : "Category";

    return (
        <div className="min-h-screen py-12 px-6 md:px-12 bg-[#0B0F19]">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <span className="text-electric-blue text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Categories / {categoryName}</span>
                    <h1 className="text-4xl md:text-8xl font-black tracking-tighter capitalize">{categoryName}.</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {/* Mock results for category */}
                    <div className="col-span-full py-20 text-center glass-card border-dashed">
                        <p className="text-white/30 text-lg italic">Displaying premium products for {categoryName}...</p>
                        <p className="text-white/20 text-xs mt-2 uppercase tracking-widest">(Dynamic filtering from Django API integrated)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

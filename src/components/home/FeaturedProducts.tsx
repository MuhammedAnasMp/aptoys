"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Product {
    id: string;
    name: string;
    slug: string;
    price: string;
    discount_price?: string;
    image: string;
    sales_count: number;
    rating: number;
    is_famous?: boolean;
    is_trending?: boolean;
    category: string | number;
}

export default function FeaturedProducts() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [activeTab, setActiveTab] = useState<string>("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    fetch("http://localhost:8001/api/categories/"),
                    fetch("http://localhost:8001/api/products/")
                ]);
                const catData = await catRes.json();
                const prodData = await prodRes.json();

                setCategories(catData);
                setProducts(prodData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = activeTab === "all"
        ? products.slice(0, 8) // Show 8 items by default
        : products.filter(p => p.category.toString() === activeTab || (categories.find(c => c.id.toString() === activeTab)?.slug === p.category));

    // Safety check for category matching (depends on if API returns ID or Slug for category)
    const getFiltered = () => {
        if (activeTab === "all") return products.slice(0, 8);
        return products.filter(p => {
            const categoryObj = categories.find(c => c.id.toString() === activeTab);
            return p.category.toString() === activeTab || p.category === categoryObj?.slug;
        });
    };

    const displayProducts = getFiltered();

    return (
        <section className="py-24 px-6 md:px-12 bg-[#04060B]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-glow-pink text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Curated Selection</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Famous Products.</h2>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-4 mb-12 border-b border-white/5 pb-6">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${activeTab === "all"
                            ? "bg-neon-purple text-white shadow-[0_0_15px_#A855F7]"
                            : "text-white/40 hover:text-white"
                            }`}
                    >
                        All Products
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id.toString())}
                            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${activeTab === cat.id.toString()
                                ? "bg-electric-blue text-white shadow-[0_0_15px_#3B82F6]"
                                : "text-white/40 hover:text-white"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="glass-card aspect-[4/5] animate-pulse bg-white/5 rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {displayProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
}

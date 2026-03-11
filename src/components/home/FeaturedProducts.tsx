"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
    id: string;
    name: string;
    slug: string;
    price: string;
    discount_price?: string;
    image: string;
    images?: { file: string; is_primary: boolean; media_type?: string }[];
    sales_count: number;
    rating: number;
    is_famous?: boolean;
    is_trending?: boolean;
}

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`);
                if (prodRes.ok) {
                    const prodData = await prodRes.json();
                    setProducts(prodData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const displayProducts = [...products]
        .sort((a, b) => b.sales_count - a.sales_count)
        .slice(0, 8);

    return (
        <section className="py-12 px-6 md:px-6 ">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6 pt-4">
                    <div>
                        <span className="text-glow-pink text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Curated Selection</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Most Famous.</h2>
                    </div>
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
                            {displayProducts.map((product: Product) => (
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

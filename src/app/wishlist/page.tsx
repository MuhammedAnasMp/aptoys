"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { motion } from "framer-motion";

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
}

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            const likedIds = JSON.parse(localStorage.getItem("adlply_wishlist") || "[]");
            if (likedIds.length === 0) {
                setWishlist([]);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:8001/api/products/");
                const data = await response.json();
                // Filter all products to only show liked ones
                const likedProducts = data.filter((p: Product) => likedIds.map(String).includes(p.id.toString()));
                setWishlist(likedProducts);
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();

        // Refresh when wishlist changes
        window.addEventListener("wishlistUpdate", fetchWishlist);
        return () => window.removeEventListener("wishlistUpdate", fetchWishlist);
    }, []);

    return (
        <main className="min-h-screen bg-[#0B0F19] text-white">
            <Navbar />

            <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-4 tracking-tighter"
                    >
                        Your <span className="text-neon-purple">Wishlist</span>
                    </motion.h1>
                    <p className="text-white/50 max-w-xl">
                        Your personal collection of premium wellness tech. Items saved here are synced for your next visit.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="glass-card aspect-[4/5] animate-pulse rounded-2xl bg-white/5" />
                        ))}
                    </div>
                ) : wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {wishlist.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <span className="text-4xl">🖤</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No items in wishlist yet</h2>
                        <p className="text-white/40 mb-8">Start exploring our collection and save your favorites.</p>
                        <a
                            href="/shop"
                            className="px-8 py-3 bg-gradient-to-tr from-neon-purple to-electric-blue rounded-full font-bold hover:shadow-[0_0_20px_#A855F7] transition-all"
                        >
                            Continue Shopping
                        </a>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}

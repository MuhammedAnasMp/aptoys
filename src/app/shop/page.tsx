"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/home/ProductCard";
import { FiFilter, FiChevronDown, FiX, FiCheck } from "react-icons/fi";
import TextMask from "@/components/ui/TextMask";
import { useSiteMedia } from "@/hooks/useSiteMedia";

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
    images: { file: string; is_primary: boolean }[];
    sales_count: number;
    rating: number;
    is_famous?: boolean;
    is_trending?: boolean;
    category: Category;
    created_at: string;
}

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter/Sort State
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
    const [sortBy, setSortBy] = useState<string>("newest");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const { mediaUrl: maskImage } = useSiteMedia('shop_text_mask', '');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodsRes, catsRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`)
                ]);

                if (prodsRes.ok && catsRes.ok) {
                    const [prods, cats] = await Promise.all([
                        prodsRes.json(),
                        catsRes.json()
                    ]);
                    setProducts(prods);
                    setCategories(cats);
                }
            } catch (error) {
                console.error("Error fetching shop data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === "all" || product.category.slug === selectedCategory;
        const price = parseFloat(product.price.replace(/,/g, ''));
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
        return matchesCategory && matchesPrice;
    }).sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/,/g, ''));
        const priceB = parseFloat(b.price.replace(/,/g, ''));

        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "popular") return b.sales_count - a.sales_count;
        if (sortBy === "rating") return b.rating - a.rating;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    return (
        <div className="min-h-screen py-24 px-6 md:px-12 bg-[#0B0F19]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <span className="text-neon-purple text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block underline-glow">The Shop</span>
                        <TextMask
                            text="The Collection."
                            backgroundImage={maskImage}
                            className="text-5xl md:text-8xl lg:text-8xl"
                        />
                    </div>

                    <div className="flex gap-4 relative">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="glass-card px-8 py-5 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white hover:border-neon-purple/50 transition-all group"
                        >
                            <FiFilter className="text-neon-purple group-hover:scale-125 transition-transform" /> Filter
                        </button>

                        <div className="relative group">
                            <button
                                onClick={() => setShowSortMenu(!showSortMenu)}
                                className="glass-card px-8 py-5 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white hover:border-electric-blue/50 transition-all"
                            >
                                Sort By: <span className="text-white">{sortBy.replace('-', ' ')}</span> <FiChevronDown className={`transition-transform duration-300 ${showSortMenu ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showSortMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-4 w-56 glass-card z-50 p-2 overflow-hidden backdrop-blur-xl border-white/10"
                                    >
                                        {[
                                            { id: 'newest', label: 'Newest Arrivals' },
                                            { id: 'price-low', label: 'Price: Low to High' },
                                            { id: 'price-high', label: 'Price: High to Low' },
                                            { id: 'popular', label: 'Most Popular' },
                                            { id: 'rating', label: 'Highest Rated' }
                                        ].map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    setSortBy(option.id);
                                                    setShowSortMenu(false);
                                                }}
                                                className={`w-full text-left px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all rounded-xl flex items-center justify-between ${sortBy === option.id ? 'bg-white/5 text-neon-purple' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                                            >
                                                {option.label}
                                                {sortBy === option.id && <FiCheck />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Filter Sidebar overlay */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsFilterOpen(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                            />
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#0D111C] p-12 z-[101] shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-12">
                                    <h2 className="text-2xl font-black uppercase tracking-widest italic">Filters</h2>
                                    <button onClick={() => setIsFilterOpen(false)} className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white/50 hover:text-white hover:border-glow-pink">
                                        <FiX size={20} />
                                    </button>
                                </div>

                                <div className="space-y-12 overflow-y-auto flex-1 pr-4 custom-scrollbar">
                                    {/* Categories */}
                                    <div>
                                        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 mb-8">Categories</h3>
                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={() => setSelectedCategory("all")}
                                                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === "all" ? 'bg-neon-purple text-white shadow-[0_0_30px_rgba(180,74,253,0.5)]' : 'glass-card text-white/50 hover:text-white'}`}
                                            >
                                                All Products
                                            </button>
                                            {categories.map(cat => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setSelectedCategory(cat.slug)}
                                                    className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat.slug ? 'bg-neon-purple text-white shadow-[0_0_30px_rgba(180,74,253,0.5)]' : 'glass-card text-white/50 hover:text-white'}`}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">Price Range</h3>
                                            <span className="text-neon-purple font-mono font-bold">₹{priceRange[0]} - ₹{priceRange[1]}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="20000"
                                            step="500"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="w-full accent-neon-purple bg-white/5 rounded-lg appearance-none h-2 cursor-pointer transition-all hover:bg-white/10"
                                        />
                                        <div className="flex justify-between mt-4 text-[8px] uppercase tracking-widest text-white/20 font-bold">
                                            <span>₹0</span>
                                            <span>₹20,000+</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex gap-4 pt-12 border-t border-white/5">
                                    <button
                                        onClick={() => {
                                            setSelectedCategory("all");
                                            setPriceRange([0, 20000]);
                                        }}
                                        className="flex-1 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all underline-glow"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={() => setIsFilterOpen(false)}
                                        className="flex-1 neon-button py-5 text-[10px] uppercase tracking-[0.3em]"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {loading ? (
                        Array(8).fill(0).map((_, i) => (
                            <div key={i} className="aspect-[3/4] glass-card animate-pulse rounded-[2.5rem]" />
                        ))
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={{
                                    ...product,
                                    image: product.images.find(img => img.is_primary)?.file || product.images[0]?.file || ""
                                }}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-40 text-center">
                            <span className="text-6xl mb-8 block grayscale opacity-20">🔍</span>
                            <h3 className="text-2xl font-black uppercase tracking-[0.2em] mb-4">No Products Found</h3>
                            <p className="text-white/30 text-sm tracking-widest uppercase">Try adjusting your filters or category.</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(180, 74, 253, 0.2);
                    border-radius: 10px;
                }
                .underline-glow {
                    position: relative;
                }
                .underline-glow::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 20px;
                    height: 2px;
                    background: #B44AFD;
                    box-shadow: 0 0 10px #B44AFD;
                }
            `}</style>
        </div>
    );
}

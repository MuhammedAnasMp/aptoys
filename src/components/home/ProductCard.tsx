"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

interface ProductCardProps {
    product: {
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
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart } = useCart();

    useEffect(() => {
        const likedItems = JSON.parse(localStorage.getItem("adlply_wishlist") || "[]");
        setIsLiked(likedItems.map(String).includes(String(product.id)));
    }, [product.id]);

    // Auto-slide logic
    const allMedia = useMemo(() => {
        if (product.images && product.images.length > 0) {
            return product.images.map(img => ({
                url: img.file,
                type: img.media_type || (img.file.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image')
            }));
        }
        return product.image ? [{
            url: product.image,
            type: product.image.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image'
        }] : [];
    }, [product.images, product.image]);

    useEffect(() => {
        if (allMedia.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % allMedia.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [allMedia]);

    const toggleLike = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const likedItems = JSON.parse(localStorage.getItem("adlply_wishlist") || "[]");
        let newItems;

        if (isLiked) {
            newItems = likedItems.filter((id: any) => String(id) !== String(product.id));
        } else {
            newItems = [...likedItems, String(product.id)];
            try {
                await fetch('http://localhost:8001/api/wishlist/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product: product.id })
                });
            } catch (err) {
                console.error("Failed to sync wishlist to backend", err);
            }
        }

        localStorage.setItem("adlply_wishlist", JSON.stringify(newItems));
        setIsLiked(!isLiked);
        window.dispatchEvent(new CustomEvent("wishlistUpdate"));
    };

    const handleCardClick = () => {
        router.push(`/products/${product.slug}`);
    };

    // 3D Tilt Effect Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xc = mouseX / width - 0.5;
        const yc = mouseY / height - 0.5;
        x.set(xc);
        y.set(yc);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            onClick={handleCardClick}
            className="relative group perspective-1000 cursor-pointer"
        >
            <div className="glass-card p-4 h-full flex flex-col transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)]">
                {/* Badges */}
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                    {product.is_famous && (
                        <span className="px-3 py-1 bg-neon-purple text-[8px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_10px_#A855F7]">Famous</span>
                    )}
                    {product.is_trending && (
                        <span className="px-3 py-1 bg-electric-blue text-[8px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_10px_#3B82F6]">Trending</span>
                    )}
                </div>

                {/* Image Container */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-white/5">
                    <AnimatePresence mode="wait">
                        {allMedia.length > 0 ? (
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0"
                            >
                                {allMedia[currentImageIndex].type === 'video' ? (
                                    <video
                                        src={allMedia[currentImageIndex].url}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <Image
                                        src={allMedia[currentImageIndex].url}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                            </motion.div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/5">
                                <span className="text-[10px] text-white/10 uppercase tracking-widest font-bold font-mono">No Image</span>
                            </div>
                        )}
                    </AnimatePresence>
                    {/* Quick Actions */}
                    <div className={`absolute inset-0 bg-space-black/40 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image || "",
                                    slug: product.slug
                                });
                            }}
                            className="w-10 h-10 rounded-full bg-white text-space-black flex items-center justify-center hover:bg-neon-purple hover:text-white transition-colors"
                        >
                            <FiShoppingCart size={18} />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-white text-space-black flex items-center justify-center hover:bg-electric-blue hover:text-white transition-colors">
                            <FiEye size={18} />
                        </div>
                        <button
                            onClick={toggleLike}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isLiked ? "bg-glow-pink text-white" : "bg-white text-space-black hover:bg-glow-pink hover:text-white"}`}
                        >
                            <FiHeart size={18} fill={isLiked ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg tracking-tight group-hover:text-neon-purple transition-colors leading-tight">
                            {product.name}
                        </h3>
                        <div className="text-white/40 text-[10px] font-bold flex items-center gap-1">
                            <span className="text-neon-purple">★</span> {product.rating}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-neon-purple font-black text-xl">₹{product.price}</div>
                        {product.discount_price && (
                            <div className="text-white/30 line-through text-sm">₹{product.discount_price}</div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                            <span className="text-electric-blue animate-pulse">●</span> {product.sales_count}+ Sold
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); router.push(`/products/${product.slug}`); }}
                            className="text-[10px] uppercase tracking-widest font-black text-neon-purple hover:underline"
                        >
                            Order
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

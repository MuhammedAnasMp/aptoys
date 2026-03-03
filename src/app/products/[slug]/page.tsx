"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiShoppingBag, FiShield, FiTruck, FiRefreshCw, FiChevronDown, FiPlay, FiHeart, FiShare2, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import WhatsAppCTA from "@/components/layout/WhatsAppCTA";

// Mock data (Enhanced for Multi-Media & Reviews)
const products = {
    "nebula-pulse": {
        id: "101",
        name: "Nebula Pulse Massager",
        price: "4,999",
        originalPrice: "6,999",
        rating: 4.9,
        reviewsCount: 124,
        salesCount: 3450,
        customerCount: 12000,
        media: [
            { id: 1, type: "image", url: "https://i.ibb.co/VvRLrXn/mock-product-1.jpg" },
            { id: 2, type: "gif", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJndzZncWpndzZncWpndzZncWpndzZncWpndzZncWpndzZncWpndzZncCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKMGpxP5O5-tF28/giphy.gif" },
            { id: 3, type: "video", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
        ],
        trending: true,
        description: "Experience the next generation of wellness with the Nebula Pulse. Designed for those who demand the finest in personal tech, this device combines ultrasonic vibration with ergonomic 2050 design aesthetics.",
        benefits: [
            { title: "Ultra Discreet", detail: "Whisper-quiet motor technology (<20dB) for total privacy." },
            { title: "Space-Grade Material", detail: "Hypoallergenic medical silicone with a silk-touch finish." },
            { title: "Smart Sync", detail: "Adaptive vibration patterns that respond to your body." },
        ],
        reviews: [
            { id: 1, author: "Rahul S.", rating: 5, comment: "The future of wellness is truly here. Incredible discretion and build quality.", verified: true, date: "2 days ago" },
            { id: 2, author: "Ananya K.", rating: 4, comment: "Very impressed with the soft-touch material. The packaging was completely unmarked.", verified: true, date: "1 week ago" },
            { id: 3, author: "Vikram M.", rating: 5, comment: "Finally a brand that understands aesthetic and performance. 10/10.", verified: true, date: "3 weeks ago" },
        ]
    }
};

export default function ProductDetails() {
    const params = useParams();
    const slug = params.slug as string;
    const product = products[slug as keyof typeof products] || products["nebula-pulse"];

    const [selectedMedia, setSelectedMedia] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const { addToCart } = useCart();
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="min-h-screen pb-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">

                {/* Left: Gallery */}
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="sticky top-28 aspect-[4/5] rounded-[2rem] overflow-hidden glass-card border-white/10 relative"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedMedia}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full h-full"
                            >
                                {product.media[selectedMedia].type === "video" ? (
                                    <video
                                        ref={videoRef}
                                        src={product.media[selectedMedia].url}
                                        autoPlay
                                        muted
                                        loop
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                ) : (product.media[selectedMedia].url && product.media[selectedMedia].url !== "") ? (
                                    <Image
                                        src={product.media[selectedMedia].url}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        unoptimized={product.media[selectedMedia].type === "gif"}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                                        <span className="text-white/10 font-black uppercase tracking-widest text-2xl font-mono">No Media</span>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    <div className="flex gap-4 mt-6">
                        {product.media.map((item, i) => (
                            <button
                                key={item.id}
                                onClick={() => setSelectedMedia(i)}
                                className={`w-20 h-20 rounded-xl glass-card overflow-hidden cursor-pointer hover:border-neon-purple active:scale-95 transition-all relative ${selectedMedia === i ? "border-neon-purple ring-2 ring-neon-purple/50" : "border-white/10"}`}
                            >
                                {item.type === "video" ? (
                                    <div className="w-full h-full bg-space-black flex items-center justify-center relative">
                                        <FiPlay className="text-white z-10" />
                                        <video src={item.url} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                                    </div>
                                ) : (item.url && item.url !== "") ? (
                                    <Image
                                        src={item.url}
                                        alt="thumb"
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                        unoptimized={item.type === "gif"}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/10 italic text-[10px]">
                                        N/A
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {product.trending && (
                                <span className="bg-electric-blue/20 text-electric-blue text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-electric-blue/30">
                                    Trending in India
                                </span>
                            )}
                            <span className="bg-neon-purple/20 text-neon-purple text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-neon-purple/30">
                                Discreet Delivery
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">{product.name}</h1>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-1 text-neon-purple">
                                {[1, 2, 3, 4, 5].map(i => <FiStar key={i} fill={i <= Math.floor(product.rating) ? "currentColor" : "none"} />)}
                                <span className="text-white/40 text-xs ml-2">({product.reviewsCount} reviews)</span>
                            </div>
                            <div className="h-4 w-[1px] bg-white/10" />
                            <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-glow-pink">{product.salesCount}+</span> Units Sold
                            </div>
                        </div>

                        <div className="flex items-end gap-4 mb-10">
                            <span className="text-4xl font-black text-white">₹{product.price}</span>
                            <span className="text-white/30 line-through text-lg mb-1">₹{product.originalPrice}</span>
                            <span className="text-glow-pink text-sm font-bold mb-1">Save ₹2,000</span>
                        </div>

                        <p className="text-white/50 leading-relaxed mb-10">
                            {product.description}
                        </p>

                        {/* Benefit Tabs */}
                        <div className="space-y-4 mb-12">
                            {product.benefits.map((benefit, i) => (
                                <div key={i} className="glass-card p-4 transition-all hover:bg-white/5">
                                    <button
                                        onClick={() => setActiveTab(activeTab === i ? -1 : i)}
                                        className="w-full flex items-center justify-between text-sm font-bold text-white/80"
                                    >
                                        <span>{benefit.title}</span>
                                        <FiChevronDown className={`transition-transform duration-300 ${activeTab === i ? "rotate-180" : ""}`} />
                                    </button>
                                    {activeTab === i && (
                                        <p className="mt-3 text-white/40 text-xs leading-relaxed animate-in fade-in slide-in-from-top-2">
                                            {benefit.detail}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: (product as any).media?.[0]?.url || "",
                                    slug: slug
                                })}
                                className="neon-button h-14 w-full text-sm"
                            >
                                <FiShoppingBag className="mr-2" /> Add to Cart
                            </button>
                            <button
                                onClick={async () => {
                                    // 1. Log to backend
                                    try {
                                        await fetch("http://localhost:8001/api/cart-inquiries/", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                items_data: [{ name: product.name, quantity: 1, price: product.price }],
                                                total_price: product.price
                                            })
                                        });
                                    } catch (err) {
                                        console.error("Failed to log inquiry", err);
                                    }
                                    // 2. Open WhatsApp
                                    window.open(`https://wa.me/919876543210?text=I'd like to enquire about ${product.name} (ID: ${product.id})`, "_blank");
                                }}
                                className="flex items-center justify-center gap-2 h-14 w-full glass-card hover:bg-[#25D366] hover:text-white transition-all text-[#25D366] font-bold"
                            >
                                <FaWhatsapp size={20} /> Order via WhatsApp
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/5">
                            <div className="flex flex-col items-center text-center gap-2">
                                <FiShield className="text-neon-purple" size={24} />
                                <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">1 Year Warranty</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <FiTruck className="text-electric-blue" size={24} />
                                <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <FiRefreshCw className="text-glow-pink" size={24} />
                                <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Private Return</span>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <div className="mb-12">
                    <span className="text-glow-pink text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Social Proof</span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Verified Explorers.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {product.reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 flex flex-col h-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-1 text-neon-purple text-xs">
                                    {[1, 2, 3, 4, 5].map(i => <FiStar key={i} fill={i <= review.rating ? "currentColor" : "none"} />)}
                                </div>
                                <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{review.date}</span>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed italic mb-8 flex-grow">
                                "{review.comment}"
                            </p>
                            <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                                <div>
                                    <p className="text-xs font-black text-white uppercase tracking-widest mb-1">{review.author}</p>
                                    {review.verified && (
                                        <p className="text-[8px] text-electric-blue font-bold uppercase tracking-widest flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" /> Verified Buyer
                                        </p>
                                    )}
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/20">
                                    {review.author[0]}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 hover:text-neon-purple transition-all underline outline-offset-8">
                        Read All {product.reviewsCount} Reviews
                    </button>
                </div>
            </section>

            {/* WhatsApp Floating Sync */}
            <WhatsAppCTA productName={product.name} productId={product.id} />
        </div>
    );
}

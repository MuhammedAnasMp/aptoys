"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiShoppingBag, FiShield, FiTruck, FiRefreshCw, FiChevronDown, FiPackage, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppCTA from "@/components/layout/WhatsAppCTA";
import TrustPayment from "@/components/ui/TrustPayment";

interface Bundle {
    id: string;
    name: string;
    slug: string;
    description: string;
    total_price: string;
    discount_text: string;
    image: string;
    items: {
        id: string;
        product_name: string;
        product_slug: string;
        product_image: string;
        quantity: number;
    }[];
}

export default function BundleDetails() {
    const params = useParams();
    const slug = params.slug as string;
    const [bundle, setBundle] = useState<Bundle | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchBundle = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bundles/${slug}/`);
                if (response.ok) {
                    const data = await response.json();
                    setBundle(data);
                }
            } catch (error) {
                console.error("Error fetching bundle:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBundle();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-space-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!bundle) {
        return (
            <div className="min-h-screen bg-space-black flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl font-bold mb-4">Bundle Not Found</h1>
                <Link href="/" className="text-neon-purple hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-space-black text-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 pt-32 pb-24">
                {/* Left: Bundle Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-square rounded-[2rem] overflow-hidden glass-card border-white/10"
                >
                    {bundle.image ? (
                        <Image
                            src={bundle.image}
                            alt={bundle.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/10 bg-white/5">
                            <FiPackage size={80} />
                            <span className="text-xl font-bold uppercase tracking-widest mt-4">Premium Pack</span>
                        </div>
                    )}

                    <div className="absolute top-8 left-8">
                        <span className="bg-glow-pink text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-[0_0_20px_#FF2E63]">
                            {bundle.discount_text}
                        </span>
                    </div>
                </motion.div>

                {/* Right: Bundle Info */}
                <div className="flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-electric-blue text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Exclusive Bundle Offer</span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">{bundle.name}</h1>

                        <div className="flex items-end gap-4 mb-8">
                            <span className="text-5xl font-black text-white">₹{bundle.total_price}</span>
                            <span className="text-glow-pink text-sm font-bold mb-2">Limited Time Combo</span>
                        </div>

                        <p className="text-white/50 leading-relaxed mb-10 text-lg">
                            {bundle.description}
                        </p>

                        <div className="mb-12">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
                                <FiPackage /> Included in this kit:
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {bundle.items.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/products/${item.product_slug}`}
                                        className="glass-card p-4 flex items-center gap-4 hover:border-neon-purple/50 transition-all group"
                                    >
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 relative">
                                            {item.product_image && item.product_image !== "" ? (
                                                <Image src={item.product_image} alt={item.product_name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/10 text-[8px]">
                                                    N/A
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold group-hover:text-neon-purple transition-colors">{item.product_name}</p>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest">Quantity: {item.quantity}</p>
                                        </div>
                                        <FiArrowRight className="text-white/20 group-hover:text-neon-purple group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                            <button
                                onClick={() => addToCart({
                                    id: bundle.id,
                                    name: bundle.name,
                                    price: bundle.total_price,
                                    image: bundle.image || "",
                                    slug: bundle.slug
                                })}
                                className="neon-button h-14 w-full text-sm"
                            >
                                <FiShoppingBag className="mr-2" /> Buy Bundle Now
                            </button>
                            <button
                                onClick={async () => {
                                    // 1. Log to backend
                                    try {
                                        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart-inquiries/`, {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                items_data: [{ name: `Bundle: ${bundle.name}`, quantity: 1, price: bundle.total_price }],
                                                total_price: bundle.total_price
                                            })
                                        });
                                    } catch (err) {
                                        console.error("Failed to log inquiry", err);
                                    }
                                    // 2. Open WhatsApp
                                    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=I'd like to enquire about the bundle: ${bundle.name}`, "_blank");
                                }}
                                className="flex items-center justify-center gap-2 h-14 w-full glass-card hover:bg-[#25D366] hover:text-white transition-all text-[#25D366] font-bold"
                            >
                                <FaWhatsapp size={20} /> Order via WhatsApp
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/5">
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

                        <TrustPayment />
                    </motion.div>
                </div>
            </div>

            <Footer />
            <WhatsAppCTA productName={bundle.name} productId={bundle.id} />
        </main>
    );
}

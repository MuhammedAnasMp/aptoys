"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrendingUp, FiMapPin, FiActivity, FiShoppingCart, FiZap, FiInfo, FiLock, FiShield, FiPackage, FiCheckCircle } from "react-icons/fi";
import { getProducts } from "@/lib/api";
import Image from "next/image";

// Full List of Indian States & Significant Regions
const INDIAN_STATES = [
    "Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Telangana", "Gujarat", "Uttar Pradesh", "West Bengal", "Rajasthan", "Kerala",
    "Haryana", "Punjab", "Bihar", "Odisha", "Assam", "Goa", "Himachal Pradesh", "Jammu & Kashmir", "Chandigarh", "Puducherry",
    "Andhra Pradesh", "Madhya Pradesh", "Chhattisgarh", "Uttarakhand", "Jharkhand"
];

// Trust Icons / Payment Methods
const PAYMENT_METHODS = [
    { name: "UPI", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" },
    { name: "GPay", icon: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" },
    { name: "Paytm", icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" },
    { name: "PhonePe", icon: "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" },
    { name: "Mastercard", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
    { name: "Crypto", icon: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" }

];

interface SaleRecord {
    id: string;
    productId: number;
    productName: string;
    productMedia: string;
    mediaType: string;
    price: number;
    state: string;
    timestamp: number;
}

export default function LiveSalesDashboard() {
    const [sales, setSales] = useState<SaleRecord[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);

    // Load initial data and products
    useEffect(() => {
        setMounted(true);
        const fetchInitialData = async () => {
            const p = await getProducts();
            setProducts(p);

            const saved = localStorage.getItem("adlply_live_sales_v4");
            if (saved) {
                setSales(JSON.parse(saved));
            } else {
                // Initialize with significant seed data (2500 to 3000 items)
                const initialCount = Math.floor(Math.random() * 500) + 2500;
                const seed: SaleRecord[] = Array.from({ length: initialCount }).map((_, i) => {
                    const randomProd = p[Math.floor(Math.random() * p.length)];
                    const primaryMedia = randomProd?.images?.find((img: any) => img.is_primary) || randomProd?.images?.[0];

                    return {
                        id: Math.random().toString(36).substr(2, 9),
                        productId: randomProd?.id || 0,
                        productName: randomProd?.name || "Premium Wellness Kit",
                        productMedia: primaryMedia?.file || "/placeholder-toy.png",
                        mediaType: primaryMedia?.media_type || "image",
                        price: Number(randomProd?.price) || 2999,
                        state: INDIAN_STATES[Math.floor(Math.random() * INDIAN_STATES.length)],
                        timestamp: Date.now() - (initialCount - i) * 60000 // Spread over last few days
                    };
                });
                setSales(seed);
                localStorage.setItem("adlply_live_sales_v4", JSON.stringify(seed));
            }
        };
        fetchInitialData();
    }, []);

    // Simulated Real-time Updates (Hyper Frequency for Buzz)
    useEffect(() => {
        if (!products.length) return;

        const interval = setInterval(() => {
            const randomProd = products[Math.floor(Math.random() * products.length)];
            const primaryMedia = randomProd?.images?.find((img: any) => img.is_primary) || randomProd?.images?.[0];

            const newSale: SaleRecord = {
                id: Math.random().toString(36).substr(2, 9),
                productId: randomProd.id,
                productName: randomProd.name,
                productMedia: primaryMedia?.file || "/placeholder-toy.png",
                mediaType: primaryMedia?.media_type || "image",
                price: Number(randomProd.price),
                state: INDIAN_STATES[Math.floor(Math.random() * INDIAN_STATES.length)],
                timestamp: Date.now()
            };

            setSales(prev => {
                const updated = [...prev, newSale].slice(-5000); // Keep last 5000 for depth
                localStorage.setItem("adlply_live_sales_v4", JSON.stringify(updated));
                return updated;
            });
        }, 3000 + Math.random() * 5000); // New sale every 3-8 seconds (Very High Demand)

        return () => clearInterval(interval);
    }, [products]);

    // Derived Statistics
    const recentSales = [...sales].reverse().slice(0, 15);

    // Multiplied Regional Counts for "Social Proof" (Internal logic only)
    const salesByState = useMemo(() => {
        const counts: Record<string, number> = {};
        sales.forEach(s => {
            counts[s.state] = (counts[s.state] || 0) + 1;
        });
        // Sort and apply a visual multiplier for the UI if needed, or just let the 1000 limit show volume
        return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    }, [sales]);

    const productPopularity = useMemo(() => {
        const counts: Record<number, { count: number, name: string, media: string, type: string }> = {};
        sales.forEach(s => {
            if (!counts[s.productId]) {
                counts[s.productId] = { count: 0, name: s.productName, media: s.productMedia, type: s.mediaType };
            }
            counts[s.productId].count += 1;
        });
        return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 10);
    }, [sales]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#04060B] py-24 px-6 md:px-12 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-neon-purple/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-electric-blue/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Trust Marquee */}
                <div className="mb-12 overflow-hidden whitespace-nowrap bg-white/[0.02] border-y border-white/5 py-3 relative">
                    <div className="flex animate-[marquee_30s_linear_infinite] gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex gap-12 items-center">
                                <span className="flex items-center gap-2"><FiCheckCircle className="text-electric-blue" /> 100% Discreet Packaging</span>
                                <span className="flex items-center gap-2"><FiLock className="text-neon-purple" /> Fully Encrypted Checkout</span>
                                <span className="flex items-center gap-2"><FiPackage className="text-glow-pink" /> No Brand Mentions on Box</span>
                                <span className="flex items-center gap-2"><FiShield className="text-green-400" /> FDA Approved Materials</span>
                            </div>
                        ))}
                    </div>
                </div>

                <header className="mb-16">
                    <div className="flex items-center gap-2 text-neon-purple font-bold tracking-widest text-[10px] uppercase mb-4">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-purple"></span>
                        </span>
                        Live Velocity
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter max-w-4xl leading-[0.9]">National <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-electric-blue">Trust.</span></h1>
                        <div className="flex flex-col items-end gap-3">
                            <div className="glass-card px-6 py-3 border-neon-purple/20 bg-neon-purple/5 text-neon-purple font-bold text-xs flex items-center gap-3 animate-pulse">
                                <FiZap size={16} />
                                DEMAND IS CURRENTLY CRITICAL
                            </div>
                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Active users in India: {Math.floor(Math.random() * 400) + 1200}</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Popularity Visualizer */}
                        <section className="glass-card p-8 md:p-12 bg-white/[0.01] border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FiActivity size={120} className="text-electric-blue" />
                            </div>
                            <div className="relative z-10 mb-16">
                                <h3 className="text-3xl font-black flex items-center gap-3 tracking-tighter uppercase italic">
                                    The Power 10 List
                                </h3>
                                <p className="text-xs text-white/30 uppercase tracking-widest font-bold mt-1">Real-time engagement ranking by SKU</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                {productPopularity.map((item, i) => {
                                    const max = productPopularity[0].count;
                                    const percentage = (item.count / max) * 100;
                                    return (
                                        <div key={i} className="group/item">
                                            <div className="flex items-center gap-5 mb-3">
                                                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 glass-card shrink-0">
                                                    {item.type === 'video' ? (
                                                        <video autoPlay muted loop className="w-full h-full object-cover">
                                                            <source src={item.media} type="video/mp4" />
                                                        </video>
                                                    ) : (
                                                        <Image src={item.media} alt={item.name} fill className="object-cover" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-end mb-2">
                                                        <h4 className="font-bold text-sm truncate group-hover/item:text-neon-purple transition-colors">{item.name}</h4>
                                                        <span className="text-[10px] font-black text-electric-blue">{item.count}</span>
                                                    </div>
                                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${percentage}%` }}
                                                            className="h-full bg-gradient-to-r from-neon-purple to-electric-blue"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Trust Ecosystem */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass-card p-10 bg-white/[0.01] border-white/5 relative overflow-hidden">
                                <div className="absolute -bottom-4 -right-4 text-white/5 rotate-12">
                                    <FiLock size={160} />
                                </div>
                                <h4 className="font-black text-2xl tracking-tighter mb-8 uppercase italic relative z-10">Secure Checkout</h4>
                                <div className="grid grid-cols-2 gap-4 relative z-10">
                                    {PAYMENT_METHODS.map((pay) => (
                                        <div key={pay.name} className="flex items-center justify-center p-4 rounded-xl bg-white/[0.03] border border-white/5 blur-[0.3px] blur-0 transition-all">
                                            <img src={pay.icon} alt={pay.name} className="h-6 opacity-40  blur-0 opacity-100 transition-all filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-8 text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] leading-loose">
                                    End-to-End Encryption. No bank statement will ever mention our brand or product names. Total Anonymity.
                                </p>
                            </div>

                            <div className="glass-card p-10 bg-gradient-to-br from-neon-purple/10 via-transparent to-transparent border-neon-purple/20">
                                <h4 className="font-black text-2xl tracking-tighter mb-8 uppercase italic">National Pulse</h4>
                                <div className="space-y-4">
                                    {salesByState.slice(0, 5).map(([state, count]) => (
                                        <div key={state} className="flex justify-between items-center group">
                                            <span className="text-white/40 text-sm font-bold group-hover:text-white transition-colors">{state}</span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(count / sales.length) * 400}%` }}
                                                        className="h-full bg-neon-purple shadow-[0_0_10px_#A855F7]"
                                                    />
                                                </div>
                                                <span className="font-black text-xs text-neon-purple">{count}+</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-white/5">
                                    <p className="text-[10px] text-white/20 font-medium leading-relaxed">
                                        Aggregated data from over 2,400+ pin codes across India. By coordinating global bulk imports once order thresholds are met, we eliminate middleman markups, ensuring you get premium tech at warehouse prices.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Price Integrity Section - NEW */}
                        <section className="glass-card p-10 md:p-12 bg-gradient-to-r from-neon-purple/5 to-transparent border-neon-purple/10">
                            <div className="flex flex-col md:flex-row gap-10 items-center">
                                <div className="w-24 h-24 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-neon-purple border border-white/10">
                                    <FiTrendingUp size={48} className="rotate-180" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase italic">The Direct Advantage.</h3>
                                    <p className="text-white/50 leading-relaxed text-sm">
                                        Why are our prices significantly lower than other sellers? It's simple logistics. We monitor real-time demand across India. Once we hit our bulk order quotas, we import directly from global manufacturing hubs. This "Reach & Release" model allows us to bypass high retail markups, passing 100% of the savings directly to you.
                                    </p>
                                    <div className="flex gap-6 mt-6">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-electric-blue uppercase tracking-widest">
                                            <FiZap /> Zero Middlemen
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-electric-blue uppercase tracking-widest">
                                            <FiShoppingCart /> Bulk Import Efficiency
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Live Ticker Feed */}
                    <div className="lg:col-span-1">
                        <section className="glass-card p-8 bg-white/[0.01] sticky top-24 max-h-[calc(100vh-120px)] overflow-hidden flex flex-col border-white/5">
                            <div className="mb-10 flex justify-between items-end">
                                <div>
                                    <h3 className="text-2xl font-black mb-1 flex items-center gap-3 tracking-tighter uppercase italic">
                                        Live Pulse
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22C55E]" />
                                        <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest">Syncing with server...</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-neon-purple bg-neon-purple/10 px-2 py-1 rounded">FAST</span>
                            </div>

                            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                <AnimatePresence initial={false}>
                                    {recentSales.map((sale) => (
                                        <motion.div
                                            key={sale.id}
                                            layout
                                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group flex items-center gap-4 relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/5">
                                                {sale.mediaType === 'video' ? (
                                                    <video autoPlay muted loop className="w-full h-full object-cover">
                                                        <source src={sale.productMedia} type="video/mp4" />
                                                    </video>
                                                ) : (
                                                    <Image src={sale.productMedia} alt={sale.productName} fill className="object-cover" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 relative">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-[8px] font-black text-neon-purple uppercase tracking-tighter bg-neon-purple/10 px-1.5 py-0.5 rounded italic">Discreet Shipping</span>
                                                    <span className="text-[9px] text-white/30 font-bold">{new Date(sale.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                                                </div>
                                                <p className="text-xs font-black text-white truncate group-hover:text-electric-blue transition-colors tracking-tight">{sale.productName}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <FiMapPin size={8} className="text-white/20" />
                                                    <p className="text-[9px] text-white/40 uppercase font-black tracking-tighter">{sale.state}, IN</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Bottom Trust Action */}
                <div className="text-center bg-gradient-to-t from-white/5 to-transparent p-12 rounded-[40px] border border-white/5">
                    <FiLock className="mx-auto text-neon-purple mb-6" size={48} />
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase italic">Your Secret is Safe.</h2>
                    {/* <p className="max-w-2xl mx-auto text-white/40 mb-10 text-lg">
                        Adlply uses 256-bit military-grade encryption for all transactions. We appear as <span className="text-white font-bold italic">"ADL-BILLING"</span> on your statement.
                    </p> */}
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button className="neon-button px-10 py-5 text-sm uppercase font-black tracking-widest">
                            Shop Discreetly Now
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(168, 85, 247, 0.3);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

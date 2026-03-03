"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const randomPurchases = [
    { name: "Rahul", city: "Delhi", product: "Nebula Pulse" },
    { name: "Ananya", city: "Mumbai", product: "Zenith Flow Kit" },
    { name: "Siddharth", city: "Bangalore", product: "Aether Glow" },
    { name: "Priya", city: "Hyderabad", product: "Nova Skin Care" },
    { name: "Kunal", city: "Pune", product: "Wellness Bundle" },
];

export default function SocialProofToast() {
    const [current, setCurrent] = useState<typeof randomPurchases[0] | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const showToast = () => {
            const random = randomPurchases[Math.floor(Math.random() * randomPurchases.length)];
            setCurrent(random);
            setShow(true);

            setTimeout(() => setShow(false), 5000); // Show for 5 seconds
        };

        // Initial delay then repeat
        const interval = setInterval(showToast, 15000); // Every 15 seconds

        // First one after 5 seconds
        const timer = setTimeout(showToast, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {show && current && (
                <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    className="fixed bottom-24 left-6 md:bottom-8 md:left-8 z-50 pointer-events-none"
                >
                    <div className="glass-card p-4 flex items-center gap-4 border-neon-purple/30 bg-[#0B0F19]/90 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
                        <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                            <FiCheckCircle size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Live Purchase</p>
                            <p className="text-xs font-medium text-white">
                                <span className="font-bold text-neon-purple">{current.name}</span> from {current.city}
                            </p>
                            <p className="text-[10px] text-white/60">purchased <span className="text-electric-blue font-bold">{current.product}</span></p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight, FiPackage } from "react-icons/fi";
import Link from "next/link";

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get("order_id");

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-8"
            >
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center text-neon-green animate-pulse">
                        <FiCheckCircle size={40} />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Order Success!</h1>
                    <p className="text-white/60 text-sm">
                        Thank you for your purchase. Your payment has been verified and your order is being processed.
                    </p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Order Reference</p>
                    <p className="text-xl font-mono font-bold">#ADL-{orderId?.padStart(6, '0')}</p>
                </div>

                <div className="space-y-4">
                    <Link 
                        href="/shop"
                        className="flex items-center justify-center gap-3 h-14 w-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/90 transition-all"
                    >
                        Back to Shopping <FiArrowRight />
                    </Link>
                    <div className="flex items-center justify-center gap-2 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                        <FiPackage /> Discreet shipping guaranteed
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}

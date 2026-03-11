"use client";

import { motion } from "framer-motion";
import { FaTelegramPlane } from "react-icons/fa";

interface TelegramCTAProps {
    productName?: string;
    productId?: string;
    variant?: 'sticky' | 'inline' | 'menu-item';
    isWhatsAppVisible?: boolean;
}

export default function TelegramCTA({ productName, productId, variant = 'sticky', isWhatsAppVisible = true }: TelegramCTAProps) {
    const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/adultplaytoys";
    
    // We just use the custom base URL if configured, to allow directly opening a specific bot or user chat if required
    // Defaulting to the brand's Telegram link for simplicity
    
    const isInline = variant === 'inline';
    const isMenuItem = variant === 'menu-item';

    return (
        <motion.button
            onClick={async () => {
                // 1. Log to backend for analysis
                try {
                    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart-inquiries/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            items_data: [{
                                name: productName ? `[Telegram] ${productName}` : "[Telegram] General Enquiry",
                                quantity: 1,
                                price: "0"
                            }],
                            total_price: "0"
                        })
                    });
                } catch (err) {
                    console.error("Failed to log sticky CTA inquiry", err);
                }
                // 2. Open Telegram
                window.open(telegramUrl, "_blank");
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
                ${isInline
                    ? "w-full h-full flex items-center justify-center gap-2 glass-card hover:bg-[#0088cc] hover:text-white transition-all text-[#0088cc] font-bold text-sm"
                    : isMenuItem
                        ? "w-12 h-12 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,136,204,0.3)] transition-shadow hover:shadow-[0_0_20px_rgba(0,136,204,0.5)]"
                        : `fixed z-40 w-14 h-14 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,136,204,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(0,136,204,0.6)] ${isWhatsAppVisible
                            ? "bottom-40 right-6 md:bottom-24 md:right-8"
                            : "bottom-24 right-6 md:bottom-8 md:right-8"
                        }`
                }
            `}
        >
            <FaTelegramPlane size={isInline ? 18 : isMenuItem ? 24 : 32} />
            {isInline && <span>Telegram</span>}
            {!isMenuItem && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
            )}
        </motion.button>
    );
}

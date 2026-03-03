"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppCTAProps {
    productName?: string;
    productId?: string;
}

export default function WhatsAppCTA({ productName, productId }: WhatsAppCTAProps) {
    const phoneNumber = "919876543210";
    const message = productName
        ? `Hello, I'm interested in ordering ${productName}${productId ? ` (ID: ${productId})` : ''}. Please provide more details.`
        : "Hello, I have a wellness enquiry. Could you please help?";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.button
            onClick={async () => {
                // 1. Log to backend for analysis
                try {
                    await fetch("http://localhost:8001/api/cart-inquiries/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            items_data: [{
                                name: productName || "General Enquiry",
                                quantity: 1,
                                price: "0"
                            }],
                            total_price: "0"
                        })
                    });
                } catch (err) {
                    console.error("Failed to log sticky CTA inquiry", err);
                }
                // 2. Open WhatsApp
                window.open(whatsappUrl, "_blank");
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(37,211,102,0.6)]"
        >
            <FaWhatsapp size={32} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
        </motion.button>
    );
}

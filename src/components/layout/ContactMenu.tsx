"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiChevronLeft } from "react-icons/fi";
import WhatsAppCTA from "./WhatsAppCTA";
import TelegramCTA from "./TelegramCTA";

export default function ContactMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const showWhatsApp = process.env.NEXT_PUBLIC_SHOW_WHATSAPP !== "false";
    const showTelegram = process.env.NEXT_PUBLIC_SHOW_TELEGRAM !== "false";

    // If both are disabled, don't render the menu at all
    if (!showWhatsApp && !showTelegram) return null;

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-[#0a0f1c]/90 backdrop-blur-xl border border-white/10 border-r-0 rounded-l-2xl shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
                    >
                        <div className="px-4 py-4 flex flex-col gap-4">
                            {showWhatsApp && <WhatsAppCTA variant="menu-item" />}
                            {showTelegram && <TelegramCTA variant="menu-item" />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-16 bg-[#12182b]/90 backdrop-blur-md rounded-l-xl border border-white/10 border-r-0 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#1a233b] transition-colors shadow-[-5px_0_15px_rgba(0,0,0,0.3)] relative group"
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? (
                    <FiX size={20} className="text-white" />
                ) : (
                    <div className="flex flex-col items-center gap-1">
                        <FiChevronLeft size={20} className="text-white group-hover:-translate-x-1 transition-transform" />
                        <FiMessageSquare size={16} className="text-neon-purple mt-1 opacity-80" />
                    </div>
                )}
                
                {/* Ping animation when closed to draw subtle attention */}
                {!isOpen && (
                   <span className="absolute top-2 right-2 flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
                   </span>
                )}
            </motion.button>
        </div>
    );
}

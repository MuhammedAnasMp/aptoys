"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiUser, FiHeart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [likedCount, setLikedCount] = useState(0);
    const { cartCount, setIsCartOpen } = useCart();

    useEffect(() => {
        const updateCount = () => {
            const likedItems = JSON.parse(localStorage.getItem("adlply_wishlist") || "[]");
            setLikedCount(likedItems.length);
        };

        updateCount();
        window.addEventListener("wishlistUpdate", updateCount);
        window.addEventListener("storage", updateCount);

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("wishlistUpdate", updateCount);
            window.removeEventListener("storage", updateCount);
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "py-3 px-6 md:px-12 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/10"
                : "py-6 px-6 md:px-12 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300">
                        <Image
                            src="/logo.png"
                            alt="AdultPlayToys Logo"
                            fill
                            className="object-contain p-1"
                        />
                    </div>
                    <div className="hidden md:block">
                        <span className="text-xl font-bold tracking-tighter">AdultPlay<span className="text-neon-purple">Toys</span></span>
                        <p className="text-[10px] uppercase tracking-widest text-white/50 leading-none">Future Wellness</p>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {["Home", "Shop", "Blog", "Community", "FAQ"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="text-sm font-medium text-white/70 hover:text-neon-purple transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-purple transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 text-white/70 hover:text-white transition-colors">
                        <FiSearch size={22} />
                    </button>

                    <Link href="/wishlist" className="p-2 text-white/70 hover:text-white transition-colors relative">
                        <FiHeart size={22} className={likedCount > 0 ? "text-glow-pink" : ""} fill={likedCount > 0 ? "currentColor" : "none"} />
                        {likedCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-neon-purple text-[10px] flex items-center justify-center rounded-full text-white font-bold animate-in zoom-in duration-300">
                                {likedCount}
                            </span>
                        )}
                    </Link>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="p-2 text-white/70 hover:text-white transition-colors relative"
                    >
                        <FiShoppingCart size={22} />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-glow-pink text-[10px] flex items-center justify-center rounded-full text-white font-bold animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button className="hidden md:flex p-2 text-white/70 hover:text-white transition-colors">
                        <FiUser size={22} />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-white/70 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-[#0B0F19]/95 backdrop-blur-2xl border-b border-white/10 md:hidden p-8 flex flex-col gap-6"
                    >
                        {["Home", "Shop", "Blog", "Community", "FAQ", "Account"].map((item) => (
                            <Link
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-2xl font-bold hover:text-neon-purple transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

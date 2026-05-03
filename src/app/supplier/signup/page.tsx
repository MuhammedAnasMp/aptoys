"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiMail, FiShoppingBag, FiMessageCircle, FiSend, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function SupplierSignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        store_name: "",
        whatsapp_number: "",
        telegram_link: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/signup/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("supplier_token", data.token);
                router.push("/supplier/dashboard");
            } else {
                setError(data.error || "Signup failed");
            }
        } catch (err) {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-space-black flex items-center justify-center p-6">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-glow-pink/10 blur-[120px] rounded-full" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Join Marketplace</h1>
                    <p className="text-white/40 text-sm font-medium tracking-wide">Create your supplier account today</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 bg-glow-pink/10 border border-glow-pink/20 rounded-2xl text-glow-pink text-xs font-bold text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                        <div className="relative group">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-purple transition-colors" />
                            <input 
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-white text-sm outline-none focus:border-neon-purple/50 transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-purple transition-colors" />
                            <input 
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-white text-sm outline-none focus:border-neon-purple/50 transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-purple transition-colors" />
                            <input 
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-white text-sm outline-none focus:border-neon-purple/50 transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <FiShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-purple transition-colors" />
                            <input 
                                name="store_name"
                                type="text"
                                placeholder="Store Name"
                                value={formData.store_name}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-white text-sm outline-none focus:border-neon-purple/50 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative group">
                                <FiMessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-purple transition-colors" />
                                <input 
                                    name="whatsapp_number"
                                    type="text"
                                    placeholder="WhatsApp (e.g. +94...)"
                                    value={formData.whatsapp_number}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-white text-sm outline-none focus:border-neon-purple/50 transition-all"
                                />
                            </div>
                            <div className="relative group">
                                <FiSend className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-purple transition-colors" />
                                <input 
                                    name="telegram_link"
                                    type="text"
                                    placeholder="Telegram (e.g. t.me/...)"
                                    value={formData.telegram_link}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-white text-sm outline-none focus:border-neon-purple/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black h-14 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-neon-purple hover:text-white transition-all active:scale-95 disabled:opacity-50 mt-6"
                    >
                        {loading ? "Creating Account..." : "Create Supplier Account"}
                        {!loading && <FiArrowRight />}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
                        Already have an account?{" "}
                        <Link href="/supplier/login" className="text-white hover:text-neon-purple transition-colors">Login Now</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

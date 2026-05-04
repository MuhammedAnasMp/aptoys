"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiAlertCircle, FiArrowRight, FiShield } from "react-icons/fi";
import Link from "next/link";

export default function SupplierLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("supplier_token", data.token);
                localStorage.setItem("supplier_info", JSON.stringify(data));
                router.push("/supplier/dashboard");
            } else {
                setError(data.error || data.non_field_errors?.[0] || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-150px)] bg-space-black flex items-center justify-center px-6 ">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[10px] font-black uppercase tracking-widest mb-6">
                        <FiShield size={12} /> Supplier Portal
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Welcome Back</h1>
                    <p className="text-white/40 text-sm">Manage your inventory and orders</p>
                </div>

                <div className="glass-card p-8 rounded-[2rem] border-white/5 relative overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-purple/10 blur-[80px] rounded-full" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-electric-blue/10 blur-[80px] rounded-full" />

                    <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-4 bg-glow-pink/10 border border-glow-pink/20 rounded-xl flex items-center gap-3 text-glow-pink text-xs font-bold"
                            >
                                <FiAlertCircle size={16} /> {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-1">Username</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"><FiMail size={18} /></div>
                                <input
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-14 pl-12 pr-4 text-sm focus:border-neon-purple/50 outline-none transition-all"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-1">Password</label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"><FiLock size={18} /></div>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-14 pl-12 pr-4 text-sm focus:border-neon-purple/50 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? "Authenticating..." : "Login to Portal"} <FiArrowRight size={16} />
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">
                        New supplier? <Link href="/supplier/signup" className="text-white hover:text-neon-purple transition-colors">Create your account</Link>
                    </p>
                    <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">
                        Protected by <span className="text-neon-purple">Adlply Security Protocol</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

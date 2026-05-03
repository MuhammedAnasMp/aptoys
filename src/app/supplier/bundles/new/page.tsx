"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiPlus, FiTrash2, FiSave, FiAlertCircle, FiCheck, FiPackage, FiSearch } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

interface Product {
    id: number;
    name: string;
    price: string;
    images: { file: string; is_primary: boolean }[];
}

export default function NewBundlePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        total_price: "",
        discount_text: "BUNDLE SAVINGS",
        is_active: true,
        items: [] as { product: number, quantity: number }[]
    });

    useEffect(() => {
        const token = localStorage.getItem("supplier_token");
        if (!token) {
            router.push("/supplier/login");
            return;
        }
        fetchProducts(token);
    }, []);

    const fetchProducts = async (token: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/products/`, {
            headers: { "Authorization": `Token ${token}` }
        });
        const data = await res.json();
        setProducts(data);
    };

    const toggleProduct = (productId: number) => {
        setFormData(prev => {
            const exists = prev.items.find(item => item.product === productId);
            if (exists) {
                return { ...prev, items: prev.items.filter(item => item.product !== productId) };
            }
            return { ...prev, items: [...prev.items, { product: productId, quantity: 1 }] };
        });
    };

    const updateQuantity = (productId: number, q: number) => {
        if (q < 1) return;
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item => item.product === productId ? { ...item, quantity: q } : item)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.items.length < 2) {
            setStatus({ type: 'error', message: "Select at least 2 products for a bundle." });
            return;
        }

        setLoading(true);
        setStatus(null);
        const token = localStorage.getItem("supplier_token");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/bundles/`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus({ type: 'success', message: "Bundle created successfully!" });
                setTimeout(() => router.push("/supplier/dashboard"), 1500);
            } else {
                const data = await res.json();
                throw new Error(data.detail || "Failed to create bundle");
            }
        } catch (err: any) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="min-h-screen bg-space-black text-white pb-24">
            <header className="h-20 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-30 flex items-center">
                <div className="max-w-5xl mx-auto px-6 w-full">
                    <Link href="/supplier/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                        <FiArrowLeft /> Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Create Product Bundle</h1>
                    <p className="text-white/40 text-sm">Combine products for a special price</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-10">
                        {status && (
                            <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold ${status.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-500' : 'bg-glow-pink/10 border border-glow-pink/20 text-glow-pink'}`}>
                                {status.type === 'success' ? <FiCheck size={18} /> : <FiAlertCircle size={18} />}
                                {status.message}
                            </div>
                        )}

                        <section className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 pb-2 border-b border-white/5">Bundle Details</h3>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Bundle Name</label>
                                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-14 px-4 text-sm outline-none focus:border-neon-purple/50" placeholder="e.g. Wellness Essentials Kit" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Description</label>
                                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-neon-purple/50 resize-none" placeholder="Explain the benefits of this bundle..." />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Bundle Price (₹)</label>
                                    <input type="number" required value={formData.total_price} onChange={e => setFormData({...formData, total_price: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-14 px-4 text-sm outline-none focus:border-neon-purple/50" placeholder="Total Price" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Discount Label</label>
                                    <input value={formData.discount_text} onChange={e => setFormData({...formData, discount_text: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-14 px-4 text-sm outline-none focus:border-neon-purple/50" placeholder="e.g. SAVE 20%" />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 pb-2 border-b border-white/5">Select Products</h3>
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                <input 
                                    type="text" 
                                    placeholder="Search your products..." 
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-12 pl-12 pr-4 text-sm outline-none focus:border-neon-purple/50"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {filteredProducts.map(product => {
                                    const isSelected = formData.items.find(item => item.product === product.id);
                                    return (
                                        <div 
                                            key={product.id}
                                            onClick={() => toggleProduct(product.id)}
                                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${isSelected ? 'bg-neon-purple/10 border-neon-purple text-white' : 'bg-white/[0.02] border-white/5 text-white/40 hover:border-white/10'}`}
                                        >
                                            <div className="w-12 h-12 rounded-lg bg-white/5 relative overflow-hidden flex-shrink-0">
                                                {product.images?.find(img => img.is_primary)?.file && (
                                                    <Image src={product.images.find(img => img.is_primary)!.file} alt={product.name} fill className="object-cover" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[11px] font-black uppercase tracking-widest truncate">{product.name}</h4>
                                                <p className="text-[10px] font-bold">₹{product.price}</p>
                                            </div>
                                            {isSelected && (
                                                <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                                                    <label className="text-[9px] font-bold uppercase text-white/40">Qty:</label>
                                                    <input 
                                                        type="number" 
                                                        min="1" 
                                                        value={isSelected.quantity} 
                                                        onChange={e => updateQuantity(product.id, parseInt(e.target.value))}
                                                        className="w-12 h-8 bg-black/40 border border-white/10 rounded-lg text-center text-xs font-black outline-none focus:border-neon-purple"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-5 space-y-8">
                        <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-8 sticky top-32">
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-6 pb-4 border-b border-white/10">Bundle Summary</h2>
                                <div className="space-y-4">
                                    {formData.items.length === 0 ? (
                                        <p className="text-xs text-white/20 italic">No products selected yet.</p>
                                    ) : (
                                        formData.items.map(item => {
                                            const p = products.find(prod => prod.id === item.product);
                                            return (
                                                <div key={item.product} className="flex justify-between items-center text-xs">
                                                    <span className="text-white/60 truncate pr-4">{item.quantity}x {p?.name}</span>
                                                    <span className="font-bold">₹{p ? (parseFloat(p.price) * item.quantity).toFixed(0) : 0}</span>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Total Value</span>
                                    <span className="text-sm font-black text-white/40 line-through">
                                        ₹{formData.items.reduce((sum, item) => {
                                            const p = products.find(prod => prod.id === item.product);
                                            return sum + (p ? parseFloat(p.price) * item.quantity : 0);
                                        }, 0).toFixed(0)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-purple">Bundle Price</span>
                                    <span className="text-3xl font-black text-white tabular-nums tracking-tighter">₹{formData.total_price || 0}</span>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading || formData.items.length < 2}
                                className="w-full h-14 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-neon-purple hover:text-white transition-all active:scale-95 disabled:opacity-50"
                            >
                                <FiSave size={18} /> {loading ? "Creating..." : "Save Bundle"}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiUpload, FiPackage, FiMessageCircle, FiSend, FiTrash2, FiEdit3, FiLogOut, FiCheck, FiX, FiAlertTriangle, FiArrowRight, FiBarChart2, FiHeart, FiShoppingCart, FiLink, FiSmartphone, FiMonitor, FiShare2 } from "react-icons/fi";
import Image from "next/image";
import { useToast } from "@/context/ToastContext";

interface SupplierProduct {
    id: number;
    name: string;
    slug: string;
    price: string;
    sales_count: number;
    rating: number;
    images: { file: string; is_primary: boolean }[];
}

interface SupplierBundle {
    id: number;
    name: string;
    slug: string;
    total_price: string;
    discount_text: string;
    is_active: boolean;
    items: any[];
}

interface AnalysisData {
    wishlist: any[];
    cartInquiries: any[];
    referralVisits: any[];
}

export default function SupplierDashboard() {
    const router = useRouter();
    const { showToast } = useToast();
    const [products, setProducts] = useState<SupplierProduct[]>([]);
    const [bundles, setBundles] = useState<SupplierBundle[]>([]);
    const [analysis, setAnalysis] = useState<AnalysisData>({ wishlist: [], cartInquiries: [], referralVisits: [] });
    const [activeTab, setActiveTab] = useState<'products' | 'bundles' | 'analysis'>('products');
    const [loading, setLoading] = useState(true);
    const [supplierInfo, setSupplierInfo] = useState<any>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("supplier_token");
        const info = localStorage.getItem("supplier_info");

        if (!token || !info) {
            router.push("/supplier/login");
            return;
        }

        setSupplierInfo(JSON.parse(info));
        fetchData(token);
    }, []);

    const fetchData = async (token: string) => {
        try {
            const [prodRes, bundleRes, wishlistRes, cartRes, referralRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/products/`, { headers: { "Authorization": `Token ${token}` } }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/bundles/`, { headers: { "Authorization": `Token ${token}` } }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/analysis/wishlist/`, { headers: { "Authorization": `Token ${token}` } }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/analysis/cart-inquiries/`, { headers: { "Authorization": `Token ${token}` } }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/analysis/referral-visits/`, { headers: { "Authorization": `Token ${token}` } })
            ]);

            const prodData = await prodRes.json();
            const bundleData = await bundleRes.json();
            const wishlistData = await wishlistRes.json();
            const cartData = await cartRes.json();
            const referralData = await referralRes.json();

            setProducts(prodData);
            setBundles(bundleData);
            setAnalysis({
                wishlist: wishlistData,
                cartInquiries: cartData,
                referralVisits: referralData
            });
        } catch (err) {
            console.error("Error fetching data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        const token = localStorage.getItem("supplier_token");
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/products/${slug}/`, {
                method: "DELETE",
                headers: { "Authorization": `Token ${token}` }
            });

            if (response.ok) {
                setProducts(products.filter(p => p.slug !== slug));
                showToast("Product deleted successfully", "success");
            } else {
                showToast("Failed to delete product", "error");
            }
        } catch (err) {
            showToast("Error deleting product", "error");
        }
    };

    const handleDeleteBundle = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this bundle?")) return;

        const token = localStorage.getItem("supplier_token");
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/bundles/${slug}/`, {
                method: "DELETE",
                headers: { "Authorization": `Token ${token}` }
            });

            if (response.ok) {
                setBundles(bundles.filter(b => b.slug !== slug));
                showToast("Bundle deleted successfully", "success");
            } else {
                showToast("Failed to delete bundle", "error");
            }
        } catch (err) {
            showToast("Error deleting bundle", "error");
        }
    };

    const copyShareLink = (productSlug: string, isBundle: boolean = false) => {
        const path = isBundle ? `/bundles/${productSlug}` : `/products/${productSlug}`;
        const url = `${window.location.origin}${path}?ref=${supplierInfo.supplier_slug}`;
        navigator.clipboard.writeText(url);
        showToast("Referral link copied to clipboard!", "success");
    };

    const handleLogout = () => {
        localStorage.removeItem("supplier_token");
        localStorage.removeItem("supplier_info");
        router.push("/supplier/login");
    };

    const handleExcelUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadFile) return;

        setUploading(true);
        setUploadStatus(null);
        const token = localStorage.getItem("supplier_token");

        const formData = new FormData();
        formData.append("file", uploadFile);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/excel-upload/`, {
                method: "POST",
                headers: { "Authorization": `Token ${token}` },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                setUploadStatus({ type: 'success', message: data.message });
                fetchProducts(token!);
                setTimeout(() => setShowUploadModal(false), 2000);
            } else {
                setUploadStatus({ type: 'error', message: data.error || "Upload failed" });
            }
        } catch (err) {
            setUploadStatus({ type: 'error', message: "Network error" });
        } finally {
            setUploading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-space-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-space-black text-white">
            {/* Header */}
            <header className="border-b border-white/5 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-purple to-electric-blue flex items-center justify-center font-black text-sm">
                            {supplierInfo?.supplier_name?.[0]}
                        </div>
                        <div>
                            <h2 className="text-sm font-black uppercase tracking-widest">{supplierInfo?.supplier_name}</h2>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">Supplier Portal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
                            <div className="flex items-center gap-1.5"><FiMessageCircle className="text-[#25D366]" /> {supplierInfo?.whatsapp_number || 'N/A'}</div>
                            <div className="flex items-center gap-1.5"><FiSend className="text-[#0088cc]" /> Telegram Linked</div>
                        </div>
                        <button onClick={handleLogout} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-glow-pink/10 hover:border-glow-pink/50 hover:text-glow-pink transition-all">
                            <FiLogOut size={18} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Tabs */}
                <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/5 rounded-2xl w-fit mb-12">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Products ({products.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('bundles')}
                        className={`h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'bundles' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Bundles ({bundles.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('analysis')}
                        className={`h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'analysis' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Analysis
                    </button>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
                            {activeTab === 'products' ? 'Product Inventory' : activeTab === 'bundles' ? 'Collection Bundles' : 'Store Performance'}
                        </h1>
                        <p className="text-white/40 text-sm font-medium">
                            {activeTab === 'products' ? 'Manage individual items and bulk operations' : activeTab === 'bundles' ? 'Manage grouped product collections and discounts' : 'Deep dive into your customers behavior and product interest'}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {activeTab === 'products' ? (
                            <>
                                <a
                                    href="/templates/product_import_template.xlsx"
                                    download
                                    className="h-12 px-6 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-white/60 hover:text-white"
                                >
                                    <FiUpload /> Download Template
                                </a>
                                <button
                                    onClick={() => setShowUploadModal(true)}
                                    className="h-12 px-6 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                                >
                                    <FiUpload /> Bulk Import
                                </button>
                                <button
                                    onClick={() => router.push("/supplier/products/new")}
                                    className="h-12 px-6 bg-neon-purple text-white rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-neon-purple/80 transition-all shadow-[0_10px_20px_rgba(139,92,246,0.3)]"
                                >
                                    <FiPlus /> New Product
                                </button>
                            </>
                        ) : activeTab === 'bundles' ? (
                            <button
                                onClick={() => router.push("/supplier/bundles/new")}
                                className="h-12 px-6 bg-electric-blue text-white rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-electric-blue/80 transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)]"
                            >
                                <FiPlus /> Create Bundle
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 bg-white/5 px-4 h-10 rounded-xl border border-white/5">
                                <FiBarChart2 /> Real-time Analytics
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeTab === 'products' ? (
                        products.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card group rounded-3xl border border-white/5 overflow-hidden hover:border-white/20 transition-all"
                            >
                                <div className="aspect-[4/5] relative bg-white/5">
                                    {product.images?.find(img => img.is_primary)?.file && (
                                        <Image
                                            src={product.images.find(img => img.is_primary)!.file}
                                            alt={product.name}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                                        />
                                    )}
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => copyShareLink(product.slug)}
                                            className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-neon-purple transition-colors"
                                            title="Copy Referral Link"
                                        >
                                            <FiShare2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => router.push(`/supplier/products/${product.slug}/edit`)}
                                            className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-colors"
                                        >
                                            <FiEdit3 size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.slug)}
                                            className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md flex items-center justify-center text-glow-pink/70 hover:text-glow-pink transition-colors"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xs font-black uppercase tracking-widest truncate mb-2">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-black">₹{product.price}</span>
                                        <span className="text-[9px] font-bold uppercase text-white/30 flex items-center gap-1">
                                            <FiPackage /> {product.sales_count} Sold
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : activeTab === 'bundles' ? (
                        bundles.map((bundle) => (
                            <motion.div
                                key={bundle.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card group rounded-3xl border border-white/5 overflow-hidden hover:border-white/20 transition-all p-6"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                                        <FiPackage size={24} />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => copyShareLink(bundle.slug, true)}
                                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/70 hover:text-neon-purple transition-colors"
                                            title="Copy Referral Link"
                                        >
                                            <FiShare2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBundle(bundle.slug)}
                                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-glow-pink/70 hover:text-glow-pink transition-colors"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-widest mb-2 truncate">{bundle.name}</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-2 py-1 rounded bg-electric-blue/10 text-electric-blue text-[8px] font-black uppercase tracking-widest">
                                        {bundle.items.length} Products
                                    </span>
                                    <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest">
                                        {bundle.discount_text}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-lg font-black tracking-tighter">₹{bundle.total_price}</span>
                                    <div className={`w-2 h-2 rounded-full ${bundle.is_active ? 'bg-green-500' : 'bg-white/10'}`} />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Analysis Stats Cards */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 rounded-[2rem] border-white/5">
                                <div className="w-12 h-12 rounded-2xl bg-glow-pink/10 flex items-center justify-center text-glow-pink mb-6">
                                    <FiHeart size={24} />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Wishlist Saves</h3>
                                <div className="text-4xl font-black tabular-nums">{analysis.wishlist.length}</div>
                                <p className="text-[9px] text-white/20 mt-4 leading-relaxed uppercase font-bold">Total times your products were saved by customers</p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 rounded-[2rem] border-white/5">
                                <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 flex items-center justify-center text-neon-purple mb-6">
                                    <FiShoppingCart size={24} />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Cart Inquiries</h3>
                                <div className="text-4xl font-black tabular-nums">{analysis.cartInquiries.length}</div>
                                <p className="text-[9px] text-white/20 mt-4 leading-relaxed uppercase font-bold">Checkout sessions containing your items</p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8 rounded-[2rem] border-white/5">
                                <div className="w-12 h-12 rounded-2xl bg-electric-blue/10 flex items-center justify-center text-electric-blue mb-6">
                                    <FiLink size={24} />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Referral Visits</h3>
                                <div className="text-4xl font-black tabular-nums">{analysis.referralVisits.length}</div>
                                <p className="text-[9px] text-white/20 mt-4 leading-relaxed uppercase font-bold">Direct traffic from external referral links</p>
                            </motion.div>

                            {/* Recent Activity Lists */}
                            <div className="col-span-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
                                <div className="glass-card p-8 rounded-[2rem] border-white/5">
                                    <h3 className="text-xs font-black uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Recent Wishlist Activity</h3>
                                    <div className="space-y-4">
                                        {analysis.wishlist.slice(0, 5).map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-2 border-b border-white/[0.02]">
                                                <div className="flex items-center gap-3">
                                                    <div className="text-white/20">{item.device_type === 'Mobile' ? <FiSmartphone size={14} /> : <FiMonitor size={14} />}</div>
                                                    <span className="text-[11px] font-bold text-white/60 truncate max-w-[150px]">{item.product_name}</span>
                                                </div>
                                                <span className="text-[9px] font-black uppercase text-white/20">{new Date(item.created_at).toLocaleDateString()}</span>
                                            </div>
                                        ))}
                                        {analysis.wishlist.length === 0 && <p className="text-[10px] text-white/20 italic">No activity recorded yet.</p>}
                                    </div>
                                </div>

                                <div className="glass-card p-8 rounded-[2rem] border-white/5">
                                    <h3 className="text-xs font-black uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Referral Sources</h3>
                                    <div className="space-y-4">
                                        {analysis.referralVisits.slice(0, 5).map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-2 border-b border-white/[0.02]">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-2 py-1 bg-white/5 rounded text-[9px] font-black text-electric-blue">{item.referral_code}</span>
                                                    <span className="text-[10px] font-bold text-white/40 truncate max-w-[150px]">{item.product_slug}</span>
                                                </div>
                                                <span className="text-[9px] font-black uppercase text-white/20">{new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        ))}
                                        {analysis.referralVisits.length === 0 && <p className="text-[10px] text-white/20 italic">No referrals recorded yet.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {products.length === 0 && (
                        <div className="col-span-full py-24 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-full bg-white/5 border border-dashed border-white/10 flex items-center justify-center text-white/10 mb-6">
                                <FiPackage size={40} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-2">No Products Yet</h3>
                            <p className="text-white/40 text-sm mb-8">Start adding your inventory to the portal.</p>
                            <button onClick={() => router.push("/supplier/products/new")} className="h-12 px-8 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                Add First Product
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Upload Modal */}
            <AnimatePresence>
                {showUploadModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowUploadModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-lg glass-card rounded-[2.5rem] border-white/10 p-10 relative z-10"
                        >
                            <button onClick={() => setShowUploadModal(false)} className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors">
                                <FiX size={24} />
                            </button>

                            <div className="mb-8">
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Bulk Product Import</h3>
                                <p className="text-white/40 text-xs">Upload an Excel file (.xlsx) with your product data.</p>
                            </div>

                            <form onSubmit={handleExcelUpload} className="space-y-6">
                                <div className={`relative h-40 border-2 border-dashed ${uploadFile ? 'border-neon-purple/50 bg-neon-purple/5' : 'border-white/10 bg-white/5'} rounded-2xl transition-all flex flex-col items-center justify-center text-center px-6`}>
                                    <input
                                        type="file"
                                        accept=".xlsx"
                                        onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <FiUpload size={32} className={uploadFile ? 'text-neon-purple' : 'text-white/10'} />
                                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/30">
                                        {uploadFile ? uploadFile.name : "Click to select or drag file"}
                                    </p>
                                </div>

                                {uploadStatus && (
                                    <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-bold ${uploadStatus.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-500' : 'bg-glow-pink/10 border border-glow-pink/20 text-glow-pink'}`}>
                                        {uploadStatus.type === 'success' ? <FiCheck size={18} /> : <FiAlertTriangle size={18} />}
                                        {uploadStatus.message}
                                    </div>
                                )}

                                <div className="p-4 bg-white/5 rounded-xl text-[9px] text-white/30 uppercase font-bold leading-relaxed tracking-widest">
                                    Header columns expected: <br />
                                    <span className="text-white/60">Name, Description, Price, Discount Price, Sales, Customers, Rating, Is Famous, Benefits (JSON)</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!uploadFile || uploading}
                                    className="w-full h-14 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {uploading ? "Importing Data..." : "Start Import Process"} <FiArrowRight size={16} />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

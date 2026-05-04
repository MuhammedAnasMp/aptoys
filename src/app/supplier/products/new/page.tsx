"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiSave, FiPlus, FiTrash2, FiImage, FiVideo, FiCheck, FiAlertCircle, FiUploadCloud, FiStar, FiX, FiEye } from "react-icons/fi";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
}

interface ReviewForm {
    author: string;
    rating: number;
    comment: string;
    is_verified: boolean;
    images: File[];
}

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discount_price: "",
        sales_count: "0",
        customer_count: "0",
        rating: "5.0",
        is_famous: false,
        categories: [] as number[],
        benefits: [{ title: "", detail: "" }],
    });

    const [reviews, setReviews] = useState<ReviewForm[]>([]);
    const [mediaFiles, setMediaFiles] = useState<{ file: File, type: string }[]>([]);
    
    // Preview State
    const [previewMedia, setPreviewMedia] = useState<{ url: string, type: string } | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`);
            const data = await res.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCategoryToggle = (id: number) => {
        setFormData(prev => {
            const alreadySelected = prev.categories.includes(id);
            if (!alreadySelected && prev.categories.length >= 2) return prev;
            return {
                ...prev,
                categories: alreadySelected ? prev.categories.filter(c => c !== id) : [...prev.categories, id]
            };
        });
    };

    const handleBenefitChange = (index: number, field: string, value: string) => {
        const newBenefits = [...formData.benefits];
        (newBenefits[index] as any)[field] = value;
        setFormData({ ...formData, benefits: newBenefits });
    };

    const addBenefit = () => {
        setFormData({ ...formData, benefits: [...formData.benefits, { title: "", detail: "" }] });
    };

    const removeBenefit = (index: number) => {
        setFormData({ ...formData, benefits: formData.benefits.filter((_, i) => i !== index) });
    };

    const addReview = () => {
        setReviews([...reviews, { author: "", rating: 5, comment: "", is_verified: true, images: [] }]);
    };

    const handleReviewChange = (index: number, field: string, value: any) => {
        const newReviews = [...reviews];
        let finalValue = value;
        if (field === 'rating' && isNaN(value)) {
            finalValue = 0;
        }
        (newReviews[index] as any)[field] = finalValue;
        setReviews(newReviews);
    };

    const handleReviewImageChange = (index: number, files: FileList | null) => {
        if (files) {
            const newReviews = [...reviews];
            newReviews[index].images = [...newReviews[index].images, ...Array.from(files)];
            setReviews(newReviews);
        }
    };

    const removeReviewImage = (reviewIdx: number, imgIdx: number) => {
        const newReviews = [...reviews];
        newReviews[reviewIdx].images = newReviews[reviewIdx].images.filter((_, i) => i !== imgIdx);
        setReviews(newReviews);
    };

    const removeReview = (index: number) => {
        setReviews(reviews.filter((_, i) => i !== index));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).map(file => ({
                file,
                type: file.type.startsWith('video') ? 'video' : 'image'
            }));
            setMediaFiles([...mediaFiles, ...files]);
        }
    };

    const removeMedia = (index: number) => {
        setMediaFiles(mediaFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        const token = localStorage.getItem("supplier_token");

        try {
            const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/products/`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify(formData)
            });

            const productData = await productRes.json();
            if (!productRes.ok) throw new Error(productData.detail || "Failed to create product");

            const productId = productData.id;

            for (const review of reviews) {
                const reviewRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/reviews/`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    },
                    body: JSON.stringify({ ...review, product: productId })
                });
                
                const reviewData = await reviewRes.json();
                if (reviewRes.ok && review.images.length > 0) {
                    for (const imgFile of review.images) {
                        const rImgData = new FormData();
                        rImgData.append("review", reviewData.id);
                        rImgData.append("file", imgFile);
                        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/review-images/`, {
                            method: "POST",
                            headers: { "Authorization": `Token ${token}` },
                            body: rImgData
                        });
                    }
                }
            }

            if (mediaFiles.length > 0) {
                for (let i = 0; i < mediaFiles.length; i++) {
                    const item = mediaFiles[i];
                    const mediaFormData = new FormData();
                    mediaFormData.append("product", productId);
                    mediaFormData.append("file", item.file);
                    mediaFormData.append("media_type", item.type);
                    if (i === 0) mediaFormData.append("is_primary", "true");

                    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/product-images/`, {
                        method: "POST",
                        headers: { "Authorization": `Token ${token}` },
                        body: mediaFormData
                    });
                }
            }

            setStatus({ type: 'success', message: "Product created successfully!" });
            setTimeout(() => router.push("/supplier/dashboard"), 1500);

        } catch (err: any) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-space-black text-white pb-24">
            <header className="border-b border-white/5 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/supplier/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                        <FiArrowLeft /> Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">New Product</h1>
                    <p className="text-white/40 text-sm">Add premium inventory & social proof</p>
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
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 pb-2 border-b border-white/5">Core Details</h3>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Name</label>
                                <input name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-14 px-4 text-sm outline-none focus:border-neon-purple/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Description</label>
                                <textarea name="description" required rows={5} value={formData.description} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-neon-purple/50 resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Price</label><input name="price" type="number" required value={formData.price} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-14 px-4 text-sm outline-none focus:border-neon-purple/50" /></div>
                                <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Discount</label><input name="discount_price" type="number" value={formData.discount_price} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl h-14 px-4 text-sm outline-none focus:border-neon-purple/50" /></div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Categories (Max 2)</h3>
                                <span className="text-[9px] font-bold text-neon-purple">{formData.categories.length}/2 Selected</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => {
                                    const isSelected = formData.categories.includes(cat.id);
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => handleCategoryToggle(cat.id)}
                                            className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border ${
                                                isSelected 
                                                ? 'bg-neon-purple border-neon-purple text-white shadow-lg shadow-neon-purple/20' 
                                                : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Social Proof (Reviews)</h3>
                                <button type="button" onClick={addReview} className="text-neon-purple text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                    <FiPlus /> Add Review
                                </button>
                            </div>
                            <div className="space-y-4">
                                {reviews.map((review, idx) => (
                                    <div key={idx} className="glass-card p-6 rounded-2xl border-white/5 space-y-4 relative">
                                        <button type="button" onClick={() => removeReview(idx)} className="absolute top-4 right-4 text-white/20 hover:text-glow-pink"><FiTrash2 size={14} /></button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input placeholder="Author" value={review.author} onChange={e => handleReviewChange(idx, 'author', e.target.value)} className="bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-xs outline-none" />
                                            <input type="number" min="1" max="5" value={review.rating || ""} onChange={e => handleReviewChange(idx, 'rating', parseInt(e.target.value))} className="bg-white/5 border border-white/10 rounded-lg h-10 px-3 text-xs outline-none" />
                                        </div>
                                        <textarea placeholder="Comment..." value={review.comment} onChange={e => handleReviewChange(idx, 'comment', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs resize-none outline-none" />
                                        
                                        {/* Review Images */}
                                        <div className="space-y-2">
                                            <label className="text-[8px] font-bold uppercase text-white/30 tracking-widest">Review Media</label>
                                            <div className="flex flex-wrap gap-2">
                                                {review.images.map((f, fidx) => (
                                                    <div key={fidx} className="w-12 h-12 rounded-lg overflow-hidden relative group cursor-pointer border border-white/10" onClick={() => setPreviewMedia({ url: URL.createObjectURL(f), type: 'image' })}>
                                                        <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt="rev new" />
                                                        <button type="button" onClick={(e) => { e.stopPropagation(); removeReviewImage(idx, fidx)}} className="absolute top-0 right-0 w-4 h-4 bg-black/60 flex items-center justify-center text-glow-pink transition-opacity"><FiX size={10} /></button>
                                                    </div>
                                                ))}
                                                <label className="w-12 h-12 rounded-lg border border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-neon-purple transition-colors">
                                                    <FiPlus size={14} className="text-white/20" />
                                                    <input type="file" hidden multiple accept="image/*" onChange={e => handleReviewImageChange(idx, e.target.files)} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-5 space-y-10">
                        <section className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 pb-2 border-b border-white/5">Media Gallery</h3>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {mediaFiles.map((f, i) => (
                                    <div key={i} className="aspect-square glass-card rounded-xl overflow-hidden relative group cursor-pointer border border-white/10" onClick={() => setPreviewMedia({ url: URL.createObjectURL(f.file), type: f.type })}>
                                        {f.type === 'video' ? (
                                            <video src={URL.createObjectURL(f.file)} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={URL.createObjectURL(f.file)} className="w-full h-full object-cover" alt="preview" />
                                        )}
                                        {f.type === 'video' && <div className="absolute inset-0 flex items-center justify-center bg-black/20"><FiVideo className="text-white/60" size={20} /></div>}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <FiEye className="text-white" />
                                        </div>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); removeMedia(i)}} className="absolute top-1 right-1 w-6 h-6 rounded-md bg-black/60 flex items-center justify-center text-glow-pink"><FiTrash2 size={12} /></button>
                                    </div>
                                ))}
                            </div>
                            <div className="relative h-40 border-2 border-dashed border-white/10 bg-white/5 rounded-[2rem] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-neon-purple/50 transition-all group">
                                <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <FiUploadCloud size={24} className="text-white/20 group-hover:text-neon-purple transition-colors" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white">Upload Media</p>
                            </div>
                        </section>

                        <button type="submit" disabled={loading} className="w-full h-16 bg-white text-black text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 disabled:opacity-50">
                            {loading ? "Publishing..." : "Save & Publish Product"}
                        </button>
                    </div>
                </form>
            </main>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewMedia && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            onClick={() => setPreviewMedia(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative max-w-4xl w-full aspect-[4/5] bg-white/5 rounded-[2rem] overflow-hidden border border-white/10"
                        >
                            {previewMedia.type === 'video' ? (
                                <video src={previewMedia.url} controls autoPlay className="w-full h-full object-contain" />
                            ) : (
                                <img src={previewMedia.url} className="w-full h-full object-contain" alt="Full preview" />
                            )}
                            <button onClick={() => setPreviewMedia(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                                <FiX size={24} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

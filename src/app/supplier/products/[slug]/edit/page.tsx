"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiSave, FiPlus, FiTrash2, FiImage, FiVideo, FiCheck, FiAlertCircle, FiUploadCloud, FiStar, FiX, FiEye } from "react-icons/fi";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
}

interface ExistingImage {
    id: number;
    file: string;
    media_type: string;
    is_primary: boolean;
}

interface ReviewImage {
    id: number;
    file: string;
}

interface ReviewForm {
    id?: number;
    author: string;
    rating: number;
    comment: string;
    is_verified: boolean;
    images: ReviewImage[];
    new_images: File[];
    images_to_delete: number[];
}

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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
        benefits: [{ title: "", detail: "" }]
    });

    const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
    const [newMediaFiles, setNewMediaFiles] = useState<{ file: File, type: string }[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
    
    const [reviews, setReviews] = useState<ReviewForm[]>([]);
    const [reviewsToDelete, setReviewsToDelete] = useState<number[]>([]);

    // Preview State
    const [previewMedia, setPreviewMedia] = useState<{ url: string, type: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("supplier_token");
        if (!token) {
            router.push("/supplier/login");
            return;
        }

        const fetchData = async () => {
            try {
                const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/`);
                setCategories(await catRes.json());

                const prodRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/products/${slug}/`, {
                    headers: { "Authorization": `Token ${token}` }
                });
                
                if (!prodRes.ok) throw new Error("Failed to fetch product");
                const data = await prodRes.json();
                
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    discount_price: data.discount_price || "",
                    sales_count: data.sales_count.toString(),
                    customer_count: data.customer_count.toString(),
                    rating: data.rating.toString(),
                    is_famous: data.is_famous,
                    categories: data.categories || [],
                    benefits: data.benefits && data.benefits.length > 0 ? data.benefits : [{ title: "", detail: "" }]
                });
                
                setExistingImages(data.images || []);
                
                // Process Reviews to include helper fields
                const processedReviews = (data.reviews || []).map((r: any) => ({
                    ...r,
                    new_images: [],
                    images_to_delete: []
                }));
                setReviews(processedReviews);
                
            } catch (err: any) {
                setStatus({ type: 'error', message: err.message });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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

    // Review Handlers
    const addReview = () => setReviews([...reviews, { author: "", rating: 5, comment: "", is_verified: true, images: [], new_images: [], images_to_delete: [] }]);
    
    const handleReviewChange = (index: number, field: string, value: any) => {
        const newReviews = [...reviews];
        let finalValue = value;
        if (field === 'rating' && isNaN(value)) {
            finalValue = 0;
        }
        (newReviews[index] as any)[field] = finalValue;
        setReviews(newReviews);
    };

    const handleReviewNewImageChange = (index: number, files: FileList | null) => {
        if (files) {
            const newReviews = [...reviews];
            newReviews[index].new_images = [...newReviews[index].new_images, ...Array.from(files)];
            setReviews(newReviews);
        }
    };

    const removeReviewExistingImage = (reviewIndex: number, imageId: number) => {
        const newReviews = [...reviews];
        newReviews[reviewIndex].images = newReviews[reviewIndex].images.filter(img => img.id !== imageId);
        newReviews[reviewIndex].images_to_delete.push(imageId);
        setReviews(newReviews);
    };

    const removeReviewNewImage = (reviewIndex: number, imageIdx: number) => {
        const newReviews = [...reviews];
        newReviews[reviewIndex].new_images = newReviews[reviewIndex].new_images.filter((_, i) => i !== imageIdx);
        setReviews(newReviews);
    };

    const removeReview = (index: number) => {
        const review = reviews[index];
        if (review.id) setReviewsToDelete([...reviewsToDelete, review.id]);
        setReviews(reviews.filter((_, i) => i !== index));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).map(file => ({ file, type: file.type.startsWith('video') ? 'video' : 'image' }));
            setNewMediaFiles([...newMediaFiles, ...files]);
        }
    };

    const removeNewMedia = (index: number) => {
        setNewMediaFiles(newMediaFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setStatus(null);
        const token = localStorage.getItem("supplier_token");

        try {
            // 1. Update Product
            const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/products/${slug}/`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` },
                body: JSON.stringify(formData)
            });
            const productData = await productRes.json();
            if (!productRes.ok) throw new Error(productData.detail || "Update failed");

            // 2. Manage Reviews
            for (const rId of reviewsToDelete) {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/reviews/${rId}/`, { method: "DELETE", headers: { "Authorization": `Token ${token}` } });
            }
            
            for (const review of reviews) {
                let currentReviewId = review.id;

                if (review.id) {
                    // Update existing review
                    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/reviews/${review.id}/`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` },
                        body: JSON.stringify({
                            author: review.author,
                            rating: review.rating,
                            comment: review.comment,
                            is_verified: review.is_verified
                        })
                    });

                    // Delete review images
                    for (const imgId of review.images_to_delete) {
                        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/review-images/${imgId}/`, { 
                            method: "DELETE", 
                            headers: { "Authorization": `Token ${token}` } 
                        });
                    }
                } else {
                    // Create new review
                    const rRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/reviews/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": `Token ${token}` },
                        body: JSON.stringify({ 
                            author: review.author,
                            rating: review.rating,
                            comment: review.comment,
                            is_verified: review.is_verified,
                            product: productData.id 
                        })
                    });
                    const rData = await rRes.json();
                    if (rRes.ok) {
                        currentReviewId = rData.id;
                    }
                }

                // Upload new review images (for both existing and new reviews)
                if (currentReviewId) {
                    for (const img of review.new_images) {
                        const fd = new FormData();
                        fd.append("review", currentReviewId.toString());
                        fd.append("file", img);
                        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/review-images/`, { 
                            method: "POST", 
                            headers: { "Authorization": `Token ${token}` }, 
                            body: fd 
                        });
                    }
                }
            }

            // 3. Media Management
            for (const imgId of imagesToDelete) {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/product-images/${imgId}/`, { method: "DELETE", headers: { "Authorization": `Token ${token}` } });
            }
            for (const item of newMediaFiles) {
                const fd = new FormData();
                fd.append("product", productData.id);
                fd.append("file", item.file);
                fd.append("media_type", item.type);
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/supplier/product-images/`, { method: "POST", headers: { "Authorization": `Token ${token}` }, body: fd });
            }

            setStatus({ type: 'success', message: "Product updated!" });
            setTimeout(() => router.push("/supplier/dashboard"), 1500);
        } catch (err: any) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-space-black flex items-center justify-center"><div className="w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-space-black text-white pb-24">
            <header className="h-20 border-b border-white/5 flex items-center px-6 sticky top-0 bg-space-black/80 backdrop-blur-xl z-30">
                <Link href="/supplier/dashboard" className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2"><FiArrowLeft /> Dashboard</Link>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-10">
                        {status && <div className={`p-4 rounded-xl text-xs font-bold ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-glow-pink/10 text-glow-pink'}`}>{status.message}</div>}
                        
                        <section className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/20 pb-2 border-b border-white/5">Core Info</h3>
                            <input name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 h-14 rounded-xl px-4 text-sm outline-none" placeholder="Name" />
                            <textarea name="description" rows={5} value={formData.description} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm resize-none outline-none" placeholder="Description" />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="price" type="number" value={formData.price} onChange={handleInputChange} className="bg-white/5 border border-white/10 h-12 rounded-xl px-4 text-sm outline-none" placeholder="Price" />
                                <input name="discount_price" type="number" value={formData.discount_price} onChange={handleInputChange} className="bg-white/5 border border-white/10 h-12 rounded-xl px-4 text-sm outline-none" placeholder="Discount" />
                            </div>
                        </section>
                        
                        <section className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                                <h3 className="text-xs font-black uppercase tracking-widest text-white/20">Categories (Max 2)</h3>
                                <span className="text-[10px] font-bold text-neon-purple">{formData.categories.length}/2 Selected</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => {
                                    const isSelected = formData.categories.includes(cat.id);
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => handleCategoryToggle(cat.id)}
                                            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                                                isSelected 
                                                ? 'bg-neon-purple border-neon-purple text-white' 
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
                                <h3 className="text-xs font-black uppercase tracking-widest text-white/20">Social Proof (Reviews)</h3>
                                <button type="button" onClick={addReview} className="text-neon-purple text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><FiPlus /> Add Review</button>
                            </div>
                            {reviews.map((r, i) => (
                                <div key={i} className="glass-card p-6 rounded-2xl border-white/5 space-y-4 relative">
                                    <button type="button" onClick={() => removeReview(i)} className="absolute top-4 right-4 text-white/20"><FiTrash2 size={14} /></button>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input placeholder="Author" value={r.author} onChange={e => handleReviewChange(i, 'author', e.target.value)} className="bg-white/5 border border-white/10 h-10 rounded-lg px-3 text-xs outline-none" />
                                        <input type="number" min="1" max="5" value={r.rating || ""} onChange={e => handleReviewChange(i, 'rating', parseInt(e.target.value))} className="bg-white/5 border border-white/10 h-10 rounded-lg px-3 text-xs outline-none" />
                                    </div>
                                    <textarea placeholder="Comment" value={r.comment} onChange={e => handleReviewChange(i, 'comment', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs resize-none outline-none" />
                                    
                                    {/* Review Images Update Section */}
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-bold uppercase text-white/30 tracking-widest">Review Media</label>
                                        <div className="flex flex-wrap gap-2">
                                            {/* Existing Review Images */}
                                            {r.images.map(img => (
                                                <div key={img.id} className="w-12 h-12 rounded-lg overflow-hidden relative group cursor-pointer" onClick={() => setPreviewMedia({ url: img.file, type: 'image' })}>
                                                    <img src={img.file} className="w-full h-full object-cover" alt="rev exist" />
                                                    <button type="button" onClick={(e) => { e.stopPropagation(); removeReviewExistingImage(i, img.id)}} className="absolute top-0 right-0 w-4 h-4 bg-black/60 flex items-center justify-center text-glow-pink opacity-0 group-hover:opacity-100 transition-opacity"><FiX size={10} /></button>
                                                </div>
                                            ))}
                                            {/* New Review Images */}
                                            {r.new_images.map((f, fidx) => (
                                                <div key={fidx} className="w-12 h-12 rounded-lg overflow-hidden relative group cursor-pointer border border-white/10" onClick={() => setPreviewMedia({ url: URL.createObjectURL(f), type: 'image' })}>
                                                    <img src={URL.createObjectURL(f)} className="w-full h-full object-cover opacity-60" alt="rev new" />
                                                    <button type="button" onClick={(e) => { e.stopPropagation(); removeReviewNewImage(i, fidx)}} className="absolute top-0 right-0 w-4 h-4 bg-black/60 flex items-center justify-center text-glow-pink"><FiX size={10} /></button>
                                                    <div className="absolute inset-0 flex items-center justify-center"><FiEye size={10} /></div>
                                                </div>
                                            ))}
                                            <label className="w-12 h-12 rounded-lg border border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-neon-purple transition-colors">
                                                <FiPlus size={14} className="text-white/20" />
                                                <input type="file" hidden multiple accept="image/*" onChange={e => handleReviewNewImageChange(i, e.target.files)} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>

                    <div className="lg:col-span-5 space-y-10">
                        <section className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/20 pb-2 border-b border-white/5">Product Media</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {existingImages.map(img => (
                                    <div key={img.id} className="aspect-square rounded-xl overflow-hidden relative group border border-white/5 bg-white/5 cursor-pointer" onClick={() => setPreviewMedia({ url: img.file, type: img.media_type })}>
                                        {img.media_type === 'video' ? (
                                            <video src={img.file} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={img.file} className="w-full h-full object-cover" alt="preview" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <FiEye className="text-white" />
                                        </div>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); setExistingImages(existingImages.filter(x => x.id !== img.id)); setImagesToDelete([...imagesToDelete, img.id])}} className="absolute top-1 right-1 w-6 h-6 rounded-md bg-black/60 flex items-center justify-center text-glow-pink"><FiTrash2 size={12} /></button>
                                    </div>
                                ))}
                                {newMediaFiles.map((f, i) => (
                                    <div key={i} className="aspect-square rounded-xl overflow-hidden relative group border border-white/5 bg-white/5 cursor-pointer" onClick={() => setPreviewMedia({ url: URL.createObjectURL(f.file), type: f.type })}>
                                        {f.type === 'video' ? (
                                            <video src={URL.createObjectURL(f.file)} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={URL.createObjectURL(f.file)} className="w-full h-full object-cover opacity-50" alt="new preview" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <FiEye className="text-white" />
                                        </div>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); removeNewMedia(i)}} className="absolute top-1 right-1 w-6 h-6 rounded-md bg-black/60 flex items-center justify-center text-glow-pink"><FiTrash2 size={12} /></button>
                                        <div className="absolute top-1 left-1 px-1 py-0.5 bg-white/10 text-[6px] font-black uppercase rounded">NEW</div>
                                    </div>
                                ))}
                            </div>
                            <div className="relative h-32 border-2 border-dashed border-white/10 bg-white/5 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-neon-purple/50 transition-all group">
                                <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <FiUploadCloud className="text-white/20 group-hover:text-neon-purple transition-colors" size={24} />
                                <p className="text-[10px] uppercase font-bold text-white/30 group-hover:text-white">Add Product Media</p>
                            </div>
                        </section>

                        <button type="submit" disabled={saving} className="w-full h-16 bg-white text-black text-xs font-black uppercase tracking-widest rounded-2xl active:scale-95 disabled:opacity-50 shadow-xl shadow-white/5 transition-all hover:shadow-neon-purple/10">
                            {saving ? "Updating..." : "Update Product"}
                        </button>
                    </div>
                </form>
            </main>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewMedia && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPreviewMedia(null)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative max-w-4xl w-full aspect-[4/5] bg-white/5 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                            {previewMedia.type === 'video' ? <video src={previewMedia.url} controls autoPlay className="w-full h-full object-contain" /> : <img src={previewMedia.url} className="w-full h-full object-contain" alt="Full preview" />}
                            <button onClick={() => setPreviewMedia(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"><FiX size={24} /></button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

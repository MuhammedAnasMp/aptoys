"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiCreditCard, FiTruck, FiShoppingBag, FiArrowRight, FiCheckCircle, FiAlertCircle, FiSearch, FiChevronDown, FiMapPin, FiShield } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import districtsData from "@/data/districts.json";

const allDistricts = districtsData.districts;
const uniqueStates = [...new Set(allDistricts.map(d => d.stateName))];

// --- Types ---
interface FormErrors {
    [key: string]: string;
}

interface FormState {
    full_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
}

// --- Helper Components (Defined outside to prevent re-mounting/focus loss) ---

const InputField = ({ label, name, value, onChange, onBlur, error, touched, type = "text", placeholder, isTextArea = false, prefix }: any) => (
    <div className="space-y-1.5">
        <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">{label}</label>
            <AnimatePresence>
                {touched && error && (
                    <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }} className="text-[9px] font-bold text-glow-pink flex items-center gap-1">
                        <FiAlertCircle className="flex-shrink-0" /> {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
        <div className="relative">
            {prefix && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-white/40 pointer-events-none">
                    {prefix}
                </div>
            )}
            {isTextArea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    rows={3}
                    className={`w-full bg-white/[0.03] border ${touched && error ? 'border-glow-pink/50' : 'border-white/10'} rounded-xl p-4 text-sm focus:border-neon-purple/50 outline-none transition-all placeholder:text-white/10 resize-none`}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-full bg-white/[0.03] border ${touched && error ? 'border-glow-pink/50' : 'border-white/10'} rounded-xl h-12 ${prefix ? 'pl-12 pr-4' : 'px-4'} text-sm focus:border-neon-purple/50 outline-none transition-all placeholder:text-white/10`}
                    placeholder={placeholder}
                />
            )}
        </div>
    </div>
);

const SelectField = ({ label, name, value, options, onChange, onBlur, error, touched, disabled, placeholder }: any) => (
    <div className="space-y-1.5">
        <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">{label}</label>
            {touched && error && <span className="text-[9px] font-bold text-glow-pink flex items-center gap-1"><FiAlertCircle /> {error}</span>}
        </div>
        <div className="relative">
            <select
                disabled={disabled}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full bg-[#090C12] border ${touched && error ? 'border-glow-pink/50' : 'border-white/10'} rounded-xl h-12 px-4 text-sm focus:border-neon-purple/50 outline-none transition-all appearance-none cursor-pointer text-white disabled:opacity-30 disabled:cursor-not-allowed`}
            >
                <option value="">{placeholder}</option>
                {options.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                <FiChevronDown size={16} />
            </div>
        </div>
    </div>
);

// --- Main Page Component ---

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormState>({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [showPincodeDropdown, setShowPincodeDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load Razorpay Script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);

        // Click Outside Listener
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowPincodeDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const validate = (name: string, value: string) => {
        if (!value) return "Required";
        if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
        if (name === "phone" && !/^[6-9]\d{9}$/.test(value)) return "Invalid 10-digit number";
        if (name === "pincode") {
            if (!/^[1-9][0-9]{5}$/.test(value)) return "Invalid 6-digit pin";
            
            // Validate pincode against selected state if state is present
            if (formData.state) {
                const pincodeVal = parseInt(value);
                const isValidForState = allDistricts.some(r => 
                    r.stateName === formData.state && pincodeVal >= parseInt(r.pincodeStart) && pincodeVal <= parseInt(r.pincodeEnd)
                );
                
                const stateHasData = allDistricts.some(r => r.stateName === formData.state);
                if (stateHasData && !isValidForState) {
                    return `Not valid for ${formData.state}`;
                }
            }
        }
        if (name === "full_name" && value.length < 3) return "Min 3 characters";
        if (name === "address" && value.length < 10) return "Provide more detail";
        return "";
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        
        // Strip non-numeric from phone
        if (name === "phone") {
            const numericValue = value.replace(/\D/g, "").slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        
        // Reset cascading fields if needed
        if (name === "state") {
            setFormData(prev => ({ ...prev, state: value, district: "", city: "", pincode: "" }));
        } else if (name === "district") {
            // User requested: dont auto fill City/Town when select district
            setFormData(prev => ({ ...prev, district: value, pincode: "" }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleBlur = (e: any) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handlePincodeSelect = (pin: string) => {
        const range = allDistricts.find(r => 
            parseInt(pin) >= parseInt(r.pincodeStart) && parseInt(pin) <= parseInt(r.pincodeEnd)
        );

        const updates: Partial<FormState> = { pincode: pin };
        if (range) {
            updates.state = range.stateName;
            updates.district = range.districtName;
            // Removed auto-city-fill per user request
        }

        setFormData(prev => ({ ...prev, ...updates }));
        setTouched(prev => ({ ...prev, pincode: true, state: true, district: true }));
        setErrors(prev => ({ ...prev, pincode: "", state: "", district: "" }));
        setShowPincodeDropdown(false);
    };

    const getPincodeSuggestions = () => {
        if (!formData.district) return [];
        const range = allDistricts.find(r => r.districtName === formData.district);
        if (!range) return [];
        
        const suggestions = [];
        const start = parseInt(range.pincodeStart);
        const end = parseInt(range.pincodeEnd);
        for(let i=0; i < 5; i++) {
            if (start + i <= end) {
                suggestions.push((start + i).toString());
            }
        }
        if (formData.pincode && formData.pincode.length >= 3) {
            return suggestions.filter(s => s.startsWith(formData.pincode));
        }
        return suggestions;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Final Validation
        const newErrors: FormErrors = {};
        const newTouched: any = {};
        Object.keys(formData).forEach(key => {
            const err = validate(key, (formData as any)[key]);
            if (err) newErrors[key] = err;
            newTouched[key] = true;
        });

        setErrors(newErrors);
        setTouched(newTouched);

        if (Object.keys(newErrors).length > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-order/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    phone: `+91${formData.phone}`, // Send with prefix
                    items_data: cart,
                    total_amount: cartTotal,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Order creation failed");

            const options = {
                key: data.key_id,
                amount: data.amount,
                currency: data.currency,
                name: "Adlply",
                description: "Premium Wellness Checkout",
                order_id: data.razorpay_order_id,
                handler: async (paymentResponse: any) => {
                    const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify-payment/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: data.razorpay_order_id,
                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_signature: paymentResponse.razorpay_signature,
                        }),
                    });

                    if (verifyRes.ok) {
                        clearCart();
                        router.push(`/order-success?order_id=${data.order_id}`);
                    } else {
                        alert("Verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: formData.full_name,
                    email: formData.email,
                    contact: `+91${formData.phone}`,
                },
                theme: { color: "#8B5CF6" },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/5">
                    <FiShoppingBag size={40} className="text-white/20" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Your Bag is Empty</h2>
                    <p className="text-white/40 text-sm font-medium">Add some premium tech to your life first.</p>
                </div>
                <button onClick={() => router.push('/shop')} className="px-8 h-12 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all">
                    Browse Shop
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* --- Left Column: Form --- */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[10px] font-black uppercase tracking-widest">
                            <FiShield size={12} /> Secure Checkout
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                            Shipping <span className="text-white/10">Information</span>
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section: Contact */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 pb-2 border-b border-white/5">Contact Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Full Name" name="full_name" value={formData.full_name} onChange={handleInputChange} onBlur={handleBlur} error={errors.full_name} touched={touched.full_name} placeholder="John Doe" />
                                <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} error={errors.email} touched={touched.email} placeholder="john@example.com" />
                            </div>
                            <InputField 
                                label="Phone Number" 
                                name="phone" 
                                type="tel" 
                                prefix="+91" 
                                value={formData.phone} 
                                onChange={handleInputChange} 
                                onBlur={handleBlur} 
                                error={errors.phone} 
                                touched={touched.phone} 
                                placeholder="9876543210" 
                            />
                        </div>

                        {/* Section: Shipping */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 pb-2 border-b border-white/5">Delivery Address</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectField 
                                    label="State" 
                                    name="state" 
                                    value={formData.state} 
                                    options={uniqueStates.sort()} 
                                    onChange={handleInputChange} 
                                    onBlur={handleBlur} 
                                    error={errors.state} 
                                    touched={touched.state} 
                                    placeholder="Select State" 
                                />
                                <SelectField 
                                    disabled={!formData.state} 
                                    label="District" 
                                    name="district" 
                                    value={formData.district} 
                                    options={formData.state ? allDistricts.filter(d => d.stateName === formData.state).map(d => d.districtName).sort() : []} 
                                    onChange={handleInputChange} 
                                    onBlur={handleBlur} 
                                    error={errors.district} 
                                    touched={touched.district} 
                                    placeholder="Select District" 
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="City/Town" name="city" value={formData.city} onChange={handleInputChange} onBlur={handleBlur} error={errors.city} touched={touched.city} placeholder="Enter City" />
                                
                                {/* Pincode with Dropdown */}
                                <div className="space-y-1.5 relative" ref={dropdownRef}>
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Pincode</label>
                                        <AnimatePresence>
                                            {touched.pincode && errors.pincode && (
                                                <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }} className="text-[9px] font-bold text-glow-pink flex items-center gap-1">
                                                    <FiAlertCircle /> {errors.pincode}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="relative">
                                        <input 
                                            name="pincode" 
                                            value={formData.pincode} 
                                            onChange={(e) => { handleInputChange(e); setShowPincodeDropdown(true); }} 
                                            onFocus={() => setShowPincodeDropdown(true)} 
                                            onBlur={handleBlur} 
                                            className={`w-full bg-white/[0.03] border ${touched.pincode && errors.pincode ? 'border-glow-pink/50' : 'border-white/10'} rounded-xl h-12 px-4 pr-10 text-sm focus:border-neon-purple/50 outline-none transition-all placeholder:text-white/10`} 
                                            placeholder="XXXXXX" 
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20"><FiSearch size={14} /></div>
                                    </div>
                                    <AnimatePresence>
                                        {showPincodeDropdown && getPincodeSuggestions().length > 0 && (
                                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-50 w-full mt-2 bg-[#0F141F] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                                                {getPincodeSuggestions().map(pin => (
                                                    <button key={pin} type="button" onClick={() => handlePincodeSelect(pin)} className="w-full text-left px-5 py-3.5 text-xs hover:bg-neon-purple/20 transition-colors border-b border-white/5 last:border-0 flex items-center justify-between group">
                                                        <span>{pin}</span>
                                                        <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <InputField label="Street Address" name="address" isTextArea value={formData.address} onChange={handleInputChange} onBlur={handleBlur} error={errors.address} touched={touched.address} placeholder="House/Flat No., Street, Landmark..." />
                        </div>

                        <button disabled={loading} className="w-full h-16 bg-white text-black text-[13px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-4 hover:bg-neon-purple hover:text-white transition-all shadow-xl active:scale-[0.98] disabled:opacity-50">
                            {loading ? "Initializing Razorpay..." : <><FiCreditCard size={18} /> Pay ₹{cartTotal} <FiArrowRight size={18} /></>}
                        </button>
                    </form>
                </div>

                {/* --- Right Column: Summary --- */}
                <div className="lg:col-span-12 xl:col-span-5 xl:sticky xl:top-24 space-y-8">
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-8">
                        <div className="flex items-center justify-between pb-6 border-b border-white/10">
                            <h2 className="text-sm font-black uppercase tracking-widest text-white/50">Order Summary</h2>
                            <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full text-white/40">{cart.length} ITEMS</span>
                        </div>

                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-5 items-center group">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 relative overflow-hidden flex-shrink-0 border border-white/5">
                                        {item.image && <Image src={item.image} alt={item.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-black uppercase tracking-tight truncate">{item.name}</h4>
                                        <p className="text-[10px] text-white/30 font-bold mt-1 uppercase tracking-widest">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm font-black">₹{item.price * item.quantity}</div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-8 border-t border-white/10">
                            <div className="flex justify-between text-[11px] font-bold text-white/30 uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-bold text-white/30 uppercase tracking-widest">
                                <span>Shipping</span>
                                <span className="text-neon-green">INCLUDED</span>
                            </div>
                            <div className="flex justify-between items-end pt-4">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">Total to Pay</p>
                                    <span className="text-xs font-black uppercase tracking-widest">Grand Total</span>
                                </div>
                                <span className="text-4xl font-black text-white tabular-nums tracking-tighter">₹{cartTotal}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-4">
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-neon-purple/10 flex items-center justify-center text-neon-purple flex-shrink-0"><FiCheckCircle size={20} /></div>
                            <div>
                                <h4 className="text-[11px] font-black uppercase tracking-wider">Discreet Shipping</h4>
                                <p className="text-[10px] text-white/40 mt-1 leading-relaxed">No brand names on packaging.</p>
                            </div>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 flex-shrink-0"><FiTruck size={20} /></div>
                            <div>
                                <h4 className="text-[11px] font-black uppercase tracking-wider">Fast Delivery</h4>
                                <p className="text-[10px] text-white/40 mt-1 leading-relaxed">Arrives in 3-5 business days.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShoppingCart, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight, FiCreditCard } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
    const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    const handleWhatsAppCheckout = async () => {
        const cartData = cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }));

        try {
            // 1. Store in backend for analysis
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart-inquiries/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items_data: cartData,
                    total_price: cartTotal
                })
            });
        } catch (error) {
            console.error("Error storing inquiry:", error);
        }

        // 2. Redirect to WhatsApp
        const itemText = cart.map(item => `${item.quantity}x ${item.name} (₹${item.price})`).join("%0A");
        const message = `Hi AdultPlayToys, I'd like to order:%0A%0A${itemText}%0A%0ATotal: ₹${cartTotal}%0A%0APlease let me know the next steps for payment and delivery.`;
        window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=${message}`, "_blank");
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0B0F19] border-l border-white/10 shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-neon-purple/10 rounded-lg text-neon-purple">
                                    <FiShoppingCart size={20} />
                                </div>
                                <h2 className="text-xl font-bold">Your Cart</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                                    <FiShoppingBag size={48} />
                                    <p className="text-sm font-bold uppercase tracking-[0.2em]">Your cart is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-xs text-neon-purple underline"
                                    >
                                        Start Exploring
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 relative border border-white/5">
                                            {item.image && item.image !== "" ? (
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/10 italic text-[8px]">
                                                    No Media
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-start justify-between">
                                                    <h3 className="text-sm font-bold line-clamp-1">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-white/20 hover:text-glow-pink transition-colors"
                                                    >
                                                        <FiTrash2 size={14} />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-white/40 mt-1">₹{item.price}</p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border border-white/10 rounded-lg bg-white/5 overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-white/10"
                                                    >
                                                        <FiMinus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-white/10"
                                                    >
                                                        <FiPlus size={12} />
                                                    </button>
                                                </div>
                                                <p className="text-sm font-bold ml-auto">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-8 border-t border-white/5 bg-white/5 space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Total Amount</span>
                                    <span className="text-2xl font-black">₹{cartTotal}</span>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        onClick={handleWhatsAppCheckout}
                                        className="flex items-center justify-center gap-3 h-14 w-full bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#25D366]/30 transition-all"
                                    >
                                        <FaWhatsapp size={20} /> Checkout via WhatsApp
                                    </button>
                                    <Link
                                        href="/checkout"
                                        onClick={() => setIsCartOpen(false)}
                                        className="flex items-center justify-center gap-3 h-14 w-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    >
                                        <FiCreditCard size={20} /> Pay Online Now <FiArrowRight />
                                    </Link>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-[10px] text-center text-white/20 uppercase tracking-[0.3em] font-bold hover:text-white transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

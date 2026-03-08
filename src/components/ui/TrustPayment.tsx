"use client";

import { motion } from "framer-motion";
import { FaCcVisa, FaCcMastercard, FaLock } from "react-icons/fa";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";
import { FiTrendingUp, FiMapPin, FiActivity, FiShoppingCart, FiZap, FiInfo, FiLock, FiShield, FiPackage, FiCheckCircle } from "react-icons/fi";

export default function TrustPayment() {
    const payments = [
        { icon: <FaCcVisa size={24} />, name: "Visa" },
        { icon: <FaCcMastercard size={24} />, name: "Mastercard" },
        { icon: <SiPhonepe size={24} />, name: "PhonePe" },
        { icon: <SiGooglepay size={24} />, name: "Google Pay" },
        { icon: <SiPaytm size={24} />, name: "Paytm" },
    ];
    const PAYMENT_METHODS = [
        { name: "UPI", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" },
        { name: "GPay", icon: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" },
        { name: "Paytm", icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" },
        { name: "PhonePe", icon: "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" },
        { name: "Mastercard", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
        { name: "Crypto", icon: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" }

    ];


    return (
        <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex items-center gap-2 mb-4 text-white/40">
                <FaLock size={12} className="text-electric-blue" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    100% Secure Checkout
                </span>
            </div>

            <section>
                <div className="glass-card bg-white/[0.01] border-white/5 relative overflow-hidden">
                    <div className="absolute -bottom-4 -right-4 text-white/5 rotate-12">
                        <FiLock size={160} />
                    </div>

                    {/* ONE LINE */}
                    <div className="flex items-center p-3 gap-4 relative z-10 overflow-x-auto">
                        {PAYMENT_METHODS.map((pay) => (
                            <div
                                key={pay.name}
                                className="flex items-center justify-center p-4 rounded-xl bg-white/[0.03] border border-white/5 min-w-[80px]"
                            >
                                <img
                                    src={pay.icon}
                                    alt={pay.name}
                                    className="h-6 opacity-100 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                                />
                            </div>
                        ))}
                    </div>

                    <p className="px-3 text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] leading-loose">
                        End-to-End Encryption. No bank statement will ever mention our brand
                        or product names. Total Anonymity.
                    </p>
                </div>
            </section>
        </div>
    );
}

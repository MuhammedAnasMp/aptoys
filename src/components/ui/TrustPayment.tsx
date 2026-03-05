"use client";

import { motion } from "framer-motion";
import { FaCcVisa, FaCcMastercard, FaLock } from "react-icons/fa";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";

export default function TrustPayment() {
    const payments = [
        { icon: <FaCcVisa size={24} />, name: "Visa" },
        { icon: <FaCcMastercard size={24} />, name: "Mastercard" },
        { icon: <SiPhonepe size={24} />, name: "PhonePe" },
        { icon: <SiGooglepay size={24} />, name: "Google Pay" },
        { icon: <SiPaytm size={24} />, name: "Paytm" },
    ];

    return (
        <div className="mt-8 pt-8 border-t border-white/5">
            <div className="flex items-center gap-2 mb-4 text-white/40">
                <FaLock size={12} className="text-electric-blue" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">100% Secure Checkout</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {payments.map((payment, index) => (
                    <div
                        key={index}
                        className="text-white hover:text-white transition-colors"
                        title={payment.name}
                    >
                        {payment.icon}
                    </div>
                ))}
            </div>

            <p className="mt-4 text-[9px] text-white/20 uppercase tracking-widest font-medium">
                Guaranteed safe & secure checkout via trusted Indian partners
            </p>
        </div>
    );
}

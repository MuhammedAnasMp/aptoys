import { FiShield, FiTruck, FiHelpCircle, FiCreditCard } from "react-icons/fi";
import React from "react";

export interface FAQQuestion {
    q: string;
    a: string;
}

export interface FAQCategory {
    category: string;
    icon: React.ReactNode;
    questions: FAQQuestion[];
}

export const faqData: FAQCategory[] = [
    {
        category: "Shipping & Delivery",
        icon: React.createElement(FiTruck, { className: "text-electric-blue" }),
        questions: [
            { q: "Is the delivery discreet?", a: "Absolutely. All orders are shipped in plain, unmarked brown boxes with no mention of 'Adlply' or the contents on the exterior. The sender name will be a generic corporate entity to ensure total privacy." },
            { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days depending on your location. Express shipping is available for major metropolitan areas (1-2 business days)." },
            { q: "Can I track my order?", a: "Yes, once your order is dispatched, you will receive a tracking link via email and SMS to monitor your shipment in real-time." }
        ]
    },
    {
        category: "Products & Safety",
        icon: React.createElement(FiShield, { className: "text-green-500" }),
        questions: [
            { q: "How do I clean my products?", a: "We recommend using a specialized toy cleaner or mild, scent-free soap and warm water. Ensure the device is fully dry before storing in a cool, dark place to maintain material integrity." },
            { q: "Are the materials body-safe?", a: "Yes. Every product we stock is made from premium, body-safe, hypoallergenic materials like medical-grade silicone, borosilicate glass, or phthalate-free TPE." },
            { q: "What is the warranty policy?", a: "Most of our high-end devices come with a 1-year manufacturer warranty. Please check the specific product page for individual warranty durations." }
        ]
    },
    {
        category: "Privacy & Security",
        icon: React.createElement(FiHelpCircle, { className: "text-neon-purple" }),
        questions: [
            { q: "How is my data stored?", a: "We use military-grade encryption to protect your personal information. We never sell your data to third parties and follow strict GDPR/CCPA guidelines." },
            { q: "Will 'Adlply' show up on my bank statement?", a: "No. To maintain your privacy, the billing name on your statement will appear as a discreet corporate name, not 'Adlply'." }
        ]
    },
    {
        category: "Orders & Payments",
        icon: React.createElement(FiCreditCard, { className: "text-yellow-500" }),
        questions: [
            { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, Net Banking, and select digital wallets. All transactions are processed through secure, encrypted gateways." },
            { q: "Can I cancel my order?", a: "Orders can be cancelled within 2 hours of placement, provided they haven't been dispatched. Contact our support team immediately for cancellation requests." }
        ]
    }
];

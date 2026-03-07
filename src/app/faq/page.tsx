import { faqData } from "@/constants/faq";
import FAQClient from "./FAQClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Intelligence Hub | Adlply Support & FAQ",
    description: "Everything you need to know about discreet shipping, secure payments, and premium product safety at Adlply. Your hub for private wellness intelligence.",
    openGraph: {
        title: "Adlply Intelligence Hub | FAQ",
        description: "Your discreet guide to premium wellness, privacy, and secure delivery.",
        type: "website",
    }
};

export default function FAQPage() {
    return (
        <div className="min-h-screen py-10 px-6 relative overflow-hidden">
            {/* Background elements for premium feel */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full -z-10" />

            <FAQClient />

            {/* SEO Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqData.flatMap((cat: any) => cat.questions.map((q: any) => ({
                            "@type": "Question",
                            "name": q.q,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": q.a
                            }
                        })))
                    })
                }}
            />
        </div>
    );
}

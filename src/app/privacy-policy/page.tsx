import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | AdultPlayToys - Discreet & Secure Wellness",
    description: "Your privacy is our priority. Learn about our discreet packaging, secure billing, and how we protect your intimate wellness data at AdultPlayToys.",
    keywords: "discreet delivery, anonymous billing, secure adult toys, privacy policy adult wellness, data protection intimacy",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-space-black py-24 px-6 md:px-12 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-neon-purple/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-electric-blue/5 blur-[120px] rounded-full" />

            <div className="max-w-4xl mx-auto relative z-10">
                <span className="text-neon-purple text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Trust & Discretion</span>
                <h1 className="text-4xl md:text-7xl font-black mb-12 tracking-tighter">Privacy Policy</h1>

                <div className="prose prose-invert max-w-none space-y-12 text-white/60">
                    <section className="glass-card p-8 md:p-12 bg-white/[0.02]">
                        <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center text-neon-purple text-sm">01</span>
                            The Golden Rule: Total Discretion
                        </h2>
                        <p className="leading-relaxed">
                            At AdultPlayToys, we understand that your personal choices in wellness are just that—personal. Our entire business model is built around the concept of "Intelligent Discretion." We don't just ship products; we ship confidence.
                        </p>
                        <ul className="space-y-4 mt-6 list-none p-0">
                            <li className="flex gap-4">
                                <span className="text-electric-blue font-bold">●</span>
                                <span><strong className="text-white">Anonymous Packaging:</strong> Every order is shipped in plain, brown cardboard boxes with no branding, logos, or mention of "AdultPlayToys" or the contents.</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-electric-blue font-bold">●</span>
                                <span><strong className="text-white">Generic Billing:</strong> 'AdultPlayToys' will never appear on your credit card or bank statement. Charges will appear under a generic management name.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-electric-blue/20 flex items-center justify-center text-electric-blue text-sm">02</span>
                            Data We Collect (And Why)
                        </h2>
                        <p>
                            We collect only the essential data required to provide a premium service and ensure your technology functions perfectly.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                                <h4 className="text-white font-bold mb-2">Account Discovery</h4>
                                <p className="text-sm">Name, email, and preferences to curate your wellness journey and provide private updates.</p>
                            </div>
                            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                                <h4 className="text-white font-bold mb-2">Technical Logs</h4>
                                <p className="text-sm">Anonymous usage data to improve firmware stability and app-controlled device performance.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-glow-pink/20 flex items-center justify-center text-glow-pink text-sm">03</span>
                            Your Biotech Security
                        </h2>
                        <p>
                            We use bank-level AES-256 encryption for all data storage. Your intimate preferences are treated with the same level of security as a sovereign wealth fund's data.
                        </p>
                        <p>
                            AdultPlayToys <strong className="text-white italic">never</strong> sells, rents, or shares your personal identity with third-party marketing firms. Your secrets are encrypted in our private cloud.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/40 text-sm">04</span>
                            Cookies & Tracking
                        </h2>
                        <p>
                            We use essential cookies to keep you signed in to your private dashboard. We also use anonymous analytics to understand which of our innovations are resonating with the community. You can opt-out of non-essential cookies via your browser settings any time.
                        </p>
                    </section>

                    <div className="pt-12 border-t border-white/5 text-center">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Last Updated: March 2026</p>
                        <p className="mt-4 text-xs">Questions about your privacy? Contact our Lead Protector at <span className="text-neon-purple underline cursor-pointer">privacy@adultplaytoys.in</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

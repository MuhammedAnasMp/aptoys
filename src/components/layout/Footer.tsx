import Link from "next/link";
import { FaInstagram, FaFacebook, FaGlobe } from "react-icons/fa";
import WhatsAppCTA from "./WhatsAppCTA";

export default function Footer() {
    return (
        <footer className="bg-[#04060B] py-16 px-6 border-t border-white/5 pb-32 md:pb-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-tr from-neon-purple to-electric-blue rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <span className="text-lg font-bold tracking-tighter text-white">AdultPlay<span className="text-neon-purple">Toys</span></span>
                    </Link>
                    <p className="text-white/40 text-sm leading-relaxed mb-6">
                        Future Wellness. Private. Premium. Next-generation wellness tech brand for the modern explorer.
                    </p>
                    <div className="flex gap-4">
                        <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"} className="w-10 h-10 glass-card flex items-center justify-center hover:text-neon-purple transition-colors">
                            <FaInstagram size={18} />
                        </Link>
                        <Link href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "#"} className="w-10 h-10 glass-card flex items-center justify-center hover:text-neon-purple transition-colors">
                            <FaFacebook size={18} />
                        </Link>
                        <Link href={process.env.NEXT_PUBLIC_GLOBE_URL || "#"} className="w-10 h-10 glass-card flex items-center justify-center hover:text-neon-purple transition-colors">
                            <FaGlobe size={18} />
                        </Link>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Shop</h4>
                    <ul className="space-y-4">
                        {["New Arrivals", "Trending", "Famous Products", "Categories", "Sale"].map(link => (
                            <li key={link}><Link href="/shop" className="text-white/50 hover:text-neon-purple text-sm transition-colors">{link}</Link></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
                    <ul className="space-y-4">
                        <li><Link href="/philosophy" className="text-white/50 hover:text-neon-purple text-sm transition-colors">Philosophy</Link></li>
                        {["Wellness Guide", "Blog", "Community", "FAQ", "Privacy Policy"].map(link => (
                            <li key={link}><Link href={link === "Blog" ? "/blog" : link === "FAQ" ? "/faq" : link === "Community" ? "/community" : "#"} className="text-white/50 hover:text-neon-purple text-sm transition-colors">{link}</Link></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
                    <p className="text-white/50 text-sm mb-4">Discreet Delivery Guaranteed.</p>
                    <p className="text-white/50 text-sm mb-6">Available 24/7 for wellness enquiries.</p>
                    <div className="max-w-[160px] h-11">
                        <WhatsAppCTA variant="inline" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/30 text-[10px] uppercase tracking-widest">© 2026 AdultPlayToys.in. All Rights Reserved.</p>
                <div className="flex gap-6">
                    <Link href="#" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="#" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}

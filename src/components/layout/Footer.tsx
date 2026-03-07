import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaGlobe } from "react-icons/fa";
import WhatsAppCTA from "./WhatsAppCTA";

export default function Footer() {
    return (
        <footer className="bg-[#04060B] py-16 px-6 border-t border-white/5 pb-32 md:pb-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 mb-6 group">
                        <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                            <Image
                                src="/logo.png"
                                alt="AdultPlayToys Logo"
                                fill
                                className="object-contain p-0.5"
                            />
                        </div>
                        {/* :TODO uncomment after logo is ready <span className="text-lg font-bold tracking-tighter text-white group-hover:text-neon-purple transition-colors">AdultPlay<span className="text-neon-purple">Toys</span></span> */}
                    </Link>
                    <p className="text-white/40 text-sm leading-relaxed mb-10 pr-4">
                        Premium wellness technology, delivered with 100% discretion. Directly imported globally to ensure the fairest price points in India.
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
                            <li key={link}><Link href={link === "Blog" ? "/blog" : link === "FAQ" ? "/faq" : link === "Community" ? "/community" : link === "Privacy Policy" ? "/privacy-policy" : link === "Wellness Guide" ? "/wellness-guide" : "#"} className="text-white/50 hover:text-neon-purple text-sm transition-colors">{link}</Link></li>
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
                {/* :TODO uncomment after logo is ready <p className="text-white/30 text-[10px] uppercase tracking-widest">© 2026 AdultPlayToys.in. All Rights Reserved.</p> */}
                <div className="flex gap-6">
                    <Link href="#" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="/privacy-policy" className="text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}

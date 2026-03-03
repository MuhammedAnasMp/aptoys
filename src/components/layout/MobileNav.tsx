"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiGrid, FiBookOpen, FiUsers, FiMenu } from "react-icons/fi";

export default function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", icon: FiHome, path: "/" },
        { name: "Shop", icon: FiGrid, path: "/shop" },
        { name: "Blog", icon: FiBookOpen, path: "/blog" },
        { name: "Community", icon: FiUsers, path: "/community" },
    ];

    return (
        <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
            <div className="glass-card h-16 flex items-center justify-around px-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-white/20">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isActive ? "text-neon-purple scale-110" : "text-white/50"}`}
                        >
                            <item.icon size={20} className={isActive ? "drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" : ""} />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    );
                })}
                <button className="flex flex-col items-center justify-center gap-1 text-white/50">
                    <FiMenu size={20} />
                    <span className="text-[10px] font-medium">Menu</span>
                </button>
            </div>
        </div>
    );
}

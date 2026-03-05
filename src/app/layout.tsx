import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import WhatsAppCTA from "@/components/layout/WhatsAppCTA";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/layout/CartDrawer";
import AnalyticsTracker from "@/components/layout/AnalyticsTracker";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  // title: "AdultPlayToys.in | Private. Premium. Future Wellness.",
  // description: "Next-generation private wellness tech brand. Discreet delivery guaranteed.",
  // keywords: ["wellness", "premium toys", "discreet delivery", "future wellness"],


  title: "sample title",
  description: "sample description",
  keywords: ["sample keywords"],
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-outfit antialiased bg-space-black text-white`}
      >
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <AnalyticsTracker />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <WhatsAppCTA />
        </CartProvider>
      </body>
    </html>
  );
}

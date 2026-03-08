import { Metadata } from "next";
import ShopClient from "./ShopClient";
import { Suspense } from "react";
export const metadata: Metadata = {
    title: "Shop Premium Wellness Tech",
    description: "Explore our curated collection of luxury adult wellness tech. From app-controlled devices to body-safe silicone essentials, all with confidential shipping across India. Discover biotech-engineered pleasure.",
    keywords: ["premium wellness products", "luxury adult tech", "app controlled toys", "body safe wellness India", "discreet delivery wellness toys", "biotech wellness devices"],
    openGraph: {
        title: "Shop Premium Wellness Tech | Adlply",
        description: "Future-forward wellness products with confidential shipping across India.",
        type: "website",
    }
};

export default function ShopPage() {
    <Suspense fallback={<div>Loading...</div>}>

        return <ShopClient />;
    </Suspense>
}

'use client';

import { useEffect, Suspense, useRef } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function AnalyticsContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const hasLoggedReferral = useRef<string | null>(null);

    useEffect(() => {
        // 1. Log General Site Visit
        const logVisit = async () => {
            try {
                await fetch('http://localhost:8001/api/site-visits/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''),
                        referrer: document.referrer || 'Direct',
                    }),
                });
            } catch (error) {
                console.error('Analytics error:', error);
            }
        };

        // 2. Handle Referral Tracking (?from=somecode)
        const handleReferral = async () => {
            const referralCode = searchParams.get('from');
            if (referralCode && hasLoggedReferral.current !== referralCode) {
                // Prevent duplicate logs for the same code in this session/render
                hasLoggedReferral.current = referralCode;

                try {
                    // Extract product slug if on a product page
                    let productSlug = null;
                    if (pathname.startsWith('/products/')) {
                        productSlug = pathname.split('/products/')[1];
                    } else if (pathname.startsWith('/bundles/')) {
                        productSlug = pathname.split('/bundles/')[1];
                    }

                    await fetch('http://localhost:8001/api/referral-visits/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            referral_code: referralCode,
                            full_path: pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''),
                            product_slug: productSlug
                        }),
                    });

                    // 3. Clean up URL without reload
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('from');
                    const newQueryString = params.toString();
                    const newUrl = pathname + (newQueryString ? `?${newQueryString}` : '');

                    window.history.replaceState(null, '', newUrl);
                } catch (error) {
                    console.error('Referral tracking error:', error);
                }
            }
        };

        logVisit();
        handleReferral();
    }, [pathname, searchParams]);

    return null;
}

export default function AnalyticsTracker() {
    return (
        <Suspense fallback={null}>
            <AnalyticsContent />
        </Suspense>
    );
}

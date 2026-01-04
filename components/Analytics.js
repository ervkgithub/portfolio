import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { pageview } from '../utils/analytics';

export default function Analytics() {
  const router = useRouter();
  const GA_MEASUREMENT_ID =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    process.env.NEXT_PUBLIC_GA_ID ||
    'G-SP3KYDLGPD';

  const isEnabled = process.env.NODE_ENV === 'production' && !!GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!isEnabled) return;

    const handleRouteChange = (url) => {
      pageview(url);
    };
    
    // Track page views on route change
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Track the first pageview
    if (typeof window !== 'undefined') {
      pageview(window.location.pathname);
    }
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          `,
        }}
      />
    </>
  );
}

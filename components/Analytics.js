import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { pageview } from '../utils/analytics';

export default function Analytics() {
  const router = useRouter();
  const GA_MEASUREMENT_ID = 'G-SP3KYDLGPD';

  useEffect(() => {
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
  }, [router.events]);

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}

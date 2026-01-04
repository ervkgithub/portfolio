import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import DefaultLayout from '../components/layout/DefaultLayout';
import UseScrollToTop from '../hooks/useScrollToTop';

const Analytics = dynamic(() => import('../components/Analytics'), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence>
      <div className="bg-secondary-light dark:bg-primary-dark transition duration-300">
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
        <UseScrollToTop />
        <Analytics />
      </div>
    </AnimatePresence>
  );
}

export default MyApp;
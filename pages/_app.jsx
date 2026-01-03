import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';
import DefaultLayout from '../components/layout/DefaultLayout';
import UseScrollToTop from '../hooks/useScrollToTop';
import Analytics from '../components/Analytics';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AnimatePresence>
        <div className="bg-secondary-light dark:bg-primary-dark transition duration-300">
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
          <UseScrollToTop />
          <Analytics />
        </div>
      </AnimatePresence>
    </SessionProvider>
  );
}

export default MyApp;
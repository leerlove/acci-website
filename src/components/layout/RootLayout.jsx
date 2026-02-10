import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
        본문으로 건너뛰기
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;

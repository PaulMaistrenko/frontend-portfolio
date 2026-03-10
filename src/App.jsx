import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.scss';
import { Header } from './components/Header';
import { About } from './pages/About/About';
import { Projects } from './pages/Projects';
import { Contacts } from './pages/Contacts';
import { Footer } from './components/Footer';
import { FooterMobile } from './components/FooterMobile';
import { useMainContext } from './context/MainContext';
import { useEffect, useState } from 'react';
import SpotlightOverlay from './components/SpotlightOverlay/SpotlightOverlay';

export const App = () => {
  const { currentPage } = useMainContext();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="app-container">
      {isMobile ? (
        <div className="mobile__content">
          <AnimatePresence mode="wait">
            <div key={location.pathname}>
              <Outlet />
            </div>
          </AnimatePresence>

          {currentPage !== 'home' && <FooterMobile />}
        </div>
      ) : (
        <div className="desktop__content">
          <SpotlightOverlay />
          <Header />
          <About />
          <Projects />
          <Contacts />
          <Footer />
        </div>
      )}
    </div>
  );
};

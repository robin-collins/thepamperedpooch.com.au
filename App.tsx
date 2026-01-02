import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation, { smoothScrollTo } from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy, { PrivacyPolicyContent } from './components/PrivacyPolicy';
import TermsOfService, { TermsOfServiceContent } from './components/TermsOfService';
import { ConfigProvider } from './ConfigContext';
import { ModalProvider, useModal } from './components/ModalContext';
import Modal from './components/Modal';

const ScrollToHandler = () => {
  const { hash, pathname } = useLocation();

  React.useEffect(() => {
    if (hash && pathname === '/') {
      // Small delay to ensure content is rendered
      const timer = setTimeout(() => {
        smoothScrollTo(hash);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [hash, pathname]);

  return null;
};

const Home = () => (
  <main>
    <Hero />
    <Services />
    <About />
    <Testimonials />
    <Contact />
  </main>
);

const GlobalModals = () => {
  const { activeModal, closeModal } = useModal();
  return (
    <>
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </Modal>
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title="Terms of Service"
      >
        <TermsOfServiceContent />
      </Modal>
    </>
  );
};

function App() {
  return (
    <ConfigProvider>
      <ModalProvider>
        <div className="min-h-screen">
          <ScrollToHandler />
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
          <Footer />
          <GlobalModals />
        </div>
      </ModalProvider>
    </ConfigProvider>
  );
}

export default App;
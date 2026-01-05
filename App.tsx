
import React, { useState, useEffect } from 'react';
import { Section, User, Language } from './types.ts';
import { translations } from './translations.ts';
import { GirihPattern, IslimiyDivider } from './components/PatternBackground.tsx';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Heritage from './components/Heritage.tsx';
import Venue from './components/Venue.tsx';
import Tourism from './components/Tourism.tsx';
import Logistics from './components/Logistics.tsx';
import Program from './components/Program.tsx';
import About from './components/About.tsx';
import Tracks from './components/Tracks.tsx';
import Speakers from './components/Speakers.tsx';
import RegistrationForm from './components/RegistrationForm.tsx';
import LoginForm from './components/LoginForm.tsx';
import PersonalCabinet from './components/PersonalCabinet.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import SymposiumArchive from './components/SymposiumArchive.tsx';
import Footer from './components/Footer.tsx';
import VirtualTourModal from './components/VirtualTourModal.tsx';
import RegionDetailedHistory from './components/RegionDetailedHistory.tsx';
import AIChatAssistant from './components/AIChatAssistant.tsx';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [language, setLanguage] = useState<Language>('uz');
  
  // Robust translation helper
  const t = (key: string): any => {
    const langData = (translations as any)[language];
    const uzData = (translations as any).uz;
    
    if (langData && langData[key] !== undefined) {
      return langData[key];
    }
    return uzData[key] || key;
  };

  const [tourData, setTourData] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: '',
    url: ''
  });

  const handleLogin = (userData: User) => {
    if (userData.email === 'admin@navoiy-uni.uz') {
      userData.role = 'admin';
    }
    setUser(userData);
    setIsRegistering(false);
    setIsLoggingIn(false);
    setActiveSection(userData.role === 'admin' ? Section.ADMIN : Section.CABINET);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggingIn(false);
    setIsRegistering(false);
    setActiveSection(Section.HOME);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTour = (title: string, url: string) => {
    setTourData({ isOpen: true, title, url });
  };

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    setIsRegistering(false);
    setIsLoggingIn(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (isRegistering) return <RegistrationForm onComplete={handleLogin} onCancel={() => setIsRegistering(false)} language={language} />;
    if (isLoggingIn) return <LoginForm onComplete={handleLogin} onCancel={() => setIsLoggingIn(false)} onSwitchToRegister={() => { setIsLoggingIn(false); setIsRegistering(true); }} language={language} />;

    switch (activeSection) {
      case Section.ADMIN:
        return user?.role === 'admin' ? <AdminPanel currentUser={user} language={language} t={t} /> : <div className="min-h-screen flex items-center justify-center font-serif-classic text-2xl italic">Unauthorized</div>;
      case Section.CABINET:
        return user ? <PersonalCabinet user={user} onLogout={handleLogout} language={language} t={t} /> : (
          <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50/30">
            <div className="glass-card p-12 rounded-[3rem] text-center border-amber-300 shadow-2xl max-w-md">
              <h2 className="text-4xl font-classic mb-6 text-slate-800">{t('nav_cabinet')}</h2>
              <p className="text-slate-600 font-serif-classic text-2xl mb-10 leading-relaxed italic">{t('footer_text')}</p>
              <div className="space-y-4">
                <button onClick={() => setIsLoggingIn(true)} className="w-full px-8 py-5 royal-gradient text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition-all text-xl">{t('nav_login')}</button>
                <button onClick={() => setIsRegistering(true)} className="w-full px-8 py-5 gold-gradient text-slate-900 font-bold rounded-2xl shadow-lg hover:opacity-90 transition-all text-xl">{t('nav_register')}</button>
              </div>
            </div>
          </div>
        );
      case Section.ABOUT: return <About language={language} fullPage />;
      case Section.PROGRAM: return <Program language={language} fullPage />;
      case Section.TRACKS: return <Tracks language={language} fullPage />;
      case Section.SPEAKERS: return <Speakers language={language} fullPage />;
      case Section.LOGISTICS: return (
        <div className="pt-24 bg-slate-50/30">
          <Tourism onOpenTour={openTour} language={language} />
          <Logistics language={language} />
        </div>
      );
      case Section.ARCHIVE: return <SymposiumArchive language={language} fullPage />;
      default:
        return (
          <>
            <Hero onRegister={() => setIsRegistering(true)} onLearnMore={() => handleSectionChange(Section.PROGRAM)} language={language} t={t} />
            <Heritage language={language} />
            <About language={language} />
            <RegionDetailedHistory language={language} />
            <Program language={language} />
            <Venue onOpenTour={openTour} language={language} />
            <Tourism onOpenTour={openTour} language={language} />
            <Logistics language={language} />
            <Speakers language={language} />
            <Tracks language={language} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col overflow-x-hidden selection:bg-amber-200 selection:text-amber-900">
      <GirihPattern />
      <Header 
        activeSection={activeSection} 
        setActiveSection={handleSectionChange} 
        isLoggedIn={!!user}
        setIsRegistering={setIsRegistering}
        setIsLoggingIn={setIsLoggingIn}
        language={language}
        setLanguage={setLanguage}
      />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection + (isRegistering ? '-reg' : '') + (isLoggingIn ? '-log' : '') + language}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer language={language} t={t} />
      <VirtualTourModal 
        isOpen={tourData.isOpen} 
        onClose={() => setTourData({ ...tourData, isOpen: false })}
        title={tourData.title}
        tourUrl={tourData.url}
      />
      <AIChatAssistant language={language} />
    </div>
  );
};

export default App;

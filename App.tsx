
import React, { useState, useEffect } from 'react';
import { Section, User, Language } from './types';
import { translations } from './translations';
import { GirihPattern, IslimiyDivider } from './components/PatternBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import Heritage from './components/Heritage';
import Venue from './components/Venue';
import Tourism from './components/Tourism';
import Logistics from './components/Logistics';
import Program from './components/Program';
import About from './components/About';
import Tracks from './components/Tracks';
import Speakers from './components/Speakers';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import PersonalCabinet from './components/PersonalCabinet';
import AdminPanel from './components/AdminPanel';
import SymposiumArchive from './components/SymposiumArchive';
import Footer from './components/Footer';
import VirtualTourModal from './components/VirtualTourModal';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [language, setLanguage] = useState<Language>('uz');
  
  const t = (key: any): string => {
    const value = (translations[language] as any)[key] || (translations.uz as any)[key];
    return (typeof value === 'string' ? value : String(key));
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
    
    if (userData.role === 'admin') {
      setActiveSection(Section.ADMIN);
    } else {
      setActiveSection(Section.CABINET);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSection(Section.HOME);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTour = (title: string, url: string) => {
    setTourData({ isOpen: true, title, url });
  };

  const sectionToId = (section: Section): string | null => {
    switch (section) {
      case Section.HOME: return 'hero';
      case Section.ABOUT: return 'about';
      case Section.PROGRAM: return 'program';
      case Section.TRACKS: return 'tracks';
      case Section.SPEAKERS: return 'speakers';
      case Section.LOGISTICS: return 'logistics';
      case Section.ARCHIVE: return 'archive';
      default: return null;
    }
  };

  const handleSectionChange = (section: Section) => {
    const targetId = sectionToId(section);
    
    if (section === Section.CABINET || section === Section.ADMIN) {
      setIsRegistering(false);
      setIsLoggingIn(false);
      setActiveSection(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId) {
      if (activeSection !== Section.HOME || isRegistering || isLoggingIn) {
        setIsRegistering(false);
        setIsLoggingIn(false);
        setActiveSection(Section.HOME);
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActiveSection(section);
      setIsRegistering(false);
      setIsLoggingIn(false);
    }
  };

  const renderContent = () => {
    if (isRegistering) {
      return (
        <RegistrationForm 
          onComplete={handleLogin} 
          onCancel={() => setIsRegistering(false)} 
          language={language} 
        />
      );
    }

    if (isLoggingIn) {
      return (
        <LoginForm 
          onComplete={handleLogin} 
          onCancel={() => setIsLoggingIn(false)} 
          onSwitchToRegister={() => { setIsLoggingIn(false); setIsRegistering(true); }}
          language={language} 
        />
      );
    }

    if (activeSection === Section.ADMIN) {
      return user?.role === 'admin' ? (
        <AdminPanel currentUser={user} language={language} t={t} />
      ) : (
        <div className="min-h-screen flex items-center justify-center">Unauthorized</div>
      );
    }

    if (activeSection === Section.CABINET) {
      return user ? (
        <PersonalCabinet user={user} onLogout={handleLogout} language={language} t={t} />
      ) : (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="glass-card p-12 rounded-[3rem] text-center border-amber-300 shadow-2xl max-w-md navoiy-glow">
            <h2 className="text-4xl font-classic mb-6 text-slate-800">{t('nav_cabinet')}</h2>
            <p className="text-slate-600 font-serif-classic text-2xl mb-10 leading-relaxed italic">{t('footer_text')}</p>
            <div className="space-y-4">
              <button 
                onClick={() => setIsLoggingIn(true)}
                className="w-full px-8 py-5 royal-gradient text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition-all text-xl"
              >
                {t('nav_login')}
              </button>
              <button 
                onClick={() => setIsRegistering(true)}
                className="w-full px-8 py-5 gold-gradient text-slate-900 font-bold rounded-2xl shadow-lg hover:opacity-90 transition-all text-xl"
              >
                {t('nav_register')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div id="hero">
          <Hero onRegister={() => setIsRegistering(true)} onLearnMore={() => handleSectionChange(Section.ABOUT)} language={language} t={t} />
        </div>
        <IslimiyDivider />
        <Heritage language={language} />
        <div id="venue">
          <Venue onOpenTour={openTour} language={language} />
        </div>
        <div id="program">
          <Program language={language} />
        </div>
        <div id="logistics">
          <Tourism onOpenTour={openTour} language={language} />
          <Logistics language={language} />
        </div>
        <div id="archive">
          <SymposiumArchive language={language} />
        </div>
        <div id="about">
          <About language={language} />
        </div>
        <div id="tracks">
          <Tracks language={language} />
        </div>
        <div id="speakers">
          <Speakers language={language} />
        </div>
      </>
    );
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
        {renderContent()}
      </main>
      <Footer language={language} t={t} />
      
      <VirtualTourModal 
        isOpen={tourData.isOpen} 
        onClose={() => setTourData({ ...tourData, isOpen: false })}
        title={tourData.title}
        tourUrl={tourData.url}
      />
    </div>
  );
};

export default App;

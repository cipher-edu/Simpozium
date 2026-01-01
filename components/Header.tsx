
import React, { useState, useEffect } from 'react';
import { Section, Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  isLoggedIn: boolean;
  setIsRegistering: (val: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, isLoggedIn, setIsRegistering, language, setLanguage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = (key: keyof typeof translations.uz): string => {
    const value = translations[language][key] || translations.uz[key];
    return (typeof value === 'string' ? value : key);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { section: Section.HOME, label: t('nav_home') },
    { section: Section.ABOUT, label: t('nav_about') },
    { section: Section.ARCHIVE, label: t('nav_archive') }, // Yangi qo'shildi
    { section: Section.TRACKS, label: t('nav_tracks') },
    { section: Section.SPEAKERS, label: t('nav_speakers') },
    { section: Section.LOGISTICS, label: t('nav_logistics') },
    { section: Section.CABINET, label: t('nav_cabinet') }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass-card border border-amber-200/50 shadow-xl rounded-[2rem] transition-all duration-500 px-6 md:px-10 ${scrolled ? 'bg-white/95 py-2' : 'bg-white/80 py-3'}`}>
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center cursor-pointer space-x-3 group" 
              onClick={() => setActiveSection(Section.HOME)}
            >
              <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <span className="text-slate-950 font-classic font-bold text-xl">AN</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-classic font-bold leading-tight text-slate-900 group-hover:text-amber-700 transition-colors uppercase tracking-tight">Alisher Navoiy</h1>
                <p className="text-[10px] tracking-widest uppercase text-amber-700 font-black">Symposium 2025</p>
              </div>
            </div>

            <nav className="hidden xl:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => setActiveSection(item.section)}
                  className={`px-3 py-2 text-[9px] font-black uppercase tracking-widest transition-all rounded-full hover:bg-amber-50 relative group ${
                    activeSection === item.section ? 'text-amber-800' : 'text-slate-500 hover:text-amber-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-100 bg-amber-50/50 hover:bg-amber-100 transition-colors text-xs font-black uppercase tracking-widest text-amber-900"
                >
                  <span className="text-lg">🌐</span>
                  {language}
                </button>
                {langMenuOpen && (
                  <div className="absolute top-12 right-0 w-32 bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {(['uz', 'ru', 'en'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-xs font-black uppercase tracking-widest hover:bg-amber-50 transition-colors ${language === lang ? 'text-amber-600 bg-amber-50/30' : 'text-slate-600'}`}
                      >
                        {lang === 'uz' ? 'O\'zbek' : lang === 'ru' ? 'Русский' : 'English'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!isLoggedIn ? (
                <button 
                  onClick={() => setIsRegistering(true)}
                  className="px-6 py-2.5 rounded-full text-[10px] font-black gold-gradient text-slate-900 shadow-lg hover:shadow-amber-200 uppercase tracking-widest transition-all active:scale-95"
                >
                  {t('nav_register')}
                </button>
              ) : (
                <div 
                  onClick={() => setActiveSection(Section.CABINET)}
                  className="flex items-center space-x-3 cursor-pointer p-1.5 pr-4 rounded-full border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full royal-gradient flex items-center justify-center text-[8px] text-white font-black uppercase">Cab</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">{t('nav_cabinet')}</span>
                </div>
              )}

              <div className="xl:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-3 rounded-2xl bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-amber-100 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
          <div className="px-6 py-10 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => {
                  setActiveSection(item.section);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left p-4 text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${
                  activeSection === item.section ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

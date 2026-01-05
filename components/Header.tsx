
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Language } from '../types.ts';
import { translations } from '../translations.ts';
import { Globe, ChevronDown, User, LogIn, UserPlus, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  isLoggedIn: boolean;
  setIsRegistering: (val: boolean) => void;
  setIsLoggingIn: (val: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  setActiveSection, 
  isLoggedIn, 
  setIsRegistering, 
  setIsLoggingIn, 
  language, 
  setLanguage 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = (key: keyof typeof translations.uz): string => {
    const value = (translations[language] as any)?.[key] || translations.uz[key];
    return (typeof value === 'string' ? value : String(key));
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
    { section: Section.PROGRAM, label: t('nav_program') },
    { section: Section.ARCHIVE, label: t('nav_archive') },
    { section: Section.TRACKS, label: t('nav_tracks') },
    { section: Section.SPEAKERS, label: t('nav_speakers') },
    { section: Section.LOGISTICS, label: t('nav_logistics') },
    { section: Section.CABINET, label: t('nav_cabinet') }
  ];

  const scrollToHeritageDetail = () => {
    const el = document.getElementById('region-detail');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className={`relative transition-all duration-500 rounded-[2.5rem] ${
          scrolled 
          ? 'bg-white/80 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(166,124,0,0.2)] border border-amber-200/40 py-2' 
          : 'bg-white/40 backdrop-blur-md border border-white/40 py-4'
        }`}>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[2.5rem] overflow-hidden" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%23a67c00'/%3E%3C/svg%3E")` }} />

          <div className="max-w-full mx-auto px-8 md:px-12 flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center cursor-pointer space-x-4 group z-10" 
              onClick={() => setActiveSection(Section.HOME)}
            >
              <div className="relative">
                <div className="absolute inset-0 gold-gradient blur-xl opacity-40 group-hover:opacity-70 transition-opacity rounded-full"></div>
                <div className="relative w-14 h-14 gold-gradient rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(166,124,0,0.3)] border-2 border-white/50">
                  <span className="text-slate-950 font-classic font-black text-2xl drop-shadow-sm">AN</span>
                </div>
              </div>
              <div className="hidden lg:block">
                <h1 className="text-lg font-classic font-black leading-none text-slate-900 group-hover:text-amber-700 transition-colors uppercase tracking-tight">Alisher Navoiy</h1>
                <p className="text-[9px] tracking-[0.4em] uppercase text-amber-700 font-black mt-1 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Symposium 2025
                </p>
              </div>
            </motion.div>

            <nav className="hidden xl:flex items-center bg-slate-950/5 p-1.5 rounded-full border border-slate-950/5 relative">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => setActiveSection(item.section)}
                  className={`px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group z-10 ${
                    activeSection === item.section ? 'text-amber-900' : 'text-slate-500 hover:text-amber-800'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeSection === item.section && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-amber-100/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {activeSection === item.section && (
                    <motion.span 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-amber-600 text-[8px] leading-none"
                    >
                      ❦
                    </motion.span>
                  )}
                </button>
              ))}
              <div className="w-[1px] h-6 bg-slate-300 mx-2"></div>
              <button
                onClick={scrollToHeritageDetail}
                className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all text-blue-800 hover:text-blue-900 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('nav_heritage_section')}
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"></div>
                </span>
              </button>
            </nav>

            <div className="flex items-center space-x-4 z-10">
              <div className="relative">
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-amber-100 bg-white/50 hover:bg-amber-100 transition-all text-[11px] font-black uppercase tracking-[0.1em] text-amber-950 group"
                >
                  <Globe className={`w-4 h-4 text-amber-600 transition-transform duration-500 ${langMenuOpen ? 'rotate-180' : ''}`} />
                  {language}
                  <ChevronDown className={`w-3 h-3 opacity-40 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full mt-3 right-0 w-44 bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(166,124,0,0.3)] border border-amber-100 p-2 z-50"
                    >
                      {(['uz', 'ru', 'en'] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            language === lang 
                            ? 'bg-amber-50 text-amber-900 border border-amber-200/50' 
                            : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {lang === 'uz' ? 'O\'zbek' : lang === 'ru' ? 'Русский' : 'English'}
                          {language === lang && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]"></div>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!isLoggedIn ? (
                <div className="hidden md:flex items-center gap-3">
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLoggingIn(true)}
                    className="px-6 py-3 rounded-2xl text-[10px] font-black text-slate-900 hover:bg-slate-100 uppercase tracking-widest transition-all flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    {t('nav_login')}
                  </motion.button>
                  <motion.button 
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsRegistering(true)}
                    className="px-8 py-3.5 rounded-2xl text-[10px] font-black gold-gradient text-slate-950 shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] hover:shadow-amber-200 uppercase tracking-widest transition-all border border-white/40 flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    {t('nav_register')}
                  </motion.button>
                </div>
              ) : (
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveSection(Section.CABINET)}
                  className="flex items-center space-x-4 cursor-pointer p-1.5 pr-6 rounded-3xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100 transition-all group"
                >
                  <div className="w-11 h-11 rounded-2xl royal-gradient flex items-center justify-center text-[10px] text-white font-black uppercase shadow-lg group-hover:rotate-6 transition-transform">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-900">{t('nav_cabinet')}</p>
                    <p className="text-[8px] text-emerald-600/60 font-black uppercase tracking-tighter">Active Session</p>
                  </div>
                </motion.div>
              )}

              <div className="xl:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`p-3.5 rounded-2xl transition-all ${
                    mobileMenuOpen ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden absolute top-[calc(100%-1rem)] left-6 right-6 bg-white/95 backdrop-blur-3xl border border-amber-100 rounded-[3rem] shadow-[0_40px_100px_rgba(166,124,0,0.4)] z-[40] overflow-hidden"
          >
            <div className="p-8 space-y-3">
              <div className="pb-6 border-b border-amber-50">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-900/40 mb-4">Navigatsiya</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {navItems.map((item) => (
                      <button
                        key={item.section}
                        onClick={() => {
                          setActiveSection(item.section);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-between p-5 text-[11px] font-black uppercase tracking-widest rounded-3xl transition-all ${
                          activeSection === item.section 
                          ? 'bg-amber-900 text-white shadow-xl' 
                          : 'bg-slate-50 text-slate-600 hover:bg-amber-50 hover:text-amber-900'
                        }`}
                      >
                        {item.label}
                        {activeSection === item.section && <span>❦</span>}
                      </button>
                    ))}
                 </div>
              </div>
              
              <div className="pt-4 space-y-4">
                <button
                   onClick={scrollToHeritageDetail}
                   className="w-full flex items-center justify-center gap-4 p-5 text-[11px] font-black uppercase tracking-widest rounded-3xl text-blue-800 bg-blue-50 border border-blue-100 shadow-sm"
                >
                  <Sparkles className="w-4 h-4" /> {t('nav_heritage_section')}
                </button>
                
                {!isLoggedIn && (
                   <div className="grid grid-cols-2 gap-4 pt-4">
                      <button onClick={() => {setIsLoggingIn(true); setMobileMenuOpen(false);}} className="flex items-center justify-center gap-3 p-5 bg-slate-950 text-white rounded-3xl text-[11px] font-black uppercase tracking-widest shadow-xl">
                        <LogIn className="w-4 h-4" /> {t('nav_login')}
                      </button>
                      <button onClick={() => {setIsRegistering(true); setMobileMenuOpen(false);}} className="flex items-center justify-center gap-3 p-5 gold-gradient text-slate-950 rounded-3xl text-[11px] font-black uppercase tracking-widest shadow-xl">
                        <UserPlus className="w-4 h-4" /> {t('nav_register')}
                      </button>
                   </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

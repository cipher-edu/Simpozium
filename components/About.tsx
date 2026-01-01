
import React from 'react';
import { IslimiyDivider, SectionTitleDecoration } from './PatternBackground';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutProps {
  fullPage?: boolean;
  language: Language;
}

const About: React.FC<AboutProps> = ({ fullPage, language }) => {
  // Fix: Ensure t function returns string
  const t = (key: keyof typeof translations.uz): string => {
    const val = translations[language][key] || translations.uz[key];
    return (typeof val === 'string' ? val : key);
  };

  return (
    <section className={`py-32 bg-slate-100/20 relative ${fullPage ? 'min-h-screen' : ''} parchment-texture`}>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitleDecoration />
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-classic text-slate-900 mb-10 uppercase tracking-widest">{t('nav_about')}</h2>
          <div className="w-48 h-[3px] gold-gradient mx-auto mb-12 rounded-full shadow-lg" />
          <p className="text-3xl italic text-amber-900 font-serif-classic max-w-5xl mx-auto leading-relaxed">
            {t('venue_desc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-2xl text-slate-800 font-serif-classic leading-relaxed italic">
            <p>{t('heritage_p1')}</p>
            <div className="p-10 bg-amber-50/70 backdrop-blur-md rounded-3xl border-l-8 border-amber-500 shadow-2xl italic text-amber-950 font-black">
               {t('hero_quote')}
            </div>
            <p>{t('heritage_p3')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 opacity-80">
            {/* Bo'limlar asosan bir xil qolgani uchun bu yerda qisqartma qilindi */}
            <div className="glass-card p-10 rounded-[2.5rem] border-amber-200 text-center">
              <span className="text-6xl mb-6">🌍</span>
              <h4 className="font-classic font-black text-slate-950 text-xl mb-4">Global</h4>
            </div>
            <div className="glass-card p-10 rounded-[2.5rem] border-amber-200 text-center">
              <span className="text-6xl mb-6">📜</span>
              <h4 className="font-classic font-black text-slate-950 text-xl mb-4">Manuscripts</h4>
            </div>
          </div>
        </div>
      </div>
      <IslimiyDivider />
    </section>
  );
};

export default About;

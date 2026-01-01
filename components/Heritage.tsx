
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeritageProps {
  language: Language;
}

const Heritage: React.FC<HeritageProps> = ({ language }) => {
  // Fix: Ensure t function returns string
  const t = (key: keyof typeof translations.uz): string => {
    const val = translations[language][key] || translations.uz[key];
    return (typeof val === 'string' ? val : key);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#fdfaf3]">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-classic text-slate-900 mb-8 leading-tight">
              {t('heritage_title')} <br/>
              <span className="text-amber-700">{t('heritage_subtitle')}</span>
            </h2>
            <div className="space-y-6 text-xl text-slate-700 font-serif-classic leading-relaxed italic">
              <p>{t('heritage_p1')}</p>
              <p>{t('heritage_p2')}</p>
              <p>{t('heritage_p3')}</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 p-4 border-2 border-amber-200 rounded-2xl bg-white/50">
              <img 
                src="https://navoisport.uz/wp-content/uploads/2026/01/nano-banana-1767111268939.png" 
                alt="Ancient Manuscript" 
                className="rounded-xl shadow-2xl opacity-90"
              />
              <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-xl border-amber-300 max-w-xs">
                <p className="font-classic text-amber-800 text-lg leading-snug">{t('heritage_quote')}</p>
                <p className="text-sm text-slate-500 italic mt-2">{t('heritage_author')}</p>
              </div>
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-100 rounded-full blur-3xl -z-10 opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heritage;

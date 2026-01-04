
import React from 'react';
import { IslimiyDivider, SectionTitleDecoration } from './PatternBackground';
import { Language } from '../types';
import { translations } from '../translations';

interface VenueProps {
  onOpenTour: (title: string, url: string) => void;
  language: Language;
}

const Venue: React.FC<VenueProps> = ({ onOpenTour, language }) => {
  // Use string for key to allow flexibility and fix TS errors
  const t = (key: string): string => {
    const val = (translations[language] as any)?.[key] || (translations.uz as any)[key];
    return (typeof val === 'string' ? val : key);
  };

  // Ishchi video ID'lar
  const uniTourId = "jfSBYfAOqPE";
  const cityTourId = "jfSBYfAOqPE";

  return (
    <section className="py-32 relative overflow-hidden bg-white/30 parchment-texture">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitleDecoration />
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-classic text-slate-900 mb-8 leading-tight">
            {t('venue_title')} <br/><span className="text-amber-700 italic">{t('venue_subtitle')}</span>
          </h2>
          <p className="text-2xl font-serif-classic text-slate-700 max-w-4xl mx-auto italic leading-relaxed">
            {t('venue_desc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          <div className="glass-card p-12 md:p-16 rounded-[3rem] border-amber-300 hover:shadow-3xl transition-all duration-700 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-10">
                <div className="w-24 h-24 royal-gradient rounded-3xl flex items-center justify-center shadow-2xl ornament-shadow">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5-9-5-9 5 9 5zm0 0v6m0 0H7m5 0h5" /></svg>
                </div>
                <button 
                  onClick={() => onOpenTour(t('venue_uni_h'), `https://www.youtube.com/embed/${uniTourId}?autoplay=1&enablejsapi=1&rel=0`)}
                  className="px-6 py-3 bg-amber-600/10 border border-amber-600/30 text-amber-900 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                  Campus Tour
                </button>
              </div>
              <h3 className="text-4xl font-classic text-slate-900 mb-8 leading-tight">{t('venue_uni_h')}</h3>
              <div className="space-y-6 text-xl font-serif-classic text-slate-700 leading-relaxed italic">
                <p>{t('venue_uni_p1')}</p>
                <p>{t('venue_uni_p2')}</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 royal-gradient rounded-[3rem] transform translate-x-6 translate-y-6 -z-10 opacity-15 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-700 blur-sm"></div>
            <div className="glass-card p-12 md:p-16 rounded-[3rem] border-amber-300 h-full shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div className="w-24 h-24 gold-gradient rounded-3xl flex items-center justify-center shadow-2xl ornament-shadow">
                    <svg className="w-12 h-12 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <button 
                    onClick={() => onOpenTour(t('venue_city_h'), `https://www.youtube.com/embed/${cityTourId}?autoplay=1&enablejsapi=1&rel=0`)}
                    className="px-6 py-3 bg-blue-600/10 border border-blue-600/30 text-blue-900 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    City Overview
                  </button>
                </div>
                <h3 className="text-4xl font-classic text-slate-950 mb-8 leading-tight">{t('venue_city_h')}</h3>
                <div className="space-y-6 text-xl font-serif-classic text-slate-700 leading-relaxed italic">
                  <p>{t('venue_city_p1')}</p>
                  <p>{t('venue_city_p2')}</p>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-amber-200/50">
                <button className="text-amber-800 text-2xl font-black hover:text-amber-600 flex items-center transition-colors group">
                  {t('nav_logistics')}
                  <svg className="w-8 h-8 ml-4 transform group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <IslimiyDivider />
    </section>
  );
};

export default Venue;

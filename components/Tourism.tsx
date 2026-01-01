
import React from 'react';
import { IslimiyDivider, SectionTitleDecoration } from './PatternBackground';
import { Language } from '../types';
import { translations } from '../translations';

interface TourismProps {
  onOpenTour: (title: string, url: string) => void;
  language: Language;
}

const Tourism: React.FC<TourismProps> = ({ onOpenTour, language }) => {
  // Fix: Ensure t function returns string
  const t = (key: keyof typeof translations.uz): string => {
    const val = translations[language][key] || translations.uz[key];
    return (typeof val === 'string' ? val : key);
  };
  const monuments = (translations[language] as any).tourism_monuments || translations.uz.tourism_monuments;

  const images = [
    "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyVM24kAOD5Gyqr8IezDhee_Ay7cqaDdbOOBxTSBskIydhiQ96YZZK8WUrBf8tzo0XHhod0_m4VVDX-4NfdSjSARDXOitwvKbTtjcO-fjcQs4MJ70jhadvoUsucAKjxDT7u00wo=s680-w680-h510-rw",
    "https://uzbekistan.travel/storage/app/media/Rasmlar/Navoiy/cropped-images/2T0A0190-0-0-0-0-1738326399.jpg",
    "https://static.zarnews.uz/crop/8/9/720__80_897fc7c1999290211accd98f7fad7ebb.jpg?img=self&v=1675832790",
    "https://www.orexca.com/img/uzbekistan/nurata/nurata6.jpg"
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-white/40 parchment-texture">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitleDecoration />
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-classic text-slate-900 mb-8 leading-tight">
            {t('tourism_title')} <br/><span className="text-amber-700 italic">{t('tourism_subtitle')}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {monuments.map((m: any, i: number) => (
            <div key={i} className="glass-card rounded-[2.5rem] border-amber-200 overflow-hidden hover:shadow-3xl transition-all duration-700 group flex flex-col h-full">
              <div className="h-64 overflow-hidden relative">
                <img src={images[i]} alt={m.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute top-4 left-4 px-4 py-1 bg-amber-600/90 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">{m.period}</div>
                <button 
                  onClick={() => onOpenTour(m.title, "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1")}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-amber-900 p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2 group/btn"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-classic text-slate-900 mb-4 tracking-wide group-hover:text-amber-700 transition-colors">{m.title}</h3>
                  <p className="text-base font-serif-classic text-slate-700 leading-relaxed italic mb-6">{m.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <IslimiyDivider />
    </section>
  );
};

export default Tourism;

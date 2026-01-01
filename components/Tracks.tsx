
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface TracksProps {
  fullPage?: boolean;
  language: Language;
}

const Tracks: React.FC<TracksProps> = ({ fullPage, language }) => {
  // Fix: Ensure t function returns string
  const t = (key: keyof typeof translations.uz): string => {
    const val = translations[language][key] || translations.uz[key];
    return (typeof val === 'string' ? val : key);
  };
  const tracksList = (translations[language] as any).tracks_list || translations.uz.tracks_list;

  const icons = ["📜", "✒️", "🌙", "🕯️"];
  const colors = ["bg-amber-50", "bg-blue-50", "bg-emerald-50", "bg-purple-50"];

  return (
    <section className={`py-20 ${fullPage ? 'min-h-screen' : ''}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-classic text-slate-900 mb-4">{t('tracks_title')}</h2>
          <p className="text-slate-500">{t('tracks_subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tracksList.map((track: any, i: number) => (
            <div 
              key={i} 
              className={`group p-8 rounded-3xl border border-transparent hover:border-amber-200 hover:shadow-2xl transition-all duration-300 flex flex-col h-full ${colors[i]}`}
            >
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">{icons[i]}</div>
              <h3 className="text-xl font-classic font-bold text-slate-800 mb-4">{track.title}</h3>
              <p className="text-slate-600 mb-8 flex-grow">{track.desc}</p>
              <div className="pt-4 border-top border-slate-200 flex items-center text-sm font-bold text-amber-700">
                <span>{t('nav_register')}</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;

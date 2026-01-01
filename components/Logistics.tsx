
import React from 'react';
import { SectionTitleDecoration } from './PatternBackground';
import { Language } from '../types';
import { translations } from '../translations';

interface LogisticsProps {
  language: Language;
}

const Logistics: React.FC<LogisticsProps> = ({ language }) => {
  const t = (key: keyof typeof translations.uz): string => {
    const val = (translations[language] as any)[key] || (translations.uz as any)[key];
    return typeof val === 'string' ? val : key;
  };

  const hotels = (translations[language] as any).logistics_hotels || translations.uz.logistics_hotels;
  const dining = (translations[language] as any).logistics_dining || translations.uz.logistics_dining;

  const icons = ["🏨", "🛎️", "🛏️"];
  const diningIcons = ["🍲", "🍽️"];

  return (
    <section className="py-32 relative overflow-hidden bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitleDecoration />
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-classic text-slate-900 mb-8 leading-tight">
            {t('nav_logistics')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <h3 className="text-3xl font-classic text-amber-900 mb-10 flex items-center">
              <span className="mr-4">🏛️</span> {t('logistics_hotels_h')}
            </h3>
            {hotels.map((h: any, i: number) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] border-amber-200 hover:-translate-y-2 transition-all duration-500 shadow-xl group">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 gold-gradient rounded-2xl flex items-center justify-center text-3xl shadow-lg shrink-0">
                    {icons[i] || "🏨"}
                  </div>
                  <div>
                    <h4 className="text-2xl font-classic text-slate-900 mb-2">{h.name}</h4>
                    <p className="text-xl font-serif-classic text-slate-700 italic leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-10">
            <h3 className="text-3xl font-classic text-blue-900 mb-10 flex items-center">
              <span className="mr-4">🍴</span> {t('logistics_dining_h')}
            </h3>
            {dining.map((d: any, i: number) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] border-blue-200 hover:-translate-y-2 transition-all duration-500 shadow-xl bg-blue-50/30 group">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 royal-gradient rounded-2xl flex items-center justify-center text-3xl shadow-lg shrink-0">
                    {diningIcons[i] || "🍲"}
                  </div>
                  <div>
                    <h4 className="text-2xl font-classic text-slate-900 mb-1">{d.name}</h4>
                    <p className="text-amber-700 font-bold text-sm mb-4 uppercase tracking-widest">{d.type}</p>
                    <p className="text-xl font-serif-classic text-slate-700 italic leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Logistics;

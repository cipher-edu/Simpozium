
import React from 'react';
import { Language } from '../types';

interface HeroProps {
  onRegister: () => void;
  onLearnMore: () => void;
  language: Language;
  t: (key: any) => string;
}

const Hero: React.FC<HeroProps> = ({ onRegister, onLearnMore, t }) => {
  return (
    <section className="relative overflow-hidden pt-28 pb-32 md:pt-44 md:pb-56 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-[#f4ece1]"></div>
      <div className="absolute inset-0 opacity-[0.45] animated-pattern pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='shadow' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeGaussianBlur in='SourceAlpha' stdDeviation='0.5'/%3E%3CfeOffset dx='0.5' dy='0.5' result='offsetblur'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.2'/%3E%3C/feComponentTransfer%3E%3CfeMerge%3E%3CfeMergeNode/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23shadow)' fill='none' stroke='%23d3c7b5' stroke-width='1.2'%3E%3Cpath d='M40 0 L48 28 L76 36 L48 44 L40 72 L32 44 L4 36 L32 28 Z'/%3E%3Crect x='20' y='20' width='40' height='40' transform='rotate(45 40 40)' stroke-opacity='0.6'/%3E%3Ccircle cx='40' cy='40' r='6' stroke-opacity='0.15'/%3E%3Cpath d='M0 0 L15 15 M65 15 L80 0 M15 65 L0 80 M80 80 L65 65' stroke-opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
             backgroundSize: '160px 160px'
           }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(244,236,225,0.7)_100%)]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-4 px-10 py-4 rounded-2xl border-2 border-amber-400/40 bg-white/70 text-amber-950 text-[10px] font-black tracking-[0.4em] uppercase mb-12 shadow-2xl navoiy-glow backdrop-blur-md relative overflow-hidden group">
            <span className="text-amber-600 text-xl group-hover:rotate-180 transition-transform duration-1000">⚜</span>
            <span className="relative z-10">{t('hero_university')}</span>
            <span className="text-amber-600 text-xl group-hover:-rotate-180 transition-transform duration-1000">⚜</span>
          </div>
          
          <div className="relative inline-block mb-10">
            <h1 className="relative z-10 text-7xl md:text-9xl font-classic font-black text-slate-900 leading-tight drop-shadow-2xl uppercase">
              ALISHER <br/>
              <span className="text-amber-700 italic">NAVOIY</span>
            </h1>
          </div>
          
          <div className="relative inline-block mb-16 px-4">
             <p className="text-3xl md:text-5xl font-serif-classic text-slate-800 max-w-6xl mx-auto leading-relaxed italic mb-4">
              {t('hero_quote')}
             </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button 
              onClick={onRegister}
              className="group relative px-16 py-7 overflow-hidden rounded-2xl bg-slate-950 text-white font-black text-lg shadow-2xl hover:-translate-y-2 transition-all uppercase tracking-widest"
            >
              <div className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <span className="relative z-10 group-hover:text-slate-950 transition-colors">{t('hero_cta_register')}</span>
            </button>
            <button 
              onClick={onLearnMore}
              className="px-16 py-7 rounded-2xl border-2 border-amber-700 text-amber-950 font-black text-lg hover:bg-amber-700 hover:text-white transition-all shadow-xl uppercase tracking-widest"
            >
              {t('hero_cta_plan')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto mt-12">
          <div className="glass-card p-10 rounded-[2.5rem] border-amber-200/60 text-center hover:scale-105 transition-transform duration-500">
            <div className="text-amber-600 text-4xl mb-4">📅</div>
            <h4 className="font-classic text-amber-800 text-[10px] tracking-widest uppercase mb-4">INFO</h4>
            <p className="font-serif-classic text-4xl font-black text-slate-900">{t('hero_date')}</p>
          </div>
          <div className="glass-card p-10 rounded-[2.5rem] border-amber-500 bg-white/80 text-center scale-110 shadow-xl border-2">
            <div className="text-amber-700 text-4xl mb-4">🏛️</div>
            <h4 className="font-classic text-amber-900 text-[10px] tracking-widest uppercase mb-4">CITY</h4>
            <p className="font-serif-classic text-3xl font-black text-slate-950">{t('hero_location')}</p>
          </div>
          <div className="glass-card p-10 rounded-[2.5rem] border-amber-200/60 text-center hover:scale-105 transition-transform duration-500">
            <div className="text-blue-600 text-4xl mb-4">🌐</div>
            <h4 className="font-classic text-amber-800 text-[10px] tracking-widest uppercase mb-4">TYPE</h4>
            <p className="font-serif-classic text-4xl font-black text-slate-900">{t('hero_format')}</p>
          </div>
          <div className="glass-card p-10 rounded-[2.5rem] border-amber-200/60 text-center hover:scale-105 transition-transform duration-500">
            <div className="text-emerald-600 text-4xl mb-4">📖</div>
            <h4 className="font-classic text-amber-800 text-[10px] tracking-widest uppercase mb-4">SCOPE</h4>
            <p className="font-serif-classic text-4xl font-black text-slate-900">{t('hero_tracks')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

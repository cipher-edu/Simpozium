
import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types.ts';
import { Sparkles, Calendar, MapPin, Globe, BookOpen } from 'lucide-react';

// CSS uchun qo'shimcha yordam - Moved helper component to top to prevent potential hoisting or scoping issues
const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

interface HeroProps {
  onRegister: () => void;
  onLearnMore: () => void;
  language: Language;
  t: (key: any) => string;
}

const Hero: React.FC<HeroProps> = ({ onRegister, onLearnMore, t }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 px-6">
      {/* Murakkab fon qatlami */}
      <div className="absolute inset-0 bg-[#fbf8f1]"></div>
      <div className="absolute inset-0 opacity-[0.4] animated-pattern pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z' fill='%23d3c7b5' fill-opacity='0.2'/%3E%3C/svg%3E")`,
             backgroundSize: '150px 150px'
           }}></div>
      
      {/* Oltin yorug'lik va "Glow" effektlari */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-200/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white via-transparent to-transparent -z-10"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        {/* Yuqori kichik sarlavha */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-amber-300/50 bg-white/60 backdrop-blur-md text-amber-900 text-[10px] font-black tracking-[0.5em] uppercase mb-12 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          {t('hero_university')}
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        </motion.div>

        {/* Asosiy Ism - Mahobatli va markazlashgan */}
        <div className="relative mb-8">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-[11rem] font-classic font-black text-slate-950 leading-[0.85] uppercase tracking-tighter"
          >
            <span className="block">ALISHER</span>
            <span className="block text-amber-700 italic mt-2">NAVOIY</span>
          </motion.h1>
          
          {/* Bezak (Ornament) */}
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 0.4, width: '200px' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-8"
          />
        </div>

        {/* Iqtibos - Simmetrik joylashuv */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16 px-4"
        >
          <div className="flex items-center justify-center gap-6 mb-4">
            <span className="text-amber-500 text-2xl">❦</span>
            <p className="text-2xl md:text-5xl font-serif-classic text-slate-800 leading-tight italic font-medium">
              "{t('hero_quote')}"
            </p>
            <span className="text-amber-500 text-2xl rotate-180">❦</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Xalqaro Ilmiy Simpozium 2025</p>
        </motion.div>

        {/* Amallar tugmalari */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
        >
          <button 
            onClick={onRegister}
            className="group relative px-12 py-6 overflow-hidden rounded-2xl bg-slate-950 text-white font-black text-sm shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-[0.2em] w-full sm:w-auto"
          >
            <div className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 group-hover:text-slate-950 transition-colors">{t('hero_cta_register')}</span>
          </button>
          
          <button 
            onClick={onLearnMore}
            className="px-12 py-6 rounded-2xl border-2 border-amber-700/30 text-amber-950 font-black text-sm hover:bg-amber-700 hover:text-white transition-all shadow-lg uppercase tracking-[0.2em] w-full sm:w-auto flex items-center justify-center gap-3 group"
          >
            {t('hero_cta_plan')}
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronRight className="w-5 h-5" />
            </motion.span>
          </button>
        </motion.div>

        {/* Ma'lumot kartochkalari */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto"
        >
          {[
            { icon: <Calendar className="text-amber-600" />, label: "Sana", val: t('hero_date') },
            { icon: <MapPin className="text-blue-600" />, label: "Manzil", val: t('hero_location') },
            { icon: <Globe className="text-emerald-600" />, label: "Format", val: t('hero_format') },
            { icon: <BookOpen className="text-purple-600" />, label: "Sho'balar", val: t('hero_tracks') }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-6 md:p-10 rounded-[2.5rem] border-amber-200/40 text-center hover:bg-white transition-all duration-500 group">
              <div className="flex justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </div>
              <h4 className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-2">{item.label}</h4>
              <p className="font-serif-classic text-xl md:text-2xl font-black text-slate-900 leading-tight">{item.val}</p>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Yon tomondagi bezak elementi (Scroll hint) */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-amber-800/40"
      >
        <span className="text-[9px] font-black uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-amber-600/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;

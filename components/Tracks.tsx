
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, FileText, Globe, Layers, X, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { IslimiyDivider } from './PatternBackground';

interface TracksProps {
  fullPage?: boolean;
  language: Language;
}

const Tracks: React.FC<TracksProps> = ({ fullPage, language }) => {
  const t = (key: string): any => {
    return (translations[language] as any)?.[key] || (translations.uz as any)[key] || key;
  };

  // Safely get tracks list with fallback
  const tracksList = (translations[language] as any)?.tracks_list || translations.uz.tracks_list || [];
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const icons = [<BookOpen />, <FileText />, <Globe />, <Layers />];

  return (
    <section className={`relative overflow-hidden ${fullPage ? 'pt-48 pb-32 min-h-screen bg-slate-50' : 'py-32 bg-white/30'} parchment-texture`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-9xl font-classic text-slate-900 mb-8 uppercase tracking-widest leading-none"
          >
            {t('tracks_title')}
          </motion.h2>
          <p className="text-2xl md:text-3xl font-serif-classic text-slate-500 italic max-w-4xl mx-auto leading-relaxed">
            {t('tracks_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-32">
          {tracksList.map((track: any, i: number) => (
            <motion.div 
              layoutId={`track-container-${i}`}
              key={i} 
              onClick={() => setSelectedId(i)}
              className="group p-12 rounded-[4rem] border border-transparent hover:border-amber-200 hover:shadow-3xl transition-all duration-700 flex flex-col h-full cursor-pointer relative overflow-hidden bg-white/80 backdrop-blur-md"
            >
              <div className="absolute -right-6 -top-6 text-9xl opacity-[0.03] group-hover:scale-125 transition-transform duration-700">
                {icons[i % icons.length]}
              </div>
              <motion.div layoutId={`track-icon-${i}`} className="w-24 h-24 rounded-3xl bg-slate-950 shadow-2xl flex items-center justify-center text-4xl mb-12 text-white group-hover:rotate-12 transition-transform">
                {icons[i % icons.length]}
              </motion.div>
              <motion.h3 layoutId={`track-title-${i}`} className="text-2xl md:text-3xl font-classic font-bold text-slate-900 mb-8 group-hover:text-amber-800 transition-colors leading-tight">{track.title}</motion.h3>
              <p className="text-xl font-serif-classic italic text-slate-600 mb-12 flex-grow leading-relaxed">{track.desc}</p>
              <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-800">Tafsilotlar</span>
                <ArrowRight className="w-6 h-6 text-amber-700 transform group-hover:translate-x-3 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {selectedId !== null && tracksList[selectedId] && (
          <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" onClick={() => setSelectedId(null)} />
              <motion.div layoutId={`track-container-${selectedId}`} className="relative w-full max-w-5xl rounded-[4rem] border shadow-2xl overflow-hidden bg-white flex flex-col h-full max-h-[85vh] z-10">
                <div className="p-12 md:p-20 overflow-y-auto scrollbar-hide">
                   <div className="flex justify-between items-start mb-16">
                      <motion.div layoutId={`track-icon-${selectedId}`} className="w-28 h-28 rounded-3xl bg-slate-950 text-white flex items-center justify-center text-5xl">
                        {icons[selectedId % icons.length]}
                      </motion.div>
                      <button onClick={() => setSelectedId(null)} className="p-5 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-all">
                        <X className="w-8 h-8" />
                      </button>
                   </div>
                   <motion.h3 layoutId={`track-title-${selectedId}`} className="text-4xl md:text-7xl font-classic font-black text-slate-950 mb-12 uppercase leading-none">{tracksList[selectedId].title}</motion.h3>
                   <p className="text-3xl font-serif-classic italic text-slate-800 leading-relaxed border-l-8 border-amber-500 pl-8 bg-amber-50/30 p-8 rounded-3xl">
                     {tracksList[selectedId].desc}
                   </p>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>
        )}
      </div>
      {fullPage && <IslimiyDivider />}
    </section>
  );
};

export default Tracks;

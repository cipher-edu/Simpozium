import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Landmark, History, MapPin, X, ArrowRight, Globe2, 
  Building2, Users, Library, Sparkles, Map as MapIcon,
  DollarSign, School
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { SectionTitleDecoration, IslimiyDivider } from './PatternBackground';

interface RegionDetailedHistoryProps {
  language: Language;
}

const RegionDetailedHistory: React.FC<RegionDetailedHistoryProps> = ({ language }) => {
  const t = (key: string): any => {
    const langData = (translations[language] as any) || translations.uz;
    return langData[key] || (translations.uz as any)[key];
  };

  const districts = t('districts_data') || [];
  const uniInfo = t('uni_infographic') || {};
  
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  const closeDistrict = useCallback(() => {
    setSelectedDistrict(null);
    if (window.location.hash === '#district') {
      window.history.back();
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDistrict();
    };
    const handlePopState = () => {
      if (selectedDistrict !== null) setSelectedDistrict(null);
    };

    if (selectedDistrict !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
      window.history.pushState({ modal: 'district' }, '', '#district');
      window.addEventListener('popstate', handlePopState);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [selectedDistrict, closeDistrict]);

  return (
    <section id="region-detail" className="py-32 relative overflow-hidden bg-[#fafafa] parchment-texture">
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <SectionTitleDecoration />
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-classic text-slate-900 mb-8 uppercase tracking-widest leading-none"
          >
            {t('region_title')}
          </motion.h2>
          <p className="text-2xl font-serif-classic text-amber-900 italic max-w-4xl mx-auto leading-relaxed">
            {t('region_desc')}
          </p>
        </div>

        {/* Districts Grid - Optimized for 11 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 mb-40">
           {districts.map((d: any) => (
             <motion.div 
               key={d.id}
               layoutId={`district-card-${d.id}`}
               whileHover={{ y: -10, scale: 1.02 }}
               onClick={() => setSelectedDistrict(d)}
               className="glass-card p-8 rounded-[3rem] border-amber-200 text-center cursor-pointer hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col items-center bg-white/80"
             >
               <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-125 transition-transform"><Globe2 size={100} /></div>
               <div className="text-5xl mb-4 transform group-hover:rotate-12 transition-transform duration-500 drop-shadow-xl">{d.icon}</div>
               <h4 className="text-xl font-classic font-black text-slate-800 mb-1 group-hover:text-amber-700 transition-colors uppercase tracking-tight">{d.name}</h4>
               <p className="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">{d.year}</p>
               <div className="mt-auto pt-4 border-t border-amber-50 w-full flex items-center justify-center gap-2 text-amber-800 font-black uppercase tracking-[0.2em] text-[9px] opacity-0 group-hover:opacity-100 transition-all">
                 <span>Tafsilotlar</span>
                 <ArrowRight size={14} />
               </div>
             </motion.div>
           ))}
        </div>

        {/* UNIVERSITY INFOGRAPHIC Section */}
        <div className="relative py-24 px-6 md:px-16 bg-[#f0f4f8] rounded-[5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.05)] border-4 border-white">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <School size={300} className="text-slate-900" />
           </div>
           
           <div className="relative z-10 mb-20 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <Sparkles className="w-4 h-4 text-amber-400" /> Education & Innovation
              </div>
              <h3 className="text-4xl md:text-6xl font-classic uppercase mb-6 text-slate-900 tracking-tighter max-w-5xl mx-auto leading-none">
                {uniInfo?.title || "Navoiy Davlat Universiteti"}
              </h3>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-8">
                 <div className="glass-card p-10 rounded-[3rem] bg-white shadow-xl border-amber-100 h-full">
                    <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10 border-b pb-4">Infratuzilma</h5>
                    <div className="grid grid-cols-2 gap-8">
                       {[
                         { icon: <Building2 className="text-blue-500" />, label: "Binolar", val: uniInfo?.infrastructure?.buildings },
                         { icon: <MapPin className="text-emerald-500" />, label: "Maydon", val: uniInfo?.infrastructure?.total_area },
                         { icon: <Users className="text-amber-500" />, label: "Sig'im", val: uniInfo?.infrastructure?.capacity },
                         { icon: <Library className="text-purple-500" />, label: "Fakultetlar", val: uniInfo?.infrastructure?.faculties }
                       ].map((stat, idx) => (
                         <div key={idx} className="flex flex-col items-center text-center p-4 rounded-3xl hover:bg-slate-50 transition-all">
                            <div className="mb-3">{stat.icon}</div>
                            <span className="text-2xl font-classic text-slate-900">{stat.val || '-'}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                 <div className="glass-card p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden h-full">
                    <div className="relative z-10">
                       <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500 mb-8 flex items-center gap-3">
                          <Users className="w-4 h-4" /> Talabalar
                       </h5>
                       <div className="text-6xl font-classic mb-8 text-white">{(uniInfo?.students?.total || 0).toLocaleString()}</div>
                       <div className="space-y-4">
                          {[
                            { label: "Kunduzgi", val: uniInfo?.students?.full_time, p: "53%" },
                            { label: "Sirtqi", val: uniInfo?.students?.external, p: "30%" }
                          ].map((cat, idx) => (
                            <div key={idx} className="space-y-1">
                               <div className="flex justify-between text-[9px] font-black uppercase">
                                  <span>{cat.label}</span>
                                  <span>{cat.val || '0'}</span>
                               </div>
                               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                  <motion.div initial={{ width: 0 }} whileInView={{ width: cat.p }} className="h-full royal-gradient" />
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="glass-card p-8 rounded-[3rem] bg-white shadow-xl border-l-8 border-l-amber-500 h-full">
                   <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-3"><DollarSign className="w-4 h-4 text-amber-500" /> Iqtisodiy Ko'rsatkichlar</h5>
                   <div className="space-y-6">
                      <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100">
                         <p className="text-[9px] font-black uppercase text-amber-800 mb-2">Shartnomalar (2025)</p>
                         <p className="text-4xl font-classic text-amber-900">{uniInfo?.contracts_money?.[2]?.value || '4.8 mlrd'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-slate-50 rounded-2xl">
                            <p className="text-[8px] font-black uppercase text-slate-400">Xorijiy professorlar</p>
                            <p className="text-xl font-classic">{uniInfo?.international?.foreign_professors || '18'}</p>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-2xl">
                            <p className="text-[8px] font-black uppercase text-slate-400">G'olib talabalar</p>
                            <p className="text-xl font-classic">{uniInfo?.social_economic?.winners || '124'}</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>

        <IslimiyDivider />
      </div>

      <AnimatePresence>
        {selectedDistrict && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10">
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"
              onClick={closeDistrict}
             />
             
             <motion.div 
              layoutId={`district-card-${selectedDistrict.id}`}
              className="relative w-full max-w-5xl bg-[#fcf8ee] rounded-[4rem] border-4 border-amber-200 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh] z-10 parchment-texture"
              onClick={(e) => e.stopPropagation()}
             >
                <div className="w-full md:w-1/3 bg-slate-900 flex flex-col items-center justify-center p-12 text-center border-r border-amber-100 relative shrink-0">
                   <div className="absolute inset-0 opacity-10 animated-pattern pointer-events-none"></div>
                   <div className="relative z-10">
                      <div className="text-[120px] mb-8 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform hover:scale-110 transition-transform duration-700">{selectedDistrict.icon}</div>
                      <h3 className="text-4xl md:text-5xl font-classic text-white mb-4 uppercase tracking-tighter leading-none">{selectedDistrict.name}</h3>
                      <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-xs bg-white/5 px-6 py-2 rounded-full border border-white/10">{selectedDistrict.year}</p>
                   </div>
                </div>

                <div className="w-full md:w-2/3 p-10 md:p-20 overflow-y-auto scrollbar-hide flex flex-col">
                   <div className="flex justify-end mb-10 sticky top-0 bg-[#fcf8ee]/80 backdrop-blur-md py-4 z-20">
                      <button onClick={closeDistrict} className="p-5 bg-white hover:bg-red-50 hover:text-red-600 rounded-full transition-all shadow-xl border border-amber-100 group">
                        <X className="w-8 h-8" />
                      </button>
                   </div>

                   <div className="space-y-16">
                      <section>
                         <h5 className="text-[11px] font-black uppercase tracking-[0.5em] text-amber-700 mb-6 flex items-center gap-3">
                            <History size={18} /> Tarixiy Tavsif
                         </h5>
                         <div className="text-2xl md:text-3xl font-serif-classic italic text-slate-800 leading-relaxed bg-white p-10 rounded-[3rem] border-l-[12px] border-amber-500 shadow-xl">
                            "{selectedDistrict.full_info || selectedDistrict.history}"
                         </div>
                      </section>

                      <section className="grid sm:grid-cols-2 gap-10">
                         <div className="glass-card p-10 rounded-[3rem] bg-white border-amber-50 shadow-lg">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                               <Landmark size={16} className="text-amber-600" /> Diqqatga Sazovor Joylar
                            </h5>
                            <ul className="space-y-4">
                               {(selectedDistrict.landmarks || []).map((item: string, idx: number) => (
                                 <li key={idx} className="flex items-center gap-3 text-xl font-serif-classic italic text-slate-700">
                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                    {item}
                                 </li>
                               ))}
                            </ul>
                         </div>
                         <div className="glass-card p-10 rounded-[3rem] bg-white border-amber-50 shadow-lg h-full">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                               <Sparkles size={16} className="text-amber-600" /> Ahamiyati
                            </h5>
                            <p className="text-xl font-serif-classic italic text-slate-700 leading-relaxed">
                               {selectedDistrict.importance}
                            </p>
                         </div>
                      </section>

                      <div className="pt-10">
                         <button onClick={closeDistrict} className="w-full py-8 royal-gradient text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4">
                            <MapIcon size={24} /> Yopish
                         </button>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RegionDetailedHistory;
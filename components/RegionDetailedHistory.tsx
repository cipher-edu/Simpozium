
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Landmark, History, MapPin, X, ArrowRight, ShieldCheck, Globe, 
  Library, Users, Building2, BookOpen, GraduationCap, Wifi, 
  Leaf, Globe2, Briefcase, Award, TrendingUp, Zap, Sparkles,
  Info, Star, Navigation, Map as MapIcon, ChevronRight, Compass,
  ChevronDown, BarChart3, PieChart, Activity, DollarSign, Plane, School, BookCopy
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { SectionTitleDecoration, IslimiyDivider } from './PatternBackground';

interface RegionDetailedHistoryProps {
  language: Language;
}

const RegionDetailedHistory: React.FC<RegionDetailedHistoryProps> = ({ language }) => {
  const t = (key: string): any => (translations[language] as any)[key] || (translations.uz as any)[key];
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
            className="text-5xl md:text-7xl font-classic text-slate-900 mb-8 uppercase tracking-widest"
          >
            {t('region_title')}
          </motion.h2>
          <p className="text-2xl font-serif-classic text-amber-900 italic max-w-3xl mx-auto leading-relaxed">
            {t('region_desc')}
          </p>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 mb-40">
           {districts.map((d: any, i: number) => (
             <motion.div 
               key={d.id}
               layoutId={`district-card-${d.id}`}
               whileHover={{ y: -10, scale: 1.02 }}
               onClick={() => setSelectedDistrict(d)}
               className="glass-card p-8 rounded-[2.5rem] border-amber-200 text-center cursor-pointer hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col items-center bg-white/80"
             >
               <div className="text-5xl mb-4 transform group-hover:rotate-12 transition-transform duration-500 drop-shadow-xl">{d.icon}</div>
               <h4 className="text-lg font-classic font-black text-slate-800 mb-1 group-hover:text-amber-700 transition-colors uppercase tracking-tight">{d.name}</h4>
               <p className="text-[9px] font-black uppercase text-amber-600 tracking-[0.2em] mb-4">{d.year}</p>
               <div className="mt-auto pt-4 border-t border-amber-50 w-full flex items-center justify-center gap-2 text-amber-800 font-serif-classic italic opacity-0 group-hover:opacity-100 transition-all text-xs">
                 <span>Tafsilotlar</span>
                 <ArrowRight size={12} />
               </div>
             </motion.div>
           ))}
        </div>

        {/* NEW INFOGRAPHIC SECTION FOR UNIVERSITY HISTORY/STATS */}
        <div className="relative py-24 px-6 md:px-16 bg-[#f0f4f8] rounded-[5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.05)] border-4 border-white">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <School size={300} className="text-slate-900" />
           </div>
           
           <div className="relative z-10 mb-20 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <Sparkles className="w-4 h-4 text-amber-400" /> Dunyo miqyosidagi Oliy Ta'lim
              </div>
              <h3 className="text-4xl md:text-6xl font-classic uppercase mb-6 text-slate-900 tracking-tighter max-w-5xl mx-auto leading-none">
                {uniInfo.title}
              </h3>
              <p className="text-xl font-serif-classic italic text-slate-500 max-w-3xl mx-auto">
                Navoiy davlat universiteti — zamonaviy infratuzilma, kuchli ilmiy salohiyat va xalqaro hamkorlik maskani.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Physical Infrastructure & Units */}
              <div className="lg:col-span-4 space-y-8">
                 <div className="glass-card p-10 rounded-[3rem] bg-white shadow-xl border-amber-100 h-full">
                    <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10 border-b pb-4">Infratuzilma va Ta'lim</h5>
                    <div className="grid grid-cols-2 gap-8">
                       {[
                         { icon: <Building2 className="text-blue-500" />, label: "O'quv binolari", val: uniInfo.infrastructure.buildings },
                         { icon: <MapPin className="text-emerald-500" />, label: "Umumiy maydon", val: uniInfo.infrastructure.total_area },
                         { icon: <Users className="text-amber-500" />, label: "Binolar sig'imi", val: uniInfo.infrastructure.capacity },
                         { icon: <Library className="text-purple-500" />, label: "Fakultetlar", val: uniInfo.infrastructure.faculties },
                         { icon: <Briefcase className="text-rose-500" />, label: "Kafedralar", val: uniInfo.infrastructure.departments },
                         { icon: <BookOpen className="text-indigo-500" />, label: "Yo'nalishlar", val: uniInfo.infrastructure.directions }
                       ].map((stat, idx) => (
                         <div key={idx} className="flex flex-col items-center text-center p-4 rounded-3xl hover:bg-slate-50 transition-all">
                            <div className="mb-3">{stat.icon}</div>
                            <span className="text-2xl font-classic text-slate-900">{stat.val}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Middle Column: Students & Faculty with Charts */}
              <div className="lg:col-span-4 space-y-8">
                 <div className="glass-card p-10 rounded-[3rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 animated-pattern"></div>
                    <div className="relative z-10">
                       <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500 mb-8 flex items-center gap-3">
                          <Users className="w-4 h-4" /> Talabalar Kontingenti
                       </h5>
                       <div className="text-6xl font-classic mb-8 text-white">{uniInfo.students.total.toLocaleString()} <span className="text-lg opacity-40">jami</span></div>
                       <div className="space-y-4">
                          {[
                            { label: "Kunduzgi", val: uniInfo.students.full_time, p: "53%" },
                            { label: "Sirtqi", val: uniInfo.students.external, p: "30%" },
                            { label: "Kechki", val: uniInfo.students.evening, p: "11%" },
                            { label: "Masofaviy", val: uniInfo.students.distance, p: "4%" },
                            { label: "Magistratura", val: uniInfo.students.masters, p: "2%" }
                          ].map((cat, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                               <div className="flex-grow">
                                  <div className="flex justify-between text-[9px] font-black uppercase mb-1">
                                     <span>{cat.label}</span>
                                     <span>{cat.val}</span>
                                  </div>
                                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                     <motion.div initial={{ width: 0 }} whileInView={{ width: cat.p }} className="h-full royal-gradient" />
                                  </div>
                                </div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="glass-card p-10 rounded-[3rem] bg-white shadow-xl border-amber-100">
                    <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Ilmiy Salohiyat O'sishi (%)</h5>
                    <div className="flex items-end justify-between h-40 gap-4">
                       {uniInfo.scientific_potential.map((p: any, idx: number) => (
                         <div key={idx} className="flex-grow flex flex-col items-center gap-3">
                            <motion.div 
                               initial={{ height: 0 }} 
                               whileInView={{ height: `${parseInt(p.value)}%` }}
                               className={`w-full rounded-t-2xl shadow-lg relative ${idx === 2 ? 'gold-gradient' : 'bg-slate-200'}`}
                            >
                               <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-black text-slate-900">{p.value}</span>
                            </motion.div>
                            <span className="text-[9px] font-black uppercase text-slate-400">{p.year} yil</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Right Column: International & Social-Economic */}
              <div className="lg:col-span-4 space-y-8">
                 <div className="grid grid-cols-1 gap-8">
                    <div className="glass-card p-8 rounded-[3rem] bg-white shadow-xl border-emerald-100 border-l-8 border-l-emerald-500">
                       <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-3"><Plane className="w-4 h-4 text-emerald-500" /> Xalqaro hamkorlik</h5>
                       <div className="grid grid-cols-2 gap-6">
                          <div>
                             <p className="text-3xl font-classic text-slate-900">{uniInfo.international.foreign_professors}</p>
                             <p className="text-[8px] font-black uppercase text-slate-400">Xorijlik professorlar</p>
                          </div>
                          <div>
                             <p className="text-3xl font-classic text-slate-900">{uniInfo.international.agreements}</p>
                             <p className="text-[8px] font-black uppercase text-slate-400">Hamkorlik shartnomalari</p>
                          </div>
                          <div className="col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <p className="text-[9px] font-black uppercase text-emerald-600 mb-1">Rankings</p>
                             <p className="text-xl font-classic text-slate-900">{uniInfo.international.world_ranking}</p>
                          </div>
                       </div>
                    </div>

                    <div className="glass-card p-8 rounded-[3rem] bg-white shadow-xl border-amber-100 border-l-8 border-l-amber-500">
                       <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 flex items-center gap-3"><DollarSign className="w-4 h-4 text-amber-500" /> Iqtisodiy Faoliyat</h5>
                       <div className="space-y-6">
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black uppercase text-slate-500">Moddiy rag'batlantirish</span>
                             <span className="text-lg font-classic text-slate-900">{uniInfo.social_economic.material_support}</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black uppercase text-slate-500">Talabalar rag'bati</span>
                             <span className="text-lg font-classic text-slate-900">{uniInfo.social_economic.scholarship_support}</span>
                          </div>
                          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                             <p className="text-[9px] font-black uppercase text-amber-800 mb-1">Xo'jalik shartnomalari (2025)</p>
                             <p className="text-3xl font-classic text-amber-900">{uniInfo.contracts_money[2].value}</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="mt-16 flex flex-wrap justify-center gap-12 border-t border-slate-200 pt-16">
              {[
                { icon: <Zap className="text-amber-500" />, label: "Yashil energetika", val: uniInfo.social_economic.green_energy },
                { icon: <Award className="text-emerald-500" />, label: "G'olib talabalar", val: uniInfo.social_economic.winners },
                { icon: <History className="text-blue-500" />, label: "Ma'rifiy tadbirlar", val: uniInfo.social_economic.events },
                { icon: <Wifi className="text-indigo-500" />, label: "Internet qamrovi", val: "90% Free WiFi" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-5">
                   <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-slate-100">
                      {item.icon}
                   </div>
                   <div>
                      <p className="text-3xl font-classic text-slate-900">{item.val}</p>
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{item.label}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <IslimiyDivider />
      </div>

      {/* DISTRICT MODAL (KEEPING AS IS) */}
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
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-[#fcf8ee] rounded-[4rem] border-4 border-amber-200 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh] z-10 parchment-texture"
              onClick={(e) => e.stopPropagation()}
             >
                {/* Left side: Visual & Header */}
                <div className="w-full md:w-1/3 bg-slate-900 flex flex-col items-center justify-center p-12 text-center border-r border-amber-100 relative shrink-0">
                   <div className="absolute inset-0 opacity-10 animated-pattern pointer-events-none"></div>
                   <div className="relative z-10">
                      <div className="text-[120px] mb-8 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform hover:scale-110 transition-transform duration-700">{selectedDistrict.icon}</div>
                      <h3 className="text-4xl md:text-5xl font-classic text-white mb-4 uppercase tracking-tighter drop-shadow-lg leading-none">{selectedDistrict.name}</h3>
                      <p className="text-amber-500 font-black uppercase tracking-[0.4em] text-xs bg-white/5 px-6 py-2 rounded-full border border-white/10">{selectedDistrict.year}</p>
                   </div>
                   
                   <div className="absolute bottom-10 left-0 right-0 px-10">
                      <div className="h-px bg-white/10 mb-6"></div>
                      <div className="flex justify-center gap-6 text-white/40">
                         <Globe2 size={24} />
                         <MapPin size={24} />
                         <Compass size={24} />
                      </div>
                   </div>
                </div>

                {/* Right side: Content */}
                <div className="w-full md:w-2/3 p-10 md:p-20 overflow-y-auto scrollbar-hide flex flex-col">
                   <div className="flex justify-end mb-10 sticky top-0 bg-[#fcf8ee]/80 backdrop-blur-md py-4 z-20">
                      <button onClick={closeDistrict} className="p-5 bg-white hover:bg-red-50 hover:text-red-600 rounded-full transition-all active:scale-90 shadow-xl border border-amber-100 group">
                        <X className="w-8 h-8" />
                      </button>
                   </div>

                   <div className="space-y-16">
                      <section>
                         <h5 className="text-[11px] font-black uppercase tracking-[0.5em] text-amber-700 mb-6 flex items-center gap-3">
                            <History size={18} /> Tarixiy Tavsif
                         </h5>
                         <p className="text-2xl md:text-3xl font-serif-classic italic text-slate-800 leading-relaxed bg-white p-10 rounded-[3rem] border-l-[12px] border-amber-500 shadow-xl">
                            "{selectedDistrict.full_info || selectedDistrict.history}"
                         </p>
                      </section>

                      <section className="grid sm:grid-cols-2 gap-10">
                         <div className="glass-card p-10 rounded-[3rem] bg-white border-amber-50 shadow-lg">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                               <Landmark size={16} className="text-amber-600" /> Diqqatga Sazovor Joylar
                            </h5>
                            <ul className="space-y-4">
                               {selectedDistrict.landmarks?.map((item: string, idx: number) => (
                                 <li key={idx} className="flex items-center gap-3 text-xl font-serif-classic italic text-slate-700">
                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                    {item}
                                 </li>
                               ))}
                            </ul>
                         </div>
                         <div className="glass-card p-10 rounded-[3rem] bg-white border-amber-50 shadow-lg">
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

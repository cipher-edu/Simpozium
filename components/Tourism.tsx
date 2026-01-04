
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Landmark, Clock, MapPin, X, ZoomIn, ShieldCheck, Compass, 
  Info, ArrowRight, Play, ExternalLink, Camera, ChevronLeft, 
  ChevronRight, Bookmark, Map as MapIcon, Calendar, Building,
  History as HistoryIcon, Scale, FileSearch, Quote, Share2,
  Globe, Sparkles, Award, Globe2
} from 'lucide-react';
import { IslimiyDivider, SectionTitleDecoration } from './PatternBackground.tsx';
import { Language } from '../types.ts';
import { translations } from '../translations.ts';

interface TourismProps {
  onOpenTour: (title: string, url: string) => void;
  language: Language;
}

const Tourism: React.FC<TourismProps> = ({ onOpenTour, language }) => {
  const t = (key: keyof typeof translations.uz): string => {
    const val = (translations[language] as any)[key] || (translations.uz as any)[key];
    return typeof val === 'string' ? val : key;
  };

  const monuments = (translations[language] as any).tourism_monuments || translations.uz.tourism_monuments;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const mainVideoId = "Y_m8N9O97zY"; 

  const closeModal = useCallback(() => {
    setSelectedId(null);
    setActiveImgIdx(0);
    if (window.location.hash === '#monument') {
      window.history.back();
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    const handlePopState = () => {
      if (selectedId !== null) setSelectedId(null);
    };

    if (selectedId !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
      window.history.pushState({ modal: 'monument' }, '', '#monument');
      window.addEventListener('popstate', handlePopState);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [selectedId, closeModal]);

  const currentMonument = selectedId !== null ? monuments[selectedId] : null;

  return (
    <section id="tourism-section" className="py-32 relative overflow-hidden bg-[#faf7f0] parchment-texture">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none -z-10" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0L120 60L60 120L0 60Z' fill='%23a67c00'/%3E%3C/svg%3E")` }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitleDecoration />
        
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-950/5 border border-amber-900/10 text-amber-900 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
          >
            <Globe2 className="w-4 h-4" /> Global Heritage Explore
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-classic text-slate-900 mb-8 leading-tight uppercase tracking-tight"
          >
            {t('tourism_title')} <br/><span className="text-amber-700 italic drop-shadow-sm">{t('tourism_subtitle')}</span>
          </motion.h2>
          <p className="text-2xl md:text-4xl font-serif-classic text-slate-600 max-w-5xl mx-auto italic mb-16 leading-relaxed opacity-80">
            Navoiy viloyati — qadimiy sivilizatsiyalar chorrahasi, Buyuk Ipak yo'lining mahobatli manzili va jahon ilm-faniga hissa qo'shgan mutafakkirlar yurti.
          </p>
        </div>

        {/* Improved Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {monuments.map((m: any, i: number) => (
            <motion.div 
              layoutId={`card-tourism-${i}`}
              key={i} 
              onClick={() => setSelectedId(i)}
              className="glass-card rounded-[4rem] border-2 border-amber-100/50 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(166,124,0,0.15)] transition-all duration-700 group flex flex-col md:flex-row h-full cursor-pointer bg-white/95 relative"
              whileHover={{ y: -15 }}
            >
              <div className="w-full md:w-2/5 h-80 md:h-auto overflow-hidden relative shrink-0">
                <motion.img 
                  layoutId={`img-tourism-${i}`}
                  src={m.gallery?.[0]} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-amber-900/80 backdrop-blur-md text-white text-[9px] font-black rounded-full uppercase tracking-widest border border-white/20">
                  {m.period}
                </div>
              </div>
              
              <div className="p-10 md:p-12 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                     {m.wiki_data?.UNESCO_status?.includes('UNESCO') && (
                       <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                          <ShieldCheck size={12} className="text-emerald-600" />
                          <span className="text-[8px] font-black uppercase text-emerald-700 tracking-tighter">UNESCO Heritage</span>
                       </div>
                     )}
                     <span className="text-[9px] font-black uppercase text-amber-600/60 tracking-widest">Monument No. 0{i+1}</span>
                  </div>
                  <motion.h3 layoutId={`title-tourism-${i}`} className="text-3xl md:text-4xl font-classic text-slate-950 mb-6 group-hover:text-amber-800 transition-colors uppercase leading-none">
                    {m.title}
                  </motion.h3>
                  <p className="text-xl font-serif-classic text-slate-700 leading-relaxed italic line-clamp-3 opacity-70 mb-10">
                    {m.desc}
                  </p>
                </div>
                
                <div className="pt-8 border-t border-amber-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg">
                       <MapPin size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{m.wiki_data?.location}</span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 group-hover:bg-amber-700 group-hover:text-white transition-all shadow-sm">
                    <ArrowRight className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Senior Wikipedia-style Interaction Modal */}
      <AnimatePresence mode="wait">
        {selectedId !== null && currentMonument && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl"
              onClick={closeModal}
            />
            
            <motion.div 
              layoutId={`card-tourism-${selectedId}`}
              className="relative w-full max-w-[1500px] bg-white rounded-[4rem] border-4 border-amber-200/50 overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row h-full max-h-[95vh] lg:max-h-[90vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column: Gallery & Visual HUD */}
              <div className="w-full lg:w-[45%] h-[400px] lg:h-auto relative bg-[#080808] shrink-0 border-r-2 border-amber-100/50 group/gal">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImgIdx}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    src={currentMonument.gallery[activeImgIdx]} 
                    className="w-full h-full object-cover opacity-80"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
                
                {/* Visual HUD Layer */}
                <div className="absolute top-10 left-10 pointer-events-none">
                   <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black uppercase text-white tracking-[0.4em]">LIVE: Historical Archive View</span>
                   </div>
                </div>

                {/* Gallery Thumbnails HUD */}
                <div className="absolute bottom-12 left-12 right-12 z-20">
                  <div className="flex gap-4 p-4 bg-black/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 overflow-x-auto scrollbar-hide shadow-3xl">
                    {currentMonument.gallery.map((img: string, idx: number) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveImgIdx(idx)}
                        className={`w-28 h-28 rounded-3xl overflow-hidden border-2 transition-all shrink-0 ${activeImgIdx === idx ? 'border-amber-400 scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'border-white/10 opacity-40 hover:opacity-100'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between pointer-events-none">
                  <button 
                    onClick={() => setActiveImgIdx((prev) => (prev > 0 ? prev - 1 : currentMonument.gallery.length - 1))}
                    className="p-6 rounded-full bg-white/10 backdrop-blur-xl text-white pointer-events-auto hover:bg-amber-600 transition-all border border-white/20 shadow-2xl active:scale-90"
                  >
                    <ChevronLeft size={40} />
                  </button>
                  <button 
                    onClick={() => setActiveImgIdx((prev) => (prev < currentMonument.gallery.length - 1 ? prev + 1 : 0))}
                    className="p-6 rounded-full bg-white/10 backdrop-blur-xl text-white pointer-events-auto hover:bg-amber-600 transition-all border border-white/20 shadow-2xl active:scale-90"
                  >
                    <ChevronRight size={40} />
                  </button>
                </div>
              </div>

              {/* Right Column: Information Architecture */}
              <div className="w-full lg:w-[55%] flex flex-col bg-[#fffdfa] overflow-hidden parchment-texture">
                {/* Modal Header */}
                <div className="p-10 border-b-2 border-amber-100 flex justify-between items-center bg-white/90 backdrop-blur-xl z-30 sticky top-0">
                   <div>
                      <motion.h4 layoutId={`title-tourism-${selectedId}`} className="text-4xl md:text-6xl font-classic text-slate-950 uppercase leading-none tracking-tighter">{currentMonument.title}</motion.h4>
                      <div className="flex items-center gap-5 mt-4">
                         <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full border border-amber-200">
                           <Award className="w-3.5 h-3.5 text-amber-700" />
                           <span className="text-[10px] font-black uppercase text-amber-800 tracking-widest">{currentMonument.period}</span>
                         </div>
                         <div className="h-1.5 w-1.5 bg-slate-300 rounded-full"></div>
                         <span className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">Scientific Heritage Database</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <button className="p-5 bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-700 rounded-full transition-all shadow-sm border border-slate-100"><Share2 size={28} /></button>
                      <button 
                        onClick={closeModal}
                        className="p-6 bg-slate-950 text-white hover:bg-red-600 rounded-full transition-all shadow-2xl active:scale-90"
                      >
                        <X size={36} />
                      </button>
                   </div>
                </div>

                {/* Wikipedia-style Scrollable Content */}
                <div className="flex-grow overflow-y-auto p-12 md:p-16 space-y-20 scrollbar-hide">
                  
                  {/* Article Introduction */}
                  <div className="flex flex-col xl:flex-row gap-12 items-start">
                     <div className="flex-grow space-y-12 order-2 xl:order-1">
                        <section>
                           <h5 className="text-[12px] font-black uppercase tracking-[0.5em] text-amber-800 mb-8 flex items-center gap-4">
                              <HistoryIcon className="text-amber-600" size={24} /> Tarixiy Umumlashtirish
                           </h5>
                           <p className="text-2xl md:text-3xl font-serif-classic italic text-slate-800 leading-relaxed bg-white p-12 rounded-[3.5rem] border-l-[15px] border-amber-500/30 shadow-2xl relative">
                              <Quote className="absolute -top-6 -left-6 text-amber-200" size={70} />
                              {currentMonument.long_desc || currentMonument.desc}
                           </p>
                        </section>

                        <section className="grid sm:grid-cols-2 gap-8">
                           <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl hover:border-amber-400 transition-colors group">
                              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                 <Building size={28} />
                              </div>
                              <h6 className="text-xl font-classic text-slate-900 mb-3 uppercase">Me'moriy Uslub</h6>
                              <p className="text-lg font-serif-classic text-slate-500 italic leading-relaxed">{currentMonument.wiki_data?.architectural_style || "Klassik O'rta Osiyo me'morchiligi"}</p>
                           </div>
                           <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl hover:border-emerald-400 transition-colors group">
                              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                 <ShieldCheck size={28} />
                              </div>
                              <h6 className="text-xl font-classic text-slate-900 mb-3 uppercase">Muhofaza Maqomi</h6>
                              <p className="text-lg font-serif-classic text-slate-500 italic leading-relaxed">{currentMonument.wiki_data?.status}</p>
                           </div>
                        </section>
                     </div>

                     {/* Wikipedia Infobox Sidebar */}
                     <aside className="w-full xl:w-96 shrink-0 order-1 xl:order-2">
                        <div className="bg-white border-4 border-amber-200 rounded-[4rem] overflow-hidden shadow-3xl sticky top-4">
                           <div className="royal-gradient p-8 text-center border-b-2 border-amber-200">
                              <h5 className="text-[14px] font-black uppercase text-white tracking-[0.2em]">{currentMonument.title}</h5>
                              <p className="text-[10px] text-amber-300 font-bold uppercase mt-1">Fact Sheet</p>
                           </div>
                           <div className="p-10 space-y-8">
                              <div className="rounded-[2.5rem] overflow-hidden shadow-inner border-2 border-amber-50 p-2">
                                 <img src={currentMonument.gallery[0]} className="w-full h-56 object-cover rounded-[2rem]" />
                              </div>
                              <div className="space-y-6">
                                 {Object.entries(currentMonument.wiki_data || {}).map(([key, val]: any) => (
                                   <div key={key} className="flex flex-col border-b border-slate-50 pb-4 last:border-none">
                                      <p className="text-[10px] font-black uppercase text-amber-800/50 mb-1">{key.replace('_', ' ')}</p>
                                      <p className="text-lg font-bold text-slate-900 font-serif-classic italic">{val}</p>
                                   </div>
                                 ))}
                              </div>
                              <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4">
                                 <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                                 <span className="text-[10px] font-black uppercase text-emerald-700 tracking-widest">Global Status: Active</span>
                              </div>
                           </div>
                        </div>
                     </aside>
                  </div>

                  {/* Scientific Section */}
                  <section className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-4xl">
                     <div className="absolute inset-0 opacity-10 animated-pattern pointer-events-none" />
                     <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
                        <div className="shrink-0">
                           <div className="w-40 h-40 royal-gradient rounded-[3rem] flex items-center justify-center border-4 border-white/20 shadow-inner">
                              <Compass size={80} className="text-amber-400 animate-[spin_10s_linear_infinite]" />
                           </div>
                        </div>
                        <div className="flex-grow">
                           <h5 className="text-3xl font-classic mb-6 uppercase tracking-widest text-amber-500">Navoiyshunoslik nigohida</h5>
                           <p className="text-2xl font-serif-classic italic text-slate-300 leading-relaxed mb-10 opacity-80">
                              Hazrat Navoiy davrida ushbu hududlar ma'rifat markazlari bo'lib, Shohruxiya va Husayn Boyqaro davlat boshqaruvi tizimida muhim strategik hamda madaniy ahamiyatga ega bo'lgan.
                           </p>
                           <button className="px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-4">
                              <FileSearch size={24} className="text-amber-500" /> Ilmiy Tadqiqotni Yuklash (PDF)
                           </button>
                        </div>
                     </div>
                  </section>

                  {/* Final Actions HUD */}
                  <div className="sticky bottom-0 bg-[#fffdfa]/90 backdrop-blur-3xl pt-10 pb-4 z-40">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <button 
                          onClick={() => onOpenTour(currentMonument.title, `https://www.youtube.com/embed/${mainVideoId}?autoplay=1`)}
                          className="py-8 royal-gradient text-white font-black rounded-[3rem] uppercase tracking-[0.3em] text-[12px] shadow-3xl flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all"
                        >
                           <Play size={28} fill="currentColor" /> Virtual Sayohat (360°)
                        </button>
                        <button className="py-8 bg-slate-950 text-white font-black rounded-[3rem] uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-4 hover:bg-amber-700 transition-all shadow-xl">
                           <MapIcon size={28} /> Google Maps Navigation
                        </button>
                        <button className="py-8 bg-white border-4 border-amber-400 text-amber-900 font-black rounded-[3rem] uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-4 hover:bg-amber-50 transition-all shadow-xl sm:col-span-2 lg:col-span-1">
                           <ExternalLink size={28} /> UNESCO World Heritage Data
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <IslimiyDivider />
    </section>
  );
};

export default Tourism;

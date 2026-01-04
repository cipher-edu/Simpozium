import React, { useState, useEffect, useRef } from 'react';
import { Language, PastSymposium } from '../types';
import { translations } from '../translations';
import { SectionTitleDecoration, IslimiyDivider } from './PatternBackground';
import { motion, AnimatePresence } from 'framer-motion';
// Import Loader2 from lucide-react to fix the "Cannot find name 'Loader2'" error
import { 
  History as HistoryIcon, Book, Globe, Users, FileText, Download, 
  Camera, Search, Filter, Mic2, Box, X, Maximize2, Sparkles,
  Layers, Database, Landmark, Eye, ZoomIn, Info, SearchCode,
  Rotate3d, Scan, Fingerprint, BookOpen, Quote, Calendar,
  ShieldCheck, Share2, MousePointer2, Loader2
} from 'lucide-react';

interface SymposiumArchiveProps {
  language: Language;
  fullPage?: boolean;
}

const SymposiumArchive: React.FC<SymposiumArchiveProps> = ({ language, fullPage }) => {
  const getTransData = (key: string): any => {
    return (translations[language] as any)?.[key] || (translations.uz as any)[key] || [];
  };

  const t = (key: string): any => (translations[language] as any)?.[key] || (translations.uz as any)[key] || key;
  
  const symposiums: PastSymposium[] = getTransData('past_symposiums');
  const [activeId, setActiveId] = useState<string>(symposiums[0]?.id || "");
  const [selectedARBook, setSelectedARBook] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeSymp = symposiums.find(s => s.id === activeId) || symposiums[0];

  const handleYearChange = (id: string) => {
    setActiveId(id);
    if (contentRef.current) contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const manuscripts = [
    { 
      id: 'm1', 
      title: "Xamsa: Hayratul-abror", 
      year: "1483-yil", 
      origin: "Hirot", 
      script: "Nasta'liq",
      author: "Alisher Navoiy",
      img: "https://navoisport.uz/wp-content/uploads/2026/01/nano-banana-1767111268939.png",
      details: "Ushbu qo'lyozma Navoiyning shaxsan o'zi tomonidan nazorat qilingan va Sulton Husayn Boyqaro kutubxonasi uchun tayyorlangan nodir nusxadir.",
      stats: { pages: 284, illustrations: 12, quality: "Ultra HD" },
      annotations: [
        { x: 30, y: 40, label: "Zarhal unvon", text: "Asarning boshlanishi - basmala va hamd qismi o'ta nozik girih naqshlari bilan bezatilgan." },
        { x: 70, y: 60, label: "Xattotlik namunasi", text: "Xattot Sulton Ali Mashhadiy tomonidan bitilgan klassik nasta'liq xati." }
      ]
    },
    { 
      id: 'm2', 
      title: "Devoni Foniy", 
      year: "1492-yil", 
      origin: "Samarqand", 
      script: "Kufiy-Nasta'liq",
      author: "Alisher Navoiy (Foniy)",
      img: "https://picsum.photos/seed/ms2/800/1000",
      details: "Navoiyning forsiy tildagi g'azallari to'plami. Hirot miniatyura maktabining eng sara namunalari bilan bezatilgan.",
      stats: { pages: 312, illustrations: 6, quality: "8K Skaner" },
      annotations: [
        { x: 50, y: 50, label: "Miniatyura", text: "Tasvirlar Navoiyning ishq va irfon haqidagi falsafiy qarashlarini aks ettiradi." }
      ]
    }
  ];

  const toggleZoom = () => setZoomLevel(prev => prev === 1 ? 2.5 : 1);

  // Skanerlash simulyatsiyasi
  useEffect(() => {
    if (selectedARBook) {
      setScanProgress(0);
      const timer = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [selectedARBook]);

  if (!activeSymp) {
    return (
      <div className="py-60 text-center font-serif-classic italic text-slate-400 bg-[#faf7f0]">
        <div className="animate-pulse flex flex-col items-center">
          <Database className="w-16 h-16 mb-4 opacity-20" />
          <p>Arxiv ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <section id="archive" className={`relative overflow-hidden ${fullPage ? 'pt-48 pb-32 min-h-screen bg-[#faf7f0]' : 'py-24 bg-[#fcf8ee]'} parchment-texture`} ref={contentRef}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitleDecoration />
        
        <div className="text-center mb-24">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-classic text-slate-900 mb-8 uppercase tracking-[0.2em] leading-none">
            {t('archive_title')}
          </motion.h2>
          <p className="text-2xl font-serif-classic text-slate-600 max-w-4xl mx-auto italic leading-relaxed">O'tgan yillardagi ilmiy natijalar va raqamlashtirilgan noyob meros.</p>
        </div>

        {/* Timeline Selector */}
        <div className="flex justify-center gap-10 md:gap-20 mb-32 overflow-x-auto pb-10 scrollbar-hide">
           {symposiums.map(symp => (
             <button key={symp.id} onClick={() => handleYearChange(symp.id)} className={`relative group flex flex-col items-center ${activeId === symp.id ? 'scale-125' : 'opacity-40 hover:opacity-80'} transition-all duration-700`}>
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-classic font-black border-4 ${activeId === symp.id ? 'royal-gradient text-white border-amber-400 shadow-3xl' : 'bg-white text-amber-900 border-amber-100'}`}>{symp.year}</div>
                {activeId === symp.id && <motion.div layoutId="archive-dot" className="absolute -bottom-8 w-4 h-4 bg-amber-900 rounded-full" />}
             </button>
           ))}
        </div>

        {/* AR Manuscript Showcase Section */}
        <div className="mb-40">
           <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
              <div className="max-w-2xl">
                 <h3 className="text-4xl font-classic text-slate-900 mb-4 uppercase tracking-widest flex items-center gap-4">
                   <Box className="text-amber-600 w-10 h-10 animate-pulse" /> Interfaol AR-Muzey
                 </h3>
                 <p className="text-xl font-serif-classic italic text-slate-500">Hazrat Navoiyning nodir qo'lyozmalarini 3D formatda va ultra-HD raqamli skanerda o'rganing.</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 px-6 py-3 bg-emerald-50 rounded-full text-[10px] font-black uppercase text-emerald-700 border border-emerald-100 shadow-sm">
                    <Scan size={16} /> 8K Scan Ready
                 </div>
              </div>
           </div>

           <div className="grid lg:grid-cols-2 gap-10">
              {manuscripts.map((ms, i) => (
                <motion.div 
                  key={ms.id} 
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="glass-card rounded-[4rem] border border-amber-200/50 p-12 bg-white/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedARBook(ms)}
                >
                   <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-amber-900 group-hover:scale-125 transition-transform"><Rotate3d size={240} /></div>
                   <div className="flex gap-10 items-center relative z-10">
                      <div className="relative shrink-0 perspective-1000">
                        <div className="w-48 h-64 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 transform group-hover:[transform:rotateY(-25deg)] transition-transform duration-1000 preserve-3d">
                           <img src={ms.img} className="w-full h-full object-cover" alt={ms.title} />
                           <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-16 h-16 royal-gradient rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-125 transition-transform border-4 border-white">
                           <Eye size={24} />
                        </div>
                      </div>
                      <div className="flex-grow">
                         <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{ms.year}</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{ms.origin}</span>
                         </div>
                         <h4 className="text-3xl font-classic text-slate-900 mb-6 group-hover:text-amber-800 transition-colors uppercase leading-tight">{ms.title}</h4>
                         <div className="flex flex-wrap gap-3">
                            <button className="px-6 py-4 royal-gradient text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-3">
                               <Maximize2 className="w-4 h-4" /> Laboratoriyada ochish
                            </button>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Statistics & Rest of Archive */}
        <motion.div key={activeId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24">
           <div className="grid md:grid-cols-3 gap-10">
              {[
                { icon: <Mic2 />, label: "Spikerlar", val: activeSymp.stats?.speakers || 0 },
                { icon: <FileText />, label: "Maqolalar", val: activeSymp.stats?.articles || 0 },
                { icon: <Globe />, label: "Davlatlar", val: activeSymp.stats?.countries || 0 }
              ].map((s, i) => (
                <div key={i} className="glass-card p-12 rounded-[3.5rem] bg-white border-slate-50 text-center shadow-xl hover:shadow-2xl transition-all">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl mx-auto mb-6 flex items-center justify-center text-amber-600 shadow-inner">{s.icon}</div>
                   <p className="text-5xl font-classic text-slate-900 mb-2">{s.val}</p>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{s.label}</p>
                </div>
              ))}
           </div>

           <div className="glass-card rounded-[4rem] border-amber-200 overflow-hidden bg-white/90 shadow-3xl">
              <div className="royal-gradient p-12 md:p-20 text-white relative">
                 <h3 className="text-4xl md:text-6xl font-classic uppercase mb-8 leading-tight">{activeSymp.theme}</h3>
                 <p className="text-2xl font-serif-classic italic opacity-80 leading-relaxed border-l-8 border-amber-500/50 pl-10 max-w-5xl">{activeSymp.description}</p>
              </div>
              <div className="p-12 md:p-20 grid lg:grid-cols-2 gap-20">
                 <div className="space-y-10">
                    <h4 className="text-3xl font-classic text-slate-900 uppercase tracking-widest flex items-center gap-4"><Book className="text-amber-600" /> Ilmiy To'plamlar</h4>
                    {activeSymp.books?.map(book => (
                      <div key={book.id} className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center gap-10 group hover:bg-white hover:shadow-2xl transition-all">
                        <div className="w-32 h-44 bg-amber-900 rounded-xl shadow-2xl shrink-0 border-4 border-white transform group-hover:[transform:rotateY(-15deg)] transition-transform" />
                        <div>
                           <h5 className="text-2xl font-classic text-slate-900 mb-4">{book.title}</h5>
                           <button className="px-8 py-3 royal-gradient text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-3">
                              <Download className="w-4 h-4" /> PDF Yuklab Olish
                           </button>
                        </div>
                      </div>
                    ))}
                 </div>
                 <div className="space-y-10">
                    <h4 className="text-3xl font-classic text-slate-900 uppercase tracking-widest flex items-center gap-4"><Camera className="text-amber-600" /> Tarixiy Galereya</h4>
                    <div className="grid grid-cols-2 gap-6">
                       {activeSymp.gallery?.map((img, i) => (
                         <div key={i} className={`relative rounded-3xl overflow-hidden shadow-xl h-48 group/img ${i === 0 ? 'col-span-2' : ''}`}>
                            <img src={img} className="w-full h-full object-cover transition-transform duration-[3s] group-hover/img:scale-110" alt="Gallery" />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>

      {/* ENHANCED AR LABORATORY MODAL */}
      <AnimatePresence>
        {selectedARBook && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-10">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl" onClick={() => { setSelectedARBook(null); setZoomLevel(1); }} />
             
             <motion.div 
               initial={{ scale: 0.8, opacity: 0, y: 100 }} 
               animate={{ scale: 1, opacity: 1, y: 0 }} 
               exit={{ scale: 0.8, opacity: 0, y: 100 }}
               className="relative w-full max-w-[1600px] h-[90vh] bg-[#fffdfa] rounded-[5rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.8)] border-[12px] border-amber-100/50 flex flex-col lg:flex-row z-10"
             >
                {/* HUD Overlay for AR effect */}
                <div className="absolute inset-0 pointer-events-none z-50 border-[60px] border-transparent">
                   <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-amber-500/30 rounded-tl-[4rem] flex items-start justify-start p-6">
                      <div className="w-4 h-4 bg-amber-500/20 rounded-full animate-ping" />
                   </div>
                   <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-amber-500/30 rounded-tr-[4rem]" />
                   <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-amber-500/30 rounded-bl-[4rem]" />
                   <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-amber-500/30 rounded-br-[4rem]" />
                   
                   {/* Scanning Text */}
                   <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
                      <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                      <span className="text-[10px] font-black uppercase text-white tracking-[0.4em]">
                        {scanProgress < 100 ? `Skanerlanmoqda: ${scanProgress}%` : "Skanerlash muvaffaqiyatli yakunlandi"}
                      </span>
                   </div>
                </div>

                {/* Left side: Digital AR Viewer */}
                <div className="w-full lg:w-3/5 relative bg-[#080808] overflow-hidden flex items-center justify-center group/viewer cursor-crosshair">
                   {/* Control Panel Overlay */}
                   <div className="absolute top-12 left-12 z-40 flex flex-col gap-5">
                      <div className="p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] text-white shadow-2xl">
                         <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-3">Linza Kattaligi</p>
                         <div className="flex items-center gap-6">
                            <span className="text-4xl font-classic text-white">{zoomLevel.toFixed(1)}x</span>
                            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                               <motion.div animate={{ width: `${(zoomLevel / 3) * 100}%` }} className="h-full bg-amber-500 shadow-[0_0_15px_#f59e0b]" />
                            </div>
                         </div>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={toggleZoom} className="p-6 bg-amber-500 text-slate-950 rounded-3xl shadow-2xl hover:scale-110 transition-all active:scale-90"><ZoomIn size={28} /></button>
                        <button onClick={() => setShowAnnotation(!showAnnotation)} className={`p-6 rounded-3xl shadow-2xl hover:scale-110 transition-all active:scale-90 ${showAnnotation ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white border border-white/10'}`}><SearchCode size={28} /></button>
                      </div>
                   </div>

                   {/* Main Manuscript Viewer */}
                   <motion.div 
                      className="relative w-full h-full flex items-center justify-center perspective-2000"
                      animate={{ scale: zoomLevel }}
                      drag={zoomLevel > 1}
                      dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
                   >
                      <motion.div 
                         animate={{ 
                            rotateY: zoomLevel === 1 ? [-10, 10, -10] : 0, 
                            rotateX: zoomLevel === 1 ? [0, 5, 0] : 0 
                         }} 
                         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                         className="relative w-[450px] md:w-[600px] aspect-[3/4] preserve-3d"
                      >
                         {/* manuscript container */}
                         <div className="absolute inset-0 bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-[0_80px_120px_rgba(0,0,0,0.9)] border-l-[45px] border-l-amber-950 border-r-8 border-r-amber-900/50">
                            <img src={selectedARBook.img} className={`w-full h-full object-cover transition-all duration-1000 ${scanProgress < 100 ? 'brightness-50 grayscale' : 'brightness-100 grayscale-0'}`} alt="Vault" />
                            
                            {/* Digital Scanline */}
                            <motion.div 
                               animate={{ top: ['-10%', '110%'] }} 
                               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                               className="absolute left-0 right-0 h-2 bg-amber-400/40 blur-md z-30 pointer-events-none" 
                            />

                            {/* Annotations Layer */}
                            {showAnnotation && selectedARBook.annotations.map((ann: any, idx: number) => (
                               <div 
                                 key={idx} 
                                 className="absolute z-40 group/ann" 
                                 style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
                               >
                                  <motion.div 
                                    animate={{ scale: [1, 1.4, 1], boxShadow: ["0 0 0px rgba(245,158,11,0)", "0 0 30px rgba(245,158,11,0.6)", "0 0 0px rgba(245,158,11,0)"] }} 
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-10 h-10 bg-amber-500 rounded-full border-4 border-white cursor-pointer shadow-2xl flex items-center justify-center"
                                  >
                                    <Info size={20} className="text-white" />
                                  </motion.div>
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-72 p-6 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-3xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none border border-amber-100">
                                     <p className="text-[11px] font-black uppercase text-amber-600 mb-2 flex items-center gap-2"><Sparkles size={14} /> {ann.label}</p>
                                     <p className="text-lg font-serif-classic italic text-slate-800 leading-relaxed">{ann.text}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </motion.div>
                   </motion.div>

                   {/* Footer Info HUD */}
                   <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center z-40">
                      <div className="flex items-center gap-6 bg-black/60 backdrop-blur-2xl px-8 py-4 rounded-3xl border border-white/10 text-white">
                         <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500"><MousePointer2 size={24} /></div>
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Interfaol Rejim</p>
                            <p className="text-sm opacity-60">Sichqoncha bilan 3D aylantiring va detallarni bosing</p>
                         </div>
                      </div>
                      <div className="flex gap-3">
                         {[1,2,3].map(i => <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }} className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />)}
                      </div>
                   </div>
                </div>

                {/* Right side: Manuscript Metadata Paneli */}
                <div className="w-full lg:w-2/5 flex flex-col bg-white overflow-hidden parchment-texture">
                   <div className="p-12 border-b border-amber-100 flex justify-between items-center bg-white/80 backdrop-blur-xl sticky top-0 z-20">
                      <div>
                         <h3 className="text-4xl font-classic text-slate-900 uppercase leading-none mb-2">Metadata Vault</h3>
                         <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Arxiv raqami: #NAV-2025-ARX</span>
                         </div>
                      </div>
                      <button 
                        onClick={() => { setSelectedARBook(null); setZoomLevel(1); }} 
                        className="p-6 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-all shadow-md active:scale-90"
                      >
                        <X size={32} />
                      </button>
                   </div>

                   <div className="flex-grow overflow-y-auto p-12 md:p-16 space-y-16 scrollbar-hide">
                      <div>
                         <span className="text-[11px] font-black uppercase tracking-[0.5em] text-amber-600 mb-6 block flex items-center gap-3">
                            <HistoryIcon size={16} /> Tarixiy Hujjat Tafsilotlari
                         </span>
                         <h4 className="text-5xl md:text-7xl font-classic text-slate-950 mb-8 uppercase leading-tight">{selectedARBook.title}</h4>
                         <p className="text-2xl md:text-3xl font-serif-classic italic text-slate-700 leading-relaxed border-l-[12px] border-amber-200 pl-10">
                            {selectedARBook.details}
                         </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         {[
                           { label: "Asosiy Muallif", val: selectedARBook.author, icon: <Users size={20} /> },
                           { label: "Xattotlik Uslubi", val: selectedARBook.script, icon: <Layers size={20} /> },
                           { label: "Saqlanish Joyi", val: selectedARBook.origin, icon: <Landmark size={20} /> },
                           { label: "Hujjat Yili", val: selectedARBook.year, icon: <Calendar size={20} /> }
                         ].map((spec, idx) => (
                           <div key={idx} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] group hover:border-amber-400 hover:bg-white transition-all shadow-sm">
                              <div className="text-amber-600 mb-4">{spec.icon}</div>
                              <p className="text-[10px] font-black uppercase text-slate-400 mb-2">{spec.label}</p>
                              <p className="text-xl font-bold text-slate-900 font-serif-classic italic">{spec.val}</p>
                           </div>
                         ))}
                      </div>

                      {/* Technical Specs Vault */}
                      <div className="bg-[#0c1a25] rounded-[3.5rem] p-12 text-white relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-12 opacity-5 text-amber-500"><Database size={120} /></div>
                         <div className="relative z-10">
                            <h5 className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500 mb-10 flex items-center gap-4">
                               <ShieldCheck size={20} /> Raqamlashtirish Sertifikati
                            </h5>
                            <div className="grid grid-cols-3 gap-6">
                               <div className="text-center">
                                  <p className="text-3xl font-classic text-white mb-2">{selectedARBook.stats.pages}</p>
                                  <p className="text-[9px] font-black uppercase text-slate-500">Sahifa</p>
                               </div>
                               <div className="text-center">
                                  <p className="text-3xl font-classic text-white mb-2">{selectedARBook.stats.illustrations}</p>
                                  <p className="text-[9px] font-black uppercase text-slate-500">Miniatyura</p>
                               </div>
                               <div className="text-center">
                                  <p className="text-3xl font-classic text-amber-500 mb-2">{selectedARBook.stats.quality}</p>
                                  <p className="text-[9px] font-black uppercase text-slate-500">Sifat</p>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="pt-10 flex flex-col gap-5">
                         <button className="w-full py-8 royal-gradient text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(0,77,97,0.4)] flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all">
                            <BookOpen size={24} /> Qo'lyozmani Varaqlash
                         </button>
                         <div className="grid grid-cols-2 gap-5">
                            <button className="py-6 bg-white border-2 border-slate-950 text-slate-950 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-950 hover:text-white transition-all">
                               <Share2 size={18} /> Bo'lishish
                            </button>
                            <button className="py-6 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-600 hover:text-white transition-all">
                               <Download size={18} /> Eksport
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {fullPage && <IslimiyDivider />}
    </section>
  );
};

export default SymposiumArchive;
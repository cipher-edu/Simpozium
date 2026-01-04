
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Mail, Linkedin, GraduationCap, Quote, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { Language } from '../types.ts';
import { translations } from '../translations.ts';
import { IslimiyDivider } from './PatternBackground.tsx';

interface SpeakersProps {
  fullPage?: boolean;
  language: Language;
}

const Speakers: React.FC<SpeakersProps> = ({ fullPage, language }) => {
  const t = (key: string): any => {
    return (translations[language] as any)?.[key] || (translations.uz as any)[key] || key;
  };

  const speakersList = (translations[language] as any)?.speakers_list || translations.uz.speakers_list || [];
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSpeakers = (speakersList || []).filter((s: any) => 
    s?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s?.inst?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s?.topic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const images = [
    'https://ui-avatars.com/api/?name=Oybek+Abduraimov&background=111&color=d4af37&bold=true&size=512',
    'https://ui-avatars.com/api/?name=Selahattin+Tolkun&background=111&color=d4af37&bold=true&size=512',
    'https://ui-avatars.com/api/?name=Benedek+Peri&background=111&color=d4af37&bold=true&size=512',
    'https://ui-avatars.com/api/?name=Marc+Toutant&background=111&color=d4af37&bold=true&size=512'
  ];

  return (
    <section className={`relative overflow-hidden ${fullPage ? 'pt-48 pb-32 min-h-screen bg-[#001524]' : 'py-32 bg-[#001524]'} text-white`}>
      {/* Background Girih Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0L120 60L60 120L0 60Z' fill='%23d4af37'/%3E%3C/svg%3E")` }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
             <div className="px-6 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
               <Sparkles className="w-3 h-3" /> Global Scientific Community
             </div>
          </motion.div>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl md:text-9xl font-classic mb-10 uppercase tracking-widest text-transparent bg-clip-text gold-gradient leading-none">
            {t('speakers_title')}
          </motion.h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
             <div className="relative flex-grow group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5 transition-transform group-focus-within:scale-110" />
                <input 
                  type="text" 
                  placeholder="Ma'ruzachi yoki mavzu bo'yicha qidirish..."
                  className="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:bg-white/10 focus:border-amber-500/50 transition-all font-serif-classic text-xl italic"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
          {filteredSpeakers.map((speaker: any, i: number) => (
            <motion.div 
              layoutId={`speaker-card-${i}`}
              key={i} 
              onClick={() => setSelectedId(i)}
              className="group relative flex flex-col items-center cursor-pointer"
            >
              <div className="relative w-64 h-64 mb-10 transition-transform duration-700 group-hover:scale-105">
                 <div className="absolute inset-0 border-2 border-amber-500/20 rounded-[3rem] rotate-45 group-hover:rotate-90 transition-transform duration-1000"></div>
                 {speaker.isKeynote && (
                   <div className="absolute -top-4 -right-4 z-20 bg-amber-500 text-slate-950 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                      Keynote
                   </div>
                 )}
                 <motion.div layoutId={`speaker-img-container-${i}`} className="absolute inset-4 overflow-hidden rounded-[3rem] shadow-2xl bg-slate-800 border-2 border-white/10">
                    <motion.img layoutId={`speaker-img-${i}`} src={images[i % images.length]} alt={speaker.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                 </motion.div>
              </div>
              <div className="text-center w-full px-4">
                <motion.h3 layoutId={`speaker-name-${i}`} className="text-2xl md:text-3xl font-classic font-black text-amber-100 mb-2 uppercase group-hover:text-amber-400 transition-colors">{speaker.name}</motion.h3>
                <motion.p layoutId={`speaker-title-${i}`} className="text-xs font-bold text-amber-600/70 tracking-widest uppercase italic mb-4">{speaker.title}</motion.p>
                <div className="h-px w-12 bg-amber-500/20 mx-auto mb-4 group-hover:w-20 transition-all"></div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-2 line-clamp-2 italic group-hover:text-slate-300 transition-colors">"{speaker.topic}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId !== null && filteredSpeakers[selectedId] && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl" onClick={() => setSelectedId(null)} />
            
            <motion.div 
              layoutId={`speaker-card-${selectedId}`} 
              className="relative w-full max-w-7xl bg-[#001c30] rounded-[4rem] border border-amber-500/30 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row h-full max-h-[90vh] z-10"
            >
              {/* Chap ustun: Media va Havolalar */}
              <div className="w-full lg:w-[35%] relative h-[350px] lg:h-auto shrink-0 bg-slate-900 border-r border-amber-500/10">
                 <motion.div layoutId={`speaker-img-container-${selectedId}`} className="w-full h-full">
                    <motion.img layoutId={`speaker-img-${selectedId}`} src={images[selectedId % images.length]} className="w-full h-full object-cover opacity-80" />
                 </motion.div>
                 <div className="absolute inset-0 bg-gradient-to-t from-[#001c30] via-[#001c30]/10 to-transparent"></div>
                 
                 <div className="absolute bottom-12 left-12 right-12 z-20">
                    <div className="flex flex-col gap-4">
                       <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-2">Bog'lanish</h5>
                       <div className="flex gap-4">
                          <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-all shadow-xl">
                             <Linkedin className="w-6 h-6" />
                          </button>
                          <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-all shadow-xl">
                             <BookOpen className="w-6 h-6" />
                          </button>
                          <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-all shadow-xl">
                             <Mail className="w-6 h-6" />
                          </button>
                       </div>
                       <button className="mt-6 w-full py-5 bg-amber-500 text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all">
                          <ExternalLink className="w-4 h-4" /> Ilmiy Profil (Scholar)
                       </button>
                    </div>
                 </div>
              </div>

              {/* O'ng ustun: Batafsil ma'lumot */}
              <div className="w-full lg:w-[65%] p-10 md:p-20 bg-[#001c30] flex flex-col relative overflow-y-auto scrollbar-hide">
                <button 
                  onClick={() => setSelectedId(null)} 
                  className="absolute top-10 right-10 p-5 bg-white/5 hover:bg-red-500/20 rounded-full text-white z-20 border border-white/10 transition-all active:scale-90"
                >
                  <X className="w-8 h-8" />
                </button>
                
                <div className="space-y-12">
                   <div>
                      {filteredSpeakers[selectedId].isKeynote && (
                         <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest mb-6 shadow-xl">
                           Asosiy Ma'ruzachi ⚜
                         </span>
                      )}
                      <motion.h3 layoutId={`speaker-name-${selectedId}`} className="text-5xl md:text-8xl font-classic font-black text-amber-100 mb-4 uppercase leading-none">
                        {filteredSpeakers[selectedId].name}
                      </motion.h3>
                      <motion.p layoutId={`speaker-title-${selectedId}`} className="text-2xl font-serif-classic italic text-amber-500/80">
                        {filteredSpeakers[selectedId].title}
                      </motion.p>
                      <p className="text-sm text-slate-400 uppercase tracking-widest mt-4 flex items-center gap-3">
                         <GraduationCap className="w-5 h-5 text-amber-600" /> {filteredSpeakers[selectedId].inst}
                      </p>
                   </div>

                   <div className="p-10 bg-white/5 rounded-[3rem] border border-amber-500/10 relative overflow-hidden group">
                      <div className="absolute -top-4 -left-4 opacity-10 text-amber-500"><Quote size={80} /></div>
                      <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-6 relative z-10">Ma'ruza Mavzusi</h5>
                      <h4 className="text-3xl md:text-4xl font-classic text-white leading-tight relative z-10 italic">
                        "{filteredSpeakers[selectedId].topic}"
                      </h4>
                   </div>

                   <div className="space-y-8">
                      <div className="flex items-center gap-4 text-amber-500">
                         <div className="h-px flex-grow bg-amber-500/20"></div>
                         <h5 className="text-[10px] font-black uppercase tracking-[0.4em] shrink-0">Biografiya va Tadqiqotlar</h5>
                         <div className="h-px flex-grow bg-amber-500/20"></div>
                      </div>
                      <p className="text-2xl font-serif-classic italic text-slate-300 leading-relaxed">
                        {filteredSpeakers[selectedId].bio}
                      </p>
                   </div>

                   <div className="flex flex-wrap gap-4">
                      {(filteredSpeakers[selectedId].interests || []).map((interest: string, idx: number) => (
                        <span key={idx} className="px-6 py-2.5 rounded-full bg-slate-800 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-amber-500/50 hover:text-amber-400 transition-all cursor-default">
                          # {interest}
                        </span>
                      ))}
                   </div>

                   <div className="pt-10 flex gap-6">
                      <button className="flex-grow py-8 royal-gradient text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all">
                        <BookOpen className="w-7 h-7" /> Annotatsiya (PDF)
                      </button>
                      <button className="px-10 py-8 bg-white/5 border border-white/10 text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
                         Dasturda ko'rish
                      </button>
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

export default Speakers;

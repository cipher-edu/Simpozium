
import React, { useState, useEffect, useRef } from 'react';
import { Language, PastSymposium } from '../types';
import { translations } from '../translations';
import { SectionTitleDecoration } from './PatternBackground';

interface SymposiumArchiveProps {
  language: Language;
}

const SymposiumArchive: React.FC<SymposiumArchiveProps> = ({ language }) => {
  const t = (key: string): any => {
    return (translations[language] as any)[key] || (translations.uz as any)[key];
  };

  const symposiums: PastSymposium[] = t('past_symposiums') || [];
  const [activeId, setActiveId] = useState<string>(symposiums[0]?.id || "");
  const [searchTerm, setSearchTerm] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (symposiums.length > 0 && !activeId) {
      setActiveId(symposiums[0].id);
    }
  }, [symposiums, activeId]);

  const activeSymp = symposiums.find(s => s.id === activeId) || symposiums[0];

  const handleYearChange = (id: string) => {
    setActiveId(id);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!activeSymp) return null;

  // Safeguards for mapped properties
  const tracks = activeSymp.tracks || [];
  const books = activeSymp.books || [];
  const outcomes = activeSymp.outcomes || [];
  const gallery = activeSymp.gallery || [];
  const stats = activeSymp.stats || { speakers: 0, articles: 0, countries: 0 };

  return (
    <section id="archive" className="py-24 bg-[#fcf8ee] relative overflow-hidden parchment-texture" ref={contentRef}>
      {/* Decorative Background Girih */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z' fill='%23a67c00'/%3E%3C/svg%3E")`,
             backgroundSize: '200px 200px'
           }} 
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitleDecoration />
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-classic text-slate-900 mb-6 uppercase tracking-[0.2em]">
            {t('archive_title')}
          </h2>
          <p className="text-xl md:text-2xl font-serif-classic text-slate-600 max-w-3xl mx-auto italic">
            {t('archive_subtitle')}
          </p>
        </div>

        {/* HORIZONTAL TIMELINE BAR */}
        <div className="relative mb-20">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-amber-200/50 -translate-y-1/2 hidden md:block"></div>
          <div className="flex justify-between md:justify-center md:gap-24 overflow-x-auto pb-8 pt-4 scrollbar-hide px-4 snap-x">
            {symposiums.map((symp, index) => (
              <button
                key={symp.id}
                onClick={() => handleYearChange(symp.id)}
                className={`relative flex flex-col items-center group transition-all duration-500 snap-center min-w-[140px] ${
                  activeId === symp.id ? 'scale-110' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xs font-black mb-4 transition-all duration-500 z-10 border-2 ${
                  activeId === symp.id 
                  ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xl' 
                  : 'bg-white text-amber-900 border-amber-100'
                }`}>
                  {index + 1}
                </div>
                <span className={`text-xl font-classic font-bold transition-all ${
                  activeId === symp.id ? 'text-amber-900' : 'text-slate-400'
                }`}>
                  {symp.year}
                </span>
                {activeId === symp.id && (
                  <div className="absolute -bottom-2 w-2 h-2 bg-amber-900 rounded-full animate-bounce"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE CONTENT BLOCK */}
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="glass-card rounded-[3.5rem] border-amber-200 shadow-2xl overflow-hidden bg-white/60 backdrop-blur-md">
            
            {/* Main Header Card with Enhanced Statistics */}
            <div className="royal-gradient p-10 md:p-16 text-white relative">
               <div className="flex flex-col xl:flex-row justify-between gap-12 mb-12">
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 flex-grow">
                    {/* Speakers Stat */}
                    <div className="relative overflow-hidden group/stat bg-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl border border-white/10 transition-all hover:bg-white/15 hover:shadow-2xl hover:border-white/20">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-amber-400/20 flex items-center justify-center text-3xl shadow-inner group-hover/stat:rotate-12 transition-transform">👤</div>
                        <div>
                          <span className="block text-5xl font-black text-amber-400 mb-1 drop-shadow-lg">{stats.speakers}</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{t('archive_stats_speakers')}</span>
                        </div>
                      </div>
                      <div className="absolute -right-4 -bottom-4 text-8xl opacity-[0.03] group-hover/stat:scale-125 transition-transform select-none">PEOPLE</div>
                    </div>

                    {/* Articles Stat */}
                    <div className="relative overflow-hidden group/stat bg-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl border border-white/10 transition-all hover:bg-white/15 hover:shadow-2xl hover:border-white/20">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-amber-400/20 flex items-center justify-center text-3xl shadow-inner group-hover/stat:rotate-12 transition-transform">📄</div>
                        <div>
                          <span className="block text-5xl font-black text-amber-400 mb-1 drop-shadow-lg">{stats.articles}</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{t('archive_stats_articles')}</span>
                        </div>
                      </div>
                      <div className="absolute -right-4 -bottom-4 text-8xl opacity-[0.03] group-hover/stat:scale-125 transition-transform select-none">PAPERS</div>
                    </div>

                    {/* Countries Stat */}
                    <div className="relative overflow-hidden group/stat bg-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl border border-white/10 transition-all hover:bg-white/15 hover:shadow-2xl hover:border-white/20">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-amber-400/20 flex items-center justify-center text-3xl shadow-inner group-hover/stat:rotate-12 transition-transform">🌍</div>
                        <div>
                          <span className="block text-5xl font-black text-amber-400 mb-1 drop-shadow-lg">{stats.countries}</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{t('archive_stats_countries')}</span>
                        </div>
                      </div>
                      <div className="absolute -right-4 -bottom-4 text-8xl opacity-[0.03] group-hover/stat:scale-125 transition-transform select-none">GLOBAL</div>
                    </div>
                 </div>
                 
                 {/* Quick Search Extra Feature */}
                 <div className="relative group self-center w-full xl:w-80">
                    <input 
                      type="text" 
                      placeholder={language === 'uz' ? "Sho'balardan qidirish..." : language === 'ru' ? "Поиск по секциям..." : "Search tracks..."}
                      className="w-full bg-white/10 border border-white/20 rounded-full px-8 py-5 outline-none focus:bg-white/20 transition-all text-sm italic placeholder-white/40 shadow-inner"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-60">🔍</span>
                 </div>
               </div>
               
               <h3 className="text-3xl md:text-5xl font-classic font-black leading-tight uppercase mb-8 tracking-tight">
                 {activeSymp.theme}
               </h3>
               <p className="text-xl md:text-2xl font-serif-classic italic opacity-80 leading-relaxed max-w-5xl border-l-4 border-amber-400/50 pl-8">
                 {activeSymp.description}
               </p>
            </div>

            <div className="p-8 md:p-16 space-y-24">
              
              {/* Tracks Section */}
              <div>
                <h4 className="font-classic text-amber-950 text-2xl font-black uppercase tracking-widest mb-10 flex items-center gap-6">
                   <span className="w-10 h-1 h-[2px] bg-amber-400"></span>
                   {t('archive_tracks_title')}
                </h4>
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x">
                  {tracks
                    .filter(tr => tr?.title?.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((track, idx) => (
                    <div key={idx} className="min-w-[280px] md:min-w-0 p-8 rounded-[2.5rem] bg-white border border-amber-100 shadow-lg hover:shadow-2xl transition-all duration-500 group snap-center">
                       <div className="text-4xl mb-6 opacity-40 group-hover:opacity-100 transition-opacity">📜</div>
                       <h5 className="text-xl font-classic font-bold text-slate-900 mb-4 leading-tight group-hover:text-amber-800">
                         {track.title}
                       </h5>
                       <p className="text-base font-serif-classic italic text-slate-600 mb-6">
                         {track.details}
                       </p>
                       <div className="flex items-center justify-between mt-auto pt-6 border-t border-amber-50">
                          <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">{track.count} PAPERS</span>
                          <span className="text-xs">➔</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3D Bookshelf Section */}
              <div>
                <h4 className="font-classic text-amber-950 text-2xl font-black uppercase tracking-widest mb-10 flex items-center gap-6">
                   <span className="w-10 h-1 h-[2px] bg-amber-400"></span>
                   {t('archive_books_title')}
                </h4>
                <div className="grid lg:grid-cols-2 gap-10">
                  {books.map((book) => (
                    <div key={book.id} className="flex flex-col sm:flex-row gap-10 p-8 bg-slate-50/50 rounded-[3rem] border border-amber-100 hover:bg-white hover:shadow-2xl transition-all group">
                       <div className="perspective-1000 shrink-0 mx-auto sm:mx-0">
                          <div className="relative w-40 h-56 bg-amber-900 rounded-sm shadow-xl transform rotate-y-[-15deg] group-hover:rotate-y-0 transition-transform duration-700 flex flex-col justify-center items-center text-center p-4 border-l-4 border-amber-700">
                             <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest mb-2">Proceedings</span>
                             <h6 className="text-[10px] font-classic font-bold text-white uppercase leading-tight">{book.title}</h6>
                             <div className="absolute bottom-4 text-[8px] text-amber-500/60 font-black">{book.year} EDITION</div>
                          </div>
                       </div>
                       <div className="flex flex-col justify-center">
                          <h5 className="text-xl font-classic font-black text-slate-900 mb-4 leading-tight uppercase">{book.title}</h5>
                          <div className="space-y-2 mb-8 text-sm font-serif-classic italic text-slate-500">
                             <p><strong>Ed:</strong> {book.editors}</p>
                             <p><strong>Vol:</strong> {book.pages} Pages</p>
                          </div>
                          <button className="flex items-center gap-3 px-8 py-3 bg-slate-950 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:gold-gradient hover:text-slate-950 transition-all shadow-md">
                             <span>{t('archive_download_proceedings')}</span>
                             <span className="text-lg">⬇</span>
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media & Outcomes Section */}
              <div className="grid lg:grid-cols-2 gap-16">
                 {/* Outcomes */}
                 <div className="p-10 bg-amber-50/50 rounded-[3rem] border border-amber-100 relative overflow-hidden">
                    <span className="absolute -bottom-6 -right-6 text-9xl opacity-[0.05]">🖋️</span>
                    <h4 className="font-classic text-amber-950 text-xl font-black uppercase tracking-widest mb-10 border-b border-amber-200 pb-4">
                      {t('archive_outcomes_title')}
                    </h4>
                    <ul className="space-y-6">
                      {outcomes.map((item, idx) => (
                        <li key={idx} className="flex gap-6 group">
                           <div className="w-8 h-8 rounded-full bg-amber-900 text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-lg">
                             {idx + 1}
                           </div>
                           <span className="text-lg font-serif-classic italic text-slate-800 leading-tight">
                             {item}
                           </span>
                        </li>
                      ))}
                    </ul>
                 </div>

                 {/* Gallery */}
                 <div>
                    <h4 className="font-classic text-amber-950 text-xl font-black uppercase tracking-widest mb-10 border-b border-amber-200 pb-4">
                      {t('archive_gallery_title')}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {gallery.map((img, idx) => (
                        <div key={idx} className={`relative overflow-hidden rounded-2xl shadow-xl group/img cursor-zoom-in ${idx === 0 ? 'col-span-2 h-56' : 'h-32'}`}>
                           <img src={img} alt="Archive" className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" />
                           <div className="absolute inset-0 bg-amber-900/10 group-hover/img:bg-transparent"></div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SymposiumArchive;

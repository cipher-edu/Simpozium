
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface SpeakersProps {
  fullPage?: boolean;
  language: Language;
}

const Speakers: React.FC<SpeakersProps> = ({ fullPage, language }) => {
  const t = (key: keyof typeof translations.uz): string => {
    const val = (translations[language] as any)[key] || (translations.uz as any)[key];
    return typeof val === 'string' ? val : key;
  };

  const speakersList = (translations[language] as any).speakers_list || translations.uz.speakers_list;
  const images = [
    'https://picsum.photos/seed/speaker1/400/400',
    'https://picsum.photos/seed/speaker2/400/400',
    'https://picsum.photos/seed/speaker3/400/400',
    'https://picsum.photos/seed/speaker4/400/400'
  ];

  return (
    <section className={`py-32 bg-[#001524] text-white overflow-hidden relative ${fullPage ? 'min-h-screen' : ''}`}>
      {/* Background Girih Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0L120 60L60 120L0 60Z' fill='%23d4af37'/%3E%3C/svg%3E")`,
             backgroundSize: '100px 100px'
           }} 
      />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-28">
          <div className="inline-block mb-6">
             <div className="flex items-center gap-3 text-amber-500 font-classic tracking-[0.4em] uppercase text-[10px] mb-4">
                <span className="w-12 h-[1px] bg-amber-500/30"></span>
                Keynote
                <span className="w-12 h-[1px] bg-amber-500/30"></span>
             </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-classic mb-8 uppercase tracking-widest text-transparent bg-clip-text gold-gradient">
            {t('speakers_title')}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto font-serif-classic text-2xl italic opacity-80">
            {t('speakers_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {speakersList.map((speaker: any, i: number) => (
            <div key={i} className="group relative flex flex-col items-center">
              {/* Octagonal (Girih) Frame Container */}
              <div className="relative w-64 h-64 mb-10 group-hover:scale-105 transition-transform duration-700">
                 {/* Rotating Border */}
                 <div className="absolute inset-0 border-2 border-amber-500/20 rounded-[2rem] rotate-45 group-hover:rotate-90 transition-transform duration-[2s]"></div>
                 <div className="absolute inset-2 border-2 border-amber-500/40 rounded-[2rem] -rotate-12 group-hover:rotate-12 transition-transform duration-[2s]"></div>
                 
                 {/* Image Mask */}
                 <div className="absolute inset-4 overflow-hidden rounded-[2.5rem] shadow-[0_0_50px_rgba(212,175,55,0.2)] bg-slate-800">
                    <img 
                      src={images[i]} 
                      alt={speaker.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
                 </div>
                 
                 {/* Decorative Corner Ornaments */}
                 <div className="absolute top-0 right-0 w-8 h-8 text-amber-500 opacity-40">❦</div>
                 <div className="absolute bottom-0 left-0 w-8 h-8 text-amber-500 opacity-40">❦</div>
              </div>

              {/* Text Content */}
              <div className="text-center w-full px-4">
                <h3 className="text-2xl font-classic font-black text-amber-100 mb-3 tracking-wide group-hover:text-amber-400 transition-colors uppercase leading-tight">
                  {speaker.name}
                </h3>
                <div className="w-12 h-[2px] gold-gradient mx-auto mb-4 opacity-40 group-hover:w-24 transition-all duration-700"></div>
                <p className="text-sm font-bold text-amber-600/90 mb-2 tracking-widest uppercase">
                  {speaker.title}
                </p>
                <p className="text-[10px] text-slate-400 mb-6 uppercase tracking-widest border-b border-slate-800 pb-4 inline-block">
                  {speaker.inst}
                </p>
                
                {/* Expandable Bio Hint */}
                <div className="relative overflow-hidden h-0 group-hover:h-24 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                   <p className="text-sm font-serif-classic text-slate-300 italic leading-relaxed pt-2">
                     {speaker.bio}
                   </p>
                </div>

                <div className="mt-6">
                   <button className="px-6 py-2 border border-amber-500/30 text-[9px] font-black uppercase tracking-widest text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all rounded-full">
                     Profile 🔗
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action for full list */}
        <div className="mt-32 text-center">
           <button className="group relative px-12 py-5 overflow-hidden rounded-full border border-amber-500/50 text-amber-500 font-black text-[10px] uppercase tracking-widest transition-all hover:border-amber-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <span className="relative z-10">Barcha Ishtirokchilar Ro'yxati</span>
              <div className="absolute inset-0 gold-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
           </button>
        </div>
      </div>
    </section>
  );
};

export default Speakers;

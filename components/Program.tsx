
import React, { useState } from 'react';
import { Language, DaySchedule } from '../types';
import { translations } from '../translations';
import { SectionTitleDecoration, IslimiyDivider } from './PatternBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Mic2, Download, CalendarPlus, ChevronRight, Info, Coffee, Users } from 'lucide-react';

interface ProgramProps {
  language: Language;
  fullPage?: boolean;
}

const Program: React.FC<ProgramProps> = ({ language, fullPage }) => {
  const t = (key: string): any => (translations[language] as any)[key] || (translations.uz as any)[key];
  const schedule: DaySchedule[] = t('schedule_data') || [];
  const [activeDay, setActiveDay] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'plenary': return 'bg-amber-900 text-amber-50 shadow-amber-900/20';
      case 'break': return 'bg-slate-50 text-slate-400 border border-slate-100';
      case 'cultural': return 'bg-emerald-800 text-emerald-50 shadow-emerald-900/20';
      default: return 'bg-blue-900 text-blue-50 shadow-blue-900/20';
    }
  };

  return (
    <section id="program" className={`relative overflow-hidden ${fullPage ? 'pt-48 pb-32 min-h-screen bg-[#fcf8ee]' : 'py-32'} parchment-texture`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitleDecoration />
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-classic text-slate-900 mb-8 uppercase tracking-[0.2em]"
          >
            {t('nav_program')}
          </motion.h2>
          <p className="text-2xl md:text-3xl font-serif-classic text-amber-900 max-w-4xl mx-auto italic leading-relaxed opacity-80">
            {t('program_subtitle')}
          </p>
        </div>

        {/* Day Toggle Tabs */}
        <div className="flex justify-center gap-6 mb-24">
          {schedule.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`group relative px-12 py-8 rounded-[2.5rem] transition-all duration-700 flex flex-col items-center ${
                activeDay === idx 
                ? 'royal-gradient text-white shadow-3xl scale-110' 
                : 'bg-white text-slate-400 border border-amber-100 hover:border-amber-400'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${activeDay === idx ? 'text-amber-300' : 'text-slate-400'}`}>
                {t('program_day')} {day.day}
              </span>
              <span className="text-3xl font-classic font-bold">{day.date}</span>
              {activeDay === idx && (
                 <motion.div layoutId="day-glow" className="absolute -inset-2 rounded-[3rem] blur-xl royal-gradient opacity-20 -z-10" />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Timeline */}
        <div className="max-w-6xl mx-auto space-y-12">
          {schedule[activeDay]?.events.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedEvent(event)}
              className="group flex flex-col md:flex-row gap-12 items-stretch cursor-pointer"
            >
              <div className="w-full md:w-40 shrink-0 flex flex-col justify-center items-center md:items-end">
                <span className="text-4xl font-classic font-black text-slate-950 group-hover:text-amber-700 transition-colors">{event.time}</span>
                <div className="w-1 h-full bg-slate-100 rounded-full mt-4 hidden md:block group-last:hidden"></div>
              </div>

              <div className={`flex-grow p-10 md:p-14 rounded-[3.5rem] transition-all duration-500 hover:translate-x-4 shadow-2xl relative overflow-hidden ${getTypeStyle(event.type)}`}>
                 {/* Background Decorative Icon */}
                 <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl pointer-events-none group-hover:scale-125 transition-transform">
                   {event.type === 'break' ? <Coffee /> : <Mic2 />}
                 </div>

                 <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start gap-4 mb-6">
                       <h4 className="text-3xl md:text-4xl font-serif-classic font-bold leading-tight group-hover:underline decoration-amber-500/30 underline-offset-8 transition-all">
                         {event.title}
                       </h4>
                       <span className="text-[9px] font-black uppercase tracking-widest px-5 py-2 border border-white/20 rounded-full backdrop-blur-md">
                         {event.type}
                       </span>
                    </div>

                    <div className="flex flex-wrap gap-10 items-center">
                       {event.speaker && (
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shadow-lg border border-white/10">
                             <Mic2 className="w-6 h-6 text-amber-400" />
                           </div>
                           <p className="text-xl font-serif-classic font-bold italic opacity-90">{event.speaker}</p>
                         </div>
                       )}
                       {event.location && (
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shadow-lg border border-white/10">
                             <MapPin className="w-6 h-6 text-blue-300" />
                           </div>
                           <p className="text-sm font-black uppercase tracking-[0.2em] opacity-60">{event.location}</p>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Program Download */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-40 glass-card p-16 rounded-[4rem] border-amber-300 shadow-3xl text-center bg-white/80"
        >
           <h3 className="text-4xl font-classic text-slate-900 mb-8 uppercase tracking-widest">Dasturning To'liq PDF Versiyasi</h3>
           <p className="text-2xl font-serif-classic italic text-slate-500 mb-12 max-w-3xl mx-auto">
             Maqolalar taqdimoti, sessiya xonalari va madaniy dasturlar haqidagi batafsil ma'lumotni yuklab oling.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-16 py-7 royal-gradient text-white rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-2xl flex items-center justify-center gap-4 group active:scale-95 transition-all">
                <Download className="w-6 h-6 group-hover:animate-bounce" /> Yuklab Olish (PDF)
              </button>
              <button className="px-16 py-7 bg-white border-2 border-slate-950 text-slate-950 rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-4 hover:bg-slate-950 hover:text-white active:scale-95 transition-all">
                <CalendarPlus className="w-6 h-6" /> Kalendarga Qo'shish
              </button>
           </div>
        </motion.div>
      </div>
      {fullPage && <IslimiyDivider />}
    </section>
  );
};

export default Program;

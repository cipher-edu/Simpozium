
import React, { useState } from 'react';
import { Language, DaySchedule } from '../types';
import { translations } from '../translations';
import { SectionTitleDecoration } from './PatternBackground';

interface ProgramProps {
  language: Language;
}

const Program: React.FC<ProgramProps> = ({ language }) => {
  const t = (key: string): any => (translations[language] as any)[key] || (translations.uz as any)[key];
  const schedule: DaySchedule[] = t('schedule_data') || [];
  const [activeDay, setActiveDay] = useState(0);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'plenary': return 'border-amber-500 bg-amber-50 text-amber-900';
      case 'break': return 'border-slate-200 bg-slate-50 text-slate-400 italic';
      case 'cultural': return 'border-emerald-500 bg-emerald-50 text-emerald-900';
      default: return 'border-blue-500 bg-blue-50 text-blue-900';
    }
  };

  return (
    <section id="program" className="py-32 relative overflow-hidden parchment-texture">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitleDecoration />
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-classic text-slate-900 mb-6 uppercase tracking-widest">{t('nav_program') || "Simpozium Dasturi"}</h2>
          <p className="text-2xl font-serif-classic text-amber-900 max-w-3xl mx-auto italic">{t('program_subtitle')}</p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center gap-4 mb-16">
          {schedule.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`px-10 py-6 rounded-[2rem] font-classic transition-all duration-500 flex flex-col items-center border-2 ${
                activeDay === idx 
                ? 'royal-gradient text-white border-transparent shadow-2xl scale-110' 
                : 'bg-white text-slate-400 border-amber-100 hover:border-amber-300'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-1">{t('program_day') || "KUN"} {day.day}</span>
              <span className="text-2xl font-bold">{day.date}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
          {schedule[activeDay]?.events.map((event, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 items-start group">
              <div className="w-full md:w-32 pt-2">
                <span className="text-2xl font-classic font-black text-slate-900 group-hover:text-amber-700 transition-colors">{event.time}</span>
              </div>
              <div className={`flex-grow p-8 rounded-[2.5rem] border-l-8 shadow-sm transition-all group-hover:shadow-xl ${getTypeStyle(event.type)}`}>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold font-serif-classic leading-tight">{event.title}</h4>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-60 px-3 py-1 border border-current rounded-full">{event.type}</span>
                </div>
                {event.speaker && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-[10px] font-black text-slate-950">🎤</div>
                    <p className="text-lg font-serif-classic font-bold opacity-80">{event.speaker}</p>
                  </div>
                )}
                {event.location && (
                  <p className="text-sm font-black uppercase tracking-widest opacity-50 flex items-center gap-2">
                    <span>📍</span> {event.location}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-24 text-center">
           <button className="px-16 py-6 bg-slate-950 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:gold-gradient hover:text-slate-950 transition-all shadow-2xl">
             Batafsil Dasturni PDF ko'rinishida yuklab olish ⬇
           </button>
        </div>
      </div>
    </section>
  );
};

export default Program;

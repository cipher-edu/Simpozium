
import React from 'react';
import { IslimiyDivider, SectionTitleDecoration } from './PatternBackground';
import { Language } from '../types';
import { translations } from '../translations';
import { motion } from 'framer-motion';
import { Target, Users, Globe, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface AboutProps {
  fullPage?: boolean;
  language: Language;
}

const About: React.FC<AboutProps> = ({ fullPage, language }) => {
  // Use string for key to allow flexibility and fix TS errors
  const t = (key: string): string => {
    const val = (translations[language] as any)?.[key] || (translations.uz as any)[key];
    return typeof val === 'string' ? val : key;
  };

  return (
    <section id="about-section" className={`relative overflow-hidden ${fullPage ? 'pt-48 pb-32 min-h-screen bg-[#fdfaf3]' : 'py-32 bg-slate-50/20'}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitleDecoration />
        
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-classic text-slate-950 mb-10 uppercase tracking-widest leading-tight"
          >
            {t('nav_about')}
          </motion.h2>
          <p className="text-2xl md:text-4xl italic text-amber-900 font-serif-classic max-w-5xl mx-auto leading-relaxed opacity-80">
            "{t('about_quote')}"
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-start mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="glass-card p-12 rounded-[3.5rem] border-amber-200 relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-10 opacity-5 text-amber-900 text-9xl group-hover:scale-110 transition-transform"><Target /></div>
               <h3 className="text-3xl font-classic text-slate-900 mb-8 flex items-center gap-4">
                 <span className="p-3 bg-amber-600 rounded-2xl text-white"><Sparkles className="w-6 h-6" /></span>
                 {t('about_goal_title')}
               </h3>
               <p className="text-2xl font-serif-classic text-slate-700 leading-relaxed italic">
                 {t('about_goal_desc')}
               </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
               {[
                 { icon: <Globe className="text-blue-600" />, title: t('about_card_intl'), desc: t('about_card_intl_desc') },
                 { icon: <ShieldCheck className="text-emerald-600" />, title: t('about_card_quality'), desc: t('about_card_quality_desc') },
                 { icon: <Users className="text-purple-600" />, title: t('about_card_community'), desc: t('about_card_community_desc') },
                 { icon: <Heart className="text-red-600" />, title: t('about_card_heritage'), desc: t('about_card_heritage_desc') }
               ].map((item, i) => (
                 <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm text-center group hover:shadow-xl transition-all"
                 >
                   <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                   <h4 className="text-lg font-classic font-black text-slate-800 mb-1">{item.title}</h4>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="relative p-2 border-2 border-amber-200 rounded-[4rem] bg-white/50 shadow-3xl">
               <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Scientific Conference" className="rounded-[3.8rem] opacity-90 w-full object-cover aspect-square md:aspect-auto" />
               <div className="absolute -bottom-10 -right-10 glass-card p-10 rounded-[3rem] border-amber-400 max-w-sm shadow-2xl hidden md:block">
                  <p className="text-xl font-serif-classic italic text-amber-950 font-bold mb-4 leading-relaxed">
                    "Ushbu simpozium O'zbekistonning ilmiy va madaniy diplomatiyasida yangi sahifa ochadi."
                  </p>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full gold-gradient shadow-lg"></div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Ilmiy Qo'mita</p>
                        <p className="text-[8px] text-slate-500 uppercase font-black">Navoiy State University</p>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-slate-950 rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
           <div className="absolute inset-0 opacity-10 animated-pattern pointer-events-none"></div>
           <div className="relative z-10">
              <h3 className="text-4xl md:text-6xl font-classic mb-16 text-center tracking-widest uppercase">{t('about_org_title')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-70 hover:opacity-100 transition-opacity">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="flex flex-col items-center gap-6">
                      <div className="w-24 h-24 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl group hover:bg-white/20 transition-all cursor-pointer">
                         🏛️
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-center">Institution {i}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
      {fullPage && <IslimiyDivider />}
    </section>
  );
};

export default About;

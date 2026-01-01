
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
  t: (key: any) => string;
}

const Footer: React.FC<FooterProps> = ({ language, t }) => {
  const mapUrl = "https://yandex.uz/maps/-/CLTSaZyr";

  return (
    <footer className="bg-[#001a2c] text-white pt-48 pb-16 relative overflow-hidden">
      {/* Decorative Top Ornament (Dome Shape) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 flex justify-center">
         <div className="w-full h-full bg-[#001a2c] rounded-b-[50%] border-x border-b border-amber-500/30 flex items-center justify-center -translate-y-1/2">
            <span className="text-amber-500 text-5xl pt-16 ornament-shadow">⚜ ❦ ⚜</span>
         </div>
      </div>

      {/* Background Girih Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none animated-pattern" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0L120 60L60 120L0 60Z' fill='%23d4af37'/%3E%3C/svg%3E")`,
             backgroundSize: '120px 120px'
           }} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="flex flex-col">
             <div className="flex items-center space-x-6 mb-10 group">
                <div className="w-16 h-16 gold-gradient rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] group-hover:rotate-12 transition-transform duration-500">
                  <span className="text-slate-950 font-classic font-black text-2xl">NDU</span>
                </div>
                <div>
                  <h1 className="text-xl font-classic font-black leading-tight tracking-wide uppercase text-amber-100">
                    Navoi State <br/>University
                  </h1>
                </div>
             </div>
             <p className="text-slate-400 font-serif-classic italic text-xl leading-relaxed mb-8 opacity-80">
               {t('footer_text')}
             </p>
             <div className="flex items-center gap-4 mt-auto">
                <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer">f</div>
                <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer">t</div>
                <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer">in</div>
             </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-classic text-lg font-black mb-10 text-amber-500 tracking-widest uppercase border-b border-amber-500/20 pb-4">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-4 text-slate-300 font-serif-classic italic text-lg">
              <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-2">
                <span className="text-amber-500/50 text-[10px]">✦</span> {t('nav_home')}
              </li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-2">
                <span className="text-amber-500/50 text-[10px]">✦</span> {t('nav_about')}
              </li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-2">
                <span className="text-amber-500/50 text-[10px]">✦</span> {t('nav_tracks')}
              </li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-2">
                <span className="text-amber-500/50 text-[10px]">✦</span> {t('hero_cta_plan')}
              </li>
            </ul>
          </div>

          {/* Scientific Resources Column */}
          <div>
            <h4 className="font-classic text-lg font-black mb-10 text-amber-500 tracking-widest uppercase border-b border-amber-500/20 pb-4">
              {t('footer_resources')}
            </h4>
            <ul className="space-y-4 text-slate-300 font-serif-classic italic text-lg">
              <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-2">
                <span className="text-amber-500/50 text-[10px]">✦</span> Navoi Digital Library
              </li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-2">
                <span className="text-amber-500/50 text-[10px]">✦</span> Publication Archive
              </li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-2">
                <span className="text-amber-500/50 text-[10px]">✦</span> Oriental Manuscript Center
              </li>
            </ul>
          </div>

          {/* Map and Contact Column */}
          <div className="flex flex-col">
            <h4 className="font-classic text-lg font-black mb-10 text-amber-500 tracking-widest uppercase border-b border-amber-500/20 pb-4">
              {t('nav_location')}
            </h4>
            <div className="space-y-6 text-slate-300 font-serif-classic italic text-lg mb-8">
              <li className="flex items-start gap-4">
                <span className="text-amber-500 text-2xl animate-bounce shrink-0">📍</span>
                <span>{t('footer_address')}</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-amber-500 text-xl shrink-0">📧</span>
                <span className="not-italic text-sm font-bold tracking-tight">symposium@navoiy-uni.uz</span>
              </li>
            </div>
            
            {/* Map Interaction Button */}
            <div className="mt-auto">
               <a 
                 href={mapUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group relative flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-amber-500/30 overflow-hidden hover:border-amber-400 transition-all"
               >
                 <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-amber-500/20 transition-all duration-500"></div>
                 <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-1">{t('footer_location_btn')}</span>
                    <span className="text-xs opacity-50 font-sans">Yandex Maps 🔗</span>
                 </div>
               </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-8">
          <p className="font-serif-classic italic text-slate-400">
            {t('footer_rights')}
          </p>
          <div className="flex items-center gap-8">
             <span className="font-classic text-[10px] uppercase tracking-widest text-amber-500/40">AN-Symp-2025</span>
             <div className="w-px h-6 bg-white/10"></div>
             <p className="font-serif-classic italic">Designed for Hazrat Navoiy Heritage</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

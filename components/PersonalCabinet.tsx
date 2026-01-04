
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Language } from '../types';
import { LayoutDashboard, LogOut, ShieldCheck } from 'lucide-react';

interface PersonalCabinetProps {
  user: User;
  onLogout: () => void;
  language: Language;
  t: (key: any) => any;
}

const PersonalCabinet: React.FC<PersonalCabinetProps> = ({ user, onLogout, t }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Fallback if user object is malformed
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif-classic text-2xl italic">
        Foydalanuvchi ma'lumotlari topilmadi.
      </div>
    );
  }

  const renderOverview = () => {
    const firstName = user.name ? user.name.split(' ')[0] : 'Ishtirokchi';
    
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="glass-card p-12 md:p-20 rounded-[4rem] border-amber-200 bg-slate-950 text-white relative overflow-hidden group">
           <div className="absolute inset-0 opacity-[0.1] animated-pattern pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="relative">
                <div className="w-44 h-44 rounded-[3rem] gold-gradient p-1.5 shadow-3xl">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=111&color=d4af37&bold=true&size=512`} className="w-full h-full rounded-[2.5rem] object-cover" alt="Avatar" />
                </div>
                <div className="absolute -bottom-2 -right-2 p-3 bg-emerald-500 rounded-2xl shadow-xl border-4 border-slate-950"><ShieldCheck className="w-6 h-6" /></div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-classic mb-4 uppercase tracking-tighter leading-none">Salom, <span className="text-transparent bg-clip-text gold-gradient">{firstName}</span></h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                   <span className="px-6 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-amber-200 border border-white/5 backdrop-blur-md">{user.role || 'Ishtirokchi'}</span>
                   <span className="px-6 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border border-white/5">{user.track || 'Sho\'ba tanlanmagan'}</span>
                </div>
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="glass-card p-12 rounded-[3.5rem] bg-white border-slate-100 shadow-xl">
              <h3 className="text-2xl font-classic uppercase mb-6 text-slate-900 tracking-widest">Maqola Holati</h3>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
                 <p className="text-slate-400 font-serif-classic italic text-xl mb-4">Siz hali maqola yubormagansiz.</p>
                 <button className="px-8 py-3 gold-gradient text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest">Maqola yuborish</button>
              </div>
           </div>
           <div className="glass-card p-12 rounded-[3.5rem] bg-white border-slate-100 shadow-xl">
              <h3 className="text-2xl font-classic uppercase mb-6 text-slate-900 tracking-widest">QR ID Karta</h3>
              <div className="p-8 bg-slate-950 rounded-3xl flex flex-col items-center text-center text-white">
                 <div className="w-32 h-32 bg-white rounded-2xl mb-4 flex items-center justify-center p-2">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user.id}`} alt="QR Code" className="w-full h-full" />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60">ID: {user.id}</p>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 py-32 sm:py-56 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-20 xl:gap-32 items-start">
        <aside className="w-full lg:w-[480px] shrink-0 lg:sticky lg:top-48">
          <div className="relative p-12 rounded-[5rem] bg-white/95 backdrop-blur-3xl border-2 border-amber-200/50 shadow-3xl flex flex-col overflow-hidden">
            <nav className="space-y-4 relative z-10">
              <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center justify-between py-8 px-10 rounded-[3.5rem] text-[11px] font-black uppercase tracking-widest relative transition-all ${activeTab === 'overview' ? 'text-white' : 'text-slate-500 hover:bg-amber-50'}`}>
                {activeTab === 'overview' && <motion.div layoutId="cabinet-pill" className="absolute inset-0 royal-gradient shadow-2xl" transition={{ type: 'spring', bounce: 0.2 }} />}
                <span className="relative z-10 flex items-center gap-4"><LayoutDashboard className="w-5 h-5" /> Boshqaruv</span>
              </button>
              <button onClick={onLogout} className="w-full py-8 bg-red-50 text-red-600 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 rounded-[3.5rem] hover:bg-red-600 hover:text-white transition-all shadow-md">
                <LogOut className="w-5 h-5" /> {t('nav_login') === 'Kirish' ? 'Chiqish' : 'Logout'}
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex-grow w-full overflow-hidden min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {activeTab === 'overview' && renderOverview()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default PersonalCabinet;

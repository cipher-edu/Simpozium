
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Article, Language, Review } from '../types.ts';
import { 
  Users, FileText, PieChart, ShieldCheck, 
  Search, ChevronRight, UserPlus, Send, 
  CheckCircle, AlertCircle, BarChart3, Mail,
  Globe, TrendingUp, Filter, Download, 
  Settings, Clock, Briefcase, Activity
} from 'lucide-react';

interface AdminPanelProps {
  currentUser: User;
  language: Language;
  t: (key: any) => string;
}

type AdminTab = 'dashboard' | 'articles' | 'users' | 'review_system';

const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser, language, t }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [assignModal, setAssignModal] = useState<Article | null>(null);

  const stats = [
    { label: "Jami Maqolalar", val: 284, color: "bg-blue-500", trend: "+12%" },
    { label: "Ishtirokchilar", val: 542, color: "bg-emerald-500", trend: "+8%" },
    { label: "Taqrizchilar", val: 68, color: "bg-amber-500", trend: "Active" },
    { label: "Davlatlar", val: 24, color: "bg-purple-500", trend: "Global" }
  ];

  const renderDashboard = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 rounded-[2.5rem] bg-white border-slate-100 shadow-xl relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${s.color} opacity-5 blur-2xl -translate-y-12 translate-x-12`} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{s.label}</h4>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-classic text-slate-900">{s.val}</span>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg mb-2">{s.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass-card p-12 rounded-[3.5rem] bg-white shadow-2xl border-slate-50">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-classic uppercase tracking-widest flex items-center gap-3">
              <Activity className="text-blue-600" /> Maqolalar Dinamikasi (Sho'balar kesimida)
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-[9px] font-black uppercase text-slate-400">Digital</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500" /><span className="text-[9px] font-black uppercase text-slate-400">Literature</span></div>
            </div>
          </div>
          
          <div className="h-[300px] w-full relative flex items-end justify-between gap-2">
            {[65, 40, 85, 30, 90, 55, 75, 45, 60, 70].map((h, i) => (
              <div key={i} className="flex-grow group relative h-full flex flex-col justify-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className={`w-full rounded-t-xl shadow-lg relative ${i % 3 === 0 ? 'royal-gradient' : 'gold-gradient'}`}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h} Maqola
                  </div>
                </motion.div>
              </div>
            ))}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-100" />
          </div>
        </div>

        <div className="glass-card p-12 rounded-[3.5rem] bg-[#001c30] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 animated-pattern pointer-events-none" />
           <div className="relative z-10">
              <h3 className="text-2xl font-classic uppercase tracking-widest mb-10 text-amber-400">Global Qamrov</h3>
              <div className="space-y-6">
                {[
                  { country: "O'zbekiston", count: 182, p: "75%" },
                  { country: "Turkiya", count: 42, p: "12%" },
                  { country: "Vengriya", count: 15, p: "5%" },
                  { country: "AQSH", count: 12, p: "4%" }
                ].map((c, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                      <span>{c.country}</span>
                      <span className="text-amber-500">{c.count}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: c.p }}
                        className="h-full gold-gradient shadow-[0_0_10px_#d4af37]"
                      />
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderReviewSystem = () => (
    <div className="space-y-8 animate-in slide-in-from-right-10 duration-700">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50">
        <div>
          <h2 className="text-4xl font-classic uppercase text-slate-900 leading-none mb-2">Taqriz Boshqaruvi</h2>
          <p className="text-slate-400 font-serif-classic italic text-xl">Raqamli Peer-Review va Baholash Tizimi</p>
        </div>
      </div>

      <div className="grid gap-6">
        {[
          { id: "A-928", title: "Navoiy va G'arb Uyg'onishi: Qiyosiy Tahlil", author: "Dr. Alimova", status: "submitted", track: "Track 1" },
          { id: "A-929", title: "Raqamli Gumanitar Fanlar va Navoiy Merosi", author: "Prof. Jenkins", status: "review", track: "Track 4" }
        ].map((art, i) => (
          <div key={i} className="glass-card p-10 rounded-[3rem] border border-slate-100 bg-white flex flex-col md:flex-row items-center justify-between group hover:shadow-2xl transition-all">
             <div className="flex items-center gap-10">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-4xl shadow-inner border-4 border-white ${art.status === 'submitted' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                  {art.status === 'submitted' ? <Mail /> : <ShieldCheck />}
                </div>
                <div>
                   <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full mb-3 inline-block">{art.track}</span>
                   <h3 className="text-3xl font-classic text-slate-900 leading-tight mb-2">{art.title}</h3>
                </div>
             </div>
             
             <button 
                onClick={() => setAssignModal(art as any)}
                className="px-10 py-5 royal-gradient text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-95 transition-all"
              >
                Taqrizchini biriktirish
              </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {assignModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-xl">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="w-full max-w-2xl bg-white rounded-[4rem] border border-amber-200 overflow-hidden shadow-3xl"
             >
                <div className="gold-gradient h-3 w-full" />
                <div className="p-12">
                   <div className="flex justify-between items-start mb-10">
                      <h3 className="text-4xl font-classic text-slate-900">Ekspert Biriktirish</h3>
                      <button onClick={() => setAssignModal(null)} className="p-4 bg-slate-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all">✕</button>
                   </div>
                   <p className="text-2xl font-serif-classic italic text-slate-500 mb-10 border-l-8 border-amber-200 pl-8">"{assignModal.title}"</p>
                   <button className="w-full py-6 gold-gradient text-slate-950 font-black rounded-3xl uppercase tracking-widest text-[11px]">Tasdiqlash</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-[1800px] mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <aside className="w-full lg:w-96 shrink-0 lg:sticky lg:top-32 h-fit">
            <div className="glass-card p-10 rounded-[4rem] border-amber-200 bg-white shadow-3xl">
               <nav className="space-y-4">
                  {[
                    { id: 'dashboard' as const, label: "Platforma Analitikasi", icon: <BarChart3 /> },
                    { id: 'review_system' as const, label: "Taqriz Tizimi", icon: <ShieldCheck /> },
                    { id: 'articles' as const, label: "Maqolalar Bazasi", icon: <FileText /> },
                    { id: 'users' as const, label: "Foydalanuvchilar", icon: <Users /> }
                  ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-8 py-6 rounded-3xl transition-all relative ${
                        activeTab === item.id ? 'text-white' : 'text-slate-500 hover:bg-amber-50'
                      }`}
                    >
                      {activeTab === item.id && <motion.div layoutId="admin-pill" className="absolute inset-0 royal-gradient shadow-2xl" />}
                      <div className="flex items-center gap-6 relative z-10">
                        {item.icon}
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                    </button>
                  ))}
               </nav>
            </div>
          </aside>

          <main className="flex-grow">
             {activeTab === 'dashboard' && renderDashboard()}
             {activeTab === 'review_system' && renderReviewSystem()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

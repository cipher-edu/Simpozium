import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Language, Article, ScheduleEvent } from '../types.ts';
import { translations } from '../translations.ts';
import { 
  LayoutDashboard, LogOut, ShieldCheck, FileText, Send, 
  Settings, Award, Calendar, QrCode, User as UserIcon,
  CheckCircle2, Clock, XCircle, Download, Plus, Search,
  GraduationCap, Briefcase, Linkedin, Globe, Sparkles,
  Bell, History, Edit3, Save, Trash2, ExternalLink,
  ChevronRight, Bookmark, Star, MapPin, Mic2, Heart,
  Info, Upload, File, AlertCircle, Check, Loader2,
  Medal, UserCheck, BookOpenCheck, Share2, Printer
} from 'lucide-react';

interface PersonalCabinetProps {
  user: User;
  onLogout: () => void;
  language: Language;
  t: (key: any) => any;
}

type Tab = 'overview' | 'articles' | 'submit' | 'schedule' | 'settings' | 'certificate';
type CertType = 'participation' | 'publication' | 'honorary';

const PersonalCabinet: React.FC<PersonalCabinetProps> = ({ user, onLogout, language, t }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activeCertType, setActiveCertType] = useState<CertType>('participation');
  const [articles, setArticles] = useState<Article[]>(user.articles || [
    {
      id: "ART-482",
      userId: user.id,
      userName: user.name,
      title: "Alisher Navoiy asarlarining SI yordamida tahlili",
      abstract: "Ushbu maqolada Navoiy g'azallarining semantik tahlili SI orqali ko'rib chiqiladi.",
      keywords: ["Navoiy", "NLP", "Digital Humanities"],
      status: 'accepted',
      submittedAt: "2024-12-15",
      track: "Raqamli Gumanitar Fanlar",
      version: 1,
      doi: "10.5281/zenodo.navoiy2025.482",
      reviews: [
        {
          id: 'r1',
          reviewerId: 'rev-1',
          reviewerName: 'Prof. J. Smith',
          date: '2024-12-28',
          scores: { originality: 9, methodology: 8, language: 9, relevance: 10 },
          comments: "Excellent integration of AI with classical literature study.",
          recommendation: 'accept'
        }
      ]
    }
  ]);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Sizning maqolangiz qabul qilindi!", time: "2 soat oldin", type: "success" },
    { id: 2, text: "Simpozium dasturi yangilandi.", time: "1 kun oldin", type: "info" }
  ]);
  const [profileData, setProfileData] = useState({
    bio: user.bio || "Navoiy merosini o'rganayotgan yosh tadqiqotchi.",
    orcid: user.orcid || "0000-0002-1825-0097",
    institution: user.institution || "Navoiy Davlat Universiteti",
    interests: user.researchInterests || ["Navoiyshunoslik", "O'zbek adabiyoti"]
  });

  const navItems = [
    { id: 'overview' as const, label: t('cab_overview'), icon: <LayoutDashboard size={20} /> },
    { id: 'articles' as const, label: t('cab_my_articles'), icon: <FileText size={20} /> },
    { id: 'submit' as const, label: t('cab_submit'), icon: <Send size={20} /> },
    { id: 'schedule' as const, label: t('cab_schedule'), icon: <Calendar size={20} /> },
    { id: 'certificate' as const, label: t('cab_download_cert'), icon: <Award size={20} /> },
    { id: 'settings' as const, label: t('cab_settings'), icon: <Settings size={20} /> }
  ];

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('uploading');
    
    setTimeout(() => {
      setSubmissionStatus('success');
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      const newArt: Article = {
        id: "ART-" + Math.floor(Math.random() * 1000),
        userId: user.id,
        userName: user.name,
        title: formData.get('title') as string,
        abstract: formData.get('abstract') as string,
        keywords: (formData.get('keywords') as string).split(',').map(k => k.trim()),
        status: 'submitted',
        submittedAt: new Date().toISOString().split('T')[0],
        track: formData.get('track') as string,
        reviews: [],
        version: 1
      };
      
      setArticles([newArt, ...articles]);
      
      setTimeout(() => {
        setSubmissionStatus('idle');
        setSelectedFile(null);
        setActiveTab('articles');
      }, 2000);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const renderStatus = (status: string) => {
    switch(status) {
      case 'accepted': return <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100"><CheckCircle2 size={12}/> Qabul qilindi</span>;
      case 'review': return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100"><Clock size={12}/> Taqrizda</span>;
      case 'rejected': return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-100"><XCircle size={12}/> Rad etildi</span>;
      default: return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-100"><Send size={12}/> Yuborilgan</span>;
    }
  };

  const renderOverview = () => (
    <div className="space-y-10">
      <div className="glass-card p-10 md:p-16 rounded-[4rem] bg-slate-950 text-white relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
         <div className="absolute inset-0 opacity-[0.1] animated-pattern pointer-events-none" />
         <div className="absolute top-0 right-0 p-12 opacity-5 text-amber-400 group-hover:scale-110 transition-transform"><UserIcon size={240} /></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="relative group/avatar">
              <div className="w-48 h-48 rounded-[3.5rem] gold-gradient p-1.5 shadow-[0_20px_60px_rgba(212,175,55,0.3)] transition-transform duration-700 group-hover/avatar:rotate-6">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=111&color=d4af37&bold=true&size=512`} className="w-full h-full rounded-[3rem] object-cover" alt="Avatar" />
              </div>
              <div className="absolute -bottom-4 -right-4 p-4 bg-emerald-500 rounded-2xl shadow-2xl border-4 border-slate-950 text-white"><ShieldCheck className="w-8 h-8" /></div>
            </div>
            
            <div className="text-center md:text-left flex-grow">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                 <span className="px-5 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-amber-400 border border-white/10">{user.role}</span>
                 <span className="px-5 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border border-white/10">ID: {user.id}</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-classic mb-4 uppercase tracking-tighter leading-none">{t('cab_welcome')}, <br/><span className="text-transparent bg-clip-text gold-gradient">{user.name.split(' ')[0]}</span></h1>
              <p className="text-2xl font-serif-classic italic text-slate-400 max-w-xl opacity-80 leading-relaxed mb-8">{profileData.bio}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                 <div className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer">
                    <Globe size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">{profileData.orcid}</span>
                 </div>
                 <div className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer">
                    <GraduationCap size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">{profileData.institution}</span>
                 </div>
              </div>
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="glass-card p-10 rounded-[3.5rem] bg-white border-amber-100 shadow-xl flex flex-col items-center text-center group hover:bg-amber-50 transition-all">
                  <div className="w-16 h-16 bg-amber-100 flex items-center justify-center text-amber-700 mb-6 group-hover:bg-amber-700 group-hover:text-white transition-all"><FileText size={28}/></div>
                  <p className="text-5xl font-classic text-slate-900 mb-2">{articles.length}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('cab_my_articles')}</p>
               </div>
               <div className="glass-card p-10 rounded-[3.5rem] bg-white border-emerald-100 shadow-xl flex flex-col items-center text-center group hover:bg-emerald-50 transition-all">
                  <div className="w-16 h-16 bg-emerald-100 flex items-center justify-center text-emerald-700 mb-6 group-hover:bg-emerald-700 group-hover:text-white transition-all"><Award size={28}/></div>
                  <p className="text-5xl font-classic text-slate-900 mb-2">{articles.filter(a => a.status === 'accepted').length}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Qabul qilingan</p>
               </div>
               <div className="glass-card p-10 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center border-2 border-white/5 group">
                  <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-5 transition-opacity" />
                  <div className="bg-white p-3 rounded-2xl shadow-3xl transform group-hover:rotate-6 transition-transform mb-4">
                     <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${user.id}`} alt="QR" className="w-20 h-20" />
                  </div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">DIGITAL ID</p>
                  <button className="text-[9px] font-black uppercase text-amber-500 hover:text-amber-400">Download</button>
               </div>
            </div>

            <div className="glass-card p-12 rounded-[4rem] bg-white border-slate-50 shadow-xl">
               <h3 className="text-2xl font-classic uppercase tracking-widest mb-8 flex items-center gap-4">
                  <Bell className="text-amber-600" size={24} /> {t('cab_notifs_title')}
               </h3>
               <div className="space-y-6">
                  {notifications.map(n => (
                    <div key={n.id} className="flex items-start gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${n.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                          {n.type === 'success' ? <CheckCircle2 size={24} /> : <Info size={24} />}
                       </div>
                       <div className="flex-grow">
                          <p className="text-xl font-serif-classic font-bold text-slate-800 italic">{n.text}</p>
                          <p className="text-[9px] font-black uppercase text-slate-400 mt-2">{n.time}</p>
                       </div>
                       <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={16}/></button>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-10 rounded-[3.5rem] royal-gradient text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10"><Clock size={120} /></div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400 mb-8">{t('cab_countdown_label')}</h4>
               <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                     <p className="text-4xl font-classic text-white mb-1">12</p>
                     <p className="text-[9px] font-black uppercase text-amber-500/60 tracking-widest">{t('cab_days')}</p>
                  </div>
                  <div className="text-center border-x border-white/10">
                     <p className="text-4xl font-classic text-white mb-1">08</p>
                     <p className="text-[9px] font-black uppercase text-amber-500/60 tracking-widest">{t('cab_hours')}</p>
                  </div>
                  <div className="text-center">
                     <p className="text-4xl font-classic text-white mb-1">45</p>
                     <p className="text-[9px] font-black uppercase text-amber-500/60 tracking-widest">{t('cab_mins')}</p>
                  </div>
               </div>
            </div>

            <div className="glass-card p-10 rounded-[3.5rem] bg-amber-50 border-amber-200 text-amber-900 shadow-xl relative overflow-hidden group">
               <div className="absolute bottom-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Sparkles size={120} /></div>
               <h4 className="text-xl font-classic uppercase mb-4 flex items-center gap-3"><Mic2 size={20}/> Ma'ruza tayyorlash</h4>
               <p className="text-lg font-serif-classic italic opacity-70 mb-8">AI yordamida ma'ruza tezislarini shakllantiring va nutqingizni professional darajaga ko'taring.</p>
               <button className="w-full py-5 bg-amber-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-amber-700 transition-all">AI Laboratoriyasini ochish</button>
            </div>
         </div>
      </div>
    </div>
  );

  const renderArticles = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
       <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-classic uppercase text-slate-900 tracking-tighter leading-none mb-2">{t('cab_my_articles')}</h2>
            <p className="text-slate-400 font-serif-classic italic text-xl">Simpozium uchun yuborilgan ilmiy ishlar arxivi</p>
          </div>
          <button onClick={() => setActiveTab('submit')} className="flex items-center gap-3 px-8 py-4 royal-gradient text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:brightness-110 active:scale-95 transition-all">
             <Plus size={18}/> {t('cab_submit')}
          </button>
       </div>

       <div className="grid gap-8">
          {articles.map((art) => (
            <div key={art.id} className="glass-card p-10 rounded-[4rem] bg-white border-slate-100 shadow-xl overflow-hidden relative group">
               <div className="flex flex-col lg:flex-row gap-12 relative z-10">
                  <div className="shrink-0">
                     <div className="w-24 h-32 bg-slate-900 rounded-2xl shadow-2xl relative overflow-hidden border-4 border-white flex items-center justify-center text-amber-500">
                        <FileText size={40} />
                        <div className="absolute bottom-0 left-0 w-full h-1 royal-gradient opacity-50" />
                     </div>
                  </div>
                  
                  <div className="flex-grow">
                     <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100">ID: {art.id}</span>
                        {renderStatus(art.status)}
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">{art.track}</span>
                     </div>
                     <h3 className="text-3xl md:text-4xl font-classic text-slate-950 uppercase leading-tight mb-6 group-hover:text-amber-800 transition-colors">{art.title}</h3>
                     
                     <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-2"><Clock size={14}/> Topshirilgan sana</p>
                           <p className="text-xl font-serif-classic font-bold text-slate-800 italic">{art.submittedAt}</p>
                        </div>
                        <div className="space-y-4">
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-2"><Globe size={14}/> DOI (Digital ID)</p>
                           <p className="text-xl font-serif-classic font-bold text-amber-700 italic underline cursor-pointer">{art.doi || "Generatsiya qilinmoqda..."}</p>
                        </div>
                     </div>

                     {art.reviews && art.reviews.length > 0 && (
                        <div className="mt-10 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                           <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-3"><History size={16}/> Taqriz natijalari</h5>
                           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                              {Object.entries(art.reviews[0].scores).map(([key, val]) => (
                                <div key={key} className="text-center">
                                   <p className="text-3xl font-classic text-amber-700">{val}/10</p>
                                   <p className="text-[8px] font-black uppercase text-slate-400">{key}</p>
                                </div>
                              ))}
                           </div>
                           <p className="text-lg font-serif-classic italic text-slate-600 leading-relaxed bg-white p-6 rounded-2xl border border-slate-100">
                              "{art.reviews[0].comments}"
                           </p>
                        </div>
                     )}
                  </div>
               </div>
               
               <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end gap-6 relative z-10">
                  <button className="flex items-center gap-3 px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                     <Edit3 size={18}/> Tahrirlash
                  </button>
                  {art.status === 'accepted' && (
                     <button onClick={() => setActiveTab('certificate')} className="flex items-center gap-3 px-8 py-4 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-md">
                        <Award size={18}/> Sertifikatni ko'rish
                     </button>
                  )}
               </div>
            </div>
          ))}
       </div>
    </div>
  );

  const renderSubmit = () => (
    <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
       <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-classic uppercase text-slate-900 mb-4 tracking-tighter">{t('cab_submit_title')}</h2>
          <p className="text-xl md:text-2xl font-serif-classic italic text-slate-500">Yangi ilmiy tadqiqotingizni xalqaro simpoziumga havola qiling.</p>
       </div>

       <form onSubmit={handleFakeSubmit} className="glass-card p-10 md:p-16 rounded-[4rem] bg-white border-amber-200/50 shadow-[0_40px_100px_rgba(166,124,0,0.1)] space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none rotate-12"><Send size={300} /></div>
          
          <AnimatePresence>
            {submissionStatus !== 'idle' && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center p-10"
              >
                {submissionStatus === 'uploading' ? (
                  <div className="space-y-8">
                    <div className="relative">
                      <Loader2 className="w-24 h-24 text-amber-600 animate-spin mx-auto" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <File className="w-8 h-8 text-amber-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-classic text-slate-900 uppercase mb-2">Maqola yuborilmoqda</h3>
                      <p className="text-xl font-serif-classic italic text-slate-500">Iltimos kuting, tizim ma'lumotlarni xavfsiz serverga yuklamoqda...</p>
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-8">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-xl border-4 border-white">
                      <Check className="w-12 h-12" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-classic text-emerald-900 uppercase mb-2">Muvaffaqiyatli topshirildi!</h3>
                      <p className="text-xl font-serif-classic italic text-slate-500">Maqolangiz tahririyat tomonidan texnik tekshiruvga qabul qilindi. <br/> Tez orada bildirishnoma olasiz.</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-10">
              <div className="space-y-4">
                 <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-amber-800">
                   <FileText size={16} /> Maqola sarlavhasi
                 </label>
                 <input 
                   name="title" 
                   required 
                   type="text" 
                   className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-serif-classic text-2xl italic shadow-inner" 
                   placeholder="Maqola sarlavhasini to'liq kiriting..." 
                 />
              </div>

              <div className="space-y-4">
                 <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-amber-800">
                   <Bookmark size={16} /> Kalit so'zlar (Keywords)
                 </label>
                 <input 
                   name="keywords" 
                   required 
                   type="text" 
                   className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-serif-classic text-xl italic shadow-inner" 
                   placeholder="Navoiy, Meros, SI, NLP..." 
                 />
                 <p className="text-[10px] text-slate-400 uppercase tracking-widest">Kalit so'zlarni vergul bilan ajrating</p>
              </div>

              <div className="space-y-4">
                 <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-amber-800">
                   <Mic2 size={16} /> Ilmiy Yo'nalish (Track)
                 </label>
                 <div className="relative group">
                   <select 
                    name="track" 
                    className="w-full appearance-none px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-500 focus:bg-white transition-all font-serif-classic text-xl italic cursor-pointer shadow-inner"
                   >
                      <option value="Navoiyshunoslik va Matnshunoslik">Navoiyshunoslik va Matnshunoslik</option>
                      <option value="Raqamli Gumanitar Fanlar">Raqamli Gumanitar Fanlar</option>
                      <option value="Tasavvuf va Falsafa">Tasavvuf va Falsafa</option>
                      <option value="Tarjimashunoslik">Tarjimashunoslik</option>
                   </select>
                   <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-amber-600 rotate-90 pointer-events-none" size={24} />
                 </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                 <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-amber-800">
                   <Info size={16} /> Maqola annotatsiyasi (Abstract)
                 </label>
                 <textarea 
                   name="abstract" 
                   required 
                   className="w-full h-80 px-6 py-6 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:border-amber-500 focus:bg-white transition-all font-serif-classic text-xl italic resize-none shadow-inner leading-relaxed" 
                   placeholder="Tadqiqotingiz haqida qisqacha mazmun..." 
                 />
              </div>
            </div>
          </div>

          <div className="pt-6">
             <label className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-amber-800 mb-6">
               <Upload size={16} /> PDF Faylni Yuklash
             </label>
             <div className={`relative group border-2 border-dashed rounded-[3rem] p-12 transition-all text-center ${selectedFile ? 'border-emerald-300 bg-emerald-50/20' : 'border-amber-200 bg-slate-50/50 hover:bg-amber-50 hover:border-amber-400'}`}>
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  onChange={handleFileChange}
                />
                
                <div className="relative z-0 space-y-6">
                   <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center transition-all ${selectedFile ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-white text-amber-600 shadow-xl shadow-amber-100 group-hover:scale-110'}`}>
                      {selectedFile ? <Check size={40} /> : <FileText size={40} />}
                   </div>
                   
                   {selectedFile ? (
                     <div className="animate-in fade-in zoom-in-95">
                        <p className="text-2xl font-serif-classic font-bold text-slate-800 mb-1 italic">{selectedFile.name}</p>
                        <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest flex items-center justify-center gap-2">
                          <CheckCircle2 size={12} /> Fayl muvaffaqiyatli tanlandi ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                     </div>
                   ) : (
                     <div>
                        <p className="text-2xl font-serif-classic italic text-slate-600 mb-2">Faylni shu yerga tortib keling yoki bosing</p>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Faqat PDF format (Max. 15MB)</p>
                     </div>
                   )}
                </div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-10">
             <div className="flex items-start gap-4 p-6 bg-blue-50 border border-blue-100 rounded-3xl flex-grow">
                <AlertCircle className="text-blue-600 shrink-0 mt-1" size={24} />
                <p className="text-sm font-serif-classic italic text-blue-800 leading-relaxed">
                   Maqolani topshirish orqali siz ilmiy axloq qoidalari va plagiatsiz tadqiqot olib borilganligini tasdiqlaysiz. Barcha materiallar Scopus va Web of Science bazalari talablariga mos kelishi shart.
                </p>
             </div>
             
             <button 
              type="submit" 
              disabled={submissionStatus !== 'idle' || !selectedFile} 
              className="w-full sm:w-80 py-8 royal-gradient text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(0,77,97,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:grayscale disabled:pointer-events-none"
             >
                <Send size={24} /> Maqolani topshirish ❦
             </button>
          </div>
       </form>
    </div>
  );

  const renderSchedule = () => {
    const allEvents = translations[language].schedule_data[0].events;
    
    return (
      <div className="space-y-10 animate-in slide-in-from-right-10 duration-700">
         <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-classic uppercase text-slate-900 tracking-tighter leading-none mb-2">{t('cab_schedule')}</h2>
              <p className="text-slate-400 font-serif-classic italic text-xl">Siz tanlagan ma'ruza va tadbirlarning shaxsiy vaqt jadvali</p>
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-white border border-amber-200 text-amber-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-amber-50 transition-all">
               <Download size={18}/> PDF Dastur
            </button>
         </div>

         <div className="space-y-8 relative">
            <div className="absolute left-14 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-200 via-amber-100 to-transparent rounded-full hidden md:block" />
            
            {allEvents.map((event: any, idx: number) => (
              <div key={idx} className="flex flex-col md:flex-row gap-12 group">
                 <div className="w-32 shrink-0 flex flex-col items-center md:items-end justify-center py-6">
                    <span className="text-4xl font-classic font-black text-slate-950 group-hover:text-amber-700 transition-colors">{event.time}</span>
                    <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-xl mt-4 hidden md:block relative z-10" />
                 </div>

                 <div className="flex-grow glass-card p-10 rounded-[3.5rem] bg-white border-slate-50 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-125 transition-transform"><Clock size={120} /></div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                       <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-4">
                             <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">{event.type}</span>
                          </div>
                          <h4 className="text-3xl font-serif-classic font-bold text-slate-900 leading-tight mb-6">{event.title}</h4>
                          <div className="flex flex-wrap gap-8 items-center">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg"><Mic2 size={18} /></div>
                                <span className="text-lg font-serif-classic font-bold italic opacity-80">{event.speaker || "General Session"}</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100"><MapPin size={18} /></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{event.location}</span>
                             </div>
                          </div>
                       </div>
                       <button className="px-6 py-4 bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-700 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-emerald-100 transition-all flex items-center gap-3 shadow-sm group/btn">
                          <CheckCircle2 size={16} className="group-hover/btn:scale-110 transition-transform" /> Men boraman
                       </button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    );
  };

  const renderCertificate = () => {
    // Config for each certificate type
    const certConfigs = {
      participation: {
        title: "Ishtirokchi Sertifikati",
        mainTitle: "CERTIFICATE OF PARTICIPATION",
        subtitle: "Ushbu sertifikat simpoziumda faol ishtirok etganligi uchun berildi",
        colorClass: "border-amber-200/50",
        badge: <Medal className="text-slate-950 w-14 h-14" />,
        gradient: "gold-gradient",
        verifyId: `PART-${user.id}`
      },
      publication: {
        title: "Maqola Sertifikati",
        mainTitle: "CERTIFICATE OF PUBLICATION",
        subtitle: "Maqolasi ilmiy to'plamga qabul qilinganligi va taqdim etilganligi uchun",
        colorClass: "border-blue-200/50",
        badge: <BookOpenCheck className="text-white w-14 h-14" />,
        gradient: "royal-gradient",
        verifyId: `PUB-${user.id}`,
        extra: articles[0]?.title ? `"${articles[0].title}"` : "Taqdim etilgan ilmiy maqola"
      },
      honorary: {
        title: "Faxriy Mehmon",
        mainTitle: "HONORARY GUEST CERTIFICATE",
        subtitle: "Simpozium rivojiga qo'shgan hissasi va faxriy mehmon sifatida ishtiroki uchun",
        colorClass: "border-emerald-200/50",
        badge: <UserCheck className="text-slate-950 w-14 h-14" />,
        gradient: "gold-gradient",
        verifyId: `HON-${user.id}`,
        isHonorary: true
      }
    };

    const config = certConfigs[activeCertType];

    return (
      <div className="space-y-12 animate-in zoom-in-95 duration-700 text-center">
         <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-classic uppercase text-slate-900 mb-6 tracking-tighter">Raqamli Sertifikat Markazi</h2>
            
            {/* Certificate Type Switcher */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 bg-white/50 p-2 rounded-3xl border border-amber-100">
               {(['participation', 'publication', 'honorary'] as CertType[]).map((type) => (
                 <button 
                   key={type}
                   onClick={() => setActiveCertType(type)}
                   className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                     activeCertType === type 
                     ? 'royal-gradient text-white shadow-lg' 
                     : 'text-slate-400 hover:bg-white hover:text-amber-700'
                   }`}
                 >
                   {certConfigs[type].title}
                 </button>
               ))}
            </div>
         </div>

         <div className="relative group max-w-5xl mx-auto">
            <div className={`absolute -inset-4 ${config.gradient} opacity-20 blur-3xl rounded-[5rem] group-hover:opacity-40 transition-opacity`} />
            <div className="relative glass-card p-1 bg-white rounded-[4rem] shadow-4xl border-[15px] border-white overflow-hidden">
               <div className={`bg-[#fdfbf7] p-16 md:p-24 border-[2px] ${config.colorClass} rounded-[3rem] relative parchment-texture`}>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-10 left-10 w-24 h-24 border-t-4 border-l-4 border-amber-900/10 rounded-tl-3xl" />
                  <div className="absolute top-10 right-10 w-24 h-24 border-t-4 border-r-4 border-amber-900/10 rounded-tr-3xl" />
                  <div className="absolute bottom-10 left-10 w-24 h-24 border-b-4 border-l-4 border-amber-900/10 rounded-bl-3xl" />
                  <div className="absolute bottom-10 right-10 w-24 h-24 border-b-4 border-r-4 border-amber-900/10 rounded-br-3xl" />
                  
                  <div className="text-center space-y-10 relative z-10">
                     <div className="flex justify-center mb-12">
                        <div className={`w-28 h-28 ${config.gradient} rounded-full flex items-center justify-center shadow-2xl p-2`}>
                          <div className="w-full h-full rounded-full border-4 border-white/30 flex items-center justify-center">
                             {config.badge}
                          </div>
                        </div>
                     </div>
                     
                     <h1 className="text-5xl md:text-7xl font-classic text-slate-900 uppercase tracking-widest leading-none drop-shadow-sm">{config.mainTitle}</h1>
                     <p className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-800 max-w-xl mx-auto leading-relaxed">{config.subtitle}</p>
                     
                     <div className="py-12 border-y border-amber-200/50">
                        <p className="text-2xl font-serif-classic italic text-slate-500 mb-6 uppercase tracking-widest">THIS IS TO CERTIFY THAT</p>
                        <h2 className="text-5xl md:text-9xl font-classic text-amber-950 uppercase drop-shadow-sm tracking-tight">{user.name}</h2>
                        <p className="text-2xl font-serif-classic italic text-slate-600 mt-10 leading-relaxed max-w-3xl mx-auto">
                          {config.extra ? (
                            <>has successfully presented and published the research paper titled <br/><strong className="text-slate-900">{config.extra}</strong></>
                          ) : config.isHonorary ? (
                            <>has been recognized as an <strong className="text-amber-700">Honorary Guest</strong> of the International Scientific Symposium for exceptional contribution to Navoi studies.</>
                          ) : (
                            <>has successfully participated in the sessions and discussions of the International Scientific Symposium dedicated to Alisher Navoiy's heritage.</>
                          )}
                        </p>
                     </div>

                     <div className="flex justify-between items-end pt-12">
                        <div className="text-left space-y-4">
                           <div className="h-px w-48 bg-slate-900 mb-2 opacity-20" />
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Scientific Committee Chair</p>
                           <p className="text-xl font-classic text-slate-900">Dr. O. Abduraimov</p>
                        </div>

                        {/* Holographic Seal Effect */}
                        <div className="relative">
                           <div className="w-36 h-36 rounded-full border-4 border-amber-900/10 flex items-center justify-center relative overflow-hidden group/seal">
                              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-white/50 to-blue-500/20 opacity-40 animate-[spin_10s_linear_infinite]" />
                              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=VERIFIED-${config.verifyId}`} className="w-18 h-18 opacity-40 grayscale relative z-10" alt="QR" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/seal:opacity-100 transition-opacity z-20 bg-white/90 backdrop-blur-sm">
                                 <ShieldCheck className="text-emerald-500 w-14 h-14" />
                              </div>
                           </div>
                           <p className="text-[8px] font-black uppercase text-slate-400 mt-4 text-center tracking-widest">Digital Audit Hash: {user.id.slice(0,8)}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
            <button className="px-12 py-7 royal-gradient text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(0,77,97,0.3)] flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all">
               <Printer size={24} /> Sertifikatni chop etish
            </button>
            <button className="px-12 py-7 bg-white border-2 border-slate-900 text-slate-900 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-slate-950 hover:text-white transition-all">
               <Share2 size={24} /> Ijtimoiy tarmoqqa yuborish
            </button>
         </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-700">
       <div className="text-center mb-16">
          <h2 className="text-5xl font-classic uppercase text-slate-900 mb-4">{t('cab_settings')}</h2>
          <p className="text-xl font-serif-classic italic text-slate-500">Shaxsiy va akademik profilingizni yangilang.</p>
       </div>

       <form className="glass-card p-12 md:p-16 rounded-[4rem] bg-white border-amber-200 shadow-3xl space-y-12">
          <div className="grid md:grid-cols-2 gap-10">
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-amber-800">Ism va Familiya</label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-500 transition-all font-serif-classic text-xl italic" defaultValue={user.name} />
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-amber-800">Email manzili</label>
                <input type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-500 transition-all font-serif-classic text-xl italic" defaultValue={user.email} disabled />
             </div>
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-amber-800">{t('cab_bio_label')}</label>
             <textarea className="w-full h-32 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-500 transition-all font-serif-classic text-xl italic resize-none" value={profileData.bio} onChange={(e) => setProfileData({...profileData, bio: e.target.value})} />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-amber-800">{t('cab_orcid_label')}</label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-500 transition-all font-serif-classic text-xl italic" value={profileData.orcid} onChange={(e) => setProfileData({...profileData, orcid: e.target.value})} />
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-amber-800">Muassasa</label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-500 transition-all font-serif-classic text-xl italic" value={profileData.institution} onChange={(e) => setProfileData({...profileData, institution: e.target.value})} />
             </div>
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-amber-800">Parolni o'zgartirish</label>
             <div className="grid md:grid-cols-2 gap-6">
                <input type="password" placeholder="Yangi parol" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-500 transition-all font-serif-classic text-lg italic" />
                <input type="password" placeholder="Yangi parolni tasdiqlang" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-amber-500 transition-all font-serif-classic text-lg italic" />
             </div>
          </div>

          <button type="button" className="w-full py-8 royal-gradient text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.4em] shadow-3xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4">
             <Save size={24} /> O'zgarishlarni saqlash ❦
          </button>
       </form>
    </div>
  );

  return (
    <div className="min-h-screen pt-40 pb-24 bg-[#fafaf8] parchment-texture">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-start">
          
          <aside className="w-full lg:w-[420px] shrink-0 lg:sticky lg:top-40 z-30">
            <div className="glass-card p-10 rounded-[4rem] border-amber-200/50 bg-white/90 backdrop-blur-3xl shadow-[0_30px_80px_rgba(166,124,0,0.15)] overflow-hidden">
               <div className="mb-12 flex items-center gap-6 p-4 rounded-3xl bg-slate-50 border border-slate-100 group">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl royal-gradient flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-transform">
                       <UserIcon size={28} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-[8px] text-white">✓</div>
                  </div>
                  <div>
                     <h4 className="text-lg font-classic font-black text-slate-900 uppercase tracking-tight">{user.name}</h4>
                     <p className="text-[9px] font-black uppercase text-amber-600 tracking-widest">Verified Academic Profile</p>
                  </div>
               </div>

               <nav className="space-y-3">
                  {navItems.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-8 py-6 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.2em] relative transition-all group ${
                        activeTab === item.id ? 'text-white' : 'text-slate-500 hover:bg-amber-50'
                      }`}
                    >
                      {activeTab === item.id && (
                        <motion.div layoutId="cab-pill" className="absolute inset-0 royal-gradient shadow-[0_15px_35px_rgba(0,77,97,0.3)] rounded-[2.5rem]" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                      )}
                      <div className="relative z-10 flex items-center gap-5">
                         <span className={`${activeTab === item.id ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-700'} transition-colors`}>{item.icon}</span>
                         {item.label}
                      </div>
                      {activeTab === item.id && <span className="relative z-10 text-amber-400">❦</span>}
                    </button>
                  ))}
                  
                  <div className="pt-8 mt-8 border-t border-amber-50">
                     <button 
                      onClick={onLogout}
                      className="w-full flex items-center justify-center gap-4 px-8 py-6 rounded-[2.5rem] bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-md active:scale-95"
                     >
                        <LogOut size={20} /> Tizimdan chiqish
                     </button>
                  </div>
               </nav>
            </div>
            
            <div className="mt-8 p-10 rounded-[3.5rem] bg-[#001c30] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 opacity-10 animated-pattern pointer-events-none" />
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <Heart className="text-red-400 w-5 h-5 fill-red-400" />
                     <h5 className="text-[10px] font-black uppercase tracking-[0.3em]">Ishtirokchi Merosi</h5>
                  </div>
                  <p className="text-lg font-serif-classic italic opacity-70 mb-8 leading-relaxed">Simpozium yakunida sizning maqolangiz umumiy to'plamga (Conference Proceedings) kiritiladi.</p>
                  <div className="w-12 h-1 bg-amber-500/30 rounded-full mb-8 group-hover:w-full transition-all duration-1000"></div>
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all"><Linkedin size={18}/></div>
                     <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all"><Globe size={18}/></div>
                  </div>
               </div>
            </div>
          </aside>

          <main className="flex-grow w-full min-h-[800px]">
             <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {activeTab === 'overview' && renderOverview()}
                  {activeTab === 'articles' && renderArticles()}
                  {activeTab === 'submit' && renderSubmit()}
                  {activeTab === 'schedule' && renderSchedule()}
                  {activeTab === 'certificate' && renderCertificate()}
                  {activeTab === 'settings' && renderSettings()}
                </motion.div>
             </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PersonalCabinet;
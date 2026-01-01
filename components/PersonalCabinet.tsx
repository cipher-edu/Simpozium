
import React, { useState } from 'react';
import { User, Article, Language } from '../types';
import { SectionTitleDecoration } from './PatternBackground';

interface PersonalCabinetProps {
  user: User;
  onLogout: () => void;
  language: Language;
  t: (key: any) => string;
}

type CabinetTab = 'overview' | 'profile' | 'articles' | 'certificates';

const PersonalCabinet: React.FC<PersonalCabinetProps> = ({ user: initialUser, onLogout, language, t }) => {
  const [activeTab, setActiveTab] = useState<CabinetTab>('overview');
  const [user, setUser] = useState<User>(initialUser);
  const [isSubmittingArticle, setIsSubmittingArticle] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    institution: user.institution || '',
    degree: user.degree || '',
    academicTitle: user.academicTitle || '',
    bio: user.bio || '',
    orcid: user.orcid || '',
    track: user.track || t('label_track')
  });

  const [articleForm, setArticleForm] = useState({
    title: '',
    abstract: '',
    keywords: ''
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setUser({ ...user, ...profileForm });
      setIsSavingProfile(false);
    }, 1200);
  };

  const handleArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const newArticle: Article = {
            id: Math.random().toString(36).substr(2, 9),
            title: articleForm.title,
            abstract: articleForm.abstract,
            keywords: articleForm.keywords.split(',').map(k => k.trim()),
            status: 'technical_check',
            submittedAt: new Date().toLocaleDateString(language === 'en' ? 'en-US' : language === 'ru' ? 'ru-RU' : 'uz-UZ'),
          };
          setUser({ ...user, articles: [newArticle, ...user.articles] });
          setIsSubmittingArticle(false);
          setUploadProgress(0);
          setArticleForm({ title: '', abstract: '', keywords: '' });
          return 0;
        }
        return prev + 15;
      });
    }, 300);
  };

  const renderStatusTimeline = (status: Article['status']) => {
    const steps = [
      { key: 'submitted', label: t('timeline_submitted') },
      { key: 'technical_check', label: t('timeline_tech') },
      { key: 'review', label: t('timeline_review') },
      { key: 'accepted', label: t('timeline_accepted') }
    ];
    const currentIdx = steps.findIndex(s => s.key === status);

    return (
      <div className="mt-8 flex items-center justify-between relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
        {steps.map((step, idx) => (
          <div key={step.key} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 border-2 ${
              idx <= currentIdx ? 'bg-amber-500 border-amber-600 text-white shadow-lg scale-110' : 'bg-white border-slate-200 text-slate-300'
            }`}>
              {idx < currentIdx ? '✓' : idx + 1}
            </div>
            <span className={`mt-2 text-[9px] font-black uppercase tracking-tighter ${idx <= currentIdx ? 'text-amber-800' : 'text-slate-300'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass-card p-12 rounded-[3rem] border-amber-200 shadow-2xl bg-slate-950 text-white relative overflow-hidden group">
         <div className="relative z-10">
           <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-3xl gold-gradient p-1 shadow-2xl overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=111&color=d4af37&bold=true`} className="w-full h-full rounded-2xl object-cover" alt="Avatar" />
              </div>
              <div>
                <h1 className="text-4xl font-classic tracking-wide">{t('cabinet_welcome')}, <span className="text-amber-400">{user.name}</span></h1>
                <p className="text-amber-500/60 font-black uppercase tracking-[0.3em] text-[10px]">{t('cabinet_status')}</p>
              </div>
           </div>
           <p className="text-2xl font-serif-classic italic text-slate-300 max-w-2xl mb-10 leading-relaxed">
             {t('footer_text')}
           </p>
         </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-[2.5rem] border-amber-200 flex flex-col items-center text-center shadow-xl group">
          <h3 className="font-classic text-xl font-black mb-10 text-slate-900 tracking-widest uppercase">{t('cabinet_badge')}</h3>
          <div className="relative p-6 bg-white rounded-[2rem] border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform">
             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${user.qrCode}`} alt="QR" className="w-40 h-40 opacity-80" />
          </div>
          <p className="mt-8 text-sm font-mono font-bold text-amber-900 bg-amber-50 px-6 py-2 rounded-full">{user.qrCode}</p>
          <button className="mt-8 w-full py-4 royal-gradient text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg">{t('cabinet_download_pdf')}</button>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] border-amber-200 shadow-xl">
          <h3 className="font-classic text-xl font-black text-slate-900 tracking-widest uppercase mb-8">{t('cabinet_article_status')}</h3>
          {user.articles.length > 0 ? (
            <div className="space-y-6">
              <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-3 text-lg line-clamp-2">{user.articles[0].title}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.articles[0].submittedAt}</span>
                </div>
              </div>
              {renderStatusTimeline(user.articles[0].status)}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-10 opacity-40">
              <p className="font-serif-classic italic text-xl">Empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <form onSubmit={handleProfileSave} className="glass-card p-12 rounded-[3.5rem] border-amber-200 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700">
        <div className="mb-16">
          <SectionTitleDecoration />
          <h2 className="text-4xl font-classic text-center text-slate-900 -mt-8 mb-2">{t('cabinet_profile_title')}</h2>
          <p className="text-center text-slate-500 font-serif-classic italic text-xl">{t('cabinet_profile_subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3">{t('label_fullname')}</label>
              <input required type="text" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-serif-classic text-xl" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3">{t('label_institution')}</label>
              <input required type="text" value={profileForm.institution} onChange={e => setProfileForm({...profileForm, institution: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-serif-classic text-xl" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3">{t('label_degree')}</label>
                <input required type="text" value={profileForm.degree} onChange={e => setProfileForm({...profileForm, degree: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-serif-classic text-xl" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3">{t('label_title')}</label>
                <input required type="text" value={profileForm.academicTitle} onChange={e => setProfileForm({...profileForm, academicTitle: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-serif-classic text-xl" />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3">{t('label_email')}</label>
              <input required type="email" value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-serif-classic text-xl" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3">{t('label_phone')}</label>
                <input required type="tel" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-serif-classic text-xl" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3">{t('label_orcid')}</label>
                <input required type="text" value={profileForm.orcid} onChange={e => setProfileForm({...profileForm, orcid: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-serif-classic text-xl" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-700 mb-3">{t('label_bio')}</label>
              <textarea required value={profileForm.bio} rows={4} onChange={e => setProfileForm({...profileForm, bio: e.target.value})} className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-serif-classic text-xl resize-none" />
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <button disabled={isSavingProfile} type="submit" className="px-20 py-6 rounded-[2rem] royal-gradient text-white font-black uppercase tracking-widest text-[10px] shadow-2xl">
            {isSavingProfile ? t('cabinet_saving') : t('cabinet_save')}
          </button>
        </div>
    </form>
  );

  const renderArticles = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-4xl font-classic text-slate-900">{t('article_submit_title')}</h2>
        <button onClick={() => setIsSubmittingArticle(true)} className="px-10 py-4 gold-gradient text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-widest">Add New</button>
      </div>
      {isSubmittingArticle && (
        <form onSubmit={handleArticleSubmit} className="glass-card p-12 rounded-[3.5rem] border-blue-200 bg-blue-50/20 space-y-8">
            <h3 className="text-3xl font-classic text-blue-900">{t('article_submit_title')}</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-blue-800 mb-2">{t('article_title_label')}</label>
                <input required type="text" value={articleForm.title} onChange={e => setArticleForm({...articleForm, title: e.target.value})} className="w-full p-5 rounded-2xl bg-white border border-blue-100 outline-none font-serif-classic text-xl" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-blue-800 mb-2">{t('article_abstract_label')}</label>
                <textarea required rows={5} value={articleForm.abstract} onChange={e => setArticleForm({...articleForm, abstract: e.target.value})} className="w-full p-5 rounded-2xl bg-white border border-blue-100 outline-none font-serif-classic text-xl resize-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-blue-800 mb-2">{t('article_keywords_label')}</label>
                  <input required type="text" value={articleForm.keywords} onChange={e => setArticleForm({...articleForm, keywords: e.target.value})} className="w-full p-5 rounded-2xl bg-white border border-blue-100 outline-none font-serif-classic text-lg" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-blue-800 mb-2">{t('article_file_label')}</label>
                  <div className="w-full p-5 rounded-2xl bg-blue-100/30 border-2 border-dashed border-blue-200 text-center text-blue-700 font-bold">{uploadProgress > 0 ? `${uploadProgress}%` : 'Choose File'}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <button disabled={uploadProgress > 0} type="submit" className="px-12 py-5 royal-gradient text-white font-black rounded-2xl uppercase tracking-widest text-[10px]">{t('article_btn_submit')}</button>
              <button type="button" onClick={() => setIsSubmittingArticle(false)} className="px-12 py-5 bg-white border text-slate-500 font-black rounded-2xl uppercase tracking-widest text-[10px]">{t('article_btn_cancel')}</button>
            </div>
        </form>
      )}
      <div className="space-y-6">
        {user.articles.map((art) => (
          <div key={art.id} className="glass-card p-10 rounded-[3rem] border-slate-100">
            <h3 className="text-2xl font-classic text-slate-900 mb-4">{art.title}</h3>
            {renderStatusTimeline(art.status)}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="relative bg-[#fffdfa] p-16 md:p-32 rounded-[3rem] shadow-2xl border-[20px] border-[#d4af37] border-double overflow-hidden parchment-texture">
          <div className="text-center relative z-10">
            <h4 className="font-classic text-amber-700 text-2xl tracking-[0.5em] uppercase mb-10">{t('cert_title')}</h4>
            <div className="w-48 h-[1px] bg-amber-300 mx-auto mb-12" />
            <p className="text-2xl font-serif-classic italic text-slate-600 mb-8">{t('cert_confirm')}</p>
            <h3 className="text-7xl font-classic text-slate-900 mb-10 border-b-2 border-amber-100 inline-block px-16 pb-6 uppercase">{user.name}</h3>
            <p className="text-2xl md:text-3xl font-serif-classic italic text-slate-800 max-w-3xl mx-auto leading-relaxed mb-16 px-4">
              {t('cert_body')}
            </p>
            <div className="flex flex-col md:flex-row justify-between items-end mt-24 gap-12">
              <div className="text-left md:w-1/2">
                <div className="w-48 h-[1px] bg-slate-300 mb-4" />
                <p className="font-classic text-xl text-slate-950 mb-1">{t('cert_rector_name')}</p>
                <p className="text-[10px] font-black uppercase text-slate-500 leading-tight">{t('cert_rector_title')}</p>
              </div>
              <div className="text-right md:w-1/2">
                <div className="w-48 h-[1px] bg-slate-300 mb-4 ml-auto" />
                <p className="font-classic text-xl text-slate-950 mb-1">{t('cert_date')}</p>
                <p className="text-[10px] font-black uppercase text-slate-500">ID: SYMP-NAV-584-{user.id.slice(0,4)}</p>
              </div>
            </div>
          </div>
      </div>
      <div className="flex justify-center">
         <button className="px-16 py-6 royal-gradient text-white font-black rounded-[2rem] shadow-2xl uppercase tracking-widest text-[10px]">{t('cert_btn_download')}</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
      <div className="flex flex-col lg:flex-row gap-16">
        <aside className="w-full lg:w-80 shrink-0">
          <div className="glass-card p-10 rounded-[3.5rem] border-amber-200 shadow-2xl flex flex-col items-center sticky top-32">
            <div className="relative mb-8">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=fdfaf3&color=d4af37&size=256&bold=true`} className="w-32 h-32 rounded-full border-4 border-white shadow-2xl" alt="Profile" />
            </div>
            <h2 className="text-2xl font-classic font-black text-slate-950 mb-1 text-center leading-tight uppercase">{user.name}</h2>
            <nav className="w-full space-y-4 mt-12">
              {([
                { id: 'overview' as const, label: t('nav_cabinet'), icon: '🏠' },
                { id: 'profile' as const, label: 'Profile', icon: '👤' },
                { id: 'articles' as const, label: 'Papers', icon: '📝' },
                { id: 'certificates' as const, label: 'Awards', icon: '🏆' },
              ]).map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-5 py-4 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === item.id ? 'gold-gradient text-slate-950 shadow-xl' : 'text-slate-500 hover:bg-amber-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <button onClick={onLogout} className="w-full py-4 px-8 text-red-600 font-black uppercase tracking-widest text-[10px] flex items-center gap-4 hover:bg-red-50 rounded-2xl transition-all mt-10 border-t border-slate-50 pt-10">Logout</button>
            </nav>
          </div>
        </aside>
        <div className="flex-grow min-h-[800px]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'articles' && renderArticles()}
          {activeTab === 'certificates' && renderCertificates()}
        </div>
      </div>
    </div>
  );
};

export default PersonalCabinet;

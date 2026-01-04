
import React, { useState } from 'react';
import { User, Article, Language, Speaker } from '../types';

interface AdminPanelProps {
  currentUser: User;
  language: Language;
  t: (key: any) => string;
}

type AdminTab = 'dashboard' | 'users' | 'articles' | 'speakers' | 'settings';

const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser, language, t }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  // Simulyatsiya qilingan ma'lumotlar
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Ali Valiyev', email: 'ali@mail.uz', role: 'participant', institution: 'NDU', articles: [], qrCode: 'QR-123' },
    { id: '2', name: 'Vali Aliyev', email: 'vali@mail.uz', role: 'speaker', institution: 'Sorbonne', articles: [], qrCode: 'QR-456' },
    { id: '3', name: 'Zaynab Turkiy', email: 'zaynab@uni.tr', role: 'speaker', institution: 'Istanbul Uni', articles: [], qrCode: 'QR-789' },
    { id: '4', name: 'Bobur Mirzo', email: 'bobur@history.uz', role: 'participant', institution: 'Fanlar Akademiyasi', articles: [], qrCode: 'QR-000' },
  ]);

  const [articles, setArticles] = useState<Article[]>([
    { id: 'a1', userId: '1', userName: 'Ali Valiyev', title: 'Navoiy ijodida inson konsepsiyasi va komil inson masalasi', abstract: 'Ushbu maqolada Hazrat Navoiyning "Xamsa" dostonlari misolida inson tarbiyasi tahlil qilinadi...', keywords: ['Navoiy', 'Inson', 'Xamsa'], status: 'technical_check', submittedAt: '12.01.2025', track: 'Tasavvuf va ma’naviyat' },
    { id: 'a2', userId: '2', userName: 'Vali Aliyev', title: 'Turkiy tillar evolyutsiyasi va Navoiy lug‘ati', abstract: 'Maqola turkiy tillarning XI-XV asrlardagi taraqqiyotini "Muhokamatul-lug‘atayn" misolida yoritadi...', keywords: ['Til', 'Tarix', 'Lug‘at'], status: 'submitted', submittedAt: '15.01.2025', track: 'Navoiy va turkiy adabiyot' },
  ]);

  const [speakers, setSpeakers] = useState<Speaker[]>([
    { id: 's1', name: 'Oybek Abduraimov', title: 'Professor', institution: 'NDU', image: 'https://picsum.photos/seed/s1/200', participationYears: [2024, 2025], email: 'oybek@ndu.uz' },
    { id: 's2', name: 'Elena Petrova', title: 'Sharqshunos', institution: 'Lomonosov Uni', image: 'https://picsum.photos/seed/s2/200', participationYears: [2025], email: 'elena@uni.ru' },
  ]);

  const stats = {
    totalUsers: users.length,
    pendingArticles: articles.filter(a => a.status === 'technical_check' || a.status === 'submitted').length,
    acceptedArticles: articles.filter(a => a.status === 'accepted').length,
    countries: 12,
  };

  const handleArticleAction = (id: string, newStatus: Article['status']) => {
    setArticles(articles.map(art => art.id === id ? { ...art, status: newStatus, feedback: feedbackText } : art));
    setSelectedArticle(null);
    setFeedbackText('');
  };

  const deleteUser = (id: string) => {
    if (window.confirm('Haqiqatdan ham ushbu foydalanuvchini o‘chirmoqchimisiz?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const changeUserRole = (id: string, newRole: User['role']) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  const renderDashboard = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('admin_stats_total_users'), val: stats.totalUsers, color: 'royal-gradient', icon: '👥' },
          { label: t('admin_stats_pending_articles'), val: stats.pendingArticles, color: 'gold-gradient', icon: '⏳' },
          { label: t('admin_stats_accepted'), val: stats.acceptedArticles, color: 'bg-emerald-600', icon: '✅' },
          { label: 'Davlatlar', val: stats.countries, color: 'bg-indigo-600', icon: '🌍' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-8 rounded-[2rem] border-slate-100 shadow-xl bg-white flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
              <h4 className="text-4xl font-classic text-slate-900">{stat.val}</h4>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-2xl shadow-lg text-white`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border-slate-100 shadow-xl bg-white/80">
          <h3 className="text-xl font-classic font-black text-slate-900 mb-8 uppercase tracking-widest flex items-center gap-3">
             <span className="w-2 h-8 gold-gradient rounded-full"></span>
             So'nggi kelib tushgan maqolalar
          </h3>
          <div className="space-y-4">
            {articles.slice(0, 5).map(art => (
              <div key={art.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">📄</div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 line-clamp-1">{art.title}</h5>
                    <p className="text-xs text-slate-400">{art.userName} • {art.submittedAt}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setActiveTab('articles'); setSelectedArticle(art); }}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-50 hover:text-amber-800 transition-all"
                >
                  Ko'rish
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] border-slate-100 shadow-xl bg-amber-900 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl">📜</div>
           <h3 className="text-xl font-classic font-black mb-8 uppercase tracking-widest relative z-10">Admin Eslatmasi</h3>
           <div className="space-y-6 relative z-10">
              <p className="text-amber-100/70 italic text-sm leading-relaxed">
                "Barcha maqolalar texnik ko'rikdan o'tgandan so'ng taqrizchilarga yo'naltirilishi shart. Muddat: 1-fevralgacha."
              </p>
              <div className="pt-6 border-t border-white/10">
                 <div className="flex justify-between text-xs font-black uppercase tracking-widest text-amber-500 mb-2">
                    <span>Server Xotirasi</span>
                    <span>72%</span>
                 </div>
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[72%]"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="glass-card p-10 rounded-[3rem] border-slate-100 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-classic text-slate-900 uppercase tracking-widest mb-2">{t('admin_users')}</h2>
          <p className="text-slate-400 text-xs">Jami ro'yxatdan o'tganlar: {users.length} nafar</p>
        </div>
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder={t('admin_search_placeholder')} 
            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:border-amber-500 transition-all text-sm shadow-inner"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 text-xl">🔍</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">{t('admin_table_name')}</th>
              <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Muassasa</th>
              <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Rol</th>
              <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">{t('admin_table_actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())).map(u => (
              <tr key={u.id} className="group hover:bg-slate-50/80 transition-colors">
                <td className="py-6 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-slate-950 font-bold text-xs shadow-md">{u.name.charAt(0)}</div>
                    <div>
                      <h5 className="font-serif-classic text-lg font-bold text-slate-800 leading-none mb-1">{u.name}</h5>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-4 text-sm font-medium text-slate-600 italic">{u.institution || '—'}</td>
                <td className="py-6 px-4">
                  <select 
                    value={u.role}
                    onChange={(e) => changeUserRole(u.id, e.target.value as User['role'])}
                    className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase bg-slate-100 text-slate-600 border-none outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
                  >
                    <option value="participant">Participant</option>
                    <option value="speaker">Speaker</option>
                    <option value="listener">Listener</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-6 px-4">
                  <div className="flex gap-2">
                    <button className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">✎</button>
                    <button onClick={() => deleteUser(u.id)} className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm">✕</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderArticles = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="flex justify-between items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
        <h2 className="text-3xl font-classic text-slate-900 uppercase tracking-widest">{t('admin_articles')}</h2>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-amber-50 text-amber-800 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200">Barchasi</button>
          <button className="px-6 py-2 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest">Kutilayotganlar</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {articles.map(art => (
          <div key={art.id} className="glass-card p-10 rounded-[3rem] border-slate-100 bg-white hover:shadow-2xl transition-all group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${
                art.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                art.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
              }`}>{art.status}</span>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{art.submittedAt}</span>
            </div>
            
            <h3 className="text-2xl font-classic font-black text-slate-900 mb-4 group-hover:text-amber-800 transition-colors leading-tight">
              {art.title}
            </h3>
            <p className="text-sm font-serif-classic italic text-slate-500 mb-8 border-l-2 border-amber-200 pl-4">
              {art.userName} | {art.track}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {art.keywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 bg-slate-50 text-slate-400 rounded-lg text-[9px] font-bold">#{kw}</span>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
              <button 
                onClick={() => setSelectedArticle(art)}
                className="w-full py-4 royal-gradient text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:opacity-90 transition-all"
              >
                Taqriz qilish
              </button>
              <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                Faylni yuklash 📥
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail/Review Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-950/40">
           <div className="w-full max-w-4xl bg-white rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.2)] border border-amber-200 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="gold-gradient h-2"></div>
              <div className="p-10 md:p-16 overflow-y-auto">
                 <div className="flex justify-between items-start mb-10">
                    <h2 className="text-4xl font-classic text-slate-900 leading-tight pr-10">{selectedArticle.title}</h2>
                    <button onClick={() => setSelectedArticle(null)} className="p-4 bg-slate-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all text-2xl">✕</button>
                 </div>
                 
                 <div className="grid md:grid-cols-3 gap-10 mb-12">
                    <div className="p-6 bg-slate-50 rounded-3xl">
                       <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Muallif</p>
                       <p className="font-serif-classic text-xl font-bold">{selectedArticle.userName}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl">
                       <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Sana</p>
                       <p className="font-serif-classic text-xl font-bold">{selectedArticle.submittedAt}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl">
                       <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Sho'ba</p>
                       <p className="font-serif-classic text-xl font-bold">{selectedArticle.track}</p>
                    </div>
                 </div>

                 <div className="space-y-8 mb-12">
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-800 mb-4">Annotatsiya</h4>
                       <p className="text-xl font-serif-classic italic text-slate-700 leading-relaxed bg-amber-50/30 p-8 rounded-[2.5rem] border border-amber-100">
                          {selectedArticle.abstract}
                       </p>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-800 mb-4">Taqrizchi Izohi</h4>
                       <textarea 
                         rows={4}
                         placeholder="Taqriz izohini kiriting..."
                         className="w-full p-6 rounded-[2rem] border border-slate-200 outline-none focus:border-amber-500 font-serif-classic text-lg resize-none shadow-inner"
                         value={feedbackText}
                         onChange={(e) => setFeedbackText(e.target.value)}
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <button 
                      onClick={() => handleArticleAction(selectedArticle.id, 'accepted')}
                      className="py-5 bg-emerald-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-emerald-700 transition-all"
                    >
                      Qabul qilish
                    </button>
                    <button 
                      onClick={() => handleArticleAction(selectedArticle.id, 'technical_check')}
                      className="py-5 bg-amber-500 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-amber-600 transition-all"
                    >
                      Qayta ishlash
                    </button>
                    <button 
                      onClick={() => handleArticleAction(selectedArticle.id, 'rejected')}
                      className="py-5 bg-red-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-red-700 transition-all"
                    >
                      Rad etish
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  const renderSpeakers = () => (
    <div className="glass-card p-10 rounded-[3rem] border-slate-100 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700 bg-white">
       <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-classic text-slate-900 uppercase tracking-widest">Ma'ruzachilar bazasi</h2>
          <button className="px-10 py-4 gold-gradient text-slate-950 font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg">Yangi Spiker Qo'shish +</button>
       </div>

       <div className="grid md:grid-cols-2 gap-8">
          {speakers.map(s => (
            <div key={s.id} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center gap-8 group hover:bg-white hover:shadow-xl transition-all">
               <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-2 border-white shadow-lg shrink-0">
                  <img src={s.image} className="w-full h-full object-cover" alt={s.name} />
               </div>
               <div className="flex-grow">
                  <h4 className="text-xl font-classic font-bold text-slate-900 mb-1">{s.name}</h4>
                  <p className="text-amber-800 text-[10px] font-black uppercase tracking-widest mb-3">{s.title} | {s.institution}</p>
                  <div className="flex gap-4">
                     <button className="text-[10px] font-black uppercase text-blue-600 hover:underline">Tahrirlash</button>
                     <button className="text-[10px] font-black uppercase text-red-600 hover:underline">O'chirish</button>
                  </div>
               </div>
               <div className="text-slate-300 text-3xl font-classic opacity-20">
                  {s.participationYears[0]}
               </div>
            </div>
          ))}
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100/30 pt-32 pb-24 relative overflow-hidden">
      {/* Background Girih for Admin */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] -z-10" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='%23000'/%3E%3C/svg%3E")` }} />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="glass-card p-10 rounded-[3.5rem] border-amber-200 shadow-2xl sticky top-32 bg-white/90 backdrop-blur-xl">
              <div className="mb-12 text-center">
                 <div className="w-24 h-24 gold-gradient rounded-full flex items-center justify-center text-slate-950 font-classic font-bold text-3xl mx-auto mb-6 shadow-xl border-4 border-white">AD</div>
                 <h2 className="text-xl font-classic font-black uppercase tracking-widest text-slate-900">Admin Control</h2>
                 <p className="text-[10px] font-bold text-amber-700 tracking-widest uppercase mt-2">Symposium 2025</p>
              </div>
              <nav className="space-y-3">
                {[
                  { id: 'dashboard' as const, label: t('admin_dashboard'), icon: '📊' },
                  { id: 'users' as const, label: t('admin_users'), icon: '👥' },
                  { id: 'articles' as const, label: t('admin_articles'), icon: '📝' },
                  { id: 'speakers' as const, label: t('admin_speakers'), icon: '🎤' },
                  { id: 'settings' as const, label: 'Sozlamalar', icon: '⚙️' },
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-5 px-8 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                      activeTab === item.id ? 'royal-gradient text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-amber-50 hover:text-amber-800'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-12 pt-10 border-t border-slate-100">
                 <button className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                    <span>Xavfsiz Chiqish</span>
                    <span>🚪</span>
                 </button>
              </div>
            </div>
          </aside>

          {/* Main Workspace */}
          <main className="flex-grow min-h-[800px]">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'articles' && renderArticles()}
            {activeTab === 'speakers' && renderSpeakers()}
            {activeTab === 'settings' && (
               <div className="glass-card p-20 rounded-[3rem] border-slate-100 shadow-2xl bg-white text-center italic text-slate-400 font-serif-classic text-2xl">
                 Tizim sozlamalari yangilanmoqda...
               </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

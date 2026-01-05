
import React, { useState } from 'react';
import { User, Language } from '../types';
import { translations } from '../translations';

interface LoginFormProps {
  onComplete: (user: User) => void;
  onCancel: () => void;
  onSwitchToRegister: () => void;
  language: Language;
}

const LoginForm: React.FC<LoginFormProps> = ({ onComplete, onCancel, onSwitchToRegister, language }) => {
  const t = (key: keyof typeof translations.uz): string => {
    const val = (translations[language] as any)?.[key] || (translations.uz as any)[key];
    return typeof val === 'string' ? val : key;
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulyatsiya: Haqiqiy tizimda bu yerda API chaqiriladi
    if (email && password) {
      const mockUser: User = {
        id: "usr-" + Math.random().toString(36).substr(2, 5),
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        role: 'participant',
        articles: [],
        qrCode: 'SYMP-NAV-2025-' + Math.floor(Math.random() * 9999)
      };
      onComplete(mockUser);
    } else {
      setError(t('login_error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md glass-card rounded-[2.5rem] shadow-2xl border border-amber-200 overflow-hidden relative">
        <div className="gold-gradient h-2" />
        <div className="p-10 md:p-12">
          <button onClick={onCancel} className="mb-6 text-slate-400 hover:text-slate-600 flex items-center text-xs font-black uppercase tracking-widest transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {t('reg_back')}
          </button>
          
          <div className="mb-10">
            <h2 className="text-4xl font-classic font-bold text-slate-900 mb-3 uppercase tracking-wide">{t('login_title')}</h2>
            <p className="text-slate-500 font-serif-classic italic text-xl">{t('login_subtitle')}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold animate-pulse">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2">{t('login_label_email')}</label>
              <input 
                required 
                type="email" 
                className="w-full px-5 py-4 rounded-2xl border border-amber-100 bg-white/50 focus:border-amber-500 outline-none transition-all font-serif-classic text-xl shadow-inner" 
                placeholder="example@mail.com"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2">{t('login_label_password')}</label>
              <input 
                required 
                type="password" 
                className="w-full px-5 py-4 rounded-2xl border border-amber-100 bg-white/50 focus:border-amber-500 outline-none transition-all font-serif-classic text-xl shadow-inner" 
                placeholder="••••••••"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-amber-700">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" className="accent-amber-600" />
                 <span>Eslab qolish</span>
               </label>
               <button type="button" className="hover:text-amber-900">{t('login_forgot')}</button>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full py-5 gold-gradient text-slate-950 font-black rounded-2xl shadow-xl hover:shadow-amber-200/50 hover:-translate-y-1 transition-all uppercase tracking-widest text-[11px]">{t('login_btn')}</button>
            </div>
            
            <div className="text-center pt-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t('login_no_account')}</p>
               <button 
                 type="button"
                 onClick={onSwitchToRegister}
                 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-800 hover:text-amber-950 transition-colors"
               >
                 {t('nav_register')}
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

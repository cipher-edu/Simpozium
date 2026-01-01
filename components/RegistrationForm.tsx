
import React, { useState } from 'react';
import { User, Language } from '../types';
import { translations } from '../translations';

interface RegistrationFormProps {
  onComplete: (user: User) => void;
  onCancel: () => void;
  language: Language;
}

const RegistrationForm: React.FC<RegistrationFormProps & { language: Language }> = ({ onComplete, onCancel, language }) => {
  const t = (key: keyof typeof translations.uz): string => {
    const val = (translations[language] as any)[key] || (translations.uz as any)[key];
    return typeof val === 'string' ? val : key;
  };

  const roles = (translations[language] as any).reg_roles || translations.uz.reg_roles;
  const tracks = (translations[language] as any).tracks_list || translations.uz.tracks_list;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'participant',
    track: tracks[0].title
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Guest Participant',
      email: formData.email,
      role: formData.role as any,
      track: formData.track,
      articles: [],
      qrCode: 'SYMP-NAV-2025-' + Math.floor(Math.random() * 9999)
    };
    onComplete(newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-xl glass-card rounded-3xl shadow-2xl border border-amber-200 overflow-hidden">
        <div className="gold-gradient h-2" />
        <div className="p-8 md:p-12">
          <button onClick={onCancel} className="mb-6 text-slate-400 hover:text-slate-600 flex items-center text-sm font-bold uppercase tracking-widest">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {t('reg_back')}
          </button>
          
          <div className="mb-8">
            <h2 className="text-3xl font-classic font-bold text-slate-900 mb-2 uppercase tracking-wide">{t('reg_title')}</h2>
            <p className="text-slate-500 font-serif-classic italic text-xl">{t('reg_subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2">{t('reg_label_name')}</label>
              <input required type="text" className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-white/50 focus:border-amber-500 outline-none transition-all font-serif-classic text-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2">{t('reg_label_email')}</label>
              <input required type="email" className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-white/50 focus:border-amber-500 outline-none transition-all font-serif-classic text-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2">{t('reg_label_role')}</label>
                <select className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-white/50 focus:border-amber-500 outline-none transition-all font-serif-classic text-lg" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  {roles.map((role: string, idx: number) => (
                    <option key={idx} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-amber-800 mb-2">{t('reg_label_track')}</label>
                <select className="w-full px-4 py-3 rounded-xl border border-amber-100 bg-white/50 focus:border-amber-500 outline-none transition-all font-serif-classic text-lg" value={formData.track} onChange={e => setFormData({...formData, track: e.target.value})}>
                  {tracks.map((track: any, idx: number) => (
                    <option key={idx} value={track.title}>{track.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full py-4 gold-gradient text-slate-900 font-black rounded-xl shadow-lg hover:opacity-90 transition-all uppercase tracking-widest text-[10px]">{t('reg_btn')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

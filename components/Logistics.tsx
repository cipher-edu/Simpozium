
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hotel, Utensils, Phone, MapPin, X, Info, Star, 
  ShieldCheck, Coffee, Car, Wifi, ChevronRight,
  ExternalLink, Clock, DollarSign, Languages, CheckCircle2,
  CalendarCheck, ArrowRight, Map as MapIcon, Navigation,
  Plane, Globe, Bookmark, Heart, Bus, TrainFront,
  Zap, Wind, Sparkles, Building2, Timer, CreditCard
} from 'lucide-react';
import { SectionTitleDecoration } from './PatternBackground.tsx';
import { Language } from '../types.ts';
import { translations } from '../translations.ts';

interface LogisticsProps { language: Language; }

type Category = 'hotels' | 'dining' | 'transport';

const Logistics: React.FC<LogisticsProps> = ({ language }) => {
  const getTransData = (key: string): any => {
    return (translations[language] as any)?.[key] || (translations.uz as any)[key] || [];
  };

  const t = (key: string): string => {
    const val = (translations[language] as any)?.[key] || (translations.uz as any)[key];
    return typeof val === 'string' ? val : key;
  };

  const [activeCategory, setActiveCategory] = useState<Category>('hotels');
  const [selectedItem, setSelectedItem] = useState<{ type: Category, data: any, index: number } | null>(null);

  const hotels = getTransData('logistics_hotels');
  const dining = getTransData('logistics_dining');

  // Define categories array for the tab switcher to fix the missing name error.
  const categories = [
    { id: 'hotels', label: t('logistics_hotels_h'), icon: <Hotel className="w-5 h-5" /> },
    { id: 'dining', label: t('logistics_dining_h'), icon: <Utensils className="w-5 h-5" /> },
    { id: 'transport', label: t('logistics_transport_h'), icon: <Car className="w-5 h-5" /> }
  ];

  const hotelImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200"
  ];

  const diningImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&q=80&w=1200"
  ];

  const transportData = [
    { 
      name: "Aeroport (NVI)", 
      icon: <Plane className="w-10 h-10" />, 
      color: "bg-amber-600",
      desc: "Navoiy Xalqaro Aeroporti (NVI) delegatlar uchun asosiy darvoza bo'lib, xalqaro reyslar uchun qulay transfer xizmatlariga ega.",
      details: "Xalqaro yuk tashish bo'yicha mintaqadagi eng yirik markaz. Delegatlar uchun VIP zal va maxsus kutib olish xizmati mavjud.",
      stats: "24/7 Xizmat",
      feature: "VIP Terminal",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=1200"
    },
    { 
      name: "Afrosiyob Tezyurar", 
      icon: <TrainFront className="w-10 h-10" />, 
      color: "bg-blue-600",
      desc: "Samarqand va Toshkentdan keluvchilar uchun qulay va tezkor tezyurar poyezdlar aloqasi.",
      details: "O'zbekistonning eng zamonaviy tezyurar poyezdi. Toshkentdan Navoiygacha bor-yo'g'i 3 soatlik yo'l.",
      stats: "3 soatlik yo'l",
      feature: "Biznes Klass",
      image: "https://images.unsplash.com/photo-1474487056220-637952e42504?auto=format&fit=crop&q=80&w=1200"
    },
    { 
      name: "Shaharda Taksi", 
      icon: <Car className="w-10 h-10" />, 
      color: "bg-emerald-600",
      desc: "Mobil ilovalar (Yandex Go) va maxsus delegatsiya transportlari har doim xizmatda.",
      details: "Zamonaviy va toza avtomobillar, doimiy aloqada bo'lgan dispetcherlik xizmati.",
      stats: "5-7 min kutish",
      feature: "Yandex Go / MyTaxi",
      image: "https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (selectedItem !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedItem, closeModal]);

  return (
    <section id="logistics-section" className="py-32 relative overflow-hidden bg-slate-50/50">
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <SectionTitleDecoration />
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-9xl font-classic text-slate-900 mb-8 leading-none uppercase tracking-[0.1em]"
          >
            {t('logistics_title')}
          </motion.h2>
          <p className="text-2xl md:text-3xl font-serif-classic text-slate-500 italic max-w-4xl mx-auto leading-relaxed">
            {t('logistics_subtitle')}
          </p>
        </div>

        {/* Kategoriyalar tanlagichi */}
        <div className="flex justify-center mb-24">
          <div className="bg-white/80 backdrop-blur-2xl p-3 rounded-[3rem] border-2 border-amber-200/50 shadow-2xl flex gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as Category)}
                className={`flex items-center gap-4 px-12 py-6 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-700 relative ${
                  activeCategory === cat.id ? 'text-white' : 'text-slate-400 hover:bg-amber-50'
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="active-cat-bg" 
                    className="absolute inset-0 royal-gradient rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,77,97,0.3)]" 
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.8 }} 
                  />
                )}
                <span className="relative z-10">{cat.icon}</span>
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dinamik Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {activeCategory === 'hotels' && hotels.map((h: any, i: number) => (
              <motion.div 
                layoutId={`logistic-item-${activeCategory}-${i}`}
                key={`hotel-${i}`}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedItem({ type: 'hotels', data: h, index: i })}
                className="glass-card rounded-[4rem] border border-amber-200/30 overflow-hidden cursor-pointer group hover:shadow-[0_40px_100px_rgba(166,124,0,0.2)] transition-all duration-700 bg-white/95 relative"
                whileHover={{ y: -20 }}
              >
                <div className="h-80 overflow-hidden relative">
                  <motion.img layoutId={`img-${activeCategory}-${i}`} src={hotelImages[i % hotelImages.length]} className="w-full h-full object-cover" />
                  <div className="absolute top-8 right-8 bg-white/95 px-6 py-3 rounded-2xl flex items-center gap-1.5 shadow-2xl border border-white/50">
                    {[...Array(h.stars || 0)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                  </div>
                </div>
                <div className="p-12">
                  <motion.h4 layoutId={`title-${activeCategory}-${i}`} className="text-3xl font-classic text-slate-900 uppercase mb-4 leading-tight">{h.name}</motion.h4>
                  <p className="text-xl font-serif-classic text-slate-500 italic mb-10 line-clamp-2">{h.desc}</p>
                  <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                    <span className="text-2xl font-classic text-amber-700">{h.price}</span>
                    <ArrowRight className="w-8 h-8 text-amber-700" />
                  </div>
                </div>
              </motion.div>
            ))}

            {activeCategory === 'dining' && dining.map((d: any, i: number) => (
              <motion.div 
                layoutId={`logistic-item-${activeCategory}-${i}`}
                key={`dining-${i}`}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedItem({ type: 'dining', data: d, index: i })}
                className="glass-card rounded-[4rem] border border-blue-200/30 overflow-hidden cursor-pointer group hover:shadow-[0_40px_100px_rgba(0,77,97,0.2)] transition-all duration-700 bg-white/95 relative"
                whileHover={{ y: -20 }}
              >
                <div className="h-80 overflow-hidden relative">
                  <motion.img layoutId={`img-${activeCategory}-${i}`} src={diningImages[i % diningImages.length]} className="w-full h-full object-cover" />
                  <div className="absolute top-8 right-8 bg-white/95 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/50">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <span className="text-sm font-black text-slate-900">{d.rating}</span>
                  </div>
                </div>
                <div className="p-12">
                  <motion.h4 layoutId={`title-${activeCategory}-${i}`} className="text-3xl font-classic text-slate-900 uppercase mb-4 leading-tight">{d.name}</motion.h4>
                  <p className="text-xl font-serif-classic text-slate-500 italic mb-10 line-clamp-2">{d.desc}</p>
                  <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                    <span className="text-lg font-black uppercase text-blue-700">{d.type}</span>
                    <ArrowRight className="w-8 h-8 text-blue-700" />
                  </div>
                </div>
              </motion.div>
            ))}

            {activeCategory === 'transport' && transportData.map((t: any, i: number) => (
              <motion.div 
                layoutId={`logistic-item-${activeCategory}-${i}`}
                key={`transport-${i}`}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedItem({ type: 'transport', data: t, index: i })}
                className="glass-card rounded-[4rem] border border-emerald-200/30 overflow-hidden cursor-pointer group hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700 bg-white/95 relative"
                whileHover={{ y: -20 }}
              >
                <div className="h-80 overflow-hidden relative">
                  <motion.img layoutId={`img-${activeCategory}-${i}`} src={t.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className={`w-20 h-20 ${t.color} rounded-3xl flex items-center justify-center text-white shadow-2xl`}>
                      {t.icon}
                    </div>
                  </div>
                </div>
                <div className="p-12">
                  <motion.h4 layoutId={`title-${activeCategory}-${i}`} className="text-3xl font-classic text-slate-900 uppercase mb-4 leading-tight">{t.name}</motion.h4>
                  <p className="text-xl font-serif-classic text-slate-500 italic mb-10 line-clamp-2">{t.desc}</p>
                  <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                    <span className="text-sm font-black uppercase tracking-widest text-emerald-700">{t.stats}</span>
                    <ArrowRight className="w-8 h-8 text-emerald-700" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Umumiy Modal Oynasi */}
      <AnimatePresence mode="wait">
        {selectedItem !== null && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl" onClick={closeModal} />
            <motion.div 
              layoutId={`logistic-item-${selectedItem.type}-${selectedItem.index}`}
              className="relative w-full max-w-7xl bg-white rounded-[5rem] border shadow-3xl overflow-hidden z-10 flex flex-col lg:flex-row h-full max-h-[90vh] lg:max-h-[85vh]"
            >
              {/* Chap ustun: Rasm */}
              <div className="w-full lg:w-[45%] h-[350px] lg:h-auto relative overflow-hidden bg-slate-900 shrink-0">
                <motion.img 
                  layoutId={`img-${selectedItem.type}-${selectedItem.index}`} 
                  src={selectedItem.type === 'hotels' ? hotelImages[selectedItem.index % hotelImages.length] : selectedItem.type === 'dining' ? diningImages[selectedItem.index % diningImages.length] : selectedItem.data.image} 
                  className="w-full h-full object-cover opacity-80" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  <motion.h4 layoutId={`title-${selectedItem.type}-${selectedItem.index}`} className="text-5xl md:text-7xl font-classic text-white leading-tight uppercase drop-shadow-2xl">{selectedItem.data.name}</motion.h4>
                  <div className="flex items-center gap-4 mt-6">
                    {selectedItem.data.stars && [...Array(selectedItem.data.stars)].map((_, i) => <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />)}
                    {selectedItem.data.rating && <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md text-white font-bold"><Star className="w-4 h-4 fill-amber-400" /> {selectedItem.data.rating}</div>}
                  </div>
                </div>
              </div>

              {/* O'ng ustun: Tafsilotlar */}
              <div className="w-full lg:w-[55%] p-10 md:p-20 bg-[#fffdfa] flex flex-col overflow-y-auto scrollbar-hide relative">
                <button onClick={closeModal} className="absolute top-10 right-10 p-6 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-all z-[130] shadow-md active:scale-90"><X className="w-8 h-8" /></button>
                
                <div className="space-y-16">
                   {/* Maxsus ma'lumotlar bloki */}
                   <div className="grid grid-cols-2 gap-10 border-b border-amber-100 pb-16">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600"><MapPin size={32} /></div>
                         <div>
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Manzil / Masofa</p>
                            <p className="text-2xl font-serif-classic font-bold text-slate-900 italic">{selectedItem.data.dist || selectedItem.data.address || selectedItem.data.stats}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                           {selectedItem.type === 'hotels' ? <CreditCard size={32} /> : selectedItem.type === 'dining' ? <Utensils size={32} /> : <Timer size={32} />}
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Xususiyat</p>
                            <p className="text-2xl font-serif-classic font-bold text-slate-900 italic">{selectedItem.data.price || selectedItem.data.specialty || selectedItem.data.feature}</p>
                         </div>
                      </div>
                   </div>

                   {/* Ta'rif */}
                   <div className="space-y-8">
                      <h5 className="text-[12px] font-black uppercase tracking-[0.5em] text-amber-800 flex items-center gap-4"><Info className="w-6 h-6" /> Batafsil Ma'lumot</h5>
                      <p className="text-2xl md:text-3xl font-serif-classic italic text-slate-800 leading-relaxed bg-amber-50/20 p-10 rounded-[3rem] border-l-8 border-amber-500/30 shadow-inner">
                        "{selectedItem.data.desc} {selectedItem.data.details || ''}"
                      </p>
                   </div>

                   {/* Qulayliklar (Amenity) bloki faqat mehmonxonalar uchun */}
                   {selectedItem.data.amenities && (
                     <div className="space-y-10">
                        <h5 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">Servis va Qulayliklar</h5>
                        <div className="grid grid-cols-2 gap-4">
                           {selectedItem.data.amenities.map((a: string, idx: number) => (
                             <div key={idx} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span className="text-lg font-bold text-slate-700">{a}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}

                   {/* Tugmalar */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10">
                      <button className="py-8 royal-gradient text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all">
                        <CalendarCheck className="w-6 h-6" /> {selectedItem.type === 'hotels' ? 'Xonani Band Qilish' : 'Joy Band Qilish'}
                      </button>
                      <button className="py-8 bg-white border-2 border-slate-900 text-slate-900 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-slate-950 hover:text-white transition-all">
                         <MapIcon className="w-6 h-6" /> Xaritada Ko'rish
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Logistics;

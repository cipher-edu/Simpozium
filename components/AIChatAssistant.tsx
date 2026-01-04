
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Minimize2, Loader2, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Assalomu alaykum! Men virtual yordamchiman. Alisher Navoiy simpoziumi, maqola topshirish tartibi va ilmiy sho'balar bo'yicha qanday savollaringiz bor?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // Initialize GoogleGenAI strictly using process.env.API_KEY as per instructions.
      // This ensures the correct initialization pattern and reliable key access.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Siz Alisher Navoiy nomidagi Navoiy davlat universiteti tomonidan tashkil etilayotgan "Alisher Navoiy merosi — jahon tamadduni ko'zgusida" xalqaro ilmiy simpoziumining rasmiy virtual yordamchisisiz. 
          
          Asosiy ma'lumotlar:
          - Sana: 2025-yil 14-15 fevral.
          - Manzil: Navoiy shahri, Navoiy davlat universiteti bosh binosi.
          - Maqola topshirish muddati: 2025-yil 1-fevralgacha.
          - Sho'balar: 1. Tasavvuf va ma'naviyat. 2. Navoiy va turkiy adabiyot. 3. Sharq falsafasi. 4. Raqamli navoiyshunoslik.
          
          Foydalanuvchilarga doimo o'zbek tilida, muloyim, akademik va professional uslubda javob bering. Hazrat Navoiy ijodidan iqtiboslar keltirish maqsadga muvofiq.`
        }
      });

      // Directly access the .text property of GenerateContentResponse.
      const botResponse = response.text;
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: botResponse || "Kechirasiz, ma'lumot olishda qiyinchilik yuz berdi." 
      }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "Kechirasiz, hozirgi vaqtda texnik nosozlik tufayli javob bera olmayman. Iltimos, birozdan so'ng urinib ko'ring." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-6 w-[calc(100vw-3rem)] sm:w-[450px] h-[600px] max-h-[80vh] glass-card rounded-[3rem] border-amber-300 shadow-[0_40px_100px_rgba(166,124,0,0.3)] overflow-hidden flex flex-col"
          >
            <div className="royal-gradient p-6 text-white flex justify-between items-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 shadow-inner">
                   <Bot className="text-amber-300 w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-classic text-lg uppercase tracking-widest leading-none">Simpozium Bot</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    <p className="text-[10px] opacity-70 uppercase font-black tracking-tighter">Onlayn maslahatchi</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/10 p-2.5 rounded-2xl transition-all active:scale-90"
              >
                <Minimize2 className="w-6 h-6" />
              </button>
            </div>

            <div 
              ref={scrollRef} 
              className="flex-grow p-6 overflow-y-auto space-y-6 bg-[#fffdfa]/60 parchment-texture"
              style={{ scrollBehavior: 'smooth' }}
            >
               {messages.map((m, i) => (
                 <motion.div 
                   initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   key={i} 
                   className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                 >
                    <div className={`max-w-[88%] p-5 rounded-[2rem] text-lg font-serif-classic italic shadow-sm relative ${
                      m.role === 'user' 
                      ? 'bg-amber-100 text-amber-950 rounded-tr-none border border-amber-200' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                    }`}>
                      {m.text}
                      <span className={`absolute top-0 ${m.role === 'user' ? '-right-2' : '-left-2'} text-amber-500/20 text-4xl`}>
                        {m.role === 'user' ? '❦' : '⚜'}
                      </span>
                    </div>
                 </motion.div>
               ))}
               {isLoading && (
                 <div className="flex justify-start">
                   <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-slate-100 flex items-center gap-3 shadow-sm">
                     <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                     <span className="text-sm font-serif-classic italic text-slate-400">Javob tayyorlanmoqda...</span>
                   </div>
                 </div>
               )}
            </div>

            <div className="p-6 bg-white border-t border-amber-100 flex gap-4 items-center shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
               <input 
                 type="text" 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 disabled={isLoading}
                 placeholder="Savolingizni yozing..."
                 className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-50 font-serif-classic italic text-lg transition-all disabled:opacity-50"
               />
               <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="w-14 h-14 gold-gradient rounded-2xl flex items-center justify-center text-slate-950 shadow-xl active:scale-95 hover:brightness-110 transition-all disabled:opacity-50 disabled:grayscale"
               >
                 <Send className="w-6 h-6" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, rotate: isOpen ? 0 : 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-18 h-18 sm:w-20 h-20 rounded-[2.2rem] shadow-[0_20px_50px_rgba(166,124,0,0.4)] flex items-center justify-center transition-all relative ${
          isOpen ? 'bg-slate-900 text-white' : 'gold-gradient text-slate-950'
        }`}
      >
        <div className="absolute inset-0 rounded-[2.2rem] opacity-20 animate-pulse bg-white"></div>
        {isOpen ? <X className="w-8 h-8 relative z-10" /> : <MessageCircle className="w-10 h-10 relative z-10" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
             <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default AIChatAssistant;

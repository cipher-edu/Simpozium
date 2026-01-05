
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Minimize2, Loader2, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';

interface AIChatAssistantProps {
  language: Language;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Assalomu alaykum! Men virtual yordamchiman. Alisher Navoiy simpoziumi bo'yicha qanday savollaringiz bor? / Hello! I am your virtual assistant. How can I help you with the symposium?" }
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Siz Alisher Navoiy nomidagi xalqaro ilmiy simpoziumining rasmiy virtual yordamchisisiz. 
          Hozirgi interfeys tili: ${language === 'uz' ? 'O\'zbekcha' : language === 'ru' ? 'Ruscha' : 'Inglizcha'}.
          
          Asosiy ma'lumotlar:
          - Sana: 2025-yil 14-15 fevral.
          - Manzil: Navoiy shahri, Navoiy davlat universiteti.
          - Maqola topshirish muddati: 2025-yil 1-fevralgacha.
          
          Foydalanuvchi qaysi tilda murojaat qilsa, shu tilda muloyim, akademik va professional uslubda javob bering. Hazrat Navoiy ijodidan iqtiboslar keltirish tavsiya etiladi. Javoblaringizni simpozium mavzulariga (Navoiyshunoslik, NLP, Digital Humanities) yo'naltiring.`
        }
      });

      const botResponse = response.text;
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: botResponse || "Error retrieving information." 
      }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "Kechirasiz, hozirgi vaqtda javob bera olmayman. / Sorry, I cannot respond right now." 
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
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                   <Bot className="text-amber-300 w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-classic text-lg uppercase tracking-widest leading-none">Symposium AI</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    <p className="text-[10px] opacity-70 uppercase font-black">Active</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/10 p-2.5 rounded-2xl transition-all"
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
                    <div className={`max-w-[88%] p-5 rounded-[2rem] text-lg font-serif-classic italic shadow-sm ${
                      m.role === 'user' 
                      ? 'bg-amber-100 text-amber-950 rounded-tr-none border border-amber-200' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                    }`}>
                      {m.text}
                    </div>
                 </motion.div>
               ))}
               {isLoading && (
                 <div className="flex justify-start">
                   <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-slate-100 flex items-center gap-3">
                     <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                   </div>
                 </div>
               )}
            </div>

            <div className="p-6 bg-white border-t border-amber-100 flex gap-4 items-center">
               <input 
                 type="text" 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 disabled={isLoading}
                 placeholder={language === 'uz' ? 'Savolingizni yozing...' : language === 'ru' ? 'Задайте вопрос...' : 'Type your question...'}
                 className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-amber-400 font-serif-classic italic text-lg transition-all"
               />
               <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="w-14 h-14 gold-gradient rounded-2xl flex items-center justify-center text-slate-950 shadow-xl active:scale-95 hover:brightness-110 disabled:opacity-50"
               >
                 <Send className="w-6 h-6" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-18 h-18 sm:w-20 h-20 rounded-[2.2rem] shadow-[0_20px_50px_rgba(166,124,0,0.4)] flex items-center justify-center transition-all ${
          isOpen ? 'bg-slate-900 text-white' : 'gold-gradient text-slate-950'
        }`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-10 h-10" />}
      </motion.button>
    </div>
  );
};

export default AIChatAssistant;

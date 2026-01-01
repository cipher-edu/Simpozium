
import React from 'react';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tourUrl: string;
}

const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ isOpen, onClose, title, tourUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl glass-card rounded-[2.5rem] border-amber-300 overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.3)] flex flex-col h-[80vh]">
        <div className="gold-gradient h-2 w-full" />
        
        <div className="p-6 md:p-8 flex justify-between items-center border-b border-amber-100 bg-white/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-slate-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="text-2xl font-classic text-slate-900">{title}</h3>
              <p className="text-xs text-amber-700 font-bold uppercase tracking-widest">360° Virtual Sayohat</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-3 rounded-full hover:bg-amber-100 text-slate-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="flex-grow bg-black relative">
          <iframe 
            src={tourUrl}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Subtle overlay hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none px-6 py-2 bg-slate-900/60 text-white text-sm rounded-full backdrop-blur-sm italic">
            Atrofni ko'rish uchun sichqonchani ishlating
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;

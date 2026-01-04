
import React, { useEffect, useCallback } from 'react';
import { ExternalLink, Youtube, X, AlertCircle } from 'lucide-react';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tourUrl: string;
}

const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ isOpen, onClose, title, tourUrl }) => {
  const handleClose = useCallback(() => {
    onClose();
    if (window.location.hash === '#tour') {
      window.history.back();
    }
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    const handlePopState = () => {
      if (isOpen) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
      window.history.pushState({ modal: 'tour' }, '', '#tour');
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClose, onClose]);

  if (!isOpen) return null;

  const getSafeUrl = (url: string) => {
    let cleanUrl = url.replace('youtube.com', 'youtube-nocookie.com');
    const separator = cleanUrl.includes('?') ? '&' : '?';
    return `${cleanUrl}${separator}rel=0&modestbranding=1&iv_load_policy=3`;
  };

  const finalUrl = getSafeUrl(tourUrl);
  const youtubeId = tourUrl.split('/').pop()?.split('?')[0];
  const directLink = `https://www.youtube.com/watch?v=${youtubeId}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
      <div 
        className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl transition-opacity duration-500"
        onClick={handleClose}
      />
      
      <div className="relative w-full max-w-6xl glass-card rounded-[3rem] border-amber-300/40 overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.8)] flex flex-col h-[85vh] z-10 animate-in zoom-in-95 duration-300">
        <div className="gold-gradient h-1.5 w-full" />
        
        <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 gold-gradient rounded-2xl flex items-center justify-center text-slate-950 shadow-xl ring-2 ring-white/20">
              <Youtube className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-classic text-white uppercase tracking-tight leading-none mb-2">{title}</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] text-amber-400 font-black uppercase tracking-[0.3em]">Xalqaro Ilmiy Media-Resurs</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href={directLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
            >
              YouTube'da ochish <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button 
              onClick={handleClose}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-red-500/20 text-white hover:text-red-400 transition-all active:scale-95 border border-white/10"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>
        
        <div className="flex-grow bg-slate-950 relative group">
          <iframe 
            src={finalUrl}
            className="w-full h-full border-none relative z-10"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;

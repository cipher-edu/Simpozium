
import React from 'react';

export const GirihPattern: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`fixed inset-0 pointer-events-none ${className} -z-10`} 
       style={{ 
         backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 L72 36 L108 48 L72 60 L60 96 L48 60 L12 48 L48 36 Z' fill='%23a67c00' fill-opacity='0.04'/%3E%3Cpath d='M0 0 L120 120 M120 0 L0 120 M60 0 V120 M0 60 H120' stroke='%23a67c00' stroke-opacity='0.03' stroke-width='0.5'/%3E%3Cpath d='M30 30 L90 30 L90 90 L30 90 Z' fill='none' stroke='%23a67c00' stroke-opacity='0.02' stroke-width='1'/%3E%3C/svg%3E")`,
         backgroundSize: '240px 240px'
       }} 
  />
);

export const DeepGirihBackground: React.FC = () => (
  <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
       style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M80 0 L95 55 L150 55 L105 85 L125 140 L80 110 L35 140 L55 85 L10 55 L65 55 Z' fill='%23004d61'/%3E%3Cpath d='M0 80 H160 M80 0 V160' stroke='%23004d61' stroke-width='1' opacity='0.2'/%3E%3C/svg%3E")`,
         backgroundSize: '80px 80px'
       }}
  />
);

export const IslimiyDivider: React.FC = () => (
  <div className="flex items-center justify-center py-20 opacity-40 relative">
    <div className="absolute inset-0 flex items-center justify-center">
       <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
    </div>
    <div className="relative bg-[#fcf8ee] px-12 py-3 rounded-full border border-amber-300 shadow-md backdrop-blur-md">
      <span className="text-4xl text-amber-700 tracking-[0.5em]">❦⚜❦</span>
    </div>
  </div>
);

export const SectionTitleDecoration: React.FC = () => (
  <div className="flex flex-col items-center mb-12">
    <div className="text-amber-600 text-3xl mb-3 ornament-shadow">✧ ✦ ✧</div>
    <div className="w-24 h-[3px] gold-gradient rounded-full"></div>
  </div>
);

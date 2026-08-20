import React from 'react';
import { Headphones, Sparkles, MessageSquare } from 'lucide-react';

interface FloatingActionsProps {
  onOpenSupport: () => void;
  onOpenGenie: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenSupport,
  onOpenGenie,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Customer Support Headset Button */}
      <button
        id="floating-support-btn"
        onClick={onOpenSupport}
        aria-label="Customer Support"
        className="w-12 h-12 rounded-full bg-white text-[#287DFA] hover:text-[#1C69E5] border border-slate-200/90 shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group cursor-pointer"
      >
        <Headphones className="w-5 h-5 text-slate-700 group-hover:text-[#287DFA] transition-colors" />
      </button>

      {/* TripGenie AI Assistant Button */}
      <button
        id="floating-genie-btn"
        onClick={onOpenGenie}
        aria-label="TripGenie AI Travel Assistant"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0050D8] to-[#287DFA] text-white shadow-xl hover:shadow-2xl flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 group cursor-pointer border-2 border-white/80"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        <span className="text-[10px] font-black tracking-wider uppercase mt-0.5">
          GENIE
        </span>
      </button>
    </div>
  );
};

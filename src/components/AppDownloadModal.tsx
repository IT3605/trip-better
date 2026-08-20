import React from 'react';
import { X, Smartphone, QrCode, Check, Award, Gift } from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-center p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#287DFA] flex items-center justify-center mx-auto mb-3">
          <Smartphone className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          Get the Trip.com Mobile App
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Scan the QR code to download. Get up to <span className="font-bold text-[#287DFA]">$100 app-exclusive promo codes</span> and real-time gate change alerts!
        </p>

        {/* QR Code display */}
        <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 w-44 h-44 mx-auto flex flex-col items-center justify-center">
          <div className="w-36 h-36 bg-white border border-slate-300 rounded-xl p-2 flex flex-col items-center justify-center shadow-inner">
            {/* SVG QR Code pattern */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" fill="white" />
              <path
                d="M10 10h30v30h-30z M60 10h30v30h-30z M10 60h30v30h-30z M18 18h14v14h-14z M68 18h14v14h-14z M18 68h14v14h-14z M45 10h10v10h-10z M45 30h10v10h-10z M10 45h10v10h-10z M30 45h10v10h-10z M60 45h10v10h-10z M80 45h10v10h-10z M45 60h10v10h-10z M60 60h10v10h-10z M75 60h15v15h-15z M45 80h10v10h-10z M60 80h15v10h-15z"
                fill="#0F294D"
              />
              <circle cx="50" cy="50" r="10" fill="#287DFA" />
              <text x="50" y="54" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">T</text>
            </svg>
          </div>
        </div>

        <div className="flex justify-center gap-2 text-xs font-semibold text-slate-700">
          <span className="px-3 py-1 bg-slate-100 rounded-lg">iOS App Store</span>
          <span className="px-3 py-1 bg-slate-100 rounded-lg">Google Play</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  X,
  Headphones,
  Phone,
  MessageCircle,
  HelpCircle,
  Clock,
  ShieldAlert,
  ChevronRight,
  FileQuestion
} from 'lucide-react';

interface CustomerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerSupportModal: React.FC<CustomerSupportModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const faqs = [
    { q: 'How do I cancel or modify my hotel reservation?', a: 'You can change dates or cancel for free directly from "Find Bookings" up to 24h prior to check-in.' },
    { q: 'Where do I find my flight e-ticket & baggage allowance?', a: 'Your airline booking reference (PNR) and electronic baggage pass are sent via email and saved in your Trips tab.' },
    { q: 'How does the Trip.com Price Match Guarantee work?', a: 'If you find a lower publicly available price for the same room & cancellation policy, we match it and refund the difference.' },
    { q: 'What happens if my flight or train is delayed or cancelled?', a: 'Our 24/7 emergency dispatch team assists with automatic rebooking, alternative rail routing, or full refunds.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0F294D] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#287DFA] flex items-center justify-center text-white">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Trip.com Customer Support</h3>
              <p className="text-xs text-slate-300">Award-winning 24/7 Global Travel Assistance</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 bg-[#F8FAFC]">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-[#287DFA] transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#287DFA] flex items-center justify-center mb-2">
                <MessageCircle className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Live Agent Chat</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Average wait: &lt; 30 seconds</p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-[#287DFA] transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">International Hotline</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">+1 (833) 896-0077 (Toll-Free)</p>
            </div>
          </div>

          {/* FAQs section */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <p className="font-bold text-slate-800">{faq.q}</p>
                  <p className="text-slate-500 mt-1 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#287DFA] text-white text-xs font-bold rounded-xl hover:bg-[#1C69E5]"
          >
            Close Support
          </button>
        </div>
      </div>
    </div>
  );
};

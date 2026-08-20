import React from 'react';
import { X, Calendar, MapPin, Tag, CheckCircle2, Ticket, Plane, BedDouble } from 'lucide-react';
import { CouponItem } from '../types';

interface BookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: any[];
  coupons: CouponItem[];
}

export const BookingsModal: React.FC<BookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  coupons,
}) => {
  if (!isOpen) return null;

  const claimedCoupons = coupons.filter((c) => c.claimed);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0F294D] text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg">My Trips & Vouchers</h3>
            <p className="text-xs text-blue-200">
              {bookings.length} Confirmed Itinerary • {claimedCoupons.length} Active Promo Codes
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6 bg-[#F8FAFC]">
          {/* Confirmed Bookings Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Confirmed Travel Bookings
            </h4>

            {bookings.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                <Ticket className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No active bookings yet</p>
                <p className="text-xs text-slate-400 mt-1">
                  Search hotels, flights or trains above to make your first reservation!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                          {b.status}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          Ref: {b.id}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 mt-1">{b.title}</h5>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {b.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {b.destination}
                        </span>
                      </div>
                    </div>

                    <div className="text-right sm:border-l sm:border-slate-100 sm:pl-4">
                      <div className="text-base font-black text-[#287DFA]">
                        ${b.finalPrice}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold">
                        Paid & Confirmed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Claimed Coupons Wallet */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              My Claimed Discount Vouchers ({claimedCoupons.length})
            </h4>

            {claimedCoupons.length === 0 ? (
              <div className="p-6 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-xs text-slate-500">
                  You have not claimed any vouchers yet. Click "Claim all" on the home page!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {claimedCoupons.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 bg-white rounded-xl border border-blue-200/80 shadow-2xs flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-black text-[#287DFA]">
                        {c.percentage}
                      </span>
                      <p className="text-xs font-bold text-slate-800">{c.subtitle}</p>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">
                        Code: {c.code}
                      </span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#287DFA] text-white text-xs font-bold rounded-xl hover:bg-[#1C69E5]"
          >
            Close Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

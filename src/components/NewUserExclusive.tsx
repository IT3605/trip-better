import React, { useState } from 'react';
import { Info, Check, Sparkles, Gift } from 'lucide-react';
import { CouponItem } from '../types';

interface NewUserExclusiveProps {
  coupons: CouponItem[];
  onClaimCoupon: (couponId: string) => void;
  onClaimAll: () => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
}

export const NewUserExclusive: React.FC<NewUserExclusiveProps> = ({
  coupons,
  onClaimCoupon,
  onClaimAll,
  onOpenAuth,
  isLoggedIn,
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const hotelCoupon = coupons.find((c) => c.category === 'Hotels') || coupons[1];
  const trainCoupon = coupons.find((c) => c.category === 'Trains') || coupons[2];
  const tourCoupon = coupons.find((c) => c.category === 'Tours') || coupons[3];

  return (
    <section className="mt-8">
      {/* Section Title */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F294D] mb-4">
        New user exclusive
      </h2>

      {/* Grid of 4 cards matching the screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: New users welcome bundle banner card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#D8E5FE] via-[#E8F0FE] to-[#F2F6FF] border border-blue-100 p-5 flex flex-col justify-between min-h-[170px] shadow-xs">
          {/* Background decorative coupon shape */}
          <div className="absolute right-2 bottom-2 w-24 h-24 bg-blue-300/30 rounded-xl rotate-12 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-14 bg-white/70 backdrop-blur-xs rounded-lg border border-blue-200/60 p-2 shadow-sm flex flex-col justify-center items-center">
              <span className="text-[10px] font-black text-[#287DFA] tracking-tighter">
                Trip<span className="text-[#0F294D]">.com</span>
              </span>
              <span className="text-[9px] font-bold text-slate-700 mt-0.5">VIP PACK</span>
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-base font-extrabold text-[#0F294D] leading-snug max-w-[170px]">
              New users get more discounts on travel!
            </h3>
          </div>

          <div className="relative z-10 pt-4">
            <button
              id="new-user-claim-all-btn"
              onClick={() => {
                if (!isLoggedIn) {
                  onOpenAuth();
                } else {
                  onClaimAll();
                }
              }}
              className="px-4 py-2 bg-[#004BB7] hover:bg-[#00398F] text-white text-xs font-bold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              {isLoggedIn ? 'Claim all vouchers' : 'Sign in & claim all'}
            </button>
          </div>
        </div>

        {/* Card 2: 10% off Hotels & Homes */}
        <div className="relative rounded-2xl bg-white border border-slate-200/80 p-5 flex flex-col justify-between min-h-[170px] shadow-xs hover:shadow-md transition-shadow">
          <div>
            <div className="text-2xl font-extrabold text-[#0F294D] tracking-tight">
              10% off
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-semibold text-slate-700">Hotels & Homes</span>
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveTooltip('hotels')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() =>
                    setActiveTooltip(activeTooltip === 'hotels' ? null : 'hotels')
                  }
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Hotel coupon info"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'hotels' && (
                  <div className="absolute left-0 bottom-full mb-2 w-48 p-2.5 bg-slate-900 text-white text-[11px] rounded-lg shadow-xl z-30">
                    {hotelCoupon?.terms || 'Valid on select hotels worldwide. Max $50 off.'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between pt-4">
            <button
              id="claim-hotel-coupon-btn"
              onClick={() => onClaimCoupon(hotelCoupon.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                hotelCoupon.claimed
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                  : 'bg-[#0066F5] hover:bg-[#0055D0] text-white shadow-xs active:scale-95'
              }`}
            >
              {hotelCoupon.claimed ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Claimed
                </span>
              ) : (
                'Claim all'
              )}
            </button>

            {/* Coral Bed Illustration Icon */}
            <div className="w-10 h-10 rounded-xl bg-red-50/70 border border-red-100 flex items-center justify-center text-[#FF6B6B]">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 stroke-current fill-none stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 4v16" />
                <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                <path d="M2 17h20" />
                <path d="M6 8v9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: 5% off EU trains */}
        <div className="relative rounded-2xl bg-white border border-slate-200/80 p-5 flex flex-col justify-between min-h-[170px] shadow-xs hover:shadow-md transition-shadow">
          <div>
            <div className="text-2xl font-extrabold text-[#0F294D] tracking-tight">
              5% off
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-semibold text-slate-700">EU trains</span>
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveTooltip('trains')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() =>
                    setActiveTooltip(activeTooltip === 'trains' ? null : 'trains')
                  }
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Train coupon info"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'trains' && (
                  <div className="absolute left-0 bottom-full mb-2 w-48 p-2.5 bg-slate-900 text-white text-[11px] rounded-lg shadow-xl z-30">
                    {trainCoupon?.terms || 'Valid on Eurostar, SNCF, DB, and Trenitalia rail tickets.'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between pt-4">
            <button
              id="claim-train-coupon-btn"
              onClick={() => onClaimCoupon(trainCoupon.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                trainCoupon.claimed
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                  : 'bg-[#0066F5] hover:bg-[#0055D0] text-white shadow-xs active:scale-95'
              }`}
            >
              {trainCoupon.claimed ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Claimed
                </span>
              ) : (
                'Claim all'
              )}
            </button>

            {/* Coral Train Illustration Icon */}
            <div className="w-10 h-10 rounded-xl bg-red-50/70 border border-red-100 flex items-center justify-center text-[#FF6B6B]">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 stroke-current fill-none stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="3" width="16" height="16" rx="2" />
                <path d="M4 11h16" />
                <path d="M12 3v8" />
                <path d="m8 19-2 3" />
                <path d="m16 19 2 3" />
                <circle cx="9" cy="15" r="1" />
                <circle cx="15" cy="15" r="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: 10% off Attractions & Tours */}
        <div className="relative rounded-2xl bg-white border border-slate-200/80 p-5 flex flex-col justify-between min-h-[170px] shadow-xs hover:shadow-md transition-shadow">
          <div>
            <div className="text-2xl font-extrabold text-[#0F294D] tracking-tight">
              10% off
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-semibold text-slate-700">Attractions & Tours</span>
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveTooltip('tours')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() =>
                    setActiveTooltip(activeTooltip === 'tours' ? null : 'tours')
                  }
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Tours coupon info"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                {activeTooltip === 'tours' && (
                  <div className="absolute left-0 bottom-full mb-2 w-48 p-2.5 bg-slate-900 text-white text-[11px] rounded-lg shadow-xl z-30">
                    {tourCoupon?.terms || 'Valid on museum passes, city day trips, and theme parks.'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between pt-4">
            <button
              id="claim-tour-coupon-btn"
              onClick={() => onClaimCoupon(tourCoupon.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tourCoupon.claimed
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                  : 'bg-[#0066F5] hover:bg-[#0055D0] text-white shadow-xs active:scale-95'
              }`}
            >
              {tourCoupon.claimed ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Claimed
                </span>
              ) : (
                'Claim all'
              )}
            </button>

            {/* Coral Ticket Illustration Icon */}
            <div className="w-10 h-10 rounded-xl bg-red-50/70 border border-red-100 flex items-center justify-center text-[#FF6B6B]">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 stroke-current fill-none stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Star } from 'lucide-react';
import { TRUSTPILOT_DATA } from '../data/mockData';

export const TrustBanner: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4 my-2 text-xs sm:text-sm text-slate-700 select-none">
      <span className="text-slate-500 font-medium">Our customers say</span>
      <span className="font-bold text-slate-900">{TRUSTPILOT_DATA.ratingText}</span>

      {/* 5 Green Trustpilot Stars */}
      <div className="flex items-center gap-1 mx-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 bg-[#00B67A] rounded-xs flex items-center justify-center"
          >
            <Star className="w-3 h-3 text-white fill-white" />
          </div>
        ))}
      </div>

      <span className="text-slate-600 font-medium">
        <span className="font-bold text-slate-900">{TRUSTPILOT_DATA.score}</span> out of{' '}
        {TRUSTPILOT_DATA.maxScore} based on{' '}
        <span className="font-semibold underline underline-offset-2 decoration-slate-300">
          {TRUSTPILOT_DATA.reviewCount} reviews
        </span>
      </span>
    </div>
  );
};

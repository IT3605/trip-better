import React from 'react';
import { Globe, ShieldCheck, Heart, Award, Smartphone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200 pt-12 pb-8 text-slate-600 text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-slate-200">
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">About Trip.com</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#about" className="hover:text-[#287DFA]">About Us</a></li>
              <li><a href="#news" className="hover:text-[#287DFA]">Newsroom</a></li>
              <li><a href="#careers" className="hover:text-[#287DFA]">Careers</a></li>
              <li><a href="#investor" className="hover:text-[#287DFA]">Investor Relations</a></li>
              <li><a href="#sustainability" className="hover:text-[#287DFA]">Trip.com Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Services</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#rewards" className="hover:text-[#287DFA]">Trip Coins Rewards</a></li>
              <li><a href="#affiliate" className="hover:text-[#287DFA]">Affiliate Program</a></li>
              <li><a href="#partner" className="hover:text-[#287DFA]">List Your Property</a></li>
              <li><a href="#agents" className="hover:text-[#287DFA]">Travel Agent Portal</a></li>
              <li><a href="#trip-planner" className="hover:text-[#287DFA]">Trip.Planner AI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Help & Support</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#faq" className="hover:text-[#287DFA]">Customer Support & FAQs</a></li>
              <li><a href="#guarantee" className="hover:text-[#287DFA]">Service Guarantee</a></li>
              <li><a href="#feedback" className="hover:text-[#287DFA]">Website Feedback</a></li>
              <li><a href="#security" className="hover:text-[#287DFA]">Security Center</a></li>
              <li><a href="#terms" className="hover:text-[#287DFA]">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Popular Bookings</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#tokyo-hotels" className="hover:text-[#287DFA]">Tokyo Hotels</a></li>
              <li><a href="#paris-flights" className="hover:text-[#287DFA]">Flights to Paris</a></li>
              <li><a href="#shinkansen" className="hover:text-[#287DFA]">Japan Bullet Trains</a></li>
              <li><a href="#eurostar" className="hover:text-[#287DFA]">Eurostar London - Paris</a></li>
              <li><a href="#disneyland" className="hover:text-[#287DFA]">Theme Park Tickets</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-slate-900 mb-3 text-sm">Trip.com App</h4>
            <p className="text-slate-500 text-xs mb-3">
              Scan to download our award-winning travel app for iOS & Android.
            </p>
            <div className="w-24 h-24 bg-slate-100 border border-slate-200 rounded-xl p-2 flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="white" />
                <path
                  d="M10 10h30v30h-30z M60 10h30v30h-30z M10 60h30v30h-30z M18 18h14v14h-14z M68 18h14v14h-14z M18 68h14v14h-14z M45 10h10v10h-10z M45 30h10v10h-10z M10 45h10v10h-10z M30 45h10v10h-10z M60 45h10v10h-10z M80 45h10v10h-10z M45 60h10v10h-10z M60 60h10v10h-10z M75 60h15v15h-15z"
                  fill="#0F294D"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom copyright & badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 text-sm">
              Trip<span className="text-[#287DFA]">.com</span>
            </span>
            <span>Copyright © 2026 Trip.com Travel Singapore Pte. Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Privacy Statement</span>
            <span>Cookie Preferences</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

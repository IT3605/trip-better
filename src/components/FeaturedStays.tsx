import React, { useState } from 'react';
import { Star, MapPin, Sparkles, Check, Heart, ExternalLink } from 'lucide-react';
import { HotelItem } from '../types';

interface FeaturedStaysProps {
  hotels: HotelItem[];
  onSelectHotel: (hotel: HotelItem) => void;
}

export const FeaturedStays: React.FC<FeaturedStaysProps> = ({ hotels, onSelectHotel }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [savedHotelIds, setSavedHotelIds] = useState<Set<string>>(new Set());

  const cities = ['All', 'Tokyo', 'Paris', 'Singapore', 'Bangkok', 'New York', 'London'];

  const filteredHotels =
    selectedCity === 'All'
      ? hotels
      : hotels.filter((h) => h.city.toLowerCase() === selectedCity.toLowerCase());

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedHotelIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F294D]">
            Featured Stays & Top Recommended Hotels
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Handpicked luxury and boutique accommodations with high guest ratings
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#287DFA] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Hotel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredHotels.map((hotel) => {
          const isSaved = savedHotelIds.has(hotel.id);
          return (
            <div
              key={hotel.id}
              onClick={() => onSelectHotel(hotel)}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  {hotel.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-slate-900/80 text-white backdrop-blur-xs"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleSave(e, hotel.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors shadow-sm"
                  aria-label="Save hotel"
                >
                  <Heart
                    className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </button>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs shadow-md text-right">
                  <div className="text-[10px] text-slate-400 line-through">
                    ${hotel.originalPrice}
                  </div>
                  <div className="text-sm font-extrabold text-[#0F294D]">
                    ${hotel.price}
                    <span className="text-[10px] font-normal text-slate-500"> / night</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{hotel.city}, {hotel.country}</span>
                    <span>•</span>
                    <span className="truncate">{hotel.distanceToCenter}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#287DFA] transition-colors line-clamp-1">
                    {hotel.name}
                  </h3>

                  {/* Rating score badge */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="px-1.5 py-0.5 rounded-md bg-[#287DFA] text-white text-xs font-black">
                      {hotel.ratingScore}
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {hotel.ratingWord}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({hotel.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Perks */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {hotel.perks.slice(0, 2).map((perk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-sm bg-blue-50 text-[#0066F5] text-[11px] font-medium"
                      >
                        ✓ {perk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-600">
                    Free cancellation available
                  </span>
                  <span className="text-xs font-bold text-[#287DFA] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    View Deal →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

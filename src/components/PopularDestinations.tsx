import React, { useState } from 'react';
import { Plane, BedDouble, Compass, TrendingUp } from 'lucide-react';
import { DestinationItem } from '../types';
import { POPULAR_DESTINATIONS } from '../data/mockData';

interface PopularDestinationsProps {
  onSelectDestination: (destName: string) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  onSelectDestination,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Picks' },
    { id: 'popular', label: 'Trending Hotspots' },
    { id: 'culture', label: 'Art & Heritage' },
    { id: 'beach', label: 'Beach Getaways' },
    { id: 'nature', label: 'Nature & Scenery' },
  ];

  const displayedDestinations =
    activeFilter === 'all'
      ? POPULAR_DESTINATIONS
      : POPULAR_DESTINATIONS.filter((d) => d.tag === activeFilter);

  return (
    <section className="mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#287DFA]" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F294D]">
              Popular Destinations for Your Next Journey
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover top trending cities with bundled flight and hotel packages
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-[#287DFA] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {displayedDestinations.map((dest) => (
          <div
            key={dest.id}
            onClick={() => onSelectDestination(`${dest.name}, ${dest.country}`)}
            className="group relative rounded-2xl overflow-hidden aspect-3/4 bg-slate-900 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Background Image */}
            <img
              src={dest.image}
              alt={dest.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-85 group-hover:opacity-95"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Badge */}
            {dest.badge && (
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[#287DFA] text-white shadow-xs">
                  {dest.badge}
                </span>
              </div>
            )}

            {/* Bottom Content */}
            <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight drop-shadow-xs">
                {dest.name}
              </h3>
              <p className="text-[11px] text-slate-300 drop-shadow-xs mb-2">{dest.country}</p>

              <div className="pt-1 border-t border-white/20 flex flex-col gap-0.5 text-[11px] font-medium">
                <div className="flex items-center justify-between text-blue-200">
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3 h-3" /> Stays
                  </span>
                  <span className="font-bold text-white">From ${dest.hotelStartingPrice}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1">
                    <Plane className="w-3 h-3" /> Flights
                  </span>
                  <span className="font-bold text-white">From ${dest.flightStartingPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import {
  BedDouble,
  Plane,
  Train,
  Car,
  Ticket,
  Luggage,
  Search,
  MapPin,
  Calendar as CalendarIcon,
  User,
  Check,
  ShieldCheck,
  Briefcase,
  ChevronDown,
  ArrowRightLeft,
  Plus,
  Minus,
  X
} from 'lucide-react';
import { MainTab, SearchState } from '../types';
import { POPULAR_CITIES } from '../data/mockData';

interface HeroSearchProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  searchState: SearchState;
  onSearchStateChange: (updated: Partial<SearchState>) => void;
  onExecuteSearch: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  activeTab,
  onTabChange,
  searchState,
  onSearchStateChange,
  onExecuteSearch,
}) => {
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [destSearchTerm, setDestSearchTerm] = useState('');

  const destRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabs: { id: MainTab; label: string; icon: React.ReactNode }[] = [
    { id: 'hotels', label: 'Hotels & Homes', icon: <BedDouble className="w-4 h-4" /> },
    { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
    { id: 'trains', label: 'Trains', icon: <Train className="w-4 h-4" /> },
    { id: 'cars', label: 'Cars', icon: <Car className="w-4 h-4" /> },
    { id: 'attractions', label: 'Attractions & Tours', icon: <Ticket className="w-4 h-4" /> },
    { id: 'flight_hotel', label: 'Flight + Hotel', icon: <Luggage className="w-4 h-4" /> },
  ];

  const filteredCities = POPULAR_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(destSearchTerm.toLowerCase()) ||
      c.country.toLowerCase().includes(destSearchTerm.toLowerCase())
  );

  const getHeadline = () => {
    switch (activeTab) {
      case 'flights':
        return 'Fly beyond horizons with best fare guarantee';
      case 'trains':
        return 'Fast, scenic rail travel across Europe & Asia';
      case 'cars':
        return 'Unbeatable car rental rates with free cancellation';
      case 'attractions':
        return 'Explore world-famous sights & instant skip-the-line tickets';
      case 'flight_hotel':
        return 'Bundle flights & hotels to save up to 25%';
      case 'hotels':
      default:
        return 'Every check-in is a new beginning';
    }
  };

  return (
    <div className="relative rounded-2xl md:rounded-3xl bg-[#287DFA] p-6 sm:p-8 md:p-10 shadow-lg text-white overflow-hidden transition-all duration-300">
      {/* Background soft pattern */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-700/30 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Headline */}
      <div className="relative z-10 text-center mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-xs">
          {getHeadline()}
        </h1>

        {/* Guarantees row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-3 text-xs sm:text-sm font-medium text-blue-100">
          <div className="flex items-center gap-1.5 bg-blue-600/30 px-3 py-1 rounded-full backdrop-blur-xs">
            <span className="w-4 h-4 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-[10px] font-black">
              ✓
            </span>
            <span>We price match</span>
          </div>

          <div className="flex items-center gap-1.5 bg-blue-600/30 px-3 py-1 rounded-full backdrop-blur-xs">
            <Briefcase className="w-3.5 h-3.5 text-blue-200" />
            <span>Hotel booking guarantee</span>
          </div>

          <div className="flex items-center gap-1.5 bg-blue-600/30 px-3 py-1 rounded-full backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
            <span>Hotel stay guarantee</span>
          </div>
        </div>
      </div>

      {/* White Search Box */}
      <div className="relative z-10 bg-white rounded-2xl p-4 sm:p-6 text-slate-900 shadow-xl">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 pb-4 border-b border-slate-100 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`hero-tab-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#287DFA] bg-blue-50/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className={isActive ? 'text-[#287DFA]' : 'text-slate-400'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category Sub-Filters (e.g. for Flights / Trains) */}
        {activeTab === 'flights' && (
          <div className="flex flex-wrap items-center gap-4 pt-3 pb-1 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              {(['round_trip', 'one_way', 'multi_city'] as const).map((type) => (
                <label key={type} className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="flightType"
                    checked={searchState.flightType === type}
                    onChange={() => onSearchStateChange({ flightType: type })}
                    className="accent-[#287DFA]"
                  />
                  <span>
                    {type === 'round_trip'
                      ? 'Round-trip'
                      : type === 'one_way'
                      ? 'One-way'
                      : 'Multi-city'}
                  </span>
                </label>
              ))}
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <select
              value={searchState.cabinClass}
              onChange={(e) => onSearchStateChange({ cabinClass: e.target.value as any })}
              className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-700 outline-hidden font-medium"
            >
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business Class</option>
              <option value="first">First Class</option>
            </select>
          </div>
        )}

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-4 items-center">
          {/* Field 1: Destination / Origin */}
          <div
            ref={destRef}
            className={`relative ${
              activeTab === 'flights' ? 'md:col-span-4' : 'md:col-span-4'
            }`}
          >
            <div
              onClick={() => setShowDestDropdown(!showDestDropdown)}
              className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200 cursor-pointer transition-colors"
            >
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {activeTab === 'flights' ? 'Destination' : 'Where to?'}
                </span>
                <span className="block text-sm font-bold text-slate-800 truncate">
                  {searchState.destination || 'Tokyo, Japan'}
                </span>
              </div>
            </div>

            {/* Destination Dropdown Modal */}
            {showDestDropdown && (
              <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Destination
                  </span>
                  <button
                    onClick={() => setShowDestDropdown(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={destSearchTerm}
                    onChange={(e) => setDestSearchTerm(e.target.value)}
                    placeholder="Search city, airport, landmark..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-hidden focus:border-[#287DFA]"
                    autoFocus
                  />
                </div>

                <div className="text-xs font-semibold text-slate-400 mb-2">Popular Cities</div>
                <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                  {filteredCities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => {
                        onSearchStateChange({ destination: `${city.name}, ${city.country}` });
                        setShowDestDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left rounded-xl hover:bg-blue-50 flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-[#287DFA]">
                          {city.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{city.country} • {city.airport}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-400 group-hover:text-[#287DFA]">
                        {city.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Field 2: Dates Picker */}
          <div
            ref={dateRef}
            className={`relative ${
              activeTab === 'flights' ? 'md:col-span-4' : 'md:col-span-4'
            }`}
          >
            <div
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200 cursor-pointer transition-colors"
            >
              <CalendarIcon className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="min-w-0 flex-1 flex items-center justify-between">
                <div>
                  <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    {activeTab === 'flights' ? 'Dates' : 'Check-in — Check-out'}
                  </span>
                  <span className="block text-sm font-bold text-slate-800 truncate">
                    {searchState.checkInDate} — {searchState.checkOutDate}
                  </span>
                </div>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-100/70 text-[#287DFA] rounded-full shrink-0 ml-1">
                  {searchState.nights} {searchState.nights === 1 ? 'night' : 'nights'}
                </span>
              </div>
            </div>

            {/* Date Selector Dropdown */}
            {showDateDropdown && (
              <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Choose Duration
                  </span>
                  <button
                    onClick={() => setShowDateDropdown(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-medium text-slate-500">Check-in</label>
                      <input
                        type="date"
                        defaultValue="2026-08-20"
                        className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-500">Check-out</label>
                      <input
                        type="date"
                        defaultValue="2026-08-27"
                        className="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs font-medium text-slate-500 mb-1.5">Quick Durations:</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[1, 3, 5, 7, 10, 14].map((n) => (
                        <button
                          key={n}
                          onClick={() => {
                            onSearchStateChange({
                              nights: n,
                              checkInDate: 'Wed, Aug 20',
                              checkOutDate: `${n} days later`,
                            });
                            setShowDateDropdown(false);
                          }}
                          className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                            searchState.nights === n
                              ? 'border-[#287DFA] bg-blue-50 text-[#287DFA]'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {n} {n === 1 ? 'Night' : 'Nights'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Field 3: Rooms & Guests */}
          <div ref={guestRef} className="relative md:col-span-2">
            <div
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200 cursor-pointer transition-colors"
            >
              <User className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Rooms & Guests
                </span>
                <span className="block text-xs font-bold text-slate-800 truncate">
                  {searchState.rooms} room, {searchState.adults} adults
                </span>
              </div>
            </div>

            {/* Room & Guest Stepper Dropdown */}
            {showGuestDropdown && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Rooms & Guests
                  </span>
                  <button
                    onClick={() => setShowGuestDropdown(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Rooms */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Rooms</p>
                      <p className="text-[11px] text-slate-400">Total rooms</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() =>
                          onSearchStateChange({ rooms: Math.max(1, searchState.rooms - 1) })
                        }
                        disabled={searchState.rooms <= 1}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center font-bold text-sm text-slate-800">
                        {searchState.rooms}
                      </span>
                      <button
                        onClick={() => onSearchStateChange({ rooms: searchState.rooms + 1 })}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Adults</p>
                      <p className="text-[11px] text-slate-400">Age 18+</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() =>
                          onSearchStateChange({ adults: Math.max(1, searchState.adults - 1) })
                        }
                        disabled={searchState.adults <= 1}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center font-bold text-sm text-slate-800">
                        {searchState.adults}
                      </span>
                      <button
                        onClick={() => onSearchStateChange({ adults: searchState.adults + 1 })}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Children</p>
                      <p className="text-[11px] text-slate-400">Age 0-17</p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() =>
                          onSearchStateChange({ children: Math.max(0, searchState.children - 1) })
                        }
                        disabled={searchState.children <= 0}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center font-bold text-sm text-slate-800">
                        {searchState.children}
                      </span>
                      <button
                        onClick={() =>
                          onSearchStateChange({ children: searchState.children + 1 })
                        }
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowGuestDropdown(false)}
                    className="w-full py-2 bg-[#287DFA] text-white text-xs font-bold rounded-xl hover:bg-[#1C69E5] transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Button: Search */}
          <div className="md:col-span-2">
            <button
              id="hero-search-submit-btn"
              onClick={onExecuteSearch}
              className="w-full h-[50px] bg-[#287DFA] hover:bg-[#1C69E5] active:scale-[0.98] text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

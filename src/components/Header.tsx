import React, { useState } from 'react';
import {
  Smartphone,
  Globe,
  Headphones,
  Search,
  BookOpen,
  User,
  Check,
  X,
  Menu,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenSupport: () => void;
  onOpenAppQR: () => void;
  onOpenBookings: () => void;
  onSearchGlobal: (query: string) => void;
  isLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
  toggleSidebarMobile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  onOpenSupport,
  onOpenAppQR,
  onOpenBookings,
  onSearchGlobal,
  isLoggedIn,
  userName,
  onLogout,
  toggleSidebarMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'JPY' | 'SGD'>('USD');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchGlobal(searchQuery.trim());
    }
  };

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left Section: Hamburger + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            id="header-sidebar-toggle-btn"
            onClick={toggleSidebarMobile}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 group text-left cursor-pointer"
          >
            <span className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#287DFA]">
              Trip<span className="text-[#0F294D]">.com</span>
            </span>
          </button>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full relative flex items-center"
          >
            <input
              id="header-global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Destination, attraction, hotel, etc"
              className="w-full h-10 pl-4 pr-11 bg-slate-50 border border-slate-300 hover:border-slate-400 focus:border-[#287DFA] focus:bg-white rounded-full text-sm text-slate-800 placeholder-slate-400 outline-hidden transition-all shadow-2xs"
            />
            <button
              id="header-global-search-submit-btn"
              type="submit"
              aria-label="Search"
              className="absolute right-1 w-8 h-8 rounded-full bg-[#287DFA] hover:bg-[#1C69E5] text-white flex items-center justify-center transition-colors shadow-2xs"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Section: Utility Links & Auth */}
        <div className="flex items-center gap-1 sm:gap-3 text-[13px] font-medium text-slate-700">
          {/* App Download */}
          <button
            id="header-app-download-btn"
            onClick={onOpenAppQR}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <Smartphone className="w-4 h-4 text-slate-600" />
            <span>App</span>
          </button>

          {/* List Property */}
          <button
            id="header-list-property-btn"
            onClick={onOpenSupport}
            className="hidden xl:inline-block px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
          >
            List your property
          </button>

          {/* Currency / Language */}
          <div className="relative">
            <button
              id="header-currency-btn"
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <Globe className="w-4 h-4 text-slate-600" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Select Currency
                </div>
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr.code as any);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-slate-50 transition-colors ${
                      currency === curr.code ? 'text-[#287DFA] font-semibold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{curr.code} ({curr.symbol}) - {curr.name}</span>
                    {currency === curr.code && <Check className="w-3.5 h-3.5 text-[#287DFA]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Customer Support */}
          <button
            id="header-customer-support-btn"
            onClick={onOpenSupport}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <Headphones className="w-4 h-4 text-slate-600" />
            <span>Customer support</span>
          </button>

          {/* Find Bookings */}
          <button
            id="header-find-bookings-btn"
            onClick={onOpenBookings}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-slate-600" />
            <span>Find bookings</span>
          </button>

          {/* Sign in / Register Button */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                id="header-user-profile-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0F294D] hover:bg-blue-100 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#287DFA] text-white flex items-center justify-center text-xs font-bold">
                  {userName ? userName[0].toUpperCase() : 'U'}
                </div>
                <span className="font-semibold text-xs truncate max-w-[80px] sm:max-w-[120px]">
                  {userName || 'Member'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{userName}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenBookings();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
                  >
                    My Trips & Bookings
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              id="header-auth-btn"
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-full bg-[#287DFA] hover:bg-[#1C69E5] text-white text-xs sm:text-[13px] font-semibold transition-all shadow-xs hover:shadow-md active:scale-95"
            >
              Sign In / register
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroSearch } from './components/HeroSearch';
import { TrustBanner } from './components/TrustBanner';
import { NewUserExclusive } from './components/NewUserExclusive';
import { FeaturedStays } from './components/FeaturedStays';
import { PopularDestinations } from './components/PopularDestinations';
import { FloatingActions } from './components/FloatingActions';
import { SearchResultsModal } from './components/SearchResultsModal';
import { TripGenieModal } from './components/TripGenieModal';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { AuthModal } from './components/AuthModal';
import { AppDownloadModal } from './components/AppDownloadModal';
import { BookingsModal } from './components/BookingsModal';
import { Footer } from './components/Footer';

import {
  SidebarItem,
  MainTab,
  SearchState,
  CouponItem,
  HotelItem,
} from './types';
import {
  INITIAL_COUPONS,
  FEATURED_HOTELS,
} from './data/mockData';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function App() {
  const [sidebarItem, setSidebarItem] = useState<SidebarItem>('hotels');
  const [activeTab, setActiveTab] = useState<MainTab>('hotels');
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

  // Search State
  const [searchState, setSearchState] = useState<SearchState>({
    category: 'hotels',
    destination: 'Tokyo, Japan',
    origin: 'San Francisco (SFO)',
    checkInDate: 'Wed, Aug 20',
    checkOutDate: 'Thu, Aug 21',
    nights: 1,
    rooms: 1,
    adults: 2,
    children: 0,
    cabinClass: 'economy',
    flightType: 'round_trip',
    trainType: 'one_way',
    carPickupDate: '2026-08-20',
    carDropoffDate: '2026-08-27',
  });

  // Coupons & User State
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [bookings, setBookings] = useState<any[]>([]);

  // Modals state
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);
  const [isGenieOpen, setIsGenieOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAppQROpen, setIsAppQROpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);

  // Toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSidebarSelect = (item: SidebarItem) => {
    setSidebarItem(item);
    if (
      item === 'hotels' ||
      item === 'flights' ||
      item === 'trains' ||
      item === 'cars' ||
      item === 'attractions' ||
      item === 'flight_hotel'
    ) {
      setActiveTab(item);
      setSearchState((prev) => ({ ...prev, category: item }));
    } else if (item === 'planner') {
      setIsGenieOpen(true);
    } else if (item === 'map') {
      showToast('Opening Interactive Global Travel Map...');
    } else if (item === 'inspiration') {
      setIsGenieOpen(true);
    } else {
      showToast(`Selected ${item.replace('_', ' ')} portal.`);
    }
  };

  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    setSidebarItem(tab);
    setSearchState((prev) => ({ ...prev, category: tab }));
  };

  const handleSearchStateChange = (updated: Partial<SearchState>) => {
    setSearchState((prev) => ({ ...prev, ...updated }));
  };

  const handleExecuteSearch = () => {
    setIsSearchResultsOpen(true);
  };

  const handleGlobalSearch = (query: string) => {
    setSearchState((prev) => ({ ...prev, destination: query }));
    setIsSearchResultsOpen(true);
  };

  const handleClaimCoupon = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, claimed: true } : c))
    );
    const target = coupons.find((c) => c.id === couponId);
    showToast(`Claimed ${target?.percentage || ''} voucher! Applied automatically to your next checkout.`);
  };

  const handleClaimAll = () => {
    setCoupons((prev) => prev.map((c) => ({ ...c, claimed: true })));
    showToast('All welcome discount vouchers claimed! Check your wallet in Bookings.');
  };

  const handleLoginSuccess = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    // auto claim coupons on sign in as advertised
    setCoupons((prev) => prev.map((c) => ({ ...c, claimed: true })));
    showToast(`Welcome back, ${name}! VIP welcome coupon bundle unlocked.`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(undefined);
    showToast('Signed out successfully.');
  };

  const handleConfirmBooking = (bookingRecord: any) => {
    setBookings((prev) => [bookingRecord, ...prev]);
    showToast(`Booking ${bookingRecord.id} confirmed for ${bookingRecord.title}!`);
  };

  const handleSelectHotelFromList = (hotel: HotelItem) => {
    setSearchState((prev) => ({
      ...prev,
      category: 'hotels',
      destination: `${hotel.city}, ${hotel.country}`,
    }));
    setActiveTab('hotels');
    setIsSearchResultsOpen(true);
  };

  const handleSelectDestinationFromList = (destName: string) => {
    setSearchState((prev) => ({
      ...prev,
      destination: destName,
    }));
    setIsSearchResultsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#0F294D]">
      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2.5 px-4 py-3 bg-[#0F294D] text-white text-xs font-semibold rounded-2xl shadow-xl border border-blue-400/40">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenAppQR={() => setIsAppQROpen(true)}
        onOpenBookings={() => setIsBookingsOpen(true)}
        onSearchGlobal={handleGlobalSearch}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
        toggleSidebarMobile={() => setIsSidebarMobileOpen(!isSidebarMobileOpen)}
      />

      {/* Main Body with Sidebar + Main Content Layout */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto flex">
        {/* Left Sidebar */}
        <Sidebar
          activeItem={sidebarItem}
          onSelectItem={handleSidebarSelect}
          isOpenMobile={isSidebarMobileOpen}
          onCloseMobile={() => setIsSidebarMobileOpen(false)}
        />

        {/* Center Main Stage */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-full">
          {/* Hero Search Section */}
          <HeroSearch
            activeTab={activeTab}
            onTabChange={handleTabChange}
            searchState={searchState}
            onSearchStateChange={handleSearchStateChange}
            onExecuteSearch={handleExecuteSearch}
          />

          {/* Trustpilot Social Proof Banner */}
          <TrustBanner />

          {/* New User Exclusive Section */}
          <NewUserExclusive
            coupons={coupons}
            onClaimCoupon={handleClaimCoupon}
            onClaimAll={handleClaimAll}
            onOpenAuth={() => setIsAuthOpen(true)}
            isLoggedIn={isLoggedIn}
          />

          {/* Featured Stays & Top Recommended Accommodations */}
          <FeaturedStays
            hotels={FEATURED_HOTELS}
            onSelectHotel={handleSelectHotelFromList}
          />

          {/* Popular Destinations */}
          <PopularDestinations
            onSelectDestination={handleSelectDestinationFromList}
          />
        </main>
      </div>

      {/* Portal Footer */}
      <Footer />

      {/* Floating Action Buttons: Customer Support & TripGenie AI */}
      <FloatingActions
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenGenie={() => setIsGenieOpen(true)}
      />

      {/* Modals */}
      <SearchResultsModal
        isOpen={isSearchResultsOpen}
        onClose={() => setIsSearchResultsOpen(false)}
        searchState={searchState}
        activeCategory={activeTab}
        coupons={coupons}
        onConfirmBooking={handleConfirmBooking}
      />

      <TripGenieModal
        isOpen={isGenieOpen}
        onClose={() => setIsGenieOpen(false)}
      />

      <CustomerSupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AppDownloadModal
        isOpen={isAppQROpen}
        onClose={() => setIsAppQROpen(false)}
      />

      <BookingsModal
        isOpen={isBookingsOpen}
        onClose={() => setIsBookingsOpen(false)}
        bookings={bookings}
        coupons={coupons}
      />
    </div>
  );
}

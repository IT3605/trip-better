import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Plane,
  Train,
  Car,
  Ticket,
  Luggage,
  Clock,
  Filter,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Calendar,
  User,
  CreditCard,
  Sparkles
} from 'lucide-react';
import {
  MainTab,
  SearchState,
  HotelItem,
  FlightItem,
  TrainItem,
  CarItem,
  AttractionItem,
  CouponItem
} from '../types';
import {
  FEATURED_HOTELS,
  MOCK_FLIGHTS,
  MOCK_TRAINS,
  MOCK_CARS,
  MOCK_ATTRACTIONS,
} from '../data/mockData';

interface SearchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchState: SearchState;
  activeCategory: MainTab;
  coupons: CouponItem[];
  onConfirmBooking: (bookingDetails: any) => void;
}

export const SearchResultsModal: React.FC<SearchResultsModalProps> = ({
  isOpen,
  onClose,
  searchState,
  activeCategory,
  coupons,
  onConfirmBooking,
}) => {
  const [selectedItemForBooking, setSelectedItemForBooking] = useState<any | null>(null);
  const [selectedCouponCode, setSelectedCouponCode] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [guestName, setGuestName] = useState('Alex Mercer');
  const [guestEmail, setGuestEmail] = useState('alex.mercer@example.com');
  const [priceSort, setPriceSort] = useState<'recommended' | 'low_high' | 'high_low'>('recommended');

  if (!isOpen) return null;

  const claimedCoupons = coupons.filter((c) => c.claimed);

  const getResultsCount = () => {
    switch (activeCategory) {
      case 'flights':
        return MOCK_FLIGHTS.length;
      case 'trains':
        return MOCK_TRAINS.length;
      case 'cars':
        return MOCK_CARS.length;
      case 'attractions':
        return MOCK_ATTRACTIONS.length;
      case 'hotels':
      case 'flight_hotel':
      default:
        return FEATURED_HOTELS.length;
    }
  };

  const handleStartBooking = (item: any) => {
    setSelectedItemForBooking(item);
    setBookingSuccess(false);
    // auto select first claimed coupon if exists
    if (claimedCoupons.length > 0) {
      setSelectedCouponCode(claimedCoupons[0].code);
    }
  };

  const handleFinalizeBooking = () => {
    let discount = 0;
    if (selectedCouponCode) {
      if (selectedCouponCode.includes('10')) discount = 0.1;
      else if (selectedCouponCode.includes('05')) discount = 0.05;
      else discount = 0.15;
    }

    const basePrice = selectedItemForBooking?.price || selectedItemForBooking?.pricePerDay || 150;
    const finalPrice = Math.round(basePrice * (1 - discount));

    const bookingRecord = {
      id: `TRIP-${Date.now().toString().slice(-6)}`,
      title: selectedItemForBooking.name || selectedItemForBooking.airline || selectedItemForBooking.title || selectedItemForBooking.carModel || selectedItemForBooking.operator,
      category: activeCategory,
      date: searchState.checkInDate || 'Aug 20, 2026',
      destination: searchState.destination,
      guestName,
      guestEmail,
      finalPrice,
      status: 'Confirmed',
    };

    onConfirmBooking(bookingRecord);
    setBookingSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#F8FAFC] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#287DFA] text-white text-xs font-bold uppercase tracking-wider">
                {activeCategory.replace('_', ' + ')}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0F294D]">
                Search Results in {searchState.destination}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Found {getResultsCount()} verified options • {searchState.checkInDate} to {searchState.checkOutDate} • {searchState.rooms} room, {searchState.adults} guests
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Booking Flow Sub-Drawer / Modal Overlay */}
          {selectedItemForBooking ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md max-w-2xl mx-auto">
              {!bookingSuccess ? (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div>
                      <span className="text-xs font-bold text-[#287DFA] uppercase">
                        Instant Checkout Guarantee
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">
                        {selectedItemForBooking.name ||
                          selectedItemForBooking.airline ||
                          selectedItemForBooking.title ||
                          selectedItemForBooking.carModel ||
                          selectedItemForBooking.operator}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedItemForBooking(null)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      ← Change selection
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Lead Traveler Full Name
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-hidden focus:border-[#287DFA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Confirmation Email
                      </label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-hidden focus:border-[#287DFA]"
                      />
                    </div>
                  </div>

                  {/* Apply Coupon Selector */}
                  <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F294D]">
                        <Tag className="w-4 h-4 text-[#287DFA]" />
                        <span>Apply New User Discount Voucher</span>
                      </div>
                      {claimedCoupons.length === 0 && (
                        <span className="text-[11px] text-amber-600 font-semibold">
                          (No coupons claimed yet — claim on home page!)
                        </span>
                      )}
                    </div>

                    {claimedCoupons.length > 0 ? (
                      <div className="space-y-1.5">
                        {claimedCoupons.map((c) => (
                          <label
                            key={c.id}
                            className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                              selectedCouponCode === c.code
                                ? 'bg-white border-[#287DFA] text-[#0F294D] font-bold shadow-2xs'
                                : 'bg-white/60 border-slate-200 text-slate-600'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="couponSelect"
                                checked={selectedCouponCode === c.code}
                                onChange={() => setSelectedCouponCode(c.code)}
                                className="accent-[#287DFA]"
                              />
                              <span>
                                {c.title} • {c.category} ({c.code})
                              </span>
                            </div>
                            <span className="text-emerald-600 font-bold">
                              Save {c.percentage}
                            </span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">
                        You can claim welcome discounts in the "New user exclusive" section on the home page.
                      </p>
                    )}
                  </div>

                  {/* Pricing summary */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Standard Rate:</span>
                      <span>
                        $
                        {selectedItemForBooking.originalPrice ||
                          selectedItemForBooking.price * 1.2 ||
                          200}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Trip.com Special Fare:</span>
                      <span>${selectedItemForBooking.price || selectedItemForBooking.pricePerDay || 150}</span>
                    </div>
                    {selectedCouponCode && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Voucher Discount ({selectedCouponCode}):</span>
                        <span>-10% Applied</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                      <span>Total Amount to Pay:</span>
                      <span className="text-[#287DFA] text-base">
                        $
                        {Math.round(
                          (selectedItemForBooking.price ||
                            selectedItemForBooking.pricePerDay ||
                            150) * (selectedCouponCode ? 0.9 : 1.0)
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    id="confirm-instant-booking-btn"
                    onClick={handleFinalizeBooking}
                    className="w-full py-3 bg-[#287DFA] hover:bg-[#1C69E5] active:scale-[0.99] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Confirm Booking & Receive Instant Voucher</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Booking Confirmed!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Your e-ticket & hotel check-in voucher has been sent to{' '}
                    <span className="font-semibold text-slate-800">{guestEmail}</span>.
                  </p>

                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedItemForBooking(null);
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-[#287DFA] text-white text-xs font-bold rounded-xl hover:bg-[#1C69E5]"
                    >
                      Done & View My Bookings
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results List by Category */
            <div className="space-y-4">
              {/* Hotel / Flight+Hotel Results */}
              {(activeCategory === 'hotels' || activeCategory === 'flight_hotel') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FEATURED_HOTELS.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row"
                    >
                      <div className="sm:w-48 aspect-16/10 sm:aspect-auto relative shrink-0 bg-slate-100">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold">
                          {hotel.starRating}★ Hotel
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">
                              {hotel.city}, {hotel.country}
                            </span>
                            <span className="px-1.5 py-0.5 bg-blue-50 text-[#287DFA] text-xs font-bold rounded-md">
                              {hotel.ratingScore} / 5
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 mt-1">
                            {hotel.name}
                          </h4>

                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {hotel.address} • {hotel.distanceToCenter}
                          </p>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {hotel.perks.slice(0, 2).map((p, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-sm text-[10px] font-medium"
                              >
                                ✓ {p}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 line-through">
                              ${hotel.originalPrice}
                            </span>
                            <div className="text-base font-extrabold text-[#0F294D]">
                              ${hotel.price}
                              <span className="text-[10px] font-normal text-slate-500">
                                {' '}
                                / night
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleStartBooking(hotel)}
                            className="px-4 py-1.5 bg-[#287DFA] hover:bg-[#1C69E5] text-white text-xs font-bold rounded-lg shadow-xs"
                          >
                            Book Room
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Flights Results */}
              {activeCategory === 'flights' && (
                <div className="space-y-3">
                  {MOCK_FLIGHTS.map((flight) => (
                    <div
                      key={flight.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl shrink-0">
                          {flight.airlineLogo}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {flight.airline}
                          </h4>
                          <span className="text-[11px] text-slate-400">
                            Flight {flight.airlineCode}-892 • {flight.cabin}
                          </span>
                        </div>
                      </div>

                      {/* Flight Route details */}
                      <div className="flex items-center gap-6 text-center">
                        <div>
                          <p className="text-base font-extrabold text-slate-900">
                            {flight.departureTime}
                          </p>
                          <p className="text-xs font-bold text-slate-500">
                            {flight.fromCode}
                          </p>
                          <p className="text-[10px] text-slate-400">{flight.fromCity}</p>
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-semibold text-slate-400">
                            {flight.duration}
                          </span>
                          <div className="w-24 h-0.5 bg-slate-300 relative my-1">
                            <Plane className="w-3 h-3 text-[#287DFA] absolute -top-1.5 left-1/2 -translate-x-1/2 rotate-90" />
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600">
                            {flight.stops}
                          </span>
                        </div>

                        <div>
                          <p className="text-base font-extrabold text-slate-900">
                            {flight.arrivalTime}
                          </p>
                          <p className="text-xs font-bold text-slate-500">
                            {flight.toCode}
                          </p>
                          <p className="text-[10px] text-slate-400">{flight.toCity}</p>
                        </div>
                      </div>

                      {/* Price & Book */}
                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 pt-2 md:pt-0">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 line-through">
                            ${flight.originalPrice}
                          </span>
                          <div className="text-lg font-black text-[#0F294D]">
                            ${flight.price}
                          </div>
                        </div>
                        <button
                          onClick={() => handleStartBooking(flight)}
                          className="px-4 py-2 bg-[#287DFA] hover:bg-[#1C69E5] text-white text-xs font-bold rounded-lg shadow-xs"
                        >
                          Select Flight
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Trains Results */}
              {activeCategory === 'trains' && (
                <div className="space-y-3">
                  {MOCK_TRAINS.map((train) => (
                    <div
                      key={train.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                          <Train className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {train.operator}
                          </h4>
                          <span className="text-[11px] text-slate-400">
                            {train.trainNumber} • {train.seatClass}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-center">
                        <div>
                          <p className="text-base font-extrabold text-slate-900">
                            {train.departureTime}
                          </p>
                          <p className="text-[11px] text-slate-500 font-medium truncate max-w-[100px]">
                            {train.fromStation}
                          </p>
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-semibold text-slate-400">
                            {train.duration}
                          </span>
                          <div className="w-20 h-0.5 bg-orange-200 relative my-1" />
                          <span className="text-[10px] font-bold text-emerald-600">
                            Direct Rail
                          </span>
                        </div>

                        <div>
                          <p className="text-base font-extrabold text-slate-900">
                            {train.arrivalTime}
                          </p>
                          <p className="text-[11px] text-slate-500 font-medium truncate max-w-[100px]">
                            {train.toStation}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 pt-2 md:pt-0">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 line-through">
                            ${train.originalPrice}
                          </span>
                          <div className="text-lg font-black text-[#0F294D]">
                            ${train.price}
                          </div>
                        </div>
                        <button
                          onClick={() => handleStartBooking(train)}
                          className="px-4 py-2 bg-[#287DFA] hover:bg-[#1C69E5] text-white text-xs font-bold rounded-lg shadow-xs"
                        >
                          Book Train
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cars Results */}
              {activeCategory === 'cars' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MOCK_CARS.map((car) => (
                    <div
                      key={car.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div className="aspect-16/10 bg-slate-100 relative">
                        <img
                          src={car.image}
                          alt={car.carModel}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 text-xs font-bold text-slate-800 backdrop-blur-xs">
                          {car.company}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {car.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                            {car.carModel}
                          </h4>

                          <p className="text-xs text-slate-500 mt-1">
                            {car.seats} Seats • {car.transmission}
                          </p>

                          <div className="space-y-1 mt-3">
                            {car.features.map((feat, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium"
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="text-base font-black text-[#0F294D]">
                              ${car.pricePerDay}
                              <span className="text-[10px] font-normal text-slate-500">
                                {' '}
                                / day
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleStartBooking(car)}
                            className="px-4 py-1.5 bg-[#287DFA] hover:bg-[#1C69E5] text-white text-xs font-bold rounded-lg shadow-xs"
                          >
                            Reserve Car
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Attractions Results */}
              {activeCategory === 'attractions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_ATTRACTIONS.map((attraction) => (
                    <div
                      key={attraction.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row"
                    >
                      <div className="sm:w-44 aspect-16/10 sm:aspect-auto relative shrink-0 bg-slate-100">
                        <img
                          src={attraction.image}
                          alt={attraction.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold">
                          {attraction.tag}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] text-[#287DFA] font-bold uppercase">
                            {attraction.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">
                            {attraction.title}
                          </h4>

                          <div className="flex items-center gap-1.5 mt-2">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-slate-800">
                              {attraction.ratingScore}
                            </span>
                            <span className="text-xs text-slate-400">
                              ({attraction.reviewCount.toLocaleString()} booked)
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 line-through">
                              ${attraction.originalPrice}
                            </span>
                            <div className="text-base font-extrabold text-[#0F294D]">
                              ${attraction.price}
                            </div>
                          </div>

                          <button
                            onClick={() => handleStartBooking(attraction)}
                            className="px-4 py-1.5 bg-[#287DFA] hover:bg-[#1C69E5] text-white text-xs font-bold rounded-lg shadow-xs"
                          >
                            Get Tickets
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

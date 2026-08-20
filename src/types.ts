export type MainTab = 'hotels' | 'flights' | 'trains' | 'cars' | 'attractions' | 'flight_hotel';

export type SidebarItem =
  | 'hotels'
  | 'flights'
  | 'trains'
  | 'cars'
  | 'attractions'
  | 'flight_hotel'
  | 'cruises'
  | 'insurance'
  | 'private_tours'
  | 'group_tours'
  | 'gift_cards'
  | 'planner'
  | 'inspiration'
  | 'map';

export interface SearchState {
  category: MainTab;
  destination: string;
  origin: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  rooms: number;
  adults: number;
  children: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
  flightType: 'round_trip' | 'one_way' | 'multi_city';
  trainType: 'one_way' | 'round_trip';
  carPickupDate: string;
  carDropoffDate: string;
}

export interface HotelItem {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  ratingScore: number;
  ratingWord: string;
  reviewCount: number;
  starRating: number;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  badges: string[];
  perks: string[];
  distanceToCenter: string;
}

export interface FlightItem {
  id: string;
  airline: string;
  airlineCode: string;
  airlineLogo: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: number;
  originalPrice: number;
  cabin: string;
  dates: string;
}

export interface TrainItem {
  id: string;
  operator: string;
  trainNumber: string;
  fromStation: string;
  toStation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  originalPrice: number;
  seatClass: string;
}

export interface CarItem {
  id: string;
  carModel: string;
  category: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  company: string;
  pricePerDay: number;
  image: string;
  rating: number;
  features: string[];
}

export interface AttractionItem {
  id: string;
  title: string;
  city: string;
  country: string;
  image: string;
  ratingScore: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  tag: string;
  category: string;
}

export interface CouponItem {
  id: string;
  title: string;
  percentage: string;
  subtitle: string;
  category: string;
  claimed: boolean;
  code: string;
  expires: string;
  terms: string;
  iconType: 'bed' | 'train' | 'ticket' | 'gift';
}

export interface DestinationItem {
  id: string;
  name: string;
  country: string;
  image: string;
  hotelStartingPrice: number;
  flightStartingPrice: number;
  badge?: string;
  tag: 'popular' | 'beach' | 'culture' | 'nature' | 'weekend';
}

export interface GenieMessage {
  id: string;
  sender: 'user' | 'genie';
  text: string;
  timestamp: string;
  suggestions?: string[];
  cards?: Array<{
    title: string;
    subtitle: string;
    price?: string;
    tag?: string;
    image?: string;
    category?: string;
  }>;
}

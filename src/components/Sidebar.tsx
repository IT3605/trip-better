import React from 'react';
import {
  BedDouble,
  Plane,
  Train,
  Car,
  Ticket,
  Luggage,
  Ship,
  ShieldCheck,
  UserCheck,
  Users,
  Gift,
  Compass,
  Lightbulb,
  MapPin,
  Menu,
  Sparkles
} from 'lucide-react';
import { SidebarItem, MainTab } from '../types';

interface SidebarProps {
  activeItem: SidebarItem;
  onSelectItem: (item: SidebarItem) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  onSelectItem,
  isOpenMobile,
  onCloseMobile,
}) => {
  const mainCategories: { id: SidebarItem; label: string; icon: React.ReactNode }[] = [
    { id: 'hotels', label: 'Hotels & Homes', icon: <BedDouble className="w-4 h-4" /> },
    { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
    { id: 'trains', label: 'Trains', icon: <Train className="w-4 h-4" /> },
    { id: 'cars', label: 'Cars', icon: <Car className="w-4 h-4" /> },
    { id: 'attractions', label: 'Attractions & Tours', icon: <Ticket className="w-4 h-4" /> },
    { id: 'flight_hotel', label: 'Flight + Hotel', icon: <Luggage className="w-4 h-4" /> },
  ];

  const secondaryCategories: {
    id: SidebarItem;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    { id: 'cruises', label: 'Cruises', icon: <Ship className="w-4 h-4" /> },
    { id: 'insurance', label: 'Travel Insurance', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'private_tours', label: 'Private Tours', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'group_tours', label: 'Group Tours', icon: <Users className="w-4 h-4" /> },
    { id: 'gift_cards', label: 'Gift Cards', icon: <Gift className="w-4 h-4" /> },
    {
      id: 'planner',
      label: 'Trip.Planner',
      icon: <Compass className="w-4 h-4" />,
      badge: 'New',
    },
    { id: 'inspiration', label: 'Travel Inspiration', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'map', label: 'Map', icon: <MapPin className="w-4 h-4" /> },
  ];

  const handleItemClick = (id: SidebarItem) => {
    onSelectItem(id);
    if (isOpenMobile) {
      onCloseMobile();
    }
  };

  const renderNavList = () => (
    <div className="flex flex-col h-full py-3 px-3">
      {/* Top Sidebar Brand header */}
      <div className="flex items-center gap-2.5 px-3 py-2.5 mb-2">
        <Menu className="w-5 h-5 text-slate-700 cursor-pointer hover:text-slate-900" />
        <span className="text-xl font-bold tracking-tight text-[#287DFA]">
          Trip<span className="text-[#0F294D]">.com</span>
        </span>
      </div>

      {/* Main Categories */}
      <div className="space-y-1">
        {mainCategories.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-item-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left ${
                isActive
                  ? 'bg-[#EBF3FF] text-[#0F294D] shadow-2xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className={`${isActive ? 'text-[#287DFA]' : 'text-slate-500'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-slate-200" />

      {/* Secondary categories */}
      <div className="space-y-1">
        {secondaryCategories.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-item-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 text-left ${
                isActive
                  ? 'bg-[#EBF3FF] text-[#0F294D] font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${isActive ? 'text-[#287DFA]' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-[#FF3B30] rounded-sm uppercase tracking-wider scale-90">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-64px)] sticky top-16 select-none">
        {renderNavList()}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl z-10 overflow-y-auto">
            {renderNavList()}
          </div>
        </div>
      )}
    </>
  );
};

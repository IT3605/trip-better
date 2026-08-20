import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Compass,
  MapPin,
  BedDouble,
  Plane,
  Ticket,
  ChevronRight,
  Bot
} from 'lucide-react';
import { GenieMessage } from '../types';

interface TripGenieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBookingItem?: (item: any) => void;
}

export const TripGenieModal: React.FC<TripGenieModalProps> = ({
  isOpen,
  onClose,
  onSelectBookingItem,
}) => {
  const [messages, setMessages] = useState<GenieMessage[]>([
    {
      id: 'g1',
      sender: 'genie',
      text: 'Hi there! I am TripGenie, your personal AI travel assistant powered by Trip.com. Where are you planning to travel next? I can build customized day-by-day itineraries, recommend boutique hotels, find cheap flights, or suggest hidden gems!',
      timestamp: 'Just now',
      suggestions: [
        'Plan a 3-day Tokyo food & culture itinerary',
        'Top 5 romantic hotels in Paris near Eiffel Tower',
        'How to travel between Tokyo and Kyoto by Shinkansen?',
        'Budget family trip to Singapore under $1500',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: GenieMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response with rich recommendations
    setTimeout(() => {
      let replyText = '';
      let replyCards: any[] = [];

      const lower = query.toLowerCase();
      if (lower.includes('tokyo') || lower.includes('japan')) {
        replyText =
          'Tokyo is unforgettable! Here is a curated itinerary and top stay for your trip:';
        replyCards = [
          {
            title: 'The Prince Park Tower Tokyo',
            subtitle: 'Direct view of Tokyo Tower • Luxury 5★',
            price: '$189/night',
            tag: 'Top Pick',
            image:
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
            category: 'hotel',
          },
          {
            title: 'teamLab Planets Digital Museum',
            subtitle: 'Sensory water art installation in Toyosu',
            price: '$28/person',
            tag: 'Must Visit',
            image:
              'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
            category: 'attraction',
          },
          {
            title: 'Shinkansen Nozomi Bullet Train',
            subtitle: 'Tokyo → Kyoto in 2h 15m @ 300 km/h',
            price: 'From $98',
            tag: 'Fast Rail',
            image:
              'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
            category: 'train',
          },
        ];
      } else if (lower.includes('paris') || lower.includes('france')) {
        replyText =
          'Paris is the city of lights! Here are my recommended stays and tickets for an extraordinary Parisian getaway:';
        replyCards = [
          {
            title: 'Pullman Paris Tour Eiffel',
            subtitle: 'Steps from Eiffel Tower with private balcony',
            price: '$260/night',
            tag: 'Best Seller',
            image:
              'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
            category: 'hotel',
          },
          {
            title: 'Louvre Museum Priority Ticket',
            subtitle: 'Skip the lines for Mona Lisa & Venus de Milo',
            price: '$24/person',
            tag: 'Skip-The-Line',
            image:
              'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&auto=format&fit=crop&q=80',
            category: 'attraction',
          },
        ];
      } else {
        replyText = `Great question about "${query}"! I have checked real-time availability on Trip.com and matched the lowest guaranteed prices for you with flexible cancellation.`;
        replyCards = [
          {
            title: 'Marina Bay Sands Singapore',
            subtitle: 'World famous rooftop infinity pool',
            price: '$490/night',
            tag: 'Iconic 5★',
            image:
              'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&auto=format&fit=crop&q=80',
            category: 'hotel',
          },
        ];
      }

      const genieMsg: GenieMessage = {
        id: `g-${Date.now()}`,
        sender: 'genie',
        text: replyText,
        timestamp: 'Just now',
        cards: replyCards,
        suggestions: [
          'What is the best month to visit?',
          'Find flights with Singapore Airlines',
          'Show me vegetarian restaurants nearby',
        ],
      };

      setMessages((prev) => [...prev, genieMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[640px] max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0050D8] via-[#287DFA] to-[#0047BA] p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">TripGenie AI</h3>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-900 rounded-sm uppercase tracking-wider">
                  AI Copilot
                </span>
              </div>
              <p className="text-[11px] text-blue-100">
                Live itinerary planner & instant travel guide
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#287DFA] text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-xs'
                }`}
              >
                <p>{msg.text}</p>

                {/* Recommendations Cards */}
                {msg.cards && msg.cards.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {msg.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 hover:bg-blue-50/50 transition-colors"
                      >
                        {card.image && (
                          <img
                            src={card.image}
                            alt={card.title}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-lg object-cover shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {card.title}
                            </span>
                            {card.tag && (
                              <span className="px-1.5 py-0.5 rounded-sm bg-blue-100 text-[#287DFA] text-[10px] font-bold">
                                {card.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {card.subtitle}
                          </p>
                          <span className="text-xs font-extrabold text-[#287DFA]">
                            {card.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestion Chips */}
                {msg.suggestions && (
                  <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0066F5] hover:bg-blue-100 text-[11px] font-semibold transition-colors text-left"
                      >
                        💡 {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-2 rounded-2xl w-fit border border-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-[#287DFA] animate-spin" />
              <span>TripGenie is crafting your travel recommendations...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask TripGenie (e.g. Plan a 3-day trip to Kyoto, find hotels in Rome)..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#287DFA] rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-hidden"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-full bg-[#287DFA] hover:bg-[#1C69E5] disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

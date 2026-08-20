import React, { useState } from 'react';
import { X, Sparkles, Check, Mail, Lock, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('alex.mercer@example.com');
  const [password, setPassword] = useState('••••••••');
  const [isRegister, setIsRegister] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split('@')[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    onLoginSuccess(formattedName);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess('Alex Mercer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Banner */}
        <div className="bg-[#287DFA] text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="text-2xl font-black tracking-tight">
            Trip<span className="text-blue-200">.com</span>
          </span>
          <h3 className="text-lg font-bold mt-1">
            {isRegister ? 'Create your Trip.com Account' : 'Welcome to Trip.com'}
          </h3>
          <p className="text-xs text-blue-100 mt-0.5">
            Unlock new user coupons, member prices & loyalty Trip Coins
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-hidden focus:border-[#287DFA]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-hidden focus:border-[#287DFA]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#287DFA] hover:bg-[#1C69E5] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              {isRegister ? 'Sign Up & Claim Welcome Pack' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-slate-400">or instant demo</span>
            </div>
          </div>

          <button
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-200"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>1-Click Demo Sign-in (Alex Mercer, VIP Member)</span>
          </button>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-semibold text-[#287DFA] hover:underline"
            >
              {isRegister
                ? 'Already have an account? Sign in'
                : "Don't have an account? Create one now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

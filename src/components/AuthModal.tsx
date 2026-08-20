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
              <span className="bg-white px-2 text-slate-400">or sign in with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              type="button"
              onClick={() => {
                onLoginSuccess('Ian Townrow');
                onClose();
              }}
              className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onLoginSuccess('Ian Townrow');
                onClose();
              }}
              className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 7.17c.65-.79 1.1-1.89.98-2.99-1 .04-2.14.67-2.81 1.46-.58.68-1.09 1.78-.96 2.85 1.12.09 2.15-.55 2.79-1.32z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0F294D] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-blue-200"
          >
            <Sparkles className="w-4 h-4 text-[#287DFA]" />
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

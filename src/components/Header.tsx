import React from 'react';
import { Terminal, Sparkles, BookOpen, Cpu, Orbit, Award, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'calculator', label: 'Hesaplayıcı & Adımlar', icon: Cpu },
    { id: 'simulator', label: 'Java Konsol & Hata Ayıklayıcı', icon: Terminal },
    { id: 'code', label: 'Java Kaynak Kodları', icon: BookOpen },
    { id: 'spiral', label: 'Altın Oran & Spiral', icon: Orbit },
    { id: 'theory', label: 'Fibonacci Rehberi', icon: Sparkles },
    { id: 'quiz', label: 'Mini Bilgi Testi', icon: HelpCircle },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
          
          {/* Logo & Main Title */}
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/40">
                <span className="font-mono text-xl font-black text-slate-950">☕</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" title="Java Çevrimiçi"></div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>Java Fibonacci Serisi</span>
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Döngüler ile
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Kullanıcıdan alınan eleman sayısına göre döngüsel hesaplama ve Altın Oran simülatörü
              </p>
            </div>
          </div>

          {/* Author Badge: Enes Öztürk Signature */}
          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner ring-1 ring-white/20">
              EÖ
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Geliştirici & Yazar</span>
                <Award className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                Enes Öztürk
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2.5 pt-1 border-t border-slate-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

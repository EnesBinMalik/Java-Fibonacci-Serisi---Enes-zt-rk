import React from 'react';
import { Award, Code, Heart, Coffee, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & signature */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">
              EÖ
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-base font-bold text-white tracking-wide">
                  Enes Öztürk
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-semibold border border-amber-500/30 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Yazılım & Algoritma
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Java Döngüler ile Fibonacci Serisi ve Altın Oran Hesaplama Sistemi
              </p>
            </div>
          </div>

          {/* Quick specs */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              Java SE 21+ Ready
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              for / while / do-while
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              BigInteger Destekli
            </span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            Bu çalışma <strong>Enes Öztürk</strong> imzası ve tasarımı ile hazırlanmıştır. Eğitim ve geliştirme amaçlıdır.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Özenle kodlandı</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};

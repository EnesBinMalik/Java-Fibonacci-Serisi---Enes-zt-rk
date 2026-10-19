import React from 'react';
import { BookOpen, Sparkles, Lightbulb, CheckCircle2, AlertTriangle, Cpu, Flower2, Orbit } from 'lucide-react';

export const FibonacciTheory: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Theory Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Matematik ve Bilgisayar Bilimleri Rehberi</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Fibonacci Serisi ve Altın Oran Nedir?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed max-w-3xl">
          Fibonacci serisi, her sayının kendinden önceki ile toplanması sonucu oluşan bir sayı dizisidir. 
          Bu dizide sayılar birbirleriyle oranlandığında evrensel <strong>Altın Oran (1.618...)</strong> ortaya çıkar.
        </p>
        <div className="mt-4 pt-4 border-t border-amber-500/20 text-xs text-amber-300 font-mono">
          Yazar & Geliştirici: Enes Öztürk
        </div>
      </div>

      {/* Grid: Nedir & Tarihçe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Serinin Doğuşu */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Fibonacci Serisinin Doğuşu</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed space-y-2">
            İtalyan matematikçi <strong>Leonardo Fibonacci</strong>, 1202 yılında yazdığı <em>Liber Abaci</em> kitabında bir tavşan popülasyonunun üreme hızını modellerken bu sayı dizisini keşfetmiştir.
          </p>
          <div className="mt-4 p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
            <strong>Dizinin Formülü:</strong>
            <div className="text-amber-400 font-bold mt-1 text-sm">
              F(0) = 0, F(1) = 1
              <br />
              F(n) = F(n - 1) + F(n - 2)
            </div>
          </div>
        </div>

        {/* Card 2: Altın Oran */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Orbit className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Altın Oran (Phi - φ) İlişkisi</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Dizide ilerledikçe, herhangi bir sayının kendisinden önceki sayıya bölünmesi (<code className="text-purple-300 font-mono">F(n) / F(n-1)</code>) sabit bir değere yaklaşır: <strong>1.6180339887...</strong>
          </p>
          <div className="mt-4 p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
            <strong>Limit Değeri:</strong>
            <div className="text-purple-400 font-bold mt-1 text-sm">
              lim (n → ∞) [ F(n) / F(n-1) ] = φ = (1 + √5) / 2 ≈ 1.618
            </div>
          </div>
        </div>
      </div>

      {/* Doğadaki Fibonacci */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Flower2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Doğada ve Sanatta Fibonacci</h3>
            <p className="text-xs text-slate-400">Doğa, maksimum verim ve alan kaplama için Fibonacci dizilimini kullanır.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-sm font-bold text-emerald-400">🌻 Ayçiçekleri</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Ayçiçeğinin merkezindeki tohum spiralleri saat yönünde ve tersinde genellikle 34 ve 55 veya 55 ve 89 Fibonacci sayılarıdır.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-sm font-bold text-amber-400">🌲 Çam Kozalakları</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Kozalağın pul sıraları her zaman ardışık iki Fibonacci sayısı (genellikle 8 ve 13) şeklinde sarmal oluşturur.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-sm font-bold text-cyan-400">🐚 Deniz Kabukları</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Nautilus kabukları, Fibonacci karelerinin köşegenlerinden geçen logaritmik Altın Spiral şeklinde büyür.
            </p>
          </div>
        </div>
      </div>

      {/* Java Döngüleri Neden Tercih Edilir? (Zaman Karmaşıklığı) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Java'da Neden Döngü (İteratif) Kullanmalıyız?</h3>
            <p className="text-xs text-slate-400">Döngüsel hesaplama ile özyinelemeli (rekürsif) hesaplama arasındaki dev fark.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Döngüler ile Çözüm (Tavsiye Edilen)</span>
            </div>
            <ul className="mt-3 text-xs text-slate-300 space-y-2">
              <li>• <strong>Zaman Karmaşıklığı:</strong> O(N) — N=40 için sadece 40 işlem!</li>
              <li>• <strong>Bellek (Space):</strong> O(1) — Yalnızca 2-3 değişken yeterlidir.</li>
              <li>• <strong>Kararlılık:</strong> Asla çağrı yığını (StackOverflow) hatası vermez.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Klasik Rekürsif Çözüm (Kaçınılmalı)</span>
            </div>
            <ul className="mt-3 text-xs text-slate-300 space-y-2">
              <li>• <strong>Zaman Karmaşıklığı:</strong> O(2ⁿ) — N=40 için 1 trilyondan fazla çağrı!</li>
              <li>• <strong>Bellek:</strong> O(N) çağrı yığını (Call Stack) tüketir.</li>
              <li>• Büyük N değerlerinde bilgisayar donar veya çöker.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Enes Öztürk'ün Tavsiyeleri */}
      <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
            EÖ
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Enes Öztürk'ün Java İpuçları</h3>
            <span className="text-xs text-amber-400 font-mono">Geliştirici Notu</span>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-300 space-y-2.5 leading-relaxed mt-3">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Veri Tipi Seçimi:</strong> Java'da <code className="text-amber-300 font-mono">int</code> veri tipi en fazla 46. Fibonacci sayısını saklayabilir (2 milyar sınırı). 47 ve sonrası için mutlaka <code className="text-amber-300 font-mono">long</code> kullanılmalıdır.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>93. Sayı ve Ötesi:</strong> <code className="text-amber-300 font-mono">long</code> veri tipi 92. terimde maksimum sınırı olan ~9.22 × 10¹⁸ değerine ulaşır. 93 ve üzeri için <code className="text-amber-300 font-mono">java.math.BigInteger</code> sınıfını tercih ediniz.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Kaynak Yönetimi:</strong> <code className="text-amber-300 font-mono">Scanner</code> nesnesi sistem kaynaklarını (System.in) bağladığından işiniz bittiğinde <code className="text-amber-300 font-mono">scanner.close()</code> ile kapatmak temiz kod kuralıdır.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

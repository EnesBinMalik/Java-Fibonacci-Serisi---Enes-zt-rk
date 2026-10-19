import React, { useState } from 'react';
import { FibonacciResult } from '../types/fibonacci';
import { formatBigInt, GOLDEN_RATIO } from '../utils/fibonacciCalculator';
import { StepByStepAdditions } from './StepByStepAdditions';
import { 
  Hash, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Sigma, 
  Layers, 
  Sliders,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FibonacciCalculatorProps {
  n: number;
  setN: (val: number) => void;
  result: FibonacciResult;
  onOpenSimulator: () => void;
}

export const FibonacciCalculator: React.FC<FibonacciCalculatorProps> = ({
  n,
  setN,
  result,
  onOpenSimulator,
}) => {
  const [inputValue, setInputValue] = useState<string>(n.toString());
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const presets = [
    { label: '9 Eleman (Örnek)', val: 9, isFeatured: true },
    { label: '10 Eleman', val: 10 },
    { label: '15 Eleman', val: 15 },
    { label: '20 Eleman', val: 20 },
    { label: '30 Eleman', val: 30 },
  ];

  const handleApplyN = (targetVal: number) => {
    const clamped = Math.max(1, Math.min(80, targetVal));
    setN(clamped);
    setInputValue(clamped.toString());
    setSelectedIdx(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 80) {
      setN(parsed);
      setSelectedIdx(null);
    }
  };

  const handleCopySequence = () => {
    const text = result.sequence.map((x) => x.toString()).join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate sum of all elements
  const totalSum = result.sequence.reduce((acc, curr) => acc + curr, 0n);

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Sliders className="w-4 h-4" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Fibonacci Serisi Eleman Sayısı Girişi
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Kullanıcıdan serinin kaç elemanlı olacağı bilgisini alın ve anlık hesaplayın (Örnek: 9 Eleman).
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Hızlı Seçim:</span>
            {presets.map((preset) => (
              <button
                key={preset.val}
                onClick={() => handleApplyN(preset.val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  n === preset.val
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                    : preset.isFeatured
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Controls */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-3 pt-5 border-t border-slate-800">
          <div className="sm:col-span-8 flex items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Hash className="w-5 h-5 text-amber-400" />
              </div>
              <input
                type="number"
                min="1"
                max="80"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Eleman sayısını giriniz (1-80)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>

            <button
              onClick={() => handleApplyN(9)}
              title="Varsayılan 9 elemana sıfırla"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          <div className="sm:col-span-4 flex items-center gap-2">
            <button
              onClick={handleCopySequence}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Seriyi Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenSimulator}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold transition cursor-pointer shadow-md shadow-amber-500/20 shrink-0"
              title="Java Konsolunda Döngüyü Canlı Çalıştır"
            >
              <span>Java'da Çalıştır</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Eleman Sayısı (N)</div>
            <div className="text-lg font-bold text-white font-mono">{result.sequence.length} Sayı</div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Sigma className="w-5 h-5" />
          </div>
          <div className="truncate">
            <div className="text-xs text-slate-400">Dizi Elemanları Toplamı</div>
            <div className="text-lg font-bold text-emerald-400 font-mono truncate" title={totalSum.toString()}>
              {formatBigInt(totalSum)}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="truncate">
            <div className="text-xs text-slate-400">Son Eleman F({result.sequence.length - 1})</div>
            <div className="text-lg font-bold text-indigo-300 font-mono truncate" title={result.sequence[result.sequence.length - 1]?.toString() || '0'}>
              {formatBigInt(result.sequence[result.sequence.length - 1] ?? 0n)}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <span className="font-serif font-black text-lg">φ</span>
          </div>
          <div>
            <div className="text-xs text-slate-400">Son İki Terim Oranı</div>
            <div className="text-lg font-bold text-purple-300 font-mono">
              {result.steps.length > 0 && result.steps[result.steps.length - 1]?.ratio !== null
                ? result.steps[result.steps.length - 1].ratio?.toFixed(5)
                : '1.00000'}
            </div>
          </div>
        </div>
      </div>

      {/* Sequence Numbers Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white">
              {n} Elemanlı Fibonacci Serisi Çıktısı
            </h3>
            {n === 9 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                Soru Örneği: 0 1 1 2 3 5 8 13 21 34
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400">
            Detaylı görmek için herhangi bir sayıya tıklayın
          </span>
        </div>

        {/* Numbers Pills */}
        <div className="flex flex-wrap gap-2.5 max-h-[300px] overflow-y-auto p-1">
          {result.sequence.map((val, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-sm sm:text-base transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-slate-950/80 hover:bg-slate-800/90 text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  F({idx})
                </span>
                <span className="font-semibold">{formatBigInt(val)}</span>
              </button>
            );
          })}
        </div>

        {/* Selected number modal / drawer breakdown */}
        {selectedIdx !== null && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Seçilen Eleman Detayı
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
                F({selectedIdx}) = {formatBigInt(result.sequence[selectedIdx])}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {selectedIdx === 0 && 'İlk başlangıç sayısı (0).'}
                {selectedIdx === 1 && 'İkinci başlangıç sayısı (1).'}
                {selectedIdx >= 2 && (
                  <span>
                    F({selectedIdx - 2}) + F({selectedIdx - 1}) = {formatBigInt(result.sequence[selectedIdx - 2])} + {formatBigInt(result.sequence[selectedIdx - 1])} = {formatBigInt(result.sequence[selectedIdx])}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedIdx(null)}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer self-start sm:self-center"
            >
              Kapat
            </button>
          </div>
        )}
      </div>

      {/* Step by step additions breakdown */}
      <StepByStepAdditions steps={result.steps} elementCount={n} />
    </div>
  );
};

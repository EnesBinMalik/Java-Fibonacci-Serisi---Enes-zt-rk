import React from 'react';
import { FibonacciStep } from '../types/fibonacci';
import { formatBigInt, GOLDEN_RATIO } from '../utils/fibonacciCalculator';
import { ArrowRight, Calculator, CheckCircle2, TrendingUp } from 'lucide-react';

interface StepByStepAdditionsProps {
  steps: FibonacciStep[];
  elementCount: number;
}

export const StepByStepAdditions: React.FC<StepByStepAdditionsProps> = ({
  steps,
  elementCount,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Adım Adım Toplama İşlemleri
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                {steps.length} Adım
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Her sayı kendinden önceki iki sayının toplanmasıyla elde edilir: <code className="text-amber-300 font-mono">F(n) = F(n-1) + F(n-2)</code>
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>Hedef Altın Oran (φ): <strong className="text-emerald-400 font-mono">1.618033...</strong></span>
        </div>
      </div>

      {steps.length === 0 ? (
        <div className="py-10 text-center text-slate-400 text-sm">
          Adım adım toplama işlemlerini görebilmek için en az 3 eleman seçiniz.
        </div>
      ) : (
        <div className="mt-5 space-y-2.5 max-h-[460px] overflow-y-auto pr-2">
          {steps.map((step) => {
            const isPromptHighlight = step.stepIndex <= 8 && elementCount >= 9;
            return (
              <div
                key={step.stepIndex}
                className={`p-3.5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isPromptHighlight
                    ? 'bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900/90 border-amber-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Step badge & equation */}
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-slate-700">
                    #{step.stepIndex}
                  </span>

                  <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
                    <span className="text-slate-300 font-semibold bg-slate-800/80 px-2 py-0.5 rounded">
                      {formatBigInt(step.prev1)}
                    </span>
                    <span className="text-amber-400 font-bold text-lg">+</span>
                    <span className="text-slate-300 font-semibold bg-slate-800/80 px-2 py-0.5 rounded">
                      {formatBigInt(step.prev2)}
                    </span>
                    <span className="text-amber-400 font-bold text-lg">=</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded shadow-sm">
                      {formatBigInt(step.result)}
                    </span>
                  </div>
                </div>

                {/* Golden ratio info */}
                <div className="flex items-center gap-4 text-xs font-mono shrink-0 pl-11 md:pl-0">
                  {step.ratio !== null ? (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Oran (Fₙ / Fₙ₋₁):</span>
                      <span className="text-amber-300 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {step.ratio.toFixed(6)}
                      </span>
                    </div>
                  ) : null}

                  {step.ratioDiff !== null && step.ratioDiff < 0.001 && (
                    <span className="text-emerald-400 flex items-center gap-1 text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Altın Orana Ulaştı
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer hint */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <span className="italic">
          * Örnek senaryo: 0 + 1 = 1 ile başlayıp her döngüde bir önceki iki sayıyı toplayarak ilerler.
        </span>
        <span className="text-slate-500 font-mono">
          Geliştirici: Enes Öztürk
        </span>
      </div>
    </div>
  );
};

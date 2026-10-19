import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "9 elemanlı Fibonacci dizisinin son sayısı (F(9)) kaçtır?",
    options: ["13", "21", "34", "55"],
    correctIdx: 2,
    explanation: "0, 1, 1, 2, 3, 5, 8, 13, 21, 34 dizisinde 9. indeksli eleman 34'tür (21 + 13 = 34).",
  },
  {
    id: 2,
    question: "Fibonacci ardışık terimlerinin birbirine oranı (Fₙ / Fₙ₋₁) hangi değere yaklaşır?",
    options: ["Pi Sayısı (3.1415...)", "Euler Sayısı (2.7182...)", "Altın Oran (1.6180...)", "Kök 2 (1.4142...)"],
    correctIdx: 2,
    explanation: "Fibonacci terimlerinin oranı ilerledikçe φ (Phi) olarak adlandırılan Altın Oran'a (yaklaşık 1.6180339...) yakınsar.",
  },
  {
    id: 3,
    question: "Java'da Fibonacci serisini döngü (for / while) ile çözmenin zaman karmaşıklığı nedir?",
    options: ["O(1)", "O(N)", "O(N²)", "O(2ᴺ)"],
    correctIdx: 1,
    explanation: "Döngü her adımdan birer kez geçtiği için doğrusal zaman O(N) karmaşıklığında ve sabit O(1) bellekte çalışır.",
  },
  {
    id: 4,
    question: "Java'da 100 elemanlı bir Fibonacci serisi hesaplarken long taşmasını önlemek için hangi sınıf kullanılır?",
    options: ["java.lang.Integer", "java.math.BigDecimal", "java.math.BigInteger", "java.util.Scanner"],
    correctIdx: 2,
    explanation: "Java'da tam sayıların taşma sınırı olmaksızın hesaplanması için java.math.BigInteger sınıfı kullanılır.",
  },
];

export const InteractiveQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const q = QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === q.correctIdx) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        {/* Quiz Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Fibonacci & Java Bilgi Testi</h2>
              <p className="text-xs text-slate-400">Konuyu pekiştirmek için 4 soruluk mini test</p>
            </div>
          </div>

          <span className="text-xs font-mono bg-slate-800 text-amber-400 px-3 py-1 rounded-lg border border-slate-700">
            {isFinished ? 'Tamamlandı' : `Soru ${currentIdx + 1} / ${QUESTIONS.length}`}
          </span>
        </div>

        {!isFinished ? (
          <div className="mt-6 space-y-5">
            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {q.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {q.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === q.correctIdx;

                let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/50';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-300';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation when answered */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-amber-400 font-semibold block uppercase tracking-wider text-[10px]">
                  Açıklama:
                </span>
                <p>{q.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <span>{currentIdx < QUESTIONS.length - 1 ? 'Sonraki Soru' : 'Sonucu Gör'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished Result View */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white">Tebrikler, Testi Tamamladınız!</h3>
            <p className="text-sm text-slate-400">
              Skorunuz: <strong className="text-amber-400 font-mono text-base">{score} / {QUESTIONS.length}</strong> doğru.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition border border-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Testi Yeniden Başlat</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

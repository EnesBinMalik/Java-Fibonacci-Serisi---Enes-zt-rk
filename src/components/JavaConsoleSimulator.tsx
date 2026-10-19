import React, { useState, useEffect, useRef } from 'react';
import { LoopType, TraceFrame } from '../types/fibonacci';
import { generateJavaTrace } from '../utils/fibonacciCalculator';
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  Terminal, 
  Gauge, 
  CheckCircle2, 
  Cpu, 
  Variable, 
  Code2,
  Sparkles
} from 'lucide-react';

interface JavaConsoleSimulatorProps {
  n: number;
}

export const JavaConsoleSimulator: React.FC<JavaConsoleSimulatorProps> = ({ n }) => {
  const [loopType, setLoopType] = useState<LoopType>('for');
  const [frames, setFrames] = useState<TraceFrame[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(700); // ms per step
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Generate trace whenever n or loopType changes
  useEffect(() => {
    const trace = generateJavaTrace(n, loopType);
    setFrames(trace);
    setCurrentFrameIndex(0);
    setIsPlaying(false);
  }, [n, loopType]);

  // Auto-playing steps
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentFrameIndex < frames.length - 1) {
      timer = setTimeout(() => {
        setCurrentFrameIndex((prev) => prev + 1);
      }, speed);
    } else if (isPlaying && currentFrameIndex >= frames.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentFrameIndex, frames.length, speed]);

  // Auto scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentFrameIndex]);

  const currentFrame = frames[currentFrameIndex] || null;

  const handleStepForward = () => {
    if (currentFrameIndex < frames.length - 1) {
      setCurrentFrameIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentFrameIndex(0);
  };

  // Build terminal output up to current frame
  const terminalOutputs: string[] = [];
  for (let i = 0; i <= currentFrameIndex; i++) {
    if (frames[i]?.outputLine) {
      terminalOutputs.push(frames[i].outputLine!);
    }
  }

  // Simplified code representation for line-by-line highlight
  const codeLines = [
    { num: 1, text: 'import java.util.Scanner;' },
    { num: 2, text: '// Geliştirici: Enes Öztürk' },
    { num: 3, text: 'public class Main {' },
    { num: 4, text: '    public static void main(String[] args) {' },
    { num: 5, text: '        Scanner scanner = new Scanner(System.in);' },
    { num: 6, text: '        System.out.print("Eleman sayısını giriniz: ");' },
    { num: 7, text: `        int n = scanner.nextInt(); // n = ${n}` },
    { num: 8, text: '        long a = 0, b = 1;' },
    { num: 9, text: '        if (n == 1) {' },
    { num: 10, text: '            System.out.print(a); return;' },
    { num: 11, text: '        }' },
    { num: 12, text: '        System.out.print(a + " " + b);' },
    { num: 13, text: '' },
    ...(loopType === 'for'
      ? [
          { num: 14, text: '        // for döngüsü ile sonraki terimleri bulma' },
          { num: 15, text: `        for (int i = 2; i < n; i++) {` },
          { num: 16, text: '            long next = a + b;' },
          { num: 17, text: '            System.out.print(" " + next);' },
          { num: 18, text: '            a = b;' },
          { num: 19, text: '            b = next;' },
          { num: 20, text: '        }' },
        ]
      : loopType === 'while'
      ? [
          { num: 14, text: '        int i = 2;' },
          { num: 15, text: `        while (i < n) {` },
          { num: 16, text: '            long next = a + b;' },
          { num: 17, text: '            System.out.print(" " + next);' },
          { num: 18, text: '            a = b;' },
          { num: 19, text: '            b = next;' },
          { num: 20, text: '            i++;' },
          { num: 21, text: '        }' },
        ]
      : [
          { num: 14, text: '        int i = 2;' },
          { num: 15, text: '        do {' },
          { num: 16, text: '            long next = a + b;' },
          { num: 17, text: '            System.out.print(" " + next);' },
          { num: 18, text: '            a = b;' },
          { num: 19, text: '            b = next;' },
          { num: 20, text: '            i++;' },
          { num: 21, text: `        } while (i < n);` },
        ]),
    { num: 22, text: '' },
    { num: 23, text: '        System.out.println("\\nBitti. Enes Öztürk");' },
    { num: 24, text: '        scanner.close();' },
    { num: 25, text: '    }' },
    { num: 26, text: '}' },
  ];

  const activeLineNumber = currentFrame?.line || 7;

  return (
    <div className="space-y-6">
      {/* Control Ribbon */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Java Konsol & Canlı Döngü Hata Ayıklayıcı
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">
                  JDK 21
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Java kod satırlarını ve bellek değişkenlerini adım adım görselleştirin.
              </p>
            </div>
          </div>

          {/* Loop Selector */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['for', 'while', 'do-while'] as LoopType[]).map((type) => (
              <button
                key={type}
                onClick={() => setLoopType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                  loopType === type
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {type} Döngüsü
              </button>
            ))}
          </div>
        </div>

        {/* Playback Controls */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-md cursor-pointer ${
                isPlaying
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Durdur' : 'Canlı Oynat'}</span>
            </button>

            <button
              onClick={handleStepForward}
              disabled={isPlaying || currentFrameIndex >= frames.length - 1}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 text-xs sm:text-sm font-medium transition cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
              <span>Adım Atla</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs sm:text-sm font-medium transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sıfırla</span>
            </button>
          </div>

          {/* Speed slider */}
          <div className="flex items-center gap-3 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <Gauge className="w-4 h-4 text-amber-400" />
            <span>Hız:</span>
            {[
              { label: '0.5x', ms: 1100 },
              { label: '1x', ms: 600 },
              { label: '2x', ms: 250 },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => setSpeed(s.ms)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                  speed === s.ms
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Step Counter */}
          <div className="text-xs text-slate-400 font-mono">
            Adım: <strong className="text-white">{currentFrameIndex + 1}</strong> / {frames.length}
          </div>
        </div>
      </div>

      {/* Main Split: Left Java Code, Right Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Interactive Code with active line highlight */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Main.java ({loopType} döngüsü)</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Aktif Satır: #{activeLineNumber}
            </span>
          </div>

          <div className="p-4 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto max-h-[460px] overflow-y-auto">
            {codeLines.map((line) => {
              const isActive = line.num === activeLineNumber;
              return (
                <div
                  key={line.num}
                  className={`flex items-center py-0.5 px-2 rounded transition-colors ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-200 border-l-2 border-amber-400 font-bold'
                      : 'text-slate-300 hover:bg-slate-900/50'
                  }`}
                >
                  <span className="w-8 shrink-0 text-slate-600 text-right pr-3 select-none text-[11px]">
                    {line.num}
                  </span>
                  <span className="whitespace-pre">{line.text}</span>
                </div>
              );
            })}
          </div>

          {/* Explanation bar */}
          <div className="p-3.5 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">
              <strong>Adım İzahı:</strong> {currentFrame?.explanation || 'Başlatılıyor...'}
            </span>
          </div>
        </div>

        {/* Right: Terminal & Variables Window */}
        <div className="lg:col-span-5 space-y-4">
          {/* Simulated Terminal */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[280px]">
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              </div>
              <span className="text-xs font-mono text-slate-400">bash: java Main</span>
            </div>

            <div className="p-4 font-mono text-xs text-emerald-400 flex-1 overflow-y-auto space-y-1 bg-black/90">
              <div className="text-slate-500">$ javac Main.java && java Main</div>
              {terminalOutputs.map((out, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {out}
                </div>
              ))}
              <div ref={terminalEndRef} className="flex items-center">
                <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-0.5"></span>
              </div>
            </div>
          </div>

          {/* Memory / Variables Watch Inspector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Variable className="w-4 h-4 text-amber-400" />
                <span>Bellek Değişkenleri (Watch)</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Döngü: {currentFrame?.iteration ?? 0}. Tekrar
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">int n (Eleman Sayısı)</span>
                <span className="text-amber-400 font-bold text-sm">{currentFrame?.variables.n ?? n}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">int i (Sayaç)</span>
                <span className="text-cyan-400 font-bold text-sm">
                  {currentFrame?.variables.i !== undefined ? currentFrame.variables.i : '-'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">long a (Önceki 1. Terim)</span>
                <span className="text-emerald-400 font-bold text-sm truncate block">
                  {currentFrame?.variables.a ?? '0'}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">long b (Önceki 2. Terim)</span>
                <span className="text-emerald-400 font-bold text-sm truncate block">
                  {currentFrame?.variables.b ?? '1'}
                </span>
              </div>

              <div className="col-span-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">long next (a + b Toplamı)</span>
                <span className="text-amber-300 font-bold text-sm truncate block">
                  {currentFrame?.variables.next ?? 'Hesaplanıyor...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

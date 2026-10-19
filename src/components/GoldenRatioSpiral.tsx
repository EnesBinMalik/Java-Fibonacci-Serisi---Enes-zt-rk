import React, { useState, useEffect, useRef } from 'react';
import { GOLDEN_RATIO } from '../utils/fibonacciCalculator';
import { Orbit, Sparkles, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';

interface GoldenRatioSpiralProps {
  n: number;
}

export const GoldenRatioSpiral: React.FC<GoldenRatioSpiralProps> = ({ n }) => {
  const [spiralSteps, setSpiralSteps] = useState<number>(Math.min(Math.max(n, 5), 10));
  const [zoom, setZoom] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sync with prop when changed
  useEffect(() => {
    setSpiralSteps(Math.min(Math.max(n, 4), 11));
  }, [n]);

  // Compute fibonacci numbers for spiral
  const fibs: number[] = [1, 1];
  for (let i = 2; i <= spiralSteps; i++) {
    fibs.push(fibs[i - 1] + fibs[i - 2]);
  }

  // Draw the spiral on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear background
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    // Draw subtle grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Colors for squares
    const colors = [
      'rgba(245, 158, 11, 0.25)',  // amber
      'rgba(234, 88, 12, 0.25)',   // orange
      'rgba(239, 68, 68, 0.25)',   // red
      'rgba(217, 70, 239, 0.25)',  // fuchsia
      'rgba(168, 85, 247, 0.25)',  // purple
      'rgba(99, 102, 241, 0.25)',  // indigo
      'rgba(59, 130, 246, 0.25)',  // blue
      'rgba(14, 165, 233, 0.25)',  // sky
      'rgba(16, 185, 129, 0.25)',  // emerald
      'rgba(34, 197, 94, 0.25)',   // green
      'rgba(132, 204, 22, 0.25)',  // lime
    ];

    // Determine base scale based on largest fibonacci number and zoom
    const maxFib = fibs[fibs.length - 1];
    const maxDimension = Math.min(width, height) * 0.75 * zoom;
    const scale = maxDimension / (maxFib * 1.6);

    // Center coordinates
    const centerX = width * 0.45;
    const centerY = height * 0.55;

    // Directions: 0: right, 1: top, 2: left, 3: bottom
    // We define tiles layout:
    // Square 1: at (0,0) of size 1
    // Square 2: at (-1, 0) of size 1
    // Square 3: at (-1, -2) of size 2 ...
    // Let's use standard Fibonacci bounding box algorithm
    interface Box {
      x: number;
      y: number;
      size: number;
      arcCenter: { x: number; y: number };
      startAngle: number;
      endAngle: number;
      val: number;
    }

    const boxes: Box[] = [];
    let curX = 0;
    let curY = 0;

    for (let i = 0; i < fibs.length; i++) {
      const size = fibs[i];
      const dir = i % 4;
      let bx = curX;
      let by = curY;
      let arcCx = 0;
      let arcCy = 0;
      let startAngle = 0;
      let endAngle = 0;

      if (i === 0) {
        bx = 0;
        by = 0;
        arcCx = size;
        arcCy = size;
        startAngle = Math.PI;
        endAngle = 1.5 * Math.PI;
      } else if (dir === 1) { // up / right
        bx = curX;
        by = curY - size;
        arcCx = bx;
        arcCy = by + size;
        startAngle = 1.5 * Math.PI;
        endAngle = 2 * Math.PI;
      } else if (dir === 2) { // left
        bx = curX - size;
        by = curY;
        arcCx = bx + size;
        arcCy = by;
        startAngle = 0;
        endAngle = 0.5 * Math.PI;
      } else if (dir === 3) { // down
        bx = curX;
        by = curY;
        arcCx = bx + size;
        arcCy = by;
        startAngle = 0.5 * Math.PI;
        endAngle = Math.PI;
      } else if (dir === 0) { // right
        bx = curX;
        by = curY - size;
        arcCx = bx;
        arcCy = by + size;
        startAngle = Math.PI;
        endAngle = 1.5 * Math.PI;
      }

      boxes.push({
        x: bx,
        y: by,
        size,
        arcCenter: { x: arcCx, y: arcCy },
        startAngle,
        endAngle,
        val: size,
      });

      // Update next anchor point
      if (dir === 0) {
        curX = bx + size;
        curY = by;
      } else if (dir === 1) {
        curX = bx;
        curY = by;
      } else if (dir === 2) {
        curX = bx;
        curY = by + size;
      } else if (dir === 3) {
        curX = bx + size;
        curY = by + size;
      }
    }

    // Render each square
    boxes.forEach((box, idx) => {
      const renderX = centerX + box.x * scale;
      const renderY = centerY + box.y * scale;
      const renderSize = box.size * scale;

      // Draw box fill
      ctx.fillStyle = colors[idx % colors.length];
      ctx.fillRect(renderX, renderY, renderSize, renderSize);

      // Draw box border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(renderX, renderY, renderSize, renderSize);

      // Label inside square
      if (renderSize > 18) {
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.max(10, Math.min(18, renderSize * 0.25))}px 'Fira Code', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(box.val.toString(), renderX + renderSize / 2, renderY + renderSize / 2);
      }
    });

    // Draw the Golden Spiral Arc
    ctx.strokeStyle = '#f59e0b'; // Amber-500
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 12;

    boxes.forEach((box) => {
      const cx = centerX + box.arcCenter.x * scale;
      const cy = centerY + box.arcCenter.y * scale;
      const r = box.size * scale;

      ctx.beginPath();
      ctx.arc(cx, cy, r, box.startAngle, box.endAngle);
      ctx.stroke();
    });

    // Reset shadow
    ctx.shadowBlur = 0;
  }, [spiralSteps, zoom]);

  // Convergence data
  const convergenceItems = [
    { n1: 1, n2: 1, ratio: 1.0 },
    { n1: 1, n2: 2, ratio: 2.0 },
    { n1: 2, n2: 3, ratio: 1.5 },
    { n1: 3, n2: 5, ratio: 1.666667 },
    { n1: 5, n2: 8, ratio: 1.6 },
    { n1: 8, n2: 13, ratio: 1.625 },
    { n1: 13, n2: 21, ratio: 1.615385 },
    { n1: 21, n2: 34, ratio: 1.619048 },
    { n1: 34, n2: 55, ratio: 1.617647 },
    { n1: 55, n2: 89, ratio: 1.618182 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Orbit className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Altın Oran (φ = 1.618033...) ve Fibonacci Spirali
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Fibonacci serisinde ardışık iki sayının birbirine oranı (F<sub>n</sub> / F<sub>n-1</sub>) ilerledikçe evrendeki Altın Oran'a yaklaşır.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <span className="text-2xl font-black text-amber-400 font-serif">φ</span>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Altın Oran Değeri</div>
              <div className="text-sm font-bold text-white font-mono">1.6180339887...</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 font-medium">Spiral Adım Sayısı:</span>
            <input
              type="range"
              min="4"
              max="11"
              value={spiralSteps}
              onChange={(e) => setSpiralSteps(parseInt(e.target.value, 10))}
              className="accent-amber-500 w-32 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {spiralSteps} Kare
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.2, 2.5))}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="Yakınlaştır"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.4))}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="Uzaklaştır"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
        <canvas
          ref={canvasRef}
          className="w-full h-[420px] sm:h-[480px] block cursor-crosshair"
        />

        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2 pointer-events-none">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Logaritmik Altın Spiral (Enes Öztürk Tasarımı)</span>
        </div>
      </div>

      {/* Altın Oran Yakınsama Tablosu */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            Ardışık Terimler Oranı Yakınsama Tablosu (F<sub>n</sub> / F<sub>n-1</sub>)
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {convergenceItems.map((item, idx) => {
            const diff = Math.abs(item.ratio - GOLDEN_RATIO);
            const isVeryClose = diff < 0.002;
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border font-mono transition-all ${
                  isVeryClose
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <div className="text-[11px] text-slate-400">
                  {item.n2} / {item.n1}
                </div>
                <div className="text-base font-bold mt-1 text-white">
                  = {item.ratio.toFixed(6)}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Fark: {diff.toFixed(6)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

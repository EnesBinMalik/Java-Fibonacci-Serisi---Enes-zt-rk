import React, { useState } from 'react';
import { JAVA_TEMPLATES } from '../data/javaCodeTemplates';
import { Copy, Check, Download, FileCode, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const JavaCodeViewer: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('for');
  const [copied, setCopied] = useState<boolean>(false);

  const activeTemplate = JAVA_TEMPLATES[selectedKey];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTemplate.code);
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeTemplate.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeTemplate.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Code Header & Tab Selector */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-amber-400" />
              <span>Hazır Java Kaynak Kodları (Enes Öztürk)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              İstediğiniz döngü yapısını seçip Java dosyasını tek tıkla kopyalayabilir veya indirebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold transition shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>.java İndir</span>
            </button>
          </div>
        </div>

        {/* Algorithm Tabs */}
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-5 border-t border-slate-800">
          {Object.entries(JAVA_TEMPLATES).map(([key, item]) => {
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedKey(key)}
                className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-amber-400' : 'text-slate-300'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1 line-clamp-1">
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Display Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Code info bar */}
        <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-amber-400">{activeTemplate.filename}</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">{activeTemplate.description}</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400 border border-emerald-500/20">
              Zaman: {activeTemplate.timeComplexity}
            </span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-cyan-400 border border-cyan-500/20">
              Bellek: {activeTemplate.spaceComplexity}
            </span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 overflow-x-auto max-h-[550px] overflow-y-auto">
          <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
            <code>{activeTemplate.code}</code>
          </pre>
        </div>

        {/* Bottom Banner */}
        <div className="bg-slate-900/60 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Java 8, 11, 17, 21+ ile %100 uyumludur. IntelliJ, Eclipse ve VS Code'da doğrudan çalışır.</span>
          </div>
          <span className="font-mono text-slate-500">Yazar: Enes Öztürk</span>
        </div>
      </div>
    </div>
  );
};

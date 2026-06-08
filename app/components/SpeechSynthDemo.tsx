"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Pictogram = {
  id: string;
  label: string;
  emoji: string;
  speech: string;
  color: string; // Tailwind bg class
};

const CATEGORIES: Record<string, Pictogram[]> = {
  Necessidades: [
    { id: "agua", label: "Água", emoji: "🥛", speech: "Quero beber água.", color: "bg-sky-600/90 border-sky-500/30 hover:bg-sky-500" },
    { id: "comer", label: "Comer", emoji: "🍎", speech: "Estou com fome. Quero comer.", color: "bg-orange-600/90 border-orange-500/30 hover:bg-orange-500" },
    { id: "banheiro", label: "Banheiro", emoji: "🚾", speech: "Preciso ir ao banheiro.", color: "bg-emerald-600/90 border-emerald-500/30 hover:bg-emerald-500" },
    { id: "dormir", label: "Dormir", emoji: "😴", speech: "Estou com sono. Quero dormir.", color: "bg-indigo-600/90 border-indigo-500/30 hover:bg-indigo-500" },
  ],
  Sentimentos: [
    { id: "feliz", label: "Feliz", emoji: "😊", speech: "Estou feliz.", color: "bg-yellow-600/90 border-yellow-500/30 hover:bg-yellow-500" },
    { id: "triste", label: "Triste", emoji: "😢", speech: "Estou triste.", color: "bg-blue-600/90 border-blue-500/30 hover:bg-blue-500" },
    { id: "dor", label: "Dor", emoji: "🩹", speech: "Estou sentindo dor.", color: "bg-rose-600/90 border-rose-500/30 hover:bg-rose-500" },
    { id: "cansado", label: "Cansado", emoji: "🥱", speech: "Estou cansado.", color: "bg-zinc-600/90 border-zinc-500/30 hover:bg-zinc-500" },
  ],
  Ações: [
    { id: "ajuda", label: "Ajuda", emoji: "🙋", speech: "Preciso de ajuda.", color: "bg-red-600/90 border-red-500/30 hover:bg-red-500" },
    { id: "brincar", label: "Brincar", emoji: "🧸", speech: "Quero brincar.", color: "bg-purple-600/90 border-purple-500/30 hover:bg-purple-500" },
    { id: "passear", label: "Sair", emoji: "🚶", speech: "Quero sair para passear.", color: "bg-teal-600/90 border-teal-500/30 hover:bg-teal-500" },
    { id: "estudar", label: "Estudar", emoji: "📚", speech: "Quero estudar.", color: "bg-violet-600/90 border-violet-500/30 hover:bg-violet-500" },
  ],
  Comunicação: [
    { id: "sim", label: "Sim", emoji: "👍", speech: "Sim.", color: "bg-emerald-700/90 border-emerald-600/30 hover:bg-emerald-600" },
    { id: "nao", label: "Não", emoji: "👎", speech: "Não.", color: "bg-amber-700/90 border-amber-600/30 hover:bg-amber-600" },
    { id: "ola", label: "Olá", emoji: "👋", speech: "Olá, tudo bem?", color: "bg-blue-700/90 border-blue-600/30 hover:bg-blue-600" },
    { id: "obrigado", label: "Obrigado", emoji: "🙏", speech: "Muito obrigado.", color: "bg-cyan-700/90 border-cyan-600/30 hover:bg-cyan-600" },
  ],
};

export default function SpeechSynthDemo() {
  const [activeTab, setActiveTab] = useState<string>("Necessidades");
  const [inputMode, setInputMode] = useState<"click" | "dwell">("dwell");
  const [dwellTime, setDwellTime] = useState(1200);
  const [hoveredPicId, setHoveredPicId] = useState<string | null>(null);
  const [hoverProgress, setHoverProgress] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playChime = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      // Nice dual tone chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.3);
    } catch {
      // Fallback
    }
  }, []);

  const speak = useCallback((pic: Pictogram) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(pic.speech);
    utterance.lang = "pt-BR";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);

    playChime();
    setHistory((prev) => [pic.emoji + " " + pic.label, ...prev.slice(0, 9)]);
  }, [playChime]);

  const startDwell = useCallback((pic: Pictogram) => {
    if (inputMode !== "dwell") return;

    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    setHoveredPicId(pic.id);
    startTimeRef.current = performance.now();

    const updateProgress = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / dwellTime) * 100);
      setHoverProgress(progress);

      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };
    animationFrameRef.current = requestAnimationFrame(updateProgress);

    hoverTimerRef.current = setTimeout(() => {
      speak(pic);
      setHoveredPicId(null);
      setHoverProgress(0);
    }, dwellTime);
  }, [inputMode, dwellTime, speak]);

  const cancelDwell = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setHoveredPicId(null);
    setHoverProgress(0);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col gap-6">
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 animate-pulse" />
              Prancha de Comunicação (Vocalizador)
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Ideal para comunicação alternativa rápida usando cartões pictográficos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-xl bg-zinc-950 p-1 border border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  cancelDwell();
                  setInputMode("dwell");
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  inputMode === "dwell"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Passar o Mouse (Dwell)
              </button>
              <button
                type="button"
                onClick={() => {
                  cancelDwell();
                  setInputMode("click");
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  inputMode === "click"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Clique Normal
              </button>
            </div>

            {inputMode === "dwell" && (
              <div className="flex items-center gap-2 rounded-xl bg-zinc-950 px-3 py-1.5 border border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Tempo:</span>
                <select
                  value={dwellTime}
                  onChange={(e) => setDwellTime(Number(e.target.value))}
                  className="bg-transparent text-xs font-bold text-emerald-400 border-none outline-none cursor-pointer"
                >
                  <option value={800} className="bg-zinc-950 text-white">0.8s (Rápido)</option>
                  <option value={1200} className="bg-zinc-950 text-white">1.2s (Médio)</option>
                  <option value={1800} className="bg-zinc-950 text-white">1.8s (Lento)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(CATEGORIES).map((catName) => (
            <button
              key={catName}
              type="button"
              onClick={() => {
                cancelDwell();
                setActiveTab(catName);
              }}
              className={`rounded-xl px-4 py-2.5 text-sm font-black transition-all ${
                activeTab === catName
                  ? "bg-zinc-100 text-zinc-950 shadow-lg scale-[1.02]"
                  : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Pictogram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
          {CATEGORIES[activeTab]?.map((pic) => {
            const isHovered = hoveredPicId === pic.id;
            return (
              <button
                key={pic.id}
                type="button"
                onClick={() => speak(pic)}
                onMouseEnter={() => startDwell(pic)}
                onMouseLeave={cancelDwell}
                className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border text-white aspect-[4/3] transition-all overflow-hidden ${pic.color} ${
                  isHovered ? "scale-[1.04] ring-4 ring-white shadow-xl shadow-zinc-950/50" : "shadow-md"
                }`}
              >
                {/* Dwell progress overlay */}
                {isHovered && (
                  <div
                    className="absolute inset-x-0 bottom-0 h-2 bg-white/70 transition-all"
                    style={{ width: `${hoverProgress}%` }}
                  />
                )}

                <span className="text-4xl sm:text-5xl mb-2.5 select-none">{pic.emoji}</span>
                <span className="text-lg font-black tracking-wide">{pic.label}</span>
              </button>
            );
          })}
        </div>

        {/* Vocalization History */}
        {history.length > 0 && (
          <div className="border-t border-zinc-800 pt-4 mt-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Histórico de Falas Recentes</p>
            <div className="flex flex-wrap gap-2">
              {history.map((item, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-zinc-950 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

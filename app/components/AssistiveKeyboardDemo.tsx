"use client";

import { useEffect, useRef, useState } from "react";

const QUICK_PHRASES = [
  "Quero água",
  "Estou com fome",
  "Preciso de ajuda",
  "Sim, por favor",
  "Não, obrigado",
  "Estou cansado",
  "Estou com dor",
  "Quero ir ao banheiro",
];

const KEYBOARD_LAYOUTS = {
  alphabetical: [
    ["A", "B", "C", "D", "E", "F"],
    ["G", "H", "I", "J", "K", "L"],
    ["M", "N", "O", "P", "Q", "R"],
    ["S", "T", "U", "V", "W", "X"],
    ["Y", "Z", ",", ".", "?", "!"],
  ],
  qwerty: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "?"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "!"],
  ],
};

export default function AssistiveKeyboardDemo() {
  const [text, setText] = useState("");
  const [inputMode, setInputMode] = useState<"click" | "dwell">("dwell");
  const [dwellTime, setDwellTime] = useState(1200); // ms
  const [layout, setLayout] = useState<"alphabetical" | "qwerty">("alphabetical");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [hoverProgress, setHoverProgress] = useState(0);

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play synthetic feedback sound using Web Audio API
  const playFeedbackSound = (type: "hover" | "click" | "clear") => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "click") {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "clear") {
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        // hover click tick
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch {
      // Audio fallback
    }
  };

  const speakText = (txtToSpeak: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(txtToSpeak || "Nada escrito");
    utterance.lang = "pt-BR";
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleKeyPress = (char: string) => {
    playFeedbackSound("click");
    if (char === "ESPAÇO") {
      setText((prev) => prev + " ");
    } else if (char === "APAGAR") {
      setText((prev) => prev.slice(0, -1));
    } else if (char === "LIMPAR") {
      playFeedbackSound("clear");
      setText("");
    } else if (char === "FALAR") {
      speakText(text);
    } else {
      setText((prev) => prev + char);
    }
  };

  const startDwell = (keyId: string) => {
    if (inputMode !== "dwell") return;

    // Clear previous
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    setHoveredKey(keyId);
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
      handleKeyPress(keyId);
      setHoveredKey(null);
      setHoverProgress(0);
    }, dwellTime);
  };

  const cancelDwell = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setHoveredKey(null);
    setHoverProgress(0);
  };

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
              <span className="h-3.5 w-3.5 rounded-full bg-blue-500 animate-pulse" />
              Teclado Assistivo
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Simulador de digitação por permanência (gaze/dwell) ou clique convencional.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Input Mode selection */}
            <div className="inline-flex rounded-xl bg-zinc-950 p-1 border border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  cancelDwell();
                  setInputMode("dwell");
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  inputMode === "dwell"
                    ? "bg-blue-600 text-white shadow"
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
                    ? "bg-blue-600 text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Clique Normal
              </button>
            </div>

            {/* Layout selection */}
            <div className="inline-flex rounded-xl bg-zinc-950 p-1 border border-zinc-800">
              <button
                type="button"
                onClick={() => setLayout("alphabetical")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  layout === "alphabetical"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                A-Z
              </button>
              <button
                type="button"
                onClick={() => setLayout("qwerty")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  layout === "qwerty"
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                QWERTY
              </button>
            </div>

            {/* Time Adjust */}
            {inputMode === "dwell" && (
              <div className="flex items-center gap-2 rounded-xl bg-zinc-950 px-3 py-1.5 border border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Tempo:</span>
                <select
                  value={dwellTime}
                  onChange={(e) => setDwellTime(Number(e.target.value))}
                  className="bg-transparent text-xs font-bold text-blue-400 border-none outline-none cursor-pointer"
                >
                  <option value={800} className="bg-zinc-950 text-white">0.8s (Rápido)</option>
                  <option value={1200} className="bg-zinc-950 text-white">1.2s (Médio)</option>
                  <option value={1800} className="bg-zinc-950 text-white">1.8s (Lento)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Text Display Panel */}
        <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 p-5 shadow-inner">
          <div className="min-h-16 max-h-32 overflow-y-auto text-2xl font-semibold tracking-wide text-white break-words">
            {text || <span className="text-zinc-700 italic font-normal text-lg">Digite algo com o olhar ou mouse...</span>}
          </div>
          {text && (
            <div className="absolute right-4 bottom-4 flex gap-2">
              <button
                type="button"
                onClick={() => handleKeyPress("LIMPAR")}
                onMouseEnter={() => startDwell("LIMPAR")}
                onMouseLeave={cancelDwell}
                className="relative overflow-hidden rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-xs font-bold text-zinc-300 transition-colors"
              >
                {hoveredKey === "LIMPAR" && (
                  <div
                    className="absolute inset-y-0 left-0 bg-red-500/20 transition-all"
                    style={{ width: `${hoverProgress}%` }}
                  />
                )}
                Limpar
              </button>
              <button
                type="button"
                onClick={() => handleKeyPress("FALAR")}
                onMouseEnter={() => startDwell("FALAR")}
                onMouseLeave={cancelDwell}
                className="relative overflow-hidden rounded-lg bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-900/30 transition-colors"
              >
                {hoveredKey === "FALAR" && (
                  <div
                    className="absolute inset-y-0 left-0 bg-white/20 transition-all"
                    style={{ width: `${hoverProgress}%` }}
                  />
                )}
                Vocalizar 🔊
              </button>
            </div>
          )}
        </div>

        {/* Predictions Panel */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Frases de Acesso Rápido</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {QUICK_PHRASES.map((phrase) => {
              const keyId = `phrase-${phrase}`;
              const isHovered = hoveredKey === keyId;
              return (
                <button
                  key={phrase}
                  type="button"
                  onClick={() => {
                    playFeedbackSound("click");
                    setText(phrase);
                    speakText(phrase);
                  }}
                  onMouseEnter={() => startDwell(keyId)}
                  onMouseLeave={cancelDwell}
                  className={`relative overflow-hidden rounded-xl border p-3 text-center text-xs font-bold transition-all ${
                    isHovered
                      ? "border-blue-500 bg-blue-500/10 text-white scale-[1.02]"
                      : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {isHovered && (
                    <div
                      className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 transition-all"
                      style={{ width: `${hoverProgress}%` }}
                    />
                  )}
                  {phrase}
                </button>
              );
            })}
          </div>
        </div>

        {/* Keyboard Layout Grid */}
        <div className="flex flex-col gap-2.5 mt-2">
          <div className="flex flex-col gap-2 bg-zinc-950 p-4 rounded-2xl border border-zinc-800/60">
            {KEYBOARD_LAYOUTS[layout].map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1.5">
                {row.map((char) => {
                  const isHovered = hoveredKey === char;
                  return (
                    <button
                      key={char}
                      type="button"
                      onClick={() => handleKeyPress(char)}
                      onMouseEnter={() => startDwell(char)}
                      onMouseLeave={cancelDwell}
                      className={`relative flex-1 min-w-8 max-w-16 aspect-square rounded-xl flex items-center justify-center text-lg font-black transition-all overflow-hidden ${
                        isHovered
                          ? "bg-blue-600 text-white scale-[1.05] shadow-lg shadow-blue-900/40 border border-blue-400/30"
                          : "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700/50"
                      }`}
                    >
                      {isHovered && (
                        <div
                          className="absolute inset-0 bg-blue-400/20"
                          style={{
                            clipPath: `inset(${100 - hoverProgress}% 0 0 0)`,
                          }}
                        />
                      )}
                      <span className="relative z-10">{char}</span>
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Special Keys Row */}
            <div className="flex justify-center gap-1.5 mt-1">
              <button
                type="button"
                onClick={() => handleKeyPress("APAGAR")}
                onMouseEnter={() => startDwell("APAGAR")}
                onMouseLeave={cancelDwell}
                className={`relative flex-[1.5] py-4 rounded-xl text-xs font-extrabold transition-all overflow-hidden ${
                  hoveredKey === "APAGAR"
                    ? "bg-amber-600 text-white scale-[1.03]"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
                }`}
              >
                {hoveredKey === "APAGAR" && (
                  <div
                    className="absolute inset-x-0 bottom-0 h-1 bg-amber-400 transition-all"
                    style={{ width: `${hoverProgress}%` }}
                  />
                )}
                ⌫ APAGAR
              </button>

              <button
                type="button"
                onClick={() => handleKeyPress("ESPAÇO")}
                onMouseEnter={() => startDwell("ESPAÇO")}
                onMouseLeave={cancelDwell}
                className={`relative flex-[3.5] py-4 rounded-xl text-xs font-extrabold transition-all overflow-hidden ${
                  hoveredKey === "ESPAÇO"
                    ? "bg-blue-600 text-white scale-[1.02]"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
                }`}
              >
                {hoveredKey === "ESPAÇO" && (
                  <div
                    className="absolute inset-x-0 bottom-0 h-1 bg-blue-400 transition-all"
                    style={{ width: `${hoverProgress}%` }}
                  />
                )}
                ␣ ESPAÇO
              </button>

              <button
                type="button"
                onClick={() => handleKeyPress("FALAR")}
                onMouseEnter={() => startDwell("FALAR")}
                onMouseLeave={cancelDwell}
                className={`relative flex-[2] py-4 rounded-xl text-xs font-black tracking-wide transition-all overflow-hidden bg-blue-700 text-white border border-blue-600 shadow-md ${
                  hoveredKey === "FALAR" ? "bg-blue-500 scale-[1.03] shadow-lg shadow-blue-500/30" : ""
                }`}
              >
                {hoveredKey === "FALAR" && (
                  <div
                    className="absolute inset-x-0 bottom-0 h-1 bg-white transition-all"
                    style={{ width: `${hoverProgress}%` }}
                  />
                )}
                🔊 VOCALIZAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

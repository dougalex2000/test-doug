"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type BoardItem = {
  id: string;
  label: string;
  icon: string;
  speech?: string;
};

const quickAnswers: BoardItem[] = [
  { id: "sim", label: "Sim", icon: "✅" },
  { id: "nao", label: "Não", icon: "❌" },
  { id: "talvez", label: "Talvez", icon: "🤔" },
  { id: "quero", label: "Quero", icon: "🙋" },
  { id: "nao-quero", label: "Não quero", icon: "🙅" },
];

const quickPhrases: BoardItem[] = [
  { id: "dor", label: "Estou com dor", icon: "🤕" },
  { id: "agua", label: "Quero água", icon: "💧" },
  { id: "descansar", label: "Quero descansar", icon: "😴" },
  { id: "ajuda", label: "Preciso de ajuda", icon: "🆘" },
];

const categories: Array<{ id: string; label: string; icon: string; items: BoardItem[] }> = [
  {
    id: "necessidades",
    label: "Necessidades",
    icon: "🧩",
    items: [
      { id: "banheiro", label: "Quero ir ao banheiro", icon: "🚻" },
      { id: "fome", label: "Estou com fome", icon: "🍽️" },
      { id: "frio", label: "Estou com frio", icon: "🧥" },
      { id: "calor", label: "Estou com calor", icon: "🌡️" },
      { id: "posicao", label: "Quero mudar de posição", icon: "🔄" },
      { id: "silencio", label: "Quero silêncio", icon: "🤫" },
    ],
  },
  {
    id: "emocoes",
    label: "Emoções",
    icon: "💛",
    items: [
      { id: "feliz", label: "Estou feliz", icon: "😊" },
      { id: "triste", label: "Estou triste", icon: "😢" },
      { id: "bravo", label: "Estou bravo", icon: "😠" },
      { id: "medo", label: "Estou com medo", icon: "😨" },
      { id: "cansado", label: "Estou cansado", icon: "🥱" },
      { id: "animado", label: "Estou animado", icon: "🤩" },
    ],
  },
  {
    id: "escola",
    label: "Escola",
    icon: "🏫",
    items: [
      { id: "entendi", label: "Entendi", icon: "👍" },
      { id: "nao-entendi", label: "Não entendi", icon: "❓" },
      { id: "repetir", label: "Pode repetir?", icon: "🔁" },
      { id: "terminei", label: "Terminei a atividade", icon: "🏁" },
      { id: "brincar", label: "Quero brincar", icon: "🧸" },
      { id: "ler", label: "Quero ler", icon: "📚" },
    ],
  },
  {
    id: "familia",
    label: "Família",
    icon: "👨‍👩‍👧",
    items: [
      { id: "mae", label: "Quero a mamãe", icon: "👩" },
      { id: "pai", label: "Quero o papai", icon: "👨" },
      { id: "abraco", label: "Quero um abraço", icon: "🤗" },
      { id: "casa", label: "Quero ir para casa", icon: "🏠" },
      { id: "passear", label: "Quero passear", icon: "🚶" },
      { id: "amo", label: "Eu te amo", icon: "❤️" },
    ],
  },
  {
    id: "alimentacao",
    label: "Alimentação",
    icon: "🍎",
    items: [
      { id: "comer", label: "Quero comer", icon: "🍽️" },
      { id: "suco", label: "Quero suco", icon: "🧃" },
      { id: "fruta", label: "Quero fruta", icon: "🍌" },
      { id: "mais", label: "Quero mais", icon: "➕" },
      { id: "chega", label: "Chega, obrigado", icon: "✋" },
      { id: "gostei", label: "Gostei da comida", icon: "😋" },
    ],
  },
  {
    id: "saude",
    label: "Saúde",
    icon: "🩺",
    items: [
      { id: "dor-cabeca", label: "Dói minha cabeça", icon: "🤯" },
      { id: "dor-barriga", label: "Dói minha barriga", icon: "🤢" },
      { id: "remedio", label: "Hora do remédio?", icon: "💊" },
      { id: "medico", label: "Quero o médico", icon: "🧑‍⚕️" },
      { id: "melhor", label: "Estou melhor", icon: "🌤️" },
      { id: "mal", label: "Estou passando mal", icon: "🚨" },
    ],
  },
];

const SCAN_INTERVAL_MS = 1800;
const DWELL_TIME_MS = 1500;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

export function CommunicationBoard() {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [scanningEnabled, setScanningEnabled] = useState(false);
  const [dwellEnabled, setDwellEnabled] = useState(false);
  const [scanIndex, setScanIndex] = useState(0);
  const [dwellingId, setDwellingId] = useState<string | null>(null);
  const dwellTimerRef = useRef<number | null>(null);

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ?? categories[0];

  const scannableItems = useMemo(
    () => [...quickAnswers, ...quickPhrases, ...activeCategory.items],
    [activeCategory],
  );

  const speak = useCallback(
    (item: BoardItem) => {
      const message = item.speech ?? item.label;
      setLastMessage(message);
      if (audioEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "pt-BR";
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }
    },
    [audioEnabled],
  );

  // Varredura automática: percorre os itens e seleciona com Espaço/Enter.
  useEffect(() => {
    if (!scanningEnabled) return;
    const interval = window.setInterval(() => {
      setScanIndex((current) => (current + 1) % scannableItems.length);
    }, SCAN_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [scanningEnabled, scannableItems.length]);

  useEffect(() => {
    if (!scanningEnabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        const item = scannableItems[scanIndex];
        if (item) speak(item);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scanningEnabled, scanIndex, scannableItems, speak]);

  const cancelDwell = useCallback(() => {
    if (dwellTimerRef.current !== null) {
      window.clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    }
    setDwellingId(null);
  }, []);

  const startDwell = useCallback(
    (item: BoardItem) => {
      if (!dwellEnabled) return;
      cancelDwell();
      setDwellingId(item.id);
      dwellTimerRef.current = window.setTimeout(() => {
        speak(item);
        setDwellingId(null);
        dwellTimerRef.current = null;
      }, DWELL_TIME_MS);
    },
    [cancelDwell, dwellEnabled, speak],
  );

  useEffect(() => cancelDwell, [cancelDwell]);

  const renderItemButton = (item: BoardItem, tone: string) => {
    const flatIndex = scannableItems.findIndex((candidate) => candidate.id === item.id);
    const isScanned = scanningEnabled && flatIndex === scanIndex;
    const isDwelling = dwellingId === item.id;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => speak(item)}
        onMouseEnter={() => startDwell(item)}
        onMouseLeave={cancelDwell}
        onFocus={() => startDwell(item)}
        onBlur={cancelDwell}
        className={`flex min-h-[110px] flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 text-center text-lg font-black leading-6 shadow-sm transition-transform ${focusRing} ${tone} ${
          isScanned
            ? "scale-105 ring-8 ring-amber-400"
            : isDwelling
              ? "scale-105 ring-8 ring-green-400"
              : "hover:scale-[1.02]"
        }`}
      >
        <span aria-hidden="true" className="text-4xl">
          {item.icon}
        </span>
        {item.label}
      </button>
    );
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg sm:p-8">
      {/* Modos de acesso */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm font-black uppercase tracking-wide text-blue-800">
          Modos de acesso:
        </p>
        <button
          type="button"
          aria-pressed={audioEnabled}
          onClick={() => setAudioEnabled((current) => !current)}
          className={`rounded-full border-2 px-4 py-2 text-sm font-black ${focusRing} ${
            audioEnabled
              ? "border-green-700 bg-green-700 text-white"
              : "border-zinc-300 bg-white text-zinc-700"
          }`}
        >
          🔊 Áudio {audioEnabled ? "ligado" : "desligado"}
        </button>
        <button
          type="button"
          aria-pressed={scanningEnabled}
          onClick={() => {
            setScanIndex(0);
            setScanningEnabled((current) => !current);
          }}
          className={`rounded-full border-2 px-4 py-2 text-sm font-black ${focusRing} ${
            scanningEnabled
              ? "border-amber-600 bg-amber-500 text-zinc-950"
              : "border-zinc-300 bg-white text-zinc-700"
          }`}
        >
          🔁 Varredura {scanningEnabled ? "ligada" : "desligada"}
        </button>
        <button
          type="button"
          aria-pressed={dwellEnabled}
          onClick={() => setDwellEnabled((current) => !current)}
          className={`rounded-full border-2 px-4 py-2 text-sm font-black ${focusRing} ${
            dwellEnabled
              ? "border-green-700 bg-green-600 text-white"
              : "border-zinc-300 bg-white text-zinc-700"
          }`}
        >
          ⏱️ Permanência {dwellEnabled ? "ligada" : "desligada"}
        </button>
      </div>
      {scanningEnabled ? (
        <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm font-bold text-amber-900">
          Modo varredura: as opções são destacadas uma a uma. Pressione{" "}
          <kbd className="rounded border border-amber-300 bg-white px-1">Espaço</kbd> ou{" "}
          <kbd className="rounded border border-amber-300 bg-white px-1">Enter</kbd> para
          selecionar a opção destacada.
        </p>
      ) : null}
      {dwellEnabled ? (
        <p className="mt-3 rounded-lg bg-green-50 p-3 text-sm font-bold text-green-900">
          Modo permanência: mantenha o cursor (ou o foco do teclado) sobre um botão por{" "}
          {DWELL_TIME_MS / 1000} segundos para selecioná-lo sem clicar.
        </p>
      ) : null}

      {/* Mensagem falada */}
      <div
        role="status"
        aria-live="assertive"
        className="mt-6 flex min-h-[72px] items-center justify-between gap-4 rounded-2xl border-2 border-blue-200 bg-blue-50 px-5 py-4"
      >
        <p className="text-2xl font-black text-blue-900">
          {lastMessage ?? "Selecione uma opção para falar"}
        </p>
        {lastMessage ? (
          <button
            type="button"
            onClick={() => setLastMessage(null)}
            className={`shrink-0 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-black text-blue-800 hover:bg-blue-100 ${focusRing}`}
          >
            Limpar
          </button>
        ) : null}
      </div>

      {/* Respostas simples */}
      <h3 className="mt-8 text-sm font-black uppercase tracking-wide text-zinc-600">
        Respostas simples
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {quickAnswers.map((item) =>
          renderItemButton(item, "border-blue-200 bg-blue-50 text-blue-950"),
        )}
      </div>

      {/* Frases rápidas */}
      <h3 className="mt-8 text-sm font-black uppercase tracking-wide text-zinc-600">
        Frases rápidas
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {quickPhrases.map((item) =>
          renderItemButton(item, "border-rose-200 bg-rose-50 text-rose-950"),
        )}
      </div>

      {/* Categorias */}
      <h3 className="mt-8 text-sm font-black uppercase tracking-wide text-zinc-600">
        Categorias
      </h3>
      <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Categorias de comunicação">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={category.id === activeCategoryId}
            onClick={() => {
              setScanIndex(0);
              setActiveCategoryId(category.id);
            }}
            className={`rounded-full border-2 px-4 py-2 text-base font-black ${focusRing} ${
              category.id === activeCategoryId
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-zinc-300 bg-white text-zinc-800 hover:border-blue-400"
            }`}
          >
            <span aria-hidden="true">{category.icon}</span> {category.label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3" role="tabpanel">
        {activeCategory.items.map((item) =>
          renderItemButton(item, "border-green-200 bg-green-50 text-green-950"),
        )}
      </div>
    </div>
  );
}

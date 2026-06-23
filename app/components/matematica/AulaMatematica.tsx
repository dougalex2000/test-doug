"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AulaMat, MatExercicio } from "../../lib/matematica";
import { registrarMat } from "../../lib/matematicaMetrics";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-2";

function falar(texto: string): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "pt-BR";
  u.rate = 0.95;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
  return true;
}

type Resultado = "idle" | "correto" | "errado";

const VELOCIDADES: { label: string; ms: number }[] = [
  { label: "Lenta", ms: 2000 },
  { label: "Média", ms: 1200 },
  { label: "Rápida", ms: 700 },
];

/* Apoio visual conforme o tipo da aula. */
function ApoioVisual({ aula }: { aula: AulaMat }) {
  const a = aula.visualA ?? 0;
  const b = aula.visualB ?? 0;

  if (aula.visualType === "counting") {
    return (
      <div className="flex flex-wrap justify-center gap-2" aria-label={`${a} objetos`}>
        {Array.from({ length: a }).map((_, i) => (
          <span key={i} className="text-3xl" aria-hidden="true">🔵</span>
        ))}
      </div>
    );
  }
  if (aula.visualType === "addition") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 text-3xl" aria-label={`${a} mais ${b}`}>
        <span aria-hidden="true">{"🍎".repeat(a)}</span>
        <span className="font-black text-emerald-700">+</span>
        <span aria-hidden="true">{"🍎".repeat(b)}</span>
        <span className="font-black text-emerald-700">=</span>
        <span aria-hidden="true">{"🍎".repeat(a + b)}</span>
      </div>
    );
  }
  if (aula.visualType === "subtraction") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 text-3xl" aria-label={`${a} menos ${b}`}>
        {Array.from({ length: a }).map((_, i) => (
          <span key={i} className={i >= a - b ? "opacity-30 line-through" : ""} aria-hidden="true">🍎</span>
        ))}
        <span className="font-black text-rose-700">= {a - b}</span>
      </div>
    );
  }
  if (aula.visualType === "shapes") {
    const formas = [
      { e: "⭕", n: "Círculo" },
      { e: "🟦", n: "Quadrado" },
      { e: "🔺", n: "Triângulo" },
      { e: "▬", n: "Retângulo" },
    ];
    return (
      <div className="flex flex-wrap justify-center gap-5">
        {formas.map((f) => (
          <div key={f.n} className="flex flex-col items-center gap-1">
            <span className="text-4xl" aria-hidden="true">{f.e}</span>
            <span className="text-xs font-bold text-zinc-600">{f.n}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function AulaMatematica({
  aula,
  proximaId,
}: {
  aula: AulaMat;
  proximaId?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Varredura
  const [scanning, setScanning] = useState(false);
  const [scanIndex, setScanIndex] = useState(0);
  const [scanMs, setScanMs] = useState(1200);
  const scanningRef = useRef(false);
  const scanIndexRef = useRef(0);
  useEffect(() => { scanningRef.current = scanning; }, [scanning]);
  useEffect(() => { scanIndexRef.current = scanIndex; }, [scanIndex]);

  // Mensagens e comemoração
  const [aviso, setAviso] = useState<string | null>(null);
  const [aplauso, setAplauso] = useState(false);
  const [aulaConcluida, setAulaConcluida] = useState(false);

  // Exercícios (estado compartilhado por id)
  const [respostaTexto, setRespostaTexto] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<Record<string, Resultado>>({});
  const [concluido, setConcluido] = useState<Record<string, boolean>>({});
  const tentativasRef = useRef<Record<string, number>>({});
  const inicioRef = useRef<Record<string, number>>({});
  const ativoRef = useRef<string>(aula.exercicios[0]?.id ?? "");

  // Progresso "Minha atividade"
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [pausas, setPausas] = useState(0);
  const [repeticoes, setRepeticoes] = useState(0);
  const inicioAula = useRef(Date.now());
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    registrarMat({ aula: aula.id, tipo: "acesso" });
    inicioAula.current = Date.now();
    const t = window.setInterval(() => {
      setSegundos(Math.floor((Date.now() - inicioAula.current) / 1000));
    }, 1000);
    return () => window.clearInterval(t);
  }, [aula.id]);

  function dizer(texto: string, marcaTTS = false) {
    const ok = falar(texto);
    if (!ok) setAviso("Seu navegador não conseguiu ativar a leitura por voz agora.");
    if (marcaTTS) registrarMat({ aula: aula.id, tipo: "tts" });
  }

  function comemorar() {
    setAplauso(true);
    try {
      const a = new Audio("/sounds/aplauso.mp3");
      a.volume = 0.6;
      a.play().catch(() => {});
    } catch {
      /* sem arquivo de áudio — fallback visual */
    }
    window.setTimeout(() => setAplauso(false), 1800);
  }

  /* ---------------- vídeo / controles ---------------- */

  function togglePlay() {
    const v = videoRef.current;
    if (videoReady && v) {
      if (v.paused) void v.play();
      else { v.pause(); setPausas((p) => p + 1); registrarMat({ aula: aula.id, tipo: "pausa" }); }
    } else {
      dizer(aula.titulo);
      setAviso("O vídeo desta aula ainda será produzido pelo DAVI.");
    }
  }
  function voltar() {
    const v = videoRef.current;
    if (videoReady && v) v.currentTime = Math.max(0, v.currentTime - 5);
  }
  function avancar() {
    const v = videoRef.current;
    if (videoReady && v) v.currentTime = Math.min(v.duration || 0, v.currentTime + 5);
  }
  function repetir() {
    const v = videoRef.current;
    setRepeticoes((r) => r + 1);
    registrarMat({ aula: aula.id, tipo: "repeticao" });
    if (videoReady && v) {
      v.currentTime = Math.max(0, v.currentTime - 10);
      void v.play();
    } else {
      dizer(aula.descricao);
    }
  }
  function reiniciar() {
    const v = videoRef.current;
    if (videoReady && v) { v.currentTime = 0; void v.play(); }
    else dizer(`${aula.titulo}. ${aula.descricao}`);
  }
  function exercicioAtivo(): MatExercicio | undefined {
    return aula.exercicios.find((e) => e.id === ativoRef.current) ?? aula.exercicios[0];
  }
  function ouvirEnunciado() {
    const ex = exercicioAtivo();
    if (ex) dizer(ex.pergunta, true);
  }
  function ouvirResposta() {
    const ex = exercicioAtivo();
    const t = (respostaTexto[ex?.id ?? ""] ?? "").trim();
    dizer(t ? t : "Você ainda não escreveu uma resposta.", true);
  }
  function toggleScan() {
    setScanning((on) => {
      const novo = !on;
      if (novo) registrarMat({ aula: aula.id, tipo: "varredura" });
      return novo;
    });
  }
  function finalizar() {
    setAulaConcluida(true);
    registrarMat({ aula: aula.id, tipo: "aula_concluida" });
    dizer("Muito bem! Você terminou a aula.");
    comemorar();
  }

  const controles = useMemo(
    () => [
      { id: "voltar", label: "Voltar", icon: "⏪", run: voltar },
      { id: "play", label: playing ? "Pausar" : "Reproduzir", icon: playing ? "⏸️" : "▶️", run: togglePlay },
      { id: "avancar", label: "Avançar", icon: "⏩", run: avancar },
      { id: "repetir", label: "Repetir trecho", icon: "🔁", run: repetir },
      { id: "reiniciar", label: "Reiniciar aula", icon: "↩️", run: reiniciar },
      { id: "enunciado", label: "Ler enunciado", icon: "🔊", run: ouvirEnunciado },
      { id: "resposta", label: "Ouvir resposta", icon: "🗣️", run: ouvirResposta },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playing, videoReady, respostaTexto],
  );

  function selecionarVarredura() {
    const c = controles[scanIndexRef.current];
    if (c) c.run();
  }

  const handlersRef = useRef({ voltar, togglePlay, avancar, repetir, reiniciar, ouvirEnunciado, ouvirResposta, selecionarVarredura });
  handlersRef.current = { voltar, togglePlay, avancar, repetir, reiniciar, ouvirEnunciado, ouvirResposta, selecionarVarredura };

  // Varredura: destaca um controle por vez (velocidade configurável)
  useEffect(() => {
    if (!scanning) return;
    const id = window.setInterval(() => {
      setScanIndex((i) => (i + 1) % controles.length);
    }, scanMs);
    return () => window.clearInterval(id);
  }, [scanning, scanMs, controles.length]);

  // Teclado F1–F7 + seleção por varredura
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const h = handlersRef.current;
      const map: Record<string, () => void> = {
        F1: h.voltar,
        F2: h.togglePlay,
        F3: h.avancar,
        F4: h.repetir,
        F5: h.reiniciar,
        F6: h.ouvirEnunciado,
        F7: h.ouvirResposta,
      };
      if (map[e.key]) {
        e.preventDefault();
        map[e.key]();
        return;
      }
      if (scanningRef.current && (e.key === "Enter" || e.key === " ")) {
        const el = document.activeElement;
        const tag = el?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          h.selecionarVarredura();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---------------- exercícios ---------------- */

  function marcarInicio(exId: string) {
    ativoRef.current = exId;
    if (!inicioRef.current[exId]) inicioRef.current[exId] = Date.now();
  }

  function registraResposta(exId: string, acerto: boolean) {
    tentativasRef.current[exId] = (tentativasRef.current[exId] ?? 0) + 1;
    registrarMat({
      aula: aula.id,
      tipo: "resposta",
      correto: acerto,
      tentativas: tentativasRef.current[exId],
      tempoMs: Date.now() - (inicioRef.current[exId] ?? Date.now()),
      detalhe: exId,
    });
    if (acerto) setAcertos((n) => n + 1);
    else setErros((n) => n + 1);
  }

  function responderEscolha(ex: Extract<MatExercicio, { tipo: "escolha" }>, opcao: string) {
    marcarInicio(ex.id);
    const acerto = opcao === ex.correta;
    registraResposta(ex.id, acerto);
    setResultado((r) => ({ ...r, [ex.id]: acerto ? "correto" : "errado" }));
    if (acerto) {
      setConcluido((c) => ({ ...c, [ex.id]: true }));
      dizer("Muito bem! Você acertou!");
      comemorar();
    } else {
      dizer("Boa tentativa! Vamos tentar de novo com calma.");
    }
  }

  function verificarNumero(ex: Extract<MatExercicio, { tipo: "numero" }>) {
    marcarInicio(ex.id);
    const dado = (respostaTexto[ex.id] ?? "").trim();
    if (!dado) {
      dizer("Vamos tentar responder primeiro? Você consegue!");
      setResultado((r) => ({ ...r, [ex.id]: "errado" }));
      return;
    }
    const acerto = dado === ex.resposta.trim();
    registraResposta(ex.id, acerto);
    setResultado((r) => ({ ...r, [ex.id]: acerto ? "correto" : "errado" }));
    if (acerto) {
      setConcluido((c) => ({ ...c, [ex.id]: true }));
      dizer("Muito bem! Você acertou!");
      comemorar();
    } else {
      dizer("Boa tentativa! Vamos tentar de novo com calma.");
    }
  }

  function concluirAberto(ex: Extract<MatExercicio, { tipo: "aberto" }>) {
    marcarInicio(ex.id);
    const texto = (respostaTexto[ex.id] ?? "").trim();
    if (!texto) {
      dizer("Vamos tentar responder primeiro? Você consegue!");
      setResultado((r) => ({ ...r, [ex.id]: "errado" }));
      return;
    }
    setConcluido((c) => ({ ...c, [ex.id]: true }));
    setResultado((r) => ({ ...r, [ex.id]: "correto" }));
    registrarMat({ aula: aula.id, tipo: "exercicio_concluido", detalhe: ex.id });
    dizer("Parabéns! Você concluiu o exercício.");
    comemorar();
  }

  // Teclado numérico na tela
  function digitar(exId: string, d: string) {
    marcarInicio(exId);
    setRespostaTexto((t) => ({ ...t, [exId]: (t[exId] ?? "") + d }));
  }
  function apagar(exId: string) {
    setRespostaTexto((t) => ({ ...t, [exId]: (t[exId] ?? "").slice(0, -1) }));
  }
  function limpar(exId: string) {
    setRespostaTexto((t) => ({ ...t, [exId]: "" }));
  }

  const totalConcluidos = aula.exercicios.filter((ex) => concluido[ex.id]).length;
  const mmss = `${String(Math.floor(segundos / 60)).padStart(2, "0")}:${String(segundos % 60).padStart(2, "0")}`;

  const btnBig = "rounded-2xl px-4 py-4 text-base font-black shadow-sm transition";
  const numBtn = `flex h-14 items-center justify-center rounded-2xl bg-white text-2xl font-black text-zinc-800 shadow-sm ring-1 ring-zinc-200 hover:ring-blue-300 ${focusRing}`;

  return (
    <div className="bg-[#FbFcFe]">
      {aplauso && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center" aria-live="assertive">
          <div className="animate-bounce rounded-3xl bg-white/90 px-8 py-6 text-center shadow-2xl ring-2 ring-amber-200">
            <p className="text-5xl" aria-hidden="true">🎉👏⭐</p>
            <p className="mt-2 text-xl font-black text-emerald-700">Muito bem!</p>
          </div>
        </div>
      )}

      {/* Cabeçalho da aula */}
      <section className="border-b border-zinc-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-6 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/escola/matematica"
            className={`inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-black text-emerald-700 shadow-sm ring-1 ring-emerald-100 hover:ring-emerald-300 ${focusRing}`}
          >
            ← Voltar à Matemática
          </Link>
          <p className="mt-4 text-sm font-black uppercase tracking-wide text-emerald-700">{aula.categoria}</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">{aula.titulo}</h1>
          <p className="mt-2 text-xl font-black text-sky-700">{aula.subtitulo}</p>
        </div>
      </section>

      {/* Vídeo */}
      <section className="border-b border-zinc-200 px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-2 border-zinc-200 bg-zinc-900 shadow-sm">
            <video
              ref={videoRef}
              src={aula.videoUrl}
              poster={aula.poster}
              preload="metadata"
              playsInline
              controls
              className="h-full w-full object-cover"
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoReady(false)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            {!videoReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-600 to-sky-600 p-6 text-center text-white">
                <span className="text-6xl" aria-hidden="true">🎬</span>
                <p className="text-xl font-black">
                  Vídeo demonstrativo autoral do Projeto DAVI em preparação.
                </p>
                <p className="max-w-md text-sm font-semibold text-white/80">
                  Use o apoio visual e os botões abaixo para aprender.
                </p>
              </div>
            )}
          </div>
          <p className="mt-2 text-center text-xs font-semibold text-zinc-500">
            Conteúdo demonstrativo autoral criado para o Projeto DAVI.
          </p>

          {/* Controles grandes */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {controles.map((c, i) => {
              const destacado = scanning && i === scanIndex;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={c.run}
                  aria-label={c.label}
                  aria-current={destacado ? "true" : undefined}
                  className={`${btnBig} flex flex-col items-center gap-1 ${
                    destacado
                      ? "scale-105 bg-amber-400 text-amber-950 ring-4 ring-amber-300"
                      : "bg-white text-zinc-800 ring-1 ring-zinc-200 hover:ring-blue-300"
                  } ${focusRing}`}
                >
                  <span className="text-2xl" aria-hidden="true">{c.icon}</span>
                  <span className="text-xs leading-4">{c.label}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-center text-xs font-semibold text-zinc-500">
            Atalhos: F1 voltar · F2 pausar/reproduzir · F3 avançar · F4 repetir ·
            F5 reiniciar · F6 ler enunciado · F7 ouvir resposta
          </p>

          {/* Varredura + velocidade */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={toggleScan}
              aria-pressed={scanning}
              className={`rounded-xl px-4 py-2 text-sm font-black ${focusRing} ${
                scanning ? "bg-amber-500 text-white" : "bg-white text-zinc-800 ring-1 ring-zinc-200 hover:ring-amber-300"
              }`}
            >
              🎯 {scanning ? "Parar varredura" : "Ativar varredura"}
            </button>
            <span className="text-xs font-bold text-zinc-500">Velocidade:</span>
            {VELOCIDADES.map((v) => (
              <button
                key={v.label}
                type="button"
                onClick={() => setScanMs(v.ms)}
                aria-pressed={scanMs === v.ms}
                className={`rounded-xl px-3 py-2 text-sm font-bold ${focusRing} ${
                  scanMs === v.ms ? "bg-blue-600 text-white" : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:ring-blue-300"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
          {scanning && (
            <p className="mt-2 text-center text-xs font-black text-amber-700">
              Varredura ligada — pressione Enter ou Espaço para escolher o botão destacado.
            </p>
          )}
          {aviso && (
            <p className="mt-3 rounded-xl bg-amber-50 px-4 py-2 text-center text-sm font-bold text-amber-800">{aviso}</p>
          )}
        </div>
      </section>

      {/* Apoio visual */}
      {aula.visualType !== "none" && (
        <section className="border-b border-zinc-200 bg-white px-6 py-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-black text-zinc-900">Aprendendo com imagens</h2>
            <div className="mt-5 rounded-3xl border-2 border-zinc-200 bg-[#FbFcFe] p-6">
              <ApoioVisual aula={aula} />
            </div>
          </div>
        </section>
      )}

      {/* Exercícios + Minha atividade */}
      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-zinc-900">Exercício da aula</h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700 ring-1 ring-emerald-200">
                {totalConcluidos}/{aula.exercicios.length} concluídos
              </span>
            </div>

            <div className="mt-6 space-y-6">
              {aula.exercicios.map((ex, idx) => (
                <div key={ex.id} className="rounded-3xl border-2 border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
                      {idx + 1}
                    </span>
                    <h3 className="text-lg font-black text-zinc-900">{ex.pergunta}</h3>
                    {concluido[ex.id] && (
                      <span className="ml-auto rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white">✓ Concluído</span>
                    )}
                  </div>

                  {ex.tipo === "escolha" && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {ex.opcoes.map((op) => {
                        const certo = resultado[ex.id] === "correto" && op === ex.correta;
                        return (
                          <button
                            key={op}
                            type="button"
                            onClick={() => responderEscolha(ex, op)}
                            aria-label={`Opção ${op}`}
                            className={`min-w-[80px] rounded-2xl px-5 py-4 text-xl font-black shadow-sm ring-2 transition ${
                              certo ? "bg-emerald-500 text-white ring-emerald-300" : "bg-white text-zinc-800 ring-zinc-200 hover:ring-blue-300"
                            } ${focusRing}`}
                          >
                            {op}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {ex.tipo === "numero" && (
                    <>
                      {typeof ex.objetos === "number" && ex.objetos > 0 && (
                        <div className="mt-4 flex flex-wrap justify-center gap-1.5 rounded-2xl bg-sky-50 p-3" aria-label={`${ex.objetos} objetos para contar`}>
                          {Array.from({ length: ex.objetos }).map((_, i) => (
                            <span key={i} className="text-2xl" aria-hidden="true">🔵</span>
                          ))}
                        </div>
                      )}
                      <label htmlFor={`num-${ex.id}`} className="mt-4 block text-sm font-black text-zinc-700">
                        Digite sua resposta aqui
                      </label>
                      <input
                        id={`num-${ex.id}`}
                        inputMode="numeric"
                        value={respostaTexto[ex.id] ?? ""}
                        onChange={(e) => { marcarInicio(ex.id); setRespostaTexto((t) => ({ ...t, [ex.id]: e.target.value })); }}
                        placeholder="Digite um número…"
                        className={`mt-2 w-full rounded-2xl border-2 border-zinc-300 bg-white px-4 py-3 text-2xl font-black text-zinc-900 ${focusRing}`}
                      />
                      {/* Teclado numérico na tela */}
                      <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
                        {["1","2","3","4","5","6","7","8","9","0"].map((d) => (
                          <button key={d} type="button" onClick={() => digitar(ex.id, d)} aria-label={`Número ${d}`} className={numBtn}>
                            {d}
                          </button>
                        ))}
                        <button type="button" onClick={() => apagar(ex.id)} aria-label="Apagar" className={`${numBtn} text-base`}>⌫</button>
                        <button type="button" onClick={() => limpar(ex.id)} aria-label="Limpar" className={`${numBtn} text-base`}>🧹</button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" onClick={() => verificarNumero(ex)} className={`${btnBig} bg-blue-600 text-white hover:bg-blue-700 ${focusRing}`}>
                          ✓ Confirmar
                        </button>
                        <button type="button" onClick={() => { ativoRef.current = ex.id; ouvirResposta(); }} className={`${btnBig} bg-white text-zinc-800 ring-1 ring-zinc-200 hover:ring-blue-300 ${focusRing}`}>
                          🗣️ Ouvir minha resposta
                        </button>
                      </div>
                    </>
                  )}

                  {ex.tipo === "aberto" && (
                    <>
                      <label htmlFor={`ab-${ex.id}`} className="mt-4 block text-sm font-black text-zinc-700">
                        Escreva sua resposta aqui
                      </label>
                      <textarea
                        id={`ab-${ex.id}`}
                        rows={2}
                        value={respostaTexto[ex.id] ?? ""}
                        onChange={(e) => { marcarInicio(ex.id); setRespostaTexto((t) => ({ ...t, [ex.id]: e.target.value })); }}
                        placeholder="Digite sua resposta…"
                        className={`mt-2 w-full rounded-2xl border-2 border-zinc-300 bg-white px-4 py-3 text-xl font-bold text-zinc-900 ${focusRing}`}
                      />
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" onClick={() => { ativoRef.current = ex.id; ouvirResposta(); }} className={`${btnBig} bg-white text-zinc-800 ring-1 ring-zinc-200 hover:ring-blue-300 ${focusRing}`}>
                          🗣️ Ouvir minha resposta
                        </button>
                        <button type="button" onClick={() => concluirAberto(ex)} className={`${btnBig} bg-emerald-600 text-white hover:bg-emerald-700 ${focusRing}`}>
                          🎓 Terminei o exercício
                        </button>
                      </div>
                    </>
                  )}

                  {resultado[ex.id] === "correto" && (
                    <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-2 text-base font-black text-emerald-700">🎉 Muito bem! Você conseguiu!</p>
                  )}
                  {resultado[ex.id] === "errado" && (
                    <p className="mt-4 rounded-xl bg-sky-50 px-4 py-2 text-base font-bold text-sky-700">💙 Boa tentativa! Vamos tentar de novo com calma.</p>
                  )}
                </div>
              ))}
            </div>

            {/* Conclusão da aula */}
            <div className="mt-8 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 text-center">
              {aulaConcluida ? (
                <p className="text-xl font-black text-emerald-700">🌟 Aula concluída! Você é demais!</p>
              ) : (
                <button type="button" onClick={finalizar} className={`rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-black text-white shadow-md hover:bg-emerald-700 ${focusRing}`}>
                  ✅ Finalizar aula
                </button>
              )}
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/escola/matematica" className={`rounded-2xl border-2 border-zinc-300 bg-white px-5 py-3 text-base font-black text-zinc-800 hover:border-emerald-400 ${focusRing}`}>
                  Voltar às aulas
                </Link>
                {proximaId && (
                  <Link href={`/escola/matematica/aula/${proximaId}`} className={`rounded-2xl bg-blue-600 px-5 py-3 text-base font-black text-white hover:bg-blue-700 ${focusRing}`}>
                    Próxima aula →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Minha atividade */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border-2 border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-zinc-900">Minha atividade</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-2"><dt className="font-bold text-zinc-500">Aula</dt><dd className="text-right font-black text-zinc-800">{aula.titulo}</dd></div>
                <div className="flex justify-between"><dt className="font-bold text-zinc-500">Acertos</dt><dd className="font-black text-emerald-700">{acertos}</dd></div>
                <div className="flex justify-between"><dt className="font-bold text-zinc-500">Tentativas com erro</dt><dd className="font-black text-zinc-700">{erros}</dd></div>
                <div className="flex justify-between"><dt className="font-bold text-zinc-500">Pausas no vídeo</dt><dd className="font-black text-zinc-700">{pausas}</dd></div>
                <div className="flex justify-between"><dt className="font-bold text-zinc-500">Repetições</dt><dd className="font-black text-zinc-700">{repeticoes}</dd></div>
                <div className="flex justify-between"><dt className="font-bold text-zinc-500">Tempo na atividade</dt><dd className="font-black text-zinc-700">{mmss}</dd></div>
                <div className="flex justify-between"><dt className="font-bold text-zinc-500">Status</dt>
                  <dd className={`font-black ${aulaConcluida ? "text-emerald-700" : "text-amber-700"}`}>{aulaConcluida ? "Concluída" : "Em andamento"}</dd>
                </div>
              </dl>
              <p className="mt-4 rounded-xl bg-zinc-50 p-3 text-xs leading-5 text-zinc-500">
                Estes dados ficam só no seu navegador por enquanto. Cada passo é importante. Parabéns pelo esforço!
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

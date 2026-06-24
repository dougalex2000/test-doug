"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Aula, Exercicio } from "../../lib/portugues";
import { registrar } from "../../lib/portuguesMetrics";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-2";

/* ---------------- utilidades ---------------- */

function falar(texto: string): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "pt-BR";
  u.rate = 0.95;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
  return true;
}

/** Normaliza para comparação tolerante: minúsculas, sem acento, sem pontuação. */
function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

type Resultado = "idle" | "correto" | "errado";

/* ================================================================= */

export function AulaPortugues({
  aula,
  proximaId,
}: {
  aula: Aula;
  proximaId?: string;
}) {
  // Vídeo
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Opções de videoaula (se a aula oferecer mais de uma); senão, uma só.
  const opcoesVideo = useMemo(
    () =>
      aula.videos && aula.videos.length > 0
        ? aula.videos
        : [{ titulo: aula.titulo, src: aula.videoUrl, poster: aula.poster }],
    [aula],
  );
  const [videoSel, setVideoSel] = useState(0);
  const videoAtual = opcoesVideo[videoSel] ?? opcoesVideo[0];

  function escolherVideo(i: number) {
    if (i === videoSel) return;
    setVideoSel(i);
    setVideoReady(false);
    setPlaying(false);
  }

  // Varredura
  const [scanning, setScanning] = useState(false);
  const [scanIndex, setScanIndex] = useState(0);
  const scanningRef = useRef(false);
  const scanIndexRef = useRef(0);
  useEffect(() => { scanningRef.current = scanning; }, [scanning]);
  useEffect(() => { scanIndexRef.current = scanIndex; }, [scanIndex]);

  // Mensagens e comemoração
  const [aviso, setAviso] = useState<string | null>(null);
  const [aplauso, setAplauso] = useState(false);
  const [aulaConcluida, setAulaConcluida] = useState(false);

  // Exercícios
  const [escolhaRes, setEscolhaRes] = useState<Record<string, Resultado>>({});
  const [fraseTexto, setFraseTexto] = useState<Record<string, string>>({});
  const [fraseRes, setFraseRes] = useState<Record<string, Resultado>>({});
  const [concluido, setConcluido] = useState<Record<string, boolean>>({});
  const tentativasRef = useRef<Record<string, number>>({});
  const inicioRef = useRef<Record<string, number>>({});
  const ultimoTextoRef = useRef<string>("");

  // Registra acesso à aula
  useEffect(() => {
    registrar({ aula: aula.id, tipo: "acesso" });
  }, [aula.id]);

  // TTS amigável se indisponível
  function dizer(texto: string, marcaTTS = false) {
    const ok = falar(texto);
    if (!ok) setAviso("Seu navegador não suporta leitura por voz.");
    if (marcaTTS) registrar({ aula: aula.id, tipo: "tts" });
  }

  function comemorar() {
    setAplauso(true);
    try {
      const a = new Audio("/sounds/aplauso.mp3");
      a.volume = 0.6;
      a.play().catch(() => {});
    } catch {
      /* sem arquivo de áudio — usamos o fallback visual */
    }
    window.setTimeout(() => setAplauso(false), 1800);
  }

  /* ---------------- ações de vídeo / controles ---------------- */

  function togglePlay() {
    const v = videoRef.current;
    if (videoReady && v) {
      if (v.paused) void v.play();
      else v.pause();
    } else {
      dizer(`${aula.titulo}. ${aula.subtitulo}.`);
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
    if (videoReady && v) {
      v.currentTime = Math.max(0, v.currentTime - 10);
      void v.play();
    } else {
      dizer(instrucao());
    }
  }
  function instrucao(): string {
    const s = aula.silabas.length ? ` As sílabas são: ${aula.silabas.join(", ")}.` : "";
    return `${aula.titulo}. ${aula.subtitulo}.${s}`;
  }
  function ouvirInstrucao() {
    dizer(instrucao(), true);
  }
  function toggleScan() {
    setScanning((on) => {
      const novo = !on;
      if (novo) registrar({ aula: aula.id, tipo: "varredura" });
      return novo;
    });
  }
  function finalizar() {
    setAulaConcluida(true);
    registrar({ aula: aula.id, tipo: "aula_concluida" });
    dizer("Muito bem! Você terminou a aula.");
    comemorar();
  }
  function ouvirEscrito() {
    const t = ultimoTextoRef.current.trim();
    dizer(t ? t : "Você ainda não escreveu nada.", true);
  }

  // Controles principais (também usados pela varredura, na mesma ordem)
  const controles = useMemo(
    () => [
      { id: "play", label: playing ? "Pausar" : "Tocar", icon: playing ? "⏸️" : "▶️", run: togglePlay },
      { id: "voltar", label: "Voltar", icon: "⏪", run: voltar },
      { id: "repetir", label: "Repetir trecho", icon: "🔁", run: repetir },
      { id: "avancar", label: "Avançar", icon: "⏩", run: avancar },
      { id: "instr", label: "Ouvir instrução", icon: "🔊", run: ouvirInstrucao },
      { id: "scan", label: scanning ? "Parar varredura" : "Ativar varredura", icon: "🎯", run: toggleScan },
      { id: "fim", label: "Finalizar aula", icon: "✅", run: finalizar },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playing, scanning, videoReady],
  );

  function selecionarVarredura() {
    const c = controles[scanIndexRef.current];
    if (c) c.run();
  }

  // Mantém as ações atuais acessíveis ao listener de teclado (montado uma vez)
  const handlersRef = useRef({ togglePlay, voltar, avancar, repetir, ouvirInstrucao, toggleScan, ouvirEscrito, finalizar, selecionarVarredura });
  handlersRef.current = { togglePlay, voltar, avancar, repetir, ouvirInstrucao, toggleScan, ouvirEscrito, finalizar, selecionarVarredura };

  // Varredura: destaca um controle por vez
  useEffect(() => {
    if (!scanning) return;
    const id = window.setInterval(() => {
      setScanIndex((i) => (i + 1) % controles.length);
    }, 1200);
    return () => window.clearInterval(id);
  }, [scanning, controles.length]);

  // Teclado F1–F7 + seleção por varredura (Enter/Espaço)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const h = handlersRef.current;
      const map: Record<string, () => void> = {
        F1: h.togglePlay,
        F2: h.voltar,
        F3: h.avancar,
        F4: h.ouvirInstrucao,
        F5: h.toggleScan,
        F6: h.ouvirEscrito,
        F7: h.finalizar,
      };
      if (map[e.key]) {
        e.preventDefault();
        map[e.key]();
        return;
      }
      // Seleção por varredura: Enter/Espaço, exceto digitando em campo de texto
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
    if (!inicioRef.current[exId]) inicioRef.current[exId] = Date.now();
  }

  function responderEscolha(ex: Extract<Exercicio, { tipo: "escolha" }>, opcao: string) {
    marcarInicio(ex.id);
    tentativasRef.current[ex.id] = (tentativasRef.current[ex.id] ?? 0) + 1;
    const acerto = opcao === ex.correta;
    setEscolhaRes((r) => ({ ...r, [ex.id]: acerto ? "correto" : "errado" }));
    registrar({
      aula: aula.id,
      tipo: "resposta",
      correto: acerto,
      tentativas: tentativasRef.current[ex.id],
      tempoMs: Date.now() - (inicioRef.current[ex.id] ?? Date.now()),
      detalhe: ex.id,
    });
    if (acerto) {
      setConcluido((c) => ({ ...c, [ex.id]: true }));
      dizer("Muito bem! Você conseguiu!");
      comemorar();
    } else {
      dizer("Você está indo bem. Vamos tentar de novo juntos?");
    }
  }

  function verificarFrase(ex: Extract<Exercicio, { tipo: "frase" }>) {
    marcarInicio(ex.id);
    tentativasRef.current[ex.id] = (tentativasRef.current[ex.id] ?? 0) + 1;
    const acerto = normalizar(fraseTexto[ex.id] ?? "") === normalizar(ex.modelo);
    setFraseRes((r) => ({ ...r, [ex.id]: acerto ? "correto" : "errado" }));
    registrar({
      aula: aula.id,
      tipo: "resposta",
      correto: acerto,
      tentativas: tentativasRef.current[ex.id],
      tempoMs: Date.now() - (inicioRef.current[ex.id] ?? Date.now()),
      detalhe: ex.id,
    });
    if (acerto) {
      dizer("Muito bem! Você conseguiu!");
      comemorar();
    } else {
      dizer("Você está indo bem. Vamos tentar de novo juntos?");
    }
  }

  function terminarExercicio(exId: string) {
    setConcluido((c) => ({ ...c, [exId]: true }));
    registrar({ aula: aula.id, tipo: "exercicio_concluido", detalhe: exId });
    dizer("Atividade concluída. Parabéns!");
  }

  const totalConcluidos = aula.exercicios.filter((ex) => concluido[ex.id]).length;

  // Resposta livre (sem gabarito): concluir exige apenas texto escrito.
  function concluirAberto(ex: Extract<Exercicio, { tipo: "aberto" }>) {
    const texto = (fraseTexto[ex.id] ?? "").trim();
    if (!texto) {
      dizer("Vamos tentar escrever alguma coisa primeiro? Você consegue!");
      setFraseRes((r) => ({ ...r, [ex.id]: "errado" }));
      return;
    }
    setConcluido((c) => ({ ...c, [ex.id]: true }));
    setFraseRes((r) => ({ ...r, [ex.id]: "correto" }));
    registrar({ aula: aula.id, tipo: "exercicio_concluido", detalhe: ex.id });
    dizer("Parabéns! Você concluiu o exercício.");
    comemorar();
  }

  /* ---------------- render ---------------- */

  const btnBig =
    "rounded-2xl px-4 py-4 text-base font-black shadow-sm transition";

  return (
    <div className="bg-[#FbFcFe]">
      {/* Comemoração */}
      {aplauso && (
        <div
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
          aria-live="assertive"
        >
          <div className="animate-bounce rounded-3xl bg-white/90 px-8 py-6 text-center shadow-2xl ring-2 ring-amber-200">
            <p className="text-5xl" aria-hidden="true">🎉👏⭐</p>
            <p className="mt-2 text-xl font-black text-emerald-700">Muito bem!</p>
          </div>
        </div>
      )}

      {/* Cabeçalho da aula */}
      <section className="border-b border-zinc-200 bg-gradient-to-br from-violet-50 via-white to-sky-50 px-6 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/escola/portugues"
            className={`inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-black text-blue-700 shadow-sm ring-1 ring-blue-100 hover:ring-blue-300 ${focusRing}`}
          >
            ← Voltar ao Português
          </Link>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            {aula.titulo}
          </h1>
          <p className="mt-2 text-xl font-black text-violet-700">{aula.subtitulo}</p>
          {aula.silabas.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {aula.silabas.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => dizer(s)}
                  aria-label={`Ouvir ${s}`}
                  className={`rounded-2xl bg-white px-4 py-2 text-2xl font-black text-zinc-800 shadow-sm ring-1 ring-zinc-200 hover:ring-violet-300 ${focusRing}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vídeo */}
      <section className="border-b border-zinc-200 px-6 py-8">
        <div className="mx-auto max-w-4xl">
          {opcoesVideo.length > 1 && (
            <div className="mb-6">
              <h3 className="text-xl font-black text-zinc-900">Escolha uma videoaula</h3>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                O aluno pode escolher a aula que deseja assistir e realizar as
                atividades no seu próprio ritmo, com vídeos curtos, exercícios
                acessíveis, áudio e botões adaptados.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {opcoesVideo.map((v, i) => {
                  const ativo = i === videoSel;
                  return (
                    <button
                      key={v.src}
                      type="button"
                      onClick={() => escolherVideo(i)}
                      aria-pressed={ativo}
                      className={`flex flex-col rounded-2xl border-2 p-4 text-left transition ${focusRing} ${
                        ativo
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                          : "border-zinc-200 bg-white hover:border-blue-300"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span aria-hidden="true">{ativo ? "▶️" : "🎬"}</span>
                        <span className="text-base font-black text-zinc-900">{v.titulo}</span>
                        {ativo && (
                          <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs font-black text-white">
                            Selecionada
                          </span>
                        )}
                      </span>
                      {v.descricao && (
                        <span className="mt-1 text-sm leading-6 text-zinc-600">{v.descricao}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-2 border-zinc-200 bg-zinc-900 shadow-sm">
            <video
              key={videoAtual.src}
              ref={videoRef}
              src={videoAtual.src}
              poster={videoAtual.poster}
              preload="metadata"
              playsInline
              controls
              autoPlay={videoSel > 0}
              className="h-full w-full object-cover"
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoReady(false)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            {!videoReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-600 to-violet-600 p-6 text-center text-white">
                <span className="text-6xl" aria-hidden="true">🎬</span>
                <p className="text-xl font-black">
                  Vídeo demonstrativo autoral do Projeto DAVI em preparação.
                </p>
                <p className="max-w-md text-sm font-semibold text-white/80">
                  Enquanto o vídeo é produzido, use os botões abaixo e o apoio de
                  voz para aprender.
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
                      : c.id === "fim"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : c.id === "scan" && scanning
                      ? "bg-amber-500 text-white"
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
            Atalhos: F1 tocar/pausar · F2 voltar · F3 avançar · F4 instrução ·
            F5 varredura · F6 ouvir o que escrevi · F7 finalizar
          </p>
          {scanning && (
            <p className="mt-1 text-center text-xs font-black text-amber-700">
              Varredura ligada — pressione Enter ou Espaço para escolher o botão
              destacado.
            </p>
          )}
          {aviso && (
            <p className="mt-3 rounded-xl bg-amber-50 px-4 py-2 text-center text-sm font-bold text-amber-800">
              {aviso}
            </p>
          )}
        </div>
      </section>

      {/* Exercícios */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-zinc-900">Exercícios</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700 ring-1 ring-emerald-200">
              {totalConcluidos}/{aula.exercicios.length} concluídos
            </span>
          </div>

          <div className="mt-6 space-y-6">
            {aula.exercicios.map((ex, idx) => (
              <div
                key={ex.id}
                className="rounded-3xl border-2 border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-700">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-black text-zinc-900">{ex.pergunta}</h3>
                  {concluido[ex.id] && (
                    <span className="ml-auto rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white">
                      ✓ Concluído
                    </span>
                  )}
                </div>

                {ex.tipo === "escolha" && (
                  <>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {ex.opcoes.map((op) => {
                        const escolhido = escolhaRes[ex.id];
                        const certo = escolhido === "correto" && op === ex.correta;
                        return (
                          <button
                            key={op}
                            type="button"
                            onClick={() => responderEscolha(ex, op)}
                            aria-label={`Opção ${op}`}
                            className={`min-w-[80px] rounded-2xl px-5 py-4 text-2xl font-black shadow-sm ring-2 transition ${
                              certo
                                ? "bg-emerald-500 text-white ring-emerald-300"
                                : "bg-white text-zinc-800 ring-zinc-200 hover:ring-blue-300"
                            } ${focusRing}`}
                          >
                            {op}
                          </button>
                        );
                      })}
                    </div>
                    {escolhaRes[ex.id] === "correto" && (
                      <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-2 text-base font-black text-emerald-700">
                        🎉 Muito bem! Você conseguiu!
                      </p>
                    )}
                    {escolhaRes[ex.id] === "errado" && (
                      <p className="mt-4 rounded-xl bg-sky-50 px-4 py-2 text-base font-bold text-sky-700">
                        💙 Você está indo bem. Vamos tentar de novo juntos?
                      </p>
                    )}
                  </>
                )}

                {ex.tipo === "frase" && (
                  <>
                    <div className="mt-4 rounded-2xl bg-violet-50 p-4 text-center">
                      <p className="text-sm font-bold text-violet-600">Frase modelo</p>
                      <p className="mt-1 text-2xl font-black text-zinc-900">{ex.modelo}</p>
                    </div>
                    <label htmlFor={`frase-${ex.id}`} className="mt-4 block text-sm font-black text-zinc-700">
                      Escreva ou copie aqui:
                    </label>
                    <textarea
                      id={`frase-${ex.id}`}
                      rows={2}
                      value={fraseTexto[ex.id] ?? ""}
                      onChange={(e) => {
                        marcarInicio(ex.id);
                        ultimoTextoRef.current = e.target.value;
                        setFraseTexto((t) => ({ ...t, [ex.id]: e.target.value }));
                      }}
                      placeholder="Digite a frase…"
                      className={`mt-2 w-full rounded-2xl border-2 border-zinc-300 bg-white px-4 py-3 text-xl font-bold text-zinc-900 ${focusRing}`}
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => { ultimoTextoRef.current = fraseTexto[ex.id] ?? ""; ouvirEscrito(); }}
                        className={`${btnBig} bg-white text-zinc-800 ring-1 ring-zinc-200 hover:ring-blue-300 ${focusRing}`}
                      >
                        🔊 Ouvir o que escrevi
                      </button>
                      <button
                        type="button"
                        onClick={() => verificarFrase(ex)}
                        className={`${btnBig} bg-blue-600 text-white hover:bg-blue-700 ${focusRing}`}
                      >
                        ✓ Verificar resposta
                      </button>
                      <button
                        type="button"
                        onClick={() => setFraseTexto((t) => ({ ...t, [ex.id]: "" }))}
                        className={`${btnBig} bg-white text-zinc-800 ring-1 ring-zinc-200 hover:ring-zinc-300 ${focusRing}`}
                      >
                        🧹 Limpar
                      </button>
                      <button
                        type="button"
                        onClick={() => terminarExercicio(ex.id)}
                        className={`${btnBig} bg-emerald-600 text-white hover:bg-emerald-700 ${focusRing}`}
                      >
                        🎓 Terminei o exercício
                      </button>
                    </div>
                    {fraseRes[ex.id] === "correto" && (
                      <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-2 text-base font-black text-emerald-700">
                        🎉 Muito bem! Você conseguiu!
                      </p>
                    )}
                    {fraseRes[ex.id] === "errado" && (
                      <p className="mt-4 rounded-xl bg-sky-50 px-4 py-2 text-base font-bold text-sky-700">
                        💙 Você está indo bem. Vamos tentar de novo juntos?
                      </p>
                    )}
                  </>
                )}

                {ex.tipo === "aberto" && (
                  <>
                    <label htmlFor={`aberto-${ex.id}`} className="mt-4 block text-sm font-black text-zinc-700">
                      Escreva sua resposta aqui:
                    </label>
                    <textarea
                      id={`aberto-${ex.id}`}
                      rows={2}
                      value={fraseTexto[ex.id] ?? ""}
                      onChange={(e) => {
                        marcarInicio(ex.id);
                        ultimoTextoRef.current = e.target.value;
                        setFraseTexto((t) => ({ ...t, [ex.id]: e.target.value }));
                      }}
                      placeholder="Digite uma letra, palavra ou frase…"
                      className={`mt-2 w-full rounded-2xl border-2 border-zinc-300 bg-white px-4 py-3 text-xl font-bold text-zinc-900 ${focusRing}`}
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => { ultimoTextoRef.current = fraseTexto[ex.id] ?? ""; ouvirEscrito(); }}
                        className={`${btnBig} bg-white text-zinc-800 ring-1 ring-zinc-200 hover:ring-blue-300 ${focusRing}`}
                      >
                        🔊 Ouvir o que escrevi
                      </button>
                      <button
                        type="button"
                        onClick={() => setFraseTexto((t) => ({ ...t, [ex.id]: "" }))}
                        className={`${btnBig} bg-white text-zinc-800 ring-1 ring-zinc-200 hover:ring-zinc-300 ${focusRing}`}
                      >
                        🧹 Limpar
                      </button>
                      <button
                        type="button"
                        onClick={() => concluirAberto(ex)}
                        className={`${btnBig} bg-emerald-600 text-white hover:bg-emerald-700 ${focusRing}`}
                      >
                        🎓 Terminei o exercício
                      </button>
                    </div>
                    {fraseRes[ex.id] === "correto" && (
                      <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-2 text-base font-black text-emerald-700">
                        🎉 Parabéns! Você concluiu o exercício.
                      </p>
                    )}
                    {fraseRes[ex.id] === "errado" && (
                      <p className="mt-4 rounded-xl bg-sky-50 px-4 py-2 text-base font-bold text-sky-700">
                        💙 Vamos tentar escrever alguma coisa primeiro? Você consegue!
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Conclusão da aula */}
          <div className="mt-8 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 text-center">
            {aulaConcluida ? (
              <p className="text-xl font-black text-emerald-700">
                🌟 Aula concluída! Você é demais!
              </p>
            ) : (
              <button
                type="button"
                onClick={finalizar}
                className={`rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-black text-white shadow-md hover:bg-emerald-700 ${focusRing}`}
              >
                ✅ Finalizar aula
              </button>
            )}
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/escola/portugues"
                className={`rounded-2xl border-2 border-zinc-300 bg-white px-5 py-3 text-base font-black text-zinc-800 hover:border-blue-400 ${focusRing}`}
              >
                Voltar às letras
              </Link>
              {proximaId && (
                <Link
                  href={`/escola/portugues/aula/${proximaId}`}
                  className={`rounded-2xl bg-blue-600 px-5 py-3 text-base font-black text-white hover:bg-blue-700 ${focusRing}`}
                >
                  Próxima aula →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

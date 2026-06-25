"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * DAVI InterCel — Escrita guiada (cursiva).
 * O usuário escolhe letra/sílaba/palavra, vê o modelo cursivo pontilhado e
 * escreve com o dedo por cima. A verificação é aproximada (cobertura do modelo
 * + precisão do traçado), com tolerância pensada para crianças e dificuldade
 * motora. Mobile-first; funciona com toque e com mouse.
 */

type Categoria = "letras" | "silabas" | "palavras";

const CONTEUDO: Record<Categoria, string[]> = {
  letras: ["a", "b", "c", "e", "i", "m", "o", "p", "u"],
  silabas: ["ba", "be", "bi", "bo", "bu", "ma", "me", "mi", "mo", "mu", "pa", "pe", "pi", "po", "pu"],
  palavras: ["bola", "bebê", "baba", "bico", "lua", "pé", "mamãe", "papai"],
};

const FONTE_CURSIVA =
  "'Segoe Script', 'Bradley Hand', 'Comic Sans MS', cursive";
const CELL = 12; // tamanho da célula da grade de verificação (px CSS)
const RAIO = 1; // tolerância (em células) para considerar "próximo"

const ring =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-2";

type Ponto = { x: number; y: number };
type Resultado = { ok: boolean; titulo: string; msg: string; pct: number } | null;

function falar(texto: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "pt-BR";
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function cellKey(x: number, y: number) {
  return `${Math.floor(x / CELL)},${Math.floor(y / CELL)}`;
}

function dilatar(cells: Set<string>): Set<string> {
  const out = new Set<string>();
  for (const k of cells) {
    const [cx, cy] = k.split(",").map(Number);
    for (let dx = -RAIO; dx <= RAIO; dx++) {
      for (let dy = -RAIO; dy <= RAIO; dy++) {
        out.add(`${cx + dx},${cy + dy}`);
      }
    }
  }
  return out;
}

export function EscritaGuiada({
  onSend,
  onVoltar,
}: {
  onSend?: (label: string, detail: string, mode: string) => void;
  onVoltar?: () => void;
}) {
  const [categoria, setCategoria] = useState<Categoria>("letras");
  const [item, setItem] = useState("a");
  const [resultado, setResultado] = useState<Resultado>(null);
  const [animando, setAnimando] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tamRef = useRef({ w: 0, h: 0, dpr: 1 });
  const modeloCellsRef = useRef<Set<string>>(new Set());
  const tracosRef = useRef<Ponto[][]>([]); // segmentos de traçado do usuário
  const desenhandoRef = useRef(false);

  const tentativasRef = useRef(0);
  const inicioRef = useRef<number>(0);

  // ---- desenho do fundo (linhas + modelo pontilhado) ----
  const desenharFundo = useCallback(
    (ctx: CanvasRenderingContext2D, revelar = 1) => {
      const { w, h } = tamRef.current;
      ctx.clearRect(0, 0, w, h);

      // pauta tipo caderno
      const topo = h * 0.22;
      const meio = h * 0.55;
      const base = h * 0.82;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.strokeStyle = "#bfdbfe";
      [topo, base].forEach((y) => {
        ctx.beginPath();
        ctx.moveTo(8, y);
        ctx.lineTo(w - 8, y);
        ctx.stroke();
      });
      ctx.strokeStyle = "#dbeafe";
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(8, meio);
      ctx.lineTo(w - 8, meio);
      ctx.stroke();
      ctx.setLineDash([]);

      // modelo: ajusta a fonte para caber na largura
      let fonte = Math.round((base - topo) * 1.55);
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      for (let i = 0; i < 8; i++) {
        ctx.font = `${fonte}px ${FONTE_CURSIVA}`;
        if (ctx.measureText(item).width <= w * 0.84 || fonte <= 24) break;
        fonte = Math.round(fonte * 0.9);
      }
      ctx.font = `${fonte}px ${FONTE_CURSIVA}`;
      const larguraTexto = ctx.measureText(item).width;
      const x = Math.max(10, (w - larguraTexto) / 2);
      const y = base;

      if (revelar < 1) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, x + larguraTexto * revelar, h);
        ctx.clip();
        ctx.fillStyle = "#2563eb";
        ctx.fillText(item, x, y);
        ctx.restore();
      } else {
        // contorno pontilhado + preenchimento bem leve (guia)
        ctx.fillStyle = "rgba(37,99,235,0.08)";
        ctx.fillText(item, x, y);
        ctx.lineWidth = 2;
        ctx.setLineDash([2, 7]);
        ctx.strokeStyle = "#60a5fa";
        ctx.strokeText(item, x, y);
        ctx.setLineDash([]);
      }
    },
    [item],
  );

  const desenharTracos = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1d4ed8";
    for (const seg of tracosRef.current) {
      if (seg.length === 0) continue;
      ctx.beginPath();
      ctx.moveTo(seg[0].x, seg[0].y);
      for (const p of seg) ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  }, []);

  const redesenhar = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { dpr } = tamRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    desenharFundo(ctx);
    desenharTracos(ctx);
  }, [desenharFundo, desenharTracos]);

  // ---- constrói a máscara do modelo (células ocupadas) ----
  const construirModelo = useCallback(() => {
    const { w, h, dpr } = tamRef.current;
    if (!w || !h) return;
    const off = document.createElement("canvas");
    off.width = Math.round(w * dpr);
    off.height = Math.round(h * dpr);
    const ctx = off.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const topo = h * 0.22;
    const base = h * 0.82;
    let fonte = Math.round((base - topo) * 1.55);
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    for (let i = 0; i < 8; i++) {
      ctx.font = `${fonte}px ${FONTE_CURSIVA}`;
      if (ctx.measureText(item).width <= w * 0.84 || fonte <= 24) break;
      fonte = Math.round(fonte * 0.9);
    }
    ctx.font = `${fonte}px ${FONTE_CURSIVA}`;
    const larguraTexto = ctx.measureText(item).width;
    const x = Math.max(10, (w - larguraTexto) / 2);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    ctx.fillText(item, x, base);
    ctx.strokeText(item, x, base);

    const img = ctx.getImageData(0, 0, off.width, off.height).data;
    const cells = new Set<string>();
    for (let py = 0; py < off.height; py += 3) {
      for (let px = 0; px < off.width; px += 3) {
        const alpha = img[(py * off.width + px) * 4 + 3];
        if (alpha > 40) cells.add(cellKey(px / dpr, py / dpr));
      }
    }
    modeloCellsRef.current = cells;
  }, [item]);

  // ---- dimensiona o canvas e (re)constrói o modelo ----
  const ajustar = useCallback(() => {
    const canvas = canvasRef.current;
    const cont = containerRef.current;
    if (!canvas || !cont) return;
    const w = cont.clientWidth;
    const h = Math.round(Math.min(260, Math.max(200, w * 0.62)));
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    tamRef.current = { w, h, dpr };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    construirModelo();
    redesenhar();
  }, [construirModelo, redesenhar]);

  useEffect(() => {
    ajustar();
    window.addEventListener("resize", ajustar);
    return () => window.removeEventListener("resize", ajustar);
  }, [ajustar]);

  // reconstrói quando troca o item
  useEffect(() => {
    tracosRef.current = [];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- limpa o feedback ao trocar de item
    setResultado(null);
    tentativasRef.current = 0;
    inicioRef.current = Date.now();
    construirModelo();
    redesenhar();
  }, [item, construirModelo, redesenhar]);

  // ---- captura do traçado ----
  function pontoDoEvento(e: React.PointerEvent<HTMLCanvasElement>): Ponto {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function onDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (animando) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    desenhandoRef.current = true;
    tracosRef.current.push([pontoDoEvento(e)]);
    redesenhar();
  }
  function onMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!desenhandoRef.current) return;
    const seg = tracosRef.current[tracosRef.current.length - 1];
    seg.push(pontoDoEvento(e));
    redesenhar();
  }
  function onUp() {
    desenhandoRef.current = false;
  }

  // ---- ações ----
  function limpar() {
    tracosRef.current = [];
    setResultado(null);
    redesenhar();
  }

  function comemorar() {
    try {
      const a = new Audio("/sounds/aplauso.mp3");
      a.volume = 0.6;
      a.play().catch(() => {});
    } catch {
      /* sem áudio — feedback visual */
    }
  }

  function registrarMetrica(ok: boolean, pct: number) {
    try {
      const raw = window.localStorage.getItem("davi-escrita-guiada");
      const lista = raw ? (JSON.parse(raw) as unknown[]) : [];
      lista.unshift({
        ts: Date.now(),
        item,
        categoria,
        tentativas: tentativasRef.current,
        tempoMs: Date.now() - inicioRef.current,
        resultado: ok ? "acerto" : "tentar",
        pct,
      });
      window.localStorage.setItem("davi-escrita-guiada", JSON.stringify(lista.slice(0, 300)));
    } catch {
      /* localStorage indisponível */
    }
  }

  function verificar() {
    const modelo = modeloCellsRef.current;
    const userCells = new Set<string>();
    for (const seg of tracosRef.current) {
      for (let i = 0; i < seg.length; i++) {
        userCells.add(cellKey(seg[i].x, seg[i].y));
        if (i > 0) {
          // interpola entre pontos para preencher a linha
          const a = seg[i - 1];
          const b = seg[i];
          const dist = Math.hypot(b.x - a.x, b.y - a.y);
          const passos = Math.ceil(dist / (CELL / 2));
          for (let s = 1; s < passos; s++) {
            const t = s / passos;
            userCells.add(cellKey(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t));
          }
        }
      }
    }

    if (userCells.size < 6 || modelo.size === 0) {
      setResultado({
        ok: false,
        titulo: "Desenhe sobre o pontilhado",
        msg: "Passe o dedo por cima do modelo e toque em Verificar.",
        pct: 0,
      });
      return;
    }

    tentativasRef.current += 1;
    const userDil = dilatar(userCells);
    const modeloDil = dilatar(modelo);

    let cobertos = 0;
    for (const k of modelo) if (userDil.has(k)) cobertos++;
    const cobertura = cobertos / modelo.size;

    let dentro = 0;
    for (const k of userCells) if (modeloDil.has(k)) dentro++;
    const precisao = dentro / userCells.size;

    const score = cobertura * 0.6 + precisao * 0.4;
    const pct = Math.round(cobertura * 100);
    const ok = cobertura >= 0.5 && precisao >= 0.35;

    let titulo: string;
    let msg: string;
    if (ok) {
      if (score >= 0.8) { titulo = "Excelente!"; msg = "Você seguiu muito bem o pontilhado."; }
      else if (score >= 0.62) { titulo = "Muito bem!"; msg = "Você acertou. Continue assim!"; }
      else { titulo = "Bom trabalho!"; msg = "Você conseguiu. Vamos para a próxima?"; }
      falar(`Muito bem! Você escreveu ${item}.`);
      comemorar();
    } else if (cobertura >= 0.32) {
      titulo = "Quase lá!";
      msg = "Tente seguir o pontilhado com calma, do começo ao fim.";
      falar("Quase! Vamos tentar de novo?");
    } else {
      titulo = "Vamos tentar de novo?";
      msg = "Passe o dedo bem em cima do modelo pontilhado.";
      falar("Vamos tentar mais uma vez. Você consegue!");
    }

    setResultado({ ok, titulo, msg, pct });
    registrarMetrica(ok, pct);
    if (ok) onSend?.(`Escreveu: ${item}`, `Escrita guiada · ${pct}%`, "Escrita");
  }

  function verExemplo() {
    if (animando) return;
    setAnimando(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) { setAnimando(false); return; }
    const { dpr } = tamRef.current;
    const dur = 1300;
    const t0 = performance.now();
    const passo = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      desenharFundo(ctx, p);
      desenharTracos(ctx);
      if (p < 1) requestAnimationFrame(passo);
      else {
        setAnimando(false);
        redesenhar();
      }
    };
    requestAnimationFrame(passo);
  }

  function proximo() {
    const lista = CONTEUDO[categoria];
    const idx = lista.indexOf(item);
    setItem(lista[(idx + 1) % lista.length]);
  }

  function trocarCategoria(c: Categoria) {
    setCategoria(c);
    setItem(CONTEUDO[c][0]);
  }

  const btn =
    `min-h-14 rounded-xl px-3 py-3 text-center text-base font-black shadow-sm transition active:scale-[0.98] ${ring}`;

  return (
    <div className="grid gap-4">
      {/* categorias */}
      <div className="grid grid-cols-3 gap-2">
        {(["letras", "silabas", "palavras"] as Categoria[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => trocarCategoria(c)}
            aria-pressed={categoria === c}
            className={`rounded-xl px-2 py-2 text-sm font-black capitalize ${ring} ${
              categoria === c ? "bg-blue-700 text-white" : "bg-white text-zinc-700 ring-1 ring-zinc-200"
            }`}
          >
            {c === "silabas" ? "Sílabas" : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* itens */}
      <div className="flex flex-wrap gap-2">
        {CONTEUDO[categoria].map((it) => (
          <button
            key={it}
            type="button"
            onClick={() => setItem(it)}
            aria-pressed={item === it}
            className={`min-w-12 rounded-xl px-3 py-2 text-lg font-black ${ring} ${
              item === it ? "bg-blue-100 text-blue-800 ring-2 ring-blue-400" : "bg-white text-zinc-700 ring-1 ring-zinc-200"
            }`}
          >
            {it}
          </button>
        ))}
      </div>

      <p className="text-center text-lg font-black text-zinc-900">
        Escreva: <span className="text-blue-700">{item}</span>
      </p>

      {/* área de escrita */}
      <div ref={containerRef} className="w-full">
        <canvas
          ref={canvasRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="w-full touch-none rounded-2xl border-2 border-zinc-200 bg-white shadow-inner"
          aria-label={`Área para escrever ${item} sobre o modelo pontilhado`}
        />
      </div>

      {/* feedback */}
      {resultado && (
        <div
          className={`rounded-xl border-2 p-4 text-center ${
            resultado.ok
              ? "border-green-300 bg-green-50 text-green-800"
              : "border-amber-300 bg-amber-50 text-amber-900"
          }`}
          aria-live="polite"
        >
          <p className="text-lg font-black">
            {resultado.ok ? "🎉 " : "💛 "}{resultado.titulo}
          </p>
          <p className="mt-1 text-sm font-semibold">{resultado.msg}</p>
          {resultado.pct > 0 && (
            <p className="mt-1 text-xs font-black uppercase tracking-wide opacity-70">
              Traçado seguido: {resultado.pct}%
            </p>
          )}
        </div>
      )}

      {/* botões */}
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => falar(item)} className={`${btn} bg-white text-zinc-800 ring-1 ring-zinc-200`}>
          🔊 Ouvir
        </button>
        <button type="button" onClick={verExemplo} className={`${btn} bg-white text-zinc-800 ring-1 ring-zinc-200`}>
          ✍️ Ver exemplo
        </button>
        <button type="button" onClick={limpar} className={`${btn} bg-white text-zinc-800 ring-1 ring-zinc-200`}>
          🧹 Limpar
        </button>
        <button type="button" onClick={verificar} className={`${btn} bg-blue-700 text-white hover:bg-blue-800`}>
          ✓ Verificar
        </button>
        <button type="button" onClick={proximo} className={`${btn} bg-emerald-600 text-white hover:bg-emerald-700`}>
          Próximo →
        </button>
        {onVoltar && (
          <button type="button" onClick={onVoltar} className={`${btn} bg-white text-zinc-800 ring-1 ring-zinc-200`}>
            ← Voltar
          </button>
        )}
      </div>
    </div>
  );
}

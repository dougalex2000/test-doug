"use client";

import { useEffect, useRef, useState } from "react";
import { IconContrast, IconMenu, IconMotion } from "./icons";

const SCALES = [1, 1.1, 1.2, 1.3];
const KEY_SCALE = "davi-a11y-scale";
const KEY_CONTRAST = "davi-a11y-contrast";
const KEY_MOTION = "davi-a11y-motion";

const ring =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1";

/**
 * Barra de acessibilidade (estilo gov.br) presente em todas as páginas:
 * aumento de fonte (A+), alto contraste e um menu com atalhos de navegação,
 * reduzir movimento e redefinir. As escolhas são salvas no localStorage.
 * Os skip links no topo aparecem ao navegar por teclado.
 */
export function AccessibilityToolbar() {
  const [scaleIdx, setScaleIdx] = useState(0);
  const [contrast, setContrast] = useState(false);
  const [motion, setMotion] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Sincroniza o estado com o que o script inline já aplicou ao carregar.
  /* eslint-disable react-hooks/set-state-in-effect -- sincroniza a UI com as preferências salvas (somente no cliente, no mount) */
  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY_SCALE);
      if (s) {
        const i = SCALES.indexOf(Number(s));
        if (i >= 0) setScaleIdx(i);
      }
      setContrast(localStorage.getItem(KEY_CONTRAST) === "1");
      setMotion(localStorage.getItem(KEY_MOTION) === "1");
    } catch {
      /* localStorage indisponível — segue com os padrões */
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function applyScale(idx: number) {
    const v = SCALES[idx];
    document.documentElement.style.setProperty("--font-scale", String(v));
    try {
      localStorage.setItem(KEY_SCALE, String(v));
    } catch {}
  }

  function aumentarFonte() {
    const next = (scaleIdx + 1) % SCALES.length;
    setScaleIdx(next);
    applyScale(next);
  }

  function toggleContrast() {
    const v = !contrast;
    setContrast(v);
    document.documentElement.classList.toggle("high-contrast", v);
    try {
      localStorage.setItem(KEY_CONTRAST, v ? "1" : "0");
    } catch {}
  }

  function toggleMotion() {
    const v = !motion;
    setMotion(v);
    document.documentElement.classList.toggle("davi-reduce-motion", v);
    try {
      localStorage.setItem(KEY_MOTION, v ? "1" : "0");
    } catch {}
  }

  function redefinir() {
    setScaleIdx(0);
    applyScale(0);
    setContrast(false);
    document.documentElement.classList.remove("high-contrast");
    setMotion(false);
    document.documentElement.classList.remove("davi-reduce-motion");
    try {
      localStorage.removeItem(KEY_SCALE);
      localStorage.removeItem(KEY_CONTRAST);
      localStorage.removeItem(KEY_MOTION);
    } catch {}
    setOpen(false);
  }

  // Fecha o menu ao clicar fora ou pressionar Esc.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pct = Math.round(SCALES[scaleIdx] * 100);
  const btn =
    `flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-black text-blue-800 hover:bg-blue-100 ${ring}`;

  return (
    <>
      {/* Skip links — aparecem ao receber foco pelo teclado */}
      <a href="#conteudo-principal" className="skip-link">Ir para o conteúdo</a>
      <a href="#menu-principal" className="skip-link">Ir para o menu</a>
      <a href="#rodape" className="skip-link">Ir para o rodapé</a>

      {/* Barra de acessibilidade */}
      <div className="relative z-[60] border-b border-blue-100 bg-blue-50">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-1 px-4 py-1">
          <span className="mr-auto hidden text-xs font-bold uppercase tracking-wide text-blue-700 sm:inline">
            Acessibilidade
          </span>

          <button
            type="button"
            onClick={aumentarFonte}
            className={btn}
            aria-label={`Aumentar a fonte (atual ${pct}%)`}
            title="Aumentar a fonte"
          >
            A+
          </button>

          <button
            type="button"
            onClick={toggleContrast}
            aria-pressed={contrast}
            className={`${btn} ${contrast ? "bg-blue-700 text-white hover:bg-blue-800" : ""}`}
            aria-label="Ativar ou desativar alto contraste"
            title="Alto contraste"
          >
            <IconContrast className="h-5 w-5" />
            <span className="hidden md:inline">Contraste</span>
          </button>

          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="ac-menu"
            className={btn}
            aria-label="Atalhos de acessibilidade"
            title="Atalhos de acessibilidade"
          >
            <IconMenu className="h-5 w-5" />
            <span className="hidden md:inline">Acessibilidade</span>
          </button>
        </div>

        {open && (
          <div
            id="ac-menu"
            ref={menuRef}
            role="dialog"
            aria-label="Atalhos de acessibilidade"
            className="absolute right-2 top-full z-[70] mt-1 w-[min(92vw,320px)] rounded-xl border border-zinc-200 bg-white p-3 text-zinc-900 shadow-2xl"
          >
            <p className="px-1 text-xs font-black uppercase tracking-wide text-blue-800">
              Ir para
            </p>
            <div className="mt-1 grid gap-1">
              <a href="#conteudo-principal" onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2 text-sm font-bold hover:bg-blue-50 ${ring}`}>
                Ir para o conteúdo principal
              </a>
              <a href="#menu-principal" onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2 text-sm font-bold hover:bg-blue-50 ${ring}`}>
                Ir para o menu
              </a>
              <a href="#rodape" onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2 text-sm font-bold hover:bg-blue-50 ${ring}`}>
                Ir para o rodapé
              </a>
            </div>

            <p className="mt-3 px-1 text-xs font-black uppercase tracking-wide text-blue-800">
              Preferências
            </p>
            <div className="mt-1 grid gap-1">
              <button
                type="button"
                onClick={toggleMotion}
                aria-pressed={motion}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-bold hover:bg-blue-50 ${ring}`}
              >
                <span className="flex items-center gap-2">
                  <IconMotion className="h-4 w-4" /> Reduzir movimento
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-black ${motion ? "bg-green-100 text-green-800" : "bg-zinc-100 text-zinc-600"}`}>
                  {motion ? "Ligado" : "Desligado"}
                </span>
              </button>
              <button
                type="button"
                onClick={redefinir}
                className={`rounded-lg px-3 py-2 text-left text-sm font-bold text-red-700 hover:bg-red-50 ${ring}`}
              >
                Redefinir acessibilidade
              </button>
            </div>

            <p className="mt-3 rounded-lg bg-zinc-50 p-3 text-xs leading-5 text-zinc-600">
              Use <strong>A+</strong> para aumentar a fonte e <strong>Contraste</strong>
              {" "}para o modo de alta legibilidade. Pelo teclado, use Tab para
              navegar, Enter ou Espaço para acionar e Esc para fechar este menu.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

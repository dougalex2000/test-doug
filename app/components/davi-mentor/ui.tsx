"use client";

import type { ReactNode } from "react";

/**
 * Peças visuais compartilhadas pelas telas do DAVI Mentor.
 *
 * O módulo é mobile-first e usado durante atividades do cotidiano: os alvos de
 * toque são grandes (mínimo de 56px de altura), o contraste é alto e nenhum
 * controle essencial depende de gesto fino.
 */

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

/** Botão grande, para uso com uma mão e em movimento. */
export function BigButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const base =
    `flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-base font-black transition ${focusRing} disabled:cursor-not-allowed disabled:opacity-50`;
  const estilos = {
    primary: "bg-blue-700 text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800",
    secondary:
      "border-2 border-zinc-300 bg-white text-zinc-950 hover:border-blue-400 hover:text-blue-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-blue-800 hover:bg-blue-50",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${base} ${estilos}`}
    >
      {children}
    </button>
  );
}

/** Moldura de uma etapa do fluxo, com título e numeração acessível. */
export function StepShell({
  etapa,
  total,
  titulo,
  descricao,
  children,
  rodape,
}: {
  etapa: number;
  total: number;
  titulo: string;
  descricao?: string;
  children: ReactNode;
  rodape?: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
      <p className="text-sm font-black uppercase tracking-wide text-blue-700">
        Etapa {etapa} de {total}
      </p>
      <h1 className="mt-2 text-2xl font-black leading-tight text-zinc-950 sm:text-3xl">
        {titulo}
      </h1>
      {descricao ? (
        <p className="mt-3 text-base leading-7 text-zinc-700">{descricao}</p>
      ) : null}
      <div className="mt-6">{children}</div>
      {rodape ? <div className="mt-8 flex flex-col gap-3">{rodape}</div> : null}
    </section>
  );
}

/** Indicador de estado: usado para câmera, microfone, IA e WebSocket. */
export function StatusChip({
  rotulo,
  estado,
  tom,
}: {
  rotulo: string;
  estado: string;
  tom: "ok" | "alerta" | "erro" | "neutro";
}) {
  const estilos = {
    ok: "bg-green-100 text-green-900 ring-green-300",
    alerta: "bg-amber-100 text-amber-900 ring-amber-300",
    erro: "bg-red-100 text-red-900 ring-red-300",
    neutro: "bg-zinc-100 text-zinc-700 ring-zinc-300",
  }[tom];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ring-1 ${estilos}`}
    >
      <span className="sr-only">{rotulo}: </span>
      <span aria-hidden="true" className="text-[10px] font-normal opacity-70">
        {rotulo}
      </span>
      {estado}
    </span>
  );
}

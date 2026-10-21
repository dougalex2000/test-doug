"use client";

import { focusRing } from "./ui";

/**
 * Mensagem atual do DAVI Mentor.
 *
 * Texto grande e com `aria-live`: quem usa leitor de tela ouve a orientação
 * assim que ela chega, sem precisar procurar na página. Quem não usa pode
 * mandar repetir em voz alta.
 */
export function MentorResponse({
  texto,
  pensando,
  degradado,
  falando,
  ttsDisponivel,
  onRepetir,
  onParar,
}: {
  texto: string;
  pensando: boolean;
  degradado: boolean;
  falando: boolean;
  ttsDisponivel: boolean;
  onRepetir: () => void;
  onParar: () => void;
}) {
  return (
    <div
      className={`rounded-xl border-2 p-5 ${
        degradado ? "border-amber-300 bg-amber-50" : "border-blue-200 bg-blue-50"
      }`}
    >
      <p className="text-xs font-black uppercase tracking-wide text-blue-800">
        DAVI Mentor
      </p>

      <p
        aria-live="polite"
        aria-atomic="true"
        className="mt-2 text-lg leading-8 text-zinc-950 sm:text-xl"
      >
        {pensando ? "Pensando…" : texto || "Toque em um botão ou fale comigo."}
      </p>

      {ttsDisponivel && texto && !pensando ? (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onRepetir}
            className={`min-h-[44px] rounded-lg border-2 border-blue-300 bg-white px-4 py-2 text-sm font-black text-blue-800 hover:bg-blue-100 ${focusRing}`}
          >
            Ouvir de novo
          </button>
          {falando ? (
            <button
              type="button"
              onClick={onParar}
              className={`min-h-[44px] rounded-lg border-2 border-zinc-300 bg-white px-4 py-2 text-sm font-black text-zinc-800 hover:bg-zinc-100 ${focusRing}`}
            >
              Parar voz
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

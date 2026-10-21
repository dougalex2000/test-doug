"use client";

import type { RefCallback } from "react";
import type { CameraState } from "./hooks/useMentorCamera";
import { focusRing } from "./ui";

/**
 * Visualização da câmera.
 *
 * O vídeo permanece inteiramente no aparelho — nada é transmitido. A área é
 * generosa de propósito: em uso real a pessoa precisa enquadrar o ambiente
 * olhando a tela de relance.
 */
export function MentorCamera({
  videoRef,
  state,
  onIniciar,
  onParar,
  onTrocar,
}: {
  videoRef: RefCallback<HTMLVideoElement>;
  state: CameraState;
  onIniciar: () => void;
  onParar: () => void;
  onTrocar: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-zinc-800 bg-zinc-950">
      <div className="relative aspect-[4/3] w-full sm:aspect-video">
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          aria-label="Imagem da câmera do aparelho"
          className={`h-full w-full object-cover ${state.ativa ? "" : "opacity-0"}`}
        />

        {!state.ativa ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-base font-bold text-zinc-300">
              {state.carregando
                ? "Abrindo a câmera…"
                : state.erro
                  ? state.erro
                  : "Câmera desligada."}
            </p>
            {!state.carregando && state.suportada ? (
              <button
                type="button"
                onClick={onIniciar}
                className={`min-h-[48px] rounded-lg bg-white px-5 py-3 text-sm font-black text-zinc-950 hover:bg-zinc-200 ${focusRing}`}
              >
                Ativar câmera
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {state.ativa ? (
        <div className="flex gap-2 border-t border-zinc-800 bg-zinc-900 p-2">
          <button
            type="button"
            onClick={onTrocar}
            className={`min-h-[44px] flex-1 rounded-lg bg-zinc-800 px-3 py-2 text-sm font-black text-white hover:bg-zinc-700 ${focusRing}`}
          >
            Trocar câmera
          </button>
          <button
            type="button"
            onClick={onParar}
            className={`min-h-[44px] flex-1 rounded-lg bg-zinc-800 px-3 py-2 text-sm font-black text-white hover:bg-zinc-700 ${focusRing}`}
          >
            Desativar
          </button>
        </div>
      ) : null}
    </div>
  );
}

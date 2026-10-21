"use client";

import { useSyncExternalStore } from "react";

/**
 * Detecção de recurso do navegador sem causar renderização em cascata.
 *
 * Fazer isso com useState + useEffect dispara um render extra e é sinalizado
 * pelo lint do React. useSyncExternalStore é o mecanismo próprio para ler algo
 * que vive fora do React — aqui, a capacidade do navegador.
 *
 * No servidor assumimos suportado: evita que a interface pisque mostrando
 * "indisponível" durante a hidratação, antes de saber a resposta real.
 */

/** A capacidade não muda durante a vida da página: nada a assinar. */
const semInscricao = () => () => {};

export function useFeatureSupport(check: () => boolean): boolean {
  return useSyncExternalStore(
    semInscricao,
    check,
    () => true,
  );
}

export const temGetUserMedia = () =>
  typeof navigator !== "undefined" &&
  typeof navigator.mediaDevices?.getUserMedia === "function";

export const temSpeechSynthesis = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

export const temSpeechRecognition = () => {
  if (typeof window === "undefined") return false;
  const w = window as unknown as {
    SpeechRecognition?: unknown;
    webkitSpeechRecognition?: unknown;
  };
  return Boolean(w.SpeechRecognition ?? w.webkitSpeechRecognition);
};

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { temSpeechSynthesis, useFeatureSupport } from "./useFeatureSupport";

/**
 * Voz do DAVI Mentor (TTS).
 *
 * Primeira versão com a SpeechSynthesis API do próprio navegador. A assinatura
 * (falar / repetir / parar / velocidade) é a abstração TTS_PROVIDER: trocar por
 * RHVoice, Kokoro ou Coqui depois não deve exigir mudança nos componentes.
 *
 * Fone Bluetooth: nada a fazer aqui. Quando há fone pareado, o próprio sistema
 * operacional do celular direciona a saída de áudio — por isso a especificação
 * pede para não implementar protocolo Bluetooth próprio nesta versão.
 */

export type TtsProvider = "web-speech" | "indisponivel";

const VELOCIDADE_PADRAO = 1;

export function useSpeechSynthesis() {
  const ultimaRef = useRef<string>("");
  const suportado = useFeatureSupport(temSpeechSynthesis);
  const provider: TtsProvider = suportado ? "web-speech" : "indisponivel";
  const [falando, setFalando] = useState(false);
  const [velocidade, setVelocidade] = useState(VELOCIDADE_PADRAO);

  const parar = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setFalando(false);
  }, []);

  const falar = useCallback(
    (texto: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      const limpo = texto.trim();
      if (!limpo) return;

      ultimaRef.current = limpo;
      // Cancela a fala anterior: duas vozes sobrepostas são inutilizáveis.
      window.speechSynthesis.cancel();

      const fala = new SpeechSynthesisUtterance(limpo);
      fala.lang = "pt-BR";
      fala.rate = velocidade;
      const vozPt = window.speechSynthesis
        .getVoices()
        .find((v) => v.lang?.toLowerCase().startsWith("pt"));
      if (vozPt) fala.voice = vozPt;

      fala.onstart = () => setFalando(true);
      fala.onend = () => setFalando(false);
      fala.onerror = () => setFalando(false);

      window.speechSynthesis.speak(fala);
    },
    [velocidade],
  );

  const repetir = useCallback(() => {
    if (ultimaRef.current) falar(ultimaRef.current);
  }, [falar]);

  // Não deixa a voz continuar depois que a pessoa sai da tela.
  useEffect(() => () => parar(), [parar]);

  return { provider, falando, velocidade, setVelocidade, falar, repetir, parar };
}

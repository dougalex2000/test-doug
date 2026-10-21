"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { temSpeechRecognition, useFeatureSupport } from "./useFeatureSupport";

/**
 * Reconhecimento de fala (STT) no modo "segure para falar".
 *
 * Esta versão usa a Web Speech API, disponível no Chrome/Android. A interface
 * exportada é propositalmente genérica (iniciar / parar / transcript) para que
 * um provedor local — Whisper, faster-whisper, servidor STT do projeto — possa
 * substituí-la sem alterar os componentes.
 *
 * STT_PROVIDER indica qual implementação está ativa.
 */

export type SttProvider = "web-speech" | "indisponivel";

/** Tipagem mínima da Web Speech API, que não está no lib.dom padrão. */
type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: { transcript: string };
};
type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: { length: number; [i: number]: SpeechRecognitionResultLike };
};
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
};
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function useSpeechRecognition(onFinal?: (texto: string) => void) {
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const finalRef = useRef<(texto: string) => void>(() => {});
  const suportado = useFeatureSupport(temSpeechRecognition);
  const provider: SttProvider = suportado ? "web-speech" : "indisponivel";
  const [ouvindo, setOuvindo] = useState(false);
  const [parcial, setParcial] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    finalRef.current = onFinal ?? (() => {});
  }, [onFinal]);

  const parar = useCallback(() => {
    try {
      recRef.current?.stop();
    } catch {
      // stop() em reconhecimento já parado lança; irrelevante aqui.
    }
    setOuvindo(false);
  }, []);

  const iniciar = useCallback(() => {
    const Ctor = getCtor();
    if (!Ctor) {
      setErro("Este navegador não reconhece fala. Você pode digitar a mensagem.");
      return false;
    }
    try {
      const rec = new Ctor();
      rec.lang = "pt-BR";
      rec.continuous = false;
      rec.interimResults = true;

      rec.onresult = (event) => {
        let parcialTexto = "";
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const r = event.results[i];
          const texto = r[0].transcript;
          if (r.isFinal) {
            const limpo = texto.trim();
            if (limpo) finalRef.current(limpo);
            parcialTexto = "";
          } else {
            parcialTexto += texto;
          }
        }
        setParcial(parcialTexto);
      };

      rec.onerror = (e) => {
        const codigo = e?.error ?? "";
        setErro(
          codigo === "not-allowed"
            ? "Permissão de microfone negada. Você pode digitar a mensagem."
            : codigo === "no-speech"
              ? "Não ouvi nada. Tente novamente."
              : "Não foi possível reconhecer a fala.",
        );
        setOuvindo(false);
      };

      rec.onend = () => {
        setOuvindo(false);
        setParcial("");
      };

      recRef.current = rec;
      setErro(null);
      setParcial("");
      rec.start();
      setOuvindo(true);
      return true;
    } catch {
      setErro("Não foi possível iniciar o microfone.");
      return false;
    }
  }, []);

  useEffect(
    () => () => {
      try {
        recRef.current?.abort();
      } catch {
        // Componente desmontando; nada a fazer.
      }
    },
    [],
  );

  return { provider, ouvindo, parcial, erro, iniciar, parar };
}

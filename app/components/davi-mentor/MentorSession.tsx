"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CricketLogo } from "../CricketLogo";
import {
  applyProfile,
  createContext,
  rememberInteraction,
  updateWorld,
} from "../../lib/cricket/context";
import type {
  AssistanceLevel,
  CricketContext,
  MentorCapability,
  MentorProfile,
  MentorRequest,
  MentorResponse as MentorResponseType,
} from "../../lib/cricket/types";
import { useMentorCamera } from "./hooks/useMentorCamera";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";
import { useCricketWebSocket } from "./hooks/useCricketWebSocket";
import {
  MentorCapabilitiesStep,
  MentorInteractionLevelStep,
  MentorPermissionsStep,
  MentorProfileStep,
} from "./MentorSteps";
import { MentorCamera } from "./MentorCamera";
import { MentorControls, type Acao } from "./MentorControls";
import { MentorResponse } from "./MentorResponse";
import {
  MentorConnectionStatus,
  type OllamaStatus,
} from "./MentorConnectionStatus";
import { CricketContextPanel } from "./CricketContextPanel";
import { BigButton, focusRing } from "./ui";

/**
 * Orquestrador da sessão do DAVI Mentor.
 *
 * Detém o estado da sessão e liga as peças: perfil → nível → capacidades →
 * permissões → interface operacional. É o único lugar que fala com o gateway
 * (/api/davi-mentor/chat); os componentes de tela são apresentação.
 *
 * Nada é persistido no servidor nesta versão: a sessão vive na memória da aba.
 */

type Etapa = "perfil" | "nivel" | "capacidades" | "permissoes" | "operacional";

const PASSOS: Etapa[] = ["perfil", "nivel", "capacidades", "permissoes", "operacional"];

function novoSessionId() {
  return `cricket-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function MentorSession({
  profileInicial,
  viaQrCode,
  modoPesquisador,
}: {
  profileInicial: MentorProfile;
  viaQrCode: boolean;
  modoPesquisador: boolean;
}) {
  const [sessionId] = useState(novoSessionId);
  const [etapa, setEtapa] = useState<Etapa>("perfil");
  const [profile, setProfile] = useState<MentorProfile>(profileInicial);
  const [context, setContext] = useState<CricketContext>(() =>
    createContext(profileInicial),
  );

  const [resposta, setResposta] = useState("");
  const [pensando, setPensando] = useState(false);
  const [degradado, setDegradado] = useState(false);
  const [painelAberto, setPainelAberto] = useState(false);
  const [microfoneAutorizado, setMicrofoneAutorizado] = useState(false);
  const [erroMicrofone, setErroMicrofone] = useState<string | null>(null);
  const [textoDigitado, setTextoDigitado] = useState("");
  const [ollama, setOllama] = useState<OllamaStatus>(null);

  const camera = useMentorCamera();
  const tts = useSpeechSynthesis();
  const ws = useCricketWebSocket(sessionId, etapa === "operacional");

  // Mantém o contexto sincronizado com o perfil editado nas etapas.
  useEffect(() => {
    setContext((atual) => applyProfile(atual, profile));
  }, [profile]);

  /* ---------------------------------------------------------------- */
  /* Estado da IA                                                      */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (etapa !== "operacional") return;
    let ativo = true;

    const verificar = async () => {
      try {
        const res = await fetch("/api/davi-mentor/status", { cache: "no-store" });
        const dados = (await res.json()) as OllamaStatus;
        if (ativo) setOllama(dados);
      } catch {
        if (ativo) setOllama({ online: false, model: "-", modelAvailable: false });
      }
    };

    void verificar();
    // Revalida de tempos em tempos: o servidor de modelo pode voltar sozinho.
    const timer = setInterval(verificar, 30_000);
    return () => {
      ativo = false;
      clearInterval(timer);
    };
  }, [etapa]);

  /* ---------------------------------------------------------------- */
  /* Conversa com o gateway                                            */
  /* ---------------------------------------------------------------- */

  const contextRef = useRef(context);
  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const perguntar = useCallback(
    async (mensagem: string, acao?: Acao) => {
      const texto = mensagem.trim();
      if (!texto || pensando) return;
      if (acao?.usaImagem && (!camera.state.ativa || !camera.capturarFrame())) {
        setResposta("Ative a câmera e aguarde a imagem aparecer antes de pedir uma análise.");
        setDegradado(true);
        return;
      }

      setPensando(true);
      setResposta("");
      setDegradado(false);
      tts.parar();

      // O frame só é capturado quando a ação pede imagem (item 9).
      let imageDataUrl: string | undefined;
      if (acao?.usaImagem && camera.state.ativa) {
        imageDataUrl = camera.capturarFrame() ?? undefined;
        if (imageDataUrl) {
          setContext((c) => updateWorld(c, {}));
          ws.enviar("camera.frame", { capturado: true });
        }
      }

      const corpo: MentorRequest = {
        sessionId,
        timestamp: new Date().toISOString(),
        payload: {
          userMessage: texto,
          action: acao?.id,
          context: contextRef.current,
          imageDataUrl,
        },
      };

      ws.enviar("mentor.request", { userMessage: texto, action: acao?.id });

      try {
        const res = await fetch("/api/davi-mentor/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(corpo),
        });
        const dados = (await res.json()) as MentorResponseType;

        setResposta(dados.text);
        setDegradado(dados.degraded);
        if (contextRef.current.eu.capabilities.includes("memoria-recente")) {
          setContext((c) => rememberInteraction(c, `${texto} → ${dados.text}`));
        }
        ws.enviar(dados.degraded ? "mentor.error" : "mentor.response", {
          text: dados.text,
        });

        // Fala a resposta automaticamente: o uso previsto é com fone, em movimento.
        if (!dados.degraded) tts.falar(dados.text);
      } catch {
        setResposta(
          "Não consegui falar com o DAVI Mentor agora. Verifique a conexão e tente de novo.",
        );
        setDegradado(true);
        ws.enviar("mentor.error", { motivo: "falha de rede" });
      } finally {
        setPensando(false);
      }
    },
    [pensando, camera, sessionId, tts, ws],
  );

  const aoTranscrever = useCallback(
    (texto: string) => {
      ws.enviar("audio.transcript", { texto });
      void perguntar(texto);
    },
    [perguntar, ws],
  );

  const stt = useSpeechRecognition(aoTranscrever);

  /* ---------------------------------------------------------------- */
  /* Permissões                                                        */
  /* ---------------------------------------------------------------- */

  const pedirMicrofone = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setErroMicrofone("Este navegador não permite acesso ao microfone.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // A permissão é o que importa; o reconhecimento usa seu próprio fluxo.
      stream.getTracks().forEach((t) => t.stop());
      setMicrofoneAutorizado(true);
      setErroMicrofone(null);
    } catch {
      setMicrofoneAutorizado(false);
      setErroMicrofone("Permissão de microfone negada.");
    }
  }, []);

  /* ---------------------------------------------------------------- */
  /* Navegação entre etapas                                            */
  /* ---------------------------------------------------------------- */

  const irPara = useCallback((destino: Etapa) => {
    setEtapa(destino);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, []);

  const avancar = useCallback(() => {
    const i = PASSOS.indexOf(etapa);
    irPara(PASSOS[Math.min(i + 1, PASSOS.length - 1)]);
  }, [etapa, irPara]);

  const voltar = useCallback(() => {
    const i = PASSOS.indexOf(etapa);
    irPara(PASSOS[Math.max(i - 1, 0)]);
  }, [etapa, irPara]);

  const alternarCapacidade = useCallback((id: MentorCapability) => {
    setProfile((p) => ({
      ...p,
      capabilities: p.capabilities.includes(id)
        ? p.capabilities.filter((c) => c !== id)
        : [...p.capabilities, id],
    }));
  }, []);

  const definirNivel = useCallback((nivel: AssistanceLevel) => {
    setProfile((p) => ({ ...p, assistanceLevel: nivel }));
  }, []);

  const encerrar = useCallback(() => {
    ws.enviar("session.stop", { sessionId });
    tts.parar();
    stt.parar();
    camera.parar();
    irPara("perfil");
    setResposta("");
  }, [ws, sessionId, tts, stt, camera, irPara]);

  const cabecalho = useMemo(
    () => (
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            href="/davi-mentor"
            aria-label="Sair da sessão e voltar ao início do DAVI Mentor"
            className={`shrink-0 rounded-lg ${focusRing}`}
          >
            <CricketLogo size="xs" decorative />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-black leading-tight text-zinc-950">
              DAVI Mentor
            </p>
            <p className="truncate text-xs font-semibold text-zinc-600">
              {profile.preferredName} · nível {profile.assistanceLevel}
            </p>
          </div>
        </div>
      </header>
    ),
    [profile.preferredName, profile.assistanceLevel],
  );

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  if (etapa !== "operacional") {
    return (
      <div className="min-h-screen bg-[#F6F8FB] pb-12">
        {cabecalho}
        {etapa === "perfil" ? (
          <MentorProfileStep
            profile={profile}
            viaQrCode={viaQrCode}
            onContinuar={avancar}
          />
        ) : null}
        {etapa === "nivel" ? (
          <MentorInteractionLevelStep
            valor={profile.assistanceLevel}
            onEscolher={definirNivel}
            onContinuar={avancar}
            onVoltar={voltar}
          />
        ) : null}
        {etapa === "capacidades" ? (
          <MentorCapabilitiesStep
            selecionadas={profile.capabilities}
            onAlternar={alternarCapacidade}
            onContinuar={avancar}
            onVoltar={voltar}
          />
        ) : null}
        {etapa === "permissoes" ? (
          <MentorPermissionsStep
            cameraAtiva={camera.state.ativa}
            microfoneAtivo={microfoneAutorizado}
            erroCamera={camera.state.erro}
            erroMicrofone={erroMicrofone}
            onPedirCamera={() => void camera.iniciar()}
            onPedirMicrofone={() => void pedirMicrofone()}
            onContinuar={avancar}
            onVoltar={voltar}
          />
        ) : null}
      </div>
    );
  }

  const podeFalar = stt.provider === "web-speech" && microfoneAutorizado;

  return (
    <div className="min-h-screen bg-[#F6F8FB] pb-16">
      {cabecalho}
      <MentorConnectionStatus
        ws={ws.estado}
        wsConfigurado={ws.configurado}
        ollama={ollama}
        cameraAtiva={camera.state.ativa}
        microfoneAtivo={microfoneAutorizado}
      />

      <main className="mx-auto grid w-full max-w-2xl gap-4 px-4 py-4 sm:px-6">
        <MentorCamera
          videoRef={camera.videoRef}
          state={camera.state}
          onIniciar={() => void camera.iniciar()}
          onParar={camera.parar}
          onTrocar={() => void camera.trocar()}
        />

        <MentorResponse
          texto={resposta}
          pensando={pensando}
          degradado={degradado}
          falando={tts.falando}
          ttsDisponivel={tts.provider === "web-speech"}
          onRepetir={tts.repetir}
          onParar={tts.parar}
        />

        {stt.ouvindo && stt.parcial ? (
          <p className="rounded-lg bg-white p-3 text-sm italic text-zinc-600 ring-1 ring-zinc-200">
            {stt.parcial}
          </p>
        ) : null}

        <MentorControls
          capacidades={profile.capabilities}
          ocupado={pensando}
          ouvindo={stt.ouvindo}
          falando={tts.falando}
          onAcao={(acao) => void perguntar(acao.mensagem, acao)}
          onFalar={() => {
            if (!podeFalar) {
              setErroMicrofone(
                "O microfone não está disponível. Use o campo de texto abaixo.",
              );
              return;
            }
            if (stt.ouvindo) stt.parar();
            else stt.iniciar();
          }}
          onParar={() => {
            stt.parar();
            tts.parar();
          }}
        />

        {stt.erro || erroMicrofone ? (
          <p className="rounded-lg bg-amber-50 p-3 text-sm font-semibold text-amber-950 ring-1 ring-amber-200">
            {stt.erro ?? erroMicrofone}
          </p>
        ) : null}

        {/* Alternativa sempre disponível: digitar em vez de falar (item 24). */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const t = textoDigitado;
            setTextoDigitado("");
            void perguntar(t);
          }}
          className="flex gap-2"
        >
          <label htmlFor="mentor-texto" className="sr-only">
            Escreva sua mensagem para o DAVI Mentor
          </label>
          <input
            id="mentor-texto"
            value={textoDigitado}
            onChange={(e) => setTextoDigitado(e.target.value)}
            placeholder="Ou escreva aqui…"
            className={`min-h-[56px] flex-1 rounded-xl border-2 border-zinc-300 bg-white px-4 text-base text-zinc-950 ${focusRing}`}
          />
          <button
            type="submit"
            disabled={pensando || !textoDigitado.trim()}
            className={`min-h-[56px] shrink-0 rounded-xl bg-blue-700 px-5 font-black text-white hover:bg-blue-800 disabled:opacity-40 ${focusRing}`}
          >
            Enviar
          </button>
        </form>

        {modoPesquisador ? (
          <CricketContextPanel
            context={context}
            aberto={painelAberto}
            onAlternar={() => setPainelAberto((a) => !a)}
          />
        ) : null}

        <div className="mt-2 grid gap-2">
          <BigButton variant="secondary" onClick={() => irPara("capacidades")}>
            Ajustar funções e nível
          </BigButton>
          <BigButton variant="ghost" onClick={encerrar}>
            Encerrar sessão
          </BigButton>
        </div>
      </main>
    </div>
  );
}

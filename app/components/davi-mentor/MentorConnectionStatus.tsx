"use client";

import type { ConnectionState } from "../../lib/cricket/types";
import { StatusChip } from "./ui";

export type OllamaStatus = {
  online: boolean;
  model: string;
  modelAvailable: boolean;
} | null;

/**
 * Faixa de estado do sistema (item 8 da especificação).
 *
 * Transparência é requisito de acessibilidade aqui: a pessoa precisa saber se
 * a câmera está ligada, se o microfone escuta e se a IA está respondendo —
 * sem precisar deduzir pelo comportamento.
 */
export function MentorConnectionStatus({
  ws,
  wsConfigurado,
  ollama,
  cameraAtiva,
  microfoneAtivo,
}: {
  ws: ConnectionState;
  wsConfigurado: boolean;
  ollama: OllamaStatus;
  cameraAtiva: boolean;
  microfoneAtivo: boolean;
}) {
  const wsEstado = !wsConfigurado ? "não configurado" : ws;
  const wsTom = !wsConfigurado
    ? "neutro"
    : ws === "conectado"
      ? "ok"
      : ws === "reconectando"
        ? "alerta"
        : "erro";

  const iaEstado = !ollama
    ? "verificando"
    : ollama.online && ollama.modelAvailable
      ? "conectada"
      : ollama.online
        ? "modelo ausente"
        : "offline";
  const iaTom = !ollama
    ? "neutro"
    : ollama.online && ollama.modelAvailable
      ? "ok"
      : ollama.online
        ? "alerta"
        : "erro";

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-wrap items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-2"
    >
      <StatusChip rotulo="IA" estado={iaEstado} tom={iaTom} />
      <StatusChip rotulo="WebSocket" estado={wsEstado} tom={wsTom} />
      <StatusChip
        rotulo="Câmera"
        estado={cameraAtiva ? "ativa" : "desativada"}
        tom={cameraAtiva ? "ok" : "neutro"}
      />
      <StatusChip
        rotulo="Microfone"
        estado={microfoneAtivo ? "ativo" : "desativado"}
        tom={microfoneAtivo ? "ok" : "neutro"}
      />
    </div>
  );
}

"use client";

import type { CricketContext } from "../../lib/cricket/types";
import { focusRing } from "./ui";

/**
 * Painel de pesquisa: mostra exatamente o que o CRICKET sabe nas três esferas
 * (item 18 da especificação).
 *
 * Fica oculto para quem apenas usa o Mentor, e disponível no Modo Pesquisador.
 * Serve para auditar o que foi enviado ao modelo — útil em pesquisa, em
 * avaliação de ética e para explicar o sistema a famílias e profissionais.
 */

function Bloco({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-zinc-200 pt-4 first:border-t-0 first:pt-0">
      <p className="text-xs font-black uppercase tracking-wide text-blue-700">
        {titulo}
      </p>
      <dl className="mt-2 grid gap-1.5 text-sm">{children}</dl>
    </div>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex flex-wrap gap-x-2">
      <dt className="font-bold text-zinc-600">{rotulo}:</dt>
      <dd className="text-zinc-900">{valor || "—"}</dd>
    </div>
  );
}

export function CricketContextPanel({
  context,
  aberto,
  onAlternar,
}: {
  context: CricketContext;
  aberto: boolean;
  onAlternar: () => void;
}) {
  const { eu, outros, mundo } = context;

  return (
    <section className="rounded-xl border-2 border-zinc-200 bg-white">
      <button
        type="button"
        onClick={onAlternar}
        aria-expanded={aberto}
        className={`flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl px-5 py-4 text-left ${focusRing}`}
      >
        <span className="text-base font-black text-zinc-950">
          Visualizar contexto CRICKET
        </span>
        <span aria-hidden="true" className="text-xl text-zinc-500">
          {aberto ? "−" : "+"}
        </span>
      </button>

      {aberto ? (
        <div className="grid gap-4 border-t border-zinc-200 p-5">
          <Bloco titulo="EU">
            <Linha rotulo="Nome" valor={eu.preferredName} />
            <Linha rotulo="Nível" valor={eu.assistanceLevel} />
            <Linha rotulo="Objetivo" valor={eu.currentGoal} />
            <Linha rotulo="Tarefa" valor={eu.activeTask || "Nenhuma"} />
            <Linha rotulo="Funções ativas" valor={String(eu.capabilities.length)} />
            <Linha
              rotulo="Memória recente"
              valor={
                eu.recentMemory.length
                  ? `${eu.recentMemory.length} registro(s)`
                  : "Vazia"
              }
            />
          </Bloco>

          <Bloco titulo="OUTROS">
            <Linha
              rotulo="Pessoas"
              valor={
                outros.detectedPeople.length
                  ? `${outros.detectedPeople.length} detectada(s)`
                  : "Nenhuma detectada"
              }
            />
            <Linha
              rotulo="Reconhecimento"
              valor={
                outros.recognitionConfidence === null
                  ? "Não aplicável"
                  : outros.needsConfirmation
                    ? `Não confirmado (${Math.round(outros.recognitionConfidence * 100)}%)`
                    : `Provável (${Math.round(outros.recognitionConfidence * 100)}%)`
              }
            />
            <Linha rotulo="Contexto social" valor={outros.socialContext} />
          </Bloco>

          <Bloco titulo="MUNDO">
            <Linha
              rotulo="Ambiente"
              valor={mundo.sceneDescription || "Ainda não analisado"}
            />
            <Linha rotulo="Objetos" valor={mundo.objects.join(", ")} />
            <Linha rotulo="Textos" valor={mundo.detectedText.join(" | ")} />
            <Linha
              rotulo="Riscos"
              valor={mundo.possibleRisks.join(", ") || "Nenhum detectado"}
            />
            <Linha rotulo="Localização" valor={mundo.locationContext} />
            <Linha
              rotulo="Última análise"
              valor={
                mundo.lastAnalysisAt
                  ? new Date(mundo.lastAnalysisAt).toLocaleTimeString("pt-BR")
                  : "Nunca"
              }
            />
          </Bloco>
        </div>
      ) : null}
    </section>
  );
}

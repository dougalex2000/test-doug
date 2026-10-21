"use client";

import {
  ASSISTANCE_LEVELS,
  MENTOR_CAPABILITIES,
  type AssistanceLevel,
  type MentorCapability,
  type MentorProfile,
} from "../../lib/cricket/types";
import { BigButton, StepShell, focusRing } from "./ui";

/**
 * Telas 2 a 5 do fluxo: perfil, nível de assistência, capacidades cognitivas e
 * consentimento de câmera/microfone.
 *
 * Todas seguem o mesmo contrato: recebem o estado atual e devolvem a escolha
 * para o orquestrador (MentorSession), que é quem detém a sessão.
 */

const TOTAL_ETAPAS = 5;

/* ------------------------------------------------------------------ */
/* TELA 2 — Perfil assistivo                                           */
/* ------------------------------------------------------------------ */

export function MentorProfileStep({
  profile,
  viaQrCode,
  onContinuar,
}: {
  profile: MentorProfile;
  viaQrCode: boolean;
  onContinuar: () => void;
}) {
  return (
    <StepShell
      etapa={1}
      total={TOTAL_ETAPAS}
      titulo="Perfil assistivo"
      descricao={
        viaQrCode
          ? "Perfil carregado a partir do QR Code."
          : "Nenhum QR Code foi usado. Seguindo com o perfil de demonstração."
      }
    >
      <div className="rounded-xl border-2 border-zinc-200 bg-white p-5">
        <dl className="grid gap-4">
          <div>
            <dt className="text-xs font-black uppercase tracking-wide text-zinc-500">
              Nome preferido
            </dt>
            <dd className="mt-1 text-xl font-black text-zinc-950">
              {profile.preferredName}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-black uppercase tracking-wide text-zinc-500">
              Identificador
            </dt>
            <dd className="mt-1 font-mono text-base font-bold text-zinc-800">
              {profile.id}
            </dd>
          </div>
          {profile.currentGoal ? (
            <div>
              <dt className="text-xs font-black uppercase tracking-wide text-zinc-500">
                Objetivo atual
              </dt>
              <dd className="mt-1 text-base text-zinc-800">{profile.currentGoal}</dd>
            </div>
          ) : null}
          {profile.routine?.length ? (
            <div>
              <dt className="text-xs font-black uppercase tracking-wide text-zinc-500">
                Rotina
              </dt>
              <dd className="mt-1">
                <ul className="list-inside list-disc text-base text-zinc-800">
                  {profile.routine.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>

      {profile.isDemo ? (
        <p className="mt-4 rounded-lg bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950 ring-1 ring-amber-200">
          Perfil de demonstração. Não corresponde a nenhuma pessoa real e não
          guarda dados.
        </p>
      ) : null}

      <div className="mt-6">
        <BigButton onClick={onContinuar}>Continuar</BigButton>
      </div>
    </StepShell>
  );
}

/* ------------------------------------------------------------------ */
/* TELA 3 — Nível de assistência                                       */
/* ------------------------------------------------------------------ */

export function MentorInteractionLevelStep({
  valor,
  onEscolher,
  onContinuar,
  onVoltar,
}: {
  valor: AssistanceLevel;
  onEscolher: (nivel: AssistanceLevel) => void;
  onContinuar: () => void;
  onVoltar: () => void;
}) {
  return (
    <StepShell
      etapa={2}
      total={TOTAL_ETAPAS}
      titulo="Nível de assistência"
      descricao="Quanto o DAVI Mentor deve intervir por conta própria. Pode ser mudado a qualquer momento."
      rodape={
        <>
          <BigButton onClick={onContinuar}>Continuar</BigButton>
          <BigButton variant="ghost" onClick={onVoltar}>
            Voltar
          </BigButton>
        </>
      }
    >
      <fieldset>
        <legend className="sr-only">Escolha o nível de assistência</legend>
        <div className="grid gap-3">
          {ASSISTANCE_LEVELS.map((nivel) => {
            const ativo = valor === nivel.id;
            return (
              <label
                key={nivel.id}
                className={`block cursor-pointer rounded-xl border-2 p-5 transition ${focusRing} ${
                  ativo
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                    : "border-zinc-200 bg-white hover:border-blue-300"
                }`}
              >
                <span className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="nivel-assistencia"
                    value={nivel.id}
                    checked={ativo}
                    onChange={() => onEscolher(nivel.id)}
                    className="mt-1 h-5 w-5 shrink-0 accent-blue-700"
                  />
                  <span className="min-w-0">
                    <span className="block text-lg font-black text-zinc-950">
                      {nivel.nome}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-zinc-700">
                      {nivel.resumo}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {nivel.comportamento.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-zinc-300 bg-white px-2.5 py-0.5 text-xs font-bold text-zinc-700"
                        >
                          {c}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </StepShell>
  );
}

/* ------------------------------------------------------------------ */
/* TELA 4 — Capacidades cognitivas                                     */
/* ------------------------------------------------------------------ */

const ROTULO_ESFERA = { eu: "EU", outros: "OUTROS", mundo: "MUNDO" } as const;

export function MentorCapabilitiesStep({
  selecionadas,
  onAlternar,
  onContinuar,
  onVoltar,
}: {
  selecionadas: MentorCapability[];
  onAlternar: (id: MentorCapability) => void;
  onContinuar: () => void;
  onVoltar: () => void;
}) {
  return (
    <StepShell
      etapa={3}
      total={TOTAL_ETAPAS}
      titulo="Funções cognitivas"
      descricao="Ligue apenas o que fizer sentido para você. Tudo pode ser alterado depois."
      rodape={
        <>
          <BigButton onClick={onContinuar}>Continuar</BigButton>
          <BigButton variant="ghost" onClick={onVoltar}>
            Voltar
          </BigButton>
        </>
      }
    >
      <p className="mb-4 text-sm font-bold text-zinc-600">
        {selecionadas.length} de {MENTOR_CAPABILITIES.length} ativadas
      </p>
      <ul className="grid gap-2.5">
        {MENTOR_CAPABILITIES.map((cap) => {
          const ativa = selecionadas.includes(cap.id);
          return (
            <li key={cap.id}>
              <button
                type="button"
                role="switch"
                aria-checked={ativa}
                onClick={() => onAlternar(cap.id)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition ${focusRing} ${
                  ativa
                    ? "border-green-500 bg-green-50"
                    : "border-zinc-200 bg-white hover:border-zinc-300"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition ${
                    ativa ? "bg-green-600" : "bg-zinc-300"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white transition ${
                      ativa ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-black text-zinc-950">
                    {cap.nome}
                  </span>
                  <span className="block text-sm leading-5 text-zinc-600">
                    {cap.descricao}
                  </span>
                </span>
                <span className="shrink-0 rounded border border-zinc-300 px-1.5 py-0.5 text-[10px] font-black text-zinc-500">
                  {ROTULO_ESFERA[cap.esfera]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </StepShell>
  );
}

/* ------------------------------------------------------------------ */
/* TELA 5 — Permissões e consentimento                                 */
/* ------------------------------------------------------------------ */

export function MentorPermissionsStep({
  cameraAtiva,
  microfoneAtivo,
  erroCamera,
  erroMicrofone,
  onPedirCamera,
  onPedirMicrofone,
  onContinuar,
  onVoltar,
}: {
  cameraAtiva: boolean;
  microfoneAtivo: boolean;
  erroCamera: string | null;
  erroMicrofone: string | null;
  onPedirCamera: () => void;
  onPedirMicrofone: () => void;
  onContinuar: () => void;
  onVoltar: () => void;
}) {
  return (
    <StepShell
      etapa={4}
      total={TOTAL_ETAPAS}
      titulo="Câmera e microfone"
      rodape={
        <>
          <BigButton onClick={onContinuar}>
            {cameraAtiva || microfoneAtivo
              ? "Abrir o DAVI Mentor"
              : "Continuar sem câmera e microfone"}
          </BigButton>
          <BigButton variant="ghost" onClick={onVoltar}>
            Voltar
          </BigButton>
        </>
      }
    >
      <p className="rounded-xl bg-blue-50 p-5 text-base leading-7 text-blue-950 ring-1 ring-blue-200">
        O DAVI Mentor pode utilizar câmera e microfone para compreender o
        contexto ao seu redor. Você pode desligar esses recursos a qualquer
        momento.
      </p>

      <ul className="mt-5 grid gap-3">
        <li className="rounded-xl border-2 border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-base font-black text-zinc-950">Câmera</p>
              <p className="text-sm text-zinc-600">
                {cameraAtiva ? "Ativa" : "Desativada"}
              </p>
            </div>
            {!cameraAtiva ? (
              <button
                type="button"
                onClick={onPedirCamera}
                className={`min-h-[44px] shrink-0 rounded-lg bg-blue-700 px-4 py-2 text-sm font-black text-white hover:bg-blue-800 ${focusRing}`}
              >
                Permitir
              </button>
            ) : (
              <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-900 ring-1 ring-green-300">
                Ativa
              </span>
            )}
          </div>
          {erroCamera ? (
            <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-900">
              {erroCamera}
            </p>
          ) : null}
        </li>

        <li className="rounded-xl border-2 border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-base font-black text-zinc-950">Microfone</p>
              <p className="text-sm text-zinc-600">
                {microfoneAtivo ? "Ativo" : "Desativado"}
              </p>
            </div>
            {!microfoneAtivo ? (
              <button
                type="button"
                onClick={onPedirMicrofone}
                className={`min-h-[44px] shrink-0 rounded-lg bg-blue-700 px-4 py-2 text-sm font-black text-white hover:bg-blue-800 ${focusRing}`}
              >
                Permitir
              </button>
            ) : (
              <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-900 ring-1 ring-green-300">
                Ativo
              </span>
            )}
          </div>
          {erroMicrofone ? (
            <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-900">
              {erroMicrofone} Você pode continuar digitando suas mensagens.
            </p>
          ) : null}
        </li>
      </ul>

      <p className="mt-5 text-sm leading-6 text-zinc-600">
        Nada é gravado de forma contínua. A imagem só é enviada para análise
        quando você toca em um botão que pede isso, e não fica armazenada.
      </p>
    </StepShell>
  );
}

/**
 * Camada de serviço do DAVI Integra.
 *
 * Hoje ela lê dados demonstrativos locais (`data.ts`) e NÃO grava manifestações
 * de interesse nem propostas — o armazenamento seguro ainda não está ativo.
 * Por isso `submitInterest`/`submitProposal` retornam `{ status: "prepared" }`,
 * e as telas exibem "recurso em preparação". Não simulamos gravação.
 *
 * Quando o backend seguro estiver pronto (tabelas + políticas RLS no Supabase),
 * basta trocar o corpo destas funções por chamadas reais, sem mudar as telas.
 * Ver o modelo de dados proposto em `app/lib/integra/README.md`.
 */

import {
  challenges,
  contributionTypes,
  projects,
  repositories,
  workgroups,
} from "./data";
import type {
  Challenge,
  InterestSubmission,
  Project,
  ProposalSubmission,
  Repository,
  SubmissionResult,
  Workgroup,
} from "./types";

/* ------------------------------- Leitura ------------------------------- */

export function getChallenges(): Challenge[] {
  return challenges;
}

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find((c) => c.id === id);
}

export function getProjects(): Project[] {
  return projects;
}

export function getWorkgroups(): Workgroup[] {
  return workgroups;
}

export function getWorkgroupById(id: string): Workgroup | undefined {
  return workgroups.find((w) => w.id === id);
}

export function getContributionTypes() {
  return contributionTypes;
}

export function getRepositories(): Repository[] {
  return repositories;
}

/* --------------------- Opções de filtro (derivadas) -------------------- */

function unique(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export const challengeFilterOptions = {
  modules: unique(challenges.flatMap((c) => c.modules)),
  areas: unique(challenges.flatMap((c) => c.knowledgeAreas)),
  statuses: unique(challenges.map((c) => c.status)),
  contributionTypes: unique(challenges.flatMap((c) => c.contributionTypes)),
};

export const projectFilterOptions = {
  modules: unique(projects.flatMap((p) => p.modules)),
  areas: unique(projects.map((p) => p.area)),
  statuses: unique(projects.map((p) => p.status)),
  participationTypes: unique(projects.flatMap((p) => p.participationTypes)),
  modalities: unique(projects.map((p) => p.modality)),
};

/* ------------------------------- Escrita ------------------------------- */

/**
 * Registra uma manifestação de interesse. Enquanto o armazenamento seguro não
 * está configurado, retorna `prepared` (o formulário mostra "recurso em
 * preparação"). Nunca finge que salvou.
 */
export async function submitInterest(
  payload: InterestSubmission,
): Promise<SubmissionResult> {
  void payload; // reservado para a gravação segura (ver README.md)
  return { status: "prepared" };
}

/**
 * Registra uma proposta de desafio/contribuição. Mesmo comportamento:
 * preparado para o backend, sem simular gravação.
 */
export async function submitProposal(
  payload: ProposalSubmission,
): Promise<SubmissionResult> {
  void payload; // reservado para a gravação segura (ver README.md)
  return { status: "prepared" };
}

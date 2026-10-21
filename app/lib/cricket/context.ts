import {
  MENTOR_CAPABILITIES,
  RECOGNITION_CONFIRM_THRESHOLD,
  type CricketContext,
  type DetectedPerson,
  type MentorProfile,
  type RecentMemoryItem,
  type WorldContext,
} from "./types";

/**
 * Construção e atualização do contexto cognitivo CRICKET.
 *
 * O contexto é sempre tratado de forma imutável: cada função devolve um novo
 * objeto. Isso mantém o React previsível e deixa o painel de pesquisa (EU /
 * OUTROS / MUNDO) refletindo exatamente o que foi enviado ao modelo.
 */

/** Quantos itens de memória recente são mantidos na sessão. */
const MAX_RECENT_MEMORY = 8;

export function createContext(profile: MentorProfile): CricketContext {
  return {
    eu: {
      profileId: profile.id,
      preferredName: profile.preferredName,
      assistanceLevel: profile.assistanceLevel,
      capabilities: profile.capabilities,
      currentGoal: profile.currentGoal ?? "",
      activeTask: "",
      routine: profile.routine ?? [],
      reminders: [],
      recentMemory: [],
    },
    outros: {
      detectedPeople: [],
      recognizedPeople: [],
      socialContext: "",
      recognitionConfidence: null,
      needsConfirmation: false,
    },
    mundo: {
      sceneDescription: "",
      objects: [],
      detectedText: [],
      possibleRisks: [],
      locationContext: "",
      lastAnalysisAt: null,
    },
  };
}

/** Reaplica perfil e configurações sobre um contexto existente. */
export function applyProfile(
  context: CricketContext,
  profile: MentorProfile,
): CricketContext {
  return {
    ...context,
    eu: {
      ...context.eu,
      profileId: profile.id,
      preferredName: profile.preferredName,
      assistanceLevel: profile.assistanceLevel,
      capabilities: profile.capabilities,
      currentGoal: profile.currentGoal ?? context.eu.currentGoal,
      routine: profile.routine ?? context.eu.routine,
    },
  };
}

export function rememberInteraction(
  context: CricketContext,
  summary: string,
): CricketContext {
  const item: RecentMemoryItem = {
    at: new Date().toISOString(),
    summary: summary.slice(0, 240),
  };
  return {
    ...context,
    eu: {
      ...context.eu,
      recentMemory: [item, ...context.eu.recentMemory].slice(0, MAX_RECENT_MEMORY),
    },
  };
}

export function updateWorld(
  context: CricketContext,
  patch: Partial<WorldContext>,
): CricketContext {
  return {
    ...context,
    mundo: { ...context.mundo, ...patch, lastAnalysisAt: new Date().toISOString() },
  };
}

/**
 * Registra pessoas percebidas na cena.
 *
 * Regra do item 2 da especificação: identidade nunca é afirmada com certeza.
 * `needsConfirmation` fica ligado sempre que a maior confiança estiver abaixo
 * do limiar — e o prompt do sistema instrui o modelo a falar em "parece ser".
 */
export function updatePeople(
  context: CricketContext,
  people: DetectedPerson[],
  socialContext = "",
): CricketContext {
  const top = people.reduce<number | null>(
    (max, p) => (max === null || p.confidence > max ? p.confidence : max),
    null,
  );
  return {
    ...context,
    outros: {
      ...context.outros,
      detectedPeople: people,
      recognizedPeople: people.filter(
        (p) => p.confidence >= RECOGNITION_CONFIRM_THRESHOLD,
      ),
      socialContext: socialContext || context.outros.socialContext,
      recognitionConfidence: top,
      needsConfirmation: top === null ? false : top < RECOGNITION_CONFIRM_THRESHOLD,
    },
  };
}

/** Limpa o que foi percebido pela câmera, preservando o perfil (EU). */
export function clearPerception(context: CricketContext): CricketContext {
  const fresh = createContext({
    id: context.eu.profileId,
    preferredName: context.eu.preferredName,
    assistanceLevel: context.eu.assistanceLevel,
    capabilities: context.eu.capabilities,
    isDemo: true,
  });
  return { ...fresh, eu: context.eu };
}

/**
 * Serializa o contexto para o prompt. Mantido curto de propósito: enviar o
 * objeto inteiro desperdiça tokens e atrapalha a atenção do modelo.
 */
export function contextToPrompt(context: CricketContext): string {
  const { eu, outros, mundo } = context;
  const linhas: string[] = [];

  linhas.push("## EU");
  linhas.push(`Nome preferido: ${eu.preferredName || "não informado"}`);
  linhas.push(`Nível de assistência: ${eu.assistanceLevel}`);
  linhas.push(`Funções habilitadas: ${MENTOR_CAPABILITIES.filter((item) => eu.capabilities.includes(item.id)).map((item) => item.nome).join(", ") || "nenhuma"}`);
  linhas.push("Restrinja a assistência às funções habilitadas. Se uma função estiver desativada, explique que a pessoa precisa habilitá-la.");
  if (eu.currentGoal) linhas.push(`Objetivo atual: ${eu.currentGoal}`);
  if (eu.activeTask) linhas.push(`Tarefa em andamento: ${eu.activeTask}`);
  if (eu.routine.length) linhas.push(`Rotina: ${eu.routine.join("; ")}`);
  if (eu.reminders.length) linhas.push(`Lembretes: ${eu.reminders.join("; ")}`);
  if (eu.recentMemory.length) {
    linhas.push(
      `Memória recente: ${eu.recentMemory.map((m) => m.summary).join(" | ")}`,
    );
  }

  linhas.push("");
  linhas.push("## OUTROS");
  if (outros.detectedPeople.length === 0) {
    linhas.push("Nenhuma pessoa detectada.");
  } else {
    for (const p of outros.detectedPeople) {
      const conf = Math.round(p.confidence * 100);
      const rel = p.relationship ? `, relação: ${p.relationship}` : "";
      const last = p.lastInteraction ? `, última interação: ${p.lastInteraction}` : "";
      linhas.push(`- ${p.label} (confiança ${conf}%${rel}${last})`);
    }
    if (outros.needsConfirmation) {
      linhas.push(
        "ATENÇÃO: o reconhecimento é incerto. Não afirme identidade; peça confirmação.",
      );
    }
  }
  if (outros.socialContext) linhas.push(`Contexto social: ${outros.socialContext}`);

  linhas.push("");
  linhas.push("## MUNDO");
  linhas.push(
    mundo.sceneDescription
      ? `Ambiente: ${mundo.sceneDescription}`
      : "Ambiente ainda não analisado.",
  );
  if (mundo.objects.length) linhas.push(`Objetos: ${mundo.objects.join(", ")}`);
  if (mundo.detectedText.length)
    linhas.push(`Textos lidos: ${mundo.detectedText.join(" | ")}`);
  if (mundo.possibleRisks.length)
    linhas.push(`Possíveis riscos: ${mundo.possibleRisks.join(", ")}`);
  if (mundo.locationContext) linhas.push(`Localização: ${mundo.locationContext}`);

  return linhas.join("\n");
}

import type { MentorProfile } from "./types";

/**
 * Perfis assistivos do DAVI Mentor.
 *
 * Princípio de privacidade (item 5 da especificação): o QR Code carrega apenas
 * um identificador — nunca nome, diagnóstico ou qualquer dado pessoal. O
 * identificador é resolvido aqui, no servidor.
 *
 * Nesta versão os perfis são fixos, de demonstração. Quando houver base real,
 * troque `findProfile` por uma consulta ao Supabase mantendo a mesma assinatura:
 * nada no restante do módulo precisa mudar.
 */

export const DEMO_PROFILE_ID = "DEMO001";

const PROFILES: Record<string, MentorProfile> = {
  DEMO001: {
    id: "DEMO001",
    preferredName: "Usuário Demo",
    assistanceLevel: "moderado",
    isDemo: true,
    currentGoal: "Organizar as atividades do dia",
    routine: [
      "Conferir a agenda pela manhã",
      "Levar a mochila ao sair",
      "Guardar as chaves no mesmo lugar",
    ],
    capabilities: [
      "descricao-ambiente",
      "reconhecimento-objetos",
      "memoria-recente",
      "apoio-interacao-social",
      "lembretes-tarefas",
    ],
  },
  DEMO002: {
    id: "DEMO002",
    preferredName: "Visitante",
    assistanceLevel: "leve",
    isDemo: true,
    currentGoal: "Conhecer o DAVI Mentor",
    routine: [],
    capabilities: ["descricao-ambiente", "leitura-textos"],
  },
  DEMO003: {
    id: "DEMO003",
    preferredName: "Acompanhamento",
    assistanceLevel: "intensivo",
    isDemo: true,
    currentGoal: "Seguir a rotina com apoio passo a passo",
    routine: [
      "Tomar água pela manhã",
      "Separar o material da aula",
      "Avisar em casa ao chegar",
    ],
    capabilities: [
      "orientacao-passo-a-passo",
      "lembretes-tarefas",
      "rotinas",
      "alertas-contextuais",
      "descricao-ambiente",
      "orientacao-espacial",
      "memoria-recente",
    ],
  },
};

/** Lista usada pela página de geração de QR Code. */
export function listDemoProfiles(): MentorProfile[] {
  return Object.values(PROFILES);
}

/**
 * Resolve o identificador vindo do QR Code (`?p=`).
 * Retorna null quando o token não existe — o chamador decide o que fazer.
 */
export function findProfile(token: string | null | undefined): MentorProfile | null {
  if (!token) return null;
  const key = token.trim().toUpperCase();
  return PROFILES[key] ?? null;
}

/** Perfil usado quando não há QR Code válido. */
export function demoProfile(): MentorProfile {
  return PROFILES[DEMO_PROFILE_ID];
}

/**
 * Monta a URL que vai dentro do QR Code. Somente origem + rota + token.
 * `origin` vem do request para funcionar igual em localhost e em produção.
 */
export function profileUrl(origin: string, profileId: string): string {
  const base = (process.env.MENTOR_PUBLIC_ORIGIN || origin).replace(/\/$/, "");
  return `${base}/davi-mentor?p=${encodeURIComponent(profileId)}`;
}

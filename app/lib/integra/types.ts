/**
 * Tipos do módulo DAVI Integra — o espaço de colaboração, pesquisa e
 * desenvolvimento aberto do Projeto DAVI.
 *
 * Esta é a fonte de verdade dos formatos de dados (desafios, projetos, grupos
 * de trabalho, manifestações de interesse e propostas). Os dados atuais são
 * demonstrativos (ver `data.ts`) e a camada de serviço (`service.ts`) já está
 * preparada para, no futuro, ler/gravar em um backend seguro (Supabase) sem
 * mudar as telas.
 */

/** Situação de um desafio ou projeto no fluxo de colaboração. */
export type IntegraStatus =
  | "Em definição"
  | "Aberto para colaboração"
  | "Formação de equipe"
  | "Em desenvolvimento"
  | "Em testes"
  | "Em documentação"
  | "Concluído"
  | "Suspenso";

/** Nível de maturidade da iniciativa. */
export type MaturityLevel =
  | "Ideia inicial"
  | "Exploração"
  | "Prototipagem"
  | "Testes"
  | "Consolidação";

/** Modalidade de participação. */
export type Modality = "Remota" | "Presencial" | "Híbrida";

/**
 * Módulos do ecossistema DAVI aos quais uma iniciativa pode se relacionar.
 * Mantido como string aberta para não acoplar o Integra à lista fechada de
 * módulos — novos módulos surgem sem quebrar os dados.
 */
export type ModuleName = string;

/** Um desafio aberto: uma necessidade real transformada em oportunidade. */
export type Challenge = {
  id: string;
  title: string;
  /** Resumo do problema. */
  summary: string;
  /** Módulo(s) do ecossistema relacionado(s). */
  modules: ModuleName[];
  /** Áreas de conhecimento envolvidas. */
  knowledgeAreas: string[];
  status: IntegraStatus;
  maturity: MaturityLevel;
  /** Competências desejadas. */
  skills: string[];
  /** Tipos de contribuição buscados. */
  contributionTypes: string[];
  /** Entregas esperadas. */
  deliverables: string[];
  /** Grupo de trabalho responsável. */
  workgroup: string;
  /** Se a iniciativa pode exigir avaliação ética (CEP) com participantes. */
  ethicsReview: boolean;
  /** Link para documentação (só aparece quando existir uma URL válida). */
  docsUrl?: string;
  /** Link para repositório (só aparece quando existir uma URL válida). */
  repoUrl?: string;
  /** Conteúdo demonstrativo — nunca apresentar como chamada oficial. */
  isDemo: boolean;
};

/** Atualização no histórico de um projeto. */
export type ProjectUpdate = {
  date: string;
  text: string;
};

/** Um projeto em andamento no ecossistema. */
export type Project = {
  id: string;
  name: string;
  objective: string;
  modules: ModuleName[];
  description: string;
  status: IntegraStatus;
  /** Etapa atual do projeto. */
  currentStage: string;
  /** Resultados esperados. */
  expectedResults: string[];
  /** Tecnologias utilizadas. */
  technologies: string[];
  /** Grupo de trabalho responsável. */
  workgroup: string;
  /** Perfis de colaboradores procurados. */
  wantedProfiles: string[];
  /** Área de conhecimento principal (para filtro). */
  area: string;
  /** Tipos de participação aceitos (para filtro). */
  participationTypes: string[];
  modality: Modality;
  docsUrl?: string;
  repoUrl?: string;
  updates: ProjectUpdate[];
  isDemo: boolean;
};

/** Um grupo de trabalho, geralmente ligado a um módulo do ecossistema. */
export type Workgroup = {
  id: string;
  name: string;
  objective: string;
  /** Área de atuação. */
  area: string;
  /** Atividades típicas do grupo. */
  activities: string[];
  /** Conhecimentos úteis para participar. */
  usefulKnowledge: string[];
  /** Projetos relacionados (ids em `data.ts`). */
  relatedProjects: string[];
  /** Desafios relacionados (ids em `data.ts`). */
  relatedChallenges: string[];
  /** Situação do grupo. */
  situation: IntegraStatus | "Em formação";
  /** Como participar. */
  participation: string;
  /** Rota do módulo relacionado, quando existir. */
  moduleHref?: string;
};

/** Um perfil de pessoa que pode participar (seção "Quem pode participar"). */
export type ParticipantProfile = {
  title: string;
  description: string;
};

/** Uma forma/área de contribuição (seção "Formas de contribuição"). */
export type ContributionType = {
  id: string;
  title: string;
  description: string;
  /** Categoria para agrupar visualmente. */
  category: "Tecnologia" | "Pesquisa e educação" | "Design e conteúdo" | "Comunidade e apoio";
  /** Áreas de conhecimento usadas para relacionar oportunidades. */
  relatedAreas: string[];
};

/** Um tipo de parceria institucional. */
export type PartnerType = {
  title: string;
  description: string;
};

/** Um repositório público relacionado (só é exibido com URL válida). */
export type Repository = {
  name: string;
  description: string;
  url: string;
  language?: string;
};

/* ------------------------------------------------------------------ */
/* Formatos de envio (formulários) — preparados para o backend         */
/* ------------------------------------------------------------------ */

/** Manifestação de interesse em contribuir (`/integra/participar`). */
export type InterestSubmission = {
  name: string;
  email: string;
  cityState: string;
  institution?: string;
  field: string;
  background: string;
  modules: string[];
  contributionTypes: string[];
  availability: string;
  modality: Modality;
  portfolioUrl?: string;
  message: string;
  privacyAccepted: boolean;
};

/** Proposta de desafio/contribuição (`/integra/propor`). */
export type ProposalSubmission = {
  title: string;
  category: string;
  problem: string;
  audience: string;
  imaginedSolution: string;
  modules: string[];
  requiredKnowledge: string;
  requiredResources?: string;
  expectedResult: string;
  risks?: string;
  needsParticipantResearch: boolean;
  proposerName: string;
  proposerContact: string;
};

/** Resultado de um envio — reflete o estado real do backend. */
export type SubmissionResult =
  | { status: "prepared" }
  | { status: "saved"; id: string }
  | { status: "error"; message: string };

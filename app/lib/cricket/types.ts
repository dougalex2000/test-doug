/**
 * Tipos da arquitetura CRICKET
 * (Cognitive Robotic Intelligence for Context, Knowledge, Engagement and Tasks).
 *
 * Todo contexto cognitivo do DAVI Mentor é organizado em três esferas:
 * EU (a pessoa), OUTROS (relações sociais) e MUNDO (ambiente físico).
 */

/* ------------------------------------------------------------------ */
/* Perfil e configuração                                               */
/* ------------------------------------------------------------------ */

/** Quanto o DAVI Mentor intervém por iniciativa própria. */
export type AssistanceLevel = "leve" | "moderado" | "intensivo";

export const ASSISTANCE_LEVELS: ReadonlyArray<{
  id: AssistanceLevel;
  nome: string;
  resumo: string;
  comportamento: string[];
}> = [
  {
    id: "leve",
    nome: "Nível 1 — Leve",
    resumo:
      "O DAVI Mentor interfere pouco e responde principalmente quando solicitado.",
    comportamento: [
      "Respostas sob demanda",
      "Poucos lembretes",
      "Alertas somente quando relevantes",
    ],
  },
  {
    id: "moderado",
    nome: "Nível 2 — Moderado",
    resumo: "O DAVI Mentor acompanha o contexto e oferece ajuda ocasionalmente.",
    comportamento: [
      "Lembretes contextuais",
      "Sugestões",
      "Auxílio em situações sociais",
      "Orientações ocasionais",
    ],
  },
  {
    id: "intensivo",
    nome: "Nível 3 — Intensivo",
    resumo:
      "Acompanhamento mais ativo, para quem precisa de suporte frequente.",
    comportamento: [
      "Instruções passo a passo",
      "Lembretes frequentes",
      "Acompanhamento de tarefas",
      "Orientação contextual mais ativa",
    ],
  },
];

/** Funções cognitivas que podem ser ligadas ou desligadas pela pessoa. */
export type MentorCapability =
  | "memoria-pessoas"
  | "reconhecimento-contextual"
  | "descricao-ambiente"
  | "reconhecimento-objetos"
  | "leitura-textos"
  | "lembretes-tarefas"
  | "rotinas"
  | "orientacao-passo-a-passo"
  | "apoio-interacao-social"
  | "localizacao-objetos"
  | "organizacao-compromissos"
  | "alertas-contextuais"
  | "orientacao-espacial"
  | "comunicacao-assistida"
  | "memoria-recente";

export const MENTOR_CAPABILITIES: ReadonlyArray<{
  id: MentorCapability;
  nome: string;
  descricao: string;
  /** A qual esfera do CRICKET esta função alimenta. */
  esfera: "eu" | "outros" | "mundo";
  /** Depende da câmera para funcionar bem. */
  requerCamera?: boolean;
}> = [
  {
    id: "memoria-pessoas",
    nome: "Memória de pessoas",
    descricao: "Lembrar quem são as pessoas com quem você convive.",
    esfera: "outros",
    requerCamera: true,
  },
  {
    id: "reconhecimento-contextual",
    nome: "Reconhecimento contextual",
    descricao: "Entender a situação em que você está.",
    esfera: "mundo",
  },
  {
    id: "descricao-ambiente",
    nome: "Descrição do ambiente",
    descricao: "Descrever o lugar ao seu redor.",
    esfera: "mundo",
    requerCamera: true,
  },
  {
    id: "reconhecimento-objetos",
    nome: "Reconhecimento de objetos",
    descricao: "Identificar objetos na cena.",
    esfera: "mundo",
    requerCamera: true,
  },
  {
    id: "leitura-textos",
    nome: "Leitura de textos",
    descricao: "Ler placas, bilhetes e rótulos para você.",
    esfera: "mundo",
    requerCamera: true,
  },
  {
    id: "lembretes-tarefas",
    nome: "Lembretes de tarefas",
    descricao: "Lembrar o que você precisa fazer.",
    esfera: "eu",
  },
  {
    id: "rotinas",
    nome: "Rotinas",
    descricao: "Acompanhar suas rotinas do dia.",
    esfera: "eu",
  },
  {
    id: "orientacao-passo-a-passo",
    nome: "Orientação passo a passo",
    descricao: "Explicar tarefas em passos curtos.",
    esfera: "eu",
  },
  {
    id: "apoio-interacao-social",
    nome: "Apoio à interação social",
    descricao: "Ajudar em conversas e encontros.",
    esfera: "outros",
  },
  {
    id: "localizacao-objetos",
    nome: "Localização de objetos",
    descricao: "Ajudar a encontrar o que você procura.",
    esfera: "mundo",
    requerCamera: true,
  },
  {
    id: "organizacao-compromissos",
    nome: "Organização de compromissos",
    descricao: "Organizar horários e compromissos.",
    esfera: "eu",
  },
  {
    id: "alertas-contextuais",
    nome: "Alertas contextuais",
    descricao: "Avisar sobre algo relevante na situação.",
    esfera: "mundo",
  },
  {
    id: "orientacao-espacial",
    nome: "Orientação espacial",
    descricao: "Ajudar a se localizar no espaço.",
    esfera: "mundo",
    requerCamera: true,
  },
  {
    id: "comunicacao-assistida",
    nome: "Comunicação assistida",
    descricao: "Apoiar você a se expressar.",
    esfera: "eu",
  },
  {
    id: "memoria-recente",
    nome: "Memória recente",
    descricao: "Lembrar o que aconteceu há pouco.",
    esfera: "eu",
  },
];

export type MentorProfile = {
  /** Identificador que viaja no QR Code. Nunca contém dado pessoal. */
  id: string;
  preferredName: string;
  assistanceLevel: AssistanceLevel;
  capabilities: MentorCapability[];
  /** Perfil de demonstração, sem vínculo com pessoa real. */
  isDemo: boolean;
  currentGoal?: string;
  routine?: string[];
};

/* ------------------------------------------------------------------ */
/* As três esferas                                                     */
/* ------------------------------------------------------------------ */

export type RecentMemoryItem = {
  at: string;
  summary: string;
};

/** EU — a pessoa e o estado atual da sessão. */
export type SelfContext = {
  profileId: string;
  preferredName: string;
  assistanceLevel: AssistanceLevel;
  capabilities: MentorCapability[];
  currentGoal: string;
  activeTask: string;
  routine: string[];
  reminders: string[];
  recentMemory: RecentMemoryItem[];
};

export type DetectedPerson = {
  /** Rótulo provisório — nunca uma afirmação de identidade. */
  label: string;
  /** 0 a 1. Abaixo do limiar exige confirmação da pessoa. */
  confidence: number;
  relationship?: string;
  lastInteraction?: string;
};

/** OUTROS — pessoas e relações sociais. */
export type OthersContext = {
  detectedPeople: DetectedPerson[];
  recognizedPeople: DetectedPerson[];
  socialContext: string;
  recognitionConfidence: number | null;
  /** true quando o reconhecimento é incerto e precisa de confirmação humana. */
  needsConfirmation: boolean;
};

/** MUNDO — ambiente físico e situacional. */
export type WorldContext = {
  sceneDescription: string;
  objects: string[];
  detectedText: string[];
  possibleRisks: string[];
  locationContext: string;
  /** Momento da última análise de imagem, para a pessoa saber o que é recente. */
  lastAnalysisAt: string | null;
};

export type CricketContext = {
  eu: SelfContext;
  outros: OthersContext;
  mundo: WorldContext;
};

/**
 * Acima deste valor o reconhecimento é tratado como provável. Ainda assim o
 * Mentor fala em "parece ser" — nunca afirma identidade com certeza absoluta.
 */
export const RECOGNITION_CONFIRM_THRESHOLD = 0.9;

/* ------------------------------------------------------------------ */
/* Comunicação com o gateway                                           */
/* ------------------------------------------------------------------ */

/** Ações disparadas pelos botões grandes da interface operacional. */
export type MentorAction =
  | "falar"
  | "analisar-ambiente"
  | "quem-e-essa-pessoa"
  | "o-que-estou-vendo"
  | "onde-esta"
  | "lembrar"
  | "ajude-me";

export type MentorRequest = {
  sessionId: string;
  timestamp: string;
  payload: {
    userMessage: string;
    action?: MentorAction;
    context: CricketContext;
    /** Frame capturado sob demanda (data URL). Nunca vídeo contínuo. */
    imageDataUrl?: string;
  };
};

export type MentorResponse = {
  text: string;
  model: string;
  createdAt: string;
  /** true quando a resposta veio do fallback local, não do modelo. */
  degraded: boolean;
};

export type CricketEventType =
  | "session.start"
  | "session.stop"
  | "profile.loaded"
  | "camera.frame"
  | "audio.transcript"
  | "context.update"
  | "mentor.request"
  | "mentor.response"
  | "mentor.alert"
  | "mentor.error";

export type CricketWebSocketMessage<T = unknown> = {
  type: CricketEventType;
  sessionId: string;
  timestamp: string;
  payload: T;
};

export type ConnectionState = "conectado" | "reconectando" | "offline";

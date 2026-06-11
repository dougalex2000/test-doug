export type PlatformModuleKey =
  | "inicio"
  | "sobre"
  | "alunos"
  | "profissionais"
  | "responsaveis"
  | "hardware"
  | "dispositivos"
  | "rastreamentoOcular"
  | "mouseAssistivo"
  | "calibracao"
  | "comunicacaoAlternativa"
  | "relatorios"
  | "relatorioAluno"
  | "relatorioHardware"
  | "relatorioRastreamento"
  | "relatorioInstitucional"
  | "inteligenciaArtificial"
  | "catalogo"
  | "galeria"
  | "acessibilidade"
  | "configuracoes"
  | "admin"
  | "contato";

export type PlatformModule = {
  eyebrow: string;
  title: string;
  description: string;
  route: string;
  status: string;
  items: string[];
  nextSteps: string[];
};

export const platformModules: Record<PlatformModuleKey, PlatformModule> = {
  inicio: {
    eyebrow: "Início",
    title: "Plataforma DAVI",
    description:
      "Apresentação geral da plataforma modular de tecnologia assistiva para autonomia, comunicação e inclusão.",
    route: "/",
    status: "Página principal em evolução",
    items: ["Visão geral", "Acesso aos módulos", "Destaques de acessibilidade"],
    nextSteps: ["Conectar cards aos módulos", "Definir destaques institucionais"],
  },
  sobre: {
    eyebrow: "Sobre o DAVI",
    title: "Desenvolvimento Assistivo para Vida Independente",
    description:
      "Área institucional para explicar objetivos, públicos atendidos, princípios e forma de evolução do projeto.",
    route: "/sobre",
    status: "Página institucional inicial",
    items: ["Objetivos", "Público-alvo", "Princípios", "Parceiros"],
    nextSteps: ["Adicionar história do projeto", "Incluir instituições parceiras"],
  },
  alunos: {
    eyebrow: "Usuários",
    title: "Cadastro de Alunos",
    description:
      "Cadastro, edição, busca e visualização de alunos vinculados aos módulos assistivos.",
    route: "/usuarios/alunos",
    status: "Estrutura de cadastro preparada",
    items: ["Dados pessoais", "Perfil funcional", "Responsáveis", "Dispositivos vinculados"],
    nextSteps: ["Criar formulário", "Adicionar busca", "Conectar banco de dados"],
  },
  profissionais: {
    eyebrow: "Usuários",
    title: "Cadastro de Profissionais",
    description:
      "Cadastro de profissionais, terapeutas, educadores e pesquisadores que acompanham os usuários.",
    route: "/usuarios/profissionais",
    status: "Estrutura de cadastro preparada",
    items: ["Dados profissionais", "Área de atuação", "Instituição", "Permissões"],
    nextSteps: ["Criar formulário", "Definir papéis", "Conectar autenticação"],
  },
  responsaveis: {
    eyebrow: "Usuários",
    title: "Cadastro de Responsáveis",
    description:
      "Cadastro de familiares ou responsáveis legais associados aos alunos.",
    route: "/usuarios/responsaveis",
    status: "Estrutura de cadastro preparada",
    items: ["Dados de contato", "Vínculo com aluno", "Autorizações", "Observações"],
    nextSteps: ["Criar formulário", "Associar a alunos", "Definir permissões"],
  },
  hardware: {
    eyebrow: "Módulos",
    title: "Comunicação com Hardware",
    description:
      "Comunicação com botões adaptados, sensores, sistemas de sopro, Bluetooth, USB, ESP32, Arduino e outros dispositivos.",
    route: "/modulos/hardware",
    status: "Módulo técnico inicial",
    items: ["USB", "Bluetooth", "ESP32", "Arduino", "Sensores", "Acionadores"],
    nextSteps: ["Definir protocolo", "Criar painel de testes", "Registrar eventos"],
  },
  dispositivos: {
    eyebrow: "Dispositivos",
    title: "Dispositivos Assistivos",
    description:
      "Gerenciamento dos dispositivos vinculados aos alunos, profissionais e ambientes de uso.",
    route: "/dispositivos",
    status: "Página de gerenciamento inicial",
    items: ["Dispositivo", "Tipo de acesso", "Usuário vinculado", "Status"],
    nextSteps: ["Criar cadastro", "Adicionar histórico", "Conectar com hardware"],
  },
  rastreamentoOcular: {
    eyebrow: "Módulos",
    title: "Varredura Ocular",
    description:
      "Análise do olhar, calibração, tempo de fixação, mapas de atenção e apoio a profissionais.",
    route: "/modulos/rastreamento-ocular",
    status: "Protótipo experimental disponível",
    items: ["Calibração", "Fixação", "Mapa de atenção", "Seleção por permanência"],
    nextSteps: ["Melhorar precisão", "Salvar sessões", "Gerar relatório visual"],
  },
  mouseAssistivo: {
    eyebrow: "Módulos",
    title: "Mouse Assistivo",
    description:
      "Transformação do rastreamento ocular, movimentos da cabeça ou acionadores em comandos de mouse.",
    route: "/modulos/mouse-assistivo",
    status: "Módulo conceitual separado",
    items: ["Clique por permanência", "Movimento do cursor", "Varredura", "Acionadores"],
    nextSteps: ["Definir modo de clique", "Criar painel de teste", "Adicionar perfis"],
  },
  calibracao: {
    eyebrow: "Módulos",
    title: "Calibração",
    description:
      "Configuração de sensibilidade, tempo de resposta, tempo de varredura e ajustes por usuário.",
    route: "/modulos/calibracao",
    status: "Módulo de configuração inicial",
    items: ["Sensibilidade", "Tempo de resposta", "Tempo de varredura", "Perfil do usuário"],
    nextSteps: ["Persistir configurações", "Criar presets", "Testar por módulo"],
  },
  comunicacaoAlternativa: {
    eyebrow: "Módulos",
    title: "Comunicação Alternativa",
    description:
      "Pranchas de comunicação, símbolos, frases rápidas, categorias e síntese de voz.",
    route: "/modulos/comunicacao-alternativa",
    status: "Módulo de comunicação inicial",
    items: ["Pranchas", "Símbolos", "Categorias", "Frases rápidas", "Voz"],
    nextSteps: ["Criar editor de pranchas", "Adicionar síntese de voz", "Salvar perfis"],
  },
  relatorios: {
    eyebrow: "Relatórios",
    title: "Relatórios e Métricas",
    description:
      "Área geral para organizar indicadores, sessões, dispositivos usados e evolução funcional.",
    route: "/relatorios",
    status: "Área geral existente",
    items: ["Sessões", "Indicadores", "Dispositivos", "Observações"],
    nextSteps: ["Separar relatórios por tipo", "Adicionar exportação", "Criar filtros"],
  },
  relatorioAluno: {
    eyebrow: "Relatórios",
    title: "Relatório do Aluno",
    description:
      "Evolução, sessões, dispositivos usados, métricas e observações profissionais por aluno.",
    route: "/relatorios/aluno",
    status: "Relatório específico inicial",
    items: ["Evolução", "Sessões", "Dispositivos", "Observações"],
    nextSteps: ["Selecionar aluno", "Gerar histórico", "Exportar PDF"],
  },
  relatorioHardware: {
    eyebrow: "Relatórios",
    title: "Relatório de Hardware",
    description:
      "Tempos de acionamento, número de tentativas, falhas, uso de botões e sistemas de sopro.",
    route: "/relatorios/hardware",
    status: "Relatório técnico inicial",
    items: ["Acionamentos", "Tentativas", "Falhas", "Tempo de resposta"],
    nextSteps: ["Registrar eventos", "Criar gráficos", "Associar dispositivos"],
  },
  relatorioRastreamento: {
    eyebrow: "Relatórios",
    title: "Relatório de Varredura Ocular",
    description:
      "Análise do olhar, tempo de fixação, áreas de interesse e comparação entre sessões.",
    route: "/relatorios/rastreamento-ocular",
    status: "Relatório visual inicial",
    items: ["Fixação", "Áreas de interesse", "Comparação", "Mapa visual"],
    nextSteps: ["Salvar amostras", "Criar mapa de calor", "Comparar sessões"],
  },
  relatorioInstitucional: {
    eyebrow: "Relatórios",
    title: "Relatório Institucional",
    description:
      "Visão geral de impacto, públicos atendidos, módulos utilizados, indicadores agregados e evolução da plataforma.",
    route: "/relatorios/institucional",
    status: "Relatório institucional inicial",
    items: ["Impacto", "Públicos atendidos", "Módulos utilizados", "Indicadores agregados"],
    nextSteps: ["Definir indicadores", "Criar filtros por período", "Adicionar exportação"],
  },
  inteligenciaArtificial: {
    eyebrow: "Módulos",
    title: "Inteligência Artificial",
    description:
      "Análise de vídeos, tempos dos dispositivos, padrões de uso e geração de recomendações de apoio.",
    route: "/modulos/inteligencia-artificial",
    status: "Módulo conceitual separado",
    items: ["Análise de vídeo", "Padrões de uso", "Recomendações", "Resumo de relatórios"],
    nextSteps: ["Definir entradas", "Criar limites éticos", "Validar recomendações"],
  },
  catalogo: {
    eyebrow: "Catálogo",
    title: "Catálogo de Tecnologias Assistivas",
    description:
      "Catálogo dos produtos, recursos e soluções do Projeto DAVI.",
    route: "/catalogo",
    status: "Catálogo inicial",
    items: ["Produtos", "Recursos", "Projetos abertos", "Indicação de uso"],
    nextSteps: ["Criar categorias", "Adicionar filtros", "Detalhar cada solução"],
  },
  galeria: {
    eyebrow: "Galeria",
    title: "Galeria de Tecnologias Assistivas",
    description:
      "Galeria com diferentes tipos de tecnologias assistivas próprias ou de referência.",
    route: "/galeria",
    status: "Galeria inicial",
    items: ["Imagens", "Categorias", "Descrição", "Aplicações"],
    nextSteps: ["Adicionar mídia", "Criar filtros", "Organizar por público"],
  },
  acessibilidade: {
    eyebrow: "Acessibilidade",
    title: "Configurações de Acessibilidade",
    description:
      "Configurações de contraste, tamanho de fonte, navegação por teclado, leitores de tela e recursos de acessibilidade.",
    route: "/acessibilidade",
    status: "Página de acessibilidade inicial",
    items: ["Contraste", "Fonte", "Teclado", "Leitor de tela", "Movimento reduzido"],
    nextSteps: ["Persistir preferências", "Testar WCAG", "Adicionar atalhos"],
  },
  configuracoes: {
    eyebrow: "Configurações",
    title: "Configurações da Plataforma",
    description:
      "Preferências do usuário, permissões, ajustes visuais e preferências dos módulos.",
    route: "/configuracoes",
    status: "Página de preferências inicial",
    items: ["Preferências", "Permissões", "Ajustes visuais", "Módulos ativos"],
    nextSteps: ["Criar formulários", "Salvar preferências", "Separar permissões"],
  },
  admin: {
    eyebrow: "Administração",
    title: "Administração",
    description:
      "Gerenciamento de usuários, permissões, módulos, produtos, dispositivos e relatórios.",
    route: "/admin",
    status: "Área administrativa inicial",
    items: ["Usuários", "Permissões", "Módulos", "Dispositivos", "Relatórios"],
    nextSteps: ["Definir papéis", "Proteger rota", "Criar painel administrativo"],
  },
  contato: {
    eyebrow: "Contato",
    title: "Contato",
    description:
      "Formulário de contato, informações institucionais e canais de atendimento do Projeto DAVI.",
    route: "/contato",
    status: "Página de contato inicial",
    items: ["Mensagem", "Instituição", "Parcerias", "Atendimento"],
    nextSteps: ["Criar formulário", "Definir e-mail", "Adicionar validação"],
  },
};

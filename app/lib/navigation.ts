export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

/**
 * Menu institucional principal, inspirado na organização de portais
 * públicos (clareza, hierarquia, serviços), mantendo identidade própria.
 */
export const institutionalNav: NavGroup[] = [
  {
    title: "O Projeto",
    links: [
      { label: "Origem do DAVI", href: "/origem" },
      { label: "O que é a Plataforma", href: "/plataforma" },
      { label: "Impacto Social", href: "/impacto" },
      { label: "Inteligência Artificial", href: "/inteligencia-artificial" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Rastreamento Visual", href: "/rastreamento-visual" },
      { label: "Captura Visual Assistiva", href: "/captura-visual" },
      { label: "Comunicação Alternativa", href: "/comunicacao-alternativa" },
      { label: "Métodos de Acesso", href: "/metodos-de-acesso" },
      { label: "Atividades Assistivas", href: "/atividades" },
    ],
  },
  {
    title: "Avaliação",
    links: [
      { label: "Avaliação Funcional", href: "/avaliacao" },
      { label: "Relatórios Inteligentes", href: "/relatorios" },
      { label: "Perfis de Usuário", href: "/plataforma#perfis-de-usuario" },
    ],
  },
  {
    title: "Tecnologias Assistivas",
    links: [
      { label: "Galeria", href: "/galeria" },
      { label: "Projetos Abertos", href: "/galeria#projetos-abertos" },
      { label: "Oficina Maker", href: "/oficina-maker" },
      { label: "Loja Social (em breve)", href: "/loja-social" },
    ],
  },
  {
    title: "Instituições e Públicos",
    links: [
      { label: "Profissionais", href: "/profissionais" },
      { label: "Famílias", href: "/familias" },
      { label: "Escolas, ONGs e Prefeituras", href: "/instituicoes" },
    ],
  },
  {
    title: "Segurança e Privacidade",
    links: [
      { label: "Ética e Proteção de Dados", href: "/seguranca-e-privacidade" },
    ],
  },
];

/**
 * Rotas da plataforma (módulos técnicos e áreas internas) que já existiam.
 * Mantidas no menu para não remover nenhuma funcionalidade.
 */
export const platformNav: NavGroup[] = [
  {
    title: "Minha conta",
    links: [
      { label: "Entrar / Criar conta", href: "/entrar" },
      { label: "Meu Painel", href: "/dashboard" },
      { label: "Meu Perfil", href: "/perfil" },
      { label: "Notificações", href: "/notificacoes" },
      { label: "Configurações", href: "/configuracoes" },
    ],
  },
  {
    title: "Módulos da plataforma",
    links: [
      { label: "Rastreamento ocular (demonstração)", href: "/rastreamento" },
      { label: "Rastreamento ocular (módulo)", href: "/modulos/rastreamento-ocular" },
      { label: "Mouse assistivo", href: "/modulos/mouse-assistivo" },
      { label: "Calibração", href: "/modulos/calibracao" },
      { label: "Comunicação alternativa (módulo)", href: "/modulos/comunicacao-alternativa" },
      { label: "Comunicação com hardware", href: "/modulos/hardware" },
      { label: "Inteligência artificial (módulo)", href: "/modulos/inteligencia-artificial" },
    ],
  },
  {
    title: "Dispositivos e cadastros",
    links: [
      { label: "Dispositivos", href: "/dispositivos" },
      { label: "Pareamento Bluetooth", href: "/dispositivos/pareamento" },
      { label: "Catálogo", href: "/catalogo" },
      { label: "Alunos", href: "/usuarios/alunos" },
      { label: "Profissionais (cadastro)", href: "/usuarios/profissionais" },
      { label: "Responsáveis", href: "/usuarios/responsaveis" },
    ],
  },
  {
    title: "Relatórios",
    links: [
      { label: "Relatórios e métricas", href: "/relatorios" },
      { label: "Relatório do aluno", href: "/relatorios/aluno" },
      { label: "Relatório de hardware", href: "/relatorios/hardware" },
      { label: "Relatório de rastreamento ocular", href: "/relatorios/rastreamento-ocular" },
      { label: "Relatório institucional", href: "/relatorios/institucional" },
    ],
  },
];

/** Links do rodapé institucional. */
export const footerNav: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Origem", href: "/origem" },
  { label: "Plataforma", href: "/plataforma" },
  { label: "Rastreamento Visual", href: "/rastreamento-visual" },
  { label: "Comunicação Alternativa", href: "/comunicacao-alternativa" },
  { label: "Galeria", href: "/galeria" },
  { label: "Oficina Maker", href: "/oficina-maker" },
  { label: "Profissionais", href: "/profissionais" },
  { label: "Famílias", href: "/familias" },
  { label: "Instituições", href: "/instituicoes" },
  { label: "Acessibilidade", href: "/acessibilidade" },
  { label: "Segurança e Privacidade", href: "/seguranca-e-privacidade" },
  { label: "Contato", href: "/contato" },
];

/**
 * Navegação central do ecossistema DAVI (fonte única da verdade).
 *
 * Cada seção é uma grande área do projeto, com rota principal e subitens.
 * O menu, os breadcrumbs e os índices de página leem daqui — assim diferentes
 * grupos de trabalho evoluem seus módulos sem quebrar a navegação geral.
 */

export type ModuleStatus =
  | "Em construção"
  | "Protótipo"
  | "Testes iniciais"
  | "Planejado"
  | "Demonstração"
  | "Experimental"
  | "Área logada";

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  status?: ModuleStatus;
  /** Grupo de trabalho responsável (organização para equipes). */
  group?: string;
};

export type NavSection = {
  title: string;
  href: string;
  description: string;
  items: NavItem[];
};

export const mainNav: NavSection[] = [
  {
    title: "O Projeto",
    href: "/projeto",
    description: "Visão geral, origem, ética e a plataforma online.",
    items: [
      { label: "Visão Geral", href: "/projeto", description: "O que é o ecossistema DAVI." },
      { label: "Origem do DAVI", href: "/projeto/origem", description: "A história do aluno Davi." },
      { label: "Vida Independente", href: "/projeto/vida-independente", description: "O destino da jornada DAVI." },
      { label: "DAVI Emprega", href: "/davi-emprega", description: "Emprego apoiado e inclusão profissional.", status: "Planejado" },
      { label: "Ecossistema DAVI", href: "/projeto/ecossistema", description: "Como os módulos se conectam." },
      { label: "Plataforma Online", href: "/projeto/plataforma-online", description: "Acesso pela internet, em construção.", status: "Em construção" },
      { label: "Ética, CEP e LGPD", href: "/projeto/etica", description: "Proteção da pessoa antes de tudo." },
      { label: "Manual do Projeto", href: "/manual", description: "Guia inicial do ecossistema." },
      { label: "Documentação", href: "/documentacao", description: "Manual, artigo e resumo em PDF." },
    ],
  },
  {
    title: "DAVI Escola",
    href: "/escola",
    description: "Núcleo pedagógico: Português, Matemática, videoaulas e tarefas.",
    items: [
      { label: "Visão Geral", href: "/escola", description: "O centro pedagógico do DAVI." },
      { label: "Língua Portuguesa", href: "/escola/portugues", description: "Comunicação, alfabetização e escrita.", status: "Demonstração", group: "Grupo DAVI Escola — Língua Portuguesa" },
      { label: "Matemática", href: "/escola/matematica", description: "Números, operações e cotidiano.", status: "Demonstração", group: "Grupo DAVI Escola — Matemática" },
      { label: "Videoaulas", href: "/escola/videoaulas", description: "Controle do vídeo no ritmo do aluno.", status: "Demonstração", group: "Grupo Videoaulas e Tarefas" },
      { label: "DAVI Games", href: "/davi-games", description: "Jogos educativos e gamificação acessível.", status: "Protótipo", group: "Grupo DAVI Games" },
      { label: "Tarefas e Lições", href: "/escola/tarefas", description: "Atividades acessíveis com métricas.", status: "Demonstração", group: "Grupo Videoaulas e Tarefas" },
      { label: "Criar Atividades", href: "/escola/criar-atividades", description: "Montar conteúdos acessíveis.", status: "Em construção" },
      { label: "Subir Vídeo", href: "/escola/subir-video", description: "Envio de videoaulas (demo).", status: "Em construção" },
      { label: "Modo Professor", href: "/escola/professor", description: "Apoio a professores, AEE e cuidadores." },
      { label: "Modo Aluno", href: "/escola/aluno", description: "Interface simples e focada." },
      { label: "Modo Casa", href: "/escola/casa", description: "Apoio a famílias e comunidades." },
      { label: "Minha Evolução", href: "/escola/minha-evolucao", description: "Acompanhar o próprio progresso.", status: "Planejado" },
    ],
  },
  {
    title: "Comunicação",
    href: "/comunicacao",
    description: "Comunicação alternativa para expressão, escolhas e participação.",
    items: [
      { label: "Visão Geral", href: "/comunicacao", description: "DAVI Comunicação.", group: "Grupo Comunicação Alternativa" },
      { label: "Comunicação Alternativa", href: "/comunicacao/alternativa", description: "Prancha interativa com áudio.", status: "Demonstração" },
      { label: "Sim e Não", href: "/comunicacao/sim-nao", description: "Respostas essenciais." },
      { label: "Frases Rápidas", href: "/comunicacao/frases-rapidas", description: "Expressões do dia a dia." },
      { label: "Pranchas de Comunicação", href: "/comunicacao/pranchas", description: "Símbolos por categoria." },
      { label: "Necessidades e Vontades", href: "/comunicacao/necessidades", description: "Expressar o que se precisa." },
    ],
  },
  {
    title: "Acesso e Dispositivos",
    href: "/acesso",
    description: "Métodos de acesso, rastreamento ocular, BioSinal e conexão sem fio.",
    items: [
      { label: "Métodos de Acesso", href: "/acesso/metodos", description: "Olhar, toque, botão, sopro e mais." },
      { label: "DAVI Vision", href: "/acesso/vision", description: "Rastreamento ocular e interação visual.", status: "Protótipo", group: "Grupo DAVI Vision" },
      { label: "DAVI Conecta", href: "/acesso/conecta", description: "Integração com dispositivos sem fio.", status: "Testes iniciais", group: "Grupo DAVI Conecta e Dispositivos Sem Fio" },
      { label: "DAVI Calibrar", href: "/acesso/calibrar", description: "Ajustes por método de acesso." },
      { label: "Perfil de Acesso", href: "/acesso/perfil", description: "Registro funcional, não diagnóstico." },
      { label: "BioSinal", href: "/acesso/biosinal", description: "Sinais biológicos como acesso.", status: "Experimental", group: "Grupo DAVI BioSinal" },
      { label: "Pareamento Bluetooth", href: "/acesso/bluetooth", description: "Conectar dispositivos por BLE.", status: "Testes iniciais" },
      { label: "ESP32 e Sem Fio", href: "/acesso/esp32", description: "Microcontroladores assistivos.", status: "Testes iniciais" },
      { label: "Teclado, Botão e Sopro", href: "/acesso/acionadores", description: "Acionadores físicos." },
    ],
  },
  {
    title: "Inteligência Artificial",
    href: "/ia",
    description: "IA como apoio à comunicação, aprendizagem e acessibilidade.",
    items: [
      { label: "Visão Geral", href: "/ia", description: "A IA no ecossistema DAVI.", group: "Grupo Inteligência Artificial" },
      { label: "Assistente DAVI", href: "/ia/assistente", description: "Guia inteligente da plataforma.", status: "Demonstração" },
      { label: "IA no DAVI Vision", href: "/ia/vision", description: "Apoio à calibração e interpretação.", status: "Planejado" },
      { label: "IA na Aprendizagem", href: "/ia/aprendizagem", description: "Personalização de atividades.", status: "Planejado" },
      { label: "IA na Comunicação", href: "/ia/comunicacao", description: "Ampliar a comunicação alternativa.", status: "Planejado" },
      { label: "IA para Professores", href: "/ia/professores", description: "Apoio à criação e ao acompanhamento.", status: "Planejado" },
      { label: "Arquitetura RAG", href: "/ia/rag", description: "IA baseada na base do projeto." },
      { label: "Modelos Locais e Servidor", href: "/ia/modelos-locais", description: "Autonomia e proteção de dados." },
      { label: "Ética no Uso de IA", href: "/ia/etica", description: "IA apoia, não decide sozinha." },
    ],
  },
  {
    title: "Tecnologias Assistivas",
    href: "/tecnologias-assistivas",
    description: "Catálogo, dispositivos, oficina maker e projetos abertos.",
    items: [
      { label: "Visão Geral", href: "/tecnologias-assistivas", description: "Recursos para a vida independente." },
      { label: "Catálogo", href: "/tecnologias-assistivas/catalogo", description: "Prateleira virtual de recursos.", group: "Grupo Catálogo de Tecnologias Assistivas" },
      { label: "Dispositivos DAVI", href: "/tecnologias-assistivas/dispositivos", description: "Dispositivos do ecossistema." },
      { label: "DAVI Assistivo App", href: "/tecnologias-assistivas/davi-assistivo-app", description: "Celular como tecnologia assistiva.", status: "Planejado" },
      { label: "DAVI Imersivo", href: "/tecnologias-assistivas/davi-imersivo", description: "Realidade virtual, aumentada e smart glasses.", status: "Planejado" },
      { label: "Oficina Maker", href: "/tecnologias-assistivas/oficina-maker", description: "Adaptar, criar e personalizar.", group: "Grupo Oficina Maker" },
      { label: "Projetos Abertos", href: "/tecnologias-assistivas/projetos-abertos", description: "Arquivos livres para reproduzir." },
      { label: "Materiais de Apoio", href: "/tecnologias-assistivas/materiais", description: "Guias e documentação." },
    ],
  },
  {
    title: "Evolução e Relatórios",
    href: "/evolucao",
    description: "Métricas para compreender, apoiar e ampliar possibilidades.",
    items: [
      { label: "Visão Geral", href: "/evolucao", description: "DAVI Evolução.", group: "Grupo Métricas e Relatórios" },
      { label: "Métricas de Aprendizagem", href: "/evolucao/aprendizagem", description: "Tempo, tentativas, escrita." },
      { label: "Métricas de Acesso", href: "/evolucao/acesso", description: "Método usado e desempenho." },
      { label: "Relatório do Aluno", href: "/evolucao/relatorio-aluno", description: "Para família e professor.", status: "Planejado" },
      { label: "Relatório Institucional", href: "/evolucao/relatorio-institucional", description: "Visão da instituição.", status: "Planejado" },
      { label: "Linha do Tempo", href: "/evolucao/linha-do-tempo", description: "Evolução longitudinal." },
    ],
  },
  {
    title: "Instituições e Comunidades",
    href: "/comunidades",
    description: "Famílias, escolas, profissionais, prefeituras, ONGs e comunidades.",
    items: [
      { label: "Famílias", href: "/comunidades/familias", description: "Apoio no dia a dia.", group: "Grupo Comunidades e Instituições" },
      { label: "Escolas", href: "/comunidades/escolas", description: "Inclusão na sala de aula." },
      { label: "Cuidadores", href: "/comunidades/cuidadores", description: "Mediação e acompanhamento." },
      { label: "Profissionais", href: "/comunidades/profissionais", description: "Educação, saúde e reabilitação." },
      { label: "Prefeituras", href: "/comunidades/prefeituras", description: "Políticas públicas de inclusão." },
      { label: "ONGs", href: "/comunidades/ongs", description: "Organizações da sociedade civil." },
      { label: "Comunidades Remotas", href: "/comunidades/remotas", description: "Regiões de difícil acesso." },
      { label: "Povos Indígenas", href: "/comunidades/povos-indigenas", description: "Respeito a contextos próprios." },
    ],
  },
  {
    title: "Área do Usuário",
    href: "/entrar",
    description: "Login e painel logado: perfil, alunos, profissionais e configurações.",
    items: [
      { label: "Login", href: "/entrar", description: "Entrar ou criar conta." },
      { label: "Meu Painel", href: "/painel", description: "Visão geral logada.", status: "Área logada" },
      { label: "Meu Perfil", href: "/painel/perfil", description: "Dados da conta.", status: "Área logada" },
      { label: "Alunos", href: "/painel/alunos", description: "Cadastro e acompanhamento.", status: "Área logada" },
      { label: "Profissionais", href: "/painel/profissionais", description: "Equipe e permissões.", status: "Área logada" },
      { label: "Responsáveis", href: "/painel/responsaveis", description: "Famílias vinculadas.", status: "Área logada" },
      { label: "Configurações", href: "/painel/configuracoes", description: "Preferências da conta.", status: "Área logada" },
    ],
  },
];

/** Itens do rodapé, derivados das rotas principais das seções. */
export const footerSections = mainNav.map((section) => ({
  title: section.title,
  links: section.items.slice(0, 5),
}));

/** Mapa href → metadados (label, status, seção) para breadcrumbs e índices. */
const itemIndex = new Map<string, { item: NavItem; section: NavSection }>();
for (const section of mainNav) {
  itemIndex.set(section.href, {
    item: { label: section.title, href: section.href, description: section.description },
    section,
  });
  for (const item of section.items) {
    if (!itemIndex.has(item.href)) itemIndex.set(item.href, { item, section });
  }
}

export function findNav(href: string) {
  return itemIndex.get(href);
}

export function sectionItems(href: string): NavItem[] {
  return mainNav.find((s) => s.href === href)?.items ?? [];
}

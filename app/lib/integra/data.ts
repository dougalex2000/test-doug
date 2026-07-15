/**
 * Dados demonstrativos do DAVI Integra.
 *
 * IMPORTANTE: todo o conteúdo aqui é DEMONSTRATIVO (`isDemo: true`). Não deve
 * ser apresentado como chamada oficial, oportunidade confirmada, bolsa, vaga
 * ou parceria firmada. Serve para mostrar como o módulo funcionará quando
 * desafios e projetos reais forem publicados pelos responsáveis.
 *
 * Nenhum link (documentação/repositório) é inventado: os campos `docsUrl` e
 * `repoUrl` só existem quando houver uma URL válida cadastrada.
 */

import type {
  Challenge,
  ContributionType,
  ParticipantProfile,
  PartnerType,
  Project,
  Repository,
  Workgroup,
} from "./types";

/* ------------------------------------------------------------------ */
/* Quem pode participar (seção 4.2)                                     */
/* ------------------------------------------------------------------ */

export const participantProfiles: ParticipantProfile[] = [
  { title: "Pesquisadores", description: "De qualquer área que dialogue com tecnologia assistiva, educação, saúde ou inclusão." },
  { title: "Estudantes", description: "Da graduação à pós, em iniciação científica, extensão, TCC, estágio ou por conta própria." },
  { title: "Programadores e desenvolvedores", description: "Software, web, aplicativos, back-end, front-end e integração de dispositivos." },
  { title: "Profissionais de tecnologia assistiva", description: "Quem avalia, indica, adapta e acompanha recursos de acesso e comunicação." },
  { title: "Engenheiros e técnicos", description: "Eletrônica, mecatrônica, computação, telecomunicações e áreas afins." },
  { title: "Professores e pesquisadores da educação", description: "Alfabetização, educação especial, AEE, pedagogia e didática acessível." },
  { title: "Profissionais de saúde e reabilitação", description: "Terapia ocupacional, fonoaudiologia, fisioterapia, psicologia e medicina." },
  { title: "Designers e especialistas em acessibilidade", description: "UX, UI, design inclusivo, WCAG e experiência de quem usa tecnologia assistiva." },
  { title: "Eletrônica e sistemas embarcados", description: "Microcontroladores, sensores, firmware e prototipagem de hardware." },
  { title: "Fabricação digital e cultura maker", description: "Impressão 3D, corte a laser, CAD e adaptação de dispositivos de baixo custo." },
  { title: "Especialistas em inteligência artificial", description: "Modelos multimodais, visão computacional, linguagem e IA responsável." },
  { title: "Comunicadores, redatores e documentadores", description: "Documentação técnica, divulgação científica, tradução e revisão." },
  { title: "Instituições de ensino e pesquisa", description: "Universidades, institutos e laboratórios que queiram colaborar formalmente." },
  { title: "Escolas, prefeituras, ONGs e comunidades", description: "Quem atua no território e conhece necessidades reais de inclusão." },
  {
    title: "Pessoas com deficiência, familiares e cuidadores",
    description:
      "Não apenas como público beneficiário: também como pesquisadoras, desenvolvedoras, avaliadoras, consultoras e colaboradoras do projeto.",
  },
];

/* ------------------------------------------------------------------ */
/* Formas de contribuição (seção 4.3)                                   */
/* ------------------------------------------------------------------ */

export const contributionTypes: ContributionType[] = [
  { id: "software", title: "Desenvolvimento de software", description: "Back-end, APIs, arquitetura e integração de serviços.", category: "Tecnologia", relatedAreas: ["Software", "Engenharia"] },
  { id: "web", title: "Desenvolvimento web", description: "Interfaces do site, componentes e evolução da plataforma.", category: "Tecnologia", relatedAreas: ["Software", "Web"] },
  { id: "mobile", title: "Aplicativos e interfaces móveis", description: "Celular como interface assistiva (DAVI InterCel) e apps.", category: "Tecnologia", relatedAreas: ["Software", "Mobile"] },
  { id: "ia", title: "Inteligência artificial e modelos multimodais", description: "Apoio à comunicação, aprendizagem e acessibilidade.", category: "Tecnologia", relatedAreas: ["IA"] },
  { id: "visao", title: "Visão computacional", description: "Detecção de face, olhar, gestos e movimento por câmera.", category: "Tecnologia", relatedAreas: ["IA", "Visão computacional"] },
  { id: "rastreamento", title: "Rastreamento ocular e gestual", description: "Métodos de acesso por olhar, cabeça, piscadas e gestos.", category: "Tecnologia", relatedAreas: ["Acesso", "IA"] },
  { id: "caa", title: "Comunicação alternativa", description: "Pranchas, símbolos, voz e estratégias de CAA.", category: "Design e conteúdo", relatedAreas: ["Comunicação", "Educação"] },
  { id: "eletronica", title: "Eletrônica e dispositivos embarcados", description: "Botões, acionadores, microcontroladores e firmware.", category: "Tecnologia", relatedAreas: ["Eletrônica", "Hardware"] },
  { id: "sensores", title: "Sensores e conectividade", description: "Bluetooth, ESP32, sensores e comunicação sem fio.", category: "Tecnologia", relatedAreas: ["Eletrônica", "Hardware"] },
  { id: "robotica", title: "Robótica", description: "Mecanismos, movimento e automação assistiva.", category: "Tecnologia", relatedAreas: ["Robótica", "Engenharia"] },
  { id: "maker", title: "Fabricação digital e impressão 3D", description: "Adaptar, imprimir e documentar dispositivos de baixo custo.", category: "Tecnologia", relatedAreas: ["Maker", "Fabricação digital"] },
  { id: "design", title: "Design de interfaces acessíveis", description: "UX/UI inclusivo, contraste, foco e clareza.", category: "Design e conteúdo", relatedAreas: ["Design", "Acessibilidade"] },
  { id: "pesquisa", title: "Pesquisa científica", description: "Estudos, revisões e produção de conhecimento.", category: "Pesquisa e educação", relatedAreas: ["Pesquisa"] },
  { id: "metodologia", title: "Metodologia e avaliação", description: "Desenho de estudos, métricas e avaliação de resultados.", category: "Pesquisa e educação", relatedAreas: ["Pesquisa", "Avaliação"] },
  { id: "educacao", title: "Educação e alfabetização", description: "Estratégias pedagógicas acessíveis e educação especial.", category: "Pesquisa e educação", relatedAreas: ["Educação"] },
  { id: "atividades", title: "Produção de atividades pedagógicas", description: "Atividades de Português, Matemática e outras áreas.", category: "Pesquisa e educação", relatedAreas: ["Educação", "Conteúdo"] },
  { id: "testes-a11y", title: "Testes de acessibilidade", description: "Navegação por teclado, leitores de tela e WCAG.", category: "Design e conteúdo", relatedAreas: ["Acessibilidade", "Qualidade"] },
  { id: "docs", title: "Documentação técnica", description: "Manuais, guias, esquemas e registros de solução.", category: "Design e conteúdo", relatedAreas: ["Documentação"] },
  { id: "traducao", title: "Tradução e revisão de conteúdos", description: "Clareza, revisão e adaptação de linguagem.", category: "Design e conteúdo", relatedAreas: ["Conteúdo", "Documentação"] },
  { id: "videoaulas", title: "Produção de videoaulas", description: "Roteiro, gravação e legendagem acessível.", category: "Design e conteúdo", relatedAreas: ["Educação", "Conteúdo"] },
  { id: "divulgacao", title: "Divulgação científica", description: "Comunicar resultados e impacto do projeto.", category: "Comunidade e apoio", relatedAreas: ["Comunicação", "Pesquisa"] },
  { id: "captacao", title: "Captação de recursos e parcerias", description: "Editais, apoio institucional e articulação.", category: "Comunidade e apoio", relatedAreas: ["Parcerias", "Gestão"] },
];

/* ------------------------------------------------------------------ */
/* Desafios abertos (seção 5) — todos demonstrativos                    */
/* ------------------------------------------------------------------ */

export const challenges: Challenge[] = [
  {
    id: "acessibilidade-interfaces",
    title: "Melhorar a acessibilidade das interfaces do DAVI",
    summary:
      "Avaliar navegação por teclado, leitores de tela, foco visível, contraste, tamanho dos elementos e clareza das instruções em todo o site.",
    modules: ["Acessibilidade e experiência do usuário"],
    knowledgeAreas: ["Acessibilidade", "Design", "Web"],
    status: "Aberto para colaboração",
    maturity: "Exploração",
    skills: ["WCAG", "Leitores de tela", "HTML semântico", "Testes de usabilidade"],
    contributionTypes: ["Testes de acessibilidade", "Design de interfaces acessíveis", "Documentação técnica"],
    deliverables: ["Relatório de barreiras", "Lista priorizada de correções", "Sugestões de componentes acessíveis"],
    workgroup: "Grupo Acessibilidade e Experiência do Usuário",
    ethicsReview: false,
    isDemo: true,
  },
  {
    id: "atividades-pedagogicas",
    title: "Criar atividades pedagógicas acessíveis",
    summary:
      "Produzir atividades de alfabetização ou matemática que possam ser utilizadas por diferentes métodos de acesso (olhar, toque, botão, sopro, varredura).",
    modules: ["DAVI Escola — Língua Portuguesa", "DAVI Escola — Matemática"],
    knowledgeAreas: ["Educação", "Alfabetização", "Educação especial"],
    status: "Formação de equipe",
    maturity: "Ideia inicial",
    skills: ["Alfabetização", "Educação especial", "Desenho de atividades", "CAA"],
    contributionTypes: ["Produção de atividades pedagógicas", "Educação e alfabetização"],
    deliverables: ["Conjunto de atividades", "Orientações de uso por método de acesso", "Critérios de acessibilidade"],
    workgroup: "Grupo DAVI Escola — Língua Portuguesa",
    ethicsReview: false,
    isDemo: true,
  },
  {
    id: "documentar-dispositivo",
    title: "Documentar um dispositivo assistivo aberto",
    summary:
      "Criar manual, esquema, lista de materiais, cuidados de segurança e instruções de montagem de um dispositivo assistivo de baixo custo.",
    modules: ["DAVI Maker", "Projetos Abertos"],
    knowledgeAreas: ["Fabricação digital", "Eletrônica", "Documentação"],
    status: "Aberto para colaboração",
    maturity: "Prototipagem",
    skills: ["Documentação técnica", "Eletrônica básica", "Impressão 3D", "Fotografia de montagem"],
    contributionTypes: ["Documentação técnica", "Fabricação digital e impressão 3D"],
    deliverables: ["Manual de montagem", "Lista de materiais e custo", "Cuidados de segurança", "Arquivos para reprodução"],
    workgroup: "Grupo DAVI Maker",
    ethicsReview: false,
    isDemo: true,
  },
  {
    id: "novo-metodo-acesso",
    title: "Integrar um novo método de acesso",
    summary:
      "Estudar a integração de um botão, joystick, movimento, gesto, sensor ou dispositivo assistivo com a plataforma, de forma configurável.",
    modules: ["DAVI Conecta", "DAVI InterCel"],
    knowledgeAreas: ["Eletrônica", "Software", "Acesso"],
    status: "Em definição",
    maturity: "Exploração",
    skills: ["Web Bluetooth", "ESP32", "JavaScript/TypeScript", "Firmware"],
    contributionTypes: ["Sensores e conectividade", "Eletrônica e dispositivos embarcados", "Desenvolvimento de software"],
    deliverables: ["Prova de conceito", "Guia de integração", "Testes com diferentes acionadores"],
    workgroup: "Grupo DAVI Conecta",
    ethicsReview: false,
    isDemo: true,
  },
  {
    id: "melhorar-davi-vision",
    title: "Melhorar o DAVI Vision",
    summary:
      "Pesquisar formas acessíveis, éticas e não diagnósticas de interação por olhar, face, cabeça, piscadas ou gestos, com processamento local sempre que possível.",
    modules: ["DAVI Vision"],
    knowledgeAreas: ["Visão computacional", "IA", "Acessibilidade"],
    status: "Em desenvolvimento",
    maturity: "Prototipagem",
    skills: ["Visão computacional", "MediaPipe", "Calibração", "Ética em pesquisa"],
    contributionTypes: ["Visão computacional", "Rastreamento ocular e gestual", "Pesquisa científica"],
    deliverables: ["Estudo comparativo", "Protótipo de calibração", "Recomendações éticas"],
    workgroup: "Grupo DAVI Vision",
    ethicsReview: true,
    isDemo: true,
  },
  {
    id: "testes-automatizados-a11y",
    title: "Criar testes automatizados de acessibilidade",
    summary:
      "Desenvolver testes que ajudem a impedir regressões de acessibilidade durante a evolução do site (foco, rótulos, contraste, navegação por teclado).",
    modules: ["Acessibilidade e experiência do usuário"],
    knowledgeAreas: ["Qualidade", "Web", "Acessibilidade"],
    status: "Aberto para colaboração",
    maturity: "Exploração",
    skills: ["Testes automatizados", "axe-core", "Playwright", "CI"],
    contributionTypes: ["Testes de acessibilidade", "Desenvolvimento web"],
    deliverables: ["Suíte de testes de acessibilidade", "Integração ao fluxo de build", "Documentação de uso"],
    workgroup: "Grupo Acessibilidade e Experiência do Usuário",
    ethicsReview: false,
    isDemo: true,
  },
];

/* ------------------------------------------------------------------ */
/* Projetos em andamento (seção 6) — demonstrativos                     */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: "biblioteca-atividades",
    name: "Biblioteca de atividades acessíveis",
    objective: "Reunir atividades pedagógicas que funcionem com qualquer método de acesso.",
    modules: ["DAVI Escola — Língua Portuguesa", "DAVI Escola — Matemática"],
    description:
      "Organizar, testar e documentar atividades de alfabetização e matemática, com metadados de acessibilidade e sugestões por método de acesso.",
    status: "Formação de equipe",
    currentStage: "Definição do formato das atividades e critérios de acessibilidade.",
    expectedResults: ["Modelo de atividade acessível", "Primeiro conjunto de atividades", "Guia de produção"],
    technologies: ["Next.js", "TypeScript", "Conteúdo estruturado"],
    workgroup: "Grupo DAVI Escola — Língua Portuguesa",
    wantedProfiles: ["Professores", "Designers de conteúdo", "Testadores de acessibilidade"],
    area: "Educação",
    participationTypes: ["Individual", "Acadêmica", "Institucional"],
    modality: "Remota",
    updates: [{ date: "2026-07", text: "Projeto demonstrativo criado para ilustrar o formato do DAVI Integra." }],
    isDemo: true,
  },
  {
    id: "kit-acionadores",
    name: "Kit aberto de acionadores",
    objective: "Documentar acionadores de baixo custo compatíveis com o DAVI Conecta.",
    modules: ["DAVI Maker", "DAVI Conecta"],
    description:
      "Prototipar e documentar botões e acionadores adaptados, com arquivos 3D, esquemas, lista de materiais e cuidados de segurança.",
    status: "Em desenvolvimento",
    currentStage: "Prototipagem dos primeiros acionadores e registro de montagem.",
    expectedResults: ["Arquivos 3D", "Esquemas eletrônicos", "Manual de montagem"],
    technologies: ["Impressão 3D", "ESP32", "Web Bluetooth"],
    workgroup: "Grupo DAVI Maker",
    wantedProfiles: ["Makers", "Eletrônica", "Documentadores"],
    area: "Fabricação digital",
    participationTypes: ["Individual", "Técnica", "Comunidade"],
    modality: "Híbrida",
    updates: [{ date: "2026-07", text: "Projeto demonstrativo criado para ilustrar o formato do DAVI Integra." }],
    isDemo: true,
  },
  {
    id: "calibracao-vision",
    name: "Calibração acessível do DAVI Vision",
    objective: "Tornar a calibração por olhar e cabeça mais simples, tolerante e ética.",
    modules: ["DAVI Vision"],
    description:
      "Estudar fluxos de calibração acessíveis e não diagnósticos, com processamento local, para diferentes perfis de acesso.",
    status: "Em testes",
    currentStage: "Testes iniciais de fluxo de calibração com dados sintéticos.",
    expectedResults: ["Fluxo de calibração", "Recomendações éticas", "Relato de testes"],
    technologies: ["MediaPipe", "TypeScript", "Visão computacional"],
    workgroup: "Grupo DAVI Vision",
    wantedProfiles: ["Visão computacional", "Terapia ocupacional", "Pesquisadores"],
    area: "Visão computacional",
    participationTypes: ["Acadêmica", "Técnica"],
    modality: "Remota",
    updates: [{ date: "2026-07", text: "Projeto demonstrativo criado para ilustrar o formato do DAVI Integra." }],
    isDemo: true,
  },
];

/* ------------------------------------------------------------------ */
/* Grupos de trabalho (seção 7)                                         */
/* ------------------------------------------------------------------ */

export const workgroups: Workgroup[] = [
  { id: "comunica", name: "DAVI Comunica", objective: "Ampliar a comunicação alternativa.", area: "Comunicação alternativa", activities: ["Pranchas", "Símbolos", "Voz", "Frases rápidas"], usefulKnowledge: ["CAA", "Fonoaudiologia", "Design"], relatedProjects: [], relatedChallenges: [], situation: "Aberto para colaboração", participation: "Voluntária, acadêmica ou institucional.", moduleHref: "/comunicacao" },
  { id: "escola-portugues", name: "DAVI Escola — Língua Portuguesa", objective: "Alfabetização e escrita acessíveis.", area: "Educação", activities: ["Atividades", "Videoaulas", "Testes com métodos de acesso"], usefulKnowledge: ["Alfabetização", "Educação especial"], relatedProjects: ["biblioteca-atividades"], relatedChallenges: ["atividades-pedagogicas"], situation: "Em formação", participation: "Individual, acadêmica ou institucional.", moduleHref: "/escola/portugues" },
  { id: "escola-matematica", name: "DAVI Escola — Matemática", objective: "Números e operações acessíveis.", area: "Educação", activities: ["Atividades", "Materiais", "Avaliação"], usefulKnowledge: ["Educação matemática", "Educação especial"], relatedProjects: ["biblioteca-atividades"], relatedChallenges: ["atividades-pedagogicas"], situation: "Em formação", participation: "Individual, acadêmica ou institucional.", moduleHref: "/escola/matematica" },
  { id: "videoaulas", name: "Videoaulas e atividades", objective: "Produzir conteúdo acessível em vídeo.", area: "Conteúdo educacional", activities: ["Roteiro", "Gravação", "Legendagem"], usefulKnowledge: ["Produção de vídeo", "Educação"], relatedProjects: [], relatedChallenges: [], situation: "Em formação", participation: "Voluntária ou por extensão.", moduleHref: "/escola/videoaulas" },
  { id: "conecta", name: "DAVI Conecta", objective: "Integrar dispositivos sem fio e acionadores.", area: "Eletrônica e conectividade", activities: ["Firmware", "Web Bluetooth", "Testes"], usefulKnowledge: ["ESP32", "BLE", "TypeScript"], relatedProjects: ["kit-acionadores"], relatedChallenges: ["novo-metodo-acesso"], situation: "Aberto para colaboração", participation: "Técnica, individual ou acadêmica.", moduleHref: "/acesso/conecta" },
  { id: "intercel", name: "DAVI InterCel", objective: "Celular como interface assistiva.", area: "Mobile e acesso", activities: ["Interfaces móveis", "Métodos de acesso", "Ponte com dispositivos"], usefulKnowledge: ["Mobile", "Web", "Acessibilidade"], relatedProjects: [], relatedChallenges: ["novo-metodo-acesso"], situation: "Em formação", participation: "Técnica ou acadêmica.", moduleHref: "/davi-intercel" },
  { id: "vision", name: "DAVI Vision", objective: "Acesso por olhar, face e gestos.", area: "Visão computacional", activities: ["Calibração", "Detecção", "Estudos éticos"], usefulKnowledge: ["Visão computacional", "IA", "Ética"], relatedProjects: ["calibracao-vision"], relatedChallenges: ["melhorar-davi-vision"], situation: "Em desenvolvimento", participation: "Acadêmica ou técnica.", moduleHref: "/acesso/vision" },
  { id: "imersivo", name: "DAVI Imersivo", objective: "Ambientes imersivos para aprendizagem e pesquisa.", area: "Realidade estendida", activities: ["Protótipos", "Estudos", "Acessibilidade"], usefulKnowledge: ["XR", "3D", "Pesquisa"], relatedProjects: [], relatedChallenges: [], situation: "Em definição", participation: "Acadêmica ou institucional.", moduleHref: "/davi-imersivo" },
  { id: "biosinal", name: "DAVI BioSinal", objective: "Sinais biológicos como acesso (experimental).", area: "Sinais biológicos", activities: ["EEG/EMG/EOG", "Estudos éticos", "Prototipagem"], usefulKnowledge: ["Processamento de sinais", "Ética", "Eletrônica"], relatedProjects: [], relatedChallenges: [], situation: "Em definição", participation: "Acadêmica, com Comitê de Ética.", moduleHref: "/acesso/biosinal" },
  { id: "games", name: "DAVI Games", objective: "Jogos educativos acessíveis.", area: "Jogos e gamificação", activities: ["Design de jogos", "Acessibilidade", "Testes"], usefulKnowledge: ["Game design", "Web", "Educação"], relatedProjects: [], relatedChallenges: [], situation: "Em formação", participation: "Voluntária ou acadêmica.", moduleHref: "/davi-games" },
  { id: "ia", name: "DAVI Assistente e Inteligência Artificial", objective: "IA responsável de apoio à plataforma.", area: "Inteligência artificial", activities: ["RAG", "Modelos locais", "Ética"], usefulKnowledge: ["IA", "NLP", "Privacidade"], relatedProjects: [], relatedChallenges: [], situation: "Aberto para colaboração", participation: "Técnica ou acadêmica.", moduleHref: "/ia" },
  { id: "metricas", name: "DAVI Métricas e Relatórios", objective: "Medir para ampliar possibilidades, não para limitar.", area: "Dados e avaliação", activities: ["Métricas", "Relatórios", "Privacidade"], usefulKnowledge: ["Dados", "Avaliação", "LGPD"], relatedProjects: [], relatedChallenges: [], situation: "Em formação", participation: "Acadêmica ou técnica.", moduleHref: "/evolucao" },
  { id: "catalogo", name: "DAVI Catálogo", objective: "Prateleira virtual de tecnologias assistivas.", area: "Curadoria", activities: ["Curadoria", "Cadastro", "Documentação"], usefulKnowledge: ["Tecnologia assistiva", "Documentação"], relatedProjects: [], relatedChallenges: [], situation: "Em formação", participation: "Voluntária ou institucional.", moduleHref: "/tecnologias-assistivas/catalogo" },
  { id: "maker", name: "DAVI Maker", objective: "Criar, adaptar e documentar soluções.", area: "Fabricação digital", activities: ["Impressão 3D", "Eletrônica", "Documentação"], usefulKnowledge: ["CAD", "Impressão 3D", "Eletrônica"], relatedProjects: ["kit-acionadores"], relatedChallenges: ["documentar-dispositivo"], situation: "Aberto para colaboração", participation: "Técnica, individual ou comunidade.", moduleHref: "/tecnologias-assistivas/oficina-maker" },
  { id: "capacita", name: "DAVI Capacita", objective: "Formação e treinamentos.", area: "Formação", activities: ["Cursos", "Oficinas", "Multiplicadores"], usefulKnowledge: ["Educação", "Tecnologia assistiva"], relatedProjects: [], relatedChallenges: [], situation: "Em definição", participation: "Institucional ou voluntária.", moduleHref: "/davi-capacita" },
  { id: "emprega", name: "DAVI Emprega", objective: "Inclusão profissional e emprego apoiado.", area: "Inclusão profissional", activities: ["Articulação", "Adaptações", "Acompanhamento"], usefulKnowledge: ["Inclusão", "RH", "Acessibilidade"], relatedProjects: [], relatedChallenges: [], situation: "Em definição", participation: "Institucional.", moduleHref: "/davi-emprega" },
  { id: "acessibilidade", name: "Acessibilidade e experiência do usuário", objective: "Garantir acesso a todas as interfaces.", area: "Acessibilidade e UX", activities: ["Auditorias", "Testes", "Componentes acessíveis"], usefulKnowledge: ["WCAG", "Leitores de tela", "Design"], relatedProjects: [], relatedChallenges: ["acessibilidade-interfaces", "testes-automatizados-a11y"], situation: "Aberto para colaboração", participation: "Individual, técnica ou acadêmica.", moduleHref: "/acessibilidade" },
  { id: "etica", name: "Ética, CEP, LGPD e segurança", objective: "Proteger as pessoas antes de tudo.", area: "Ética e proteção de dados", activities: ["CEP", "LGPD", "Segurança"], usefulKnowledge: ["Ética em pesquisa", "LGPD", "Segurança"], relatedProjects: [], relatedChallenges: [], situation: "Aberto para colaboração", participation: "Acadêmica ou institucional.", moduleHref: "/projeto/etica" },
  { id: "documentacao", name: "Documentação e divulgação científica", objective: "Registrar e comunicar o que se aprende.", area: "Documentação e comunicação", activities: ["Documentação", "Artigos", "Divulgação"], usefulKnowledge: ["Escrita", "Pesquisa", "Comunicação"], relatedProjects: [], relatedChallenges: [], situation: "Aberto para colaboração", participation: "Voluntária ou acadêmica.", moduleHref: "/documentacao" },
  { id: "instituicoes", name: "Instituições, comunidades e parcerias", objective: "Articular parcerias e territórios.", area: "Parcerias e comunidades", activities: ["Parcerias", "Extensão", "Território"], usefulKnowledge: ["Gestão", "Articulação", "Inclusão"], relatedProjects: [], relatedChallenges: [], situation: "Aberto para colaboração", participation: "Institucional ou comunidade.", moduleHref: "/comunidades" },
];

/* ------------------------------------------------------------------ */
/* Parcerias institucionais (seção 11)                                  */
/* ------------------------------------------------------------------ */

export const partnerTypes: PartnerType[] = [
  { title: "Universidades", description: "Pesquisa, extensão, orientação e laboratórios." },
  { title: "Institutos de pesquisa", description: "Desenvolvimento, validação e infraestrutura." },
  { title: "Escolas", description: "Testes em contexto real e formação de professores." },
  { title: "Prefeituras", description: "Políticas públicas de inclusão e escala no território." },
  { title: "Organizações sociais e ONGs", description: "Alcance comunitário e escuta de necessidades." },
  { title: "Centros de reabilitação", description: "Avaliação clínica-funcional e acompanhamento." },
  { title: "Laboratórios", description: "Prototipagem, testes e infraestrutura técnica." },
  { title: "Empresas de tecnologia", description: "Desenvolvimento, apoio técnico e recursos." },
  { title: "Comunidades", description: "Necessidades reais, cocriação e validação." },
  { title: "Redes de fabricação digital", description: "Fablabs e makerspaces para produção aberta." },
];

export const partnershipKinds: string[] = [
  "Pesquisa e desenvolvimento",
  "Extensão",
  "Formação",
  "Validação tecnológica",
  "Desenvolvimento de protótipos",
  "Disponibilização de infraestrutura",
  "Fabricação",
  "Documentação",
  "Financiamento",
  "Bolsas",
  "Apoio institucional",
  "Divulgação científica",
];

/* ------------------------------------------------------------------ */
/* Repositórios públicos — nenhum link falso                            */
/* ------------------------------------------------------------------ */

/**
 * Só adicione um repositório aqui quando houver uma URL pública válida.
 * Enquanto estiver vazio, a seção de repositórios exibe um aviso de
 * "em preparação" em vez de links inexistentes.
 */
export const repositories: Repository[] = [];

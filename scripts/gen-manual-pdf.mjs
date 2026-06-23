/**
 * Gera o Manual do Projeto DAVI em PDF (public/manual-davi.pdf).
 * Usa pdfkit (sem navegador). Conteúdo baseado no site atual.
 */
import PDFDocument from "pdfkit";
import { createWriteStream, existsSync } from "node:fs";

const BLUE = "#1d4ed8";
const DARK = "#0f172a";
const GREEN = "#16a34a";
const GRAY = "#475569";
const LIGHT = "#64748b";

const doc = new PDFDocument({ size: "A4", margin: 56, bufferPages: true });
doc.pipe(createWriteStream("public/manual-davi.pdf"));

const PAGE_W = doc.page.width;
const LEFT = 56;
const RIGHT = PAGE_W - 56;
const WIDTH = RIGHT - LEFT;
const BOTTOM = doc.page.height - 64;

function ensure(h) {
  if (doc.y + h > BOTTOM) doc.addPage();
}

function h1(num, title) {
  ensure(60);
  doc.y += 10;
  const y = doc.y;
  doc.rect(LEFT, y, 5, 22).fill(BLUE);
  doc
    .fillColor(DARK)
    .font("Helvetica-Bold")
    .fontSize(16)
    .text(`${num}. ${title}`, LEFT + 14, y + 1, { width: WIDTH - 14 });
  doc.y = y + 30;
  doc.fillColor("#000");
}

function h2(title) {
  ensure(34);
  doc.y += 6;
  doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(11.5).text(title, LEFT, doc.y);
  doc.y += 4;
  doc.fillColor("#000");
}

function para(text) {
  doc.font("Helvetica").fontSize(10.5).fillColor("#1f2937");
  ensure(doc.heightOfString(text, { width: WIDTH }) + 6);
  doc.text(text, LEFT, doc.y, { width: WIDTH, align: "justify", lineGap: 2 });
  doc.y += 6;
}

function bullets(items) {
  doc.font("Helvetica").fontSize(10.5).fillColor("#1f2937");
  for (const it of items) {
    const h = doc.heightOfString(it, { width: WIDTH - 16 });
    ensure(h + 4);
    const y = doc.y;
    doc.circle(LEFT + 3, y + 6, 1.8).fill(GREEN);
    doc.fillColor("#1f2937").text(it, LEFT + 14, y, { width: WIDTH - 16, lineGap: 1.5 });
    doc.y += 3;
  }
  doc.y += 4;
}

/* Mapa do menu: seções e rotas (espelha app/lib/siteNav.ts). */
const menu = [
  ["O Projeto", "/projeto", [
    ["Visão Geral", "/projeto"], ["Origem do DAVI", "/projeto/origem"],
    ["Vida Independente", "/projeto/vida-independente"], ["Ecossistema DAVI", "/projeto/ecossistema"],
    ["Plataforma Online", "/projeto/plataforma-online"], ["Ética, CEP e LGPD", "/projeto/etica"],
    ["Manual do Projeto", "/manual"],
  ]],
  ["DAVI Escola", "/escola", [
    ["Visão Geral", "/escola"], ["Língua Portuguesa", "/escola/portugues"],
    ["Matemática", "/escola/matematica"], ["Videoaulas", "/escola/videoaulas"],
    ["DAVI Games", "/davi-games"], ["Tarefas e Lições", "/escola/tarefas"],
    ["Criar Atividades", "/escola/criar-atividades"], ["Subir Vídeo", "/escola/subir-video"],
    ["Modo Professor", "/escola/professor"], ["Modo Aluno", "/escola/aluno"],
    ["Modo Casa", "/escola/casa"], ["Minha Evolução", "/escola/minha-evolucao"],
  ]],
  ["Comunicação", "/comunicacao", [
    ["Visão Geral", "/comunicacao"], ["Comunicação Alternativa", "/comunicacao/alternativa"],
    ["Sim e Não", "/comunicacao/sim-nao"], ["Frases Rápidas", "/comunicacao/frases-rapidas"],
    ["Pranchas de Comunicação", "/comunicacao/pranchas"], ["Necessidades e Vontades", "/comunicacao/necessidades"],
  ]],
  ["Acesso e Dispositivos", "/acesso", [
    ["Métodos de Acesso", "/acesso/metodos"], ["DAVI Vision", "/acesso/vision"],
    ["DAVI Conecta", "/acesso/conecta"], ["DAVI Calibrar", "/acesso/calibrar"],
    ["Perfil de Acesso", "/acesso/perfil"], ["BioSinal", "/acesso/biosinal"],
    ["Pareamento Bluetooth", "/acesso/bluetooth"], ["ESP32 e Sem Fio", "/acesso/esp32"],
    ["Teclado, Botão e Sopro", "/acesso/acionadores"],
  ]],
  ["Inteligência Artificial", "/ia", [
    ["Visão Geral", "/ia"], ["Assistente DAVI", "/ia/assistente"],
    ["IA no DAVI Vision", "/ia/vision"], ["IA na Aprendizagem", "/ia/aprendizagem"],
    ["IA na Comunicação", "/ia/comunicacao"], ["IA para Professores", "/ia/professores"],
    ["Arquitetura RAG", "/ia/rag"], ["Modelos Locais e Servidor", "/ia/modelos-locais"],
    ["Ética no Uso de IA", "/ia/etica"],
  ]],
  ["Tecnologias Assistivas", "/tecnologias-assistivas", [
    ["Visão Geral", "/tecnologias-assistivas"], ["Catálogo", "/tecnologias-assistivas/catalogo"],
    ["Dispositivos DAVI", "/tecnologias-assistivas/dispositivos"],
    ["DAVI Assistivo App", "/tecnologias-assistivas/davi-assistivo-app"],
    ["DAVI Imersivo", "/tecnologias-assistivas/davi-imersivo"],
    ["Oficina Maker", "/tecnologias-assistivas/oficina-maker"],
    ["Projetos Abertos", "/tecnologias-assistivas/projetos-abertos"], ["Materiais de Apoio", "/tecnologias-assistivas/materiais"],
  ]],
  ["Evolução e Relatórios", "/evolucao", [
    ["Visão Geral", "/evolucao"], ["Métricas de Aprendizagem", "/evolucao/aprendizagem"],
    ["Métricas de Acesso", "/evolucao/acesso"], ["Relatório do Aluno", "/evolucao/relatorio-aluno"],
    ["Relatório Institucional", "/evolucao/relatorio-institucional"], ["Linha do Tempo", "/evolucao/linha-do-tempo"],
  ]],
  ["Instituições e Comunidades", "/comunidades", [
    ["Famílias", "/comunidades/familias"], ["Escolas", "/comunidades/escolas"],
    ["Cuidadores", "/comunidades/cuidadores"], ["Profissionais", "/comunidades/profissionais"],
    ["Prefeituras", "/comunidades/prefeituras"], ["ONGs", "/comunidades/ongs"],
    ["Comunidades Remotas", "/comunidades/remotas"], ["Povos Indígenas", "/comunidades/povos-indigenas"],
  ]],
  ["Área do Usuário", "/entrar", [
    ["Login", "/entrar"], ["Meu Painel", "/painel"], ["Meu Perfil", "/painel/perfil"],
    ["Alunos", "/painel/alunos"], ["Profissionais", "/painel/profissionais"],
    ["Responsáveis", "/painel/responsaveis"], ["Configurações", "/painel/configuracoes"],
  ]],
];

/* ---------------- CAPA ---------------- */
doc.rect(0, 0, PAGE_W, doc.page.height).fill(DARK);
// cartão branco com logo
const cardW = 360, cardH = 120, cardX = (PAGE_W - cardW) / 2, cardY = 120;
doc.roundedRect(cardX, cardY, cardW, cardH, 16).fill("#ffffff");
const logoPath = existsSync("public/images/davi/novo-logo-projeto-davi.png")
  ? "public/images/davi/novo-logo-projeto-davi.png"
  : "public/davi-logo.png";
if (existsSync(logoPath)) {
  doc.image(logoPath, cardX + 40, cardY + 28, { fit: [cardW - 80, cardH - 56], align: "center" });
}
doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(30)
  .text("Manual do Projeto DAVI", LEFT, 300, { width: WIDTH, align: "center" });
doc.fillColor("#93c5fd").font("Helvetica").fontSize(13)
  .text("Desenvolvimento Assistivo para Vida Independente", LEFT, 344, { width: WIDTH, align: "center" });
doc.fillColor("#cbd5e1").font("Helvetica").fontSize(11)
  .text("Guia do ecossistema de tecnologia assistiva — o que é, para que serve e como o site é organizado.",
    LEFT + 40, 380, { width: WIDTH - 80, align: "center", lineGap: 3 });
// frase central
doc.roundedRect(LEFT + 30, 450, WIDTH - 60, 92, 12).fill("#1e293b");
doc.fillColor("#e2e8f0").font("Helvetica-Oblique").fontSize(13)
  .text("“O DAVI transforma tecnologia assistiva em caminho para comunicação, alfabetização, aprendizagem e vida independente.”",
    LEFT + 52, 470, { width: WIDTH - 104, align: "center", lineGap: 3 });
const hoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
doc.fillColor("#94a3b8").font("Helvetica").fontSize(9.5)
  .text(`Documento gerado em ${hoje}  •  Projeto em construção  •  contato.plataformadavi@gmail.com`,
    LEFT, doc.page.height - 90, { width: WIDTH, align: "center" });

/* ---------------- CONTEÚDO ---------------- */
doc.addPage();
doc.fillColor("#000");

h1(1, "O que é o DAVI");
para("O DAVI — Desenvolvimento Assistivo para Vida Independente — é um ecossistema modular de tecnologia assistiva. Ele integra, em uma única plataforma online, recursos de comunicação, alfabetização, aprendizagem, métodos de acesso, dispositivos assistivos, rastreamento ocular, sinais biológicos, inteligência artificial, jogos educativos, métricas, relatórios, catálogo de tecnologias e oficina maker.");
para("Mais do que um site, o DAVI é pensado como um caminho: cada módulo apoia uma etapa do desenvolvimento da pessoa com deficiência, sempre respeitando o método de acesso que ela consegue usar.");

h1(2, "Objetivo");
para("O objetivo do DAVI é ampliar autonomia, aprendizagem e participação social de pessoas com deficiência, transformando tecnologia assistiva em um caminho concreto para a comunicação, a alfabetização, a escrita, a aprendizagem e a vida independente.");
para("O projeto nasceu de uma experiência real com um aluno chamado Davi, em Valinhos-SP, que não lia nem escrevia por limitações motoras severas. Ao perceber que ele conseguia pressionar algumas teclas, criou-se um protótipo simples para controlar videoaulas e escrever em uma caixa de texto acessível — e os ganhos em autonomia mostraram que, muitas vezes, a limitação não está na capacidade de aprender, mas na falta de ferramentas adequadas de acesso.");

h1(3, "A jornada DAVI");
para("Toda a plataforma é organizada em torno de uma jornada conceitual, do primeiro contato à autonomia:");
bullets([
  "Comunicação  →  Alfabetização  →  Escrita  →  Aprendizagem  →  Participação  →  Autonomia  →  Vida Independente",
]);
para("Cada módulo do ecossistema apoia uma ou mais dessas etapas.");

h1(4, "Módulos do ecossistema");
h2("DAVI Escola");
para("Núcleo pedagógico: Língua Portuguesa, Matemática, videoaulas acessíveis, tarefas e os modos Aluno, Professor e Casa, com atividades demonstrativas e métricas de aprendizagem.");
h2("DAVI Comunicação");
para("Comunicação alternativa para expressar necessidades, vontades e escolhas: sim e não, frases rápidas, pranchas com símbolos e necessidades básicas.");
h2("Acesso e Dispositivos");
para("Como cada pessoa interage com o DAVI. Inclui DAVI Vision (rastreamento ocular, em protótipo), DAVI Conecta (botões, sensores e ESP32 sem fio, em testes iniciais), DAVI BioSinal (sinais do corpo como EEG, EMG, EOG e piscadas — e também sensores no braço, pescoço, mãos e outras regiões, não só na cabeça), calibração e perfil de acesso.");
h2("Inteligência Artificial");
para("A IA como apoio — nunca como substituta de profissionais. Inclui o Assistente DAVI (guia da plataforma), IA na aprendizagem e na comunicação, arquitetura RAG e modelos locais para proteger dados sensíveis.");
h2("DAVI Games");
para("Jogos educativos e gamificação acessível para treinar aprendizagem, comunicação, atenção, decisão e métodos de acesso. Destaque para o Jogo da Velha Acessível com varredura, e possibilidades futuras com realidade virtual e aumentada.");
h2("Tecnologias Assistivas");
para("Catálogo de recursos (prateleira virtual), dispositivos DAVI, oficina maker para adaptar e criar soluções, projetos abertos e materiais de apoio.");
h2("DAVI Assistivo App");
para("Proposta em desenvolvimento para transformar o celular em tecnologia assistiva multifuncional: teclado, mouse, joystick, prancha de comunicação, sensor de movimento, rastreador visual e controle pedagógico conectado à plataforma, aproveitando um aparelho que muitas pessoas já têm.");
h2("DAVI Imersivo");
para("Linha de pesquisa sobre óculos de realidade virtual, aumentada, mista e smart glasses como recursos de acessibilidade, aprendizagem e interação — integrados ao DAVI Vision, Escola, BioSinal, Games e Conecta, com atenção a conforto, segurança e adaptação individual.");
h2("Evolução e Relatórios");
para("Métricas para compreender, apoiar e ampliar possibilidades — sem diagnóstico clínico. Relatórios para família, professor e instituição.");

h1(5, "Métodos de acesso");
para("Não existe um único método de acesso. A mesma atividade pode funcionar por caminhos diferentes, conforme o que a pessoa consegue fazer:");
bullets([
  "Toque, teclado, mouse ou trackball",
  "Botão adaptado, pedal e acionador capacitivo",
  "Varredura automática e varredura por linha e coluna",
  "Olhar / rastreamento visual e permanência do olhar",
  "Sopro, joystick e sensor de cabeça",
  "Dispositivos Bluetooth, ESP32, óculos smart e (futuro) realidade virtual",
]);

h1(6, "Inteligência artificial: apoio, não decisão");
para("A inteligência artificial no DAVI apoia comunicação, aprendizagem, acessibilidade, calibração e criação de atividades. Ela não substitui professores, terapeutas, cuidadores ou avaliações especializadas, e não realiza diagnóstico. Dados sensíveis são processados localmente sempre que possível.");

h1(7, "Para quem é");
bullets([
  "Alunos, famílias e cuidadores",
  "Escolas, professores e profissionais de educação, saúde e reabilitação",
  "Prefeituras, ONGs e instituições",
  "Comunidades remotas e povos indígenas",
]);

h1(8, "Ética, CEP, LGPD e privacidade");
para("Antes de qualquer formulário, teste, observação, coleta de métricas, uso de imagens, gravações ou sinais biológicos com participantes, o projeto deve ser submetido a um Comitê de Ética em Pesquisa (Plataforma Brasil), conforme as normas brasileiras. O DAVI não realiza diagnóstico clínico, não salva imagens da face por padrão e respeita a LGPD. As decisões permanecem sempre com profissionais e responsáveis.");

h1(9, "Status do projeto");
para("A plataforma está online em versão inicial e em construção. Recursos demonstrativos, conceituais, em prototipagem e em testes iniciais convivem de forma transparente, sinalizados por status (Em construção, Protótipo, Testes iniciais, Demonstração, Experimental, Planejado e Área logada). Isso permite apresentar o projeto a parceiros, escolas, prefeituras e comunidades enquanto ele evolui.");

h1(10, "Mapa do site — caminhos do menu");
para("O menu principal organiza o ecossistema em dez áreas. Abaixo, cada área e suas páginas, com o caminho (rota) de cada uma.");
for (const [title, href, items] of menu) {
  ensure(40);
  doc.y += 4;
  doc.fillColor(DARK).font("Helvetica-Bold").fontSize(11).text(`${title}`, LEFT, doc.y, { continued: true });
  doc.fillColor(LIGHT).font("Helvetica").fontSize(9.5).text(`   ${href}`);
  doc.y += 2;
  for (const [label, route] of items) {
    ensure(15);
    const y = doc.y;
    doc.fillColor(GRAY).font("Helvetica").fontSize(9.5).text(label, LEFT + 16, y, { width: 230, continued: false });
    doc.fillColor(BLUE).font("Helvetica").fontSize(9).text(route, LEFT + 250, y, { width: WIDTH - 250 });
    doc.y = y + 13;
  }
  doc.y += 4;
}

h1(11, "Contato");
para("Projeto DAVI — iniciativa independente de tecnologia assistiva, que não representa serviço oficial de governo.");
bullets([
  "E-mail: contato.plataformadavi@gmail.com",
  "Site: o endereço público da plataforma DAVI",
]);

/* ---------------- RODAPÉ / NUMERAÇÃO ---------------- */
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  if (i === range.start) continue; // capa sem rodapé
  // Zera a margem inferior desta página para escrever na área de rodapé
  // sem o PDFKit criar uma página em branco extra.
  doc.page.margins.bottom = 0;
  doc.fillColor(LIGHT).font("Helvetica").fontSize(8);
  doc.text("Manual do Projeto DAVI — Desenvolvimento Assistivo para Vida Independente", LEFT, doc.page.height - 44, {
    width: WIDTH - 40, align: "left", lineBreak: false,
  });
  doc.text(`${i}`, RIGHT - 40, doc.page.height - 44, { width: 40, align: "right", lineBreak: false });
}

doc.end();
console.log("PDF gerado: public/manual-davi.pdf");

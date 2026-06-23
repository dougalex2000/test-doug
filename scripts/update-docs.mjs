/**
 * Atualiza os dois documentos do Projeto DAVI (artigo e resumo) anexando
 * seções complementares ao final, no mesmo estilo, sem alterar o conteúdo
 * original já formatado. Gera um PDF de adendo (pdfkit) e o concatena ao
 * PDF original (pdf-lib).
 */
import fs from "node:fs";
import PDFDocument from "pdfkit";
import { PDFDocument as LibPDF } from "pdf-lib";

const DL = "C:/Users/Douglas/Downloads";

/* --------- gera o PDF de adendo, com cabeçalho corrente e numeração --------- */
function buildAddendum(headerText, startPage, blocks) {
  return new Promise((resolve) => {
    const M = { top: 70, bottom: 60, left: 70, right: 70 };
    const PAGE_W = 595.28, PAGE_H = 841.89; // A4 em pontos
    const doc = new PDFDocument({ size: "A4", margins: M, autoFirstPage: false, bufferPages: true });
    const W = PAGE_W - M.left - M.right;
    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    let pageNo = startPage - 1;
    doc.on("pageAdded", () => {
      pageNo++;
      doc.save();
      doc.fillColor("#7a8699").font("Helvetica").fontSize(9)
        .text(`${headerText} ${pageNo}`, M.left, 34, { width: W, align: "left", lineBreak: false });
      doc.moveTo(M.left, 50).lineTo(M.left + W, 50).strokeColor("#e2e8f0").lineWidth(0.6).stroke();
      doc.restore();
      doc.x = M.left;
      doc.y = M.top;
    });

    const BOTTOM = PAGE_H - M.bottom;
    function ensure(h) { if (doc.y + h > BOTTOM) doc.addPage(); }

    doc.addPage();

    for (const b of blocks) {
      if (b.type === "divider") {
        ensure(70);
        doc.y += 6;
        doc.fillColor("#1e3a8a").font("Helvetica-Bold").fontSize(15)
          .text(b.title, M.left, doc.y, { width: W });
        doc.y += 2;
        doc.fillColor("#64748b").font("Helvetica-Oblique").fontSize(10.5)
          .text(b.subtitle, M.left, doc.y, { width: W });
        doc.moveTo(M.left, doc.y + 8).lineTo(M.left + W, doc.y + 8).strokeColor("#cbd5e1").lineWidth(1).stroke();
        doc.y += 18;
        doc.fillColor("#000");
      } else if (b.type === "h") {
        ensure(40);
        doc.y += 10;
        doc.fillColor("#0f172a").font("Helvetica-Bold").fontSize(12.5)
          .text(b.title, M.left, doc.y, { width: W });
        doc.y += 4;
        doc.fillColor("#000");
      } else if (b.type === "p") {
        doc.font("Helvetica").fontSize(11).fillColor("#1f2937");
        ensure(doc.heightOfString(b.text, { width: W, lineGap: 3 }) + 6);
        doc.text(b.text, M.left, doc.y, { width: W, align: "justify", lineGap: 3 });
        doc.y += 7;
      }
    }
    doc.end();
  });
}

async function appendAddendum(originalPath, addendumBytes, outPath) {
  const orig = await LibPDF.load(fs.readFileSync(originalPath));
  const add = await LibPDF.load(addendumBytes);
  const pages = await orig.copyPages(add, add.getPageIndices());
  pages.forEach((p) => orig.addPage(p));
  fs.writeFileSync(outPath, await orig.save());
  return orig.getPageCount();
}

/* ----------------------------- CONTEÚDO: ARTIGO ----------------------------- */
const artigoBlocks = [
  { type: "divider", title: "Seção complementar — DAVI Assistivo App, DAVI Imersivo, DAVI Emprega e atualizações", subtitle: "Novos módulos e complementos ao ecossistema — junho de 2026" },

  { type: "h", title: "23. DAVI Assistivo App: o celular como tecnologia assistiva multifuncional" },
  { type: "p", text: "O DAVI Assistivo App é uma proposta em desenvolvimento que busca transformar o telefone celular em uma tecnologia assistiva multifuncional, conectada à plataforma DAVI. Em vez de exigir a aquisição de equipamentos especializados e de alto custo, a iniciativa parte de um princípio de acessibilidade econômica: aproveitar um dispositivo que muitas famílias e instituições já possuem, ampliando o alcance da comunicação, da aprendizagem e da autonomia." },
  { type: "p", text: "Conceitualmente, o aplicativo poderá assumir múltiplos papéis de acesso conforme a necessidade de cada pessoa. Poderá funcionar como prancha de escrita para digitar letras, sílabas, palavras e frases; como botão Sim/Não; como painel de botões personalizados; como acionador por movimento (chacoalhar ou inclinar o aparelho) ou por gesto (passar a mão diante da câmera); como recurso de rastreamento ocular ou de movimento de cabeça utilizando a própria câmera; e como dispositivo de comunicação alternativa, com frases, pictogramas e voz sintetizada." },
  { type: "p", text: "Além disso, o celular poderá operar como mouse alternativo, teclado adaptado e joystick para jogos educativos, e ainda como ponte de integração entre sensores físicos, microcontroladores ESP32, Bluetooth, WebSocket, QR Code e a plataforma. O pareamento poderá ocorrer por QR Code, Web Bluetooth, Wi-Fi local, código de sessão ou login na mesma conta, e as interações poderão alimentar as métricas e os relatórios do ecossistema — tempo de resposta, acertos, tentativas, tipo de comando utilizado e evolução da escrita e da comunicação. Trata-se de uma linha de pesquisa e desenvolvimento: as funções descritas representam possibilidades de integração, e nem todas estão concluídas nesta etapa." },

  { type: "h", title: "24. DAVI Imersivo: realidade virtual, aumentada e óculos inteligentes" },
  { type: "p", text: "O DAVI Imersivo propõe investigar o uso de óculos de realidade virtual, realidade aumentada, realidade mista e smart glasses como recursos de acessibilidade, aprendizagem e interação. A proposta não pretende substituir os métodos tradicionais de tecnologia assistiva, mas abrir possibilidades complementares para pessoas que podem se beneficiar de ambientes visuais controlados, experiências guiadas, estímulos personalizados e formas alternativas de interação." },
  { type: "p", text: "Entre as possibilidades de uso estão a aprendizagem imersiva, os jogos educativos, o treino de atenção, a comunicação alternativa e a exploração virtual guiada. A interação poderá ocorrer por olhar, movimento de cabeça, gestos, botões adaptados ou pelo próprio celular, e poderá dialogar com o DAVI Vision (análise de atenção, direção do olhar, escolha e permanência visual) e com o DAVI BioSinal (movimentos residuais, contrações, inclinação, EMG ou sensores de pressão combinados a ambientes imersivos)." },
  { type: "p", text: "Como toda tecnologia de imersão, seu emprego exige cuidado: conforto, segurança, tempo de uso, supervisão adequada e adaptação individual são condições indispensáveis. O DAVI Imersivo é, portanto, tratado como linha de pesquisa e desenvolvimento — integrada aos jogos e à gamificação, aos relatórios e métricas e ao restante do ecossistema — e não como promessa fechada." },

  { type: "h", title: "25. Complemento ao DAVI BioSinal: sinais de diferentes regiões do corpo" },
  { type: "p", text: "Em complemento à seção sobre o DAVI BioSinal, é importante destacar que os sinais biológicos ou de acesso não precisam vir exclusivamente da cabeça. O módulo poderá utilizar sensores posicionados em diferentes partes do corpo, conforme a necessidade e a capacidade motora de cada pessoa. Além dos sinais da cabeça — como EEG, EOG, piscadas e movimentos oculares —, poderão ser explorados sinais no braço, no pescoço, nos ombros, nas mãos, no tronco ou em outras regiões." },
  { type: "p", text: "Esses sinais podem envolver sensores de movimento, EMG, pressão, contração muscular, inclinação corporal, respiração, sopro ou pequenos movimentos residuais. Para algumas pessoas, o melhor comando poderá vir da contração do braço, do movimento do pescoço, da inclinação da cabeça, da tensão muscular no ombro, do piscar dos olhos, do movimento de um dedo, da pressão em um ponto do corpo, da respiração ou de um pequeno movimento residual. O princípio é a flexibilidade: o DAVI BioSinal deve ser adaptável e personalizável conforme a capacidade motora e sensorial de cada usuário." },

  { type: "h", title: "26. Atualização do DAVI Escola — Português: alfabetização por letras e sons" },
  { type: "p", text: "A trilha de Língua Portuguesa ganhou uma área de entrada dedicada à alfabetização, com uma página inicial acolhedora e cards grandes e coloridos para cada letra do alfabeto e para sílabas complexas e sons especiais — como CH, LH, NH, BL, BR, sons nasalados, QU, GU, RR e SS. Cada letra ou som abre uma aula específica." },
  { type: "p", text: "Cada aula reúne uma área de vídeo (preparada para receber vídeos próprios do projeto), controles grandes com atalhos de teclado, modo de varredura automática, exercícios de escolha e de escrita, leitura por voz (TTS) em português do Brasil, retorno positivo ao acerto e mensagens acolhedoras ao tentar novamente, registrando métricas locais de tempo, tentativas e conclusão. A estrutura foi pensada para ser acessível e fácil de expandir." },

  { type: "h", title: "27. DAVI Emprega: emprego apoiado e inclusão profissional" },
  { type: "p", text: "O DAVI Emprega é a frente do ecossistema voltada à inclusão profissional de pessoas com deficiência, organizada em torno da metodologia do Emprego Apoiado. Em vez de funcionar como um simples balcão de vagas, propõe-se como uma ponte entre pessoas com deficiência, famílias, instituições de apoio, profissionais especializados e empresas dispostas a contratar de forma ética e responsável. O pressuposto é que a vida independente também passa pela preparação profissional e pelo acesso ao mundo do trabalho." },
  { type: "p", text: "A metodologia é centrada na pessoa e percorre etapas de perfil, preparação, busca de oportunidades, adaptação do trabalho e acompanhamento — antes, durante e depois da contratação. A iniciativa dialoga com a Lei de Cotas (Lei nº 8.213/1991, art. 93), apresentada de forma educativa, mas reforça que a inclusão deve ir além da obrigação legal, priorizando dignidade, acessibilidade, permanência e desenvolvimento." },
  { type: "p", text: "O DAVI Emprega integra-se aos demais módulos: o DAVI Escola apoia leitura, escrita, matemática e habilidades digitais; a Comunicação Alternativa apoia a comunicação no trabalho; o DAVI Vision, o BioSinal e o Conecta oferecem métodos de acesso; a inteligência artificial apoia currículo, entrevista e planos de desenvolvimento; e os relatórios acompanham a evolução. Nesta etapa é uma proposta conceitual: não há banco de dados, cadastro real ou coleta de dados sensíveis, e qualquer coleta futura exigirá consentimento, segurança e respeito à LGPD." },

  { type: "p", text: "Esta seção complementa o documento original, preservando suas conclusões e sua orientação ética: as funcionalidades aqui descritas são possibilidades de pesquisa e desenvolvimento, e qualquer coleta de dados com participantes deverá ser submetida previamente ao Sistema CEP/Conep, pela Plataforma Brasil." },
];

/* ----------------------------- CONTEÚDO: RESUMO ----------------------------- */
const resumoBlocks = [
  { type: "divider", title: "Atualização — DAVI Assistivo App, DAVI Imersivo, DAVI Emprega e BioSinal", subtitle: "Novos módulos em linguagem simples — junho de 2026" },

  { type: "h", title: "24. DAVI Assistivo App" },
  { type: "p", text: "O DAVI Assistivo App é uma proposta para transformar o celular em uma tecnologia assistiva. A ideia é aproveitar um aparelho que muita gente já tem, em vez de comprar equipamentos caros. O celular poderá funcionar como prancha de escrita, botão Sim/Não, painel de botões personalizados, comunicação por imagens e voz, mouse, teclado adaptado e joystick para jogos. Poderá ainda usar a câmera para reconhecer movimentos, gestos, piscadas ou o olhar, e se conectar à plataforma por QR Code, Bluetooth, Wi-Fi ou código de sessão. As atividades poderão gerar métricas, como tempo de resposta e acertos. É uma proposta em desenvolvimento: as funções descritas poderão funcionar conforme o projeto avança." },

  { type: "h", title: "25. DAVI Imersivo" },
  { type: "p", text: "O DAVI Imersivo é uma área dedicada a óculos de realidade virtual, realidade aumentada, realidade mista e smart glasses. A proposta é estudar como esses recursos podem ajudar na aprendizagem, na comunicação, no treino de atenção e na exploração de ambientes virtuais, com interação por olhar, cabeça, gestos, botões ou celular. Ele poderá se integrar ao DAVI Vision, ao DAVI Escola, ao DAVI Assistivo App, ao DAVI BioSinal e aos jogos educativos. O uso deve sempre considerar conforto, segurança, tempo de uso e adaptação de cada pessoa. São possibilidades de pesquisa, não promessas fechadas." },

  { type: "h", title: "26. BioSinal além da cabeça" },
  { type: "p", text: "O DAVI BioSinal não é só “sensor na cabeça”. Os sinais de acesso podem vir de várias partes do corpo, conforme o que cada pessoa consegue fazer. Além de EEG, EOG e piscadas, é possível explorar sinais no braço, no pescoço, nos ombros, nas mãos ou no tronco, usando sensores de movimento, EMG, pressão, contração muscular, inclinação, respiração, sopro ou pequenos movimentos. Para algumas pessoas, o melhor comando pode ser uma contração do braço, um movimento do pescoço ou de um dedo, ou a própria respiração. O módulo é flexível e se adapta à capacidade motora e sensorial de cada usuário." },

  { type: "h", title: "27. DAVI Emprega" },
  { type: "p", text: "O DAVI Emprega é a área do projeto voltada à inclusão profissional de pessoas com deficiência, usando o Emprego Apoiado. A ideia não é só oferecer vagas, mas aproximar pessoas, famílias, instituições e empresas, cuidando da preparação, da comunicação, da acessibilidade e do acompanhamento antes, durante e depois do trabalho. Ele conversa com o DAVI Escola, a Comunicação Alternativa, o DAVI Vision, o BioSinal, o Conecta e a inteligência artificial, e lembra que a inclusão deve ir além da Lei de Cotas, com dignidade e respeito. Nesta etapa é uma proposta conceitual, sem cadastro nem coleta de dados." },
];

/* --------------------------------- EXECUÇÃO --------------------------------- */
const tarefas = [
  {
    nome: "ARTIGO",
    original: `${DL}/Projeto_DAVI_Artigo_atualizado_com_DAVI_Games (1).pdf`,
    out: `${DL}/Projeto_DAVI_Artigo_atualizado_App_Imersivo.pdf`,
    header: "Projeto DAVI - artigo conceitual - página",
    startPage: 16,
    blocks: artigoBlocks,
  },
  {
    nome: "RESUMO",
    original: `${DL}/Resumo_plataforma_DAVI_atualizado_com_DAVI_Games (1).pdf`,
    out: `${DL}/Resumo_plataforma_DAVI_atualizado_App_Imersivo.pdf`,
    header: "Projeto DAVI - Funcionalidades da plataforma - página",
    startPage: 10,
    blocks: resumoBlocks,
  },
];

for (const t of tarefas) {
  const bytes = await buildAddendum(t.header, t.startPage, t.blocks);
  const total = await appendAddendum(t.original, bytes, t.out);
  console.log(`${t.nome}: gerado ${t.out.split("/").pop()} (${total} páginas)`);
}

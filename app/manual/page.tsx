import type { Metadata } from "next";
import { JourneyDavi, ConceptPage } from "../components/modules";
import {
  IconChat,
  IconChip,
  IconClipboard,
  IconCube,
  IconDocument,
  IconEye,
  IconLightbulb,
  IconShieldCheck,
  IconSparkles,
  IconTouch,
} from "../components/icons";

export const metadata: Metadata = {
  title: "Manual do Projeto DAVI",
  description:
    "Guia inicial do ecossistema de tecnologia assistiva para vida independente.",
};

const workingGroups = [
  "Grupo DAVI Escola — Língua Portuguesa",
  "Grupo DAVI Escola — Matemática",
  "Grupo Videoaulas e Tarefas",
  "Grupo Comunicação Alternativa",
  "Grupo DAVI Vision",
  "Grupo Acessibilidade e Métodos de Acesso",
  "Grupo DAVI Conecta e Dispositivos Sem Fio",
  "Grupo DAVI BioSinal",
  "Grupo Inteligência Artificial",
  "Grupo Catálogo de Tecnologias Assistivas",
  "Grupo Oficina Maker",
  "Grupo DAVI Capacita — Formação e Treinamentos",
  "Grupo Métricas e Relatórios",
  "Grupo Ética, CEP e LGPD",
  "Grupo Acessibilidade e UI/UX",
  "Grupo Comunidades e Instituições",
];

export default function ManualPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "O Projeto", href: "/projeto" }, { label: "Manual do Projeto" }]}
      eyebrow="Manual do Projeto DAVI"
      title="Manual do Projeto DAVI"
      subtitle="Guia inicial do ecossistema de tecnologia assistiva para vida independente."
      actions={
        <a
          href="/manual-davi.pdf"
          download
          className="rounded-lg bg-blue-700 px-5 py-3 font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        >
          ⬇ Baixar manual em PDF
        </a>
      }
      lead={
        <div>
          <p className="max-w-4xl text-xl font-bold leading-9 text-zinc-900">
            O DAVI transforma tecnologia assistiva em caminho para comunicação,
            alfabetização, aprendizagem e vida independente.
          </p>
          <div className="mt-6 overflow-x-auto">
            <JourneyDavi />
          </div>
        </div>
      }
      sections={[
        {
          eyebrow: "1. Apresentação",
          title: "O que é o DAVI",
          paragraphs: [
            "O DAVI — Desenvolvimento Assistivo para Vida Independente — é um ecossistema modular de tecnologia assistiva. Ele integra comunicação, alfabetização, aprendizagem, métodos de acesso, dispositivos assistivos, rastreamento ocular, sinais biológicos, inteligência artificial, métricas, relatórios, catálogo, oficina maker e vida independente.",
            "Esta etapa do projeto organiza a base do site para que cada grande área evolua de forma independente, por diferentes grupos de trabalho, sem quebrar as demais.",
          ],
        },
        {
          eyebrow: "2. Resumo do projeto",
          title: "Um ecossistema, vários módulos",
          paragraphs: [
            "O DAVI não é apenas um site ou um único recurso. É uma plataforma online, em construção, acessível por notebook, computador, tablet ou celular, pensada para escolas, famílias, instituições, comunidades e regiões de difícil acesso.",
          ],
          bullets: [
            "Algumas páginas são conceituais",
            "Algumas funcionalidades são demonstrativas",
            "Alguns módulos estão em prototipagem ou testes iniciais",
            "O projeto não realiza diagnóstico clínico",
            "Coletas com participantes exigem ética, LGPD e Comitê de Ética",
          ],
        },
        {
          eyebrow: "3. Origem do DAVI",
          title: "Da iniciativa de uma professora a um ecossistema",
          paragraphs: [
            "O Projeto DAVI nasceu de uma experiência real de inclusão educacional com Davi, aluno de 9 anos do 4º ano do Ensino Fundamental em Valinhos-SP. A história só foi possível pela iniciativa da professora Alessandra del Castillo, que percebeu as dificuldades de Davi na alfabetização e buscou apoio de um pesquisador para encontrar uma solução tecnológica.",
            "Davi ainda não lia nem escrevia por limitações motoras severas, não por falta de capacidade. Ao notar que ele conseguia pressionar algumas teclas (F1, F2, F3, F4), foi criada uma ferramenta de alfabetização assistida: controle de videoaulas (pausar, repetir), escrita em caixa de texto acessível, leitura por voz do que escrevia, som de aplausos como reforço positivo e registro de métricas (tempo, acertos, erros, progresso).",
            "Em cerca de 40 dias, Davi avançou na alfabetização e passou a escrever frases simples — com impacto também na participação social e na comunicação. A experiência mostrou que, muitas vezes, a limitação não está na capacidade de aprender, mas na falta de ferramentas adequadas de acesso.",
            "Atualmente, o DAVI ganha dimensão de ecossistema com a interação entre os pesquisadores Andressa, Taty, Sara e Douglas, que ampliam a proposta inicial integrando práticas educacionais, tecnologias assistivas, fabricação digital, inteligência artificial e estratégias de inclusão. A história completa está na página Origem do DAVI.",
          ],
        },
        {
          eyebrow: "4. Jornada DAVI",
          title: "Comunicação → … → Vida Independente",
          paragraphs: [
            "A jornada DAVI começa pela comunicação e pelas formas de acesso, passa pela aprendizagem, acompanhamento, tecnologias assistivas, criação de soluções, capacitação e chega ao DAVI Emprega, que busca apoiar autonomia, independência e inclusão profissional.",
            "Os módulos, na ordem da jornada:",
          ],
          bullets: [
            "DAVI Comunica — comunicação alternativa",
            "DAVI Conecta — dispositivos e tecnologias sem fio",
            "DAVI InterCel — celular como interface assistiva",
            "DAVI Vision — acesso por câmera (visual, facial e gestual)",
            "DAVI Imersivo — óculos imersivos e inteligentes",
            "DAVI BioSinal — sinais biológicos (experimental)",
            "DAVI Escola — núcleo pedagógico",
            "DAVI Games — jogos educativos acessíveis",
            "DAVI Assistente — assistente inteligente da plataforma",
            "DAVI Métricas — evolução, métricas e relatórios",
            "DAVI Catálogo — prateleira de tecnologias assistivas",
            "DAVI Maker — oficina maker",
            "DAVI Capacita — formação e treinamentos",
            "DAVI Emprega — balcão de oportunidades e emprego apoiado",
          ],
        },
        {
          eyebrow: "6. DAVI Escola",
          title: "O núcleo pedagógico",
          paragraphs: [
            "O DAVI Escola é o módulo de atividades pedagógicas acessíveis: a pessoa acompanha conteúdos, controla videoaulas, responde atividades, escreve em uma caixa de texto acessível, realiza tarefas e tem a evolução acompanhada por métricas de aprendizagem e de acesso. Reúne Língua Portuguesa, Matemática, videoaulas, tarefas e os modos Aluno, Professor e Casa.",
          ],
        },
        {
          eyebrow: "7. DAVI Comunica",
          title: "Dar voz antes da alfabetização plena",
          paragraphs: [
            "O DAVI Comunica permite expressar necessidades, vontades, respostas e escolhas mesmo antes da alfabetização: sim e não, frases rápidas, pranchas com símbolos, necessidades básicas, emoções e rotina — integrados aos métodos de acesso.",
          ],
        },
        {
          eyebrow: "8. DAVI Vision",
          title: "Rastreamento ocular e interação visual",
          paragraphs: [
            "Módulo de estudo e prototipagem de interação visual por câmera: rastreamento do olhar, posição da cabeça, piscadas, expressões e gestos como possíveis métodos de acesso. Está em prototipagem e testes iniciais, sem finalidade diagnóstica, com processamento local sempre que possível.",
          ],
        },
        {
          eyebrow: "9. DAVI Conecta",
          title: "Dispositivos físicos e comunicação sem fio",
          paragraphs: [
            "Estrutura a comunicação entre a plataforma e dispositivos assistivos físicos — botões, sensores, microcontroladores — por Bluetooth, Web Bluetooth, ESP32 e WebSocket. O objetivo não é só conectar, mas transformar comandos em acesso à aprendizagem e à comunicação.",
          ],
        },
        {
          eyebrow: "9.1. DAVI InterCel",
          title: "Celular como interface assistiva",
          paragraphs: [
            "O DAVI InterCel é o módulo que transforma o celular em uma interface assistiva e em uma extensão dos recursos da plataforma DAVI. Ele poderá ser usado como botão Sim/Não, painel de comandos, teclado adaptado, mouse alternativo, joystick, prancha de comunicação, recurso de escrita, controle de videoaulas, acionador por movimento, gesto ou câmera e ponte com dispositivos assistivos.",
            "A proposta é ampliar as formas de acesso, comunicação, aprendizagem e autonomia, usando o celular como recurso acessível, personalizável e integrado ao Projeto DAVI.",
          ],
        },
        {
          eyebrow: "10. DAVI BioSinal",
          title: "Sinais biológicos como acesso (experimental)",
          paragraphs: [
            "Módulo experimental de pesquisa que estuda EEG, EMG, EOG, piscadas e movimentos preservados como métodos de acesso para quem não usa teclado, mouse, toque, botão ou sopro convencional. Não realiza diagnóstico, não substitui profissionais e exige ética, consentimento e Comitê de Ética.",
          ],
        },
        {
          eyebrow: "11. DAVI Assistente",
          title: "Um guia inteligente da plataforma",
          paragraphs: [
            "Caixa de texto com IA especializada no DAVI para orientar usuários, famílias, professores, cuidadores e equipes técnicas sobre como usar os módulos. A IA apoia comunicação, aprendizagem, acessibilidade, calibração e criação de atividades — sem substituir profissionais nem realizar diagnóstico.",
          ],
        },
        {
          eyebrow: "12. DAVI Catálogo e DAVI Maker",
          title: "Prateleira virtual e fabricação",
          paragraphs: [
            "O catálogo é uma prateleira virtual de recursos prontos. Quando o produto pronto não resolve, a necessidade é encaminhada ao DAVI Maker, que adapta ou cria a solução, testa, registra o aprendizado e atualiza o catálogo.",
          ],
        },
        {
          eyebrow: "13. DAVI Métricas",
          title: "Medir para ampliar, não para limitar",
          paragraphs: [
            "O DAVI Evolução acompanha métricas de aprendizagem e de acesso — tempo de resposta, tentativas, pausas, repetições, escrita produzida e método usado — para apoiar decisões pedagógicas e funcionais. Não é diagnóstico clínico, e qualquer coleta com participantes respeita ética e LGPD.",
          ],
        },
        {
          eyebrow: "13.1. DAVI Capacita",
          title: "Formação e Treinamentos",
          paragraphs: [
            "O DAVI Capacita é o módulo de formação do Projeto DAVI. Ele oferece treinamentos presenciais, remotos ou híbridos para professores, profissionais, familiares, cuidadores, estudantes, pesquisadores e usuários interessados em utilizar a plataforma, aplicar recursos de tecnologia assistiva, criar soluções em ambiente maker, documentar produtos, cadastrar tecnologias no catálogo e compreender conceitos de produto aberto, propriedade intelectual, inovação assistiva e geração de renda.",
            "O módulo também poderá apoiar formações práticas em comunicação alternativa, acessibilidade digital, botões adaptados, dispositivos assistivos, eletrônica, programação, sensores, impressão 3D, corte a laser, CAD, fabricação digital, documentação técnica, desenvolvimento de produtos e formação de multiplicadores — com possibilidade de atividades no CTI Renato Archer. A proposta é transformar conhecimento em autonomia.",
          ],
          tone: "soft",
        },
        {
          eyebrow: "14. Grupos de trabalho",
          title: "Desenvolvimento modular por equipes",
          paragraphs: [
            "O DAVI será desenvolvido por grupos de trabalho. Cada página é independente o suficiente para que equipes diferentes atuem sem quebrar outras partes. Sugestão de grupos:",
          ],
          bullets: workingGroups,
          tone: "soft",
        },
        {
          eyebrow: "15. Ética, CEP, LGPD e privacidade",
          title: "Proteger a pessoa antes de medir",
          paragraphs: [
            "Antes de qualquer formulário, teste, observação, coleta de métricas, uso de imagens, gravações ou sinais biológicos com participantes, o projeto deve ser submetido a um Comitê de Ética em Pesquisa (Plataforma Brasil), conforme as normas brasileiras. A IA é apoio, não decisão automática, e o DAVI não realiza diagnóstico clínico.",
          ],
        },
        {
          eyebrow: "16. Status do projeto",
          title: "Online, em construção, transparente",
          paragraphs: [
            "A plataforma está online em versão inicial e em construção. Recursos demonstrativos, conceituais e em prototipagem convivem de forma transparente, permitindo apresentar o projeto a parceiros, pesquisadores, escolas, prefeituras e comunidades enquanto evolui.",
          ],
        },
      ]}
      cards={{
        eyebrow: "5. Módulos do ecossistema",
        title: "Comece por um módulo",
        items: [
          { title: "DAVI Escola", description: "Núcleo pedagógico.", href: "/escola", icon: <IconDocument className="h-6 w-6" /> },
          { title: "Comunicação", description: "Expressão e escolhas.", href: "/comunicacao", icon: <IconChat className="h-6 w-6" /> },
          { title: "DAVI Vision", description: "Rastreamento ocular.", href: "/acesso/vision", icon: <IconEye className="h-6 w-6" />, status: "Protótipo" },
          { title: "DAVI InterCel", description: "Celular como interface assistiva.", href: "/davi-intercel", icon: <IconTouch className="h-6 w-6" />, status: "Em desenvolvimento" },
          { title: "DAVI Conecta", description: "Dispositivos sem fio.", href: "/acesso/conecta", icon: <IconChip className="h-6 w-6" />, status: "Testes iniciais" },
          { title: "DAVI BioSinal", description: "Sinais biológicos.", href: "/acesso/biosinal", icon: <IconLightbulb className="h-6 w-6" />, status: "Experimental" },
          { title: "DAVI Assistente", description: "Guia com IA.", href: "/ia/assistente", icon: <IconSparkles className="h-6 w-6" />, status: "Demonstração" },
          { title: "Catálogo", description: "Recursos prontos.", href: "/tecnologias-assistivas/catalogo", icon: <IconCube className="h-6 w-6" /> },
          { title: "Evolução", description: "Métricas e relatórios.", href: "/evolucao", icon: <IconClipboard className="h-6 w-6" /> },
          { title: "Ética, CEP e LGPD", description: "Proteção da pessoa.", href: "/projeto/etica", icon: <IconShieldCheck className="h-6 w-6" /> },
        ],
      }}
    />
  );
}

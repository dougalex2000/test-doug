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
  "Grupo DAVI Conecta e Dispositivos Sem Fio",
  "Grupo DAVI BioSinal",
  "Grupo Inteligência Artificial",
  "Grupo Catálogo de Tecnologias Assistivas",
  "Grupo Oficina Maker",
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
          title: "Tudo começou com um aluno",
          paragraphs: [
            "O projeto nasceu do acompanhamento de Davi, um aluno de 9 anos em Valinhos-SP, que ainda não lia nem escrevia por limitações motoras severas. Ao perceber que ele conseguia pressionar algumas teclas, criou-se um protótipo com comandos simples para controlar videoaulas (pausar, avançar, voltar, repetir) e escrever em uma caixa de texto acessível.",
            "Os ganhos em autonomia, confiança e participação mostraram que, muitas vezes, a limitação não está na capacidade de aprender, mas na falta de ferramentas adequadas de acesso.",
          ],
        },
        {
          eyebrow: "4. Jornada DAVI",
          title: "Comunicação → … → Vida Independente",
          paragraphs: [
            "A jornada conceitual do projeto vai da comunicação à vida independente: Comunicação → Alfabetização → Escrita → Aprendizagem → Participação → Autonomia → Vida Independente. Cada módulo apoia uma ou mais dessas etapas.",
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
          eyebrow: "7. Comunicação Alternativa",
          title: "Dar voz antes da alfabetização plena",
          paragraphs: [
            "O DAVI Comunicação permite expressar necessidades, vontades, respostas e escolhas mesmo antes da alfabetização: sim e não, frases rápidas, pranchas com símbolos, necessidades básicas, emoções e rotina — integrados aos métodos de acesso.",
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
          eyebrow: "10. DAVI BioSinal",
          title: "Sinais biológicos como acesso (experimental)",
          paragraphs: [
            "Módulo experimental de pesquisa que estuda EEG, EMG, EOG, piscadas e movimentos preservados como métodos de acesso para quem não usa teclado, mouse, toque, botão ou sopro convencional. Não realiza diagnóstico, não substitui profissionais e exige ética, consentimento e Comitê de Ética.",
          ],
        },
        {
          eyebrow: "11. Assistente DAVI com IA",
          title: "Um guia inteligente da plataforma",
          paragraphs: [
            "Caixa de texto com IA especializada no DAVI para orientar usuários, famílias, professores, cuidadores e equipes técnicas sobre como usar os módulos. A IA apoia comunicação, aprendizagem, acessibilidade, calibração e criação de atividades — sem substituir profissionais nem realizar diagnóstico.",
          ],
        },
        {
          eyebrow: "12. Catálogo e Oficina Maker",
          title: "Prateleira virtual e fabricação",
          paragraphs: [
            "O catálogo é uma prateleira virtual de recursos prontos. Quando o produto pronto não resolve, a necessidade é encaminhada à Oficina Maker, que adapta ou cria a solução, testa, registra o aprendizado e atualiza o catálogo.",
          ],
        },
        {
          eyebrow: "13. Evolução e Relatórios",
          title: "Medir para ampliar, não para limitar",
          paragraphs: [
            "O DAVI Evolução acompanha métricas de aprendizagem e de acesso — tempo de resposta, tentativas, pausas, repetições, escrita produzida e método usado — para apoiar decisões pedagógicas e funcionais. Não é diagnóstico clínico, e qualquer coleta com participantes respeita ética e LGPD.",
          ],
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
          { title: "DAVI Conecta", description: "Dispositivos sem fio.", href: "/acesso/conecta", icon: <IconChip className="h-6 w-6" />, status: "Testes iniciais" },
          { title: "DAVI BioSinal", description: "Sinais biológicos.", href: "/acesso/biosinal", icon: <IconLightbulb className="h-6 w-6" />, status: "Experimental" },
          { title: "Assistente DAVI", description: "Guia com IA.", href: "/ia/assistente", icon: <IconSparkles className="h-6 w-6" />, status: "Demonstração" },
          { title: "Catálogo", description: "Recursos prontos.", href: "/tecnologias-assistivas/catalogo", icon: <IconCube className="h-6 w-6" /> },
          { title: "Evolução", description: "Métricas e relatórios.", href: "/evolucao", icon: <IconClipboard className="h-6 w-6" /> },
          { title: "Ética, CEP e LGPD", description: "Proteção da pessoa.", href: "/projeto/etica", icon: <IconShieldCheck className="h-6 w-6" /> },
        ],
      }}
    />
  );
}

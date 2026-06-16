import type { Metadata } from "next";
import {
  Breadcrumb,
  Illustration,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../../components/SiteShell";
import {
  ConstructionNotice,
  FlowSteps,
  GroupBadge,
  ModuleGrid,
  StatusBadge,
  type ModuleCard,
} from "../../components/modules";
import { BioSinalSimulator } from "../../components/demos";

export const metadata: Metadata = {
  title: "DAVI BioSinal",
  description:
    "Sinais biológicos como caminhos experimentais de acesso assistivo: EEG, EMG, EOG e piscadas.",
};

const sinais: ModuleCard[] = [
  {
    title: "EEG — atividade cerebral",
    description:
      "Lê a atividade elétrica do cérebro. Pode detectar estados de atenção e padrões de intenção e, no futuro, abrir interfaces cérebro-computador para quem não tem nenhum movimento voluntário.",
  },
  {
    title: "EMG — sinais musculares",
    description:
      "Capta a contração de músculos preservados — uma sobrancelha, o canto da boca, um dedo. Mesmo um movimento mínimo vira um acionador confiável, como um clique.",
  },
  {
    title: "EOG — movimento dos olhos",
    description:
      "Detecta a direção do olhar (esquerda, direita, cima, baixo) pela diferença elétrica ao redor dos olhos — útil para navegar e escolher mesmo com pouca mobilidade da cabeça.",
  },
  {
    title: "Piscadas",
    description:
      "Uma piscada intencional vira confirmação ou clique; piscadas duplas ou longas podem virar comandos diferentes, separando o ato voluntário do piscar natural.",
  },
  {
    title: "Sinais combinados",
    description:
      "Juntar EMG, EOG e piscadas amplia o repertório: mais comandos, mais confiáveis, adaptados ao que cada pessoa consegue fazer com mais constância.",
  },
];

const acionamentos = [
  "Selecionar itens em varredura automática",
  "Confirmar escolhas (sim e não)",
  "Indicar direção e mover o cursor",
  "Escrever letra a letra com varredura",
  "Controlar videoaulas: pausar, voltar, repetir",
  "Navegar pranchas de comunicação",
  "Disparar frases rápidas",
  "Brincar com jogos de causa e efeito",
];

export default function BioSinalPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ label: "Acesso e Dispositivos", href: "/acesso" }, { label: "BioSinal" }]}
      />
      <PageHero
        eyebrow="DAVI BioSinal"
        title="Sinais do corpo como caminhos de acesso"
        description="EEG, EMG, EOG, piscadas e movimentos preservados como possíveis métodos de acesso para quem não consegue usar teclado, mouse, toque, botão ou sopro."
      />

      <div className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <StatusBadge status="Experimental" />
          <GroupBadge group="Grupo DAVI BioSinal" />
        </div>
      </div>

      {/* O que é — texto + foto controlada */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="O que é o DAVI BioSinal"
              title="Quando nenhum movimento comum é possível"
            />
            <div className="mt-5 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                O DAVI BioSinal é um módulo experimental de pesquisa que estuda
                sinais biológicos como métodos de acesso assistivo. A ideia é
                simples e poderosa: transformar pequenos sinais do corpo —
                elétricos ou musculares — em comandos para comunicar, aprender e
                participar.
              </p>
              <p>
                É voltado especialmente a pessoas com mobilidade muito reduzida,
                para quem olhar, sopro, botão e toque não são viáveis ou
                confiáveis.
              </p>
            </div>
          </div>
          <Illustration
            name="biosinal"
            alt="Criança usando uma touca de eletrodos de eletroencefalografia (EEG), com três traçados de ondas cerebrais (azul, roxo e vermelho) ao lado, em ambiente clínico"
            fit="cover"
            className="aspect-[16/10]"
          />
        </div>
      </section>

      {/* Possibilidades de leitura */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Possibilidades de leitura"
            title="O que cada sinal pode revelar"
            description="Cada tipo de sinal abre uma porta diferente de acesso. A escolha depende do que a pessoa consegue fazer com mais constância."
          />
          <div className="mt-10">
            <ModuleGrid items={sinais} />
          </div>
        </div>
      </section>

      {/* O que pode acionar */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="Do sinal à ação"
            title="O que os biossinais podem acionar no DAVI"
            description="Um único sinal confiável, combinado à varredura, já abre comunicação, escrita e controle de atividades."
          />
          <ul className="grid gap-2 sm:grid-cols-2">
            {acionamentos.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-zinc-200 bg-white p-3 text-sm font-semibold leading-6 text-zinc-800 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Equipamentos e integração */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Equipamentos e integração"
            title="Baixo custo, código aberto e integração com o DAVI Conecta"
            description="Os sinais lidos por sensores chegam à plataforma pelo mesmo caminho dos demais dispositivos sem fio."
          />
          <div className="mt-8 overflow-x-auto">
            <FlowSteps
              steps={["Sensor no corpo", "ESP32 / placa", "Bluetooth ou WebSocket", "DAVI Conecta", "Ação na plataforma"]}
            />
          </div>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Sensores de baixo custo",
              "ESP32 e microcontroladores",
              "Bluetooth, WebSocket e Python",
              "Referências: OpenBCI, Muse, NeuroSky",
              "Sensores EMG simples",
              "Sensores de piscada",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-zinc-200 bg-white p-3 text-sm font-semibold leading-6 text-zinc-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Simulador */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Experimente"
            title="Simulador BioSinal"
            description="Dispare sinais simulados e veja como cada um geraria um evento de acesso. Nenhum sinal real é capturado."
          />
          <div className="mt-8">
            <BioSinalSimulator />
          </div>
        </div>
      </section>

      {/* Ética */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl space-y-6">
          <ConstructionNotice title="Experimental — ética em primeiro lugar">
            O BioSinal é experimental, não realiza diagnóstico clínico e não
            substitui profissionais. Exige ética, consentimento, proteção de
            dados e privacidade. Qualquer pesquisa com participantes deve passar
            por Comitê de Ética em Pesquisa.
          </ConstructionNotice>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/acesso/conecta">Ver DAVI Conecta</LinkButton>
            <LinkButton href="/projeto/etica" variant="secondary">
              Ética, CEP e LGPD
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

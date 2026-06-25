import type { Metadata } from "next";
import {
  Breadcrumb,
  InfoGrid,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Métodos de Acesso Assistivo",
  description:
    "Entrada multimodal assistiva: olhar, toque, acionadores, sopro, inclinação da cabeça, joystick, pedal, voz e varredura automática.",
};

const accessMethodCards = [
  {
    title: "Olhar",
    description:
      "Seleção por zonas da tela usando rastreamento visual com webcam e seleção por permanência.",
  },
  {
    title: "Toque",
    description:
      "Telas sensíveis, teclados ampliados e superfícies capacitivas que respondem ao toque leve.",
  },
  {
    title: "Acionador físico",
    description:
      "Botões adaptados de diferentes tamanhos e sensibilidades, posicionados onde o movimento existe.",
  },
  {
    title: "Sopro",
    description:
      "Sensores que transformam o sopro em comando de seleção ou confirmação.",
  },
  {
    title: "Inclinação da cabeça",
    description:
      "Movimentos da cabeça controlam o cursor ou alternam opções na tela.",
  },
  {
    title: "Joystick",
    description:
      "Joysticks adaptados com empunhadura ampla para controle de direção e seleção.",
  },
  {
    title: "Pedal",
    description:
      "Acionamento com os pés para quem tem melhor controle de membros inferiores.",
  },
  {
    title: "Sensor de proximidade",
    description:
      "Detecção de aproximação da mão ou de outra parte do corpo, sem necessidade de contato.",
  },
  {
    title: "Voz",
    description:
      "Comandos de voz para quem tem fala funcional, mesmo que com vocabulário reduzido.",
  },
  {
    title: "Varredura automática",
    description:
      "As opções são percorridas automaticamente; um único acionador confirma a escolha.",
  },
  {
    title: "Olhar + confirmação física",
    description:
      "Combinação multimodal: o olhar aponta e um botão, sopro ou toque confirma a seleção.",
  },
];

const terminology = [
  {
    title: "Entrada Multimodal Assistiva",
    description:
      "Combinação de dois ou mais métodos de acesso para dar mais precisão e conforto ao usuário.",
  },
  {
    title: "Acionadores Assistivos",
    description:
      "Dispositivos físicos de acionamento: botões, pedais, sensores capacitivos e de proximidade.",
  },
  {
    title: "Interfaces Físicas Assistivas",
    description:
      "Equipamentos que conectam acionadores e sensores ao computador ou tablet.",
  },
  {
    title: "Acessórios e Suportes",
    description:
      "Apoios de cabeça, suportes de tablet, keyguards e estruturas de posicionamento.",
  },
];

export default function MetodosDeAcessoPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Recursos" }, { label: "Métodos de Acesso" }]} />
      <PageHero
        eyebrow="Métodos de Acesso Assistivo"
        title="Cada pessoa tem uma forma possível de acesso"
        description="O DAVI avalia e combina diferentes métodos de entrada — olhar, toque, acionadores, sopro, cabeça, joystick, pedal, voz e varredura — para encontrar o caminho de interação de cada usuário."
        actions={
          <>
            <LinkButton href="/avaliacao">Como avaliamos o acesso</LinkButton>
            <LinkButton href="/galeria" variant="secondary">
              Dispositivos de entrada
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Métodos disponíveis"
            title="Do toque ao olhar, do sopro à voz"
            description="Nenhum método é melhor que outro: o melhor método é o que funciona para a pessoa, com conforto e o mínimo de fadiga."
          />
          <div className="mt-10">
            <InfoGrid items={accessMethodCards} columns="lg:grid-cols-4" />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Nomenclatura profissional"
            title="Como o DAVI organiza os dispositivos de entrada"
            description="Os nomes seguem a terminologia da tecnologia assistiva, não a do hardware usado na prototipagem."
          />
          <div className="mt-10">
            <InfoGrid items={terminology} columns="lg:grid-cols-4" />
          </div>
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-base leading-7 text-zinc-700">
              Microcontroladores como <strong>ESP32</strong>,{" "}
              <strong>Arduino</strong>, <strong>RP2040</strong> e{" "}
              <strong>Raspberry Pi Pico</strong> aparecem no projeto apenas
              como exemplos técnicos de prototipagem na oficina maker — eles
              são o meio, não o nome da solução. O que define cada dispositivo
              é o método de acesso que ele oferece à pessoa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Próximos passos"
            title="Teste, combine e personalize"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/avaliacao">Avaliação Funcional</LinkButton>
            <LinkButton href="/tecnologias-assistivas/oficina-maker" variant="secondary">
              DAVI Maker
            </LinkButton>
            <LinkButton href="/comunicacao/alternativa" variant="secondary">
              Comunicação Alternativa
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

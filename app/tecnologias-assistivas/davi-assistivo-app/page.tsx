import type { Metadata } from "next";
import Image from "next/image";
import {
  Breadcrumb,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../../components/SiteShell";
import {
  ConstructionNotice,
  GroupBadge,
  ModuleGrid,
  StatusBadge,
  type ModuleCard,
} from "../../components/modules";
import {
  IconChat,
  IconCheckCircle,
  IconChip,
  IconClipboard,
  IconCube,
  IconDocument,
  IconEye,
  IconGamepad,
  IconHeartHand,
} from "../../components/icons";

export const metadata: Metadata = {
  title: "DAVI Assistivo App",
  description:
    "Celular como tecnologia assistiva multifuncional conectada ao Projeto DAVI.",
};

const funcoes = [
  "Prancha ou tablet de escrita para letras, palavras e frases",
  "Botão Sim / Não",
  "Painel com vários botões personalizados",
  "Acionador por movimento (chacoalhar ou inclinar)",
  "Acionador por gesto (passar a mão na frente da câmera)",
  "Rastreamento ocular ou de cabeça pela câmera",
  "Controle remoto da plataforma DAVI",
  "Comunicação alternativa com frases, pictogramas e voz",
  "Interface para exercícios do DAVI Escola",
  "Joystick para jogos educativos e gamificação",
  "Mouse alternativo",
  "Teclado adaptado",
  "Ponte entre sensores, ESP32, Bluetooth, WebSocket, QR Code e o DAVI",
];

const secoes: ModuleCard[] = [
  {
    title: "O celular como ponte de acesso",
    description:
      "Poderá conectar a pessoa à plataforma, aos exercícios, aos jogos, aos botões adaptados e aos recursos de comunicação — tudo a partir de um aparelho que ela já tem.",
    icon: <IconChip className="h-6 w-6" />,
  },
  {
    title: "Comunicação alternativa",
    description:
      "Poderá funcionar como prancha AAC, com botões, imagens, pictogramas, frases prontas, voz e leitura por TTS.",
    icon: <IconChat className="h-6 w-6" />,
  },
  {
    title: "Escrita, português e matemática",
    description:
      "Poderá ser usado no DAVI Escola para escrever letras, sílabas, palavras, frases e números, e para responder atividades.",
    icon: <IconDocument className="h-6 w-6" />,
  },
  {
    title: "Botões personalizados",
    description:
      "Botões grandes como Sim, Não, Repetir, Quero água, Banheiro, Estou cansado, Quero parar, Preciso de ajuda e Terminei.",
    icon: <IconCheckCircle className="h-6 w-6" />,
  },
  {
    title: "Controle por movimento e câmera",
    description:
      "Poderá explorar chacoalhar, inclinar, tocar, piscar, mover a cabeça, passar a mão na frente da câmera, olhar para botões e tempo de permanência.",
    icon: <IconEye className="h-6 w-6" />,
  },
  {
    title: "Joystick, mouse e teclado adaptado",
    description:
      "Controle de jogos, navegação na plataforma, teclado com letras grandes, teclado silábico e varredura.",
    icon: <IconGamepad className="h-6 w-6" />,
  },
  {
    title: "Pareamento com a plataforma DAVI",
    description:
      "Possibilidades de integração por QR Code, WebSocket, Web Bluetooth, Bluetooth, Wi-Fi local, mesma conta ou código de sessão.",
    icon: <IconCube className="h-6 w-6" />,
  },
  {
    title: "Métricas e relatórios",
    description:
      "Poderá registrar tempo de resposta, acertos, erros, tentativas, tipo de comando, evolução da escrita, comunicação e participação.",
    icon: <IconClipboard className="h-6 w-6" />,
  },
  {
    title: "Baixo custo e acessibilidade",
    description:
      "Aproveita celulares já existentes, reduzindo a necessidade de dispositivos caros e ampliando o acesso à comunicação, à aprendizagem e à autonomia.",
    icon: <IconHeartHand className="h-6 w-6" />,
  },
];

const botoesExemplo = [
  "Sim",
  "Não",
  "Repetir",
  "Quero água",
  "Banheiro",
  "Estou cansado",
  "Quero parar",
  "Preciso de ajuda",
  "Terminei",
];

export default function DaviAssistivoAppPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Tecnologias Assistivas", href: "/tecnologias-assistivas" },
          { label: "DAVI Assistivo App" },
        ]}
      />
      <PageHero
        eyebrow="DAVI Assistivo App"
        title="DAVI Assistivo App"
        description="Celular como tecnologia assistiva multifuncional conectada ao Projeto DAVI."
        actions={
          <>
            <LinkButton href="#funcoes">Ver possibilidades</LinkButton>
            <LinkButton href="/escola/portugues" variant="secondary">
              DAVI Escola
            </LinkButton>
          </>
        }
      />

      <div className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <StatusBadge status="Planejado" />
          <GroupBadge group="Grupo Acessibilidade e UI/UX" />
        </div>
      </div>

      {/* Imagem + introdução */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <Image
              src="/images/davi/app-celular-projeto-davi.png"
              alt="Celular funcionando como tecnologia assistiva conectada ao Projeto DAVI"
              width={1200}
              height={900}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="A proposta"
              title="Transformar o celular em tecnologia assistiva"
            />
            <div className="mt-5 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                O DAVI Assistivo App é uma proposta em desenvolvimento para
                transformar o celular em uma tecnologia assistiva multifuncional,
                capaz de funcionar como teclado, mouse, joystick, prancha de
                comunicação, sensor de movimento, rastreador visual e controle
                pedagógico conectado à plataforma DAVI.
              </p>
              <p>
                A ideia é aproveitar um equipamento que muitas pessoas já têm,
                reduzindo a necessidade de comprar dispositivos caros e ampliando
                o acesso à comunicação, à aprendizagem e à autonomia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O celular poderá funcionar como */}
      <section id="funcoes" className="scroll-mt-24 border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Possibilidades"
            title="O celular poderá funcionar como…"
            description="Um único aparelho assumindo vários papéis de acesso, conforme a necessidade de cada pessoa."
          />
          <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {funcoes.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-white p-3 text-sm font-semibold leading-6 text-zinc-800 shadow-sm"
              >
                <IconCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Seções temáticas em cards */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Como pode ser usado"
            title="Recursos do DAVI Assistivo App"
          />
          <div className="mt-10">
            <ModuleGrid items={secoes} />
          </div>

          <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-black uppercase tracking-wide text-blue-800">
              Exemplos de botões personalizados
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {botoesExemplo.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-blue-200 bg-white px-4 py-2 text-base font-black text-blue-800"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nota de desenvolvimento */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl space-y-6">
          <ConstructionNotice title="Proposta em desenvolvimento">
            Esta é uma linha de pesquisa e desenvolvimento. As funções descritas
            são possibilidades de integração — poderão permitir, poderão funcionar
            e poderão ser exploradas conforme o projeto evolui. Nem todas estão
            prontas nesta etapa.
          </ConstructionNotice>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/acesso/conecta">DAVI Conecta</LinkButton>
            <LinkButton href="/davi-games" variant="secondary">
              DAVI Games
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

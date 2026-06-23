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
  IconCheckCircle,
  IconChip,
  IconClipboard,
  IconDocument,
  IconEye,
  IconGamepad,
  IconLightbulb,
  IconShieldCheck,
  IconSparkles,
} from "../../components/icons";

export const metadata: Metadata = {
  title: "DAVI Imersivo",
  description:
    "Realidade virtual, aumentada, mista e smart glasses como possibilidades assistivas e educacionais no Projeto DAVI.",
};

const possibilidades = [
  "Aprendizagem imersiva",
  "Jogos educativos",
  "Treino de atenção",
  "Comunicação alternativa",
  "Exploração virtual guiada",
  "Interação por olhar, cabeça, mãos, botões ou celular",
  "Apoio à inclusão",
  "Atividades de autonomia",
  "Rastreamento ocular por câmera (experimentos)",
  "Estudos de interação por cabeça, olhar, gesto e permanência",
  "Integração com sensores corporais e dispositivos externos",
  "Integração com relatórios e métricas",
];

const secoes: ModuleCard[] = [
  {
    title: "Aprendizagem e exploração guiada",
    description:
      "Atividades educativas, alfabetização, matemática, ambientes virtuais, jogos e experiências controladas que apoiam a participação.",
    icon: <IconDocument className="h-6 w-6" />,
  },
  {
    title: "Interação por olhar, cabeça, gesto e permanência",
    description:
      "Possibilidades de controle por rastreamento ocular, movimento de cabeça, gestos, botões, celular ou sensores externos.",
    icon: <IconEye className="h-6 w-6" />,
  },
  {
    title: "Integração com DAVI Vision",
    description:
      "No futuro, câmeras e sensores poderão apoiar análise de atenção, direção do olhar, escolha visual e permanência em elementos da tela.",
    icon: <IconEye className="h-6 w-6" />,
  },
  {
    title: "Integração com DAVI BioSinal",
    description:
      "Sinais corporais — movimentos residuais, contrações, inclinação, EMG ou sensores de pressão — poderão ser combinados com ambientes imersivos.",
    icon: <IconLightbulb className="h-6 w-6" />,
  },
  {
    title: "Jogos, gamificação e autonomia",
    description:
      "Jogos educativos para comunicação, alfabetização, matemática, atenção, causa e efeito e participação ativa.",
    icon: <IconGamepad className="h-6 w-6" />,
  },
  {
    title: "Métricas e relatórios",
    description:
      "A plataforma poderá registrar tempo de interação, escolhas, respostas, permanência visual, acertos, tentativas e evolução.",
    icon: <IconClipboard className="h-6 w-6" />,
  },
];

const integracoes: ModuleCard[] = [
  { title: "DAVI Vision", description: "Olhar, atenção e escolha visual.", href: "/acesso/vision", icon: <IconEye className="h-6 w-6" /> },
  { title: "DAVI Escola", description: "Atividades imersivas de aprendizagem.", href: "/escola", icon: <IconDocument className="h-6 w-6" /> },
  { title: "DAVI Assistivo App", description: "Celular como controle do ambiente.", href: "/tecnologias-assistivas/davi-assistivo-app", icon: <IconChip className="h-6 w-6" /> },
  { title: "DAVI BioSinal", description: "Sinais do corpo combinados ao imersivo.", href: "/acesso/biosinal", icon: <IconLightbulb className="h-6 w-6" /> },
  { title: "DAVI Games", description: "Jogos e gamificação imersivos.", href: "/davi-games", icon: <IconGamepad className="h-6 w-6" /> },
  { title: "DAVI Conecta", description: "Dispositivos e sensores externos.", href: "/acesso/conecta", icon: <IconChip className="h-6 w-6" /> },
];

export default function DaviImersivoPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Tecnologias Assistivas", href: "/tecnologias-assistivas" },
          { label: "DAVI Imersivo" },
        ]}
      />
      <PageHero
        eyebrow="DAVI Imersivo"
        title="DAVI Imersivo"
        description="Realidade virtual, realidade aumentada, realidade mista e smart glasses como possibilidades assistivas e educacionais."
        actions={
          <>
            <LinkButton href="#possibilidades">Ver possibilidades</LinkButton>
            <LinkButton href="/acesso/vision" variant="secondary">
              DAVI Vision
            </LinkButton>
          </>
        }
      />

      <div className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <StatusBadge status="Planejado" />
          <GroupBadge group="Grupo DAVI Vision" />
        </div>
      </div>

      {/* O que é + imagem */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="O que é o DAVI Imersivo"
              title="Novas formas de interagir, aprender e participar"
            />
            <div className="mt-5 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                O DAVI Imersivo propõe investigar o uso de óculos de realidade
                virtual, realidade aumentada, realidade mista e smart glasses
                como recursos de acessibilidade, aprendizagem e interação. Esses
                dispositivos poderão ampliar as possibilidades de comunicação,
                exploração de ambientes, jogos educativos, treino de atenção e
                interação por olhar, movimento de cabeça, gestos, botões
                adaptados ou celular.
              </p>
              <p>
                A proposta não é substituir os métodos tradicionais de tecnologia
                assistiva, mas abrir novas possibilidades para pessoas que podem
                se beneficiar de ambientes visuais controlados, experiências
                guiadas, estímulos personalizados e formas alternativas de
                interação.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <Image
              src="/images/davi/davi-xr-davi-imersivo.png"
              alt="Óculos imersivos e realidade virtual integrados ao Projeto DAVI"
              width={1200}
              height={900}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* Possibilidades de uso */}
      <section id="possibilidades" className="scroll-mt-24 border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Possibilidades de uso"
            title="Caminhos que o imersivo pode abrir"
            description="Linhas de desenvolvimento e aplicação — possibilidades, não promessas fechadas."
          />
          <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {possibilidades.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-white p-3 text-sm font-semibold leading-6 text-zinc-800 shadow-sm"
              >
                <IconCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Seções temáticas */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Como pode ser explorado" title="Frentes do DAVI Imersivo" />
          <div className="mt-10">
            <ModuleGrid items={secoes} />
          </div>
        </div>
      </section>

      {/* Integração com o ecossistema */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Integração"
            title="Conectado ao ecossistema DAVI"
            description="O imersivo dialoga com os outros módulos do projeto."
          />
          <div className="mt-10">
            <ModuleGrid items={integracoes} columns="lg:grid-cols-3" />
          </div>
        </div>
      </section>

      {/* Pesquisa, cuidado e acessibilidade */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-amber-800">
              <IconShieldCheck className="h-5 w-5" /> Pesquisa, cuidado e acessibilidade
            </p>
            <p className="mt-2 max-w-3xl text-base leading-7 text-zinc-800">
              O uso de realidade virtual ou aumentada deve considerar conforto,
              segurança, tempo de uso, acessibilidade, supervisão adequada e
              adaptação individual. É uma linha de pesquisa e desenvolvimento,
              tratada com responsabilidade.
            </p>
          </div>
          <ConstructionNotice title="Linha de desenvolvimento" tone="blue">
            <span className="inline-flex items-center gap-2">
              <IconSparkles className="h-5 w-5" />
              As possibilidades aqui descritas poderão ser exploradas conforme o
              projeto evolui — não são promessas fechadas, e sim caminhos de
              pesquisa e aplicação assistiva e educacional.
            </span>
          </ConstructionNotice>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/acesso/vision">DAVI Vision</LinkButton>
            <LinkButton href="/davi-games" variant="secondary">
              DAVI Games
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

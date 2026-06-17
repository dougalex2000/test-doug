import Image from "next/image";
import type { Metadata } from "next";
import {
  LinkButton,
  PageShell,
  SectionHeader,
} from "./components/SiteShell";
import {
  JourneyDavi,
  ModuleGrid,
  type ModuleCard,
} from "./components/modules";
import { AssistiveGallery } from "./components/AssistiveGallery";
import { assistiveGallery } from "./lib/assistiveGallery";
import {
  IconChat,
  IconChip,
  IconClipboard,
  IconCube,
  IconDocument,
  IconEye,
  IconLightbulb,
  IconSparkles,
  IconWrench,
} from "./components/icons";

export const metadata: Metadata = {
  title: "DAVI — Desenvolvimento Assistivo para Vida Independente",
  description:
    "Um ecossistema de tecnologia assistiva para comunicação, alfabetização, aprendizagem e autonomia.",
};

const mainModules: ModuleCard[] = [
  {
    title: "DAVI Escola",
    description:
      "Português, Matemática, videoaulas e tarefas acessíveis — o núcleo pedagógico.",
    href: "/escola",
    icon: <IconDocument className="h-6 w-6" />,
    status: "Demonstração",
  },
  {
    title: "DAVI Comunicação",
    description:
      "Comunicação alternativa para expressar necessidades, escolhas e respostas.",
    href: "/comunicacao",
    icon: <IconChat className="h-6 w-6" />,
    status: "Demonstração",
  },
  {
    title: "DAVI Vision",
    description:
      "Rastreamento ocular e interação visual por câmera como método de acesso.",
    href: "/acesso/vision",
    icon: <IconEye className="h-6 w-6" />,
    status: "Protótipo",
  },
  {
    title: "DAVI Conecta",
    description:
      "Integração com botões, sensores, ESP32 e dispositivos sem fio.",
    href: "/acesso/conecta",
    icon: <IconChip className="h-6 w-6" />,
    status: "Testes iniciais",
  },
  {
    title: "DAVI BioSinal",
    description:
      "Sinais biológicos (EEG, EMG, EOG, piscadas) como caminhos experimentais de acesso.",
    href: "/acesso/biosinal",
    icon: <IconLightbulb className="h-6 w-6" />,
    status: "Experimental",
  },
  {
    title: "Assistente DAVI com IA",
    description:
      "Um guia inteligente para ajudar a usar a plataforma — apoia, não decide.",
    href: "/ia/assistente",
    icon: <IconSparkles className="h-6 w-6" />,
    status: "Demonstração",
  },
  {
    title: "Catálogo de Tecnologias Assistivas",
    description:
      "Prateleira virtual de recursos para comunicação, aprendizagem e autonomia.",
    href: "/tecnologias-assistivas/catalogo",
    icon: <IconCube className="h-6 w-6" />,
  },
  {
    title: "Oficina Maker",
    description:
      "Adaptar, criar, testar e documentar tecnologias assistivas de baixo custo.",
    href: "/tecnologias-assistivas/oficina-maker",
    icon: <IconWrench className="h-6 w-6" />,
  },
  {
    title: "Evolução e Relatórios",
    description:
      "Métricas para compreender, apoiar e ampliar possibilidades — sem diagnóstico.",
    href: "/evolucao",
    icon: <IconClipboard className="h-6 w-6" />,
  },
];

const audiences = [
  "Alunos",
  "Famílias",
  "Escolas",
  "Professores",
  "Cuidadores",
  "Prefeituras",
  "ONGs",
  "Comunidades remotas",
  "Povos indígenas",
  "Profissionais de educação, saúde e reabilitação",
];

const homeTaHighlights = [
  "comunicacao-alternativa-tablet-acionador",
  "interfaces-botao-sopro-sensor",
  "controle-ambiente-assistivo",
  "cadeira-rodas-eletrica-tablet",
]
  .map((slug) => assistiveGallery.find((item) => item.slug === slug))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));

export default function Home() {
  return (
    <PageShell>
      {/* Hero principal */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="w-fit rounded-lg bg-blue-50 px-4 py-2 text-sm font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
              Ecossistema de tecnologia assistiva
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
              DAVI — Desenvolvimento Assistivo para Vida Independente
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-zinc-800">
              Um ecossistema de tecnologia assistiva para comunicação,
              alfabetização, aprendizagem e autonomia.
            </p>
            <p className="mt-6 max-w-2xl rounded-2xl border-l-4 border-green-600 bg-white p-5 text-lg font-bold italic leading-8 text-zinc-800 shadow-sm">
              “O DAVI transforma tecnologia assistiva em caminho para
              comunicação, alfabetização, aprendizagem e vida independente.”
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="/projeto">Conhecer o projeto</LinkButton>
              <LinkButton href="/escola" variant="secondary">
                Acessar DAVI Escola
              </LinkButton>
              <LinkButton href="/tecnologias-assistivas" variant="secondary">
                Ver tecnologias assistivas
              </LinkButton>
              <LinkButton href="/ia/assistente" variant="secondary">
                Conhecer o Assistente DAVI
              </LinkButton>
              <LinkButton href="/manual" variant="secondary">
                Ler o manual do projeto
              </LinkButton>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl shadow-blue-950/10">
            <div className="bg-white px-6 py-8">
              <Image
                src="/davi-logo.png"
                alt="Projeto DAVI - Desenvolvimento Assistivo para a Vida Independente"
                width={1226}
                height={367}
                priority
                className="mx-auto h-auto w-full max-w-[560px]"
              />
            </div>
            <div className="relative min-h-[240px] overflow-hidden border-t border-zinc-100">
              <Image
                src="/hero.jpg"
                alt="Ambiente de tecnologia assistiva com computador e dispositivo de apoio"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/35 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Aviso transparente */}
      <section className="border-b border-zinc-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-7xl rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-3 py-1 text-sm font-black text-amber-900">
            <span aria-hidden="true">🚧</span> Plataforma em construção
          </span>
          <p className="mt-3 max-w-4xl text-lg leading-8 text-zinc-800">
            A plataforma DAVI está em fase inicial de estruturação online.
            Algumas páginas apresentam a visão do ecossistema e determinados
            recursos ainda estão em desenvolvimento, prototipagem ou testes
            iniciais.
          </p>
        </div>
      </section>

      {/* Jornada DAVI */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="A jornada DAVI"
            title="Da comunicação à vida independente"
            description="Cada módulo do ecossistema apoia uma etapa desse caminho contínuo."
          />
          <div className="mt-8 overflow-x-auto">
            <JourneyDavi />
          </div>
        </div>
      </section>

      {/* Cards principais */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Módulos do ecossistema"
            title="Tudo o que o DAVI integra"
            description="Áreas independentes que evoluem por grupos de trabalho, conectadas pela mesma jornada."
          />
          <div className="mt-10">
            <ModuleGrid items={mainModules} />
          </div>
        </div>
      </section>

      {/* Por que o DAVI existe */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Por que o DAVI existe?"
              title="Tudo começou com um aluno chamado Davi"
            />
            <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                O projeto nasceu do acompanhamento de Davi, um aluno de 9 anos em
                Valinhos-SP que ainda não lia nem escrevia por causa de
                limitações motoras severas que impediam o uso de lápis e papel.
              </p>
              <p>
                Ao perceber que ele conseguia pressionar algumas teclas, foi
                criado um protótipo com comandos simples para controlar
                videoaulas — pausar, avançar, voltar, repetir conteúdos — e
                escrever em uma caixa de texto acessível. Os ganhos em autonomia,
                confiança e participação mudaram tudo.
              </p>
            </div>
            <div className="mt-8">
              <LinkButton href="/projeto/origem">Ler a história completa</LinkButton>
            </div>
          </div>
          <blockquote className="rounded-2xl border-l-4 border-blue-700 bg-white p-6 text-lg font-bold italic leading-8 text-zinc-800 shadow-sm">
            “Muitas vezes, a limitação não está na capacidade de aprender, mas na
            falta de ferramentas adequadas de acesso.”
          </blockquote>
        </div>
      </section>

      {/* Tecnologias assistivas em destaque */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Tecnologias assistivas"
            title="Recursos que o DAVI conecta"
            description="Da comunicação alternativa aos métodos de acesso, do controle do ambiente à mobilidade — exemplos do que a plataforma integra."
          />
          <div className="mt-10">
            <AssistiveGallery
              items={homeTaHighlights}
              cta={{ label: "Ver galeria", href: "/galeria#equipamentos" }}
            />
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Para quem é?"
            title="Um ecossistema para redes inteiras de inclusão"
            description="Da sala de aula ao centro de reabilitação, da família à prefeitura, da comunidade remota à instituição."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {audiences.map((item) => (
              <span
                key={item}
                className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-800"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href="/comunidades/familias">Para Famílias</LinkButton>
            <LinkButton href="/comunidades/escolas" variant="secondary">
              Para Escolas
            </LinkButton>
            <LinkButton href="/comunidades/profissionais" variant="secondary">
              Para Profissionais
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

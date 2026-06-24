import Image from "next/image";
import type { Metadata } from "next";
import {
  LinkButton,
  PageShell,
  SectionHeader,
} from "./components/SiteShell";
import {
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
  IconGamepad,
  IconHeartHand,
  IconLightbulb,
  IconSparkles,
  IconTouch,
  IconUsers,
  IconVrGlasses,
  IconWrench,
} from "./components/icons";

export const metadata: Metadata = {
  title: "DAVI — Desenvolvimento Assistivo para Vida Independente",
  description:
    "Tecnologia assistiva para comunicação, alfabetização, aprendizagem e autonomia.",
};

// Ordem: comunicação → acesso → aprendizagem → tecnologia assistiva →
// criação → formação → catálogo → geração de renda → emprego apoiado.
const mainModules: ModuleCard[] = [
  {
    title: "DAVI Comunicação",
    description:
      "Comunicação alternativa para expressar necessidades, escolhas e respostas.",
    href: "/comunicacao",
    icon: <IconChat className="h-6 w-6" />,
    status: "Demonstração",
  },
  {
    title: "DAVI CelAcesso",
    description:
      "Celular como botão Sim e Não, joystick, mouse, teclado adaptado, prancha de comunicação e controle acessível.",
    href: "/davi-celacesso",
    icon: <IconTouch className="h-6 w-6" />,
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
    title: "DAVI Vision",
    description:
      "Rastreamento ocular e interação visual por câmera como método de acesso.",
    href: "/acesso/vision",
    icon: <IconEye className="h-6 w-6" />,
    status: "Protótipo",
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
    title: "DAVI Escola",
    description:
      "Português, Matemática, videoaulas e tarefas acessíveis — o núcleo pedagógico.",
    href: "/escola",
    icon: <IconDocument className="h-6 w-6" />,
    status: "Demonstração",
  },
  {
    title: "DAVI Games",
    description:
      "Jogos educativos acessíveis para treinar aprendizagem, comunicação, atenção, decisão e métodos de acesso (toque, botão, olhar, sopro, joystick, varredura).",
    href: "/davi-games",
    icon: <IconGamepad className="h-6 w-6" />,
    status: "Protótipo",
  },
  {
    title: "DAVI Imersivo",
    description:
      "Óculos imersivos e inteligentes para aprendizagem, jogos, interação, acessibilidade e pesquisa.",
    href: "/davi-imersivo",
    icon: <IconVrGlasses className="h-6 w-6" />,
    status: "Planejado",
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
    title: "Evolução e Relatórios",
    description:
      "Métricas para compreender, apoiar e ampliar possibilidades — sem diagnóstico.",
    href: "/evolucao",
    icon: <IconClipboard className="h-6 w-6" />,
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
    title: "DAVI Capacita",
    description:
      "Formação e treinamentos para uso da plataforma, criação de tecnologias assistivas, ambiente maker, catálogo, produto aberto, propriedade intelectual e geração de renda.",
    href: "/davi-capacita",
    icon: <IconUsers className="h-6 w-6" />,
    status: "Planejado",
  },
  {
    title: "DAVI Emprega",
    description:
      "Emprego apoiado e inclusão profissional: ponte entre pessoas, famílias, instituições e empresas.",
    href: "/davi-emprega",
    icon: <IconHeartHand className="h-6 w-6" />,
    status: "Planejado",
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
              Tecnologia assistiva para ampliar comunicação, alfabetização,
              aprendizagem e autonomia.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="#recursos">Explorar recursos do DAVI</LinkButton>
              <LinkButton href="/projeto" variant="secondary">
                Conhecer o projeto
              </LinkButton>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl shadow-blue-950/10">
            <div className="bg-white px-6 py-8">
              <Image
                src="/images/davi/novo-logo-projeto-davi.png"
                alt="Logo do Projeto DAVI - Desenvolvimento Assistivo para a Vida Independente"
                width={900}
                height={300}
                priority
                className="mx-auto h-auto w-full max-w-[560px]"
              />
            </div>
            <div className="relative min-h-[240px] overflow-hidden border-t border-zinc-100">
              <Image
                src="/images/davi/imagem-2-biosinal-davi.png"
                alt="Pessoa utilizando recursos do Projeto DAVI com sinais assistivos e tecnologia acessível"
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

      {/* Autonomia do aluno */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-sm font-black text-green-700 ring-1 ring-green-100">
              Educação inclusiva
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
              Autonomia para aprender no próprio ritmo
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-700">
              No Projeto DAVI, o aluno poderá acompanhar videoaulas, realizar
              exercícios, ouvir orientações e responder atividades com mais
              autonomia. A plataforma foi pensada para apoiar crianças, jovens e
              pessoas com deficiência no processo de aprendizagem, permitindo que
              cada estudante avance no seu tempo, com recursos acessíveis, botões
              adaptados, áudio, vídeo e atividades interativas.
            </p>
          </div>
          <figure className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <Image
              src="/images/davi/Menino-sala-aula.png"
              alt="Aluno utilizando o Projeto DAVI em sala de aula com apoio de recursos digitais acessíveis"
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      {/* Jornada DAVI */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="A jornada DAVI"
            title="Da comunicação à vida independente"
            description="Cada recurso apoia uma etapa desse caminho contínuo, desde a comunicação inicial até a alfabetização, escrita e leitura, aprendizagem, interação, participação, autonomia e vida independente."
          />
          <figure className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <Image
              src="/images/davi/Jornada-DAVI-cadeirante.png"
              alt="Jornada DAVI com criança cadeirante, mostrando o caminho da comunicação à vida independente, passando por alfabetização, escrita e leitura, aprendizagem, interação, participação e autonomia."
              width={1672}
              height={941}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="h-auto w-full"
              priority={false}
            />
          </figure>
        </div>
      </section>

      {/* Cards principais */}
      <section id="recursos" className="scroll-mt-32 border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Recursos da plataforma"
            title="Recursos do DAVI"
            description="Recursos conectados para apoiar comunicação, aprendizagem e autonomia."
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
                Valinhos-SP que encontrava barreiras para ler e escrever com
                lápis e papel devido às limitações motoras.
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
            title="Feito para quem aprende, ensina, cuida e acompanha"
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

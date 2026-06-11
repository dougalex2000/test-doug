import Image from "next/image";
import {
  InfoGrid,
  LinkButton,
  PageShell,
  SectionHeader,
  TagList,
} from "./components/SiteShell";
import { principles } from "./lib/siteContent";

const moduleCards = [
  {
    title: "Rastreamento ocular",
    href: "/modulos/rastreamento-ocular",
    description:
      "Protótipo por webcam para estimar o ponto de atenção na tela, com calibração e seleção por permanência.",
  },
  {
    title: "Mouse assistivo",
    href: "/modulos/mouse-assistivo",
    description:
      "Alternativas de controle para pessoas com limitações motoras, incluindo olhar, cabeça, acionadores e varredura.",
  },
  {
    title: "Comunicação alternativa",
    href: "/modulos/comunicacao-alternativa",
    description:
      "Recursos para apoiar expressão, escolhas, atividades educacionais e comunicação funcional.",
  },
  {
    title: "Integração com hardware",
    href: "/modulos/hardware",
    description:
      "Conexão futura com sensores, acionadores, dispositivos maker e soluções assistivas personalizadas.",
  },
  {
    title: "Calibração",
    href: "/modulos/calibracao",
    description:
      "Configurações para adaptar tempo de resposta, precisão, sensibilidade e forma de interação.",
  },
  {
    title: "Relatórios",
    href: "/relatorios",
    description:
      "Acompanhamento de uso, respostas, evolução funcional e indicadores para profissionais e instituições.",
  },
  {
    title: "Configurações de acessibilidade",
    href: "/configuracoes",
    description:
      "Controles de contraste, legibilidade, botões maiores e modos de navegação mais simples.",
  },
];

const accessibilityItems = [
  "Alto contraste",
  "Navegação por teclado",
  "Textos legíveis",
  "Botões grandes",
  "Compatibilidade com leitores de tela",
  "Interface simples para limitações motoras",
];

export default function Home() {
  return (
    <PageShell>
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="w-fit rounded-lg bg-blue-50 px-4 py-2 text-sm font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
              Tecnologia assistiva para autonomia
            </p>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight text-zinc-950 sm:text-6xl">
              Tecnologia assistiva para ampliar autonomia, comunicação e inclusão
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-zinc-700">
              O DAVI é uma plataforma modular para apoiar pessoas com
              deficiência, familiares, profissionais, educadores e instituições
              com recursos digitais, acessíveis e personalizáveis.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <LinkButton href="/modulos/rastreamento-ocular">Conhecer módulos</LinkButton>
              <LinkButton href="/modulos/rastreamento-ocular" variant="secondary">
                Acessar plataforma
              </LinkButton>
              <LinkButton href="/catalogo" variant="secondary">
                Ver catálogo
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
              <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/30 bg-white/90 p-4 text-zinc-950 shadow-lg backdrop-blur">
                <p className="text-sm font-black text-blue-800">
                  Plataforma modular
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-700">
                  Organização por módulos para evoluir recursos assistivos sem
                  misturar demonstrações, relatórios e configurações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16" id="modulos">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Módulos"
            title="Áreas iniciais da plataforma DAVI"
            description="Cards grandes, legíveis e separados por função para facilitar o acesso por usuários, familiares, profissionais e gestores."
          />
          <div className="mt-10">
            <InfoGrid items={moduleCards} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16" id="acessibilidade">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            eyebrow="Acessibilidade"
            title="Interface simples para diferentes formas de acesso"
            description="A experiência deve priorizar clareza, previsibilidade e controles grandes, evitando excesso de animações e mantendo contraste adequado."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {accessibilityItems.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-200 bg-white p-4 text-base font-bold text-zinc-900 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-green-300">
              Identidade própria
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Inspirado por boas práticas de portais públicos, sem copiar
              identidade institucional
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              O DAVI usa organização clara, linguagem simples, contraste e
              navegação acessível, mantendo marca, cores e comunicação próprias
              do projeto.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Informação organizada",
              "Caminhos de navegação simples",
              "Cards de serviços",
              "Botões grandes",
              "Rodapé informativo",
              "Sem elementos oficiais de governo",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm font-bold text-zinc-100 transition hover:border-green-500 hover:bg-zinc-800"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Princípios"
            title="Bases do desenvolvimento assistivo"
            description="A evolução do DAVI deve manter foco em baixo custo, acessibilidade, privacidade, segurança, colaboração e tecnologia aberta."
          />
          <div className="mt-8">
            <TagList items={principles} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

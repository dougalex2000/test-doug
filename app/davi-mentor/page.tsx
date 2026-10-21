import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Breadcrumb,
  LinkButton,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";
import { CricketLogo, CricketModuleHeader } from "../components/CricketLogo";
import { findProfile } from "../lib/cricket/profile";

export const metadata: Metadata = {
  title: "CRICKET — DAVI Mentor, Assistente Cognitivo Contextual",
  description:
    "Uma inteligência auxiliar para lembrar, orientar e apoiar sua autonomia.",
};

const pillars = [
  {
    title: "Lembrar",
    description:
      "Apoio à memória no momento certo: rotinas, compromissos, passos de uma tarefa e aquilo que a pessoa escolheu guardar.",
  },
  {
    title: "Orientar",
    description:
      "Orientação sensível ao contexto — onde a pessoa está, o que está fazendo e qual é o próximo passo possível.",
  },
  {
    title: "Apoiar a autonomia",
    description:
      "O CRICKET apoia a decisão da pessoa; nunca decide por ela. O controle permanece com quem usa.",
  },
];

const esferas = [
  {
    nome: "EU",
    descricao:
      "A pessoa e o estado atual: perfil, objetivo, rotina, tarefas, lembretes e memória recente.",
  },
  {
    nome: "OUTROS",
    descricao:
      "Pessoas e relações sociais, sempre com o grau de confiança do reconhecimento — nunca como certeza.",
  },
  {
    nome: "MUNDO",
    descricao:
      "Ambiente ao redor: objetos, textos, localização, eventos e possíveis riscos.",
  },
];

/**
 * Tela 1 — boas-vindas do módulo.
 *
 * Quando a pessoa chega por QR Code (`?p=`), esta página não é exibida: o
 * perfil é resolvido e a sessão abre direto, já adaptada.
 */
export default async function DaviMentorPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const { p } = await searchParams;
  if (p && findProfile(p)) {
    redirect(`/davi-mentor/sessao?p=${encodeURIComponent(p)}`);
  }

  return (
    <PageShell>
      <Breadcrumb items={[{ label: "DAVI Mentor" }]} />
      <CricketModuleHeader />

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex justify-center lg:justify-start">
            <CricketLogo size="xl" preload />
          </div>

          <div>
            <h1 className="text-5xl font-black leading-none tracking-tight text-zinc-950 sm:text-7xl">
              CRICKET
            </h1>
            <p className="mt-3 text-3xl font-black leading-tight text-green-700 sm:text-4xl">
              DAVI Mentor
            </p>
            <p className="mt-2 text-xl font-bold leading-8 text-blue-800 sm:text-2xl">
              Assistente Cognitivo Contextual
            </p>
            <p className="mt-6 max-w-2xl border-l-4 border-green-600 pl-5 text-lg leading-8 text-zinc-700 sm:text-xl">
              “Uma inteligência auxiliar para lembrar, orientar e apoiar sua
              autonomia.”
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              CRICKET é a arquitetura cognitiva por trás do módulo: Cognitive
              Robotic Intelligence for Context, Knowledge, Engagement and Tasks.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/davi-mentor/sessao">Iniciar</LinkButton>
              <LinkButton href="/davi-mentor/qr" variant="secondary">
                Abrir pelo QR Code
              </LinkButton>
              <LinkButton href="/davi-mentor/demo" variant="secondary">
                Modo Demonstração
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 rounded-xl border border-zinc-200 bg-zinc-50 p-5 sm:flex-row sm:items-center">
          <figure className="w-full shrink-0 sm:w-52">
            <Image src="/images/davi/cricket-bluetooth-conceito.png" alt="Conceito ilustrativo de acessório sem fio CRICKET com câmera e grilinho DAVI, usado no ouvido sem mostrar o rosto" width={1536} height={1024} sizes="(max-width: 640px) 320px, 208px" className="h-40 w-full rounded-lg object-contain" />
            <figcaption className="mt-2 text-center text-[11px] text-zinc-500">Imagem conceitual · Em desenvolvimento</figcaption>
          </figure>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wide text-green-700">No celular ou com acessórios</p>
            <h2 className="mt-1 text-xl font-black text-zinc-950">O Mentor também pode acompanhar você pelo áudio</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Use diretamente a câmera, o microfone e o alto-falante do celular, ou ouça as respostas em um fone Bluetooth conectado ao aparelho. A saída e a captura de áudio dependem do celular e do navegador.</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Também estudamos um acessório sem fio com câmera embutida, microfone e fone, identificado pelo grilinho CRICKET. A proposta é captar a cena em primeira pessoa e ouvir as mensagens do DAVI Mentor durante o uso. Conexão de vídeo, autonomia e compatibilidade ainda precisam ser validadas; Bluetooth para áudio não garante transmissão de câmera.</p>
            <p className="mt-2 text-xs leading-5 text-zinc-500">Protótipo ilustrativo, não comercializado. Hoje a análise visual é solicitada sob demanda; não há monitoramento contínuo nem garantia de resposta instantânea.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="O que o CRICKET faz"
            title="Lembrar, orientar e apoiar a autonomia"
            description="Três compromissos que orientam cada tela deste módulo."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="h-full rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 h-1.5 w-12 rounded-full bg-green-600" />
                <h2 className="text-xl font-black text-zinc-950">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Arquitetura cognitiva"
            title="Três esferas de contexto"
            description="Tudo o que o DAVI Mentor percebe é organizado em EU, OUTROS e MUNDO — e combinado antes de qualquer orientação."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {esferas.map((esfera) => (
              <div
                key={esfera.nome}
                className="h-full rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <p className="text-2xl font-black tracking-tight text-blue-800">
                  {esfera.nome}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {esfera.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import {
  Breadcrumb,
  LinkButton,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";
import { CricketLogo, CricketModuleHeader } from "../components/CricketLogo";

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

export default function DaviMentorPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "CRICKET — DAVI Mentor" }]} />
      <CricketModuleHeader />

      {/* Tela inicial do módulo: logotipo oficial + identidade textual. */}
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
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/davi-mentor/demo">
                Ver o modo de demonstração
              </LinkButton>
              <LinkButton href="/davi-mentor/qr" variant="secondary">
                Abrir pelo QR Code
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
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
    </PageShell>
  );
}

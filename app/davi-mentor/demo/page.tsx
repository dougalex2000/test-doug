import type { Metadata } from "next";
import {
  Breadcrumb,
  LinkButton,
  PageShell,
  SectionHeader,
} from "../../components/SiteShell";
import { CricketLogo, CricketModuleHeader } from "../../components/CricketLogo";

export const metadata: Metadata = {
  title: "CRICKET DAVI Mentor — modo de demonstração",
  description:
    "Modo de demonstração do CRICKET DAVI Mentor, o Assistente Cognitivo Contextual do Projeto DAVI.",
};

export default function CricketDemoPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "CRICKET — DAVI Mentor", href: "/davi-mentor" },
          { label: "Modo de demonstração" },
        ]}
      />
      <CricketModuleHeader />

      <section className="border-b border-zinc-200 bg-zinc-950 px-6 py-12 text-white sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
          <CricketLogo size="md" preload className="shrink-0" />
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-300">
              Modo de demonstração
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              CRICKET — DAVI Mentor
            </h1>
            <p className="mt-4 text-lg leading-8 text-zinc-300">
              Assistente Cognitivo Contextual. “Uma inteligência auxiliar para
              lembrar, orientar e apoiar sua autonomia.”
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Demonstração"
            title="Identidade aplicada, interação a definir"
            description="O modo de demonstração já exibe o logotipo oficial do módulo. Os diálogos, lembretes e orientações simulados serão construídos quando o escopo funcional do CRICKET for definido."
          />
          <div className="mt-8">
            <LinkButton href="/davi-mentor" variant="secondary">
              Voltar à tela inicial
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

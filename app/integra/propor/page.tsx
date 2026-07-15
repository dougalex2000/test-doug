import type { Metadata } from "next";
import { Breadcrumb, PageHero, PageShell } from "../../components/SiteShell";
import { ProposalForm } from "../../components/integra/ProposalForm";
import { workgroups } from "../../lib/integra/data";

export const metadata: Metadata = {
  title: "Propor uma contribuição — DAVI Integra",
  description:
    "Proponha uma ideia, desafio, pesquisa, atividade, tecnologia assistiva, melhoria de acessibilidade, documentação ou parceria ao Projeto DAVI.",
};

const moduleOptions = workgroups.map((w) => w.name);

export default function ProporPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "DAVI Integra", href: "/integra" }, { label: "Propor uma contribuição" }]} />
      <PageHero
        eyebrow="DAVI Integra"
        title="Propor uma contribuição"
        description="Tem uma ideia, um desafio técnico, uma pesquisa, uma atividade pedagógica, uma tecnologia assistiva ou uma parceria em mente? Conte para o projeto."
      />

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <ProposalForm moduleOptions={moduleOptions} />
        </div>
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import { Breadcrumb, LinkButton, PageHero, PageShell, SectionHeader } from "../../components/SiteShell";
import { WorkgroupCard } from "../../components/integra/IntegraCards";
import { getWorkgroups } from "../../lib/integra/service";

export const metadata: Metadata = {
  title: "Grupos de trabalho — DAVI Integra",
  description:
    "Grupos de trabalho do DAVI Integra, ligados aos módulos do ecossistema: objetivo, atividades, conhecimentos úteis e como participar.",
};

export default function GruposDeTrabalhoPage() {
  const workgroups = getWorkgroups();

  return (
    <PageShell>
      <Breadcrumb items={[{ label: "DAVI Integra", href: "/integra" }, { label: "Grupos de trabalho" }]} />
      <PageHero
        eyebrow="DAVI Integra"
        title="Grupos de trabalho"
        description="Cada grupo está ligado a um módulo ou tema do ecossistema DAVI. Escolha o grupo relacionado à sua experiência e à sua disponibilidade."
        actions={<LinkButton href="/integra/participar">Participar de um grupo</LinkButton>}
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Grupos"
            title="Organização por módulos e temas"
            description="A cooperação é a prioridade: não há competição entre colaboradores. Você pode participar de um ou mais grupos."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workgroups.map((w) => (
              <WorkgroupCard key={w.id} workgroup={w} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

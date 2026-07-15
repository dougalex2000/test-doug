import type { Metadata } from "next";
import { Breadcrumb, LinkButton, PageHero, PageShell, SectionHeader } from "../../components/SiteShell";
import { ProjectsExplorer } from "../../components/integra/ProjectsExplorer";
import { getProjects, projectFilterOptions } from "../../lib/integra/service";

export const metadata: Metadata = {
  title: "Projetos em andamento — DAVI Integra",
  description:
    "Iniciativas de pesquisa e desenvolvimento do ecossistema DAVI, com filtros por módulo, área, status, participação e modalidade.",
};

export default function ProjetosPage() {
  const projects = getProjects();

  return (
    <PageShell>
      <Breadcrumb items={[{ label: "DAVI Integra", href: "/integra" }, { label: "Projetos em andamento" }]} />
      <PageHero
        eyebrow="DAVI Integra"
        title="Projetos em andamento"
        description="Iniciativas em desenvolvimento no ecossistema DAVI. Encontre um projeto ligado à sua experiência e manifeste interesse em contribuir."
        actions={<LinkButton href="/integra/participar">Quero contribuir</LinkButton>}
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-bold leading-6 text-amber-900">
              <span aria-hidden="true">🧪 </span>
              Conteúdo <strong>demonstrativo</strong>. Não há dados reais sobre instituições,
              pesquisadores ou parcerias — os projetos ilustram como o módulo funcionará.
            </p>
          </div>

          <div className="mt-8">
            <SectionHeader eyebrow="Explorar" title="Filtre por módulo, área, status, participação e modalidade" />
            <div className="mt-8">
              <ProjectsExplorer projects={projects} options={projectFilterOptions} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

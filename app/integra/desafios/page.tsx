import type { Metadata } from "next";
import { Breadcrumb, LinkButton, PageHero, PageShell, SectionHeader } from "../../components/SiteShell";
import { ChallengesExplorer } from "../../components/integra/ChallengesExplorer";
import { challengeFilterOptions, getChallenges } from "../../lib/integra/service";

export const metadata: Metadata = {
  title: "Desafios abertos do DAVI — DAVI Integra",
  description:
    "Necessidades reais do ecossistema DAVI transformadas em oportunidades de pesquisa, desenvolvimento, documentação e colaboração.",
};

export default async function DesafiosPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const areaParam = typeof params.area === "string" ? params.area : undefined;
  const challenges = getChallenges();

  return (
    <PageShell>
      <Breadcrumb items={[{ label: "DAVI Integra", href: "/integra" }, { label: "Desafios abertos" }]} />
      <PageHero
        eyebrow="DAVI Integra"
        title="Desafios abertos do DAVI"
        description="Os desafios transformam necessidades reais do ecossistema em oportunidades de pesquisa, desenvolvimento, documentação e colaboração."
        actions={
          <>
            <LinkButton href="/integra/participar">Quero contribuir</LinkButton>
            <LinkButton href="/integra/propor" variant="secondary">
              Propor um desafio
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-bold leading-6 text-amber-900">
              <span aria-hidden="true">🧪 </span>
              Os desafios abaixo são <strong>exemplos demonstrativos</strong>. Não são chamadas
              oficiais enquanto não forem formalmente publicados pelos responsáveis.
            </p>
          </div>

          <div className="mt-8">
            <SectionHeader eyebrow="Explorar" title="Filtre por módulo, área, status e tipo de contribuição" />
            <div className="mt-8">
              <ChallengesExplorer
                challenges={challenges}
                options={challengeFilterOptions}
                initialArea={areaParam}
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

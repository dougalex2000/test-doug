import type { Metadata } from "next";
import { Breadcrumb, PageHero, PageShell } from "../../components/SiteShell";
import { InterestForm } from "../../components/integra/InterestForm";
import { contributionTypes, workgroups } from "../../lib/integra/data";
import { getChallengeById, getProjects, getWorkgroupById } from "../../lib/integra/service";

export const metadata: Metadata = {
  title: "Manifestar interesse — DAVI Integra",
  description:
    "Formulário de interesse em contribuir com o Projeto DAVI. Coleta apenas informações mínimas de contato — nunca dados médicos ou de terceiros.",
};

const moduleOptions = workgroups.map((w) => w.name);
const contributionOptions = contributionTypes.map((c) => c.title);

function resolveContext(params: { [key: string]: string | string[] | undefined }): string | undefined {
  const desafio = typeof params.desafio === "string" ? params.desafio : undefined;
  const projeto = typeof params.projeto === "string" ? params.projeto : undefined;
  const grupo = typeof params.grupo === "string" ? params.grupo : undefined;

  if (desafio) {
    const c = getChallengeById(desafio);
    if (c) return `Desafio “${c.title}” (exemplo demonstrativo)`;
  }
  if (projeto) {
    const p = getProjects().find((item) => item.id === projeto);
    if (p) return `Projeto “${p.name}” (exemplo demonstrativo)`;
  }
  if (grupo) {
    const w = getWorkgroupById(grupo);
    if (w) return `Grupo de trabalho “${w.name}”`;
  }
  return undefined;
}

export default async function ParticiparPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const contextLabel = resolveContext(params);

  return (
    <PageShell>
      <Breadcrumb items={[{ label: "DAVI Integra", href: "/integra" }, { label: "Manifestar interesse" }]} />
      <PageHero
        eyebrow="DAVI Integra"
        title="Quero contribuir"
        description="Preencha suas informações de contato e conte como gostaria de colaborar. Pedimos apenas o mínimo necessário."
      />

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <InterestForm
            moduleOptions={moduleOptions}
            contributionOptions={contributionOptions}
            contextLabel={contextLabel}
          />
        </div>
      </section>
    </PageShell>
  );
}

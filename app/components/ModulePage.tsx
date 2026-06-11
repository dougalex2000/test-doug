import { InfoGrid, PageHero, PageShell, SectionHeader, TagList } from "./SiteShell";
import { platformModules, type PlatformModuleKey } from "../lib/platformModules";

export function ModulePage({ moduleKey }: { moduleKey: PlatformModuleKey }) {
  const moduleInfo = platformModules[moduleKey];

  return (
    <PageShell>
      <PageHero
        eyebrow={moduleInfo.eyebrow}
        title={moduleInfo.title}
        description={moduleInfo.description}
      />
      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHeader
              eyebrow="Estrutura modular"
              title="Página separada para evolução independente"
              description="Esta área tem rota própria e deve evoluir com componentes, serviços, permissões e integrações próprios quando o módulo for implementado."
            />
            <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-black uppercase tracking-wide text-blue-800">
                Rota
              </p>
              <p className="mt-2 font-mono text-lg font-bold text-zinc-950">
                {moduleInfo.route}
              </p>
              <p className="mt-4 text-sm font-semibold text-zinc-700">
                {moduleInfo.status}
              </p>
            </div>
          </div>
          <div>
            <SectionHeader
              eyebrow="Escopo"
              title="Itens previstos para este módulo"
            />
            <div className="mt-8">
              <TagList items={moduleInfo.items} />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Próximos passos"
            title="Evolução planejada"
            description="Lista inicial para guiar desenvolvimento, testes e separação de responsabilidades."
          />
          <div className="mt-10">
            <InfoGrid
              items={moduleInfo.nextSteps.map((step) => ({
                title: step,
                description:
                  "Implementar de forma isolada, mantendo testes e integrações separados dos demais módulos.",
              }))}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

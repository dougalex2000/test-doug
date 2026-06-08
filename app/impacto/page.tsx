import {
  InfoGrid,
  PageHero,
  PageShell,
  SectionHeader,
  TagList,
} from "../components/SiteShell";
import { impactAudiences, principles } from "../lib/siteContent";

export default function ImpactoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Impacto Social"
        title="Uma rede para apoiar quem ensina, cuida, pesquisa e inclui"
        description="O DAVI poderá apoiar escolas, salas de recursos, famílias, ONGs, OSCIPs, clínicas, universidades, prefeituras, centros de reabilitação e espaços maker."
      />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Rede DAVI"
            title="Públicos e instituições apoiadas"
          />
          <div className="mt-8">
            <TagList items={impactAudiences} />
          </div>
          <div className="mt-10">
            <InfoGrid
              items={[
                {
                  title: "Inclusão educacional",
                  description:
                    "Apoiar escolas, salas de recursos e professores na escolha de estratégias acessíveis.",
                },
                {
                  title: "Desenvolvimento comunitário",
                  description:
                    "Conectar famílias, ONGs, OSCIPs e espaços maker em torno de soluções de baixo custo.",
                },
                {
                  title: "Pesquisa e políticas públicas",
                  description:
                    "Organizar dados e experiências para universidades, prefeituras e centros de reabilitação.",
                },
              ]}
            />
          </div>
          <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="text-xl font-bold">Princípios</h3>
            <div className="mt-4">
              <TagList items={principles} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

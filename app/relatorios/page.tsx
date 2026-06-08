import {
  InfoGrid,
  PageHero,
  PageShell,
  SectionHeader,
  TagList,
} from "../components/SiteShell";
import { reportItems } from "../lib/siteContent";

export default function RelatoriosPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Avaliação e Relatórios"
        title="Dados para acompanhar autonomia e aprendizagem"
        description="Página de exemplo para organizar indicadores funcionais e educacionais que poderão apoiar professores, terapeutas, famílias e instituições."
      />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Indicadores"
            title="O que poderá ser registrado"
          />
          <div className="mt-8">
            <TagList items={reportItems} />
          </div>
          <div className="mt-10">
            <InfoGrid
              items={[
                {
                  title: "Para professores",
                  description:
                    "Acompanhar participação, progresso educacional e adequação das atividades.",
                },
                {
                  title: "Para terapeutas",
                  description:
                    "Observar método de acesso, autonomia, fadiga, tempo de resposta e evolução funcional.",
                },
                {
                  title: "Para famílias e instituições",
                  description:
                    "Documentar avanços e orientar escolhas de recursos assistivos.",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

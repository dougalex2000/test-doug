import {
  InfoGrid,
  PageHero,
  PageShell,
  SectionHeader,
  TagList,
} from "../components/SiteShell";
import { aiSupports } from "../lib/siteContent";

export default function InteligenciaArtificialPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Inteligência Artificial no DAVI"
        title="IA como apoio à personalização e ao acompanhamento"
        description="A inteligência artificial poderá apoiar decisões, organização de dados e personalização, sempre como recurso assistivo em desenvolvimento e com validação humana."
      />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Possibilidades"
            title="Onde a IA poderá apoiar"
            description="Esta página é um exemplo institucional. Não há treinamento de IA ou banco de dados implementado nesta etapa."
          />
          <div className="mt-8">
            <TagList items={aiSupports} />
          </div>
          <div className="mt-10">
            <InfoGrid
              items={[
                {
                  title: "Recomendações assistivas",
                  description:
                    "Sugerir dispositivos, métodos de acesso e adaptações com base no perfil funcional.",
                },
                {
                  title: "Relatórios inteligentes",
                  description:
                    "Transformar registros de uso em sínteses úteis para professores, terapeutas e famílias.",
                },
                {
                  title: "Apoio maker",
                  description:
                    "Organizar requisitos para criação de suportes, botões, sensores e recursos personalizados.",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

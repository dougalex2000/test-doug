import {
  InfoGrid,
  PageHero,
  PageShell,
  SectionHeader,
  TagList,
} from "../components/SiteShell";
import { assistiveTechItems, futureCatalogFeatures } from "../lib/siteContent";

export default function TecnologiasPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Galeria de Tecnologias Assistivas"
        title="Catálogo de equipamentos, adaptações e projetos abertos"
        description="Página de exemplo para organizar dispositivos, soluções assistivas, orientações de uso e caminhos para adaptação personalizada."
      />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Catálogo inicial"
            title="Exemplos de tecnologias assistivas"
          />
          <div className="mt-8">
            <TagList items={assistiveTechItems} />
          </div>
          <div className="mt-10">
            <InfoGrid
              items={futureCatalogFeatures.map((item) => ({
                title: item,
                description:
                  "Campo previsto para detalhar indicações, arquivos, fabricação, solicitação ou compra social futura.",
              }))}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

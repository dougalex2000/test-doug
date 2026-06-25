import { InfoGrid, PageHero, PageShell, SectionHeader } from "../components/SiteShell";

export default function OficinaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="DAVI Maker Assistiva"
        title="Criar, adaptar e documentar soluções personalizadas"
        description="Espaço conceitual para fabricação, adaptação e documentação de recursos assistivos de hardware e software."
      />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Frentes maker"
            title="Da necessidade funcional ao protótipo"
            description="A oficina poderá envolver impressão 3D, eletrônica, sensores, suportes, software, testes funcionais e documentação aberta."
          />
          <div className="mt-10">
            <InfoGrid
              items={[
                {
                  title: "Impressão 3D e suportes",
                  description:
                    "Bases, encaixes, keyguards, suportes de câmera e estruturas de posicionamento.",
                },
                {
                  title: "Eletrônica e sensores",
                  description:
                    "Botões adaptados, sensores de sopro, pedais, acionadores e interfaces multimodais.",
                },
                {
                  title: "Software e documentação",
                  description:
                    "Aplicações, guias de montagem, arquivos abertos e registro de melhorias.",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

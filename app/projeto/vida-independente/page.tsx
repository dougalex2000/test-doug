import type { Metadata } from "next";
import { JourneyDavi, ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Vida Independente",
  description: "O destino da jornada DAVI: autonomia e participação social.",
};

export default function VidaIndependentePage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "O Projeto", href: "/projeto" }, { label: "Vida Independente" }]}
      eyebrow="Vida Independente"
      title="O destino de toda a jornada"
      subtitle="Comunicação, alfabetização e aprendizagem como caminhos para a autonomia."
      lead={
        <div className="overflow-x-auto">
          <JourneyDavi />
        </div>
      }
      sections={[
        {
          eyebrow: "O que é vida independente",
          title: "Autonomia possível, com os apoios certos",
          paragraphs: [
            "Vida independente não significa fazer tudo sozinho, e sim ter autonomia para escolher, participar e decidir sobre a própria vida, com os apoios e as tecnologias adequadas.",
            "No DAVI, ela é o ponto de chegada de uma jornada que começa na comunicação e passa pela alfabetização, escrita, aprendizagem, participação e autonomia.",
          ],
        },
        {
          eyebrow: "Como o DAVI contribui",
          title: "Cada módulo apoia uma etapa",
          bullets: [
            "Comunicação: expressar necessidades e escolhas",
            "Alfabetização e escrita: ler e registrar o próprio pensamento",
            "Aprendizagem: acompanhar conteúdos no próprio ritmo",
            "Participação: estar presente e ativo na escola e na comunidade",
            "Autonomia: decidir e agir com apoios adequados",
          ],
          tone: "soft",
        },
      ]}
    />
  );
}

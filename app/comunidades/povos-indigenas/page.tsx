import type { Metadata } from "next";
import { ConstructionNotice, ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Povos Indígenas — DAVI Comunidades",
  description: "Respeito a contextos, línguas e culturas próprias.",
};

export default function PovosIndigenasPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Instituições e Comunidades", href: "/comunidades" }, { label: "Povos Indígenas" }]}
      eyebrow="Povos Indígenas"
      title="Inclusão com respeito à cultura"
      subtitle="Tecnologia assistiva que dialoga com línguas, saberes e contextos próprios."
      sections={[
        {
          eyebrow: "Como o DAVI apoia",
          title: "Diálogo, não imposição",
          bullets: [
            "Respeito à língua e à cultura local",
            "Uso simples e de baixo custo",
            "Atividades adaptáveis ao contexto",
            "Parceria com a comunidade e lideranças",
            "Consentimento comunitário e individual",
          ],
        },
      ]}
      note={
        <ConstructionNotice title="Ética e consentimento" tone="blue">
          Qualquer atuação com povos indígenas exige diálogo com a comunidade,
          respeito a seus protocolos e consentimento adequado, além das normas
          de ética e proteção de dados.
        </ConstructionNotice>
      }
    />
  );
}

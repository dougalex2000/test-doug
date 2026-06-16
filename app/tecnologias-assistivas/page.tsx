import type { Metadata } from "next";
import { SectionHub } from "../components/modules";

export const metadata: Metadata = {
  title: "Tecnologias Assistivas",
  description:
    "Catálogo, dispositivos DAVI, oficina maker, projetos abertos e materiais de apoio.",
};

export default function TecnologiasAssistivasPage() {
  return (
    <SectionHub
      href="/tecnologias-assistivas"
      subtitle="Recursos para comunicação, aprendizagem e vida independente — do produto pronto à solução criada sob medida."
      cardsTitle="Recursos assistivos"
      sections={[
        {
          eyebrow: "Tecnologias assistivas",
          title: "Do catálogo à oficina",
          paragraphs: [
            "Quando um produto pronto resolve a necessidade da pessoa, o catálogo ajuda a encontrá-lo. Quando não existe solução adequada, a oficina maker adapta ou cria — e documenta como projeto aberto para que outras pessoas possam reproduzir.",
          ],
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "ONGs — DAVI Comunidades",
  description: "Organizações da sociedade civil e projetos sociais.",
};

export default function OngsPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Instituições e Comunidades", href: "/comunidades" }, { label: "ONGs" }]}
      eyebrow="ONGs e OSCIPs"
      title="Parcerias que ampliam o alcance"
      subtitle="Organizações da sociedade civil como pontes para comunidades e famílias."
      sections={[
        {
          eyebrow: "Como o DAVI apoia",
          title: "Tecnologia assistiva acessível e aberta",
          bullets: [
            "Projetos abertos de baixo custo",
            "Oficina maker para adaptações",
            "Materiais de apoio e formação",
            "Atendimento a comunidades vulneráveis",
            "Colaboração e troca de conhecimento",
          ],
        },
      ]}
    />
  );
}

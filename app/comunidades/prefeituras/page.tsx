import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Prefeituras — DAVI Comunidades",
  description: "Políticas públicas de inclusão e tecnologia assistiva.",
};

export default function PrefeiturasPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Instituições e Comunidades", href: "/comunidades" }, { label: "Prefeituras" }]}
      eyebrow="Prefeituras"
      title="Inclusão em escala, com equidade"
      subtitle="Apoio a políticas públicas de educação inclusiva e tecnologia assistiva."
      sections={[
        {
          eyebrow: "Como o DAVI apoia",
          title: "Da rede municipal à comunidade",
          bullets: [
            "Tecnologia assistiva de baixo custo",
            "Atendimento a redes de ensino",
            "Indicadores institucionais agregados",
            "Apoio a regiões de difícil acesso",
            "Parcerias com escolas e serviços de saúde",
          ],
        },
      ]}
    />
  );
}

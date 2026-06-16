import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Escolas — DAVI Comunidades",
  description: "Inclusão na sala de aula, AEE e apoio ao PDI.",
};

export default function EscolasPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Instituições e Comunidades", href: "/comunidades" }, { label: "Escolas" }]}
      eyebrow="Escolas"
      title="Inclusão na sala de aula comum"
      subtitle="Apoio ao professor, ao AEE e à integração com o Plano de Desenvolvimento Individual."
      sections={[
        {
          eyebrow: "Como o DAVI apoia",
          title: "Da sala comum ao atendimento especializado",
          bullets: [
            "Atividades acessíveis alinhadas ao currículo",
            "Apoio ao Atendimento Educacional Especializado (AEE)",
            "Integração com o PDI quando aplicável",
            "Professor e cuidador como mediadores",
            "Acompanhamento pedagógico por métricas",
          ],
        },
      ]}
    />
  );
}

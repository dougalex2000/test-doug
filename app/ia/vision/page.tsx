import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "IA no DAVI Vision",
  description: "IA para calibração, correção de falhas e interpretação de intenção.",
};

export default function IaVisionPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Inteligência Artificial", href: "/ia" }, { label: "IA no DAVI Vision" }]}
      eyebrow="IA no DAVI Vision"
      title="IA a serviço da interação visual"
      subtitle="Apoio à calibração, correção de falhas, adaptação da interface e interpretação de intenção."
      status="Planejado"
      sections={[
        {
          eyebrow: "Como pode apoiar",
          title: "Calibração mais simples e robusta",
          paragraphs: [
            "A inteligência artificial poderá apoiar a calibração do olhar, corrigir falhas causadas por iluminação ou posição, adaptar a interface ao usuário e ajudar a interpretar a intenção por trás de olhares, piscadas e gestos.",
          ],
          bullets: [
            "Calibração assistida do olhar",
            "Correção de ruído e falhas",
            "Adaptação da interface ao usuário",
            "Interpretação de intenção (olhar, piscar, gesto)",
            "Sempre com processamento local quando possível",
          ],
        },
      ]}
    />
  );
}

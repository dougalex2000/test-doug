import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Métricas de Acesso — DAVI Evolução",
  description: "Método de acesso usado e desempenho de interação.",
};

export default function MetricasAcessoPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Métricas", href: "/evolucao" }, { label: "Métricas de Acesso" }]}
      eyebrow="Métricas de Acesso"
      title="Como a pessoa interage melhor"
      subtitle="Indicadores sobre o método de acesso e a eficiência da interação."
      sections={[
        {
          eyebrow: "O que é medido",
          title: "Indicadores de acesso",
          bullets: [
            "Método de acesso utilizado",
            "Tempo médio até o comando",
            "Taxa de seleção correta",
            "Necessidade de áudio ou alto contraste",
            "Uso de varredura ou permanência",
            "Mudanças de método ao longo do tempo",
          ],
        },
      ]}
    />
  );
}

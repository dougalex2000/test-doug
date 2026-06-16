import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Métricas de Aprendizagem — DAVI Evolução",
  description: "Tempo, tentativas, repetições e escrita produzida.",
};

export default function MetricasAprendizagemPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Evolução e Relatórios", href: "/evolucao" }, { label: "Métricas de Aprendizagem" }]}
      eyebrow="Métricas de Aprendizagem"
      title="Sinais do progresso pedagógico"
      subtitle="Indicadores que ajudam professores e famílias a compreender e apoiar o aluno."
      sections={[
        {
          eyebrow: "O que é medido",
          title: "Indicadores de aprendizagem",
          bullets: [
            "Tempo de resposta por atividade",
            "Número de tentativas",
            "Pausas e repetições de explicação",
            "Escrita produzida",
            "Conclusão de atividades",
            "Evolução ao longo do tempo",
          ],
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Linha do Tempo — DAVI Evolução",
  description: "Evolução longitudinal da pessoa ao longo do tempo.",
};

export default function LinhaDoTempoPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Métricas", href: "/evolucao" }, { label: "Linha do Tempo" }]}
      eyebrow="Linha do Tempo"
      title="A evolução vista no tempo"
      subtitle="Registrar marcos e conquistas ajuda a enxergar o caminho percorrido."
      sections={[
        {
          eyebrow: "Para que serve",
          title: "Enxergar o progresso longitudinal",
          paragraphs: [
            "A linha do tempo reúne marcos de comunicação, alfabetização, escrita e autonomia ao longo de semanas e meses, ajudando famílias e profissionais a perceber avanços que, no dia a dia, podem passar despercebidos.",
          ],
          bullets: [
            "Primeiras respostas sim/não",
            "Primeiras sílabas e palavras",
            "Primeiras frases escritas",
            "Mudança ou consolidação de método de acesso",
            "Conquistas de participação e autonomia",
          ],
        },
      ]}
    />
  );
}

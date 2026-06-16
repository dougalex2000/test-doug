import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "IA na Aprendizagem",
  description: "Personalização de atividades e apoio ao ritmo do aluno.",
};

export default function IaAprendizagemPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Inteligência Artificial", href: "/ia" }, { label: "IA na Aprendizagem" }]}
      eyebrow="IA na Aprendizagem"
      title="Atividades que se ajustam ao aluno"
      subtitle="A IA apoia a personalização de conteúdos, o ritmo e o feedback — sem substituir o professor."
      status="Planejado"
      sections={[
        {
          eyebrow: "Como pode apoiar",
          title: "Personalização com mediação humana",
          paragraphs: [
            "A inteligência artificial poderá sugerir o próximo passo, ajustar a dificuldade, propor variações de atividade e gerar feedback positivo, sempre como apoio à decisão pedagógica do professor.",
          ],
          bullets: [
            "Sugestão do próximo conteúdo",
            "Ajuste de dificuldade",
            "Variações de atividade",
            "Feedback positivo e encorajador",
            "Apoio à leitura de métricas",
          ],
        },
      ]}
    />
  );
}

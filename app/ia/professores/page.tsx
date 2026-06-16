import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "IA para Professores",
  description: "Apoio à criação de atividades e ao acompanhamento pedagógico.",
};

export default function IaProfessoresPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Inteligência Artificial", href: "/ia" }, { label: "IA para Professores" }]}
      eyebrow="IA para Professores"
      title="Mais tempo para ensinar"
      subtitle="A IA apoia a criação de atividades, resumos e acompanhamento — a decisão é sempre do professor."
      status="Planejado"
      sections={[
        {
          eyebrow: "Como pode apoiar",
          title: "Apoio à preparação e ao acompanhamento",
          paragraphs: [
            "A inteligência artificial poderá ajudar a montar atividades acessíveis, gerar variações, resumir a evolução do aluno e sugerir adaptações de acesso — reduzindo o trabalho repetitivo e preservando o papel pedagógico do professor.",
          ],
          bullets: [
            "Geração de atividades acessíveis",
            "Variações por nível e método de acesso",
            "Resumos de evolução do aluno",
            "Sugestões de adaptação",
            "Apoio, nunca decisão automática",
          ],
        },
      ]}
    />
  );
}

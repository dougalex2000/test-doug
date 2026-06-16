import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Modo Professor — DAVI Escola",
  description: "Apoio para professores, AEE, cuidadores e instituições.",
};

export default function ModoProfessorPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Escola", href: "/escola" }, { label: "Modo Professor" }]}
      eyebrow="Modo Professor"
      title="Apoio para quem ensina e acompanha"
      subtitle="Para professores, AEE, cuidadores e instituições mediarem a aprendizagem."
      actions={<LinkButton href="/escola/criar-atividades">Criar uma atividade</LinkButton>}
      sections={[
        {
          eyebrow: "Como é o Modo Professor",
          title: "Da preparação ao acompanhamento",
          bullets: [
            "Criação de atividades acessíveis",
            "Acompanhamento do aluno por métricas",
            "Relatórios para família e instituição",
            "Avaliação pedagógica",
            "Integração com o PDI quando aplicável",
            "Apoio à sala de aula comum",
          ],
        },
      ]}
    />
  );
}

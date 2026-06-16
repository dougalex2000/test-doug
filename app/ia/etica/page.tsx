import type { Metadata } from "next";
import { ConstructionNotice, ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Ética no Uso de IA — DAVI",
  description: "IA como apoio, nunca como decisão automática sobre a pessoa.",
};

export default function IaEticaPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Inteligência Artificial", href: "/ia" }, { label: "Ética no Uso de IA" }]}
      eyebrow="Ética no Uso de IA"
      title="A IA apoia; a decisão é humana"
      subtitle="No DAVI, a inteligência artificial nunca decide sozinha sobre a vida de uma pessoa."
      actions={<LinkButton href="/projeto/etica">Ver Ética, CEP e LGPD</LinkButton>}
      sections={[
        {
          eyebrow: "Princípios",
          title: "Limites claros para a IA",
          bullets: [
            "A IA não realiza diagnóstico clínico",
            "A IA não substitui professores, terapeutas ou cuidadores",
            "Decisões importantes são sempre humanas",
            "Transparência sobre o que a IA faz e não faz",
            "Dados sensíveis com proteção e consentimento",
            "Processamento local sempre que possível",
          ],
        },
      ]}
      note={
        <ConstructionNotice title="Compromisso" tone="blue">
          A inteligência artificial do DAVI é uma ferramenta de apoio à
          comunicação, à aprendizagem e à acessibilidade. Ela amplia
          possibilidades, mas não decide pela pessoa nem pelos profissionais.
        </ConstructionNotice>
      }
    />
  );
}

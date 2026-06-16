import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Profissionais — DAVI Comunidades",
  description: "Educação, saúde e reabilitação no ecossistema DAVI.",
};

export default function ProfissionaisPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Instituições e Comunidades", href: "/comunidades" }, { label: "Profissionais" }]}
      eyebrow="Profissionais"
      title="Educação, saúde e reabilitação"
      subtitle="Professores, terapeutas e demais profissionais como protagonistas das decisões."
      actions={<LinkButton href="/acesso/perfil">Ver Perfil de Acesso</LinkButton>}
      sections={[
        {
          eyebrow: "Como o DAVI apoia",
          title: "Ferramentas, não substituição",
          bullets: [
            "Registro funcional de métodos de acesso",
            "Criação e acompanhamento de atividades",
            "Métricas para apoiar decisões",
            "Recomendações de dispositivos",
            "A decisão é sempre do profissional",
          ],
        },
      ]}
    />
  );
}

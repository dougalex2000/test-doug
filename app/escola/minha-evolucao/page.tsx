import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Minha Evolução — DAVI Escola",
  description: "Acompanhar o próprio progresso de forma acessível.",
};

export default function MinhaEvolucaoPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Escola", href: "/escola" }, { label: "Minha Evolução" }]}
      eyebrow="Minha Evolução"
      title="Ver o próprio caminho"
      subtitle="O aluno acompanha conquistas e próximos passos de forma simples e motivadora."
      status="Planejado"
      actions={<LinkButton href="/evolucao">Ver DAVI Métricas</LinkButton>}
      sections={[
        {
          eyebrow: "O que mostra",
          title: "Conquistas em primeiro lugar",
          bullets: [
            "Atividades concluídas",
            "Novas sílabas, palavras e frases",
            "Tempo dedicado e tentativas",
            "Conquistas recentes",
            "Próximo passo sugerido",
          ],
        },
      ]}
    />
  );
}

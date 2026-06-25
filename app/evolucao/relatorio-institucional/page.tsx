import type { Metadata } from "next";
import { ConstructionNotice, ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Relatório Institucional — DAVI Evolução",
  description: "Visão agregada para escolas, ONGs e prefeituras.",
};

export default function RelatorioInstitucionalPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Métricas", href: "/evolucao" }, { label: "Relatório Institucional" }]}
      eyebrow="Relatório Institucional"
      title="Visão agregada, dados protegidos"
      subtitle="Indicadores agregados para apoiar gestão e políticas de inclusão."
      status="Planejado"
      sections={[
        {
          eyebrow: "O que traz",
          title: "Conteúdo do relatório institucional",
          bullets: [
            "Número de pessoas atendidas",
            "Métodos de acesso mais usados",
            "Atividades realizadas no período",
            "Indicadores de participação",
            "Necessidades de dispositivos e adaptações",
          ],
        },
      ]}
      note={
        <ConstructionNotice title="Privacidade primeiro" tone="blue">
          Relatórios institucionais usam dados agregados e respeitam a LGPD.
          Informações individuais sensíveis permanecem protegidas e sob
          consentimento.
        </ConstructionNotice>
      }
    />
  );
}

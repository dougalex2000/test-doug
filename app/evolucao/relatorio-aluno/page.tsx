import type { Metadata } from "next";
import { ConstructionNotice, ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Relatório do Aluno — DAVI Evolução",
  description: "Resumo de evolução para família e professor.",
};

export default function RelatorioAlunoPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Métricas", href: "/evolucao" }, { label: "Relatório do Aluno" }]}
      eyebrow="Relatório do Aluno"
      title="Evolução em linguagem clara"
      subtitle="Um resumo acessível do progresso, para a família e para o professor."
      status="Planejado"
      sections={[
        {
          eyebrow: "O que traz",
          title: "Conteúdo do relatório",
          bullets: [
            "Resumo da evolução no período",
            "Atividades realizadas e concluídas",
            "Método de acesso predominante",
            "Conquistas e próximos passos",
            "Linguagem clara para a família",
          ],
        },
      ]}
      note={
        <ConstructionNotice title="Não é diagnóstico" tone="blue">
          O relatório apoia decisões pedagógicas e funcionais e não constitui
          avaliação clínica. Futuramente poderá ser exportado em PDF e resumido
          com apoio de IA, sempre sob revisão humana.
        </ConstructionNotice>
      }
    />
  );
}

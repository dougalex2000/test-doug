import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { CriarAtividadeForm } from "../../components/demos";

export const metadata: Metadata = {
  title: "Criar Atividades — DAVI Escola",
  description: "Ferramenta para criação de conteúdos pedagógicos acessíveis.",
};

export default function CriarAtividadesPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Escola", href: "/escola" }, { label: "Criar Atividades" }]}
      eyebrow="Criar Atividades"
      title="Ferramenta para criar conteúdos acessíveis"
      subtitle="Para que professores, familiares ou profissionais criem atividades personalizadas."
      status="Em construção"
      lead={<CriarAtividadeForm />}
      sections={[
        {
          eyebrow: "O que a ferramenta permitirá",
          title: "Atividades sob medida",
          bullets: [
            "Título e área da disciplina",
            "Vídeo ou instrução",
            "Pergunta e resposta esperada",
            "Tipo de resposta e feedback positivo",
            "Método de acesso compatível",
            "Definição das métricas registradas",
            "Geração assistida por IA (planejado)",
          ],
        },
      ]}
    />
  );
}

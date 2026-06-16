import type { Metadata } from "next";
import { FlowSteps, ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Arquitetura RAG no DAVI",
  description: "IA baseada na base de conhecimento do próprio projeto.",
};

export default function RagPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Inteligência Artificial", href: "/ia" }, { label: "Arquitetura RAG" }]}
      eyebrow="Arquitetura RAG no DAVI"
      title="IA que consulta a base do próprio projeto"
      subtitle="O RAG faz a IA buscar documentos do DAVI antes de responder, reduzindo imprecisões."
      lead={
        <div>
          <p className="mb-5 max-w-3xl text-lg leading-8 text-zinc-700">
            A arquitetura RAG (geração aumentada por recuperação) permite que a
            inteligência artificial consulte documentos do próprio DAVI antes de
            responder. Isso reduz respostas imprecisas e mantém coerência com o
            projeto.
          </p>
          <div className="overflow-x-auto">
            <FlowSteps
              steps={[
                "Pergunta do usuário",
                "Busca na base DAVI",
                "Modelo de linguagem",
                "Resposta orientada",
                "Usuário",
              ]}
            />
          </div>
        </div>
      }
      sections={[
        {
          eyebrow: "A base de conhecimento",
          title: "O que a IA poderá consultar",
          bullets: [
            "Artigo conceitual do projeto",
            "Manual do projeto",
            "Tutoriais e FAQ",
            "Descrição dos módulos",
            "Documentação do DAVI Vision",
            "Documentação do DAVI Conecta",
            "Documentação do DAVI Escola",
            "Catálogo de tecnologias assistivas",
            "Diretrizes éticas",
          ],
        },
      ]}
    />
  );
}

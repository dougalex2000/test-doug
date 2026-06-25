import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { AssistenteChat } from "../../components/demos";

export const metadata: Metadata = {
  title: "DAVI Assistente",
  description: "Um guia inteligente para ajudar a usar a plataforma.",
};

export default function AssistentePage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Inteligência Artificial", href: "/ia" }, { label: "DAVI Assistente" }]}
      eyebrow="DAVI Assistente"
      title="Um guia inteligente para usar a plataforma"
      subtitle="Uma caixa de texto acessível para orientar usuários, famílias, professores, cuidadores e equipes técnicas."
      status="Demonstração"
      group="Grupo Inteligência Artificial"
      lead={<AssistenteChat />}
      sections={[
        {
          eyebrow: "O que o Assistente faz",
          title: "Orientação sobre os módulos do DAVI",
          paragraphs: [
            "O DAVI Assistente poderá responder perguntas sobre os módulos, explicar como começar e orientar o uso do DAVI Vision, DAVI Conecta, DAVI Escola, comunicação alternativa, BioSinal, catálogo, oficina maker e relatórios.",
            "Esta é uma interface demonstrativa, ainda sem conexão real com uma API. Em produção, as respostas se basearão na documentação do projeto (arquitetura RAG).",
          ],
        },
      ]}
    />
  );
}

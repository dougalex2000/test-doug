import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Sim e Não — DAVI Comunica",
  description: "As respostas essenciais para participar e decidir.",
};

export default function SimNaoPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Comunicação", href: "/comunicacao" }, { label: "Sim e Não" }]}
      eyebrow="Sim e Não"
      title="As respostas que abrem a participação"
      subtitle="Antes das palavras, poder dizer sim e não já transforma a comunicação."
      sections={[
        {
          eyebrow: "Por que começar aqui",
          title: "Duas respostas, muitas possibilidades",
          paragraphs: [
            "Para muitas pessoas, a comunicação começa com a capacidade de responder sim e não de forma confiável. A partir delas é possível escolher, concordar, recusar e participar de decisões do dia a dia.",
          ],
          bullets: [
            "Botões grandes e de alto contraste",
            "Retorno por áudio em pt-BR",
            "Acesso por toque, olhar, botão ou sopro",
            "Confirmação por permanência",
            "Base para perguntas de escolha",
          ],
        },
      ]}
    />
  );
}

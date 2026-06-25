import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Frases Rápidas — DAVI Comunica",
  description: "Expressões prontas para o dia a dia.",
};

export default function FrasesRapidasPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Comunicação", href: "/comunicacao" }, { label: "Frases Rápidas" }]}
      eyebrow="Frases Rápidas"
      title="Dizer o essencial em um toque"
      subtitle="Frases prontas para necessidades, sentimentos e situações comuns."
      sections={[
        {
          eyebrow: "Como funciona",
          title: "Expressões do cotidiano, sempre à mão",
          paragraphs: [
            "Frases rápidas reúnem expressões frequentes — pedidos, sentimentos e respostas — em botões grandes com áudio, para agilizar a comunicação em casa, na escola e na comunidade.",
          ],
          bullets: [
            "Estou com dor",
            "Quero água",
            "Preciso de ajuda",
            "Quero ir ao banheiro",
            "Estou feliz / triste",
            "Mais tarde, por favor",
          ],
        },
      ]}
    />
  );
}

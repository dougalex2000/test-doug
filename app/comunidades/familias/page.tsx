import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Famílias — DAVI Comunidades",
  description: "Apoio às famílias no dia a dia da comunicação e da aprendizagem.",
};

export default function FamiliasPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Instituições e Comunidades", href: "/comunidades" }, { label: "Famílias" }]}
      eyebrow="Famílias"
      title="A família como primeira parceira"
      subtitle="Linguagem acessível, atividades básicas e orientação para apoiar a pessoa em casa."
      sections={[
        {
          eyebrow: "Como o DAVI apoia",
          title: "Comunicação e aprendizagem no lar",
          bullets: [
            "Comunicação alternativa para o dia a dia",
            "Atividades básicas de alfabetização",
            "Uso simples, com áudio e botões grandes",
            "Orientação para buscar escola ou serviço",
            "Acompanhamento da evolução",
          ],
        },
      ]}
    />
  );
}

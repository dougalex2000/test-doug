import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Modo Casa — DAVI Escola",
  description: "Apoio para famílias, cuidadores e comunidades.",
};

export default function ModoCasaPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Escola", href: "/escola" }, { label: "Modo Casa" }]}
      eyebrow="Modo Casa"
      title="Aprender e se comunicar em casa"
      subtitle="Apoio para famílias, cuidadores e comunidades, especialmente onde não há serviço especializado próximo."
      sections={[
        {
          eyebrow: "Como é o Modo Casa",
          title: "Simples para quem está ao lado",
          bullets: [
            "Uso simples e linguagem acessível",
            "Atividades básicas de comunicação e alfabetização",
            "Apoio por áudio e botões grandes",
            "Orientação para buscar escola ou instituição",
            "Importante para comunidades remotas, rurais e indígenas",
          ],
        },
      ]}
    />
  );
}

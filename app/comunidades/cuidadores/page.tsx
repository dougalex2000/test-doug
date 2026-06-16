import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Cuidadores — DAVI Comunidades",
  description: "Mediação e acompanhamento no uso da plataforma.",
};

export default function CuidadoresPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Instituições e Comunidades", href: "/comunidades" }, { label: "Cuidadores" }]}
      eyebrow="Cuidadores"
      title="Quem está ao lado, mediando o acesso"
      subtitle="O cuidador é parceiro essencial na comunicação, no posicionamento e no uso dos recursos."
      sections={[
        {
          eyebrow: "Como o DAVI apoia",
          title: "Mediação com autonomia",
          bullets: [
            "Apoio ao posicionamento e ao acesso",
            "Mediação da comunicação alternativa",
            "Uso simples, com orientação por áudio",
            "Registro de eventos e evolução",
            "Respeito ao protagonismo da pessoa",
          ],
        },
      ]}
    />
  );
}

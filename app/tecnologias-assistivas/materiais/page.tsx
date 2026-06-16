import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Materiais de Apoio — Tecnologias Assistivas",
  description: "Guias e documentação para usar e reproduzir as tecnologias.",
};

export default function MateriaisPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Tecnologias Assistivas", href: "/tecnologias-assistivas" }, { label: "Materiais de Apoio" }]}
      eyebrow="Materiais de Apoio"
      title="Guias para usar, adaptar e reproduzir"
      subtitle="Documentação acessível para famílias, escolas, profissionais e oficinas."
      status="Em construção"
      sections={[
        {
          eyebrow: "O que estará disponível",
          title: "Documentação prática",
          bullets: [
            "Guias de uso dos dispositivos",
            "Tutoriais de montagem e adaptação",
            "Orientações de posicionamento e segurança",
            "Materiais pedagógicos acessíveis",
            "Documentação dos módulos do DAVI",
          ],
        },
      ]}
    />
  );
}

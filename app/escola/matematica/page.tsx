import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { AtividadeMatematica } from "../../components/demos";

export const metadata: Metadata = {
  title: "Matemática — DAVI Escola",
  description: "Números, operações e situações do cotidiano.",
};

export default function MatematicaPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Escola", href: "/escola" }, { label: "Matemática" }]}
      eyebrow="Matemática"
      title="Números, operações e situações do cotidiano"
      subtitle="Após comunicação e alfabetização, a matemática básica amplia a autonomia em situações práticas."
      status="Demonstração"
      group="Grupo DAVI Escola — Matemática"
      lead={<AtividadeMatematica />}
      sections={[
        {
          eyebrow: "Trilhas",
          title: "Do número ao cotidiano",
          bullets: [
            "Números e quantidades",
            "Contagem",
            "Comparação",
            "Soma e subtração",
            "Dinheiro",
            "Horas",
            "Calendário",
            "Objetos e escolhas simples",
          ],
        },
      ]}
    />
  );
}

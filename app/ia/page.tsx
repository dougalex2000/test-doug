import type { Metadata } from "next";
import { SectionHub } from "../components/modules";

export const metadata: Metadata = {
  title: "Inteligência Artificial no DAVI",
  description:
    "IA como guia, apoio à acessibilidade, criação de atividades e ampliação da comunicação.",
};

export default function IaPage() {
  return (
    <SectionHub
      href="/ia"
      subtitle="IA como guia, apoio à acessibilidade, criação de atividades e ampliação da comunicação."
      cardsTitle="Áreas de IA"
      sections={[
        {
          eyebrow: "Inteligência Artificial no DAVI",
          title: "IA que apoia, não substitui",
          paragraphs: [
            "A inteligência artificial no DAVI funciona como apoio à comunicação, aprendizagem, acessibilidade, calibração, criação de atividades, orientação de uso e melhoria da interação.",
            "Ela não substitui professores, terapeutas, cuidadores, profissionais de saúde ou avaliações especializadas.",
          ],
        },
      ]}
    />
  );
}

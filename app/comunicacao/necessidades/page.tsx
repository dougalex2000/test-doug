import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Necessidades e Vontades — DAVI Comunicação",
  description: "Expressar o que se precisa e o que se deseja.",
};

export default function NecessidadesPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Comunicação", href: "/comunicacao" }, { label: "Necessidades e Vontades" }]}
      eyebrow="Necessidades e Vontades"
      title="Expressar o que se precisa e o que se quer"
      subtitle="Comunicar necessidades básicas e vontades é o primeiro passo da autonomia."
      sections={[
        {
          eyebrow: "Por que importa",
          title: "Necessidades atendidas, dignidade preservada",
          paragraphs: [
            "Poder comunicar fome, sede, dor, cansaço, vontade de sair ou de parar uma atividade reduz frustração e amplia a participação. O DAVI organiza esses recursos de forma acessível e com retorno por áudio.",
          ],
          bullets: [
            "Necessidades básicas (fome, sede, banheiro)",
            "Conforto (calor, frio, dor, cansaço)",
            "Vontades (sair, brincar, descansar)",
            "Pedir para iniciar ou parar uma atividade",
            "Chamar uma pessoa de referência",
          ],
        },
      ]}
    />
  );
}

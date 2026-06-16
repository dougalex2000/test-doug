import type { Metadata } from "next";
import { SectionHub } from "../components/modules";

export const metadata: Metadata = {
  title: "DAVI Comunicação",
  description:
    "Comunicação alternativa para expressão, escolhas e participação.",
};

export default function ComunicacaoPage() {
  return (
    <SectionHub
      href="/comunicacao"
      subtitle="Comunicação alternativa para expressão, escolhas e participação."
      cardsTitle="Recursos de comunicação"
      sections={[
        {
          eyebrow: "DAVI Comunicação",
          title: "Participar, escolher, responder e se expressar",
          paragraphs: [
            "O DAVI Comunicação permite que a pessoa expresse necessidades, vontades, respostas e escolhas, mesmo antes da alfabetização plena.",
            "É parte essencial da vida independente: comunicar é poder participar. Os recursos integram-se aos métodos de acesso (olhar, toque, botão, sopro e varredura).",
          ],
          bullets: [
            "Comunicação inicial e escolhas",
            "Sim e não",
            "Frases rápidas",
            "Pranchas de comunicação",
            "Necessidades básicas e emoções",
            "Rotina e participação",
          ],
        },
      ]}
    />
  );
}

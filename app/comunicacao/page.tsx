import type { Metadata } from "next";
import Image from "next/image";
import { SectionHub } from "../components/modules";

export const metadata: Metadata = {
  title: "DAVI Comunica",
  description:
    "Comunicação alternativa para expressar necessidades, escolhas, respostas e sentimentos.",
};

export default function ComunicacaoPage() {
  return (
    <SectionHub
      href="/comunicacao"
      subtitle="Comunicação alternativa para expressão, escolhas e participação."
      cardsTitle="Recursos de comunicação"
      lead={
        <figure className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <Image
            src="/images/davi/Comunicacao-assistiva.png"
            alt="Criança usando prancha de comunicação alternativa do Projeto DAVI, com recursos de sim e não, frases rápidas, pranchas, necessidades básicas e diferentes formas de acesso como olhar, toque, botão, sopro e varredura."
            width={1672}
            height={941}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="h-auto w-full"
          />
        </figure>
      }
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

import type { Metadata } from "next";
import { JourneyDavi, SectionHub } from "../components/modules";

export const metadata: Metadata = {
  title: "O Projeto DAVI",
  description:
    "Visão geral do ecossistema DAVI: origem, vida independente, ética e plataforma online.",
};

export default function ProjetoPage() {
  return (
    <SectionHub
      href="/projeto"
      subtitle="Um ecossistema modular de tecnologia assistiva para comunicação, alfabetização, aprendizagem e vida independente."
      lead={
        <div>
          <p className="max-w-4xl text-xl font-bold leading-9 text-zinc-900">
            O DAVI transforma tecnologia assistiva em caminho para comunicação,
            alfabetização, aprendizagem e vida independente.
          </p>
          <div className="mt-6 overflow-x-auto">
            <JourneyDavi />
          </div>
        </div>
      }
      sections={[
        {
          eyebrow: "Visão geral",
          title: "Mais que um site: um ecossistema",
          paragraphs: [
            "O DAVI integra comunicação, alfabetização, aprendizagem, métodos de acesso, dispositivos assistivos, rastreamento ocular, sinais biológicos, inteligência artificial, métricas, relatórios, catálogo, oficina maker e vida independente.",
            "Cada grande área tem sua própria página e evolui de forma independente, por diferentes grupos de trabalho, mantendo a coerência da jornada do usuário.",
          ],
        },
      ]}
    />
  );
}

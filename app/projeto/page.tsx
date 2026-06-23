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
            "O DAVI integra comunicação, alfabetização, aprendizagem, métodos de acesso, dispositivos assistivos, rastreamento ocular, sinais biológicos, inteligência artificial, jogos educativos, métricas, relatórios, catálogo, oficina maker, inclusão profissional e vida independente.",
            "Cada grande área tem sua própria página e evolui de forma independente, por diferentes grupos de trabalho, mantendo a coerência da jornada do usuário.",
          ],
        },
        {
          eyebrow: "Para quem é",
          title: "Quem pode usar o DAVI",
          description:
            "O ecossistema foi pensado para apoiar redes inteiras de inclusão — da pessoa com deficiência a quem a apoia, da escola à empresa.",
          bullets: [
            "Pessoas com deficiência (alunos e trabalhadores)",
            "Famílias e responsáveis",
            "Escolas e professores",
            "Cuidadores",
            "Profissionais de educação, saúde e reabilitação",
            "Instituições, APAEs e ONGs",
            "Prefeituras e políticas públicas de inclusão",
            "Empresas que querem incluir (DAVI Emprega)",
            "Comunidades remotas e povos indígenas",
          ],
          tone: "soft",
        },
      ]}
    />
  );
}

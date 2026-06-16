import type { Metadata } from "next";
import { ConstructionNotice, SectionHub } from "../components/modules";

export const metadata: Metadata = {
  title: "DAVI Evolução",
  description:
    "Métricas para compreender, apoiar e ampliar possibilidades.",
};

export default function EvolucaoPage() {
  return (
    <SectionHub
      href="/evolucao"
      subtitle="Métricas para compreender, apoiar e ampliar possibilidades."
      cardsTitle="Métricas e relatórios"
      lead={
        <p className="max-w-4xl text-2xl font-black leading-10 text-zinc-900">
          O DAVI não mede para limitar. Mede para compreender, apoiar e ampliar
          possibilidades.
        </p>
      }
      sections={[
        {
          eyebrow: "O que o DAVI acompanha",
          title: "Sinais que apoiam decisões pedagógicas e funcionais",
          bullets: [
            "Métricas de aprendizagem",
            "Métricas de acesso",
            "Tempo de resposta",
            "Tentativas",
            "Pausas e repetições",
            "Escrita produzida",
            "Método de acesso usado",
            "Evolução longitudinal",
            "Relatórios para família, professor e instituição",
          ],
        },
      ]}
      note={
        <ConstructionNotice title="Não é diagnóstico" tone="blue">
          Os dados apoiam decisões pedagógicas e funcionais — não constituem
          diagnóstico clínico. Qualquer coleta com participantes deve respeitar
          ética, consentimento e LGPD.
        </ConstructionNotice>
      }
    />
  );
}

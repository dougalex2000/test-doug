import type { Metadata } from "next";
import Image from "next/image";
import { ConstructionNotice, SectionHub } from "../components/modules";

export const metadata: Metadata = {
  title: "DAVI Métricas",
  description:
    "Métricas, evolução e relatórios para acompanhar progresso, participação e tempo de resposta — sem diagnóstico.",
};

export default function EvolucaoPage() {
  return (
    <SectionHub
      href="/evolucao"
      subtitle="Métricas para compreender, apoiar e ampliar possibilidades."
      cardsTitle="Métricas e relatórios"
      lead={
        <div>
          <p className="max-w-4xl text-2xl font-black leading-10 text-zinc-900">
            O DAVI não mede para limitar. Mede para compreender, apoiar e ampliar possibilidades.
          </p>
          <section aria-labelledby="evolucao-dashboard" className="mt-6 grid items-center gap-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5 lg:grid-cols-[1.1fr_0.9fr]">
            <figure className="min-w-0">
              <Image src="/images/davi/evolucao-dashboard-ilustrativo.png" alt="Ilustração conceitual de dashboard de acompanhamento com indicadores, gráfico de evolução por sessões, barras de participação, métodos de acesso, linha do tempo e relatórios para a equipe pedagógica" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 640px" className="h-56 w-full rounded-lg object-contain sm:h-72" />
              <figcaption className="mt-2 text-center text-xs leading-5 text-zinc-500">Dashboard conceitual gerado por IA · Dados fictícios, sem informações de alunos.</figcaption>
            </figure>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Acompanhamento para apoiar cada pessoa</p>
              <h2 id="evolucao-dashboard" className="mt-2 text-2xl font-black text-zinc-950">Transformar registros em melhores oportunidades de aprendizagem</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">A proposta é reunir gráficos, histórico de atividades e relatórios para ajudar professores, familiares e profissionais a compreender a participação do aluno e ajustar o apoio ao longo do tempo.</p>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-zinc-700">
                <li><strong>Progresso individual:</strong> observar mudanças entre sessões, considerando o contexto de cada atividade.</li>
                <li><strong>Acesso e esforço:</strong> acompanhar tentativas, tempo de resposta, pausas e método de acesso utilizado.</li>
                <li><strong>Relatórios e ajustes:</strong> apoiar a revisão de atividades, calibração e melhorias de usabilidade do DAVI.</li>
              </ul>
              <p className="mt-4 text-xs leading-6 text-zinc-500">Representação ilustrativa de recursos em desenvolvimento, não um painel de dados reais. Os indicadores apoiam a análise humana; não classificam a capacidade da pessoa nem produzem diagnóstico.</p>
            </div>
          </section>
        </div>
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

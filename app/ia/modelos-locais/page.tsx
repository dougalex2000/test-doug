import type { Metadata } from "next";
import { FlowSteps, ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "Modelos Locais e Servidor Institucional",
  description: "Autonomia tecnológica e proteção de dados sensíveis.",
};

export default function ModelosLocaisPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Inteligência Artificial", href: "/ia" }, { label: "Modelos Locais e Servidor" }]}
      eyebrow="Modelos Locais e Servidor Institucional"
      title="Autonomia tecnológica e proteção de dados"
      subtitle="APIs externas apenas para conteúdos não sensíveis; dados sensíveis em modelos locais ou servidor institucional."
      lead={
        <div>
          <p className="mb-5 max-w-3xl text-lg leading-8 text-zinc-700">
            O DAVI poderá usar APIs externas apenas para conteúdos não sensíveis
            em fases iniciais, mas deve priorizar modelos locais ou servidor
            institucional para dados sensíveis: imagens, vídeos, rastreamento
            ocular, relatórios individuais e sinais biológicos.
          </p>
          <div className="overflow-x-auto">
            <FlowSteps
              steps={[
                "Vercel",
                "API segura",
                "Supabase / base DAVI",
                "Servidor com modelo local",
                "Resposta ao usuário",
              ]}
            />
          </div>
        </div>
      }
      sections={[
        {
          eyebrow: "Estratégia",
          title: "RAG antes de fine-tuning",
          paragraphs: [
            "Modelos abertos, como DeepSeek ou equivalentes, poderão ser avaliados futuramente — preferencialmente com RAG sobre a base do projeto antes de qualquer fine-tuning. A prioridade é manter dados sensíveis sob controle institucional.",
          ],
          bullets: [
            "Dados sensíveis processados localmente",
            "Servidor institucional para imagens e sinais",
            "APIs externas só para conteúdo não sensível",
            "RAG antes de fine-tuning",
            "Transparência sobre onde os dados ficam",
          ],
        },
      ]}
    />
  );
}

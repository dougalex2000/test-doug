import type { Metadata } from "next";
import Image from "next/image";
import { ConceptPage } from "../../components/modules";
import { AssistenteChat } from "../../components/demos";

export const metadata: Metadata = {
  title: "DAVI Assistente",
  description: "Um guia inteligente para ajudar a usar a plataforma.",
};

export default function AssistentePage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Inteligência Artificial", href: "/ia" }, { label: "DAVI Assistente" }]}
      eyebrow="DAVI Assistente"
      title="Um guia inteligente para usar a plataforma"
      subtitle="Uma caixa de texto acessível para orientar usuários, famílias, professores, cuidadores e equipes técnicas."
      status="Demonstração"
      group="Grupo Inteligência Artificial"
      lead={
        <div>
          <section aria-labelledby="assistente-ilustracao" className="mb-6 grid items-center gap-5 rounded-xl border border-zinc-200 bg-zinc-50 p-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <figure className="min-w-0">
              <Image src="/images/davi/assistente-guia-ilustracao.png" alt="Ilustração de uma pessoa em cadeira de rodas e uma acompanhante usando uma interface de diálogo com o grilinho assistente, cercada de símbolos de acesso pelo olhar, comunicação, aprendizagem e dispositivos" width={1536} height={1024} sizes="(max-width: 640px) 100vw, 480px" className="h-52 w-full rounded-lg object-contain sm:h-64" />
              <figcaption className="mt-2 text-center text-[11px] text-zinc-500">Ilustração conceitual gerada por IA</figcaption>
            </figure>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-green-700">Diálogo acessível e orientação</p>
              <h2 id="assistente-ilustracao" className="mt-2 text-xl font-black text-zinc-950">Um ponto de partida para explorar o DAVI</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">Um assistente para ajudar pessoas, famílias e profissionais a encontrar os módulos de comunicação, aprendizagem e acesso que desejam conhecer, com explicações simples e escolhas no ritmo de cada pessoa.</p>
              <p className="mt-3 text-xs leading-6 text-zinc-500">A interface abaixo é demonstrativa. Esta página ainda não está conectada a uma API de inteligência artificial.</p>
            </div>
          </section>
          <AssistenteChat />
        </div>
      }
      sections={[
        {
          eyebrow: "O que o Assistente faz",
          title: "Orientação sobre os módulos do DAVI",
          paragraphs: [
            "O DAVI Assistente poderá responder perguntas sobre os módulos, explicar como começar e orientar o uso do DAVI Vision, DAVI Conecta, DAVI Escola, comunicação alternativa, BioSinal, catálogo, oficina maker e relatórios.",
            "Esta é uma interface demonstrativa, ainda sem conexão real com uma API. Em produção, as respostas se basearão na documentação do projeto (arquitetura RAG).",
          ],
        },
      ]}
    />
  );
}

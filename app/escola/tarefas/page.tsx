import type { Metadata } from "next";
import Link from "next/link";
import { ConceptPage, StatusBadge } from "../../components/modules";

export const metadata: Metadata = {
  title: "Tarefas e Lições — DAVI Escola",
  description:
    "Atividades acessíveis com vídeo, texto, imagens, respostas e métricas.",
};

type Tarefa = {
  titulo: string;
  disciplina: string;
  nivel: string;
  acesso: string;
  href: string;
};

const tarefas: Tarefa[] = [
  { titulo: "Sílabas BA, BE, BI, BO, BU", disciplina: "Língua Portuguesa", nivel: "Alfabetização", acesso: "Toque ou teclado", href: "/escola/portugues" },
  { titulo: "Formar palavras", disciplina: "Língua Portuguesa", nivel: "Alfabetização", acesso: "Teclado ou varredura", href: "/escola/portugues" },
  { titulo: "Escrever uma frase", disciplina: "Língua Portuguesa", nivel: "Escrita", acesso: "Caixa de texto acessível", href: "/escola/portugues" },
  { titulo: "Contar objetos", disciplina: "Matemática", nivel: "Números", acesso: "Escolha com botões grandes", href: "/escola/matematica" },
  { titulo: "Escolher sim ou não", disciplina: "Comunicação", nivel: "Comunicação inicial", acesso: "Olhar, botão ou toque", href: "/comunicacao/sim-nao" },
  { titulo: "Assistir e responder", disciplina: "Videoaula", nivel: "Aprendizagem", acesso: "Controle de vídeo", href: "/escola/videoaulas" },
];

export default function TarefasPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Escola", href: "/escola" }, { label: "Tarefas e Lições" }]}
      eyebrow="Tarefas e Lições"
      title="Atividades acessíveis, com vídeo, texto e métricas"
      subtitle="O espaço onde o aluno realiza tarefas criadas por professores, familiares ou colaboradores autorizados."
      status="Demonstração"
      group="Grupo Videoaulas e Tarefas"
      lead={
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tarefas.map((t) => (
            <article
              key={t.titulo}
              className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-black text-zinc-950">{t.titulo}</h3>
                <StatusBadge status="Demonstração" />
              </div>
              <dl className="mt-3 grid gap-1 text-sm leading-6 text-zinc-700">
                <div className="flex gap-2">
                  <dt className="font-black text-zinc-900">Disciplina:</dt>
                  <dd>{t.disciplina}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-black text-zinc-900">Nível:</dt>
                  <dd>{t.nivel}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-black text-zinc-900">Acesso:</dt>
                  <dd>{t.acesso}</dd>
                </div>
              </dl>
              <Link
                href={t.href}
                className="mt-auto pt-5 text-sm font-black text-blue-800 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                Iniciar atividade →
              </Link>
            </article>
          ))}
        </div>
      }
    />
  );
}

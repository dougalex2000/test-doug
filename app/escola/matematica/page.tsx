import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, PageShell } from "../../components/SiteShell";
import { aulasPorCategoria } from "../../lib/matematica";

export const metadata: Metadata = {
  title: "DAVI Escola — Matemática",
  description:
    "Aprender números, quantidades, contagem e operações com videoaulas, exercícios acessíveis e apoio por voz.",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 focus-visible:ring-offset-2";

const cores = [
  "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:border-emerald-300",
  "bg-sky-50 text-sky-700 ring-sky-200 hover:border-sky-300",
  "bg-amber-50 text-amber-700 ring-amber-200 hover:border-amber-300",
  "bg-violet-50 text-violet-700 ring-violet-200 hover:border-violet-300",
  "bg-rose-50 text-rose-700 ring-rose-200 hover:border-rose-300",
  "bg-teal-50 text-teal-700 ring-teal-200 hover:border-teal-300",
];

export default function MatematicaPage() {
  const grupos = aulasPorCategoria();

  return (
    <PageShell>
      <Breadcrumb
        items={[{ label: "DAVI Escola", href: "/escola" }, { label: "Matemática" }]}
      />

      {/* Cabeçalho */}
      <section className="border-b border-zinc-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-6 py-14">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-black text-emerald-700 shadow-sm ring-1 ring-emerald-100">
            <span aria-hidden="true">🔢</span> DAVI Escola
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Matemática
          </h1>
          <p className="mt-3 text-xl font-bold text-zinc-700">
            Aprender números, quantidades, contagem e operações com videoaulas,
            exercícios acessíveis e apoio por voz.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
            Esta área foi pensada para apoiar o aprendizado da matemática de forma
            simples, visual e acessível. A pessoa pode assistir à aula, controlar
            o vídeo, responder exercícios, ouvir as instruções, escolher respostas,
            escrever números e receber incentivo positivo a cada etapa.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              "🚧 Em construção",
              "🧪 Protótipo educacional",
              "⌨️ Acessível por teclado",
              "🎯 Compatível com varredura",
              "👁️ Apoio visual e sonoro",
            ].map((b) => (
              <span key={b} className="rounded-full bg-white px-3 py-1 text-sm font-bold text-zinc-700 shadow-sm ring-1 ring-zinc-200">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdos por categoria */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl space-y-12">
          {grupos.map((g) => (
            <div key={g.categoria}>
              <h2 className="text-2xl font-black text-zinc-900">{g.categoria}</h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.aulas.map((a, i) => (
                  <Link
                    key={a.id}
                    href={`/escola/matematica/aula/${a.id}`}
                    aria-label={`Aula: ${a.titulo}. ${a.descricao}`}
                    className={`group flex flex-col rounded-3xl border-2 border-transparent p-6 shadow-sm ring-1 transition hover:shadow-lg ${cores[i % cores.length]} ${focusRing}`}
                  >
                    <span className="text-lg font-black text-zinc-900">{a.titulo}</span>
                    <span className="mt-1 text-sm font-bold leading-6 text-zinc-700">{a.subtitulo}</span>
                    <span className="mt-4 text-sm font-black text-zinc-700 group-hover:underline">Começar aula →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

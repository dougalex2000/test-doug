import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, PageShell } from "../../components/SiteShell";
import { COMPLEXOS, LETRAS } from "../../lib/portugues";

export const metadata: Metadata = {
  title: "DAVI Escola — Português",
  description: "Aprender a ler, escrever e se comunicar passo a passo.",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-2";

const VOGAIS = ["A", "E", "I", "O", "U"];

// Paleta suave que cicla pelos cards das letras.
const cores = [
  "bg-rose-50 text-rose-700 ring-rose-200 hover:border-rose-300",
  "bg-amber-50 text-amber-700 ring-amber-200 hover:border-amber-300",
  "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:border-emerald-300",
  "bg-sky-50 text-sky-700 ring-sky-200 hover:border-sky-300",
  "bg-violet-50 text-violet-700 ring-violet-200 hover:border-violet-300",
  "bg-teal-50 text-teal-700 ring-teal-200 hover:border-teal-300",
];

export default function PortuguesPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ label: "DAVI Escola", href: "/escola" }, { label: "Português" }]}
      />

      {/* Cabeçalho infantil */}
      <section className="border-b border-zinc-200 bg-gradient-to-br from-sky-50 via-white to-amber-50 px-6 py-14">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-black text-blue-700 shadow-sm ring-1 ring-blue-100">
            <span aria-hidden="true">📚</span> DAVI Escola
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
            Português
          </h1>
          <p className="mt-3 text-xl font-bold text-zinc-700">
            Aprender a ler, escrever e se comunicar passo a passo.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
            Nesta área, o aluno aprende letras, sons, sílabas, palavras e frases
            com vídeos curtos, atividades interativas, apoio de voz, imagens e
            recursos acessíveis. O objetivo é apoiar a alfabetização e também a
            comunicação para a vida diária.
          </p>
        </div>
      </section>

      {/* Comece aqui */}
      <section className="border-b border-zinc-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/escola/portugues/aula/introducao"
            aria-label="Comece aqui: Por que aprendemos a escrever?"
            className={`group flex flex-col items-start gap-3 rounded-3xl border-2 border-blue-200 bg-blue-50 p-7 shadow-sm transition hover:border-blue-400 hover:shadow-lg sm:flex-row sm:items-center sm:gap-6 ${focusRing}`}
          >
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-4xl shadow-md" aria-hidden="true">
              ✏️
            </span>
            <div className="flex-1">
              <p className="text-sm font-black uppercase tracking-wide text-blue-700">
                Comece aqui
              </p>
              <h2 className="mt-1 text-2xl font-black text-zinc-900">
                Por que aprendemos a escrever?
              </h2>
              <p className="mt-1 text-base leading-7 text-zinc-600">
                Uma aula sobre a história da comunicação: dos desenhos e sinais
                até as letras, palavras e frases.
              </p>
            </div>
            <span className="rounded-full bg-blue-600 px-5 py-3 text-base font-black text-white shadow-md group-hover:bg-blue-700">
              Começar →
            </span>
          </Link>
        </div>
      </section>

      {/* Vogais em destaque + Alfabeto */}
      <section className="border-b border-zinc-200 bg-[#FbFcFe] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black text-zinc-900">As letras</h2>
          <p className="mt-1 text-base text-zinc-600">
            Toque em uma letra para abrir a aula da família dela.
          </p>

          <div className="mt-6">
            <Link
              href="/escola/portugues/aula/vogais"
              aria-label="Aula das vogais A E I O U"
              className={`flex items-center gap-4 rounded-3xl border-2 border-amber-200 bg-amber-50 p-5 transition hover:border-amber-400 hover:shadow-md ${focusRing}`}
            >
              <span className="text-3xl font-black tracking-widest text-amber-700">
                A E I O U
              </span>
              <span className="flex-1 text-base font-bold text-zinc-700">
                As vogais — o começo de tudo
              </span>
              <span className="rounded-full bg-amber-500 px-4 py-2 text-sm font-black text-white">
                Começar aula
              </span>
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {LETRAS.map((letra, i) => (
              <Link
                key={letra}
                href={`/escola/portugues/aula/${letra.toLowerCase()}`}
                aria-label={`Aula da letra ${letra}: ${VOGAIS.map((v) => letra + v).join(", ")}`}
                className={`group flex flex-col rounded-3xl border-2 border-transparent p-5 shadow-sm ring-1 transition hover:shadow-lg ${cores[i % cores.length]} ${focusRing}`}
              >
                <span className="text-5xl font-black leading-none" aria-hidden="true">
                  {letra}
                </span>
                <span className="mt-3 text-sm font-black text-zinc-800">
                  Letra {letra}
                </span>
                <span className="mt-0.5 text-xs font-bold text-zinc-500">
                  {VOGAIS.map((v) => letra + v).join(", ")}
                </span>
                <span className="mt-3 text-sm font-black text-zinc-700 group-hover:underline">
                  Começar aula →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sílabas complexas e sons especiais */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black text-zinc-900">
            Sílabas complexas e sons especiais
          </h2>
          <p className="mt-1 text-base text-zinc-600">
            Letras que se juntam para formar sons novos.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPLEXOS.map((c, i) => (
              <Link
                key={c.id}
                href={`/escola/portugues/aula/${c.id}`}
                aria-label={`Aula do som ${c.rotulo}: ${c.descricao}`}
                className={`group flex flex-col rounded-3xl border-2 border-transparent p-6 shadow-sm ring-1 transition hover:shadow-lg ${cores[i % cores.length]} ${focusRing}`}
              >
                <span className="text-4xl font-black leading-none" aria-hidden="true">
                  {c.rotulo}
                </span>
                <span className="mt-3 text-sm font-bold leading-6 text-zinc-700">
                  {c.descricao}
                </span>
                <span className="mt-2 text-xs font-bold text-zinc-500">
                  Palavras: {c.palavras.join(", ").toLowerCase()}
                </span>
                <span className="mt-4 text-sm font-black text-zinc-700 group-hover:underline">
                  Começar aula →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";
import {
  Breadcrumb,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";
import { IconDocument, IconDownload } from "../components/icons";

export const metadata: Metadata = {
  title: "Documentação — Projeto DAVI",
  description:
    "Manual, artigo conceitual e resumo da plataforma DAVI em PDF para leitura e download.",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

type Doc = {
  titulo: string;
  descricao: string;
  meta: string;
  arquivo: string;
};

const documentos: Doc[] = [
  {
    titulo: "Manual do Projeto DAVI",
    descricao:
      "Guia do ecossistema: o que é, objetivo, jornada, módulos, ética e o mapa do site com todas as rotas.",
    meta: "PDF · 6 páginas",
    arquivo: "/docs/manual-davi.pdf",
  },
  {
    titulo: "Artigo conceitual",
    descricao:
      "Documento técnico-institucional completo do Projeto DAVI — origem, fundamentação, módulos, métricas, ética e os módulos mais recentes (DAVI Games, Assistivo App, Imersivo e Emprega).",
    meta: "PDF · 18 páginas",
    arquivo: "/docs/artigo-projeto-davi.pdf",
  },
  {
    titulo: "Resumo da plataforma",
    descricao:
      "As funcionalidades da plataforma explicadas em linguagem simples e direta, módulo por módulo.",
    meta: "PDF · 10 páginas",
    arquivo: "/docs/resumo-plataforma-davi.pdf",
  },
];

export default function DocumentacaoPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ label: "O Projeto", href: "/projeto" }, { label: "Documentação" }]}
      />
      <PageHero
        eyebrow="Documentação"
        title="Documentos do Projeto DAVI"
        description="Manual, artigo conceitual e resumo da plataforma — disponíveis para leitura e download em PDF."
      />

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Materiais"
            title="Baixe ou leia online"
            description="Documentos institucionais que apresentam o ecossistema DAVI em diferentes níveis de profundidade."
          />

          <div className="mt-10 grid gap-5">
            {documentos.map((doc) => (
              <article
                key={doc.arquivo}
                className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-lg sm:flex-row sm:items-center"
              >
                <span
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"
                  aria-hidden="true"
                >
                  <IconDocument className="h-8 w-8" />
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-zinc-950">{doc.titulo}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{doc.descricao}</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-wide text-zinc-500">
                    {doc.meta}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={doc.arquivo}
                    download
                    aria-label={`Baixar ${doc.titulo} em PDF`}
                    className={`inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 ${focusRing}`}
                  >
                    <IconDownload className="h-5 w-5" /> Baixar PDF
                  </a>
                  <a
                    href={doc.arquivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ${doc.titulo} em nova aba`}
                    className={`inline-flex items-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-black text-zinc-900 hover:border-blue-400 hover:text-blue-800 ${focusRing}`}
                  >
                    Abrir
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
            Documentos em construção, atualizados conforme o projeto evolui. As
            funcionalidades descritas são possibilidades de pesquisa e
            desenvolvimento; qualquer coleta de dados com participantes deve
            respeitar ética, consentimento e LGPD, com submissão prévia ao
            Comitê de Ética em Pesquisa (CEP/Conep).
          </p>
        </div>
      </section>
    </PageShell>
  );
}

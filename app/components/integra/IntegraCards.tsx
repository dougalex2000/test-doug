import Link from "next/link";
import type { ReactNode } from "react";
import type {
  Challenge,
  ContributionType,
  IntegraStatus,
  PartnerType,
  Project,
  Repository,
  Workgroup,
} from "../../lib/integra/types";
import { IconArrowRight, IconCheckCircle } from "../icons";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

/* ------------------------------------------------------------------ */
/* StatusBadge (situação de desafios/projetos)                         */
/* ------------------------------------------------------------------ */

const statusStyles: Record<IntegraStatus | "Em formação", string> = {
  "Em definição": "bg-zinc-100 text-zinc-700 ring-zinc-300",
  "Em formação": "bg-teal-100 text-teal-900 ring-teal-300",
  "Aberto para colaboração": "bg-green-100 text-green-900 ring-green-300",
  "Formação de equipe": "bg-sky-100 text-sky-900 ring-sky-300",
  "Em desenvolvimento": "bg-blue-100 text-blue-900 ring-blue-300",
  "Em testes": "bg-violet-100 text-violet-900 ring-violet-300",
  "Em documentação": "bg-amber-100 text-amber-900 ring-amber-300",
  Concluído: "bg-emerald-100 text-emerald-900 ring-emerald-300",
  Suspenso: "bg-rose-100 text-rose-900 ring-rose-300",
};

export function StatusBadge({ status }: { status: IntegraStatus | "Em formação" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black ring-1 ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

/** Selo que deixa claro que o conteúdo é um exemplo, não uma chamada oficial. */
export function DemoBadge({ label = "Exemplo demonstrativo" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-900">
      <span aria-hidden="true">🧪</span>
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* SkillTag                                                            */
/* ------------------------------------------------------------------ */

export function SkillTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-xs font-bold text-zinc-700">
      {children}
    </span>
  );
}

function SkillTagList({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">{label}</p>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item}>
            <SkillTag>{item}</SkillTag>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Definição em par (rótulo → valor)                                   */
/* ------------------------------------------------------------------ */

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap gap-x-2 text-sm">
      <dt className="font-black text-zinc-500">{label}:</dt>
      <dd className="font-semibold text-zinc-800">{children}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ChallengeCard                                                       */
/* ------------------------------------------------------------------ */

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const c = challenge;
  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={c.status} />
        {c.isDemo ? <DemoBadge /> : null}
      </div>
      <h3 className="mt-3 text-xl font-black text-zinc-950">{c.title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{c.summary}</p>

      <dl className="mt-4 grid gap-1.5">
        <MetaRow label="Módulo">{c.modules.join(", ")}</MetaRow>
        <MetaRow label="Área">{c.knowledgeAreas.join(", ")}</MetaRow>
        <MetaRow label="Maturidade">{c.maturity}</MetaRow>
        <MetaRow label="Tipo de contribuição">{c.contributionTypes.join(", ")}</MetaRow>
        <MetaRow label="Grupo responsável">{c.workgroup}</MetaRow>
        <MetaRow label="Avaliação ética (CEP)">
          {c.ethicsReview ? "Pode ser necessária" : "Não prevista nesta etapa"}
        </MetaRow>
      </dl>

      <div className="mt-4 grid gap-3">
        <SkillTagList label="Competências desejadas" items={c.skills} />
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-zinc-500">Entregas esperadas</p>
          <ul className="mt-1.5 grid gap-1">
            {c.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm leading-6 text-zinc-700">
                <IconCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-4">
        {c.docsUrl ? (
          <a href={c.docsUrl} className={`rounded text-sm font-black text-blue-800 hover:underline ${focusRing}`}>
            Documentação
          </a>
        ) : (
          <span className="text-sm font-semibold text-zinc-400">Documentação em preparação</span>
        )}
        {c.repoUrl ? (
          <a href={c.repoUrl} className={`rounded text-sm font-black text-blue-800 hover:underline ${focusRing}`}>
            Repositório
          </a>
        ) : null}
      </div>

      <div className="mt-auto pt-4">
        <Link
          href={`/integra/participar?desafio=${encodeURIComponent(c.id)}`}
          className={`inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-black text-white hover:bg-blue-800 ${focusRing}`}
        >
          Tenho interesse em contribuir <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* ProjectCard                                                         */
/* ------------------------------------------------------------------ */

export function ProjectCard({ project }: { project: Project }) {
  const p = project;
  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={p.status} />
        {p.isDemo ? <DemoBadge /> : null}
      </div>
      <h3 className="mt-3 text-xl font-black text-zinc-950">{p.name}</h3>
      <p className="mt-1 text-sm font-bold text-blue-800">{p.objective}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{p.description}</p>

      <dl className="mt-4 grid gap-1.5">
        <MetaRow label="Módulo">{p.modules.join(", ")}</MetaRow>
        <MetaRow label="Área">{p.area}</MetaRow>
        <MetaRow label="Etapa atual">{p.currentStage}</MetaRow>
        <MetaRow label="Grupo de trabalho">{p.workgroup}</MetaRow>
        <MetaRow label="Modalidade">{p.modality}</MetaRow>
        <MetaRow label="Participação">{p.participationTypes.join(", ")}</MetaRow>
      </dl>

      <div className="mt-4 grid gap-3">
        <SkillTagList label="Tecnologias" items={p.technologies} />
        <SkillTagList label="Perfis procurados" items={p.wantedProfiles} />
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-zinc-500">Resultados esperados</p>
          <ul className="mt-1.5 grid gap-1">
            {p.expectedResults.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm leading-6 text-zinc-700">
                <IconCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        {p.updates.length ? (
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-zinc-500">Histórico de atualizações</p>
            <ul className="mt-1.5 grid gap-1">
              {p.updates.map((u) => (
                <li key={`${u.date}-${u.text}`} className="text-sm leading-6 text-zinc-700">
                  <span className="font-black text-zinc-500">{u.date}</span> — {u.text}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-4">
        {p.docsUrl ? (
          <a href={p.docsUrl} className={`rounded text-sm font-black text-blue-800 hover:underline ${focusRing}`}>
            Documentação
          </a>
        ) : (
          <span className="text-sm font-semibold text-zinc-400">Documentação em preparação</span>
        )}
        {p.repoUrl ? (
          <a href={p.repoUrl} className={`rounded text-sm font-black text-blue-800 hover:underline ${focusRing}`}>
            Repositório
          </a>
        ) : null}
      </div>

      <div className="mt-auto pt-4">
        <Link
          href={`/integra/participar?projeto=${encodeURIComponent(p.id)}`}
          className={`inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-black text-white hover:bg-blue-800 ${focusRing}`}
        >
          Manifestar interesse <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* WorkgroupCard                                                       */
/* ------------------------------------------------------------------ */

export function WorkgroupCard({ workgroup }: { workgroup: Workgroup }) {
  const w = workgroup;
  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={w.situation} />
      </div>
      <h3 className="mt-3 text-xl font-black text-zinc-950">{w.name}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{w.objective}</p>

      <dl className="mt-4 grid gap-1.5">
        <MetaRow label="Área de atuação">{w.area}</MetaRow>
        <MetaRow label="Participação">{w.participation}</MetaRow>
      </dl>

      <div className="mt-4 grid gap-3">
        <SkillTagList label="Atividades" items={w.activities} />
        <SkillTagList label="Conhecimentos úteis" items={w.usefulKnowledge} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-4">
        {w.moduleHref ? (
          <Link href={w.moduleHref} className={`rounded text-sm font-black text-blue-800 hover:underline ${focusRing}`}>
            Ver módulo
          </Link>
        ) : null}
        <Link
          href={`/integra/participar?grupo=${encodeURIComponent(w.id)}`}
          className={`rounded text-sm font-black text-blue-800 hover:underline ${focusRing}`}
        >
          Participar deste grupo →
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* ContributionTypeCard                                                */
/* ------------------------------------------------------------------ */

export function ContributionTypeCard({ contribution }: { contribution: ContributionType }) {
  const area = contribution.relatedAreas[0] ?? "";
  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-black text-zinc-950">{contribution.title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-zinc-600">{contribution.description}</p>
      <div className="mt-auto pt-4">
        <Link
          href={`/integra/desafios?area=${encodeURIComponent(area)}`}
          className={`rounded text-sm font-black text-blue-800 hover:underline ${focusRing}`}
        >
          Ver oportunidades relacionadas →
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* PartnerTypeCard                                                     */
/* ------------------------------------------------------------------ */

export function PartnerTypeCard({ partner }: { partner: PartnerType }) {
  return (
    <article className="h-full rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-black text-zinc-950">{partner.title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-zinc-600">{partner.description}</p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* RepositoryCard                                                      */
/* ------------------------------------------------------------------ */

export function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-black text-zinc-950">{repository.name}</h3>
      <p className="mt-1.5 text-sm leading-6 text-zinc-600">{repository.description}</p>
      {repository.language ? (
        <p className="mt-2">
          <SkillTag>{repository.language}</SkillTag>
        </p>
      ) : null}
      <div className="mt-auto pt-4">
        <a
          href={repository.url}
          className={`rounded text-sm font-black text-blue-800 hover:underline ${focusRing}`}
        >
          Abrir repositório →
        </a>
      </div>
    </article>
  );
}

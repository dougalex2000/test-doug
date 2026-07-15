import Link from "next/link";
import type { ReactNode } from "react";
import { mainNav, type ModuleStatus, type NavItem } from "../lib/siteNav";
import {
  Breadcrumb,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "./SiteShell";
import { IconArrowRight, IconCheckCircle } from "./icons";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

/* ------------------------------------------------------------------ */
/* Badges de status                                                    */
/* ------------------------------------------------------------------ */

const statusStyles: Record<ModuleStatus, string> = {
  "Em construção": "bg-amber-100 text-amber-900 ring-amber-300",
  "Em estruturação": "bg-teal-100 text-teal-900 ring-teal-300",
  "Em desenvolvimento": "bg-green-100 text-green-900 ring-green-300",
  Protótipo: "bg-violet-100 text-violet-900 ring-violet-300",
  "Testes iniciais": "bg-sky-100 text-sky-900 ring-sky-300",
  Planejado: "bg-zinc-100 text-zinc-700 ring-zinc-300",
  Demonstração: "bg-blue-100 text-blue-900 ring-blue-300",
  Experimental: "bg-rose-100 text-rose-900 ring-rose-300",
  "Área logada": "bg-emerald-100 text-emerald-900 ring-emerald-300",
};

export function StatusBadge({ status }: { status: ModuleStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-black ring-1 ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export function GroupBadge({ group }: { group: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-bold text-zinc-700">
      <span aria-hidden="true">👥</span>
      {group}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Jornada DAVI                                                        */
/* ------------------------------------------------------------------ */

const journeySteps = [
  "Comunicação",
  "Alfabetização",
  "Escrita",
  "Aprendizagem",
  "Participação",
  "Autonomia",
  "Vida Independente",
];

export function JourneyDavi({ compact = false }: { compact?: boolean }) {
  return (
    <ol
      aria-label="Jornada DAVI"
      className="flex flex-wrap items-center gap-2"
    >
      {journeySteps.map((step, index) => {
        const isLast = index === journeySteps.length - 1;
        return (
          <li key={step} className="flex items-center gap-2">
            <span
              className={`rounded-lg border px-3 py-2 font-black ${
                compact ? "text-xs" : "text-sm"
              } ${
                isLast
                  ? "border-green-300 bg-green-600 text-white"
                  : "border-blue-200 bg-blue-50 text-blue-900"
              }`}
            >
              {step}
            </span>
            {!isLast && (
              <span aria-hidden="true" className="text-lg font-black text-zinc-400">
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Fluxo em etapas (setas)                                             */
/* ------------------------------------------------------------------ */

export function FlowSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-bold text-blue-900">
            {step}
          </span>
          {index < steps.length - 1 && (
            <span aria-hidden="true" className="text-lg font-black text-zinc-400">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Grade de módulos / cards                                            */
/* ------------------------------------------------------------------ */

export type ModuleCard = {
  title: string;
  description: string;
  href?: string;
  status?: ModuleStatus;
  icon?: ReactNode;
  /** Texto do link do card (padrão: "Explorar →"). */
  cta?: string;
};

export function ModuleGrid({
  items,
  columns = "lg:grid-cols-3",
}: {
  items: ModuleCard[];
  columns?: string;
}) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 ${columns}`}>
      {items.map((item) => {
        const inner = (
          <div className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition group-hover:border-blue-300 group-hover:shadow-xl group-hover:shadow-blue-950/10">
            <div className="flex items-start justify-between gap-3">
              {item.icon ? (
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  {item.icon}
                </span>
              ) : (
                <span className="mb-1 h-1.5 w-12 rounded-full bg-green-600" />
              )}
              {item.status ? <StatusBadge status={item.status} /> : null}
            </div>
            <h3 className="mt-4 text-xl font-black text-zinc-950 group-hover:text-blue-800">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {item.description}
            </p>
            {item.href ? (
              <p className="mt-auto pt-5 text-sm font-black text-blue-800">
                {item.cta ?? "Explorar →"}
              </p>
            ) : null}
          </div>
        );
        return item.href ? (
          <Link
            key={item.title}
            href={item.href}
            className={`group block rounded-lg ${focusRing}`}
          >
            {inner}
          </Link>
        ) : (
          <div key={item.title} className="group">
            {inner}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Aviso "em construção"                                               */
/* ------------------------------------------------------------------ */

export function ConstructionNotice({
  title = "Recurso em desenvolvimento",
  children,
  tone = "amber",
}: {
  title?: string;
  children: ReactNode;
  tone?: "amber" | "blue";
}) {
  const styles =
    tone === "blue"
      ? "border-blue-200 bg-blue-50 text-blue-900"
      : "border-amber-200 bg-amber-50 text-amber-900";
  return (
    <div className={`rounded-2xl border p-6 ${styles}`}>
      <p className="text-sm font-black uppercase tracking-wide">{title}</p>
      <div className="mt-2 max-w-3xl text-base leading-7 text-zinc-800">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Índice de subpáginas                                                */
/* ------------------------------------------------------------------ */

export function SubnavGrid({ items }: { items: NavItem[] }) {
  return (
    <ModuleGrid
      items={items.map((item) => ({
        title: item.label,
        description: item.description ?? "",
        href: item.href,
        status: item.status,
      }))}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Template de página conceitual (data-driven)                         */
/* ------------------------------------------------------------------ */

export type ConceptSection = {
  eyebrow?: string;
  title: string;
  description?: string;
  paragraphs?: string[];
  bullets?: string[];
  tone?: "white" | "soft";
};

export type ConceptPageProps = {
  /** Trilha (breadcrumb): rótulos das seções pai. */
  breadcrumb: { label: string; href?: string }[];
  eyebrow: string;
  title: string;
  subtitle: string;
  status?: ModuleStatus;
  group?: string;
  actions?: ReactNode;
  /** Conteúdo interativo logo após o hero (demos client). */
  lead?: ReactNode;
  sections?: ConceptSection[];
  /** Cards de módulos/subpáginas. */
  cards?: { eyebrow?: string; title?: string; items: ModuleCard[] };
  note?: ReactNode;
  /** Conteúdo extra ao final. */
  children?: ReactNode;
};

/**
 * Página-índice de uma seção do menu: monta o hero e os cards das subpáginas
 * automaticamente a partir da navegação central.
 */
export function SectionHub({
  href,
  subtitle,
  lead,
  sections,
  note,
  cardsTitle,
}: {
  href: string;
  subtitle: string;
  lead?: ReactNode;
  sections?: ConceptSection[];
  note?: ReactNode;
  cardsTitle?: string;
}) {
  const section = mainNav.find((s) => s.href === href);
  const items = (section?.items ?? []).filter((i) => i.href !== href);
  return (
    <ConceptPage
      breadcrumb={[{ label: section?.title ?? "DAVI" }]}
      eyebrow={section?.title ?? "DAVI"}
      title={section?.title ?? "DAVI"}
      subtitle={subtitle}
      lead={lead}
      sections={sections}
      note={note}
      cards={{
        eyebrow: "Subpáginas",
        title: cardsTitle ?? `Explore ${section?.title ?? ""}`.trim(),
        items: items.map((item) => ({
          title: item.label,
          description: item.description ?? "",
          href: item.href,
          status: item.status,
        })),
      }}
    />
  );
}

export function ConceptPage({
  breadcrumb,
  eyebrow,
  title,
  subtitle,
  status,
  group,
  actions,
  lead,
  sections = [],
  cards,
  note,
  children,
}: ConceptPageProps) {
  return (
    <PageShell>
      <Breadcrumb items={breadcrumb} />
      <PageHero eyebrow={eyebrow} title={title} description={subtitle} actions={actions} />

      {(status || group) && (
        <div className="border-b border-zinc-200 bg-white px-6 py-4">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
            {status ? <StatusBadge status={status} /> : null}
            {group ? <GroupBadge group={group} /> : null}
          </div>
        </div>
      )}

      {lead ? (
        <section className="border-b border-zinc-200 bg-white px-6 py-12">
          <div className="mx-auto max-w-7xl">{lead}</div>
        </section>
      ) : null}

      {sections.map((sec, index) => (
        <section
          key={sec.title}
          className={`border-b border-zinc-200 px-6 py-14 ${
            (sec.tone ?? (index % 2 === 0 ? "white" : "soft")) === "soft"
              ? "bg-[#F6F8FB]"
              : "bg-white"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow={sec.eyebrow ?? eyebrow}
              title={sec.title}
              description={sec.description}
            />
            {sec.paragraphs?.length ? (
              <div className="mt-5 max-w-3xl space-y-4 text-lg leading-8 text-zinc-700">
                {sec.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            ) : null}
            {sec.bullets?.length ? (
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {sec.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-white p-3 text-sm font-semibold leading-6 text-zinc-800"
                  >
                    <IconCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      {cards ? (
        <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
          <div className="mx-auto max-w-7xl">
            {(cards.eyebrow || cards.title) && (
              <SectionHeader
                eyebrow={cards.eyebrow ?? eyebrow}
                title={cards.title ?? "Explore"}
              />
            )}
            <div className="mt-10">
              <ModuleGrid items={cards.items} />
            </div>
          </div>
        </section>
      ) : null}

      {note ? (
        <section className="border-b border-zinc-200 bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">{note}</div>
        </section>
      ) : null}

      {children}

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-base font-bold text-zinc-800">
              Quer entender o ecossistema completo? Comece pelo manual do projeto.
            </p>
            <LinkButton href="/manual">
              <span className="inline-flex items-center gap-2">
                Ler o manual <IconArrowRight className="h-5 w-5" />
              </span>
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

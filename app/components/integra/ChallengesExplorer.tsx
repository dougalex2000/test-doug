"use client";

import { useId, useMemo, useState } from "react";
import type { Challenge } from "../../lib/integra/types";
import { ChallengeCard } from "./IntegraCards";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";
const selectClass = `mt-1.5 w-full rounded-lg border-2 border-zinc-300 bg-white px-3 py-2.5 text-sm font-semibold text-zinc-950 ${focusRing}`;

const ALL = "__all__";

type Options = {
  modules: string[];
  areas: string[];
  statuses: string[];
  contributionTypes: string[];
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
  allLabel,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  allLabel: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-xs font-black uppercase tracking-wide text-zinc-600">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
        <option value={ALL}>{allLabel}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ChallengesExplorer({
  challenges,
  options,
  initialArea,
}: {
  challenges: Challenge[];
  options: Options;
  initialArea?: string;
}) {
  const [module, setModule] = useState(ALL);
  const [area, setArea] = useState(
    initialArea && options.areas.includes(initialArea) ? initialArea : ALL,
  );
  const [status, setStatus] = useState(ALL);
  const [contribution, setContribution] = useState(ALL);

  const filtered = useMemo(
    () =>
      challenges.filter(
        (c) =>
          (module === ALL || c.modules.includes(module)) &&
          (area === ALL || c.knowledgeAreas.includes(area)) &&
          (status === ALL || c.status === status) &&
          (contribution === ALL || c.contributionTypes.includes(contribution)),
      ),
    [challenges, module, area, status, contribution],
  );

  const anyFilter = module !== ALL || area !== ALL || status !== ALL || contribution !== ALL;

  return (
    <div>
      <div
        role="group"
        aria-label="Filtros de desafios"
        className="rounded-2xl border border-zinc-200 bg-[#F6F8FB] p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect label="Módulo" value={module} options={options.modules} onChange={setModule} allLabel="Todos os módulos" />
          <FilterSelect label="Área" value={area} options={options.areas} onChange={setArea} allLabel="Todas as áreas" />
          <FilterSelect label="Status" value={status} options={options.statuses} onChange={setStatus} allLabel="Todos os status" />
          <FilterSelect label="Tipo de contribuição" value={contribution} options={options.contributionTypes} onChange={setContribution} allLabel="Todos os tipos" />
        </div>
        {anyFilter ? (
          <button
            type="button"
            onClick={() => {
              setModule(ALL);
              setArea(ALL);
              setStatus(ALL);
              setContribution(ALL);
            }}
            className={`mt-4 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-black text-zinc-800 hover:border-blue-400 ${focusRing}`}
          >
            Limpar filtros
          </button>
        ) : null}
      </div>

      <p role="status" aria-live="polite" className="mt-5 text-sm font-bold text-zinc-600">
        {filtered.length === 0
          ? "Nenhum desafio corresponde aos filtros."
          : `${filtered.length} desafio${filtered.length > 1 ? "s" : ""} demonstrativo${filtered.length > 1 ? "s" : ""}.`}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          {filtered.map((c) => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

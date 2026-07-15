"use client";

import { useId, useMemo, useState } from "react";
import type { Project } from "../../lib/integra/types";
import { ProjectCard } from "./IntegraCards";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";
const selectClass = `mt-1.5 w-full rounded-lg border-2 border-zinc-300 bg-white px-3 py-2.5 text-sm font-semibold text-zinc-950 ${focusRing}`;

const ALL = "__all__";

type Options = {
  modules: string[];
  areas: string[];
  statuses: string[];
  participationTypes: string[];
  modalities: string[];
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

export function ProjectsExplorer({
  projects,
  options,
}: {
  projects: Project[];
  options: Options;
}) {
  const [module, setModule] = useState(ALL);
  const [area, setArea] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [participation, setParticipation] = useState(ALL);
  const [modality, setModality] = useState(ALL);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (module === ALL || p.modules.includes(module)) &&
          (area === ALL || p.area === area) &&
          (status === ALL || p.status === status) &&
          (participation === ALL || p.participationTypes.includes(participation)) &&
          (modality === ALL || p.modality === modality),
      ),
    [projects, module, area, status, participation, modality],
  );

  const anyFilter =
    module !== ALL || area !== ALL || status !== ALL || participation !== ALL || modality !== ALL;

  return (
    <div>
      <div
        role="group"
        aria-label="Filtros de projetos"
        className="rounded-2xl border border-zinc-200 bg-[#F6F8FB] p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FilterSelect label="Módulo" value={module} options={options.modules} onChange={setModule} allLabel="Todos os módulos" />
          <FilterSelect label="Área" value={area} options={options.areas} onChange={setArea} allLabel="Todas as áreas" />
          <FilterSelect label="Status" value={status} options={options.statuses} onChange={setStatus} allLabel="Todos os status" />
          <FilterSelect label="Tipo de participação" value={participation} options={options.participationTypes} onChange={setParticipation} allLabel="Todas as participações" />
          <FilterSelect label="Modalidade" value={modality} options={options.modalities} onChange={setModality} allLabel="Todas as modalidades" />
        </div>
        {anyFilter ? (
          <button
            type="button"
            onClick={() => {
              setModule(ALL);
              setArea(ALL);
              setStatus(ALL);
              setParticipation(ALL);
              setModality(ALL);
            }}
            className={`mt-4 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-black text-zinc-800 hover:border-blue-400 ${focusRing}`}
          >
            Limpar filtros
          </button>
        ) : null}
      </div>

      <p role="status" aria-live="polite" className="mt-5 text-sm font-bold text-zinc-600">
        {filtered.length === 0
          ? "Nenhum projeto corresponde aos filtros."
          : `${filtered.length} projeto${filtered.length > 1 ? "s" : ""} demonstrativo${filtered.length > 1 ? "s" : ""}.`}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

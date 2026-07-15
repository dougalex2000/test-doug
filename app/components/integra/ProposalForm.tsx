"use client";

import { useId, useState, type FormEvent } from "react";
import { submitProposal } from "../../lib/integra/service";
import type { ProposalSubmission, SubmissionResult } from "../../lib/integra/types";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";
const inputClass = `mt-2 w-full rounded-lg border-2 border-zinc-300 bg-white px-4 py-3 text-base font-semibold text-zinc-950 placeholder:font-normal placeholder:text-zinc-400 ${focusRing}`;

const categories = [
  "Ideia",
  "Desafio técnico",
  "Pesquisa",
  "Atividade pedagógica",
  "Tecnologia assistiva",
  "Melhoria de acessibilidade",
  "Documentação",
  "Parceria",
  "Necessidade observada",
];

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-black text-zinc-900">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      {hint ? <p className="mt-0.5 text-xs font-semibold text-zinc-500">{hint}</p> : null}
      {children(id)}
    </div>
  );
}

export function ProposalForm({ moduleOptions }: { moduleOptions: string[] }) {
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload: ProposalSubmission = {
      title: String(data.get("title") ?? "").trim(),
      category: String(data.get("category") ?? "").trim(),
      problem: String(data.get("problem") ?? "").trim(),
      audience: String(data.get("audience") ?? "").trim(),
      imaginedSolution: String(data.get("imaginedSolution") ?? "").trim(),
      modules: data.getAll("modules").map(String),
      requiredKnowledge: String(data.get("requiredKnowledge") ?? "").trim(),
      requiredResources: String(data.get("requiredResources") ?? "").trim() || undefined,
      expectedResult: String(data.get("expectedResult") ?? "").trim(),
      risks: String(data.get("risks") ?? "").trim() || undefined,
      needsParticipantResearch: data.get("needsParticipantResearch") === "1",
      proposerName: String(data.get("proposerName") ?? "").trim(),
      proposerContact: String(data.get("proposerContact") ?? "").trim(),
    };

    setSubmitting(true);
    try {
      setResult(await submitProposal(payload));
    } catch {
      setResult({ status: "error", message: "Falha de comunicação." });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.status === "prepared" || result?.status === "saved") {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-6 sm:p-8">
        <h2 className="text-xl font-black text-teal-900">Proposta recebida com atenção.</h2>
        <p className="mt-3 text-base leading-7 text-teal-900">
          Obrigado por contribuir com uma ideia para o Projeto DAVI. Propostas são analisadas de
          acordo com os grupos de trabalho e as prioridades do ecossistema.
        </p>
        <div className="mt-4 rounded-lg border border-teal-300 bg-white p-4">
          <p className="text-sm font-black uppercase tracking-wide text-teal-800">Recurso em preparação</p>
          <p className="mt-1 text-sm leading-6 text-zinc-700">
            O armazenamento seguro deste formulário ainda está sendo configurado, por isso a proposta{" "}
            <strong>não foi enviada nem salva</strong>. Você pode enviá-la pelo e-mail{" "}
            <a href="mailto:contato.plataformadavi@gmail.com" className="font-black text-blue-800 underline">
              contato.plataformadavi@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-bold leading-6 text-amber-900">
          Não inclua nomes, fotografias, diagnósticos, prontuários ou informações que permitam
          identificar alunos, pacientes ou outras pessoas.
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Título" required>
            {(id) => <input id={id} name="title" type="text" required className={inputClass} />}
          </Field>
          <Field label="Categoria" required>
            {(id) => (
              <select id={id} name="category" required className={inputClass} defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>

        <Field label="Problema ou necessidade" required>
          {(id) => <textarea id={id} name="problem" rows={3} required className={inputClass} placeholder="Qual necessidade real esta proposta atende?" />}
        </Field>
        <Field label="Público ou contexto beneficiado" required>
          {(id) => <input id={id} name="audience" type="text" required className={inputClass} placeholder="Sem identificar pessoas específicas." />}
        </Field>
        <Field label="Solução imaginada" required>
          {(id) => <textarea id={id} name="imaginedSolution" rows={3} required className={inputClass} />}
        </Field>

        <fieldset>
          <legend className="text-sm font-black text-zinc-900">Módulos relacionados</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {moduleOptions.map((option) => (
              <label key={option} className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-white p-2.5 text-sm font-semibold text-zinc-800">
                <input type="checkbox" name="modules" value={option} className="mt-0.5 h-4 w-4" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Conhecimentos necessários" required>
            {(id) => <textarea id={id} name="requiredKnowledge" rows={2} required className={inputClass} />}
          </Field>
          <Field label="Recursos necessários">
            {(id) => <textarea id={id} name="requiredResources" rows={2} className={inputClass} placeholder="Equipamentos, materiais, infraestrutura…" />}
          </Field>
          <Field label="Resultado esperado" required>
            {(id) => <textarea id={id} name="expectedResult" rows={2} required className={inputClass} />}
          </Field>
          <Field label="Riscos ou cuidados">
            {(id) => <textarea id={id} name="risks" rows={2} className={inputClass} />}
          </Field>
        </div>

        <label className="flex items-start gap-3 rounded-lg border border-zinc-300 bg-zinc-50 p-4">
          <input type="checkbox" name="needsParticipantResearch" value="1" className="mt-1 h-5 w-5" />
          <span className="text-sm font-semibold leading-6 text-zinc-800">
            Esta proposta pode envolver pesquisa com participantes (o que exigirá procedimentos
            éticos, consentimento e, quando aplicável, Comitê de Ética em Pesquisa).
          </span>
        </label>

        <fieldset>
          <legend className="text-lg font-black text-blue-800">Informações do proponente</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field label="Nome" required>
              {(id) => <input id={id} name="proposerName" type="text" required className={inputClass} />}
            </Field>
            <Field label="E-mail para contato" required>
              {(id) => <input id={id} name="proposerContact" type="email" required className={inputClass} placeholder="voce@exemplo.com" />}
            </Field>
          </div>
        </fieldset>
      </div>

      {result?.status === "error" ? (
        <p role="alert" className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm font-bold text-red-900">
          {result.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className={`mt-8 rounded-lg bg-blue-700 px-6 py-4 text-lg font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 disabled:opacity-50 ${focusRing}`}
      >
        {submitting ? "Enviando…" : "Enviar proposta"}
      </button>
    </form>
  );
}

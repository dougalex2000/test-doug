"use client";

import { useId, useState, type FormEvent } from "react";
import { submitInterest } from "../../lib/integra/service";
import type { InterestSubmission, Modality, SubmissionResult } from "../../lib/integra/types";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";
const inputClass = `mt-2 w-full rounded-lg border-2 border-zinc-300 bg-white px-4 py-3 text-base font-semibold text-zinc-950 placeholder:font-normal placeholder:text-zinc-400 ${focusRing}`;

const modalities: Modality[] = ["Remota", "Presencial", "Híbrida"];

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

function CheckboxGroup({
  legend,
  name,
  options,
}: {
  legend: string;
  name: string;
  options: string[];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-black text-zinc-900">{legend}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-white p-2.5 text-sm font-semibold text-zinc-800"
          >
            <input type="checkbox" name={name} value={option} className="mt-0.5 h-4 w-4" />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function InterestForm({
  moduleOptions,
  contributionOptions,
  contextLabel,
}: {
  moduleOptions: string[];
  contributionOptions: string[];
  contextLabel?: string;
}) {
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!data.get("privacyAccepted")) {
      setError("É necessário concordar com o aviso de privacidade para enviar.");
      return;
    }
    setError(null);

    const payload: InterestSubmission = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      cityState: String(data.get("cityState") ?? "").trim(),
      institution: String(data.get("institution") ?? "").trim() || undefined,
      field: String(data.get("field") ?? "").trim(),
      background: String(data.get("background") ?? "").trim(),
      modules: data.getAll("modules").map(String),
      contributionTypes: data.getAll("contributionTypes").map(String),
      availability: String(data.get("availability") ?? "").trim(),
      modality: (String(data.get("modality") ?? "Remota") as Modality),
      portfolioUrl: String(data.get("portfolioUrl") ?? "").trim() || undefined,
      message: String(data.get("message") ?? "").trim(),
      privacyAccepted: true,
    };

    setSubmitting(true);
    try {
      const res = await submitInterest(payload);
      setResult(res);
    } catch {
      setResult({ status: "error", message: "Falha de comunicação." });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.status === "prepared" || result?.status === "saved") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-6 sm:p-8"
      >
        <h2 className="text-xl font-black text-teal-900">Obrigado pelo interesse em contribuir com o Projeto DAVI.</h2>
        <p className="mt-3 text-base leading-7 text-teal-900">
          Sua manifestação será analisada de acordo com os projetos, grupos de trabalho e
          oportunidades disponíveis.
        </p>
        <div className="mt-4 rounded-lg border border-teal-300 bg-white p-4">
          <p className="text-sm font-black uppercase tracking-wide text-teal-800">Recurso em preparação</p>
          <p className="mt-1 text-sm leading-6 text-zinc-700">
            O armazenamento seguro deste formulário ainda está sendo configurado, por isso os dados{" "}
            <strong>não foram enviados nem salvos</strong>. Enquanto isso, você pode manifestar
            interesse pelo e-mail{" "}
            <a href="mailto:contato.plataformadavi@gmail.com" className="font-black text-blue-800 underline">
              contato.plataformadavi@gmail.com
            </a>
            .
          </p>
        </div>
        <p className="mt-4 text-sm font-semibold text-teal-900">
          O cadastro de interesse não representa promessa de bolsa, contratação, vínculo ou
          participação automática.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg sm:p-8">
      {contextLabel ? (
        <p className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm font-bold text-blue-900">
          Você está manifestando interesse em: {contextLabel}
        </p>
      ) : null}

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-bold leading-6 text-amber-900">
          Este formulário é destinado ao contato entre possíveis colaboradores e o Projeto DAVI.
          Não deve ser utilizado para enviar informações médicas, diagnósticos, laudos, imagens ou
          dados pessoais de alunos, pacientes ou participantes de pesquisa.
        </p>
      </div>

      <fieldset className="mt-8">
        <legend className="text-lg font-black text-blue-800">1. Identificação</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Nome" required>
            {(id) => <input id={id} name="name" type="text" required className={inputClass} />}
          </Field>
          <Field label="E-mail" required>
            {(id) => <input id={id} name="email" type="email" required className={inputClass} placeholder="voce@exemplo.com" />}
          </Field>
          <Field label="Cidade e estado" required>
            {(id) => <input id={id} name="cityState" type="text" required className={inputClass} placeholder="Ex.: Valinhos-SP" />}
          </Field>
          <Field label="Instituição (se houver)">
            {(id) => <input id={id} name="institution" type="text" className={inputClass} />}
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-lg font-black text-blue-800">2. Experiência</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Área de atuação ou estudo" required>
            {(id) => <input id={id} name="field" type="text" required className={inputClass} placeholder="Ex.: Educação especial, Engenharia…" />}
          </Field>
          <Field label="Link para currículo, portfólio ou perfil (opcional)">
            {(id) => <input id={id} name="portfolioUrl" type="url" className={inputClass} placeholder="https://…" />}
          </Field>
          <div className="sm:col-span-2">
            <Field label="Formação ou experiência" required>
              {(id) => <textarea id={id} name="background" rows={3} required className={inputClass} placeholder="Conte, em poucas linhas, sua formação e experiência." />}
            </Field>
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-lg font-black text-blue-800">3. Como deseja contribuir</legend>
        <div className="mt-4 grid gap-6">
          <CheckboxGroup legend="Módulos de interesse" name="modules" options={moduleOptions} />
          <CheckboxGroup legend="Tipos de contribuição" name="contributionTypes" options={contributionOptions} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Disponibilidade aproximada" required>
              {(id) => (
                <select id={id} name="availability" required className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Selecione
                  </option>
                  {["Até 2h por semana", "2 a 5h por semana", "5 a 10h por semana", "Mais de 10h por semana", "Pontual / por projeto"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <Field label="Modalidade de participação" required>
              {(id) => (
                <select id={id} name="modality" required className={inputClass} defaultValue="Remota">
                  {modalities.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              )}
            </Field>
          </div>
          <Field label="Como você deseja contribuir?" required>
            {(id) => <textarea id={id} name="message" rows={4} required className={inputClass} placeholder="Descreva como gostaria de colaborar. Não inclua dados de terceiros." />}
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="sr-only">Privacidade</legend>
        <label className="flex items-start gap-3 rounded-lg border border-zinc-300 bg-zinc-50 p-4">
          <input type="checkbox" name="privacyAccepted" value="1" className="mt-1 h-5 w-5" />
          <span className="text-sm font-semibold leading-6 text-zinc-800">
            Li e concordo com o aviso de privacidade. Não estou enviando diagnósticos, laudos,
            informações médicas ou dados pessoais de outras pessoas.
          </span>
        </label>
      </fieldset>

      {error ? (
        <p role="alert" className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm font-bold text-red-900">
          {error}
        </p>
      ) : null}
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
        {submitting ? "Enviando…" : "Enviar manifestação de interesse"}
      </button>
    </form>
  );
}

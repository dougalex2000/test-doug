"use client";

import { useId, useState, type FormEvent } from "react";
import {
  saveEvaluation,
  type EvaluationPayload,
  type SaveEvaluationResult,
} from "../actions/evaluations";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const inputClass = `mt-2 w-full rounded-lg border-2 border-zinc-300 bg-white px-4 py-3 text-base font-semibold text-zinc-950 placeholder:font-normal placeholder:text-zinc-400 ${focusRing}`;

const accessMethodOptions = [
  "Olhar",
  "Toque",
  "Acionador físico",
  "Sopro",
  "Inclinação da cabeça",
  "Joystick",
  "Pedal",
  "Sensor de proximidade",
  "Voz",
  "Varredura automática",
  "Olhar + confirmação física",
];

const performanceOptions = ["Excelente", "Bom", "Regular", "Difícil", "Inviável"];

const scaleOptions = ["Preservado", "Parcial", "Reduzido", "Ausente", "Não avaliado"];

type EvaluationDraft = Record<string, string>;

function Field({
  label,
  children,
}: {
  label: string;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-black text-zinc-900">
        {label}
      </label>
      {children(id)}
    </div>
  );
}

function ScaleSelect({ id, name }: { id: string; name: string }) {
  return (
    <select id={id} name={name} className={inputClass} defaultValue="Não avaliado">
      {scaleOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function EvaluationForm() {
  const [draft, setDraft] = useState<EvaluationDraft | null>(null);
  const [saveResult, setSaveResult] = useState<SaveEvaluationResult | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const entries: EvaluationDraft = {};
    formData.forEach((value, key) => {
      const text = String(value).trim();
      if (text) entries[key] = text;
    });
    setDraft(entries);
    setSaveResult(null);
    setSaving(true);
    try {
      const result = await saveEvaluation(entries as unknown as EvaluationPayload);
      setSaveResult(result);
    } catch {
      setSaveResult({
        status: "error",
        message: "Falha de comunicação com o servidor.",
      });
    } finally {
      setSaving(false);
    }
  }

  const fieldLabels: Record<string, string> = {
    studentName: "Identificação do aluno/paciente",
    age: "Idade",
    institution: "Escola/Instituição",
    professional: "Profissional responsável",
    motorLimitations: "Limitações motoras",
    preservedMovements: "Movimentos preservados",
    currentCommunication: "Comunicação atual",
    handUse: "Uso de mãos/dedos",
    headControl: "Controle de cabeça",
    gazeControl: "Controle de olhar",
    blowCapacity: "Capacidade de sopro",
    attention: "Atenção",
    comprehension: "Compreensão",
    fatigue: "Fadiga",
    accessMethod: "Método de acesso testado",
    performance: "Desempenho",
    observations: "Observações",
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-bold leading-6 text-amber-900">
          ⚠️ Use <strong>iniciais</strong> no lugar do nome completo. Se você
          estiver conectado com perfil profissional e o banco de dados estiver
          configurado, a avaliação é salva com controle de acesso por perfil;
          caso contrário, o resumo aparece apenas nesta tela e nada é enviado.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <fieldset>
          <legend className="text-lg font-black text-blue-800">
            1. Identificação
          </legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field label="Identificação do aluno/paciente (use iniciais)">
              {(id) => (
                <input
                  id={id}
                  name="studentName"
                  type="text"
                  required
                  placeholder="Ex.: D. S."
                  className={inputClass}
                />
              )}
            </Field>
            <Field label="Idade">
              {(id) => (
                <input
                  id={id}
                  name="age"
                  type="number"
                  min={0}
                  max={120}
                  required
                  className={inputClass}
                />
              )}
            </Field>
            <Field label="Escola/Instituição">
              {(id) => (
                <input id={id} name="institution" type="text" className={inputClass} />
              )}
            </Field>
            <Field label="Profissional responsável">
              {(id) => (
                <input
                  id={id}
                  name="professional"
                  type="text"
                  required
                  className={inputClass}
                />
              )}
            </Field>
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-lg font-black text-blue-800">
            2. Perfil motor e sensorial
          </legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field label="Limitações motoras">
              {(id) => (
                <textarea
                  id={id}
                  name="motorLimitations"
                  rows={3}
                  className={inputClass}
                  placeholder="Descreva as principais limitações observadas"
                />
              )}
            </Field>
            <Field label="Movimentos preservados">
              {(id) => (
                <textarea
                  id={id}
                  name="preservedMovements"
                  rows={3}
                  className={inputClass}
                  placeholder="Ex.: pressiona teclas com um dedo da mão direita"
                />
              )}
            </Field>
            <Field label="Uso de mãos/dedos">
              {(id) => <ScaleSelect id={id} name="handUse" />}
            </Field>
            <Field label="Controle de cabeça">
              {(id) => <ScaleSelect id={id} name="headControl" />}
            </Field>
            <Field label="Controle de olhar">
              {(id) => <ScaleSelect id={id} name="gazeControl" />}
            </Field>
            <Field label="Capacidade de sopro">
              {(id) => <ScaleSelect id={id} name="blowCapacity" />}
            </Field>
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-lg font-black text-blue-800">
            3. Comunicação e cognição
          </legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field label="Comunicação atual">
              {(id) => (
                <textarea
                  id={id}
                  name="currentCommunication"
                  rows={3}
                  className={inputClass}
                  placeholder="Como a pessoa se comunica hoje (fala, gestos, expressões…)"
                />
              )}
            </Field>
            <div className="grid gap-5">
              <Field label="Atenção">
                {(id) => <ScaleSelect id={id} name="attention" />}
              </Field>
              <Field label="Compreensão">
                {(id) => <ScaleSelect id={id} name="comprehension" />}
              </Field>
              <Field label="Fadiga (quanto maior, mais rápido cansa)">
                {(id) => (
                  <select id={id} name="fatigue" className={inputClass} defaultValue="Não avaliado">
                    {["Baixa", "Moderada", "Alta", "Não avaliado"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-lg font-black text-blue-800">
            4. Teste de método de acesso
          </legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field label="Método de acesso testado">
              {(id) => (
                <select id={id} name="accessMethod" required className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Selecione um método
                  </option>
                  {accessMethodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <Field label="Desempenho">
              {(id) => (
                <select id={id} name="performance" required className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Selecione o desempenho
                  </option>
                  {performanceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <div className="sm:col-span-2">
              <Field label="Observações">
                {(id) => (
                  <textarea
                    id={id}
                    name="observations"
                    rows={4}
                    className={inputClass}
                    placeholder="Conforto, posicionamento, reações, ajustes necessários…"
                  />
                )}
              </Field>
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={saving}
          className={`mt-10 rounded-lg bg-blue-700 px-6 py-4 text-lg font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 disabled:opacity-50 ${focusRing}`}
        >
          {saving ? "Salvando…" : "Salvar avaliação"}
        </button>
      </form>

      {saveResult ? (
        <div role="status" aria-live="polite" className="mt-6">
          {saveResult.status === "saved" ? (
            <p className="rounded-lg border border-green-300 bg-green-50 p-4 text-base font-bold text-green-900">
              ✅ Avaliação salva com segurança no banco de dados (id:{" "}
              {saveResult.evaluationId}).
            </p>
          ) : saveResult.status === "not_configured" ? (
            <p className="rounded-lg border border-zinc-300 bg-zinc-50 p-4 text-base font-bold text-zinc-700">
              ℹ️ Banco de dados ainda não configurado — o resumo abaixo existe
              apenas nesta tela. Configure o Supabase no <code>.env.local</code>{" "}
              para ativar o armazenamento.
            </p>
          ) : saveResult.status === "not_authenticated" ? (
            <p className="rounded-lg border border-blue-300 bg-blue-50 p-4 text-base font-bold text-blue-900">
              🔐 Para salvar no banco de dados,{" "}
              <a href="/entrar" className="underline">
                entre na sua conta
              </a>
              . O resumo abaixo continua disponível localmente.
            </p>
          ) : saveResult.status === "forbidden_role" ? (
            <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-base font-bold text-amber-900">
              ⚠️ Apenas perfis profissionais (professor, terapeuta,
              instituição) podem registrar avaliações. Seu perfil atual é
              “{saveResult.role}”.
            </p>
          ) : (
            <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-base font-bold text-red-900">
              ❌ Não foi possível salvar: {saveResult.message}
            </p>
          )}
        </div>
      ) : null}

      {draft ? (
        <div
          role="region"
          aria-live="polite"
          aria-label="Resumo da avaliação"
          className="mt-10 rounded-2xl border-2 border-green-200 bg-green-50 p-6"
        >
          <h3 className="text-lg font-black text-green-900">
            Resumo da avaliação (rascunho local)
          </h3>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(draft).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-white p-3">
                <dt className="text-xs font-black uppercase tracking-wide text-zinc-500">
                  {fieldLabels[key] ?? key}
                </dt>
                <dd className="mt-1 font-semibold text-zinc-900">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm font-bold text-green-900">
            Este rascunho existe apenas no seu navegador. Quando o banco de
            dados seguro estiver ativo, a avaliação será salva com
            consentimento e controle de acesso por perfil.
          </p>
        </div>
      ) : null}
    </div>
  );
}

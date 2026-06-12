"use server";

import {
  getSupabaseAdminClient,
  getSupabaseServerClient,
} from "../lib/supabase/server";

export type SaveEvaluationResult =
  | { status: "saved"; evaluationId: string }
  | { status: "not_configured" }
  | { status: "not_authenticated" }
  | { status: "forbidden_role"; role: string }
  | { status: "error"; message: string };

export type EvaluationPayload = {
  studentName: string;
  age: string;
  institution?: string;
  professional: string;
  motorLimitations?: string;
  preservedMovements?: string;
  currentCommunication?: string;
  handUse?: string;
  headControl?: string;
  gazeControl?: string;
  blowCapacity?: string;
  attention?: string;
  comprehension?: string;
  fatigue?: string;
  accessMethod: string;
  performance: string;
  observations?: string;
};

const PROFESSIONAL_ROLES = ["teacher", "therapist", "admin", "institution"];

/**
 * Salva uma avaliação funcional: garante o profile, cria o aluno e registra
 * a avaliação + teste de método de acesso, tudo sob RLS (chave anônima +
 * sessão do usuário). O log de auditoria usa a service role, se disponível.
 */
export async function saveEvaluation(
  payload: EvaluationPayload,
): Promise<SaveEvaluationResult> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { status: "not_configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "not_authenticated" };

  // Garante o profile do usuário (criado a partir dos metadados do cadastro).
  let { data: profile } = await supabase
    .from("profiles")
    .select("id, role, display_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile) {
    const metadata = user.user_metadata ?? {};
    const { data: createdProfile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        user_id: user.id,
        display_name: String(metadata.display_name ?? user.email ?? "Usuário"),
        role: String(metadata.role ?? "guardian"),
      })
      .select("id, role, display_name")
      .single();
    if (profileError) {
      return { status: "error", message: profileError.message };
    }
    profile = createdProfile;
  }

  if (!PROFESSIONAL_ROLES.includes(profile.role)) {
    return { status: "forbidden_role", role: profile.role };
  }

  // Cria o registro do aluno (use iniciais — orientação da interface).
  const { data: student, error: studentError } = await supabase
    .from("students")
    .insert({
      full_name: payload.studentName,
      created_by_profile: profile.id,
      notes: payload.institution
        ? `Instituição informada: ${payload.institution}`
        : null,
    })
    .select("id")
    .single();
  if (studentError) {
    return { status: "error", message: studentError.message };
  }

  // Registra a avaliação funcional.
  const { data: evaluation, error: evaluationError } = await supabase
    .from("evaluations")
    .insert({
      student_id: student.id,
      evaluator_profile_id: profile.id,
      motor_limitations: payload.motorLimitations ?? null,
      preserved_movements: payload.preservedMovements ?? null,
      current_communication: payload.currentCommunication ?? null,
      hand_use: payload.handUse ?? null,
      head_control: payload.headControl ?? null,
      gaze_control: payload.gazeControl ?? null,
      blow_capacity: payload.blowCapacity ?? null,
      attention: payload.attention ?? null,
      comprehension: payload.comprehension ?? null,
      fatigue: payload.fatigue ?? null,
      observations: [
        `Idade informada: ${payload.age}`,
        `Profissional responsável: ${payload.professional}`,
        payload.observations,
      ]
        .filter(Boolean)
        .join("\n"),
    })
    .select("id")
    .single();
  if (evaluationError) {
    return { status: "error", message: evaluationError.message };
  }

  // Registra o teste de método de acesso (se o método existir no catálogo).
  const { data: accessMethod } = await supabase
    .from("access_methods")
    .select("id")
    .eq("name", payload.accessMethod)
    .maybeSingle();

  if (accessMethod) {
    const { error: testError } = await supabase
      .from("evaluation_access_tests")
      .insert({
        evaluation_id: evaluation.id,
        access_method_id: accessMethod.id,
        performance: payload.performance,
        observations: payload.observations ?? null,
      });
    if (testError) {
      // Avaliação já foi salva; registra o problema sem falhar tudo.
      console.error("Falha ao salvar teste de acesso:", testError.message);
    }
  }

  // Log de auditoria (server-only, service role; opcional).
  const admin = getSupabaseAdminClient();
  if (admin) {
    await admin.from("audit_logs").insert({
      actor_profile_id: profile.id,
      action: "evaluation.create",
      entity: "evaluations",
      entity_id: evaluation.id,
      metadata: { access_method: payload.accessMethod },
    });
  }

  return { status: "saved", evaluationId: evaluation.id };
}

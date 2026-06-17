import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../lib/supabase/server";

/**
 * Contador de acessos do site.
 * GET  → lê o total atual (sem incrementar).
 * POST → incrementa em 1 (atômico, via função increment_counter) e retorna o total.
 *
 * Usa o cliente administrativo (service role), pois a tabela site_counters
 * tem RLS habilitado e não é exposta diretamente ao navegador.
 * Degrada para { count: null } quando o Supabase não está configurado.
 *
 * Importante: respostas com no-store para o CDN nunca cachear o contador.
 */
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const NO_STORE = { "Cache-Control": "no-store, max-age=0, must-revalidate" };

function reply(count: number | null) {
  return NextResponse.json({ count }, { headers: NO_STORE });
}

export async function GET() {
  const admin = getSupabaseAdminClient();
  if (!admin) return reply(null);
  const { data, error } = await admin
    .from("site_counters")
    .select("count")
    .eq("key", "visits")
    .maybeSingle();
  if (error) return reply(null);
  return reply(Number(data?.count ?? 0));
}

export async function POST() {
  const admin = getSupabaseAdminClient();
  if (!admin) return reply(null);
  const { data, error } = await admin.rpc("increment_counter", {
    counter_key: "visits",
  });
  if (error) return reply(null);
  return reply(Number(data));
}

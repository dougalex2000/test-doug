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
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = getSupabaseAdminClient();
  if (!admin) return NextResponse.json({ count: null });
  const { data, error } = await admin
    .from("site_counters")
    .select("count")
    .eq("key", "visits")
    .maybeSingle();
  if (error) return NextResponse.json({ count: null });
  return NextResponse.json({ count: Number(data?.count ?? 0) });
}

export async function POST() {
  const admin = getSupabaseAdminClient();
  if (!admin) return NextResponse.json({ count: null });
  const { data, error } = await admin.rpc("increment_counter", {
    counter_key: "visits",
  });
  if (error) return NextResponse.json({ count: null });
  return NextResponse.json({ count: Number(data) });
}

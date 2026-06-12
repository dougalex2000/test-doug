import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Cliente Supabase para Server Components, Server Actions e Route Handlers.
 * Usa a chave anônima + cookies de sessão do usuário (RLS aplicado).
 * Retorna `null` quando o Supabase não está configurado.
 */
export async function getSupabaseServerClient(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured()) return null;
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Chamado a partir de um Server Component: cookies são somente
          // leitura aqui. O proxy.ts cuida da renovação da sessão.
        }
      },
    },
  });
}

/**
 * Cliente administrativo (service role — ignora RLS).
 * SOMENTE para uso server-side; a chave nunca chega ao navegador.
 * Retorna `null` quando a chave não está configurada.
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return null;

  return createServerClient(supabaseUrl, serviceRoleKey, {
    cookies: {
      getAll: () => [],
      setAll: () => {},
    },
  });
}

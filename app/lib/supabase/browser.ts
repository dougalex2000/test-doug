"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

let client: SupabaseClient | null = null;

/**
 * Cliente Supabase para o navegador (chave anônima + RLS).
 * Retorna `null` quando o Supabase não está configurado.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createBrowserClient(supabaseUrl!, supabaseAnonKey!);
  }
  return client;
}

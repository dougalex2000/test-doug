/**
 * Configuração do Supabase.
 *
 * O site precisa funcionar mesmo SEM credenciais (modo demonstração):
 * todos os pontos de integração verificam `isSupabaseConfigured()` antes
 * de usar o banco e degradam graciosamente quando ele não está disponível.
 */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

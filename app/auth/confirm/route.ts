import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { getSupabaseServerClient } from "../../lib/supabase/server";

/**
 * Confirmação de e-mail do Supabase Auth (fluxo PKCE).
 * O link enviado por e-mail aponta para /auth/confirm?token_hash=...&type=...
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const redirectTo = new URL("/entrar", request.url);

  if (tokenHash && type) {
    const supabase = await getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash: tokenHash,
      });
      if (!error) {
        redirectTo.searchParams.set("confirmado", "1");
        return NextResponse.redirect(redirectTo);
      }
    }
  }

  redirectTo.searchParams.set("erro", "confirmacao");
  return NextResponse.redirect(redirectTo);
}

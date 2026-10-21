import { NextResponse } from "next/server";
import { checkOllama } from "../../../lib/cricket/ollama";

/**
 * Estado do backend de IA, para o indicador "Ollama" no cabeçalho da sessão.
 *
 * Não expõe o endereço do servidor de modelo ao navegador — só se está online
 * e se o modelo configurado está disponível.
 */

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  const status = await checkOllama();
  return NextResponse.json(
    {
      online: status.online,
      model: status.model,
      modelAvailable: status.modelAvailable,
      // Motivo resumido ajuda no diagnóstico sem revelar a topologia da rede.
      reason: status.online ? null : "sem resposta do servidor de modelo",
    },
    { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" } },
  );
}

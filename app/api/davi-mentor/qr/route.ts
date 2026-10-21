import QRCode from "qrcode";
import { findProfile, profileUrl } from "../../../lib/cricket/profile";

/**
 * Gera o QR Code de acesso ao DAVI Mentor, em SVG, no próprio servidor.
 *
 * Gerar localmente (em vez de usar um serviço de imagem externo) evita que a
 * URL da sessão saia da infraestrutura do projeto e mantém a página funcional
 * sem internet — coerente com a postura de privacidade do módulo.
 *
 * O conteúdo do QR é apenas: origem + /davi-mentor + identificador do perfil.
 * Nenhum dado pessoal trafega no código.
 */

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get("p");

  const profile = findProfile(token);
  if (!profile) {
    return new Response("Perfil não encontrado", { status: 404 });
  }

  const alvo = profileUrl(origin, profile.id);

  const svg = await QRCode.toString(alvo, {
    type: "svg",
    margin: 1,
    width: 320,
    errorCorrectionLevel: "M",
    color: { dark: "#09090b", light: "#ffffff" },
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      // O QR de um perfil é estável; pode ser cacheado pelo navegador.
      "Cache-Control": "public, max-age=3600",
    },
  });
}

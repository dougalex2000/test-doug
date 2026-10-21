import type { Metadata } from "next";
import { MentorSession } from "../../components/davi-mentor/MentorSession";
import { demoProfile, findProfile } from "../../lib/cricket/profile";

/**
 * Sessão operacional do DAVI Mentor.
 *
 * Fora do PageShell de propósito: esta tela é usada no celular, durante
 * atividades, e o cabeçalho e rodapé do site roubariam espaço da câmera e dos
 * botões grandes. A identidade do módulo fica no cabeçalho próprio da sessão.
 *
 * `?p=` traz o identificador do QR Code; `?pesquisador=1` liga o painel
 * EU / OUTROS / MUNDO.
 */

export const metadata: Metadata = {
  title: "Sessão — DAVI Mentor",
  description:
    "Interface operacional do DAVI Mentor, o Assistente Cognitivo Contextual do Projeto DAVI.",
  // Sessão individual não deve ser indexada.
  robots: { index: false, follow: false },
};

export default async function MentorSessaoPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string; pesquisador?: string }>;
}) {
  const params = await searchParams;
  const perfilDoQr = findProfile(params.p);
  const profile = perfilDoQr ?? demoProfile();

  return (
    <MentorSession
      profileInicial={profile}
      viaQrCode={Boolean(perfilDoQr)}
      modoPesquisador={params.pesquisador === "1"}
    />
  );
}

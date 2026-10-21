import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DEMO_PROFILE_ID } from "../../lib/cricket/profile";

export const metadata: Metadata = {
  title: "Modo de demonstração — DAVI Mentor",
  description:
    "Modo de demonstração do DAVI Mentor, o Assistente Cognitivo Contextual do Projeto DAVI.",
};

/**
 * Modo de demonstração.
 *
 * Abre a sessão real com o perfil DEMO001 e o painel de pesquisa ligado — é a
 * mesma interface operacional, sem simulação paralela. Demonstrar o que de
 * fato existe evita prometer o que ainda não foi construído.
 */
export default function MentorDemoPage() {
  redirect(`/davi-mentor/sessao?p=${DEMO_PROFILE_ID}&pesquisador=1`);
}

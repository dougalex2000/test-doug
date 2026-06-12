import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Breadcrumb,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";
import { AuthForm } from "../components/AuthForm";

export const metadata: Metadata = {
  title: "Entrar — Projeto DAVI",
  description:
    "Acesse sua conta na plataforma DAVI ou crie um cadastro como professor, terapeuta ou responsável.",
};

export default function EntrarPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Entrar" }]} />
      <PageHero
        eyebrow="Acesso à plataforma"
        title="Entrar no DAVI"
        description="Professores, terapeutas e responsáveis podem criar uma conta para salvar avaliações funcionais e acompanhar o progresso com segurança."
      />
      <section className="bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Sua conta"
            title="Acesso com segurança e privacidade"
            description="Os dados ficam protegidos por políticas de acesso por perfil (Row Level Security): cada pessoa vê apenas o que tem permissão para ver. Dados sensíveis exigem consentimento registrado."
          />
          <div>
            <Suspense
              fallback={
                <p className="text-base font-bold text-zinc-600">Carregando…</p>
              }
            >
              <AuthForm />
            </Suspense>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

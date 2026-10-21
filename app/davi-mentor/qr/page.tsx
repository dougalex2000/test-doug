import type { Metadata } from "next";
import {
  Breadcrumb,
  LinkButton,
  PageShell,
} from "../../components/SiteShell";
import { CricketLogo, CricketModuleHeader } from "../../components/CricketLogo";

export const metadata: Metadata = {
  title: "CRICKET DAVI Mentor — acesso por QR Code",
  description:
    "Tela de boas-vindas aberta ao ler o QR Code do CRICKET DAVI Mentor.",
};

export default function CricketQrPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "CRICKET — DAVI Mentor", href: "/davi-mentor" },
          { label: "Acesso por QR Code" },
        ]}
      />
      <CricketModuleHeader />

      {/* Primeira tela vista no celular após a leitura do QR Code. */}
      <section className="bg-[#F6F8FB] px-6 py-12 sm:py-16">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <CricketLogo size="lg" preload />
          <h1 className="mt-6 text-4xl font-black leading-none tracking-tight text-zinc-950">
            CRICKET
          </h1>
          <p className="mt-2 text-2xl font-black leading-tight text-green-700">
            DAVI Mentor
          </p>
          <p className="mt-1 text-lg font-bold text-blue-800">
            Assistente Cognitivo Contextual
          </p>
          <p className="mt-5 text-base leading-7 text-zinc-700">
            “Uma inteligência auxiliar para lembrar, orientar e apoiar sua
            autonomia.”
          </p>

          <div
            role="status"
            className="mt-8 w-full rounded-lg border border-amber-300 bg-amber-50 p-5 text-left"
          >
            <p className="text-sm font-black uppercase tracking-wide text-amber-900">
              Em construção
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-amber-950">
              Esta tela já carrega a identidade visual do módulo. O fluxo de
              sessão aberto pelo QR Code será definido junto com as demais
              etapas do CRICKET.
            </p>
          </div>

          <div className="mt-8">
            <LinkButton href="/davi-mentor" variant="secondary">
              Voltar à tela inicial
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

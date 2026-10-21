import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  Breadcrumb,
  LinkButton,
  PageShell,
  SectionHeader,
} from "../../components/SiteShell";
import { CricketModuleHeader } from "../../components/CricketLogo";
import { MentorQRCode } from "../../components/davi-mentor/MentorQRCode";
import { listDemoProfiles, profileUrl } from "../../lib/cricket/profile";

export const metadata: Metadata = {
  title: "QR Code — DAVI Mentor",
  description:
    "Gere o QR Code de acesso ao DAVI Mentor e abra a sessão já adaptada ao perfil.",
};

/**
 * Geração dos QR Codes de demonstração.
 *
 * A origem vem do cabeçalho da requisição para que o código funcione tanto em
 * localhost quanto em produção — e, em rede local, com o IP da máquina, que é
 * como se testa no celular.
 */
export default async function MentorQrPage() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${proto}://${host}`;
  const destinoExemplo = profileUrl(origin, "DEMO001");
  const qrLocal = ["localhost", "127.0.0.1", "[::1]"].includes(new URL(destinoExemplo).hostname);

  const perfis = listDemoProfiles();

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "DAVI Mentor", href: "/davi-mentor" },
          { label: "Acesso por QR Code" },
        ]}
      />
      <CricketModuleHeader />

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Acesso por QR Code"
            title="Aponte a câmera do celular"
            description="O QR Code carrega apenas o endereço e um identificador de perfil. Nenhum dado pessoal viaja no código."
          />

          {qrLocal ? (
            <p role="alert" className="mt-6 rounded-lg bg-amber-50 p-4 font-semibold text-amber-950">
              Esta página está em localhost. Esse endereço só funciona neste computador, não no celular.
              Para gerar códigos utilizáveis no celular, abra a versão HTTPS publicada ou configure o endereço público do teste.
            </p>
          ) : null}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perfis.map((perfil) => (
              <MentorQRCode
                key={perfil.id}
                profile={perfil}
                destino={profileUrl(origin, perfil.id)}
                mostrarQr={!qrLocal}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-black text-zinc-950">Como testar</h2>
          <ol className="mt-5 grid gap-3 text-base leading-7 text-zinc-700">
            <li>
              <strong className="font-black text-zinc-950">1.</strong> Abra esta
              página no computador.
            </li>
            <li>
              <strong className="font-black text-zinc-950">2.</strong> Aponte a
              câmera do celular para um dos códigos.
            </li>
            <li>
              <strong className="font-black text-zinc-950">3.</strong> O DAVI
              Mentor abre no celular já com o perfil carregado.
            </li>
          </ol>
          <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950 ring-1 ring-amber-200">
            Câmera e microfone só funcionam em endereços seguros. Em produção
            (HTTPS) funcionam normalmente; em rede local, use HTTPS ou teste
            direto em <code className="font-mono">localhost</code>.
          </p>
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

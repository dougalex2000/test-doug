import Link from "next/link";
import { PageShell } from "../components/SiteShell";
import { mockUser } from "../lib/userData";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const levelBadge: Record<string, string> = {
  Básico: "bg-zinc-100 text-zinc-700 border-zinc-300",
  Ativo: "bg-blue-100 text-blue-800 border-blue-200",
  Avançado: "bg-green-100 text-green-800 border-green-200",
};

const fields = [
  { label: "Nome completo", value: mockUser.name },
  { label: "Perfil", value: mockUser.roleLabel },
  { label: "E-mail", value: mockUser.email },
  { label: "Telefone", value: mockUser.phone },
  { label: "Instituição", value: mockUser.institution },
  { label: "Membro desde", value: mockUser.since },
];

const accessibilityPrefs = [
  { label: "Texto ampliado", description: "Aumenta o tamanho base da fonte para leitura" },
  { label: "Alto contraste", description: "Maximiza o contraste para baixa visão" },
  { label: "Reduzir movimento", description: "Desativa animações e transições" },
];

const quickLinks = [
  { label: "Abrir painel", href: "/painel" },
  { label: "Ver notificações", href: "/notificacoes" },
  { label: "Configurações", href: "/configuracoes" },
  { label: "Acessibilidade", href: "/acessibilidade" },
  { label: "Módulos", href: "/modulos/rastreamento-ocular" },
  { label: "Relatórios", href: "/relatorios" },
];

export default function PerfilPage() {
  return (
    <PageShell>
      {/* Profile hero */}
      <section className="border-b border-zinc-800 bg-zinc-950 px-6 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end gap-6">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-700 text-3xl font-black">
            {mockUser.initials}
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-300">
              Perfil do usuário
            </p>
            <h1 className="mt-1 text-4xl font-black">{mockUser.name}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-3 py-0.5 text-xs font-bold ${levelBadge[mockUser.level]}`}
              >
                Nível {mockUser.level}
              </span>
              <span className="rounded-full border border-zinc-700 px-3 py-0.5 text-xs font-bold text-zinc-300">
                {mockUser.roleLabel}
              </span>
              <span className="rounded-full border border-zinc-700 px-3 py-0.5 text-xs font-bold text-zinc-300">
                Desde {mockUser.since}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main data */}
          <div className="space-y-8">
            {/* Personal data */}
            <div>
              <h2 className="mb-5 text-xl font-black text-zinc-950">Dados Pessoais</h2>
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="grid gap-6 sm:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.label}>
                      <p className="text-xs font-black uppercase tracking-wide text-zinc-400">
                        {field.label}
                      </p>
                      <p className="mt-1 text-base font-semibold text-zinc-950">{field.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-zinc-100 pt-6">
                  <button
                    type="button"
                    className={`rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-black text-white hover:bg-blue-800 ${focusRing}`}
                  >
                    Editar dados
                  </button>
                </div>
              </div>
            </div>

            {/* Accessibility preferences */}
            <div>
              <h2 className="mb-5 text-xl font-black text-zinc-950">Preferências de Acessibilidade</h2>
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="space-y-3">
                  {accessibilityPrefs.map((pref) => (
                    <div
                      key={pref.label}
                      className="flex items-center justify-between gap-4 rounded-lg border border-zinc-100 p-4"
                    >
                      <div>
                        <p className="font-bold text-zinc-950">{pref.label}</p>
                        <p className="text-sm text-zinc-500">{pref.description}</p>
                      </div>
                      <div className="flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-zinc-200 px-0.5">
                        <div className="h-5 w-5 rounded-full bg-white shadow" />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-zinc-400">
                  Os ajustes globais também estão disponíveis no menu do cabeçalho.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-zinc-950">Conta</h2>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-zinc-400">
                Nível de acesso
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-black text-green-800">
                  A+
                </div>
                <div>
                  <p className="font-black text-zinc-950">{mockUser.level}</p>
                  <p className="text-xs text-zinc-500">Acesso completo à plataforma</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-zinc-400">
                Acesso rápido
              </p>
              <div className="space-y-0.5">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold text-zinc-700 hover:bg-blue-50 hover:text-blue-800 ${focusRing}`}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-zinc-400">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-red-100 bg-red-50 p-5">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-red-700">
                Zona de perigo
              </p>
              <button
                type="button"
                className={`w-full rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100 ${focusRing}`}
              >
                Sair da conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

import Link from "next/link";
import { PageShell } from "../components/SiteShell";
import { mockUser, mockNotifications, dashboardModules } from "../lib/userData";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const kindIcon: Record<string, string> = {
  success: "✓",
  info: "i",
  warning: "!",
  alert: "✕",
};

const kindClass: Record<string, string> = {
  success: "bg-green-100 text-green-800 border-green-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  alert: "bg-red-100 text-red-800 border-red-200",
};

const quickActions = [
  { label: "Rastreamento", href: "/modulos/rastreamento-ocular", icon: "👁" },
  { label: "Relatórios", href: "/relatorios", icon: "📊" },
  { label: "Dispositivos", href: "/dispositivos", icon: "🔌" },
  { label: "Configurações", href: "/configuracoes", icon: "⚙" },
];

const unread = mockNotifications.filter((n) => !n.read);

export default function DashboardPage() {
  return (
    <PageShell>
      {/* Welcome banner */}
      <section className="border-b border-blue-900 bg-blue-700 px-6 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-xl font-black text-blue-700">
              {mockUser.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-200">Bem-vindo de volta</p>
              <h1 className="text-2xl font-black">{mockUser.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-600 px-3 py-0.5 text-xs font-bold">
                  {mockUser.roleLabel}
                </span>
                <span className="rounded-full bg-green-500 px-3 py-0.5 text-xs font-bold">
                  Nível {mockUser.level}
                </span>
                <span className="text-sm text-blue-200">{mockUser.institution}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/perfil"
              className={`rounded-lg border border-blue-400 bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 ${focusRing}`}
            >
              Meu Perfil
            </Link>
            <Link
              href="/notificacoes"
              className={`relative rounded-lg border border-blue-400 bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 ${focusRing}`}
            >
              Notificações
              {unread.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-black">
                  {unread.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Quick actions */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white p-5 text-center shadow-sm hover:border-blue-300 hover:shadow-lg hover:shadow-blue-950/10 ${focusRing}`}
            >
              <span className="text-3xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-sm font-bold text-zinc-800">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Modules */}
          <div>
            <h2 className="mb-5 text-xl font-black text-zinc-950">Meus Módulos</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {dashboardModules.map((mod) => (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className={`group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-lg hover:shadow-blue-950/10 ${focusRing}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {mod.icon}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        mod.status === "Ativo"
                          ? "bg-green-100 text-green-800"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {mod.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-black text-zinc-950 group-hover:text-blue-800">
                    {mod.title}
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-zinc-600">{mod.description}</p>
                  <p className="mt-3 text-xs font-black text-blue-700">Acessar →</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications sidebar */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-black text-zinc-950">Notificações</h2>
              <Link
                href="/notificacoes"
                className={`text-sm font-bold text-blue-700 hover:underline ${focusRing}`}
              >
                Ver todas
              </Link>
            </div>
            <div className="space-y-3">
              {mockNotifications.slice(0, 4).map((notif) => (
                <Link
                  key={notif.id}
                  href={notif.href ?? "/notificacoes"}
                  className={`flex gap-3 rounded-xl border p-4 ${
                    notif.read
                      ? "border-zinc-200 bg-white hover:shadow-md"
                      : "border-blue-200 bg-blue-50 hover:shadow-lg"
                  } ${focusRing}`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-black ${kindClass[notif.kind]}`}
                  >
                    {kindIcon[notif.kind]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-bold ${
                        notif.read ? "text-zinc-700" : "text-zinc-950"
                      }`}
                    >
                      {notif.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-4 text-zinc-500">{notif.message}</p>
                    <p className="mt-1 text-xs font-semibold text-zinc-400">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <span className="mt-1 h-2 w-2 shrink-0 self-start rounded-full bg-blue-500" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

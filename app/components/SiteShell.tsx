"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { mainNav } from "../lib/siteContent";
import { mockUser, mockNotifications } from "../lib/userData";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const unreadCount = mockNotifications.filter((n) => !n.read).length;

const menuGroups = [
  {
    title: "Minha conta",
    links: [
      { label: "Meu Painel", href: "/dashboard" },
      { label: "Meu Perfil", href: "/perfil" },
      { label: "Notificações", href: "/notificacoes" },
    ],
  },
  {
    title: "Acesso rápido",
    links: [
      { label: "Início", href: "/" },
      { label: "Sobre o DAVI", href: "/sobre" },
      { label: "Dispositivos", href: "/dispositivos" },
      { label: "Catálogo", href: "/catalogo" },
      { label: "Galeria", href: "/galeria" },
      { label: "Acessibilidade", href: "/acessibilidade" },
      { label: "Configurações", href: "/configuracoes" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Usuários",
    links: [
      { label: "Alunos", href: "/usuarios/alunos" },
      { label: "Profissionais", href: "/usuarios/profissionais" },
      { label: "Responsáveis", href: "/usuarios/responsaveis" },
    ],
  },
  {
    title: "Módulos",
    links: [
      { label: "Comunicação com hardware", href: "/modulos/hardware" },
      { label: "Rastreamento ocular", href: "/modulos/rastreamento-ocular" },
      { label: "Mouse assistivo", href: "/modulos/mouse-assistivo" },
      { label: "Calibração", href: "/modulos/calibracao" },
      { label: "Comunicação alternativa", href: "/modulos/comunicacao-alternativa" },
      { label: "Inteligência artificial", href: "/modulos/inteligencia-artificial" },
    ],
  },
  {
    title: "Relatórios",
    links: [
      { label: "Relatórios e métricas", href: "/relatorios" },
      { label: "Relatório do aluno", href: "/relatorios/aluno" },
      { label: "Relatório de hardware", href: "/relatorios/hardware" },
      { label: "Relatório de rastreamento ocular", href: "/relatorios/rastreamento-ocular" },
      { label: "Relatório institucional", href: "/relatorios/institucional" },
    ],
  },
];

export function SiteHeader() {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("davi-large-text", largeText);
    document.documentElement.classList.toggle("davi-high-contrast", highContrast);
    document.documentElement.classList.toggle("davi-reduce-motion", reducedMotion);
  }, [highContrast, largeText, reducedMotion]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white shadow-sm">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-700 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <div className="bg-white">
        <div className="mx-auto flex min-h-[88px] max-w-7xl items-center justify-between gap-3 px-6 py-3 text-zinc-950">
          <div className="flex min-w-0 items-center gap-4">
            <details className="relative">
              <summary
                className={`flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-lg text-blue-800 hover:bg-blue-50 ${focusRing}`}
                aria-label="Abrir menu de navegação"
              >
                <span className="text-4xl leading-none" aria-hidden="true">
                  ≡
                </span>
              </summary>
              <div className="absolute left-0 top-14 z-50 max-h-[calc(100vh-7rem)] w-[min(92vw,460px)] overflow-y-auto rounded-lg border border-zinc-200 bg-white p-4 shadow-2xl shadow-blue-950/15">
                <p className="text-sm font-black uppercase tracking-wide text-blue-800">
                  Navegação DAVI
                </p>
                <div className="mt-4 grid gap-4">
                  {menuGroups.map((group) => (
                    <div key={group.title}>
                      <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                        {group.title}
                      </p>
                      <div className="mt-2 grid gap-1">
                        {group.links.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`rounded-lg px-3 py-2 text-sm font-bold text-zinc-800 hover:bg-blue-50 hover:text-blue-800 ${focusRing}`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </details>

            <div className="min-w-0">
              <p className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                Serviços e Informações do DAVI
              </p>
              <p className="mt-1 hidden truncate text-sm font-medium text-zinc-600 sm:block">
                Desenvolvimento Assistivo para Vida Independente
              </p>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-blue-800 md:flex">
            <button
              type="button"
              aria-label="Aumentar texto"
              aria-pressed={largeText}
              onClick={() => setLargeText((current) => !current)}
              className={`rounded-lg px-2 py-2 ${focusRing} ${
                largeText ? "bg-green-700 text-white" : "hover:bg-blue-50"
              }`}
            >
              A+
            </button>
            <button
              type="button"
              aria-label="Alternar alto contraste"
              aria-pressed={highContrast}
              onClick={() => setHighContrast((current) => !current)}
              className={`rounded-lg px-2 py-2 ${focusRing} ${
                highContrast ? "bg-green-700 text-white" : "hover:bg-blue-50"
              }`}
            >
              ◐
            </button>
            <button
              type="button"
              aria-label="Reduzir movimento"
              aria-pressed={reducedMotion}
              onClick={() => setReducedMotion((current) => !current)}
              className={`rounded-lg px-2 py-2 ${focusRing} ${
                reducedMotion ? "bg-green-700 text-white" : "hover:bg-blue-50"
              }`}
            >
              ▦
            </button>

            <Link
              href="/notificacoes"
              aria-label={`Notificações${unreadCount > 0 ? ` (${unreadCount} não lidas)` : ""}`}
              className={`relative rounded-lg px-2 py-2 hover:bg-blue-50 ${focusRing}`}
            >
              <span aria-hidden="true">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link
              href="/perfil"
              aria-label="Meu perfil"
              className={`ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-black text-white hover:bg-blue-800 ${focusRing}`}
            >
              {mockUser.initials}
            </Link>

            <Link
              href="/dashboard"
              className={`ml-2 rounded-full bg-blue-700 px-5 py-3 font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 ${focusRing}`}
            >
              Meu Painel
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-2xl font-black">Projeto DAVI</p>
          <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
            Desenvolvimento Assistivo para Vida Independente. Projeto em
            desenvolvimento no contexto de tecnologia assistiva, educação
            inclusiva, fabricação digital e inteligência artificial aplicada.
          </p>
          <p className="mt-4 max-w-lg text-xs leading-5 text-zinc-500">
            O DAVI é uma iniciativa independente de tecnologia assistiva e não
            representa serviço oficial de governo.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 hover:border-blue-400 hover:text-white ${focusRing}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            id="contato"
            href="mailto:contato@projetodavi.local"
            className={`rounded-full border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 hover:border-green-400 hover:text-white ${focusRing}`}
          >
            E-mail
          </a>
          <Link
            href="/impacto"
            className={`rounded-full border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 hover:border-green-400 hover:text-white ${focusRing}`}
          >
            Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SiteHeader />
      <div id="conteudo">{children}</div>
      <SiteFooter />
    </main>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="border-b border-zinc-800 bg-zinc-950 px-6 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-wide text-blue-300">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-300">
          {description}
        </p>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-wide text-blue-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-zinc-700">{description}</p>
      ) : null}
    </div>
  );
}

export function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-bold text-zinc-800"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? `rounded-lg bg-blue-700 px-5 py-3 font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 ${focusRing}`
      : `rounded-lg border border-zinc-300 bg-white px-5 py-3 font-black text-zinc-950 hover:border-green-600 hover:text-green-800 ${focusRing}`;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function InfoGrid({
  items,
  columns = "lg:grid-cols-3",
}: {
  items: Array<{ title: string; description: string; href?: string }>;
  columns?: string;
}) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 ${columns}`}>
      {items.map((item) => {
        const content = (
          <div className="group h-full rounded-lg border border-zinc-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/10">
            <div className="mb-5 h-1.5 w-12 rounded-full bg-green-600 group-hover:w-16" />
            <h3 className="text-xl font-black text-zinc-950 group-hover:text-blue-800">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {item.description}
            </p>
            {item.href ? (
              <p className="mt-5 text-sm font-black text-blue-800">
                Acessar página
              </p>
            ) : null}
          </div>
        );

        return item.href ? (
          <Link
            key={item.title}
            href={item.href}
            className={`block rounded-lg ${focusRing}`}
          >
            {content}
          </Link>
        ) : (
          <div key={item.title}>{content}</div>
        );
      })}
    </div>
  );
}

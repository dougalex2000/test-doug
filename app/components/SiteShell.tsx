"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { mockUser, mockNotifications } from "../lib/userData";
import { assetSrc } from "../lib/imageAssets";
import { getSupabaseBrowserClient } from "../lib/supabase/browser";
import { footerSections, megaMenu, type ModuleStatus } from "../lib/siteNav";
import { IconBell, IconMenu } from "./icons";
import { VisitCounter } from "./VisitCounter";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const unreadCount = mockNotifications.filter((n) => !n.read).length;

const menuStatusDot: Record<ModuleStatus, string> = {
  "Em construção": "bg-amber-500",
  "Em desenvolvimento": "bg-green-500",
  Protótipo: "bg-violet-500",
  "Testes iniciais": "bg-sky-500",
  Planejado: "bg-zinc-400",
  Demonstração: "bg-blue-500",
  Experimental: "bg-rose-500",
  "Área logada": "bg-emerald-500",
};

export function SiteHeader() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Fecha ao mudar de rota.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fecha o menu ao navegar
    setMenuOpen(false);
  }, [pathname]);

  // Esc + clique fora.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    }
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !menuBtnRef.current?.contains(t)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active) setIsAuthenticated(Boolean(data.session));
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <header id="menu-principal" className="sticky top-0 z-40 border-b border-zinc-200 bg-white shadow-sm">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-700 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <div className="bg-white">
        <div className="mx-auto flex min-h-[88px] max-w-7xl items-center justify-between gap-3 px-6 py-3 text-zinc-950">
          <div className="flex min-w-0 items-center gap-3">
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="menu-principal-painel"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className={`flex h-12 items-center gap-2 rounded-lg px-3 text-blue-800 hover:bg-blue-50 ${focusRing}`}
            >
              <span className="relative flex h-7 w-7 items-center justify-center">
                <IconMenu
                  className={`absolute h-7 w-7 transition-all duration-200 ${
                    menuOpen ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                  }`}
                />
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  className={`absolute h-7 w-7 transition-all duration-200 ${
                    menuOpen ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
                  }`}
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
              <span className="hidden text-base font-black sm:inline">
                {menuOpen ? "Fechar" : "Menu"}
              </span>
            </button>

            <div className="min-w-0">
              <p className="text-base font-semibold leading-tight tracking-tight sm:text-2xl lg:text-3xl">
                Projeto DAVI
              </p>
              <p className="mt-1 hidden text-sm font-medium leading-snug text-zinc-600 sm:block">
                Desenvolvimento Assistivo para Vida Independente
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-800">
            {isAuthenticated ? (
              <>
                <Link
                  href="/notificacoes"
                  aria-label={`Notificações${unreadCount > 0 ? ` (${unreadCount} não lidas)` : ""}`}
                  className={`relative hidden rounded-lg px-2 py-2 hover:bg-blue-50 md:block ${focusRing}`}
                >
                  <IconBell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/painel/perfil"
                  aria-label="Meu perfil"
                  className={`ml-1 hidden h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-black text-white hover:bg-blue-800 md:flex ${focusRing}`}
                >
                  {mockUser.initials}
                </Link>
              </>
            ) : null}
            <Link
              href={isAuthenticated ? "/painel" : "/entrar"}
              className={`ml-1 rounded-lg bg-blue-700 px-3 py-2.5 font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 sm:px-5 ${focusRing}`}
            >
              {isAuthenticated ? "Meu Painel" : "Entrar"}
            </Link>
          </div>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-zinc-950/30" aria-hidden="true" />
          <nav
            id="menu-principal-painel"
            ref={panelRef}
            aria-label="Menu principal do Projeto DAVI"
            className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-5.5rem)] w-full overflow-y-auto border-t border-zinc-200 bg-white shadow-2xl shadow-blue-950/15"
          >
            <div className="mx-auto max-w-3xl px-4 py-4">
              <p className="px-1 text-sm font-black uppercase tracking-wide text-blue-800">
                Navegação do Projeto DAVI
              </p>
              <div className="mt-3 grid gap-1.5">
                {megaMenu.map((cat, i) => (
                  <details key={cat.titulo} className="group rounded-lg border border-zinc-200 bg-white" open={i === 0}>
                    <summary
                      className={`flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm font-black text-zinc-900 hover:bg-blue-50 ${focusRing}`}
                    >
                      <span>{cat.titulo}</span>
                      <span aria-hidden="true" className="text-zinc-400 transition group-open:rotate-90">›</span>
                    </summary>
                    <ul className="grid gap-0.5 px-2 pb-2">
                      {cat.itens.map((item) => {
                        const ativo = pathname === item.href;
                        return (
                          <li key={`${cat.titulo}-${item.href}`}>
                            <Link
                              href={item.href}
                              aria-current={ativo ? "page" : undefined}
                              onClick={() => setMenuOpen(false)}
                              className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${focusRing} ${
                                ativo
                                  ? "bg-blue-50 text-blue-800 ring-1 ring-blue-200"
                                  : "text-zinc-700 hover:bg-blue-50 hover:text-blue-800"
                              }`}
                            >
                              <span>{item.label}</span>
                              {item.status ? (
                                <span
                                  className={`h-2 w-2 shrink-0 rounded-full ${menuStatusDot[item.status]}`}
                                  title={item.status}
                                  aria-label={`Status: ${item.status}`}
                                />
                              ) : null}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="rodape" className="border-t border-zinc-800 bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <p className="text-2xl font-black">Projeto DAVI</p>
            <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
              Desenvolvimento Assistivo para Vida Independente. Tecnologia
              assistiva para comunicação, alfabetização, aprendizagem e
              autonomia — em construção.
            </p>
            <p className="mt-4 max-w-lg text-xs leading-5 text-zinc-500">
              Iniciativa independente de tecnologia assistiva. Não representa
              serviço oficial de governo e não realiza diagnóstico clínico.
            </p>
            <a
              id="contato"
              href="mailto:contato.plataformadavi@gmail.com"
              className={`mt-5 inline-flex rounded-full border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 hover:border-green-400 hover:text-white ${focusRing}`}
            >
              contato.plataformadavi@gmail.com
            </a>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {footerSections.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                  {section.title}
                </p>
                <ul className="mt-2 grid gap-1">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`rounded text-sm font-semibold text-zinc-300 hover:text-white ${focusRing}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-6">
          <p className="text-xs text-zinc-500">
            Projeto DAVI — em construção.
          </p>
          <VisitCounter />
        </div>
      </div>
    </footer>
  );
}

export function UnderConstructionBanner() {
  return (
    <div
      role="status"
      className="border-b border-amber-300 bg-amber-100 px-6 py-2.5 text-center"
    >
      <p className="mx-auto max-w-7xl text-sm font-bold leading-6 text-amber-950">
        <span aria-hidden="true">🚧 </span>
        Site em construção — as páginas mostram como a plataforma ficará quando
        estiver pronta. Alguns recursos ainda estão em desenvolvimento.
      </p>
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <UnderConstructionBanner />
      <SiteHeader />
      <div id="conteudo-principal" tabIndex={-1}>{children}</div>
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
  variant?: "primary" | "secondary" | "tertiary";
}) {
  const className = {
    primary: `rounded-lg bg-blue-700 px-5 py-3 font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 ${focusRing}`,
    secondary: `rounded-lg border border-zinc-300 bg-white px-5 py-3 font-black text-zinc-950 hover:border-green-600 hover:text-green-800 ${focusRing}`,
    tertiary: `rounded-lg px-2 py-3 font-black text-blue-800 hover:bg-blue-50 hover:underline ${focusRing}`,
  }[variant];

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const sectionTones = {
  white: "bg-white",
  soft: "bg-[#F6F8FB]",
  dark: "bg-zinc-950 text-white",
} as const;

/** Seção de página com largura máxima, espaçamento e fundo padronizados. */
export function Section({
  id,
  tone = "white",
  bordered = true,
  children,
}: {
  id?: string;
  tone?: keyof typeof sectionTones;
  bordered?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${sectionTones[tone]} ${
        bordered ? "border-b border-zinc-200" : ""
      } scroll-mt-24 px-6 py-16`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function Breadcrumb({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Trilha de navegação" className="bg-zinc-50 px-6 py-3">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-sm font-semibold text-zinc-600">
        <li>
          <Link href="/" className={`rounded px-1 hover:text-blue-800 hover:underline ${focusRing}`}>
            Início
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-zinc-400">
              ›
            </span>
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className={`rounded px-1 hover:text-blue-800 hover:underline ${focusRing}`}
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="px-1 text-zinc-950">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const placeholderTones = {
  blue: "from-blue-100 via-sky-50 to-white text-blue-800 border-blue-200",
  green: "from-green-100 via-emerald-50 to-white text-green-800 border-green-200",
  amber: "from-amber-100 via-orange-50 to-white text-amber-800 border-amber-200",
  zinc: "from-zinc-100 via-zinc-50 to-white text-zinc-700 border-zinc-200",
} as const;

/**
 * Placeholder elegante para imagens ilustrativas ainda não adicionadas.
 * Quando a imagem real existir em /public/images/davi/, basta substituir
 * este componente por <Image src={`/images/davi/${imageName}`} ... />.
 */
export function MediaPlaceholder({
  icon,
  label,
  imageName,
  tone = "blue",
  minHeight = "min-h-[260px]",
}: {
  icon: string;
  label: string;
  imageName?: string;
  tone?: keyof typeof placeholderTones;
  minHeight?: string;
}) {
  return (
    <figure
      className={`flex ${minHeight} flex-col items-center justify-center gap-4 rounded-2xl border bg-gradient-to-br p-8 text-center shadow-sm ${placeholderTones[tone]}`}
      role="img"
      aria-label={`Imagem ilustrativa: ${label}`}
      data-image-slot={imageName}
    >
      <span aria-hidden="true" className="text-6xl">
        {icon}
      </span>
      <figcaption className="max-w-xs text-sm font-bold leading-6">
        {label}
      </figcaption>
    </figure>
  );
}

/**
 * Ilustração vetorial do site (arquivos SVG em /public/images/davi).
 * Substitui o MediaPlaceholder nas páginas já ilustradas; quando houver
 * foto real autorizada, basta trocar o arquivo mantendo o mesmo nome.
 */
export function Illustration({
  name,
  alt,
  className = "",
  fit = "cover",
}: {
  name: string;
  alt: string;
  className?: string;
  /** "cover" preenche e recorta; "contain" mostra a imagem inteira. */
  fit?: "cover" | "contain";
}) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- asset local (svg/webp); otimização do next/image não se aplica */}
      <img
        src={assetSrc(name)}
        alt={alt}
        loading="lazy"
        className={fit === "contain" ? "h-auto w-full" : "h-full w-full object-cover"}
      />
    </figure>
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
                Conhecer detalhes →
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

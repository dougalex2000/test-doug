"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { mainNav } from "../lib/siteContent";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

export function SiteHeader() {
  const pathname = usePathname();
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("davi-large-text", largeText);
    document.documentElement.classList.toggle("davi-high-contrast", highContrast);
    document.documentElement.classList.toggle("davi-reduce-motion", reducedMotion);
  }, [highContrast, largeText, reducedMotion]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 shadow-sm backdrop-blur">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-blue-600 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className={`flex w-fit items-center rounded-2xl ${focusRing}`}
          aria-label="DAVI - Desenvolvimento Assistivo para vida Independente"
        >
          <Image
            src="/davi-logo-header.svg"
            alt="DAVI - Desenvolvimento Assistivo para vida Independente"
            width={260}
            height={89}
            className="h-auto w-44 sm:w-56 lg:w-64"
            priority
          />
        </Link>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <nav className="flex flex-wrap gap-1" aria-label="Menu principal">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-bold transition ${focusRing} ${
                    isActive
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : "text-zinc-700 hover:bg-zinc-100 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/rastreamento"
            className={`w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0 ${focusRing}`}
          >
            Testar rastreamento
          </Link>
        </div>
      </div>
      <div className="border-t border-zinc-100 bg-zinc-50/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-2 text-xs font-bold text-zinc-700">
          <span className="mr-1 uppercase tracking-wide text-zinc-500">
            Acessibilidade
          </span>
          {[
            {
              label: "A+",
              pressed: largeText,
              action: () => setLargeText((current) => !current),
            },
            {
              label: "Alto contraste",
              pressed: highContrast,
              action: () => setHighContrast((current) => !current),
            },
            {
              label: "Reduzir movimento",
              pressed: reducedMotion,
              action: () => setReducedMotion((current) => !current),
            },
          ].map((control) => (
            <button
              key={control.label}
              type="button"
              aria-pressed={control.pressed}
              onClick={control.action}
              className={`rounded-full border px-3 py-1.5 transition ${focusRing} ${
                control.pressed
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-blue-400 hover:text-blue-700"
              }`}
            >
              {control.label}
            </button>
          ))}
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
          <p className="text-2xl font-black">DAVI</p>
          <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">
            Desenvolvimento Assistivo para Vida Independente. Projeto em
            desenvolvimento no contexto de tecnologia assistiva, educação
            inclusiva, fabricação digital e inteligência artificial aplicada.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:border-blue-400 hover:text-white ${focusRing}`}
            >
              {item.label}
            </Link>
          ))}
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
      ? `rounded-full bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0 ${focusRing}`
      : `rounded-full border border-zinc-300 bg-white px-5 py-3 font-black text-zinc-950 transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700 active:translate-y-0 ${focusRing}`;

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
          <div className="group h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/10">
            <div className="mb-5 h-1.5 w-12 rounded-full bg-blue-600 transition group-hover:w-16" />
            <h3 className="text-xl font-black text-zinc-950 transition group-hover:text-blue-700">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {item.description}
            </p>
            {item.href ? (
              <p className="mt-5 text-sm font-black text-blue-700">
                Acessar página
              </p>
            ) : null}
          </div>
        );

        return item.href ? (
          <Link
            key={item.title}
            href={item.href}
            className={`block rounded-2xl ${focusRing}`}
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


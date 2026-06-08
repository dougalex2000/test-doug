import Link from "next/link";
import type { ReactNode } from "react";
import { mainNav } from "../lib/siteContent";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">
            D
          </span>
          <span>
            <span className="block text-lg font-black text-zinc-950">DAVI</span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Vida Independente
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-2" aria-label="Menu principal">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-bold text-zinc-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
              className="rounded-full border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-200 transition hover:border-blue-400 hover:text-white"
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
      {children}
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
    <section className="border-b border-zinc-200 bg-zinc-950 px-6 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-300">
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
      <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
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
          className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-800"
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
      ? "rounded-full bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
      : "rounded-full border border-zinc-300 bg-white px-5 py-3 font-bold text-zinc-950 transition hover:border-blue-400 hover:text-blue-700";

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
          <div className="h-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-blue-300 hover:bg-white hover:shadow-lg">
            <h3 className="text-xl font-bold text-zinc-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {item.description}
            </p>
          </div>
        );

        return item.href ? (
          <Link key={item.title} href={item.href}>
            {content}
          </Link>
        ) : (
          <div key={item.title}>{content}</div>
        );
      })}
    </div>
  );
}

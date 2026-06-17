import Image from "next/image";
import Link from "next/link";
import { assistiveGallery, type AssistivePhoto } from "../lib/assistiveGallery";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

/**
 * Grade responsiva de fotos de Tecnologia Assistiva.
 * 1 coluna no celular, 2 em tablets, 3–4 no desktop.
 *
 * `items` permite exibir um subconjunto (ex.: destaques na home).
 * `cta` adiciona um link "Saiba mais" acessível por teclado em cada card.
 */
export function AssistiveGallery({
  items = assistiveGallery,
  cta,
}: {
  items?: AssistivePhoto[];
  cta?: { label: string; href: string };
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.slug}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/10"
        >
          <div className="relative aspect-square w-full bg-zinc-50">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
              {item.category}
            </span>
            <h3 className="mt-3 text-lg font-black leading-6 text-zinc-950">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {item.description}
            </p>
            {cta ? (
              <Link
                href={cta.href}
                className={`mt-auto inline-flex w-fit items-center gap-1 pt-4 text-sm font-black text-blue-800 hover:text-blue-900 ${focusRing}`}
                aria-label={`${cta.label}: ${item.title}`}
              >
                {cta.label} <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

import Link from "next/link";
import type { AssistiveDevice } from "../lib/devices";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

export const deviceStatusStyles: Record<string, string> = {
  "Projeto aberto": "bg-green-100 text-green-900 ring-green-300",
  "Em desenvolvimento": "bg-blue-100 text-blue-900 ring-blue-300",
  Disponível: "bg-emerald-100 text-emerald-900 ring-emerald-300",
  "Sob demanda": "bg-amber-100 text-amber-900 ring-amber-300",
};

export function DeviceStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${
        deviceStatusStyles[status] ?? deviceStatusStyles["Sob demanda"]
      }`}
    >
      {status}
    </span>
  );
}

export function DeviceCard({ device }: { device: AssistiveDevice }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/10">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-xl font-black text-zinc-950">{device.name}</h3>
        <DeviceStatusBadge status={device.status} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {device.categories.map((category) => (
          <span
            key={category}
            className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-700"
          >
            {category}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-700">
        {device.shortDescription}
      </p>
      <dl className="mt-4 grid gap-2 text-sm leading-6">
        <div>
          <dt className="font-black text-zinc-950">Para quem é indicado</dt>
          <dd className="text-zinc-600">{device.indicatedFor}</dd>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <dt className="font-black text-zinc-950">Tipo de acesso</dt>
            <dd className="text-zinc-600">{device.accessType}</dd>
          </div>
          <div>
            <dt className="font-black text-zinc-950">Montagem</dt>
            <dd className="text-zinc-600">
              Dificuldade {device.assemblyDifficulty.toLowerCase()}
            </dd>
          </div>
        </div>
        <div>
          <dt className="font-black text-zinc-950">Custo estimado</dt>
          <dd className="text-zinc-600">{device.estimatedCost}</dd>
        </div>
      </dl>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <Link
          href={`/galeria/${device.slug}`}
          className={`rounded-lg bg-blue-700 px-3 py-2 text-sm font-black text-white hover:bg-blue-800 ${focusRing}`}
        >
          Ver detalhes
        </Link>
        <Link
          href={`/galeria/${device.slug}#projeto-aberto`}
          className={`rounded-lg border border-zinc-300 px-3 py-2 text-sm font-black text-zinc-700 hover:border-green-600 hover:text-green-800 ${focusRing}`}
        >
          Projeto aberto
        </Link>
        <Link
          href={`/galeria/${device.slug}#solicitar`}
          className={`rounded-lg border border-zinc-300 px-3 py-2 text-sm font-black text-zinc-700 hover:border-blue-600 hover:text-blue-800 ${focusRing}`}
        >
          Solicitar adaptação
        </Link>
      </div>
    </article>
  );
}

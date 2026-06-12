"use client";

import { useMemo, useState } from "react";
import {
  assistiveDevices,
  deviceCategories,
  deviceStatuses,
  type DeviceCategory,
  type DeviceStatus,
} from "../lib/devices";
import { DeviceCard } from "./DeviceCard";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

export function GalleryExplorer() {
  const [activeCategory, setActiveCategory] = useState<DeviceCategory | null>(null);
  const [activeStatus, setActiveStatus] = useState<DeviceStatus | null>(null);

  const filteredDevices = useMemo(
    () =>
      assistiveDevices.filter((device) => {
        const matchesCategory =
          !activeCategory || device.categories.includes(activeCategory);
        const matchesStatus = !activeStatus || device.status === activeStatus;
        return matchesCategory && matchesStatus;
      }),
    [activeCategory, activeStatus],
  );

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-black uppercase tracking-wide text-blue-700">
          Filtrar por categoria
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={activeCategory === null}
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-3 py-2 text-sm font-bold ${focusRing} ${
              activeCategory === null
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-zinc-300 bg-white text-zinc-800 hover:border-blue-400"
            }`}
          >
            Todas
          </button>
          {deviceCategories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() =>
                setActiveCategory((current) =>
                  current === category ? null : category,
                )
              }
              className={`rounded-full border px-3 py-2 text-sm font-bold ${focusRing} ${
                activeCategory === category
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-zinc-300 bg-white text-zinc-800 hover:border-blue-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-black uppercase tracking-wide text-blue-700">
          Filtrar por status
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={activeStatus === null}
            onClick={() => setActiveStatus(null)}
            className={`rounded-full border px-3 py-2 text-sm font-bold ${focusRing} ${
              activeStatus === null
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-zinc-300 bg-white text-zinc-800 hover:border-blue-400"
            }`}
          >
            Todos
          </button>
          {deviceStatuses.map((status) => (
            <button
              key={status}
              type="button"
              aria-pressed={activeStatus === status}
              onClick={() =>
                setActiveStatus((current) => (current === status ? null : status))
              }
              className={`rounded-full border px-3 py-2 text-sm font-bold ${focusRing} ${
                activeStatus === status
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-zinc-300 bg-white text-zinc-800 hover:border-blue-400"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="mt-8 text-sm font-bold text-zinc-600" role="status" aria-live="polite">
        {filteredDevices.length === assistiveDevices.length
          ? `${assistiveDevices.length} dispositivos no catálogo`
          : `${filteredDevices.length} de ${assistiveDevices.length} dispositivos encontrados`}
      </p>

      {filteredDevices.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredDevices.map((device) => (
            <DeviceCard key={device.slug} device={device} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-8 text-center">
          <p className="text-lg font-bold text-zinc-800">
            Nenhum dispositivo combina com esses filtros.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory(null);
              setActiveStatus(null);
            }}
            className={`mt-4 rounded-lg bg-blue-700 px-5 py-3 font-black text-white hover:bg-blue-800 ${focusRing}`}
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}

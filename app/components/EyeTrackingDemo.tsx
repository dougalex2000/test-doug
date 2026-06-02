"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type GazeData = {
  x: number;
  y: number;
};

type WebGazer = {
  begin: () => Promise<void> | void;
  clearData: () => void;
  end: () => void;
  pause: () => void;
  resume: () => void;
  recordScreenPosition: (x: number, y: number, type: string) => void;
  setGazeListener: (
    listener: (data: GazeData | null, elapsedTime: number) => void,
  ) => WebGazer;
  showFaceFeedbackBox: (show: boolean) => WebGazer;
  showFaceOverlay: (show: boolean) => WebGazer;
  showPredictionPoints: (show: boolean) => WebGazer;
  showVideoPreview: (show: boolean) => WebGazer;
};

declare global {
  interface Window {
    webgazer?: WebGazer;
  }
}

const WEBGAZER_SCRIPT = "https://webgazer.cs.brown.edu/webgazer.js";

const calibrationPoints = [
  { id: "top-left", x: 14, y: 18 },
  { id: "top-center", x: 50, y: 18 },
  { id: "top-right", x: 86, y: 18 },
  { id: "middle-left", x: 14, y: 50 },
  { id: "center", x: 50, y: 50 },
  { id: "middle-right", x: 86, y: 50 },
  { id: "bottom-left", x: 14, y: 82 },
  { id: "bottom-center", x: 50, y: 82 },
  { id: "bottom-right", x: 86, y: 82 },
];

function loadWebGazer() {
  if (window.webgazer) {
    return Promise.resolve();
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${WEBGAZER_SCRIPT}"]`,
  );

  if (existingScript) {
    return new Promise<void>((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(), { once: true });
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = WEBGAZER_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
}

export default function EyeTrackingDemo() {
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "error">(
    "idle",
  );
  const [gazePoint, setGazePoint] = useState<GazeData | null>(null);
  const [calibrationClicks, setCalibrationClicks] = useState(0);
  const [lastError, setLastError] = useState("");
  const mountedRef = useRef(true);

  const progress = useMemo(
    () => Math.min(100, Math.round((calibrationClicks / 27) * 100)),
    [calibrationClicks],
  );

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      window.webgazer?.end();
    };
  }, []);

  const startTracking = useCallback(async () => {
    try {
      setStatus("loading");
      setLastError("");

      await loadWebGazer();

      const webgazer = window.webgazer;

      if (!webgazer) {
        throw new Error("WebGazer não foi carregado.");
      }

      webgazer
        .setGazeListener((data) => {
          if (!mountedRef.current || !data) {
            return;
          }

          setGazePoint({
            x: Math.max(0, Math.min(window.innerWidth, data.x)),
            y: Math.max(0, Math.min(window.innerHeight, data.y)),
          });
        })
        .showVideoPreview(true)
        .showPredictionPoints(false)
        .showFaceOverlay(false)
        .showFaceFeedbackBox(false);

      await webgazer.begin();
      webgazer.resume();
      setStatus("running");
    } catch (error) {
      setStatus("error");
      setLastError(
        error instanceof Error
          ? error.message
          : "Não foi possível iniciar a câmera.",
      );
    }
  }, []);

  const stopTracking = useCallback(() => {
    window.webgazer?.pause();
    setStatus("idle");
    setGazePoint(null);
  }, []);

  const resetCalibration = useCallback(() => {
    window.webgazer?.clearData();
    setCalibrationClicks(0);
  }, []);

  const calibrate = useCallback((xPercent: number, yPercent: number) => {
    const x = (window.innerWidth * xPercent) / 100;
    const y = (window.innerHeight * yPercent) / 100;

    window.webgazer?.recordScreenPosition(x, y, "click");
    setCalibrationClicks((current) => current + 1);
  }, []);

  return (
    <section
      id="rastreamento"
      className="bg-zinc-950 px-6 py-20 text-white"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
            Módulo experimental
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Rastreamento ocular pela câmera
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Um protótipo para estimar o ponto de atenção na tela usando a câmera
            do notebook, com calibração simples e execução local no navegador.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {status === "running" ? (
              <button
                type="button"
                onClick={stopTracking}
                className="rounded-full bg-white px-5 py-3 font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                Pausar
              </button>
            ) : (
              <button
                type="button"
                onClick={startTracking}
                disabled={status === "loading"}
                className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:bg-blue-400"
              >
                {status === "loading" ? "Iniciando..." : "Iniciar câmera"}
              </button>
            )}

            <button
              type="button"
              onClick={resetCalibration}
              className="rounded-full border border-zinc-600 px-5 py-3 font-semibold text-white transition hover:border-white"
            >
              Recalibrar
            </button>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <span>Calibração</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {lastError ? (
            <p className="mt-5 rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
              {lastError}
            </p>
          ) : null}
        </div>

        <div className="relative min-h-[420px] rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
          <div className="grid h-full min-h-[372px] grid-cols-3 grid-rows-3 gap-4">
            {calibrationPoints.map((point) => (
              <button
                key={point.id}
                type="button"
                onClick={() => calibrate(point.x, point.y)}
                disabled={status !== "running"}
                className="rounded-xl border border-zinc-700 bg-zinc-950 text-sm font-semibold text-zinc-300 transition hover:border-blue-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Calibrar
              </button>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-6 top-6 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
            Clique nos pontos com a cabeça parada. Repita cada posição algumas
            vezes para melhorar a precisão.
          </div>
        </div>
      </div>

      {status === "running" && gazePoint ? (
        <div
          className="pointer-events-none fixed z-50 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.85)]"
          style={{ left: gazePoint.x, top: gazePoint.y }}
        />
      ) : null}
    </section>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type GazeData = {
  x: number;
  y: number;
};

type DetectedFace = {
  boundingBox: DOMRectReadOnly;
};

type FaceDetectorConstructor = new (options?: {
  fastMode?: boolean;
  maxDetectedFaces?: number;
}) => {
  detect: (source: HTMLVideoElement) => Promise<DetectedFace[]>;
};

declare global {
  interface Window {
    FaceDetector?: FaceDetectorConstructor;
  }
}

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

function getFriendlyCameraError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  if (/permission|denied|notallowed/i.test(message)) {
    return "A câmera foi bloqueada pelo navegador. Libere a câmera para este site e tente novamente.";
  }

  if (/notfound|devicesnotfound/i.test(message)) {
    return "Não encontrei uma câmera disponível neste dispositivo.";
  }

  if (/notreadable|trackstart/i.test(message)) {
    return "A câmera parece estar em uso por outro aplicativo. Feche chamadas, gravadores ou apps de câmera e tente novamente.";
  }

  return message || "Não foi possível iniciar a câmera.";
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function EyeTrackingDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastPointRef = useRef<GazeData>({
    x: typeof window === "undefined" ? 0 : window.innerWidth / 2,
    y: typeof window === "undefined" ? 0 : window.innerHeight / 2,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "running" | "error">(
    "idle",
  );
  const [gazePoint, setGazePoint] = useState<GazeData | null>(null);
  const [calibrationClicks, setCalibrationClicks] = useState(0);
  const [lastError, setLastError] = useState("");
  const [detectorAvailable, setDetectorAvailable] = useState(false);

  const progress = useMemo(
    () => Math.min(100, Math.round((calibrationClicks / 27) * 100)),
    [calibrationClicks],
  );

  const stopTracking = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStatus("idle");
    setGazePoint(null);
  }, []);

  useEffect(() => {
    setDetectorAvailable(typeof window !== "undefined" && "FaceDetector" in window);

    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  const updateEstimatedPoint = useCallback(
    async (detector?: InstanceType<FaceDetectorConstructor>) => {
      const video = videoRef.current;

      if (!video || video.readyState < 2) {
        frameRef.current = requestAnimationFrame(() =>
          updateEstimatedPoint(detector),
        );
        return;
      }

      let nextPoint = lastPointRef.current;

      try {
        const faces = detector ? await detector.detect(video) : [];
        const face = faces[0];

        if (face) {
          const centerX =
            (face.boundingBox.x + face.boundingBox.width / 2) / video.videoWidth;
          const centerY =
            (face.boundingBox.y + face.boundingBox.height / 2) /
            video.videoHeight;

          nextPoint = {
            x: clamp((1 - centerX) * window.innerWidth, 0, window.innerWidth),
            y: clamp(centerY * window.innerHeight, 0, window.innerHeight),
          };
        } else {
          const drift = Math.sin(Date.now() / 700) * 18;

          nextPoint = {
            x: clamp(lastPointRef.current.x + drift * 0.02, 0, window.innerWidth),
            y: clamp(lastPointRef.current.y, 0, window.innerHeight),
          };
        }
      } catch {
        nextPoint = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        };
      }

      lastPointRef.current = nextPoint;
      setGazePoint(nextPoint);

      frameRef.current = requestAnimationFrame(() =>
        updateEstimatedPoint(detector),
      );
    },
    [],
  );

  const startTracking = useCallback(async () => {
    try {
      setStatus("loading");
      setLastError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (!videoRef.current) {
        throw new Error("Preview da câmera não está disponível.");
      }

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      const detector = window.FaceDetector
        ? new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 })
        : undefined;

      setDetectorAvailable(Boolean(detector));
      setStatus("running");
      updateEstimatedPoint(detector);
    } catch (error) {
      setStatus("error");
      setLastError(getFriendlyCameraError(error));
      stopTracking();
    }
  }, [stopTracking, updateEstimatedPoint]);

  const resetCalibration = useCallback(() => {
    setCalibrationClicks(0);
    lastPointRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  }, []);

  const calibrate = useCallback((xPercent: number, yPercent: number) => {
    lastPointRef.current = {
      x: (window.innerWidth * xPercent) / 100,
      y: (window.innerHeight * yPercent) / 100,
    };
    setGazePoint(lastPointRef.current);
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
            Um protótipo para testar câmera, calibração e estimativa visual na
            tela. Quando o navegador suporta detecção facial, o ponto acompanha a
            posição do rosto como aproximação inicial do olhar.
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

          <p className="mt-4 text-sm text-zinc-500">
            Status:{" "}
            {detectorAvailable
              ? "detecção facial disponível"
              : "modo câmera/calibração sem detecção facial nativa"}
          </p>

          {lastError ? (
            <p className="mt-5 rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
              {lastError}
            </p>
          ) : null}
        </div>

        <div className="relative min-h-[420px] rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
          <video
            ref={videoRef}
            muted
            playsInline
            className="absolute right-6 top-6 h-28 w-36 rounded-xl border border-zinc-700 object-cover shadow-lg"
          />

          <div className="grid h-full min-h-[372px] grid-cols-3 grid-rows-3 gap-4 pt-36 sm:pt-28">
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

          <div className="pointer-events-none absolute left-6 right-48 top-6 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
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

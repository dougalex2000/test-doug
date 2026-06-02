"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
  type NormalizedLandmark,
} from "@mediapipe/tasks-vision";

type GazeData = {
  x: number;
  y: number;
};

type RawGaze = {
  x: number;
  y: number;
};

type CalibrationSample = {
  raw: RawGaze;
  target: GazeData;
};

const calibrationPoints = [
  { id: "top-left", x: 12, y: 16 },
  { id: "top-center", x: 50, y: 16 },
  { id: "top-right", x: 88, y: 16 },
  { id: "middle-left", x: 12, y: 50 },
  { id: "center", x: 50, y: 50 },
  { id: "middle-right", x: 88, y: 50 },
  { id: "bottom-left", x: 12, y: 84 },
  { id: "bottom-center", x: 50, y: 84 },
  { id: "bottom-right", x: 88, y: 84 },
];

const communicationOptions = [
  { id: "agua", label: "Água", tone: "bg-sky-500" },
  { id: "dor", label: "Dor", tone: "bg-rose-500" },
  { id: "sim", label: "Sim", tone: "bg-emerald-500" },
  { id: "nao", label: "Não", tone: "bg-amber-500" },
];

const DWELL_TIME_MS = 1400;
const MIN_CALIBRATION_SAMPLES = 9;
const MEDIAPIPE_WASM =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const FACE_LANDMARKER_MODEL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task";

let faceLandmarkerPromise: Promise<FaceLandmarker> | null = null;

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

function averageLandmarks(landmarks: NormalizedLandmark[], indexes: number[]) {
  const points = indexes
    .map((index) => landmarks[index])
    .filter((point): point is NormalizedLandmark => Boolean(point));

  if (!points.length) {
    return null;
  }

  return {
    x: points.reduce((sum, point) => sum + point.x, 0) / points.length,
    y: points.reduce((sum, point) => sum + point.y, 0) / points.length,
  };
}

function getRawGazeFromFaceLandmarks(landmarks: NormalizedLandmark[]) {
  const leftIris = averageLandmarks(landmarks, [468, 469, 470, 471, 472]);
  const rightIris = averageLandmarks(landmarks, [473, 474, 475, 476, 477]);
  const leftEye = averageLandmarks(landmarks, [33, 133, 159, 145]);
  const rightEye = averageLandmarks(landmarks, [362, 263, 386, 374]);

  const irisCenter =
    leftIris && rightIris
      ? {
          x: (leftIris.x + rightIris.x) / 2,
          y: (leftIris.y + rightIris.y) / 2,
        }
      : null;
  const eyeCenter =
    leftEye && rightEye
      ? {
          x: (leftEye.x + rightEye.x) / 2,
          y: (leftEye.y + rightEye.y) / 2,
        }
      : null;

  if (!irisCenter || !eyeCenter) {
    return null;
  }

  return {
    x: irisCenter.x - eyeCenter.x,
    y: irisCenter.y - eyeCenter.y,
  };
}

function scaleRawGaze(raw: RawGaze, samples: CalibrationSample[]) {
  if (samples.length < MIN_CALIBRATION_SAMPLES) {
    return {
      x: clamp((0.5 - raw.x * 9) * window.innerWidth, 0, window.innerWidth),
      y: clamp((0.5 + raw.y * 12) * window.innerHeight, 0, window.innerHeight),
    };
  }

  const minRawX = Math.min(...samples.map((sample) => sample.raw.x));
  const maxRawX = Math.max(...samples.map((sample) => sample.raw.x));
  const minRawY = Math.min(...samples.map((sample) => sample.raw.y));
  const maxRawY = Math.max(...samples.map((sample) => sample.raw.y));
  const minTargetX = Math.min(...samples.map((sample) => sample.target.x));
  const maxTargetX = Math.max(...samples.map((sample) => sample.target.x));
  const minTargetY = Math.min(...samples.map((sample) => sample.target.y));
  const maxTargetY = Math.max(...samples.map((sample) => sample.target.y));

  const rawRangeX = Math.max(0.0001, maxRawX - minRawX);
  const rawRangeY = Math.max(0.0001, maxRawY - minRawY);
  const normalizedX = clamp((raw.x - minRawX) / rawRangeX, 0, 1);
  const normalizedY = clamp((raw.y - minRawY) / rawRangeY, 0, 1);

  return {
    x: minTargetX + normalizedX * (maxTargetX - minTargetX),
    y: minTargetY + normalizedY * (maxTargetY - minTargetY),
  };
}

async function getFaceLandmarker() {
  faceLandmarkerPromise ??= (async () => {
    const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM);

    return FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: FACE_LANDMARKER_MODEL,
        delegate: "GPU",
      },
      numFaces: 1,
      runningMode: "VIDEO",
    });
  })();

  return faceLandmarkerPromise;
}

export default function EyeTrackingDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dwellTargetRef = useRef<string | null>(null);
  const dwellStartedAtRef = useRef(0);
  const selectedDuringDwellRef = useRef(false);
  const manualPointUntilRef = useRef(0);
  const calibrationSamplesRef = useRef<CalibrationSample[]>([]);
  const lastRawGazeRef = useRef<RawGaze | null>(null);
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
  const [landmarkerReady, setLandmarkerReady] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [dwellProgress, setDwellProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Nenhuma seleção ainda");

  const progress = useMemo(
    () =>
      Math.min(
        100,
        Math.round((calibrationClicks / MIN_CALIBRATION_SAMPLES) * 100),
      ),
    [calibrationClicks],
  );
  const isCalibrated = calibrationClicks >= MIN_CALIBRATION_SAMPLES;

  const selectOption = useCallback((label: string) => {
    setSelectedOption(label);
  }, []);

  const updateDwellSelection = useCallback(
    (point: GazeData) => {
      if (!isCalibrated) {
        setActiveOption(null);
        setDwellProgress(0);
        return;
      }

      const target = communicationOptions.find((option) => {
        const element = optionRefs.current[option.id];

        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();

        return (
          point.x >= rect.left &&
          point.x <= rect.right &&
          point.y >= rect.top &&
          point.y <= rect.bottom
        );
      });

      if (!target) {
        dwellTargetRef.current = null;
        dwellStartedAtRef.current = 0;
        selectedDuringDwellRef.current = false;
        setActiveOption(null);
        setDwellProgress(0);
        return;
      }

      const now = performance.now();

      if (dwellTargetRef.current !== target.id) {
        dwellTargetRef.current = target.id;
        dwellStartedAtRef.current = now;
        selectedDuringDwellRef.current = false;
        setActiveOption(target.id);
        setDwellProgress(0);
        return;
      }

      const elapsed = now - dwellStartedAtRef.current;
      const nextProgress = Math.min(100, Math.round((elapsed / DWELL_TIME_MS) * 100));

      setActiveOption(target.id);
      setDwellProgress(nextProgress);

      if (elapsed >= DWELL_TIME_MS && !selectedDuringDwellRef.current) {
        selectedDuringDwellRef.current = true;
        selectOption(target.label);
      }
    },
    [isCalibrated, selectOption],
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
    setActiveOption(null);
    setDwellProgress(0);
  }, []);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  const updateEstimatedPoint = useCallback(
    async () => {
      const video = videoRef.current;

      if (!video || video.readyState < 2) {
        frameRef.current = requestAnimationFrame(() => updateEstimatedPoint());
        return;
      }

      let nextPoint = lastPointRef.current;

      if (performance.now() > manualPointUntilRef.current) {
        try {
          const result = landmarkerRef.current?.detectForVideo(
            video,
            performance.now(),
          );
          const landmarks = result?.faceLandmarks[0];
          const rawGaze = landmarks ? getRawGazeFromFaceLandmarks(landmarks) : null;

          if (rawGaze) {
            lastRawGazeRef.current = rawGaze;
            nextPoint = scaleRawGaze(rawGaze, calibrationSamplesRef.current);
          }
        } catch {
          nextPoint = lastPointRef.current;
        }
      }

      lastPointRef.current = nextPoint;
      setGazePoint(nextPoint);
      updateDwellSelection(nextPoint);

      frameRef.current = requestAnimationFrame(() => updateEstimatedPoint());
    },
    [updateDwellSelection],
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

      const landmarker = await getFaceLandmarker();

      landmarkerRef.current = landmarker;
      setLandmarkerReady(true);
      setStatus("running");
      updateEstimatedPoint();
    } catch (error) {
      setStatus("error");
      setLastError(getFriendlyCameraError(error));
      stopTracking();
    }
  }, [stopTracking, updateEstimatedPoint]);

  const resetCalibration = useCallback(() => {
    calibrationSamplesRef.current = [];
    setCalibrationClicks(0);
    setSelectedOption("Nenhuma seleção ainda");
    setActiveOption(null);
    setDwellProgress(0);
    lastPointRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  }, []);

  const calibrate = useCallback((xPercent: number, yPercent: number) => {
    const target = {
      x: (window.innerWidth * xPercent) / 100,
      y: (window.innerHeight * yPercent) / 100,
    };

    if (lastRawGazeRef.current) {
      calibrationSamplesRef.current = [
        ...calibrationSamplesRef.current,
        {
          raw: lastRawGazeRef.current,
          target,
        },
      ];
    }

    lastPointRef.current = target;
    manualPointUntilRef.current = performance.now() + 450;
    setGazePoint(target);
    setCalibrationClicks((current) => current + 1);
  }, []);

  const aimAtOption = useCallback(
    (optionId: string) => {
      const element = optionRefs.current[optionId];

      if (!element || status !== "running") {
        return;
      }

      const rect = element.getBoundingClientRect();
      const nextPoint = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      lastPointRef.current = nextPoint;
      manualPointUntilRef.current = performance.now() + DWELL_TIME_MS + 500;
      setGazePoint(nextPoint);
      updateDwellSelection(nextPoint);
    },
    [status, updateDwellSelection],
  );

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
            Um protótipo para testar câmera, calibração e seleção por
            permanência. Olhe para cada ponto antes de clicar em calibrar; depois
            a bolinha usa essas amostras para alcançar melhor os cantos.
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

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-sm text-zinc-400">Seleção atual</p>
            <p className="mt-1 text-2xl font-bold text-white">{selectedOption}</p>
          </div>

          <p className="mt-4 text-sm text-zinc-500">
            Status:{" "}
            {landmarkerReady
              ? `MediaPipe ativo com ${calibrationSamplesRef.current.length} amostras`
              : "aguardando câmera e modelo de landmarks"}
          </p>

          {lastError ? (
            <p className="mt-5 rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-100">
              {lastError}
            </p>
          ) : null}
        </div>

        <div className="relative min-h-[620px] rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
          <video
            ref={videoRef}
            muted
            playsInline
            className="absolute right-6 top-6 h-28 w-36 rounded-xl border border-zinc-700 object-cover shadow-lg"
          />

          {isCalibrated ? (
            <div className="grid min-h-[560px] grid-cols-2 gap-4 pt-36 sm:pt-28">
              {communicationOptions.map((option) => {
                const isActive = activeOption === option.id;

                return (
                  <button
                    key={option.id}
                    ref={(element) => {
                      optionRefs.current[option.id] = element;
                    }}
                    type="button"
                    onMouseEnter={() => aimAtOption(option.id)}
                    onMouseMove={() => aimAtOption(option.id)}
                    onClick={() => selectOption(option.label)}
                    className={`relative overflow-hidden rounded-2xl border border-white/10 ${option.tone} p-6 text-3xl font-bold text-white shadow-lg transition ${
                      isActive ? "scale-[1.03] ring-4 ring-white" : ""
                    }`}
                  >
                    <span className="relative z-10">{option.label}</span>
                    {isActive ? (
                      <span
                        className="absolute inset-x-0 bottom-0 h-2 bg-white/90 transition-all"
                        style={{ width: `${dwellProgress}%` }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              <div className="grid h-full min-h-[560px] grid-cols-3 grid-rows-3 gap-4 pt-36 sm:pt-28">
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
                Olhe para cada posição e clique em calibrar. Faça os 9 pontos
                para expandir a área útil da bolinha.
              </div>
            </>
          )}
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

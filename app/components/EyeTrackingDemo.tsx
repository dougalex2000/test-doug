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

type FaceDebugFrame = {
  landmarks: NormalizedLandmark[];
  videoWidth: number;
  videoHeight: number;
};

const calibrationPoints = [
  { id: "top-left", x: 5, y: 8 },
  { id: "top-center", x: 50, y: 8 },
  { id: "top-right", x: 95, y: 8 },
  { id: "middle-left", x: 5, y: 50 },
  { id: "center", x: 50, y: 50 },
  { id: "middle-right", x: 95, y: 50 },
  { id: "bottom-left", x: 5, y: 92 },
  { id: "bottom-center", x: 50, y: 92 },
  { id: "bottom-right", x: 95, y: 92 },
];

const communicationOptions = [
  { id: "agua", label: "Água", tone: "bg-sky-500" },
  { id: "dor", label: "Dor", tone: "bg-rose-500" },
  { id: "sim", label: "Sim", tone: "bg-emerald-500" },
  { id: "nao", label: "Não", tone: "bg-amber-500" },
];

const DWELL_TIME_MS = 1400;
const CALIBRATION_INSTRUCTIONS_MS = 7000;
const CALIBRATION_POINT_MS = 2000;
const MIN_CALIBRATION_SAMPLES = 9;
const GAZE_DEAD_ZONE = 18;
const GAZE_SMOOTHING = 0.08;
const LEFT_EYE_OUTLINE = [33, 160, 158, 133, 153, 144, 33];
const RIGHT_EYE_OUTLINE = [362, 385, 387, 263, 373, 380, 362];
const LEFT_IRIS = [468, 469, 470, 471, 472, 468];
const RIGHT_IRIS = [473, 474, 475, 476, 477, 473];
const MEDIAPIPE_WASM =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const FACE_LANDMARKER_MODEL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task";

let faceLandmarkerPromise: Promise<FaceLandmarker> | null = null;

function ignoreTensorFlowLiteInfoLogs() {
  const originalConsoleError = console.error.bind(console);

  console.error = (...args: unknown[]) => {
    const message = args.map((arg) => String(arg)).join(" ");

    if (message.includes("Created TensorFlow Lite XNNPACK delegate for CPU")) {
      return;
    }

    originalConsoleError(...args);
  };

  return () => {
    console.error = originalConsoleError;
  };
}

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
  const leftSamples = samples.filter((sample) => sample.target.x < window.innerWidth * 0.35);
  const rightSamples = samples.filter((sample) => sample.target.x > window.innerWidth * 0.65);
  const topSamples = samples.filter((sample) => sample.target.y < window.innerHeight * 0.35);
  const bottomSamples = samples.filter((sample) => sample.target.y > window.innerHeight * 0.65);
  const averageRawX = (axisSamples: CalibrationSample[]) =>
    axisSamples.reduce((sum, sample) => sum + sample.raw.x, 0) /
    Math.max(1, axisSamples.length);
  const averageRawY = (axisSamples: CalibrationSample[]) =>
    axisSamples.reduce((sum, sample) => sum + sample.raw.y, 0) /
    Math.max(1, axisSamples.length);
  const shouldInvertX =
    leftSamples.length > 0 &&
    rightSamples.length > 0 &&
    averageRawX(leftSamples) > averageRawX(rightSamples);
  const shouldInvertY =
    topSamples.length > 0 &&
    bottomSamples.length > 0 &&
    averageRawY(topSamples) > averageRawY(bottomSamples);
  const baseNormalizedX = clamp((raw.x - minRawX) / rawRangeX, 0, 1);
  const baseNormalizedY = clamp((raw.y - minRawY) / rawRangeY, 0, 1);
  const normalizedX = shouldInvertX ? 1 - baseNormalizedX : baseNormalizedX;
  const normalizedY = shouldInvertY ? 1 - baseNormalizedY : baseNormalizedY;
  const scaledPoint = {
    x: minTargetX + normalizedX * (maxTargetX - minTargetX),
    y: minTargetY + normalizedY * (maxTargetY - minTargetY),
  };
  const nearestSamples = samples
    .map((sample) => ({
      sample,
      distance:
        Math.hypot(raw.x - sample.raw.x, raw.y - sample.raw.y) + 0.00001,
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 4);
  const totalWeight = nearestSamples.reduce(
    (sum, item) => sum + 1 / item.distance,
    0,
  );
  const weightedPoint = nearestSamples.reduce(
    (point, item) => {
      const weight = 1 / item.distance / totalWeight;

      return {
        x: point.x + item.sample.target.x * weight,
        y: point.y + item.sample.target.y * weight,
      };
    },
    { x: 0, y: 0 },
  );

  return {
    x: clamp(scaledPoint.x * 0.65 + weightedPoint.x * 0.35, 0, window.innerWidth),
    y: clamp(
      scaledPoint.y * 0.65 + weightedPoint.y * 0.35,
      0,
      window.innerHeight,
    ),
  };
}

function smoothPoint(previous: GazeData, next: GazeData) {
  if (Math.hypot(next.x - previous.x, next.y - previous.y) < GAZE_DEAD_ZONE) {
    return previous;
  }

  return {
    x: previous.x + (next.x - previous.x) * GAZE_SMOOTHING,
    y: previous.y + (next.y - previous.y) * GAZE_SMOOTHING,
  };
}

function drawLandmarkPath(
  context: CanvasRenderingContext2D,
  landmarks: NormalizedLandmark[],
  indexes: number[],
  color: string,
  width: number,
  frame: { x: number; y: number; width: number; height: number },
) {
  context.beginPath();
  indexes.forEach((index, position) => {
    const point = landmarks[index];

    if (!point) {
      return;
    }

    const x = frame.x + point.x * frame.width;
    const y = frame.y + point.y * frame.height;

    if (position === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });
  context.strokeStyle = color;
  context.lineWidth = width;
  context.stroke();
}

function getCoveredVideoFrame(
  canvasWidth: number,
  canvasHeight: number,
  videoWidth: number,
  videoHeight: number,
) {
  const videoAspect = videoWidth / Math.max(1, videoHeight);
  const canvasAspect = canvasWidth / Math.max(1, canvasHeight);

  if (videoAspect > canvasAspect) {
    const height = canvasHeight;
    const width = height * videoAspect;

    return {
      x: (canvasWidth - width) / 2,
      y: 0,
      width,
      height,
    };
  }

  const width = canvasWidth;
  const height = width / videoAspect;

  return {
    x: 0,
    y: (canvasHeight - height) / 2,
    width,
    height,
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
  const debugVideoRef = useRef<HTMLVideoElement>(null);
  const debugCanvasRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dwellTargetRef = useRef<string | null>(null);
  const dwellStartedAtRef = useRef(0);
  const selectedDuringDwellRef = useRef(false);
  const manualPointUntilRef = useRef(0);
  const calibrationSamplesRef = useRef<CalibrationSample[]>([]);
  const calibrationClicksRef = useRef(0);
  const activeCalibrationIndexRef = useRef(0);
  const calibrationPointStartedAtRef = useRef(0);
  const calibrationInstructionTimeoutRef = useRef<number | null>(null);
  const calibrationPreviewIntervalRef = useRef<number | null>(null);
  const showCalibrationInstructionsRef = useRef(false);
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
  const [calibrationHoldProgress, setCalibrationHoldProgress] = useState(0);
  const [calibrationPreviewIndex, setCalibrationPreviewIndex] = useState(0);
  const [showCalibrationInstructions, setShowCalibrationInstructions] =
    useState(false);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [lastError, setLastError] = useState("");
  const [landmarkerReady, setLandmarkerReady] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [dwellProgress, setDwellProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Nenhuma seleção ainda");
  const [debugMode, setDebugMode] = useState(false);
  const [debugFrame, setDebugFrame] = useState<FaceDebugFrame | null>(null);

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

  const finishCalibrationInstructions = useCallback(() => {
    if (calibrationPreviewIntervalRef.current) {
      window.clearInterval(calibrationPreviewIntervalRef.current);
      calibrationPreviewIntervalRef.current = null;
    }

    showCalibrationInstructionsRef.current = false;
    setShowCalibrationInstructions(false);
    calibrationPointStartedAtRef.current = performance.now();
  }, []);

  const startCalibrationInstructions = useCallback(() => {
    if (calibrationInstructionTimeoutRef.current) {
      window.clearTimeout(calibrationInstructionTimeoutRef.current);
    }
    if (calibrationPreviewIntervalRef.current) {
      window.clearInterval(calibrationPreviewIntervalRef.current);
      calibrationPreviewIntervalRef.current = null;
    }

    showCalibrationInstructionsRef.current = true;
    setShowCalibrationInstructions(true);
    setCalibrationPreviewIndex(0);
    calibrationPointStartedAtRef.current =
      performance.now() + CALIBRATION_INSTRUCTIONS_MS;
    setCalibrationHoldProgress(0);
    const previewStartedAt = performance.now();
    const previewStepMs =
      CALIBRATION_INSTRUCTIONS_MS / calibrationPoints.length;

    calibrationPreviewIntervalRef.current = window.setInterval(() => {
      const elapsed = performance.now() - previewStartedAt;

      setCalibrationPreviewIndex(
        Math.min(
          calibrationPoints.length - 1,
          Math.floor(elapsed / previewStepMs),
        ),
      );
    }, 80);

    calibrationInstructionTimeoutRef.current = window.setTimeout(() => {
      finishCalibrationInstructions();
      calibrationInstructionTimeoutRef.current = null;
    }, CALIBRATION_INSTRUCTIONS_MS);
  }, [finishCalibrationInstructions]);

  const refreshVideoDevices = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      return;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");

    setVideoDevices(cameras);
    setSelectedDeviceId((currentDeviceId) => {
      if (
        currentDeviceId &&
        cameras.some((camera) => camera.deviceId === currentDeviceId)
      ) {
        return currentDeviceId;
      }

      return cameras[0]?.deviceId ?? "";
    });
  }, []);

  const captureCalibrationPoint = useCallback((pointIndex: number) => {
    const point = calibrationPoints[pointIndex];

    if (!point) {
      return;
    }

    const target = {
      x: (window.innerWidth * point.x) / 100,
      y: (window.innerHeight * point.y) / 100,
    };

    if (!lastRawGazeRef.current) {
      calibrationPointStartedAtRef.current = performance.now();
      setCalibrationHoldProgress(0);
      return;
    }

    calibrationSamplesRef.current = [
      ...calibrationSamplesRef.current,
      {
        raw: lastRawGazeRef.current,
        target,
      },
    ];

    lastPointRef.current = target;
    manualPointUntilRef.current = performance.now() + 300;
    setGazePoint(target);
    calibrationClicksRef.current = Math.min(
      MIN_CALIBRATION_SAMPLES,
      calibrationClicksRef.current + 1,
    );
    setCalibrationClicks(calibrationClicksRef.current);
    activeCalibrationIndexRef.current = calibrationClicksRef.current;
    calibrationPointStartedAtRef.current = performance.now();
    setCalibrationHoldProgress(0);
  }, []);

  const updateDwellSelection = useCallback(
    (point: GazeData) => {
      if (
        calibrationClicksRef.current < MIN_CALIBRATION_SAMPLES &&
        !showCalibrationInstructionsRef.current
      ) {
        setActiveOption(null);
        setDwellProgress(0);
        return;
      }

      const candidates = communicationOptions
        .map((option) => {
          const element = optionRefs.current[option.id];

          if (!element) {
            return null;
          }

          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distance = Math.hypot(point.x - centerX, point.y - centerY);

          return {
            ...option,
            distance,
          };
        })
        .filter((option): option is NonNullable<typeof option> =>
          Boolean(option),
        )
        .sort((a, b) => a.distance - b.distance);
      const target = candidates[0];

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
    [selectOption],
  );

  const stopTracking = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (calibrationInstructionTimeoutRef.current) {
      window.clearTimeout(calibrationInstructionTimeoutRef.current);
      calibrationInstructionTimeoutRef.current = null;
    }
    if (calibrationPreviewIntervalRef.current) {
      window.clearInterval(calibrationPreviewIntervalRef.current);
      calibrationPreviewIntervalRef.current = null;
    }
    showCalibrationInstructionsRef.current = false;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStatus("idle");
    setGazePoint(null);
    setActiveOption(null);
    setDwellProgress(0);
    setShowCalibrationInstructions(false);
  }, []);

  useEffect(() => {
    const restoreConsoleError = ignoreTensorFlowLiteInfoLogs();

    return () => {
      restoreConsoleError();
      stopTracking();
    };
  }, [stopTracking]);

  useEffect(() => {
    void refreshVideoDevices();

    navigator.mediaDevices?.addEventListener?.(
      "devicechange",
      refreshVideoDevices,
    );

    return () => {
      navigator.mediaDevices?.removeEventListener?.(
        "devicechange",
        refreshVideoDevices,
      );
    };
  }, [refreshVideoDevices]);

  useEffect(() => {
    if (!debugMode || !debugVideoRef.current || !streamRef.current) {
      return;
    }

    debugVideoRef.current.srcObject = streamRef.current;
    void debugVideoRef.current.play();
  }, [debugMode]);

  useEffect(() => {
    const canvas = debugCanvasRef.current;

    if (!debugMode || !canvas || !debugFrame) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width));
    canvas.height = Math.max(1, Math.round(rect.height));

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    const videoFrame = getCoveredVideoFrame(
      canvas.width,
      canvas.height,
      debugFrame.videoWidth,
      debugFrame.videoHeight,
    );

    debugFrame.landmarks.forEach((point, index) => {
      const x = videoFrame.x + (1 - point.x) * videoFrame.width;
      const y = videoFrame.y + point.y * videoFrame.height;

      context.beginPath();
      context.arc(x, y, 1.4, 0, Math.PI * 2);
      context.fillStyle = "rgba(255, 80, 80, 0.8)";
      context.fill();

      if (index % 12 === 0) {
        context.fillStyle = "rgba(255, 120, 120, 0.9)";
        context.font = "9px sans-serif";
        context.fillText(String(index), x + 3, y - 3);
      }
    });

    const mirroredLandmarks = debugFrame.landmarks.map((point) => ({
      ...point,
      x: 1 - point.x,
    }));

    drawLandmarkPath(
      context,
      mirroredLandmarks,
      LEFT_EYE_OUTLINE,
      "#38bdf8",
      3,
      videoFrame,
    );
    drawLandmarkPath(
      context,
      mirroredLandmarks,
      RIGHT_EYE_OUTLINE,
      "#22c55e",
      3,
      videoFrame,
    );
    drawLandmarkPath(context, mirroredLandmarks, LEFT_IRIS, "#ffffff", 3, videoFrame);
    drawLandmarkPath(context, mirroredLandmarks, RIGHT_IRIS, "#ffffff", 3, videoFrame);
  }, [debugFrame, debugMode]);

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

          if (landmarks) {
            setDebugFrame({
              landmarks,
              videoWidth: video.videoWidth,
              videoHeight: video.videoHeight,
            });
          }

          if (rawGaze) {
            lastRawGazeRef.current = rawGaze;
            nextPoint = scaleRawGaze(rawGaze, calibrationSamplesRef.current);
          }
        } catch {
          nextPoint = lastPointRef.current;
        }
      }

      if (performance.now() > manualPointUntilRef.current) {
        nextPoint = smoothPoint(lastPointRef.current, nextPoint);
      }

      lastPointRef.current = nextPoint;
      setGazePoint(nextPoint);

      if (
        calibrationClicksRef.current < MIN_CALIBRATION_SAMPLES &&
        !showCalibrationInstructionsRef.current
      ) {
        const now = performance.now();

        if (calibrationPointStartedAtRef.current === 0) {
          calibrationPointStartedAtRef.current = now;
        }

        const elapsed = now - calibrationPointStartedAtRef.current;
        const nextHoldProgress = Math.min(
          100,
          Math.round((elapsed / CALIBRATION_POINT_MS) * 100),
        );

        setCalibrationHoldProgress(nextHoldProgress);

        if (elapsed >= CALIBRATION_POINT_MS) {
          captureCalibrationPoint(activeCalibrationIndexRef.current);
        }
      }

      updateDwellSelection(nextPoint);

      frameRef.current = requestAnimationFrame(() => updateEstimatedPoint());
    },
    [
      captureCalibrationPoint,
      updateDwellSelection,
    ],
  );

  const startTracking = useCallback(async () => {
    try {
      setStatus("loading");
      setLastError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: selectedDeviceId
          ? {
              deviceId: { exact: selectedDeviceId },
              width: { ideal: 640 },
              height: { ideal: 480 },
            }
          : {
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
      if (debugVideoRef.current) {
        debugVideoRef.current.srcObject = stream;
      }
      await videoRef.current.play();
      await debugVideoRef.current?.play();
      await refreshVideoDevices();

      const landmarker = await getFaceLandmarker();

      landmarkerRef.current = landmarker;
      setLandmarkerReady(true);
      activeCalibrationIndexRef.current = calibrationClicksRef.current;
      if (calibrationClicksRef.current < MIN_CALIBRATION_SAMPLES) {
        startCalibrationInstructions();
      }
      setStatus("running");
      updateEstimatedPoint();
    } catch (error) {
      setStatus("error");
      setLastError(getFriendlyCameraError(error));
      stopTracking();
    }
  }, [
    refreshVideoDevices,
    selectedDeviceId,
    startCalibrationInstructions,
    stopTracking,
    updateEstimatedPoint,
  ]);

  const resetCalibration = useCallback(() => {
    calibrationSamplesRef.current = [];
    calibrationClicksRef.current = 0;
    activeCalibrationIndexRef.current = 0;
    setCalibrationClicks(0);
    startCalibrationInstructions();
    setSelectedOption("Nenhuma seleção ainda");
    setActiveOption(null);
    setDwellProgress(0);
    lastPointRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  }, [startCalibrationInstructions]);

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

          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
            <label
              htmlFor="camera-device"
              className="text-sm font-semibold text-zinc-200"
            >
              Webcam para rastreamento
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <select
                id="camera-device"
                value={selectedDeviceId}
                onChange={(event) => setSelectedDeviceId(event.target.value)}
                disabled={status === "running" || status === "loading"}
                className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {videoDevices.length ? (
                  videoDevices.map((device, index) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Webcam ${index + 1}`}
                    </option>
                  ))
                ) : (
                  <option value="">Webcam padrão</option>
                )}
              </select>
              <button
                type="button"
                onClick={() => void refreshVideoDevices()}
                disabled={status === "loading"}
                className="rounded-xl border border-zinc-700 px-4 py-3 text-sm font-semibold text-white transition hover:border-white disabled:cursor-wait disabled:opacity-60"
              >
                Atualizar lista
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Para trocar a câmera em uso, pause o rastreamento, escolha a
              webcam e inicie novamente.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
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

            <button
              type="button"
              onClick={() => setDebugMode((current) => !current)}
              className="rounded-full border border-blue-400 px-5 py-3 font-semibold text-blue-100 transition hover:bg-blue-500 hover:text-white"
            >
              {debugMode ? "Fechar diagnóstico" : "Ver face"}
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
              <div className="flex min-h-[560px] items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/70 p-8 pt-36 text-center sm:pt-28">
                <div>
                  <p className="text-2xl font-bold text-white">
                    Calibração em tela cheia
                  </p>
                  <p className="mt-4 max-w-md text-zinc-400">
                    Os pontos de calibração aparecem sobre a tela real. Olhe
                    para cada alvo e clique nele para capturar a amostra.
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute left-6 right-48 top-6 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
                Olhe para os alvos que aparecem na tela inteira. Faça os 9
                pontos para expandir a área útil da bolinha.
              </div>
            </>
          )}
        </div>
      </div>

      {status === "running" && showCalibrationInstructions && !isCalibrated ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 py-4 text-white">
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-hidden rounded-2xl border-4 border-white bg-red-600 px-5 py-5 text-center shadow-2xl shadow-red-950/60 sm:px-7 sm:py-6">
            <p className="text-sm font-extrabold uppercase tracking-wide text-white">
              Calibração do olhar
            </p>
            <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Mantenha a cabeça parada
            </h3>
            <p className="mt-3 text-lg font-bold leading-snug text-white sm:text-xl">
              Siga os pontos apenas com os olhos. Não use o mouse.
            </p>
            <div className="relative mx-auto mt-4 aspect-video w-full max-w-72 rounded-xl border-2 border-white/80 bg-red-700/80">
              {(() => {
                const point =
                  calibrationPoints[calibrationPreviewIndex] ??
                  calibrationPoints[0];

                return (
                  <div
                    key={point.id}
                    className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-black text-white shadow-lg shadow-red-950/60"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  >
                    {calibrationPreviewIndex + 1}
                  </div>
                );
              })()}
            </div>
            <p className="mt-4 rounded-full border-2 border-white bg-white px-5 py-3 text-base font-black text-red-700 sm:text-lg">
              A calibração começa automaticamente em 7 segundos.
            </p>
          </div>
        </div>
      ) : null}

      {status === "running" && !isCalibrated && !showCalibrationInstructions
        ? (() => {
            const point = calibrationPoints[calibrationClicks] ?? calibrationPoints[0];
            const radius = 28;
            const circumference = 2 * Math.PI * radius;
            const strokeOffset =
              circumference -
              (calibrationHoldProgress / 100) * circumference;

            return (
              <div
                key={point.id}
                className="pointer-events-none fixed z-[70] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
              }}
            >
                <div className="absolute h-28 w-28 animate-[ping_0.9s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border-8 border-yellow-300 bg-yellow-300/35 shadow-[0_0_80px_rgba(253,224,71,0.95)]" />
                <div className="absolute h-20 w-20 animate-[pulse_0.9s_ease-in-out_infinite] rounded-full border-4 border-white bg-red-500/70 shadow-[0_0_70px_rgba(239,68,68,1)]" />
                <div className="absolute h-16 w-16 rounded-full border-4 border-yellow-200 bg-red-600 shadow-[0_0_55px_rgba(253,224,71,0.95)]" />
                <svg className="absolute h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    stroke="#ffffff"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </svg>
                <span className="relative text-2xl font-bold text-white">
                  {calibrationClicks + 1}
                </span>
              </div>
            );
          })()
        : null}

      {status === "running" && gazePoint ? (
        <div
          className="pointer-events-none fixed z-50 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.85)]"
          style={{ left: gazePoint.x, top: gazePoint.y }}
        />
      ) : null}

      {debugMode ? (
        <div className="fixed inset-0 z-[90] bg-black/90 p-6 text-white">
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                  Diagnóstico facial
                </p>
                <h3 className="text-2xl font-bold">
                  Referências visuais dos olhos e da face
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDebugMode(false)}
                className="rounded-full bg-white px-5 py-3 font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                Fechar
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950">
              <video
                ref={debugVideoRef}
                muted
                playsInline
                className="h-full w-full scale-x-[-1] object-cover"
              />
              <canvas
                ref={debugCanvasRef}
                className="pointer-events-none absolute inset-0 h-full w-full"
              />
            </div>

            <p className="mt-4 text-sm text-zinc-400">
              Pontos vermelhos: landmarks da face. Azul/verde: contorno dos
              olhos. Branco: íris. Se os pontos brancos não estiverem sobre a
              íris, a calibração do olhar fica imprecisa.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

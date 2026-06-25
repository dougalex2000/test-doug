"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "../lib/supabase/browser";
import { EscritaGuiada } from "./EscritaGuiada";
import {
  IconChat,
  IconClipboard,
  IconDocument,
  IconEye,
  IconGamepad,
  IconMotion,
  IconSwitchButton,
  IconTouch,
} from "./icons";

type Command = {
  id: string;
  label: string;
  detail: string;
  mode: string;
  deviceName: string;
  deviceRole: DeviceRole;
  createdAt: string;
};

type ConnectedDevice = {
  id: string;
  name: string;
  role: DeviceRole;
  lastSeen: string;
};

type DeviceRole =
  | "controle-geral"
  | "botao-sim-nao"
  | "sensor-movimento"
  | "sensor-som-sopro"
  | "joystick"
  | "comunicacao"
  | "mouse"
  | "escrita";

type Mode =
  | "inicio"
  | "sim-nao"
  | "comandos"
  | "joystick"
  | "mouse"
  | "comunicacao"
  | "escrita"
  | "escrita-guiada"
  | "acessibilidade"
  | "olhar"
  | "movimento"
  | "som-sopro";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const defaultSession = "DAVI-24";

const roleLabels: Record<DeviceRole, string> = {
  "controle-geral": "Todos os controles",
  "botao-sim-nao": "Botão Sim/Não",
  "sensor-movimento": "Movimento do celular",
  "sensor-som-sopro": "Usar som ou sopro",
  joystick: "Joystick",
  comunicacao: "Comunicação",
  mouse: "Mouse",
  escrita: "Escrita",
};

const roleDefaultMode: Record<DeviceRole, Mode> = {
  "controle-geral": "inicio",
  "botao-sim-nao": "sim-nao",
  "sensor-movimento": "movimento",
  "sensor-som-sopro": "som-sopro",
  joystick: "joystick",
  comunicacao: "comunicacao",
  mouse: "mouse",
  escrita: "escrita",
};

const roleOptions: Array<{ role: DeviceRole; title: string; description: string }> = [
  {
    role: "controle-geral",
    title: "Todos os controles",
    description: "Abre todos os recursos do DAVI InterCel.",
  },
  {
    role: "botao-sim-nao",
    title: "Botão Sim/Não",
    description: "Celular dedicado para escolhas rápidas.",
  },
  {
    role: "sensor-movimento",
    title: "Sensor de movimento",
    description: "Celular usado como acionador por movimento.",
  },
  {
    role: "sensor-som-sopro",
    title: "Sensor de som/sopro",
    description: "Celular usando microfone como acionador sonoro.",
  },
  {
    role: "joystick",
    title: "Joystick",
    description: "Celular dedicado para jogos e direção.",
  },
  {
    role: "comunicacao",
    title: "Comunicação",
    description: "Celular dedicado para frases rápidas.",
  },
];

function storageKey(code: string) {
  return `davi-intercel-session-${code.trim().toUpperCase() || defaultSession}`;
}

function devicesKey(code: string) {
  return `davi-intercel-devices-${code.trim().toUpperCase() || defaultSession}`;
}

function normalizeSessionCode(code: string) {
  return code.trim().toUpperCase() || defaultSession;
}

function normalizeRole(role: string | null): DeviceRole {
  if (
    role === "botao-sim-nao" ||
    role === "sensor-movimento" ||
    role === "sensor-som-sopro" ||
    role === "joystick" ||
    role === "comunicacao" ||
    role === "mouse" ||
    role === "escrita"
  ) {
    return role;
  }
  return "controle-geral";
}

function nowLabel() {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function readCommands(code: string): Command[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(code));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, 12) : [];
  } catch {
    return [];
  }
}

function writeCommands(code: string, commands: Command[]) {
  window.localStorage.setItem(storageKey(code), JSON.stringify(commands.slice(0, 12)));
}

function readDevices(code: string): ConnectedDevice[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(devicesKey(code));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, 16) : [];
  } catch {
    return [];
  }
}

function writeDevices(code: string, devices: ConnectedDevice[]) {
  window.localStorage.setItem(devicesKey(code), JSON.stringify(devices.slice(0, 16)));
}

function makeControlUrl(sessionCode: string, role: DeviceRole = "controle-geral") {
  if (typeof window === "undefined") {
    return `/davi-intercel/controle?sessao=${encodeURIComponent(sessionCode)}&papel=${role}`;
  }
  const url = new URL("/davi-intercel/controle", window.location.origin);
  url.searchParams.set("sessao", normalizeSessionCode(sessionCode));
  url.searchParams.set("papel", role);
  return url.toString();
}

function qrImageUrl(value: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(value)}`;
}

function useInitialControlParams() {
  const [params, setParams] = useState<{ sessionCode: string; role: DeviceRole }>(() => ({
    sessionCode: defaultSession,
    role: "controle-geral",
  }));

  useEffect(() => {
    const loadParams = window.setTimeout(() => {
      const search = new URLSearchParams(window.location.search);
      const session = normalizeSessionCode(search.get("sessao") ?? defaultSession);
      const role = normalizeRole(search.get("papel"));
      setParams({ sessionCode: session, role });
    }, 0);

    return () => window.clearTimeout(loadParams);
  }, []);

  return params;
}

function useStableDeviceId() {
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    const loadDeviceId = window.setTimeout(() => {
      const key = "davi-intercel-device-id";
      let id = window.localStorage.getItem(key);
      if (!id) {
        id = `celular-${Math.random().toString(16).slice(2, 8)}`;
        window.localStorage.setItem(key, id);
      }
      setDeviceId(id);
    }, 0);

    return () => window.clearTimeout(loadDeviceId);
  }, []);

  return deviceId;
}

function useInterCelCommands(sessionCode: string, deviceName = "Celular", deviceRole: DeviceRole = "controle-geral") {
  const [commands, setCommands] = useState<Command[]>([]);
  const [devices, setDevices] = useState<ConnectedDevice[]>([]);
  const [realtime, setRealtime] = useState<"off" | "connecting" | "on">("off");
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const code = normalizeSessionCode(sessionCode);

    const initialLoad = window.setTimeout(() => {
      setCommands(readCommands(sessionCode));
      setDevices(readDevices(sessionCode));
    }, 0);

    // Fallback no mesmo dispositivo: polling + evento de storage entre abas.
    const interval = window.setInterval(() => {
      setCommands(readCommands(sessionCode));
      setDevices(readDevices(sessionCode));
    }, 700);

    function onStorage(event: StorageEvent) {
      if (event.key === storageKey(sessionCode)) {
        setCommands(readCommands(sessionCode));
      }
      if (event.key === devicesKey(sessionCode)) {
        setDevices(readDevices(sessionCode));
      }
    }
    window.addEventListener("storage", onStorage);

    // Tempo real entre dispositivos (Supabase Realtime Broadcast).
    const supabase = getSupabaseBrowserClient();
    let channel: RealtimeChannel | null = null;
    if (supabase) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- status inicial de conexão (cliente)
      setRealtime("connecting");
      channel = supabase.channel(`intercel-${code}`, {
        config: { broadcast: { self: false } },
      });
      channel.on("broadcast", { event: "command" }, ({ payload }) => {
        const cmd = payload as Command;
        if (!cmd || !cmd.id) return;
        const next = [cmd, ...readCommands(sessionCode).filter((c) => c.id !== cmd.id)].slice(0, 12);
        writeCommands(sessionCode, next);
        setCommands(next);
        if ("vibrate" in navigator) navigator.vibrate?.(35);
      });
      channel.on("broadcast", { event: "device" }, ({ payload }) => {
        const dev = payload as ConnectedDevice;
        if (!dev || !dev.id) return;
        const next = [dev, ...readDevices(sessionCode).filter((d) => d.id !== dev.id)].slice(0, 16);
        writeDevices(sessionCode, next);
        setDevices(next);
      });
      channel.subscribe((status) => {
        setRealtime(status === "SUBSCRIBED" ? "on" : "connecting");
      });
      channelRef.current = channel;
    }

    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
      window.removeEventListener("storage", onStorage);
      if (channel && supabase) supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [sessionCode]);

  const announceDevice = useCallback(
    (id: string, name = deviceName, role = deviceRole) => {
      if (!id) return;
      const nextDevice: ConnectedDevice = {
        id,
        name,
        role,
        lastSeen: nowLabel(),
      };
      const others = readDevices(sessionCode).filter((device) => device.id !== id);
      const next = [nextDevice, ...others].slice(0, 16);
      writeDevices(sessionCode, next);
      setDevices(next);
      void channelRef.current?.send({ type: "broadcast", event: "device", payload: nextDevice });
    },
    [deviceName, deviceRole, sessionCode],
  );

  const sendCommand = useCallback(
    (label: string, detail: string, mode: string) => {
      const command: Command = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        label,
        detail,
        mode,
        deviceName,
        deviceRole,
        createdAt: nowLabel(),
      };
      const next = [command, ...readCommands(sessionCode)].slice(0, 12);
      writeCommands(sessionCode, next);
      setCommands(next);
      void channelRef.current?.send({ type: "broadcast", event: "command", payload: command });
      if ("vibrate" in navigator) navigator.vibrate?.(35);
    },
    [deviceName, deviceRole, sessionCode],
  );

  const clearCommands = useCallback(() => {
    writeCommands(sessionCode, []);
    setCommands([]);
  }, [sessionCode]);

  return { commands, devices, sendCommand, clearCommands, announceDevice, realtime };
}

const modeItems: Array<{
  id: Mode;
  title: string;
  subtitle: string;
  icon: ReactNode;
  tone: string;
}> = [
  {
    id: "sim-nao",
    title: "Sim / Não",
    subtitle: "Escolhas rápidas",
    icon: <IconSwitchButton className="h-7 w-7" />,
    tone: "bg-green-50 text-green-800 ring-green-100",
  },
  {
    id: "comandos",
    title: "Controlar aula",
    subtitle: "Vídeo e atividade",
    icon: <IconClipboard className="h-7 w-7" />,
    tone: "bg-sky-50 text-sky-800 ring-sky-100",
  },
  {
    id: "escrita",
    title: "Escrever",
    subtitle: "Letras e palavras",
    icon: <IconDocument className="h-7 w-7" />,
    tone: "bg-blue-50 text-blue-800 ring-blue-100",
  },
  {
    id: "comunicacao",
    title: "Comunicação rápida",
    subtitle: "Falar e expressar",
    icon: <IconChat className="h-7 w-7" />,
    tone: "bg-violet-50 text-violet-800 ring-violet-100",
  },
  {
    id: "joystick",
    title: "Joystick",
    subtitle: "Jogos e direção",
    icon: <IconGamepad className="h-7 w-7" />,
    tone: "bg-indigo-50 text-indigo-800 ring-indigo-100",
  },
  {
    id: "mouse",
    title: "Mouse",
    subtitle: "Cursor e clique",
    icon: <IconTouch className="h-7 w-7" />,
    tone: "bg-cyan-50 text-cyan-800 ring-cyan-100",
  },
  {
    id: "som-sopro",
    title: "Som ou sopro",
    subtitle: "Microfone, voz ou sopro",
    icon: <IconMotion className="h-7 w-7" />,
    tone: "bg-rose-50 text-rose-900 ring-rose-100",
  },
  {
    id: "movimento",
    title: "Movimento do celular",
    subtitle: "Inclinar para acionar",
    icon: <IconMotion className="h-7 w-7" />,
    tone: "bg-lime-50 text-lime-900 ring-lime-100",
  },
  {
    id: "acessibilidade",
    title: "Acessibilidade",
    subtitle: "Ajustes de uso",
    icon: <IconMotion className="h-7 w-7" />,
    tone: "bg-amber-50 text-amber-900 ring-amber-100",
  },
  {
    id: "olhar",
    title: "Olhar",
    subtitle: "Integração futura",
    icon: <IconEye className="h-7 w-7" />,
    tone: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  },
];

function SessionCodeField({
  value,
  onChange,
  label = "Código para conectar o celular à Tela Grande",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value.toUpperCase())}
        inputMode="text"
        maxLength={12}
        className={`mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-center text-xl font-black tracking-widest text-zinc-950 shadow-sm ${focusRing}`}
        aria-label="Código para conectar o celular à Tela Grande"
      />
    </label>
  );
}

function CommandButton({
  label,
  detail,
  mode,
  className,
  onSend,
}: {
  label: string;
  detail: string;
  mode: string;
  className?: string;
  onSend: (label: string, detail: string, mode: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSend(label, detail, mode)}
      className={`flex min-h-20 min-w-0 flex-col justify-center rounded-lg border px-3 py-3 text-left shadow-sm transition active:scale-[0.99] ${focusRing} ${className}`}
    >
      <span className="block hyphens-none break-words text-lg font-black leading-tight [overflow-wrap:break-word]">{label}</span>
      <span className="mt-1 block hyphens-none break-words text-sm font-semibold leading-snug opacity-80 [overflow-wrap:break-word]">{detail}</span>
    </button>
  );
}

/** Botão compacto e quadrado para o pad direcional do joystick. */
function PadButton({
  arrow,
  label,
  tone = "border-indigo-200 bg-indigo-50 text-indigo-950",
  onClick,
}: {
  arrow: string;
  label: string;
  tone?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex aspect-square min-w-0 flex-col items-center justify-center rounded-xl border text-center shadow-sm transition active:scale-[0.97] ${focusRing} ${tone}`}
    >
      <span className="text-2xl font-black leading-none">{arrow}</span>
      <span className="mt-1 text-[11px] font-bold leading-none">{label}</span>
    </button>
  );
}

function MicrophoneSensorPanel({
  onSend,
}: {
  onSend: (label: string, detail: string, mode: string) => void;
}) {
  const [listening, setListening] = useState(false);
  const [level, setLevel] = useState(0);
  const [threshold, setThreshold] = useState(42);
  const [error, setError] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTriggerRef = useRef(0);

  const stopListening = useCallback(() => {
    if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    void audioContextRef.current?.close();
    audioContextRef.current = null;
    setListening(false);
    setLevel(0);
  }, []);

  const startListening = useCallback(async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error("AudioContext indisponível neste navegador.");
      }
      const audioContext = new AudioContextClass();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);

      const samples = new Uint8Array(analyser.fftSize);
      streamRef.current = stream;
      audioContextRef.current = audioContext;
      setListening(true);

      const tick = () => {
        analyser.getByteTimeDomainData(samples);
        let sum = 0;
        for (const sample of samples) {
          const centered = sample - 128;
          sum += centered * centered;
        }
        const rms = Math.sqrt(sum / samples.length);
        const nextLevel = Math.min(100, Math.round((rms / 42) * 100));
        setLevel(nextLevel);

        const now = Date.now();
        if (nextLevel >= threshold && now - lastTriggerRef.current > 1200) {
          lastTriggerRef.current = now;
          onSend("Som/sopro detectado", `Intensidade ${nextLevel}%`, "Som/Sopro");
          if ("vibrate" in navigator) navigator.vibrate?.([40, 30, 40]);
        }

        animationRef.current = window.requestAnimationFrame(tick);
      };

      tick();
    } catch {
      setError("Não foi possível acessar o microfone. Verifique a permissão do navegador.");
      stopListening();
    }
  }, [onSend, stopListening, threshold]);

  useEffect(() => stopListening, [stopListening]);

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
        <p className="text-sm font-black uppercase tracking-wide text-rose-900">
          Microfone como acionador
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-rose-950">
          Use som, vocalização ou sopro próximo ao microfone para enviar um comando
          quando a intensidade passar do limite configurado.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-zinc-500">
              Intensidade
            </p>
            <p className="text-3xl font-black text-zinc-950">{level}%</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-black ${
              listening ? "bg-green-100 text-green-800" : "bg-zinc-100 text-zinc-600"
            }`}
          >
            {listening ? "Escutando" : "Pausado"}
          </span>
        </div>
        <div className="mt-4 h-5 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-rose-600 transition-all"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>

      <label className="block rounded-xl border border-zinc-200 bg-white p-4">
        <span className="text-sm font-black uppercase tracking-wide text-zinc-500">
          Limite de acionamento: {threshold}%
        </span>
        <input
          type="range"
          min="10"
          max="90"
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
          className="mt-3 w-full"
        />
      </label>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={listening ? stopListening : startListening}
          className={`min-h-16 rounded-lg px-4 py-3 text-center text-base font-black text-white ${
            listening ? "bg-zinc-700 hover:bg-zinc-800" : "bg-rose-600 hover:bg-rose-700"
          } ${focusRing}`}
        >
          {listening ? "Parar" : "Ativar microfone"}
        </button>
        <CommandButton
          label="Simular sopro"
          detail="Enviar teste"
          mode="Som/Sopro"
          className="border-rose-200 bg-white text-rose-950 text-center"
          onSend={onSend}
        />
      </div>
    </div>
  );
}

function MotionSensorPanel({
  onSend,
}: {
  onSend: (label: string, detail: string, mode: string) => void;
}) {
  const [active, setActive] = useState(false);
  const [gamma, setGamma] = useState(0);
  const [shake, setShake] = useState(0);
  const [sens, setSens] = useState(22);
  const [error, setError] = useState("");

  const sensRef = useRef(sens);
  useEffect(() => { sensRef.current = sens; }, [sens]);
  const onSendRef = useRef(onSend);
  useEffect(() => { onSendRef.current = onSend; }, [onSend]);

  const lastTriggerRef = useRef(0);
  const prevAccelRef = useRef<{ x: number; y: number; z: number } | null>(null);

  // Handlers estáveis (criados uma vez), lendo valores atuais de refs.
  const handlersRef = useRef<{
    orient: (e: DeviceOrientationEvent) => void;
    motion: (e: DeviceMotionEvent) => void;
  } | null>(null);
  if (!handlersRef.current) {
    const fire = (label: string, detail: string) => {
      const now = Date.now();
      if (now - lastTriggerRef.current < 1100) return;
      lastTriggerRef.current = now;
      onSendRef.current(label, detail, "Movimento");
      if ("vibrate" in navigator) navigator.vibrate?.(40);
    };
    handlersRef.current = {
      orient: (e) => {
        const g = e.gamma ?? 0; // esquerda(-) / direita(+)
        setGamma(Math.round(g));
        const t = sensRef.current;
        if (g <= -t) fire("Inclinar esquerda", `Giro ${Math.round(g)}°`);
        else if (g >= t) fire("Inclinar direita", `Giro ${Math.round(g)}°`);
      },
      motion: (e) => {
        const a = e.accelerationIncludingGravity;
        if (!a || a.x == null) return;
        const cur = { x: a.x ?? 0, y: a.y ?? 0, z: a.z ?? 0 };
        const prev = prevAccelRef.current;
        prevAccelRef.current = cur;
        if (!prev) return;
        const d = Math.sqrt(
          (cur.x - prev.x) ** 2 + (cur.y - prev.y) ** 2 + (cur.z - prev.z) ** 2,
        );
        setShake(Math.round(d));
        if (d > 16) fire("Agitar", "Pedir ajuda ou repetir");
      },
    };
  }

  const stop = useCallback(() => {
    const h = handlersRef.current;
    if (h) {
      window.removeEventListener("deviceorientation", h.orient);
      window.removeEventListener("devicemotion", h.motion);
    }
    prevAccelRef.current = null;
    setActive(false);
    setGamma(0);
    setShake(0);
  }, []);

  const start = useCallback(async () => {
    setError("");
    try {
      const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> } | undefined;
      const DME = window.DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> } | undefined;
      if (typeof window.DeviceOrientationEvent === "undefined" && typeof window.DeviceMotionEvent === "undefined") {
        throw new Error("Este aparelho/navegador não oferece sensores de movimento.");
      }
      // iOS 13+ exige permissão a partir de um toque do usuário.
      if (DOE && typeof DOE.requestPermission === "function") {
        const p = await DOE.requestPermission();
        if (p !== "granted") throw new Error("Permissão de movimento negada nas configurações do navegador.");
      }
      if (DME && typeof DME.requestPermission === "function") {
        try { await DME.requestPermission(); } catch { /* alguns só pedem a de orientação */ }
      }
      const h = handlersRef.current!;
      window.addEventListener("deviceorientation", h.orient);
      window.addEventListener("devicemotion", h.motion);
      setActive(true);
    } catch (e) {
      setError((e as Error).message || "Não foi possível acessar os sensores de movimento.");
      stop();
    }
  }, [stop]);

  useEffect(() => stop, [stop]);

  const lado = gamma <= -sens ? "Esquerda" : gamma >= sens ? "Direita" : "Centro";

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-lime-200 bg-lime-50 p-4">
        <p className="text-sm font-black uppercase tracking-wide text-lime-900">
          Movimento do celular
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-lime-950">
          Incline o celular para a esquerda ou direita, ou agite, para enviar um
          comando. Toque em “Ativar movimento” e permita o uso dos sensores.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-zinc-500">Inclinação</p>
            <p className="text-3xl font-black text-zinc-950">{gamma}°</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-black ${active ? "bg-green-100 text-green-800" : "bg-zinc-100 text-zinc-600"}`}>
            {active ? `Ativo · ${lado}` : "Pausado"}
          </span>
        </div>
        <div className="mt-4 flex h-5 overflow-hidden rounded-full bg-zinc-100" aria-hidden="true">
          <div className="flex-1 border-r border-zinc-300" />
          <div className="flex-1" />
        </div>
        <p className="mt-3 text-sm font-black uppercase tracking-wide text-zinc-500">
          Agitar: <span className="text-zinc-950">{shake}</span>
        </p>
      </div>

      <label className="block rounded-xl border border-zinc-200 bg-white p-4">
        <span className="text-sm font-black uppercase tracking-wide text-zinc-500">
          Sensibilidade (inclinação para acionar): {sens}°
        </span>
        <input
          type="range"
          min="10"
          max="45"
          value={sens}
          onChange={(event) => setSens(Number(event.target.value))}
          className="mt-3 w-full"
        />
      </label>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">{error}</p>
      ) : null}

      <button
        type="button"
        onClick={active ? stop : start}
        className={`min-h-16 rounded-lg px-4 py-3 text-center text-base font-black text-white ${active ? "bg-zinc-700 hover:bg-zinc-800" : "bg-lime-600 hover:bg-lime-700"} ${focusRing}`}
      >
        {active ? "Parar" : "Ativar movimento"}
      </button>

      <div className="grid grid-cols-2 gap-2">
        {[
          ["Inclinar esquerda", "Comando lateral"],
          ["Inclinar direita", "Comando lateral"],
          ["Agitar", "Pedir ajuda"],
        ].map(([label, detail]) => (
          <CommandButton
            key={label}
            label={label}
            detail={detail}
            mode="Movimento"
            className="border-lime-200 bg-white text-lime-950"
            onSend={onSend}
          />
        ))}
      </div>
    </div>
  );
}

function PhoneShell({
  children,
  sessionCode,
  setSessionCode,
  deviceName,
  setDeviceName,
  deviceRole,
  setDeviceRole,
  tecnicoAberto = false,
  naInicial = false,
}: {
  children: ReactNode;
  sessionCode: string;
  setSessionCode: (value: string) => void;
  deviceName: string;
  setDeviceName: (value: string) => void;
  deviceRole: DeviceRole;
  setDeviceRole: (value: DeviceRole) => void;
  tecnicoAberto?: boolean;
  naInicial?: boolean;
}) {
  const [confirmado, setConfirmado] = useState(false);
  return (
    <div className="mx-auto w-full min-w-0 max-w-[26rem] overflow-hidden rounded-[2rem] border-4 border-zinc-950 bg-zinc-950 shadow-2xl shadow-blue-950/25 sm:border-[10px]">
      <div className="overflow-hidden rounded-[1.35rem] bg-[#F6F8FB]">
        <div className="flex items-center justify-between border-b border-blue-100 bg-white px-5 py-4">
          <Link
            href="/davi-intercel"
            className={`rounded-lg px-2 py-1 text-2xl font-black text-blue-800 ${focusRing}`}
            aria-label="Voltar para DAVI InterCel"
          >
            DAVI
          </Link>
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-wide text-blue-700">
              InterCel
            </p>
            <p className="text-[11px] font-semibold text-zinc-500">
              Controle assistivo
            </p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-black text-white">
            ON
          </span>
        </div>

        {naInicial && (
          <div className="border-b border-blue-100 bg-white px-5 py-4">
            <SessionCodeField
              value={sessionCode}
              onChange={(v) => { setSessionCode(v); setConfirmado(false); }}
              label="Código da Tela Grande"
            />
            <button
              type="button"
              onClick={() => setConfirmado(true)}
              className={`mt-3 w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-black text-white hover:bg-blue-800 ${focusRing}`}
            >
              {confirmado ? "✓ Conectado" : "Conectar"}
            </button>
            <p className="mt-2 text-xs font-semibold leading-5 text-zinc-500">
              Digite o código exibido na Tela Grande ou acesse pelo QR Code.
            </p>
          </div>
        )}

        <details open={tecnicoAberto} className="border-b border-blue-100 px-5 py-3">
          <summary className={`cursor-pointer list-none rounded-lg px-1 py-1 text-xs font-black uppercase tracking-wide text-blue-700 ${focusRing}`}>
            ⚙️ Modo técnico (avançado)
          </summary>
          <div className="grid gap-3 pt-3">
            {!naInicial && <SessionCodeField value={sessionCode} onChange={setSessionCode} label="Código da Tela Grande" />}
            <label className="block">
              <span className="text-xs font-black uppercase tracking-wide text-zinc-500">
                Nome deste celular
              </span>
              <input
                value={deviceName}
                onChange={(event) => setDeviceName(event.target.value)}
                className={`mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-bold text-zinc-950 shadow-sm ${focusRing}`}
                aria-label="Nome deste celular"
              />
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-wide text-zinc-500">
                Função deste celular
              </span>
              <select
                value={deviceRole}
                onChange={(event) => setDeviceRole(normalizeRole(event.target.value))}
                className={`mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm font-black text-zinc-950 shadow-sm ${focusRing}`}
                aria-label="Função deste celular na sessão"
              >
                {Object.entries(roleLabels).map(([role, label]) => (
                  <option key={role} value={role}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </details>
        {children}
      </div>
    </div>
  );
}

function ModeHome({ setMode }: { setMode: (mode: Mode) => void }) {
  return (
    <div className="px-5 pb-5">
      <h2 className="mb-3 mt-1 text-xl font-black leading-tight text-zinc-900">
        Como você quer usar este celular?
      </h2>
      <div className="grid min-w-0 grid-cols-2 gap-3">
        {modeItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            className={`min-h-32 min-w-0 rounded-xl p-4 text-left ring-1 transition hover:-translate-y-0.5 hover:shadow-md ${focusRing} ${item.tone}`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/80 shadow-sm">
              {item.icon}
            </span>
            <span className="mt-3 block break-words text-lg font-black leading-tight">{item.title}</span>
            <span className="mt-1 block break-words text-sm font-semibold opacity-80">{item.subtitle}</span>
          </button>
        ))}
        <Link
          href="/davi-intercel/tecnico"
          className={`col-span-2 flex items-center gap-3 rounded-xl bg-zinc-100 p-4 text-left ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:shadow-md ${focusRing}`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-xl shadow-sm" aria-hidden="true">⚙️</span>
          <span>
            <span className="block text-lg font-black leading-tight text-zinc-900">Modo técnico</span>
            <span className="mt-0.5 block text-sm font-semibold text-zinc-600">Sessão, histórico, funções e diagnóstico</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

function ModePanel({
  mode,
  setMode,
  onSend,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
  onSend: (label: string, detail: string, mode: string) => void;
}) {
  const panel = useMemo(() => {
    if (mode === "sim-nao") {
      return {
        title: "Sim / Não",
        subtitle: "Escolhas rápidas com botões grandes.",
        content: (
          <div className="grid grid-cols-2 gap-3">
            <CommandButton
              label="SIM"
              detail="Confirmar escolha"
              mode="Sim / Não"
              className="border-green-700 bg-green-600 text-white"
              onSend={onSend}
            />
            <CommandButton
              label="NÃO"
              detail="Recusar escolha"
              mode="Sim / Não"
              className="border-red-700 bg-red-600 text-white"
              onSend={onSend}
            />
            <CommandButton
              label="Talvez"
              detail="Preciso pensar"
              mode="Sim / Não"
              className="border-amber-200 bg-amber-50 text-amber-950"
              onSend={onSend}
            />
            <CommandButton
              label="Ajuda"
              detail="Chamar apoio"
              mode="Sim / Não"
              className="border-blue-200 bg-blue-50 text-blue-900"
              onSend={onSend}
            />
          </div>
        ),
      };
    }

    if (mode === "comandos") {
      return {
        title: "Comandos",
        subtitle: "Controle simples para aula, vídeo ou atividade.",
        content: (
          <div className="grid gap-3">
            {[
              ["Play / Pausar", "Controlar videoaula"],
              ["Repetir", "Ouvir de novo"],
              ["Voltar", "Retornar etapa"],
              ["Avançar", "Próxima etapa"],
              ["Responder", "Enviar resposta"],
            ].map(([label, detail]) => (
              <CommandButton
                key={label}
                label={label}
                detail={detail}
                mode="Comandos"
                className="border-blue-200 bg-white text-blue-950"
                onSend={onSend}
              />
            ))}
          </div>
        ),
      };
    }

    if (mode === "joystick") {
      return {
        title: "Joystick",
        subtitle: "Direção e botões para jogos acessíveis.",
        content: (
          <div className="grid gap-4">
            <div className="mx-auto grid w-full max-w-[15rem] grid-cols-3 gap-2">
              <span />
              <PadButton arrow="↑" label="Cima" onClick={() => onSend("↑", "Cima", "Joystick")} />
              <span />
              <PadButton arrow="←" label="Esquerda" onClick={() => onSend("←", "Esquerda", "Joystick")} />
              <PadButton arrow="OK" label="Ação" tone="border-green-700 bg-green-600 text-white" onClick={() => onSend("OK", "Ação", "Joystick")} />
              <PadButton arrow="→" label="Direita" onClick={() => onSend("→", "Direita", "Joystick")} />
              <span />
              <PadButton arrow="↓" label="Baixo" onClick={() => onSend("↓", "Baixo", "Joystick")} />
              <span />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <CommandButton label="A" detail="Selecionar" mode="Joystick" className="border-blue-700 bg-blue-600 text-white text-center" onSend={onSend} />
              <CommandButton label="B" detail="Voltar" mode="Joystick" className="border-red-700 bg-red-600 text-white text-center" onSend={onSend} />
            </div>
          </div>
        ),
      };
    }

    if (mode === "mouse") {
      return {
        title: "Mouse",
        subtitle: "Touchpad demonstrativo para cursor e clique.",
        content: (
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => onSend("Mover cursor", "Toque no touchpad", "Mouse")}
              className={`flex h-56 items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 text-center text-lg font-black text-blue-900 ${focusRing}`}
            >
              Área de toque
            </button>
            <div className="grid grid-cols-2 gap-3">
              <CommandButton label="Clique" detail="Selecionar" mode="Mouse" className="border-blue-200 bg-white text-blue-950 text-center" onSend={onSend} />
              <CommandButton label="Arrastar" detail="Segurar e mover" mode="Mouse" className="border-blue-200 bg-white text-blue-950 text-center" onSend={onSend} />
            </div>
          </div>
        ),
      };
    }

    if (mode === "comunicacao") {
      return {
        title: "Comunicação",
        subtitle: "Frases rápidas para expressão inicial.",
        content: (
          <div className="grid grid-cols-2 gap-3">
            {["Quero água", "Estou com dor", "Preciso de ajuda", "Quero parar", "Gostei", "Não gostei"].map((label) => (
              <CommandButton
                key={label}
                label={label}
                detail="Falar mensagem"
                mode="Comunicação"
                className="border-violet-200 bg-white text-violet-950"
                onSend={onSend}
              />
            ))}
          </div>
        ),
      };
    }

    if (mode === "escrita") {
      return {
        title: "Escrita",
        subtitle: "Entrada simples para letras, sílabas e palavras.",
        content: (
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => setMode("escrita-guiada")}
              className={`flex items-center gap-3 rounded-xl border-2 border-blue-300 bg-blue-50 p-4 text-left ${focusRing}`}
            >
              <span className="text-2xl" aria-hidden="true">✍️</span>
              <span>
                <span className="block text-base font-black text-blue-900">Escrita guiada (cursiva)</span>
                <span className="block text-sm font-semibold text-blue-700">Escreva por cima do modelo pontilhado</span>
              </span>
            </button>
            <div className="rounded-xl border border-blue-200 bg-white p-4">
              <p className="text-sm font-black uppercase tracking-wide text-blue-700">Treino</p>
              <p className="mt-2 rounded-lg border border-dashed border-blue-200 bg-blue-50 px-4 py-6 text-center text-5xl font-black text-blue-800">
                ba be bi
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["BA", "BE", "BI", "BO", "BU", "OK"].map((label) => (
                <CommandButton
                  key={label}
                  label={label}
                  detail={label === "OK" ? "Enviar" : "Inserir"}
                  mode="Escrita"
                  className="border-blue-200 bg-white text-blue-950 text-center"
                  onSend={onSend}
                />
              ))}
            </div>
          </div>
        ),
      };
    }

    if (mode === "escrita-guiada") {
      return {
        title: "Escrita guiada",
        subtitle: "Siga o modelo pontilhado com o dedo.",
        content: <EscritaGuiada onSend={onSend} onVoltar={() => setMode("escrita")} />,
      };
    }

    if (mode === "olhar") {
      return {
        title: "Olhar",
        subtitle: "Integração futura com DAVI Vision e rastreamento ocular.",
        content: (
          <div className="grid gap-3">
            {[
              ["Selecionar alvo", "Escolha por permanência"],
              ["Confirmar", "Piscar ou permanecer"],
              ["Pausar rastreio", "Descanso visual"],
              ["Recalibrar", "Ajustar posição"],
            ].map(([label, detail]) => (
              <CommandButton
                key={label}
                label={label}
                detail={detail}
                mode="Olhar"
                className="border-emerald-200 bg-white text-emerald-950"
                onSend={onSend}
              />
            ))}
          </div>
        ),
      };
    }

    if (mode === "movimento") {
      return {
        title: "Movimento do celular",
        subtitle: "Incline ou agite o celular para enviar comandos.",
        content: <MotionSensorPanel onSend={onSend} />,
      };
    }

    if (mode === "som-sopro") {
      return {
        title: "Sensor de som/sopro",
        subtitle: "Use o microfone do celular como acionador assistivo.",
        content: <MicrophoneSensorPanel onSend={onSend} />,
      };
    }

    return {
      title: "Acessibilidade",
      subtitle: "Preferências que reduzem barreiras de uso.",
      content: (
        <div className="grid gap-3">
          {[
            ["Botões maiores", "Aumentar área de toque"],
            ["Alto contraste", "Reforçar leitura visual"],
            ["Varredura", "Navegação automática"],
            ["Toque longo", "Evitar toque acidental"],
          ].map(([label, detail]) => (
            <CommandButton
              key={label}
              label={label}
              detail={detail}
              mode="Acessibilidade"
              className="border-amber-200 bg-white text-amber-950"
              onSend={onSend}
            />
          ))}
        </div>
      ),
    };
  }, [mode, onSend, setMode]);

  return (
    <div className="px-5 pb-5">
      <div className="mb-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setMode("inicio")}
          className={`min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-black text-blue-800 hover:border-blue-400 ${focusRing}`}
        >
          ← Todos os recursos
        </button>
        <Link
          href="/davi-intercel"
          className={`shrink-0 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-black text-zinc-800 hover:border-blue-400 hover:text-blue-800 ${focusRing}`}
          aria-label="Voltar à tela principal do DAVI InterCel"
        >
          ⌂ Início
        </Link>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-black leading-tight text-zinc-950">{panel.title}</h2>
        <p className="mt-1 text-sm font-semibold leading-snug text-zinc-600">{panel.subtitle}</p>
        <div className="mt-4">{panel.content}</div>
      </div>
    </div>
  );
}

function CommandLog({ commands }: { commands: Command[] }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-zinc-500">
        Últimas ações
      </p>
      <div className="mt-3 grid gap-2">
        {commands.length ? (
          commands.slice(0, 4).map((command) => (
            <div
              key={command.id}
              className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2"
            >
              <p className="text-sm font-black text-zinc-950">{command.label}</p>
              <p className="text-xs font-semibold text-zinc-500">
                {command.mode} · {command.deviceName} · {command.createdAt}
              </p>
            </div>
          ))
        ) : (
          <p className="rounded-lg bg-zinc-50 px-3 py-4 text-sm font-semibold text-zinc-500">
            Nenhum comando enviado ainda.
          </p>
        )}
      </div>
    </div>
  );
}

export function InterCelControlPrototype({
  modoForcado,
  tecnico = false,
}: {
  /** Abre direto em um modo específico (usado pelas sub-rotas). */
  modoForcado?: Mode;
  /** Abre a área técnica já expandida. */
  tecnico?: boolean;
} = {}) {
  const initialParams = useInitialControlParams();
  const deviceId = useStableDeviceId();
  const [sessionCode, setSessionCode] = useState(defaultSession);
  const [deviceRole, setDeviceRole] = useState<DeviceRole>("controle-geral");
  const [deviceName, setDeviceName] = useState("Celular 1");
  const [mode, setMode] = useState<Mode>(modoForcado ?? "inicio");
  const { commands, sendCommand, announceDevice, realtime } = useInterCelCommands(
    sessionCode,
    deviceName || roleLabels[deviceRole],
    deviceRole,
  );

  useEffect(() => {
    const loadParams = window.setTimeout(() => {
      setSessionCode(initialParams.sessionCode);
      setDeviceRole(initialParams.role);
      // Respeita o modo forçado pela sub-rota; senão, segue o papel da URL.
      if (!modoForcado) setMode(roleDefaultMode[initialParams.role]);
      setDeviceName(roleLabels[initialParams.role]);
    }, 0);

    return () => window.clearTimeout(loadParams);
  }, [initialParams, modoForcado]);

  useEffect(() => {
    if (!deviceId) return;
    announceDevice(deviceId, deviceName || roleLabels[deviceRole], deviceRole);
  }, [announceDevice, deviceId, deviceName, deviceRole]);

  function handleRoleChange(role: DeviceRole) {
    setDeviceRole(role);
    setMode(roleDefaultMode[role]);
    setDeviceName((current) => current || roleLabels[role]);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#EEF5FF] px-4 py-6 text-zinc-950 sm:px-6">
      <div className="mx-auto grid w-full min-w-0 max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="hidden min-w-0 lg:block">
          <p className="text-sm font-black uppercase tracking-wide text-blue-800">
            DAVI InterCel
          </p>
          <h1 className="mt-3 max-w-2xl break-words text-3xl font-black leading-tight text-zinc-950 sm:text-5xl">
            Use o celular como controle
          </h1>
          <p className="mt-4 max-w-2xl break-words text-lg font-semibold leading-8 text-zinc-700">
            Escolha no celular o que você quer fazer: Sim/Não, controlar a aula,
            escrever, comunicação, joystick, mouse, som/sopro ou movimento.
          </p>
          <div className="mt-6 rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-lg font-black text-zinc-950">Como usar</p>
            <ol className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-zinc-700">
              <li>1. Abra o <strong>Painel</strong> no computador, TV ou tablet.</li>
              <li>2. Leia o QR Code com o celular.</li>
              <li>3. Escolha o que o celular vai fazer.</li>
              <li>4. Use os botões grandes para controlar a atividade.</li>
            </ol>
            <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/davi-intercel/sessao"
                className={`rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 ${focusRing}`}
              >
                Abrir Painel
              </Link>
              <Link
                href="/davi-intercel"
                className={`rounded-lg border border-zinc-300 bg-white px-5 py-3 text-center text-sm font-black text-zinc-900 hover:border-blue-400 hover:text-blue-800 ${focusRing}`}
              >
                Voltar ao módulo
              </Link>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500">
            Este ainda é um protótipo. Nesta versão, alguns comandos funcionam
            melhor no mesmo navegador/dispositivo porque ainda usam o
            armazenamento local. A próxima etapa usará Supabase Realtime ou
            WebSocket para comunicação real entre celular e computador.
          </p>
        </section>

        <section className="min-w-0" aria-label="Controle DAVI InterCel">
          <div className="mx-auto mb-4 flex w-full max-w-[26rem] flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black text-zinc-700 ring-1 ring-zinc-200">
              <span className={`h-2.5 w-2.5 rounded-full ${realtime === "on" ? "bg-green-500" : realtime === "connecting" ? "animate-pulse bg-amber-500" : "bg-zinc-400"}`} />
              {realtime === "on" ? "Tempo real conectado" : realtime === "connecting" ? "Conectando…" : "Sem tempo real"}
            </span>
            <Link
              href="/davi-intercel/sessao"
              className={`rounded-full bg-blue-700 px-3 py-1 text-xs font-black text-white hover:bg-blue-800 ${focusRing}`}
            >
              Abrir Painel
            </Link>
          </div>
          <PhoneShell
            sessionCode={sessionCode}
            setSessionCode={setSessionCode}
            deviceName={deviceName}
            setDeviceName={setDeviceName}
            deviceRole={deviceRole}
            setDeviceRole={handleRoleChange}
            tecnicoAberto={tecnico}
            naInicial={mode === "inicio"}
          >
            {mode === "inicio" ? (
              <ModeHome setMode={setMode} />
            ) : (
              <ModePanel mode={mode} setMode={setMode} onSend={sendCommand} />
            )}
          </PhoneShell>
          <div className="mx-auto mt-5 w-full max-w-[26rem]">
            <CommandLog commands={commands} />
          </div>
        </section>
      </div>
    </main>
  );
}

export function InterCelSessionReceiver() {
  const [sessionCode, setSessionCode] = useState(defaultSession);
  const { commands, devices, clearCommands, sendCommand, realtime } = useInterCelCommands(
    sessionCode,
    "Demonstração",
    "controle-geral",
  );
  const generalControlUrl = makeControlUrl(sessionCode);
  const [copiado, setCopiado] = useState(false);

  // Ação em destaque: comandos momentâneos somem após 2s e voltam ao "aguardando".
  const [highlight, setHighlight] = useState<Command | null>(null);
  const [esperandoMsg, setEsperandoMsg] = useState<string | null>(null);
  const seenIdRef = useRef<string | null>(null);
  const highlightTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const newest = commands[0];
    if (!newest || newest.id === seenIdRef.current) return;
    seenIdRef.current = newest.id;
    if (highlightTimerRef.current) window.clearTimeout(highlightTimerRef.current);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reage a um novo comando recebido
    setHighlight(newest);
    setEsperandoMsg(null);
    // Texto/escrita ficam visíveis; o resto é momentâneo e some após 2s.
    const momentaneo = !/escrita/i.test(newest.mode);
    if (momentaneo) {
      highlightTimerRef.current = window.setTimeout(() => {
        setHighlight(null);
        setEsperandoMsg(
          /som|sopro/i.test(newest.mode)
            ? "Aguardando próximo som/sopro…"
            : "Aguardando próxima ação…",
        );
      }, 2000);
    }
  }, [commands]);

  useEffect(
    () => () => {
      if (highlightTimerRef.current) window.clearTimeout(highlightTimerRef.current);
    },
    [],
  );

  async function copiarLink() {
    const url = typeof window !== "undefined" ? new URL(generalControlUrl, window.location.origin).href : generalControlUrl;
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* clipboard indisponível — ignora */
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-zinc-800 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-green-400">
              Painel
            </p>
            <h1 className="mt-2 text-4xl font-black">Painel DAVI InterCel</h1>
            <p className="mt-2 max-w-2xl text-zinc-300">
              Deixe esta tela aberta no computador, TV ou tablet. Use o celular
              para enviar comandos.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs font-black">
              <span className={`h-2.5 w-2.5 rounded-full ${realtime === "on" ? "bg-green-400" : realtime === "connecting" ? "animate-pulse bg-amber-400" : "bg-zinc-500"}`} />
              {realtime === "on"
                ? "Conectado em tempo real"
                : realtime === "connecting"
                ? "Conectando em tempo real…"
                : "Tempo real indisponível — só no mesmo aparelho"}
            </p>
          </div>
          <div className="w-full max-w-xs">
            <SessionCodeField value={sessionCode} onChange={setSessionCode} />
          </div>
        </div>

        <section className="grid gap-6 py-8 lg:grid-cols-3">
          {/* Conectar: QR grande + código */}
          <div className="rounded-2xl border border-zinc-800 bg-white p-6 text-zinc-950">
            <p className="text-sm font-black uppercase tracking-wide text-blue-800">
              1. Leia o QR Code com o celular
            </p>
            <div className="mt-5 flex flex-col items-center gap-4">
              {/* QR externo do protótipo; quando virar recurso final, trocar por gerador local. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrImageUrl(generalControlUrl)}
                alt={`QR Code para conectar o celular ao Painel DAVI InterCel (código ${sessionCode})`}
                width={240}
                height={240}
                className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm"
              />
              <p className="text-center text-sm font-semibold text-zinc-600">
                Código para conectar o celular
              </p>
              <p className="rounded-xl bg-zinc-100 px-6 py-2 text-3xl font-black tracking-widest text-zinc-950">
                {sessionCode}
              </p>
              <div className="grid w-full gap-2">
                <a
                  href={generalControlUrl}
                  className={`inline-flex justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-black text-white hover:bg-blue-800 ${focusRing}`}
                >
                  Abrir controle no celular
                </a>
                <button
                  type="button"
                  onClick={copiarLink}
                  className={`inline-flex justify-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-black text-zinc-800 hover:border-blue-400 hover:text-blue-800 ${focusRing}`}
                >
                  {copiado ? "✓ Link copiado" : "Copiar link do controle"}
                </button>
              </div>
            </div>
          </div>

          {/* Última ação recebida */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${highlight ? "bg-green-400" : "animate-pulse bg-amber-400"}`} />
              <p className="text-sm font-black uppercase tracking-wide text-zinc-300">
                Última ação recebida
              </p>
            </div>
            {highlight ? (
              <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-8 transition-opacity duration-300">
                <p className="text-6xl font-black text-green-300">{highlight.label}</p>
                <p className="mt-4 text-2xl font-bold text-white">{highlight.detail}</p>
                <p className="mt-3 text-sm font-black uppercase tracking-wide text-green-200">
                  {highlight.mode} · {highlight.deviceName} · {highlight.createdAt}
                </p>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-center text-zinc-400">
                <p className="text-3xl font-black text-white">
                  {esperandoMsg ?? "Aguardando primeira ação"}
                </p>
                <p className="mt-2 text-lg">
                  {esperandoMsg
                    ? "Pronto para o próximo acionamento."
                    : "Conecte um celular e envie um comando para vê-lo aqui."}
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => sendCommand("SIM", "Demonstração", "Demonstração")}
              className={`mt-5 inline-flex rounded-lg bg-green-500 px-5 py-3 text-sm font-black text-zinc-950 hover:bg-green-400 ${focusRing}`}
            >
              ▶ Ver demonstração
            </button>
          </div>

          {/* Celulares conectados */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm font-black uppercase tracking-wide text-zinc-300">
              Celulares conectados
            </p>
            <div className="mt-4 grid gap-3">
              {devices.length ? (
                devices.map((device) => (
                  <article key={device.id} className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-black text-white">{device.name}</p>
                      <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-black text-green-300">conectado</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-zinc-400">
                      {roleLabels[device.role]} · ativo às {device.lastSeen}
                    </p>
                  </article>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-6 text-center">
                  <p className="text-lg font-black text-white">Esperando um celular conectar…</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-400">
                    Leia o QR Code com o celular para começar.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Últimas ações (histórico) */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-black uppercase tracking-wide text-zinc-300">Últimas ações</p>
            <button
              type="button"
              onClick={clearCommands}
              className={`rounded-lg border border-zinc-700 px-4 py-2 text-sm font-black text-zinc-200 hover:border-zinc-500 ${focusRing}`}
            >
              Limpar
            </button>
          </div>
          {commands.length ? (
            <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {commands.map((command) => (
                <li key={command.id} className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-lg font-black text-white">{command.label}</p>
                    <span className="text-xs font-black text-zinc-400">{command.createdAt}</span>
                  </div>
                  <p className="text-sm font-semibold text-zinc-400">{command.detail}</p>
                  <p className="mt-2 text-xs font-black uppercase tracking-wide text-zinc-500">
                    {roleLabels[command.deviceRole]} · {command.deviceName}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-5 rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-6 text-center font-semibold text-zinc-400">
              Aguardando primeira ação.
            </p>
          )}
        </section>

        {/* Opções avançadas (modo técnico) */}
        <details className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <summary className={`cursor-pointer list-none text-sm font-black uppercase tracking-wide text-zinc-300 ${focusRing}`}>
            ⚙️ Opções avançadas (modo técnico)
          </summary>
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-white p-6 text-zinc-950">
            <p className="text-sm font-black uppercase tracking-wide text-blue-800">
              Abrir o celular com uma função específica
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {roleOptions.map((option) => {
                const href = makeControlUrl(sessionCode, option.role);
                return (
                  <a
                    key={option.role}
                    href={href}
                    className={`rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-left hover:border-blue-300 hover:bg-blue-50 ${focusRing}`}
                  >
                    <span className="block text-sm font-black text-zinc-950">{option.title}</span>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-zinc-600">{option.description}</span>
                  </a>
                );
              })}
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-zinc-400">
            Conexão entre dispositivos: o DAVI InterCel já usa <strong>Supabase Realtime</strong>
            {" "}para enviar comandos do celular ao Painel em tempo real. O armazenamento
            local (localStorage) é mantido como histórico e reserva no mesmo aparelho.
          </p>
        </details>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/davi-intercel/controle"
            className={`rounded-lg bg-green-500 px-5 py-3 text-sm font-black text-zinc-950 hover:bg-green-400 ${focusRing}`}
          >
            Abrir controle no celular
          </Link>
          <Link
            href="/davi-intercel"
            className={`rounded-lg border border-zinc-700 px-5 py-3 text-sm font-black text-white hover:border-green-400 ${focusRing}`}
          >
            Voltar ao DAVI InterCel
          </Link>
        </div>
      </div>
    </main>
  );
}

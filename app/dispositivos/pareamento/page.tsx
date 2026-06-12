"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PageHero, PageShell } from "../../components/SiteShell";

// ─── Tipos mínimos para Web Bluetooth (não incluídos no lib.dom desta config) ─
interface BLECharacteristic extends EventTarget {
  value?: DataView;
  startNotifications(): Promise<BLECharacteristic>;
}

interface BLEService {
  getCharacteristic(uuid: string): Promise<BLECharacteristic>;
}

interface BLEGATTServer {
  connected: boolean;
  connect(): Promise<BLEGATTServer>;
  getPrimaryService(uuid: string): Promise<BLEService>;
  disconnect(): void;
}

interface BLEDevice extends EventTarget {
  name?: string;
  gatt?: BLEGATTServer;
}

interface BluetoothAPI {
  requestDevice(options: {
    filters: Array<{ name?: string }>;
    optionalServices?: string[];
  }): Promise<BLEDevice>;
}

declare global {
  interface Navigator {
    bluetooth?: BluetoothAPI;
  }
}

// ─── BLE UUIDs do dispositivo GAIA ────────────────────────────────────────────
const SERVICE_UUID = "19b10000-e8f2-537e-4f6c-d104768a1214";
const SENSOR_UUID = "19b10001-e8f2-537e-4f6c-d104768a1214";
const CO2_UUID = "19b10003-e8f2-537e-4f6c-d104768a1214";
const ACCESSPAD_UUID = "19b10004-e8f2-537e-4f6c-d104768a1214";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type ConnectionStatus = "idle" | "scanning" | "connected" | "error" | "cancelled";

type OrientationData = {
  roll?: number;
  pitch?: number;
  yaw?: number;
  quat_w?: number;
  quat_x?: number;
  quat_y?: number;
  quat_z?: number;
};

type CommandData = {
  tipo?: string;
  valor?: string;
  comando?: string;
};

type LogEntry = {
  id: number;
  time: string;
  source: "Sistema" | "Sensor" | "CO2" | "Accesspad";
  text: string;
};

// ─── Constantes de UI ─────────────────────────────────────────────────────────
const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const STATUS_CONFIG: Record<
  ConnectionStatus,
  { label: string; color: string; dot: string }
> = {
  idle: {
    label: "Desconectado",
    color: "text-zinc-600",
    dot: "bg-zinc-400",
  },
  scanning: {
    label: "Procurando dispositivo…",
    color: "text-blue-700",
    dot: "bg-blue-500 animate-pulse",
  },
  connected: {
    label: "Conectado",
    color: "text-green-700",
    dot: "bg-green-500",
  },
  error: {
    label: "Erro na conexão",
    color: "text-red-700",
    dot: "bg-red-500",
  },
  cancelled: {
    label: "Pareamento cancelado",
    color: "text-amber-700",
    dot: "bg-amber-500",
  },
};

const LOG_SOURCE_COLOR: Record<LogEntry["source"], string> = {
  Sistema: "text-blue-400",
  Sensor: "text-green-400",
  CO2: "text-red-400",
  Accesspad: "text-amber-400",
};

const CO2_ALERT_THRESHOLD = 2000;
const MAX_LOG_ENTRIES = 100;

// ─── Componente ───────────────────────────────────────────────────────────────
export default function PareamentoPage() {
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [deviceName, setDeviceName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [orientation, setOrientation] = useState<OrientationData>({});
  const [co2, setCo2] = useState<number | null>(null);
  const [command, setCommand] = useState<CommandData>({});
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [bluetoothSupported, setBluetoothSupported] = useState<boolean | null>(null);

  const deviceRef = useRef<BLEDevice | null>(null);
  const logIdRef = useRef(0);
  const decoder = useRef(new TextDecoder());

  // Verifica suporte a Web Bluetooth após hydration
  useEffect(() => {
    setBluetoothSupported("bluetooth" in navigator);
  }, []);

  // Desconecta ao desmontar o componente
  useEffect(() => {
    return () => {
      deviceRef.current?.gatt?.disconnect();
    };
  }, []);

  const addLog = useCallback(
    (source: LogEntry["source"], text: string) => {
      logIdRef.current += 1;
      const entry: LogEntry = {
        id: logIdRef.current,
        time: new Date().toLocaleTimeString("pt-BR"),
        source,
        text,
      };
      setLogs((prev) => [entry, ...prev].slice(0, MAX_LOG_ENTRIES));
    },
    []
  );

  // Interpreta payload JSON recebido por BLE
  const processData = useCallback(
    (raw: string, source: LogEntry["source"]) => {
      addLog(source, raw);
      try {
        const data = JSON.parse(raw) as Record<string, unknown>;

        if (data.euler && typeof data.euler === "object") {
          const e = data.euler as Record<string, number>;
          setOrientation((prev) => ({
            ...prev,
            roll: e.roll,
            pitch: e.pitch,
            yaw: e.yaw,
          }));
        }

        if (data.quat && typeof data.quat === "object") {
          const q = data.quat as Record<string, number>;
          setOrientation((prev) => ({
            ...prev,
            quat_w: q.quat_w,
            quat_x: q.quat_x,
            quat_y: q.quat_y,
            quat_z: q.quat_z,
          }));
        }

        if (data.co2 && typeof data.co2 === "object") {
          const c = data.co2 as Record<string, number>;
          if (typeof c.ppm === "number") setCo2(c.ppm);
        }

        if (data.tipo !== undefined || data.valor !== undefined || data.comando !== undefined) {
          setCommand({
            tipo: typeof data.tipo === "string" ? data.tipo : undefined,
            valor: typeof data.valor === "string" ? data.valor : undefined,
            comando: typeof data.comando === "string" ? data.comando : undefined,
          });
        }
      } catch {
        // JSON inválido — payload bruto já foi registrado no log
      }
    },
    [addLog]
  );

  const handleDisconnect = useCallback(() => {
    setStatus("idle");
    setDeviceName("");
    deviceRef.current = null;
    addLog("Sistema", "Dispositivo desconectado.");
  }, [addLog]);

  async function connect() {
    if (!navigator.bluetooth) {
      setStatus("error");
      setErrorMsg(
        "Web Bluetooth não está disponível. Use Google Chrome ou Microsoft Edge."
      );
      return;
    }

    setStatus("scanning");
    setErrorMsg("");

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "GAIA_KEYPAD" }, { name: "GAIA_ACCESSPAD" }],
        optionalServices: [SERVICE_UUID],
      });

      deviceRef.current = device;
      device.addEventListener("gattserverdisconnected", handleDisconnect);

      const name = device.name ?? "Dispositivo desconhecido";
      setDeviceName(name);
      addLog("Sistema", `Conectando a "${name}"…`);

      if (!device.gatt) throw new Error("GATT não disponível neste dispositivo.");
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);

      // Tenta assinar notificações em cada característica individualmente
      const characteristics: Array<{
        uuid: string;
        source: LogEntry["source"];
      }> = [
        { uuid: SENSOR_UUID, source: "Sensor" },
        { uuid: CO2_UUID, source: "CO2" },
        { uuid: ACCESSPAD_UUID, source: "Accesspad" },
      ];

      for (const { uuid, source } of characteristics) {
        try {
          const char = await service.getCharacteristic(uuid);
          await char.startNotifications();
          char.addEventListener("characteristicvaluechanged", (e: Event) => {
            const target = e.target as BLECharacteristic;
            if (!target.value) return;
            const raw = decoder.current.decode(target.value);
            processData(raw, source);
          });
          addLog("Sistema", `Notificações ativas: ${source}`);
        } catch {
          addLog("Sistema", `Característica ${source} não disponível — ignorando.`);
        }
      }

      setStatus("connected");
      addLog("Sistema", `Conectado a "${name}" com sucesso.`);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "NotFoundError") {
        setStatus("cancelled");
        addLog("Sistema", "Pareamento cancelado pelo usuário.");
      } else {
        const msg =
          err instanceof Error ? err.message : "Erro desconhecido ao conectar.";
        setStatus("error");
        setErrorMsg(msg);
        addLog("Sistema", `Erro: ${msg}`);
      }
    }
  }

  function disconnect() {
    addLog("Sistema", "Desconectando…");
    if (deviceRef.current?.gatt?.connected) {
      deviceRef.current.gatt.disconnect();
    } else {
      handleDisconnect();
    }
  }

  const isConnected = status === "connected";
  const isScanning = status === "scanning";
  const co2Alert = co2 !== null && co2 >= CO2_ALERT_THRESHOLD;

  return (
    <PageShell>
      <PageHero
        eyebrow="Dispositivos assistivos · Pareamento Bluetooth"
        title="Dispositivo Assistivo DAVI"
        description="Conecte o teclado acessível Bluetooth para testar comandos, orientação e CO₂ em tempo real."
      />

      {/* Aviso de navegador sem suporte */}
      {bluetoothSupported === false && (
        <div
          role="alert"
          className="border-b border-amber-200 bg-amber-50 px-6 py-4"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <span className="shrink-0 text-xl" aria-hidden="true">
              ⚠
            </span>
            <p className="text-sm font-bold text-amber-900">
              Web Bluetooth não está disponível neste navegador.{" "}
              <span className="font-normal">
                Recomendamos usar o Google Chrome ou Microsoft Edge no
                computador.
              </span>
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Linha 1: Conexão + Comandos */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Card de conexão */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-black text-zinc-950">
              Conexão Bluetooth
            </h2>

            {/* Status */}
            <div className="mb-5 flex items-center gap-3">
              <span
                className={`h-3 w-3 shrink-0 rounded-full ${STATUS_CONFIG[status].dot}`}
              />
              <span className={`font-bold ${STATUS_CONFIG[status].color}`}>
                {STATUS_CONFIG[status].label}
              </span>
            </div>

            {/* Nome do dispositivo */}
            {deviceName && (
              <div className="mb-4 rounded-lg bg-blue-50 px-4 py-3">
                <p className="text-xs font-black uppercase tracking-wide text-blue-700">
                  Dispositivo conectado
                </p>
                <p className="mt-0.5 font-bold text-zinc-950">{deviceName}</p>
              </div>
            )}

            {/* Mensagem de erro */}
            {errorMsg && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
              >
                <p className="text-sm font-bold text-red-800">{errorMsg}</p>
              </div>
            )}

            {/* Botões */}
            <div className="flex flex-wrap gap-3">
              {!isConnected && (
                <button
                  type="button"
                  onClick={connect}
                  disabled={isScanning}
                  className={`rounded-xl bg-blue-700 px-6 py-3 text-base font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
                >
                  {isScanning ? "Procurando…" : "Conectar dispositivo"}
                </button>
              )}
              {isConnected && (
                <button
                  type="button"
                  onClick={disconnect}
                  className={`rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-base font-black text-red-700 hover:bg-red-100 ${focusRing}`}
                >
                  Desconectar
                </button>
              )}
            </div>

            {/* Dispositivos aceitos */}
            <div className="mt-5 rounded-lg border border-zinc-100 bg-zinc-50 p-4">
              <p className="text-xs font-bold text-zinc-500">
                Dispositivos reconhecidos
              </p>
              <p className="mt-1 font-mono text-sm text-zinc-700">
                GAIA_KEYPAD · GAIA_ACCESSPAD
              </p>
            </div>
          </div>

          {/* Card de comandos */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-black text-zinc-950">
              Último Comando
            </h2>
            <div className="space-y-3">
              {(
                [
                  { label: "Tipo", value: command.tipo },
                  { label: "Valor", value: command.valor },
                  { label: "Comando", value: command.comando },
                ] as const
              ).map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-zinc-100 bg-zinc-50 p-4"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-zinc-400">
                    {item.label}
                  </p>
                  <p
                    className={`mt-1 text-2xl font-black ${
                      item.value ? "text-blue-800" : "text-zinc-300"
                    }`}
                  >
                    {item.value ?? "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Linha 2: Orientação + CO2 */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Card de orientação */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-black text-zinc-950">
              Orientação
            </h2>

            {/* Euler */}
            <div className="mb-5 grid grid-cols-3 gap-3">
              {(
                [
                  { label: "Roll", key: "roll" },
                  { label: "Pitch", key: "pitch" },
                  { label: "Yaw", key: "yaw" },
                ] as const
              ).map(({ label, key }) => (
                <div
                  key={key}
                  className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-center"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-zinc-400">
                    {label}
                  </p>
                  <p
                    className={`mt-1 text-xl font-black tabular-nums ${
                      orientation[key] !== undefined
                        ? "text-blue-800"
                        : "text-zinc-300"
                    }`}
                  >
                    {orientation[key] !== undefined
                      ? (orientation[key] as number).toFixed(1)
                      : "—"}
                  </p>
                </div>
              ))}
            </div>

            {/* Quaternion */}
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-zinc-400">
              Quaternion
            </p>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  { label: "W", key: "quat_w" },
                  { label: "X", key: "quat_x" },
                  { label: "Y", key: "quat_y" },
                  { label: "Z", key: "quat_z" },
                ] as const
              ).map(({ label, key }) => (
                <div
                  key={key}
                  className="rounded-lg border border-zinc-100 bg-zinc-50 p-2 text-center"
                >
                  <p className="text-[10px] font-black uppercase tracking-wide text-zinc-400">
                    {label}
                  </p>
                  <p
                    className={`mt-1 text-sm font-black tabular-nums ${
                      orientation[key] !== undefined
                        ? "text-zinc-800"
                        : "text-zinc-300"
                    }`}
                  >
                    {orientation[key] !== undefined
                      ? (orientation[key] as number).toFixed(2)
                      : "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card de CO2 */}
          <div
            className={`rounded-xl border p-6 shadow-sm transition-colors ${
              co2Alert
                ? "border-red-300 bg-red-50"
                : "border-zinc-200 bg-white"
            }`}
          >
            <h2 className="mb-2 text-lg font-black text-zinc-950">CO₂</h2>

            <div className="flex flex-col items-center justify-center py-8">
              <p
                className={`text-7xl font-black tabular-nums leading-none ${
                  co2Alert
                    ? "text-red-700"
                    : co2 !== null
                    ? "text-green-700"
                    : "text-zinc-300"
                }`}
              >
                {co2 !== null ? co2.toLocaleString("pt-BR") : "—"}
              </p>
              <p className="mt-2 text-sm font-bold text-zinc-500">ppm</p>

              {co2Alert && (
                <div
                  role="alert"
                  className="mt-5 flex items-center gap-2 rounded-full border border-red-300 bg-red-100 px-5 py-2"
                >
                  <span aria-hidden="true">⚠</span>
                  <span className="text-sm font-black text-red-800">
                    Evento de CO₂ detectado!
                  </span>
                </div>
              )}

              {co2 !== null && !co2Alert && (
                <div className="mt-5 flex items-center gap-2 rounded-full border border-green-300 bg-green-100 px-5 py-2">
                  <span aria-hidden="true" className="text-green-700">
                    ✓
                  </span>
                  <span className="text-sm font-black text-green-800">
                    Nível normal
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Log de eventos */}
        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-zinc-950">
              Log de Eventos
              {logs.length > 0 && (
                <span className="ml-2 text-sm font-normal text-zinc-500">
                  ({logs.length})
                </span>
              )}
            </h2>
            {logs.length > 0 && (
              <button
                type="button"
                onClick={() => setLogs([])}
                className={`rounded-lg border border-zinc-200 px-4 py-2 text-sm font-bold text-zinc-600 hover:bg-zinc-50 ${focusRing}`}
              >
                Limpar log
              </button>
            )}
          </div>

          {logs.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-200 py-10 text-center">
              <p className="text-sm text-zinc-400">
                Nenhum evento registrado ainda.
              </p>
              <p className="mt-1 text-xs text-zinc-300">
                Conecte um dispositivo para ver os dados em tempo real.
              </p>
            </div>
          ) : (
            <div
              aria-live="polite"
              aria-label="Log de eventos BLE"
              className="max-h-80 overflow-y-auto rounded-lg bg-zinc-950 p-4 font-mono text-xs"
            >
              {logs.map((entry) => (
                <div key={entry.id} className="mb-1 flex gap-3">
                  <span className="shrink-0 text-zinc-500">{entry.time}</span>
                  <span
                    className={`shrink-0 font-bold ${LOG_SOURCE_COLOR[entry.source]}`}
                  >
                    [{entry.source}]
                  </span>
                  <span className="break-all text-zinc-300">{entry.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Referência de mapeamento de teclas */}
        <details className="mt-6 rounded-xl border border-zinc-200 bg-white shadow-sm">
          <summary
            className={`cursor-pointer px-6 py-4 text-sm font-black text-zinc-700 hover:bg-zinc-50 ${focusRing}`}
          >
            Referência: mapeamento de teclas do dispositivo
          </summary>
          <div className="border-t border-zinc-100 px-6 py-4">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { key: "2", action: "Cima / pitch positivo" },
                { key: "8", action: "Baixo / pitch negativo" },
                { key: "4", action: "Esquerda / yaw negativo" },
                { key: "6 / 3", action: "Direita / yaw positivo" },
                { key: "5", action: "Centralizar" },
                { key: "D", action: "CO₂ → 2100 ppm" },
                { key: "0", action: "CO₂ → 600 ppm" },
              ].map(({ key, action }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 p-3"
                >
                  <kbd className="flex h-8 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-white font-mono text-sm font-black text-zinc-800">
                    {key}
                  </kbd>
                  <span className="text-sm text-zinc-600">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    </PageShell>
  );
}

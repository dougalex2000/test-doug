"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";

// ─── Tipos mínimos Web Bluetooth ──────────────────────────────────────────────
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

// ─── BLE UUIDs ────────────────────────────────────────────────────────────────
const SERVICE_UUID = "19b10000-e8f2-537e-4f6c-d104768a1214";
const SENSOR_UUID  = "19b10001-e8f2-537e-4f6c-d104768a1214";
const CO2_UUID     = "19b10003-e8f2-537e-4f6c-d104768a1214";

const DEVICE_NAME  = "DAVI_GAIA_ACCESSPAD";

// Textura da Terra (Three.js examples — CORS aberto)
const EARTH_TEXTURE_URL =
  "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg";

// ─── Tipos de domínio ─────────────────────────────────────────────────────────
type Status = "idle" | "scanning" | "connected" | "error" | "cancelled";

type SensorData = {
  pitch: number;
  roll:  number;
  yaw:   number;
  quat_w: number;
  quat_x: number;
  quat_y: number;
  quat_z: number;
  acc_x: number;
  acc_y: number;
  acc_z: number;
};

type QuatRef = Pick<SensorData, "quat_w" | "quat_x" | "quat_y" | "quat_z">;

// ─── Globo 3D ─────────────────────────────────────────────────────────────────
function GlobeCanvas({ quatRef }: { quatRef: React.RefObject<QuatRef | null> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeMeshRef = useRef<THREE.Mesh | null>(null);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Cena
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.1, 500);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    // Luzes
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    // Terra
    const texture = new THREE.TextureLoader().load(
      EARTH_TEXTURE_URL,
      undefined,
      undefined,
      () => { /* fallback: mantém a cor padrão */ }
    );
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({
        map: texture,
        color: 0x2266aa,      // azul como fallback enquanto textura carrega
        specular: new THREE.Color(0x222222),
        shininess: 15,
      })
    );
    scene.add(globe);
    globeMeshRef.current = globe;

    // Atmosfera
    scene.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1.018, 64, 64),
        new THREE.MeshPhongMaterial({
          color: 0x2255cc,
          transparent: true,
          opacity: 0.07,
          side: THREE.FrontSide,
        })
      )
    );

    // Estrelas
    const positions: number[] = [];
    for (let i = 0; i < 2500; i++) {
      positions.push(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
      );
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.15 })));

    // Grade no chão
    const grid = new THREE.GridHelper(16, 28, 0x112244, 0x0d1a30);
    grid.position.y = -1.9;
    scene.add(grid);

    // Loop de animação — aplica quaternion vindo do ref a cada frame
    function tick() {
      rafRef.current = requestAnimationFrame(tick);

      const q = quatRef.current;
      if (q && globeMeshRef.current) {
        globeMeshRef.current.setRotationFromQuaternion(
          new THREE.Quaternion(q.quat_x, q.quat_y, q.quat_z, q.quat_w)
        );
      }

      renderer.render(scene, camera);
    }
    tick();

    // Resize
    function onResize() {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}

// ─── Helper: linha de leitura ─────────────────────────────────────────────────
function Row({
  label,
  value,
  unit = "",
  color,
  decimals = 2,
}: {
  label: string;
  value?: number;
  unit?: string;
  color: string;
  decimals?: number;
}) {
  return (
    <div className="flex items-center justify-between rounded px-2 py-1 hover:bg-white/5">
      <span className="text-xs text-zinc-500">{label}</span>
      <span className={`text-sm font-black tabular-nums ${color}`}>
        {value !== undefined ? `${value.toFixed(decimals)}${unit}` : "—"}
      </span>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function PareamentoPage() {
  const [status,     setStatus]    = useState<Status>("idle");
  const [devName,    setDevName]   = useState("");
  const [errorMsg,   setErrorMsg]  = useState("");
  const [sensor,     setSensor]    = useState<SensorData | null>(null);
  const [co2,        setCo2]       = useState(600);
  const [keyLast,    setKeyLast]   = useState("—");
  const [keyHistory, setKeyHistory] = useState("");
  const [logs,       setLogs]      = useState<string[]>([]);

  // Ref de quaternion lido pelo loop Three.js a cada frame
  const quatRef  = useRef<QuatRef | null>(null);
  const deviceRef = useRef<BLEDevice | null>(null);
  const decoder  = useRef(new TextDecoder());

  // Cleanup ao desmontar
  useEffect(() => () => { deviceRef.current?.gatt?.disconnect(); }, []);

  const addLog = useCallback((msg: string) => {
    const t = new Date().toLocaleTimeString("pt-BR");
    setLogs((p) => [`[${t}] ${msg}`, ...p].slice(0, 100));
  }, []);

  // Interpreta o payload JSON recebido pelo BLE
  const processPayload = useCallback(
    (raw: string, src: string) => {
      addLog(`${src}: ${raw.slice(0, 90)}${raw.length > 90 ? "…" : ""}`);

      try {
        const d = JSON.parse(raw) as Record<string, unknown>;

        // Euler
        const e = d.euler as Record<string, number> | undefined;
        // Quaternion
        const q = d.quat  as Record<string, number> | undefined;
        // Acelerômetro
        const a = d.acc   as Record<string, number> | undefined;

        if (e || q || a) {
          setSensor((prev) => {
            const base: SensorData = prev ?? {
              pitch: 0, roll: 0, yaw: 0,
              quat_w: 1, quat_x: 0, quat_y: 0, quat_z: 0,
              acc_x: 0, acc_y: 0, acc_z: 0,
            };
            const next: SensorData = {
              ...base,
              ...(e ? { pitch: e.pitch ?? base.pitch, roll: e.roll ?? base.roll, yaw: e.yaw ?? base.yaw } : {}),
              ...(q ? { quat_w: q.quat_w ?? base.quat_w, quat_x: q.quat_x ?? base.quat_x,
                        quat_y: q.quat_y ?? base.quat_y, quat_z: q.quat_z ?? base.quat_z } : {}),
              ...(a ? { acc_x: a.x ?? base.acc_x, acc_y: a.y ?? base.acc_y, acc_z: a.z ?? base.acc_z } : {}),
            };
            // Atualiza ref para o loop Three.js sem re-render extra
            quatRef.current = {
              quat_w: next.quat_w, quat_x: next.quat_x,
              quat_y: next.quat_y, quat_z: next.quat_z,
            };
            return next;
          });
        }

        // Teclado
        const k = d.keypad as Record<string, string> | undefined;
        if (k) {
          if (k.ultima) setKeyLast(k.ultima);
          if (k.digitadas !== undefined) setKeyHistory(k.digitadas.trim());
        }

        // CO2 no payload do sensor
        if (typeof d.co2_ppm === "number") setCo2(d.co2_ppm);

        // CO2 vindo da característica própria
        const co2Obj = d.co2 as Record<string, number> | undefined;
        if (co2Obj && typeof co2Obj.ppm === "number") setCo2(co2Obj.ppm);
      } catch {
        // JSON inválido — raw já registrado no log
      }
    },
    [addLog]
  );

  const handleDisconnect = useCallback(() => {
    setStatus("idle");
    setDevName("");
    deviceRef.current = null;
    addLog("Dispositivo desconectado.");
  }, [addLog]);

  async function connect() {
    if (!navigator.bluetooth) {
      setStatus("error");
      setErrorMsg("Web Bluetooth indisponível. Use Chrome ou Edge.");
      return;
    }
    setStatus("scanning");
    setErrorMsg("");

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: DEVICE_NAME }],
        optionalServices: [SERVICE_UUID],
      });

      deviceRef.current = device;
      device.addEventListener("gattserverdisconnected", handleDisconnect);

      const name = device.name ?? "Dispositivo";
      setDevName(name);
      addLog(`Conectando a "${name}"…`);

      if (!device.gatt) throw new Error("GATT não disponível neste dispositivo.");
      const server  = await device.gatt.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);

      for (const { uuid, src } of [
        { uuid: SENSOR_UUID, src: "Sensor" },
        { uuid: CO2_UUID,    src: "CO2"    },
      ]) {
        try {
          const char = await service.getCharacteristic(uuid);
          await char.startNotifications();
          char.addEventListener("characteristicvaluechanged", (e: Event) => {
            const t = e.target as BLECharacteristic;
            if (!t.value) return;
            processPayload(decoder.current.decode(t.value), src);
          });
          addLog(`Notificações ativas: ${src}`);
        } catch {
          addLog(`Característica ${src} indisponível — ignorada.`);
        }
      }

      setStatus("connected");
      addLog(`Conectado a "${name}" com sucesso.`);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "NotFoundError") {
        setStatus("cancelled");
        addLog("Pareamento cancelado pelo usuário.");
      } else {
        const msg = err instanceof Error ? err.message : "Erro desconhecido.";
        setStatus("error");
        setErrorMsg(msg);
        addLog(`Erro: ${msg}`);
      }
    }
  }

  function disconnect() {
    addLog("Desconectando…");
    deviceRef.current?.gatt?.connected
      ? deviceRef.current.gatt.disconnect()
      : handleDisconnect();
  }

  const isConnected = status === "connected";
  const isScanning  = status === "scanning";
  const co2Alert    = co2 >= 2000;

  const ring =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060b14]";

  // ── Render ──
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#060b14] text-white">

      {/* ── Barra superior ── */}
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
        <Link
          href="/dispositivos"
          className={`shrink-0 text-sm font-bold text-zinc-500 hover:text-white ${ring}`}
        >
          ← Dispositivos
        </Link>

        <div className="min-w-0 text-center">
          <h1 className="truncate text-sm font-black tracking-tight sm:text-base">
            DAVI · Visualizador 3D do Dispositivo Assistivo
          </h1>
          <p className="truncate text-xs text-zinc-600">
            MPU6050 + Teclado 4×4 · BLE · {DEVICE_NAME}
          </p>
        </div>

        {/* Status pill */}
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isConnected     ? "bg-green-500" :
              isScanning      ? "animate-pulse bg-blue-500" :
              status === "error" ? "bg-red-500" : "bg-zinc-600"
            }`}
          />
          <span className="hidden text-xs font-bold text-zinc-400 sm:block">
            {isConnected        ? devName || "Conectado" :
             isScanning         ? "Procurando…" :
             status === "error" ? "Erro" :
             status === "cancelled" ? "Cancelado" : "Desconectado"}
          </span>
        </div>
      </header>

      {/* ── Conteúdo principal ── */}
      <div className="flex min-h-0 flex-1">

        {/* Globo */}
        <div className="min-h-0 flex-1">
          <GlobeCanvas quatRef={quatRef} />
        </div>

        {/* Painel de leituras */}
        <aside className="flex w-60 shrink-0 flex-col gap-5 overflow-y-auto border-l border-white/10 bg-[#0a1120] p-4">

          {/* Conexão */}
          <div className="space-y-2">
            {!isConnected ? (
              <button
                type="button"
                onClick={connect}
                disabled={isScanning}
                className={`w-full rounded-xl bg-blue-700 py-3 text-sm font-black text-white hover:bg-blue-600 disabled:opacity-50 ${ring}`}
              >
                {isScanning ? "Procurando…" : "Conectar"}
              </button>
            ) : (
              <button
                type="button"
                onClick={disconnect}
                className={`w-full rounded-xl border border-red-900 bg-red-950 py-3 text-sm font-black text-red-400 hover:bg-red-900 ${ring}`}
              >
                Desconectar
              </button>
            )}
            {errorMsg && (
              <p className="rounded-lg bg-red-950/50 px-3 py-2 text-xs text-red-400">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Orientação (Euler) */}
          <section>
            <h2 className="mb-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
              Orientação
            </h2>
            <Row label="Pitch (X)" value={sensor?.pitch} unit="°" color="text-rose-400" />
            <Row label="Roll (Z)"  value={sensor?.roll}  unit="°" color="text-amber-400" />
            <Row label="Yaw (Y)"   value={sensor?.yaw}   unit="°" color="text-emerald-400" />
          </section>

          {/* Acelerômetro */}
          <section>
            <h2 className="mb-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
              Acelerômetro
            </h2>
            <Row label="Accel X" value={sensor?.acc_x} unit=" m/s²" color="text-sky-300" />
            <Row label="Accel Y" value={sensor?.acc_y} unit=" m/s²" color="text-sky-300" />
            <Row label="Accel Z" value={sensor?.acc_z} unit=" m/s²" color="text-sky-300" />
          </section>

          {/* Quaternion */}
          <section>
            <h2 className="mb-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
              Quaternion
            </h2>
            <Row label="W" value={sensor?.quat_w} decimals={3} color="text-violet-400" />
            <Row label="X" value={sensor?.quat_x} decimals={3} color="text-violet-400" />
            <Row label="Y" value={sensor?.quat_y} decimals={3} color="text-violet-400" />
            <Row label="Z" value={sensor?.quat_z} decimals={3} color="text-violet-400" />
          </section>

          {/* CO2 */}
          <section>
            <h2 className="mb-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
              CO₂
            </h2>
            <div
              className={`rounded-xl p-3 text-center transition-colors ${
                co2Alert ? "bg-red-950/70" : "bg-white/5"
              }`}
            >
              <p
                className={`text-4xl font-black tabular-nums leading-none ${
                  co2Alert ? "text-red-400" : "text-green-400"
                }`}
              >
                {co2.toLocaleString("pt-BR")}
              </p>
              <p className="mt-1 text-xs text-zinc-600">ppm</p>
              {co2Alert && (
                <p className="mt-2 text-xs font-black text-red-400">⚠ Evento detectado!</p>
              )}
            </div>
          </section>

          {/* Log */}
          <section className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                Log BLE
              </h2>
              {logs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setLogs([])}
                  className={`text-[10px] font-bold text-zinc-600 hover:text-zinc-400 ${ring}`}
                >
                  Limpar
                </button>
              )}
            </div>
            <div
              aria-live="polite"
              className="h-32 overflow-y-auto rounded-lg bg-black/40 p-2 font-mono text-[10px] leading-4 text-zinc-500"
            >
              {logs.length === 0 ? (
                <span className="text-zinc-700">Aguardando dados…</span>
              ) : (
                logs.map((l, i) => <p key={i}>{l}</p>)
              )}
            </div>
          </section>
        </aside>
      </div>

      {/* ── Barra de teclas ── */}
      <footer className="shrink-0 border-t border-white/10 bg-[#0a1120] px-5 py-3">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-600">
            Teclas digitadas:
          </span>
          <span className="flex-1 font-mono text-xl font-black tracking-widest text-white">
            {keyHistory || "—"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-600">Última:</span>
            <kbd className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 font-mono text-base font-black text-white shadow">
              {keyLast}
            </kbd>
          </div>
        </div>
      </footer>
    </div>
  );
}

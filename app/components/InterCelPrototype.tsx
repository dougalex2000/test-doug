"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  IconChat,
  IconCheckCircle,
  IconClipboard,
  IconDocument,
  IconEye,
  IconGamepad,
  IconJoystick,
  IconMotion,
  IconSwitchButton,
  IconTouch,
} from "./icons";

type Command = {
  id: string;
  label: string;
  detail: string;
  mode: string;
  createdAt: string;
};

type Mode =
  | "inicio"
  | "sim-nao"
  | "comandos"
  | "joystick"
  | "mouse"
  | "comunicacao"
  | "escrita"
  | "acessibilidade"
  | "olhar";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const defaultSession = "DAVI-24";

function storageKey(code: string) {
  return `davi-intercel-session-${code.trim().toUpperCase() || defaultSession}`;
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

function useInterCelCommands(sessionCode: string) {
  const [commands, setCommands] = useState<Command[]>([]);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      setCommands(readCommands(sessionCode));
    }, 0);

    const interval = window.setInterval(() => {
      setCommands(readCommands(sessionCode));
    }, 700);

    function onStorage(event: StorageEvent) {
      if (event.key === storageKey(sessionCode)) {
        setCommands(readCommands(sessionCode));
      }
    }

    window.addEventListener("storage", onStorage);
    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(interval);
      window.removeEventListener("storage", onStorage);
    };
  }, [sessionCode]);

  const sendCommand = useCallback(
    (label: string, detail: string, mode: string) => {
      const command: Command = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        label,
        detail,
        mode,
        createdAt: nowLabel(),
      };
      const next = [command, ...readCommands(sessionCode)].slice(0, 12);
      writeCommands(sessionCode, next);
      setCommands(next);
      if ("vibrate" in navigator) navigator.vibrate?.(35);
    },
    [sessionCode],
  );

  const clearCommands = useCallback(() => {
    writeCommands(sessionCode, []);
    setCommands([]);
  }, [sessionCode]);

  return { commands, sendCommand, clearCommands };
}

const modeItems: Array<{
  id: Mode;
  title: string;
  subtitle: string;
  icon: ReactNode;
  tone: string;
}> = [
  {
    id: "escrita",
    title: "Escrita",
    subtitle: "Letras e palavras",
    icon: <IconDocument className="h-7 w-7" />,
    tone: "bg-blue-50 text-blue-800 ring-blue-100",
  },
  {
    id: "sim-nao",
    title: "Sim / Não",
    subtitle: "Escolhas rápidas",
    icon: <IconSwitchButton className="h-7 w-7" />,
    tone: "bg-green-50 text-green-800 ring-green-100",
  },
  {
    id: "comandos",
    title: "Comandos",
    subtitle: "Aula e atividade",
    icon: <IconClipboard className="h-7 w-7" />,
    tone: "bg-sky-50 text-sky-800 ring-sky-100",
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
    id: "comunicacao",
    title: "Comunicação",
    subtitle: "Falar e expressar",
    icon: <IconChat className="h-7 w-7" />,
    tone: "bg-violet-50 text-violet-800 ring-violet-100",
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
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-wide text-zinc-500">
        Código da sessão
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value.toUpperCase())}
        inputMode="text"
        maxLength={12}
        className={`mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-center text-xl font-black tracking-widest text-zinc-950 shadow-sm ${focusRing}`}
        aria-label="Código da sessão DAVI"
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
      className={`min-h-20 min-w-0 rounded-lg border px-4 py-4 text-left shadow-sm transition active:scale-[0.99] ${focusRing} ${className}`}
    >
      <span className="block break-words text-xl font-black leading-tight">{label}</span>
      <span className="mt-1 block break-words text-sm font-semibold opacity-80">{detail}</span>
    </button>
  );
}

function PhoneShell({
  children,
  sessionCode,
  setSessionCode,
}: {
  children: ReactNode;
  sessionCode: string;
  setSessionCode: (value: string) => void;
}) {
  return (
    <div
      className="mx-auto min-w-0 overflow-hidden rounded-[2rem] border-[10px] border-zinc-950 bg-zinc-950 shadow-2xl shadow-blue-950/25"
      style={{
        boxSizing: "border-box",
        maxWidth: "min(430px, calc(100vw - 4rem))",
        width: "min(100%, calc(100vw - 4rem))",
      }}
    >
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
        <div className="px-5 py-4">
          <SessionCodeField value={sessionCode} onChange={setSessionCode} />
        </div>
        {children}
      </div>
    </div>
  );
}

function ModeHome({ setMode }: { setMode: (mode: Mode) => void }) {
  return (
    <div className="grid min-w-0 grid-cols-2 gap-3 px-5 pb-5">
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
          <div className="grid gap-3">
            <div className="mx-auto grid w-64 grid-cols-3 gap-3">
              <span />
              <CommandButton label="↑" detail="Cima" mode="Joystick" className="border-indigo-200 bg-indigo-50 text-indigo-950 text-center" onSend={onSend} />
              <span />
              <CommandButton label="←" detail="Esquerda" mode="Joystick" className="border-indigo-200 bg-indigo-50 text-indigo-950 text-center" onSend={onSend} />
              <CommandButton label="OK" detail="Ação" mode="Joystick" className="border-green-700 bg-green-600 text-white text-center" onSend={onSend} />
              <CommandButton label="→" detail="Direita" mode="Joystick" className="border-indigo-200 bg-indigo-50 text-indigo-950 text-center" onSend={onSend} />
              <span />
              <CommandButton label="↓" detail="Baixo" mode="Joystick" className="border-indigo-200 bg-indigo-50 text-indigo-950 text-center" onSend={onSend} />
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
  }, [mode, onSend]);

  return (
    <div className="px-5 pb-5">
      <button
        type="button"
        onClick={() => setMode("inicio")}
        className={`mb-4 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-black text-blue-800 ${focusRing}`}
      >
        ← Todos os recursos
      </button>
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-2xl font-black text-zinc-950">{panel.title}</h2>
        <p className="mt-1 text-sm font-semibold text-zinc-600">{panel.subtitle}</p>
        <div className="mt-4">{panel.content}</div>
      </div>
    </div>
  );
}

function CommandLog({ commands }: { commands: Command[] }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-zinc-500">
        Últimos comandos
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
                {command.mode} · {command.createdAt}
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

export function InterCelControlPrototype() {
  const [sessionCode, setSessionCode] = useState(defaultSession);
  const [mode, setMode] = useState<Mode>("inicio");
  const { commands, sendCommand } = useInterCelCommands(sessionCode);

  return (
    <main
      className="min-h-screen overflow-x-hidden bg-[#EEF5FF] px-4 py-6 text-zinc-950 sm:px-6"
      style={{ boxSizing: "border-box", maxWidth: "100vw", width: "100vw" }}
    >
      <div className="mx-auto grid w-full min-w-0 max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section
          className="min-w-0"
          style={{
            maxWidth: "42rem",
            width: "min(100%, calc(100vw - 2rem))",
          }}
        >
          <p className="text-sm font-black uppercase tracking-wide text-blue-800">
            Protótipo web
          </p>
          <h1 className="mt-3 max-w-2xl break-words text-3xl font-black leading-tight text-zinc-950 sm:text-5xl">
            DAVI InterCel Controle
          </h1>
          <p className="mt-4 max-w-2xl break-words text-lg font-semibold leading-8 text-zinc-700">
            Uma página de internet que transforma o celular em controle assistivo
            para comunicação, escrita, jogos, mouse, comandos e acessibilidade.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Acessível", "Botões grandes"],
              ["Inclusivo", "Sem barreiras"],
              ["Humano", "Feito para pessoas"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                <IconCheckCircle className="h-7 w-7 text-green-700" />
                <p className="mt-3 text-sm font-black uppercase text-blue-800">{title}</p>
                <p className="text-sm font-semibold text-zinc-600">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-lg font-black text-zinc-950">Como testar agora</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-zinc-600">
              Abra a tela de sessão no computador e use o mesmo código no celular.
              Nesta primeira versão, os comandos são simulados no navegador.
            </p>
            <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/davi-intercel/sessao"
                className={`rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 ${focusRing}`}
              >
                Abrir tela receptora
              </Link>
              <Link
                href="/davi-intercel"
                className={`rounded-lg border border-zinc-300 bg-white px-5 py-3 text-center text-sm font-black text-zinc-900 hover:border-blue-400 hover:text-blue-800 ${focusRing}`}
              >
                Voltar ao módulo
              </Link>
            </div>
          </div>
        </section>

        <section
          className="min-w-0"
          style={{
            maxWidth: "42rem",
            width: "min(100%, calc(100vw - 2rem))",
          }}
          aria-label="Controle DAVI InterCel"
        >
          <PhoneShell sessionCode={sessionCode} setSessionCode={setSessionCode}>
            {mode === "inicio" ? (
              <ModeHome setMode={setMode} />
            ) : (
              <ModePanel mode={mode} setMode={setMode} onSend={sendCommand} />
            )}
          </PhoneShell>
          <div className="mx-auto mt-5 max-w-[430px]">
            <CommandLog commands={commands} />
          </div>
        </section>
      </div>
    </main>
  );
}

export function InterCelSessionReceiver() {
  const [sessionCode, setSessionCode] = useState(defaultSession);
  const { commands, clearCommands } = useInterCelCommands(sessionCode);
  const latest = commands[0];

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-zinc-800 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-green-400">
              Tela receptora
            </p>
            <h1 className="mt-2 text-4xl font-black">Sessão DAVI InterCel</h1>
            <p className="mt-2 max-w-2xl text-zinc-300">
              Use esta tela no computador, TV ou tablet. O celular envia comandos
              pela página de controle usando o mesmo código.
            </p>
          </div>
          <div className="w-full max-w-xs">
            <SessionCodeField value={sessionCode} onChange={setSessionCode} />
          </div>
        </div>

        <section className="grid gap-6 py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm font-black uppercase tracking-wide text-zinc-400">
              Comando recebido
            </p>
            {latest ? (
              <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-8">
                <p className="text-6xl font-black text-green-300">{latest.label}</p>
                <p className="mt-4 text-2xl font-bold text-white">{latest.detail}</p>
                <p className="mt-3 text-sm font-black uppercase tracking-wide text-green-200">
                  {latest.mode} · {latest.createdAt}
                </p>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-zinc-400">
                <IconJoystick className="h-16 w-16" />
                <p className="mt-6 text-3xl font-black text-white">
                  Aguardando comando
                </p>
                <p className="mt-2 text-lg">
                  Abra o controle no celular e use o código {sessionCode}.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-white p-6 text-zinc-950">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-blue-800">
                  Histórico
                </p>
                <h2 className="mt-2 text-2xl font-black">Comandos da sessão</h2>
              </div>
              <button
                type="button"
                onClick={clearCommands}
                className={`rounded-lg border border-zinc-300 px-4 py-2 text-sm font-black text-zinc-800 hover:border-blue-400 hover:text-blue-800 ${focusRing}`}
              >
                Limpar
              </button>
            </div>
            <div className="mt-5 grid gap-3">
              {commands.length ? (
                commands.map((command) => (
                  <article key={command.id} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-lg font-black">{command.label}</p>
                    <p className="text-sm font-semibold text-zinc-600">{command.detail}</p>
                    <p className="mt-2 text-xs font-black uppercase tracking-wide text-zinc-400">
                      {command.mode} · {command.createdAt}
                    </p>
                  </article>
                ))
              ) : (
                <p className="rounded-xl bg-zinc-50 p-5 font-semibold text-zinc-500">
                  Nenhum comando nesta sessão.
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/davi-intercel/controle"
            className={`rounded-lg bg-green-500 px-5 py-3 text-sm font-black text-zinc-950 hover:bg-green-400 ${focusRing}`}
          >
            Abrir controle
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

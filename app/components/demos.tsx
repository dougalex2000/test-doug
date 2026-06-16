"use client";

import { useEffect, useRef, useState } from "react";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const btnBase = `rounded-lg px-4 py-3 text-base font-black ${focusRing}`;
const btnBlue = `${btnBase} bg-blue-700 text-white hover:bg-blue-800`;
const btnGray = `${btnBase} border-2 border-zinc-300 bg-white text-zinc-900 hover:border-blue-400`;
const btnGreen = `${btnBase} bg-green-700 text-white hover:bg-green-800`;

/** Fala um texto em pt-BR usando a Web Speech API, quando disponível. */
function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "pt-BR";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-blue-800">
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function DemoNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold leading-6 text-amber-900">
      <span aria-hidden="true">ℹ️ </span>
      {children}
    </p>
  );
}

/* ================================================================== */
/* Painel de controle de vídeo (origem do DAVI)                        */
/* ================================================================== */

export function VideoAulaDemo({
  instruction = "Assista à explicação e, quando quiser, pause, volte ou repita no seu ritmo.",
}: {
  instruction?: string;
}) {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pauses, setPauses] = useState(0);
  const [repeats, setRepeats] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false);
          return 100;
        }
        return p + 2;
      });
    }, 300);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <Panel title="Videoaula acessível (demonstração)">
      <div className="flex min-h-[180px] items-center justify-center rounded-xl bg-zinc-900 p-6 text-center text-white">
        <div>
          <p className="text-5xl" aria-hidden="true">
            {playing ? "▶️" : "⏸️"}
          </p>
          <p className="mt-3 text-sm font-semibold text-zinc-300">
            Área de vídeo simulada
          </p>
        </div>
      </div>

      <div className="mt-4" aria-label="Progresso da videoaula">
        <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1 text-sm font-bold text-zinc-600">{progress}%</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={btnBlue} onClick={() => setPlaying((v) => !v)}>
          {playing ? "Pausar" : "Continuar"}
        </button>
        <button
          type="button"
          className={btnGray}
          onClick={() => {
            setPlaying(false);
            setPauses((n) => n + 1);
          }}
        >
          Pausar e marcar
        </button>
        <button
          type="button"
          className={btnGray}
          onClick={() => setProgress((p) => Math.max(0, p - 10))}
        >
          Voltar
        </button>
        <button
          type="button"
          className={btnGray}
          onClick={() => setProgress((p) => Math.min(100, p + 10))}
        >
          Avançar
        </button>
        <button
          type="button"
          className={btnGray}
          onClick={() => {
            setProgress(0);
            setRepeats((n) => n + 1);
          }}
        >
          Repetir explicação
        </button>
        <button type="button" className={btnGray} onClick={() => speak(instruction)}>
          Ouvir instrução
        </button>
      </div>

      <p className="mt-4 text-base leading-7 text-zinc-700">{instruction}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Metric label="Progresso" value={`${progress}%`} />
        <Metric label="Pausas marcadas" value={pauses} />
        <Metric label="Repetições" value={repeats} />
      </div>

      <DemoNote>
        Futuramente, estes comandos poderão ser acionados por toque, teclado,
        botão adaptado, sensor de sopro, joystick, DAVI Vision, ESP32, Bluetooth,
        WebSocket ou BioSinal experimental.
      </DemoNote>
    </Panel>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-center">
      <p className="text-2xl font-black text-blue-800">{value}</p>
      <p className="text-xs font-bold text-zinc-600">{label}</p>
    </div>
  );
}

/* ================================================================== */
/* Atividade de Língua Portuguesa (família silábica BA BE BI BO BU)    */
/* ================================================================== */

const silabas = ["BA", "BE", "BI", "BO", "BU"];

export function AtividadePortugues() {
  const [text, setText] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [done, setDone] = useState(false);
  const startRef = useRef<number | null>(null);
  const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
    startRef.current = Date.now();
  }, []);

  function handleSend() {
    if (!text.trim()) {
      speak("Escreva uma palavra ou frase para enviar.");
      return;
    }
    const start = startRef.current ?? Date.now();
    setAttempts((n) => n + 1);
    setSeconds(Math.round((Date.now() - start) / 1000));
    setDone(true);
    speak(`Muito bem! Você escreveu: ${text}`);
  }

  return (
    <Panel title="Atividade: família silábica BA, BE, BI, BO, BU">
      <div className="flex min-h-[120px] items-center justify-center rounded-xl bg-blue-900 p-5 text-center text-white">
        <p className="text-lg font-bold leading-7">
          Assista à explicação e escreva uma palavra ou frase usando as sílabas
          BA, BE, BI, BO ou BU.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {silabas.map((s) => (
          <button
            key={s}
            type="button"
            className={`${btnGray} min-w-[64px] text-xl`}
            onClick={() => {
              setText((t) => (t ? `${t} ${s.toLowerCase()}` : s.toLowerCase()));
              speak(s);
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <label className="mt-4 block text-sm font-black text-zinc-800" htmlFor="resp-pt">
        Sua resposta
      </label>
      <textarea
        id="resp-pt"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Escreva aqui…"
        className={`mt-2 w-full rounded-lg border-2 border-zinc-300 bg-white px-4 py-3 text-lg font-semibold text-zinc-950 ${focusRing}`}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className={btnGray} onClick={() => speak(text || "Caixa vazia.")}>
          Ouvir novamente
        </button>
        <button type="button" className={btnGray} onClick={() => setText("")}>
          Apagar
        </button>
        <button type="button" className={btnGreen} onClick={handleSend}>
          Enviar resposta
        </button>
      </div>

      {done && (
        <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4">
          <p className="text-base font-black text-green-900">
            🎉 Muito bem! Atividade concluída.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Metric label="Tempo de resposta" value={`${seconds ?? 0}s`} />
            <Metric label="Tentativas" value={attempts} />
            <Metric label="Status" value="Concluída" />
          </div>
        </div>
      )}

      <DemoNote>
        Demonstração: nenhuma resposta é salva. Em produção, as métricas de
        tempo, tentativas e escrita apoiam o acompanhamento pedagógico, com
        consentimento e proteção de dados.
      </DemoNote>
    </Panel>
  );
}

/* ================================================================== */
/* Atividade de Matemática (contar objetos)                            */
/* ================================================================== */

export function AtividadeMatematica() {
  const target = 4;
  const [choice, setChoice] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const correct = choice === target;

  return (
    <Panel title="Atividade: conte os objetos">
      <p className="text-lg font-bold text-zinc-800">
        Conte as bolinhas e escolha a resposta correta.
      </p>
      <div className="mt-4 flex flex-wrap gap-3" aria-label={`${target} objetos`}>
        {Array.from({ length: target }).map((_, i) => (
          <span
            key={i}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl"
            aria-hidden="true"
          >
            🔵
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {[3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={choice === n}
            className={`${btnBase} min-w-[72px] text-2xl ${
              choice === n
                ? correct
                  ? "bg-green-700 text-white"
                  : "bg-rose-600 text-white"
                : "border-2 border-zinc-300 bg-white text-zinc-900 hover:border-blue-400"
            }`}
            onClick={() => {
              setChoice(n);
              setAttempts((a) => a + 1);
              speak(n === target ? "Acertou! São quatro." : "Tente novamente.");
            }}
          >
            {n}
          </button>
        ))}
      </div>

      {choice !== null && (
        <div
          className={`mt-4 rounded-lg border p-4 ${
            correct
              ? "border-green-300 bg-green-50 text-green-900"
              : "border-rose-300 bg-rose-50 text-rose-900"
          }`}
        >
          <p className="text-base font-black">
            {correct ? "🎉 Acertou! São 4 objetos." : "Quase! Conte de novo e tente outra vez."}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Metric label="Tentativas" value={attempts} />
            <Metric label="Acertos" value={correct ? 1 : 0} />
            <Metric label="Status" value={correct ? "Concluída" : "Em andamento"} />
          </div>
        </div>
      )}

      <DemoNote>
        Demonstração com apoio visual, respostas grandes e feedback positivo.
        Nenhum dado é salvo nesta etapa.
      </DemoNote>
    </Panel>
  );
}

/* ================================================================== */
/* Painel DAVI Conecta                                                 */
/* ================================================================== */

const conectaDevices = [
  { id: "botao", label: "Botão adaptado", command: "CLIQUE", action: "Selecionar item" },
  { id: "sopro", label: "Sensor de sopro", command: "SOPRO", action: "Confirmar escolha" },
  { id: "teclado", label: "Teclado acessível", command: "TECLA A", action: "Escrever letra A" },
  { id: "joystick", label: "Joystick", command: "DIREITA", action: "Mover cursor" },
  { id: "movimento", label: "Sensor de movimento", command: "GESTO", action: "Avançar atividade" },
  { id: "esp32", label: "Dispositivo ESP32", command: "PINO 4", action: "Acionar vídeo" },
];

export function ConectaPanel() {
  const [connected, setConnected] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);

  function sendCommand(device: (typeof conectaDevices)[number]) {
    if (!connected) {
      setConnected(true);
    }
    setLastCommand(device.command);
    setLastAction(device.action);
    const time = new Date().toLocaleTimeString("pt-BR");
    setLog((l) => [`${time} — ${device.label}: ${device.command} → ${device.action}`, ...l].slice(0, 6));
  }

  return (
    <Panel title="Painel de demonstração — DAVI Conecta">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-black ${
            connected ? "bg-green-100 text-green-900" : "bg-zinc-100 text-zinc-700"
          }`}
        >
          <span className={`h-2.5 w-2.5 rounded-full ${connected ? "bg-green-500" : "bg-zinc-400"}`} />
          {connected ? "Conectado" : "Desconectado"}
        </span>
        <button
          type="button"
          className={btnGray}
          onClick={() => {
            setConnected((v) => !v);
            if (connected) {
              setLastCommand(null);
              setLastAction(null);
            }
          }}
        >
          {connected ? "Desconectar" : "Conectar (simular)"}
        </button>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {conectaDevices.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`${btnGray} text-left`}
            onClick={() => sendCommand(d)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <p className="text-xs font-bold text-zinc-600">Último comando recebido</p>
          <p className="text-lg font-black text-blue-800">{lastCommand ?? "—"}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <p className="text-xs font-bold text-zinc-600">Ação simulada no DAVI</p>
          <p className="text-lg font-black text-blue-800">{lastAction ?? "—"}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Eventos registrados
        </p>
        <ul className="mt-2 grid gap-1">
          {log.length === 0 ? (
            <li className="text-sm font-semibold text-zinc-500">Nenhum evento ainda.</li>
          ) : (
            log.map((entry) => (
              <li key={entry} className="rounded bg-zinc-50 px-3 py-1.5 font-mono text-xs text-zinc-700">
                {entry}
              </li>
            ))
          )}
        </ul>
      </div>

      <DemoNote>
        Simulação de pareamento e envio de comandos. A conexão real usa Web
        Bluetooth, ESP32 e WebSocket, com registro de eventos e segurança.
      </DemoNote>
    </Panel>
  );
}

/* ================================================================== */
/* Simulador BioSinal                                                  */
/* ================================================================== */

const bioSignals = [
  { id: "piscada", label: "Simular piscada", signal: "EOG: piscada detectada" },
  { id: "contracao", label: "Simular contração muscular", signal: "EMG: contração detectada" },
  { id: "olhar-esq", label: "Simular olhar à esquerda", signal: "EOG: olhar ◀ esquerda" },
  { id: "olhar-dir", label: "Simular olhar à direita", signal: "EOG: olhar direita ▶" },
  { id: "eeg", label: "Simular comando EEG", signal: "EEG: padrão de intenção" },
];

export function BioSinalSimulator() {
  const [log, setLog] = useState<string[]>([]);

  function fire(signal: string) {
    const time = new Date().toLocaleTimeString("pt-BR");
    setLog((l) => [`${time} — ${signal}`, ...l].slice(0, 8));
  }

  return (
    <Panel title="Simulador BioSinal (experimental)">
      <div className="flex flex-wrap gap-2">
        {bioSignals.map((b) => (
          <button key={b.id} type="button" className={btnGray} onClick={() => fire(b.signal)}>
            {b.label}
          </button>
        ))}
        <button
          type="button"
          className={btnBlue}
          onClick={() => fire("Evento registrado manualmente")}
        >
          Registrar evento
        </button>
      </div>

      <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
          Eventos simulados
        </p>
        <ul className="mt-2 grid gap-1">
          {log.length === 0 ? (
            <li className="text-sm font-semibold text-zinc-500">
              Nenhum sinal simulado ainda.
            </li>
          ) : (
            log.map((entry) => (
              <li key={entry} className="rounded bg-zinc-50 px-3 py-1.5 font-mono text-xs text-zinc-700">
                {entry}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-semibold leading-6 text-rose-900">
        <span aria-hidden="true">⚠️ </span>
        Simulação sem captura real de sinais biológicos. O BioSinal é
        experimental, não realiza diagnóstico e qualquer pesquisa com
        participantes exige Comitê de Ética, consentimento e proteção de dados.
      </div>
    </Panel>
  );
}

/* ================================================================== */
/* Simulador DAVI Vision                                               */
/* ================================================================== */

const visionActions = [
  { id: "esq", label: "Olhar para a esquerda", icon: "◀" },
  { id: "dir", label: "Olhar para a direita", icon: "▶" },
  { id: "piscar", label: "Piscar para selecionar", icon: "😉" },
  { id: "cabeca", label: "Mover a cabeça", icon: "🙆" },
  { id: "confirmar", label: "Confirmar escolha", icon: "✅" },
  { id: "calibrar", label: "Calibrar olhar", icon: "🎯" },
  { id: "luz", label: "Detectar iluminação inadequada", icon: "💡" },
];

export function VisionSimulator() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Panel title="Simulador DAVI Vision (protótipo)">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {visionActions.map((a) => (
          <button
            key={a.id}
            type="button"
            aria-pressed={active === a.id}
            className={`${btnBase} flex items-center gap-3 text-left ${
              active === a.id
                ? "bg-blue-700 text-white"
                : "border-2 border-zinc-300 bg-white text-zinc-900 hover:border-blue-400"
            }`}
            onClick={() => {
              setActive(a.id);
              speak(a.label);
            }}
          >
            <span aria-hidden="true" className="text-2xl">
              {a.icon}
            </span>
            {a.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
        <p className="text-xs font-bold text-zinc-600">Comando reconhecido (simulação)</p>
        <p className="text-lg font-black text-blue-800">
          {active ? visionActions.find((a) => a.id === active)?.label : "—"}
        </p>
      </div>
      <DemoNote>
        Simulação sem uso de câmera. O DAVI Vision está em prototipagem e testes
        iniciais, sem finalidade diagnóstica, com processamento local sempre que
        possível.
      </DemoNote>
    </Panel>
  );
}

/* ================================================================== */
/* Controles de calibração (DAVI Calibrar)                             */
/* ================================================================== */

const sliders = [
  { id: "varredura", label: "Velocidade de varredura", min: 1, max: 10, value: 4, unit: "" },
  { id: "permanencia", label: "Tempo de permanência", min: 0.5, max: 5, value: 1.5, unit: "s", step: 0.5 },
  { id: "sensibilidade", label: "Sensibilidade", min: 1, max: 10, value: 6, unit: "" },
  { id: "botoes", label: "Tamanho dos botões", min: 1, max: 5, value: 3, unit: "" },
];

export function CalibrarControls() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(sliders.map((s) => [s.id, s.value])),
  );

  return (
    <Panel title="Ajustes de acesso (demonstração)">
      <div className="grid gap-5 sm:grid-cols-2">
        {sliders.map((s) => (
          <div key={s.id}>
            <label className="flex items-center justify-between text-sm font-black text-zinc-800" htmlFor={`cal-${s.id}`}>
              <span>{s.label}</span>
              <span className="text-blue-800">
                {values[s.id]}
                {s.unit}
              </span>
            </label>
            <input
              id={`cal-${s.id}`}
              type="range"
              min={s.min}
              max={s.max}
              step={s.step ?? 1}
              value={values[s.id]}
              onChange={(e) =>
                setValues((v) => ({ ...v, [s.id]: Number(e.target.value) }))
              }
              className="mt-2 w-full accent-blue-700"
            />
          </div>
        ))}
      </div>
      <DemoNote>
        Demonstração visual dos ajustes. Em produção, as preferências de cada
        pessoa serão salvas no perfil de acesso, com consentimento.
      </DemoNote>
    </Panel>
  );
}

/* ================================================================== */
/* Formulários demonstrativos (Criar Atividade / Subir Vídeo)          */
/* ================================================================== */

const fieldClass = `mt-2 w-full rounded-lg border-2 border-zinc-300 bg-white px-4 py-3 text-base font-semibold text-zinc-950 ${focusRing}`;

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-black text-zinc-800">
        {label}
      </label>
      {children}
    </div>
  );
}

const acessos = [
  "Toque",
  "Teclado",
  "Botão adaptado",
  "Sopro",
  "Olhar (DAVI Vision)",
  "Varredura",
];

export function CriarAtividadeForm() {
  const [saved, setSaved] = useState(false);

  return (
    <Panel title="Criar atividade (demonstração)">
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        <Field id="ca-titulo" label="Título da atividade">
          <input id="ca-titulo" className={fieldClass} placeholder="Ex.: Família silábica BA" />
        </Field>
        <Field id="ca-disciplina" label="Área / disciplina">
          <select id="ca-disciplina" className={fieldClass} defaultValue="Língua Portuguesa">
            <option>Língua Portuguesa</option>
            <option>Matemática</option>
            <option>Comunicação</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="ca-instrucao" label="Vídeo ou instrução">
            <input id="ca-instrucao" className={fieldClass} placeholder="Link do vídeo ou texto da instrução" />
          </Field>
        </div>
        <Field id="ca-pergunta" label="Pergunta">
          <input id="ca-pergunta" className={fieldClass} placeholder="O que o aluno deve responder?" />
        </Field>
        <Field id="ca-resposta" label="Resposta esperada">
          <input id="ca-resposta" className={fieldClass} placeholder="Ex.: uma palavra com BA" />
        </Field>
        <Field id="ca-tipo" label="Tipo de resposta">
          <select id="ca-tipo" className={fieldClass} defaultValue="Texto">
            <option>Texto</option>
            <option>Escolha</option>
            <option>Sim / Não</option>
          </select>
        </Field>
        <Field id="ca-acesso" label="Método de acesso compatível">
          <select id="ca-acesso" className={fieldClass} defaultValue={acessos[0]}>
            {acessos.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="ca-feedback" label="Feedback positivo">
            <input id="ca-feedback" className={fieldClass} placeholder="Ex.: Muito bem! Você conseguiu." />
          </Field>
        </div>
        <div className="sm:col-span-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm font-semibold text-zinc-700">
          Métricas que serão registradas: tempo de resposta, tentativas, escrita
          produzida e conclusão.
        </div>
        <div className="sm:col-span-2 flex flex-wrap gap-2">
          <button type="submit" className={btnGreen}>
            Salvar rascunho
          </button>
          <button
            type="button"
            className={btnGray}
            title="Recurso planejado"
            onClick={() => setSaved(true)}
          >
            ✨ Gerar atividade com IA (planejado)
          </button>
        </div>
      </form>

      {saved && (
        <p className="mt-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm font-bold text-green-900">
          Rascunho registrado nesta demonstração (nada é salvo de verdade).
        </p>
      )}

      <DemoNote>
        Recurso em desenvolvimento. A criação real dependerá de autenticação,
        permissões e proteção de dados.
      </DemoNote>
    </Panel>
  );
}

export function SubirVideoForm() {
  const [saved, setSaved] = useState(false);

  return (
    <Panel title="Subir vídeo para atividades (demonstração)">
      <form
        className="grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        <Field id="sv-titulo" label="Título da videoaula">
          <input id="sv-titulo" className={fieldClass} placeholder="Ex.: Sílabas com B" />
        </Field>
        <Field id="sv-disciplina" label="Disciplina">
          <select id="sv-disciplina" className={fieldClass} defaultValue="Língua Portuguesa">
            <option>Língua Portuguesa</option>
            <option>Matemática</option>
            <option>Comunicação</option>
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="sv-descricao" label="Descrição">
            <textarea id="sv-descricao" rows={2} className={fieldClass} placeholder="Sobre o que é a videoaula" />
          </Field>
        </div>
        <Field id="sv-arquivo" label="Selecionar arquivo de vídeo">
          <input id="sv-arquivo" type="file" accept="video/*" className={fieldClass} />
        </Field>
        <Field id="sv-link" label="Link de vídeo externo">
          <input id="sv-link" className={fieldClass} placeholder="https://…" />
        </Field>
        <div className="sm:col-span-2">
          <Field id="sv-instrucao" label="Instrução da atividade">
            <input id="sv-instrucao" className={fieldClass} placeholder="O que o aluno deve fazer" />
          </Field>
        </div>
        <Field id="sv-resposta" label="Resposta esperada">
          <input id="sv-resposta" className={fieldClass} placeholder="Resposta correta" />
        </Field>
        <Field id="sv-acesso" label="Método de acesso compatível">
          <select id="sv-acesso" className={fieldClass} defaultValue={acessos[0]}>
            {acessos.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <button type="submit" className={btnGreen}>
            Salvar rascunho
          </button>
        </div>
      </form>

      {saved && (
        <p className="mt-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm font-bold text-green-900">
          Rascunho registrado nesta demonstração (nenhum arquivo é enviado).
        </p>
      )}

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold leading-6 text-amber-900">
        <span aria-hidden="true">🚧 </span>
        Este recurso está em desenvolvimento. O envio real de arquivos dependerá
        de autenticação, armazenamento seguro, permissões de acesso e regras de
        proteção de dados.
      </div>
    </Panel>
  );
}

/* ================================================================== */
/* Chat do Assistente DAVI                                             */
/* ================================================================== */

type ChatMessage = { role: "user" | "assistant"; text: string };

const sampleQuestions = [
  "Como começo a usar o DAVI?",
  "Como uso o DAVI Vision?",
  "Como conecto um botão adaptado?",
  "Como crio uma atividade de Português?",
  "O que é o BioSinal?",
  "Como funciona o DAVI Escola?",
];

const cannedAnswers: { match: RegExp; answer: string }[] = [
  { match: /começ|comec|inici/i, answer: "Para começar, leia o Manual do Projeto e explore o DAVI Escola. Defina o método de acesso da pessoa em Acesso e Dispositivos e experimente uma atividade de demonstração." },
  { match: /vision|olhar|ocular/i, answer: "O DAVI Vision (em protótipo) usa câmera para interação por olhar, piscadas e movimentos da cabeça. Veja a página DAVI Vision e teste o simulador, sem uso real de câmera." },
  { match: /bot[aã]o|conect|dispositiv|bluetooth/i, answer: "Em DAVI Conecta você vê como botões, sensores e ESP32 enviam comandos por Bluetooth ou WebSocket. O painel de demonstração simula o pareamento e o envio de comandos." },
  { match: /portugu|atividade|alfabet/i, answer: "Em DAVI Escola → Língua Portuguesa há uma atividade demonstrativa com as sílabas BA, BE, BI, BO, BU: assista à explicação, escreva na caixa de texto e envie a resposta." },
  { match: /biosinal|eeg|emg|sinal/i, answer: "O BioSinal é um módulo experimental que estuda sinais biológicos (EEG, EMG, EOG, piscadas) como acesso. Não realiza diagnóstico e exige Comitê de Ética para pesquisas com pessoas." },
  { match: /escola|aprend/i, answer: "O DAVI Escola é o núcleo pedagógico: Português, Matemática, videoaulas, tarefas e os modos Aluno, Professor e Casa, com métricas de aprendizagem e de acesso." },
];

function answerFor(question: string): string {
  const found = cannedAnswers.find((a) => a.match.test(question));
  return (
    found?.answer ??
    "Esta é uma demonstração do Assistente DAVI. Posso orientar sobre os módulos (Escola, Comunicação, Vision, Conecta, BioSinal), métodos de acesso, catálogo e oficina maker. Em produção, responderei com base na documentação do projeto (arquitetura RAG)."
  );
}

export function AssistenteChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Olá! Sou o Assistente DAVI (demonstração). Como posso ajudar você a usar a plataforma?",
    },
  ]);
  const [input, setInput] = useState("");

  function send(question: string) {
    const q = question.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }, { role: "assistant", text: answerFor(q) }]);
    setInput("");
  }

  return (
    <Panel title="Assistente DAVI (demonstração)">
      <div
        className="flex max-h-[360px] flex-col gap-3 overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4"
        aria-live="polite"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
              m.role === "user"
                ? "self-end bg-blue-700 font-semibold text-white"
                : "self-start border border-zinc-200 bg-white font-medium text-zinc-800"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {sampleQuestions.map((q) => (
          <button
            key={q}
            type="button"
            className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-bold text-zinc-700 hover:border-blue-400 hover:text-blue-800"
            onClick={() => send(q)}
          >
            {q}
          </button>
        ))}
      </div>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label htmlFor="assistant-input" className="sr-only">
          Escreva sua pergunta
        </label>
        <input
          id="assistant-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreva sua pergunta…"
          className={`flex-1 rounded-lg border-2 border-zinc-300 bg-white px-4 py-3 text-base font-semibold text-zinc-950 ${focusRing}`}
        />
        <button type="submit" className={btnBlue}>
          Enviar
        </button>
      </form>

      <DemoNote>
        O Assistente DAVI oferece orientações de uso da plataforma. Ele não
        realiza diagnóstico, não substitui professores, terapeutas, cuidadores
        ou profissionais especializados. Recurso em desenvolvimento.
      </DemoNote>
    </Panel>
  );
}

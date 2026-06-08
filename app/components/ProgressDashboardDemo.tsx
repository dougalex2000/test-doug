"use client";

import { useState } from "react";

type SessionLog = {
  date: string;
  duration: number; // min
  activity: string;
  accuracy: number; // %
  wordsPerMin: number;
  autonomy: number; // %
  notes: string;
};

type PatientProfile = {
  name: string;
  age: number;
  condition: string;
  accessMethod: string;
  since: string;
  stats: {
    totalSessions: number;
    hoursActive: number;
    avgAutonomy: number;
    currentAccuracy: number;
  };
  history: SessionLog[];
};

const PATIENT_PROFILES: Record<string, PatientProfile> = {
  Davi: {
    name: "Davi Castillo",
    age: 9,
    condition: "Paralisia cerebral espástica com limitação motora severa nos quatro membros.",
    accessMethod: "Rastreamento ocular com calibração e seleção por permanência.",
    since: "Abril de 2026",
    stats: {
      totalSessions: 18,
      hoursActive: 12.5,
      avgAutonomy: 84,
      currentAccuracy: 92,
    },
    history: [
      { date: "01/05/2026", duration: 30, activity: "Prancha Básica", accuracy: 70, wordsPerMin: 0, autonomy: 50, notes: "Primeiro contato. Grande entusiasmo. Precisou de ajuda para calibrar devido à movimentação de cabeça." },
      { date: "08/05/2026", duration: 40, activity: "Alfabetização - Bola", accuracy: 78, wordsPerMin: 3.2, autonomy: 65, notes: "Melhora no foco visual. Conseguiu soletrar a palavra 'BOLA' de forma independente após algumas tentativas." },
      { date: "15/05/2026", duration: 45, activity: "Teclado Assistivo", accuracy: 82, wordsPerMin: 4.5, autonomy: 78, notes: "Escreveu seu próprio nome pela primeira vez usando o olhar. Ajustamos o dwell time para 1.2s." },
      { date: "22/05/2026", duration: 50, activity: "Comunicação Prancha", accuracy: 88, wordsPerMin: 5.0, autonomy: 85, notes: "Excelente precisão na seleção de ícones rápidos. Conseguiu comunicar que sentia sede sem ajuda." },
      { date: "29/05/2026", duration: 60, activity: "Alfabetização Livre", accuracy: 92, wordsPerMin: 6.8, autonomy: 92, notes: "Uso autônomo completo. Digitou frases de até 5 palavras com rapidez e vocalizou usando o Speech Synthesis." },
    ],
  },
  Ana: {
    name: "Ana Souza",
    age: 12,
    condition: "Atrofia Muscular Espinhal (AME) Tipo 1.",
    accessMethod: "Rastreamento visual combinado com acionador de sopro ultra sensível.",
    since: "Maio de 2026",
    stats: {
      totalSessions: 10,
      hoursActive: 7.2,
      avgAutonomy: 76,
      currentAccuracy: 88,
    },
    history: [
      { date: "04/05/2026", duration: 25, activity: "Calibração e Foco", accuracy: 65, wordsPerMin: 0, autonomy: 40, notes: "Apresentou fadiga ocular rápida. Sessão foi dividida em pequenos blocos de 5 minutos." },
      { date: "11/05/2026", duration: 30, activity: "Prancha Alternativa", accuracy: 74, wordsPerMin: 1.8, autonomy: 55, notes: "Adaptação do sensor de sopro para confirmar clique visual reduziu a fadiga consideravelmente." },
      { date: "18/05/2026", duration: 40, activity: "Alfabetização Básica", accuracy: 80, wordsPerMin: 2.8, autonomy: 70, notes: "Conseguiu realizar as tarefas de escolha de vogais com taxa de acerto de 80%." },
      { date: "25/05/2026", duration: 45, activity: "Teclado Assistivo", accuracy: 88, wordsPerMin: 3.5, autonomy: 88, notes: "Consistente. A combinação olhar+sopro permitiu uma velocidade de escrita estável sem cansaço precoce." },
    ],
  },
  Lucas: {
    name: "Lucas Pimenta",
    age: 8,
    condition: "Transtorno do Espectro Autista (TEA) nível 3 com apraxia da fala severa.",
    accessMethod: "Toque em tela com prancha de alta sensibilidade e keyguard físico.",
    since: "Fevereiro de 2026",
    stats: {
      totalSessions: 32,
      hoursActive: 24.0,
      avgAutonomy: 90,
      currentAccuracy: 95,
    },
    history: [
      { date: "02/02/2026", duration: 35, activity: "Identificar Imagens", accuracy: 85, wordsPerMin: 0, autonomy: 70, notes: "O uso da grade física (keyguard) impediu toques involuntários e acalmou a impulsividade." },
      { date: "16/02/2026", duration: 45, activity: "Montar Frases", accuracy: 90, wordsPerMin: 0, autonomy: 85, notes: "Uso excelente das pranchas para construir pedidos rápidos (Quero + Brincar)." },
      { date: "02/03/2026", duration: 50, activity: "Alfabetização - Sílabas", accuracy: 95, wordsPerMin: 5.5, autonomy: 90, notes: "Identificou corretamente 90% das sílabas na atividade adaptada. Grande foco nas imagens." },
    ],
  },
};

export default function ProgressDashboardDemo() {
  const [selectedPatient, setSelectedPatient] = useState<string>("Davi");
  const [newLog, setNewLog] = useState<Partial<SessionLog>>({
    activity: "Alfabetização",
    notes: "",
    duration: 30,
    accuracy: 85,
    wordsPerMin: 4,
    autonomy: 80,
  });
  const [patientData, setPatientData] = useState<Record<string, PatientProfile>>(PATIENT_PROFILES);

  const activePatient = patientData[selectedPatient];

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.notes) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR");

    const fullLog: SessionLog = {
      date: formattedDate,
      duration: Number(newLog.duration || 30),
      activity: newLog.activity || "Atividade",
      accuracy: Number(newLog.accuracy || 80),
      wordsPerMin: Number(newLog.wordsPerMin || 0),
      autonomy: Number(newLog.autonomy || 70),
      notes: newLog.notes,
    };

    setPatientData((prev) => {
      const currentPatient = prev[selectedPatient];
      const updatedHistory = [...currentPatient.history, fullLog];
      const updatedStats = {
        totalSessions: currentPatient.stats.totalSessions + 1,
        hoursActive: Number((currentPatient.stats.hoursActive + fullLog.duration / 60).toFixed(1)),
        avgAutonomy: Math.round(updatedHistory.reduce((sum, h) => sum + h.autonomy, 0) / updatedHistory.length),
        currentAccuracy: fullLog.accuracy,
      };

      return {
        ...prev,
        [selectedPatient]: {
          ...currentPatient,
          stats: updatedStats,
          history: updatedHistory,
        },
      };
    });

    setNewLog({
      activity: "Alfabetização",
      notes: "",
      duration: 30,
      accuracy: 85,
      wordsPerMin: 4,
      autonomy: 80,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate simple SVG line coordinates for historical progression
  const points = activePatient.history;
  const maxVal = 100;
  const width = 500;
  const height = 150;
  const padding = 30;

  const getCoordinates = (type: "accuracy" | "autonomy") => {
    if (points.length < 2) return "";
    const dx = (width - padding * 2) / (points.length - 1);
    return points
      .map((p, index) => {
        const val = type === "accuracy" ? p.accuracy : p.autonomy;
        const x = padding + index * dx;
        const y = height - padding - (val / maxVal) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl print:bg-white print:text-zinc-950 print:border-none print:shadow-none">
      <div className="flex flex-col gap-6">
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4 print:border-zinc-200">
          <div>
            <h3 className="text-xl font-bold text-white print:text-zinc-950 flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-blue-500 print:hidden" />
              Painel de Acompanhamento e Evolução
            </h3>
            <p className="text-xs text-zinc-400 print:text-zinc-600 mt-0.5">
              Indicadores funcionais, pedagógicos e de engajamento clínico/escolar.
            </p>
          </div>
          <div className="flex items-center gap-3 print:hidden">
            {/* Patient Selector */}
            <div className="flex items-center gap-2 rounded-xl bg-zinc-950 px-3 py-1.5 border border-zinc-800">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Aluno:</span>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="bg-transparent text-sm font-black text-blue-400 border-none outline-none cursor-pointer"
              >
                {Object.keys(patientData).map((name) => (
                  <option key={name} value={name} className="bg-zinc-950 text-white">{name}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 text-xs font-bold border border-zinc-700 transition"
            >
              🖨️ Exportar Relatório
            </button>
          </div>
        </div>

        {/* Patient Profile Card */}
        <div className="grid md:grid-cols-3 gap-6 rounded-2xl bg-zinc-950/50 border border-zinc-800/80 p-5 print:border-zinc-300 print:bg-zinc-50">
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-baseline gap-2">
              <h4 className="text-2xl font-black text-white print:text-zinc-950">{activePatient.name}</h4>
              <span className="text-sm text-zinc-400 print:text-zinc-600">({activePatient.age} anos)</span>
            </div>
            <p className="text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
              <strong className="text-zinc-400 print:text-zinc-500">Perfil Clínico:</strong> {activePatient.condition}
            </p>
            <p className="text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
              <strong className="text-zinc-400 print:text-zinc-500">Forma de Acesso:</strong> {activePatient.accessMethod}
            </p>
            <p className="text-xs text-zinc-500 print:text-zinc-400">
              Acompanhado desde {activePatient.since}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-zinc-950 p-4 rounded-xl border border-zinc-850/80 print:bg-white print:border-zinc-200">
            <div className="text-center p-2">
              <span className="block text-[10px] font-bold text-zinc-500 uppercase">Sessões</span>
              <span className="text-2xl font-black text-white print:text-zinc-950">{activePatient.stats.totalSessions}</span>
            </div>
            <div className="text-center p-2">
              <span className="block text-[10px] font-bold text-zinc-500 uppercase">Horas Uso</span>
              <span className="text-2xl font-black text-white print:text-zinc-950">{activePatient.stats.hoursActive}h</span>
            </div>
            <div className="text-center p-2 border-t border-zinc-850 print:border-zinc-100">
              <span className="block text-[10px] font-bold text-zinc-500 uppercase">Autonomia</span>
              <span className="text-2xl font-black text-emerald-400 print:text-emerald-600">{activePatient.stats.avgAutonomy}%</span>
            </div>
            <div className="text-center p-2 border-t border-zinc-850 print:border-zinc-100">
              <span className="block text-[10px] font-bold text-zinc-500 uppercase">Precisão Gaze</span>
              <span className="text-2xl font-black text-blue-400 print:text-blue-600">{activePatient.stats.currentAccuracy}%</span>
            </div>
          </div>
        </div>

        {/* Charts & Graphs (using SVGs) */}
        <div className="grid lg:grid-cols-2 gap-6 print:block">
          {/* Accuracy & Autonomy Trend Chart */}
          <div className="flex flex-col gap-3 rounded-2xl bg-zinc-950 p-5 border border-zinc-800/60 print:border-zinc-200 print:bg-white print:p-2 print:my-4">
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 print:text-zinc-700">Curva de Evolução (%)</h5>
            <div className="relative w-full aspect-[10/3] min-h-[150px] bg-zinc-900/40 rounded-xl border border-zinc-800/40 p-2 print:bg-zinc-50 print:border-zinc-200">
              {activePatient.history.length >= 2 ? (
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#3f3f46" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#3f3f46" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#71717a" strokeWidth="0.8" />

                  {/* Accuracy Line */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={getCoordinates("accuracy")}
                  />
                  {/* Autonomy Line */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={getCoordinates("autonomy")}
                  />

                  {/* Data Points dot circles */}
                  {activePatient.history.map((h, idx) => {
                    const dx = (width - padding * 2) / (activePatient.history.length - 1);
                    const x = padding + idx * dx;
                    const yAcc = height - padding - (h.accuracy / maxVal) * (height - padding * 2);
                    const yAut = height - padding - (h.autonomy / maxVal) * (height - padding * 2);

                    return (
                      <g key={idx}>
                        <circle cx={x} cy={yAcc} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                        <circle cx={x} cy={yAut} r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                        <text x={x} y={height - 10} textAnchor="middle" fill="#71717a" fontSize="8" fontWeight="bold">
                          {h.date.slice(0, 5)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-zinc-500">Dados insuficientes para desenhar gráfico.</div>
              )}
            </div>
            <div className="flex justify-center gap-6 text-[10px] font-bold">
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="h-2 w-4 bg-blue-500 rounded" /> Precisão do Olhar
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-2 w-4 bg-emerald-500 rounded" /> Índice de Autonomia
              </span>
            </div>
          </div>

          {/* Typing Performance Chart */}
          <div className="flex flex-col gap-3 rounded-2xl bg-zinc-950 p-5 border border-zinc-800/60 print:border-zinc-200 print:bg-white print:p-2">
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 print:text-zinc-700">Velocidade de Escrita (Palavras por Minuto)</h5>
            <div className="flex flex-col gap-3 justify-center py-2 h-full">
              {activePatient.history.map((h, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-zinc-400 w-12 print:text-zinc-650">{h.date}</span>
                  <div className="flex-1 h-3.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/65 print:bg-zinc-150 print:border-zinc-300">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all"
                      style={{ width: `${Math.min(100, (h.wordsPerMin / 10) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-extrabold text-white w-12 print:text-zinc-950 text-right">{h.wordsPerMin || "-"} PPM</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Historical Logs List */}
        <div className="flex flex-col gap-3">
          <h5 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 print:text-zinc-700">Histórico de Observações de Sessão</h5>
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
            {activePatient.history
              .slice()
              .reverse()
              .map((log, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-850/80 bg-zinc-950/60 p-4 flex flex-col sm:flex-row gap-3 justify-between print:border-zinc-200 print:bg-white"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-white print:text-zinc-950 bg-zinc-800 print:bg-zinc-200 px-2 py-0.5 rounded">
                        {log.date}
                      </span>
                      <span className="text-xs font-bold text-blue-400 print:text-blue-600">
                        {log.activity}
                      </span>
                      <span className="text-xs text-zinc-500">
                        ({log.duration} min)
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-300 print:text-zinc-850 leading-relaxed italic">
                      &ldquo;{log.notes}&rdquo;
                    </p>
                  </div>
                  <div className="flex sm:flex-col justify-between items-center sm:items-end gap-2 shrink-0 border-t sm:border-t-0 border-zinc-850 pt-2 sm:pt-0">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Métricas</span>
                    <div className="flex gap-3">
                      <span className="text-xs font-semibold text-zinc-400">Precisão: <strong className="text-white print:text-zinc-900">{log.accuracy}%</strong></span>
                      <span className="text-xs font-semibold text-zinc-400">Autonomia: <strong className="text-white print:text-zinc-900">{log.autonomy}%</strong></span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Observation Logging Form */}
        <form onSubmit={handleAddLog} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 flex flex-col gap-4 print:hidden">
          <h5 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">Registrar Observação de Sessão</h5>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="log-activity" className="text-xs font-bold text-zinc-400">Atividade</label>
              <input
                id="log-activity"
                type="text"
                value={newLog.activity}
                onChange={(e) => setNewLog((prev) => ({ ...prev, activity: e.target.value }))}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="log-duration" className="text-xs font-bold text-zinc-400">Duração (min)</label>
              <input
                id="log-duration"
                type="number"
                value={newLog.duration}
                onChange={(e) => setNewLog((prev) => ({ ...prev, duration: Number(e.target.value) }))}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="log-accuracy" className="text-xs font-bold text-zinc-400">Precisão Olhar (%)</label>
              <input
                id="log-accuracy"
                type="number"
                value={newLog.accuracy}
                onChange={(e) => setNewLog((prev) => ({ ...prev, accuracy: Number(e.target.value) }))}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="log-autonomy" className="text-xs font-bold text-zinc-400">Autonomia (%)</label>
              <input
                id="log-autonomy"
                type="number"
                value={newLog.autonomy}
                onChange={(e) => setNewLog((prev) => ({ ...prev, autonomy: Number(e.target.value) }))}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="log-notes" className="text-xs font-bold text-zinc-400">Observações / Notas Clínicas e Escolares</label>
            <textarea
              id="log-notes"
              value={newLog.notes}
              onChange={(e) => setNewLog((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Descreva a atitude do aluno, dificuldades observadas, melhorias notadas..."
              rows={3}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white outline-none focus:border-blue-500 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="self-end rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-6 py-2.5 text-xs shadow-lg shadow-blue-900/40 transition"
          >
            ➕ Adicionar Registro
          </button>
        </form>
      </div>
    </div>
  );
}

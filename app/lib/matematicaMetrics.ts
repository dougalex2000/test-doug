/**
 * Métricas simples do DAVI Escola — Matemática, salvas em localStorage.
 * Mesma API de `portuguesMetrics.ts`, pronta para migrar ao Supabase depois.
 */

export type MetricaEventoMat = {
  ts: number;
  aula: string;
  tipo:
    | "acesso"
    | "resposta"
    | "exercicio_concluido"
    | "aula_concluida"
    | "tts"
    | "varredura"
    | "pausa"
    | "repeticao";
  correto?: boolean;
  tentativas?: number;
  tempoMs?: number;
  detalhe?: string;
};

const KEY = "davi-matematica-metricas";
const LIMITE = 500;

function disponivel(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function registrarMat(ev: Omit<MetricaEventoMat, "ts">): void {
  if (!disponivel()) return;
  try {
    const atual = lerMetricasMat();
    const lista = [{ ts: Date.now(), ...ev }, ...atual].slice(0, LIMITE);
    window.localStorage.setItem(KEY, JSON.stringify(lista));
  } catch {
    /* localStorage cheio ou indisponível — ignora silenciosamente */
  }
}

export function lerMetricasMat(): MetricaEventoMat[] {
  if (!disponivel()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MetricaEventoMat[]) : [];
  } catch {
    return [];
  }
}

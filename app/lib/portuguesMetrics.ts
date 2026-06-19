/**
 * Métricas simples do DAVI Escola — Português, salvas em localStorage.
 * Estrutura pensada para depois migrar para o Supabase sem mudar a API.
 */

export type MetricaEvento = {
  ts: number;
  aula: string;
  tipo:
    | "acesso"
    | "resposta"
    | "exercicio_concluido"
    | "aula_concluida"
    | "tts"
    | "varredura";
  correto?: boolean;
  tentativas?: number;
  tempoMs?: number;
  detalhe?: string;
};

const KEY = "davi-portugues-metricas";
const LIMITE = 500;

function disponivel(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function registrar(ev: Omit<MetricaEvento, "ts">): void {
  if (!disponivel()) return;
  try {
    const atual = lerMetricas();
    const lista = [{ ts: Date.now(), ...ev }, ...atual].slice(0, LIMITE);
    window.localStorage.setItem(KEY, JSON.stringify(lista));
  } catch {
    /* localStorage cheio ou indisponível — ignora silenciosamente */
  }
}

export function lerMetricas(): MetricaEvento[] {
  if (!disponivel()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MetricaEvento[]) : [];
  } catch {
    return [];
  }
}

/** Resumo por aula, útil para um painel futuro. */
export function resumoDaAula(aula: string) {
  const eventos = lerMetricas().filter((e) => e.aula === aula);
  const respostas = eventos.filter((e) => e.tipo === "resposta");
  return {
    acessos: eventos.filter((e) => e.tipo === "acesso").length,
    respostas: respostas.length,
    acertos: respostas.filter((e) => e.correto).length,
    erros: respostas.filter((e) => e.correto === false).length,
    exerciciosConcluidos: eventos.filter((e) => e.tipo === "exercicio_concluido").length,
    usosTTS: eventos.filter((e) => e.tipo === "tts").length,
    usosVarredura: eventos.filter((e) => e.tipo === "varredura").length,
    concluida: eventos.some((e) => e.tipo === "aula_concluida"),
  };
}

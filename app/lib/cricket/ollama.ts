/**
 * Cliente do Ollama — executado SOMENTE no servidor.
 *
 * O navegador nunca fala com o Ollama diretamente (item 12 da especificação):
 * em produção o endereço do Ollama costuma ser interno e a porta não deve ficar
 * exposta. O caminho é sempre navegador → rota /api/davi-mentor/* → Ollama.
 *
 * O modelo nunca é fixado em código: vem de OLLAMA_MODEL.
 */

export type OllamaChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
  /** Imagens em base64 puro (sem o prefixo data:). Usado por modelos multimodais. */
  images?: string[];
};

export type OllamaResult =
  | { ok: true; text: string; model: string }
  | { ok: false; error: string; model: string };

/** Endereço do Ollama. Em desenvolvimento, o padrão local do próprio Ollama. */
export function ollamaBaseUrl(): string {
  return (process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434").replace(/\/$/, "");
}

export function ollamaModel(): string {
  return process.env.OLLAMA_MODEL ?? "qwen3:8b";
}

/** Timeout generoso: modelos locais em CPU podem demorar na primeira resposta. */
const TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS ?? 60_000);

async function withTimeout<T>(
  run: (signal: AbortSignal) => Promise<T>,
  ms: number,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await run(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

/** Converte uma data URL de imagem no base64 puro que o Ollama espera. */
export function dataUrlToBase64(dataUrl: string): string | null {
  const match = /^data:image\/[a-zA-Z+]+;base64,(.+)$/.exec(dataUrl.trim());
  return match ? match[1] : null;
}

/**
 * Verifica se o Ollama responde e se o modelo configurado está disponível.
 * Nunca lança: o status alimenta o indicador da interface.
 */
export async function checkOllama(): Promise<{
  online: boolean;
  model: string;
  modelAvailable: boolean;
  baseUrl: string;
  error?: string;
}> {
  const baseUrl = ollamaBaseUrl();
  const model = ollamaModel();
  try {
    const res = await withTimeout(
      (signal) => fetch(`${baseUrl}/api/tags`, { signal, cache: "no-store", headers: process.env.OLLAMA_GATEWAY_TOKEN ? { Authorization: `Bearer ${process.env.OLLAMA_GATEWAY_TOKEN}` } : {} }),
      5_000,
    );
    if (!res.ok) {
      return { online: false, model, modelAvailable: false, baseUrl, error: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as { models?: Array<{ name?: string }> };
    const nomes = (data.models ?? []).map((m) => m.name ?? "");
    // O Ollama reporta "qwen3:8b"; aceitamos também o nome sem a tag.
    const modelAvailable = nomes.some(
      (n) => n === model || (!model.includes(":") && n === `${model}:latest`),
    );
    return { online: true, model, modelAvailable, baseUrl };
  } catch (e) {
    const error = e instanceof Error ? e.message : "falha desconhecida";
    return { online: false, model, modelAvailable: false, baseUrl, error };
  }
}

/**
 * Envia uma conversa ao Ollama e devolve o texto da resposta.
 * Erros viram `{ ok: false }` — quem chama decide a mensagem para a pessoa.
 */
export async function ollamaChat(messages: OllamaChatMessage[]): Promise<OllamaResult> {
  const baseUrl = ollamaBaseUrl();
  const model = ollamaModel();

  try {
    const res = await withTimeout(
      (signal) =>
        fetch(`${baseUrl}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...(process.env.OLLAMA_GATEWAY_TOKEN ? { Authorization: `Bearer ${process.env.OLLAMA_GATEWAY_TOKEN}` } : {}) },
          cache: "no-store",
          signal,
          body: JSON.stringify({
            model,
            messages,
            stream: false,
            options: {
              // Respostas curtas: a interface é usada durante atividades.
              num_predict: Number(process.env.OLLAMA_NUM_PREDICT ?? 320),
              temperature: 0.4,
            },
          }),
        }),
      TIMEOUT_MS,
    );

    if (!res.ok) {
      const detalhe = (await res.text()).slice(0, 200);
      return { ok: false, error: `Ollama respondeu HTTP ${res.status}: ${detalhe}`, model };
    }

    const data = (await res.json()) as {
      message?: { content?: string; thinking?: string };
    };
    const text = (data.message?.content ?? "").trim();

    if (!text) {
      /**
       * Modelos de raciocínio (qwen3-vl, deepseek-r1 e afins) devolvem o
       * rascunho em `thinking` e podem esgotar o orçamento de tokens antes de
       * escrever a resposta — `content` volta vazio. O rascunho nunca deve ser
       * mostrado à pessoa, então a mensagem aqui serve para diagnóstico.
       */
      const pensou = (data.message?.thinking ?? "").trim().length > 0;
      return {
        ok: false,
        error: pensou
          ? `O modelo ${model} consumiu o limite de tokens raciocinando e não produziu resposta. Prefira um modelo que responde direto (ex.: minicpm-v) ou aumente OLLAMA_NUM_PREDICT.`
          : "Resposta vazia do modelo.",
        model,
      };
    }

    return { ok: true, text, model };
  } catch (e) {
    const error =
      e instanceof Error && e.name === "AbortError"
        ? `Tempo esgotado (${TIMEOUT_MS} ms)`
        : e instanceof Error
          ? e.message
          : "falha desconhecida";
    return { ok: false, error, model };
  }
}

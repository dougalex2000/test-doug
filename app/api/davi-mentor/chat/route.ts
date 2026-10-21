import { NextResponse } from "next/server";
import {
  dataUrlToBase64,
  ollamaChat,
  type OllamaChatMessage,
} from "../../../lib/cricket/ollama";
import {
  MENTOR_OFFLINE_MESSAGE,
  daviMentorSystemPrompt,
} from "../../../lib/cricket/prompts/daviMentorSystemPrompt";
import { contextToPrompt } from "../../../lib/cricket/context";
import { isCricketContext } from "../../../lib/cricket/validation";
import type {
  AssistanceLevel,
  MentorAction,
  MentorRequest,
  MentorResponse,
} from "../../../lib/cricket/types";

/**
 * Gateway CRICKET → Ollama.
 *
 * O navegador manda a pergunta e o contexto cognitivo; aqui montamos o prompt,
 * conversamos com o modelo e devolvemos só o texto final. Nenhuma credencial do
 * Ollama chega ao cliente, e o endereço do servidor de modelo não é exposto.
 *
 * Nunca armazena imagem: o frame recebido é usado na chamada e descartado.
 */

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
/** Modelo local pode demorar; Fluid Compute permite execuções longas. */
export const maxDuration = 120;

const NO_STORE = { "Cache-Control": "no-store, max-age=0, must-revalidate" };

const NIVEIS: AssistanceLevel[] = ["leve", "moderado", "intensivo"];

/**
 * Modelos de raciocínio (qwen3 e similares) devolvem o rascunho entre <think>.
 * Isso nunca deve chegar ao usuário — nem ser falado pelo TTS.
 */
function stripReasoning(text: string): string {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<\/?think>/gi, "")
    .trim();
}

function responder(body: MentorResponse, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

export async function POST(request: Request) {
  let parsed: MentorRequest;
  try {
    parsed = (await request.json()) as MentorRequest;
  } catch {
    return responder(
      {
        text: "Não entendi a solicitação.",
        model: "-",
        createdAt: new Date().toISOString(),
        degraded: true,
      },
      400,
    );
  }

  const payload = parsed?.payload;
  const userMessage = typeof payload?.userMessage === "string" ? payload.userMessage.trim() : "";
  const context = payload?.context;

  if (!userMessage || !isCricketContext(context) ||
    (payload?.imageDataUrl !== undefined && (typeof payload.imageDataUrl !== "string" || !dataUrlToBase64(payload.imageDataUrl)))) {
    return responder(
      {
        text: "Preciso de uma pergunta e do contexto da sessão para responder.",
        model: "-",
        createdAt: new Date().toISOString(),
        degraded: true,
      },
      400,
    );
  }

  const level: AssistanceLevel = NIVEIS.includes(context.eu?.assistanceLevel)
    ? context.eu.assistanceLevel
    : "moderado";
  const action = payload.action as MentorAction | undefined;

  // Frame capturado sob demanda — só vai ao modelo quando existe de fato.
  const base64 = payload.imageDataUrl ? dataUrlToBase64(payload.imageDataUrl) : null;

  const messages: OllamaChatMessage[] = [
    { role: "system", content: daviMentorSystemPrompt(level, action) },
    {
      role: "user",
      /**
       * A ordem importa: com imagem anexada, a pergunta visual vem primeiro e o
       * contexto depois. Colocar o bloco EU/OUTROS/MUNDO antes dispersa a
       * atenção do modelo e faz com que ele descreva uma cena plausível em vez
       * da imagem real — o pior defeito possível num apoio à percepção.
       */
      content: base64
        ? [
            "Olhe a imagem anexada.",
            `PERGUNTA DA PESSOA: ${userMessage}`,
            "Responda descrevendo apenas o que está visível na imagem.",
            "",
            "Contexto da pessoa (use só se ajudar):",
            contextToPrompt(context),
          ].join("\n")
        : [
            "CONTEXTO CRICKET ATUAL:",
            contextToPrompt(context),
            "",
            "NENHUMA IMAGEM FOI ENVIADA. Você não está vendo nada agora.",
            "",
            `PERGUNTA DA PESSOA: ${userMessage}`,
          ].join("\n"),
    },
  ];

  if (base64) {
    messages[messages.length - 1].images = [base64];
  }

  const result = await ollamaChat(messages);

  if (!result.ok) {
    // Degrada com elegância: a interface segue utilizável e a pessoa é avisada.
    return responder({
      text: MENTOR_OFFLINE_MESSAGE,
      model: result.model,
      createdAt: new Date().toISOString(),
      degraded: true,
    });
  }

  const limpo = stripReasoning(result.text);

  return responder({
    text: limpo || MENTOR_OFFLINE_MESSAGE,
    model: result.model,
    createdAt: new Date().toISOString(),
    degraded: limpo.length === 0,
  });
}

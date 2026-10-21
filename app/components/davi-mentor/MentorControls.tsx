"use client";

import type { MentorAction, MentorCapability } from "../../lib/cricket/types";
import { focusRing } from "./ui";

/**
 * Botões grandes da interface operacional (item 8 da especificação).
 *
 * Cada botão vira uma intenção explícita — e é só nesse momento que um frame
 * da câmera é capturado e enviado. Não há captura em segundo plano.
 */

type Acao = {
  id: MentorAction;
  rotulo: string;
  /** Pergunta enviada ao modelo quando o botão é tocado. */
  mensagem: string;
  /** Precisa de um frame da câmera. */
  usaImagem: boolean;
  capacidades?: MentorCapability[];
  destaque?: boolean;
};

export const ACOES: Acao[] = [
  {
    id: "analisar-ambiente",
    capacidades: ["descricao-ambiente", "reconhecimento-contextual"],
    rotulo: "Analisar ambiente",
    mensagem: "Descreva o ambiente ao meu redor.",
    usaImagem: true,
  },
  {
    id: "quem-e-essa-pessoa",
    capacidades: ["memoria-pessoas"],
    rotulo: "Quem é essa pessoa?",
    mensagem: "Quem é a pessoa que estou vendo?",
    usaImagem: true,
  },
  {
    id: "o-que-estou-vendo",
    capacidades: ["reconhecimento-objetos", "leitura-textos"],
    rotulo: "O que estou vendo?",
    mensagem: "O que está à minha frente?",
    usaImagem: true,
  },
  {
    id: "onde-esta",
    capacidades: ["localizacao-objetos", "orientacao-espacial"],
    rotulo: "Onde está?",
    mensagem: "Me ajude a encontrar o que estou procurando.",
    usaImagem: true,
  },
  {
    id: "lembrar",
    capacidades: ["lembretes-tarefas", "rotinas", "organizacao-compromissos", "memoria-recente"],
    rotulo: "Lembrar",
    mensagem: "Do que eu preciso lembrar agora?",
    usaImagem: false,
  },
  {
    id: "ajude-me",
    rotulo: "Ajude-me",
    mensagem: "Preciso de ajuda.",
    usaImagem: false,
    destaque: true,
  },
];

export function MentorControls({
  capacidades,
  ocupado,
  ouvindo,
  falando,
  onAcao,
  onFalar,
  onParar,
}: {
  capacidades: MentorCapability[];
  ocupado: boolean;
  ouvindo: boolean;
  falando: boolean;
  onAcao: (acao: Acao) => void;
  onFalar: () => void;
  onParar: () => void;
}) {
  return (
    <div className="grid gap-3">
      {/* Falar e Parar ficam em destaque: são as ações de uso contínuo. */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onFalar}
          disabled={ocupado}
          aria-pressed={ouvindo}
          className={`flex min-h-[72px] items-center justify-center rounded-xl px-4 py-4 text-lg font-black transition disabled:opacity-50 ${focusRing} ${
            ouvindo
              ? "animate-pulse bg-red-600 text-white"
              : "bg-blue-700 text-white hover:bg-blue-800"
          }`}
        >
          {ouvindo ? "Ouvindo…" : "Falar"}
        </button>
        <button
          type="button"
          onClick={onParar}
          disabled={!falando && !ouvindo}
          className={`flex min-h-[72px] items-center justify-center rounded-xl border-2 border-zinc-300 bg-white px-4 py-4 text-lg font-black text-zinc-950 transition hover:border-red-400 hover:text-red-700 disabled:opacity-40 ${focusRing}`}
        >
          Parar
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {ACOES.filter((acao) => !acao.capacidades || acao.capacidades.some((capacidade) => capacidades.includes(capacidade))).map((acao) => (
          <button
            key={acao.id}
            type="button"
            onClick={() => onAcao(acao)}
            disabled={ocupado}
            className={`flex min-h-[64px] items-center justify-center rounded-xl px-3 py-3 text-center text-base font-black transition disabled:opacity-50 ${focusRing} ${
              acao.destaque
                ? "bg-green-700 text-white hover:bg-green-800"
                : "border-2 border-zinc-300 bg-white text-zinc-950 hover:border-blue-400 hover:text-blue-800"
            }`}
          >
            {acao.rotulo}
          </button>
        ))}
      </div>
    </div>
  );
}

export type { Acao };

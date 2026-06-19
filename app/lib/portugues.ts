/**
 * DAVI Escola — Português: dados das aulas de alfabetização.
 *
 * Estrutura simples e fácil de expandir. Cada aula tem id, títulos, tipo,
 * sílabas, palavras, frase modelo, caminho de vídeo (próprio do DAVI, a ser
 * produzido) e exercícios. Letras sem aula explícita ganham uma aula padrão.
 */

export type Exercicio =
  | {
      id: string;
      tipo: "escolha";
      pergunta: string;
      opcoes: string[];
      correta: string;
    }
  | {
      id: string;
      tipo: "frase";
      pergunta: string;
      modelo: string;
    };

export type TipoAula = "introducao" | "vogais" | "letra" | "complexo";

export type Aula = {
  id: string;
  titulo: string;
  subtitulo: string;
  tipo: TipoAula;
  silabas: string[];
  palavras: string[];
  fraseModelo: string;
  videoUrl: string;
  exercicios: Exercicio[];
};

export const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const VOGAIS = ["A", "E", "I", "O", "U"];

export type ComplexoInfo = {
  id: string;
  rotulo: string;
  descricao: string;
  palavras: string[];
  frase: string;
};

export const COMPLEXOS: ComplexoInfo[] = [
  { id: "ch", rotulo: "CH", descricao: "Duas letras que formam um novo som.", palavras: ["CHAVE", "CHUVA", "CHÃO"], frase: "A chave abre a porta." },
  { id: "lh", rotulo: "LH", descricao: "Som de L molhado.", palavras: ["MALHA", "FOLHA", "TELHA"], frase: "A folha caiu no chão." },
  { id: "nh", rotulo: "NH", descricao: "Som nasal do N.", palavras: ["NINHO", "SONHO", "BANHO"], frase: "O passarinho fez um ninho." },
  { id: "bl", rotulo: "BL", descricao: "Encontro das letras B e L.", palavras: ["BLOCO", "BLUSA"], frase: "A blusa é azul." },
  { id: "br", rotulo: "BR", descricao: "Encontro das letras B e R.", palavras: ["BRAÇO", "BRINCO", "BRANCO"], frase: "O gato é branco." },
  { id: "nasalados", rotulo: "ÃO", descricao: "Sons nasalados, como em pão e mão.", palavras: ["PÃO", "MÃO", "CORAÇÃO"], frase: "Eu como pão com a mão." },
  { id: "qu", rotulo: "QU", descricao: "O Q quase sempre vem com U.", palavras: ["QUEIJO", "QUADRO", "QUERO"], frase: "Eu quero queijo." },
  { id: "gu", rotulo: "GU", descricao: "O G com U formando um som forte.", palavras: ["GUITARRA", "GUERRA", "ÁGUA"], frase: "A água é boa." },
  { id: "rr", rotulo: "RR", descricao: "R forte entre duas vogais.", palavras: ["CARRO", "TERRA", "FERRO"], frase: "O carro é vermelho." },
  { id: "ss", rotulo: "SS", descricao: "S forte entre duas vogais.", palavras: ["MASSA", "PÁSSARO", "OSSO"], frase: "O pássaro voa alto." },
];

/* ----------------------------------------------------------------- */
/* Aulas explícitas                                                   */
/* ----------------------------------------------------------------- */

const aulasExplicitas: Record<string, Aula> = {
  introducao: {
    id: "introducao",
    titulo: "Por que aprendemos a escrever?",
    subtitulo: "A história da comunicação: dos desenhos às palavras",
    tipo: "introducao",
    silabas: [],
    palavras: ["DESENHO", "SINAL", "LETRA", "PALAVRA", "FRASE"],
    fraseModelo: "Escrever é se comunicar.",
    videoUrl: "/videos/portugues/introducao.mp4",
    exercicios: [
      {
        id: "intro-1",
        tipo: "escolha",
        pergunta: "O que usamos para formar palavras?",
        opcoes: ["Letras", "Pedras", "Água"],
        correta: "Letras",
      },
      {
        id: "intro-2",
        tipo: "frase",
        pergunta: "Escreva ou copie a frase abaixo:",
        modelo: "Escrever é se comunicar.",
      },
    ],
  },

  vogais: {
    id: "vogais",
    titulo: "As Vogais",
    subtitulo: "A, E, I, O, U",
    tipo: "vogais",
    silabas: ["A", "E", "I", "O", "U"],
    palavras: ["AVIÃO", "ELEFANTE", "IGREJA", "OVO", "UVA"],
    fraseModelo: "Eu amo as vogais.",
    exercicios: [
      {
        id: "vog-1",
        tipo: "escolha",
        pergunta: "Qual destas é uma vogal?",
        opcoes: ["A", "B", "C"],
        correta: "A",
      },
      {
        id: "vog-2",
        tipo: "frase",
        pergunta: "Escreva ou copie a frase abaixo:",
        modelo: "Eu amo as vogais.",
      },
    ],
    videoUrl: "/videos/portugues/vogais.mp4",
  },

  b: {
    id: "b",
    titulo: "Família da Letra B",
    subtitulo: "BA, BE, BI, BO, BU",
    tipo: "letra",
    silabas: ["BA", "BE", "BI", "BO", "BU"],
    palavras: ["BOLA", "BALA", "BEBÊ", "BULE", "BANANA"],
    fraseModelo: "A bola é bonita.",
    videoUrl: "/videos/portugues/letra-b.mp4",
    exercicios: [
      {
        id: "b-1",
        tipo: "escolha",
        pergunta: "Qual sílaba começa a palavra BOLA?",
        opcoes: ["BA", "BE", "BI", "BO", "BU"],
        correta: "BO",
      },
      {
        id: "b-2",
        tipo: "escolha",
        pergunta: "BO + LA forma qual palavra?",
        opcoes: ["BOLA", "BALA", "BULE"],
        correta: "BOLA",
      },
      {
        id: "b-3",
        tipo: "frase",
        pergunta: "Escreva ou copie a frase abaixo:",
        modelo: "A bola é bonita.",
      },
    ],
  },
};

/* Aulas dos sons complexos (geradas a partir de COMPLEXOS). */
function aulaComplexo(info: ComplexoInfo): Aula {
  return {
    id: info.id,
    titulo: `Som ${info.rotulo}`,
    subtitulo: info.descricao,
    tipo: "complexo",
    silabas: info.palavras,
    palavras: info.palavras,
    fraseModelo: info.frase,
    videoUrl: `/videos/portugues/${info.id}.mp4`,
    exercicios: [
      {
        id: `${info.id}-1`,
        tipo: "escolha",
        pergunta: `Qual destas palavras tem o som ${info.rotulo}?`,
        opcoes: [info.palavras[0], "CASA", "BOLA"],
        correta: info.palavras[0],
      },
      {
        id: `${info.id}-2`,
        tipo: "frase",
        pergunta: "Escreva ou copie a frase abaixo:",
        modelo: info.frase,
      },
    ],
  };
}

/* Aula padrão para uma letra sem conteúdo próprio ainda. */
function aulaPadraoLetra(letra: string): Aula {
  const L = letra.toUpperCase();
  const silabas = VOGAIS.map((v) => `${L}${v}`);
  const outra = L === "M" ? "P" : "M";
  return {
    id: letra.toLowerCase(),
    titulo: `Família da Letra ${L}`,
    subtitulo: silabas.join(", "),
    tipo: "letra",
    silabas,
    palavras: [],
    fraseModelo: `Eu estou aprendendo a letra ${L}.`,
    videoUrl: `/videos/portugues/letra-${letra.toLowerCase()}.mp4`,
    exercicios: [
      {
        id: `${letra.toLowerCase()}-1`,
        tipo: "escolha",
        pergunta: `Qual destas é uma sílaba da letra ${L}?`,
        opcoes: [`${L}A`, `${outra}O`, `${outra}I`],
        correta: `${L}A`,
      },
      {
        id: `${letra.toLowerCase()}-2`,
        tipo: "frase",
        pergunta: "Escreva ou copie a frase abaixo:",
        modelo: `Eu estou aprendendo a letra ${L}.`,
      },
    ],
  };
}

/* ----------------------------------------------------------------- */
/* API                                                                */
/* ----------------------------------------------------------------- */

const complexById = new Map(COMPLEXOS.map((c) => [c.id, c]));

export function getAula(id: string): Aula | undefined {
  const key = id.toLowerCase();
  if (aulasExplicitas[key]) return aulasExplicitas[key];
  if (complexById.has(key)) return aulaComplexo(complexById.get(key)!);
  if (key.length === 1 && /[a-z]/.test(key)) return aulaPadraoLetra(key);
  return undefined;
}

/** Ordem de navegação para o botão "Próxima aula". */
export const ORDEM_AULAS: string[] = [
  "introducao",
  "vogais",
  ...LETRAS.map((l) => l.toLowerCase()),
  ...COMPLEXOS.map((c) => c.id),
];

export function getProxima(id: string): string | undefined {
  const i = ORDEM_AULAS.indexOf(id.toLowerCase());
  if (i < 0 || i + 1 >= ORDEM_AULAS.length) return undefined;
  return ORDEM_AULAS[i + 1];
}

/** Todos os ids para pré-renderização estática. */
export function todasAsAulasIds(): string[] {
  return ORDEM_AULAS;
}

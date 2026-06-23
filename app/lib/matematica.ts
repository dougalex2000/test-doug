/**
 * DAVI Escola — Matemática: dados das aulas.
 *
 * Estrutura simples e fácil de expandir, no mesmo espírito de `portugues.ts`.
 * Cada aula tem id, categoria, títulos, vídeo (YouTube ou .mp4 próprio — fácil
 * de trocar), um tipo de apoio visual e exercícios. Os exercícios podem ser de
 * escolha, de número (com teclado numérico) ou de resposta livre.
 */

export type MatExercicio =
  | {
      id: string;
      tipo: "escolha";
      pergunta: string;
      opcoes: string[];
      correta: string;
    }
  | {
      id: string;
      tipo: "numero";
      pergunta: string;
      resposta: string;
      objetos?: number; // quantos objetos mostrar como apoio visual
    }
  | {
      id: string;
      tipo: "aberto";
      pergunta: string;
    };

export type VisualType =
  | "counting"
  | "addition"
  | "subtraction"
  | "shapes"
  | "none";

export type AulaMat = {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: string;
  descricao: string;
  videoUrl: string;
  poster?: string; // imagem de prévia (opcional)
  visualType: VisualType;
  visualA?: number;
  visualB?: number;
  exercicios: MatExercicio[];
};

/** Ordem das categorias na página inicial. */
export const CATEGORIAS_MAT = [
  "Números",
  "Contagem",
  "Quantidades",
  "Operações",
  "Sequência e lógica",
  "Geometria",
  "Dinheiro e vida diária",
] as const;

export const AULAS_MAT: AulaMat[] = [
  // Números
  {
    id: "numeros-0-5",
    titulo: "Números de 0 a 5",
    subtitulo: "Reconhecer e contar de 0 a 5",
    categoria: "Números",
    descricao: "Vídeo autoral: conheça os números de 0 a 5 contando bolinhas.",
    videoUrl: "/videos/matematica/davi-matematica-01-numeros-0-a-5.mp4",
    poster: "/videos/matematica/davi-matematica-01-numeros-0-a-5-poster.png",
    visualType: "counting",
    visualA: 5,
    exercicios: [
      { id: "n5-1", tipo: "numero", pergunta: "Conte as bolinhas e digite o número.", resposta: "5", objetos: 5 },
      { id: "n5-2", tipo: "numero", pergunta: "Qual número vem depois do 4?", resposta: "5" },
    ],
  },
  {
    id: "numeros-0-10",
    titulo: "Números de 0 a 10",
    subtitulo: "Reconhecer, contar e escrever de 0 a 10",
    categoria: "Números",
    descricao: "Aprenda a reconhecer, contar e escrever os números de 0 a 10.",
    videoUrl: "",
    visualType: "counting",
    visualA: 10,
    exercicios: [
      { id: "n10-1", tipo: "numero", pergunta: "Conte as bolinhas e escreva o número.", resposta: "5", objetos: 5 },
      { id: "n10-2", tipo: "numero", pergunta: "Qual número vem depois do 3?", resposta: "4" },
      { id: "n10-3", tipo: "numero", pergunta: "Qual número vem antes do 7?", resposta: "6" },
    ],
  },
  {
    id: "numeros-0-20",
    titulo: "Números de 0 a 20",
    subtitulo: "Continuando a contagem até 20",
    categoria: "Números",
    descricao: "Reconheça e escreva os números de 0 a 20.",
    videoUrl: "",
    visualType: "counting",
    visualA: 20,
    exercicios: [
      { id: "n20-1", tipo: "numero", pergunta: "Qual número vem depois do 14?", resposta: "15" },
      { id: "n20-2", tipo: "escolha", pergunta: "Qual destes é maior?", opcoes: ["12", "18", "9"], correta: "18" },
    ],
  },

  // Contagem
  {
    id: "contar-objetos",
    titulo: "Contar objetos",
    subtitulo: "Quantos objetos há na imagem?",
    categoria: "Contagem",
    descricao: "Pratique a contagem observando grupos de objetos.",
    videoUrl: "",
    visualType: "counting",
    visualA: 6,
    exercicios: [
      { id: "co-1", tipo: "numero", pergunta: "Conte os objetos e escreva o número.", resposta: "6", objetos: 6 },
      { id: "co-2", tipo: "numero", pergunta: "Conte os objetos e escreva o número.", resposta: "3", objetos: 3 },
    ],
  },
  {
    id: "antes-depois",
    titulo: "Antes e depois",
    subtitulo: "O número que vem antes e o que vem depois",
    categoria: "Contagem",
    descricao: "Descubra qual número vem antes e qual vem depois.",
    videoUrl: "",
    visualType: "none",
    exercicios: [
      { id: "ad-1", tipo: "numero", pergunta: "Qual número vem antes do 5?", resposta: "4" },
      { id: "ad-2", tipo: "numero", pergunta: "Qual número vem depois do 9?", resposta: "10" },
    ],
  },
  {
    id: "maior-menor",
    titulo: "Maior e menor",
    subtitulo: "Comparando quantidades",
    categoria: "Contagem",
    descricao: "Aprenda a comparar e descobrir o maior e o menor.",
    videoUrl: "",
    visualType: "none",
    exercicios: [
      { id: "mm-1", tipo: "escolha", pergunta: "Qual número é maior?", opcoes: ["7", "3"], correta: "7" },
      { id: "mm-2", tipo: "escolha", pergunta: "Qual número é menor?", opcoes: ["8", "2", "5"], correta: "2" },
    ],
  },

  // Quantidades
  {
    id: "muito-pouco",
    titulo: "Muito e pouco",
    subtitulo: "Comparar quantidades grandes e pequenas",
    categoria: "Quantidades",
    descricao: "Entenda as ideias de muito, pouco, mais e menos.",
    videoUrl: "",
    visualType: "counting",
    visualA: 8,
    exercicios: [
      { id: "mp-1", tipo: "escolha", pergunta: "Onde há MAIS bolinhas: 8 ou 2?", opcoes: ["8", "2"], correta: "8" },
      { id: "mp-2", tipo: "aberto", pergunta: "Escreva uma coisa que você tem em POUCA quantidade." },
    ],
  },

  // Operações
  {
    id: "soma-simples",
    titulo: "Soma simples",
    subtitulo: "Juntar quantidades",
    categoria: "Operações",
    descricao: "Aprenda a juntar quantidades usando a soma.",
    videoUrl: "/videos/matematica/davi-matematica-02-soma-1-mais-1.mp4",
    poster: "/videos/matematica/davi-matematica-02-soma-1-mais-1-poster.png",
    visualType: "addition",
    visualA: 2,
    visualB: 3,
    exercicios: [
      { id: "soma-1", tipo: "numero", pergunta: "Quanto é 1 + 1?", resposta: "2" },
      { id: "soma-2", tipo: "numero", pergunta: "Quanto é 2 + 3?", resposta: "5", objetos: 5 },
      { id: "soma-3", tipo: "numero", pergunta: "Quanto é 4 + 2?", resposta: "6" },
    ],
  },
  {
    id: "subtracao-simples",
    titulo: "Subtração simples",
    subtitulo: "Tirar quantidades",
    categoria: "Operações",
    descricao: "Aprenda a tirar quantidades usando a subtração.",
    videoUrl: "",
    visualType: "subtraction",
    visualA: 5,
    visualB: 2,
    exercicios: [
      { id: "sub-1", tipo: "numero", pergunta: "Quanto é 5 - 2?", resposta: "3" },
      { id: "sub-2", tipo: "numero", pergunta: "Se eu tenho 4 maçãs e tiro 1, quantas ficam?", resposta: "3" },
    ],
  },
  {
    id: "multiplicacao-simples",
    titulo: "Multiplicação simples",
    subtitulo: "Grupos iguais",
    categoria: "Operações",
    descricao: "Multiplicar é juntar grupos iguais.",
    videoUrl: "",
    visualType: "none",
    exercicios: [
      { id: "mult-1", tipo: "numero", pergunta: "Quanto é 2 × 2?", resposta: "4" },
      { id: "mult-2", tipo: "numero", pergunta: "Quanto é 3 × 2?", resposta: "6" },
    ],
  },
  {
    id: "divisao-simples",
    titulo: "Divisão simples",
    subtitulo: "Repartir em partes iguais",
    categoria: "Operações",
    descricao: "Dividir é repartir uma quantidade em partes iguais.",
    videoUrl: "",
    visualType: "none",
    exercicios: [
      { id: "div-1", tipo: "numero", pergunta: "Quanto é 4 ÷ 2?", resposta: "2" },
      { id: "div-2", tipo: "numero", pergunta: "Quanto é 6 ÷ 3?", resposta: "2" },
    ],
  },

  // Sequência e lógica
  {
    id: "sequencia",
    titulo: "Complete a sequência",
    subtitulo: "Descobrir o próximo número",
    categoria: "Sequência e lógica",
    descricao: "Observe o padrão e complete a sequência.",
    videoUrl: "",
    visualType: "none",
    exercicios: [
      { id: "seq-1", tipo: "numero", pergunta: "Complete: 2, 4, 6, ___", resposta: "8" },
      { id: "seq-2", tipo: "numero", pergunta: "Complete: 1, 2, 3, ___", resposta: "4" },
    ],
  },
  {
    id: "pares-impares",
    titulo: "Pares e ímpares",
    subtitulo: "Reconhecer números pares e ímpares",
    categoria: "Sequência e lógica",
    descricao: "Aprenda a diferença entre números pares e ímpares.",
    videoUrl: "",
    visualType: "none",
    exercicios: [
      { id: "pi-1", tipo: "escolha", pergunta: "Qual número é PAR?", opcoes: ["3", "4", "7"], correta: "4" },
      { id: "pi-2", tipo: "escolha", pergunta: "Qual número é ÍMPAR?", opcoes: ["2", "6", "5"], correta: "5" },
    ],
  },

  // Geometria
  {
    id: "formas-geometricas",
    titulo: "Formas geométricas",
    subtitulo: "Círculo, quadrado, triângulo e retângulo",
    categoria: "Geometria",
    descricao: "Aprenda a reconhecer as formas geométricas básicas.",
    videoUrl: "",
    visualType: "shapes",
    exercicios: [
      { id: "fg-1", tipo: "escolha", pergunta: "Qual forma tem três lados?", opcoes: ["Círculo", "Triângulo", "Quadrado"], correta: "Triângulo" },
      { id: "fg-2", tipo: "escolha", pergunta: "Qual forma é totalmente redonda?", opcoes: ["Quadrado", "Círculo", "Retângulo"], correta: "Círculo" },
    ],
  },

  // Dinheiro e vida diária
  {
    id: "dinheiro-moedas",
    titulo: "Reconhecer moedas",
    subtitulo: "Moedas do dia a dia",
    categoria: "Dinheiro e vida diária",
    descricao: "Conheça as moedas e some valores simples.",
    videoUrl: "",
    visualType: "none",
    exercicios: [
      { id: "din-1", tipo: "numero", pergunta: "Quanto é 1 real + 1 real? (em reais)", resposta: "2" },
      { id: "din-2", tipo: "aberto", pergunta: "Escreva algo que você pode comprar com pouco dinheiro." },
    ],
  },
];

/* ----------------------------------------------------------------- */
/* API                                                                */
/* ----------------------------------------------------------------- */

// Vídeos autorais locais: cada aula busca /videos/matematica/{id}.mp4.
// Enquanto o arquivo não existir, a aula mostra um placeholder autoral.
for (const a of AULAS_MAT) {
  if (!a.videoUrl) a.videoUrl = `/videos/matematica/${a.id}.mp4`;
}

const porId = new Map(AULAS_MAT.map((a) => [a.id, a]));

export function getAulaMat(id: string): AulaMat | undefined {
  return porId.get(id.toLowerCase());
}

/** Agrupa as aulas por categoria, na ordem de CATEGORIAS_MAT. */
export function aulasPorCategoria(): { categoria: string; aulas: AulaMat[] }[] {
  return CATEGORIAS_MAT.map((categoria) => ({
    categoria,
    aulas: AULAS_MAT.filter((a) => a.categoria === categoria),
  })).filter((g) => g.aulas.length > 0);
}

export const ORDEM_AULAS_MAT: string[] = AULAS_MAT.map((a) => a.id);

export function getProximaMat(id: string): string | undefined {
  const i = ORDEM_AULAS_MAT.indexOf(id.toLowerCase());
  if (i < 0 || i + 1 >= ORDEM_AULAS_MAT.length) return undefined;
  return ORDEM_AULAS_MAT[i + 1];
}

export function todasAsAulasMatIds(): string[] {
  return ORDEM_AULAS_MAT;
}

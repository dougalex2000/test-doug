/**
 * Conteúdo do módulo DAVI Games — jogos educativos e gamificação acessível.
 * Dados separados da página para facilitar evolução por grupo de trabalho.
 */

export type GameItem = { title: string; description: string };

export const games: GameItem[] = [
  {
    title: "Jogo da Velha Acessível",
    description:
      "Treina escolha, estratégia, atenção e tomada de decisão. Funciona por toque, teclado, botão, olhar ou varredura.",
  },
  {
    title: "Causa e Efeito",
    description:
      "Uma seleção gera resposta visual, sonora ou animada, ajudando a compreender ação e consequência.",
  },
  {
    title: "Complete a Palavra",
    description:
      "Alfabetização: o usuário escolhe letras ou sílabas para completar palavras, com apoio visual e sonoro.",
  },
  {
    title: "Sílabas em Ordem",
    description:
      "Organizar sílabas e formar palavras, apoiando leitura, escrita e consciência fonológica.",
  },
  {
    title: "Conte e Escolha",
    description:
      "Matemática básica: contar objetos e escolher o número correto.",
  },
  {
    title: "Jogo da Memória",
    description:
      "Memória visual e associação de figuras, letras, palavras, números ou símbolos de comunicação.",
  },
  {
    title: "Acerte a Cor",
    description:
      "Reconhecimento de cores, atenção visual e resposta rápida.",
  },
  {
    title: "Escolha a Emoção",
    description:
      "Comunicação alternativa: reconhecer sentimentos, necessidades e estados emocionais.",
  },
  {
    title: "Desafio de Comunicação",
    description:
      "Escolher símbolos ou frases para expressar pedidos, respostas e necessidades.",
  },
  {
    title: "Missões DAVI",
    description:
      "Sequência de pequenos desafios educativos com pontos, fases, conquistas e acompanhamento da evolução.",
  },
];

export const accessMethods: string[] = [
  "Toque na tela",
  "Teclado",
  "Mouse ou trackball",
  "Botão adaptado",
  "Varredura automática",
  "Varredura por linha e coluna",
  "Olhar / rastreamento visual",
  "Permanência do olhar",
  "Sopro",
  "Joystick",
  "Sensor de cabeça",
  "Dispositivos Bluetooth",
  "Óculos smart",
  "Realidade virtual e aumentada",
];

export const benefits: string[] = [
  "Motivação",
  "Aprendizagem",
  "Atenção visual",
  "Tomada de decisão",
  "Causa e efeito",
  "Comunicação alternativa",
  "Alfabetização",
  "Matemática",
  "Memória",
  "Coordenação",
  "Treino de métodos de acesso",
  "Avaliação funcional",
  "Autonomia",
];

export const gamificationItems: string[] = [
  "Pontos",
  "Estrelas",
  "Medalhas",
  "Níveis",
  "Fases",
  "Missões",
  "Desafios diários",
  "Barra de progresso",
  "Feedback positivo",
  "Aplausos",
  "Repetição com incentivo",
  "Conquistas por esforço",
  "Conquistas por evolução",
  "Personalização por usuário",
];

export const metrics: string[] = [
  "Tempo de resposta",
  "Tempo médio de seleção",
  "Acertos",
  "Erros",
  "Tentativas",
  "Nível de dificuldade",
  "Método de acesso usado",
  "Número de ativações",
  "Tempo total da sessão",
  "Necessidade de ajuda",
  "Evolução entre sessões",
  "Sinais de fadiga",
  "Preferência por tipo de atividade",
  "Desempenho por horário ou período",
  "Taxa de sucesso por método de acesso",
];

export const tictactoeModes: GameItem[] = [
  {
    title: "Modo toque",
    description: "O usuário seleciona diretamente a casa desejada na tela.",
  },
  {
    title: "Modo teclado",
    description:
      "As casas são selecionadas pelos números 1 a 9, na mesma disposição da grade (1-2-3, 4-5-6, 7-8-9).",
  },
  {
    title: "Modo botão único com varredura",
    description:
      "O sistema destaca uma casa por vez. Quando a casa desejada estiver destacada, o usuário aciona o botão, espaço, sopro, clique, piscada ou permanência do olhar.",
  },
  {
    title: "Modo varredura por linha e coluna",
    description:
      "Primeiro o sistema destaca as linhas; após a escolha da linha, destaca as colunas. Reduz o tempo de espera.",
  },
  {
    title: "Modo olhar",
    description:
      "O usuário olha para a casa por um tempo configurável; a seleção é confirmada por permanência do olhar ou outro método.",
  },
  {
    title: "Modo dois jogadores",
    description: "Aluno contra professor, cuidador, colega ou familiar.",
  },
  {
    title: "Modo contra o computador",
    description: "O usuário joga contra o sistema em diferentes níveis de dificuldade.",
  },
];

export const futureTechnologies: GameItem[] = [
  {
    title: "Jogos de escolha por olhar",
    description: "Selecionar opções olhando, com óculos smart e confirmação por permanência.",
  },
  {
    title: "Realidade aumentada educativa",
    description: "Associar objetos reais a palavras, números ou símbolos sobrepostos pela câmera.",
  },
  {
    title: "Ambientes virtuais de treino",
    description: "Cenários seguros para atenção, memória e orientação espacial.",
  },
  {
    title: "Pistas visuais nos óculos",
    description: "Exibir símbolos de comunicação ou instruções passo a passo no campo de visão.",
  },
  {
    title: "Integração com DAVI Vision",
    description: "Rastreamento de olhar, cabeça e gestos como forma de jogar.",
  },
  {
    title: "Integração com DAVI Conecta",
    description: "Botões, sopro e dispositivos Bluetooth acionando os jogos.",
  },
];

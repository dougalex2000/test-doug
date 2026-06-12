export type DeviceCategory =
  | "Acesso por olhar"
  | "Comunicação alternativa"
  | "Acionadores físicos"
  | "Acesso por sopro"
  | "Acesso por toque"
  | "Suportes e posicionamento"
  | "Educação assistiva"
  | "Kits maker"
  | "Interfaces computacionais"
  | "Baixo custo"
  | "Projetos abertos";

export type DeviceStatus =
  | "Projeto aberto"
  | "Em desenvolvimento"
  | "Disponível"
  | "Sob demanda";

export type AssistiveDevice = {
  slug: string;
  name: string;
  categories: DeviceCategory[];
  shortDescription: string;
  indicatedFor: string;
  accessType: string;
  assemblyDifficulty: "Baixa" | "Média" | "Alta";
  estimatedCost: string;
  status: DeviceStatus;
  /** Campos de detalhe — opcionais até o projeto de cada dispositivo ser documentado. */
  longDescription?: string;
  materials?: string[];
  safetyNotes?: string[];
  customizationOptions?: string[];
};

/**
 * Catálogo inicial mockado da Galeria de Tecnologias Assistivas.
 * Sem pagamento real: os botões de loja apenas preparam a estrutura futura.
 */
export const assistiveDevices: AssistiveDevice[] = [
  {
    slug: "botao-adaptado-grande",
    name: "Botão Adaptado Grande",
    categories: ["Acionadores físicos", "Baixo custo", "Projetos abertos"],
    shortDescription:
      "Acionador de grande área de contato para seleção, jogos de causa e efeito e comunicação.",
    indicatedFor:
      "Pessoas com limitações motoras que conseguem realizar movimentos amplos com mão, braço, cabeça ou pé.",
    accessType: "Acionador físico",
    assemblyDifficulty: "Baixa",
    estimatedCost: "R$ 30 a R$ 80",
    status: "Projeto aberto",
    longDescription:
      "O Botão Adaptado Grande é geralmente o primeiro dispositivo testado na avaliação funcional. Sua área de contato ampla (8 a 12 cm de diâmetro) permite acionamento com a palma da mão, o punho, o cotovelo, a cabeça ou o pé. Conecta-se ao computador como um clique de mouse ou tecla, funcionando em jogos de causa e efeito, varredura e comunicação alternativa.",
    materials: [
      "Cúpula de botão de fliperama de 100 mm ou tampa plástica resistente",
      "Microswitch de baixa força de acionamento",
      "Base impressa em 3D ou caixa plástica",
      "Cabo USB ou conector P2 (3,5 mm) padrão de acionadores",
      "Placa controladora (qualquer microcontrolador com USB HID, ex.: RP2040)",
      "Material antiderrapante para a base",
    ],
    safetyNotes: [
      "Lixar bordas e cantos para evitar machucados",
      "Usar baixa tensão (USB 5V); nunca ligar à rede elétrica",
      "Fixar bem a base para não escorregar durante o uso",
    ],
    customizationOptions: [
      "Diâmetro e altura da cúpula",
      "Força necessária para acionar (tipo de microswitch)",
      "Cor de alto contraste conforme a preferência do usuário",
      "Som de clique audível ou silencioso",
      "Saída USB (teclado/mouse) ou P2 para interfaces de acionadores",
    ],
  },
  {
    slug: "sensor-de-sopro",
    name: "Sensor de Sopro",
    categories: ["Acesso por sopro", "Kits maker", "Projetos abertos"],
    shortDescription:
      "Sensor que transforma o sopro em comando de seleção ou confirmação.",
    indicatedFor:
      "Pessoas com controle respiratório preservado e movimentos de membros muito limitados.",
    accessType: "Sopro",
    assemblyDifficulty: "Média",
    estimatedCost: "R$ 60 a R$ 150",
    status: "Em desenvolvimento",
    longDescription:
      "O Sensor de Sopro converte a pressão do ar expirado em um comando digital. Um tubo flexível posicionado próximo à boca leva o sopro até um sensor de pressão; o microcontrolador detecta o pico e envia um clique ou tecla ao computador. O limiar de sensibilidade é calibrado por usuário, permitindo distinguir sopros intencionais da respiração normal.",
    materials: [
      "Sensor de pressão diferencial (ex.: MPXV7002 ou similar)",
      "Tubo de silicone atóxico com bocal substituível",
      "Microcontrolador com USB HID (ex.: ESP32, RP2040)",
      "Carcaça impressa em 3D",
      "Haste flexível para posicionamento do bocal",
    ],
    safetyNotes: [
      "Usar bocais individuais e higienizáveis (nunca compartilhar)",
      "Tubo e bocal de material atóxico",
      "Acompanhamento profissional para definir esforço respiratório seguro",
    ],
    customizationOptions: [
      "Sensibilidade do sopro (limiar calibrável por software)",
      "Sopro curto e sopro longo como comandos diferentes",
      "Posicionamento por haste flexível ou suporte de cabeça",
    ],
  },
  {
    slug: "teclado-ampliado",
    name: "Teclado Ampliado",
    categories: ["Acesso por toque", "Educação assistiva", "Baixo custo"],
    shortDescription:
      "Teclado com teclas grandes, espaçadas e de alto contraste para digitação acessível.",
    indicatedFor:
      "Pessoas com baixa precisão motora fina ou baixa visão que utilizam as mãos.",
    accessType: "Toque",
    assemblyDifficulty: "Baixa",
    estimatedCost: "R$ 100 a R$ 300",
    status: "Sob demanda",
  },
  {
    slug: "base-visual-davi",
    name: "Base Visual DAVI",
    categories: ["Acesso por olhar", "Suportes e posicionamento", "Projetos abertos"],
    shortDescription:
      "Estrutura física padronizada com suporte de webcam, iluminação difusa e referência de distância para o rastreamento visual.",
    indicatedFor:
      "Usuários do módulo de rastreamento visual assistivo, em escolas, clínicas e residências.",
    accessType: "Olhar",
    assemblyDifficulty: "Média",
    estimatedCost: "R$ 120 a R$ 350",
    status: "Em desenvolvimento",
    longDescription:
      "A Base Visual DAVI padroniza o ambiente físico do rastreamento visual assistivo. A estrutura integra suporte regulável de webcam, iluminação frontal difusa e marcação de distância entre o usuário e a tela. Com o ambiente padronizado, a calibração de 9 pontos fica mais consistente entre sessões e entre locais diferentes (escola, clínica, casa).",
    materials: [
      "Perfil de alumínio ou estrutura impressa em 3D",
      "Suporte articulado para webcam",
      "Painel de LED com difusor (luz frontal suave)",
      "Fita métrica ou gabarito de distância integrado",
      "Base estável com regulagem de altura",
    ],
    safetyNotes: [
      "Luz difusa de baixa intensidade para não ofuscar o usuário",
      "Estrutura estável que não tombe sobre a pessoa",
      "Cabos organizados e fora do alcance de movimentos involuntários",
    ],
    customizationOptions: [
      "Altura e ângulo do suporte conforme cadeira ou leito",
      "Intensidade e temperatura da iluminação",
      "Versão de mesa ou acoplada a cadeira de rodas",
    ],
  },
  {
    slug: "suporte-webcam-iluminacao",
    name: "Suporte de Webcam com Iluminação Difusa",
    categories: ["Suportes e posicionamento", "Acesso por olhar", "Kits maker"],
    shortDescription:
      "Suporte regulável que padroniza altura, ângulo e iluminação frontal da câmera.",
    indicatedFor:
      "Ambientes de avaliação e uso diário do rastreamento visual com webcam comum.",
    accessType: "Olhar",
    assemblyDifficulty: "Baixa",
    estimatedCost: "R$ 50 a R$ 150",
    status: "Projeto aberto",
  },
  {
    slug: "joystick-acessivel",
    name: "Joystick Acessível",
    categories: ["Acionadores físicos", "Interfaces computacionais"],
    shortDescription:
      "Joystick adaptado com empunhadura ampla para controle de cursor e seleção.",
    indicatedFor:
      "Pessoas com movimento de mão ou braço preservado, mas sem precisão para mouse comum.",
    accessType: "Joystick",
    assemblyDifficulty: "Média",
    estimatedCost: "R$ 80 a R$ 250",
    status: "Em desenvolvimento",
  },
  {
    slug: "pedal-adaptado",
    name: "Pedal Adaptado",
    categories: ["Acionadores físicos", "Baixo custo"],
    shortDescription:
      "Acionador de pé para seleção, confirmação ou troca de itens em varredura.",
    indicatedFor:
      "Pessoas com melhor controle motor de membros inferiores.",
    accessType: "Pedal",
    assemblyDifficulty: "Baixa",
    estimatedCost: "R$ 40 a R$ 120",
    status: "Projeto aberto",
  },
  {
    slug: "keyguard",
    name: "Keyguard (Máscara de Teclado)",
    categories: ["Acesso por toque", "Suportes e posicionamento", "Educação assistiva"],
    shortDescription:
      "Placa com furos sobre o teclado ou tablet que evita toques acidentais.",
    indicatedFor:
      "Pessoas com tremores, espasticidade ou baixa precisão de toque.",
    accessType: "Toque",
    assemblyDifficulty: "Média",
    estimatedCost: "R$ 50 a R$ 200 (impressão 3D ou acrílico)",
    status: "Sob demanda",
  },
  {
    slug: "acionador-capacitivo",
    name: "Acionador Capacitivo",
    categories: ["Acionadores físicos", "Kits maker", "Baixo custo"],
    shortDescription:
      "Acionador sensível ao toque leve, sem necessidade de força física.",
    indicatedFor:
      "Pessoas com força muscular muito reduzida que conseguem encostar em superfícies.",
    accessType: "Toque leve (capacitivo)",
    assemblyDifficulty: "Média",
    estimatedCost: "R$ 30 a R$ 100",
    status: "Em desenvolvimento",
  },
  {
    slug: "mouse-de-cabeca",
    name: "Mouse de Cabeça",
    categories: ["Interfaces computacionais", "Acesso por olhar"],
    shortDescription:
      "Controle do cursor por movimentos da cabeça, com clique por permanência ou acionador.",
    indicatedFor:
      "Pessoas sem uso funcional das mãos e com bom controle cervical.",
    accessType: "Movimento de cabeça",
    assemblyDifficulty: "Alta",
    estimatedCost: "R$ 100 a R$ 400",
    status: "Em desenvolvimento",
  },
  {
    slug: "kit-entrada-multimodal",
    name: "Kit de Entrada Multimodal Assistiva",
    categories: ["Kits maker", "Interfaces computacionais", "Projetos abertos"],
    shortDescription:
      "Kit que combina acionadores, sensores e adaptadores para testar diferentes métodos de acesso. Prototipagem com microcontroladores como ESP32, Arduino ou RP2040.",
    indicatedFor:
      "Profissionais e oficinas que realizam avaliação de métodos de acesso.",
    accessType: "Multimodal (botão, sopro, toque, inclinação)",
    assemblyDifficulty: "Alta",
    estimatedCost: "R$ 150 a R$ 500",
    status: "Em desenvolvimento",
  },
  {
    slug: "prancha-comunicacao",
    name: "Prancha de Comunicação Alternativa",
    categories: ["Comunicação alternativa", "Educação assistiva", "Baixo custo"],
    shortDescription:
      "Prancha física ou digital com símbolos, categorias e frases rápidas para expressão.",
    indicatedFor:
      "Pessoas sem fala funcional ou em processo de desenvolvimento da comunicação.",
    accessType: "Toque, olhar, varredura ou apontador",
    assemblyDifficulty: "Baixa",
    estimatedCost: "R$ 10 a R$ 100",
    status: "Disponível",
  },
  {
    slug: "suporte-tablet",
    name: "Suporte de Tablet",
    categories: ["Suportes e posicionamento"],
    shortDescription:
      "Suporte articulado para posicionar o tablet na altura e ângulo adequados ao usuário.",
    indicatedFor:
      "Usuários de cadeira de rodas, leito ou mobiliário escolar adaptado.",
    accessType: "Apoio ao posicionamento",
    assemblyDifficulty: "Média",
    estimatedCost: "R$ 80 a R$ 300",
    status: "Sob demanda",
  },
  {
    slug: "apoio-de-cabeca",
    name: "Apoio de Cabeça",
    categories: ["Suportes e posicionamento"],
    shortDescription:
      "Apoio postural que estabiliza a cabeça para melhorar conforto, olhar e acesso.",
    indicatedFor:
      "Pessoas com controle cervical reduzido que usam rastreamento visual ou comunicação por olhar.",
    accessType: "Apoio ao posicionamento",
    assemblyDifficulty: "Alta",
    estimatedCost: "Sob avaliação individual",
    status: "Sob demanda",
  },
  {
    slug: "interface-de-varredura",
    name: "Interface de Varredura",
    categories: ["Interfaces computacionais", "Comunicação alternativa", "Projetos abertos"],
    shortDescription:
      "Software que percorre opções automaticamente e seleciona com um único acionador.",
    indicatedFor:
      "Pessoas que utilizam apenas um movimento voluntário confiável.",
    accessType: "Varredura automática + acionador único",
    assemblyDifficulty: "Baixa",
    estimatedCost: "Gratuito (software aberto)",
    status: "Em desenvolvimento",
  },
];

export function getDeviceBySlug(slug: string): AssistiveDevice | undefined {
  return assistiveDevices.find((device) => device.slug === slug);
}

export const deviceStatuses: DeviceStatus[] = [
  "Projeto aberto",
  "Em desenvolvimento",
  "Disponível",
  "Sob demanda",
];

export const deviceCategories: DeviceCategory[] = [
  "Acesso por olhar",
  "Comunicação alternativa",
  "Acionadores físicos",
  "Acesso por sopro",
  "Acesso por toque",
  "Suportes e posicionamento",
  "Educação assistiva",
  "Kits maker",
  "Interfaces computacionais",
  "Baixo custo",
  "Projetos abertos",
];

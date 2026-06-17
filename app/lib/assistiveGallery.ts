/**
 * Galeria de fotos de equipamentos de Tecnologia Assistiva.
 * Imagens em /public/images/ta (900x900, otimizadas).
 *
 * Cada item descreve um conjunto de recursos, com categoria, descrição curta
 * e texto alternativo acessível em português.
 */
export type AssistivePhoto = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
};

export const assistiveGallery: AssistivePhoto[] = [
  {
    slug: "acessorios-ergonomicos-escrita",
    title: "Acessórios ergonômicos para escrita",
    category: "Baixa tecnologia",
    description:
      "Recursos simples para facilitar a escrita, a preensão e o uso de objetos do dia a dia.",
    image: "/images/ta/acessorios-ergonomicos-escrita.png",
    alt: "Acessórios ergonômicos para escrita, incluindo engrossador de lápis, guia de escrita, suporte de caneta e adaptador de chave.",
  },
  {
    slug: "calculadora-adaptada-comunicador",
    title: "Calculadora adaptada e comunicador simples",
    category: "Média tecnologia",
    description:
      "Dispositivos com botões grandes e símbolos para apoiar atividades escolares e comunicação básica.",
    image: "/images/ta/calculadora-adaptada-comunicador.png",
    alt: "Calculadora adaptada com botões grandes e comunicador simples com símbolos de necessidades básicas.",
  },
  {
    slug: "comunicacao-alternativa-tablet-acionador",
    title: "Comunicação alternativa com tablet e acionador",
    category: "Comunicação Aumentativa e Alternativa",
    description:
      "Prancha digital com símbolos, botão adaptado e suporte para ampliar formas de comunicação.",
    image: "/images/ta/comunicacao-alternativa-tablet-acionador.png",
    alt: "Tablet com prancha de comunicação alternativa, botão acionador grande e suporte ajustável.",
  },
  {
    slug: "leitura-assistiva-braille-digital",
    title: "Leitura assistiva e braille digital",
    category: "Baixa visão e cegueira",
    description:
      "Recursos para ampliar o acesso à leitura, ao braille e à informação escrita.",
    image: "/images/ta/leitura-assistiva-braille-digital.png",
    alt: "Dispositivos de leitura assistiva, incluindo display braille, lupa digital e caneta leitora.",
  },
  {
    slug: "acessibilidade-auditiva-alertas",
    title: "Acessibilidade auditiva e alertas inteligentes",
    category: "Audição e comunicação",
    description:
      "Tecnologias para apoiar alertas sonoros, vibração, comunicação e percepção auditiva.",
    image: "/images/ta/acessibilidade-auditiva-alertas.png",
    alt: "Aparelhos auditivos, pulseira de alerta vibratório e celular com ícones de notificação sonora.",
  },
  {
    slug: "cadeira-rodas-eletrica-tablet",
    title: "Cadeira de rodas elétrica com suporte para tablet",
    category: "Mobilidade assistiva",
    description:
      "Recurso de mobilidade com joystick e suporte para comunicação, controle ou acesso digital.",
    image: "/images/ta/cadeira-rodas-eletrica-tablet.png",
    alt: "Cadeira de rodas elétrica com joystick e suporte ajustável para tablet.",
  },
  {
    slug: "controle-ambiente-assistivo",
    title: "Controle de ambiente assistivo",
    category: "Automação assistiva",
    description:
      "Dispositivos para acionar luzes, tomadas, rotinas e comandos de forma acessível.",
    image: "/images/ta/controle-ambiente-assistivo.png",
    alt: "Dispositivos de controle de ambiente, incluindo botão adaptado, assistente de voz, tomada inteligente e celular.",
  },
  {
    slug: "teclado-trackball-acionadores",
    title: "Teclado ampliado, trackball e acionadores",
    category: "Acesso ao computador",
    description:
      "Métodos de acesso para digitação, navegação e interação com computador ou plataforma digital.",
    image: "/images/ta/teclado-trackball-acionadores.png",
    alt: "Teclado ampliado, trackball e botões acionadores para acesso ao computador.",
  },
  {
    slug: "interfaces-botao-sopro-sensor",
    title: "Interfaces por botão, sopro e sensor de cabeça",
    category: "Métodos de acesso",
    description:
      "Interfaces assistivas para transformar movimentos preservados, sopro ou acionamento em comandos digitais.",
    image: "/images/ta/interfaces-botao-sopro-sensor.png",
    alt: "Interface assistiva com botão grande, sensor de sopro, sensor de cabeça e caixa de controle.",
  },
  {
    slug: "orteses-proteses-suportes",
    title: "Órteses, próteses e suportes funcionais",
    category: "Órteses e próteses",
    description:
      "Soluções de apoio, posicionamento e funcionalidade para ampliar independência nas atividades.",
    image: "/images/ta/orteses-proteses-suportes.png",
    alt: "Órteses, próteses e suportes funcionais para apoio e adaptação motora.",
  },
];

export function galleryItem(slug: string): AssistivePhoto | undefined {
  return assistiveGallery.find((item) => item.slug === slug);
}

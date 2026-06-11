export type NotificationKind = "info" | "success" | "warning" | "alert";

export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  time: string;
  read: boolean;
  href?: string;
};

export type UserProfile = {
  name: string;
  initials: string;
  role: "aluno" | "profissional" | "responsavel" | "admin";
  roleLabel: string;
  email: string;
  phone: string;
  institution: string;
  since: string;
  level: "Básico" | "Ativo" | "Avançado";
};

export const mockUser: UserProfile = {
  name: "Douglas Alexandre",
  initials: "DA",
  role: "profissional",
  roleLabel: "Profissional",
  email: "douglascti2023@gmail.com",
  phone: "(11) 9 9999-9999",
  institution: "Projeto DAVI",
  since: "2025",
  level: "Avançado",
};

export const mockNotifications: Notification[] = [
  {
    id: "1",
    kind: "success",
    title: "Calibração concluída",
    message: "O perfil de rastreamento ocular foi calibrado com sucesso.",
    time: "Há 2 horas",
    read: false,
    href: "/modulos/rastreamento-ocular",
  },
  {
    id: "2",
    kind: "info",
    title: "Novo módulo disponível",
    message: "Mouse Assistivo foi atualizado com novas opções de sensibilidade.",
    time: "Há 1 dia",
    read: false,
    href: "/modulos/mouse-assistivo",
  },
  {
    id: "3",
    kind: "warning",
    title: "Relatório pendente",
    message: "O relatório mensal do aluno ainda não foi gerado.",
    time: "Há 2 dias",
    read: false,
    href: "/relatorios/aluno",
  },
  {
    id: "4",
    kind: "info",
    title: "Bem-vindo ao DAVI",
    message: "Sua conta foi criada com sucesso. Explore os módulos disponíveis.",
    time: "Há 7 dias",
    read: true,
    href: "/dashboard",
  },
  {
    id: "5",
    kind: "success",
    title: "Dispositivo conectado",
    message: "O acionador físico foi detectado e está pronto para uso.",
    time: "Há 10 dias",
    read: true,
    href: "/dispositivos",
  },
];

export const dashboardModules = [
  {
    title: "Rastreamento Ocular",
    description: "Controle por olhar com calibração personalizada",
    href: "/modulos/rastreamento-ocular",
    status: "Ativo",
    icon: "👁",
  },
  {
    title: "Comunicação Alternativa",
    description: "Pranchas e frases de acesso rápido",
    href: "/modulos/comunicacao-alternativa",
    status: "Em desenvolvimento",
    icon: "💬",
  },
  {
    title: "Mouse Assistivo",
    description: "Controle do cursor por diferentes métodos",
    href: "/modulos/mouse-assistivo",
    status: "Em desenvolvimento",
    icon: "🖱",
  },
  {
    title: "Hardware",
    description: "Comunicação com dispositivos físicos",
    href: "/modulos/hardware",
    status: "Em desenvolvimento",
    icon: "⚡",
  },
  {
    title: "Inteligência Artificial",
    description: "Análise e recomendações personalizadas",
    href: "/modulos/inteligencia-artificial",
    status: "Em desenvolvimento",
    icon: "🤖",
  },
  {
    title: "Calibração",
    description: "Ajustes de sensibilidade e configurações",
    href: "/modulos/calibracao",
    status: "Em desenvolvimento",
    icon: "⚙",
  },
];

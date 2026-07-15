import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Código de colaboração — DAVI Integra",
  description:
    "Princípios de convivência, ética, proteção de dados e reconhecimento das contribuições no DAVI Integra.",
};

const principles = [
  "Respeito às pessoas",
  "Participação inclusiva",
  "Acessibilidade em tudo o que produzimos",
  "Escuta das pessoas com deficiência",
  "Linguagem respeitosa",
  "Não discriminação",
  "Colaboração científica responsável",
  "Proteção de dados (LGPD)",
  "Respeito à autoria",
  "Documentação das contribuições",
  "Transparência",
  "Segurança",
  "Limites éticos",
  "Proibição de uso de dados de participantes sem autorização",
  "Tratamento adequado de conflitos",
];

const recognition = [
  "Registro de autoria",
  "Créditos em documentação",
  "Histórico de contribuições",
  "Participação em publicações conforme critérios acadêmicos",
  "Reconhecimento de equipes",
  "Respeito às licenças e à propriedade intelectual",
];

export default function CodigoDeColaboracaoPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Integra", href: "/integra" }, { label: "Código de colaboração" }]}
      eyebrow="DAVI Integra"
      title="Código de colaboração"
      subtitle="Como colaboramos: com respeito, ética, cuidado com as pessoas e reconhecimento de quem contribui."
      actions={<LinkButton href="/integra/participar">Quero contribuir</LinkButton>}
      sections={[
        {
          eyebrow: "Compromissos",
          title: "Princípios da colaboração",
          paragraphs: [
            "Toda pessoa que colabora com o DAVI Integra assume alguns compromissos de convivência e de responsabilidade científica e ética:",
          ],
          bullets: principles,
        },
        {
          eyebrow: "Proteção das pessoas",
          title: "Dados de participantes só com autorização",
          paragraphs: [
            "Nenhuma contribuição pode usar dados de participantes (alunos, pacientes, pessoas atendidas) sem autorização e sem os procedimentos éticos e legais aplicáveis. Na dúvida, não inclua dados pessoais de terceiros.",
          ],
          tone: "soft",
        },
        {
          eyebrow: "Reconhecimento",
          title: "Como as contribuições são reconhecidas",
          paragraphs: [
            "O trabalho de quem colabora é reconhecido de forma transparente:",
          ],
          bullets: recognition,
        },
        {
          eyebrow: "Autoria científica",
          title: "Sem promessa automática de autoria",
          paragraphs: [
            "A autoria em artigos não é automática: ela seguirá a contribuição efetivamente realizada e os critérios definidos pelas equipes responsáveis e pelas normas acadêmicas aplicáveis.",
          ],
          tone: "soft",
        },
      ]}
    />
  );
}

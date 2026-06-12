import type { Metadata } from "next";
import {
  Breadcrumb,
  InfoGrid,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
  TagList,
} from "../components/SiteShell";
import { impactAudiences } from "../lib/siteContent";

export const metadata: Metadata = {
  title: "Escolas, ONGs e Instituições",
  description:
    "Como o DAVI apoia escolas, ONGs, OSCIPs, clínicas, centros de reabilitação, universidades, espaços maker e prefeituras.",
};

const institutionalOffers = [
  {
    title: "Escolas e redes de ensino",
    description:
      "Apoio ao AEE e às salas de recursos com avaliação funcional, atividades adaptadas e relatórios por aluno.",
  },
  {
    title: "ONGs e OSCIPs",
    description:
      "Tecnologias de baixo custo, projetos abertos e formação para equipes de atendimento.",
  },
  {
    title: "Clínicas e centros de reabilitação",
    description:
      "Instrumentos de avaliação de métodos de acesso e acompanhamento funcional entre sessões.",
  },
  {
    title: "Universidades e pesquisa",
    description:
      "Plataforma aberta para estudos em tecnologia assistiva, com dados anonimizados e consentidos.",
  },
  {
    title: "Espaços maker",
    description:
      "Projetos documentados com STL, esquemas e manuais para fabricação local de dispositivos.",
  },
  {
    title: "Prefeituras e políticas públicas",
    description:
      "Visão institucional de impacto: alunos atendidos, dispositivos entregues e evolução agregada.",
  },
];

const partnershipModel = [
  {
    title: "Implantação",
    description:
      "Diagnóstico do contexto, definição de perfis de acesso e configuração do ambiente físico de avaliação.",
  },
  {
    title: "Formação",
    description:
      "Capacitação de professores, terapeutas e equipes para uso da plataforma e dos dispositivos.",
  },
  {
    title: "Acompanhamento",
    description:
      "Relatórios institucionais, suporte da oficina maker e evolução contínua dos recursos.",
  },
];

export default function InstituicoesPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ label: "Instituições e Públicos" }, { label: "Escolas, ONGs e Prefeituras" }]}
      />
      <PageHero
        eyebrow="Instituições"
        title="Inclusão em escala precisa de rede"
        description="O DAVI foi desenhado para apoiar instituições inteiras: escolas, ONGs, OSCIPs, clínicas, universidades, espaços maker e prefeituras, com perfis de acesso, relatórios agregados e tecnologias reproduzíveis."
        actions={
          <>
            <LinkButton href="/contato">Propor parceria</LinkButton>
            <LinkButton href="/impacto" variant="secondary">
              Impacto Social
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Quem o DAVI atende"
            title="Cada instituição, uma forma de apoio"
          />
          <div className="mt-10">
            <InfoGrid items={institutionalOffers} />
          </div>
          <div className="mt-8">
            <TagList items={impactAudiences} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Modelo de parceria"
            title="Como uma instituição entra no ecossistema"
            description="O modelo está em estruturação e será formalizado junto com a área administrativa da plataforma."
          />
          <div className="mt-10">
            <InfoGrid items={partnershipModel} />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-blue-200 bg-blue-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-blue-800">
            Dados institucionais protegidos
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            Cada instituição terá políticas de acesso próprias: profissionais
            só veem os alunos sob sua responsabilidade, e dados sensíveis
            exigem consentimento registrado. Saiba mais em{" "}
            <a
              href="/seguranca-e-privacidade"
              className="font-bold text-blue-800 underline hover:text-blue-900"
            >
              Segurança e Privacidade
            </a>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}

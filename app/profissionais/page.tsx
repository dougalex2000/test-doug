import type { Metadata } from "next";
import {
  Breadcrumb,
  InfoGrid,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Área do Profissional",
  description:
    "Recursos do DAVI para professores, terapeutas ocupacionais, fonoaudiólogos, fisioterapeutas, psicólogos e pesquisadores.",
};

const professionalResources = [
  {
    title: "Avaliação funcional estruturada",
    description:
      "Protocolo de observação e testes de métodos de acesso com registro padronizado.",
    href: "/avaliacao",
  },
  {
    title: "Atividades adaptáveis",
    description:
      "Módulos educacionais configuráveis por método de acesso, ritmo e objetivo pedagógico.",
    href: "/atividades",
  },
  {
    title: "Relatórios inteligentes",
    description:
      "Evolução por sessão, autonomia, engajamento e resumos gerados por IA para apoiar decisões.",
    href: "/relatorios",
  },
  {
    title: "Comunicação alternativa",
    description:
      "Pranchas, frases rápidas e categorias para apoiar a expressão dos seus alunos e pacientes.",
    href: "/comunicacao/alternativa",
  },
  {
    title: "Galeria de tecnologias",
    description:
      "Catálogo de dispositivos com indicação de uso, custo estimado e projetos abertos.",
    href: "/galeria",
  },
  {
    title: "Oficina maker",
    description:
      "Solicitação de adaptações e fabricação de dispositivos personalizados para casos específicos.",
    href: "/tecnologias-assistivas/oficina-maker",
  },
];

const audiences = [
  {
    title: "Professores e AEE",
    description:
      "Atendimento Educacional Especializado, salas de recursos e professores de classe comum.",
  },
  {
    title: "Terapeutas",
    description:
      "Terapeutas ocupacionais, fonoaudiólogos, fisioterapeutas e psicólogos.",
  },
  {
    title: "Pesquisadores",
    description:
      "Estudos em tecnologia assistiva, educação inclusiva e interação humano-computador.",
  },
];

export default function ProfissionaisPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Instituições e Públicos" }, { label: "Profissionais" }]} />
      <PageHero
        eyebrow="Área do Profissional"
        title="Ferramentas para quem faz a inclusão acontecer"
        description="O DAVI apoia o trabalho de professores, terapeutas e pesquisadores com avaliação estruturada, atividades adaptáveis, relatórios e tecnologias de baixo custo. A decisão é sempre sua — a plataforma organiza os dados."
        actions={
          <>
            <LinkButton href="/avaliacao">Começar pela Avaliação</LinkButton>
            <LinkButton href="/painel" variant="secondary">
              Abrir o Painel
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Para quem"
            title="Profissionais que o DAVI apoia"
          />
          <div className="mt-10">
            <InfoGrid items={audiences} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Recursos"
            title="O que você encontra na plataforma"
          />
          <div className="mt-10">
            <InfoGrid items={professionalResources} />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-blue-200 bg-blue-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-blue-800">
            Limites éticos
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            O DAVI não realiza diagnóstico clínico automatizado. Os dados e as
            sugestões da IA existem para apoiar a análise de profissionais
            qualificados — nunca para substituí-la. O acesso a dados sensíveis
            exige consentimento e autorização por perfil.
          </p>
          <div className="mt-6">
            <LinkButton href="/seguranca-e-privacidade" variant="secondary">
              Segurança e Privacidade
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

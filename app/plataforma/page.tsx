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
import { ecosystemItems } from "../lib/siteContent";

export const metadata: Metadata = {
  title: "O que é a Plataforma DAVI",
  description:
    "Conheça o ecossistema DAVI: plataforma digital, avaliação assistiva, rastreamento visual, comunicação alternativa, IA e oficina maker.",
};

const pillars = [
  {
    title: "Avaliar",
    description:
      "Avaliação funcional assistiva: movimentos preservados, comunicação, atenção, compreensão, fadiga e métodos de acesso possíveis.",
    href: "/avaliacao",
  },
  {
    title: "Comunicar",
    description:
      "Comunicação alternativa e aumentativa com botões grandes, símbolos, frases rápidas e retorno por áudio.",
    href: "/comunicacao/alternativa",
  },
  {
    title: "Aprender",
    description:
      "Atividades educacionais assistivas de alfabetização, matemática e causa e efeito, adaptadas ao método de acesso.",
    href: "/atividades",
  },
  {
    title: "Recomendar",
    description:
      "Recomendação de dispositivos assistivos com apoio de inteligência artificial e decisão final do profissional.",
    href: "/galeria",
  },
  {
    title: "Acompanhar",
    description:
      "Relatórios inteligentes com evolução por sessão, autonomia, engajamento e resumos gerados por IA.",
    href: "/relatorios",
  },
  {
    title: "Construir",
    description:
      "Oficina maker assistiva para adaptar, criar, imprimir em 3D e documentar soluções como projetos abertos.",
    href: "/tecnologias-assistivas/oficina-maker",
  },
];

const userProfiles = [
  {
    title: "Aluno / Paciente",
    description:
      "Pessoa atendida pelo ecossistema, com perfil funcional, método de acesso e atividades personalizadas.",
  },
  {
    title: "Professor",
    description:
      "Acompanha atividades educacionais, registra observações pedagógicas e acessa relatórios da turma.",
  },
  {
    title: "Terapeuta",
    description:
      "Conduz avaliações funcionais, testa métodos de acesso e acompanha a evolução clínico-funcional.",
  },
  {
    title: "Responsável / Família",
    description:
      "Acompanha o progresso, autoriza usos e participa das decisões sobre dados e adaptações.",
  },
  {
    title: "Pesquisador",
    description:
      "Acessa dados autorizados e anonimizados para estudos em tecnologia assistiva e educação inclusiva.",
  },
  {
    title: "Administrador",
    description:
      "Gerencia usuários, permissões, módulos e políticas de segurança da plataforma.",
  },
  {
    title: "Oficina Maker",
    description:
      "Recebe solicitações de adaptação, fabrica dispositivos e documenta projetos abertos.",
  },
  {
    title: "Instituição",
    description:
      "Escolas, ONGs, OSCIPs, clínicas e prefeituras com visão agregada de seus alunos e profissionais.",
  },
];

export default function PlataformaPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "O Projeto" }, { label: "O que é a Plataforma" }]} />
      <PageHero
        eyebrow="O que é o DAVI"
        title="Um ecossistema completo de tecnologia assistiva"
        description="O DAVI integra plataforma digital, ambiente físico de avaliação, rastreamento visual, inteligência artificial, comunicação alternativa, avaliação funcional, relatórios, galeria de tecnologias, projetos abertos e oficina maker."
        actions={
          <>
            <LinkButton href="/origem">De onde o DAVI veio</LinkButton>
            <LinkButton href="/galeria" variant="secondary">
              Tecnologias Assistivas
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="O ecossistema"
            title="Tudo que o DAVI integra"
            description="Mais do que um software: uma rede de recursos digitais e físicos pensada para ampliar autonomia e participação social."
          />
          <div className="mt-8">
            <TagList items={ecosystemItems} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Pilares"
            title="Seis frentes que trabalham juntas"
            description="Cada pilar é um módulo com rota própria, que evolui de forma independente sem quebrar os demais."
          />
          <div className="mt-10">
            <InfoGrid items={pillars} />
          </div>
        </div>
      </section>

      <section
        className="border-b border-zinc-200 bg-white px-6 py-16 scroll-mt-24"
        id="perfis-de-usuario"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Perfis de Usuário"
            title="Cada pessoa com o acesso certo"
            description="A plataforma está sendo preparada para perfis com permissões diferentes, garantindo que dados sensíveis sejam vistos apenas por quem deve."
          />
          <div className="mt-10">
            <InfoGrid items={userProfiles} columns="lg:grid-cols-4" />
          </div>
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-base leading-7 text-zinc-800">
              O controle de permissões por perfil será implementado junto com a
              autenticação e o banco de dados seguro. Saiba mais em{" "}
              <a
                href="/seguranca-e-privacidade"
                className="font-bold text-blue-800 underline hover:text-blue-900"
              >
                Segurança e Privacidade
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Próximo passo"
            title="Explore os recursos da plataforma"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/rastreamento-visual">Rastreamento Visual</LinkButton>
            <LinkButton href="/comunicacao/alternativa" variant="secondary">
              Comunicação Alternativa
            </LinkButton>
            <LinkButton href="/metodos-de-acesso" variant="secondary">
              Métodos de Acesso
            </LinkButton>
            <LinkButton href="/avaliacao" variant="secondary">
              Avaliação Funcional
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

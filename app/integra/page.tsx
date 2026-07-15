import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  LinkButton,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";
import { ContributionTypeCard } from "../components/integra/IntegraCards";
import { participantProfiles, contributionTypes } from "../lib/integra/data";
import { IconArrowRight, IconIntegra } from "../components/icons";

export const metadata: Metadata = {
  title: "DAVI Integra — Colaboração, pesquisa e inovação aberta",
  description:
    "Comunidade aberta do Projeto DAVI: pesquisadores, estudantes, desenvolvedores, profissionais, instituições e comunidades colaborando em tecnologia assistiva.",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const collaborationRoles = [
  "Pesquisa",
  "Educação",
  "Programação",
  "Design",
  "Eletrônica",
  "Saúde e reabilitação",
  "Fabricação digital",
  "Inteligência artificial",
  "Acessibilidade",
  "Comunidades",
];

const howItWorks = [
  "Escolha uma área de interesse",
  "Conheça os desafios e projetos",
  "Informe como deseja contribuir",
  "Converse com o grupo responsável",
  "Desenvolva, documente ou pesquise",
  "Compartilhe os resultados com o ecossistema",
];

const categoryOrder = [
  "Tecnologia",
  "Pesquisa e educação",
  "Design e conteúdo",
  "Comunidade e apoio",
] as const;

export default function IntegraPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "DAVI Integra" }]} />

      {/* 4.1 Apresentação */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex w-fit items-center gap-2 rounded-lg bg-teal-50 px-4 py-2 text-sm font-black uppercase tracking-wide text-teal-800 ring-1 ring-teal-200">
              <IconIntegra className="h-5 w-5" /> Comunidade aberta · Em estruturação
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
              DAVI Integra
            </h1>
            <p className="mt-4 text-xl font-bold leading-8 text-zinc-800 sm:text-2xl">
              Pessoas, conhecimento e tecnologia unidos pela vida independente.
            </p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                O DAVI Integra é o espaço colaborativo do Projeto DAVI. Aqui, pesquisadores,
                estudantes, programadores, professores, profissionais de tecnologia assistiva,
                saúde, reabilitação, engenharia, design, fabricação digital e outras áreas podem
                contribuir com pesquisas, tecnologias, conteúdos, testes, documentação e novas
                ideias.
              </p>
              <p>
                O Projeto DAVI cresce por meio da colaboração entre diferentes pessoas e áreas do
                conhecimento. Não é necessário participar de todos os módulos. Cada colaborador pode
                escolher um desafio, projeto ou grupo de trabalho relacionado à sua experiência e à
                sua disponibilidade.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/integra/participar">Quero contribuir</LinkButton>
              <LinkButton href="/integra/desafios" variant="secondary">
                Ver desafios abertos
              </LinkButton>
              <LinkButton href="/integra/parcerias" variant="secondary">
                Propor uma parceria
              </LinkButton>
            </div>
            <div className="mt-4">
              <LinkButton href="/integra/grupos-de-trabalho" variant="tertiary">
                Conhecer os grupos de trabalho →
              </LinkButton>
            </div>
          </div>

          {/* Composição visual: colaboração entre pessoas de diferentes áreas */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-blue-950/10">
            <figure>
              <Image
                src="/images/davi/DAVI_INTEGRA.png"
                alt="Grupo diverso de colaboradores do DAVI reunido em torno de uma mesa em um laboratório: pessoas de diferentes idades, etnias e uma pessoa em cadeira de rodas conversam enquanto usam notebook, tablet e dispositivos assistivos como botões adaptados, placas eletrônicas e uma prótese de mão."
                width={1672}
                height={941}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full"
              />
            </figure>
            <div className="border-t border-zinc-100 p-6">
              <p className="text-base font-bold text-zinc-800">
                Muitas áreas, uma mesma direção: ampliar comunicação, aprendizagem, autonomia e vida
                independente.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Áreas que colaboram no DAVI Integra">
                {collaborationRoles.map((role) => (
                  <li
                    key={role}
                    className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-bold text-zinc-800"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Distinção entre módulos */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Para não confundir"
            title="Integra, Conecta e Projetos Abertos"
            description="São coisas diferentes e complementares. O DAVI Integra cuida das pessoas e da colaboração."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="rounded-lg border-2 border-teal-200 bg-teal-50 p-6">
              <h3 className="text-lg font-black text-teal-900">DAVI Integra</h3>
              <p className="mt-2 text-sm leading-6 text-teal-900">
                Integra <strong>pessoas</strong>: pesquisadores, desenvolvedores, instituições,
                competências, projetos e desafios. Organiza a comunidade que pesquisa, desenvolve,
                documenta, testa e amplia as soluções.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-6">
              <h3 className="text-lg font-black text-zinc-900">DAVI Conecta</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                Integra <strong>dispositivos físicos</strong>: sensores, botões, microcontroladores
                e tecnologias sem fio à plataforma.
              </p>
              <Link href="/acesso/conecta" className={`mt-4 inline-block rounded text-sm font-black text-blue-800 hover:underline ${focusRing}`}>
                Ver DAVI Conecta →
              </Link>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-6">
              <h3 className="text-lg font-black text-zinc-900">Projetos Abertos</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-700">
                Disponibiliza <strong>arquivos</strong>: projetos, modelos 3D, esquemas eletrônicos,
                firmware e manuais para reprodução.
              </p>
              <Link href="/tecnologias-assistivas/projetos-abertos" className={`mt-4 inline-block rounded text-sm font-black text-blue-800 hover:underline ${focusRing}`}>
                Ver Projetos Abertos →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4.2 Quem pode participar */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Quem pode participar"
            title="Cada pessoa pode contribuir com o que sabe"
            description="Pessoas com deficiência, familiares e cuidadores também são reconhecidos como pesquisadoras, desenvolvedoras, avaliadoras, consultoras e colaboradoras — não apenas como público beneficiário."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {participantProfiles.map((profile) => (
              <article key={profile.title} className="h-full rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-black text-zinc-950">{profile.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-zinc-600">{profile.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4.3 Formas de contribuição */}
      <section id="areas" className="scroll-mt-24 border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Áreas de contribuição"
            title="Formas de contribuir com o DAVI"
            description="Escolha por onde começar. Cada área leva aos desafios e oportunidades relacionados."
          />
          <div className="mt-10 space-y-10">
            {categoryOrder.map((category) => {
              const items = contributionTypes.filter((c) => c.category === category);
              if (!items.length) return null;
              return (
                <div key={category}>
                  <h3 className="text-sm font-black uppercase tracking-wide text-blue-700">{category}</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((c) => (
                      <ContributionTypeCard key={c.id} contribution={c} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4.4 Como funciona */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Como funciona"
            title="Da área de interesse ao resultado compartilhado"
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {howItWorks.map((step, index) => (
              <li key={step} className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-black text-white">
                  {index + 1}
                </span>
                <span className="text-base font-bold leading-7 text-zinc-800">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-base leading-7 text-zinc-800">
              A participação poderá ocorrer de forma voluntária, acadêmica, institucional, por
              estágio, extensão, iniciação científica, bolsas ou projetos financiados, conforme a
              existência de oportunidades e chamadas específicas.{" "}
              <strong>
                O cadastro de interesse não representa promessa de bolsa, contratação ou remuneração.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* Próximos passos */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Por onde seguir" title="Explore o DAVI Integra" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Como participar", description: "Caminhos individual, acadêmico, técnico, institucional e da comunidade.", href: "/integra/como-participar" },
              { title: "Desafios abertos", description: "Necessidades reais transformadas em oportunidades.", href: "/integra/desafios" },
              { title: "Projetos em andamento", description: "Iniciativas com filtros por módulo, área e status.", href: "/integra/projetos" },
              { title: "Grupos de trabalho", description: "Encontre o grupo ligado à sua experiência.", href: "/integra/grupos-de-trabalho" },
              { title: "Propor uma contribuição", description: "Sugira uma ideia, desafio, pesquisa ou parceria.", href: "/integra/propor" },
              { title: "Parcerias institucionais", description: "Universidades, escolas, prefeituras, ONGs e empresas.", href: "/integra/parcerias" },
              { title: "Código de colaboração", description: "Como colaboramos com respeito, ética e reconhecimento.", href: "/integra/codigo-de-colaboracao" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-xl hover:shadow-blue-950/10 ${focusRing}`}
              >
                <h3 className="text-lg font-black text-zinc-950 group-hover:text-blue-800">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p>
                <span className="mt-auto pt-4 text-sm font-black text-blue-800">
                  <span className="inline-flex items-center gap-1.5">
                    Abrir <IconArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

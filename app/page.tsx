import {
  InfoGrid,
  LinkButton,
  PageShell,
  SectionHeader,
  TagList,
} from "./components/SiteShell";
import { ecosystemItems, pageCards, principles } from "./lib/siteContent";

export default function Home() {
  return (
    <PageShell>
      <section
        className="relative min-h-[78vh] overflow-hidden text-white"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-zinc-950/75" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950/80 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-6 py-20">
          <p className="w-fit rounded-full border border-blue-300/40 bg-blue-500/15 px-4 py-2 text-sm font-black uppercase tracking-wide text-blue-100">
            Tecnologia assistiva, aprendizagem e autonomia
          </p>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">
            DAVI — Desenvolvimento Assistivo para Vida Independente
          </h1>
          <p className="mt-6 max-w-4xl text-xl leading-8 text-zinc-100">
            Plataforma inteligente de tecnologia assistiva para avaliação,
            aprendizagem, comunicação, recomendação de dispositivos e criação de
            soluções personalizadas.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <LinkButton href="/projeto">Conhecer o projeto</LinkButton>
            <LinkButton href="/tecnologias" variant="secondary">
              Ver tecnologias assistivas
            </LinkButton>
            <LinkButton href="/rastreamento" variant="secondary">
              Testar rastreamento visual
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Portal DAVI"
            title="Acesse as áreas do ecossistema"
            description="A página inicial funciona como um portal: apresenta o projeto e conduz para páginas secundárias com conteúdos, exemplos e ferramentas separados por tema."
          />
          <div className="mt-10">
            <InfoGrid
              items={pageCards.map((card) => ({
                title: card.title,
                description: card.description,
                href: card.href,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-blue-300">
              Ecossistema
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Um projeto organizado por serviços, tecnologias e impacto social
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              A estrutura foi pensada para crescer sem misturar conteúdo
              institucional, demonstrações técnicas e recursos assistivos.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ecosystemItems.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm font-bold text-zinc-100 transition hover:border-blue-500 hover:bg-zinc-800"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Princípios"
            title="Bases do desenvolvimento assistivo"
            description="A evolução do DAVI deve manter foco em baixo custo, acessibilidade, privacidade, segurança, colaboração e tecnologia aberta."
          />
          <div className="mt-8">
            <TagList items={principles} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

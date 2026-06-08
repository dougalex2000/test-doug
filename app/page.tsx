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
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-6 py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
            Tecnologia assistiva, aprendizagem e autonomia
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">
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

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Portal DAVI"
            title="Acesse as áreas do ecossistema"
            description="A organização agora funciona como um portal: a página inicial apresenta o projeto e as páginas secundárias detalham cada frente de trabalho."
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
            <p className="text-sm font-bold uppercase tracking-wide text-blue-300">
              Ecossistema
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Um projeto organizado por serviços, tecnologias e impacto social
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ecosystemItems.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm font-semibold text-zinc-100"
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
            description="A evolução do DAVI deve manter foco em baixo custo, acessibilidade, privacidade, segurança e tecnologia aberta."
          />
          <div className="mt-8">
            <TagList items={principles} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

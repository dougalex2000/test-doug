import Image from "next/image";
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
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-black uppercase tracking-wide text-blue-700 ring-1 ring-blue-200">
              Tecnologia assistiva para autonomia
            </p>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight text-zinc-950 sm:text-6xl">
              DAVI — Desenvolvimento Assistivo para Vida Independente
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-zinc-700">
              Plataforma inteligente para avaliação, aprendizagem, comunicação,
              recomendação de dispositivos e criação de soluções assistivas
              personalizadas.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <LinkButton href="/projeto">Conhecer o projeto</LinkButton>
              <LinkButton href="/rastreamento" variant="secondary">
                Testar rastreamento
              </LinkButton>
              <LinkButton href="/tecnologias" variant="secondary">
                Ver tecnologias
              </LinkButton>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl shadow-blue-950/10">
            <div className="relative min-h-[360px] overflow-hidden">
              <Image
                src="/hero.jpg"
                alt="Ambiente de tecnologia assistiva com computador e dispositivo de apoio"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/35 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 text-zinc-950 shadow-lg backdrop-blur">
                <p className="text-sm font-black text-blue-700">
                  Plataforma DAVI
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-700">
                  Avaliação, acesso assistivo, tecnologias abertas e soluções
                  personalizadas em um ecossistema único.
                </p>
              </div>
            </div>
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

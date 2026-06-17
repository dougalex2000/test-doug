import type { Metadata } from "next";
import Image from "next/image";
import {
  Breadcrumb,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";
import {
  ConstructionNotice,
  FlowSteps,
  GroupBadge,
  ModuleGrid,
  StatusBadge,
} from "../components/modules";
import { IconCheckCircle } from "../components/icons";
import {
  accessMethods,
  benefits,
  gamificationItems,
  games,
  metrics,
  tictactoeModes,
  futureTechnologies,
} from "../lib/daviGames";

export const metadata: Metadata = {
  title: "DAVI Games — Jogos Educativos e Gamificação Acessível",
  description:
    "Jogos acessíveis para aprender, comunicar, treinar métodos de acesso e acompanhar a evolução do usuário.",
};

function CheckGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-white p-3 text-sm font-semibold leading-6 text-zinc-800 shadow-sm"
        >
          <IconCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-bold text-zinc-800"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function DaviGamesPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "DAVI Escola", href: "/escola" }, { label: "DAVI Games" }]} />
      <PageHero
        eyebrow="DAVI Games"
        title="DAVI Games — Jogos Educativos e Gamificação Acessível"
        description="Jogos acessíveis para aprender, comunicar, treinar métodos de acesso e acompanhar a evolução do usuário."
        actions={
          <>
            <LinkButton href="#jogos">Ver jogos sugeridos</LinkButton>
            <LinkButton href="#acesso" variant="secondary">
              Métodos de acesso
            </LinkButton>
          </>
        }
      />

      <div className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <StatusBadge status="Protótipo" />
          <GroupBadge group="Grupo DAVI Games" />
        </div>
      </div>

      {/* Imagem hero */}
      <section className="border-b border-zinc-200 bg-white px-6 pb-14 pt-2">
        <div className="mx-auto max-w-7xl">
          <Image
            src="/images/games/davi-games-hero.png"
            alt="Ilustração de jogos educativos acessíveis com tecnologia assistiva, botão adaptado, tablet e óculos inteligentes."
            width={1600}
            height={680}
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="h-auto w-full rounded-2xl border border-zinc-200 shadow-sm"
          />
        </div>
      </section>

      {/* Introdução */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="O que é"
            title="Aprender, comunicar e treinar métodos de acesso brincando"
          />
          <div className="mt-5 max-w-4xl space-y-4 text-lg leading-8 text-zinc-700">
            <p>
              O DAVI Games é o módulo de jogos educativos acessíveis do Projeto
              DAVI. Ele transforma atividades de aprendizagem, comunicação,
              atenção, tomada de decisão e treino de métodos de acesso em
              experiências mais motivadoras, simples e inclusivas.
            </p>
            <p>
              Os jogos podem ser usados por toque, teclado, botão adaptado,
              varredura automática, olhar, sopro, joystick, dispositivos
              conectados, óculos inteligentes e, futuramente, realidade virtual e
              aumentada.
            </p>
            <p>
              Além de apoiar letras, sílabas, palavras, números, cores, memória e
              raciocínio, o DAVI Games registra métricas como tempo de resposta,
              acertos, erros, tentativas, método de acesso e sinais de fadiga.
              Assim, o jogo passa a ser também ferramenta de aprendizagem,
              avaliação funcional, comunicação e autonomia.
            </p>
          </div>
        </div>
      </section>

      {/* B) Por que jogos */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Por que jogos no DAVI?"
            title="Atividades estruturadas, não apenas entretenimento"
            description="Um jogo simples pode ajudar a praticar escolhas, reconhecer símbolos, formar palavras, contar objetos, responder perguntas, controlar o tempo de seleção e compreender a relação entre ação e resultado."
          />
          <div className="mt-8">
            <Chips items={benefits} />
          </div>
        </div>
      </section>

      {/* C) Jogo vs gamificação */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-7">
            <p className="text-sm font-black uppercase tracking-wide text-blue-800">
              Jogos educativos
            </p>
            <p className="mt-3 text-lg leading-8 text-zinc-800">
              Atividades completas com objetivos definidos, como jogo da velha,
              memória, complete a palavra, conte e escolha, associação de
              imagens, cores, sílabas e números.
            </p>
          </div>
          <div className="rounded-2xl border border-green-200 bg-green-50 p-7">
            <p className="text-sm font-black uppercase tracking-wide text-green-800">
              Gamificação
            </p>
            <p className="mt-3 text-lg leading-8 text-zinc-800">
              Uso de elementos de jogos em atividades comuns do DAVI: pontos,
              fases, medalhas, estrelas, progresso, desafios, feedback positivo,
              repetição com incentivo e níveis de dificuldade.
            </p>
          </div>
        </div>
      </section>

      {/* D) Métodos de acesso */}
      <section id="acesso" className="scroll-mt-24 border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Métodos de acesso compatíveis"
            title="A mesma atividade, por muitos caminhos"
            description="Cada jogo pode ser adaptado ao método de acesso disponível para o usuário — toque, teclado, botão único, varredura, olhar, sopro, joystick ou dispositivo conectado — permitindo participação mesmo com limitações motoras importantes."
          />
          <div className="mt-8">
            <CheckGrid items={accessMethods} />
          </div>
        </div>
      </section>

      {/* E) Jogos sugeridos */}
      <section id="jogos" className="scroll-mt-24 border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Jogos sugeridos"
            title="Dez atividades para começar"
            description="Cada jogo trabalha habilidades específicas e pode ser jogado por diferentes métodos de acesso."
          />
          <div className="mt-10">
            <ModuleGrid
              items={games.map((g) => ({ title: g.title, description: g.description }))}
              columns="lg:grid-cols-3 xl:grid-cols-4"
            />
          </div>
        </div>
      </section>

      {/* F) Destaque: Jogo da Velha com Varredura */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Destaque"
            title="Jogo da Velha Acessível com Varredura"
            description="Pode ser o primeiro protótipo do DAVI Games: demonstra como uma mesma atividade funciona por toque, teclado, botão adaptado, sopro, olhar e varredura automática."
          />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Image
              src="/images/games/jogo-da-velha-acessivel.png"
              alt="Tabuleiro de jogo da velha acessível com X e O, e uma casa destacada em amarelo representando a varredura automática."
              width={900}
              height={900}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full rounded-2xl border border-zinc-200 shadow-sm"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {tictactoeModes.map((mode) => (
                <div
                  key={mode.title}
                  className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-base font-black text-zinc-950">{mode.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{mode.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* G) Gamificação */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Gamificação no DAVI"
            title="Valorizar o progresso de cada um"
            description="A gamificação deve valorizar o progresso individual do usuário, e não a comparação com outras pessoas. O foco é estimular participação, autonomia, tentativa, persistência e evolução no próprio ritmo."
          />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Chips items={gamificationItems} />
            <Image
              src="/images/games/gamificacao-davi.png"
              alt="Elementos de gamificação: estrelas, medalha, troféu e barra de progresso, representando pontos, fases e conquistas."
              width={1200}
              height={600}
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="h-auto w-full rounded-2xl border border-zinc-200 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* H) Métricas */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Métricas e relatórios"
            title="Cada jogo pode gerar dados de evolução"
            description="As métricas apoiam professores, terapeutas, familiares e pesquisadores: mostram se o tempo de seleção melhorou, se houve redução de erros, se um método de acesso é mais eficiente ou se há sinais de fadiga."
          />
          <div className="mt-8">
            <CheckGrid items={metrics} />
          </div>
        </div>
      </section>

      {/* I) VR / AR / óculos smart */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Possibilidades futuras"
            title="Óculos inteligentes, realidade virtual e aumentada"
            description="O DAVI Games pode evoluir para experiências imersivas: ambientes seguros de treino, jogos de atenção visual, orientação espacial, reconhecimento de objetos e comunicação por olhar."
          />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Image
              src="/images/games/oculos-smart-realidade-virtual.png"
              alt="Óculos de realidade virtual com elementos de realidade aumentada, como letras, números e símbolos flutuantes."
              width={1200}
              height={600}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full rounded-2xl border border-zinc-200 shadow-sm"
            />
            <FlowSteps
              steps={["DAVI Vision", "Óculos smart / VR", "Jogo imersivo", "Métricas", "Evolução"]}
            />
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {futureTechnologies.map((t) => (
              <div key={t.title} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-black text-zinc-950">{t.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{t.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ConstructionNotice title="Use com cuidado">
              Essas tecnologias devem respeitar conforto, segurança, tempo de
              exposição, idade, sensibilidade visual, orientação profissional e
              consentimento da família ou responsável.
            </ConstructionNotice>
          </div>
        </div>
      </section>

      {/* J) Segurança, acessibilidade e ética */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Segurança, acessibilidade e ética"
            title="O jogo a serviço da pessoa"
          />
          <div className="mt-8">
            <CheckGrid
              items={[
                "Não substituem professor, terapeuta ou avaliação profissional",
                "Respeitam ritmo, fadiga e conforto do usuário",
                "Evitam estímulos visuais excessivos",
                "Som ligado/desligado",
                "Contraste e tamanho ajustáveis",
                "Permitem pausas",
                "Permitem repetição sem punição",
                "Respeitam a privacidade dos dados (LGPD)",
                "Não salvam imagens da face por padrão",
                "Decisões permanecem com profissionais e responsáveis",
              ]}
            />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href="/escola">Voltar ao DAVI Escola</LinkButton>
            <LinkButton href="/acesso/metodos" variant="secondary">
              Métodos de Acesso
            </LinkButton>
            <LinkButton href="/evolucao" variant="secondary">
              Evolução e Relatórios
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

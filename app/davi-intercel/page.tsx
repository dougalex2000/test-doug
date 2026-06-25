import type { Metadata } from "next";
import Image from "next/image";
import {
  Breadcrumb,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
  TagList,
} from "../components/SiteShell";
import {
  FlowSteps,
  GroupBadge,
  ModuleGrid,
  StatusBadge,
  type ModuleCard,
} from "../components/modules";
import {
  IconChat,
  IconCheckCircle,
  IconChip,
  IconClipboard,
  IconDocument,
  IconEye,
  IconGamepad,
  IconHeartHand,
  IconJoystick,
  IconLightbulb,
  IconSwitchButton,
  IconTouch,
} from "../components/icons";

export const metadata: Metadata = {
  title: "DAVI InterCel",
  description:
    "O celular como interface assistiva e extensão dos recursos do Projeto DAVI.",
};

const functions: ModuleCard[] = [
  {
    title: "Celular como botão assistivo",
    description:
      "Permite transformar o celular em um botão Sim/Não ou em um acionador simples para escolhas, respostas, controle de atividades e interação com a plataforma.",
    icon: <IconSwitchButton className="h-6 w-6" />,
  },
  {
    title: "Painel de comandos personalizados",
    description:
      "Permite criar telas com botões grandes e personalizados para controlar videoaulas, responder exercícios, abrir recursos da plataforma ou acionar comandos específicos.",
    icon: <IconClipboard className="h-6 w-6" />,
  },
  {
    title: "Prancha de comunicação",
    description:
      "O celular poderá funcionar como uma prancha de comunicação alternativa, com palavras, frases, pictogramas, áudio e voz sintetizada.",
    icon: <IconChat className="h-6 w-6" />,
  },
  {
    title: "Teclado e escrita adaptada",
    description:
      "Permite usar o celular como recurso de escrita acessível, com letras, palavras, frases prontas, entrada simplificada e apoio por voz.",
    icon: <IconDocument className="h-6 w-6" />,
  },
  {
    title: "Mouse, joystick e controle alternativo",
    description:
      "O celular poderá funcionar como mouse alternativo, joystick ou controle de navegação para interagir com a plataforma e outros recursos digitais.",
    icon: <IconJoystick className="h-6 w-6" />,
  },
  {
    title: "Controle por movimento, gesto ou câmera",
    description:
      "O módulo poderá explorar movimentos do celular, gestos, inclinação, toque, câmera e outros sensores para permitir novas formas de acesso.",
    icon: <IconTouch className="h-6 w-6" />,
  },
  {
    title: "Ponte com dispositivos assistivos",
    description:
      "O celular poderá servir como ponte entre o usuário, a plataforma DAVI e dispositivos assistivos conectados, como botões externos, sensores, módulos eletrônicos assistivos e recursos de automação.",
    icon: <IconChip className="h-6 w-6" />,
  },
  {
    title: "Apoio à aprendizagem",
    description:
      "O DAVI InterCel poderá apoiar videoaulas, exercícios, leitura, escrita, respostas, repetição de comandos, controle de atividades e acompanhamento do aluno durante o processo de aprendizagem.",
    icon: <IconGamepad className="h-6 w-6" />,
  },
];

const integrations: ModuleCard[] = [
  {
    title: "DAVI Escola",
    description: "Responder exercícios, controlar aulas e praticar escrita e números.",
    href: "/escola",
    icon: <IconDocument className="h-6 w-6" />,
  },
  {
    title: "Jogos e gamificação",
    description: "Controlar jogos com joystick virtual, botões grandes ou varredura.",
    href: "/davi-games",
    icon: <IconGamepad className="h-6 w-6" />,
  },
  {
    title: "Comunicação alternativa",
    description: "Montar frases, usar pictogramas e expressar necessidades.",
    href: "/comunicacao",
    icon: <IconChat className="h-6 w-6" />,
  },
  {
    title: "DAVI Vision",
    description: "Explorar futuramente cabeça, olhar, piscadas e gestos.",
    href: "/acesso/vision",
    icon: <IconEye className="h-6 w-6" />,
  },
  {
    title: "DAVI BioSinal",
    description: "Combinar sinais corporais e sensores complementares em estudos futuros.",
    href: "/acesso/biosinal",
    icon: <IconLightbulb className="h-6 w-6" />,
  },
  {
    title: "DAVI Conecta",
    description: "Conectar equipamentos embarcados, sensores e botões físicos.",
    href: "/acesso/conecta",
    icon: <IconChip className="h-6 w-6" />,
  },
  {
    title: "Relatórios e métricas",
    description: "Acompanhar respostas, tentativas, métodos de acesso e evolução.",
    href: "/evolucao",
    icon: <IconClipboard className="h-6 w-6" />,
  },
];

const accessibility = [
  "Botões grandes",
  "Alto contraste",
  "Fonte ampliada",
  "Feedback visual e sonoro",
  "Vibração",
  "Tempo de confirmação",
  "Ajuste de sensibilidade",
  "Varredura automática",
  "Varredura por linha e coluna",
  "Uso com um dedo",
  "Toque impreciso",
  "Movimento mínimo",
  "Modo cuidador ou profissional",
  "Interface simples para crianças",
];

const metrics = [
  "Tempo de resposta",
  "Tentativas, acertos e erros",
  "Tipo de comando utilizado",
  "Uso de toque, joystick, escrita, varredura ou movimento",
  "Evolução da escrita e da comunicação",
  "Interação com videoaulas e jogos",
  "Preferências de acesso da pessoa",
];

const phases = [
  {
    number: "01",
    title: "Protótipo",
    description:
      "Sim e Não, comunicação simples, escrita com o dedo, joystick, mouse alternativo, controle de videoaulas e conexão simulada.",
  },
  {
    number: "02",
    title: "Conexão real",
    description:
      "QR Code, código de sessão, WebSocket, integração com o site e envio de comandos em tempo real.",
  },
  {
    number: "03",
    title: "Recursos avançados",
    description:
      "Câmera, gestos, sensores do celular, dispositivos físicos conectados, métricas, relatórios e perfis personalizados.",
  },
];

export default function DaviInterCelPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Acesso e Dispositivos", href: "/acesso" },
          { label: "DAVI InterCel" },
        ]}
      />
      <PageHero
        eyebrow="DAVI InterCel"
        title="DAVI InterCel"
        description="O celular como interface assistiva e extensão dos recursos do Projeto DAVI."
        actions={
          <>
            <LinkButton href="/davi-intercel/sessao">Abrir Painel</LinkButton>
            <LinkButton href="/davi-intercel/controle" variant="secondary">
              Usar celular como controle
            </LinkButton>
            <LinkButton href="/davi-intercel/controle/sim-nao" variant="secondary">
              Ver demonstração
            </LinkButton>
            <LinkButton href="/davi-intercel/tecnico" variant="secondary">
              Modo técnico
            </LinkButton>
          </>
        }
      />

      <div className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <StatusBadge status="Em desenvolvimento" />
          <GroupBadge group="Grupo Acessibilidade e Métodos de Acesso" />
        </div>
      </div>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <Image
            src="/images/davi/app-celular-projeto-davi.png"
            alt="Celular apresentando escrita, comunicação, respostas Sim e Não, jogos, mouse e recursos de acessibilidade do Projeto DAVI"
            width={1200}
            height={900}
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="h-auto w-full rounded-lg border border-zinc-200 shadow-xl shadow-blue-950/10"
          />
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Como usar"
            title="Em 4 passos simples"
            description="A ideia é simples: abri o Painel, li o QR Code, escolhi o que fazer e já comecei a usar."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1", "Abra o Painel", "No computador, TV ou tablet."],
              ["2", "Leia o QR Code", "Aponte a câmera do celular."],
              ["3", "Escolha o que fazer", "Sim/Não, escrita, joystick, comunicação, som/sopro ou movimento."],
              ["4", "Use os botões grandes", "O celular controla a atividade na tela."],
            ].map(([n, title, text]) => (
              <li key={n} className="rounded-2xl border border-blue-100 bg-[#F6F8FB] p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-lg font-black text-white">
                  {n}
                </span>
                <p className="mt-4 text-lg font-black text-zinc-950">{title}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-zinc-600">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-zinc-500">
            Esta versão já permite usar o DAVI InterCel no navegador, com conexão
            em <strong>tempo real</strong> entre o celular e a Tela Grande via
            Supabase Realtime. O armazenamento local (localStorage) é mantido como
            histórico e reserva no mesmo aparelho.
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Por que é importante"
            title="Uma interface assistiva que já está no cotidiano"
            description="Muitas famílias e instituições ainda não possuem botões adaptados, joysticks, mouses especiais ou pranchas eletrônicas. O DAVI InterCel aproveita um recurso mais presente: o celular."
          />
          <div className="space-y-4 text-lg leading-8 text-zinc-700">
            <p>
              O DAVI InterCel é o módulo do Projeto DAVI que transforma o celular em
              uma interface assistiva multifuncional para comunicação, acesso,
              controle, aprendizagem e interação com outros dispositivos.
            </p>
            <p>
              Com o DAVI InterCel, o celular poderá atuar como botão Sim/Não,
              painel de comandos personalizados, teclado adaptado, mouse alternativo,
              joystick, prancha de comunicação, recurso de escrita, controle de
              videoaulas e acionador por movimento, gesto ou câmera.
            </p>
            <p>
              O objetivo é ampliar a autonomia da pessoa, permitindo que ela interaja
              com a plataforma e com atividades educativas de forma mais simples,
              acessível e personalizada.
            </p>
          </div>
        </div>
      </section>

      <section id="funcionalidades" className="scroll-mt-32 border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Funcionalidades"
            title="O que o celular pode se tornar"
            description="Uma interface adaptável ao movimento, à comunicação e ao objetivo de cada pessoa."
          />
          <div className="mt-10">
            <ModuleGrid items={functions} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Conexão"
            title="O celular controla a atividade na tela maior"
            description="A plataforma pode ser aberta em uma TV, computador, notebook ou tablet, enquanto o DAVI InterCel funciona como controle assistivo conectado à mesma sessão."
          />
          <div className="mt-8">
            <FlowSteps steps={["Código de sessão", "QR Code", "Mesma conta", "Rede local ou internet", "Comandos em tempo real"]} />
          </div>
          <div className="mt-10 grid gap-8 border-t border-zinc-200 pt-10 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-black text-zinc-950">Na TV, escola ou sala de recursos</h3>
              <p className="mt-3 text-lg leading-8 text-zinc-700">
                O Painel (na tela grande) exibe a aula, o jogo ou a atividade. O celular permite
                responder, escrever, controlar vídeos e usar comunicação alternativa
                sem depender do Bluetooth da televisão.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-black text-zinc-950">Ponte para dispositivos físicos</h3>
              <p className="mt-3 text-lg leading-8 text-zinc-700">
                Em uma etapa futura, o celular poderá conectar sensores, botões,
                equipamentos embarcados e módulos eletrônicos assistivos à plataforma DAVI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Integração"
            title="Um módulo conectado a todo o DAVI"
            description="O DAVI InterCel combina métodos de entrada com conteúdos, atividades, dispositivos assistivos e acompanhamento."
          />
          <div className="mt-10">
            <ModuleGrid items={integrations} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Acessibilidade"
              title="A interface se adapta à pessoa"
              description="Controles claros e configuráveis ajudam a reduzir barreiras de visão, precisão, movimento e compreensão."
            />
            <div className="mt-8">
              <TagList items={accessibility} />
            </div>
          </div>
          <div>
            <SectionHeader
              eyebrow="Métricas e evolução"
              title="Registrar para compreender e apoiar"
              description="Com consentimento e proteção de dados, o módulo poderá contribuir com relatórios sem produzir diagnóstico automático."
            />
            <ul className="mt-8 grid gap-3">
              {metrics.map((metric) => (
                <li key={metric} className="flex items-start gap-3 text-base font-semibold leading-7 text-zinc-700">
                  <IconCheckCircle className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  {metric}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-wide text-green-400">Desenvolvimento</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black sm:text-4xl">Do protótipo à conexão real</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
            A evolução será gradual, com testes de acessibilidade e validação com
            pessoas, famílias e profissionais.
          </p>
          <ol className="mt-10 grid gap-8 lg:grid-cols-3">
            {phases.map((phase) => (
              <li key={phase.number} className="border-t border-zinc-700 pt-6">
                <p className="text-4xl font-black text-green-400">{phase.number}</p>
                <h3 className="mt-4 text-2xl font-black">{phase.title}</h3>
                <p className="mt-3 text-base leading-7 text-zinc-300">{phase.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-green-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-4">
            <IconHeartHand className="h-10 w-10 shrink-0 text-green-700" />
            <div>
              <h2 className="max-w-4xl text-3xl font-black text-zinc-950 sm:text-4xl">
                O celular pode ampliar as possibilidades de interação no cotidiano.
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-700">
                O DAVI InterCel parte de um recurso presente em muitas famílias para
                apoiar comunicação, aprendizagem, participação e autonomia.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/davi-intercel/controle">Testar controle InterCel</LinkButton>
            <LinkButton href="/davi-intercel/sessao" variant="secondary">Abrir sessão na tela maior</LinkButton>
            <LinkButton href="/escola" variant="secondary">Conhecer DAVI Escola</LinkButton>
            <LinkButton href="/davi-games" variant="secondary">Ver jogos educativos</LinkButton>
            <LinkButton href="/tecnologias-assistivas/catalogo" variant="secondary">Explorar dispositivos</LinkButton>
            <LinkButton href="/contato" variant="tertiary">Falar sobre acessibilidade</LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

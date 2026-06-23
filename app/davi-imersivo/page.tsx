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
  IconLightbulb,
  IconShieldCheck,
  IconTouch,
  IconVrGlasses,
} from "../components/icons";

export const metadata: Metadata = {
  title: "DAVI Imersivo",
  description:
    "Óculos imersivos e inteligentes como recursos de aprendizagem, acessibilidade, interação e pesquisa.",
};

const possibilities: ModuleCard[] = [
  {
    title: "Aprendizagem imersiva",
    description:
      "Ambientes virtuais com objetos, letras, números, cenas e atividades interativas para favorecer curiosidade e participação.",
    icon: <IconDocument className="h-6 w-6" />,
  },
  {
    title: "Jogos educativos",
    description:
      "Experiências em realidade virtual, aumentada ou mista com objetivos pedagógicos e diferentes formas de controle.",
    icon: <IconGamepad className="h-6 w-6" />,
  },
  {
    title: "Treino de atenção",
    description:
      "Atividades controladas para observar foco visual, tempo de resposta, permanência e engajamento.",
    icon: <IconLightbulb className="h-6 w-6" />,
  },
  {
    title: "Exploração virtual",
    description:
      "Rotas, mapas, objetos 3D, salas e cenários simulados explorados de forma guiada e segura.",
    icon: <IconVrGlasses className="h-6 w-6" />,
  },
  {
    title: "Interação por olhar",
    description:
      "Pesquisa gradual com direção do olhar, permanência visual e piscadas, sempre com consentimento e proteção de dados.",
    icon: <IconEye className="h-6 w-6" />,
  },
  {
    title: "Cabeça e gestos",
    description:
      "Movimentos simples da cabeça e das mãos como possibilidades de navegação, escolha e participação.",
    icon: <IconTouch className="h-6 w-6" />,
  },
  {
    title: "Comunicação alternativa",
    description:
      "Pranchas virtuais, frases, pictogramas e respostas rápidas selecionadas por olhar, movimento ou outro acesso.",
    icon: <IconChat className="h-6 w-6" />,
  },
  {
    title: "Integração com celular",
    description:
      "O DAVI CelAcesso como joystick, botão de confirmação, mouse alternativo ou painel de apoio.",
    icon: <IconTouch className="h-6 w-6" />,
  },
  {
    title: "Dispositivos físicos conectados",
    description:
      "Integração futura com equipamentos embarcados, sensores, botões, joysticks e módulos eletrônicos assistivos.",
    icon: <IconChip className="h-6 w-6" />,
  },
  {
    title: "Pesquisa e métricas",
    description:
      "Tempo de interação, comandos, escolhas, tentativas e atenção visual registrados com finalidade definida e autorização.",
    icon: <IconClipboard className="h-6 w-6" />,
  },
];

const researchTopics = [
  "Interação por olhar em ambientes imersivos",
  "Rastreamento ocular por câmera",
  "Seleção por permanência visual",
  "Navegação por movimento da cabeça",
  "Comparação entre olhar, toque, joystick, celular e botões",
  "Jogos educativos acessíveis",
  "Treino de atenção em ambientes controlados",
  "Exploração virtual guiada",
  "Comunicação alternativa em interfaces imersivas",
  "Avaliação de engajamento",
  "Integração com relatórios e métricas",
  "Adaptação ao perfil funcional da pessoa",
];

const interactionModes = [
  "Olhar",
  "Piscada",
  "Movimento da cabeça",
  "Mão e gesto",
  "Voz",
  "Joystick",
  "Botão adaptado",
  "DAVI CelAcesso",
  "Permanência em alvo",
  "Controle combinado",
  "Sensores corporais",
];

const integrations: ModuleCard[] = [
  { title: "DAVI Vision", description: "Olhar, cabeça, câmera e atenção visual.", href: "/acesso/vision", icon: <IconEye className="h-6 w-6" /> },
  { title: "DAVI Escola", description: "Letras, palavras, números, histórias e atividades imersivas.", href: "/escola", icon: <IconDocument className="h-6 w-6" /> },
  { title: "DAVI CelAcesso", description: "Celular como controle, joystick, botão ou painel de comunicação.", href: "/davi-celacesso", icon: <IconTouch className="h-6 w-6" /> },
  { title: "Jogos e gamificação", description: "Experiências lúdicas com diferentes métodos de acesso.", href: "/davi-games", icon: <IconGamepad className="h-6 w-6" /> },
  { title: "DAVI BioSinal", description: "Sinais corporais e sensores complementares em pesquisas futuras.", href: "/acesso/biosinal", icon: <IconLightbulb className="h-6 w-6" /> },
  { title: "DAVI Conecta", description: "Equipamentos embarcados, botões e dispositivos físicos conectados.", href: "/acesso/conecta", icon: <IconChip className="h-6 w-6" /> },
  { title: "Relatórios e métricas", description: "Interação, atenção visual, escolhas, tentativas e evolução.", href: "/evolucao", icon: <IconClipboard className="h-6 w-6" /> },
];

const contexts = [
  "Sala de recursos multifuncionais",
  "Escola",
  "Laboratório de pesquisa",
  "Clínica ou instituição parceira",
  "Casa, quando adequado",
  "Atividades supervisionadas",
  "Treinamento com profissionais",
  "Exploração com familiares",
];

const careItems = [
  "Supervisão quando necessária",
  "Tempo de uso adequado e pausas",
  "Conforto visual",
  "Adaptação à idade e ao perfil funcional",
  "Consentimento e privacidade",
  "Proteção de imagens e dados de câmera",
  "Uso ético em pesquisa",
  "Interrupção da atividade a qualquer momento",
];

const phases = [
  { number: "01", title: "Conceito e protótipos visuais", description: "Página institucional, imagens, levantamento de possibilidades e integração conceitual com Vision, Escola, CelAcesso e Jogos." },
  { number: "02", title: "Experimentos controlados", description: "Interfaces simples, seleção por olhar ou cabeça, jogos acessíveis, atividades de atenção e métricas básicas." },
  { number: "03", title: "Integração com a plataforma", description: "Relatórios, perfis personalizados, DAVI CelAcesso, dispositivos físicos conectados e registros de evolução." },
  { number: "04", title: "Pesquisa aplicada", description: "Protocolos de uso, instituições parceiras, avaliação de acessibilidade, documentação técnica, ética e LGPD." },
];

export default function DaviImersivoPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Tecnologias Assistivas", href: "/tecnologias-assistivas" },
          { label: "DAVI Imersivo" },
        ]}
      />
      <PageHero
        eyebrow="DAVI Imersivo"
        title="DAVI Imersivo"
        description="Óculos imersivos e inteligentes como recursos de aprendizagem, acessibilidade, interação e pesquisa."
        actions={
          <>
            <LinkButton href="#possibilidades">Ver possibilidades de uso</LinkButton>
            <LinkButton href="/acesso/vision" variant="secondary">Conhecer DAVI Vision</LinkButton>
            <LinkButton href="/davi-games" variant="secondary">Explorar jogos educativos</LinkButton>
          </>
        }
      />

      <div className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <StatusBadge status="Planejado" />
          <GroupBadge group="Grupo DAVI Vision e Pesquisa Imersiva" />
        </div>
      </div>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <Image
            src="/images/davi/davi-xr-davi-imersivo.png"
            alt="Pessoa usando óculos imersivos em uma atividade educativa acessível do Projeto DAVI"
            width={1200}
            height={900}
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="h-auto w-full rounded-lg border border-zinc-200 shadow-xl shadow-blue-950/10"
          />
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Por que é importante"
            title="Novas portas de acesso à participação"
            description="Ambientes virtuais e interfaces inteligentes podem ampliar as formas de aprender, comunicar e interagir, sem substituir os métodos tradicionais."
          />
          <div className="space-y-4 text-lg leading-8 text-zinc-700">
            <p>
              O DAVI Imersivo investiga experiências com realidade virtual,
              aumentada, mista e óculos inteligentes em contextos educacionais e assistivos.
            </p>
            <p>
              A interação pode combinar olhar, cabeça, gestos, joystick, celular,
              botões adaptados e outros recursos, escolhidos de acordo com o perfil
              e o conforto de cada pessoa.
            </p>
          </div>
        </div>
      </section>

      <section id="possibilidades" className="scroll-mt-32 border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Possibilidades de uso"
            title="O que pode ser explorado"
            description="Frentes de pesquisa e desenvolvimento, não promessas de produto final imediato."
          />
          <div className="mt-10"><ModuleGrid items={possibilities} /></div>
        </div>
      </section>

      <section className="border-b border-zinc-800 bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-green-400">Pesquisa aplicada</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Possibilidades de pesquisa no DAVI Imersivo</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              Cada estudo deve considerar conforto, consentimento, privacidade,
              finalidade definida e adaptação individual.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {researchTopics.map((topic) => (
              <li key={topic} className="flex items-start gap-3 text-sm font-semibold leading-6 text-zinc-200">
                <IconCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Formas de interação"
            title="O melhor caminho pode combinar diferentes controles"
            description="A experiência não precisa depender de uma única forma de entrada."
          />
          <div className="mt-8"><TagList items={interactionModes} /></div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Integração"
            title="Conectado aos outros módulos do DAVI"
            description="Aprendizagem, acesso, comunicação e acompanhamento trabalhando em conjunto."
          />
          <div className="mt-10"><ModuleGrid items={integrations} /></div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Contextos de uso"
              title="Experiências adaptadas e supervisionadas"
              description="O uso deve respeitar o tempo, o ambiente e a necessidade de cada pessoa."
            />
            <div className="mt-8"><TagList items={contexts} /></div>
          </div>
          <div>
            <div className="flex items-center gap-3 text-green-700">
              <IconShieldCheck className="h-8 w-8" />
              <p className="text-sm font-black uppercase tracking-wide">Cuidados, ética e acessibilidade</p>
            </div>
            <h2 className="mt-4 text-3xl font-black text-zinc-950">A tecnologia deve ser centrada na pessoa</h2>
            <p className="mt-4 text-lg leading-8 text-zinc-700">
              O DAVI Imersivo deve ampliar possibilidades, nunca impor uma única forma de interação.
            </p>
            <ul className="mt-7 grid gap-3">
              {careItems.map((item) => (
                <li key={item} className="flex items-start gap-3 font-semibold leading-7 text-zinc-700">
                  <IconCheckCircle className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-wide text-blue-300">Desenvolvimento responsável</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black sm:text-4xl">Da pesquisa conceitual à aplicação acompanhada</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {phases.map((phase) => (
              <li key={phase.number} className="border-t border-zinc-700 pt-6">
                <p className="text-4xl font-black text-green-400">{phase.number}</p>
                <h3 className="mt-4 text-xl font-black">{phase.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{phase.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-blue-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-4">
            <IconHeartHand className="h-10 w-10 shrink-0 text-blue-700" />
            <div>
              <h2 className="max-w-5xl text-3xl font-black text-zinc-950 sm:text-4xl">
                Experiências virtuais acessíveis podem ampliar formas de aprender, explorar, interagir e se comunicar.
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-700">
                O DAVI Imersivo seguirá como frente de pesquisa, desenvolvimento e aplicação assistiva responsável.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/acesso/vision">Conhecer DAVI Vision</LinkButton>
            <LinkButton href="/escola" variant="secondary">Explorar DAVI Escola</LinkButton>
            <LinkButton href="/davi-games" variant="secondary">Ver jogos educativos</LinkButton>
            <LinkButton href="/davi-celacesso" variant="tertiary">Conhecer DAVI CelAcesso</LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

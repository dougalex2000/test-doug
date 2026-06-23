import type { Metadata } from "next";
import {
  Breadcrumb,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";
import {
  ConstructionNotice,
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
  IconHeartHand,
  IconLightbulb,
  IconSparkles,
  IconUsers,
} from "../components/icons";

export const metadata: Metadata = {
  title: "DAVI Emprega",
  description:
    "Emprego Apoiado, inclusão profissional e vida independente para pessoas com deficiência.",
};

/* Lista de cards simples (ícone + texto). */
function CheckCards({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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

const empregoApoiado: ModuleCard[] = [
  {
    title: "Perfil da pessoa",
    description:
      "Identificar interesses, habilidades, preferências, formas de comunicação, necessidades de apoio e objetivos profissionais.",
    icon: <IconUsers className="h-6 w-6" />,
  },
  {
    title: "Preparação",
    description:
      "Apoiar o desenvolvimento de comunicação, leitura, escrita, matemática básica, habilidades digitais, rotina e comportamento profissional.",
    icon: <IconDocument className="h-6 w-6" />,
  },
  {
    title: "Busca de oportunidades",
    description:
      "Aproximar a pessoa de empresas e funções compatíveis com suas habilidades e necessidades de acessibilidade.",
    icon: <IconSparkles className="h-6 w-6" />,
  },
  {
    title: "Adaptação do trabalho",
    description:
      "Ajudar a empresa a pensar em adaptações simples, tecnologia assistiva, comunicação acessível, organização da tarefa e acolhimento da equipe.",
    icon: <IconChip className="h-6 w-6" />,
  },
  {
    title: "Acompanhamento",
    description:
      "Acompanhar a entrada e a permanência da pessoa no trabalho, com apoio à empresa, à família, à instituição e ao próprio trabalhador.",
    icon: <IconHeartHand className="h-6 w-6" />,
  },
];

const cotas = [
  { faixa: "100 a 200 empregados", cota: "2%" },
  { faixa: "201 a 500 empregados", cota: "3%" },
  { faixa: "501 a 1.000 empregados", cota: "4%" },
  { faixa: "Mais de 1.000 empregados", cota: "5%" },
];

const paraPcd = [
  "Criação de currículo acessível",
  "Registro de habilidades e interesses",
  "Identificação de áreas de interesse profissional",
  "Apoio para escrever uma apresentação pessoal",
  "Preparação para entrevistas",
  "Treino de comunicação com voz, texto, pictogramas ou prancha",
  "Integração com o DAVI Escola (leitura, escrita, matemática, digital)",
  "Tecnologia assistiva para comunicação e acesso ao computador",
  "Acompanhamento da evolução por relatórios simples",
];

const paraEmpresas = [
  "Divulgação de vagas inclusivas",
  "Descrição simples e realista das funções",
  "Indicação das habilidades necessárias",
  "Identificação de barreiras de acessibilidade",
  "Sugestões de adaptações no posto de trabalho",
  "Apoio à comunicação entre empresa, candidato e instituição",
  "Orientação inicial sobre inclusão e acessibilidade",
  "Acompanhamento da adaptação do trabalhador",
  "Cumprimento da Lei de Cotas com responsabilidade social",
];

const paraInstituicoes = [
  "Apoio na identificação de habilidades",
  "Acompanhamento do desenvolvimento",
  "Orientação para família e empresa",
  "Preparação para a rotina de trabalho",
  "Apoio na comunicação",
  "Registro de evolução",
  "Mediação entre pessoa, empresa e comunidade",
  "Acompanhamento após a contratação",
];

const etapas = [
  { n: 1, titulo: "Perfil seguro", desc: "A pessoa, família, instituição ou empresa cria um perfil. Nesta versão inicial é apenas um protótipo visual, sem coleta real de dados." },
  { n: 2, titulo: "Mapeamento de habilidades", desc: "A plataforma ajuda a organizar interesses, capacidades, formas de comunicação, necessidades de acessibilidade e objetivos." },
  { n: 3, titulo: "Preparação com o DAVI", desc: "A pessoa pode usar módulos do Projeto DAVI — DAVI Escola, Comunicação Alternativa, DAVI Vision, DAVI BioSinal e DAVI Conecta — para desenvolver comunicação, aprendizagem e autonomia." },
  { n: 4, titulo: "Identificação de oportunidades", desc: "Empresas podem divulgar vagas inclusivas com linguagem simples e informações claras sobre acessibilidade, rotina e atividades." },
  { n: 5, titulo: "Mediação e adaptação", desc: "A plataforma aproxima candidato, empresa e rede de apoio, sugerindo adaptações, tecnologias assistivas e formas de comunicação." },
  { n: 6, titulo: "Acompanhamento", desc: "Após a aproximação ou contratação, a plataforma pode apoiar o acompanhamento da adaptação, aprendizagem, comunicação e permanência no trabalho." },
];

const integracoes: ModuleCard[] = [
  { title: "DAVI Escola", description: "Leitura, escrita, matemática básica, videoaulas, exercícios e habilidades digitais.", href: "/escola", icon: <IconDocument className="h-6 w-6" /> },
  { title: "Comunicação Alternativa", description: "Pranchas, pictogramas, frases prontas, voz sintetizada e apoio à comunicação no trabalho.", href: "/comunicacao", icon: <IconChat className="h-6 w-6" /> },
  { title: "DAVI Vision", description: "Rastreamento ocular, gestos, face e cabeça como formas de acesso.", href: "/acesso/vision", icon: <IconEye className="h-6 w-6" /> },
  { title: "DAVI BioSinal", description: "Exploração futura de sinais biológicos, piscadas, EMG e EOG para acesso assistivo.", href: "/acesso/biosinal", icon: <IconLightbulb className="h-6 w-6" /> },
  { title: "DAVI Conecta", description: "Botões adaptados, teclado acessível, sensores, ESP32, Bluetooth e dispositivos personalizados.", href: "/acesso/conecta", icon: <IconChip className="h-6 w-6" /> },
  { title: "Relatórios e Métricas", description: "Evolução, tempo de resposta, autonomia, participação e aprendizagem.", href: "/evolucao", icon: <IconClipboard className="h-6 w-6" /> },
  { title: "IA Assistiva", description: "Apoio para escrever currículo, preparar entrevista, resumir habilidades e adaptar linguagem.", href: "/ia/assistente", icon: <IconSparkles className="h-6 w-6" /> },
];

const recursosFuturos = [
  "Banco de talentos PcD",
  "Currículo acessível gerado pela plataforma",
  "Painel para empresas",
  "Painel para instituições parceiras",
  "Busca de vagas inclusivas",
  "Filtro por acessibilidade necessária",
  "Preparação para entrevista com IA",
  "Assistente para currículo e carta de apresentação",
  "Trilhas de formação pelo DAVI Escola",
  "Relatórios de evolução",
  "Acompanhamento pós-contratação",
  "Selo “Empresa Parceira DAVI Emprega”",
  "Área de cursos e capacitação",
  "Conexão com programas públicos e instituições parceiras",
  "Orientação para adaptação de posto de trabalho",
];

export default function DaviEmpregaPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ label: "O Projeto", href: "/projeto" }, { label: "DAVI Emprega" }]}
      />
      <PageHero
        eyebrow="DAVI Emprega"
        title="DAVI Emprega: tecnologia, apoio e oportunidades para inclusão profissional"
        description="Emprego Apoiado, inclusão profissional e vida independente."
        actions={
          <>
            <LinkButton href="#pcd">Sou pessoa com deficiência</LinkButton>
            <LinkButton href="#empresas" variant="secondary">Sou empresa</LinkButton>
            <LinkButton href="#instituicoes" variant="secondary">Sou instituição ou profissional de apoio</LinkButton>
            <LinkButton href="#emprego-apoiado" variant="secondary">Entenda o Emprego Apoiado</LinkButton>
          </>
        }
      />

      <div className="border-b border-zinc-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <StatusBadge status="Planejado" />
          <GroupBadge group="Grupo Comunidades e Instituições" />
        </div>
      </div>

      {/* Introdução */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-4xl space-y-4 text-lg leading-8 text-zinc-700">
          <p>
            O DAVI Emprega é uma proposta do Projeto DAVI para apoiar a inclusão
            de pessoas com deficiência no mundo do trabalho. A ideia é aproximar
            pessoas, famílias, instituições e empresas, considerando não apenas a
            vaga, mas também a preparação, a comunicação, a acessibilidade, as
            habilidades da pessoa e o acompanhamento necessário para uma inclusão
            real.
          </p>
          <p>
            O objetivo não é apenas cumprir uma obrigação legal, mas construir
            caminhos para que a pessoa com deficiência possa desenvolver
            autonomia, participar da sociedade, aprender, comunicar-se e, quando
            possível, trabalhar com dignidade, apoio e reconhecimento.
          </p>
        </div>
      </section>

      {/* O que é Emprego Apoiado */}
      <section id="emprego-apoiado" className="scroll-mt-24 border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Metodologia"
            title="O que é Emprego Apoiado?"
            description="Emprego Apoiado é uma metodologia de inclusão profissional centrada na pessoa. Em vez de olhar apenas para a deficiência, considera interesses, habilidades, formas de comunicação, necessidades de acessibilidade, rotina, apoio familiar, ambiente de trabalho e possibilidades reais de participação."
          />
          <div className="mt-10">
            <ModuleGrid items={empregoApoiado} />
          </div>
        </div>
      </section>

      {/* Lei de Cotas */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Legislação (educativo)"
            title="Inclusão profissional e Lei de Cotas"
            description="No Brasil, a Lei nº 8.213/1991, em seu artigo 93 (Lei de Cotas), estabelece que empresas com 100 ou mais empregados devem reservar parte de seus cargos para pessoas com deficiência ou reabilitadas pela Previdência Social."
          />
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200">
            <table className="w-full text-left">
              <caption className="sr-only">Percentual de cotas por número de empregados</caption>
              <thead className="bg-zinc-50">
                <tr>
                  <th scope="col" className="px-5 py-3 text-sm font-black text-zinc-700">Número de empregados</th>
                  <th scope="col" className="px-5 py-3 text-sm font-black text-zinc-700">Cota mínima</th>
                </tr>
              </thead>
              <tbody>
                {cotas.map((c) => (
                  <tr key={c.faixa} className="border-t border-zinc-200">
                    <td className="px-5 py-3 font-semibold text-zinc-800">{c.faixa}</td>
                    <td className="px-5 py-3 text-lg font-black text-blue-800">{c.cota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 rounded-xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
            As informações legais são apresentadas de forma educativa. Empresas,
            instituições e profissionais devem consultar fontes oficiais e
            orientação especializada para a aplicação correta da legislação.
          </p>
          <p className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-base font-semibold leading-7 text-blue-900">
            O DAVI Emprega deve ajudar as empresas a enxergarem a inclusão para
            além da obrigação legal. O foco deve ser dignidade, acessibilidade,
            permanência, desenvolvimento e respeito às capacidades de cada pessoa.
          </p>
        </div>
      </section>

      {/* Para pessoas com deficiência */}
      <section id="pcd" className="scroll-mt-24 border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Para pessoas com deficiência"
            title="Um perfil profissional acessível, no seu ritmo"
            description="O DAVI Emprega poderá futuramente apoiar a pessoa com deficiência na construção de um perfil profissional acessível, respeitando sua forma de comunicação, seu ritmo de aprendizagem e suas necessidades de apoio."
          />
          <div className="mt-8">
            <CheckCards items={paraPcd} />
          </div>
        </div>
      </section>

      {/* Para empresas */}
      <section id="empresas" className="scroll-mt-24 border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Para empresas"
            title="Encontrar candidatos e criar ambientes inclusivos"
            description="O DAVI Emprega poderá ajudar empresas a encontrarem candidatos, compreenderem necessidades de acessibilidade e criarem ambientes de trabalho mais inclusivos."
          />
          <div className="mt-8">
            <CheckCards items={paraEmpresas} />
          </div>
          <p className="mt-6 max-w-3xl rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-base font-semibold leading-7 text-zinc-800">
            A inclusão profissional não deve ser feita apenas para preencher uma
            vaga. Ela precisa considerar a pessoa, a função, o ambiente, a equipe
            e os apoios necessários para que o trabalho possa acontecer de forma
            real.
          </p>
        </div>
      </section>

      {/* Para instituições, famílias e profissionais */}
      <section id="instituicoes" className="scroll-mt-24 border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Rede de apoio"
            title="Rede de apoio para inclusão profissional"
            description="O processo de inclusão profissional pode envolver família, escolas, APAEs, centros de reabilitação, terapeutas, professores, cuidadores, profissionais de tecnologia assistiva, psicólogos, assistentes sociais e organizações sociais."
          />
          <div className="mt-8">
            <CheckCards items={paraInstituicoes} />
          </div>
        </div>
      </section>

      {/* Como funcionaria — linha do tempo */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="Etapas"
            title="Como funcionaria o DAVI Emprega"
            description="Um caminho com apoio antes, durante e depois da entrada no mundo do trabalho."
          />
          <ol className="mt-10 space-y-4">
            {etapas.map((e) => (
              <li key={e.n} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-black text-white">
                  {e.n}
                </span>
                <div>
                  <h3 className="text-lg font-black text-zinc-950">{e.titulo}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
            Nesta etapa, eventuais campos e perfis são apenas demonstração /
            protótipo visual. Não há cadastro real, envio de formulários nem
            coleta de dados.
          </p>
        </div>
      </section>

      {/* Protótipo visual (mockups) */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Como ficaria"
            title="Protótipo visual"
            description="Exemplos de como um perfil acessível e uma vaga inclusiva poderiam aparecer. São apenas ilustrações — sem campos reais, sem cadastro e sem envio de dados."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Perfil acessível (demonstração) */}
            <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-black uppercase tracking-wide text-blue-800">
                  Perfil acessível
                </p>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-900">
                  Demonstração
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl" aria-hidden="true">🙂</span>
                <div>
                  <p className="text-lg font-black text-zinc-950">Candidato (exemplo)</p>
                  <p className="text-sm font-bold text-zinc-500">Em busca da primeira oportunidade</p>
                </div>
              </div>
              <dl className="mt-5 grid gap-3 text-sm leading-6">
                {[
                  ["Formas de comunicação", "Fala + prancha de pictogramas"],
                  ["Habilidades", "Organização, atenção a detalhes, uso de tablet"],
                  ["Áreas de interesse", "Estoque, digitalização, atendimento simples"],
                  ["Necessidades de acessibilidade", "Instruções por imagens, tempo extra, ambiente tranquilo"],
                  ["Apoios", "Acompanhamento na adaptação ao trabalho"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                    <dt className="text-xs font-black uppercase tracking-wide text-zinc-500">{k}</dt>
                    <dd className="mt-0.5 font-semibold text-zinc-800">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>

            {/* Vaga inclusiva (exemplo) */}
            <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-black uppercase tracking-wide text-green-800">
                  Vaga inclusiva
                </p>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-900">
                  Exemplo
                </span>
              </div>
              <p className="mt-4 text-lg font-black text-zinc-950">Auxiliar de organização</p>
              <p className="text-sm font-bold text-zinc-500">Empresa Exemplo · Vaga ilustrativa</p>
              <dl className="mt-5 grid gap-3 text-sm leading-6">
                {[
                  ["Acessibilidade", "Posto adaptável, comunicação por imagens"],
                  ["Rotina", "Meio período, tarefas em etapas claras"],
                  ["Habilidades", "Organização, cuidado, pontualidade"],
                  ["Apoio", "Mediação com instituição parceira e tecnologia assistiva"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
                    <dt className="text-xs font-black uppercase tracking-wide text-zinc-500">{k}</dt>
                    <dd className="mt-0.5 font-semibold text-zinc-800">{v}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                disabled
                title="Demonstração — sem envio de dados"
                aria-disabled="true"
                className="mt-5 w-full cursor-not-allowed rounded-lg bg-green-600/60 px-5 py-3 text-sm font-black text-white"
              >
                Tenho interesse (exemplo)
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* Integração com o ecossistema */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Ecossistema"
            title="Como o DAVI Emprega se conecta ao ecossistema DAVI"
          />
          <div className="mt-10">
            <ModuleGrid items={integracoes} />
          </div>
        </div>
      </section>

      {/* Recursos futuros */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Visão de futuro"
            title="Recursos futuros do DAVI Emprega"
            description="Possibilidades de desenvolvimento — não promessas fechadas."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {recursosFuturos.map((r) => (
              <span
                key={r}
                className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-800"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Ética, LGPD */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl space-y-6">
          <SectionHeader
            eyebrow="Proteção"
            title="Cuidado com dados sensíveis"
            description="Informações sobre deficiência, saúde, comunicação, acessibilidade e condição funcional são dados sensíveis. O DAVI Emprega deve tratá-las com consentimento, segurança, finalidade clara, transparência e respeito à LGPD."
          />
          <CheckCards
            items={[
              "A pessoa controla quais informações deseja compartilhar",
              "Dados sensíveis não devem ser exibidos publicamente",
              "Empresas não devem usar informações para discriminar",
              "Prioridade para acessibilidade, dignidade e autonomia",
              "Coleta real só após termos de uso, consentimento e segurança",
              "Foco nas habilidades, apoios e possibilidades de participação",
            ]}
          />
          <ConstructionNotice title="Página conceitual" tone="blue">
            Esta é uma área institucional e conceitual. Não há banco de dados,
            cadastro real ou coleta de dados sensíveis nesta etapa. Qualquer
            coleta futura exigirá consentimento, segurança e, quando aplicável,
            aprovação ética.
          </ConstructionNotice>
        </div>
      </section>

      {/* Chamada final */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl rounded-2xl border border-blue-200 bg-blue-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-blue-800">
            Trabalho com apoio, tecnologia e dignidade
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            O DAVI Emprega nasce como uma proposta para unir tecnologia
            assistiva, educação, comunicação e inclusão profissional. A meta é
            construir uma ponte entre pessoas com deficiência e oportunidades
            reais, com apoio antes, durante e depois da entrada no mundo do
            trabalho.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/escola">Conhecer o DAVI Escola</LinkButton>
            <LinkButton href="/comunicacao" variant="secondary">Comunicação Alternativa</LinkButton>
            <LinkButton href="/tecnologias-assistivas" variant="secondary">Tecnologias Assistivas</LinkButton>
            <LinkButton href="/contato" variant="secondary">Entrar em contato</LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import EyeTrackingDemo from "./components/EyeTrackingDemo";

const ecosystemItems = [
  "Plataforma digital",
  "Rastreamento visual assistivo",
  "Inteligência artificial",
  "Métodos de acesso assistivo",
  "Avaliação funcional",
  "Relatórios inteligentes",
  "Galeria de tecnologias assistivas",
  "Projetos abertos",
  "Oficina maker assistiva",
  "Possibilidade futura de loja social",
  "Apoio a escolas, famílias, ONGs, OSCIPs e instituições",
];

const aiSupports = [
  "avaliação funcional",
  "personalização de atividades",
  "rastreamento visual com calibração personalizada",
  "recomendação de dispositivos assistivos",
  "análise de progresso",
  "geração de relatórios inteligentes",
  "apoio à oficina maker",
];

const accessMethods = [
  "Olhar",
  "Toque",
  "Acionadores físicos",
  "Sopro",
  "Movimento da cabeça",
  "Joystick",
  "Pedal",
  "Varredura automática",
  "Entrada multimodal",
];

const reportItems = [
  "tempo de atividade",
  "erros e acertos",
  "método de acesso utilizado",
  "evolução funcional",
  "autonomia",
  "progresso educacional",
];

const assistiveTechItems = [
  "Botão adaptado",
  "Sensor de sopro",
  "Base Visual DAVI",
  "Teclado ampliado",
  "Keyguard",
  "Joystick acessível",
  "Pedal adaptado",
  "Suporte de câmera",
  "Mouse de cabeça",
  "Kits maker",
];

const futureCatalogFeatures = [
  "descrição",
  "indicação de uso",
  "projeto aberto para baixar",
  "arquivos para fabricação",
  "solicitação de adaptação",
  "opção futura de compra pela loja social",
];

const impactAudiences = [
  "escolas",
  "salas de recursos",
  "famílias",
  "ONGs",
  "OSCIPs",
  "clínicas",
  "universidades",
  "prefeituras",
  "centros de reabilitação",
  "espaços maker",
];

const principles = [
  "Inclusão",
  "Autonomia",
  "Acessibilidade",
  "Personalização",
  "Privacidade",
  "Segurança",
  "Colaboração",
  "Baixo custo",
  "Tecnologia aberta",
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-zinc-700">{description}</p>
      ) : null}
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-800"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section
        className="relative min-h-[88vh] overflow-hidden text-white"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-6 py-20">
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
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200">
            Um ecossistema para transformar necessidades reais em recursos
            acessíveis, mensuráveis e adaptáveis, apoiando inclusão, autonomia e
            participação social.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#origem"
              className="rounded-full bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              Conhecer o projeto
            </a>
            <a
              href="#tecnologias"
              className="rounded-full border border-white px-6 py-3 font-bold text-white transition hover:bg-white hover:text-zinc-950"
            >
              Ver tecnologias assistivas
            </a>
            <a
              href="#rastreamento"
              className="rounded-full border border-blue-200 px-6 py-3 font-bold text-blue-100 transition hover:bg-blue-100 hover:text-blue-950"
            >
              Testar rastreamento visual
            </a>
          </div>
        </div>
      </section>

      <section id="origem" className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Origem do Projeto DAVI"
              title="Uma experiência real que virou plataforma"
              description="O projeto nasceu a partir do acompanhamento de um aluno chamado Davi, de 9 anos, com limitações motoras e dificuldade para ler e escrever por não conseguir usar lápis e papel de forma convencional."
            />
            <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                Ao perceber que Davi conseguia pressionar algumas teclas do
                computador, foi criada uma ferramenta educacional adaptada para
                alfabetização, respeitando sua forma possível de acesso.
              </p>
              <p>
                Em aproximadamente 40 dias, houve avanço importante na autonomia,
                no uso das teclas e na participação social. A professora
                Alessandra del Castillo teve papel essencial no acompanhamento
                pedagógico e na observação da evolução.
              </p>
            </div>
          </div>
          <div
            className="min-h-[360px] rounded-2xl border border-zinc-200 bg-zinc-100 shadow-lg"
            style={{
              backgroundImage: "url('/robot.jpg')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </div>
      </section>

      <section id="sobre" className="bg-zinc-950 px-6 py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-300">
              O que é o DAVI
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Não é apenas um site. É uma plataforma integrada.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              O DAVI integra avaliação, personalização, acompanhamento e criação
              de soluções assistivas. A proposta é aproximar software, hardware,
              educação, comunicação alternativa e fabricação personalizada.
            </p>
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

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Inteligência Artificial no DAVI"
            title="IA como apoio, não como promessa fechada"
            description="A inteligência artificial poderá apoiar decisões, organização de dados e personalização, sempre como recurso assistivo em desenvolvimento e com validação humana."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiSupports.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-base font-semibold text-zinc-800"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Rastreamento Visual Assistivo"
              title="Seleção por olhar com webcam e calibração personalizada"
              description="O DAVI poderá utilizar webcam, calibração de 9 pontos, captura de múltiplos frames, aprendizagem personalizada e seleção por zonas."
            />
            <p className="mt-5 text-lg leading-8 text-zinc-700">
              A proposta não substitui um eye tracker profissional. Ela explora
              uma solução assistiva de baixo custo para permitir seleção por
              olhar em contextos educacionais, comunicacionais e experimentais.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-white p-6">
            <h3 className="text-2xl font-bold text-zinc-950">
              Módulo de Captura Visual Assistiva
            </h3>
            <p className="mt-4 text-lg leading-8 text-zinc-700">
              A Base Visual DAVI considera câmera, iluminação difusa, suporte de
              posicionamento, distância adequada, orientação de postura e
              calibração personalizada para melhorar a estabilidade do acesso
              visual.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Métodos de Acesso Assistivo"
            title="Diferentes formas de entrada para diferentes necessidades"
          />
          <div className="mt-8">
            <TagList items={accessMethods} />
          </div>
        </div>
      </section>

      <section className="bg-zinc-100 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Avaliação e Relatórios"
              title="Dados para acompanhar autonomia e aprendizagem"
              description="O DAVI poderá registrar indicadores funcionais e educacionais para apoiar professores, terapeutas, famílias e instituições."
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {reportItems.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-zinc-200 bg-white p-4 font-semibold text-zinc-800"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tecnologias" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Galeria de Tecnologias Assistivas"
            title="Catálogo de equipamentos, adaptações e projetos abertos"
            description="A galeria poderá reunir equipamentos e soluções assistivas, com orientações de uso e caminhos para adaptação personalizada."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {assistiveTechItems.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-center font-bold text-zinc-900"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
            <h3 className="text-xl font-bold">Cada item poderá oferecer</h3>
            <div className="mt-4">
              <TagList items={futureCatalogFeatures} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-300">
              Oficina Maker Assistiva
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Criar, adaptar e documentar soluções personalizadas
            </h2>
          </div>
          <p className="text-lg leading-8 text-zinc-300">
            O DAVI poderá contar com uma oficina maker para adaptar, criar e
            fabricar soluções de hardware e software. Isso inclui impressão 3D,
            eletrônica, sensores, suportes, software, testes funcionais e
            documentação aberta para reprodução e melhoria contínua.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeader
              eyebrow="Impacto Social"
              title="Uma rede para apoiar quem ensina, cuida, pesquisa e inclui"
              description="A plataforma poderá apoiar diferentes contextos institucionais e comunitários, criando pontes entre necessidades, tecnologia e acompanhamento."
            />
          </div>
          <TagList items={impactAudiences} />
        </div>
      </section>

      <section className="bg-blue-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-100">
            Princípios do Projeto
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {principles.map((principle) => (
              <span
                key={principle}
                className="rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm font-bold"
              >
                {principle}
              </span>
            ))}
          </div>
        </div>
      </section>

      <EyeTrackingDemo />

      <section className="bg-zinc-950 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">
          Construindo o futuro da inclusão tecnológica
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-zinc-300">
          Projeto em desenvolvimento no contexto de tecnologia assistiva,
          robótica, educação inclusiva, fabricação digital e inteligência
          artificial aplicada.
        </p>
        <a
          href="#rastreamento"
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-bold text-zinc-950 transition hover:bg-zinc-200"
        >
          Testar Rastreamento Visual
        </a>
      </section>
    </main>
  );
}

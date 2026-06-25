import type { Metadata } from "next";
import Image from "next/image";
import {
  Breadcrumb,
  Illustration,
  InfoGrid,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";
import { DeviceCard } from "../components/DeviceCard";
import { assistiveDevices } from "../lib/devices";
import {
  IconChip,
  IconClipboard,
  IconCube,
  IconDocument,
  IconHeartHand,
  IconPrinter3D,
  IconUsers,
  IconWrench,
} from "../components/icons";

export const metadata: Metadata = {
  title: "DAVI Maker",
  description:
    "A oficina maker do DAVI adapta dispositivos, cria acionadores, imprime peças em 3D, integra sensores e documenta projetos abertos.",
};

const capabilities = [
  {
    title: "Adaptar dispositivos existentes",
    description:
      "Modificar equipamentos comuns — mouses, teclados, brinquedos — para diferentes formas de acesso.",
  },
  {
    title: "Criar novos acionadores",
    description:
      "Desenvolver botões, sensores capacitivos, pedais e acionadores de sopro sob medida.",
  },
  {
    title: "Imprimir peças em 3D",
    description:
      "Produzir keyguards, suportes, empunhaduras e carcaças personalizadas em impressão 3D.",
  },
  {
    title: "Montar suportes personalizados",
    description:
      "Estruturas de posicionamento para webcam, tablet, acionadores e apoios posturais.",
  },
  {
    title: "Integrar sensores",
    description:
      "Conectar sensores de proximidade, inclinação e sopro a computadores e tablets, com prototipagem em ESP32, Arduino e Raspberry Pi Pico.",
  },
  {
    title: "Desenvolver software assistivo",
    description:
      "Criar e ajustar interfaces de varredura, comunicação e jogos de causa e efeito.",
  },
  {
    title: "Testar protótipos",
    description:
      "Validar cada solução com usuários reais antes de documentar e distribuir.",
  },
  {
    title: "Documentar projetos abertos",
    description:
      "Publicar arquivos STL, esquemas, listas de materiais e manuais para reprodução livre.",
  },
  {
    title: "Apoiar instituições",
    description:
      "Atender escolas, famílias, ONGs, OSCIPs e instituições com adaptações sob demanda.",
  },
];

const requestSteps = [
  {
    icon: <IconClipboard className="h-7 w-7" />,
    title: "1. Solicitação",
    description:
      "Profissional, família ou instituição descreve a necessidade: o que a pessoa quer fazer e o que está impedindo.",
  },
  {
    icon: <IconUsers className="h-7 w-7" />,
    title: "2. Avaliação conjunta",
    description:
      "A oficina conversa com quem acompanha a pessoa e revisa a avaliação funcional registrada na plataforma.",
  },
  {
    icon: <IconWrench className="h-7 w-7" />,
    title: "3. Prototipagem",
    description:
      "Impressão 3D, eletrônica e montagem do primeiro protótipo, com materiais de baixo custo.",
  },
  {
    icon: <IconHeartHand className="h-7 w-7" />,
    title: "4. Teste com a pessoa",
    description:
      "O protótipo é testado em situação real de uso e ajustado quantas vezes for necessário.",
  },
  {
    icon: <IconDocument className="h-7 w-7" />,
    title: "5. Documentação aberta",
    description:
      "A solução final vira projeto aberto: arquivos, esquemas e manual publicados para reprodução livre.",
  },
];

const workshopAreas = [
  {
    name: "oficina-impressao-3d",
    alt: "Impressora 3D produzindo um keyguard verde, com carretel de filamento e peças prontas na bancada",
    icon: <IconPrinter3D className="h-6 w-6" />,
    title: "Fabricação digital",
    description:
      "Impressão 3D de keyguards, carcaças, suportes e empunhaduras personalizadas.",
  },
  {
    name: "oficina-bancada-eletronica",
    alt: "Bancada de eletrônica com protoboard, microcontrolador, fios e ferro de solda",
    icon: <IconChip className="h-6 w-6" />,
    title: "Eletrônica e sensores",
    description:
      "Bancada de solda e prototipagem com ESP32, Arduino e Raspberry Pi Pico para acionadores e sensores.",
  },
  {
    name: "oficina-testes",
    alt: "Mesa de testes com tablet em suporte articulado exibindo prancha de comunicação e um acionador vermelho grande",
    icon: <IconCube className="h-6 w-6" />,
    title: "Área de testes",
    description:
      "Espaço onde cada protótipo é validado com a pessoa, no posicionamento real de uso.",
  },
];

const openProjects = assistiveDevices
  .filter((device) => device.status === "Projeto aberto")
  .slice(0, 3);

export default function OficinaMakerPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Tecnologias Assistivas" }, { label: "DAVI Maker" }]} />
      <PageHero
        eyebrow="DAVI Maker"
        title="Quando a solução não existe, a oficina cria"
        description="Espaço de fabricação digital dedicado a adaptar, criar, testar e documentar tecnologias assistivas de baixo custo — sempre como projetos abertos que outras pessoas podem reproduzir."
        actions={
          <>
            <LinkButton href="#solicitar">Solicitar adaptação</LinkButton>
            <LinkButton href="/tecnologias-assistivas/catalogo" variant="secondary">
              Ver o Catálogo
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="O espaço"
            title="Um fablab dedicado à tecnologia assistiva"
            description="Impressão 3D, corte a laser, eletrônica e testes com usuários no mesmo ambiente — organizado para que cada protótipo saia da bancada e chegue à mão da pessoa no menor caminho possível."
          />
          <figure className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <Image
              src="/images/davi/Espaco-maker.png"
              alt="Espaço maker do Projeto DAVI com ambiente realista dedicado à criação de tecnologias assistivas"
              width={1672}
              height={941}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full"
            />
          </figure>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-700">
            O Espaço Maker do Projeto DAVI representa um ambiente de criação,
            adaptação e experimentação de tecnologias assistivas, aproximando
            educação, acessibilidade, eletrônica, impressão 3D, programação e
            soluções personalizadas para ampliar a autonomia das pessoas com
            deficiência.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Impressão 3D",
              "Corte a laser",
              "Bancada de eletrônica",
              "Painel de ferramentas",
              "Componentes organizados",
              "Mesa central de montagem e testes",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-bold text-zinc-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Illustration
            name="oficina-impressao-3d"
            alt="Impressora 3D produzindo um keyguard verde na oficina maker, com carretel de filamento e peças prontas na bancada"
            className="min-h-[380px]"
          />
          <div>
            <SectionHeader
              eyebrow="Por que uma oficina"
              title="Tecnologia assistiva não é padronizada"
              description="Cada pessoa tem necessidades únicas. Um botão dois centímetros mais alto, um suporte com outro ângulo ou um acionador mais sensível podem ser a diferença entre conseguir ou não usar a tecnologia. A oficina maker existe para fazer esses ajustes — e para criar do zero o que ainda não existe."
            />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Como funciona"
            title="Da solicitação à solução documentada"
            description="Cinco etapas, sempre com a pessoa no centro: nada é entregue sem teste em situação real de uso."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {requestSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-700">
                  {step.icon}
                </span>
                <h3 className="mt-4 text-lg font-black text-zinc-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Estrutura"
            title="Três áreas de trabalho"
            description="Fabricação digital, eletrônica e testes com usuários funcionam lado a lado, encurtando o caminho entre a ideia e o dispositivo na mão da pessoa."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {workshopAreas.map((area) => (
              <div
                key={area.name}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
              >
                <Illustration
                  name={area.name}
                  alt={area.alt}
                  className="rounded-none border-0 shadow-none"
                />
                <div className="p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    {area.icon}
                  </span>
                  <h3 className="mt-3 text-xl font-black text-zinc-950">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="O que a oficina faz"
            title="Nove frentes de trabalho"
          />
          <div className="mt-10">
            <InfoGrid items={capabilities} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Projetos abertos"
            title="Feitos aqui, livres para reproduzir"
            description="Dispositivos já documentados pela oficina, com lista de materiais, cuidados de segurança e opções de personalização."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {openProjects.map((device) => (
              <DeviceCard key={device.slug} device={device} />
            ))}
          </div>
          <div className="mt-8">
            <LinkButton href="/galeria" variant="secondary">
              Ver todos os projetos na Galeria
            </LinkButton>
          </div>
        </div>
      </section>

      <section id="solicitar" className="scroll-mt-24 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-blue-200 bg-blue-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-blue-800">
            Solicitar uma adaptação
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            Profissionais, famílias e instituições podem solicitar adaptações e
            fabricações. Descreva o que a pessoa quer fazer, o que está
            impedindo e, se houver, a avaliação funcional registrada na
            plataforma — a oficina responde com uma proposta de solução.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/contato">Registrar solicitação</LinkButton>
            <LinkButton href="/avaliacao" variant="secondary">
              Fazer avaliação funcional
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

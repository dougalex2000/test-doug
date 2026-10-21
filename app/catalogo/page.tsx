import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  Breadcrumb,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";
import { DeviceCard } from "../components/DeviceCard";
import { assistiveDevices, type AssistiveDevice } from "../lib/devices";
import {
  IconChat,
  IconClipboard,
  IconEye,
  IconHeartHand,
  IconStand,
  IconSwitchButton,
  IconWrench,
} from "../components/icons";

export const metadata: Metadata = {
  title: "DAVI Catálogo",
  description:
    "Catálogo de dispositivos do Projeto DAVI: acionadores, sensores de sopro, acesso pelo olhar, comunicação alternativa, suportes e kits maker — com indicação de uso e custo estimado.",
};

type CatalogGroup = {
  id: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  slugs: string[];
};

const catalogGroups: CatalogGroup[] = [
  {
    id: "acionadores",
    icon: <IconSwitchButton className="h-8 w-8" />,
    eyebrow: "Acionadores e métodos de acesso",
    title: "Para cada movimento voluntário, um acionador",
    description:
      "Botões, pedais, sensores capacitivos, joysticks e sensores de sopro: dispositivos que transformam o movimento que a pessoa já tem em um comando confiável.",
    slugs: [
      "botao-adaptado-grande",
      "acionador-capacitivo",
      "pedal-adaptado",
      "joystick-acessivel",
      "sensor-de-sopro",
    ],
  },
  {
    id: "olhar",
    icon: <IconEye className="h-8 w-8" />,
    eyebrow: "Acesso pelo olhar e captura visual",
    title: "Estruturas para o rastreamento visual",
    description:
      "Suportes, iluminação e referências de distância que tornam o rastreamento visual com webcam comum mais estável e confortável.",
    slugs: ["base-visual-davi", "suporte-webcam-iluminacao", "mouse-de-cabeca"],
  },
  {
    id: "comunicacao",
    icon: <IconChat className="h-8 w-8" />,
    eyebrow: "Comunicação e software assistivo",
    title: "Expressão, escrita e seleção acessíveis",
    description:
      "Pranchas de comunicação, interfaces de varredura, teclados ampliados e keyguards para participar, aprender e se expressar.",
    slugs: [
      "prancha-comunicacao",
      "interface-de-varredura",
      "teclado-ampliado",
      "keyguard",
    ],
  },
  {
    id: "suportes",
    icon: <IconStand className="h-8 w-8" />,
    eyebrow: "Suportes, posicionamento e kits",
    title: "Posicionar bem é metade da solução",
    description:
      "Suportes articulados, apoios posturais e kits de avaliação multimodal usados por profissionais e oficinas.",
    slugs: ["suporte-tablet", "apoio-de-cabeca", "kit-entrada-multimodal"],
  },
];

const deviceBySlug = new Map(
  assistiveDevices.map((device) => [device.slug, device]),
);

function devicesOf(group: CatalogGroup): AssistiveDevice[] {
  return group.slugs
    .map((slug) => deviceBySlug.get(slug))
    .filter((device): device is AssistiveDevice => Boolean(device));
}

const howItWorks = [
  {
    icon: <IconClipboard className="h-7 w-7" />,
    title: "1. Avaliação funcional",
    description:
      "O profissional identifica o movimento voluntário mais confiável da pessoa e registra a avaliação na plataforma.",
  },
  {
    icon: <IconEye className="h-7 w-7" />,
    title: "2. Recomendação",
    description:
      "A partir da avaliação, o catálogo indica os dispositivos compatíveis com o método de acesso da pessoa.",
  },
  {
    icon: <IconWrench className="h-7 w-7" />,
    title: "3. Adaptação na oficina",
    description:
      "A oficina maker personaliza o dispositivo: tamanho, força de acionamento, cores, fixação e posicionamento.",
  },
  {
    icon: <IconHeartHand className="h-7 w-7" />,
    title: "4. Teste com a pessoa",
    description:
      "Toda solução é validada em uso real antes da entrega — e ajustada quantas vezes for preciso.",
  },
];

export default function CatalogoPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ label: "Tecnologias Assistivas" }, { label: "DAVI Catálogo" }]}
      />
      <PageHero
        eyebrow="DAVI Catálogo"
        title="Catálogo de tecnologia assistiva"
        description="Explore dispositivos, recursos de comunicação e protótipos de pesquisa. Consulte a indicação de uso e o estágio de desenvolvimento de cada solução."
        actions={
          <>
            <LinkButton href="/tecnologias-assistivas/oficina-maker">Solicitar adaptação</LinkButton>
            <LinkButton href="/galeria" variant="secondary">
              Explorar com filtros na Galeria
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-4">
        <details className="mx-auto max-w-7xl">
          <summary className="cursor-pointer py-2 text-sm font-bold text-zinc-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">Como escolher e adaptar um dispositivo</summary>
            <div className="grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((step) => (
                <div
                  key={step.title}
                  className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
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
        </details>
      </section>

      <section className="border-b border-zinc-200 bg-zinc-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-widest text-blue-700">Demonstrações e pesquisa</p><h2 className="mt-2 text-2xl font-black text-zinc-950">Explore as soluções</h2></div>
            <p className="text-sm text-zinc-500">Imagens ilustrativas · Sem comercialização</p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
              <div className="relative flex h-48 items-center justify-center border-b border-zinc-100 bg-zinc-100 p-3 sm:h-56">
                <Image src="/images/davi/tecnologia-assistiva-ilustrativa.png" alt="Exemplos ilustrativos de acionador vermelho, teclado ampliado e tablet de comunicação" width={1536} height={1024} sizes="(max-width: 768px) 100vw, 600px" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="self-start rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-600">Ilustrativo · Não comercializado</span>
                <h3 className="mt-3 text-xl font-black text-zinc-950">Acesso e comunicação</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">Acionador de grande área, teclado ampliado e tablet em suporte articulado: exemplos de recursos para diferentes formas de interação.</p>
                <p className="mt-3 text-xs leading-5 text-zinc-500">Representação gerada por IA. Não corresponde a estoque, fabricação ou oferta de venda do DAVI.</p>
                <div className="mt-auto pt-5"><LinkButton href="#acionadores" variant="secondary">Explorar dispositivos</LinkButton></div>
              </div>
            </article>
            <article className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
              <div className="relative flex h-48 items-center justify-center border-b border-zinc-100 bg-zinc-100 p-3 sm:h-56">
                <Image src="/images/davi/cricket-usb-c-prototipo.jpeg" alt="Prancha conceitual do fone CRICKET USB-C com câmera e microfone" width={1448} height={1086} sizes="(max-width: 768px) 100vw, 600px" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="self-start rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">Protótipo em teste · Não comercializado</span>
                <h3 className="mt-3 text-xl font-black text-zinc-950">CRICKET USB-C</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">Conceito de fone com câmera e microfone para apoio visual e cognitivo junto ao DAVI Mentor.</p>
                <p className="mt-3 text-xs leading-5 text-zinc-500">Sem preço, venda ou encomendas. Hardware e compatibilidade ainda em validação.</p>
                <div className="mt-auto pt-5"><LinkButton href="/catalogo/cricket-usb-c">Ver detalhes do protótipo</LinkButton></div>
              </div>
            </article>
          </div>
          <nav aria-label="Categorias do catálogo" className="mt-8 flex flex-wrap gap-2 border-t border-zinc-200 pt-5">
            {catalogGroups.map((group) => <a key={group.id} href={`#${group.id}`} className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-700 transition hover:border-blue-500 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">{group.eyebrow}</a>)}
          </nav>
        </div>
      </section>

      {catalogGroups.map((group, index) => (
        <section
          key={group.id}
          id={group.id}
          className={`scroll-mt-24 border-b border-zinc-200 px-6 py-10 ${
            index % 2 === 0 ? "bg-[#F6F8FB]" : "bg-white"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
                {group.icon}
              </span>
              <SectionHeader
                eyebrow={group.eyebrow}
                title={group.title}
                description={group.description}
              />
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {devicesOf(group).map((device) => (
                <DeviceCard key={device.slug} device={device} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-green-200 bg-green-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-green-800">
            Aquisição e loja social
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            Nesta etapa o DAVI não realiza pagamentos reais. Projetos abertos
            podem ser baixados e reproduzidos gratuitamente; dispositivos sob
            demanda são tratados diretamente com a oficina maker, priorizando
            escolas, famílias e instituições parceiras.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/tecnologias-assistivas/oficina-maker">Falar com a DAVI Maker</LinkButton>
            <LinkButton href="/loja-social" variant="secondary">
              Conhecer a Loja Social
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

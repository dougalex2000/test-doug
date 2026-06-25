import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Breadcrumb,
  Illustration,
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
        title="Dispositivos pensados para cada forma de acesso"
        description="Acionadores, sensores, suportes, pranchas e kits — todos com indicação de uso, tipo de acesso, dificuldade de montagem e custo estimado. Projetos abertos podem ser reproduzidos livremente; os demais são adaptados sob demanda pela oficina maker."
        actions={
          <>
            <LinkButton href="/tecnologias-assistivas/oficina-maker">Solicitar adaptação</LinkButton>
            <LinkButton href="/galeria" variant="secondary">
              Explorar com filtros na Galeria
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Como o catálogo funciona"
              title="Do movimento da pessoa ao dispositivo certo"
              description="O catálogo não é uma vitrine genérica: cada dispositivo indica para quem é, qual movimento utiliza e o que pode ser personalizado."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
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
          </div>
          <Illustration
            name="catalogo-dispositivos"
            alt="Conjunto de dispositivos de tecnologia assistiva: acionador grande, webcam em suporte, prancha de comunicação, sensor de sopro e teclado ampliado"
            className="min-h-[320px]"
          />
        </div>
      </section>

      {catalogGroups.map((group, index) => (
        <section
          key={group.id}
          id={group.id}
          className={`scroll-mt-24 border-b border-zinc-200 px-6 py-16 ${
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
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
            <LinkButton href="/tecnologias-assistivas/oficina-maker">Falar com a Oficina Maker</LinkButton>
            <LinkButton href="/loja-social" variant="secondary">
              Conhecer a Loja Social
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

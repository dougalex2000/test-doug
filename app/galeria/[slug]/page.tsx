import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  LinkButton,
  MediaPlaceholder,
  PageHero,
  PageShell,
  SectionHeader,
} from "../../components/SiteShell";
import { DeviceStatusBadge } from "../../components/DeviceCard";
import { assistiveDevices, getDeviceBySlug } from "../../lib/devices";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return assistiveDevices.map((device) => ({ slug: device.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const device = getDeviceBySlug(slug);
  if (!device) {
    return { title: "Dispositivo não encontrado" };
  }
  return {
    title: `${device.name} — Galeria de Tecnologias Assistivas`,
    description: device.shortDescription,
  };
}

const openProjectFiles = [
  { icon: "🧊", label: "Arquivos STL para impressão 3D" },
  { icon: "📋", label: "Lista de materiais (BOM)" },
  { icon: "🔌", label: "Esquema eletrônico" },
  { icon: "💻", label: "Código-fonte" },
  { icon: "📖", label: "Manual de montagem" },
  { icon: "📘", label: "Manual de uso" },
  { icon: "🎬", label: "Vídeo demonstrativo" },
];

export default async function DeviceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const device = getDeviceBySlug(slug);

  if (!device) {
    notFound();
  }

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Tecnologias Assistivas" },
          { label: "Galeria", href: "/galeria" },
          { label: device.name },
        ]}
      />
      <PageHero
        eyebrow={device.categories.join(" · ")}
        title={device.name}
        description={device.longDescription ?? device.shortDescription}
        actions={
          <>
            <LinkButton href="#solicitar">Solicitar adaptação</LinkButton>
            <LinkButton href="#projeto-aberto" variant="secondary">
              Projeto aberto
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <MediaPlaceholder
            icon="📷"
            label={`Fotos e renders de ${device.name} serão adicionados aqui`}
            imageName={`dispositivo-${device.slug}.jpg`}
            tone="zinc"
            minHeight="min-h-[360px]"
          />
          <div>
            <SectionHeader eyebrow="Ficha técnica" title="Informações do dispositivo" />
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <dt className="text-sm font-black uppercase tracking-wide text-blue-700">
                  Status
                </dt>
                <dd className="mt-2">
                  <DeviceStatusBadge status={device.status} />
                </dd>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <dt className="text-sm font-black uppercase tracking-wide text-blue-700">
                  Tipo de acesso
                </dt>
                <dd className="mt-2 font-bold text-zinc-900">{device.accessType}</dd>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <dt className="text-sm font-black uppercase tracking-wide text-blue-700">
                  Dificuldade de montagem
                </dt>
                <dd className="mt-2 font-bold text-zinc-900">
                  {device.assemblyDifficulty}
                </dd>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <dt className="text-sm font-black uppercase tracking-wide text-blue-700">
                  Custo estimado
                </dt>
                <dd className="mt-2 font-bold text-zinc-900">{device.estimatedCost}</dd>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 sm:col-span-2">
                <dt className="text-sm font-black uppercase tracking-wide text-blue-700">
                  Para quem é indicado
                </dt>
                <dd className="mt-2 leading-7 text-zinc-800">{device.indicatedFor}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {device.materials ? (
        <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Materiais" title="Lista de materiais" />
              <ul className="mt-6 space-y-2 text-base leading-7 text-zinc-800">
                {device.materials.map((material) => (
                  <li key={material} className="rounded-lg border border-zinc-200 bg-white p-3 font-semibold">
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid content-start gap-10">
              {device.safetyNotes ? (
                <div>
                  <SectionHeader eyebrow="Segurança" title="Recomendações de segurança" />
                  <ul className="mt-6 space-y-2 text-base leading-7 text-zinc-800">
                    {device.safetyNotes.map((note) => (
                      <li
                        key={note}
                        className="rounded-lg border border-amber-200 bg-amber-50 p-3 font-semibold"
                      >
                        ⚠️ {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {device.customizationOptions ? (
                <div>
                  <SectionHeader eyebrow="Personalização" title="Opções de personalização" />
                  <ul className="mt-6 space-y-2 text-base leading-7 text-zinc-800">
                    {device.customizationOptions.map((option) => (
                      <li
                        key={option}
                        className="rounded-lg border border-blue-200 bg-blue-50 p-3 font-semibold"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="border-b border-zinc-200 bg-white px-6 py-16 scroll-mt-24"
        id="projeto-aberto"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Projeto aberto"
            title="Arquivos para fabricação"
            description="A documentação completa deste dispositivo está sendo preparada pela oficina maker. Quando publicada, estes arquivos ficarão disponíveis para download gratuito."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {openProjectFiles.map((file) => (
              <li
                key={file.label}
                className="flex items-center gap-3 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4"
              >
                <span aria-hidden="true" className="text-2xl">
                  {file.icon}
                </span>
                <div>
                  <p className="text-sm font-black text-zinc-800">{file.label}</p>
                  <p className="text-xs font-bold text-zinc-500">Em preparação</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#F6F8FB] px-6 py-16 scroll-mt-24" id="solicitar">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8">
            <p className="text-sm font-black uppercase tracking-wide text-blue-800">
              Solicitar adaptação
            </p>
            <p className="mt-3 text-base leading-7 text-zinc-800">
              Precisa deste dispositivo com outro tamanho, sensibilidade ou
              forma de fixação? A oficina maker poderá adaptá-lo ao seu caso.
              O formulário de solicitação está em preparação — por enquanto,
              fale conosco pelo contato.
            </p>
            <div className="mt-6">
              <LinkButton href="/contato">Entrar em contato</LinkButton>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <p className="text-sm font-black uppercase tracking-wide text-zinc-600">
              Comprar pronto — em breve
            </p>
            <p className="mt-3 text-base leading-7 text-zinc-700">
              A futura loja social oferecerá este dispositivo montado, a preço
              de custo. Nesta etapa não há pagamento real: a estrutura está
              sendo preparada.
            </p>
            <div className="mt-6">
              <LinkButton href="/loja-social" variant="secondary">
                Sobre a Loja Social
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

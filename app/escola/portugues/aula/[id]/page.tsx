import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb, PageShell } from "../../../../components/SiteShell";
import { AulaPortugues } from "../../../../components/portugues/AulaPortugues";
import { getAula, getProxima, todasAsAulasIds } from "../../../../lib/portugues";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return todasAsAulasIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const aula = getAula(id);
  return {
    title: aula ? `${aula.titulo} — DAVI Escola Português` : "Aula — DAVI Escola",
    description: aula?.subtitulo,
  };
}

export default async function AulaPage({ params }: PageProps) {
  const { id } = await params;
  const aula = getAula(id);
  if (!aula) notFound();

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "DAVI Escola", href: "/escola" },
          { label: "Português", href: "/escola/portugues" },
          { label: aula.titulo },
        ]}
      />
      <AulaPortugues aula={aula} proximaId={getProxima(id)} />
    </PageShell>
  );
}

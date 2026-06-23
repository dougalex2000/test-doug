import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb, PageShell } from "../../../../components/SiteShell";
import { AulaMatematica } from "../../../../components/matematica/AulaMatematica";
import { getAulaMat, getProximaMat, todasAsAulasMatIds } from "../../../../lib/matematica";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return todasAsAulasMatIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const aula = getAulaMat(id);
  return {
    title: aula ? `${aula.titulo} — DAVI Escola Matemática` : "Aula — DAVI Escola",
    description: aula?.subtitulo,
  };
}

export default async function AulaMatPage({ params }: PageProps) {
  const { id } = await params;
  const aula = getAulaMat(id);
  if (!aula) notFound();

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "DAVI Escola", href: "/escola" },
          { label: "Matemática", href: "/escola/matematica" },
          { label: aula.titulo },
        ]}
      />
      <AulaMatematica aula={aula} proximaId={getProximaMat(id)} />
    </PageShell>
  );
}

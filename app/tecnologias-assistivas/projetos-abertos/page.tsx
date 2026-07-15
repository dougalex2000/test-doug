import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Projetos Abertos — Tecnologias Assistivas",
  description: "Arquivos livres para reproduzir tecnologias assistivas.",
};

export default function ProjetosAbertosPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Tecnologias Assistivas", href: "/tecnologias-assistivas" }, { label: "Projetos Abertos" }]}
      eyebrow="Projetos Abertos"
      title="Soluções livres para reproduzir"
      subtitle="Arquivos, esquemas e manuais publicados para que outras pessoas possam fabricar as soluções."
      actions={<LinkButton href="/tecnologias-assistivas/dispositivos">Ver dispositivos</LinkButton>}
      sections={[
        {
          eyebrow: "O que é um projeto aberto",
          title: "Conhecimento que circula",
          paragraphs: [
            "Cada solução criada ou adaptada na oficina maker pode virar projeto aberto: arquivos 3D (STL), esquemas eletrônicos, listas de materiais e manuais de montagem, publicados para reprodução livre.",
          ],
          bullets: [
            "Arquivos 3D (STL) para impressão",
            "Esquemas eletrônicos e firmware",
            "Lista de materiais e custo estimado",
            "Manual de montagem passo a passo",
            "Cuidados de segurança",
          ],
        },
      ]}
      note={
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-teal-200 bg-teal-50 p-6">
          <p className="max-w-2xl text-base font-bold leading-7 text-teal-900">
            Quer ajudar a desenvolver, pesquisar, testar ou documentar estas soluções? Conheça o
            DAVI Integra.
          </p>
          <LinkButton href="/integra">Participar pelo DAVI Integra →</LinkButton>
        </div>
      }
    />
  );
}

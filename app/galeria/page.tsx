import type { Metadata } from "next";
import {
  Breadcrumb,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";
import { GalleryExplorer } from "../components/GalleryExplorer";

export const metadata: Metadata = {
  title: "Galeria de Tecnologias Assistivas",
  description:
    "Catálogo de dispositivos assistivos do DAVI: acionadores, sensores, suportes, pranchas de comunicação, kits maker e projetos abertos.",
};

export default function GaleriaPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Tecnologias Assistivas" }, { label: "Galeria" }]} />
      <PageHero
        eyebrow="Galeria de Tecnologias Assistivas"
        title="Dispositivos, adaptações e projetos abertos"
        description="Soluções assistivas de baixo custo com indicação de uso, tipo de acesso, dificuldade de montagem e custo estimado. Projetos abertos poderão ser baixados e reproduzidos livremente."
        actions={
          <>
            <LinkButton href="/oficina-maker">Solicitar adaptação</LinkButton>
            <LinkButton href="/metodos-de-acesso" variant="secondary">
              Métodos de Acesso
            </LinkButton>
          </>
        }
      />

      <section
        className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16 scroll-mt-24"
        id="projetos-abertos"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Catálogo"
            title="Dispositivos do ecossistema DAVI"
            description="Use os filtros para encontrar dispositivos por categoria ou status. Cada dispositivo tem uma página de detalhes com materiais, segurança e opções de personalização."
          />
          <div className="mt-10">
            <GalleryExplorer />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-green-200 bg-green-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-green-800">
            Loja social futura
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            A compra de dispositivos prontos fará parte da futura loja social
            do DAVI, sem pagamento real nesta etapa. Enquanto isso, os projetos
            abertos poderão ser baixados gratuitamente e a oficina maker
            atenderá solicitações de adaptação.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/loja-social">Conhecer a Loja Social</LinkButton>
            <LinkButton href="/oficina-maker" variant="secondary">
              Oficina Maker
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

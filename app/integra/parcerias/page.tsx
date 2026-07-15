import type { Metadata } from "next";
import { Breadcrumb, LinkButton, PageHero, PageShell, SectionHeader } from "../../components/SiteShell";
import { PartnerTypeCard, SkillTag } from "../../components/integra/IntegraCards";
import { partnershipKinds, partnerTypes } from "../../lib/integra/data";

export const metadata: Metadata = {
  title: "Parcerias institucionais — DAVI Integra",
  description:
    "Possibilidades de parceria com universidades, escolas, prefeituras, ONGs, empresas e redes de fabricação digital no Projeto DAVI.",
};

export default function ParceriasPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "DAVI Integra", href: "/integra" }, { label: "Parcerias institucionais" }]} />
      <PageHero
        eyebrow="DAVI Integra"
        title="Parcerias institucionais"
        description="O Projeto DAVI cresce em rede. Instituições podem colaborar com pesquisa, desenvolvimento, formação, validação, fabricação, documentação e apoio."
        actions={<LinkButton href="/integra/propor">Propor uma parceria</LinkButton>}
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Quem pode ser parceiro" title="Instituições e organizações" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partnerTypes.map((partner) => (
              <PartnerTypeCard key={partner.title} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Tipos de parceria"
            title="Formas de colaborar institucionalmente"
            description="Cada parceria é desenhada conforme o interesse e a capacidade da instituição."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {partnershipKinds.map((kind) => (
              <li key={kind}>
                <SkillTag>{kind}</SkillTag>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <p className="text-base font-bold leading-7 text-amber-900">
              Nenhuma organização é apresentada como parceira confirmada. As parcerias só serão
              divulgadas quando estiverem documentadas e formalizadas com as instituições.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/integra/propor">Propor uma parceria</LinkButton>
            <LinkButton href="/integra/participar" variant="secondary">
              Manifestar interesse
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

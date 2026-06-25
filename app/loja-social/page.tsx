import type { Metadata } from "next";
import {
  Breadcrumb,
  InfoGrid,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Loja Social (em breve)",
  description:
    "Estrutura futura da loja social do DAVI: dispositivos assistivos prontos a preço de custo, sem pagamento real nesta etapa.",
};

const principles = [
  {
    title: "Preço social",
    description:
      "Dispositivos a preço de custo ou subsidiados, priorizando quem mais precisa.",
  },
  {
    title: "Projetos continuam abertos",
    description:
      "Tudo que for vendido pronto também continuará disponível como projeto aberto gratuito.",
  },
  {
    title: "Produção local",
    description:
      "Fabricação na oficina maker e em parceiros locais, fortalecendo redes de inclusão.",
  },
  {
    title: "Transparência",
    description:
      "Custos de materiais e produção visíveis, sem fins lucrativos ocultos.",
  },
];

export default function LojaSocialPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Tecnologias Assistivas" }, { label: "Loja Social" }]} />
      <PageHero
        eyebrow="Loja Social — Em breve"
        title="Tecnologia assistiva acessível também no preço"
        description="A futura loja social do DAVI oferecerá dispositivos prontos para quem não pode fabricá-los. Nesta etapa, nenhum pagamento real é realizado: a estrutura está sendo preparada."
        actions={
          <>
            <LinkButton href="/galeria">Ver dispositivos na Galeria</LinkButton>
            <LinkButton href="/tecnologias-assistivas/oficina-maker" variant="secondary">
              DAVI Maker
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Princípios da loja"
            title="Social antes de comercial"
            description="A loja existirá para ampliar o acesso, não para gerar lucro. Quem puder fabricar, fabrica de graça com os projetos abertos; quem não puder, compra pronto a preço justo."
          />
          <div className="mt-10">
            <InfoGrid items={principles} columns="lg:grid-cols-4" />
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-amber-200 bg-amber-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-amber-800">
            Importante
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            Nesta etapa do projeto, <strong>não há pagamento real</strong>,
            carrinho de compras ou processamento de pedidos. Os botões
            “Comprar pronto” presentes no site apenas preparam a estrutura
            visual para o futuro. Qualquer página que solicite pagamento em
            nome do DAVI não é legítima.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

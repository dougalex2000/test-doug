import type { Metadata } from "next";
import {
  Breadcrumb,
  InfoGrid,
  LinkButton,
  MediaPlaceholder,
  PageHero,
  PageShell,
  SectionHeader,
} from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Oficina Maker Assistiva",
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

export default function OficinaMakerPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Tecnologias Assistivas" }, { label: "Oficina Maker" }]} />
      <PageHero
        eyebrow="Oficina Maker Assistiva"
        title="Quando a solução não existe, a oficina cria"
        description="Espaço de fabricação digital dedicado a adaptar, criar, testar e documentar tecnologias assistivas de baixo custo — sempre como projetos abertos que outras pessoas podem reproduzir."
        actions={
          <>
            <LinkButton href="/galeria">Ver projetos na Galeria</LinkButton>
            <LinkButton href="/instituicoes" variant="secondary">
              Apoio a Instituições
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <MediaPlaceholder
            icon="🖨️⚙️"
            label="Impressora 3D produzindo peça assistiva na oficina maker"
            imageName="oficina-impressao-3d.jpg"
            tone="green"
            minHeight="min-h-[380px]"
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

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="O que a oficina poderá fazer"
            title="Nove frentes de trabalho"
          />
          <div className="mt-10">
            <InfoGrid items={capabilities} />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-blue-200 bg-blue-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-blue-800">
            Solicitações de adaptação
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            O sistema de solicitações de adaptação e fabricação (maker
            requests) está sendo preparado. Em breve, profissionais, famílias e
            instituições poderão registrar pedidos diretamente pela plataforma.
          </p>
          <div className="mt-6">
            <LinkButton href="/contato" variant="secondary">
              Entrar em contato
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

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
  title: "Área das Famílias",
  description:
    "Orientações do DAVI para famílias e responsáveis: por onde começar, como acompanhar o progresso e como participar das decisões.",
};

const familySteps = [
  {
    title: "1. Conheça a história do DAVI",
    description:
      "O projeto nasceu de uma família e uma escola que não desistiram. Comece pela origem.",
    href: "/origem",
  },
  {
    title: "2. Converse com a escola ou terapeuta",
    description:
      "A avaliação funcional é conduzida por profissionais — a família participa e autoriza cada etapa.",
    href: "/avaliacao",
  },
  {
    title: "3. Experimente os recursos",
    description:
      "Comunicação alternativa, atividades e rastreamento visual podem ser testados gratuitamente.",
    href: "/comunicacao-alternativa",
  },
  {
    title: "4. Explore tecnologias de baixo custo",
    description:
      "Muitos dispositivos custam menos de R$ 100 e têm projeto aberto para fabricação local.",
    href: "/galeria",
  },
  {
    title: "5. Acompanhe o progresso",
    description:
      "Os relatórios mostram a evolução em autonomia, comunicação e aprendizagem ao longo do tempo.",
    href: "/relatorios",
  },
  {
    title: "6. Seus dados, suas regras",
    description:
      "Nada é registrado sem consentimento, e vocês podem apagar dados de calibração a qualquer momento.",
    href: "/seguranca-e-privacidade",
  },
];

export default function FamiliasPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Instituições e Públicos" }, { label: "Famílias" }]} />
      <PageHero
        eyebrow="Área das Famílias"
        title="A família é parte da equipe"
        description="O DAVI foi criado para que pessoas com deficiência ganhem autonomia, comunicação e participação — e para que as famílias acompanhem e participem de cada conquista."
        actions={
          <>
            <LinkButton href="/origem">Conhecer a história</LinkButton>
            <LinkButton href="/galeria" variant="secondary">
              Tecnologias de baixo custo
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Por onde começar"
              title="Um caminho passo a passo"
              description="Cada família chega ao DAVI de um jeito. Este roteiro ajuda a dar os primeiros passos com segurança."
            />
            <div className="mt-10">
              <InfoGrid items={familySteps} columns="lg:grid-cols-2" />
            </div>
          </div>
          <MediaPlaceholder
            icon="👨‍👩‍👧💙"
            label="Família acompanhando criança em atividade com tecnologia assistiva"
            imageName="familia-acessibilidade.jpg"
            tone="amber"
            minHeight="min-h-[420px]"
          />
        </div>
      </section>

      <section className="bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-green-200 bg-green-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-green-800">
            Lembre-se
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            Muitas vezes, a limitação não está na capacidade de aprender, mas
            na falta de ferramentas adequadas de acesso. Se algo no DAVI não
            funcionar para a sua família, conte para nós — é assim que o
            projeto evolui.
          </p>
          <div className="mt-6">
            <LinkButton href="/contato">Falar com o projeto</LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

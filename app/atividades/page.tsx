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
  title: "Atividades Educacionais Assistivas",
  description:
    "Módulos educacionais do DAVI: alfabetização, matemática, língua portuguesa, causa e efeito, comunicação alternativa e atividades personalizadas.",
};

const activityModules = [
  {
    title: "Alfabetização",
    description:
      "Letras, sílabas e palavras com poucos comandos, feedback auditivo e reforço positivo — o módulo que deu origem ao projeto.",
  },
  {
    title: "Matemática",
    description:
      "Números, quantidades, contagem e operações simples adaptadas ao método de acesso do aluno.",
  },
  {
    title: "Língua Portuguesa",
    description:
      "Leitura, vocabulário e construção de frases com apoio visual e sonoro.",
  },
  {
    title: "Causa e efeito",
    description:
      "Jogos onde qualquer acionamento gera resposta imediata — primeiro passo para entender que a ação produz resultado.",
  },
  {
    title: "Comunicação alternativa",
    description:
      "Atividades que ensinam o uso de símbolos, categorias e frases para se expressar no dia a dia.",
  },
  {
    title: "Atividades personalizadas",
    description:
      "Conteúdo criado pelo professor ou terapeuta para os objetivos específicos de cada aluno.",
  },
];

const learningPrinciples = [
  {
    title: "Poucos comandos",
    description:
      "Cada atividade funciona com o conjunto mínimo de ações que o aluno consegue realizar.",
  },
  {
    title: "Feedback imediato",
    description:
      "Sons, cores e animações confirmam cada ação, incluindo reforço positivo a cada acerto.",
  },
  {
    title: "Progresso registrado",
    description:
      "Erros, acertos, tempo de realização e evolução das lições alimentam os relatórios.",
  },
  {
    title: "Ritmo do aluno",
    description:
      "Sem tempo limite rígido: a atividade respeita pausas, fadiga e o ritmo de cada pessoa.",
  },
];

export default function AtividadesPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Recursos" }, { label: "Atividades Assistivas" }]} />
      <PageHero
        eyebrow="Atividades Educacionais Assistivas"
        title="Aprender com a ferramenta certa muda tudo"
        description="Módulos educacionais adaptados a diferentes métodos de acesso, com feedback auditivo, reforço positivo e registro de progresso — exatamente como na história que deu origem ao DAVI."
        actions={
          <>
            <LinkButton href="/origem">A história que inspirou</LinkButton>
            <LinkButton href="/avaliacao" variant="secondary">
              Avaliação Funcional
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Módulos educacionais"
            title="Áreas de aprendizagem em desenvolvimento"
            description="Cada módulo será acessível por olhar, toque, acionadores, varredura e os demais métodos de acesso do DAVI."
          />
          <div className="mt-10">
            <InfoGrid items={activityModules} />
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Princípios pedagógicos"
              title="Como as atividades são desenhadas"
            />
            <div className="mt-10">
              <InfoGrid items={learningPrinciples} columns="lg:grid-cols-2" />
            </div>
          </div>
          <MediaPlaceholder
            icon="📚🎮"
            label="Aluno realizando atividade educacional adaptada com professor acompanhando"
            imageName="atividade-educacional.jpg"
            tone="green"
            minHeight="min-h-[380px]"
          />
        </div>
      </section>
    </PageShell>
  );
}

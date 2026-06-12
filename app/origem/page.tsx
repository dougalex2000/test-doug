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
  title: "Origem do Projeto DAVI",
  description:
    "A história real do aluno Davi, de Valinhos-SP, que deu origem ao ecossistema de tecnologia assistiva DAVI.",
};

const evolutionMilestones = [
  {
    title: "Observação inicial",
    description:
      "Davi conseguia pressionar, com esforço, algumas teclas do teclado — como F1, F2, F3 e F4. Essa pequena janela de acesso mudou tudo.",
  },
  {
    title: "Ferramenta adaptada",
    description:
      "Foi criada uma ferramenta computacional educacional para alfabetização usando poucos comandos, respeitando a forma possível de acesso de Davi.",
  },
  {
    title: "Feedback e motivação",
    description:
      "Atividades educativas com controle por teclas, feedback auditivo e reforço positivo com som de aplausos a cada conquista.",
  },
  {
    title: "Registro de progresso",
    description:
      "O sistema registrava erros, acertos, tempo de realização e o progresso das lições, apoiando o acompanhamento pedagógico.",
  },
  {
    title: "Autonomia crescente",
    description:
      "No início Davi usava apenas um dedo. Depois passou a usar dois dedos com mais rapidez e começou a recusar a ajuda constante da assistente.",
  },
  {
    title: "Participação social",
    description:
      "O sistema promoveu autonomia, confiança, participação social e aprendizagem — e mostrou um caminho que podia ser ampliado para muitas outras pessoas.",
  },
];

export default function OrigemPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "O Projeto" }, { label: "Origem do DAVI" }]} />
      <PageHero
        eyebrow="Origem do Projeto DAVI"
        title="Tudo começou com um aluno chamado Davi"
        description="Uma experiência real de educação inclusiva em Valinhos-SP que se transformou em um ecossistema de tecnologia assistiva."
        actions={
          <>
            <LinkButton href="/plataforma">Conhecer a Plataforma</LinkButton>
            <LinkButton href="/rastreamento" variant="secondary">
              Testar o Rastreamento Visual
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="A história"
              title="Da sala de aula ao desenvolvimento assistivo"
            />
            <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                O Projeto DAVI nasceu de uma experiência real com um aluno
                chamado Davi, de 9 anos, matriculado no 4º ano do Ensino
                Fundamental em Valinhos-SP. Apesar de estar nessa série, ele
                ainda não sabia ler nem escrever — principalmente por causa de
                limitações motoras severas que dificultavam o uso de lápis e
                papel.
              </p>
              <p>
                A professora <strong>Alessandra del Castillo</strong> teve papel
                fundamental no acompanhamento pedagógico. Durante a observação
                inicial, percebeu-se que Davi conseguia pressionar algumas
                teclas do teclado, como F1, F2, F3 e F4, mesmo com esforço.
              </p>
              <p>
                A partir dessa descoberta, foi criada uma ferramenta
                computacional educacional adaptada para alfabetização, usando
                poucos comandos. O que parecia uma limitação virou um ponto de
                partida.
              </p>
            </div>
          </div>
          <MediaPlaceholder
            icon="⌨️✋"
            label="Criança pressionando teclas adaptadas do teclado com apoio da professora"
            imageName="origem-teclado-adaptado.jpg"
            tone="blue"
            minHeight="min-h-[400px]"
          />
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="A evolução de Davi"
            title="Pequenas conquistas, grandes transformações"
            description="O sistema usava atividades educativas, controle por teclas, feedback auditivo, reforço positivo e registro de progresso. Com o tempo, os resultados apareceram."
          />
          <div className="mt-10">
            <InfoGrid items={evolutionMilestones} />
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-black uppercase tracking-wide text-green-300">
            A ideia central
          </p>
          <blockquote className="mx-auto mt-6 max-w-4xl text-3xl font-black leading-snug sm:text-4xl">
            “Muitas vezes, a limitação não está na capacidade de aprender, mas
            na falta de ferramentas adequadas de acesso.”
          </blockquote>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-300">
            Essa percepção transformou uma solução individual em um projeto
            maior: criar um ecossistema capaz de avaliar, adaptar e construir
            ferramentas de acesso para muitas outras pessoas.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LinkButton href="/plataforma">O que o DAVI se tornou</LinkButton>
            <LinkButton href="/impacto" variant="secondary">
              Impacto Social
            </LinkButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

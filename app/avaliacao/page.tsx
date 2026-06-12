import type { Metadata } from "next";
import {
  Breadcrumb,
  InfoGrid,
  LinkButton,
  PageHero,
  PageShell,
  SectionHeader,
  TagList,
} from "../components/SiteShell";
import { EvaluationForm } from "../components/EvaluationForm";

export const metadata: Metadata = {
  title: "Avaliação Funcional Assistiva",
  description:
    "Avaliação funcional do DAVI: movimentos preservados, comunicação, atenção, compreensão, fadiga e testes de métodos de acesso.",
};

const evaluationDimensions = [
  {
    title: "Identificação",
    description:
      "Dados do usuário, idade, escola ou instituição e profissional responsável pela avaliação.",
  },
  {
    title: "Perfil motor",
    description:
      "Limitações motoras, movimentos preservados, uso de mãos e dedos, controle de cabeça e capacidade de sopro.",
  },
  {
    title: "Comunicação atual",
    description:
      "Como a pessoa se comunica hoje: fala, gestos, expressões, vocalizações ou apoio de terceiros.",
  },
  {
    title: "Perfil cognitivo-atencional",
    description:
      "Atenção, compreensão de instruções e sinais de fadiga durante as atividades.",
  },
  {
    title: "Controle do olhar",
    description:
      "Capacidade de fixar e mover o olhar entre alvos, base para o rastreamento visual assistivo.",
  },
  {
    title: "Testes de método de acesso",
    description:
      "Experimentação prática de cada método — olhar, toque, acionador, sopro, joystick — com registro de desempenho e observações.",
  },
];

const evaluationOutputs = [
  "Método de acesso recomendado",
  "Dispositivos assistivos sugeridos",
  "Configurações personalizadas (tempo de permanência, sensibilidade)",
  "Atividades educacionais indicadas",
  "Plano de acompanhamento",
  "Observações do profissional",
];

export default function AvaliacaoPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Avaliação" }, { label: "Avaliação Funcional" }]} />
      <PageHero
        eyebrow="Avaliação Funcional Assistiva"
        title="Entender a pessoa antes de escolher a tecnologia"
        description="A avaliação funcional observa movimentos preservados, comunicação, atenção e fadiga para encontrar o método de acesso e as ferramentas certas para cada pessoa."
        actions={
          <>
            <LinkButton href="/metodos-de-acesso">Métodos de Acesso</LinkButton>
            <LinkButton href="/relatorios" variant="secondary">
              Relatórios Inteligentes
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Dimensões avaliadas"
            title="Uma visão completa, centrada na pessoa"
            description="A avaliação combina observação estruturada com testes práticos de métodos de acesso, sempre conduzida por profissional qualificado."
          />
          <div className="mt-10">
            <InfoGrid items={evaluationDimensions} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Resultados"
            title="O que a avaliação gera"
            description="Cada avaliação produz recomendações práticas que alimentam os demais módulos do ecossistema."
          />
          <div className="content-start">
            <TagList items={evaluationOutputs} />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16 scroll-mt-24" id="formulario">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Formulário de avaliação"
            title="Estrutura inicial do protocolo digital"
            description="Versão de demonstração do formulário que será conectado ao banco de dados seguro. Preencha e gere um resumo estruturado da avaliação."
          />
          <div className="mt-10">
            <EvaluationForm />
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-blue-200 bg-blue-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-blue-800">
            Limites éticos
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            A avaliação apoiará — e nunca substituirá — o julgamento de
            profissionais qualificados. O DAVI não realiza diagnóstico clínico
            automatizado, e o armazenamento exigirá consentimento registrado.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

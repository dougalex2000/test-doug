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
  title: "Captura Visual Assistiva — Base Visual DAVI",
  description:
    "Protocolo físico de captura visual: webcam adequada, iluminação frontal difusa, suporte regulável, distância padronizada e orientação de postura.",
};

const setupItems = [
  {
    title: "Webcam adequada",
    description:
      "Câmera com boa resolução e taxa de quadros estável (30 FPS ou mais), posicionada na altura dos olhos do usuário.",
  },
  {
    title: "Iluminação frontal difusa",
    description:
      "Luz suave vinda da frente do rosto, sem sombras fortes nem contraluz de janelas, para que os olhos fiquem sempre visíveis.",
  },
  {
    title: "Suporte regulável",
    description:
      "Suporte que permite ajustar altura, ângulo e inclinação da câmera para diferentes usuários, cadeiras e mobiliários.",
  },
  {
    title: "Distância padronizada",
    description:
      "Distância constante entre o rosto e a tela (em geral 50 a 70 cm), registrada no protocolo para repetir nas próximas sessões.",
  },
  {
    title: "Orientação de postura",
    description:
      "Posicionamento confortável e estável do tronco e da cabeça, com apoios quando necessário, reduzindo fadiga durante o uso.",
  },
  {
    title: "Cuidado com óculos",
    description:
      "Reflexos nas lentes atrapalham a detecção dos olhos. Ajustar o ângulo da luz e, se possível, usar lentes com tratamento antirreflexo.",
  },
];

export default function CapturaVisualPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Recursos" }, { label: "Captura Visual Assistiva" }]} />
      <PageHero
        eyebrow="Módulo de Captura Visual Assistiva"
        title="Base Visual DAVI: o ambiente físico do rastreamento"
        description="A qualidade do rastreamento visual começa antes do software: câmera, luz, distância e postura padronizadas formam o protocolo físico de uso do DAVI."
        actions={
          <>
            <LinkButton href="/rastreamento-visual">Como funciona o rastreamento</LinkButton>
            <LinkButton href="/galeria" variant="secondary">
              Ver dispositivos de apoio
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <MediaPlaceholder
            icon="📷💡"
            label="Base Visual DAVI: suporte de webcam com iluminação difusa e marcação de distância"
            imageName="base-visual-davi.jpg"
            tone="green"
            minHeight="min-h-[380px]"
          />
          <div>
            <SectionHeader
              eyebrow="Base Visual DAVI"
              title="Um ambiente padronizado e replicável"
              description="A Base Visual DAVI é uma estrutura física de baixo custo que integra suporte de webcam, iluminação frontal difusa e referência de distância. Ela padroniza a captura para que a calibração funcione de forma consistente em escolas, clínicas e residências."
            />
            <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <p className="text-sm font-black uppercase tracking-wide text-blue-800">
                Protocolo físico de uso
              </p>
              <ol className="mt-3 space-y-2 text-base leading-7 text-zinc-800">
                <li>1. Posicionar o usuário com postura confortável e estável.</li>
                <li>2. Ajustar a câmera na altura dos olhos.</li>
                <li>3. Conferir a iluminação frontal e eliminar reflexos.</li>
                <li>4. Medir e registrar a distância até a tela.</li>
                <li>5. Executar a calibração de 9 pontos.</li>
                <li>6. Registrar observações da sessão.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Checklist do ambiente"
            title="O que faz diferença na captura"
            description="Itens simples que aumentam muito a qualidade dos dados e o conforto do usuário."
          />
          <div className="mt-10">
            <InfoGrid items={setupItems} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

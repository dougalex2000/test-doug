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
  title: "Rastreamento Visual Assistivo",
  description:
    "Seleção por olhar com webcam de baixo custo: calibração de 9 pontos, classificação por zonas, suavização temporal e seleção por permanência.",
};

const pipelineSteps = [
  {
    title: "1. Webcam e seleção de câmera",
    description:
      "Uso de webcam comum, com escolha da câmera quando houver mais de uma disponível.",
  },
  {
    title: "2. Calibração de 9 pontos",
    description:
      "O usuário olha para 9 pontos da tela, cerca de 3 segundos por ponto, com captura de múltiplos frames (até 90 por ponto em câmeras de 30 FPS).",
  },
  {
    title: "3. Validação de qualidade",
    description:
      "Frames ruins — desfocados, sem rosto detectado ou com olhos fechados — são descartados automaticamente.",
  },
  {
    title: "4. Extração de características",
    description:
      "Características dos olhos, íris, face e posição da cabeça são extraídas como dados numéricos. Nenhuma foto da face é salva por padrão.",
  },
  {
    title: "5. Aprendizado local",
    description:
      "Um modelo de aprendizado de máquina é treinado localmente para cada usuário, classificando o olhar por zonas da tela.",
  },
  {
    title: "6. Suavização temporal",
    description:
      "As estimativas são suavizadas ao longo do tempo para reduzir tremores e saltos do cursor.",
  },
  {
    title: "7. Seleção por permanência",
    description:
      "O usuário seleciona mantendo o olhar sobre uma zona por um tempo configurável (dwell).",
  },
  {
    title: "8. Confirmação assistiva",
    description:
      "A seleção pode ser confirmada por botão, sopro ou outro método assistivo, combinando olhar e acionamento físico.",
  },
];

export default function RastreamentoVisualPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Recursos" }, { label: "Rastreamento Visual" }]} />
      <PageHero
        eyebrow="Rastreamento Visual Assistivo"
        title="Interação pelo olhar com equipamentos de baixo custo"
        description="Solução assistiva para seleção por zonas da tela usando webcam comum, calibração personalizada e aprendizado de máquina local."
        actions={
          <>
            <LinkButton href="/rastreamento">Testar a demonstração</LinkButton>
            <LinkButton href="/captura-visual" variant="secondary">
              Captura Visual Assistiva
            </LinkButton>
          </>
        }
      />

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Transparência"
              title="O que o rastreamento visual do DAVI é — e o que não é"
            />
            <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                O DAVI <strong>não promete</strong> a precisão de um eye
                tracker profissional. A proposta é diferente: oferecer uma{" "}
                <strong>solução assistiva de baixo custo</strong> para seleção
                por zonas da tela e interação acessível, usando apenas uma
                webcam comum.
              </p>
              <p>
                Para muitas pessoas, escolher entre 4, 6 ou 9 zonas da tela com
                o olhar já significa comunicar, aprender e participar. É essa
                porta de acesso que o módulo abre.
              </p>
            </div>
          </div>
          <MediaPlaceholder
            icon="👁️🎯"
            label="Tela com zonas de seleção destacadas e indicador do olhar do usuário"
            imageName="rastreamento-zonas.jpg"
            tone="blue"
            minHeight="min-h-[360px]"
          />
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Como funciona"
            title="Da câmera à seleção: o caminho do olhar"
            description="Evolução planejada do módulo, mantendo o protótipo atual funcionando durante todo o desenvolvimento."
          />
          <div className="mt-10">
            <InfoGrid items={pipelineSteps} columns="lg:grid-cols-4" />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
            <p className="text-sm font-black uppercase tracking-wide text-green-800">
              Privacidade em primeiro lugar
            </p>
            <ul className="mt-4 grid gap-3 text-base leading-7 text-zinc-800 sm:grid-cols-2">
              <li>• O processamento da câmera acontece localmente, no navegador.</li>
              <li>• Nenhuma foto da face é salva por padrão.</li>
              <li>• A calibração gera apenas dados numéricos.</li>
              <li>• O usuário poderá apagar seus dados de calibração a qualquer momento.</li>
            </ul>
            <div className="mt-6">
              <LinkButton href="/seguranca-e-privacidade" variant="secondary">
                Política de Segurança e Privacidade
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

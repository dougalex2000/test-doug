import type { Metadata } from "next";
import {
  Breadcrumb,
  InfoGrid,
  LinkButton,
  MediaPlaceholder,
  PageHero,
  PageShell,
  SectionHeader,
  TagList,
} from "../components/SiteShell";
import { CommunicationBoard } from "../components/CommunicationBoard";

export const metadata: Metadata = {
  title: "Comunicação Alternativa e Aumentativa",
  description:
    "Recursos de comunicação alternativa do DAVI: respostas simples, frases rápidas, categorias, botões grandes, áudio, varredura e seleção por permanência.",
};

const quickAnswers = ["Sim", "Não", "Talvez", "Quero", "Não quero"];

const quickPhrases = [
  "Estou com dor",
  "Quero água",
  "Quero descansar",
  "Preciso de ajuda",
];

const categories = [
  "Necessidades",
  "Emoções",
  "Escola",
  "Família",
  "Alimentação",
  "Saúde",
];

const accessModes = [
  {
    title: "Botões grandes com ícones",
    description:
      "Alvos amplos, com imagem e texto, fáceis de tocar ou selecionar com qualquer método de acesso.",
  },
  {
    title: "Retorno por áudio",
    description:
      "Cada seleção é falada em voz alta, permitindo que o usuário se comunique com quem está ao redor.",
  },
  {
    title: "Varredura automática",
    description:
      "As opções são destacadas uma a uma; o usuário seleciona com um único acionador no momento certo.",
  },
  {
    title: "Seleção por permanência",
    description:
      "Manter o olhar ou o cursor sobre uma opção por alguns segundos seleciona sem precisar clicar.",
  },
  {
    title: "Múltiplos métodos de entrada",
    description:
      "Preparado para uso futuro com olhar, botão, sopro, toque, varredura e joystick.",
  },
  {
    title: "Integração com perfis",
    description:
      "No futuro, pranchas e frases serão personalizadas por usuário, com vocabulário próprio.",
  },
];

export default function ComunicacaoAlternativaPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "Recursos" }, { label: "Comunicação Alternativa" }]} />
      <PageHero
        eyebrow="Comunicação Alternativa e Aumentativa"
        title="Toda pessoa tem o direito de se comunicar"
        description="O módulo de comunicação alternativa do DAVI oferece respostas simples, frases rápidas e categorias do dia a dia, acessíveis por botões grandes, áudio e diferentes métodos de seleção."
        actions={
          <>
            <LinkButton href="#prancha">Usar a prancha agora</LinkButton>
            <LinkButton href="/metodos-de-acesso" variant="secondary">
              Métodos de Acesso
            </LinkButton>
          </>
        }
      />

      <section
        className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16 scroll-mt-24"
        id="prancha"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Experimente agora"
            title="Prancha de comunicação interativa"
            description="Versão inicial funcional: botões grandes com ícones, retorno por áudio em português, varredura automática e seleção por permanência. Funciona por clique, toque ou teclado."
          />
          <div className="mt-10">
            <CommunicationBoard />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Vocabulário inicial"
              title="Respostas simples e frases rápidas"
              description="O vocabulário começa pelo essencial: expressar vontade, desconforto e necessidades imediatas."
            />
            <div className="mt-8">
              <p className="text-sm font-black uppercase tracking-wide text-blue-700">
                Respostas simples
              </p>
              <div className="mt-3">
                <TagList items={quickAnswers} />
              </div>
              <p className="mt-6 text-sm font-black uppercase tracking-wide text-blue-700">
                Frases rápidas
              </p>
              <div className="mt-3">
                <TagList items={quickPhrases} />
              </div>
              <p className="mt-6 text-sm font-black uppercase tracking-wide text-blue-700">
                Categorias
              </p>
              <div className="mt-3">
                <TagList items={categories} />
              </div>
            </div>
          </div>
          <MediaPlaceholder
            icon="🗣️💬"
            label="Prancha digital de comunicação com símbolos grandes e categorias coloridas"
            imageName="prancha-comunicacao.jpg"
            tone="amber"
            minHeight="min-h-[380px]"
          />
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Acessibilidade da interface"
            title="Feita para diferentes formas de acesso"
            description="A interface de comunicação foi planejada para funcionar com o método de acesso de cada pessoa — do toque ao olhar."
          />
          <div className="mt-10">
            <InfoGrid items={accessModes} />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-blue-200 bg-blue-50 p-8">
          <p className="text-sm font-black uppercase tracking-wide text-blue-800">
            Em evolução
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-zinc-800">
            A prancha interativa acima já funciona com áudio, varredura e
            seleção por permanência. Os próximos passos são pranchas
            configuráveis por usuário, integração com o olhar e acionadores
            físicos, e vocabulário personalizado salvo no perfil. O{" "}
            <a
              href="/modulos/comunicacao-alternativa"
              className="font-bold text-blue-800 underline hover:text-blue-900"
            >
              módulo da plataforma
            </a>{" "}
            continua disponível e será expandido sem perder funcionalidades.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

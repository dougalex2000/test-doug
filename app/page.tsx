import Image from "next/image";
import type { Metadata } from "next";
import {
  InfoGrid,
  LinkButton,
  MediaPlaceholder,
  PageShell,
  SectionHeader,
  TagList,
} from "./components/SiteShell";
import {
  ecosystemItems,
  impactAudiences,
  principles,
} from "./lib/siteContent";
import { assistiveDevices } from "./lib/devices";

export const metadata: Metadata = {
  title: "DAVI — Desenvolvimento Assistivo para Vida Independente",
  description:
    "Plataforma inteligente de tecnologia assistiva para avaliação, aprendizagem, comunicação, recomendação de dispositivos e criação de soluções personalizadas.",
};

const howItWorksSteps = [
  {
    title: "1. Cadastro do usuário",
    description:
      "Registro inicial com dados do aluno ou paciente, instituição e profissional responsável.",
  },
  {
    title: "2. Avaliação funcional",
    description:
      "Observação de movimentos preservados, comunicação, atenção, compreensão e fadiga.",
  },
  {
    title: "3. Teste de métodos de acesso",
    description:
      "Experimentação de olhar, toque, acionadores, sopro, joystick, varredura e combinações.",
  },
  {
    title: "4. Recomendação de tecnologias",
    description:
      "Indicação de dispositivos e adaptações com apoio da inteligência artificial e do profissional.",
  },
  {
    title: "5. Atividades e comunicação",
    description:
      "Uso de módulos educacionais e de comunicação alternativa adaptados ao método de acesso.",
  },
  {
    title: "6. Relatórios inteligentes",
    description:
      "Acompanhamento de evolução, autonomia, engajamento e indicadores por sessão.",
  },
  {
    title: "7. Adaptação em oficina maker",
    description:
      "Criação, impressão 3D e personalização de dispositivos conforme a necessidade real.",
  },
];

const galleryHighlights = assistiveDevices.slice(0, 4);

const caaFeatures = [
  "Respostas simples: sim, não, talvez, quero, não quero",
  "Frases rápidas: estou com dor, quero água, preciso de ajuda",
  "Categorias: necessidades, emoções, escola, família, alimentação, saúde",
  "Botões grandes com ícones e retorno por áudio",
  "Varredura automática e seleção por permanência",
  "Uso futuro com olhar, botão, sopro, toque e joystick",
];

const visualTrackingFeatures = [
  "Webcam comum, sem equipamento caro",
  "Calibração guiada de 9 pontos",
  "Aprendizado personalizado por usuário",
  "Classificação por zonas da tela",
  "Seleção por permanência do olhar",
  "Confirmação por botão, sopro ou outro método assistivo",
];

export default function Home() {
  return (
    <PageShell>
      {/* 1. Hero principal */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="w-fit rounded-lg bg-blue-50 px-4 py-2 text-sm font-black uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
              Ecossistema de tecnologia assistiva
            </p>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
              DAVI — Desenvolvimento Assistivo para Vida Independente
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold leading-8 text-zinc-800">
              Plataforma inteligente de tecnologia assistiva para avaliação,
              aprendizagem, comunicação, recomendação de dispositivos e criação
              de soluções personalizadas.
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-700">
              O DAVI integra software, inteligência artificial, rastreamento
              visual, comunicação alternativa, dispositivos assistivos e
              oficina maker para ampliar autonomia, aprendizagem e participação
              social de pessoas com deficiência.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <LinkButton href="/origem">Conhecer o Projeto</LinkButton>
              <LinkButton href="/galeria" variant="secondary">
                Ver Tecnologias Assistivas
              </LinkButton>
              <LinkButton href="/rastreamento" variant="secondary">
                Acessar Rastreamento Visual
              </LinkButton>
              <LinkButton href="/profissionais" variant="secondary">
                Área do Profissional
              </LinkButton>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl shadow-blue-950/10">
            <div className="bg-white px-6 py-8">
              <Image
                src="/davi-logo.png"
                alt="Projeto DAVI - Desenvolvimento Assistivo para a Vida Independente"
                width={1226}
                height={367}
                priority
                className="mx-auto h-auto w-full max-w-[560px]"
              />
            </div>
            <div className="relative min-h-[240px] overflow-hidden border-t border-zinc-100">
              <Image
                src="/hero.jpg"
                alt="Ambiente de tecnologia assistiva com computador e dispositivo de apoio"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/35 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/30 bg-white/90 p-4 text-zinc-950 shadow-lg backdrop-blur">
                <p className="text-sm font-black text-blue-800">
                  Mais que um site: um ecossistema
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-700">
                  Avaliação, métodos de acesso, comunicação, relatórios e
                  fabricação de soluções em um só lugar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. O que é o DAVI */}
      <section className="border-b border-zinc-200 bg-white px-6 py-16" id="o-que-e">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="O que é o DAVI"
              title="Um ecossistema de tecnologia assistiva"
              description="O DAVI não é apenas um site ou um módulo de rastreamento ocular. É um ecossistema que integra plataforma digital, ambiente físico de avaliação, inteligência artificial, comunicação alternativa e oficina maker."
            />
            <div className="mt-8">
              <LinkButton href="/plataforma">O que é a Plataforma DAVI</LinkButton>
            </div>
          </div>
          <div className="grid content-start gap-3 sm:grid-cols-2">
            {ecosystemItems.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm font-bold leading-6 text-zinc-900"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Origem */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16" id="origem">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Origem do Projeto DAVI"
              title="Uma história real de superação na escola"
            />
            <div className="mt-6 space-y-4 text-lg leading-8 text-zinc-700">
              <p>
                O projeto nasceu do acompanhamento de Davi, um aluno de 9 anos
                do 4º ano do Ensino Fundamental em Valinhos-SP, que ainda não
                lia nem escrevia por causa de limitações motoras severas que
                impediam o uso de lápis e papel.
              </p>
              <p>
                Ao perceber que ele conseguia pressionar algumas teclas do
                teclado, foi criada uma ferramenta educacional adaptada — e os
                resultados em autonomia, confiança e participação mudaram tudo.
              </p>
              <blockquote className="border-l-4 border-blue-700 bg-white p-5 text-base font-bold italic leading-7 text-zinc-800 shadow-sm">
                “Muitas vezes, a limitação não está na capacidade de aprender,
                mas na falta de ferramentas adequadas de acesso.”
              </blockquote>
            </div>
            <div className="mt-8">
              <LinkButton href="/origem">Ler a história completa</LinkButton>
            </div>
          </div>
          <MediaPlaceholder
            icon="🧒💻"
            label="Criança usando computador adaptado na escola, acompanhada pela professora"
            imageName="origem-davi-computador.jpg"
            tone="green"
            minHeight="min-h-[360px]"
          />
        </div>
      </section>

      {/* 4. Como funciona */}
      <section className="border-b border-zinc-200 bg-white px-6 py-16" id="como-funciona">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Como funciona"
            title="Da avaliação à solução personalizada"
            description="Um fluxo contínuo que conecta avaliação funcional, métodos de acesso, atividades, relatórios e fabricação de adaptações."
          />
          <div className="mt-10">
            <InfoGrid items={howItWorksSteps} columns="lg:grid-cols-4" />
          </div>
        </div>
      </section>

      {/* 5. Tecnologia e IA */}
      <section className="border-b border-zinc-800 bg-zinc-950 px-6 py-16 text-white" id="ia">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-green-300">
              Tecnologia e Inteligência Artificial
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              IA como apoio ao profissional, nunca como substituta
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              A inteligência artificial do DAVI apoia a avaliação funcional, a
              personalização de atividades, a calibração do rastreamento
              visual, a recomendação de dispositivos e a geração de relatórios.
              As decisões permanecem sempre com profissionais qualificados.
            </p>
            <div className="mt-8">
              <LinkButton href="/inteligencia-artificial">
                Conhecer a IA do DAVI
              </LinkButton>
            </div>
          </div>
          <div className="grid content-start gap-3 sm:grid-cols-2">
            {[
              "Análise de progresso por sessão",
              "Personalização de atividades",
              "Recomendação de dispositivos assistivos",
              "Resumos inteligentes para relatórios",
              "Apoio à calibração do olhar",
              "Sugestão de adaptações para a oficina maker",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm font-bold text-zinc-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Rastreamento Visual Assistivo */}
      <section className="border-b border-zinc-200 bg-white px-6 py-16" id="rastreamento-visual">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <MediaPlaceholder
            icon="👁️🖥️"
            label="Pessoa interagindo com a tela por rastreamento visual com webcam"
            imageName="rastreamento-visual.jpg"
            tone="blue"
            minHeight="min-h-[320px]"
          />
          <div>
            <SectionHeader
              eyebrow="Rastreamento Visual Assistivo"
              title="Seleção por olhar com webcam de baixo custo"
              description="Solução assistiva para seleção por zonas da tela, com calibração personalizada. Não promete a precisão de um eye tracker profissional: o foco é interação acessível e de baixo custo."
            />
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {visualTrackingFeatures.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm font-bold text-zinc-900"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href="/rastreamento">Testar a demonstração</LinkButton>
              <LinkButton href="/rastreamento-visual" variant="secondary">
                Como funciona
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Comunicação Alternativa */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16" id="comunicacao">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Comunicação Alternativa"
              title="Dar voz a quem se comunica de outras formas"
              description="Recursos de comunicação aumentativa e alternativa com botões grandes, símbolos, frases rápidas e retorno por áudio, acessíveis por diferentes métodos."
            />
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {caaFeatures.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-zinc-200 bg-white p-3 text-sm font-bold leading-6 text-zinc-900"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-7">
              <LinkButton href="/comunicacao-alternativa">
                Conhecer a Comunicação Alternativa
              </LinkButton>
            </div>
          </div>
          <MediaPlaceholder
            icon="💬🖐️"
            label="Prancha de comunicação alternativa com símbolos e botões grandes"
            imageName="comunicacao-alternativa.jpg"
            tone="amber"
            minHeight="min-h-[320px]"
          />
        </div>
      </section>

      {/* 8. Galeria de Tecnologias Assistivas */}
      <section className="border-b border-zinc-200 bg-white px-6 py-16" id="galeria">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Galeria de Tecnologias Assistivas"
            title="Dispositivos, adaptações e projetos abertos"
            description="Catálogo de soluções assistivas com indicação de uso, tipo de acesso, custo estimado e arquivos abertos para fabricação."
          />
          <div className="mt-10">
            <InfoGrid
              columns="lg:grid-cols-4"
              items={galleryHighlights.map((device) => ({
                title: device.name,
                description: device.shortDescription,
                href: "/galeria",
              }))}
            />
          </div>
          <div className="mt-8">
            <LinkButton href="/galeria">Ver galeria completa</LinkButton>
          </div>
        </div>
      </section>

      {/* 9. Oficina Maker */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-16" id="oficina-maker">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <MediaPlaceholder
            icon="🛠️🖨️"
            label="Oficina maker com impressora 3D produzindo peças assistivas"
            imageName="oficina-maker.jpg"
            tone="green"
            minHeight="min-h-[320px]"
          />
          <div>
            <SectionHeader
              eyebrow="Oficina Maker Assistiva"
              title="Quando a solução não existe, ela é criada"
              description="A oficina maker do DAVI adapta dispositivos, cria acionadores, imprime peças em 3D, integra sensores e documenta projetos abertos para que outras pessoas possam reproduzir as soluções."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href="/oficina-maker">Conhecer a Oficina Maker</LinkButton>
              <LinkButton href="/loja-social" variant="secondary">
                Futura Loja Social
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Impacto Social */}
      <section className="border-b border-zinc-200 bg-white px-6 py-16" id="impacto">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Impacto Social"
            title="Para quem o DAVI existe"
            description="O ecossistema foi pensado para apoiar redes inteiras de inclusão: da sala de aula ao centro de reabilitação, da família à prefeitura."
          />
          <div className="content-start">
            <TagList items={impactAudiences} />
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/instituicoes">Para Instituições</LinkButton>
              <LinkButton href="/familias" variant="secondary">
                Para Famílias
              </LinkButton>
              <LinkButton href="/profissionais" variant="secondary">
                Para Profissionais
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Princípios */}
      <section className="px-6 py-16" id="principios">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Princípios"
            title="Bases do desenvolvimento assistivo"
            description="Inclusão, autonomia, acessibilidade, segurança, privacidade, baixo custo, personalização e colaboração guiam cada decisão do projeto."
          />
          <div className="mt-8">
            <TagList items={principles} />
          </div>
          <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-black uppercase tracking-wide text-blue-800">
              Compromisso com a privacidade
            </p>
            <p className="mt-2 max-w-3xl text-base leading-7 text-zinc-800">
              O DAVI não realiza diagnóstico clínico automatizado, não salva
              imagens da face por padrão e processa dados da câmera localmente
              sempre que possível.{" "}
              <a
                href="/seguranca-e-privacidade"
                className="font-bold text-blue-800 underline hover:text-blue-900"
              >
                Conheça nossa política de segurança e privacidade
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

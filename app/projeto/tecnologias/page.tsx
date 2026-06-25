import type { Metadata } from "next";
import {
  Breadcrumb,
  PageHero,
  PageShell,
  SectionHeader,
  TagList,
} from "../../components/SiteShell";
import { FlowSteps } from "../../components/modules";

export const metadata: Metadata = {
  title: "Arquitetura e Tecnologias — Projeto DAVI",
  description:
    "A stack tecnológica do Projeto DAVI: linguagens, frameworks, banco de dados, hospedagem e o fluxo do código ao ar.",
};

/* Onde está hospedado */
const hospedagem = [
  {
    nome: "GitHub",
    papel: "Código-fonte",
    detalhe:
      "Repositório com todo o histórico de versões. O envio (git push) para o ramo principal dispara a publicação.",
    icone: "🐙",
  },
  {
    nome: "Vercel",
    papel: "Hospedagem, build e CDN",
    detalhe:
      "Compila o Next.js e serve o site por uma rede global de entrega (CDN). Publica automaticamente a cada push.",
    icone: "▲",
  },
  {
    nome: "Supabase",
    papel: "Banco de dados, autenticação e tempo real",
    detalhe:
      "PostgreSQL + Auth + Realtime, hospedado na região de São Paulo (sa-east-1).",
    icone: "🗄️",
  },
];

/* Camadas da arquitetura (de cima para baixo) */
const camadas = [
  {
    titulo: "Pessoas e dispositivos",
    cor: "border-emerald-200 bg-emerald-50",
    itens: ["Aluno", "Família", "Professor", "Instituição", "Computador", "Tablet", "Celular"],
  },
  {
    titulo: "Navegador — Frontend e APIs nativas",
    cor: "border-blue-200 bg-blue-50",
    itens: ["Next.js 16", "React 19", "Tailwind CSS 4", "Web Speech (voz)", "Web Bluetooth", "Câmera + MediaPipe", "Sensores de movimento", "Canvas"],
  },
  {
    titulo: "Borda / CDN — Vercel",
    cor: "border-violet-200 bg-violet-50",
    itens: ["Entrega global (CDN)", "Server Components", "Rotas e redirects"],
  },
  {
    titulo: "Serviços e dados",
    cor: "border-amber-200 bg-amber-50",
    itens: ["Supabase PostgreSQL", "Supabase Auth", "Supabase Realtime", "Vercel AI Gateway"],
  },
  {
    titulo: "Infraestrutura e publicação",
    cor: "border-zinc-300 bg-zinc-50",
    itens: ["Git", "GitHub", "Vercel (deploy automático)"],
  },
];

/* Stack completa por categoria */
const stack = [
  { titulo: "Linguagens", itens: ["TypeScript", "JavaScript (JSX/TSX)", "SQL", "HTML", "CSS", "Markdown"] },
  { titulo: "Framework e runtime", itens: ["Next.js 16 (App Router)", "React 19", "React DOM 19", "Node.js 24"] },
  { titulo: "Estilo / UI", itens: ["Tailwind CSS 4", "PostCSS"] },
  { titulo: "Backend, dados e tempo real", itens: ["Supabase", "PostgreSQL", "Supabase Auth", "Supabase Realtime", "@supabase/ssr", "@supabase/supabase-js"] },
  { titulo: "Bibliotecas específicas", itens: ["three.js (3D)", "MediaPipe Tasks Vision", "pdfkit + pdf-lib (PDFs)", "sharp (imagens)", "API do Pexels", "Vercel AI Gateway"] },
  { titulo: "APIs nativas do navegador", itens: ["Web Speech (TTS pt-BR)", "Web Bluetooth (BLE)", "getUserMedia + Web Audio", "DeviceOrientation / DeviceMotion", "Canvas 2D", "Pointer Events", "localStorage", "WebSocket (Realtime)"] },
  { titulo: "Ambiente de desenvolvimento", itens: ["Visual Studio Code", "Windows 11", "Node.js 24", "npm 11", "Terminal (PowerShell / Git Bash)"] },
  { titulo: "Qualidade e ferramentas", itens: ["ESLint 9", "eslint-config-next", "TypeScript (tipos)", "@types/*"] },
  { titulo: "Versionamento, CI/CD e hospedagem", itens: ["Git", "GitHub", "Vercel", "Vercel CLI", "CDN global", "test-doug.vercel.app"] },
];

export default function TecnologiasPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ label: "O Projeto", href: "/projeto" }, { label: "Arquitetura e Tecnologias" }]}
      />
      <PageHero
        eyebrow="Arquitetura e Tecnologias"
        title="Como o Projeto DAVI funciona por dentro"
        description="As tecnologias, linguagens e ferramentas que colocam a plataforma DAVI no ar — e onde cada parte fica hospedada."
      />

      {/* Onde está hospedado */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Onde está hospedado"
            title="Três pilares de infraestrutura"
            description="O código vive no GitHub, a aplicação é publicada pela Vercel e os dados ficam no Supabase."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {hospedagem.map((h) => (
              <div key={h.nome} className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl" aria-hidden="true">
                  {h.icone}
                </span>
                <h3 className="mt-4 text-xl font-black text-zinc-950">{h.nome}</h3>
                <p className="text-sm font-black uppercase tracking-wide text-blue-800">{h.papel}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{h.detalhe}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fluxo: do código ao ar */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Do código ao ar"
            title="O fluxo de publicação (CI/CD)"
            description="Como uma mudança no código chega até o usuário, de forma automática."
          />
          <div className="mt-8 overflow-x-auto">
            <FlowSteps
              steps={[
                "Código (TypeScript + React)",
                "git push → GitHub",
                "Build na Vercel (Next.js)",
                "CDN global",
                "Usuário no navegador",
              ]}
            />
          </div>
          <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-700">
            A cada envio para o repositório, a Vercel compila a aplicação, gera as
            páginas e distribui o resultado por uma rede global de entrega. Em
            cerca de um minuto, a nova versão está publicada em{" "}
            <strong>test-doug.vercel.app</strong> — sem etapas manuais.
          </p>
        </div>
      </section>

      {/* Arquitetura em camadas */}
      <section className="border-b border-zinc-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Arquitetura em camadas"
            title="Da pessoa aos dados"
            description="Cada camada conversa com a seguinte. O usuário interage no navegador; a Vercel entrega a aplicação; o Supabase guarda e sincroniza os dados."
          />
          <div className="mt-10 grid gap-3">
            {camadas.map((c, i) => (
              <div key={c.titulo}>
                <div className={`rounded-2xl border-2 p-5 ${c.cor}`}>
                  <p className="text-base font-black text-zinc-900">{c.titulo}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.itens.map((it) => (
                      <span key={it} className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-bold text-zinc-700">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
                {i < camadas.length - 1 && (
                  <div className="flex justify-center py-1 text-2xl font-black text-zinc-300" aria-hidden="true">↕</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tempo real */}
      <section className="border-b border-zinc-200 bg-[#F6F8FB] px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Comunicação em tempo real"
            title="Celular controla a Tela Grande (DAVI InterCel)"
            description="Os comandos enviados pelo celular chegam ao Painel na hora, usando o canal de tempo real do Supabase."
          />
          <div className="mt-8 overflow-x-auto">
            <FlowSteps steps={["Celular (controle)", "Supabase Realtime", "Painel (Tela grande)"]} />
          </div>
          <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-700">
            O <strong>Supabase Realtime</strong> (baseado em WebSocket) transmite os
            comandos entre dispositivos diferentes. O armazenamento local
            (localStorage) do navegador é mantido como histórico e reserva no
            mesmo aparelho.
          </p>
        </div>
      </section>

      {/* Stack completa */}
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Stack tecnológica completa"
            title="Tudo que é usado, por categoria"
            description="Linguagens, frameworks, bibliotecas, APIs do navegador e ferramentas de publicação."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {stack.map((grupo) => (
              <div key={grupo.titulo} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-black text-zinc-950">{grupo.titulo}</h3>
                <div className="mt-4">
                  <TagList items={grupo.itens} />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-900">
            Em resumo: o código em <strong>TypeScript/React/Next.js</strong>,
            estilizado com <strong>Tailwind</strong>, é versionado no{" "}
            <strong>Git/GitHub</strong>; a <strong>Vercel</strong> publica
            automaticamente na CDN; os dados e o tempo real vêm do{" "}
            <strong>Supabase (PostgreSQL + Realtime + Auth)</strong>; e os recursos
            avançados usam <strong>APIs nativas do navegador</strong> (voz,
            Bluetooth, câmera, sensores) e <strong>three.js</strong> para 3D.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

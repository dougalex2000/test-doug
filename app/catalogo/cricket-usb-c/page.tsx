import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb, LinkButton, PageHero, PageShell } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "CRICKET USB-C — Protótipo em teste | DAVI Catálogo",
  description: "Conceito experimental de fone com câmera e microfone USB-C para uso com o DAVI Mentor. Sem finalidade comercial ou disponibilidade para venda.",
};

const etapas = [
  ["1. Conectar e conferir", "A proposta é conectar o acessório ao smartphone por USB-C para áudio, imagem e alimentação. O reconhecimento da câmera e do microfone pelo aparelho e pelo navegador ainda precisa ser validado; conexão USB-C não garante compatibilidade."],
  ["2. Abrir o DAVI Mentor", "Acesse o módulo pelo site ou QR Code, escolha o perfil de demonstração, o nível de assistência e as funções desejadas. Autorize câmera e microfone quando quiser utilizá-los."],
  ["3. Pedir uma análise", "Na versão atual do DAVI Mentor, toque em Analisar ambiente ou outro botão visual para capturar uma imagem sob demanda. Não há transmissão contínua de vídeo ao modelo. Perguntas apenas faladas ou digitadas ainda não capturam automaticamente uma nova imagem."],
  ["4. Receber apoio", "A IA gera uma resposta em texto, que pode ser lida por síntese de voz. O conceito prevê ouvir essa resposta no fone. O sistema apoia a decisão da pessoa e pode errar ou omitir detalhes; não deve ser usado como garantia de segurança para deslocamentos."],
];

export default function CricketUsbCPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ label: "DAVI Catálogo", href: "/catalogo" }, { label: "CRICKET USB-C" }]} />
      <PageHero eyebrow="Pesquisa e desenvolvimento" title="CRICKET USB-C + DAVI Mentor" description="Protótipo experimental de assistência visual e cognitiva: uma proposta de fone com microcâmera e microfone conectados ao celular, integrada ao DAVI Mentor." actions={<LinkButton href="/davi-mentor">Conhecer o DAVI Mentor</LinkButton>} />
      <main className="mx-auto max-w-6xl space-y-10 px-6 py-12 text-zinc-800">
        <section className="rounded-xl border-2 border-amber-400 bg-amber-50 p-6">
          <h2 className="text-2xl font-black">Protótipo em teste — sem finalidade comercial</h2>
          <p className="mt-3 leading-7">Este registro documenta um conceito em desenvolvimento, sem preço comercial, venda, encomenda ou previsão de disponibilidade. A ilustração não comprova um dispositivo físico funcional. As características e aplicações apresentadas são objetivos de pesquisa sujeitos a testes.</p>
        </section>
        <figure>
          <Image src="/images/davi/cricket-usb-c-prototipo.jpeg" alt="Prancha conceitual do CRICKET USB-C com componentes, conexão ao smartphone, uso no ouvido e arquitetura proposta" width={1448} height={1086} className="h-auto w-full rounded-xl border border-zinc-200" />
          <figcaption className="mt-3 text-sm leading-6 text-zinc-600">Imagem conceitual fornecida para apresentação do projeto. Expressões como plug and play, baixo custo, processamento no celular e tempo real representam metas; compatibilidade, custos e desempenho ainda não estão comprovados.</figcaption>
        </figure>
        <section>
          <h2 className="text-2xl font-black">Componentes e finalidade proposta</h2>
          <p className="mt-4 leading-8">O conceito reúne microcâmera voltada para a cena à frente, microfone, saída de áudio intra-auricular, cabo USB-C e botão tátil opcional. O smartphone serve como interface para solicitar descrições, ler textos, consultar lembretes e receber apoio em tarefas e interações sociais, conforme as funções habilitadas. Identificação de pessoas, orientação espacial e demais recursos avançados não estão validados como funções do acessório.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black">Como usar com o DAVI Mentor</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">{etapas.map(([titulo, texto]) => <article key={titulo} className="rounded-xl border border-zinc-200 p-6"><h3 className="text-xl font-bold">{titulo}</h3><p className="mt-3 leading-7">{texto}</p></article>)}</div>
        </section>
        <section className="rounded-xl bg-blue-50 p-6">
          <h2 className="text-2xl font-black">O que já está disponível para experimentar</h2>
          <p className="mt-3 leading-8">O protótipo web DAVI Mentor oferece perfis demo, níveis de assistência, seleção de funções, câmera do aparelho, perguntas por texto ou voz quando suportadas pelo navegador e leitura de respostas. O processamento atual de IA ocorre no computador de testes por Ollama/MiniCPM-V, acessado por uma ponte HTTPS; não ocorre integralmente no smartphone. A disponibilidade depende do computador, do modelo e da ponte ligados.</p>
          <p className="mt-3 leading-8">A arquitetura CRICKET organiza o contexto em EU (perfil, objetivos e memória autorizada), OUTROS (contexto social) e MUNDO (cena e ambiente). Essa organização não significa reconhecimento automático de identidade nem detecção confiável de riscos.</p>
          <div className="mt-6 flex flex-wrap gap-3"><LinkButton href="/davi-mentor/sessao?p=DEMO001">Testar com o perfil demo</LinkButton><LinkButton href="/davi-mentor/qr" variant="secondary">Abrir QR Codes</LinkButton></div>
        </section>
        <section>
          <h2 className="text-2xl font-black">Cuidados e próximos testes</h2>
          <p className="mt-4 leading-8">Ainda precisam ser avaliados o protótipo físico, a seleção da câmera USB no navegador, alimentação e aquecimento, qualidade de áudio, conforto, latência e fidelidade das descrições. A IA pode produzir informações incorretas; confirme informações importantes. Para testes de câmera, avise as pessoas no ambiente e evite captar dados privados. O módulo não substitui avaliação profissional, recursos de mobilidade ou decisões da pessoa.</p>
          <p className="mt-4 text-sm text-zinc-600">Registro de desenvolvimento: 21 de outubro de 2026. Status: conceito experimental e integração em validação, sem comercialização.</p>
        </section>
      </main>
    </PageShell>
  );
}

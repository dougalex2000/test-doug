import type { Metadata } from "next";
import Image from "next/image";
import { FlowSteps, ConstructionNotice, ConceptPage } from "../../components/modules";
import { ConectaPanel } from "../../components/demos";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "DAVI Conecta",
  description: "Integração com dispositivos assistivos e comunicação sem fio.",
};

const dispositivos = [
  { nome: "Botão de grande área", tipo: "Acionamento simples", descricao: "Um toque pode confirmar uma escolha, avançar uma varredura ou selecionar uma mensagem. A força e a posição do botão devem ser adaptadas à pessoa." },
  { nome: "Pedal acessível", tipo: "Acionamento com o pé", descricao: "Permite aproveitar um movimento voluntário do pé para emitir um comando, deixando as mãos livres quando isso for adequado à avaliação funcional." },
  { nome: "Joystick adaptado", tipo: "Direção e seleção", descricao: "Uma alavanca ampliada pode apoiar a navegação entre opções. Sensibilidade, amplitude e botões de seleção dependem da adaptação e da calibração." },
  { nome: "Painel de botões", tipo: "Múltiplos comandos", descricao: "Teclas grandes e contrastantes podem representar escolhas, respostas sim/não ou frases de comunicação. A associação das ações precisa ser configurada." },
];

export default function ConectaPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Acesso e Dispositivos", href: "/acesso" }, { label: "DAVI Conecta" }]}
      eyebrow="DAVI Conecta"
      title="Integração com dispositivos assistivos sem fio"
      subtitle="Botões, sensores, microcontroladores e acionadores enviando comandos à plataforma."
      status="Testes iniciais"
      group="Grupo DAVI Conecta e Dispositivos Sem Fio"
      lead={
        <div>
          <section aria-labelledby="conecta-dispositivos" className="mb-8 rounded-xl border border-zinc-200 bg-white p-5">
            <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <figure className="min-w-0">
                <Image src="/images/davi/conecta-dispositivos-bluetooth.png" alt="Exemplos ilustrativos de botão vermelho de grande área, pedal azul, joystick adaptado e painel de quatro botões para projetos de acesso sem fio" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 480px" className="h-52 w-full rounded-lg bg-zinc-50 object-contain sm:h-64" />
                <figcaption className="mt-2 text-xs leading-5 text-zinc-500">Imagem gerada por IA · Produtos ilustrativos, não comercializados. Não representa dispositivos físicos validados.</figcaption>
              </figure>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Possibilidades de acesso</p>
                <h2 id="conecta-dispositivos" className="mt-2 text-2xl font-black text-zinc-950">Seu movimento pode virar um comando</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-600">Botões, pedais e joysticks podem ser ligados a uma interface sem fio, por exemplo com um microcontrolador compatível com Bluetooth. O DAVI Conecta explora essas entradas para apoiar seleção, comunicação e atividades assistivas.</p>
                <p className="mt-3 text-xs leading-6 text-zinc-500">O dispositivo precisa de eletrônica e firmware adequados. Um botão comum não ganha Bluetooth sozinho, e aparelhos Bluetooth diferentes não são automaticamente compatíveis com a plataforma.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {dispositivos.map((dispositivo) => <article key={dispositivo.nome} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"><p className="text-xs font-bold text-blue-700">{dispositivo.tipo}</p><h3 className="mt-1 text-base font-black text-zinc-950">{dispositivo.nome}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{dispositivo.descricao}</p></article>)}
            </div>
            <p className="mt-5 border-t border-zinc-200 pt-4 text-xs leading-6 text-zinc-500">Integração em testes: dispositivos Bluetooth HID podem atuar como teclado ou mouse quando o sistema oferecer suporte; dispositivos BLE com serviços próprios exigem integração compatível. Web Bluetooth depende do navegador e das permissões. Pareamento e funcionamento devem ser confirmados para cada protótipo.</p>
          </section>
          <ConectaPanel />
          <div className="mt-6 overflow-x-auto">
            <FlowSteps
              steps={["Dispositivo físico", "Bluetooth / WebSocket", "DAVI Conecta", "Ação na plataforma"]}
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/dispositivos/pareamento">
              Abrir o Pareamento de dispositivos →
            </LinkButton>
          </div>
          <p className="mt-3 text-sm text-zinc-600">
            Conecte e calibre seu dispositivo (GAIA_KEYPAD / GAIA_ACCESSPAD) por
            Bluetooth e veja a visualização 3D em tempo real.
          </p>
        </div>
      }
      sections={[
        {
          eyebrow: "O que é o DAVI Conecta",
          title: "De comandos físicos a acesso à aprendizagem",
          paragraphs: [
            "O DAVI Conecta está sendo estruturado para permitir a comunicação entre a plataforma online e dispositivos assistivos físicos, especialmente por conexões sem fio. Botões adaptados, sensores e microcontroladores enviam comandos para comunicação, alfabetização, controle de vídeo, escrita assistida e navegação.",
            "O objetivo não é apenas conectar dispositivos, mas transformar comandos em acesso à aprendizagem e à comunicação.",
          ],
        },
        {
          eyebrow: "Tecnologias",
          title: "Conectividade compatível",
          bullets: [
            "Bluetooth e Web Bluetooth",
            "ESP32 e microcontroladores",
            "WebSocket e integração local",
            "Pareamento e reconexão",
            "Registro de eventos",
          ],
          tone: "soft",
        },
      ]}
      note={
        <ConstructionNotice title="Testes iniciais" tone="blue">
          Protótipos iniciais estão em fase de implantação e testes, com foco em
          pareamento, conectividade, envio de comandos e registro de eventos —
          sempre com atenção à segurança e à privacidade.
        </ConstructionNotice>
      }
    />
  );
}

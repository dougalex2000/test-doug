import type { Metadata } from "next";
import { FlowSteps, ConstructionNotice, ConceptPage } from "../../components/modules";
import { ConectaPanel } from "../../components/demos";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "DAVI Conecta",
  description: "Integração com dispositivos assistivos e comunicação sem fio.",
};

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

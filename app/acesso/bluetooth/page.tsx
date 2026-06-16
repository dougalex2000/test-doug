import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Pareamento Bluetooth — DAVI Conecta",
  description: "Conectar dispositivos assistivos por Bluetooth Low Energy.",
};

export default function BluetoothPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Acesso e Dispositivos", href: "/acesso" }, { label: "Pareamento Bluetooth" }]}
      eyebrow="Pareamento Bluetooth"
      title="Conectar dispositivos sem fio com segurança"
      subtitle="Pareamento por Bluetooth Low Energy (BLE) para botões, sensores e acionadores."
      status="Testes iniciais"
      actions={<LinkButton href="/dispositivos/pareamento">Abrir página de pareamento</LinkButton>}
      sections={[
        {
          eyebrow: "Como funciona",
          title: "Web Bluetooth no navegador",
          paragraphs: [
            "O DAVI utiliza Web Bluetooth para descobrir e parear dispositivos compatíveis diretamente do navegador, identificando-os pelo serviço (UUID) anunciado. Após o pareamento, o dispositivo envia comandos para atividades de comunicação, controle de vídeo e navegação.",
          ],
          bullets: [
            "Descoberta por serviço (UUID), não só por nome",
            "Conexão direta pelo navegador (Web Bluetooth)",
            "Reconexão e registro de eventos",
            "Compatível com microcontroladores como ESP32",
          ],
        },
      ]}
    />
  );
}

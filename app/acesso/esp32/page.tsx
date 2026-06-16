import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "ESP32 e Dispositivos Sem Fio — DAVI Conecta",
  description: "Microcontroladores de baixo custo para acesso assistivo.",
};

export default function Esp32Page() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Acesso e Dispositivos", href: "/acesso" }, { label: "ESP32 e Sem Fio" }]}
      eyebrow="ESP32 e Dispositivos Sem Fio"
      title="Microcontroladores como ponte de acesso"
      subtitle="ESP32, Arduino e Raspberry Pi Pico transformam acionadores físicos em comandos para a plataforma."
      status="Testes iniciais"
      sections={[
        {
          eyebrow: "Prototipagem",
          title: "Baixo custo, código aberto",
          paragraphs: [
            "Microcontroladores como o ESP32 leem botões, sensores de sopro e acionadores e enviam comandos ao DAVI por Bluetooth ou WebSocket. São de baixo custo e reprodutíveis, o que favorece projetos abertos e adaptações sob demanda.",
          ],
          bullets: [
            "Leitura de botões, sopro e sensores",
            "Envio por Bluetooth (BLE) ou WebSocket",
            "Firmware aberto e documentado",
            "Integração com a Oficina Maker",
            "Registro de eventos no DAVI Conecta",
          ],
        },
      ]}
    />
  );
}

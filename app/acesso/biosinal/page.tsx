import type { Metadata } from "next";
import { ConstructionNotice, ConceptPage } from "../../components/modules";
import { BioSinalSimulator } from "../../components/demos";

export const metadata: Metadata = {
  title: "DAVI BioSinal",
  description:
    "Sinais biológicos como caminhos experimentais de acesso assistivo.",
};

export default function BioSinalPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Acesso e Dispositivos", href: "/acesso" }, { label: "BioSinal" }]}
      eyebrow="DAVI BioSinal"
      title="Sinais biológicos como caminhos experimentais de acesso"
      subtitle="EEG, EMG, EOG, piscadas e movimentos preservados como possíveis métodos de acesso."
      status="Experimental"
      group="Grupo DAVI BioSinal"
      lead={<BioSinalSimulator />}
      sections={[
        {
          eyebrow: "O que é o DAVI BioSinal",
          title: "Pesquisa em sinais do corpo",
          paragraphs: [
            "O DAVI BioSinal é um módulo experimental voltado ao estudo de sinais biológicos como possíveis métodos de acesso assistivo. Pode explorar futuramente EEG, EMG, EOG, piscadas, movimentos musculares preservados e outros sinais corporais para apoiar pessoas que não conseguem usar teclado, mouse, toque, botão ou sopro de forma convencional.",
          ],
        },
        {
          eyebrow: "Sinais estudados",
          title: "Caminhos possíveis",
          bullets: [
            "EEG — atividade elétrica cerebral",
            "EMG — sinais musculares",
            "EOG — movimento dos olhos",
            "Piscadas",
            "Sinais combinados",
            "Equipamentos de baixo custo (ESP32, sensores simples)",
          ],
          tone: "soft",
        },
        {
          eyebrow: "Equipamentos e integração",
          title: "Baixo custo e código aberto",
          paragraphs: [
            "Pode usar sensores de baixo custo, ESP32, Bluetooth, WebSocket e Python, integrando-se ao DAVI Conecta. Exemplos futuros de referência: OpenBCI, Muse, NeuroSky, sensores EMG simples e sensores de piscada.",
          ],
        },
      ]}
      note={
        <ConstructionNotice title="Experimental — ética em primeiro lugar">
          O BioSinal é experimental, não realiza diagnóstico clínico e não
          substitui profissionais. Exige ética, consentimento, proteção de dados
          e privacidade. Qualquer pesquisa com participantes deve passar por
          Comitê de Ética em Pesquisa.
        </ConstructionNotice>
      }
    />
  );
}

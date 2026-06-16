import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { VideoAulaDemo } from "../../components/demos";

export const metadata: Metadata = {
  title: "Videoaulas Acessíveis — DAVI Escola",
  description:
    "Controle de vídeos por toque, teclado, botão, olhar ou dispositivo assistivo.",
};

export default function VideoaulasPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Escola", href: "/escola" }, { label: "Videoaulas" }]}
      eyebrow="Videoaulas Acessíveis"
      title="Controlar a videoaula no próprio ritmo"
      subtitle="A origem do DAVI: permitir que o aluno pause, volte, avance e repita a explicação quando precisar."
      status="Demonstração"
      group="Grupo Videoaulas e Tarefas"
      lead={<VideoAulaDemo />}
      sections={[
        {
          eyebrow: "Métodos de acionamento futuros",
          title: "Um controle, vários caminhos de acesso",
          bullets: [
            "Toque",
            "Teclado",
            "Botão adaptado",
            "Sensor de sopro",
            "Joystick",
            "DAVI Vision",
            "ESP32 e Bluetooth",
            "WebSocket",
            "BioSinal experimental",
          ],
        },
      ]}
    />
  );
}

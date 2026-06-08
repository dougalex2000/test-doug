import EyeTrackingDemo from "../components/EyeTrackingDemo";
import { PageHero, PageShell } from "../components/SiteShell";

export default function RastreamentoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Rastreamento Visual Assistivo"
        title="Seleção por olhar com webcam e calibração personalizada"
        description="Protótipo experimental de baixo custo com webcam, calibração de 9 pontos, captura automática e seleção por permanência. Não substitui um eye tracker profissional."
      />
      <EyeTrackingDemo />
    </PageShell>
  );
}

import EyeTrackingDemo from "../../components/EyeTrackingDemo";
import { PageHero, PageShell } from "../../components/SiteShell";

export default function RastreamentoOcularPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Módulos"
        title="Varredura Ocular"
        description="Análise do olhar, calibração, tempo de fixação, mapas de atenção e apoio a profissionais. Este módulo mantém o protótipo experimental de rastreamento por webcam isolado em uma rota própria."
      />
      <EyeTrackingDemo />
    </PageShell>
  );
}

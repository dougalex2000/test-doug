import type { Metadata } from "next";
import { ConstructionNotice, ConceptPage } from "../../components/modules";
import { VisionSimulator } from "../../components/demos";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "DAVI Vision",
  description: "Rastreamento ocular e interação visual para acessibilidade.",
};

export default function VisionPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Acesso e Dispositivos", href: "/acesso" }, { label: "DAVI Vision" }]}
      eyebrow="DAVI Vision"
      title="Rastreamento ocular e interação visual"
      subtitle="Câmera, olhar, posição da cabeça, piscadas, expressões e gestos como possíveis métodos de acesso."
      status="Protótipo"
      group="Grupo DAVI Vision"
      actions={<LinkButton href="/rastreamento">Abrir a demonstração de rastreamento</LinkButton>}
      lead={<VisionSimulator />}
      sections={[
        {
          eyebrow: "O que é o DAVI Vision",
          title: "Interação visual por câmera",
          paragraphs: [
            "O DAVI Vision é o módulo voltado ao estudo e prototipagem de formas de interação visual: rastreamento do olhar, posição da cabeça, piscadas, expressões faciais e gestos como possíveis métodos de acesso à plataforma.",
          ],
        },
        {
          eyebrow: "Como pode apoiar",
          title: "Comunicação, alfabetização e controle",
          bullets: [
            "Apoiar a comunicação alternativa",
            "Apoiar a alfabetização e a escrita",
            "Controlar atividades e videoaulas",
            "Rastreamento ocular por zonas",
            "Piscadas para selecionar",
            "Cabeça, face e gestos",
          ],
          tone: "soft",
        },
        {
          eyebrow: "IA e privacidade",
          title: "Apoio inteligente, com processamento local",
          paragraphs: [
            "A inteligência artificial poderá apoiar a calibração, a correção de falhas, a adaptação da interface e a interpretação de intenção. O módulo pode usar tecnologias como MediaPipe ou equivalentes, sempre priorizando privacidade, consentimento e processamento local.",
          ],
        },
      ]}
      note={
        <ConstructionNotice title="Protótipo e testes iniciais" tone="blue">
          O DAVI Vision está em prototipagem e testes iniciais, não possui
          finalidade diagnóstica e deve respeitar privacidade, consentimento e
          processamento local sempre que possível.
        </ConstructionNotice>
      }
    />
  );
}

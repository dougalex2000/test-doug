import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { CalibrarControls } from "../../components/demos";

export const metadata: Metadata = {
  title: "DAVI Calibrar",
  description: "Ajustes personalizados para cada método de acesso.",
};

export default function CalibrarPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Acesso e Dispositivos", href: "/acesso" }, { label: "DAVI Calibrar" }]}
      eyebrow="DAVI Calibrar"
      title="Ajustes personalizados para cada método de acesso"
      subtitle="Cada pessoa pode precisar de configurações próprias para usar a plataforma com conforto."
      lead={<CalibrarControls />}
      sections={[
        {
          eyebrow: "O que é possível ajustar",
          title: "Configurações de acesso",
          bullets: [
            "Velocidade de varredura",
            "Tempo de permanência",
            "Sensibilidade",
            "Tipo de clique e confirmação",
            "Repetição",
            "Tamanho de botões",
            "Áudio de apoio e contraste",
            "Método preferencial",
            "Calibração de dispositivos",
            "Sugestões futuras com IA",
          ],
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Teclado, Botão e Sopro — Métodos de Acesso",
  description: "Acionadores físicos para interação com a plataforma.",
};

export default function AcionadoresPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Acesso e Dispositivos", href: "/acesso" }, { label: "Teclado, Botão e Sopro" }]}
      eyebrow="Teclado, Botão e Sopro"
      title="Acionadores físicos para cada movimento possível"
      subtitle="Quando o movimento voluntário existe, há um acionador que o transforma em comando."
      actions={<LinkButton href="/tecnologias-assistivas/catalogo">Ver no catálogo</LinkButton>}
      sections={[
        {
          eyebrow: "Tipos de acionador",
          title: "Do teclado adaptado ao sensor de sopro",
          bullets: [
            "Teclas grandes e de alto contraste",
            "Botão adaptado de grande área",
            "Acionador capacitivo (toque leve)",
            "Pedal adaptado",
            "Sensor de sopro",
            "Joystick acessível",
          ],
        },
        {
          eyebrow: "Como se conectam",
          title: "Varredura e seleção",
          paragraphs: [
            "Com um único acionador confiável é possível usar varredura automática: a interface percorre as opções e a pessoa seleciona no momento certo. Isso abre comunicação, escrita e controle de atividades para quem tem um só movimento voluntário.",
          ],
          tone: "soft",
        },
      ]}
    />
  );
}

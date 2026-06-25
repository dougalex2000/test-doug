import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { LinkButton } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Pranchas de Comunicação — DAVI Comunica",
  description: "Símbolos organizados por categoria para expressão.",
};

export default function PranchasPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Comunicação", href: "/comunicacao" }, { label: "Pranchas de Comunicação" }]}
      eyebrow="Pranchas de Comunicação"
      title="Símbolos que dão voz"
      subtitle="Pranchas físicas ou digitais com símbolos, categorias e frases para expressão."
      actions={<LinkButton href="/comunicacao/alternativa">Abrir prancha interativa</LinkButton>}
      sections={[
        {
          eyebrow: "O que são",
          title: "Comunicação por símbolos, organizada por categorias",
          paragraphs: [
            "As pranchas organizam símbolos e palavras por categorias — necessidades, emoções, escola, família, alimentação, saúde — permitindo construir mensagens mesmo antes da alfabetização plena.",
            "Futuramente serão configuráveis por usuário e integráveis ao olhar e à varredura.",
          ],
        },
      ]}
    />
  );
}

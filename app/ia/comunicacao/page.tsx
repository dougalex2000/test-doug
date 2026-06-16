import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";

export const metadata: Metadata = {
  title: "IA na Comunicação Alternativa",
  description: "Ampliar a comunicação com apoio da inteligência artificial.",
};

export default function IaComunicacaoPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "Inteligência Artificial", href: "/ia" }, { label: "IA na Comunicação" }]}
      eyebrow="IA na Comunicação Alternativa"
      title="Ampliar a expressão, respeitando a pessoa"
      subtitle="A IA pode prever palavras, sugerir frases e organizar pranchas — sempre sob controle do usuário."
      status="Planejado"
      sections={[
        {
          eyebrow: "Como pode apoiar",
          title: "Previsão e organização, não substituição da voz",
          paragraphs: [
            "A inteligência artificial poderá sugerir palavras e frases prováveis, organizar pranchas por contexto e acelerar a construção de mensagens — sem nunca decidir pela pessoa o que ela quer dizer.",
          ],
          bullets: [
            "Previsão de palavras e frases",
            "Organização de pranchas por contexto",
            "Atalhos para mensagens frequentes",
            "Respeito à intenção do usuário",
          ],
        },
      ]}
    />
  );
}

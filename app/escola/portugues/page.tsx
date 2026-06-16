import type { Metadata } from "next";
import { ConceptPage } from "../../components/modules";
import { AtividadePortugues } from "../../components/demos";

export const metadata: Metadata = {
  title: "Língua Portuguesa — DAVI Escola",
  description: "Comunicação, alfabetização, leitura e escrita acessível.",
};

export default function PortuguesPage() {
  return (
    <ConceptPage
      breadcrumb={[{ label: "DAVI Escola", href: "/escola" }, { label: "Língua Portuguesa" }]}
      eyebrow="Língua Portuguesa"
      title="Comunicação, alfabetização, leitura e escrita acessível"
      subtitle="A vida independente começa pela comunicação — e a Língua Portuguesa é o primeiro caminho para a expressão."
      status="Demonstração"
      group="Grupo DAVI Escola — Língua Portuguesa"
      lead={<AtividadePortugues />}
      sections={[
        {
          eyebrow: "Comunicação inicial",
          title: "Antes das letras, a expressão",
          bullets: [
            "Sim e não",
            "Escolhas",
            "Imagens e palavras",
            "Expressão de vontades",
            "Frases básicas",
          ],
        },
        {
          eyebrow: "Alfabetização",
          title: "Do som à palavra",
          bullets: [
            "Vogais",
            "Consoantes",
            "Sílabas e famílias silábicas",
            "Palavras",
            "Frases",
            "Pequenos textos",
          ],
          tone: "soft",
        },
        {
          eyebrow: "Escrita assistida",
          title: "Escrever com apoio e autonomia",
          bullets: [
            "Caixa de texto acessível",
            "Teclado virtual",
            "Leitura em voz alta do texto",
            "Apagar e ouvir instrução",
            "Enviar resposta",
            "Botões grandes",
          ],
        },
      ]}
    />
  );
}
